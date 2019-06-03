var begin_entered=false;
var focus_change=2;
var back_tab=false;
var swiperControl = false;
var flagForThird=false;
var zoomed_image=false;
$(document).ready(function(){

	$("#pageImage").mouseenter(function(){
		$("#pageImage").attr("title","Thermal Power Plant");
	});
	$("#pageImage").mouseleave(function() {
  		$("#pageImage").removeAttr('title');
	});

		/*Begin page */
	
	$('#begin_btn').off('click').on('click',function(){
		
		begin_entered=true;
		$('#begin_page').hide();
		$('a').attr('href', '#reset_btn_again');
		
		setTimeout(function(){
			$('#activityPage').fadeIn();	
			$('#direction_text').html(direction_text);
			$('#direction_text').attr('aria-label','Directions: Click on each step number to zoom in on part of the graphic. Use the blue return arrow to go back to the overview.');
			$('#head_ing').html(slider[0].slide_Title);
			$('#head_ing').attr('aria-label',slider[0].slide_Title);
			set_tab();
			resizeApp();
		},10);
		
		if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
				$('#whole_container').removeAttr('role');
			}else{
				$('#whole_container').attr('role','application');
			}
		
	});	
	
	/*Begin page Looping*/
	
	$('.beginPageImage,#begin_btn').addClass('tab_index').attr('tabindex','0');
	$('#focus_guard_1').on('focus', function() {
		$('.tab_index').eq(1).focus();
	});
	$('#focus_guard_2').on('focus', function() {
		$('.tab_index').eq(0).focus();
	});
	
	/*Activity page*/
		
	
/*1*/
	$('#focus_reader').on('focus', function(Event) {
		console.log('focus_reader');
		back_tab=true;
		$('#direction_text').focus();
		
		if ($("#direction_text").css('visibility')=='hidden' && back_tab==true) {
				setTimeout(function(){
					console.log('12345')
					$('#head_ing').focus();
						back_tab=false;
				},10)
		}
		/*if(flagForSecond){
			$('#head_ing').focus();
			flagForSecond=true;
		} */
		$('#whole_container').removeAttr('role');
	});
/*2*/
	
	$('#focus_guard_open').on('focus', function() {
		
		console.log('focus_guard_open');
		 setTimeout(function(){
			$('.tab_index').eq(2).focus();
		},10)
	})

	$('#focus_guard_end').on('focus', function() {
		console.log("focus_guard_end");	
		
		 $('.tab_index').eq(1).focus();
		setTimeout(function(){
			$('.tab_index').eq(focus_change).focus();
			$('#direction_text').focus();

		}, 10);
	});
	
   	$('#direction_text').on('focus', function(Event) {
		console.log('direction_text');
 		setTimeout(function(){
			$('#head_ing').addClass('tab_index').attr('tabindex','0');
		},10)
			if ($("#direction_text").is(":focus") && back_tab==true) {
				setTimeout(function(){
					console.log('12345')
					$('#direction_text').focus();
						$('#focus_guard_open').show();
						back_tab=false;
				},10)
			}
			
	});
 	$('#head_ing').on('focus', function(Event) {
		
		console.log('head_ing');
		
 		$('#direction_text').removeAttr('role');
		
		// Check this place onwards
		
		/* if(flagForSecond){
			$('#clickspot6').focus();
			flagForSecond=false;
		} */
		
   })
	



/* if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
    // This is internet explorer 9 or 11
    	setTimeout(function(){
			$('#focus_reader').html('').removeAttr('aria-label');
			$('#direction_text').removeAttr('role').attr('aria-label','Directions: Click on each step number to zoom in on part of the graphic. Use the blue return arrow to go back to the overview.');

		},10)		

}
 	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		 $('#direction_text').attr('role','text').attr('aria-label','Directions: Click on each step number to zoom in on part of the graphic. Use the blue return arrow to go back to the overview.'); 
	} */
	

	

	
	/*----------------------------------------tab_functionality-----------------------------------*/

	setTimeout(function(){
		set_tab();
	},100)
	resizeApp();
	

	
	document.body.onkeyup = function(e){
		console.log(document.activeElement.id)
		if(e.keyCode == 32 || e.keyCode == 13){
			e.preventDefault();
			$('#'+document.activeElement.id).trigger('click');
		}
	} 
	init();
	
	$('#reset_btn_again').off('click').on('click',function(){
		
		goBeginPage();
		
	});
	
	
})

