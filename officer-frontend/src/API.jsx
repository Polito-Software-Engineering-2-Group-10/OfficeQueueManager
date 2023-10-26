const URL ='http://localhost:3000/api';

async function getAllCounters(){
    const response = await fetch(URL+'/counters');
    const counters = await response.json();
    if(response.ok)
        return counters.map((c) => ({counterid: c.counterid, typeamount: c.typeamount, typeids: c.typeids}));
    else
        throw counters;
}

async function getServicesByCounter(counterId){
    const response = await fetch(URL+`/counterService/${counterId}`);
    const services = await response.json();
    if(response.ok)
        return services.map((s) => ({typeid: s.typeid, typename: s.typename, servicetime: s.servicetime}));
    else
        throw services;
}

const API = {getAllCounters, getServicesByCounter};
export default API;