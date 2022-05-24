//alert('cool bro')
//use cases: chart inspo, icon, graphics design, web animation, web game,...
function Svg() {}

Svg.prototype.is = null

function ske(data) {
	     let max = Math.max(...data)
		 let maxstring = String(max)
		
		 if(maxstring.length == 1){
			  
			let b = Math.floor(max/1) + 1
			let d = []
			for(let i=b; i>=1; i--){
				d.push(i * 1)
			}
			return {content: (1 * b), data: d}
		 } else if (maxstring.length == 2) {
			  
			let b = Math.floor(max/10) + 1
			let d = []
			for(let i=b; i>=1; i--){
				d.push(i * 10)
			}
			return {content: (10 * b), data: d}
		 } else if (maxstring.length == 3) {
			  
			let b = Math.floor(max/100) + 1;
			let d = []
			for(let i=b; i>=1; i--){
				d.push(i * 100)
			}
			return {content: (100 * b), data: d}
		 } else if (maxstring.length == 4) {
			let b = Math.floor(max/1000) + 1;
			let d = []
			for(let i=b; i>=1; i--){
				d.push(i * 1000)
			}
			return {content: (1000 * b), data: d}
		 } else if (maxstring.length == 5) {
			let b = Math.floor(max/10000) + 1;
			let d = []
			for(let i=b; i>=1; i--){
				d.push(i * 10000)
			}
			return {content: (10000 * b), data: d}
		 }
}
function bar(containerg, yscale, data, height){
			let g = [];
			for(let i=0; i<data.length; i++){
				g.push(document.createElementNS('http://www.w3.org/2000/svg', 'g') )
			}
			for(let i=0; i<g.length; i++){
				g[i].setAttribute('transform', 'translate(' + 80 * i + ',0)')
				containerg.append(g[i])
			}
			let r = []
			for(let i=0; i<data.length; i++){
				r.push(document.createElementNS('http://www.w3.org/2000/svg', 'rect') )
			}
			for(let i=0; i<g.length; i++){
				r[i].setAttribute('width', 60)
				r[i].setAttribute('class', data[i])
			
				r[i].setAttribute('height',(height - 100) *  Number(r[i].getAttribute('class'))/yscale.content); //console.log((400) *  Number(r[i].getAttribute('class'))/yscale.content)
				r[i].setAttribute('y', (height - 100) - ((height - 100) * (r[i].getAttribute('class')/yscale.content) ) )
				r[i].setAttribute('fill', 'red')
				r[i].style.transition = 'all ease 0.5s'
				g[i].append(r[i])
			}
			return r;
}
function line(containerg, yscale, data, height){
	try {
			let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			containerg.append(g)
			let circle = []
			let text = []
			for(let i=0; i<data.length; i++){
				circle.push( document.createElementNS('http://www.w3.org/2000/svg', 'circle') )
				text.push( document.createElementNS('http://www.w3.org/2000/svg', 'text') )
			}
			
			let p = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
			g.append(p)
			let points = ''; //use data to create point coordinate 20,388 100,342  180,285 260,57 320,343
			for(let i=0; i<data.length; i++){
				let form = Math.floor( (height - 100) - ((height - 100) * (data[i]/yscale.content) ) )
				points += `${20 + (i * 80)}, ${form} `
				//circle
				circle[i].setAttribute('cx', `${20 + (i * 80)}`)
				circle[i].setAttribute('cy', `${form}`)
				circle[i].setAttribute('r', `10`)
				circle[i].setAttribute('fill', `green`)
				text[i].textContent = data[i]
				text[i].setAttribute('x', `${20 + (i * 80) - 10}`)
				text[i].setAttribute('y', `${form - 10} `)
				text[i].setAttribute('stroke', `blue `)
				g.append(circle[i])
				g.append(text[i])
			}
			
			p.setAttribute('stroke', 'black')
			p.setAttribute('stroke-width', 5)
			p.setAttribute('fill', 'none')
			p.style.transition = 'all ease 0.5s'
			p.setAttribute('points', points)
			
			
			
			return p;
	} catch(e) {
		console.log(e)
	}
}

