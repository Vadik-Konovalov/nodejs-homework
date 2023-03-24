const { User } = require("../../models")
const createAndUpdateJWT = require("../../utils/jwt/createAndUpdateJWT")
const newError = require("../../utils/newError")
const setPassword = require("../../utils/setPassword")

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(user) {
        newError(409,`User whith email:${email} already exist`)
    }
    const hashPass = setPassword(password)
    const newUser = await User.create({ email, password: hashPass })
    const token = await createAndUpdateJWT(newUser._id)

    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            email,
            token
        }
    })
}

module.exports = register