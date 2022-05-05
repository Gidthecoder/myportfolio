
function payWithPaystack(){
	var handler = PaystackPop.setup({
		key: 'pk_test_65070e23ed921b36982f4e628b392bf23b28a7df',
		email: document.getElementById('email-address').value,
		amount: document.getElementById('amount').value *100,
		currency: 'NGN',
		ref:''+Math.floor((Math.random()* 1000000000) + 1),
		onClose: function(){
			alert('window closed')
		},
		callback: function(response){
			alert('payment complete')
			console.log(response)
			//fetch request with payment reference
		}
	})
	handler.openIframe();
}
/*
logo editor
animator software
--social media marketing
business-focused social media
order management
warehouse manhagement
--ERP and accounting
--commrnts and ratings
--CRM
3D video and Image
inventory:restaurant,manufacturing,other products
GEOPIP
package manager
digital asset and tools
gaming
metaverse
accounting ang auditing
--animation:d3,anime,data run
--theme styling, animation plugin
--personalized store
cloth wearing AI
survey analysis: 
multi-payment support
AI text editor
--image editor: compress,enhance,filter and resize
AI as a services
industrial software as-a-service
sheet: calculator, custom, importing and exporting data, email, pdf
realtime: pitch, discount, support
Shopisidy FC (fufillment center)
shipping report: most preferred shipping, repeat customers per shipping
--apps(third party servers) and plugins(applied to themes)
--theme customization(backgrounds,colors,paddings,animations)
--media library
store customization
*/