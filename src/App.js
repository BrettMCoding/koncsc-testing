import React from 'react';
import Header from './layout/Header';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, } from 'reactstrap';

import SkillTree from './skill_trees/SkillTree';

 class App extends React.Component {
    state = {
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
        resource: []
    }

    componentDidMount() {
        // JSON of all skills
        var skillList = require('./skill_trees/skillList.json');
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
        for (let key in this.state) {
            for (let skill in skills) {

                // skills[skill].name = 
                //     this.renderSkillWhitespace(skills[skill].name)

                if (key === skills[skill].tree) {
                    this.setState(prevState => ({
                        [key]: [...prevState[key], skills[skill]]
                    }));
                }
            }
        } 
    };

    renderSkillWhitespace = (string) => {
        let newString = "";
        // match whitespace at start of string
        if (string.match(/(^\s+)/) !== null) {
            
            let match = string.match(/(^\s+)/)[0];
            // for each whitespace, add a non-breaking space
            for (let i = 0; i < match.length; i++) {
                newString += "&nbsp;"
            }
        }
        return newString += string;
    }


    render() {
        return (
            <div className="App">

                <Header></Header>

                <Container>
                    <Row>
                        <Col className="skilltree">
                            <div className="combat">
                                <h3>Combat</h3>
                                <SkillTree skills={this.state.combat} />
                            </div>

                            <div className="general">
                                <h3>General</h3>
                                <SkillTree skills={this.state.general} />
                            </div>
                            <div className="nature">
                                <h3>Nature</h3>
                                <SkillTree skills={this.state.nature} />
                            </div>
                            <div className="necromancy">
                                <h3>Necromancy</h3>
                                <SkillTree skills={this.state.necromancy} />
                            </div>
                        </Col>

                        <Col className="skilltree">

                            <div className="production">
                                <h3>Production</h3>
                                <SkillTree skills={this.state.production} />
                            </div>
                            
                            <div className="aegis">
                                <h3>Aegis</h3>
                                <SkillTree skills={this.state.aegis} />
                            </div>

                            <div className="battle">
                                <h3>Battle</h3>
                                <SkillTree skills={this.state.battle} />
                            </div>

                            <div className="resources">
                                <h3>Resources</h3>
                                <SkillTree skills={this.state.resource} />
                            </div>
                        </Col>

                        <Col className="skilltree">

                            <div className="roleplaying">
                                <h3>Roleplaying</h3>
                                <SkillTree skills={this.state.roleplaying} />
                            </div>

                            <div className="compulsion">
                                <h3>Compulsion</h3>
                                <SkillTree skills={this.state.compulsion} />
                            </div>
        
                            <div className="restoration">
                                <h3>Restoration</h3>
                                <SkillTree skills={this.state.restoration} />
                            </div>

                            <div className="enchantment">
                                <h3>Enchantment</h3>
                                <SkillTree skills={this.state.enchantment} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
