var path = require('path');
var file = require('fs');

function datasales(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			
			function totalsales(array){
				let freq = {};
				for(let i=0; i<array.length; i++){
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if(freq[a]){
						freq[a] += Number(array[i].webhook[0].qty)
					} else {
						freq[a] = Number(array[i].webhook[0].qty)
					}
				}
				return freq
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasales'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>sales</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(totalsales(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: totalsales(session)})
			})
}

function dataorder(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function totalorders(array){
				let freq = {};
				for(let i=0; i<array.length; i++){
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( array[i].webhook[3].qty.length > 0){
						
						if( freq[a] ){
							freq[a]++
						}
						else  {
							freq[a] = 1
						}
						
					}
				}
				console.log(freq)
				return freq
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='dataorder'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>orders</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(totalorders(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: totalorders(session)})
			})
}

function dataminsales(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function minsales(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
							freq[a].push(Number(array[i].webhook[0].qty) )
					}
					else  {
							freq[a] = []
							freq[a].push(Number(array[i].webhook[0].qty) )
					}
				}
				let objvalues = Object.values(freq);
				let objkeys = Object.keys(freq);
				for(let i=0; i<objvalues.length; i++){
					freq[objkeys[i]] = Math.min(...objvalues[i])
				}
				
				return freq
				
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='dataminsales'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>minsales</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(minsales(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: minsales(session)})
			})
	
}
function datamaxsales(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function maxsales(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
							freq[a].push(Number(array[i].webhook[0].qty) )
					}
					else  {
							freq[a] = []
							freq[a].push(Number(array[i].webhook[0].qty) )
					}
				}
				let objvalues = Object.values(freq);
				let objkeys = Object.keys(freq);
				for(let i=0; i<objvalues.length; i++){
					freq[objkeys[i]] = Math.max(...objvalues[i])
				}
				
				return freq
				
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datamaxsales'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>maxsales</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(maxsales(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: maxsales(session)})
			})
	
}
function dataavgsales(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function avgsales(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
							freq[a].push(Number(array[i].webhook[0].qty) )
					}
					else  {
							freq[a] = []
							freq[a].push(Number(array[i].webhook[0].qty) )
					}
				}
				let objvalues = Object.values(freq);
				
				let objkeys = Object.keys(freq);
				let vg = []
				for(let i=0; i<objvalues.length; i++){
					let v = 0;
					for(let b=0; b<objvalues[i].length; b++){
						v += (objvalues[i][b]/objvalues[i].length)
					}
					freq[objkeys[i]] = v
				}
				return freq
				
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='dataavgsales'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>avgsales</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(avgsales(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: avgsales(session)})
			})
	
}

function datauniquesession(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sess(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
							freq[a]++
					}
					else  {
							freq[a] = 1
					}
				}
				
				return freq
				
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datauniquesession'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(sess(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: sess(session)})
			})
}

function datasession(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sess(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
							freq[a]++
					}
					else  {
							freq[a] = 1
					}
				}
				return freq
				
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasession'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(sess(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: sess(session)})
			})
}

function datasessiontraffic(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sessiontraffic(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						  if(freq[a][array[i].trafficsource]){
							  freq[a][array[i].trafficsource]++
						  } else {
							  freq[a][array[i].trafficsource] = 1
						  }	
					}
					else {
							freq[a] = {}
							freq[a][array[i].trafficsource] = 1
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasessiontraffic'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>trafficsource</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(sessiontraffic(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: sessiontraffic(session)})
			})
}

