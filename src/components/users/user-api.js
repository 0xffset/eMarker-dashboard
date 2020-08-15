const API_KEY = process.env.REACT_APP_KEY_DEV

const userlist = async(credentials, signal) => {
    try {
        let response = await fetch(`${API_KEY}/api/users/`, {
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

const remove = async(id, credentials) => {
    try {
        let response = await fetch(`${API_KEY}/api/users/`+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': credentials.t
            }
        })
        return await response.json()
    }
    catch (err) {
        console.error(err)
    }
}

const update = async(id, user, credentials) => {
    try {
        let response = await fetch(`${API_KEY}/api/users/`+id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': credentials.t
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    }
    catch (err) {
        console.error(err)
    }
}

const create = async(user, credentials) => {
    try {
        let response = await fetch(`${API_KEY}/api/users/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': credentials.t
            },
            body: JSON.stringify(user)

        })

        return await response.json()
    } catch (err) {
        console.error(err)
    }
}

export {
    update,
    userlist,
    create,
    remove
}