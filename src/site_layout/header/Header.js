import React from 'react';
import Navigation from './Navigation';
import {Container} from 'reactstrap';

// Header contains our title and the Navigation bar

class Header extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <div className="header-title">
                        <h1>KINGDOMS OF NOVITAS</h1>
                        <h2>Online Character Sheet | Skill Calculator</h2>
                    </div>
                    <Navigation 
                        lockChanges={this.props.lockChanges} 
                        resetSkills={this.props.resetSkills}
                        locked={this.props.locked} 
                        saveCharacter={this.props.saveCharacter} 
                        loadCharacter={this.props.loadCharacter} 
                        deleteCharacter={this.props.deleteCharacter} 
                        characterList={this.props.characterList} 
                        loadCharacterList={this.props.loadCharacterList}
                        // passed to button for testing
                        // staate={this.props.staate}
                        />
                </Container>
            </div>
        )
    }
}

// Nav.propTypes = {
//     lockChanges: PropTypes.func.isRequired
// }

export default Header;