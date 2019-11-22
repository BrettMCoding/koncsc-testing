import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Nav extends React.Component {
    render() {
        return (
            <div>
                <Container>
                        {/* lock skill changes */}
                        <input type="checkbox" onChange={this.props.lockChanges.bind(this)}/>
                    <h1>KINGDOMS OF NOVITAS</h1>
                    <h2>Character Sheet | Skill Calculator</h2>
                    <p> login logout save load help rules forum facebook</p>
                </Container>
            </div>
        )
    }
}

Nav.propTypes = {
    lockChanges: PropTypes.func.isRequired
}

export default Nav;