const { User } = require("../../models")
const newError = require("../../utils/newError")

const logout = async (req, res) => {
    const {id} = req.user
    await User.findByIdAndUpdate(id, { token: null })
    res.status(204).json()
}

module.exports = logout