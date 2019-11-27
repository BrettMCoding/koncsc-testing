import React from 'react'

export default function ResourceBar(props) {
    const {getResourceCount, max, resourceName}

    const step = (max) => {
        if (max === 20) {
            return 5;
        }
        return 10;
    }

    const ProgressBar = (props) => {
        return (
            <div className="progress-bar">
                <Filler percentage={getResourceCount(resourceName)} />
            </div>
            )
    }
      
    const Filler = (props) => {
        return <div className="filler" style={{ width: `${getResourceCount(resourceName)}%` }} />
    }

    return (
        <div>
            
        </div>
    )
}
