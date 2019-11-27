import React from 'react';

function Level(props) {

    return (
        <div>Level:&nbsp;
        <input type="text" value={props.level} onChange = {e => props.setLevel(e.target.value)}/>
        </div>
);

}

export default Level;