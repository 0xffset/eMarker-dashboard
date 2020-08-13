const userlist = async() => {
    try {
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/api/users/', {
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
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/api/users/'+id, {
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

const update = async(id, user) => {
    try {
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/api/users/'+id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    }
    catch (err) {
        console.error(err)
    }
}

const create = async(user) => {
    try {
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/api/users/', {
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
    update,
    userlist,
    create,
    remove
}