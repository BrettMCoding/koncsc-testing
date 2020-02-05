import React, { Component, useState } from 'react'
import { Collapse, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faCheck } from '@fortawesome/free-solid-svg-icons'
import Skill from './Skill';

export default function SkillTree(props){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const numOfSkillsInTree = props.skills.length;

    // add free languages to skills in tree calculation if the tree is general
    var freeLangsNum = 0;
    if (props.treeName === "General"){
        freeLangsNum = props.freeLanguages.length;
    }

    // search playerskills for matching tree to this props.tree(toLowerCase, since it's used for display without it)
    const numOfPlayerSkillsInTree = () => {
        let playerTreeSkills = props.playerSkills.filter(skill => skill.tree === props.treeName.toLowerCase()).length
        return playerTreeSkills
    }

    const skills = props.skills.map((skill) => (
            <Skill key={skill.id} skill={skill} playerCheckedASkillBox={props.playerCheckedASkillBox} lockChanges={props.lockChanges} playerSkills={props.playerSkills} freeLanguages={props.freeLanguages} />
        ))

    return (
        <div>
                <h3><button className="btn-sm btn-dark float-left" onClick={toggle}><FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} /></button>

                {props.treeName} {numOfPlayerSkillsInTree() + freeLangsNum} / {numOfSkillsInTree}

                <button className="btn-sm btn-dark float-right" onClick={toggle}><FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} /></button></h3>
            <Collapse isOpen={isOpen}>
                {skills}
            </Collapse>
        </div>
    )
}
