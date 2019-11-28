import React, { useState } from 'react'

function Skill(props){

   const [isChecked, setIsChecked] = useState(false);

   const addSpaces = (string) => {
           if (string.includes("2")) {
                return '  ';
           } else if (string.includes("3")) {
                return '    ';
           } else if (string.includes("4")) {
                return '      ';
           } else if (string.includes("5")) {
                return '        ';
           }
   }

    return (
        <div className="skill row d-flex flex-nowrap">
            <div className="skillBody col pl-1">
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
