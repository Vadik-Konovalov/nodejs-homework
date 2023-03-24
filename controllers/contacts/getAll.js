const { Contact } = require("../../models")
const { what, how } = require("./populate")

const getAll = async (req, res, next) => {
    const { page = 1, limit = 20 , favorite = null} = req.query
    const skip = page * limit - limit
    const findBy = {} 
    if (favorite !== null) findBy.favorite = favorite
    const result = await Contact.find(findBy, "", {skip, limit: +limit}).populate(what, how)
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getAll