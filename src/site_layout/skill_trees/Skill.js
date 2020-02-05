import React from 'react'

function Skill(props){

    // local management. re-enable if skill checking is bugged,
    // as well as lines 44 & 47
    //const [isChecked, setIsChecked] = useState(false);

    const playerHasSkill = (playerSkills) => { 
        // if state.playerskills are undefined, return false
        return (playerSkills === undefined) ?
            false : compareIds(playerSkills)
    }
    
    // search playerskills for a match
    const compareIds = (playerSkills) => {

        return playerSkills.some(skill => skill.id === props.skill.id);

    }

   const addSpaces = (string) => {
           if (props.skill.tier === 2) {
                return '  ';
           } else if (props.skill.tier === 3) {
                return '    ';
           } else if (props.skill.tier === 4) {
                return '      ';
           } else if (props.skill.tier === 5) {
                return '        ';
           }
   }

   const checkedStyle = playerHasSkill(props.playerSkills) ? " checked" : "";

   // check if this skill was located in the free language array
   if (props.freeLanguages[0] !== undefined){
        if (props.freeLanguages.find(foundSkill => foundSkill.name === props.skill.name)) {
            return <div className={"skill row d-flex flex-nowrap checked"}>
                        <div className={"skillBody col pl-1 checked"}>
                            <p>
                            <input disabled={true} type="checkbox" checked={true} /> 
                                {' '} {addSpaces(props.skill.name)}
                                {props.skill.name}
                            </p>
                            </div>
                        <div className="skillCost d-inline-flex flex-nowrap pr-1">{props.skill.cost}</div>
                    </div>
        }
    }

    return (
        <div className={"skill row d-flex flex-nowrap " + checkedStyle}>
            <div className={"skillBody col pl-1" + checkedStyle}>
                <p>
                <input disabled={props.lockChanges} type="checkbox" checked={playerHasSkill(props.playerSkills)} 
                
                    onChange={e => {

                        //(setIsChecked(
                            props.playerCheckedASkillBox(props.skill, e.target.checked)
                        ;
                        //);
                }}/> 
                    {' '} {addSpaces(props.skill.name)}
                    {props.skill.name}
                </p>
                </div>
            <div className="skillCost d-inline-flex flex-nowrap pr-1">{props.skill.cost}</div>
        </div>
    )
}

export default Skill
