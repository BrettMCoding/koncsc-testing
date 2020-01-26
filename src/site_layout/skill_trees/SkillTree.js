import React, { Component, useState } from 'react'
import { Collapse, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faCheck } from '@fortawesome/free-solid-svg-icons'
import Skill from './Skill';

export default function SkillTree(props){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const numOfSkillsInTree = props.skills.length;

    // search playerskills for matching tree to this props.tree(toLowerCase, since it's used for display without it)
    const numOfPlayerSkillsInTree = () => {
        let playerTreeSkills = props.playerSkills.filter(skill => skill.tree === props.treeName.toLowerCase()).length
        return playerTreeSkills
    }

    const skills = props.skills.map((skill) => (
            <Skill key={skill.id} skill={skill} playerCheckedASkillBox={props.playerCheckedASkillBox} lockChanges={props.lockChanges} playerSkills={props.playerSkills} />
        ))

    return (
        <div>
                <h3><button className="btn-sm btn-dark float-left" onClick={toggle}><FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} /></button>

                {props.treeName} {numOfPlayerSkillsInTree()} / {numOfSkillsInTree}

                <button className="btn-sm btn-dark float-right" onClick={toggle}><FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} /></button></h3>
            <Collapse isOpen={isOpen}>
                {skills}
            </Collapse>
        </div>
    )
}
