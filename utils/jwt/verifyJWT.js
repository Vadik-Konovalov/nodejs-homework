const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const verifyJWT = (token) => {
    try {
        const { id } = jwt.verify(token, SECRET_KEY)
        return id
    } catch (error) {
        if (error.message === "invalid signature") error.status = 401
        throw error
    }
}

module.exports = verifyJWT