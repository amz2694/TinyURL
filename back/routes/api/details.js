const express = require('express');
const router = express.Router();
const detailsController = require('../../controllers/detailsController');

router.get('/', detailsController.handleDetails);

module.exports = router;