const URL ='http://localhost:3000/api';

async function getAllCounters(){
    const response = await fetch(URL+'/counters');
    const counters = await response.json();
    if(response.ok)
        return counters.map((c) => ({counterid: c.counterid, typeamount: c.typeamount, typeids: c.typeids}));
    else
        throw counters;
}

async function getAllServices(){
    const response = await fetch(URL+'/services');
    const services = await response.json();
    if(response.ok)
        return services.map((s) => ({name: s.name, description: s.description}));
    else
        throw services;
}

async function getServicesByCounter(counterId){
    const response = await fetch(URL+`/counterService/${counterId}`);
    const services = await response.json();
    if(response.ok)
        return services.map((s) => ({typeid: s}));
    else
        throw services;
}

async function getNextClient(counterId){
    const response = await fetch(URL+`/nextClient/${counterId}`);
    const client = await response.json();
    if(response.ok)
        return client.ticketid;
    else
        throw client;
}

const API = {getAllCounters, getServicesByCounter, getAllServices, getNextClient};
export default API;