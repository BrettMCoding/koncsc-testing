import React from 'react';

function CharacterInfoInput(props) {

    return (
        <div>{props.displayName}:&nbsp;
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