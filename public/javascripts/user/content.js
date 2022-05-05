//all asynchronously loaded data must have a loader
//donts: use currentTarget in functions that has fetch api, e.target.style.backgroundColor in a loop
let projectsdemo = document.querySelectorAll('.projectsdemo')
let c = document.querySelector('.demo1')
let d = document.querySelector('.todemos');
for(let i=0; i<projectsdemo.length; i++){
	projectsdemo[i].onclick = function(e){
		if(e.currentTarget.dataset.name == 'demo'){
		  
			
		  
	    } else {
			if(e.currentTarget.nextElementSibling.style.display == 'none'){
				e.currentTarget.nextElementSibling.style.display = 'block'
				e.currentTarget.children[1].style.display = 'none'
				e.currentTarget.children[2].style.display = 'inline'
				e.currentTarget.style.backgroundColor = 'rgba(245,214,61,0.9)'
			} else {
				e.currentTarget.nextElementSibling.style.display = 'none'
				e.currentTarget.children[1].style.display = 'inline'
				e.currentTarget.children[2].style.display = 'none'
				e.currentTarget.style.backgroundColor = 'rgba(245,214,61,0.4)'
			}
		}
	}
}	








let sendconvo = document.querySelector('.sendconvo');
let convotype = document.querySelector('.convotype');
sendconvo.onclick = function(e){
	if(convotype.value == 'Email'){
		e.target.href = '/email'
    } else if (convotype.value == 'CALL' || convotype.value == 'SMS'){	
		e.target.href = '/callsms'
	} else if (convotype.value == 'Slack'){
		e.target.href = '/slack'
	} else if (convotype.value == 'Zoom'){
		e.target.href = '/zoom'
	} else if (convotype.value == 'Telegram'){
		e.target.href = '/telegram'
	} else if (convotype.value == 'Whatsapp'){
		e.target.href = '/whatsapp'
	}
}


let buttonrequest = document.querySelectorAll('button.request');
for(let i=0; i<buttonrequest.length; i++){
	buttonrequest[i].onclick = function(e){
		document.querySelector('#assistant').click()
		let inputtype = document.querySelector('.inputtype')
		inputtype.value= e.target.textContent
	}
}


//product
setTimeout(function(){fetch('/product')
		.then(res => res.json() )
		.then(resp => {
				//console.log(resp)
				document.querySelector('.fufillloader').style.display = 'none'
				
				for(let i=0; i<resp.product.length; i++){
					let tr = document.createElement('tr');
					let th1 = document.createElement('th');
					let th2 = document.createElement('th');
					let th3 = document.createElement('th');
					let button1 = document.createElement('button');
				
					tr.append(th1)
					tr.append(th2)
					tr.append(th3)
					th3.append(button1)
					
					th1.textContent = resp.product[i].name
					th2.textContent = resp.product[i].tag
					button1.textContent='view variant'
					let productlist = document.querySelector('.productlist')
					productlist.append(tr)
				}
		})
}, 1000)
		
