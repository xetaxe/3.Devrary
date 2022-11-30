import { Routes, Route } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'

import { Home } from './pages/Home'
import { MyDevrary } from './pages/MyDevrary'
import { Notes } from './pages/Notes'


const routesConfig = [
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  // {
  //   element: <AppLayout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Dashboard />,
  //     },
  //   ],
  // },
  { path: "/", element: <Home />, },
  { path: "/mydevrary", element: <MyDevrary />, },
  { path: "/notes", element: <Notes />, },
  // TODO --> Add NON-Existent page
  { path: "*", element: <Notes />, },
];

const router = createBrowserRouter(routesConfig);


function App() {

  return (
    <div className="App">
      <RouterProvider router ={router} />
    </div>
  )
}

export default App
