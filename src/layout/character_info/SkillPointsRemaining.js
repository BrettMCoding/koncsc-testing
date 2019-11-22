import React, { useState } from 'react';

// Calculate skill points remaining 
function SkillPointsRemaining() {

    const [skillPR, setSkillPR] = useState(0); 
    
    return (
        <div>Skill Points Remaining: 
            <input type="text" value={input} onInput={e => setInput(e.target.value)}/>
        </div>
    );
}

export default Level;