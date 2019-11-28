import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
    // NavbarText
} from 'reactstrap';

function Navigation(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar navbar-dark" light expand="md">

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem >
              <NavLink href="http://kingdomsofnovitas.net/">kingdomsofnovitas.net</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="https://www.facebook.com/groups/KingdomsOfNovitas/">Facebook</NavLink>
            </NavItem>

            <NavItem>
                <NavLink>
                    {/* this might be my favorite piece of code that I've ever written */}
                     <button className="navButton" onClick={props.lockChanges} >{props.locked ? "Unl" : "L"}ock Skill Editing</button>
                </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Save/Load/Login
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          {/* <NavbarText>Simple Text</NavbarText> */}

        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;