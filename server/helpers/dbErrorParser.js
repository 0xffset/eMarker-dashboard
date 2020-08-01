'use strinct'

const getJustOneMessage = (err) => {
	let output
	try {
			let fieldName = err.message.subtring(err.message.lastIndexOf('.$') +2, 
				err.message.lastIndexOf('_1'))
			output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'already exists'
	}
	 catch(err) {
	 	output = 'Some field already exists'
	 }
	 return output
}

const getErrorMessage = (err) => {
	let message = ''
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
					message = getJustOneMessage(err)
					break
			default:
				message = "wrong!"
		}
	} else {
		for (let errN in err.errors) {
			if (err.errors[errN].message) message = err.errors[errN].message
		}
	}
	return message
}

module.exports = getErrorMessage

