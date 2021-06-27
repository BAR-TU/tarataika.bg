import React, { useEffect } from 'react';

function Account() {
    useEffect(() => {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("searchresults");
        toSelect.className = "selected";
    });
    return (
        <main>
            <div>Account</div>
        </main>
    );
}

export default Account;