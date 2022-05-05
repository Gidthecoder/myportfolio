//updating images of the first item
let fs = document.querySelectorAll('div.firstpic')
for(let i = 0; i < fs.length; i++){
	fs[i].style.backgroundImage = `url(${fs[i].dataset.pic})`
}
	 let addtocart = document.querySelectorAll('.addtocart');
	 let cartinfo = document.querySelector('.cart')
	 cartinfo.style.display = 'none';
	 
	 //closing the cart when the background ix clicked
	 let closecart  = document.querySelector('.closecart');
	 closecart.style.display = 'none'
	 
	 closecart.onclick = function() {closecart.style.display = 'none';cartinfo.style.display = 'none';body.style.overflow = 'scroll'}
	 //console.log(cartinfo.style.display)
	 let ddata = JSON.parse(sessionStorage.getItem('cart'))
	 
	 //cart icon 
	  let cart1234 = document.querySelector('.cart1234');
	  cart1234.addEventListener('click', function cartDisplay(e) {
	     //if there isn't cart
	     if(!sessionStorage.getItem('cart')) {
		    closecart.style.display = 'block'
			alert('no data')
			//if the cart isn't displayed, show them with its details
				body.style.overflow='hidden';
				cartinfo.style.display = 'block';
				//rendered the cart details
				let details = '<p>you have no cart</p>'
				details += '<style>.cart {display: none;width: 35%;order: 2;background-color: white;padding-left: 10px;overflow: scroll;position:absolute;margin-top:0px;top:0px;right:0;height:100%;z-index:3;}</style>'
				cartinfo.innerHTML = details
		 }
		 //if the cart details length is 0
		 else if(JSON.parse(sessionStorage.getItem('cart')).cart.length == 0) {
		   alert('your cart is empty')
		   closecart.style.display = 'block'
		   
				body.style.overflow='hidden';
				cartinfo.style.display = 'block';
				//rendered the cart details
				let details = `<div>
				                 <h1 style='text-align:center;'>Your Cart Is Empty</h1>
								 <p style='text-align:center;'><i class='fas fa-shopping-cart' style='font-size:100px;'></i></p>
							   </div>`
				details += '<style>.cart {display: none;width: 35%;order: 2;background-color: white;padding-left: 10px;overflow: scroll;position:absolute;margin-top:0px;top:0px;right:0;height:100%;z-index:3;}</style>'
				cartinfo.innerHTML = details
		  
		 }
		 //if there is cart
		 else {
		   alert(JSON.parse(sessionStorage.getItem('cart')).cart.length )
		   //if the cart isn't displayed, show them with its details
		   
		        closecart.style.display = 'block'
				
				body.style.overflow='hidden';
				cartinfo.style.display = 'block';
				let mdetails = ''
				mdetails += `<div id='checkout'>
								<p style='margin:0;'>total: <b id='carttotal' style='float:right;'>b</b></p>
								<h1 id='check' style='margin:0;text-align:center;color:white;'>continue to shipping</h1>
								
								<style>
								  .carttitle {text-align: center;}
								  #check {background-color:black;cursor:pointer;}
								  #checkout {width:450px;;position:fixed;bottom:40px;margin:0;z-index:3;right:20;background-color:white;}
								  #check:hover {background-color: rgb(92,92,92)}
								  @media screen and (max-width: 1200px) {
								    #checkout {width:62%;}
								  }
								  @media screen and (max-width: 700px) {
								    #checkout {width:96%;left:10}
								  }
								</style>
				            </div>`
							mdetails += `
							  <div>
							    <p>
								  <a href='#' class='cartdetails'>cart details</a>
								  <a href='#' class='shippingdetails'>shipping</a>
								  <a href='#' class='paymentdetails'>payment</a>
								<h1 class='carttitle'>your cart</h1>
							  </div>
							`
				for(let i = 0; i < JSON.parse(sessionStorage.getItem('cart')).cart.length; i++) {
						let thecartinfo = `
								
								<div class='cart00'>
									<h1 class='cart01'><a href=''>${JSON.parse(sessionStorage.getItem('cart')).cart[i].name}</a></h1>
									<b class='cart02'>clear</b>
									<div class='cart03'>
										<img class='cart04' src=${JSON.parse(sessionStorage.getItem('cart')).cart[i].pics} style=''/>
										<div class='cart05'>
											<p class='cart06'>${JSON.parse(sessionStorage.getItem('cart')).cart[i].amount}</p>
											<div class='cart07'>
												<!--<a class='cart08'>-</a>-->
												<input class='cart09' type='search'>
												<!--<a class='cart10' style=''>+</a>-->
											</div>
										</div>
									</div>
								</div>
								<style>
									.cart {display: none;width: 35%;padding-right:0;order: 2;background-color: white;padding-left: 10px;overflow-y: scroll;overflow-x:hidden;position:absolute;top:0px;right:0;height:550px;z-index:3;padding-top: 0px;}
									.cart00 {display:flex;flex-wrap:wrap;flex-direction:row;width:99%;margin-left:1%;border-bottom:2px solid silver;}
									.cart01 {order:1;width:80%;font-size:30px;padding:0;margin:0}
									.cart02 {order:2;font-size:15px;padding: 0px;margin:0;vertical-align:bottom}
									.cart03 {order:3;display:flex;flex-wrap:wrap;flex-direction:row;width:100%;margin:0;}
									.cart04 {order:1;width:40%;height:100px;}
									.cart05 {order: 2;width:50%;height:100px;}
									.cart06 {width:60%;margin-left:30%;margin-right:10%;text-align:right;margin-top: 20px;}
									.cart07 {position:relative;width:200px;margin-left:25%;margin-right:5%;}
									.cart08 {position:absolute;left:0;font-size:27px;top:0;padding:0;padding-left:10px;padding-right:10px;}
									.cart09 {width: 200px;padding: 4px;padding-left:40px;padding-right:24px;font-size:25px;display:inline-block;text-align:center;}
									.cart10 {position:absolute;right:0;font-size:27px;top:0;padding:0;padding-left:10px;padding-right:10px;}
									.cart08:hover, .cart10:hover {background-color: silver}
									.cart10, .cart08 {border: 1px solid black;}
									.cart08:active, .cart10:active {background-color: black}
									@media screen and (max-width: 1200px) {
								      .cart {width:65%;}
								    }
									@media screen and (max-width: 700px) {
										.cart {display: block;background-color:white;margin-top:60px;position: absolute;top:17px;z-index:3;width: 97%;left: 0;height:72%;}
										.cart04 {width: 30%}
										.cart07 {margin-left: 70%}
										.cart01 {font-size: 25px}
										.cart09 {width:50%}
									}
									@media screen and (max-width: 400px) {
									  .cart01 {font-size: 20px}
									  .cart02 {font-size: 12px}
									  .cart09 {width:30%}
									}
								</style>
								<div class='yourshipping' style='display:none;'>
								  <h1>your shipping info</h1>
								  <h2>contact</h2>
								  <label style='display:block;'>
								    name:
									<input type='search'>
								  </label>
								  <label style='display:block;'>
								    phone no(optional):
									<input type='search'>
								  </label>
								  <label style='display:block;'>
								    email:
									<input type='search'>
								  </label>
								  <label style='display:block;'>
								    <input type='checkbox'>
									sign up for our weekly newsletter
								  </label>
								  <h2>address</h2>
								  <label style='display:block;'>
								    state:
									<input type='search'>
								  </label>
								  <label style='display:block;'>
								    local government or city:
									<input type='search'>
								  </label>
								  <label style='display:block;'>
								    zipcode:
									<input type='search'>
								  </label>
								  <label style='display:block;'>
								    address:
									<input type='search'>
								  </label>
								</div>
								<style>
								  .yourshipping input[type='search'] {width:95%;padding:5px;border-radius:5px;}
								</style>
								<div class='yourpayment' id='paymentForm' style='display:none;'>
								  <h1>your payment info</h1>
								  <label style='display:block;'>
								    Email*:
									<input type='email' id='email-address' required style='width:100%;'>
								  </label>
								  <label style='display:block;'>
								    Amount*:
									<input type='tel' id='amount' readonly value='2500' required>
								  </label>
								  <label style='display:block;'>
								    Name:
									<input type='search'>
								  </label>
								  <label style='display:block;'>
								    
									<button type='submit' id='paymentsubmit' onclick='payWithPaystack()'>pay</button>
								  </label>
								</div>
								<style>
								  .yourpayment input {padding:5px;border-radius:5px;width:50%;}
								  .yourpayment label {margin:5px}
								</style>
						`
						mdetails += thecartinfo
						
				}
				
				cartinfo.innerHTML = mdetails
				//connecting to web payments
				let cartdetails = document.querySelector('.cartdetails');
				let shippingdetails = document.querySelector('.shippingdetails');
				let paymentdetails = document.querySelector('.paymentdetails');
				let carttitle = document.querySelector('.carttitle');
				let cart00 = document.querySelectorAll('.cart00')
				let shippinginfo = document.querySelector('.yourshipping')
				let paymentinfo = document.querySelector('.yourpayment')
				
				cartdetails.onclick = function(){
					for(let i = 0; i < cart00.length; i++){
						cart00[i].style.display = 'flex'
					}
					carttitle.style.display = 'block'
					shippinginfo.style.display = 'none'
					paymentinfo.style.display = 'none'
					
					//change 'continue to shipping' to 'continue to payment'
					check.textContent = 'continue to shipping'
					
					//change the total cart details to shipping totals
					carttotal.textContent = sessionStorage.getItem('total');
				}
				shippingdetails.onclick = function(){
					
					paymentinfo.style.display = 'none'
					shippinginfo.style.display = 'block'
					
					for(let i = 0; i < cart00.length; i++){
						cart00[i].style.display = 'none'
					}
					carttitle.style.display = 'none'
					//change 'continue to shipping' to 'continue to payment'
					check.textContent = 'continue to payment'
					
					//change the total cart details to shipping totals
					carttotal.textContent = 'shipping rates will be calculated later';
				}
				paymentdetails.onclick = function(){
					paymentinfo.style.display = 'block'
					shippinginfo.style.display = 'none'
					
					for(let i = 0; i < cart00.length; i++){
						cart00[i].style.display = 'none'
					}
					carttitle.style.display = 'none'
					//change 'continue to shipping' to 'continue to payment'
					check.textContent = 'checkout'
					
					//change the total cart details to shipping totals
					carttotal.textContent = 'shipping rates plus carttotal will be calculated later';
				}
				
				let totalamount = 0;
				for(let i = 0; i < JSON.parse(sessionStorage.getItem('cart')).cart.length; i++) {
				  totalamount += parseInt(JSON.parse(sessionStorage.getItem('cart')).cart[i].amount)
				  
				  sessionStorage.setItem('total', totalamount)
				  carttotal.textContent = sessionStorage.getItem('total');
				}

		 }
	  })
	  
	  /*cart1234.addEventListener('mouseover', function cartDisplay(e) {
	    if(cartinfo.style.display == 'none' || cartinfo.style.display == 'block') {cart1234.style.backgroundColor = 'silver'} 
	  })
	  cart1234.addEventListener('mouseout', function cartDisplay(e) {
	    if(cartinfo.style.display == 'none') {cart1234.style.backgroundColor = 'transparent'} else {cart1234.style.backgroundColor = 'silver';cart1234.style.borderRadius = '50%'}
	  })
	  */
	 