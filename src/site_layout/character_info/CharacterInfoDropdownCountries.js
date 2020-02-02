import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function CharacterInfoDropdownCountries(props) {
    // the display for character info where the input should be a drop down
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("Select a country")

    // countries placeholder
    const countries = ["vlean", "civen", "dell", "chicken"]

    const optionsMap = countries.map(i => ( <DropdownItem className="info-dropdown-item" onClick={(e) => {debugger;setDropdownValue(i)}}>{i}</DropdownItem> ))

    const toggle = () => setDropdownOpen(dropdownOpen => !dropdownOpen);

    return (
        <div>Country:
            <Dropdown isOpen={dropdownOpen} toggle={toggle} setActiveFromChild={true} size="md">
                <DropdownToggle caret className="navButton p-0 pl-2">
                    <span className={(dropdownValue === "Select a country" ? "" : "mock-input-dropdown")}>{dropdownValue}</span>
                </DropdownToggle>
                <DropdownMenu>
                    {optionsMap}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
