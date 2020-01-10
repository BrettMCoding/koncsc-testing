import React from 'react';
import {Row} from 'reactstrap';
import { useSpring, animated } from 'react-spring';

export default function Resource(props) {
    // simplify prop drilling
    const { removeResource, addResource, lockChanges, getResourceCount } = props.props;
    const { resourceName, resource, max, skillCss, cost, displayName } = props;
    
    // Resource bar step
    const step = () => {
        if (max == 20) {
            return 5;
        }
        return 10;
    }

    // calculated width % string, send to Filler
    const fillBarAnim = useSpring({ width: resource ? resource * step() + '%' : 0 + '%' })

    // Resource ProgressBar
    const ResourceBar = () => {
        return (
            <div className="progress-bar">
                <div className="bar-text">{displayName}: {resource} / {max}</div>
                <Filler />
            </div>
            )
    }
      
    // ANIMATION CALL ON CLICKING TOO FAST LEAKING MEMORY?
    const Filler = () => {
        return <animated.div className={"filler " + skillCss} style={fillBarAnim} />
    }

    const isLoaded = (resource) => {
        // if the props aren't loaded and they come back as undefined,
        // render the component as "Loading..."
        return (resource === undefined) ? <div>Loading...</div> : 

            <Row className="d-flex flex-nowrap justify-content-center rscrow">

            <button type="button" className="btn btn-danger btn-sm rscbtn" disabled={lockChanges} onClick={() => {
                removeResource(resourceName)
            }}>

                -

            </button>
            
            <ResourceBar />

            <button type="button" className="btn btn-success btn-sm rscbtn" disabled={lockChanges} onClick={() => {
                addResource(resourceName, cost, max)
            }} >
                
                +
                
            </button>

            <div className="resource-cost">{cost}</div>

            </Row>


            };

    return isLoaded(resource);
}
