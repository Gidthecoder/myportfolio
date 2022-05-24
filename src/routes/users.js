var express = require('express');
var router = express.Router();
var path = require('path');
var file = require('fs');
var path = require('path');
var nodeoutlook = require('nodejs-nodemailer-outlook');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')




var rand, mailOptions, host, links;

router.get('/mail', function(req, res, next) {
  nodeoutlook.sendEmail({
	  auth:{
		  user:"giddyconnect@outlook.com",
	      pass:"alex100206060"
	  },
	  from:'giddyconnect@outlook.com',
	  to:'akinsanmi20700@gmail.com',
	  subject:"hello",
	  html:'<b>your mail</b>',
	  onError: (e) => console.log(e),
	  onSuccess: (i) => console.log(i)
  })
	
});


router.get('/login', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','/public/html/login.html'));
});
router.post('/checkauth', function(req, res, next) {
	//rate limiter algorithm
	
	let auth = new Buffer.from( req.headers.authorization.split(' ')[1], 'base64').toString().split(':') 
	//console.log(auth)
	file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
         function(err, data) {
			 let d = JSON.parse(data);
			 let filter = d.filter(obj => obj.email == auth[0] )
			 let indexoffilter = d.indexOf(filter[0])
			 if(filter.length == 0 || !bcrypt.compareSync(auth[1], d[indexoffilter].businesspassword)){
				 
			     return res.status(404).json({msg:'incorrect'})
			 } else if(filter.length > 0 && bcrypt.compareSync(auth[1], d[indexoffilter].businesspassword) ){
			    if(d[indexoffilter].verified == false){
					
					let otp = Math.floor( Math.random() * 900000 + 10000)
					d[indexoffilter].twoFA.otp = String(otp)
					res.cookie('almostotp', auth[0], { HTTPonly: true, secure: false, sameSite: 'lax'})
					res.status(200).json({msg:'enter otp', content: `This Is A Development Server. Use The OTP: ${otp} or Check Your Email ${auth[0]}`})
				} else if (d[indexoffilter].twoFA.permission == true) {
					//send 2fa email
					let otp = Math.floor( Math.random() * 900000 + 10000)
					d[indexoffilter].twoFA.otp = String(otp)
					res.cookie('almostotp', auth[0], { HTTPonly: true, secure: false, sameSite: 'lax'})
					 res.status(200).json({msg:'enter otp', content: `This Is A Development Server. Use The OTP: ${otp} or Check Your Email ${auth[0]}`})
					 
				} else if (d[indexoffilter].securityQ.permission == true) {
					//send security Q 
					res.cookie('almost', auth[0], { HTTPonly: true, secure: false, sameSite: 'lax'})
					res.status(200).json({msg:'enter sq', content: d[indexoffilter].securityQ.question[0].q})
					
				} else {
					let mail = auth[0]
					res.cookie('user', mail, { HTTPonly: true, secure: false, sameSite: 'lax'})
					console.log('cookies has been assigned to you')
					if(d[indexoffilter].ip != String(req.ip)){
						//assign cookies, send permission to redirect to main
						console.log('ip is not the same')
						d[indexoffilter].ip = String(req.ip)
						console.log(req.ip)
						 res.status(200).json({msg:'cool', content: 'ip is not the same'})
					} else {
					
					  res.status(200).json({msg:'cool'})
		            }
				}
				let stringified = JSON.stringify(d);
		        file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
			}
		 })
});

//verify security keys
router.post('/checksq', function(req, res){
	 if(req.cookies['almost']){
		 file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
         function(err, data) {
			 let d = JSON.parse(data);
			 let filter = d.filter(obj => obj.email ==  req.cookies['almost'])
			 let indexoffilter = d.indexOf(filter[0])
			 if(filter.length == 0){return res.status(404).json({msg: 'incorrect'})}
			 else {
				 if(d[indexoffilter].securityQ.question[0].ans == req.body.ans){
					res.cookie('user', req.cookies['almost'], { HTTPonly: true, secure: false, sameSite: 'lax'})
					console.log('cookies has been assigned to you')
					res.clearCookie('almost')
					res.status(200).json({msg: 'cool'})
				 } else {
					 console.log('wrong')
				 }
			 }
		 })
	 } else {
		  res.status(404).json({msg: 'incorrect'})
	 }
})

