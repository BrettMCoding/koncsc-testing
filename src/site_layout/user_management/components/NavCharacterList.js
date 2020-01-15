import React from 'react'

export default function NavCharacterList(props) {
    return props.characterList.map((character) => {
            return <div onClick={() => {props.handleCharacter(character.id)}}>{character.characterName}.&nbsp;Level&nbsp;{character.level}&nbsp;{character.race}</div>
        });
}
