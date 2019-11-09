import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, } from 'reactstrap';


import SkillTree from './skill_trees/SkillTree';

 class App extends React.Component {
    state = {
        // skills: [],
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
                        <Col>
                            <h3>Combat</h3>
                            <SkillTree skills={this.state.combat} />
                        </Col>

                        <Col>
                            <h3>General</h3>
                            <SkillTree skills={this.state.general} />
                        </Col>
                    </Row>

                    <h3>Production</h3>
                    <SkillTree skills={this.state.production} />

                    <h3>Roleplaying</h3>
                    <SkillTree skills={this.state.roleplaying} />

                    <h3>Aegis</h3>
                    <SkillTree skills={this.state.aegis} />

                    <h3>Battle</h3>
                    <SkillTree skills={this.state.battle} />

                    <h3>Nature</h3>
                    <SkillTree skills={this.state.nature} />

                    <h3>Necromancy</h3>
                    <SkillTree skills={this.state.necromancy} />

                    <h3>Compulsion</h3>
                    <SkillTree skills={this.state.compulsion} />

                    <h3>Restoration</h3>
                    <SkillTree skills={this.state.restoration} />

                    <h3>Enchantment</h3>
                    <SkillTree skills={this.state.enchantment} />

                    <h3>Resources</h3>
                    <SkillTree skills={this.state.resource} />
                </Container>
            </div>
        );
    }
}

export default App;
