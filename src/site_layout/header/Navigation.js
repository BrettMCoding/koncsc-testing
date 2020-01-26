import React, { useState } from 'react';
import LoginComponent from '../user_management/components/LoginComponent';
import LogoutComponent from '../user_management/components/LogoutComponent';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
    // NavbarText
} from 'reactstrap';
import { animated } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
import AuthenticationService from '../user_management/services/AuthenticationService';
import NavCharacterList from '../user_management/components/NavCharacterList';
import ConfirmationModal from '../user_management/components/ConfirmationModal';
import { useAlert } from 'react-alert';

// Navigation is the house for our character / user management

function Navigation(props) {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [skillResetModalIsOpen, setSkillResetModalIsOpen] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);

  // alert popup system
  const alert = useAlert();

  // log state test button
  // const logs = () => {console.log(props.staate)}

  // navbar collapse/expand
  const toggleNavbar = () => setNavbarIsOpen(!navbarIsOpen);

  // login modal
  const toggleLoginModal = () => setLoginModalIsOpen(isUserLoggedIn ? false : !loginModalIsOpen);

  // skill reset modal
  const toggleSkillResetModalIsOpen = () => {
    setSkillResetModalIsOpen(!skillResetModalIsOpen)};

  // confirmation modal
  // the confirmationModal is setup to handle Save/Load/Delete based on the user 
  // clicking a character in one of our NavCharacterLists
  const toggleConfirmationModalIsOpen = () => {
    setConfirmationModalIsOpen(!confirmationModalIsOpen)};
    
    // handleMethod is Save/Load/Delete character, set by whichever list option is clicked
    const [handleMethod, setHandleMethod] = useState("");
    // message is added to confirmationModal as "are you sure you want to save/load/delete?" similarly to the handleMethod
    const [message, setMessage] = useState("");
    // id is added to confirmationModal, 
    const [id, setId] = useState(null);

  // when the user clicks to save/load/delete a character,
  // a confirmationModal is setup with the following args
  // and then displayed to make sure the user meant to take that action 
  const setCurrentConfirmationModal = (handleMethod, message, id) => {
    setHandleMethod(() => handleMethod);
    setMessage(message);
    setId(id);
    toggleConfirmationModalIsOpen();
  }

  // local state isUserLoggedIn is a little clunky, but updating local State makes rendering changes
  // to the buttons and lists easier
  const [isUserLoggedIn, setUserLoggedIn] = useState(AuthenticationService.isUserLoggedIn());
  const getUserLoggedInProp = (boolean) => {
    setUserLoggedIn(boolean);
  }

  // using react-spring render-props API to make an animation transition
  // this will hide the character list features when user is not logged in
  const hideWhenNotLoggedInWrap = (content) => {
      // Transition object controls opacity animation.
      // Used to show/hide content on login/logout
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
        <NavbarToggler onClick={toggleNavbar} />

        <Collapse isOpen={navbarIsOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem >
              <NavLink href="http://kingdomsofnovitas.net/">kingdomsofnovitas.net</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="https://www.facebook.com/groups/KingdomsOfNovitas/">Facebook</NavLink>
            </NavItem>

            <NavItem>
                <NavLink>
                     <button className="navButton" onClick={toggleSkillResetModalIsOpen} >Reset Skills</button>
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink>
                     <button className="navButton" onClick={props.lockChanges} >{props.locked ? "Unl" : "L"}ock Editing</button>
                </NavLink>
            </NavItem>

            <NavItem>
                { isUserLoggedIn && <LogoutComponent getUserLoggedInProp={getUserLoggedInProp} /> }
            </NavItem>

            <NavItem>
                { !isUserLoggedIn &&<Button color="success" onClick={toggleLoginModal}>Login</Button>}
            </NavItem>

            {hideWhenNotLoggedInWrap(
                <NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Save Character
                </DropdownToggle>
                <DropdownMenu right>
                    <NavCharacterList characterList={props.characterList} handleCharacter={props.saveCharacter} setCurrentConfirmationModal={setCurrentConfirmationModal} message={"Are you sure you want to save this character? (Character in slot: "}/>
                    <div className="character-list-slot btn-success btn-sm" onClick={()=>{setCurrentConfirmationModal(props.saveCharacter, "Are you sure you want to save a new character?")}}>New Character</div>
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
          </Nav>
        </Collapse>
                
                {/* // login modal */}
                <Modal isOpen={loginModalIsOpen} toggle={toggleLoginModal}>
                    <ModalHeader toggle={toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <LoginComponent isUserLoggedIn={isUserLoggedIn} getUserLoggedInProp={getUserLoggedInProp} toggleModal={toggleLoginModal} loadCharacterList={props.loadCharacterList}/>
                    </ModalBody>
                    <ModalFooter>
                            <Button className=" m-auto w-50 " color="secondary" onClick={toggleLoginModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/* confirm skill reset modal */}
                <Modal isOpen={skillResetModalIsOpen} toggle={toggleSkillResetModalIsOpen}>
                    <ModalBody>
                        <div>Are you sure you want to reset your skills? (Unsaved changes will be lost)</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className=" m-auto w-50 " color="secondary" onClick={props.toggleConfirmationModalIsOpen}>Cancel</Button>
                        <Button className=" m-auto w-50 " color="success" onClick={() => {props.resetSkills(); toggleSkillResetModalIsOpen();}}>Reset Skills</Button>
                    </ModalFooter>
                </Modal>

                {/* confirm save/load/delete modal */}
                <ConfirmationModal confirmationModalIsOpen={confirmationModalIsOpen}
                toggleConfirmationModalIsOpen={toggleConfirmationModalIsOpen}
                handleCharacter={handleMethod} message={message} id={id} alert={alert} />
               
        </Navbar>
    </div>
  );
}

export default Navigation;