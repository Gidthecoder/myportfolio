
let cusslink = document.querySelectorAll('.cusslink')
let cusscontent = document.querySelectorAll('.cusscontent')
for(let i=0; i<cusslink.length; i++){
	cusslink[i].onclick = function(e){
		for(let i=0; i<cusscontent.length; i++){
			if(e.target.dataset.name == cusscontent[i].dataset.name){
				cusscontent[i].style.display = 'block'
			} else {
				cusscontent[i].style.display = 'none'
			}
		}
	}
}