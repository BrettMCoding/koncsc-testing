import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Header() {
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
                                    <div>Level: <input type="text" placeholder="enter a level" id="item"></input></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div>Skill Points Remaining: <input type="text" placeholder="0" id="item"></input></div>
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