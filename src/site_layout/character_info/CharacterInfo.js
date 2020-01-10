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
                                            <div className="inputbox">
                                                Character Name: <input type="text" maxLength="33" placeholder="enter a name" id="item"></input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="inputbox">Race: <input type="text" maxLength="33" placeholder="enter a race" id="item"></input></div>
                                        </Col>

                                        <Col>
                                            <div className="inputbox">Country: <input type="text" maxLength="33"placeholder="enter a country" id="item"></input></div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="inputbox">Player: <input type="text" maxLength="33" placeholder="enter a player name" id="item"></input></div>
                                        </Col>
                                        
                                        <Col>
                                            <Level className="inputbox" level={this.props.level} setLevel={this.props.setLevel}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="skillpointsremaining">Skill Points Remaining: {this.props.calculateSkillPointsRemaining()}</div>
                                        </Col>
                                        
                                        <Col>
                                            <div className="inputbox">Saved XP: <input type="text" maxLength="33" placeholder="0" id="item"></input></div>
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