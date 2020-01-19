// TODO: negative resource bug
// TODO: comment sweep
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
        // character info
        id: 1,
        characterName: "",
        country: "",
        player: "",
        race: "",
        level: 0,
        savedXp: 0,
        playerHasSkill: [],

        characterList: [],

        
        // RESOURCES
        resources: {
            magicPoints: 0,
            craftPoints: 0,
            productionPoints: 0,
        },
        // With resources, the cost is set in state, and not in the database. ...For now.
            MAGIC_POINT_COST: 0,
            CRAFT_POINT_COST: 0,
            PRODUCTION_POINT_COST:0,
        
        // LOCK BUTTONS TO PREVENT EDITING
        locked: false,
        modal: false,

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

    toggle() {this.setState(prevState => ({modal: !prevState.modal}))};

    componentDidMount() {
        if (AuthenticationService.isUserLoggedIn()) {
            AuthenticationService.setupAxiosInterceptors(sessionStorage.getItem("USER_TOKEN"));
            this.loadCharacterList();
        };


        // JSON of all skills
        // var skillList = require('./site_layout/skill_trees/skillsjsn.json');
        // this.sortSkillsByTree(skillList);
        let skills = [];
        axios.get('http://localhost:8080/skills')
            .then(res => {
                skills = [...res.data];
                this.sortSkillsByTree(skills);
                });

        if (localStorage.getItem("character") !== null){
            
            this.loadLocalCharacter()
        }
    }

    componentDidUpdate() {
        console.log("CDU")
        this.saveLocalCharacter()
    }

    // sort skills by tree
    sortSkillsByTree = (skills) => {
        // keys in state currently empty arrays
        for (let key in this.state) {
            for (let skill in skills) {
                // if state key is the same as skill tree
                if (key === skills[skill].tree) {
                    // state is immutable. so, we spread the previous state + add skill to matching key and set state to equal the new array
                    this.setState(prevState => ({
                        [key]: [...prevState[key], skills[skill]]
                    }));
                }
            }
        } 
    };

    saveLocalCharacter = () => {

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

    saveCharacter = (id, alert) => {

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
                console.log(res)
                this.loadCharacterList();
                alert.show("Character Saved", {timeout: 5000, type: 'success'})
            }).catch((err) => {
                console.log(err.response.data)
            })
        
    }

    loadCharacterList = () => {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/characters'})
            .then((res) => {
                console.log(res.data)
                this.setState(() =>({
                    characterList: [...res.data]
                }))

            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }

    loadLocalCharacter = () => {
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

    loadCharacter = (id, alert) => {

        return axios({
            method: 'get',
            url: 'http://localhost:8080/character',
            params: {"id":id}})
            .then((res) => {
                console.log(res.data)
            
                // react doesnt like nested state, so we need to make a nest for our resources first
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

                    craftPoints: res.data.craftPoints,

                    productionPoints: res.data.productionPoints,
                    playerHasSkill: res.data.skills

                }))
                alert.show("Character Loaded", {timeout: 5000, type: 'success'})
            })
            .catch((err) => {
                console.log(err.response.data)
            })

    }

    deleteCharacter = (id, alert) => {

        return axios({
            method: 'delete',
            url: 'http://localhost:8080/character',
            params: {"id":id}})
            .then((res) => {
                console.log(res.data)
                this.loadCharacterList()
                alert.show("Character Deleted", {timeout: 5000, type: 'success'})
            })
            .catch((err) => {
                console.log(err.response.data)
            })

    }

    // updateValue = (stateValue) => {
    //     this.setState(prevState => ({[stateValue]}))
    // }

    characterInfoChange = (infoName, updatedInfo) => {
        this.setState({[infoName]: updatedInfo}, function() {
            this.calculateSkillPointsRemaining();
        });  
    }
    
    calculateBaseSkillPoints = () => { 
        return this.state.level === 1 ? 4 : (this.state.level * 2) + 4
    }

    calculateSkillPointsRemaining = () => {

        var newSkillPointsRemaining = this.calculateBaseSkillPoints();

        newSkillPointsRemaining -= this.calculateSpentSkillPoints();

        //this.setState({skillPointsRemaining: newSkillPointsRemaining});

        return newSkillPointsRemaining;
    }

    calculateSpentSkillPoints = () => {
        var spent = 0;
        var playerSkills = this.state.playerHasSkill;
        var playerResources = this.state.resources;

        for (let skill in playerSkills) {
            spent += playerSkills[skill].cost;
        }

        spent += (playerResources.craftPoints * 2) + (playerResources.productionPoints * 2) + playerResources.magicPoints;

        return spent;
    }


    checkAvailableSkillPoints = (cost, skillPointsRemaining) => {
        return cost < skillPointsRemaining;
    }

    // return true if player meets requirements for skill
    checkRequirements = (skill) => {
    
        let requiredSkill = skill.requires

        // skill does not have a required skill
        if (requiredSkill === "" || requiredSkill === null) {
            return true; 
        }

        let pSkills = this.state.playerHasSkill;

        for (let pSkill in pSkills) {

            if (requiredSkill.includes(pSkills[pSkill].name)) {

                return true;
            }
        }

        return false;
    }
    
    // add/remove skill
    // make sure enough skill points are available
    // make sure requirements are met?
    // add skill to playerHasSkill Array, or remove it
    check = (checkedSkill, e) => {
        console.log(this.state)
        if (!this.checkRequirements(checkedSkill)) {
            console.log("You do not meet the requirements for " + checkedSkill.name)
            return false;
        };
 
        // add or remove skill on checkbox click
        if (e) {

            // check the cost        
            if (this.calculateSkillPointsRemaining() - checkedSkill.cost < 0) {
                console.log("You do not have enough skill points for " + checkedSkill.name);
                return false;
            };

            // add
            return this.addSkill(checkedSkill);
            
        } else {

            // if the skill is required, don't remove it
            if (this.skillIsRequired(checkedSkill)) {
                return true;
            }

            // remove
            return this.removeSkill(checkedSkill);
        }
        // unreachable
        // return true;
    }

    // don't allow player to remove a skillpoint if it's a necessary requirement for another skill the player has
    skillIsRequired = (skill) => {

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
                                    console.log(skill.name + " is a prerequisite for " + pSkills[pSkill].name + ", but player has " + pSkills[pSkill2].name + ", which is also a prerequisite")
                                    return false;
                                }
                            }
                        }
                    }
                        console.log("cannot remove " + skill.name + ". it is a prerequisite for " + pSkills[pSkill].name)
    
                        return true;    
                }
            }

        }

        return false;
    }

    addResource = (resourceName, cost, max) => {

        if (this.calculateSkillPointsRemaining() - cost < 0) {
            this.props.alert.show("You do not have enough skill points", {type:'error'});
            return false;
        };

        if (this.state.resources[resourceName] >= max) {
                console.log(resourceName + " limit reached")
                return false;
        };

        let resources = this.state.resources
        resources[resourceName] += 1;

        this.setState({resources}, () => {this.calculateSkillPointsRemaining()});

        return true;
    }

    removeResource = (resourceName) => {

        if (this.state.resources[resourceName] == 0) {
            console.log("you can't go below 0, you idiot")
            return false;
        }

        let resources = this.state.resources
        resources[resourceName] -= 1;

        this.setState({resources});
    }

    addSkill = (skill) => {

        this.setState({
            playerHasSkill: ([...this.state.playerHasSkill, skill]) }, function ()   {
                this.calculateSkillPointsRemaining()
        });

        //this.props.alert.show("You have acquired the " + skill.name + " skill");
        
        return true;
        }
   
    removeSkill = (skill) => {

        this.setState(prevState => ({
            // filter previous state.playerhasskill array to return a new array without matching skill
            playerHasSkill: prevState.playerHasSkill.filter(arrSkill => arrSkill.name !== skill.name)
        }), function () {
            this.calculateSkillPointsRemaining()
        })

        console.log("You have removed the " + skill.name + " skill")
        return false;
    }


    lockChanges = () => {
        this.props.alert.show("Character editing " + (this.state.locked ? "unl" : "l") + "ocked")
        this.setState(prevState => ({locked: !prevState.locked}));
        this.calculateSkillPointsRemaining();
    }
    
    render() {
        return (
            <div className="App">
                {/* <div style={{
                    display: 'flex',  
                    textAlign: 'center',
                    padding: '10px',
                    flex: '1 100%',
                    flexWrap: 'nowrap'
                }}>
                    <div style={{display: 'flex',
                        background: 'gold',
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        flex: '1 100%',
                        minWidth: 0,
                        whiteSpace: 'initial'}}>
                            BITCH TITS
                    </div>
                    <div style={{textAlign: 'left',
                                background: 'deepskyblue',
                                padding: '10px',
                                flex: '1 100%',
                                minWidth: 0,
                                whiteSpace: 'initial'
                                }}>
                            COCKSUCKER MOTHERFUCKER BIUTCH ASS CUNTING FUCKING WHORE COCK

                    </div>
                    <div style={{display: 'flex',
                        background: 'gold',
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        flex: '1 100%',
                        minWidth: 0,}}>
                            BITCH TITS
                    </div>
                </div> */}
                <Router>
                    <Switch>
                        <Route exact path="/">
                            
                            <Header lockChanges={this.lockChanges} locked={this.state.locked} saveCharacter={this.saveCharacter} loadCharacter={this.loadCharacter} deleteCharacter={this.deleteCharacter} staate={this.state} characterList={this.state.characterList}>

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
                            <Resources resources={this.state.resources}

                            addResource={this.addResource} 

                            removeResource={this.removeResource} 
                            lockChanges={this.state.locked} 
                            
                            MAGIC_POINT_COST={this.state.MAGIC_POINT_COST}
                            PRODUCTION_POINT_COST={this.state.PRODUCTION_POINT_COST}
                            CRAFT_POINT_COST={this.state.CRAFT_POINT_COST}/>
                            
                            <Row>
                                <Col className="skilltree">
                                    <div className="combat">
                                        <h3>Combat</h3>
                                        <SkillTree skills={this.state.combat} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>

                                    <div className="general">
                                        <h3>General</h3>
                                        <SkillTree skills={this.state.general} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>
                                    <div className="nature">
                                        <h3>Nature</h3>
                                        <SkillTree skills={this.state.nature} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>
                                    <div className="necromancy">
                                        <h3>Necromancy</h3>
                                        <SkillTree skills={this.state.necromancy} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>
                                </Col>

                                <Col className="skilltree">

                                    <div className="production">
                                        <h3>Production</h3>
                                        <SkillTree skills={this.state.production} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>
                                    
                                    <div className="aegis">
                                        <h3>Aegis</h3>
                                        <SkillTree skills={this.state.aegis} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>

                                    <div className="battle">
                                        <h3>Battle</h3>
                                        <SkillTree skills={this.state.battle} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>
                                </Col>

                                <Col className="skilltree">

                                    <div className="roleplaying">
                                        <h3>Roleplaying</h3>
                                        <SkillTree skills={this.state.roleplaying} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>

                                    <div className="compulsion">
                                        <h3>Compulsion</h3>
                                        <SkillTree skills={this.state.compulsion} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>
                
                                    <div className="restoration">
                                        <h3>Restoration</h3>
                                        <SkillTree skills={this.state.restoration} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
                                    </div>

                                    <div className="enchantment">
                                        <h3>Enchantment</h3>
                                        <SkillTree skills={this.state.enchantment} playerSkills={this.state.playerHasSkill} check={this.check} lockChanges={this.state.locked} />
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
