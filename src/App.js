import React from 'react';
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
        let skills = [];
        axios.get('http://localhost:8080/skills')
            .then(res => {
                skills = [...res.data];
                this.sortSkillsByTree(skills);
                console.log(this.state)});
    }

    // sort skills by tree
    sortSkillsByTree = (skills) => {
        for (let key in this.state) {
            for (let skill in skills) {
                if (key === skills[skill].tree) {
                    this.setState(prevState => ({
                        [key]: [...prevState[key], skills[skill]]
                    }));
                }
            }
        } 
    };

    render() {
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col className="skilltree">
                            <h3>Combat</h3>
                            <SkillTree skills={this.state.combat} />
                        </Col>

                        <Col className="skilltree">
                            <h3>General</h3>
                            <SkillTree skills={this.state.general} />
                        </Col>

                        <Col className="skilltree">
                            <h3>Production</h3>
                            <SkillTree skills={this.state.production} />
                        </Col>
                    </Row>

                    <Row>
                        <Col className="skilltree">
                            <h3>Roleplaying</h3>
                            <SkillTree skills={this.state.roleplaying} />
                        </Col>

                        <Col className="skilltree">                        
                            <h3>Aegis</h3>
                            <SkillTree skills={this.state.aegis} />
                        </Col>

                        <Col className="skilltree">                            
                            <h3>Battle</h3>
                            <SkillTree skills={this.state.battle} />
                        </Col>
                    </Row>

                    <Row>
                        <Col className="skilltree">
                            <h3>Nature</h3>
                            <SkillTree skills={this.state.nature} />
                        </Col>

                        <Col className="skilltree">
                            <h3>Necromancy</h3>
                            <SkillTree skills={this.state.necromancy} />
                        </Col>

                        <Col className="skilltree">
                            <h3>Compulsion</h3>
                            <SkillTree skills={this.state.compulsion} />
                        </Col>
                    </Row>

                    <Row>
                        <Col className="skilltree">
                            <h3>Restoration</h3>
                            <SkillTree skills={this.state.restoration} />
                        </Col>

                        <Col className="skilltree">
                            <h3>Enchantment</h3>
                            <SkillTree skills={this.state.enchantment} />
                        </Col>

                        <Col className="skilltree">
                            <h3>Resources</h3>
                            <SkillTree skills={this.state.resource} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
