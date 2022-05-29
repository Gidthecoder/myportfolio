var express = require('express');
var router = express.Router();
var path = require('path');
var file = require('fs');
var ipInfo = require('ip-info-finder');
var bcrypt = require('bcryptjs')

var d = require(path.join(__dirname, '..',`/controllers/data-recorder.js`) )
var dataRecorder = new d()
var newuser = require(path.join(__dirname, '..',`/controllers/newuser.js`) )

router.get('/rme', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..','/public/html/rme menu.html') );
})




router.get('/demo/pro', function(req, res, next) {
	var  req, initial, ipInfo, url, tags, date, location, trafficSource, sessionId;
	req = req, 
	initial = req.session.initial, 
	ipInfo = req.ip, 
	url = '/homepage', 
	tags = ['homepage'], 
	date = new Date(), 
	location = 'nigeria',
	trafficSource = (req.headers.referer?req.headers.referer:'Direct'),
	sessionId = req.sessionID
	dataRecorder.getData(req, res, file, path, initial, ipInfo, url, tags, date, location, trafficSource, sessionId)	
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/professional/professional-home.html`));
})

router.get('/demo/pro/about', function(req, res, next) {
	var  req, initial, ipInfo, url, tags, date, location, trafficSource, sessionId;
	req = req, 
	initial = req.session.initial, 
	ipInfo = req.ip, 
	url = '/about', 
	tags = ['about'], 
	date = new Date(), 
	location = 'nigeria',
	trafficSource = (req.headers.referer?req.headers.referer:'Direct'),
	sessionId = req.sessionID
	dataRecorder.getData(req, res, file, path, initial, ipInfo, url, tags, date, location, trafficSource, sessionId)	
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/professional/professional-about.html`));
})

router.get('/demo/pro/contact', function(req, res, next) {
	var  req, initial, ipInfo, url, tags, date, location, trafficSource, sessionId;
	req = req, 
	initial = req.session.initial, 
	ipInfo = req.ip, 
	url = '/contact', 
	tags = ['contact'], 
	date = new Date(), 
	location = 'nigeria',
	trafficSource = (req.headers.referer?req.headers.referer:'Direct'),
	sessionId = req.sessionID
	dataRecorder.getData(req, res, file, path, initial, ipInfo, url, tags, date, location, trafficSource, sessionId)	
	
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/professional/professional-form.html`));
})

router.get('/demo/pro/admin', function(req, res, next) {	
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/professional/professional-admin.html`));
})

router.get('/demo/pro/admin/login', function(req, res, next) {
	
	var  req, initial, ipInfo, url, tags, date, location, trafficSource, sessionId;
	req = req, 
	initial = req.session.initial, 
	ipInfo = req.ip, 
	url = '/admin/login', 
	tags = ['admin','login'], 
	date = new Date(), 
	location = 'nigeria',
	trafficSource = (req.headers.referer?req.headers.referer:'Direct'),
	sessionId = req.sessionID
	dataRecorder.getData(req, res, file, path, initial, ipInfo, url, tags, date, location, trafficSource, sessionId)	
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/professional/professional-admin-login.html`));
})

router.get('/demo/pro/data', function(req, res, next) {
	let date = new Date();
	let ymd = `${date.getFullYear()}${(String(date.getMonth()).length == 1? '0' + (date.getMonth() + 1): date.getMonth() + 1)}${(String(date.getDate()).length == 1? '0' + (date.getDate()): date.getDate() )}`
		
	return  dataRecorder.sessionPageData(file, path, res, ymd);
	
})

router.get('/demo/ecommerce', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-home.html`));
})

router.get('/demo/ecommerce/desc', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-desc.html`));
})

router.get('/demo/ecommerce/cat', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-cat.html`));
})

router.get('/demo/ecommerce/login', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-login.html`));
})

router.get('/demo/ecommerce/logged', function(req, res, next) {
	newuser.restricted(req, res, file, path)
})

router.get('/demo/ecommerce/logged/seller', function(req, res, next) {
	newuser.restrictedS(req, res, file, path)
})

router.get('/demo/ecommerce/register', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-register.html`));
})

