/* eslint-disable react-refresh/only-export-components */
const URL = "http://localhost:3000/api"

async function getServices() {
    const response = await fetch(`${URL}/services`)
    const data = await response.json()
    return data
}

async function bookService(serviceId) {
    const response = await fetch(`${URL}/bookService/${serviceId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    return data
}

export { getServices, bookService }