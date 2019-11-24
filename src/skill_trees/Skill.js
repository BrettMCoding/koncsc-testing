import React, { Component, Input, useState } from 'react'
import PropTypes from 'prop-types';

function Skill(props){
   // const { tree, cost, id, name, prereq } = this.props.skill
   // const {check, lockChanges} = this.props

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
        <div className="skill">
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
    )
}

// Skill.propTypes = {
//     skill: PropTypes.object.isRequired,
//     // isLearned: PropTypes.bool.isRequired,
//     check: PropTypes.func.isRequired,
//     locked: PropTypes.bool.isRequired,
// }

export default Skill
