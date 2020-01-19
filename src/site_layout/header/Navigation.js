import React, { useState, useRef } from 'react';
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
  Fade,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
    // NavbarText
} from 'reactstrap';
import {useSpring, animated, useChain, useTransition } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../user_management/services/AuthenticationService';
import AuthenticationService from '../user_management/services/AuthenticationService';
import NavCharacterList from '../user_management/components/NavCharacterList';
import ConfirmationModal from '../user_management/components/ConfirmationModal';
import { useAlert } from 'react-alert';
import { isAbsolute } from 'path';


function Navigation(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);

  const alert = useAlert();

  const logs = () => {console.log(props.staate)}

  const toggle = () => setIsOpen(!isOpen);

  // login modal
  const toggleModal = () => setModal(isUserLoggedIn ? false : !modal);

  // confirmation
  const toggleConfirmationModalIsOpen = () => {
    setConfirmationModalIsOpen(!confirmationModalIsOpen)};

  const [handleMethod, setHandleMethod] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);

  const setCurrentConfirmationModal = (handleMethod, message, id) => {
    setHandleMethod(() => handleMethod);
    setMessage(message);
    setId(id);
    toggleConfirmationModalIsOpen();
  }

  const [isUserLoggedIn, setUserLoggedIn] = useState(AuthenticationService.isUserLoggedIn());

    const getUserLoggedInProp = (boolean) => {
        setUserLoggedIn(boolean);
    }

  // ANIMATION WORK
  const anim = useSpring({opacity: isUserLoggedIn ? 1 : 0, size: isUserLoggedIn ? '0%' : ' 100%' })

  const saveLoadDeleteAnimation = useSpring({opacity: isUserLoggedIn ? 1 : 0})

  // using react-spring render-props API to make an animation transition
  // this will hide the character list features when user is not logged in
  const hideWhenNotLoggedInWrap = (content) => {
    return <div><Transition
    items={isUserLoggedIn}
    from={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}>
    {isUserLoggedIn => isUserLoggedIn && ((transitionProps) => <animated.div style={transitionProps}> 
        {/* below content arg is whatever element we want to show when user logs in */}
        {content}

    </animated.div>)}</Transition></div>
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
                { isUserLoggedIn && <LogoutComponent getUserLoggedInProp={getUserLoggedInProp} /> }
            </NavItem>

            <NavItem>
                { !isUserLoggedIn &&<Button color="success" onClick={toggleModal}>Login</Button>}
            </NavItem>

            {hideWhenNotLoggedInWrap(
                <NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Save Character
                </DropdownToggle>
                <DropdownMenu right>
                    <NavCharacterList characterList={props.characterList} handleCharacter={props.saveCharacter} setCurrentConfirmationModal={setCurrentConfirmationModal} message={"Are you sure you want to save this character? (Character in slot: "}/>
                    <div onClick={()=>{setCurrentConfirmationModal(props.saveCharacter, "Are you sure you want to save a new character?")}}>New Character</div>
                </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
            )}
            {hideWhenNotLoggedInWrap(
            <NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Load Character
                </DropdownToggle>
                <DropdownMenu right>
                    <NavCharacterList characterList={props.characterList} handleCharacter={props.loadCharacter} setCurrentConfirmationModal={setCurrentConfirmationModal} message={"Are you sure you want to load this character? (Character: "}/>
                </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
            )}
            {hideWhenNotLoggedInWrap(
            <NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Delete Character
                    </DropdownToggle>
                    <DropdownMenu right>
                        <NavCharacterList characterList={props.characterList} handleCharacter={props.deleteCharacter} setCurrentConfirmationModal={setCurrentConfirmationModal} message={"Are you sure you want to load this character? (Character: "}/>
                    </DropdownMenu>
                    </UncontrolledDropdown>
            </NavItem>
            )}
          <NavItem>
                <NavLink>
                     <button className="navButton" onClick={logs} > log state</button>
                </NavLink>
                <NavLink>
                     <button className="navButton" onClick={() => {debugger}} > debugger</button>
                </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
                
                {/* // login modal */}
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LoginComponent isUserLoggedIn={isUserLoggedIn} getUserLoggedInProp={getUserLoggedInProp} toggleModal={toggleModal}/>
                    </ModalBody>
                    <ModalFooter>
                            <Button className=" m-auto w-50 " color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

         
                <ConfirmationModal confirmationModalIsOpen={confirmationModalIsOpen}
                toggleConfirmationModalIsOpen={toggleConfirmationModalIsOpen}
                handleCharacter={handleMethod} message={message} id={id} alert={alert} />
               
        </Navbar>
    </div>
  );
}

export default Navigation;