
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
						
						res.redirect('/demo/ecommerce/logged')
					}
				})
		}
		
		log(body, file, path, res, bcrypt){
			file.readFile(path.join(__dirname, `..`,`/database/ecommerceuser.json`), 'utf8', 
				function(err, user) {
					let d = JSON.parse(user);
					
					let filter = d.filter(item => {return item.email == body.email && bcrypt.compareSync(body.password , item.password) })
					
					if(filter.length == 1){
						res.redirect('/demo/ecommerce/logged')
						
					} else {
						return res.send('this account does not exist')
					}
				})
		}
		//
		
		
		
		
		
	
}
	
module.exports =  new Newuser()