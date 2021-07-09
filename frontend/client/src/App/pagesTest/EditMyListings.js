import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditMyListingsView from './EditMyListingsView';
import { useLocation, useHistory } from 'react-router-dom';



export default function EditMyListings () {
    let history = useHistory();
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
                if (location.state.details.update === "true") {
                    axios.put('/api/listings/update', location.state.details).then((res) => {
                        setMessage(res.data.message);
                        setChanged('true');
                    })
                } else if (location.state.details.update === undefined) {
                    axios.post('/api/listings/addlisting', location.state.details).then((res) => {
                        setMessage(res.data.message);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }

            setTimeout(() => {
                setMessage('');
              }, 5000)
        }

        history.replace();


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