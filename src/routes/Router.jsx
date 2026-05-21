import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import ExploreCars from '../pages/ExploreCars';
import CarDetails from '../pages/CarDetails';
import AddCar from '../pages/AddCar';
import MyAddedCars from '../pages/MyAddedCars';
import UpdateCar from '../pages/UpdateCar';
import MyBookings from '../pages/MyBookings';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explore-cars', element: <ExploreCars /> },
      { path: 'cars/:id', element: <CarDetails /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'add-car',
        element: <PrivateRoute><AddCar /></PrivateRoute>
      },
      {
        path: 'my-added-cars',
        element: <PrivateRoute><MyAddedCars /></PrivateRoute>
      },
      {
        path: 'update-car/:id',
        element: <PrivateRoute><UpdateCar /></PrivateRoute>
      },
      {
        path: 'my-bookings',
        element: <PrivateRoute><MyBookings /></PrivateRoute>
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
