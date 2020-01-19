// TODO: register user // forgot password functionality
// TODO: resources are not calculating cost from state values
// TODO: comment sweep
// TODO: refactor sweep

//  OPTIONAL
    // TODO: Redesign?
    // TODO: printable?
    // TODO: admin mode?

import React from 'react';
import { Container, Row, Col, } from 'reactstrap';
import Header from './site_layout/header/Header';
import CharacterInfo from './site_layout/character_info/CharacterInfo';
import Resources from './site_layout/resources/Resources';
import SkillTree from './site_layout/skill_trees/SkillTree';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import UserLoginLogoutComponent from './site_layout/user_management/components/UserLoginLogoutComponent';
import RegisterNewUserComponent from './site_layout/user_management/components/RegisterNewUserComponent';
import NewPasswordComponent from './site_layout/user_management/components/NewPasswordComponent';
import ForgotPasswordComponent from './site_layout/user_management/components/ForgotPasswordComponent';
import AuthenticationService from './site_layout/user_management/services/AuthenticationService';

import { withAlert } from 'react-alert';


class App extends React.Component {
    state = {
        // TOP LEVEL REACT STATE:::
        
        // All of our character information is stored in state. It is overwritten with a localstorage character (if any),
        // or a Database character when selected by the logged in user
        
        // All of a logged in user's characters are stored in characterList
        
        // All of our skills are loaded into skilltree arrays, and player skills are loaded into the playerHasSkill array
        
        // The switch for enabling/disabling skills is also stored here

        // character info
        id: "",
        characterName: "",
        country: "",
        player: "",
        race: "",
        level: 0,
        savedXp: 0,
        playerHasSkill: [],

        // list of characters owned by logged in user
        characterList: [],

        
        // RESOURCES
        resources: {
            magicPoints: 0,
            craftPoints: 0,
            productionPoints: 0,
        },

        // With resources, the cost is set in state, and not in the database. ...For now.
            MAGIC_POINT_COST: 1,
            CRAFT_POINT_COST: 2,
            PRODUCTION_POINT_COST: 2,
        
        // LOCK BUTTONS TO PREVENT EDITING
        locked: false,

        // SKILL TREES
        combat: [],
        general: [],
        production: [],
        roleplaying: [],
        aegis: [],
        battle: [],
        nature: [],
        necromancy: [],
        compulsion: [],
        restoration: [],
        enchantment: []
    }

    componentDidMount() {
        // componentDidMount is called when react successfully inserts a component into the DOM. 
        // We then check if the user is logged in to load their characters
        // Then we load all of our skills from the database
        // Then we load whatever the user had in localStorage, if anything

        if (AuthenticationService.isUserLoggedIn()) {
            AuthenticationService.setupAxiosInterceptors(sessionStorage.getItem("USER_TOKEN"));
            this.loadCharacterList();
        };

        let skills = [];
        axios.get('http://localhost:8080/skills')
            .then(res => {
                // an array of skill objects was obtained from the database
                skills = [...res.data];
                // sort them
                this.sortSkillsByTree(skills);

                });

        if (localStorage.getItem("character") !== null){
            this.loadLocalCharacter()
        }
    }

    componentDidUpdate() {
        // Called when state or props update, so we use it to update the localStorage character
        this.saveLocalCharacter()
    }

    sortSkillsByTree = (skills) => {
        // Called in componentDidUpdate. Called when we get skills from database

        // keys in state currently empty arrays
        for (let key in this.state) {
            for (let skill in skills) {
                // if state key is the same as skill tree
                if (key === skills[skill].tree) {
                    // state is immutable, and batches updates. We spread the previous state (prevState) and then add the skill so that the correct previous value + new value is added
                    this.setState(prevState => ({
                        [key]: [...prevState[key], skills[skill]]
                    }));
                }
            }
        } 
    };

