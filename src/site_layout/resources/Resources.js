import React from 'react'
import Resource from './Resource';
// import Skilltree from '../skill_trees/SkillTree'
// import PropTypes from 'prop-types';
import {Row} from 'reactstrap';

export default function Resources(props) {
    // props.resources.find(x => x.id === 160) = production
    // props.resources.find(x => x.id === 161) = craft
    // props.resources.find(x => x.id === 162) = magic power

    return (
        <div>
            <div className="resourcebox">


                {/* With resources, the cost is set locally and not in the database, unlike skills. */}

                    <h3 className="resources">Resources</h3>
                    {/* Magic Power */}
                    <Resource props={props} 
                                displayName={"Magic Power"} 
                                cost={props.MAGIC_POINT_COST} 
                                max={20}
                                
                                resourceName={"magicPoints"}

                                resource={props.resources.magicPoints}
                                skillCss={"magic"}
                    />
                    
                    {/* Production */}
                    <Resource props={props} 
                                displayName={"Production"} 
                                cost={props.PRODUCTION_POINT_COST} 
                                max={10} 

                                resourceName={"productionPoints"}

                                resource={props.resources.productionPoints}skillCss={"production"}
                    />

                    {/* Craft */}
                    <Resource props={props}
                                displayName={"Craft"} 
                                cost={props.CRAFT_POINT_COST} 
                                max={10} 

                                resourceName={"craftPoints"}

                                resource={props.resources.craftPoints}
                                skillCss={"craft"}
                    />
            </div>
        </div>
    )
}
