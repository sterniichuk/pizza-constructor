import React from 'react';
import {defaultLocation1, LocationCity, RestaurantLocation} from "../../data/Address";
import {PropsState} from "../../data/PropsState";

interface Props {
    locations: LocationCity[]
    selectedLocation: PropsState<RestaurantLocation>
}

function CarryOutForm({locations, selectedLocation}: Props) {
    const locationSign = <div className="location-sign">
        <svg viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fe0021"
             className="TakeOutForm__CurrentCityIcon-sc-nu5z77-4 dazfCO">
            <path
                d="M6 0C2.692 0 0 2.692 0 6c0 .993.248 1.978.72 2.851l4.952 8.956a.375.375 0 00.656 0l4.953-8.959A6.01 6.01 0 0012 6c0-3.308-2.692-6-6-6zm0 9C4.346 9 3 7.654 3 6s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"
                fill="currentColor"></path>
        </svg>
    </div>
    const currentLocation = locations.find(x => x.city === selectedLocation.value.city) || defaultLocation1;

    function handleCityChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const newCity = event.target.value;
        if (newCity !== selectedLocation.value.city) {
            const locationCity = locations.find(x => x.city === newCity) || currentLocation;
            const city = locationCity.city;
            const street = locationCity.addresses[0];
            const place: RestaurantLocation = ({city: city, street: street});
            selectedLocation.setValue(() => place)
        }
    }

    function handleStreetChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const newStreet = event.target.value;
        if (newStreet !== selectedLocation.value.street) {
            selectedLocation.setValue((p) => ({...p, street: newStreet}))
        }
    }

    return (
        <div className={"delivery-form-wrapper"}>
            <div className="carry-out-header">
                {locationSign}
                <h3 className={"delivery-form-header"}>Choose a restaurant</h3>
            </div>
            <div className="dropdown-select dropdown-select-city">
                <select id="dropdown-city" value={currentLocation.city} onChange={handleCityChange}>
                    {locations.map(restaurant => {
                        return <option key={"restaurant.city: " + restaurant.city} value={restaurant.city}>{restaurant.city}</option>
                    })}
                </select>
            </div>
            <div className="dropdown-select dropdown-select-street">
                <select id="dropdown-street" value={selectedLocation.value.street} onChange={handleStreetChange}>
                    {currentLocation.addresses.map(street => {
                        return <option key={"street: " + street} value={street}>{street}</option>
                    })}
                </select>
            </div>
        </div>
    );
}

export default CarryOutForm;