    saveLocalCharacter = () => {
        // called by componentDidUpdate

        let values = this.state

        let character = {
            characterName: values.characterName,
            player: values.player,
            race: values.race,
            country: values.country,
            level: values.level,
            savedXp: values.savedXp,
            magicPoints: values.resources.magicPoints,
            craftPoints: values.resources.craftPoints,
            productionPoints: values.resources.productionPoints,
            skills: values.playerHasSkill
        }

        localStorage.setItem("character", JSON.stringify(character))
    }

    loadLocalCharacter = () => {
        // CALLED BY: componentDidMount
        // load character from localStorage, if any

        var localStorageCharacter = JSON.parse(localStorage.getItem("character"));
        
        this.setState(prevState =>({
            ...prevState,
            
            characterName: localStorageCharacter.characterName,
            player: localStorageCharacter.player,
            race: localStorageCharacter.race,
            country: localStorageCharacter.country,
            level: localStorageCharacter.level,
            savedXp: localStorageCharacter.savedXp,
            magicPoints: localStorageCharacter.magicPoints,
            craftPoints: localStorageCharacter.craftPoints,
            productionPoints: localStorageCharacter.productionPoints,
            playerHasSkill: localStorageCharacter.skills
        }))
    }
    
    loadCharacterList = () => {
        // CALLED BY: componentDidMount, saveCharacter, loadCharacter,
                    // loginClicked (Header -> Navigation -> LoginComponent)
        // load all characters owned by current user
        
        return axios({
            method: 'get',
            url: 'http://localhost:8080/characters'})
            .then((res) => {
                this.setState(() =>({
                    characterList: [...res.data]
                }))
                
            })
            .catch((err) => {
                // console.log(err.response.data)
                alert.show(err.response.data, {timeout: 5000, type: 'error'})
            })
        }
    
        
        saveCharacter = (id, alert) => {
            // CALLED BY: Navigation(onClick(new Character)) (Header -> Navigation) 
            // CALLED BY: ConfirmationModal(onClick) (Header -> Navigation -> ConfirmationModal)
            // Save character to database. If an ID is provided, it will overwrite the database character with the matching ID
            // Ownership of the character is checked on the backend, so the user cannot overwrite a character that does not
            // belong to them
        
            // alert is passed in, because App.js this.props.alert is not accessible.

        let values = this.state

        let character = {
            id: id,
            characterName: values.characterName,
            player: values.player,
            race: values.race,
            country: values.country,
            level: values.level,
            savedXp: values.savedXp,
            magicPoints: values.resources.magicPoints,
            craftPoints: values.resources.craftPoints,
            productionPoints: values.resources.productionPoints,
            skills: values.playerHasSkill
        }

        return axios({
            method: 'post',
            url: `http://localhost:8080/character`,
            data: character })
            .then((res) => {
                
                // reload the character list on success
                this.loadCharacterList();

                // alert arg use
                alert.show("Character Saved", {timeout: 5000, type: 'success'})
            }).catch((err) => {

                // console.log(err.response.data)
                alert.show(err.response.data, {timeout: 5000, type: 'error'})
            })
        
    }
    
    loadCharacter = (id, alert) => {
        // load a user selected character from the database
        
        return axios({
            method: 'get',
            url: 'http://localhost:8080/character',
            params: {"id":id}})
            .then((res) => {
                // react doesnt like nested state, so we need to make a nest for our resources first
                // due to the way we stored them in this.state
                var resources = {magicPoints: res.data.magicPoints,
                                    productionPoints: res.data.productionPoints,
                                craftPoints: res.data.craftPoints}

                this.setState(prevState =>({
                    ...prevState,

                    id : res.data.id,
                    characterName: res.data.characterName,
                    race: res.data.race,
                    player: res.data.player,
                    country: res.data.country,
                    level: res.data.level,
                    savedXp: res.data.savedXp,

                    // resource nest made above
                    resources: resources,

                    // list of user skills
                    playerHasSkill: res.data.skills
                }))
                alert.show("Character Loaded", {timeout: 5000, type: 'success'})
            })
            .catch((err) => {
                // console.log(err.response.data)
                alert.show(err.response.data, {timeout: 5000, type: 'error'})
            })

    }

