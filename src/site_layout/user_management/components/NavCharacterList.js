import React from 'react'

export default function NavCharacterList(props) {
    // return a div map of all users characters by id
    // on click, handleMethod, message, and characterId is passed to our confirmationModal
    // to have the user confirm before losing/overwriting data
    
    return props.characterList.map((character) => {
            
            return <div className="character-list-slot btn-success btn-sm"

            id={character.id} 

            onClick={() => 
                {props.setCurrentConfirmationModal(
                    // pass handle method (save/load/delete)
                    props.handleCharacter, 
                    // pass related save/load/delete message with character name
                    (props.message + character.characterName + ")"), 
                    // pass character id if user confirms choice
                    character.id)}}>

                    {/* displayed as "Charactername. level race */}
                    {character.characterName}.&nbsp;<br />Level&nbsp;{character.level}&nbsp;{character.race}
                
            </div>
        });
}
