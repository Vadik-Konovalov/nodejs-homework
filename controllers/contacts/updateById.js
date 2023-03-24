const { Contact } = require("../../models")
const newError = require("../../utils/newError")
const { what, how } = require("./populate")

const updateById = async (req, res, next) => {
    const { body, params: { id }, user} = req
    const result = await Contact.findOneAndUpdate({_id:id, owner: user._id}, body, {new: true}).populate(what, how)
    if (!result) {
        const message = `Contact whith id:${id} not found`
        newError(404, message)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = updateById