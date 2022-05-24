
class Analyze {
	  constructor(name, age){
	    this.name = name
		this.age = age
	  }
	 
	  //method 
		getData(req, res, file, path, initial, ipInfo, url, tags, date, location, trafficSource, sessionId){
			var record = require(path.join(__dirname, '..',`/database/record.js`) );
			
			if(!req.cookies['daily_session']) {	
				let hours = 24 - date.getHours();
				let minutes = 60 - date.getMinutes();
				let seconds = 60 - date.getSeconds();
				
				res.cookie('daily_session', '5666', {maxAge: hours * minutes * seconds * 1000}) 
				//create daily, timeless, weekly, monthly tables and store new data
				record.data('NEW USER', req, file, path, initial, ipInfo, url, tags, date, location, trafficSource, req.cookies['daily_session'])
			} else {
				record.data('EXISTING', req, file, path, initial, ipInfo, url, tags, date, location, trafficSource, req.cookies['daily_session'])
				//update existing data for daily, timeless, weekly and monthly tables
			}
		}
		
		sessionPageData(file, path, res, ymd){
			 file.readFile(path.join(__dirname, `..`,`/database/session.json`), 'utf8', 
				function(err, session) {
					let sess = JSON.parse(session);
					let d = sess.filter(s => {return s.ymd == ymd})
					
					let obj = {};
					obj.sessions = d.length
					obj.trafficSource = {}
	
					for(let i=0; i<d.length; i++){
						if(obj.trafficSource[d[i].trafficsource]){
							obj.trafficSource[d[i].trafficsource]++
						} else {
							obj.trafficSource[d[i].trafficsource] = 1
						}
					}
					
					obj.location = {}
					for(let i=0; i<d.length; i++){
						if(obj.location[d[i].location]){
							obj.location[d[i].location]++
						} else {
							obj.location[d[i].location] = 1
						}
					}
					file.readFile(path.join(__dirname, `..`,`/database/page.json`), 'utf8', 
						function(err, page) {
							let pg = JSON.parse(page);
							let d = pg.filter(s => {return s.ymd == ymd})
						
						res.json({session: obj, page: d })
					})
			})
		}
		
		
	
}
	
module.exports =  Analyze