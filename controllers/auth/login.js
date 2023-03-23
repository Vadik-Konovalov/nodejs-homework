const { User } = require("../../models")
const createAndUpdateJWT = require('../../utils/jwt/createAndUpdateJWT')
const newError = require("../../utils/newError")

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !user.comparePassword(password)) {
        newError(401, 'Invalid email or password')
    }
    const token = await createAndUpdateJWT(user._id)

    res.json({
        status: 'success',
        code: 200,
        data: {
            email,
            token
        }
    })
}

module.exports = login