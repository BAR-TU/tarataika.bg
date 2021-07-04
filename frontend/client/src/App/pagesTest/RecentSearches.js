import React, { useEffect } from "react";
import RecentResultsView from './RecentResultsView';

function RecentSearches() {
    let data = JSON.parse(localStorage.getItem('recentlyVisited'));

    useEffect(() => {
        
    });

    return(
        <section className="recentsearch">
            <header><h2 className="recentsheading">Скорошни търсения</h2></header>
            <div className="recentSearchesContainer">
                { data ? data.map(
                (id, index) => 
                <RecentResultsView key={index} id={id}/>
                ) : (<h2>Липсват резултати!</h2>)}
            </div>
        </section>
    );
}

export default RecentSearches;