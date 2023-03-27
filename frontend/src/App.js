
import './App.css';
import Navbar from './components/Navbar';
import Followers from './pages/Followers';
import Profile from './pages/Profile';
import { Routes,Route} from "react-router-dom";
import Aside from './components/Aside';


function App() {
    

  return (
    <div className="App">  
        <Navbar/>
        <div className='flex'>
          <Aside/>
        <Routes>
         <Route exact path='/'  element={<Profile/>}/>
         <Route exact path='/followers'  element={<Followers/>}/>
        </Routes>
        </div>

    </div>
  );
}

export default App;
