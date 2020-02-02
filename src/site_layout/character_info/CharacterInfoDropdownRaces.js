import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function CharacterInfoDropdownCountries(props) {
    // the display for character info where the input should be a drop down
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("Select a race")

    // races placeholder
    const races = ["Human", "Elf", "Earfkin", "God"]

    const optionsMap = races.map(i => ( <DropdownItem className="info-dropdown-item" onClick={(e) => {debugger;setDropdownValue(i)}}>{i}</DropdownItem> ))

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
