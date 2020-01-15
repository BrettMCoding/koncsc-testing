import React from 'react';
import Navigation from './Navigation';
// import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, } from 'reactstrap';
import {Container} from 'reactstrap';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <h1>KINGDOMS OF NOVITAS</h1>
                    <h2>Online Character Sheet | Skill Calculator</h2>
                    <Navigation lockChanges={this.props.lockChanges} locked={this.props.locked} saveCharacter={this.props.saveCharacter} loadCharacter={this.props.loadCharacter} deleteCharacter={this.props.deleteCharacter} staate={this.props.staate}
                    characterList={this.props.characterList}/>
                </Container>
            </div>
        )
    }
}

// Nav.propTypes = {
//     lockChanges: PropTypes.func.isRequired
// }

export default Header;