    deleteCharacter = (id, alert) => {

        return axios({
            method: 'delete',
            url: 'http://localhost:8080/character',
            params: {"id":id}})
            .then((res) => {
                // console.log(res.data)
                this.loadCharacterList()
                alert.show("Character Deleted", {timeout: 5000, type: 'success'})
            })
            .catch((err) => {
                // console.log(err.response.data)
                alert.show(err.response.data, {timeout: 5000, type: 'error'})
            })

    }

    characterInfoChange = (infoName, updatedInfo) => {
        // CALLED BY:
        // CharacterInfo -> CharacterInfoInput(onChange)
        // if the infoName is "level", we need to update players skill points remaining.
        this.setState({[infoName]: updatedInfo}, function() {
            this.calculateSkillPointsRemaining();
        });  
    }
    
    calculateBaseSkillPoints = () => { 
        // CALLED BY: calculateSkillPointsRemaining
        // a level 1 character has 4 skill points. Every level after that is +2

        return this.state.level === 1 ? 4 : (this.state.level * 2) + 4
    }


    calculateSkillPointsRemaining = () => {
        // used anytime our skill points need to be updated or checked

        var newSkillPointsRemaining = this.calculateBaseSkillPoints();

        newSkillPointsRemaining -= this.calculateSpentSkillPoints();

        return newSkillPointsRemaining;
    }

    calculateSpentSkillPoints = () => {
        // CALLED BY: calculateSkillPointsRemaining
        // this function is used to determine the total accumulated cost of the characters skills + resources
        var spent = 0;
        var playerSkills = this.state.playerHasSkill;
        var playerResources = this.state.resources;

        for (let skill in playerSkills) {
            spent += playerSkills[skill].cost;
        }

        spent += (playerResources.craftPoints * 2) + (playerResources.productionPoints * 2) + playerResources.magicPoints;

        return spent;
    }

    checkRequirements = (skill) => {
        // return true if player meets requirements for skill
    
        // skill.requires is a string that is equal to anotherSkill.name required for skill
        let requiredSkill = skill.requires

        // skill does not have a required skill
        if (requiredSkill === "" || requiredSkill === null) {
            return true; 
        }

        // player's skills array
        let pSkills = this.state.playerHasSkill;

        for (let pSkill in pSkills) {
            // if one of the player's skill contains the required skill name
            if (requiredSkill.includes(pSkills[pSkill].name)) {
                // we're good
                return true;
            }
        }

        return false;
    }
    
    playerCheckedASkillBox = (checkedSkill, e) => {
        // CALLED BY Skill.js(checkBox onChange) (SkillTree.js -> Skill.js)

        // add or remove a skill on checkbox change
            // make sure enough skill points are available
            // make sure requirements are met?
            // add skill to playerHasSkill Array, or remove it

        if (!this.checkRequirements(checkedSkill)) {
            // console.log("You do not meet the requirements for " + checkedSkill.name)
            this.props.alert.show("You do not meet the requirements for " + checkedSkill.name, {timeout: 5000, type: 'error'})
            return false;
        };
 
        // if click detected
        if (e) {

            // check the cost        
            if (this.calculateSkillPointsRemaining() - checkedSkill.cost < 0) {
                // console.log("You do not have enough skill points for " + checkedSkill.name);
                this.props.alert.show("You do not have enough skill points for " + checkedSkill.name, {timeout: 5000, type: 'error'})
                return false;
            };

            // add skill
            return this.addSkill(checkedSkill);
            
        } else {

            // if the skill is required, don't remove it
            if (this.skillIsRequired(checkedSkill)) {
                return true;
            }

            // remove
            return this.removeSkill(checkedSkill);
        }
    }

