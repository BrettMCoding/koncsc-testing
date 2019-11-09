import React, { Component } from 'react'

import Skill from './Skill';
import PropTypes from 'prop-types';


export class SkillTree extends Component {
    render() {
        return this.props.skills.map((skill) => (
            <Skill key={skill.id} skill={skill} />
        ))
    }
}

// SkillTree.propTypes = {
//     skill: PropTypes.array.isRequired
// }

export default SkillTree
