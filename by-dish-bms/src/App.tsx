import { useRoutes } from 'react-router-dom';
import './App.css';
import { routers } from './router';

function App() {
  return useRoutes(routers);
}
export default App;