//verify otp
router.post('/checkotp', function(req, res){
	 if(req.cookies['almostotp']){
		 file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
         function(err, data) {
			 let d = JSON.parse(data);
			 let filter = d.filter(obj => obj.email ==  req.cookies['almostotp'])
			 let indexoffilter = d.indexOf(filter[0])
			 if(filter.length == 0){return res.status(404).json({msg: 'incorrect'})}
			 else {
				 if(d[indexoffilter].twoFA.otp == req.body.ans){
					 filter[indexoffilter].verified = true
					res.cookie('user', req.cookies['almostotp'], { HTTPonly: true, secure: false, sameSite: 'lax'})
					console.log('cookies has been assigned to you')
					res.clearCookie('almostotp')
					res.status(200).json({msg: 'cool'})
				 } else {
					 console.log('wrong')
				 }
			 }
			 let stringified = JSON.stringify(d);
		     file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
		 })
	 } else {
		  res.status(404).json({msg: 'incorrect'})
	 }
})

//forgot Password
router.post('/forgotpassword', function(req, res){
	if(!req.body.ans){return res.sendFile(path.join(__dirname, '..','/public/html/login.html'));}
	else if (req.body.ans){
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
         function(err, data) {
			 let d = JSON.parse(data);
			 let filter = d.filter(obj => obj.email == req.body.ans)
			 let indexoffilter = d.indexOf(filter[0])
			 console.log(filter)
			 res.send("we've sent you an email to complete your password recovery")
		})
	} else {
		res.send('wrong request')
	}
	
})

//demos
router.get('/newuser', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..','/public/html/newuser.html') );
})

//updating accounting info
router.post('/accountinfoupdate', function(req, res, next) {
	let body = Object.keys(req.body);
	let infos = req.body
	if(req.cookies['user']){
	 file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
      function(err, data) {
		 let d = JSON.parse(data)
		 //filter by email address
		 let filterbyemail = d.filter(obj => obj.email == req.cookies['user'])
		 let indexoffilter = d.indexOf(filterbyemail[0])
		 if(filterbyemail.length == 0){return res.sendFile(path.join(__dirname, '..','/public/html/login.html') ) }
         if (body[0] == 'business') {
            d[indexoffilter].businessname = infos[body[0]].businessname
			d[indexoffilter].country = infos[body[0]].country
			d[indexoffilter].phoneno = infos[body[0]].phoneno
			let stringified = JSON.stringify(d)
			file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
			res.send('business updated')
         }  else if (body[0] == 'twoFAsq'){
			 
			 if(infos.twoFAsq.type == 'twoFA'){
				 if(infos.twoFAsq.value == true){
					 d[indexoffilter][infos.twoFAsq.type].permission = true
					 d[indexoffilter].securityQ.permission = false
					 res.send(`${infos.twoFAsq.type} updated`)
					 //write to customers json file
					 let stringified = JSON.stringify(d);
					 file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
				 } else if (infos.twoFAsq.value == false) {
					d[indexoffilter][infos.twoFAsq.type].permission = false
					 d[indexoffilter].securityQ.permission = true
					 
					 res.send(`${infos.twoFAsq.type} updated`)
					 //write to customers json file
					 let stringified = JSON.stringify(d);
					 file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
				 }
			 } else if (infos.twoFAsq.type == 'securityQ'){
				 if(infos.twoFAsq.value == true){
					 d[indexoffilter][infos.twoFAsq.type].permission = true
					 d[indexoffilter].twoFA.permission = false
					 
					 res.send(`${infos.twoFAsq.type} updated`)
					 //write to customers json file
					 let stringified = JSON.stringify(d);
					 file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
				 } else if (infos.twoFAsq.value == false) {
					d[indexoffilter][infos.twoFAsq.type].permission = false
					 d[indexoffilter].towFA.permission = true
					 
					 res.send(`${infos.twoFAsq.type} updated`)
					 //write to customers json file
					 let stringified = JSON.stringify(d);
					 file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
				 }
			 } else if (infos.twoFAsq.type == 'Disable'){
				 if(infos.twoFAsq.value == true){
					 d[indexoffilter].securityQ.permission = false
					 d[indexoffilter].twoFA.permission = false
					 
					 res.send(`All Extra Security Cancelled`)
					 //write to customers json file
					 let stringified = JSON.stringify(d);
					 file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
				 }
			 }
		 }  else if (body[0] == 'modifySQ'){
			 //console.log(req.body)
			 d[indexoffilter].securityQ.question[0].q = infos.modifySQ.question
			 d[indexoffilter].securityQ.question[0].ans = infos.modifySQ.answer
			 
			 res.send('security questions has been updated')
			 
			 let stringified = JSON.stringify(d);
			 file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
		  	 
		 } else {
			 res.send("your info isn't correct")
		 }
	  })
	} else {
		res.sendFile(path.join(__dirname, '..','/public/html/login.html'));
	}
})





