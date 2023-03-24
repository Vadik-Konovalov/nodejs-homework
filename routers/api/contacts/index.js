const express = require('express')

const { contacts: ctrl } = require("../../../controllers")
const { validation, ctrlWrapper, auth } = require('../../../middlewares')
const { joiSchema, favoriteJoiSchema } = require('../../../models/contact')

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll))

router.get("/:id", ctrlWrapper(ctrl.getById))

router.post("/",ctrlWrapper(auth), validation(joiSchema), ctrlWrapper(ctrl.add))

router.put("/:id",ctrlWrapper(auth), validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch("/:id/favorite",ctrlWrapper(auth), validation(favoriteJoiSchema), ctrlWrapper(ctrl.patchFavoriteById))

router.delete("/:id",ctrlWrapper(auth) , ctrlWrapper(ctrl.deleteById))

module.exports = router