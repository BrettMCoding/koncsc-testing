import React from 'react';

function CharacterInfoInput(props) {
    // the display for character info where the input should be text
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