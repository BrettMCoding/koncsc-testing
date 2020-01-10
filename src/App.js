import React from 'react';
import { Container, Row, Col, } from 'reactstrap';
import Header from './site_layout/header/Header';
import CharacterInfo from './site_layout/character_info/CharacterInfo';
import Resources from './site_layout/resources/Resources';
import SkillTree from './site_layout/skill_trees/SkillTree';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';


 class App extends React.Component {
    state = {
        // character info
            name: "",
            race: "",
            player: "",
            country: "",
            level: 1,
            savedXP: 0,

            // With resources, the cost is set in state, and not in the database. ...For now.

            // RESOURCES
            resources: {
                magicPoints: 5,
                craftPoints: 0,
                productionPoints: 0,
            },
                MAGIC_POINT_COST: 1,
                CRAFT_POINT_COST: 2,
                PRODUCTION_POINT_COST:2,

        locked: false,
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
        enchantment: [],
        playerHasSkill: []
    }

    componentDidMount() {
        // JSON of all skills
        // var skillList = require('./site_layout/skill_trees/skillsjsn.json');
        // this.sortSkillsByTree(skillList);
        let skills = [];
        axios.get('http://localhost:8080/skills')
            .then(res => {
                skills = [...res.data];
                this.sortSkillsByTree(skills);
                console.log(this.state)});
    }

    componentDidUpdate() {
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

    saveCharacter = () => {}
    loadCharacter = (character) => {}

    // updateValue = (stateValue) => {
    //     this.setState(prevState => ({[stateValue]}))
    // }

    setLevel = (newLevel) => {
        this.setState({level: newLevel}, function() {
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

    checkRequirements = (skill) => {

        let requiredSkill = skill.requires

        if (requiredSkill === "" || requiredSkill === null) {
            
            return true; 

        }

        if (this.state.playerHasSkill
            .find(skill => skill.name === requiredSkill) !== undefined) {
            
            return true;

        } else {
           
            return false;

        }
    
        //  unreachable
        // console.log('error in checkRequirements Function');
        // return  0;
    }
    
    // add/remove skill
    // make sure enough skill points are available
    // make sure requirements are met?
    // add skill to playerHasSkill Array, or remove it
    check = (checkedSkill, e) => {
        if (!this.checkRequirements(checkedSkill)) {
            console.log("You do not meet the requirements for " + checkedSkill.name)
            return false;
        };
 
        if (e) {        
            if (this.calculateSkillPointsRemaining() - checkedSkill.cost < 0) {
                console.log("You do not have enough skill points for " + checkedSkill.name);
                return false;
            };
            return this.addSkill(checkedSkill);
        } else {
            if (this.skillIsRequired(checkedSkill)) {
                return true;
            }

            return this.removeSkill(checkedSkill);
        }
        // unreachable
        // return true;
    }

    skillIsRequired = (skill) => {
        for (let playerSkill in this.state.playerHasSkill) {
            let requirement = this.state.playerHasSkill[playerSkill].requires
            if (skill.name === requirement) {
                console.log("cannot remove " + skill.name + ". it is a prerequisite for " + this.state.playerHasSkill[playerSkill].name)
                return true;
            }
        }

        return false;
    }

    addResource = (resourceName, cost, max) => {

        if (this.calculateSkillPointsRemaining() - cost < 0) {
            console.log("You do not have enough skill points for " + resourceName);
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
        console.log(this.state.resources)

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

        console.log("You have acquired the " + skill.name + " skill");
        return true;
        }
   
    removeSkill = (skill, resourceFlag) => {
        // if it's a resource, remove one copy
        if (resourceFlag) {
            this.setState(prevState => ({
                // filter previous state.playerhasskill array to return a new array without first index of matching skill(resource, in this case)
                playerHasSkill: prevState.playerHasSkill.filter((arrSkill, index) => prevState.playerHasSkill.indexOf(skill) !== index)
            }), function () {
                this.calculateSkillPointsRemaining()
            })
            console.log("You have removed one point of the " + skill.name + " skill")
            return true;
        }

        this.setState(prevState => ({
            // filter previous state.playerhasskill array to return a new array without matching skill
            playerHasSkill: prevState.playerHasSkill.filter(arrSkill => arrSkill !== skill)
        }), function () {
            this.calculateSkillPointsRemaining()
        })

        console.log("You have removed the " + skill.name + " skill")
        return false;
    }


    lockChanges = () => {
        this.setState(prevState => ({locked: !prevState.locked}));
        this.calculateSkillPointsRemaining();
    }
    
    render() {
        return (
            <div className="App">
                <Header lockChanges={this.lockChanges} locked={this.state.locked}>

                </Header>

                <CharacterInfo
                        level={this.state.level}
                        setLevel={this.setLevel}
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
                                <SkillTree skills={this.state.combat} check={this.check} lockChanges={this.state.locked} />
                            </div>

                            <div className="general">
                                <h3>General</h3>
                                <SkillTree skills={this.state.general} check={this.check} lockChanges={this.state.locked} />
                            </div>
                            <div className="nature">
                                <h3>Nature</h3>
                                <SkillTree skills={this.state.nature} check={this.check} lockChanges={this.state.locked} />
                            </div>
                            <div className="necromancy">
                                <h3>Necromancy</h3>
                                <SkillTree skills={this.state.necromancy} check={this.check} lockChanges={this.state.locked} />
                            </div>
                        </Col>

                        <Col className="skilltree">

                            <div className="production">
                                <h3>Production</h3>
                                <SkillTree skills={this.state.production} check={this.check} lockChanges={this.state.locked} />
                            </div>
                            
                            <div className="aegis">
                                <h3>Aegis</h3>
                                <SkillTree skills={this.state.aegis} check={this.check} lockChanges={this.state.locked} />
                            </div>

                            <div className="battle">
                                <h3>Battle</h3>
                                <SkillTree skills={this.state.battle} check={this.check} lockChanges={this.state.locked} />
                            </div>
                        </Col>

                        <Col className="skilltree">

                            <div className="roleplaying">
                                <h3>Roleplaying</h3>
                                <SkillTree skills={this.state.roleplaying} check={this.check} lockChanges={this.state.locked} />
                            </div>

                            <div className="compulsion">
                                <h3>Compulsion</h3>
                                <SkillTree skills={this.state.compulsion} check={this.check} lockChanges={this.state.locked} />
                            </div>
        
                            <div className="restoration">
                                <h3>Restoration</h3>
                                <SkillTree skills={this.state.restoration} check={this.check} lockChanges={this.state.locked} />
                            </div>

                            <div className="enchantment">
                                <h3>Enchantment</h3>
                                <SkillTree skills={this.state.enchantment} check={this.check} lockChanges={this.state.locked} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
