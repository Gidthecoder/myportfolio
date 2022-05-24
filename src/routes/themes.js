var express = require('express');
var router = express.Router();
var path = require('path');

var file = require('fs');

router.get('/', function(req, res, next) {
	res.render('themes', { title: 'Express'} )
})


router.get('/:themename', function(req, res, next) {
	res.render(`${req.params.themename}`, { title: 'Express'} )
})


module.exports = router;