function datasessionlocation(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sessionlocation(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						  if(freq[a][array[i].location]){
							  freq[a][array[i].location]++
						  } else {
							  freq[a][array[i].location] = 1
						  }
					}
					else {
							freq[a] = {}
							freq[a][array[i].location] = 1
					}
				}
				return freq
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasessionlocation'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>Location</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(sessionlocation(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: sessionlocation(session)})
			})
}
function datasessionaddedtocart(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sessionadded(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						  if(array[i].webhook[1].qty.length > 0){
							  freq[a]++
						  } 
					}
					else {
							freq[a] = 1
					}
				}
				return freq
				
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasessionaddedtocart'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(sesessionaddedss(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: sessionadded(session)})
			})
}
function datasessionaddedtocarttraffic(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sessionaddedtocarttraffic(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
					  if(array[i].webhook[1].qty.length > 0){
						  if(freq[a][array[i].trafficsource]){
							  freq[a][array[i].trafficsource]++
						  }else {
							  freq[a][array[i].trafficsource] = 1
						  }	
					  }   
					}
					else {
							freq[a] = {}
							freq[a][array[i].trafficsource] = 1
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasessionaddedtocarttraffic'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>trafficsource</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(sessionaddedtocarttraffic(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: sessionaddedtocarttraffic(session)})
			})
}
function datasessionaddedtocartlocation (req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sessionaddedtocartlocation(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
					  if(array[i].webhook[1].qty.length > 0){
						  if(freq[a][array[i].location]){
							  freq[a][array[i].location]++
						  }else {
							  freq[a][array[i].location] = 1
						  }	
					  }   
					}
					else {
							freq[a] = {}
							freq[a][array[i].location] = 1
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasessionaddedtocartlocation'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>location</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(sessionaddedtocartlocation(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: sessionaddedtocartlocation(session)})
			})
}
function datasessioncheckedout(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sessioncheckedout(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						  if(array[i].webhook[3].qty.length > 0){
							  freq[a]++
						  } 
					}
					else {
							freq[a] = 1
					}
				}
				return freq
				
			}
			let b = `<div style='height:400px;overflow:scroll;width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='2' data-class='datasessionaddedtocart'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>sessioncheckedout</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + b[i][1]
								}
								return a
							})(sesessionaddedss(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: sessioncheckedout(session)})
			})
}
function datasessioncheckedouttraffic(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sessioncheckedouttraffic(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
					  if(array[i].webhook[3].qty.length > 0){
						  if(freq[a][array[i].trafficsource]){
							  freq[a][array[i].trafficsource]++
						  }else {
							  freq[a][array[i].trafficsource] = 1
						  }	
					  }   
					}
					else {
							freq[a] = {}
							freq[a][array[i].trafficsource] = 1
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasessioncheckedouttraffic'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>traffic</th><th>checkedoutsession</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(sessioncheckedouttraffic(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: sessioncheckedouttraffic(session)})
			})
}
function datasessioncheckedoutlocation(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function sessioncheckedoutlocation(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
					  if(array[i].webhook[3].qty.length > 0){
						  if(freq[a][array[i].location]){
							  freq[a][array[i].location]++
						  }else {
							  freq[a][array[i].location] = 1
						  }	
					  }   
					}
					else {
							freq[a] = {}
							freq[a][array[i].location] = 1
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasessioncheckedoutlocation'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>location</th><th>checkedoutsession</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(sessioncheckedoutlocation(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: sessioncheckedoutlocation(session)})
			})
}

function datasalestraffic(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function salestraffic(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						  if(freq[a][array[i].trafficsource]){
							  freq[a][array[i].trafficsource]+= Number(array[i].webhook[0].qty)
						  } else {
							  freq[a][array[i].trafficsource] = Number(array[i].webhook[0].qty)
						  }	
					}
					else {
							freq[a] = {}
							freq[a][array[i].trafficsource] = Number(array[i].webhook[0].qty)
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasalestraffic'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>trafficsource</th><th>sales</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(salestraffic(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: salestraffic(session)})
			})
}
function datasaleslocation(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function saleslocation(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						  if(freq[a][array[i].location]){
							  freq[a][array[i].location]+= Number(array[i].webhook[0].qty)
						  } else {
							  freq[a][array[i].location] = Number(array[i].webhook[0].qty)
						  }	
					}
					else {
							freq[a] = {}
							freq[a][array[i].location] = Number(array[i].webhook[0].qty)
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasaleslocation'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>location</th><th>sales</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(saleslocation(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: saleslocation(session)})
			})
}
function datasalesinv(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function salesinv(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  
								for(let b=0; b<array[i].webhook[3].qty.length; b++){
									if(freq[a][array[i].webhook[3].qty[b].name]){
										freq[a][ array[i].webhook[3].qty[b].name ] += Number(array[i].webhook[3].qty[b].qty)
									} else {
										freq[a][array[i].webhook[3].qty[b].name]= Number(array[i].webhook[3].qty[b].qty)
									}
								}
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].webhook[3].qty.length; b++){
								freq[a][array[i].webhook[3].qty[b].name]= Number(array[i].webhook[3].qty[b].qty)
							}
					}
				}
				return freq
				
			}
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datasalesinv'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>inv</th><th>sales</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(salesinv(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: salesinv(session)})
			})
}
function datasalesinvtra(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function salesinvtra(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  if(freq[a][array[i].trafficsource]){
								for(let b=0; b<array[i].webhook[3].qty.length; b++){
									if(freq[a][array[i].trafficsource][array[i].webhook[3].qty[b].name]){
										freq[a][array[i].trafficsource][array[i].webhook[3].qty[b].name] +=  Number(array[i].webhook[3].qty[b].qty)
									}
								}
			
						  } else {
								freq[a][array[i].trafficsource] = {}
								for(let b=0; b<array[i].webhook[3].qty.length; b++){
									freq[a][array[i].trafficsource][array[i].webhook[3].qty[b].name] =  Number(array[i].webhook[3].qty[b].qty)
								}
						  } 
					}
					else {
							freq[a] = {}
							freq[a][array[i].trafficsource] = {}
							for(let b=0; b<array[i].webhook[3].qty.length; b++){
								freq[a][array[i].trafficsource][array[i].webhook[3].qty[b].name] =  Number(array[i].webhook[3].qty[b].qty)
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datasalesinvtra'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>trafficsource</th><th>inv</th><th>sales</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(salesinvtra(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: salesinvtra(session)})
			
			})
}
function datasalesinvloc(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/session/${tokens}session.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function salesinvloc(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  if(freq[a][array[i].location]){
								for(let b=0; b<array[i].webhook[3].qty.length; b++){
									if(freq[a][array[i].location][array[i].webhook[3].qty[b].name]){
										freq[a][array[i].location][array[i].webhook[3].qty[b].name] +=  Number(array[i].webhook[3].qty[b].qty)
									}
									
								}
			
						  } else {
								freq[a][array[i].location] = {}
								for(let b=0; b<array[i].webhook[3].qty.length; b++){
									freq[a][array[i].location][array[i].webhook[3].qty[b].name] =  Number(array[i].webhook[3].qty[b].qty)
								}
						  } 
					}
					else {
							freq[a] = {}
							freq[a][array[i].location] = {}
							for(let b=0; b<array[i].webhook[3].qty.length; b++){
								freq[a][array[i].location][array[i].webhook[3].qty[b].name] =  Number(array[i].webhook[3].qty[b].qty)
							}
					}
				}
				
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datasalesinvloc'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>location</th><th>inv</th><th>sales</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
										
									}
										
								}
								return a
							})(salesinvloc(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: salesinvloc(session)})
			
			})
}
function datalandingpage(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			
			function datalandingpage(array){
				let freq = {};
				for(let i=0; i<array.length; i++){
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if(freq[a]){
						freq[a][array[i].url] = Number(array[i].sessioncreated)
					} else {
						freq[a] = {}
						freq[a][array[i].url] = Number(array[i].sessioncreated)
					}
				}
				return freq
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datalandingpage'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>sessioncreated</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(datalandingpage(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: datalandingpage(session)})
			})
}
function datalandingpagetra(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function landingpagetra(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  if(freq[a][array[i].url]){
								for(let b=0; b<array[i].sessioncreatedtraffic.length; b++){
									if(freq[a][array[i].url][array[i].sessioncreatedtraffic[b].name]){
										freq[a][array[i].url][array[i].sessioncreatedtraffic[b].name] +=  Number(array[i].sessioncreatedtraffic[b].qty)
									}
								}
			
						  } else {
								freq[a][array[i].url] = {}
								for(let b=0; b<array[i].sessioncreatedtraffic.length; b++){
									freq[a][array[i].url][array[i].sessioncreatedtraffic[b].name] =  Number(array[i].sessioncreatedtraffic[b].qty)
								}
						  } 
					}
					else {
							freq[a] = {}
							freq[a][array[i].url] = {}
							for(let b=0; b<array[i].sessioncreatedtraffic.length; b++){
								freq[a][array[i].url][array[i].sessioncreatedtraffic[b].name] =  Number(array[i].sessioncreatedtraffic[b].qty)
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datalandingpagetra'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>trafficsource</th><th>session</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(landingpagetra(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: landingpagetra(session)})
			})
}
function datalandingpageloc(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function landingpageloc(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  if(freq[a][array[i].url]){
								for(let b=0; b<array[i].sessioncreatedlocation.length; b++){
									if(freq[a][array[i].url][array[i].sessioncreatedlocation[b].name]){
										freq[a][array[i].url][array[i].sessioncreatedlocation[b].name] +=  Number(array[i].sessioncreatedlocation[b].qty)
									}
								}
			
						  } else {
								freq[a][array[i].url] = {}
								for(let b=0; b<array[i].sessioncreatedlocation.length; b++){
									freq[a][array[i].url][array[i].sessioncreatedlocation[b].name] =  Number(array[i].sessioncreatedlocation[b].qty)
								}
						  } 
					}
					else {
							freq[a] = {}
							freq[a][array[i].url] = {}
							for(let b=0; b<array[i].sessioncreatedlocation.length; b++){
								freq[a][array[i].url][array[i].sessioncreatedlocation[b].name] =  Number(array[i].sessioncreatedlocation[b].qty)
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datalandingpageloc'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>location</th><th>session</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(landingpageloc(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: landingpageloc(session)})
			
			})
}

function datapage(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			
			function datapage(array){
				let freq = {};
				for(let i=0; i<array.length; i++){
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if(freq[a]){
						freq[a][array[i].url] = Number(array[i].session)
					} else {
						freq[a] = {}
						freq[a][array[i].url] = Number(array[i].session)
					}
				}
				return freq
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapage'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(datapage(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: datapage(session)})
			})
}
function datapagetra(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function datapagetra(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  if(freq[a][array[i].url]){
								for(let b=0; b<array[i].trafficsource.length; b++){
									if(freq[a][array[i].url][array[i].trafficsource[b].name]){
										freq[a][array[i].url][array[i].trafficsource[b].name] +=  Number(array[i].trafficsource[b].qty)
									}
								}
			
						  } else {
								freq[a][array[i].url] = {}
								for(let b=0; b<array[i].trafficsource.length; b++){
									freq[a][array[i].url][array[i].trafficsource[b].name] =  Number(array[i].trafficsource[b].qty)
								}
						  } 
					}
					else {
							freq[a] = {}
							freq[a][array[i].url] = {}
							for(let b=0; b<array[i].trafficsource.length; b++){
								freq[a][array[i].url][array[i].trafficsource[b].name] =  Number(array[i].trafficsource[b].qty)
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datapagetra'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>trafficsource</th><th>session</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(datapagetra(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: datapagetra(session)})
			})
}
function datapageloc(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function datapageloc(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  if(freq[a][array[i].url]){
								for(let b=0; b<array[i].location.length; b++){
									if(freq[a][array[i].url][array[i].location[b].name]){
										freq[a][array[i].url][array[i].location[b].name] +=  Number(array[i].location[b].qty)
									}
								}
			
						  } else {
								freq[a][array[i].url] = {}
								for(let b=0; b<array[i].location.length; b++){
									freq[a][array[i].url][array[i].location[b].name] =  Number(array[i].location[b].qty)
								}
						  } 
					}
					else {
							freq[a] = {}
							freq[a][array[i].url] = {}
							for(let b=0; b<array[i].location.length; b++){
								freq[a][array[i].url][array[i].location[b].name] =  Number(array[i].location[b].qty)
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datapageloc'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>location</th><th>session</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(datapageloc(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: datapageloc(session)})
			})
}

function datapageview(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			
			function datapageview(array){
				let freq = {};
				for(let i=0; i<array.length; i++){
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if(freq[a]){
						freq[a][array[i].url] = Number(array[i].views)
					} else {
						freq[a] = {}
						freq[a][array[i].url] = Number(array[i].views)
					}
				}
				return freq
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapageview'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>view</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(datapageview(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: pageview(session)})
			})
}
function datapageviewtra(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function datapageviewtra(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  if(freq[a][array[i].url]){
								for(let b=0; b<array[i].viewstrafficsource.length; b++){
									if(freq[a][array[i].url][array[i].viewstrafficsource[b].name]){
										freq[a][array[i].url][array[i].viewstrafficsource[b].name] +=  Number(array[i].viewstrafficsource[b].qty)
									}
								}
			
						  } else {
								freq[a][array[i].url] = {}
								for(let b=0; b<array[i].viewstrafficsource.length; b++){
									freq[a][array[i].url][array[i].viewstrafficsource[b].name] =  Number(array[i].viewstrafficsource[b].qty)
								}
						  } 
					}
					else {
							freq[a] = {}
							freq[a][array[i].url] = {}
							for(let b=0; b<array[i].viewstrafficsource.length; b++){
								freq[a][array[i].url][array[i].viewstrafficsource[b].name] =  Number(array[i].viewstrafficsource[b].qty)
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datapageviewtra'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>trafficsource</th><th>views</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(datapageviewtra(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: pageviewtra(session)})
			})
}
function datapageviewloc(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function datapageviewloc(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						  if(freq[a][array[i].url]){
								for(let b=0; b<array[i].viewslocation.length; b++){
									if(freq[a][array[i].url][array[i].viewslocation[b].name]){
										freq[a][array[i].url][array[i].viewslocation[b].name] +=  Number(array[i].viewslocation[b].qty)
									}
								}
			
						  } else {
								freq[a][array[i].url] = {}
								for(let b=0; b<array[i].viewslocation.length; b++){
									freq[a][array[i].url][array[i].viewslocation[b].name] =  Number(array[i].viewslocation[b].qty)
								}
						  } 
					}
					else {
							freq[a] = {}
							freq[a][array[i].url] = {}
							for(let b=0; b<array[i].viewslocation.length; b++){
								freq[a][array[i].url][array[i].viewslocation[b].name] =  Number(array[i].viewslocation[b].qty)
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datapageviewloc'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>url</th><th>location</th><th>views</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(datapageviewloc(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: datapageviewloc(session)})
			})
}

function datapagetag(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function pagetag(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  
					
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						 for(let b=0; b<array[i].tags.length; b++){
							if(freq[a][array[i].tags[b]]){
								freq[a][array[i].tags[b]] += array[i].session
							} else {
								freq[a] = {}
								freq[a][array[i].tags[b]] = array[i].session
							}
						 } 	
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = array[i].session
							} 	
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapagetag'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>session</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(pagetag(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: pagetag(session)})
			})
}
function datapagetagtra(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function pagetagtra(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						for(let b=0; b<array[i].tags.length; b++){
						  if(freq[a][array[i].tags[b] ]){
								for(let c=0; c<array[i].trafficsource.length; c++){
									if(freq[a][array[i].tags[b]][array[i].trafficsource[c].name]){
										freq[a][array[i].tags[b]][array[i].trafficsource[c].name] +=  Number(array[i].trafficsource[c].qty)
									}
								}
			
						  } else {
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].trafficsource.length; c++){
									freq[a][array[i].tags[b]][array[i].trafficsource[c].name] =  Number(array[i].trafficsource[c].qty)
								}
						  }
					  }
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].trafficsource.length; c++){
									freq[a][array[i].tags[b]][array[i].trafficsource[c].name] =  Number(array[i].trafficsource[c].qty)
								}
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datapagetagtra'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>trafficsource</th><th>session</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(pagetagtra(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: pagetagtra(session)})
			})
}
function datapagetagloc(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function pagetagtra(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						for(let b=0; b<array[i].tags.length; b++){
						  if(freq[a][array[i].tags[b] ]){
								for(let c=0; c<array[i].location.length; c++){
									if(freq[a][array[i].tags[b]][array[i].location[c].name]){
										freq[a][array[i].tags[b]][array[i].location[c].name] +=  Number(array[i].location[c].qty)
									}
								}
						  } else {
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].location.length; c++){
									freq[a][array[i].tags[b]][array[i].location[c].name] =  Number(array[i].location[c].qty)
								}
						  }
					  }
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].location.length; c++){
									freq[a][array[i].tags[b]][array[i].location[c].name] =  Number(array[i].location[c].qty)
								}
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datapagetagloc'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>location</th><th>session</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(pagetagloc(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: pagetagloc(session)})
			})
}

function datalandingpagetag(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function landingpagetag(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  
					
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						 for(let b=0; b<array[i].tags.length; b++){
							if(freq[a][array[i].tags[b]]){
								freq[a][array[i].tags[b]] += array[i].session
							} else {
								freq[a] = {}
								freq[a][array[i].tags[b]] = array[i].session
							}
						 } 	
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = array[i].sessioncreated
							} 	
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datalandingpagetag'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>sessioncreated</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(landingpagetag(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: landingpagetag(session)})
			})
}
function datalandingpagetagtra(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function landingpagetagtra(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						for(let b=0; b<array[i].tags.length; b++){
						  if(freq[a][array[i].tags[b] ]){
								for(let c=0; c<array[i].sessioncreatedtraffic.length; c++){
									if(freq[a][array[i].tags[b]][array[i].sessioncreatedtraffic[c].name]){
										freq[a][array[i].tags[b]][array[i].sessioncreatedtraffic[c].name] +=  Number(array[i].sessioncreatedtraffic[c].qty)
									}
								}
			
						  } else {
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].sessioncreatedtraffic.length; c++){
									freq[a][array[i].tags[b]][array[i].sessioncreatedtraffic[c].name] =  Number(array[i].sessioncreatedtraffic[c].qty)
								}
						  }
					  }
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].sessioncreatedtraffic.length; c++){
									freq[a][array[i].tags[b]][array[i].sessioncreatedtraffic[c].name] =  Number(array[i].sessioncreatedtraffic[c].qty)
								}
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datalandingpagetagtra'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>trafficsource</th><th>sessioncreated</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(landingpagetagtra(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: landingpagetagtra(session)})
			})
}
function datalandingpagetagloc(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function landingpagetagloc(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						for(let b=0; b<array[i].tags.length; b++){
						  if(freq[a][array[i].tags[b] ]){
								for(let c=0; c<array[i].sessioncreatedlocation.length; c++){
									if(freq[a][array[i].tags[b]][array[i].sessioncreatedlocation[c].name]){
										freq[a][array[i].tags[b]][array[i].sessioncreatedlocation[c].name] +=  Number(array[i].sessioncreatedlocation[c].qty)
									}
								}
			
						  } else {
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].sessioncreatedlocation.length; c++){
									freq[a][array[i].tags[b]][array[i].sessioncreatedlocation[c].name] =  Number(array[i].sessioncreatedlocation[c].qty)
								}
						  }
					  }
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].sessioncreatedlocation.length; c++){
									freq[a][array[i].tags[b]][array[i].sessioncreatedlocation[c].name] =  Number(array[i].sessioncreatedlocation[c].qty)
								}
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datalandingpagetagloc'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>location</th><th>sessioncreated</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(landingpagetagloc(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: landingpagetagloc(session)})
			})
}

function datapagetagview(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function pagetagview(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  
					
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					if( freq[a] ){
						 for(let b=0; b<array[i].tags.length; b++){
							if(freq[a][array[i].tags[b]]){
								freq[a][array[i].tags[b]] += array[i].views
							} else {
								freq[a] = {}
								freq[a][array[i].tags[b]] = array[i].views
							}
						 } 	
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = array[i].views
							} 	
					}
				}
				return freq
				
			}
			let b = `<div style='width:100%;font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='3' data-class='datapagetagview'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>view</th>`
								let b = Object.entries(obj);
								for(let i=0; i<b.length; i++){ //{name: {james: 10}}
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + c[d][1]
									}
										
								}
								return a
							})(pagetagview(session) )}
																	 
						</table>
			</div>`
			res.json({content:b, data: pagetagview(session)})
			})
}
function datapagetagviewtra(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function pagetagviewtra(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						for(let b=0; b<array[i].tags.length; b++){
						  if(freq[a][array[i].tags[b] ]){
								for(let c=0; c<array[i].viewstrafficsource.length; c++){
									if(freq[a][array[i].tags[b]][array[i].viewstrafficsource[c].name]){
										freq[a][array[i].tags[b]][array[i].viewstrafficsource[c].name] +=  Number(array[i].viewstrafficsource[c].qty)
									}
								}
			
						  } else {
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].viewstrafficsource.length; c++){
									freq[a][array[i].tags[b]][array[i].viewstrafficsource[c].name] =  Number(array[i].viewstrafficsource[c].qty)
								}
						  }
					  }
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].viewstrafficsource.length; c++){
									freq[a][array[i].tags[b]][array[i].viewstrafficsource[c].name] =  Number(array[i].viewstrafficsource[c].qty)
								}
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datapagetagviewtra'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>trafficsource</th><th>view</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(pagetagviewtra(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: pagetagviewtra(session)})
			})
}
function datapagetagviewloc(req, res, tokens){
	file.readFile(path.join(__dirname, `..`,`/public/json/analytics/pages/${tokens}pages.json`), 'utf8', 
		function(err, sdata) {
			let s = JSON.parse(sdata);
			let from = `${req.body.from.year}${req.body.from.month}${req.body.from.date}`
			let to = `${req.body.to.year}${req.body.to.month}${req.body.to.date}`
			//filterbydate
			let session = s.filter(item => {return item.ymd >= from && item.ymd <= to})
			function pagetagviewloc(array){
				let freq = {};
				let aa = []
				let b;
				for(let i=0; i<array.length; i++){  //if 
					let a = `${array[i].year}-${array[i].month}-${array[i].date}`
					
					if( freq[a] ){
						for(let b=0; b<array[i].tags.length; b++){
						  if(freq[a][array[i].tags[b] ]){
								for(let c=0; c<array[i].viewslocation.length; c++){
									if(freq[a][array[i].tags[b]][array[i].viewslocation[c].name]){
										freq[a][array[i].tags[b]][array[i].viewslocation[c].name] +=  Number(array[i].viewslocation[c].qty)
									}
								}
			
						  } else {
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].viewslocation.length; c++){
									freq[a][array[i].tags[b]][array[i].viewslocation[c].name] =  Number(array[i].viewslocation[c].qty)
								}
						  }
					  }
					}
					else {
							freq[a] = {}
							for(let b=0; b<array[i].tags.length; b++){
								freq[a][array[i].tags[b]] = {}
								for(let c=0; c<array[i].viewslocation.length; c++){
									freq[a][array[i].tags[b]][array[i].viewslocation[c].name] =  Number(array[i].viewslocation[c].qty)
								}
							}
					}
				}
				return freq
			}
			
			let b = `<div style='font-size:10px;'>
						<table style='width:100%;border-collapse:collapse;' data-length='4' data-class='datapagetagviewloc'>
							${(function(obj){
								let a = `<tr style='color:white;background-color:black;'><th>date</th><th>tags</th><th>location</th><th>view</th>`
								let b = Object.entries(obj);
								
								for(let i=0; i<b.length; i++){ 
									let c = Object.entries(b[i][1]);
									for(let d=0; d<c.length; d++){
										let e = Object.entries(c[d][1]);
										for(let f=0; f<e.length; f++){
											a += '<tr>' + '<th>' + b[i][0] + '<th>' + c[d][0] + '<th>' + e[f][0] + '<th>' + e[f][1]
										}
									}
								}
								return a
							})(pagetagviewloc(session) )}						 
						</table>
			</div>`
			res.json({content:b, data: pagetagviewloc(session)})
			})
}


module.exports = {
	datasales,dataorder,dataminsales,dataavgsales,datauniquesession,
	datasession,datasessiontraffic,datasessionlocation,
	datasessionaddedtocart,datasessionaddedtocarttraffic,datasessionaddedtocartlocation,
	datasessioncheckedout,datasessioncheckedouttraffic,datasessioncheckedoutlocation,
	datasalestraffic,datasaleslocation,
	datasalesinv,datasalesinvtra,datasalesinvloc,
	datalandingpage,datalandingpagetra,datalandingpageloc,
	datapage,datapagetra,datapageloc,
	datapageview,datapageviewtra,datapageviewloc,
	datapagetag,datapagetagtra,datapagetagloc,
	datalandingpagetag,datalandingpagetagtra,datalandingpagetagloc,
	datapagetagview, datapagetagviewtra, datapagetagviewloc
}