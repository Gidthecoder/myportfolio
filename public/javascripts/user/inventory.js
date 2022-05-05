
//hiding and displaying inventory functionalities
let inventorylinks = document.querySelectorAll('.inventorylinks');
let inventorycontent = document.querySelectorAll('.inventorycontent');
for(let i = 0; i < inventorylinks.length; i++){
	inventorylinks[i].onclick = function(e){
		for(let b = 0; b < inventorycontent.length; b++){
			if(e.currentTarget.dataset.name == inventorycontent[b].dataset.name){
				
					inventorycontent[b].style.display = 'block'
				
			} else {
				inventorycontent[b].style.display = 'none'
			}
		}
	}
}