//shipping
setTimeout(function(){fetch('/shipping')
		.then(res => res.json() )
		.then(resp => {
				document.querySelector('.shippingloader').style.display = 'none'
				let shipping = resp.shipping
				for(let i=0; i<shipping.local.length; i++){
					let tr = document.createElement('tr');
					let th1 = document.createElement('th');
					let th2 = document.createElement('th');
					let th3 = document.createElement('th');
					let th4 = document.createElement('th');
				
					tr.append(th1)
					tr.append(th2)
					tr.append(th3)
					tr.append(th4)
					
					th1.textContent = shipping.local[i].product
					th2.textContent = `${shipping.local[i].location.country} -> ${shipping.local[i].location.state} -> ${shipping.local[i].location.city}`
					th3.textContent = shipping.local[i].carrier
					th4.textContent = shipping.local[i].rate
					let shippinglist = document.querySelector('.shippinglist')
					shippinglist.append(tr)
				}
				for(let i=0; i<shipping.pickup.length; i++){
					let tr = document.createElement('tr');
					let th1 = document.createElement('th');
					let th2 = document.createElement('th');
					let th3 = document.createElement('th');
					let th4 = document.createElement('th');
					let th5 = document.createElement('th');
				    let th6 = document.createElement('th');
					let th7 = document.createElement('th');
					let th8 = document.createElement('th');
					let th9 = document.createElement('th');
					let th10 = document.createElement('th');
					
					tr.append(th1)
					tr.append(th2)
					tr.append(th3)
					tr.append(th4)
					tr.append(th5)
					tr.append(th6)
					tr.append(th7)
					tr.append(th8)
					tr.append(th9)
					tr.append(th10)
					
					th1.textContent = shipping.pickup[i].name
					th2.textContent = shipping.pickup[i].pics
					th3.textContent = shipping.pickup[i].openingtime
					th4.textContent = shipping.pickup[i].closingtime
					th5.textContent = shipping.pickup[i].country
					th6.textContent = shipping.pickup[i].state
					th7.textContent = shipping.pickup[i].city
					th8.textContent = shipping.pickup[i].address
					th9.textContent = shipping.pickup[i].phoneno
					th10.textContent = shipping.pickup[i].pickupinfo
					let pickuptable = document.querySelector('.pickuptable')
					pickuptable.append(tr)
				}	
		})
 
}, 1000
)
//orders
setTimeout(function(){fetch('/orders')
		.then(res => res.text() )
		.then(resp => {
			let orderlist = document.querySelector('.orderlist');
			orderlist.innerHTML = resp
			//console.log(resp)
  })
}, 1000
)
		


let orderfeatures = document.querySelectorAll('.orderfeatures')
let orderfeaturescontent = document.querySelectorAll('.orderfeaturescontent')
for(let i=0; i<orderfeatures.length; i++){
	orderfeatures[i].onclick = function(e){
		for(let i=0; i<orderfeatures.length; i++){
			orderfeatures[i].style.backgroundColor = 'white'
		}
		e.target.style.backgroundColor = 'rgb(245,245,245)'
		for(let b=0; b<orderfeaturescontent.length; b++){
			if(e.target.dataset.name == orderfeaturescontent[b].dataset.name){
				orderfeaturescontent[b].style.display = 'block'
			} else {
				orderfeaturescontent[b].style.display = 'none'
			}
		}
	}
}
//datamap
function datamap(container){
	let datamap = document.querySelectorAll('.datamap')
	let datachild = container.querySelectorAll('.datachild')
	for(let i=0; i<datamap.length; i++){
	  datamap[i].onclick = function(e){
		for(let c=0; c<datamap.length; c++){
			datamap[c].style.backgroundColor = 'white'
		}
		e.target.style.backgroundColor = 'silver'
		for(let b=0; b<datachild.length; b++){
			if(e.target.dataset.name == datachild[b].dataset.name){
				
				datachild[b].scrollIntoView();
				datachild[b].style.border = '4px solid violet'
				document.querySelector('div.data').scrollBy(0, -100)
			} else {
				datachild[b].style.border ='1px solid silver'
				
			}
		}
	 }
	}
}
function dataoptions(container){
	let opt = container.querySelectorAll('.dataopt')
	for(let i=0; i<opt.length; i++){
		opt[i].onclick = function(e){
			if(e.target.style.backgroundColor != 'black'){
				e.target.style.backgroundColor = 'black'
				e.target.parentElement.nextElementSibling.style.display = 'block'
			} else {
				e.target.style.backgroundColor = 'transparent'
				e.target.parentElement.nextElementSibling.style.display = 'none'
			}
			
		}
	}
	let zoomin = document.querySelectorAll('p.dmm.zoomin')
	for(let i=0; i<zoomin.length; i++){
		zoomin[i].onclick = function(e){
			if(e.target.parentElement.parentElement.className == 'datachild'){
				e.target.style.backgroundColor = 'silver'
				e.target.parentElement.parentElement.className = 'datachild0'
			} else {
				e.target.style.backgroundColor = 'white'
				e.target.parentElement.parentElement.className = 'datachild'
			}
		
		}
	}
}
function splice(range){
	let a = range; 
	let b = a.split('-');
	
	return {year:b[0], month:b[1], date: b[2] }			
}

