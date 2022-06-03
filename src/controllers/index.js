//data
class Index {
	constructor(name, age){
	    this.name = name
		this.age = age
	}
	//statics
	static friend = 'paul'
	static friendAge(){
	    return 30
	}
	//getter
	get tenYears(){
		let f = 5;
	    return this.totalYear() * 5
	}
	//method 
	homepage(req, res, path, next){
	    console.log(req.ip)
		console.log(process.env.PORT)
		res.sendFile(path.join(__dirname, '..','..','/public/html/it srvices and cms.html'));
	}
	
	websitePage(req, res, path, next){
		res.sendFile(path.join(__dirname, '..','..','/public/html/websitepage.html'));
	}
	
	servicespage(req, res, path, next){
		res.sendFile(path.join(__dirname, '..','..','/public/html/services.html'));
	}
	
	ecommercePage(req, res, path, next){
		res.sendFile(path.join(__dirname, '..','..','/public/html/ecommercepage.html'));
	}
	
	pricingpage(req, res, path, next){
		res.sendFile(path.join(__dirname, '..','..','/public/html/pricing.html'));
	}
	
	enterprisePage(req, res, path, next){
		res.sendFile(path.join(__dirname, '..','..','/public/html/enterprisepage.html'));
	}
	
	webappPage(req, res, path, next){
		res.sendFile(path.join(__dirname, '..','..','/public/html/webapppage.html'));
	}
	
	aboutPage(req, res, path, next){
		res.sendFile(path.join(__dirname, '..','..','/public/html/aboutpage.html'));
	}
	
