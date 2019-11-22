import React from 'react';
import Nav from './layout/Nav';
import Header from './layout/Header';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, } from 'reactstrap';

import SkillTree from './skill_trees/SkillTree';

 class App extends React.Component {
    state = {
        // character info
            name: "",
            race: "",
            player: "",
            country: "",
            level: 1,
            skillPointsRemaining: 4,
            savedXP: 0,

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
        resource: [],
        playerHasSkill: []
    }

    componentDidMount() {
        // JSON of all skills
        var skillList = require('./skill_trees/jason.json');
        this.sortSkillsByTree(skillList);
        // let skills = [];
        // axios.get('http://localhost:8080/skills')
        //     .then(res => {
        //         skills = [...res.data];
        //         this.sortSkillsByTree(skills);
        //         console.log(this.state)});
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
        this.setState({level: newLevel});
        this.calculateSkillPointsRemaining();
    }
    
    calculateSkillPointsRemaining = () => {
        this.setState(prevState => ({
            skillPointsRemaining: (prevState.level * 2) + 4 }));
        console.log(this.state);
    }


    checkAvailableSkillPoints = () => {}
    checkRequirements = () => {}
    
    // add/remove skill
    check = (skill) => {
        this.setState({
            playerHasSkill: ([...this.state.playerHasSkill, skill]) });
    }


    lockChanges = () => {
        this.setState(prevState => ({locked: !prevState.locked}));
        this.calculateSkillPointsRemaining();
    }
    
    render() {
        return (
            <div className="App">
                <Nav lockChanges={this.lockChanges}></Nav>

                <Header skillPointsRemaining={this.state.skillPointsRemaining}
                        level={this.state.level}
                        setLevel={this.setLevel}
                        calculateSkillPointsRemaining={this.calculateSkillPointsRemaining}></Header>

                <Container>
                    <div className="resourcebox">
                        <h3 className="resources">Resources</h3>
                        <Row className="d-flex justify-content-center">
                            <div>Magic Power</div>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <div>Production</div>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <div>Craft</div>
                        </Row>
                    </div>
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

                            <div className="resources">
                                <h3>Resources</h3>
                                <SkillTree skills={this.state.resource} check={this.check} lockChanges={this.state.locked} />
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
