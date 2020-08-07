const  create = async(product) => {
	try {
		let res = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
			},
			body: product
		})
		return res.json()
	}
	catch (err) {
		console.error(err)
	}
}

const  update = async(product, id) => {
	try {
		let res = await fetch('/api/products/'+id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
			},
			body: product
		})
		return res.json()
	}
	catch (err) {
		console.error(err)
	}
}

const productlist = async() => {
    try {
        let response = await fetch('/api/products', {
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

const getProductBefore = async(id) => {
    try {
        let response = await fetch('/api/products/'+id, {
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

module.exports = {
	create,
	productlist,
	getProductBefore,
	update
}