//adding new users
router.post('/newuser', function(req, res, next) {
	let body = req.body;
	
	//checking email and sending email
	file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
      function(err, data) {
		  let date = new Date();
		  
		  let d = JSON.parse(data);
	   
	     let aa = d.filter(obj => obj.email == req.body.email || obj.phoneno == req.body.phoneno)
	   
	   //if email exist
	   if(aa.length == 1) {
		   res.send('email or phoneno already exist')
		   return
		}
	   else {
		   req.body.businesspassword = bcrypt.hashSync(req.body.businesspassword, 10)
		   let infoToPass = req.body
		   infoToPass.verified = false
		   
		   
		   //create a 6-digit OTP
		   let otp = Math.floor( Math.random() * 900000 + 10000)
		   infoToPass.twoFA = {permission:false,otp:String(otp)}
		   infoToPass.securityQ = {permission:false, question:[{q:'',ans:''}] }
		   infoToPass.ip = String(req.ip)
		   
		   res.cookie('almostotp', req.body.email, { HTTPonly: true, secure: false, sameSite: 'lax'})
		   
		   d.push(infoToPass)
		   
		   //convert to json and save it to the json file
		   stringified = JSON.stringify(d)
		   file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
		   
		   
		   res.status(200).send(`data received. check your email or use the otp:${otp} to complete your registration`)
		   
		   //send the mail
		   /*let mail ={"mail": req.body.business.businesscontact.mail, "created":date.toString() }
		   let mail_verification = jwt.sign(mail, 'AGHH123@!', {expiresIn: '2d'})
		   host = req.get('host');
	       link = 'http://'+req.get('host')+'/users/verify?id='+mail_verification;
	
		   mailOptions = {
			from: '"my code world" <giddyconnect@outlook.com>',
			to: req.body.business.businesscontact.mail,
			subject: 'please confirm your email account',
			html: "click on the <a href="+link+">link</a> to verify"
		   }
	   
	       console.log(mailOptions);
		  */
	   }
		
	  }
	)
})

