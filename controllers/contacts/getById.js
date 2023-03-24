const { Contact } = require("../../models")
const newError = require("../../utils/newError")
const { what, how } = require("./populate")

const getById = async (req, res, next) => {
    const { id } = req.params
    const result = await Contact.findById(id).populate(what, how)
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

module.exports = getById