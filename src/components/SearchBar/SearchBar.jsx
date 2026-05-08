import Icon from "../Icon/Icon";

import "./searchBar.css";

const SearchBar = ({ icon }) => {
    return (
        <>
            <div className="eventspage__searchbar-wrapper">
                <Icon
                    name={icon}
                    alt={`${icon} icon`}
                    className="eventspage__searchbar-icon"
                />
                <label htmlFor="event-search" className="sr-only">
                    Sök efter event
                </label>
                <input
                    id="event-search"
                    // placeholder="Sök efter event..."
                    className="eventspage__searchbar"
                    type="search"
                />
            </div>
        </>
    );
};

export default SearchBar;