//verify otp
router.post('/otp/verification', function(req, res){
	 console.log(req.cookies['almostotp'])
		  if(req.cookies['almostotp']){
			  console.log(req.cookies['almostotp'])
			  file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
				function(err, data) {
					let date = new Date()
					let d = JSON.parse(data);
					let filter = d.filter(obj => obj.email ==  req.cookies['almostotp'])
					let indexoffilter = d.indexOf(filter[0])
					console.log(filter)
					if(filter.length == 0){return res.redirect('/users/login') }
					else {
						if(d[indexoffilter].twoFA.otp == req.body.otp){
							d[indexoffilter].verified = true
							d[indexoffilter].billing = {deposit: '0', content: [{month: date.getMonth() + 1, year: date.getFullYear(), tax: '0',features:[{feat: 'hosting', rate:'null', qty:'0', amount:'0'}] }] }
							file.readFile(path.join(__dirname, '..','/views/user.jade'), 'utf8', 
								function(err, userdemo) {
									let doc = userdemo;
									
									res.cookie('user', req.cookies['almostotp'], { HTTPonly: true, secure: false, sameSite: 'lax'})
									console.log('cookies has been assigned to you')
							      try {
									file.readFile(path.join(__dirname, `..`,`/public/json/page/pagesdemo.json`), 'utf8', 
										function(err, data) {
											file.readFile(path.join(__dirname, `..`,`/public/json/productpage/productpagedemo.json`), 'utf8', 
												function(err, pdata) {
													file.readFile(path.join(__dirname, `..`,`/public/json/shipping/demoshipping.json`), 'utf8', 
														function(err, shipdata) {
															file.readFile(path.join(__dirname, `..`,`/public/json/shipping/demoinventory.json`), 'utf8', 
																function(err, invdata) {
																	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/order/demoorder.json`), 'utf8', 
																		function(err, orderdata) {
																			file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/demopages.json`), 'utf8', 
																				function(err, pagesdata) {
																					file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/demosession.json`), 'utf8', 
																						function(err, sessiondata) {
																							
																							file.writeFile(path.join(__dirname, '..',`/public/json/analytics/session/${req.cookies['almostotp']}session.json`), sessiondata, 'utf-8', function(err){if(err) throw err})
																								
																							res.clearCookie('almostotp')
																							res.redirect('/main?navigation=content')
									
																							
																					})
																					file.writeFile(path.join(__dirname, '..',`/public/json/analytics/pages/${req.cookies['almostotp']}pages.json`), pagesdata, 'utf-8', function(err){if(err) throw err})
																			})
																			file.writeFile(path.join(__dirname, '..',`/public/json/analytics/order/${req.cookies['almostotp']}order.json`), orderdata, 'utf-8', function(err){if(err) throw err})
																	})
																	file.writeFile(path.join(__dirname, '..',`/public/json/shipping/${req.cookies['almostotp']}inventory.json`), invdata, 'utf-8', function(err){if(err) throw err})
															})
															
															file.writeFile(path.join(__dirname, '..',`/public/json/shipping/${req.cookies['almostotp']}shipping.json`), shipdata, 'utf-8', function(err){if(err) throw err})
													})
													file.writeFile(path.join(__dirname, '..',`/public/json/productpage/${req.cookies['almostotp']}product.json`), pdata, 'utf-8', function(err){if(err) throw err})
														
											})
											file.writeFile(path.join(__dirname, '..',`/public/json/page/${req.cookies['almostotp']}pages.json`), data, 'utf-8', function(err){if(err) throw err})
									})
									file.writeFile(path.join(__dirname, '..',`/views/users/${req.cookies['almostotp'].split('.com')[0]}user.jade`), doc, 'utf-8', function(err){if(err) throw err})
								  } catch(e){
									  console.log(e)
								  }
							})
							
						} else {
							res.send('wrong')
							console.log('wrong')
						}
					}
					let stringified = JSON.stringify(d);
					file.writeFile(path.join(__dirname+'/customers.json'), stringified, 'utf-8', function(err){if(err) throw err});
				})
		  } else {
			  res.redirect('/login')
		  }
})



//getting bills
router.post('/getbills', function(req, res){
	if(req.cookies['user']){
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
				function(err, data) {
					let d = JSON.parse(data);
					let filter = d.filter(obj => obj.email ==  req.cookies['user'])
					let indexoffilter = d.indexOf(filter[0])
					if(filter.length == 0){return}
					let datefilter = d[indexoffilter].billing.content.filter(item => item.month == req.body.month && item.year == req.body.year)
					console.log(d[indexoffilter].billing.content[0].year )
					console.log(req.body.year)
					let indexofdatefilter = d[indexoffilter].billing.content.indexOf(datefilter[0]);
					res.json({month: req.body.month, year: req.body.year, content: datefilter[0].features, taxtotal: datefilter[0].tax })
		})
	} else {
		res.sendFile(path.join(__dirname, '..','/public/html/login.html'));
	}
})

router.post('/changepassword', function(req, res){
	if(req.cookies['user']){
		//send email to user
		res.send('check your email tochange password')
	}
})

router.get('/logout', function(req, res){
	if(req.cookies['user']){
		res.clearCookie('user')
		res.redirect('/')
	}
})



module.exports = router;
