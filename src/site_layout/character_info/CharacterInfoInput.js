import React from 'react';

function CharacterInfoInput(props) {
    // the display for every character info item except skill points remaining
    return (
        <div>
            {props.displayName}:<br />&nbsp;
        <input type="text" 
            placeholder={props.placeholder} 
            maxLength={props.maxLength} 
            value={props.infoValue} 
            disabled={props.lockChanges} 
            onChange = {e => {
                props.characterInfoChange(props.infoName, e.target.value)}}/>
        </div>
);

}

export default CharacterInfoInput;