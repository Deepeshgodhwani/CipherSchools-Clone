
import './App.css';
import Navbar from './components/Navbar';
import React, { useContext } from "react";
import Followers from './pages/Followers';
import Profile from './pages/Profile';
import { Routes,Route} from "react-router-dom";
import Aside from './components/Aside';
import logoImg from "./images/cipherlogo.png";
import userContext from "./context/userContext";


function App() {
  const context = useContext(userContext);
  const { loading,setloading } = context;
    

  return (
    <div onLoad={()=>{setloading(false)}} className="App ">  
        {loading && <div className="absolute w-[100%]  z-[10000] h-[100vh]">
             <div className=" blink-bg opacity-40 bg-[rgb(27,27,27)] absolute w-full  h-[100vh]"></div>
             <div className='flex h-[100vh] justify-center items-center'>
            <img className='z-20 blink-img relative w-32' src={logoImg} alt="" />
        </div>
       </div>}
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
