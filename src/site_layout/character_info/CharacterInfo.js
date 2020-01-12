import React, {Component} from 'react';
import { Container, Row, Col, } from 'reactstrap';
import PropTypes from 'prop-types';
import CharacterInfoInput from './CharacterInfoInput';

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
                                            <CharacterInfoInput 
                                                className="inputbox"
                                                displayName="Character Name"
                                                infoName="characterName" 
                                                infoValue={this.props.characterName}
                                                maxLength="33"
                                                placeholder="Enter a Character Name"
                                                characterInfoChange={this.props.characterInfoChange}
                                                lockChanges={this.props.lockChanges}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <CharacterInfoInput 
                                                className="inputbox"
                                                displayName="Race"
                                                infoName="race" 
                                                infoValue={this.props.race}
                                                maxLength="33"
                                                placeholder="Enter a Race"
                                                characterInfoChange={this.props.characterInfoChange}/>
                                        </Col>

                                        <Col>
                                            <CharacterInfoInput 
                                            className="inputbox"
                                            displayName="Country"
                                            infoName="country" 
                                            infoValue={this.props.country}
                                            maxLength="33"
                                            placeholder="Enter a Country"
                                            characterInfoChange={this.props.characterInfoChange}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <CharacterInfoInput 
                                            className="inputbox"
                                            displayName="Player"
                                            infoName="player" 
                                            infoValue={this.props.player}
                                            maxLength="33"
                                            placeholder="Enter a player name"
                                            characterInfoChange={this.props.characterInfoChange}/>
                                        </Col>
                                        
                                        <Col>
                                            <CharacterInfoInput 
                                            className="inputbox"
                                            displayName="Level"
                                            infoName="level" 
                                            infoValue={this.props.level}
                                            maxLength="3"
                                            placeholder="0"
                                            characterInfoChange={this.props.characterInfoChange}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="skillpointsremaining">Skill Points Remaining: {this.props.calculateSkillPointsRemaining()}</div>
                                        </Col>
                                        
                                        <Col>
                                            <CharacterInfoInput 
                                                className="inputbox"
                                                displayName="Saved XP"
                                                infoName="savedXp" 
                                                infoValue={this.props.savedXp}
                                                maxLength="33"
                                                placeholder="0"
                                                characterInfoChange={this.props.characterInfoChange}/>
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