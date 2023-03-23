const express = require('express')

const { users: ctrl } = require("../../../controllers")
const { validation, ctrlWrapper } = require('../../../middlewares')
const { auth } = require('../../../middlewares')
const { subscriptionJoiSchema } = require('../../../models/user')

const router = express.Router()

router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent))
router.patch("/", ctrlWrapper(auth), validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription))

module.exports = router