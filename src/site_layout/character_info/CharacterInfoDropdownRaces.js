import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function CharacterInfoDropdownRaces(props) {
    // the display for character info where the input should be a drop down
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("Select a race")

    // races placeholder
    const races = props.races

    const optionsMap = (races === undefined ? <div>Loading races...</div> : races.map(i => ( <DropdownItem className="info-dropdown-item" onClick={(e) => {setDropdownValue(i.name)}}>{i.name}</DropdownItem> )))

    const toggle = () => setDropdownOpen(dropdownOpen => !dropdownOpen);

    return (
        <div>Race:
            <Dropdown isOpen={dropdownOpen} toggle={toggle} setActiveFromChild={true} size="md">
                <DropdownToggle caret className="navButton p-0 pl-2">
                    <span className={(dropdownValue === "Select a race" ? "" : "mock-input-dropdown")}>{dropdownValue}</span>
                </DropdownToggle>
                <DropdownMenu>
                    {optionsMap}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
