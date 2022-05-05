//copyright 2022 GIGAGON Developers
function log(){
	let useremail = document.querySelector('input.email')
	   useremail.oninput = function(e) {
	     let emailvalidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		 if(!e.target.value.match(emailvalidate) ) {
		    useremail.style.borderColor = 'red'
		 } else {
			useremail.style.borderColor = 'green'
		 }
	   }
	   
	   let submit = document.querySelector('a.login')
	   let submitdetails = document.querySelector('a.submithref')
	   submit.onclick = function() {
	     let obj ={
		    email: document.querySelector('input.email').value,
			password:document.querySelector('input.password').value
		 }
		 let emailvalidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		 if(!obj.email.match(emailvalidate)) {
		   alert('wrong email format')
		 } else if(obj.password.length < 7 || obj.email.length < 1){
		   alert('your email and password form has to be filled')
		 } else {
		   
		   document.querySelector('.loginloader').style.display = 'inline-block'
		   
		   let a = btoa(`${obj.email}:${obj.password}`)
		   fetch('/users/checkauth', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${a}`}, body: JSON.stringify( {bod: '0'} ) })
				.then(res =>  res.json() )
				.then(resp => {
				  document.querySelector('.loginloader').style.display = 'none'
				  console.log(resp)
				  if(resp.msg == 'cool'){
					//click the link redirect button
					document.querySelector('section.passwordrecover').style.display = 'none'
					document.querySelector('section.securitykey').style.display = 'none'
					document.querySelector('section.otp').style.display = 'none'
					document.querySelector('section.login').style.display = 'block'
					submitdetails.href = '/main?navigation=content'
					
					setTimeout(function(){submitdetails.click()}, 4000) 
				  } else if (resp.msg == 'incorrect'){
				    alert('username or password is incorrect')
				  } else if (resp.msg == 'enter sq' ){
				    //display the sq container
					document.querySelector('section.passwordrecover').style.display = 'none'
					document.querySelector('section.securitykey').style.display = 'block'
					document.querySelector('section.otp').style.display = 'none'
					document.querySelector('section.login').style.display = 'none'
					
					document.querySelector('.securityq').textContent = resp.content
				  } else if(resp.msg == 'enter otp'){
				    //display the otp container
					document.querySelector('section.passwordrecover').style.display = 'none'
					document.querySelector('section.securitykey').style.display = 'none'
					document.querySelector('section.otp').style.display = 'block'
					document.querySelector('section.login').style.display = 'none'
					alert(resp.content)
				  }
			})
		   
		 }
	   }
	   submitdetails.onclick = function(){
	      
	   }
	   
	   //forgot password
	   let forgotpassword = document.querySelector('.forgotpass')
	   forgotpassword.onclick = function(){
	     document.querySelector('section.passwordrecover').style.display = 'block'
		 document.querySelector('section.securitykey').style.display = 'none'
		 document.querySelector('section.login').style.display = 'none'
		 document.querySelector('section.otp').style.display = 'none'
	   }
	   let recoverykey = document.querySelector('.recoverykey')
	   recoverykey.onclick = function(){
	   let obj = {ans: document.querySelector('.recoverypassword').value}
	      fetch('/users/forgotpassword', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res =>  res.text() )
				.then(resp => {
				  alert(resp)
				})
	   }
	   
	   let back = document.querySelectorAll('b.back')
	   for(let i=0; i<back.length; i++){
	     back[i].onclick = function(){
		   document.querySelector('section.passwordrecover').style.display = 'none'
		   document.querySelector('section.securitykey').style.display = 'none'
		   document.querySelector('section.login').style.display = 'block'
		 }
	   }
	   //submit security key
	   let key = document.querySelector('button.key')
	   key.onclick = function(){
	     //send fetch request 
		 let obj = {ans: document.querySelector('input.sqkey').value }
		 console.log(obj)
		 document.querySelector('.sqloader').style.display = 'inline-block'
		 fetch('/users/checksq', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res =>  res.json() )
				.then(resp => {
				  console.log(resp)
				  document.querySelector('.sqloader').style.display = 'none'
				  if(resp.msg == 'cool'){
				    submitdetails.href = '/main?navigation=content'
					
					setTimeout(function(){submitdetails.click()}, 5000) 
				  } else {
				    location.reload()
				  }
			})
	   }
	   //submit otp
	   let otpkey = document.querySelector('button.otpkey')
	   otpkey.onclick = function(){
	     //send fetch request 
		 let obj = {ans: document.querySelector('input.otp').value }
		 console.log(obj)
		 document.querySelector('.otploader').style.display = 'inline-block'
		 fetch('/users/checkotp', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
				.then(res =>  res.json() )
				.then(resp => {
				  console.log(resp)
				  document.querySelector('.otploader').style.display = 'none'
				  if(resp.msg == 'cool'){
				    submitdetails.href = '/main?navigation=content'
					
					setTimeout(function(){submitdetails.click()}, 5000) 
				  } else {
				    location.reload()
				  }
			})
	   }
 }
 export {log}