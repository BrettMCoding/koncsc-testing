import React, { Component } from 'react'

import Skill from './Skill';
// import PropTypes from 'prop-types';


export class SkillTree extends Component {
    render() {
        return this.props.skills.map((skill) => (
            <Skill key={skill.id} skill={skill} isChecked={false} check={this.props.check} lockChanges={this.props.lockChanges} />
        ))
    }
}

// SkillTree.propTypes = {
//     skills: PropTypes.array.isRequired,
//     // isLearned: PropTypes.bool.isRequired,
//     check: PropTypes.func.isRequired,
//     locked: PropTypes.bool.isRequired
// }

export default SkillTree
