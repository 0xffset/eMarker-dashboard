const signin = async (user) => {
    try {
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/auth/signin/', {
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
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/auth/signout', {method: 'GET'})
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