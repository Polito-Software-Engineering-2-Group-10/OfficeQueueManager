import './App.css'
import "./pages/CustomerPage";

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CustomerPage from './pages/CustomerPage'


function App() {
    
  const fakedata = [{name: "aa", description: "bbb"}, {name: "ccc", description: "ddd"}, {name: "eee", description:"fff"}]

  return (
    <BrowserRouter>
    <Routes>
        <Route index element= {<CustomerPage/>} />
        <Route path="/customer" element={<CustomerPage services={fakedata}/> } />
        {/* <Route path="*" element={<Navigate to="/" replace/>} /> */}
    </Routes>

    </BrowserRouter>
  )
}

export default App;
