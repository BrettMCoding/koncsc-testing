import React, { Component, useState } from 'react'
import { Collapse, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faCheck } from '@fortawesome/free-solid-svg-icons'
import Skill from './Skill';

export default function SkillTree(props){
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const skills = props.skills.map((skill) => (
            <Skill key={skill.id} skill={skill} playerCheckedASkillBox={props.playerCheckedASkillBox} lockChanges={props.lockChanges} playerSkills={props.playerSkills} />
        ))

    return (
        <div>
                <h3><button className="btn-sm btn-dark float-left" onClick={toggle}><FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} /></button>
                {props.treeName}
                <button className="btn-sm btn-dark float-right" onClick={()=>{}}><FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} /></button></h3>
            <Collapse isOpen={isOpen}>
                {skills}
            </Collapse>
        </div>
    )
}
