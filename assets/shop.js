var app = {
	init: function() {
		if(app.product){
			app.product.init();
		}
		if(document.getElementById("map-canvas")){
			app.contact.init();
		}
		app.mainNavigation.init();
	},
	mainNavigation: {
		init: function(){
			console.log("nav init")
			$("#toggleicon").click(app.mainNavigation.toggleopen);
			$("#brandslink").click(app.mainNavigation.toggleBrandslink);
			$("#categorylink").click(app.mainNavigation.toggleCategorylink);			
		},
		toggleopen: function(event){
			$(this.parentNode).toggleClass("open");
		},
		toggleBrandslink:function(event){			
			var el = $("#navbrandlist").clone()[0];
			el.id="navbrandlist";
			document.body.appendChild(el);
			$(el).click(app.mainNavigation.close);
		},
		toggleCategorylink:function(event){
			var el = $("#navcollectionlist").clone()[0];
			el.id="navcollectionlist";
			document.body.appendChild(el);
			$(el).click(app.mainNavigation.close);
		},
		close: function(event){
			this.parentNode.removeChild(this);
		}
		
	},
	contact:{
		init:function(){
			google.maps.event.addDomListener(window, 'load', app.contact.mapCallback);
		},
		mapCallback:function(){
			var latlong= new google.maps.LatLng(43.645172,-79.419405)
			var mapOptions = {
				center: latlong,
				zoom: 16,
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
				draggable: false,
				streetViewControl: false,
				streetViewControl: false,
				panControl:false,
				rotateControl:false,
				zoomControl:false,
				styles:[
					{
						"stylers": [
							{ "saturation": -100 }
						]
					}
				]
			};
			var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

			var image = {
				// url:staticLink+'assets/icons/icon-loc-'+id+'.png',
				size: new google.maps.Size(26, 47.5),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(26,47.5),
				scaledSize: new google.maps.Size(26,47.5)
			}

			var icon = new google.maps.MarkerImage(
				"//cdn.shopify.com/s/files/1/0113/7222/t/16/assets/mapicon.png?12949493130272394472", //url
				new google.maps.Size(50 , 86), //size
				new google.maps.Point(0,0), //origin
				new google.maps.Point(25,86) //anchor 
	 		);


			var marker = new google.maps.Marker({
				position: latlong,
				map: map,
				icon: icon
			});
		}
	},
	detectMobile: function() {
		// check the useragent this is a bit problematic... but hey...
		var testone = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
		// remove devices with huge screens such as smart tvs or others...
		var testtwo = window.matchMedia("only screen and (max-width: 760px)");
		// check if it's a touch screen
		var testthree = false
		try {
			document.createEvent("TouchEvent");
			testthree = true;
		} catch (e) {
			testthree = false;
		}
		return (testone && testtwo && testthree);
	},
	blogFullHeight:function(){
		if($("#template-index")){
			$(".articlecontent-inline").each(app.blogResizeImages);
		}
	},
	blogResizeImages:function(i,el){
		var img = $(el).find("img")[0],
		a = $(el).find("a")[0];
		a.style.backgroundImage = "url("+img.src+")";
	}
}
