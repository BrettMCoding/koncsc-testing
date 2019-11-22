import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Level from './character_info/Level';

export class Header extends Component {

    render() {
        return (
            <div>
                <Container>
                    <header className="header">
                        <Row>
                            <Col>
                                <div className="characterinfo">
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
                                        {/* <div>Level: <input type="text" 
                                            value={this.propTypes.level}placeholder="enter a level" 
                                            id="item" 
                                            onChange={this.propTypes
                                                .updateValue("level")}
                                            ></input>
                                        </div> */}
                                        <Level level={this.props.level} setLevel={this.props.setLevel}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="skillpointsremaining">Skill Points Remaining: <input type="text" readOnly="true" placeholder={this.props.skillPointsRemaining} id="item"></input></div>
                                    </Col>
                                    
                                    <Col>
                                        <div>Saved XP: <input type="text" placeholder="0" id="item"></input></div>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                            {/* <Col xs="4"> */}
                                {/* <div className="navinfo"> */}

                                {/* </div> */}
                                {/* <Link to="/">Home</Link> | <Link to="/about">About</Link> */}
                            {/* </Col> */}
                        </Row>
                    </header>
                </Container>
            </div>
        )
    }
}

Header.propTypes = {
    skillPointsRemaining: PropTypes.number.isRequired
}

export default Header