router.get('/demo/ecommerce/checkout/personal', function(req, res, next) {
	if(req.session.cart){
		if(req.session.cart.length > 0){
			res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-checkout-personal.html`));
		} else {
			res.redirect('/demo/ecommerce/carts')
		}
	} else {
			res.redirect('/demo/ecommerce/carts')
	}
	
})

router.post('/demo/ecommerce/checkout/shipping', function(req, res, next) {
	if(req.body && req.session.cart.length > 0){
		req.session.personal = req.body
		console.log(req.session.personal)
		res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-checkout-shipping.html`));
	} else {
		res.redirect('/demo/ecommerce/checkout/personal')
	}
	
})

router.post('/demo/ecommerce/checkout/payment', function(req, res, next) {
	if(req.body && req.session.cart.length > 0 && req.session.personal){
		req.session.shipping = req.body
		console.log(req.session.shipping)
		res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-checkout-payment.html`));
	} else {
		res.redirect('/demo/ecommerce/checkout/shipping')
	}
})

router.post('/demo/ecommerce/checkout/complete', function(req, res, next){
	if(req.body && req.session.cart.length > 0 && req.session.personal && req.session.shipping){
		req.session.payment = req.body
		//save data in json, assign tracking number and redirect to tracking number page
		let body = {
			personal: req.session.personal,
			shipping: req.session.shipping,
			payment: req.session.payment
		}
		dataRecorder.checkoutInfo(req, res, body, file, path)
	} else {
		res.redirect('/demo/ecommerce/checkout/payment')
	}
})

router.get('/demo/ecommerce/carts', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-carts.html`));
})

router.post('/demo/ecommerce/cartadd', function(req, res, next) {
	if(req.session.cart) {
	  req.session.cart.push(req.body)
	  //req.session.save()
	  req.session.total += 1
	  res.send('seen')
	} else {
	  req.session.cart = []
	  req.session.cart.push(req.body)
	  req.session.total = 0
	  //req.session.save()
	  res.send('seen')
	}
})

router.post('/demo/ecommerce/cartmodify', function(req, res, next) {
	let filter = req.session.cart.filter(item => {return item.name == req.body.name});
	//if req.session.total > computed total, decrease req.session.total
})

router.post('/demo/ecommerce/cartincrease', function(req, res, next) {
	let filter = req.session.cart.filter(item => {return item.id == req.body.id});
	let spliceindexofelem = req.session.cart.indexOf(filter[0]);
	
	req.session.cart[spliceindexofelem].qty = Number(req.session.cart[spliceindexofelem].qty) + 1
	req.session.total += 1
	console.log(spliceindexofelem)
	console.log(req.session.cart)
	
	let sub = 0
	let total = req.session.cart.forEach(function(item){ sub += Number(item.amount) * Number(item.qty) } );
	
	res.send(`${sub}`)
})

router.post('/demo/ecommerce/cartremove', function(req, res, next) {
	let filter = req.session.cart.filter(item => {return item.id == req.body.id});
	let spliceindexofelem = req.session.cart.indexOf(filter[0]);
	
	if(req.session.cart[spliceindexofelem].qty < 2){
		req.session.cart.splice(spliceindexofelem, 1)
	} else {
		req.session.cart[spliceindexofelem].qty = Number(req.session.cart[spliceindexofelem].qty) - 1
	}
	req.session.total -= 1
	console.log(spliceindexofelem)
	console.log(req.session.cart)
	
	let sub = 0
	let total = req.session.cart.forEach(function(item){ sub += Number(item.amount) * Number(item.qty) } );
	
	res.send(`${sub}`)
})