    skillIsRequired = (skill) => {
        // don't allow player to remove a skillpoint if it's a necessary requirement for another skill the player has

        // THIS FUNCTION IS ATROCIOUS

        let pSkills = this.state.playerHasSkill;

        for (let pSkill in pSkills) {

            // current iterations required skills
            let requirementSkillString = pSkills[pSkill].requires

            // if the current playerskill has a prerequisite skill
            if (requirementSkillString !== "" && requirementSkillString !== null) {

                // if it includes the skill we are trying to remove, it's a requirement
                if (requirementSkillString.includes(skill.name)) {

                    // if it includes a pipe, there's another prerequisite
                    if(requirementSkillString.includes("|")) {

                        // iterate again
                        for (let pSkill2 in pSkills) {

                            // if the current playerskill has a prerequisite skill
                            if (requirementSkillString !== "" && requirementSkillString !== null) {

                                // if the NEW FOUND SKILL is required by the FIRST FOUND SKILL
                                // but it does not equal the SKILL BEING REMOVED
                                // the player still meets the requirements
                                // (this took me way too long and it seems overcomplicated)
                                if (skill.name !== pSkills[pSkill2].name && requirementSkillString.includes(pSkills[pSkill2].name)) {
                                    //console.log(skill.name + " is a prerequisite for " + pSkills[pSkill].name + ", but player has " + pSkills[pSkill2].name + ", which is also a prerequisite")
                                    return false;
                                }
                            }
                        }
                    }
                        // console.log("Cannot remove " + skill.name + ". It is a prerequisite for " + pSkills[pSkill].name)
                        this.props.alert.show("Cannot remove " + skill.name + ". It is a prerequisite for " + pSkills[pSkill].name, {timeout: 5000, type: 'error'})
                        return true;    
                }
            }

        }

        return false;
    }

    addResource = (resourceName, cost, max) => {
        // CALLED BY: Resources.js -> Resource.js(onClick)

        if (this.calculateSkillPointsRemaining() - cost < 0) {
            this.props.alert.show("You do not have enough skill points", {type:'error'});
            return false;
        };

        // check if player maxed out resource amount already
        if (this.state.resources[resourceName] >= max) {
                // console.log(resourceName + " limit reached")
                return false;
        };

        // local resources variable
        let resources = this.state.resources
        // add a point to this resource
        resources[resourceName] += 1;

        // add new resources to state and calc SPR
        this.setState({resources}, () => {this.calculateSkillPointsRemaining()});

        return true;
    }

    removeResource = (resourceName) => {
         // CALLED BY: Resources.js -> Resource.js(onClick)

        if (this.state.resources[resourceName] == 0) {
            // console.log("you can't go below 0, you idiot")
            return false;
        }

        let resources = this.state.resources
        resources[resourceName] -= 1;

        this.setState({resources});
    }

    addSkill = (skill) => {
        // called by playerCheckedASkillBox

        this.setState(prevState => ({
            playerHasSkill: ([...prevState.playerHasSkill, skill]) }), function ()   {
                this.calculateSkillPointsRemaining()
        });
        // console.log("You have added the " + skill.name + " skill")
        return true;
        }
   
    removeSkill = (skill) => {
        // called by playerCheckedASkillBox

        this.setState(prevState => ({
            // filter previous state.playerhasskill array to return a new array without matching skill
            playerHasSkill: prevState.playerHasSkill.filter(arrSkill => arrSkill.name !== skill.name)
        }), function () {
            this.calculateSkillPointsRemaining()
        })

        // console.log("You have removed the " + skill.name + " skill")
        return false;
    }


    lockChanges = () => {
        // disable inputs on playerInfo, resources, and skill checkboxes
        
        this.props.alert.show("Character editing " + (this.state.locked ? "unl" : "l") + "ocked")

        this.setState(prevState => ({locked: !prevState.locked}));

        this.calculateSkillPointsRemaining();
    }
    
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">

