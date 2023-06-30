import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Home from '../src/page/Home'

const GetRoutes = () => {
  const routes = useRoutes([
    {
      path:'/home', 
      element: <Home/>
    }
  ]);
  return routes
}

const SetRoutes = () => {
  return (
    <Router>
      <GetRoutes />
    </Router>
  )
}

export default SetRoutes;