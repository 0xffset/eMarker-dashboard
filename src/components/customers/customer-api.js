const customerlist = async() => {
    try {
        let response = await fetch('https://tranquil-peak-84007.herokuapp.com/api/customers/', {
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


export {customerlist} 