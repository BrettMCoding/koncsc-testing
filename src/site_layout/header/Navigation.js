import React, { useState } from 'react';
import UserLoginLogoutComponent from '../user_management/components/UserLoginLogoutComponent'
import LoginComponent from '../user_management/components/LoginComponent';
import LogoutComponent from '../user_management/components/LogoutComponent';
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
    // NavbarText
} from 'reactstrap';
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../user_management/services/AuthenticationService';
import AuthenticationService from '../user_management/services/AuthenticationService';


function Navigation(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(isUserLoggedIn ? false : !modal);

  const [isUserLoggedIn, setUserLoggedIn] = useState(AuthenticationService.isUserLoggedIn());

    const getUserLoggedInProp = (boolean) => {
        setUserLoggedIn(boolean);
    }

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
                     <button className="navButton" onClick={props.lockChanges} >{props.locked ? "Unl" : "L"}ock Editing</button>
                </NavLink>
            </NavItem>

            <NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Save Character
                </DropdownToggle>
                <DropdownMenu right>
                    {/*
                        LIST OF CHARACTERS
                         <DropdownItem>
                    
                    </DropdownItem>
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    Reset
                    </DropdownItem> */}
                </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>

            <NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Load Character
                </DropdownToggle>
                <DropdownMenu right>
                    {/*
                        LIST OF CHARACTERS
                         <DropdownItem>
                    
                    </DropdownItem>
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    Reset
                    </DropdownItem> */}
                </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>

            <NavItem> 
                
                {isUserLoggedIn && <LogoutComponent isUserLoggedIn={isUserLoggedIn} getUserLoggedInProp={getUserLoggedInProp} />}

                {!isUserLoggedIn && <Button color="success" onClick={toggleModal}>Login</Button>}

                <Modal isOpen={modal} toggle={toggleModal} className="">
                    <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LoginComponent isUserLoggedIn={isUserLoggedIn} getUserLoggedInProp={getUserLoggedInProp} toggleModal={toggleModal}/>
                    </ModalBody>
                    <ModalFooter>
                            <Button className=" m-auto w-50 " color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </NavItem>
          </Nav>

          {/* <NavbarText>Simple Text</NavbarText> */}

        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;