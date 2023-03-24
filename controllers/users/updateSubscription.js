const { User } = require("../../models")
const newError = require("../../utils/newError")

const updateSubscription = async(req, res) => {
    const {user: { email, _id, subscription: userSub }, body: {subscription: bodySub}} = req
    if (userSub === bodySub) newError(400, `The subscription: ${bodySub} must be different from the connected one`)
    await User.findByIdAndUpdate(_id,{subscription: bodySub})
    res.json({
        status: 'success',
        code: 200,
        data: {
            email,
            subscription: bodySub
        }
    })
}

module.exports = updateSubscription