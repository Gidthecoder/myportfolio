
class Newuser {
	  constructor(name, age){
	    this.name = name
		this.age = age
	  }
	 
	  //method 
		add(body, file, path, res, bcrypt){
			file.readFile(path.join(__dirname, `..`,`/database/ecommerceuser.json`), 'utf8', 
				function(err, user) {
					let d = JSON.parse(user);
					
					let filter = d.filter(item => {return item.email == body.email && item.phoneno == body.phoneno})
					if(filter.length == 1){
						return res.send('this email exist')
					} else {
						body.password = bcrypt.hashSync(body.password, 10)
						let obj = {name: body.name, email: body.email, password: body.password, phoneno: body.phoneno}
						
						d.push(obj)
						
						let stringified = JSON.stringify(d)
						file.writeFile(path.join(__dirname, `..`,`/database/ecommerceuser.json`), stringified, 'utf-8', function(err){if(err) throw err});
						
						res.redirect('/demo/ecommerce/login')
					}
				})
		}
		
		log(body, file, path, req, res, bcrypt){
			file.readFile(path.join(__dirname, `..`,`/database/ecommerceuser.json`), 'utf8', 
				function(err, user) {
					let d = JSON.parse(user);
					
					let filter = d.filter(item => {return item.email == body.email && bcrypt.compareSync(body.password , item.password) })
					
					if(filter.length == 1){
						req.session.user = body.email
						let index = d.indexOf(filter[0])
						if(req.ip != d[index].ip) {
							console.log('this ip is not correct')
						}
						d[index].ip = req.ip
						
						let stringified = JSON.stringify(d)
						file.writeFile(path.join(__dirname, `..`,`/database/ecommerceuser.json`), stringified, 'utf-8', function(err){if(err) throw err});
						
						res.redirect('/demo/ecommerce/logged')
						
					} else {
						return res.redirect('/demo/ecommerce/login')
					}
				})
		}
		
		restricted(req, res, file, path){
			
			file.readFile(path.join(__dirname, `..`,`/database/ecommerceuser.json`), 'utf8', 
				function(err, user) {
					let d = JSON.parse(user);
					
					if(req.session.user){
						
						let filter = d.filter(item => {return item.email == req.session.user })
						let index = d.indexOf(filter[0]);
						if(filter.length == 0){ return res.redirect('/demo/ecommerce/login') 
						} else if (req.ip != filter[index].ip){
							return res.redirect('/demo/ecommerce/login') 
						}
						return res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-logged.html`));
						//
					} else {
						return res.redirect('/demo/ecommerce/login')
					}
			})
		}
		
		restrictedS(req, res, file, path){
			
			file.readFile(path.join(__dirname, `..`,`/database/ecommerceuser.json`), 'utf8', 
				function(err, user) {
					let d = JSON.parse(user);
					
					if(req.session.user){
						
						let filter = d.filter(item => {return item.email == req.session.user })
						let index = d.indexOf(filter[0]);
						if(filter.length == 0){ return res.redirect('/demo/ecommerce/login') 
						} else if (req.ip != filter[index].ip){
							return res.redirect('/demo/ecommerce/login') 
						}
						return res.sendFile(path.join(__dirname, '..','..',`/public/html/layout/ecommerce/ecommerce-logged-seller.html`));
						//
					} else {
						return res.redirect('/demo/ecommerce/login')
					}
			})
		}
}
	
module.exports =  new Newuser()