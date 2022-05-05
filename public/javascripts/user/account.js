
let accinformation = document.querySelectorAll('.accinformation');


let accinfo = document.querySelectorAll('li.accinfo');
for(let i = 0; i < accinfo.length; i++) {
  accinfo[i].onclick = function(e){
	if(e.currentTarget.nextElementSibling.style.display == 'none'){
		e.currentTarget.nextElementSibling.style.display = 'block'
		e.currentTarget.children[1].style.display = 'inline'
		e.currentTarget.children[0].style.display = 'none'
	} else {
		e.currentTarget.nextElementSibling.style.display = 'none'
		e.currentTarget.children[1].style.display = 'none'
		e.currentTarget.children[0].style.display = 'inline'
	}
	
  }
}

		

//updating business account details
let bsinfo = document.querySelectorAll('.bsinfo')
let bsinfosubmit = document.querySelector('.bsinfosubmit')
for(let i = 0;i < bsinfo.length; i++) {
	bsinfo[i].oninput = function() {
		bsinfosubmit.style.display = 'inline-block'
	}
}
bsinfosubmit.onclick = function() {
	let bsinfoloader = document.querySelector('.bsinfosubmit b.loader')
	bsinfoloader.style.display = 'inline-block'
	let bsobject = {
		businessname: document.querySelector('.bsname').value,
		country: document.querySelector('.bscountry').value,
		phoneno: document.querySelector('.bsphoneno').value,
		email: document.querySelector('.bsemail').value
	}
	fetch('/users/accountinfoupdate', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({business: bsobject }) })
	      .then(res => res.text() )
		  .then(resp => {
			  bsinfoloader.style.display = 'none';
			  bsinfosubmit.style.display = 'none';
			  alert(resp) 
			  
		  })
}

//billing calculator
let billsubtotal = document.querySelector('.billsubtotal');
let billamount = document.querySelectorAll('.billamount');
let billtotal = document.querySelectorAll('.billtotal');
let netdeposit = document.querySelector('.netdeposit')
let tot = 0;
for(let i=0; i<billamount.length; i++){
	tot += Number(billamount[i].textContent)
}
billsubtotal.textContent = tot
for(let i=0; i<billtotal.length; i++){
	billtotal[i].textContent = Number(billsubtotal.textContent) + Number(document.querySelector('.taxtotal').textContent)
}
netdeposit.textContent = Number(document.querySelector('.deposit').textContent) - Number(billtotal[0].textContent)

//showing bills History
let billhistory = document.querySelector('select.billhistory')
billhistory.onchange = function(e){
	if(e.target.value == 'current month'){ document.querySelector('.billinginner').style.display = 'block'; document.querySelector('.billinginner').nextElementSibling.style.display = 'none'; return}
	else {
		//send fetch request and change the innerhtml
		document.querySelector('.tobillhistory').style.display = 'inline-block'
		let split = e.target.value.split(':')
		let obj = {month: split[0], year: split[1]}
		console.log(obj)
		fetch('/users/getbills', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj) })
	      .then(res => res.json() )
		  .then(resp => {
			  document.querySelector('.tobillhistory').style.display = 'none'
			  document.querySelector('.billinginner').style.display = 'none'
			  document.querySelector('.billinginner').nextElementSibling.style.display = 'block'
			  document.querySelector('.billinginner').nextElementSibling.style.backgroundColor = 'white'
			  let inner = ''
			  inner += `<p style='color:white;background-color:violet;nargin:0;padding:9px;text-align:center;'>Billing For The Month ${resp.month} Of Year ${resp.year}`
			  inner += `<div style='background-color:white;'>
							<table style='border-top:2px solid blue;width:100%;border-collapse:collapse;'>
								<tr>
									<th>feature</th>
									<th>rate</th>
									<th>qty</th>
									<th>amount($)</th>
								<tr>`
				let subtotal = 0;
				for(let i=0; i<resp.content.length; i++){
					subtotal += Number(resp.content[i].amount)
					inner += `<tr>`
					inner += `<th>${resp.content[i].feat}</th>`
					inner += `<th>${resp.content[i].rate}</th>`
					inner += `<th>${resp.content[i].qty}</th>`
					inner += `<th>${resp.content[i].amount}</th>`
					inner += `</tr>`
				}
				inner += `</table></div>`
                inner += `<div style='display:flex;justify-content:flex-end;'>
							<div style='border:1px solid black;margin:10px;'>
							  <p>subtotal:
                                <b class='billsubtotal'>${subtotal}</b>
							  </p>
							  <p>tax:
                                <b class='taxtotal'>${resp.taxtotal}</b>
							  </p>
							  <p>total:
                                <b class='billtotal'>${subtotal + Number(resp.taxtotal)}</b>
							  </p>
							</div>
						  </div>
						` 
				document.querySelector('.billinginner').nextElementSibling.innerHTML = inner
		  })
	}
	
}




