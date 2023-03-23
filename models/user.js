const { Schema, model } = require("mongoose")
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const userSchema = Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null
        }
    } , { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password){
    const random = Math.round(1 + Math.random() * 19)
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(random))
}
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

const joiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    subscription: Joi.string().valid("starter", "pro", "business")
})

const subscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
})

module.exports = {
    User,
    joiSchema,
    subscriptionJoiSchema
}