let link = document.querySelectorAll('.link');
let socialmarket = document.querySelectorAll('.socialmarket');

for(let i = 0; i < link.length; i++){
	link[i].onclick = function(e){
		for(let b = 0; b < socialmarket.length; b++){
			if(e.target.dataset.name == socialmarket[b].dataset.name){
				socialmarket[b].style.display = 'block'
			} else {
				socialmarket[b].style.display = 'none'
			}
		}
	}
}