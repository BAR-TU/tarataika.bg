import React, { useEffect, useState }  from 'react';
import ResultsView from './listing-view';

export default function ResultsList (props) {
    return (
      <div className="resultscontainer">
        <h2>Results</h2>
        {props.results ? props.results.map(
          result => 
          <ResultsView key={result.id} result={result} />
        ) : (<h2>{ props.error ? props.error : 'Loading...'}</h2>)}
      </div>
    );
  }