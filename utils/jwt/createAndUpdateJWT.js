const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const { SECRET_KEY } = process.env

const createAndUpdateJWT = async (id) => {
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: "4h" })
    await User.findByIdAndUpdate(id, { token })
    return token
}
module.exports = createAndUpdateJWT