import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './Pages/Login';
import RegisterForm from './Pages/Register';
import HomePage from './Pages/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      // errorElement: <RequestErrorPage />
    },
    {
      path: "/login",
      element: <LoginForm />,
      // errorElement: <RequestErrorPage />
    },
    {
      path: "/register",
      element: <RegisterForm />,
      // errorElement: <RequestErrorPage />
    },

  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
