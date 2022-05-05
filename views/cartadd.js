
				  let cartadd = document.querySelectorAll('.cartadd');
				  let cartinfo1 = document.querySelector('.cartinfo1');
				  
				  //posting added foods to the cart
				  async function foodinfo(url, target) {
				    let data = target.dataset;
					
					try {
						let res = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: data.name, amount: data.amount, pics: data.pics}) });
						return await res.json();
						
					} catch (e) {
					  console.log(e)
					}
				  }
				  
				  //using fetched data to modify element's content
				  async function data(url, target) {
				    let info = await foodinfo(url, target)
					
					console.log(info.cart)
					
					//save the cartlength in session storage
					sessionStorage.setItem('cartlength', (info.length || 0))
					
					//use the saved object as the textcontent of the cart 
					cartinfo1.textContent = sessionStorage.getItem('cartlength')
					
					
					//save the cart in session storage and change the text content
					sessionStorage.setItem('cart', JSON.stringify({cart:(info.cart || 0)}) )
					target.textContent = (JSON.parse(sessionStorage.getItem('cart')).cart.filter(item => {return item.name == target.dataset.name}).length > 0? 'added to cart': 'add to cart')
				  }
				  //adding to cart
				   for(let i = 0; i < cartadd.length; i++) {
				   //added to cart as textContent
				   
				   //cartadd[i].textContent = ( (JSON.parse(sessionStorage.getItem('cart')).cart.filter(item => {return item.name == cartadd[i].dataset.name}).length > 0) != 'undefined'? 'added to cart': 'add to cart')
				   try {
				     cartadd[i].textContent = (JSON.parse(sessionStorage.getItem('cart')).cart.filter(item => {return item.name == cartadd[i].dataset.name}).length > 0? 'added to cart': 'add to cart')
				   } catch(e) {
				     cartadd[i].textContent = 'add to cart'
				   }
				   
				   
				   
				   cartadd[i].onclick = function(e) {
				    if(e.target.textContent == 'added to cart') {
					   e.target.textContent='add to cart';
					   fetch(`/cartdetails/${e.target.dataset.name}`, {method: 'DELETE'})
					     .then(res => res.json())
						 .then(resp => {
						   console.log(resp);
						   sessionStorage.setItem('cartlength', (resp.length || 0))
					       cartinfo1.textContent = sessionStorage.getItem('cartlength')
						   
						   //save the cart in session storage
						   sessionStorage.setItem('cart', JSON.stringify({cart:(resp.cart || 0)}) )
						 })
					} 
					else {
				      data(`/cartdetails`, e.target)
					}
				   }
				  }
				  
				  cartinfo1.textContent = (sessionStorage.getItem('cartlength') || 0)
				  
	 