import React, { useState } from 'react'

function Skill(props){

   const [isChecked, setIsChecked] = useState(false);

   const addSpaces = (string) => {
           if (props.skill.tier == 2) {
                return '  ';
           } else if (props.skill.tier == 3) {
                return '    ';
           } else if (props.skill.tier == 4) {
                return '      ';
           } else if (props.skill.tier == 5) {
                return '        ';
           }
   }

   const checkedStyle = isChecked ? " checked" : "";

    return (
        <div className={"skill row d-flex flex-nowrap" + checkedStyle}>
            <div className={"skillBody col pl-1" + checkedStyle}>
                <p>
                <input disabled={props.lockChanges} type="checkbox" checked={isChecked} 
                
                    onChange={e => {
                        setIsChecked(
                            props.check(props.skill, e.target.checked)
                        );

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
