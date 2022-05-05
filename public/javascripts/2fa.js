(body.dataset.otp?alert(body.dataset.otp):'')

let submit = document.querySelector('a.submit');
let otpinput = document.querySelector('input.otp, p.q');

otpinput.oninput = function(e) {
	
	submit.href = '/users/login/2fa?email=' + body.dataset.email + (document.querySelector('input.otp')?'&otp=':'&ans=') + (document.querySelector('input.otp')?document.querySelector('input.otp').value:document.querySelector('p.q').textContent)
	alert(submit.href)
}

submit.onclick = function(e) {
	//display the loader
	let loader = document.querySelector('i.loader');
	loader.style.display = 'inline-block'
	
	
}