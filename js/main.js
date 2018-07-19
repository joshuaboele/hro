//All global variables
var chapterOffsets = {};
var oldScroll;
var currentChapter;
var missieStarted = false;
var visieStarted = false;
var windowHeight;
var currentTime = 0;
var old;
var bezig = false;
var timerID;
var triggerLanding;
var oldTriggerLanding;
var oldTriggerChapter1;
var triggerChapter1;
var oldTriggerChapter2;
var triggerChapter2;
var oldTriggerDocent;
var triggerDocent;
var oldTriggerGraduated;
var triggerGraduated;
var currentScroll;
var triggerChapter1Intro = false;
var triggerChapter2Intro = false;
var triggerHexagram = false;
var initialVideoWidth = false;

//Function called after content has loaded 
$(window).bind("load", function() {
	//Set height for fullscreen divs
	$('.fullscreen').css('height', $(window).height());	
	resizeHeight();
	// console.log(Modernizr.svg);
	Soundbite.init();

	currentScroll = $(window).scrollTop();
    
    if(!Modernizr.svg){
    	svgFallback();

    }else{
    	animateLogo();
    }

	checkVideo("resize");
	console.log('loaded');
	updateFixedContainer(currentScroll);

	if(Modernizr.touch){
		showQuotes();
	}


});

function resizeHeight(){
	setOffsets();
	windowHeight = $(window).height();
	// contentsole.log(windowHeight);
	$('.fullscreen').css('height', windowHeight);
	setMarginHexagram();
	$('.overtrefjezelf img').css('margin-top', (windowHeight/2)-80);
	
}

function checkVideo(triggerFrom){
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	$('.fixed-container').css('height', windowHeight);
	var aspectRatio = windowHeight/windowWidth;
	var videoWidth = $('.fullscreen video').width(); 
	var videoHeight = $('.fullscreen video').height();
	var videoWidth2 =$('video').width();
	
	
	//Links en rechts wordt uitgeknipt
	if(aspectRatio > 0.5625){
		$('.fullscreen video').css('width','auto');
		$('.fullscreen video').css('height','100%');
		$('.fullscreen video').css('left','0');

		if(triggerFrom == "resize"){
			var actualVideoWidth = ($('video').height()/1080)*1920;
			console.log(actualVideoWidth);
			var outOfScope = windowWidth - Math.round(actualVideoWidth);
			var offset = outOfScope/2;
			// var outOfScopePercentage = "translateX(" + Math.round((outOfScope/videoWidth2)*100)/2 + "%)";
			$('.fullscreen video').css('left', offset);
		}
	}

	//Boven en onder wordt uitgeknipt
	else{
		$('.fullscreen video').css('width','100%');
		$('.fullscreen video').css('height','auto');
		$('.fullscreen video').css('left','0');
		if(triggerFrom == "resize"){
			var actualVideoHeight = ($('video').width()/1920)*1080;
			var outOfScope = windowHeight - Math.round(actualVideoHeight);
			var offset = outOfScope/2;
			// var outOfScopePercentage = "translateY(" + Math.round((outOfScope/videoHeight)*100)/2 + "%)";
			$('.fullscreen video').css('top', offset);
		}
	}
	
}

