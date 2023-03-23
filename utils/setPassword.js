const bcrypt = require('bcryptjs')

const setPassword = (password) => {
    const random = Math.round(1 + Math.random() * 19)
    return bcrypt.hashSync(password, bcrypt.genSaltSync(random))
}

module.exports = setPassword