/*Activity start here*/
function init(){
	
	$('.clickspot').bind('click keyup',showTextFn);
	$('.reset-btn').bind('click keyup',homeRevert);
	
	$('.next-btn').bind('click keyup',navSlide);
    $('.prev-btn').bind('click keyup',navSlide);
	$('.num-btn').bind('click keyup',zoomFunc);
	
}
// Refresh page 
function goBeginPage(){
	location.reload();
}


function navSlide(e)
{
       if(e.type=="keyup" && e.keyCode !=13){
                return  true;
        }
      var whichDirection= $(e.target).attr('id');
      
      var idNavigation;
      $('.num-btn').each(function(){
            if($(this).hasClass('num-btn-selected'))
            {
              idNavigation = Number($(this).attr('id').split('spot')[1]);
            }
          })

     if (whichDirection == 'prev') {
         --idNavigation;
       }else
       {
        ++idNavigation;
       }
		

    var idSpot = 'spot'+idNavigation;
    console.log(idSpot); 

	zoomFunc(e,idSpot);
     set_tabindex();
}


var idVal;
function showTextFn(ev){

	var keycode = ev.keyCode ? ev.keyCode : ev.which;
	if (ev.type == "keyup" && keycode != 13 && keycode != 32) {
		return false;	
	}else{
	
	idVal=Number(ev.target.id.split('clickspot')[1]);

	$('#spot'+idVal).addClass('num-btn-selected');
    $('#spot'+idVal).css('pointer-events','none');
	$('.prev-btn').css({'pointer-events':'auto','opacity':'1'});
    $('.next-btn').css({'pointer-events':'auto','opacity':'1'});

	
	  switch(idVal)
      {
		  
        case 1: 
        {
			
			animation(61, 70, '145%', '145%', 'imageDiv');
			$('#direction_text').css('visibility','hidden');
            $('.prev-btn').css({'pointer-events':'none','opacity':'0.2'})
            break;
        }
        case 2: 
        {
            animation(61, -318, '150%', '150%', 'imageDiv');
			$('#direction_text').css('visibility','hidden');
            break;
        }
        case 3: 
        {
            animation(-42, -204, '150%', '150%', 'imageDiv');
			$('#direction_text').css('visibility','hidden');
            break;
        }
        case 4: 
        {
            animation(-157, -381, '150%', '150%', 'imageDiv');
			$('#direction_text').css('visibility','hidden');
            break;
        }
        case 5: 
        {
            animation(-164, -236, '150%', '150%', 'imageDiv');
			$('#direction_text').css('visibility','hidden');;
            $('.next-btn').css({'pointer-events':'none','opacity':'0.2'})
            break;
        }
		default:
			$('#imageDiv').css({'height':'490px','width':'666px','top':'23px','left':'0px'});
		

	  
		} 
	}
	  $('#clickspot_selected').html(idVal);
	  $('#head_ing').html(slider[idVal].slide_Title);
	  $('#head_ing').attr('aria-label', slider[idVal].slide_Title);
	
		//I had changed the focus headIng
		flagForSecond=true;	
		$("#head_ing").focus();
		
}

//Navigation Btn function
var idValZ;
var flagForSecond=false;

