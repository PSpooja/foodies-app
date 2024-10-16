import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import HeaderLayout from './components/HeaderLayout';
import BodyLayout from './components/BodyLayout';
import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import UserContext from './utils/userContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
// import Grocery from './components/Grocery';


const Grocery = lazy(()=> import("./components/Grocery"))

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(()=>{
    const data = {
      name : 'Pooja Singh'
    };
    setUserName(data.name)
  }, [])

  return(
    <Provider store={appStore}>
      <UserContext.Provider value={{LoggedInUser : userName, setUserName}}>
       <div className='app'>
          <HeaderLayout />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  )
}

const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <AppLayout />,
    children : [
      {
        path : '/',
        element : <BodyLayout/>,
      },
      {
        path : '/about',
        element : <About />,
      },
      {
        path : '/contact',
        element : <Contact />,
      },
      {
        path : '/grocery',
        element : <Suspense fallback={<h1>Loading .....</h1>}><Grocery /></Suspense>
        ,
      },
      {
        path : '/restaurant/:resId',
        element : <RestaurantMenu />
      }
    ],
    errorElement : <Error />,
  },
  
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);