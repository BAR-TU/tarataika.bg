import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function ListingsResults(props) {
    const location = useLocation();
    const [data, setData] = useState(0);

    useEffect(async () => {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("searchresults");
        toSelect.className = "selected";

        if (location.state !== undefined) {
            const res = await axios.get('/api/listings/criteria', {
                params: {
                    make: location.state.details.make,
                    model: location.state.details.model,
                    category: location.state.details.category,
                    engine: location.state.details.engine,
                    gearbox: location.state.details.gearbox,
                    location: location.state.details.location,
                    maxPrice: location.state.details.maxPrice,
                    maxYear: location.state.details.maxYear,
                    mileage: location.state.details.mileage,
                    minPrice: location.state.details.minPrice,
                    minYear: location.state.details.minYear,
                    power: location.state.details.power,
                    elWindows: location.state.details.elWindows,
                    airConditioning: location.state.details.airConditioning,
                    servo: location.state.details.servo,
                    alarm: location.state.details.alarm,
                    fourwheel: location.state.details.fourwheel,
                    bluetooth: location.state.details.bluetooth,
                    boardcomputer: location.state.details.boardcomputer,
                    navigation: location.state.details.navigation,
                    rainsensor: location.state.details.rainsensor,
                    seatheater: location.state.details.seatheater,
                    ecategory: location.state.details.ecategory,
                    paint: location.state.details.paint
                }
            });
            setData(res.data[0].info);
        } else {
            setData("Не сте въвели критерии за тръсене."); 
        }
    });
    return (
        <main>
            <span>{data}</span>
        </main>
    );
}

export default ListingsResults;