//filter by Date
function totalsales(array){
	let a = 0;
	for(let i=0; i<array.length; i++){
		a += Number(array[i].webhook[0].qty)
	}
	return a
}
function totalorder(array){
	let a =0;
	for(let i=0; i<array.length; i++){
		if(array[i].webhook[3].qty.length > 0){
			a += 1
		}
	}
	return a;
}
function minsales(array){
	let a = []
	let b;
	for(let i=0; i<array.length; i++){
		a.push( Number(array[i].webhook[0].qty) )
	}
	b = Math.min(...a)
	return b;
}
function maxsales(array){
	let a = []
	let b;
	for(let i=0; i<array.length; i++){
		a.push( Number(array[i].webhook[0].qty) )
	}
	b = Math.max(...a)
	return b
}
function avgsales(array){
	let a = []
	let b = 0;
	let c;
	for(let i=0; i<array.length; i++){
		a.push( Number(array[i].webhook[0].qty) )
	}
	for(let i=0; i<a.length; i++){ b += Number(a[i]) } 
	c = b/a.length
	return c
}
function sess(array){
	let a = 0;
	for(let i=0; i<array.length; i++){
		a++
	}
	return a;
}
function sesstra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].trafficsource]){
			freq[array[i].trafficsource]++
		} else {
			freq[array[i].trafficsource] = 1
		}
	}
	
	return freq
}
function sessloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].location]){
			freq[array[i].location]++
		} else {
			freq[array[i].location] = 1
		}
	}
	return freq
}
function sessaddedtocart(array){
	let a = 0
	for(let i=0; i<array.length; i++){
		if(array[i].webhook[1].qty.length > 0){
			a += 1
		}
	}
	return a;
}
function sesstraaddedtocart(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(array[i].webhook[1].qty.length > 0){
			if(freq[array[i].trafficsource]){
				freq[array[i].trafficsource]++
			} else {
				freq[array[i].trafficsource] = 1
			}
		}
	}
	return freq;
}
function sesslocaddedtocart(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(array[i].webhook[1].qty.length > 0){
			if(freq[array[i].location]){
				freq[array[i].location]++
			} else {
				freq[array[i].location] = 1
			}
		}
	}
	return freq;
}
function sesscheckedout(array){
	let a = 0
	for(let i=0; i<array.length; i++){
		if(array[i].webhook[3].qty.length > 0){
			a += 1
		}
	}
	return a;
}
function sesstracheckedout(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(array[i].webhook[3].qty.length > 0){
			if(freq[array[i].trafficsource]){
				freq[array[i].trafficsource]++
			} else {
				freq[array[i].trafficsource] = 1
			}
		}
	}
	return freq;
}
function sessloccheckedout(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(array[i].webhook[3].qty.length > 0){
			if(freq[array[i].location]){
				freq[array[i].location]++
			} else {
				freq[array[i].location] = 1
			}
		}
	}
	return freq;
}
function salestra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].trafficsource]){
				freq[array[i].trafficsource] += Number(array[i].webhook[0].qty)
		} else {
				freq[array[i].trafficsource] = Number(array[i].webhook[0].qty)
		}
			
	}
	return freq;
}
function salesloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].location]){
				freq[array[i].location] += Number(array[i].webhook[0].qty)
		} else {
				freq[array[i].location] = Number(array[i].webhook[0].qty)
		}
			
	}
	return freq;
}
function salesinventory(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].webhook[3].qty.length; b++){
			if(freq[array[i].webhook[3].qty[b].name]){
				freq[ array[i].webhook[3].qty[b].name ] += Number(array[i].webhook[3].qty[b].qty)
			} else {
				freq[array[i].webhook[3].qty[b].name] = Number(array[i].webhook[3].qty[b].qty)
			}
		}
	}
	return freq;
}
function salesinventorytra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].trafficsource]){
			for(let b=0; b<array[i].webhook[3].qty.length; b++){
			  if(freq[array[i].trafficsource][array[i].webhook[3].qty[b].name]){
				freq[array[i].trafficsource][ array[i].webhook[3].qty[b].name ] += Number(array[i].webhook[3].qty[b].qty)
			  }
		    }
			
		} else {
			freq[array[i].trafficsource] = {}
			for(let b=0; b<array[i].webhook[3].qty.length; b++){
				freq[array[i].trafficsource][array[i].webhook[3].qty[b].name]= Number(array[i].webhook[3].qty[b].qty)
			}
		}
	}
	return freq;
}
function salesinventoryloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].location]){
			for(let b=0; b<array[i].webhook[3].qty.length; b++){
			  if(freq[array[i].location][array[i].webhook[3].qty[b].name]){
				freq[array[i].location][ array[i].webhook[3].qty[b].name ] += Number(array[i].webhook[3].qty[b].qty)
			  }
		    }
			
		} else {
			freq[array[i].location] = {}
			for(let b=0; b<array[i].webhook[3].qty.length; b++){
				freq[array[i].location][array[i].webhook[3].qty[b].name]= Number(array[i].webhook[3].qty[b].qty)
			}
		}
	}
	return freq;
}
function landingpage(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		freq[array[i].url] = Number(array[i].sessioncreated)
	}
	return freq;
}
function landingpagetra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].url]){
			for(let b=0; b<array[i].sessioncreatedtraffic.length; b++){
			  if(freq[array[i].url][array[i].sessioncreatedtraffic[b].name]){
				freq[array[i].url][array[i].sessioncreatedtraffic[b].name] += Number(array[i].sessioncreatedtraffic[b].qty)
			  }
		    }
			
		} else {
			freq[array[i].url] = {}
			for(let b=0; b<array[i].sessioncreatedtraffic.length; b++){
				freq[array[i].url][array[i].sessioncreatedtraffic[b].name]= Number(array[i].sessioncreatedtraffic[b].qty)
			}
		}
	}
	return freq;
}
function landingpageloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].url]){
			for(let b=0; b<array[i].sessioncreatedlocation.length; b++){
			  if(freq[array[i].url][array[i].sessioncreatedlocation[b].name]){
				freq[array[i].url][array[i].sessioncreatedlocation[b].name] += Number(array[i].sessioncreatedlocation[b].qty)
			  }
		    }
			
		} else {
			freq[array[i].url] = {}
			for(let b=0; b<array[i].sessioncreatedlocation.length; b++){
				freq[array[i].url][array[i].sessioncreatedlocation[b].name]= Number(array[i].sessioncreatedlocation[b].qty)
			}
		}
	}
	return freq;
}
function pagesess(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		freq[array[i].url] = Number(array[i].session)
	}
	return freq;
}
function pagesesstra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].url]){
			for(let b=0; b<array[i].trafficsource.length; b++){
			  if(freq[array[i].url][array[i].trafficsource[b].name]){
				freq[array[i].url][array[i].trafficsource[b].name] += Number(array[i].trafficsource[b].qty)
			  }
		    }
			
		} else {
			freq[array[i].url] = {}
			for(let b=0; b<array[i].trafficsource.length; b++){
				freq[array[i].url][array[i].trafficsource[b].name]= Number(array[i].trafficsource[b].qty)
			}
		}
	}
	return freq;
}
function pagesessloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].url]){
			for(let b=0; b<array[i].location.length; b++){
			  if(freq[array[i].url][array[i].location[b].name]){
				freq[array[i].url][array[i].location[b].name] += Number(array[i].location[b].qty)
			  }
		    }
			
		} else {
			freq[array[i].url] = {}
			for(let b=0; b<array[i].location.length; b++){
				freq[array[i].url][array[i].location[b].name]= Number(array[i].location[b].qty)
			}
		}
	}
	return freq;
}
function views(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		freq[array[i].url] = Number(array[i].views)
	}
	return freq;
}
function viewstra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].url]){
			for(let b=0; b<array[i].viewstrafficsource.length; b++){
			  if(freq[array[i].url][array[i].viewstrafficsource[b].name]){
				freq[array[i].url][array[i].viewstrafficsource[b].name] += Number(array[i].viewstrafficsource[b].qty)
			  }
		    }
			
		} else {
			freq[array[i].url] = {}
			for(let b=0; b<array[i].viewstrafficsource.length; b++){
				freq[array[i].url][array[i].viewstrafficsource[b].name]= Number(array[i].viewstrafficsource[b].qty)
			}
		}
	}
	return freq;
}
function viewsloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		if(freq[array[i].url]){
			for(let b=0; b<array[i].viewslocation.length; b++){
			  if(freq[array[i].url][array[i].viewslocation[b].name]){
				freq[array[i].url][array[i].viewslocation[b].name] += Number(array[i].viewslocation[b].qty)
			  }
		    }
			
		} else {
			freq[array[i].url] = {}
			for(let b=0; b<array[i].viewslocation.length; b++){
				freq[array[i].url][array[i].viewslocation[b].name]= Number(array[i].viewslocation[b].qty)
			}
		}
	}
	return freq;
}
function pagetags(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
			if(freq[array[i].tags[b]]){
				freq[array[i].tags[b]] += array[i].session
			} else {
				freq[array[i].tags[b]] = array[i].session
			}
		}
	}
	return freq;
}
function pagetagstra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
		  if(freq[array[i].tags[b]]){
			  for(let c=0; c<array[i].trafficsource.length; c++){
				  freq[array[i].tags[b]][array[i].trafficsource[c].name] += array[i].trafficsource[c].qty
			  }
				
			} else {
				freq[array[i].tags[b]] = {}
				for(let c=0; c<array[i].trafficsource.length; c++){
				  freq[array[i].tags[b]][array[i].trafficsource[c].name] = array[i].trafficsource[c].qty
			  }
			}
		}
	}
	return freq;
}
function pagetagsloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
			if(freq[array[i].tags[b]]){
			  for(let c=0; c<array[i].location.length; c++){
				  freq[array[i].tags[b]][array[i].location[c].name] += array[i].location[c].qty
			  }
				
			} else {
				freq[array[i].tags[b]] = {}
				for(let c=0; c<array[i].location.length; c++){
				  freq[array[i].tags[b]][array[i].location[c].name] = array[i].location[c].qty
			  }
			}
		}
	}
	return freq;
}
function landingpagetags(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
			if(freq[array[i].tags[b]]){
				freq[array[i].tags[b]] += array[i].sessioncreated
			} else {
				freq[array[i].tags[b]] = array[i].sessioncreated
			}
		}
	}
	return freq;
}
function landingpagetagstra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
		  if(freq[array[i].tags[b]]){
			  for(let c=0; c<array[i].sessioncreatedtraffic.length; c++){
				  freq[array[i].tags[b]][array[i].sessioncreatedtraffic[c].name] += array[i].sessioncreatedtraffic[c].qty
			  }
				
			} else {
				freq[array[i].tags[b]] = {}
				for(let c=0; c<array[i].sessioncreatedtraffic.length; c++){
				  freq[array[i].tags[b]][array[i].sessioncreatedtraffic[c].name] = array[i].sessioncreatedtraffic[c].qty
			  }
			}
		}
	}
	return freq;
}
function landingpagetagsloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
			if(freq[array[i].tags[b]]){
			  for(let c=0; c<array[i].sessioncreatedlocation.length; c++){
				  freq[array[i].tags[b]][array[i].sessioncreatedlocation[c].name] += array[i].sessioncreatedlocation[c].qty
			  }
				
			} else {
				freq[array[i].tags[b]] = {}
				for(let c=0; c<array[i].sessioncreatedlocation.length; c++){
				  freq[array[i].tags[b]][array[i].sessioncreatedlocation[c].name] = array[i].sessioncreatedlocation[c].qty
			  }
			}
		}
	}
	return freq;
}
function pagetagsview(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
			if(freq[array[i].tags[b]]){
				freq[array[i].tags[b]] += array[i].views
			} else {
				freq[array[i].tags[b]] = array[i].views
			}
		}
	}
	return freq;
}
function pagetagsviewtra(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
		  if(freq[array[i].tags[b]]){
			  for(let c=0; c<array[i].viewstrafficsource.length; c++){
				  freq[array[i].tags[b]][array[i].viewstrafficsource[c].name] += array[i].viewstrafficsource[c].qty
			  }
				
			} else {
				freq[array[i].tags[b]] = {}
				for(let c=0; c<array[i].viewstrafficsource.length; c++){
				  freq[array[i].tags[b]][array[i].viewstrafficsource[c].name] = array[i].viewstrafficsource[c].qty
			  }
			}
		}
	}
	return freq;
}
function pagetagsviewloc(array){
	let freq = {}
	for(let i=0; i<array.length; i++){
		for(let b=0; b<array[i].tags.length; b++){
			if(freq[array[i].tags[b]]){
			  for(let c=0; c<array[i].viewslocation.length; c++){
				  freq[array[i].tags[b]][array[i].viewslocation[c].name] += array[i].viewslocation[c].qty
			  }
				
			} else {
				freq[array[i].tags[b]] = {}
				for(let c=0; c<array[i].viewslocation.length; c++){
				  freq[array[i].tags[b]][array[i].viewslocation[c].name] = array[i].viewslocation[c].qty
			  }
			}
		}
	}
	return freq;
}
module.exports = {
	totalsales,totalorder,minsales,maxsales,avgsales,sess,sesstra,sessloc,sessaddedtocart,sesstraaddedtocart,sesslocaddedtocart,
	sesscheckedout,
	sesstracheckedout,
	sessloccheckedout,
	salestra,
	salesloc,
	salesinventory,
	salesinventorytra,
	salesinventoryloc,
	landingpage,
	landingpagetra,
	landingpageloc,
	pagesess,
	pagesesstra,
	pagesessloc,
	views,
	viewstra,
	viewsloc,
	pagetags,
	pagetagstra,
	pagetagsloc,
	landingpagetags,
	landingpagetagstra,
	landingpagetagsloc,
	pagetagsview,
	pagetagsviewtra,
	pagetagsviewloc
}