function scaley(containerg, height){
			//y scale
			let scaleg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
			let scalegg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
			scaleg.setAttribute('transform', 'translate(-10,0)')
			containerg.append(scaleg)
			let scale = document.createElementNS('http://www.w3.org/2000/svg', 'line')
			scale.setAttribute('x1', 0)
			scale.setAttribute('y1', 0)
			scale.setAttribute('x2', 0)
			scale.setAttribute('y2', height-100)
			scale.setAttribute('stroke', 'black')
			scale.setAttribute('stroke-width', 4)
			scaleg.append(scale)
			//console.log(scale)
}
function texty(containerg, yscale, height){
	//console.log(yscale)
			
			let text = []
			//create an algorithm that describes range:> if max.length == 2; use 10 as scale else if,...
			for(let i=0; i<yscale.data.length; i++){
				text.push(document.createElementNS('http://www.w3.org/2000/svg', 'text') )
			}
			let gtext = []
			for(let i=0; i<yscale.data.length; i++){
				gtext.push(document.createElementNS('http://www.w3.org/2000/svg', 'g')  )
			}
			for(let i=0; i<yscale.data.length; i++){
				gtext[i].append(text[i])
			}
		
			for(let i=0; i<yscale.data.length; i++){
				containerg.append(gtext[i])
				text[i].textContent = yscale.data[i]
				gtext[i].setAttribute('transform', `translate( ${-50},  ${(height - 100) - ( (height - 100) * (yscale.data[i]/yscale.content) )} )` ) //20, 100, 180  (400) - (400 * (yscale.data[i]/yscale.content) )
			}
}	

function labely(containerg, yscale, bar1, txt, height ){
			let text = []
			//create an algorithm that describes range:> if max.length == 2; use 10 as scale else if,...
			for(let i=0; i<txt.length; i++){
				text.push(document.createElementNS('http://www.w3.org/2000/svg', 'text') )
			}
			let gtext = []
			for(let i=0; i<txt.length; i++){
				gtext.push(document.createElementNS('http://www.w3.org/2000/svg', 'g')  )
			}
			for(let i=0; i<txt.length; i++){
				gtext[i].append(text[i])
			}
		
			for(let i=0; i<txt.length; i++){
				containerg.append(gtext[i])
				text[i].textContent = bar1[i].getAttribute('class')
				gtext[i].setAttribute('transform', `translate(${20 + (i*80)}, ${(height - 100) - ((height - 100) * (bar1[i].getAttribute('class')/yscale.content) )}  ) ` ) //20, 100, 180
			}
}
	
function textx(containerg, txt, height ){
			let text = []
			//create an algorithm that describes range:> if max.length == 2; use 10 as scale else if,...
			for(let i=0; i<txt.length; i++){
				text.push(document.createElementNS('http://www.w3.org/2000/svg', 'text') )
			}
			let gtext = []
			for(let i=0; i<txt.length; i++){
				gtext.push(document.createElementNS('http://www.w3.org/2000/svg', 'g')  )
			}
			for(let i=0; i<txt.length; i++){
				gtext[i].append(text[i])
			}
		
			for(let i=0; i<txt.length; i++){
				containerg.append(gtext[i])
				text[i].textContent = txt[i]
				gtext[i].setAttribute('transform', `translate(${20 + (i*80)}, ${(height - 100) + 30}) rotate(-70)` ) //20, 100, 180
			}
}

function linex(containerg, txt, yscale, height){
			let line = [];
			for(let i=0; i<yscale.data.length; i++){
				line.push(document.createElementNS('http://www.w3.org/2000/svg', 'line') )
			}
			let gline = []
			for(let i=0; i<yscale.data.length; i++){
				gline.push(document.createElementNS('http://www.w3.org/2000/svg', 'g')  )
			}
			let l = txt.length 
			for(let i=0; i<yscale.data.length; i++){
				line[i].setAttribute('stroke', 'silver')
				line[i].setAttribute('x1', '0')
				line[i].setAttribute('y1', `${(height - 100) - ( (height - 100) * (yscale.data[i]/yscale.content) )}`) 
				line[i].setAttribute('x2', `${l * 80}`)
				line[i].setAttribute('y2', `${(height - 100) - ( (height - 100) * (yscale.data[i]/yscale.content) )}`)
				
				gline[i].append(line[i])
				
				containerg.append(gline[i])
				
			}
}




