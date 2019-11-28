import React, { Component } from 'react'

import Skill from './Skill';

export class SkillTree extends Component {
    render() {
        return this.props.skills.map((skill) => (
            <Skill key={skill.id} skill={skill} isChecked={false} check={this.props.check} lockChanges={this.props.lockChanges} />
        ))
    }
}

export default SkillTree
