import React from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'

export default function ConfirmationModal(props) {


    return (
        <div>
            <Modal isOpen={props.confirmationModalIsOpen} toggle={props.toggleConfirmationModalIsOpen}>
                <ModalBody>
                    {props.message}
                </ModalBody>
                <ModalFooter>
                    <Button className=" m-auto w-50 " color="secondary" onClick={props.toggleConfirmationModalIsOpen}>Cancel</Button>
                    <Button className=" m-auto w-50 " color="success" onClick={() => {props.handleCharacter(); props.toggleConfirmationModalIsOpen()}}>Confirm</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
