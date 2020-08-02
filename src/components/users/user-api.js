const userlist = async() => {
    try {
        let response = await fetch('/api/users/', {
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

const remove = async(id) => {
    try {
        let response = await fetch('/api/users/'+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    }
    catch (err) {
        console.error(err)
    }
}

const create = async(user) => {
    try {
        let response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        })

        return await response.json()
    } catch (err) {
        console.error(err)
    }
}

export {
    userlist,
    create
}