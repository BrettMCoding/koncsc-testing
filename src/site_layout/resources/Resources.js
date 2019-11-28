import React from 'react'
import Resource from './Resource';
// import Skilltree from '../skill_trees/SkillTree'
// import PropTypes from 'prop-types';
import {Row} from 'reactstrap';

export default function Resources(props) {
    // props.resources.find(x => x.id === 160) = production
    // props.resources.find(x => x.id === 161) = craft
    // props.resources.find(x => x.id === 162) = magic power

    // var getResourceCount = (resourceName) => {
    //     if (resourceName == undefined) {
    //         return null;
    //     }
    //     var count = 0;
    //     for (let resources in props.playerHasSkill) {    
           
    //         if (props.playerHasSkill[resources].name === resourceName) {
    //             count++;
    //         }
    //     }
    //     return count;
    // }

    return (
        <div>
            <div className="resourcebox">
                    <h3 className="resources">Resources</h3>
                    {/* Magic Power */}
                    <Resource props={props} max={20} resource={props.resources.find(x => x.id === 162)} skillCss={"magic"}/>
                    
                    {/* Production */}
                    <Resource props={props} max={10} resource={props.resources.find(x => x.id === 160)} skillCss={"production"}/>

                    {/* Craft */}
                    <Resource props={props} max={10} resource={props.resources.find(x => x.id === 161)} skillCss={"craft"}/>
            </div>
        </div>
    )
}
