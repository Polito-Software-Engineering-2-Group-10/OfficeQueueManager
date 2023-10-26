import './App.css'
import "./pages/CustomerPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CustomerPage from './pages/CustomerPage'
import { useEffect, useState } from 'react';
import { getServices } from './API';
import TicketPage from './pages/TicketPage';


function App() {
    
  const [services, setServices] = useState([]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [text, setText] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const services = await getServices();
      setServices(services);
    }
    fetchServices();
  }, [])

  return (
    <BrowserRouter>
        <Routes>
            <Route index element= {<CustomerPage services={services} selectedOption={selectedOption} setSelectedOption={setSelectedOption} setText={setText}/>} />
            <Route path="/customer" element={<CustomerPage services={services} selectedOption={selectedOption} setSelectedOption={setSelectedOption} setText={setText}/> } />
            <Route path="/ticket" element={<TicketPage services={services} selectedOption={selectedOption} text={text}></TicketPage>}/>
            {/* <Route path="*" element={<Navigate to="/" replace/>} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;