function zoomFunc(ev,args){
	/* var keycode = ev.keyCode ? ev.keyCode : ev.which;
	if (ev.type == "keyup" && keycode != 13 && keycode != 32) {
		return false;	
	}else{ */

	
	
		if (args == undefined) {
			idValZ=Number(ev.target.id.split('spot')[1]);
			var textSelected = $(ev.target).attr('id').split('spot')[0];
			// update left icon num
			sel_Td = $(ev.target).attr('id')
			suffix = sel_Td.match(/\d+/);
			
			
		}else{
			  var id = Number(args.split('spot')[1]);
			  var textSelected = args.split('spot')[0];
			  suffix = id;
				idValZ=id;
		}
		
		$('.clickspot_selected').html(suffix);
		$('.num-btn').each(function(){
			$(this).removeClass('num-btn-selected');
			$(this).css('pointer-events','auto')
		})
		
		console.log('thiu',idValZ);
		
		
		$('#spot'+idValZ).addClass('num-btn-selected')
		$('#spot'+idValZ).css('pointer-events','none')

		$('.prev-btn').css({'pointer-events':'auto','opacity':'1'})
		$('.next-btn').css({'pointer-events':'auto','opacity':'1'})
		
		$('#head_ing').html(slider[idValZ].slide_Title);
	  $('#head_ing').attr('aria-label', slider[idValZ].slide_Title);
		
		 switch(idValZ)
		  {
			  
			case 1: 
			{
				
				animation(61, 70, '145%', '145%', 'imageDiv');
				$('#direction_text').css('visibility','hidden');
				$('.prev-btn').css({'pointer-events':'none','opacity':'0.2'})
				break;
			}
			case 2: 
			{
				animation(61, -318, '150%', '150%', 'imageDiv');
				$('#direction_text').css('visibility','hidden');
				break;
			}
			case 3: 
			{
				animation(-42, -204, '150%', '150%', 'imageDiv');
				$('#direction_text').css('visibility','hidden');
				break;
			}
			case 4: 
			{
				animation(-157, -381, '150%', '150%', 'imageDiv');
				$('#direction_text').css('visibility','hidden');
				break;
			}
			case 5: 
			{
				animation(-164, -236, '150%', '150%', 'imageDiv');
				$('#direction_text').css('visibility','hidden');;
				$('.next-btn').css({'pointer-events':'none','opacity':'0.2'})
				break;
			}
			default:
				$('#imageDiv').css({'height':'490px','width':'666px','top':'23px','left':'0px'});
			}
			
	/* } */
}

// Animation function

function animation(argTop, argLeft, argWidth, argHeight, obj){
     $('.clickspot').hide();
	 flagForSecond=true;
      $('#'+obj).animate({
               top: argTop,
               left: argLeft,
               height: argHeight,
               width: argWidth
            }, 1000);
     
      $('.reset-btn').fadeIn();
	  $('.clickspot_selected').fadeIn(1500);
	
}

/*Revert btn function for using reverst the zooming screen*/

var homeRevert=function(ev){
	var keycode = ev.keyCode ? ev.keyCode : ev.which;
	if (ev.type == "keyup" && keycode != 13 && keycode != 32) {
		return false;	
	}else{	
	
		
		$('#direction_text').css('visibility','visible');
		$('#head_ing').html(slider[0].slide_Title);
		$('#head_ing').attr('aria-label',slider[0].slide_Title);
		animation(23, 0, 666, 490, 'imageDiv')
		$(this).fadeOut();
		$('.clickspot_selected').fadeOut();
		 
		$('.num-btn').each(function(){
			$(this).removeClass('num-btn-selected');
			$(this).css('pointer-events','auto');
		})
		 
		 
		 
		 
		setTimeout(function(){
		  $('.clickspot').fadeIn();
			if(!( navigator.userAgent.match(/Android/i))) {
			 $('#clickspot1').focus();
			}
		 
		  
		},1000)
	
		
	}
}



/*On rezize function*/

window.onresize = function() {
	resizeApp(); 
}

/*Tab Index*/

function set_tab(){
	if(!begin_entered){
		$('#text_container,#responsive_container').hide()
		$('.tab_index,#text_container,#responsive_container').removeClass('tab_index').removeAttr('tabindex');
		$('.beginPageImage,#begin_btn').addClass('tab_index').attr('tabindex','0');
		$('#focus_guard_2,#focus_guard_1').addClass('tab_index');
	}else{

			$('#text_container,#responsive_container').show()
			$('.tab_index,.text_container').removeClass('tab_index').removeAttr('tabindex');
			$('#focus_reader').addClass('tab_index');
			$('#direction_text').addClass('tab_index');
			$('.clickspot').addClass('tab_index');
			$('.reset-btn').addClass('tab_index');
			$('.prev-btn, #spot1,#spot2,#spot3,#spot4,#spot5, .next-btn').addClass('tab_index');
			$('#reset_btn_again').addClass('tab_index');
			
			
			$('#focus_guard_end,#focus_guard_open').addClass('tab_index');

		
		
		
	}
	$('.tab_index').each(function( index ) {		
		$('.tab_index').attr('tabindex','0');
		
	});
}