                            <Header 
                                lockChanges={this.lockChanges}
                                locked={this.state.locked} 
                                saveCharacter={this.saveCharacter} 
                                loadCharacter={this.loadCharacter} 
                                deleteCharacter={this.deleteCharacter} 
                                characterList={this.state.characterList} 
                                loadCharacterList={this.loadCharacterList}
                                // pass state to a button for testing
                                staate={this.state} >
                            </Header>

                            <CharacterInfo
                                level={this.state.level}
                                characterName={this.state.characterName}
                                country={this.state.country}
                                player={this.state.player}
                                race={this.state.race}
                                savedXp={this.state.savedXp}
                                characterInfoChange={this.characterInfoChange}
                                lockChanges={this.state.locked}
                                calculateSkillPointsRemaining={this.calculateSkillPointsRemaining}
                            />

                            <Container>
                                <Resources 
                                    resources={this.state.resources}
                                    addResource={this.addResource} 
                                    removeResource={this.removeResource} 
                                    lockChanges={this.state.locked} 
                                    MAGIC_POINT_COST={this.state.MAGIC_POINT_COST}
                                    PRODUCTION_POINT_COST={this.state.PRODUCTION_POINT_COST}
                                    CRAFT_POINT_COST={this.state.CRAFT_POINT_COST}
                                />
                                
                                <Row>
                                    <Col className="skilltree">

                                        <div className="combat">
                                            <h3>Combat</h3>
                                            <SkillTree 
                                                skills={this.state.combat} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} 
                                            />
                                        </div>

                                        <div className="general">
                                            <h3>General</h3>
                                            <SkillTree 
                                                skills={this.state.general} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                ockChanges={this.state.locked} />
                                        </div>
                                        <div className="nature">
                                            <h3>Nature</h3>
                                            <SkillTree 
                                                skills={this.state.nature} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>
                                        <div className="necromancy">
                                            <h3>Necromancy</h3>
                                            <SkillTree 
                                                skills={this.state.necromancy} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>
                                    </Col>

                                    <Col className="skilltree">

                                        <div className="production">
                                            <h3>Production</h3>
                                                <SkillTree 
                                                skills={this.state.production} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>
                                        
                                        <div className="aegis">
                                            <h3>Aegis</h3>
                                                <SkillTree 
                                                skills={this.state.aegis} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>

                                        <div className="battle">
                                            <h3>Battle</h3>
                                            <SkillTree 
                                                skills={this.state.battle} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>
                                    </Col>

                                    <Col className="skilltree">

                                        <div className="roleplaying">
                                            <h3>Roleplaying</h3>
                                            <SkillTree 
                                                skills={this.state.roleplaying} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>

                                        <div className="compulsion">
                                            <h3>Compulsion</h3>
                                            <SkillTree 
                                                skills={this.state.compulsion} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>
                    
                                        <div className="restoration">
                                            <h3>Restoration</h3>
                                            <SkillTree 
                                                skills={this.state.restoration} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>

                                        <div className="enchantment">
                                            <h3>Enchantment</h3>
                                            <SkillTree 
                                                skills={this.state.enchantment} 
                                                playerSkills={this.state.playerHasSkill} 
                                                playerCheckedASkillBox={this.playerCheckedASkillBox} 
                                                lockChanges={this.state.locked} />
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Route>
                        <Route exact path="/login">
                            <UserLoginLogoutComponent />
                                <div className="registerbox d-flex flex-column align-items-center m-5">
                                    <div>No account?</div>
                                    <Link to="/register">
                                        <button className="btn btn-success">Register</button>
                                    </Link>
                                    <div>Forgot your password?</div>
                                    <Link to="/forgot">
                                        <button className="btn btn-success">Reset Password</button>
                                    </Link>
                                </div>
                        </Route>

                        <Route path="/register" exact component={RegisterNewUserComponent} />

                        <Route path="/forgot" exact component={ForgotPasswordComponent} />

                        <Route path="/newpass:token" exact component={NewPasswordComponent} /> 
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default withAlert()(App);