router.get('/demo/ecommerce/cartdetails', function(req,res,next){
	if(!req.session.cart || req.session.cart.length == 0){
		res.json({status: '400'})
		return
	}
	let sessioncart = req.session.cart;
	let cart = ''
	for(let i=0; i<sessioncart.length; i++){
		cart += `<div class='items'>
					<img src=${sessioncart[i].pics}>
					<div class='secondchild'>
						<section>
							<h3 style='margin:2px;'>${sessioncart[i].name}</h3>
							<p style='margin:2px;'>size</p>
						</section>
						<section>
							<p class='modify' style='margin:2px;' data-name='${sessioncart[i].name}' data-amount='${sessioncart[i].amount}' data-pics='${sessioncart[i].pics}'><button class='minus'>-</button><input type='number' value=${sessioncart[i].qty}><button class='plus'>+</button></p>
						</section>
					</div>
					
					<div class='fourthchild'>
						<h3 style='margin:2px;' class='amount'>${Number(sessioncart[i].amount) * Number(sessioncart[i].qty) }</h3>
						
					</div>
				</div>`
	}
	let sub = 0
	let tot = sessioncart.forEach(function(item){ sub += Number(item.amount) * Number(item.qty) } )
	console.log(sub)		
	let checkout = `<b><a href='/demo/ecommerce/checkout/personal' style='color:white;'>checkout ${sub}</a></b>`
	
	res.json( {cart:cart, checkout:checkout} )
})

router.get('/demo/ecommerce/getcart', function(req,res,next){
	let cart = []
	if(!req.session.cart){
		return res.json(cart)
	}
	
	res.json(req.session.cart)
})

router.get('/demo/ecommerce/cartlength', function(req,res,next){
	if(!req.session.cart){
		res.send('0')
		return
	} 
	let length = 0
	for(let i=0; i<req.session.cart.length; i++){
		length += Number(req.session.cart[i].qty)
	}
	res.send( String(length) )
})

router.post('/demo/ecommerce/newuser', function(req,res,next){
	newuser.add(req.body, file, path, req, res, bcrypt)
})

router.post('/demo/ecommerce/log', function(req,res,next){
	newuser.log(req.body, file, path, req, res, bcrypt)
})

router.get('/demo/ordersystem', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ordersystem/ordersystem-home.html`));
})

router.get('/demo/ordersystem/food', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ordersystem/ordersystem-food.html`));
})

router.get('/demo/blog', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/blog/blog-home.html`));
})

router.get('/demo/blog/cat', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/blog/blog-cat.html`));
})

