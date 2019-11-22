import React, { Component, Input } from 'react'
import PropTypes from 'prop-types';

export class Skill extends Component {

    render() {
        const { tree, cost, id, name, prereq } = this.props.skill
        const {check, lockChanges} = this.props

        return (
            <div className="skill">
                <p>
                <input disabled={lockChanges} type="checkbox" onChange={check}/> {' '}
                    {name}
                </p>
            </div>
        )
    }
    
}

Skill.propTypes = {
    skill: PropTypes.object.isRequired,
    // isLearned: PropTypes.bool.isRequired,
    check: PropTypes.func.isRequired,
    locked: PropTypes.bool.isRequired,
}

export default Skill
