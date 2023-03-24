const jwt = require("jsonwebtoken")

const {User} = require("../models")
const verifyJWT = require("../utils/jwt/verifyJWT")
const newError = require("../utils/newError")
const {SECRET_KEY} = process.env

const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers
    const [bearer, token] = authorization.split(" ")
    if (bearer !== "Bearer") newError(401, "Not authorizad")
    const id = verifyJWT(token)
    const user = await User.findById(id)
    if (!user || token !== user.token ) newError(401, "Not authorizad")
    req.user = user
    next()
}

module.exports = auth