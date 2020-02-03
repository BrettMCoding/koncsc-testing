import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function CharacterInfoDropdownCountries(props) {
    // the display for character info where the input should be a drop down
    
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // countries placeholder
    const countries = props.countries

    const optionsMap = (countries === undefined ? <div>Loading countries...</div> : countries.map(i => ( <DropdownItem className="info-dropdown-item" onClick={(e) => {props.characterInfoChange("country", i.name)}}>{i.name}</DropdownItem> )))

    const toggle = () => setDropdownOpen(dropdownOpen => !dropdownOpen);

    return (
        <div>Country:
            <Dropdown isOpen={dropdownOpen} toggle={toggle} setActiveFromChild={true} size="md">
                <DropdownToggle caret className="navButton p-0 pl-2">
                    <span className={(props.country === "" ? "" : "mock-input-dropdown")}>
                    {(props.country === "" ? "Select a country" : props.country)}
                    </span>
                </DropdownToggle>
                <DropdownMenu>
                    {optionsMap}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
