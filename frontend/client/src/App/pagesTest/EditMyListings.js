import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditMyListingsView from './EditMyListingsView';
import { useLocation } from 'react-router-dom';



export default function EditMyListings () {
    let error = '';
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [results, setResults] = useState([]);
    const [changed, setChanged] = useState('');

    useEffect(() => {
        if (location.state !== undefined) {
            setMessage(location.state.message);

            setTimeout(() => {
                setMessage('');
              }, 5000)

            if (location.state.details !== undefined) {
                axios.put('/api/listings/update', location.state.details).then((res) => {
                    setMessage(res.data.message);
                    setChanged('true');
                })
            }

            setTimeout(() => {
                setMessage('');
              }, 5000)
        }



        async function getListings() {
            let query = '/api/listings/foredit';
    
            let res = await axios.get(query)
            setResults(res.data);
        }

        getListings();

        
    }, [location.state, changed]);

    return (
        <main>
            <div className="resultscontainer">
                {message}
              <h2>Моите обяви:</h2>
              {results.length > 0 ? results.map(
                result => 
                <EditMyListingsView key={result.id} result={result} />
              ) : (<h2>{ error ? error : 'Първо създайте своя обява'}</h2>)}
            </div>
        </main>
    );
}