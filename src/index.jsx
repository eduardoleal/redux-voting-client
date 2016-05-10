import React from 'react';
import ReactDOM from 'react-dom';
import VotingContainer from './containers/VotingContainer';

const pair = ['Trainspotting', '28 Days Later'];

ReactDOM.render(
  <VotingContainer pair={pair} hasVoted={pair[0]} winner={pair[0]} />,
  document.getElementById('app')
);
