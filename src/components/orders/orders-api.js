const recentorders = async() => {
    try {
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/api/orders/', {
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
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/api/orders/total', {
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
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/api/orders/chart', {
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