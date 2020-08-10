const recentorders = async() => {
    try {
        let response = await fetch('/api/orders/', {
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


export {recentorders} 