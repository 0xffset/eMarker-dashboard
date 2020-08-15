const API_KEY = process.env.REACT_APP_KEY_DEV


const signin = async (user) => {
    try {
        let response = await fetch(`${API_KEY}/auth/signin/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)

        })
        return await response.json()
    }
    catch(err) {
        console.error(err) 
    }
}

const signout = async () => {
    try {
        let response = await fetch(`${API_KEY}/auth/signout`, {method: 'GET'})
        return await response.json()
    }
    catch(err) {
        console.log(err)
    }
}
export {
    signin,
    signout
}