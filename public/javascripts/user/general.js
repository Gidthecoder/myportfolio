//responsive page
let menubars = document.querySelector('.menubars')
		  
let closeit = document.querySelector('.closeit')
menubars.onclick = function() {
	header.style.display = 'block'
	closeit.style.display = 'block'
	
}
closeit.onclick = function() {
	header.style.display = 'none'
	closeit.style.display = 'none'
}
function open(x) {
		if(!x.matches) {
			closeit.style.display = 'none'
		}
}
let x = window.matchMedia("(max-width: 1200px)")
open(x)
x.addListener(open)

//headers
let header = document.querySelector('article header')
//let closeit = document.querySelector('.closeit')
		  
let sections = document.querySelectorAll('.sections');

let navigations = document.querySelectorAll('article header p.nav');

//programmatically click the navigation that was sent from server
setTimeout(function(){console.log('ok boss');document.getElementById(`${body.dataset.nav}`).click()},1000)


//pop state history api
window.addEventListener('popstate', function(e){
	let character = e.state;
	
	console.log(e.state)
	for(let i = 0; i < sections.length; i++) {
		if(e.state == sections[i].dataset.name ) {
			
			sections[i].style.display = 'block'
			
			for(let b = 0; b < navigations.length; b++) {
				navigations[b].style.backgroundColor = 'transparent'
				
			}
			document.querySelector(`p.nav#${e.state}`).style.backgroundColor = 'rgb(64,20,67)'
		} else if(e.state == null) {
			history.back()
			//do nothing
		} else {
			sections[i].style.display = 'none'
		}
	}
})



for(let i = 0; i < navigations.length; i++) {
  navigations[i].onclick = function(e) {
	function open(x) {
		if(x.matches) {
			header.style.display = 'none'
		} else {
			header.style.display = 'block'
		}
	}
	let x = window.matchMedia("(max-width: 1200px)")
	open(x)
	x.addListener(open)
	
	
	let closeit = document.querySelector('p.closeit')
	closeit.style.display = 'none'
	
	for(let i = 0; i < sections.length; i++) {
		if(e.target.dataset.name == sections[i].dataset.name ) {
			
			
			sections[i].style.display = 'block'
			
			for(let b = 0; b < navigations.length; b++) {
				navigations[b].style.backgroundColor = 'transparent'
				
			}
			e.target.style.backgroundColor = 'rgb(64,20,67)'
		} else {
			sections[i].style.display = 'none'
			
		}
	}
	let pushstate = `?navigation=${e.target.dataset.name}`
    let data = e.target.dataset.name
	history.pushState(data, null, pushstate)
  }
}


//change user
let changeuser = document.querySelector('.changeuser')
let changinguser = document.querySelector('.changinguser')


//clearing content when the document body is clicked
body.onclick = function(e){
	if(e.target.classList.contains('changeuser')){
		if(changinguser.style.display == 'none'){
		  changinguser.style.display = 'block'
	    } else {
		  changinguser.style.display = 'none'
	    }
	}
	else if(!e.target.classList.contains('only')){
		changinguser.style.display = 'none'
		
	} 
}

//question icon
let questionicon = document.querySelectorAll('.fa-question')
let closequestion = document.querySelector('.closequestion')
let questionmanual = document.querySelector('.questionmanual')
let staffpermissionmanual = document.querySelector('div.divstaffpermission')

for(let i = 0; i < questionicon.length; i++){
	questionicon[i].onclick = function(){
		closequestion.style.display = 'block'
		questionmanual.style.display = 'block'
	}
}

closequestion.onclick = function(){
	closequestion.style.display = 'none'
	questionmanual.style.display = 'none'
	//hide new page Form
	newpageform.style.display = 'none'
	//hide new subdomain Form
	newsubdomainform.style.display = 'none'
	//hide newframeview
	newframeview.style.display = 'none'
}