function updateFixedContainer(currentScroll){
		console.log($('video').length);
		//Landingspagina
		if(currentScroll > windowHeight){
			triggerLanding = true;
		}else{
			triggerLanding = false;
		}
		
		if(Modernizr.video){
		if(triggerLanding == true && triggerLanding != oldTriggerLanding){
			$('.land-page .video').get(0).pause();
		}else if(triggerLanding == false && triggerLanding != oldTriggerLanding){
			$('.land-page .video').get(0).play();
		}
		}

		//Missie
		if(currentScroll > chapterOffsets.chapter1 - windowHeight && currentScroll < chapterOffsets.chapter1 + windowHeight + 140){
			triggerChapter1 = true;
		}else{
			triggerChapter1 = false;
		}

		if(oldTriggerChapter1 != triggerChapter1){
			
			if(triggerChapter1){
				if(Modernizr.video){
				$('.chapter-2 .fixed-container .video').get(0).play();
				};
				$('.chapter-2 .fixed-container').css('top','0px')
			}else{
				if(Modernizr.video){
				// console.log("in here", $('video')[0].readyState);
				console.log($('.chapter-2 .fixed-container video').get().length);

				$('.chapter-2 .fixed-container .video').get(0).pause();
				};
				$('.chapter-2 .fixed-container').css('top','-99999px')
			}
		}

		//Visie Strategie
		if(currentScroll > chapterOffsets.chapter2 - windowHeight && currentScroll < chapterOffsets.chapter2 + windowHeight + 140){
			triggerChapter2 = true;
		}else{
			triggerChapter2 = false;
		}

		if(oldTriggerChapter2 != triggerChapter2){
			if(triggerChapter2){
				if(Modernizr.video){
				$('.chapter-3 .chapter-intro .fixed-container .video').get(0).play();
				};
				$('.chapter-3 .chapter-intro .fixed-container').css('top','0px')
			}else{
				if(Modernizr.video){
					console.log("3rd video", $('.chapter-3 .chapter-intro .fixed-container video').get(0))
				$('.chapter-3 .chapter-intro .fixed-container .video').get(0).pause();
				}
				$('.chapter-3 .chapter-intro .fixed-container').css('top','-99999px')
			}
		}

		//Docent foto
		if(currentScroll > chapterOffsets.fotoDocent - windowHeight && currentScroll < chapterOffsets.fotoDocent + $('.fotoDocent').height()){
			triggerDocent = true;
		}else{
			triggerDocent = false;
		}

		if(oldTriggerDocent != triggerDocent){
			if(triggerDocent){
				$('.fotoDocent .fixed-container').css('top','0px');
			}else{
				$('.fotoDocent .fixed-container').css('top','-99999px');
			}
		}

		//Graduated photo
		if(currentScroll > chapterOffsets.fotoGraduated - windowHeight && currentScroll < chapterOffsets.fotoGraduated + $('.professionalsMorgen').height()){
			
			triggerGraduated = true;
		}else{
			
			triggerGraduated = false;
		}

		if(oldTriggerGraduated != triggerGraduated){
			if(triggerGraduated){
				$('.professionalsMorgen .fixed-container').css('top','0px');
			}else{
				$('.professionalsMorgen .fixed-container').css('top','-99999px');
			}
		}

		oldTriggerGraduated = triggerGraduated;
		oldTriggerDocent = triggerDocent;
		oldTriggerChapter2 = triggerChapter2;
		oldTriggerChapter1 = triggerChapter1;
		oldTriggerLanding = triggerLanding;

}

function svgFallback(){
	$('.logo').html('<img src="img/logo.png" />');
	$('.logo').css('visibility','visible');
	$('.chapter-visiestrategie-title').html('<img src="img/visiestrategie.png" />');
	$('.chapter-missie-title').html('<img src="img/missie-logo.png" />');
}

function showQuotes(){
	$('.studentContainer p').css('opacity','1');
	$('.chapter-2 .studentTestimonials .studentTwo .studentContainer').css('background-image','url(img/student2_hover.jpg)');
	$('.chapter-2 .studentTestimonials .studentOne .studentContainer').css('background-image','url(img/student3_hover.jpg)');
}

function setOffsets(){
	chapterOffsets.chapter1 = $('.chapter-2').offset().top;
	chapterOffsets.chapter2 = $('.chapter-3').offset().top;
	chapterOffsets.hexagramOffset = $('.hexagram').offset().top;
	chapterOffsets.graphicInstromers = $('.graphic').offset().top;
	chapterOffsets.fotoDocent = $('.fotoDocent').offset().top;
	chapterOffsets.fotoGraduated = $('.professionalsMorgen').offset().top;
}

function setMarginHexagram(){
	var vizContentHeight = $('.viz-content').height();
	var legendHeightFirst = $('.viz-content p')[0].clientHeight;
	var legendHeightSecond = $('.viz-content p')[1].clientHeight;
	
	$('.viz-content p')[0].style.marginTop = (vizContentHeight/2)-(legendHeightFirst/2) + "px";
	$('.viz-content p')[1].style.marginTop = (vizContentHeight/2)-(legendHeightSecond/2) + "px";
}







$(window).on('scroll', function() {
	setOffsets();
	currentScroll = $(document).scrollTop();
	
	updateFixedContainer(currentScroll);

	if(currentScroll >= chapterOffsets.chapter1){
		if(!triggerChapter1Intro){
			if(Modernizr.svg){
			animateChapterMissie();
			triggerChapter1Intro = true;
			}
		}
	}

	if(currentScroll >= chapterOffsets.chapter2){
		if(!triggerChapter2Intro){
			if(Modernizr.svg){
			animateVisieStrategie();
			triggerChapter2Intro = true;
			}
		}
	}

	if(currentScroll >= chapterOffsets.hexagramOffset - windowHeight + (windowHeight/5)){
		if(!triggerHexagram){
			animateHexagram();
			triggerHexagram = true;
		}	
	}

	if(currentScroll >= chapterOffsets.graphicInstromers - (windowHeight/2) && oldScroll < chapterOffsets.graphicInstromers - (windowHeight/2)){
		$('.blokMbo').css('height','80%');
		$('.blokHavo').css('height','95%');
	}

	oldScroll = currentScroll;
});


