const { Contact } = require("../../models")
const newError = require("../../utils/newError")
const { what, how } = require("./populate")

const deleteById = async (req, res, next) => {
    const { params: { id }, user } = req
    const result = await Contact.findOneAndDelete({_id: id, owner: user._id}).populate(what, how)
    if (!result) {
        const message = `Contact whith id:${id} not found or you is not owner`
        newError(404, message)
    }
    res.json({
        status: 'success',
        code: 200,
        message: "contact deleted",
        data: {
            result
        }
    })
}

module.exports = deleteById