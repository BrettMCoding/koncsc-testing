import React from 'react';
import {Row} from 'reactstrap';
import { useSpring, animated } from 'react-spring';

export default function Resource(props) {
    // simplify prop drilling
    const { removeResource, addResource, lockChanges, getResourceCount } = props.props;
    const { resource, max, skillCss } = props;
    
    // Resource bar step
    const step = () => {
        if (max == 20) {
            return 5;
        }
        return 10;
    }

    // calculated width % string, send to Filler
    const fillBarAnim = useSpring({ width: resource ? getResourceCount(resource.name) * step() + '%' : 0 + '%' })

    // Resource ProgressBar
    const ResourceBar = () => {
        return (
            <div className="progress-bar">
                <div className="bar-text">{resource.name}: {getResourceCount(resource.name)} / {max}</div>
                <Filler />
            </div>
            )
    }
      
    // ANIMATION CALL ON CLICKING TOO FAST LEAKING MEMORY
    const Filler = () => {
        return <animated.div className={"filler " + skillCss} style={fillBarAnim} />
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
            
            <ResourceBar />

            <button type="button" className="btn btn-success btn-sm" disabled={lockChanges} onClick={() => {
                addResource(resource, max)
            }} >
                
                +
                
            </button>

            <div className="resource-cost">{resource.cost}</div>

            </Row>


            };

    return isLoaded(resource);
}
