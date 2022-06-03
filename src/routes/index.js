var express = require('express');
var router = express.Router();
var path = require('path');
var file = require('fs');
var jwt = require('jsonwebtoken');
var indexControllers = require(path.join(__dirname, '..',`/controllers/index.js`) )

var analytics = require(path.join(__dirname, '..',`controllers/dataanalytics.js`) )
var validation = require(path.join(__dirname, '.',`/validation.js`) )

/* demo */
router.get('/', function(req, res, next) {
  indexControllers.homepage(req, res, path, next)
});

/*website*/
router.get('/website', function(req, res, next) {
  indexControllers.websitePage(req, res, path, next)
});

/*ecommerce*/
router.get('/ecommerce', function(req, res, next) {
  indexControllers.ecommercePage(req, res, path, next)
});

/* services */
router.get('/services', function(req, res, next) {
   indexControllers.servicespage(req, res, path, next)
});

/* pricing */
router.get('/pricing', function(req, res, next) {
	indexControllers.pricingpage(req, res, path, next)
});

/*enterprise*/
router.get('/enterprise', function(req, res, next) {
	indexControllers.enterprisePage(req, res, path, next)
});

/*webapp*/
router.get('/webapp', function(req, res, next) {
	indexControllers.webappPage(req, res, path, next)
});

/*about us */
router.get('/aboutus', function(req, res, next) {
	indexControllers.aboutPage(req, res, path, next)
});

//new admin interface
router.get('/main', function(req, res, next) {
	indexControllers.loggedpage(req, res, path, file, next)
});

//for checking analytics, communication and writing files
router.get('/superuser/gideon', function(req, res, next) {
	res.render('superuser')
})

//shipping
router.get('/shipping', function(req, res, next) {
	indexControllers.shipping(req, res, path, file, next)
})

//marketing
router.get('/marketing', function(req, res, next) {
	//user-specific page
		res.render('user/marketing', { title: 'Express', data:  []});
})

//social media
router.get('/socialmedia', function(req, res, next) {
	//user-specific page
		res.render('user/marketing/socialmedia', { title: 'Express', data:  []});
})

//page
router.get('/page', function(req, res, next) {
	indexControllers.page(req, res, path, file, next)
		
})
//web
router.get('/web/customer', function(req, res, next) {
	indexControllers.customer(req, res, path, file, next)
		
})

//data
router.get('/data', function(req, res, next) {
	indexControllers.data(req, res, path, file, next)
		
})

//product
router.get('/product', function(req, res, next) {
	indexControllers.product(req, res, path, file, next)
		
})
//order
router.get('/orders', function(req, res, next) {
	indexControllers.orders(req, res, path, file, next)
		
})


module.exports = router;


//for iframes in pug we'll use 2 if conditionals
//if item.name == null div = iframecontent if item.name != null normal content 
