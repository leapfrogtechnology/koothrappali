// Load up the application styles
import("../public.js");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(<App />, document.getElementById('react-root'));