$(window).resize(function() {
	resizeHeight();
	checkVideo("resize");
});













////////////////////////////////////////////////////////ALL SVG ANIMATIONS
function animateLogo(){
	var hrLogo;
	$('.logo').css('visibility','visible');
	hrLogo = $('svg.hr-logo path');
	for(i=0;i<hrLogo.length;i++){
		startAnimation(hrLogo[i]);
	}
	
	function startAnimation(pathID){
		var length = pathID.getTotalLength();
		pathID.style.transition = pathID.style.WebkitTransition ='none';
		pathID.style.fill = "rgba(204, 0, 51, 0)";
		pathID.style.stroke = "#fff";
		pathID.style.strokeWidth = 2;
		pathID.style.strokeDasharray = length + ' ' + length;
		pathID.style.strokeDashoffset = length;

		pathID.getBoundingClientRect();

		pathID.style.transition = pathID.style.WebkitTransition = 'stroke-dashoffset 4s ease-in-out, fill 1s ease, stroke 1s ease';

		pathID.style.strokeDashoffset = '0';

		if(Modernizr.csstransitions){
		$("svg.hr-logo path#Path-32").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
			$('svg.hr-logo path').css('fill','#fff');
			$('svg.hr-logo path#Path-32').css('fill','#cc0033');
			$('svg.hr-logo path').css('stroke','rgba(255,255,255,0)');
		});
		}else{
			$('svg.hr-logo path').css('fill','#fff');
			$('svg.hr-logo path#Path-32').css('fill','#cc0033');
			$('svg.hr-logo path').css('stroke','rgba(255,255,255,0)');
		}
	}
}

function animateVisieStrategie(){
	var visiestrategie = $('.chapter-3 svg path');

	if(!visieStarted){
		for(i=0;i<visiestrategie.length;i++){
			startAnimation(visiestrategie[i]);
		}
		visieStarted = true;
	}

	function startAnimation(pathID){
		var length = pathID.getTotalLength();
		pathID.style.transition = pathID.style.WebkitTransition ='none';
		pathID.style.strokeWidth = 2;
		pathID.style.strokeDasharray = length + ' ' + length;
		pathID.style.strokeDashoffset = length;

		pathID.getBoundingClientRect();

		pathID.style.transition = pathID.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out, fill 2s ease';

		pathID.style.strokeDashoffset = '0';
		if(Modernizr.csstransitions){
			$(".chapter-3 svg path#V").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
				$('.chapter-3 svg path').css('fill','#fff');
			});
		}else{
			$('.chapter-3 svg path').css('fill','#fff');
		}
	}
}

function animateChapterMissie(){
	var missie_m = $('path#M')[0];
	var missie_i = $('path#I')[0];
	var missie_s = $('path#S')[0];
	var missie_s2 = $('path#S')[1];
	var missie_i2 = $('path#I')[1];
	var missie_e = $('path#E')[0];

	if(!missieStarted){
		startAnimation(missie_m);
		startAnimation(missie_i);
		startAnimation(missie_s);
		startAnimation(missie_s2);
		startAnimation(missie_i2);
		startAnimation(missie_e);
		missieStarted = true;
	}	

	function startAnimation(pathID){
		var length = pathID.getTotalLength();
		pathID.style.transition = pathID.style.WebkitTransition ='none';
		pathID.style.strokeWidth = 2;
		pathID.style.strokeDasharray = length + ' ' + length;
		pathID.style.strokeDashoffset = length;

		pathID.getBoundingClientRect();

		pathID.style.transition = pathID.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out, fill 2s ease';

		pathID.style.strokeDashoffset = '0';
		if(Modernizr.csstransitions){
			$("path#M").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
				$('.chapter-missie-title path').css('fill','#fff');
			});
		}else{
			$('.chapter-missie-title path').css('fill','#fff');
		}
	}
}

function animateHexagram(){
	$(".hexagram").animate({'opacity': "1"}, 500, function() {
		$(".hexagram img:eq(2)").animate({'opacity': "1"}, 500, function() {
			$(".hexagram img:eq(1)").animate({'opacity': "1"}, 1000, function() {
				$(".hexagram img:eq(0)").animate({'opacity': "1"}, 1000, function() {});
			});
		});
	});
}
