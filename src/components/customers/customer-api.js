const API_KEY = process.env.REACT_APP_KEY_DEV

const customerlist = async(credentials, signal) => {
    try {
        let response = await fetch(`${API_KEY}/api/customers/`, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token':  credentials.t
            }
        })
        return await response.json()
     } 

    catch(err) {
        console.error(err)
    }
}


export {customerlist} 