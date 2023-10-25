import { useState } from 'react';
import "../styles/CustomerPage.css"


const CustomerPage = (props) => {
    
    // list of services retrived by the backend
    let {services} = props;
    
    // selected service to handle
    const [selectedOption, setSelectedOption] = useState(services[0].name);
    
    // handle the change of the selected service
    const handleOptionChange = (changeEvent) => {
        setSelectedOption(changeEvent.target.value);
    }
    
    return (
      <div className='CustomerPage'>
        
        <h1>Select a service</h1>
        <h2>Please, select the service that you would like to get a ticket:</h2>

        <form> 

        {services.map((service, index) => {
            
            return (
                <div key={index}>
                    <label>
                        <input type="radio" value={service.name} name="service" checked={selectedOption === service.name} onChange={handleOptionChange}/> <b>{service.name}</b>:  {service.description}
                    </label>
                    <br/>
                </div>
            )
        })}    

        <input type="submit" value="Continue" id='submitButton' />
        
        </form> 

        
      </div>  
    );
}


export default CustomerPage;