import React from 'react';
import {Row} from 'reactstrap';

export default function Resource(props) {
    // simplify prop drilling
    const { removeResource, addResource, lockChanges } = props.props;
    const { getResourceCount, resource, max } = props;

    // Resource bar step
    const step = (max) => {
        if (max == 20) {
            return 5;
        }
        return 10;
    }

    // Resource ProgressBar
    const ProgressBar = () => {
        return (
            <div className="progress-bar">
                <div className="bar-text">{resource.name}: {getResourceCount(resource.name)} / {max}</div>
                <Filler />
            </div>
            )
    }
      
    const Filler = () => {
        return <div className="filler" style={{ width: `${getResourceCount(resource.name) * step(max)}%` }} />
    }

    const isLoaded = (resource) => {
        // if the props aren't loaded and they come back as undefined,
        // render the component as "Loading..."
        return (resource === undefined) ? <div>Loading...</div> : 

            <Row className="d-flex justify-content-center">

            <button type="button" className="btn btn-danger btn-sm" disabled={lockChanges} onClick={() => {
                removeResource(resource)
            }}>

                -

            </button>
            
            {/* <div>{resource.name}: {getResourceCount(resource.name)} / {max}</div> */}
            <ProgressBar />

            <button type="button" className="btn btn-success btn-sm" disabled={lockChanges} onClick={() => {
                addResource(resource)
            }} >
                
                +
                
            </button>

            </Row>

            };

    return isLoaded(resource);
}
