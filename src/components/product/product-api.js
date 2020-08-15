const API_KEY = process.env.REACT_APP_KEY_DEV

const  Create = async(product, credentials) => {
	try {
		let res = await fetch(`${API_KEY}/api/products`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'access-token': credentials.t
			},
			body: product
		})
		return res.json()
	}
	catch (err) {
		console.error(err)
	}
}

const  update = async(product, id, credentials) => {
	try {
		let res = await fetch(`${API_KEY}/api/products/`+id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'access-token': credentials.t
			},
			body: product
		})
		return res.json()
	}
	catch (err) {
		console.error(err)
	}
}

const productlist = async(credentials, signal) => {
    try {
        let response = await fetch(`${API_KEY}/api/products`, {
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

const getProductBefore = async(id, credentials) => {
    try {
        let response = await fetch(`${API_KEY}/api/products/`+id, {
            method: 'GET',
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

export  {
	Create,
	productlist,
	getProductBefore,
	update
}