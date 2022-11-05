import { Route, Routes } from 'react-router-dom';

import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';

const App = () => {

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:id/update" element={<UpdatePage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