	loggedpage(req, res, path, file, next){
		
		//let data = indexServices.loggedpage(req, res, path, file, next);
	    let navigation = req.query.navigation;
		let tokens = req.cookies['user'];
		if(navigation == ''){return res.sendFile(path.join(__dirname, '..','/public/html/login.html'))}
		
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
			function(err, customer) {
				let customers = JSON.parse(customer);
				if(!tokens) {return res.sendFile(path.join(__dirname, '..','/public/html/login.html')) } 
				else{
					let filterbymail = customers.filter(obj => obj.email == tokens )
					if(filterbymail.length < 1){return res.status(500).send('Incorrect Request')}
					let indexoffilterbyemail = customers.indexOf(filterbymail[0])
				
					if(customers[indexoffilterbyemail].verified == false){
						return res.send('you have not been verified')
					} else if(customers[indexoffilterbyemail].verified == true) {
					
							let date = new Date()
							//get the length of the top nested Object
							let ft = customers[indexoffilterbyemail].billing.content.filter(item => item.month == date.getMonth() + 1 && item.year == date.getFullYear() )
							let dd = []
							
							for(let i=0; i<customers[indexoffilterbyemail].billing.content.length; i++){
								if(customers[indexoffilterbyemail].billing.content[i].month == date.getMonth() + 1 && customers[indexoffilterbyemail].billing.content[i].year == date.getFullYear()){
									//do nothing
								} else {
									dd.push(`${customers[indexoffilterbyemail].billing.content[i].month}:${customers[indexoffilterbyemail].billing.content[i].year}` )
								}
							}
							let m = customers[indexoffilterbyemail].email.split('.com')[0]
							        //replace the userpage with a customize one. To Be Done Later.
									res.render(`users/${m}user`, { 
										title: 'Express', 
										user: customers[indexoffilterbyemail],
										nav: navigation,
										date: ft[0],
                                        dd: dd
									});	
				    
					}
				}
		})
	}
	
	shipping(req, res, path, file, next){
		let tokens = req.cookies['user'];
		
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
			function(err, customer) {
				let customers = JSON.parse(customer);
				if(!tokens) {return res.sendFile(path.join(__dirname, '..','/public/html/login.html')) } 
				else{
					let filterbymail = customers.filter(obj => obj.email == tokens /*&& bycrypt compare*/)
					if(filterbymail.length < 1){return res.status(500).send('you have a problem')}
						let indexoffilterbyemail = customers.indexOf(filterbymail[0])
						//console.log(filterbymail)
						//console.log(indexoffilterbyemail)
						if(customers[indexoffilterbyemail].verified == false){
							res.send('you have not been verified')
						} else if(customers[indexoffilterbyemail].verified == true) {
				
							file.readFile(path.join(__dirname, `..`,`/public/json/shipping/${tokens}shipping.json`), 'utf8', 
								function(err, sdata) {
									let shipping = JSON.parse(sdata);
							
									res.json( { title: 'Express', shipping: shipping});
							})
						}
			
				}
		})
	}
	
	data(req, res, path, file, next){
		let tokens = req.cookies['user'];
		let date = new Date();
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
			function(err, customer) {
				let customers = JSON.parse(customer);
				if(!tokens) {return res.sendFile(path.join(__dirname, '..','/public/html/login.html')) } 
		
				else{
					let filterbymail = customers.filter(obj => obj.email == tokens /*&& bycrypt compare*/)
					if(filterbymail.length < 1){return res.status(500).send('you have a problem')}
						let indexoffilterbyemail = customers.indexOf(filterbymail[0])
						//console.log(filterbymail)
						//console.log(indexoffilterbyemail)
						if(customers[indexoffilterbyemail].verified == false){
							res.send('you have not been verified')
						} else if(customers[indexoffilterbyemail].verified == true) {
				
							file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
								function(err, sdata) {
									let s = JSON.parse(sdata);
									//filterbydate
									let session = s.filter(item => {return item.year == '2022' && item.month == '2' && item.date == '12'})
							
									file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
										function(err, pdata) {
											let p = JSON.parse(pdata);
											//filterbydate
											let pages = p.filter(item => {return item.year == '2022' && item.month == '2' && item.date == '12'})
									
											let month, day, year;
											let ranges = `${date.getFullYear()}-${(String(date.getMonth()).length == 1?'0' +(date.getMonth() + 1): (date.getMonth() + 1))}-${ (String(date.getDate()).length == 1?'0' +(date.getDate()): (date.getDate() ))  }`
											//console.log(ranges)
											//premade pages
										let opt = function(name){
											let a = `<div class='extraoptions' data-name=${name} style='display:none;width:80%;border-radius:5px;text-align:left;box-shadow:0px 0px 5px;position:absolute;right:0;overflow:scroll;height:150px;z-index:2;'>
															  <p class='dmm zoomin'><b>Zoom</b></p>
															  <p class='dmm'>
															    <b>Chart</b>
																<b style='float:right;'>&or;</b>
															  </p>
															  <div class='dmm' style='overflow-x:scroll;white-space:nowrap;'>
															    <b class='chrt barchart' style='margin-right:10px;border: 1px solid red;'>Bar Chart<b class='loader' style='display:none;'>.</b></b>
																<b class='chrt piechart' style='margin-right:10px;border: 1px solid red;'>Pie Chart</b>
																<b class='chrt linechart' style='margin-right:10px;border: 1px solid red;'>Line Chart</b>
																
															  </div>
															  <p class='dmm'>
															    <b>Range</b>
																<b style='float:right;'>&or;</b>
															  </p>
															  <p class='dmm'>
																 <span style='display:inline-block;width:49%;'>
																    <b>FROM:</b>
																	<input type='date' class='rangefrom' max=${ranges} value=${ranges} style='width:100%;'>
																 </span>
																 <span style='display:inline-block;width:49%;'>
																	<b>TO:</b>
																	<input type='date' class='rangeto' max=${ranges} value=${ranges} style='width:100%;'>
																 </span>
																 <button style='margin-top:5px;' class='submitrange'>submit<b class='loader' style='display:none;'>.</b></button>
															  </p>
															  <style>
																.dmm {padding: 10px;margin:0;font-size:17px;cursor:pointer;} .dmm:hover {background-color:rgb(245,245,245) } b.chrt:hover {background-color:silver;}
															  </style>
															</div>`
															return a;  
										};
										let premade = `
													<div class='datact' style='border:none;padding:0px;display:flex;flex-direction:row;flex-wrap:wrap;position:relative;'>
														<div class='datachild' data-name='datasales'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
															  Sales($)
															  <i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasales')}
															<p style='font-size:25px;' data-class='datasales'>${analytics.totalsales(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
													    </div>
														<div class='datachild' data-name='dataorder'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Orders
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('dataorder')}
															<p style='font-size:25px;' data-class='dataorder'>${analytics.totalorder(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='dataminsales'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Min Sales($)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('dataminsales')}
															<p style='font-size:25px;' data-class='dataminsales')>${analytics.minsales(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datamaxsales'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Max Sales($)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datamaxsales')}
															<p style='font-size:25px;' data-class='datamaxsales'>${analytics.maxsales(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='dataavgsales'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Avg Sales($)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('dataavgsales')}
															<p style='font-size:25px;' data-class='dataavgsales'>${analytics.avgsales(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datauniquesession'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																unique Session
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datauniquesession')}
															<p style='font-size:25px;' data-class='datauniquesession'>${analytics.sess(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
													</div>
													<div class='datact' style='border:0px solid black;padding:0px;display:flex;flex-direction:row;flex-wrap:wrap;'>
														<div class='datachild' data-name='datasession'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sessions
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasession')}
															<p style='font-size:25px;' data-class='datasession'>${analytics.sess(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasessiontraffic'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sessions(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasessiontraffic')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasessiontraffic'>
																    ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>source</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.sesstra(session))}
																	 
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasessionlocation'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sessions(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasessionlocation')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasessionlocation'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>location</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.sessloc(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
													</div>
													<div class='datact' style='border:0px solid black;padding:0px;display:flex;flex-direction:row;flex-wrap:wrap;'>
														<div class='datachild' data-name='datasessionaddedtocart'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Added To Cart-Sessions
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasessionaddedtocart')}
															<p style='font-size:25px;' data-class='datasessionaddedtocart'>${analytics.sessaddedtocart(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasessionaddedtocarttraffic'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Added To Cart-Sessions(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasessionaddedtocarttraffic')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' datasessionaddedtocarttraffic>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>location</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.sesstraaddedtocart(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasessionaddedtocartlocation'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Added To Cart-Sessions(Locati)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasessionaddedtocartlocation')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasessionaddedtocartlocation'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>location</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.sesslocaddedtocart(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
													</div>
													<div class='datact' style='border:0px solid black;padding:0px;display:flex;flex-direction:row;flex-wrap:wrap;'>
														<div class='datachild' data-name='datasessioncheckedout'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																CheckedOut-Sessions
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasessioncheckedout')}
															<p style='font-size:25px;' data-class='datasessioncheckedout'>${analytics.sesscheckedout(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasessioncheckedouttraffic'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																CheckedOut-Sessions(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasessioncheckedouttraffic')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasessioncheckedouttraffic'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>location</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.sesstracheckedout(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasessioncheckedoutlocation'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																CheckedOut-Sessions(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasessioncheckedoutlocation')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasessioncheckedoutlocation'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>location</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.sessloccheckedout(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
													</div>
													<div class='datact' style='border:0px solid black;padding:0px;display:flex;flex-direction:row;flex-wrap:wrap;'>
														<div class='datachild' data-name='datasales'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sales($)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasales')}
															<p style='font-size:25px;' data-class='datasales'>${analytics.totalsales(session)}</p>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasalestraffic'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sales(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasalestraffic')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasalestraffic'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>location</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.salestra(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasaleslocation'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sales(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasaleslocation')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasaleslocation'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>location</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.salesloc(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
													</div>
													<div class='datact' style='border:0px solid black;padding:0px;display:flex;flex-direction:row;flex-wrap:wrap;'>
														<div class='datachild' data-name='datasalesinv'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sales By Inventory($)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasalesinv')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasalesinv'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>Inventory</th><th>Sales</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.salesinventory(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasalesinvtra'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sales By Inventory(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasalesinvtra')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasalesinvtra'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>source</th><th>inventory</th><th>sales</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.salesinventorytra(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datasalesinvloc'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Sales By Inventory(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datasalesinvloc')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasalesinvloc'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>location</th><th>inventory</th><th>sales</th>`
																		let b = Object.entries(obj);
																		
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.salesinventoryloc(session))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
													</div>
													<div class='datact' style='border:0px solid black;padding:0px;display:flex;flex-direction:row;flex-wrap:wrap;'>
														<div class='datachild' data-name='datalandingpage'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Landing Page
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datalandingpage')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datalandingpage'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>page</th><th>sessionscreated</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.landingpage(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datalandingpagetra'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Landing Page(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datalandingpagetra')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datalandingpagetra'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>url</th><th>source</th><th>sessions</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.landingpagetra(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datalandingpageloc'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																Landing Page(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datalandingpageloc')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datalandingpageloc'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>url</th><th>source</th><th>session</th>`
																		let b = Object.entries(obj);
																		
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.landingpageloc(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
													</div>
													<div class='datact' style='border:0px solid black;padding:0px;display:flex;flex-direction:row;flex-wrap:wrap;'>
														<div class='datachild' data-name='datapage'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapage')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datapage'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>page</th><th>sessions</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.pagesess(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapagetra'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapagetra')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapagetra'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>url</th><th>source</th><th>sessions</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.pagesesstra(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapageloc'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapageloc')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapageloc'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>url</th><th>source</th><th>session</th>`
																		let b = Object.entries(obj);
																		
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.pagesessloc(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapageview'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Views
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapageview')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datapageview'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>page</th><th>view</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.views(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapageviewtra'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Views(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapageviewtra')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapageview'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>url</th><th>source</th><th>views</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.viewstra(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapageviewloc'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Views(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapageviewloc')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapageviewloc'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>url</th><th>location</th><th>views</th>`
																		let b = Object.entries(obj);
																		
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.viewsloc(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapagetag'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Tags
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapagetag')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datapagetag'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tags</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.pagetags(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapagetagtra'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Tags(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapagetra')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapagetagtra'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tag</th><th>source</th><th>session</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.pagetagstra(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapagetagloc'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Tags(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapagetagloc')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapagetagloc'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tag</th><th>location</th><th>session</th>`
																		let b = Object.entries(obj);
																		
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.pagetagsloc(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datalandingpagetag'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Landing Page Tags
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datalandingpagetag')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datalandingpagetag'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tags</th><th>sessioncreated</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.landingpagetags(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datalandingpagetagtra'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Landing Page Tags(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datalandingpagetagtra')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datalandingpagetagtra'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tag</th><th>source</th><th>sessioncreated</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.landingpagetagstra(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datalandingpagetagloc'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Landing Page Tags(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datalandingpagetagloc')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datalandingpagetagloc'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tag</th><th>location</th><th>sessioncreated</th>`
																		let b = Object.entries(obj);
																		
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.landingpagetagsloc(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapagetagview'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Tags Views
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapagetagview')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datapagetagview'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tags</th><th>views</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
																		}
																		return a
																	})(analytics.pagetagsview(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapagetagviewtra'>
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Tags Views(Traffic Source)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapagetagviewtra')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapagetagviewtra'>
																	 ${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tag</th><th>source</th><th>views</th>`
																		let b = Object.entries(obj);
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.pagetagsviewtra(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
														<div class='datachild' data-name='datapagetagviewloc'>
															
															<h2 style='margin:0;padding-right:10px;padding-top:0px;'>
																 Page Tags View(Location)
																<i class='fas fa-ellipsis-v dataopt' style='color:white;float:right;padding:5px;'></i>
															</h2>
															${opt('datapagetagviewloc')}
															<div style='height:400px;overflow-y:scroll;width:100%;'>
																<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapagetagviewloc'>
																	${(function(obj){
																		let a = `<tr style='color:white;background-color:black;'><th>tag</th><th>location</th><th>views</th>`
																		let b = Object.entries(obj);
																		
																		for(let i=0; i<b.length; i++){
																			let c = Object.entries(b[i][1]);
																			for(let d=0; d<c.length; d++){
																				a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
																			}
																		}
																		return a
																	})(analytics.pagetagsviewloc(pages))}
																</table>
															</div>
															<div style='white-space:nowrap;overflow:scroll;'></div>
														</div>
													</div>
												  `
										
										res.json( { 
											title:'Express', 
											content: premade,
										});
									})
							})
						}
				}
		})
	}
	
	product(req, res, path, file, next){
		let tokens = req.cookies['user'];
		
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
			function(err, customer) {
				let customers = JSON.parse(customer);
				if(!tokens) {return res.sendFile(path.join(__dirname, '..','/public/html/login.html')) } 
		
				else{
					let filterbymail = customers.filter(obj => obj.email == tokens /*&& bycrypt compare*/)
					if(filterbymail.length < 1){return res.status(500).send('you have a problem')}
						let indexoffilterbyemail = customers.indexOf(filterbymail[0])
						if(customers[indexoffilterbyemail].verified == false){
							res.send('you have not been verified')
						} else if(customers[indexoffilterbyemail].verified == true) {
					
							file.readFile(path.join(__dirname, `..`,`/public/json/productpage/${tokens}product.json`), 'utf8', 
								function(err, pdata) {
									let product = JSON.parse(pdata);
							
									let length = [];
							
									res.json( { title: 'Express', product:  product, } );
							})
						}
				}
		
		})
	}
	
	orders(req, res, path, file, next){
		let tokens = req.cookies['user'];
		
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
			function(err, customer) {
				let customers = JSON.parse(customer);
				if(!tokens) {return res.sendFile(path.join(__dirname, '..','/public/html/login.html')) } 
		
				else{
					let filterbymail = customers.filter(obj => obj.email == tokens /*&& bycrypt compare*/)
					if(filterbymail.length < 1){return res.status(500).send('you have a problem')}
						let indexoffilterbyemail = customers.indexOf(filterbymail[0])
						if(customers[indexoffilterbyemail].verified == false){
							res.send('you have not been verified')
						} else if(customers[indexoffilterbyemail].verified == true) {
				
							file.readFile(path.join(__dirname, `..`,`/public/json/analytics/order/${tokens}order.json`), 'utf8', 
								function(err, odata) {
									let order = JSON.parse(odata);
									let a = `
										<tr style='color:white;background-color:green;'>
											<th>date</th>
											<th>name</th>
											<th>email</th>
											<th>phoneno</th>
											<th>location</th>
											<th>value</th>
											<th>order</th>
											<th>source</th>
											<th>status</th>
											<th>method</th>
										</tr>
									`
							
									for(let i=0; i<order.length; i++){
										a += `<tr>
												<th>${order[i].date.year}-${order[i].date.month}-${order[i].date.date}</th>
												<th>${order[i].info.firstname}-${order[i].info.lastname}</th>
												<th>${order[i].info.email}</th>
												<th>${order[i].info.phoneno}</th>
												<th>${order[i].delivery.info.country}-${order[i].delivery.info.state}-${order[i].delivery.info.city}-${order[i].delivery.info.address}</th>
												<th>${order[i].value}</th>
												<th>order</th>
												<th>Online</th>
												<th>
												<select>
													<option>pending</option>
													<option>Delivered</option>
													<option>Cancelled</option>
												</select>
												</th>
												<th>${order[i].delivery.type}</th>
											</tr>`
									}
							
									res.send( a);
							})
						}	
				}
		})
	}
	
	page(req, res, path, file, next){
		let tokens = req.cookies['user'];
		
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
			function(err, customer) {
				let customers = JSON.parse(customer);
				if(!tokens) {return res.sendFile(path.join(__dirname, '..','/public/html/login.html')) } 
		
				else{
					let filterbymail = customers.filter(obj => obj.email == tokens /*&& bycrypt compare*/)
					if(filterbymail.length < 1){return res.status(500).send('you have a problem')}
						let indexoffilterbyemail = customers.indexOf(filterbymail[0])
						//console.log(filterbymail)
						//console.log(indexoffilterbyemail)
						if(customers[indexoffilterbyemail].verified == false){
							res.send('you have not been verified')
						} else if(customers[indexoffilterbyemail].verified == true) {
				
							file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
								function(err, pdata) {
									let pages = JSON.parse(pdata);
									res.render('user/data/page', { title: 'Express', pages: pages });
							
							})
						}
			
				}
		})
	}
	
	customer(req, res, path, file, next){
		let tokens = req.cookies['user'];
		
		file.readFile(path.join(__dirname+'/customers.json'), 'utf8', 
			function(err, customer) {
				let customers = JSON.parse(customer);
				if(!tokens) {return res.sendFile(path.join(__dirname, '..','/public/html/login.html')) } 
		
				else{
					let filterbymail = customers.filter(obj => obj.email == tokens /*&& bycrypt compare*/)
					if(filterbymail.length < 1){return res.status(500).send('you have a problem')}
						let indexoffilterbyemail = customers.indexOf(filterbymail[0])
				
						if(customers[indexoffilterbyemail].verified == false){
							res.send('you have not been verified')
						} else if(customers[indexoffilterbyemail].verified == true) {
				
							file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
								function(err, sdata) {
									let session = JSON.parse(sdata);
									res.render('user/data/customer', { title: 'Express', session:  session});
							})
						}
			
				}
		})
	}
}

module.exports = new Index()
	