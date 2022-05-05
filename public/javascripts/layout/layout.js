let addtocart = document.querySelectorAll('.addtocart');
let buynow = document.querySelectorAll('.buynow');
let plus = document.querySelectorAll('.plus');
let minus = document.querySelectorAll('.minus');
let qty = document.querySelectorAll('.qty');
let cartqty = document.querySelector('.cartqty');
function remove(e){
	let obj = {name:e.target.dataset.name}
	fetch('/deletecartdetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.text() )
				.then(resp => {
						alert(resp)
						
						//remove the ancestor element from DOM
						e.target.parentElement.parentElement.remove()
						//adjust the subtotal
						let subtotal = document.querySelector('.subtotalamount');
						subtotal.textContent = Number(subtotal.textContent) - Number(e.target.nextSibling.textContent)
						//change the cartqty icon
						let cartqty = document.querySelector('.cartqty')
						cartqty.textContent = Number(cartqty.textContent) - Number(e.target.parentElement.previousSibling.children[1].children[1].value)
						//reset the product display if present in the same page
						let addtocart = document.querySelectorAll('.addtocart');
						for(let i =0; i < addtocart.length; i++){
							if(addtocart[i].dataset.name == e.target.dataset.name){
								addtocart[i].parentElement.style.display = 'block'
								addtocart[i].parentElement.nextSibling.style.display = 'none'
								addtocart[i].parentElement.nextSibling.children[1].value = '1'
							}
						}
				})
}

function add(e){
	let obj = {name:e.target.dataset.name, amount:e.target.dataset.amount, qty: Number(e.target.previousSibling.value) + 1}
	fetch('/updatecartdetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
	        .then(res => res.text() )
		    .then(resp => {
						alert(resp)
						
						//adjust the qty
						e.target.previousSibling.value = Number(e.target.previousSibling.value) + 1
						//recalulate the subtotal of cart item
						e.target.parentElement.parentElement.nextSibling.children[1].textContent = Number(e.target.parentElement.parentElement.nextSibling.children[1].textContent) + Number(e.target.dataset.amount)
						//recalculate the subtotal of the overall cart
						let subtotal = document.querySelector('.subtotalamount');
						subtotal.textContent = Number(subtotal.textContent) + Number(e.target.dataset.amount)
						//reset the product display qty if present
						let addtocart = document.querySelectorAll('.addtocart');
						for(let i =0; i < addtocart.length; i++){
							if( addtocart[i].dataset.name == e.target.dataset.name ){
								addtocart[i].parentElement.nextSibling.children[1].value = Number(e.target.previousSibling.value)
							}
						}
						//modify the cartqty icon
						let cartqty = document.querySelector('.cartqty')
						cartqty.textContent = Number(cartqty.textContent) +  1
			})
	
}

function removefrom(e){
	//if the qty is <= 1, remove the item
	if(e.target.nextSibling.value <= 1){
		let obj = {name:e.target.dataset.name}
		fetch('/deletecartdetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.text() )
				.then(resp => {
						alert(resp)
						
						//remove the ancestor element from DOM
						e.target.parentElement.parentElement.parentElement.remove()
						//adjust the subtotal
						let subtotal = document.querySelector('.subtotalamount');
						subtotal.textContent = Number(subtotal.textContent) - Number(e.target.parentElement.parentElement.nextSibling.children[1].textContent )
						//change the cartqty icon
						let cartqty = document.querySelector('.cartqty')
						cartqty.textContent = Number(cartqty.textContent) - Number(e.target.nextSibling.value)
						//reset the product display if present in the same page
						let addtocart = document.querySelectorAll('.addtocart');
						for(let i =0; i < addtocart.length; i++){
							if(addtocart[i].dataset.name == e.target.dataset.name){
								addtocart[i].parentElement.style.display = 'block'
								addtocart[i].parentElement.nextSibling.style.display = 'none'
								addtocart[i].parentElement.nextSibling.children[1].value = '1'
							}
						}
				})
		
	} else {
		let obj = {name:e.target.dataset.name, amount:e.target.dataset.amount, qty: Number(e.target.nextSibling.value) - 1}
		fetch('/updatecartdetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.text() )
				.then(resp => {
						alert(resp)
						
						//adjust the qty
						e.target.nextSibling.value = Number(e.target.nextSibling.value) - 1
						//recalulate the subtotal of cart item
						e.target.parentElement.parentElement.nextSibling.children[1].textContent = Number(e.target.parentElement.parentElement.nextSibling.children[1].textContent) - Number(e.target.dataset.amount)
						//recalculate the subtotal of the overall cart
						let subtotal = document.querySelector('.subtotalamount');
						subtotal.textContent = Number(subtotal.textContent) - Number(e.target.dataset.amount)
						//reset the product display qty if present
						let addtocart = document.querySelectorAll('.addtocart');
						for(let i =0; i < addtocart.length; i++){
							if( addtocart[i].dataset.name == e.target.dataset.name ){
								addtocart[i].parentElement.nextSibling.children[1].value = Number(e.target.nextSibling.value)
							}
						}
						//modify the cartqty icon
						let cartqty = document.querySelector('.cartqty')
						cartqty.textContent = Number(cartqty.textContent) -  1
				})
		
		
	}
}
function cartadd(e){
	    e.target.children[0].style.display = 'inline-block'
		e.target.parentElement.parentElement.style.animationName = 'spin'
			//send fetch request to server
			let obj = {name:e.target.dataset.name, title:e.target.dataset.title, amount:e.target.dataset.amount, qty:1}
			fetch('/cartdetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
	        .then(res => res.text() )
		    .then(resp => {
						e.target.children[0].style.display = 'none'
				
						alert(resp)
						e.target.parentElement.parentElement.style.animationName = 'none'
						e.target.parentElement.style.display = 'none'
						e.target.parentElement.nextSibling.style.display = 'block'
						cartqty.textContent = Number(cartqty.textContent) + 1
						let addtocartdetails = document.querySelector('.addtocartdetails').cloneNode(true);
						document.querySelector('.innercartcontainer').appendChild(addtocartdetails)
						
						addtocartdetails.dataset.name = e.target.dataset.name
						let cartimg = addtocartdetails.querySelector('.cartimg');
						let carttitle = addtocartdetails.querySelector('.carttitle');
						let cartamount = addtocartdetails.querySelector('.cartamount');
						let removeit = addtocartdetails.querySelector('.removeitem');
						let addit = addtocartdetails.querySelector('.additem');
						let removefromit = addtocartdetails.querySelector('.removefromitem');
						
						removeit.dataset.name = e.target.dataset.name
						addit.dataset.name = e.target.dataset.name
						addit.dataset.amount = e.target.dataset.amount
						removefromit.dataset.name = e.target.dataset.name
						removefromit.dataset.amount = e.target.dataset.amount
						cartimg.src = e.target.dataset.image 
						carttitle.textContent = e.target.dataset.title
						cartamount.textContent = e.target.dataset.amount	
						
						//event handlers to the added items
						let removeitem = document.querySelectorAll('.innercartcontainer .addtocartdetails .removeitem');
						let additem = document.querySelectorAll('.innercartcontainer .addtocartdetails .additem');
						let removefromitem = document.querySelectorAll('.innercartcontainer .addtocartdetails .removefromitem');
						for(let i=0; i < removeitem.length; i++){
							removeitem[i].onclick = remove
							additem[i].onclick = add
							removefromitem[i].onclick = removefrom
						}
			})			
		
}

for(let i = 0; i < addtocart.length; i++){
	addtocart[i].onclick = cartadd
}
for(let i = 0; i < addtocart.length; i++){
	if( addtocart[i].dataset.added == 'true' ){
		addtocart[i].parentElement.style.display = 'none'
		addtocart[i].parentElement.nextSibling.style.display = 'block'
		//console.log('already added')
	}
}
//increasing item qty
function cartplus(e){
	    e.target.parentElement.parentElement.style.animationName = 'spin'
		//fetch to update the qty
		let obj = {name:e.target.dataset.name, amount:e.target.dataset.amount, qty: Number(e.target.previousSibling.value) + 1}
		fetch('/updatecartdetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
	        .then(res => res.text() )
		    .then(resp => {
						alert(resp)
						e.target.parentElement.parentElement.style.animationName = 'none'
						let previousSibling = e.target.previousSibling;
						previousSibling.value = Number(previousSibling.value) + 1;
						cartqty.textContent = Number(cartqty.textContent) + 1
		
						//check the cart if there is an item with the same dataname
						let classN = e.target.dataset.name;
						let addtocartdetails = document.querySelectorAll('.innercartcontainer .addtocartdetails');
						for(let i=0; i < addtocartdetails.length; i++){
							if(addtocartdetails[i].dataset.name == classN){
								addtocartdetails[i].children[1].children[1].children[1].value = Number(addtocartdetails[i].children[1].children[1].children[1].value) + 1
								addtocartdetails[i].children[2].children[1].textContent = Number(e.target.dataset.amount) * Number(addtocartdetails[i].children[1].children[1].children[1].value)
								console.log('present')
							} else {
								console.log('not present')
							}
						}
			})
		
}
for(let i = 0; i < plus.length; i++){
	plus[i].onclick = cartplus
}
//decreasing item qty
function cartminus(e){
		
	    e.target.parentElement.parentElement.style.animationName = 'spin'
		let nextSibling = e.target.nextSibling;
		let classN = e.target.dataset.name;;
		let addtocartdetails = document.querySelectorAll('.innercartcontainer .addtocartdetails');
		cartqty.textContent = Number(cartqty.textContent) - 1
		if(nextSibling.value <= 1){
			let obj = {name:e.target.dataset.name}
			fetch('/deletecartdetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.text() )
				.then(resp => {
					    e.target.parentElement.parentElement.style.animationName = 'none'
						alert(resp)
						e.target.parentElement.style.display = 'none'
						e.target.parentElement.previousSibling.style.display = 'block'
						for(let i=0; i < addtocartdetails.length; i++){
							if(addtocartdetails[i].dataset.name == classN){
								addtocartdetails[i].remove()
								//fetch request to remove the session item
							}
						}
				})
		} else {
			//fetch request to deduct the session item
			let obj = {name:e.target.dataset.name, amount:e.target.dataset.amount, qty: Number(e.target.nextSibling.value) - 1}
			fetch('/updatecartdetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.text() )
				.then(resp => {
						alert(resp)
						
						nextSibling.value = Number(nextSibling.value) - 1;
						
						for(let i=0; i < addtocartdetails.length; i++){
							if(addtocartdetails[i].dataset.name == classN){
								addtocartdetails[i].children[1].children[1].children[1].value = Number(addtocartdetails[i].children[1].children[1].children[1].value) - 1
								addtocartdetails[i].children[2].children[1].textContent = Number( addtocartdetails[i].children[2].children[1].textContent) - Number(e.target.dataset.amount)
							}
						}
				})
		}
}
for(let i = 0; i < minus.length; i++){
	minus[i].onclick = cartminus
}



	
	
//toggling the display of cart qty
let cartqtycontainer = document.querySelector('.cartqtycontainer');
let cartcontainer = document.querySelector('.cartcontainer');
let close = document.querySelector('.close');

cartqtycontainer.onclick = function(e){
	if(Number(document.querySelector('.cartqty').textContent) == 0){
		cartcontainer.style.display = 'block'
		close.style.display = 'block'
		document.querySelector('.emptycart').style.display = 'block'
		document.querySelector('.totalcart').style.display = 'none'
		document.querySelector('.innercartcontainer').style.display = 'none'
	}  else {
		cartcontainer.style.display = 'block'
		close.style.display = 'block'
		document.querySelector('.emptycart').style.display = 'none'
		document.querySelector('.totalcart').style.display = 'block'
		document.querySelector('.innercartcontainer').style.display = 'block'
		//display the subtotal
		let addtocartdetails = document.querySelectorAll('.innercartcontainer .addtocartdetails');
		let total = 0;
		for(let i =0; i < addtocartdetails.length; i++){
			total += Number( addtocartdetails[i].children[2].children[1].textContent)
		}
		let subtotal = document.querySelector('.subtotalamount');
		subtotal.textContent = total
	}
		
}

close.onclick = function(e){
	e.target.style.display = 'none'
	cartcontainer.style.display = 'none'
	document.querySelector('.information').style.display = 'none'
	document.querySelector('.shipping').style.display = 'none'
	document.querySelector('.payment').style.display = 'none'
}

//event handlers for session rendered data 
let removeitem = document.querySelectorAll('.innercartcontainer .addtocartdetails .removeitem');
let additem = document.querySelectorAll('.innercartcontainer .addtocartdetails .additem');
let removefromitem = document.querySelectorAll('.innercartcontainer .addtocartdetails .removefromitem');
for(let i=0; i < removeitem.length; i++){
	removeitem[i].onclick = remove
	additem[i].onclick = add
	removefromitem[i].onclick = removefrom
}


let toinformation = document.querySelectorAll('.toinformation');
for(let i =0; i < toinformation.length; i++){
	toinformation[i].onclick = function(){
		//check the inventory
		let obj = {cart: []}
		let addtocartdetails = document.querySelectorAll('.innercartcontainer .addtocartdetails');
		for(let b=0; b<addtocartdetails.length; b++){
			obj.cart.push({name: addtocartdetails[b].dataset.name, qty: addtocartdetails[b].children[1].children[1].children[1].value})
		}
		//display loader
		document.querySelector('.toinformationloader').style.display = 'inline-block'
		fetch('/checkinventory', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.json() )
				.then(resp => {
					document.querySelector('.toinformationloader').style.display = 'none'
					console.log(resp)
						for(let b=0; b<resp.length; b++){
							if(resp[b].netquantity >= 0){
								alert(`hurry ${resp[b].name} is almost finished`)
								document.querySelector('.totalcart').style.display = 'none'
								document.querySelector('.innercartcontainer').style.display = 'none'
								document.querySelector('.shipping').style.display = 'none'
								document.querySelector('.payment').style.display = 'none'
								document.querySelector('.information').style.display = 'block'
							} else {
								alert(`${resp[b].name} is low in inventory. reduce it by ${resp[b].netquantity} to continue.`)
							}
						}
						
				})
		
	}
}

let tocheckout = document.querySelectorAll('.tocheckout');
for(let i =0; i < tocheckout.length; i++){
	tocheckout[i].onclick = function(){
		document.querySelector('.totalcart').style.display = 'block'
		document.querySelector('.innercartcontainer').style.display = 'block'
		document.querySelector('.information').style.display = 'none'
		document.querySelector('.shipping').style.display = 'none'
		document.querySelector('.payment').style.display = 'none'
	}
}

let toshipping = document.querySelectorAll('.toshipping');
for(let i =0; i < toshipping.length; i++){
	toshipping[i].onclick = function(){
		//check if all forms has been filter
		if(document.querySelector('.firstname').value == ''){
			return alert('your first name is required')
		} else if(document.querySelector('.lastname').value == ''){
			return alert('your last name is required')
		} else if(document.querySelector('.firstemail').value == ''){
			return alert('your email is required')
		} else if(document.querySelector('.firstphoneno').value == '') {
			return alert('your phone no is required')
		}
		document.querySelector('.toshippingloader').style.display = 'inline-block'
		//send fetch request to server
		let obj = {firstname: document.querySelector('.firstname').value, lastname: document.querySelector('.lastname').value, email: document.querySelector('.firstemail').value, phoneno: document.querySelector('.firstphoneno').value}
		fetch('/checkinfo', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.text() )
				.then(resp => {
					if(resp == 'incomplete'){return alert('your information is incomplete')}
					console.log(resp)
					document.querySelector('.toshippingloader').style.display = 'none'
					document.querySelector('.totalcart').style.display = 'none'
					document.querySelector('.innercartcontainer').style.display = 'none'
					document.querySelector('.information').style.display = 'none'
					document.querySelector('.shipping').style.display = 'block'
					document.querySelector('.payment').style.display = 'none'
		})
		
	}
}

let topayment = document.querySelectorAll('.topayment');
for(let i =0; i < topayment.length; i++){
	topayment[i].onclick = function(){
		let a;
		let b = {};
		let method = document.querySelectorAll('input.method');
		for(let i=0; i<method.length; i++){
			if( method[i].checked == true){
				a = method[i].dataset.name
			}
		}
		if(a=='pickup'){
			let choosepickup = document.querySelectorAll('input.choosepickup');
			for(let i=0; i<choosepickup.length; i++){
				if(choosepickup[i].checked == true){
					b.country = choosepickup[i].dataset.country
					b.state = choosepickup[i].dataset.state
					b.city = choosepickup[i].dataset.city
					b.address = choosepickup[i].dataset.address
				}
			}
		} else if (a == 'local'){
			let deliveryoptions = document.querySelectorAll('.deliveryoptions');
			for(let i=0; i<deliveryoptions.length; i++){
				if(deliveryoptions[i].dataset.selected == 'true'){
					b.method = deliveryoptions[i].dataset.name
				}
			}
		}
		let ctr = document.querySelector('input.country');
		let sts = document.querySelector('input.state');
		let cty = document.querySelector('input.city');
		//display loader
		document.querySelector('.topaymentloader').style.display = 'inline-block'
		let obj = {type: a,info: b, country: ctr.value, state:sts.value, city:cty.value}
		console.log(obj)
		fetch('/checkshipping', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res => res.json() )
				.then(resp => {
					document.querySelector('.topaymentloader').style.display = 'none'
					console.log(resp)
					if(resp.rate == 'null'){return alert('your shipping information does not exist')}
					else if (resp.rate == 'Jesus paid it all') {alert('Jesus paid it all')}
					document.querySelector('.totalcart').style.display = 'none'
					document.querySelector('.innercartcontainer').style.display = 'none'
					document.querySelector('.information').style.display = 'none'
					document.querySelector('.shipping').style.display = 'none'
					document.querySelector('.payment').style.display = 'block'
				})
		
	}
}

let radio = document.querySelectorAll('input.method');
for(let i=0; i<radio.length; i++){
	radio[i].onchange =function(e){
		let divmethod = document.querySelectorAll('div.method');
		for(let b=0; b<divmethod.length; b++){
			if(e.target.dataset.name == divmethod[b].dataset.name){
				divmethod[b].style.display = 'block'
			} else {
				divmethod[b].style.display = 'none'
			}
		}
	}
}

let deliveryoptions = document.querySelectorAll('.deliveryoptions');
for(let i=0; i<deliveryoptions.length; i++){
	deliveryoptions[i].onclick = function(e){
		for(let i=0; i<deliveryoptions.length; i++){
			deliveryoptions[i].style.color = 'black'
			deliveryoptions[i].style.backgroundColor = 'white'
			deliveryoptions[i].dataset.selected = 'false'
		}
		e.target.style.color = 'white'
		e.target.style.backgroundColor = 'blue'
		e.target.dataset.selected = 'true'
		
		let deliverycontent = document.querySelectorAll('.deliverycontent')
		for(let i=0; i<deliverycontent.length; i++){
			if(e.target.dataset.name == deliverycontent[i].dataset.name){
				deliverycontent[i].style.display = 'block'
			} else {
				deliverycontent[i].style.display = 'none'
			}
		}
	}
}

let completeorder = document.querySelector('.completeorder')
completeorder.onclick = function(e){
  //send fetch request to update the order 
  document.querySelector('.tocompleteorder').style.display = 'inline-block'
  fetch('/completeorder')
    .then(res => res.text())
	.then(resp => {
		if(resp == 'data'){
			setTimeout(function(){document.getElementById('completeorder0').click()},2000)
			document.querySelector('.tocompleteorder').style.display = 'none'
		}
		
	})	
}

let clickme = document.querySelector('button.clickme')
clickme.onclick = function(){
	document.getElementById('completeorder0').click()
}