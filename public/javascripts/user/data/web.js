//help
let questionicon = document.querySelectorAll('.fa-question')
let closequestion = document.querySelector('.closequestion')
let questionmanual = document.querySelector('.questionmanual')


for(let i = 0; i < questionicon.length; i++){
	questionicon[i].onclick = function(){
		closequestion.style.display = 'block'
		questionmanual.style.display = 'block'
	}
}

closequestion.onclick = function(){
	closequestion.style.display = 'none'
	questionmanual.style.display = 'none'
}

//hiding and displaying analytics features
let datafeatures = document.querySelectorAll('.datafeatures');
let datafeaturescontent = document.querySelectorAll('.datafeaturescontent');
for(let i = 0; i < datafeatures.length; i++){
	datafeatures[i].onclick = function(e){
		for(let b = 0; b < datafeaturescontent.length; b++){
			if(e.currentTarget.dataset.name == datafeaturescontent[b].dataset.name){
				if(datafeaturescontent[b].style.display == 'none'){
					datafeaturescontent[b].style.display = 'block'
				} else {
					datafeaturescontent[b].style.display = 'none'
				}
				
			} else {
				datafeaturescontent[b].style.display = 'none'
			}
		}
	}
}