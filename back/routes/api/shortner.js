const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const shortnerController = require('../../controllers/shortnerController');


router.route('/')
    .get (shortnerController.handleGetShortner)
    .post(verifyJWT,shortnerController.handleCreateShortner)

module.exports = router;