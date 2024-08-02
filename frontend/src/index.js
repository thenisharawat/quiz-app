// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import './App.css';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './components/Redux/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <React.StrictMode>
      <App />
  </React.StrictMode>

);

