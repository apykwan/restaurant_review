import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { RestaurantsContextProvider } from "./context/RestaurantContext";
import App from './App';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RestaurantsContextProvider>
      <Router>
        <App />
      </Router>
    </RestaurantsContextProvider>
  </React.StrictMode>
);
