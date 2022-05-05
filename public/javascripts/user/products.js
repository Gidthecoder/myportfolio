

/*addnproduct.onclick = function(e){
	let prcollections = document.querySelectorAll('div.productcollections')
	
	let obj = {
		collection: productcollection.value,
		type: producttype.value,
		sku: productsku.value,
		email:document.querySelector('.owmail').value,
		content:'product'
	}
	if(obj.collection == '' || obj.type == '' || obj.sku == ''){
		alert('you did not complete the form')
		return
	}
	
	
	//next send a fetch request and append it to the table element when it has been updated
	let formdata = new FormData()
	formdata.append('email', document.querySelector('.owmail').value)
	formdata.append('item', productimg.files[0])
	formdata.append('collection', obj.collection)
	formdata.append('type', obj.type)
	formdata.append('sku', obj.sku)
	
	
	fetch('/newproduct', {method: 'POST', body: formdata })
	  .then(res => res.json() )
	  .then(resp => {
		  let tabledraft = document.querySelector('table.ptabledraft');
		  //create element, append to the table, style and apply scripting
		  let row = document.createElement('tr');
		  let col1 = document.createElement('td');
		  let col2 = document.createElement('td');
		  let col3 = document.createElement('td');
		  let col4 = document.createElement('td');
		  let col5 = document.createElement('td');
		  let col6 = document.createElement('td');
		  let image = document.createElement('img');
		  let deletebutton = document.createElement('button');
		  let publishbutton = document.createElement('input');
		  
		  col4.append(image)
		  col5.append(deletebutton)
		  col6.append(publishbutton)
		  row.append(col1)
		  row.append(col2)
		  row.append(col3)
		  row.append(col4)
		  row.append(col5)
		  row.append(col6)
		  tabledraft.append(row)
		  
		  //attributes
		  row.dataset.name = resp.content.collection
		  row.dataset.url = resp.content.sku
		  image.src = resp.content.image
		  image.style.width = '100px'
		  image.style.height = '100px'
		  deletebutton.dataset.index = resp.index
		  deletebutton.style.width = '100%'
		  publishbutton.type = 'checkbox'
		  publishbutton.dataset.index = resp.index
		  publishbutton.dataset.name = resp.content.collection
		  publishbutton.dataset.url = resp.content.sku
		  
		  deletebutton.textContent = 'delete'
		  col1.textContent = resp.content.collection
		  col2.textContent = resp.content.type
		  col3.textContent = resp.content.sku
		  
		  //scripting
		  //deleting
		  deletebutton.onclick = function(e){
		
			//remove the content with fetch
			let newp = {
				index: e.target.dataset.index, 
				type: 'product', 
				action: 'delete', 
				email: document.querySelector('.owmail').value
			}
		
			fetch('/delpub/draft', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newp) })
				.then(res => res.json() )
				.then(resp => {
					alert(resp.update) 
					//hide the parent element
					let parent = e.target.parentElement
					parent.parentElement.style.display = 'none'
					parent.parentElement.dataset.deleted = 'true'
			  
				}).catch( (error) => {
					console.log(error) 
				})
		
		  }
		  //publishing
		  publishbutton.onchange = function(e){
			//hide the parent element
			if(e.target.checked == true){
				pubpseldraft.style.display = 'inline-block'
				pubpseldraft.textContent = 'publish selected'
			}
		
		  }
		  
		  //publishing selected row
		  pubpseldraft.onclick = function(e){
			let newp = {}
			newp.action = 'publish'
			newp.type = 'product'
			newp.email = document.querySelector('.owmail').value
	
			newp.content = []
			for(let i = 0; i < pubpdraft.length; i++){
				if(pubpdraft[i].checked == true){
				//push to array
					newp.content.push({
					index: pubpdraft[i].dataset.index,
					name: pubpdraft[i].dataset.name,
					url: pubpdraft[i].dataset.url
					})
				}
			}
			if(publishbutton.checked == true){
				newp.content.push({
					index: publishbutton.dataset.index,
					name: publishbutton.dataset.name,
					url: publishbutton.dataset.url
				})
			}
	
			fetch('/delpub/draft', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newp) })
				.then(res => res.json() )
				.then(resp => {
					alert(resp.update) 
					setTimeout(function(){location.reload()}, 1000)
				}).catch( (error) => {
					console.log(error) 
				})
		  }
		  pubpalldraft.onclick = function(){
			//hide all parent element
			let allpdraft = document.querySelectorAll('tr.allpdraft')
			let topub = {}
			topub.action = 'publish'
			topub.type = 'product'
			topub.email = document.querySelector('.owmail').value
			topub.content = []
			for(let i = 0; i < allpdraft.length; i++){
				if(allpdraft[i].dataset.deleted == 'true'){
					//do nothing
				} else {
					topub.content.push({
						name: allpdraft[i].dataset.name,
						url: allpdraft[i].dataset.url
					})
				}
			}
			if(row.dataset.deleted != 'true'){
				topub.content.push({
					name: row.dataset.name,
					url: row.dataset.url
				})
			} 
			//move the content to main page with fetch
			//reload page after 1 second when done
			console.log(topub)
			if(topub.content.length == 0){
				alert('no draft')
				return;
			}
			fetch('/delpub/draft', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(topub) })
				.then(res => res.json() )
				.then(resp => {
					alert(resp.update) 
					setTimeout(function(){location.reload()}, 2000)
				}).catch( (error) => {
					console.log(error) 
				})
			alert('wanna publish all draft')
		  }
	  })
	
}*/


