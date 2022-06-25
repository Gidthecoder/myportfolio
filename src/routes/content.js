var express = require('express');
var router = express.Router();
var path = require('path');
var file = require('fs');
var loki = require('lokijs');
var analytics = require(path.join(__dirname, '..',`/controllers/dataanalytics2.js`) )

let db = new loki(path.join(__dirname, `..`,`/public/json/pagelayout/happiness20700@gmail.comcontent.json`))





router.post('/datamodify', function(req, res, next) {
	let tokens = req.cookies['user']
	//console.log(req.body)
	if(!req.body ){
		res.status(400).json({error: {id: 'no endpoint', message: 'subscription must have an endpoint'}})
	} else {
		//filter the data by range
		if(req.body.element == 'datasales'){
			analytics.datasales(req, res, tokens)						
		} else if (req.body.element == 'dataorder'){
			analytics.dataorder(req, res, tokens)	
		} else if (req.body.element == 'dataminsales'){
			analytics.dataminsales(req, res, tokens)	
		} else if (req.body.element == 'dataavgsales'){
			analytics.dataavgsales(req, res, tokens)	
		} else if (req.body.element == 'datauniquesession'){
			analytics.datauniquesession(req, res, tokens)
		} else if (req.body.element == 'datasession'){
			analytics.datasession(req, res, tokens)
		} else if (req.body.element == 'datasessiontraffic'){
			analytics.datasessiontraffic(req, res, tokens)
		} else if (req.body.element == 'datasessionlocation'){
			analytics.datasessionlocation(req, res, tokens)
		} else if (req.body.element == 'datasessionaddedtocart'){
			analytics.datasessionaddedtocart(req, res, tokens)
		} else if (req.body.element == 'datasessionaddedtocarttraffic'){
			analytics.datasessionaddedtocarttraffic(req, res, tokens)
		} else if (req.body.element == 'datasessionaddedtocartlocation'){
			analytics.datasessionaddedtocartlocation(req, res, tokens)
		} else if (req.body.element == 'datasalestraffic'){
			analytics.datasalestraffic(req, res, tokens)
		} else if (req.body.element == 'datasaleslocation'){
			analytics.datasaleslocation(req, res, tokens)
		} else if (req.body.element == 'datasalesinv'){
			analytics.datasalesinv(req, res, tokens)
		} else if (req.body.element == 'datasalesinvtra'){
			analytics.datasalesinvtra(req, res, tokens)
		} else if (req.body.element == 'datasalesinvloc'){
			analytics.datasalesinvloc(req, res, tokens)
		} else if (req.body.element == 'datalandingpage'){
			analytics.datalandingpage(req, res, tokens)
		} else if (req.body.element == 'datalandingpagetra'){
			analytics.datalandingpagetra(req, res, tokens)
		} else if (req.body.element == 'datalandingpageloc'){
			analytics.datalandingpageloc(req, res, tokens)
		} else if (req.body.element == 'datapage'){
			analytics.datapage(req, res, tokens)
		} else if (req.body.element == 'datapagetra'){
			analytics.datapagetra(req, res, tokens)
		} else if (req.body.element == 'datapageloc'){
			analytics.datapageloc(req, res, tokens)
		} else if (req.body.element == 'datapageview'){
			analytics.datapageview(req, res, tokens)
		} else if (req.body.element == 'datapageviewtra'){
			analytics.datapageviewtra(req, res, tokens)
		} else if (req.body.element == 'datapageviewloc'){
			analytics.datapageviewloc(req, res, tokens)
		} else if (req.body.element == 'datapagetag'){
			analytics.datapagetag(req, res, tokens)
		} else if (req.body.element == 'datapagetagtra'){
			analytics.datapagetagtra(req, res, tokens)
		} else if (req.body.element == 'datapagetagloc'){
			analytics.datapagetagloc(req, res, tokens)
		} else if (req.body.element == 'datalandingpagetag'){
			analytics.datalandingpagetag(req, res, tokens)
		} else if (req.body.element == 'datalandingpagetagtra'){
			analytics.datalandingpagetagtra(req, res, tokens)
		} else if (req.body.element == 'datalandingpagetagloc'){
			analytics.datalandingpagetagloc(req, res, tokens)
		} else if (req.body.element == 'datapagetagview'){
			analytics.datapagetagview(req, res, tokens)
		} else if (req.body.element == 'datapagetagviewtra'){
			analytics.datapagetagviewtra(req, res, tokens)
		} else if (req.body.element == 'datapagetagviewloc'){
			analytics.datapagetagviewloc(req, res, tokens)
		}
	}
	
})











module.exports = router;

//faster App
//reduce timecomplexity -- don't use multiloop

//security