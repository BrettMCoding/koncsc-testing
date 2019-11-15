import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Row, Col, } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <Container>
                <h1>KINGDOMS OF NOVITAS</h1>
                <h2>Character Sheet | Skill Calculator</h2>
                <p> login logout save load help rules forum facebook</p>
            </Container>
        </div>
    )
}