Svg.prototype.vbarchart = function(data, container, ht){
	try {
		let txt = Object.keys(data);
		let d = Object.values(data);
		//ske(d) 
		
		
		let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		let c = container
		
		c.innerHTML = ''
		c.append(svg)
	    
		let width = 100 * d.length + 100;
		let height = ht
		svg.setAttribute('width', width)
		svg.setAttribute('height', height)
	
		let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		svg.append(rect)
		rect.setAttribute('x', 0)
		rect.setAttribute('y', 0)
		rect.setAttribute('width', width)
		rect.setAttribute('height', height)
		rect.setAttribute('stroke', 'red')
		rect.setAttribute('fill', 'khaki')
		
		//for padding
		let containerg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		containerg.setAttribute('transform', 'translate(100,50)')
		svg.append(containerg)
		
		//bar area
		let bar1 = bar(containerg, ske(d), d, height)
		
		//y scale line
		scaley(containerg, height)
		
		//y scale label
		texty(containerg, ske(d), height)
		
		//x scale label
		textx(containerg, txt, height)
		
		
		//y scale legend
		labely(containerg, ske(d), bar1, txt, height)
		
		//y scale line
		linex(containerg, txt, ske(d), height)
				
	  //hover 
	  for(let i=0; i<bar1.length; i++){
		  let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
		  bar1[i].onmouseover = function(e){
			  e.target.setAttribute('fill', 'rgba(205,0,0,0.5)')
			  //display the legend
			  text.textContent = `${txt[i]}: ${bar1[i].getAttribute('class')}`
			  svg.append(text)
			  text.setAttribute('x', 20)
			  text.setAttribute('y', 20)
			  text.setAttribute('display', 'block')
		  }
		  bar1[i].onmouseout = function(e){
			  e.target.setAttribute('fill', 'red')
			  text.setAttribute('display', 'none')
		  }
	  }
	  
		return svg
	} catch (e) {
		console.log(e)
	}
}

Svg.prototype.linechart = function(data, container, ht){
	try {
		let txt = Object.keys(data);
		let d = Object.values(data);
		//ske(d) 
		
		let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		let c = container
		
		c.innerHTML = ''
		c.append(svg)
		
	    let height = ht;
		let width = 100 * d.length + 100;
		svg.setAttribute('width', width)
		svg.setAttribute('height', height)
	
		let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		svg.append(rect)
		rect.setAttribute('x', 0)
		rect.setAttribute('y', 0)
		rect.setAttribute('width', width)
		rect.setAttribute('height', height)
		rect.setAttribute('stroke', 'red')
		rect.setAttribute('fill', 'khaki')
		
		//for padding
		let containerg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		containerg.setAttribute('transform', 'translate(100,50)')
		svg.append(containerg)
		
		//bar area
		let line1 = line(containerg, ske(d), d, height)
		
		//y scale line
		scaley(containerg, height)
		
		//y scale label
		texty(containerg, ske(d), height)
		
		//x scale label
		textx(containerg, txt, height)
		
		
		//y scale line
		linex(containerg, txt, ske(d), height)
		
		return svg
	} catch (e) {
		console.log(e)
	}
}


Svg.prototype.v3barchart = function(data, container, ht){
		
		try {
			let txt = Object.keys(data);
			let d = Object.values(data);
			
			function appendsvg(data, container, ht){
				let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				let c = container
				c.append(svg)
				
				let txt = Object.keys(data.data);
				let d = Object.values(data.data);
				
				let width = 100 * d.length + 100; 
				let height = ht
				svg.setAttribute('width', width)
				svg.setAttribute('height', height)
				svg.style.display = 'inline-block'
				
				let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				svg.append(rect)
				rect.setAttribute('x', 0)
				rect.setAttribute('y', 0)
				rect.setAttribute('width', width)
				rect.setAttribute('height', height)
				rect.setAttribute('stroke', 'red')
				rect.setAttribute('fill', 'khaki')
				
				let containerg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
				containerg.setAttribute('transform', 'translate(100,50)')
				svg.append(containerg)
		
				//bar area
				let bar1 = bar(containerg, ske(d), d, height)
		
				//y scale line
				scaley(containerg, height)
		
				//y scale label
				texty(containerg, ske(d), height)
		
				//x scale label
				textx(containerg, txt, height)
		
		
				//y scale legend
				labely(containerg, ske(d), bar1, txt, height)
				
				//y scale line
				linex(containerg, txt, ske(d), height)
		
				//hover 
				for(let i=0; i<bar1.length; i++){
					let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
					bar1[i].onmouseover = function(e){
						e.target.setAttribute('fill', 'rgba(205,0,0,0.5)')
						//display the legend
						text.textContent = `${txt[i]}: ${bar1[i].getAttribute('class')}`
						svg.append(text)
						text.setAttribute('x', 20)
						text.setAttribute('y', 20)
						text.setAttribute('display', 'block')
					}
					bar1[i].onmouseout = function(e){
						e.target.setAttribute('fill', 'red')
						text.setAttribute('display', 'none')
					}
				}
				return svg
			}
			//use loop to append the svgs
			for(let i=0; i<d.length; i++){
				appendsvg({data: d[i]}, container, ht)
			}
			
		} catch (e) {
			console.log(e)
		}
		
		
}