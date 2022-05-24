class Record {
	 constructor(name, age){
	    this.name = name
		this.age = age
	  }
	  
	data(status, req, file, path, initial, ipInfo, url, tags, date, location, trafficSource, sessionId){
		
		
		let ymd = `${date.getFullYear()}${(String(date.getMonth()).length == 1? '0' + (date.getMonth() + 1): date.getMonth() + 1)}${(String(date.getDate()).length == 1? '0' + (date.getDate()): date.getDate() )}`
		
		if(status == 'NEW USER'){
			
			file.readFile(path.join(__dirname, `.`,`/session.json`), 'utf8', 
				function(err, session) {
					let d = JSON.parse(session);
				
					let obj = {
						year: date.getFullYear(),
						month: date.getMonth() + 1,
						date: date.getDate(),
						day: (date.getDay() == 1?"monday": date.getDay() == 2?"tuesday": date.getDay() == 3?"wednesday": date.getDay() == 4?"thursday":date.getDay() == 5?"friday":date.getDay() == 6?"saturday":"sunday"),
						name: sessionId,
						ymd: ymd,
						initialpage: initial,
						trafficsource: trafficSource,
						initialpage: initial,
						location: location,
						weeklyrepeat: '',
						webhook: [
							{
								name: '',
								qty:''
							}
						]
					}
					
					
				
					d.push( obj )
				
					let stringified = JSON.stringify(d)
					file.writeFile(path.join(__dirname, `.`,`/session.json`), stringified, 'utf-8', function(err){if(err) throw err});
			})
			file.readFile(path.join(__dirname, `.`,`/page.json`), 'utf8', 
				function(err, page) {
					let d = JSON.parse(page);
					
					let filter = d.filter(page => {return page.url == url && page.ymd == ymd})
					
					if(filter.length == 0){
						let obj = {
							url: url,
							tags:tags,
							year: date.getFullYear(),
							month: date.getMonth(),
							date: date.getDate(),
							day: date.getDay(),
							ymd: ymd,
							sessioncreated: 1,
							sessioncreatedlocation: [{name: location, qty: 1}],
							sessioncreatedtraffic: [{name: trafficSource, qty: 1}],
							views: 1,
							viewslocation: [{name: location, qty: 1}],
							viewstrafficsource:[{name: trafficSource, qty: 1}],
							session:1,
							location:[{name: location, qty: 1}],
							trafficsource: [{name: trafficSource, qty: 1}],
							webhook: [
								{
									name: '',
									qty:''
								}
							]
						}
						d.push(obj)
					} else {
						filter[0].sessioncreated += 1
						filter[0].views += 1
						filter[0].session += 1
						
						let filtertraffic = filter[0].sessioncreatedtraffic.filter(item => {return item.name == trafficSource})
						if(filtertraffic.length == 1){
							let indexOf = filter[0].sessioncreatedtraffic.indexOf(filtertraffic[0])
							filter[0].sessioncreatedtraffic[indexOf].qty += 1
						} else {
							filter[0].sessioncreatedtraffic.push({name: trafficSource, qty:1} )
						}
						
						let viewstrafficfilter = filter[0].viewstrafficsource.filter(item => {return item.name == trafficSource})
						if(viewstrafficfilter.length == 1){
							let indexOf = filter[0].viewstrafficsource.indexOf(viewstrafficfilter[0])
							filter[0].viewstrafficsource[indexOf].qty += 1
						} else {
							filter[0].viewstrafficsource.push({name: trafficSource, qty:1} )
						}
						
						let filtertra = filter[0].trafficsource.filter(item => {return item.name == trafficSource})
						if(filtertra.length == 1){
							let indexOf = filter[0].trafficsource.indexOf(filtertra[0])
							filter[0].trafficsource[indexOf].qty += 1
						} else {
							filter[0].trafficsource.push({name: trafficSource, qty:1} )
						}
						
						let filterlocation = filter[0].sessioncreatedlocation.filter(item => {return item.name == location})
						if(filterlocation.length == 1){
							let indexOf = filter[0].sessioncreatedlocation.indexOf(filterlocation[0])
							filter[0].sessioncreatedlocation[indexOf].qty += 1
						} else {
							filter[0].sessioncreatedlocation.push({name: location, qty:1} )
						}
						
						let viewsfilterlocation = filter[0].viewslocation.filter(item => {return item.name == location})
						if(filterlocation.length == 1){
							let indexOf = filter[0].viewslocation.indexOf(viewsfilterlocation[0])
							filter[0].viewslocation[indexOf].qty += 1
						} else {
							filter[0].viewslocation.push({name: location, qty:1} )
						}
						
						let filterloc = filter[0].location.filter(item => {return item.name == location})
						if(filtertra.length == 1){
							let indexOf = filter[0].location.indexOf(filterloc[0])
							filter[0].location[indexOf].qty += 1
						} else {
							filter[0].location.push({name: location, qty:1} )
						}
					}
					let stringified = JSON.stringify(d)
					file.writeFile(path.join(__dirname, `.`,`/page.json`), stringified, 'utf-8', function(err){if(err) throw err});
			})
		} else if (status == 'EXISTING'){
			file.readFile(path.join(__dirname, `.`,`/session.json`), 'utf8', 
				function(err, session) {
					let d = JSON.parse(session);
				
					//filter page property by url. if found, increment views else push new object element to the page array
				
					let filter = d.filter(session => { return session.name == sessionId && session.ymd == ymd});
					
					if(filter.length == 0){
						let obj = {
							year: date.getFullYear(),
							month: date.getMonth() + 1,
							date: date.getDate(),
							day: (date.getDay() == 1?"monday": date.getDay() == 2?"tuesday": date.getDay() == 3?"wednesday": date.getDay() == 4?"thursday":date.getDay() == 5?"friday":date.getDay() == 6?"saturday":"sunday"),
							name: sessionId,
							ymd: ymd,
							initialpage: initial,
							trafficsource: trafficSource,
							initialpage: initial,
							location: location,
							weeklyrepeat: '',
							webhook: [
								{
									name: '',
									qty:''
								}
							]
						}
						
						d.push(obj)
						
					} 
				
					let stringified = JSON.stringify(d)
					file.writeFile(path.join(__dirname, `.`,`/session.json`), stringified, 'utf-8', function(err){if(err) throw err});
			})
			file.readFile(path.join(__dirname, `.`,`/page.json`), 'utf8', 
				function(err, page) {
					let d = JSON.parse(page);
					
					let filter = d.filter(page => {return page.url == url && page.ymd == ymd})
					
					if(filter.length == 0){
						let obj = {
							url: url,
							tags:tags,
							year: date.getFullYear(),
							month: date.getMonth(),
							date: date.getDate(),
							day: date.getDay(),
							ymd: ymd,
							sessioncreated: 0,
							sessioncreatedlocation: [],
							sessioncreatedtraffic: [],
							views: 1,
							viewslocation: [{name: location, qty: 1}],
							viewstrafficsource:[{name: trafficSource, qty: 1}],
							session:1,
							location:[{name: location, qty: 1}],
							trafficsource: [{name: trafficSource, qty: 1}],
							webhook: [
								{
									name: '',
									qty:''
								}
							]
						}
						d.push(obj)
					} else {
						
						filter[0].views += 1
						
						
						
						
						let viewstrafficfilter = filter[0].viewstrafficsource.filter(item => {return item.name == trafficSource})
						if(viewstrafficfilter.length == 1){
							let indexOf = filter[0].viewstrafficsource.indexOf(viewstrafficfilter[0])
							filter[0].viewstrafficsource[indexOf].qty += 1
						} else {
							filter[0].viewstrafficsource.push({name: trafficSource, qty:1} )
						}
						
						
						
						
						
						let viewsfilterlocation = filter[0].viewslocation.filter(item => {return item.name == location})
						if(viewsfilterlocation.length == 1){
							let indexOf = filter[0].viewslocation.indexOf(viewsfilterlocation[0])
							filter[0].viewslocation[indexOf].qty += 1
						} else {
							filter[0].viewslocation.push({name: location, qty:1} )
						}
						
						
					}
					let stringified = JSON.stringify(d)
					file.writeFile(path.join(__dirname, `.`,`/page.json`), stringified, 'utf-8', function(err){if(err) throw err});
			})
		} else if (status == 'WEBHOOK'){
			
		}
		
	}
}

module.exports = new Record()