import React from 'react'

export default function NavCharacterList(props) {
    return props.characterList.map((character) => {
            return <div id={character.id} onClick={() => {props.setCurrentConfirmationModal(props.handleCharacter, (props.message + character.characterName + ")"), character.id)}}>{character.characterName}.&nbsp;Level&nbsp;{character.level}&nbsp;{character.race}</div>
        });
}
