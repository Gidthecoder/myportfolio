let nav = document.querySelectorAll('p.nav b')
for(let i=0; i<nav.length; i++){
	nav[i].onclick = function(e){
		for(let b=0; b<nav.length; b++){
			nav[b].style.backgroundColor = 'white'
		}
		e.target.style.backgroundColor = 'silver'
	}
}
