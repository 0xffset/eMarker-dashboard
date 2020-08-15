const API_KEY = process.env.REACT_APP_KEY_DEV


const recentorders = async(credentials, signal) => {
    try {
        let response = await fetch(`${API_KEY}/api/orders/`, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': credentials.t
            }
        })
        return await response.json()
     } 

    catch(err) {
        console.error(err)
    }
}
const totalsales = async(credentials) => {
    try {
        let response = await fetch(`${API_KEY}/api/orders/total`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': credentials.t
            }
        })
        return await response.json()
     } 

    catch(err) {
        console.error(err)
    }
}

const chart = async(credentials) => {
    try {
        let response = await fetch(`${API_KEY}/api/orders/chart`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': credentials.t
            }
        })
        return await response.json()
     } 

    catch(err) {
        console.error(err)
    }
}


export {recentorders, totalsales, chart} 