router.get('/demo/freelancer', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/freelancer/freelancer-home.html`));
})

router.get('/demo/:rmetemplate', function(req, res, next) {
	let template = req.params.rmetemplate;
	let temp = '/'+ template;
					//split the cart details to it's name and qty
					let obj = {}
					if(req.session.cart && req.session.cart.length > 0){
						console.log(req.session)
						console.log('cart is here')
						req.session.length = 0
						for(let i =0; i < req.session.cart.length; i++){
							obj[req.session.cart[i].name]= {qty: req.session.cart[i].qty, amount: req.session.cart[i].amount}
							req.session.length += req.session.cart[i].qty
							req.session.total = req.session.cart[i].qty * req.session.cart[i].amount
						}
						
					}
					file.readFile(path.join(__dirname, `..`,`/public/json/shipping/happiness20700@gmail.comshipping.json`), 'utf8', 
						function(err, data) {
							let d = JSON.parse(data)
							res.render(`layout/${template}`, { title: 'Express', cart: (req.session.cart ? req.session.cart: req.session.cart = []), length: (req.session.length ? req.session.length: req.session.length = 0), added: obj, shipping: d });  
					});
})
//checking information
router.post('/checkinfo', function(req, res, next) {
	console.log(req.body)
	if(!req.session.cart){return res.send('no cart available')}
	let body = req.body;
	if(body.firstname == ''){
		return res.send('incomplete')
	} else if(body.lastname == ''){
		return res.send('incomplete')
	} else if(body.email == ''){
		return res.send('incomplete')
	} else if(body.phoneno == ''){
		return res.send('incomplete')
	}
	req.session.info = req.body
	res.send('complete')
});


//checking inventory
router.post('/checkinventory', function(req, res, next) {
	if(!req.session.cart){return res.send('no cart available')}
	let body = req.body;
	
   file.readFile(path.join(__dirname, `..`,`/public/json/shipping/happiness20700@gmail.cominventory.json`), 'utf8', 
    function(err, data) {
		let d = JSON.parse(data);
		let newd = []
		for(let i=0; i<d.length; i++){
			for(let b=0; b<body.cart.length; b++){
				if(d[i].name == body.cart[b].name){
					newd.push({name: body.cart[b].name, netquantity: Number(d[i].qty) - Number(body.cart[b].qty)})
				}
			}
		}
		res.json(newd)
   })
});

//checking shipping
router.post('/checkshipping', function(req, res, next) {
	if(!req.session.cart){return res.send('no cart available')}
	let body = req.body;
	
   file.readFile(path.join(__dirname, `..`,`/public/json/shipping/happiness20700@gmail.comshipping.json`), 'utf8', 
    function(err, data) {
		let d = JSON.parse(data);
		
		let newd = []
		if(body.type == 'local'){
		  for(let i=0; i<d.local.length; i++){
			if( (d.local[i].location.country == body.country.toUpperCase() || d.local[i].location.country == 'all') && (d.local[i].location.state == body.state.toUpperCase() || d.local[i].location.state == 'all') &&  (d.local[i].location.city == body.city.toUpperCase() || d.local[i].location.city == 'all') ){
				req.session.delivery = {type: body.type, info: body.info}
				res.json({rate: d.local[i].rate})
			} else {
				res.json({rate: 'null'})
			}
		  }
		} else if (body.type=='pickup'){
			req.session.delivery = {type: body.type, info: body.info}
			res.json({rate: 'Jesus paid it all'})
		}
		
		//use loop to check if the product type is local or third party, use if/else to split ops, check the availability in the region
		/*
		inventory->[{name:,type:,region: [{country:,state:,city:}],rate: }]
		for(let i=0; i<products.length; i++){
			if(body.cart[b].name == products[i].name && products[i].type=='thirdparty'){
				if(products[i].regions[u].state == body.state ){ newd.push({name: body.cart[b].name,type:thirdparty,available:true,rate:100 naira}) }
				else { newd.push({name: body.cart[b].name,type:thirdparty,available:false,rate:100 naira} }
			} else {
				if(products[i].regions[u].state == body.state ){ newd.push({name: body.cart[b].name,type:local,available:true,rate:100 naira}) }
				else { newd.push({name: body.cart[b].name,type:local,available:false,rate:100 naira} }
			}
		}
		*/
   })
});
//clear session 
router.get('/completeorder0', function(req, res, next) {
	req.session.destroy();
	console.log(req.session)
	res.redirect('/demo/ecommerce')
})

//complete order
router.get('/completeorder', function(req, res, next) {
	let obj = {info: req.session.info, cart: req.session.cart, delivery:req.session.delivery}
	if(!obj.cart){return res.send('no cart available')}
	//push the info the order json
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/order/happiness20700@gmail.comorder.json`), 'utf8', 
		function(err, page) {
			let d = JSON.parse(page);  
			d.push(obj)	
			
			res.send('data')
			
			let stringified = JSON.stringify(d)
			file.writeFile(path.join(__dirname, `..`,`/public/json/analytics/order/happiness20700@gmail.comorder.json`), stringified, 'utf-8', function(err){if(err) throw err});
	})
	
})

						


//update cart details
router.post('/updatecartdetails', function(req, res) {
  let body = req.body;
  let filter = req.session.cart.filter(item => {return item.name == body.name})
  let index = req.session.cart.indexOf(filter[0])
  //filter[index].qty = body.qty
  
  res.send('update successful')
  req.session.cart[index].qty = body.qty
  
  console.log(req.session.cart)
});




module.exports = router;
