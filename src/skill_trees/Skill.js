import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Skill extends Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            //  textDecoration: this.props.todo.completed ? 
            // 'line-through' : 'none'
        }
     }

     // InputType change on locked in skill?
     // getLocked() if true = no input
     // else
     // checkbox

    render() {
        const { tree, cost, id, name } = this.props.skill

        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" /> {' '}
                    {name}
                    </p>
            </div>
        )
    }
}

// Skill.propTypes = {
//     skill: PropTypes.object.isRequired
//     // isLearned: PropTypes.bool.isRequired,
//     // cost: PropTypes.number.isRequired
// }

export default Skill