function historydata(container) {
	let submitrange = container.querySelectorAll('.submitrange');
	let rangefrom = container.querySelectorAll('.rangefrom')
	let rangeto = container.querySelectorAll('.rangeto')
	for(let i=0; i<submitrange.length; i++){
		submitrange[i].onclick = function(e){
			
			e.target.children[0].style.display = 'inline-block'
			let obj = {from: splice(String(rangefrom[i].value)), to: splice(String(rangeto[i].value)), element: e.target.parentElement.parentElement.parentElement.dataset.name};
			
			
			fetch('/datamodify', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.json() )
				.then(resp => {
			     e.target.children[0].style.display = 'none'
				 //console.log(resp)
				 e.target.parentElement.parentElement.nextElementSibling.innerHTML = resp.content;
		  })
		  
		}
	}
}

function tabletodata(table){
	if(table.dataset.length == '2'){
		let th = table.querySelectorAll('th');
		let a = Array.from(th);
		let b = [];
		for(let i=2; i<a.length; i++){
			b.push( a[i].textContent )
		}
		console.log(b)
		let c = {}
		for(let i=0; i<b.length; i += 2){
			c[b[i]] = b[i + 1] 
		}
		return c;
	} else if(table.dataset.length == '3'){
		let th = table.querySelectorAll('th');
		let a = Array.from(th);
		let b = [];
		for(let i=3; i<a.length; i++){
			b.push( a[i].textContent )
		}
		
		let c = {}
		for(let i=0; i<b.length; i += 3){
			
			if(c[b[i]]){
				c[b[i]][b[i+1]] = b[i+2]
			} else {
				c[b[i]] = {}
				c[b[i]][b[i+1]] = b[i+2]
			}
		}
		return c;
	}
}

function chartdata(container) {
	let date = new Date();
	let svg = new Svg()
	
	
	let barchart = container.querySelectorAll('.barchart');
	
	for(let i=0; i<barchart.length; i++){
		barchart[i].onclick = function(e){
			//vertical barchart with axis
			let nx = e.target.parentElement.parentElement.nextElementSibling;
			let nextbar = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling;
			
			e.target.children[0].style.display = 'inline-block'
			if (nx.children.length < 1){
				//if there is no child element except text, create a barchart with the existing data
				
				let obj = {}
				obj[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`] = nx.textContent
				
				svg.vbarchart(obj, nextbar, 400 )
				
			} else if(nx.children.length >= 1){ //if the div has a chile element
				if(nx.children[0].nodeName == 'TABLE'){ //if there is an embedded table element
					let a = nx.children[0];
					
					if(a.dataset.length == '2'){
						
						console.log(a)
						svg.vbarchart( tabletodata(a), nextbar, 400 )
					}
					else if (a.dataset.length == '3'){
						console.log(a)
						
						svg.v3barchart( tabletodata(a), nextbar, 400 )
					}
				} else if(nx.children[0].children[0].nodeName == 'TABLE'){ //check if the fetched data was used for creating a table
					let a = nx.children[0].children[0];
					if(a.dataset.length == '2'){
						
						console.log(a)
						svg.vbarchart( tabletodata(a), nextbar, 400 )
					}
					else if (a.dataset.length == '3'){
						console.log(a)
						
						svg.v3barchart( tabletodata(a), nextbar, 400 )
					} else if (a.dataset.length == '4'){
						
					}
				} else {
					console.log('inner element is not a present')
					console.log(nx)
				}
			} else {
				console.log('sorry there is a problem. we"ll reach out later')
			}
		}
	}
	
}
//data
setTimeout(
  function(){
	document.querySelector('.dataloader').style.display = 'inline-block'
	fetch('/data')
	.then(res => res.json() )
	.then(resp => {
		console.log(resp)
		document.querySelector('.dataloader').style.display = 'none'
		document.querySelector('.analyticscontainer').innerHTML = resp.content
		datamap(document.querySelector('.analyticscontainer'))
		dataoptions(document.querySelector('.analyticscontainer'))
		historydata(document.querySelector('.analyticscontainer'))
		chartdata(document.querySelector('.analyticscontainer'), resp)
	})
}, 1000)

