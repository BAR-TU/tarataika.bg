import React, { useEffect, useState } from "react";
import MostViewed from "./MostViewed";
import axios from 'axios';

function MostlyViewed() {
    const [arr, setResult] = useState([]);

    useEffect(() => {
        let query = '/api/listings/mostlyViewed';
        axios.get(query)
        .then(details => {
            setResult(details.data);
        });
    }, []);

    return(
        <section className="mostlyviewed">
            <header><h2 className="mostlyviewedheading">Най-посещавани</h2></header>
            <div className="mostViewedContainer">
                { arr ? arr.map(
                result => 
                <MostViewed key={result.id} id={result.id}/>
                ) : (<h2>Липсват резултати!</h2>)}
            </div>
        </section>
    );
}

export default MostlyViewed;