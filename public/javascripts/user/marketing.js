
//hiding and displaying marketing functionalities
let marketlinks = document.querySelectorAll('.marketlinks');
let marketcontent = document.querySelectorAll('.marketcontent');
for(let i = 0; i < marketlinks.length; i++){
	marketlinks[i].onclick = function(e){
		for(let i = 0; i < marketlinks.length; i++){
			marketlinks[i].style.backgroundColor = 'white'
		}
		e.target.style.backgroundColor = 'rgb(245,245,245)'
		for(let b = 0; b < marketcontent.length; b++){
			if(e.currentTarget.dataset.name == marketcontent[b].dataset.name){
				
				marketcontent[b].style.display = 'block'
			} else {
				marketcontent[b].style.display = 'none'
			}
		}
	}
}