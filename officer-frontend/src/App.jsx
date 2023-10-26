import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import OfficerPage from './pages/OfficerPage.jsx'
import API from './API.jsx';


function App() {

  //list of all counters to display in the dropdown list
  const [counters, setCounters] = useState([]);
  const [services, setServices] = useState([]);

  useEffect( () => {
    API.getAllCounters()
      .then((counters) => {
        setCounters(counters);
      })    
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    API.getAllServices()
    .then((services) => {
        setServices(services);
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<OfficerPage counters={counters} services={services}/>}></Route>
        <Route path='/officer' element={<OfficerPage counters={counters} services={services}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
