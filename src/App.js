import './App.css';

import Router from "./config/Router"
import Navbar from './components/Navbar';

import { useSelector } from 'react-redux'




function App() {
  // const isAuthenticated = useSelector(state => state.isAuthenticated)
  // console.log(isAuthenticated)


  return (
    <div className="App">
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
