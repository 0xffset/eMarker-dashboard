const API_KEY = process.env.REACT_APP_KEY_DEV


const recentorders = async() => {
    try {
        let response = await fetch(`${API_KEY}/api/orders/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
     } 

    catch(err) {
        console.error(err)
    }
}
const totalsales = async() => {
    try {
        let response = await fetch(`${API_KEY}/api/orders/total`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
     } 

    catch(err) {
        console.error(err)
    }
}

const chart = async() => {
    try {
        let response = await fetch(`${API_KEY}/api/orders/chart`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
     } 

    catch(err) {
        console.error(err)
    }
}


export {recentorders, totalsales, chart} 