//attach external payment gateway to the pay button

//activate 2FA
let activate2fasq = document.querySelectorAll('.activate2fasq');
let SQcontainer = document.querySelector('div.SQcontainer')
for(let i = 0; i < activate2fasq.length; i++) {

  activate2fasq[i].onclick = function(e){
	  document.querySelector('.sqloader').style.display = 'inline-block'
	if(e.target.dataset.type == 'securityQ'){
		if(e.target.checked == true){
			//display the securityQ
			SQcontainer.style.display = 'block'
			
		} else if (e.target.checked == false){
			//hide the securityQ
			SQcontainer.style.display = 'none'
		}
	}
	if(e.target.dataset.type == 'twoFA'){
		if(e.target.checked == true){
			//display the securityQ
			SQcontainer.style.display = 'none'
			
		} else if (e.target.checked == false){
			//hide the securityQ
			SQcontainer.style.display = 'block'
		}
	}
	if(e.target.dataset.type == 'Disable'){
		if(e.target.checked == true){
			//display the securityQ
			SQcontainer.style.display = 'none'
			
		} else if (e.target.checked == false){
			//hide the securityQ
			SQcontainer.style.display = 'block'
		}
	}
	let obj = {
		value: e.target.checked,
		type: e.target.dataset.type
	}
	fetch('/users/accountinfoupdate', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ twoFAsq: obj }) })
	      .then(res => res.text() )
		  .then(resp => {
			  document.querySelector('.sqloader').style.display = 'none'
			  alert(resp) 
			  SQcontainer.style.display = 'none'
		  })
  }
}

//hiding and showing security questions onload
SQcontainer.style.display = (SQcontainer.dataset.permission == 'true'? 'block':'none')

//hiding and displaying security questions on button click
let editsquestion = document.querySelector('button.editsquestion');
let otpcontainer = document.querySelector('div.otpcontainer');
let sqloader = document.querySelector('b.loader.sqloader')
editsquestion.onclick = function(){
	alert('are you sure you wanna do this')
	
	if(otpcontainer.style.display == 'none'){
		otpcontainer.style.display = 'block'
		
	} else if (otpcontainer.style.display == 'block'){
		otpcontainer.style.display = 'none'
	}
}

//displaying answer and making question element editable if otp is correct
let submitotpforSQ = document.querySelector('p.submitotpforSQ');
let otpans = document.querySelector('input.otpans');
let otpsq = document.querySelector('input.otpsq');
let editableqs = document.querySelector('b.editableqs');

submitotpforSQ.onclick = function(){
	sqloader.style.display = 'inline-block'
	let obj = {
		question: otpsq.value,
		answer: otpans.value
	}
	fetch('/users/accountinfoupdate', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ modifySQ: obj }) })
	      .then(res => res.text() )
		  .then(resp => {
			  sqloader.style.display = 'none'
			  alert(resp)
			  otpans.value = ''
			  SQcontainer.style.display = 'none'
		  })
}


let changeuserpassword = document.querySelector('.changeuserpassword')
changeuserpassword.onclick = function(e){
	e.currentTarget.children[0].style.display = 'inline-block'
	fetch('/users/changepassword', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ }) })
	      .then(res => res.text() )
		  .then(resp => {
			  //console.log(e.target)
			  e.target.children[0].style.display = 'none'
			  alert(resp)
			  
		  })
}
