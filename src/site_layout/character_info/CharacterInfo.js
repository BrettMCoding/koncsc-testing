import React, {Component} from 'react';
import { Container, Row, Col, } from 'reactstrap';
import PropTypes from 'prop-types';
import Level from './Level';

export class CharacterInfo extends Component {
    
    render() {

        return (
            <div>
                <Container>
                        <Row>
                            <Col>
                                <div className="characterinfo-box">
                                <div className="characterinfo-content">
                                    <Row>
                                        <Col>
                                            <div>
                                                Character Name: <input type="text" placeholder="enter a name" id="item"></input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>Race: <input type="text" placeholder="enter a race" id="item"></input></div>
                                        </Col>

                                        <Col>
                                            <div>Country: <input type="text" placeholder="enter a country" id="item"></input></div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>Player: <input type="text" placeholder="enter a player name" id="item"></input></div>
                                        </Col>
                                        
                                        <Col>
                                            <Level level={this.props.level} setLevel={this.props.setLevel}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="skillpointsremaining">Skill Points Remaining: <input type="text" readOnly={true} placeholder={this.props.calculateSkillPointsRemaining()} id="item"></input></div>
                                        </Col>
                                        
                                        <Col>
                                            <div>Saved XP: <input type="text" placeholder="0" id="item"></input></div>
                                        </Col>
                                    </Row>
                                </div>
                                </div>
                            </Col>
                        </Row>
                </Container>
            </div>
        )
    }
}

export default CharacterInfo