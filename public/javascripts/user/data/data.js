
//navigating between the data tabs
let analytics = document.querySelectorAll('p.analytics')
let analyticsbody = document.querySelectorAll('section.analyticsbody');
for(let b = 0; b < analytics.length; b++){
	analytics[b].onclick = function(e){
		console.log(e.currentTarget)
		fetch('/users/getdemos')
		  .then( res => res.json())
		  .then(resp => {
			  
			  console.log('true')
			})
		for(let i = 0; i < analyticsbody.length; i++){
			if(e.target.dataset.name == analyticsbody[i].dataset.name){
				if(analyticsbody[i].dataset.name == 'web'){
					analyticsbody[i].style.display = 'block'
				} else {
					analyticsbody[i].style.display = 'grid'
				}
				
				for(let b = 0; b < analytics.length; b++){
					analytics[b].style.backgroundColor = 'white'
				}
				e.target.style.backgroundColor = 'rgb(245,245,245)'
			} else {
				analyticsbody[i].style.display = 'none'
				
			}
		}
	}
}

let rawdatalink = document.querySelectorAll('.rawdatalink');
for(let i=0; i<rawdatalink.length; i++){
	rawdatalink[i].onclick = function(e){
		e.currentTarget.parentElement.style.display = 'none'
		e.currentTarget.parentElement.nextElementSibling.style.display = 'block'
		e.currentTarget.parentElement.nextElementSibling.children[1].src = e.currentTarget.dataset.src
	}
}

let backtoraw = document.querySelector('.backtoraw')
backtoraw.onclick = function(e){
	e.currentTarget.parentElement.style.display = 'none'
	e.currentTarget.parentElement.previousElementSibling.style.display = 'block'
}