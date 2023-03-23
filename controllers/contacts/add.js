const { Contact } = require("../../models")

const add = async (req, res, next) => {
    req.body.owner = req.user._id
    const result = await Contact.create(req.body)
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    })
}

module.exports = add