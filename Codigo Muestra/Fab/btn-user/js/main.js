var deviceWidth = $( window ).width()
var addedWidgets = []
var savedWidgets = []

$(document).ready(function(){
	fn_labels();
	var resetCounter = false
	$('#modal-install').on('show.bs.modal', function (e) {
	  	$("#step2, #step3, #step4, #footer-step2, #footer-step3, #footer-step4").hide();
	  	$("#step1, #footer-step1").show();
	})
});

//Carga de widgets en modal de edición de dashboard
$(".modal-personaliza-dash").on('show.bs.modal',function(e){
	$("#widget-wrapper").empty()
	for (i=0; i<widgets.length; i++){
		var widgetCode = 	"<div class='widget col-md-3' data-category='"+widgets[i].category+"' data-original-index='"+i+"'>"+
						 	"<div class='box-banner'>"+
						 	"<h3 class='widget-title'>"+widgets[i].title+"</h3>"+
						 	"<div class='icon-add' onclick=\"add_box(this,'.box-transferencia-cuentas')\"></div>"+
						 	"<p class='text-center widget-description'>"+widgets[i].description+"</p>"+
						 	"</div>"+
					     	"</div>"
		$("#widget-wrapper").append(widgetCode)
	}
	$("#widget-category-dd").next("ul").children("li:first-of-type").children("a").trigger("click")
})

function filter_widgets(selection){
	var  selectedCategory = $(selection).attr("data-selected-category")
	console.log(selectedCategory)
	$(".widget").hide();
	$(".widget[data-category="+selectedCategory+"]").show()
	if (selectedCategory == "all"){
		$(".widget").show();
	}
}

function fn_labels(){
	$('input[type="text"], input[type="password"], input[type="email"], input[type="tel"]').focus(function(){
		$(this).parent().addClass('focus');
	});
	$('input[type="text"], input[type="password"], input[type="email"], input[type="tel"]').blur(function(){
		if( ($(this).val()=="")||$(this).val()=="0" ){
			$(this).parent().removeClass('focus');	
		}
	});
}

function show_challng(){
	$('.herramienta-box').hide();
	$('.first-login').fadeOut('fast',function(){
		$('.challng-box').fadeIn('fast');
			
	});
	$('.form-login .num-cliente').attr('disabled','disabled').parent().addClass('disabled');
	$('.form-login .clave-accesso').attr('disabled','disabled').parent().addClass('disabled');
	$('.form-login .num-cliente-unlock').attr('disabled','disabled').parent().addClass('disabled');
	$('.form-login .usuario-unlock').attr('disabled','disabled').parent().addClass('disabled');
}

function show_challng_firstLogin(){
	$('.herramienta-box').hide();
	$('.first-login').fadeOut('fast',function(){
		$('.challng-box').fadeIn('fast');
			
	});
	if( $(window).width() > 991 ){
		$('.form-login').animate({
			'height':'349px'
		},300);	
	}else{
		$('.form-login').animate({
			'height':'409px'
		},300);	
	}
	$('.form-login .num-cliente').attr('disabled','disabled').parent().addClass('disabled');
	$('.form-login .clave-accesso').attr('disabled','disabled').parent().addClass('disabled');
	$('.form-login .num-cliente-unlock').attr('disabled','disabled').parent().addClass('disabled');
	$('.form-login .usuario-unlock').attr('disabled','disabled').parent().addClass('disabled');
}
function cancel_login(){
	$('.form-login .num-cliente').val('').removeAttr('disabled').parent().removeClass('focus').removeClass('disabled');
	$('.form-login .clave-accesso').val('').removeAttr('disabled').parent().removeClass('focus').removeClass('disabled');
	$('.form-login .clave-dinamica').val('').parent().removeClass('focus');

	$('.challng-box').fadeOut('fast',function(){
		$('.first-login').fadeIn('fast');
	});
	setTimeout(function(){
		$('.herramienta-box').fadeIn('fast');
	},300)
	

	setTimeout(function(){
		validate_login();
		validate_claveDinamica();
	},100);
}

function show_unlock(){
	$('.normal-login').fadeOut('fast',function(){
		$('.unlock-login').fadeIn('fast');
	});	
}
function cancel_unlock(){
	$('.form-login .num-cliente').val('').removeAttr('disabled').parent().removeClass('focus').removeClass('disabled');
	$('.form-login .clave-accesso').val('').removeAttr('disabled').parent().removeClass('focus').removeClass('disabled');
	$('.form-login .clave-dinamica').val('').parent().removeClass('focus');

	$('.form-login .num-cliente-unlock').val('').removeAttr('disabled').parent().removeClass('focus').removeClass('disabled');
	$('.form-login .usuario-unlock').val('').removeAttr('disabled').parent().removeClass('focus').removeClass('disabled');
	$('.form-login .clave-dinamica-unlock').val('').parent().removeClass('focus');

	$('.challng-box').fadeOut('fast',function(){
		$('.first-login').fadeIn('fast');
	});
	setTimeout(function(){
		$('.herramienta-box').fadeIn('fast');
	},300)
	

	$('.unlock-login, .success-unlock').fadeOut('fast',function(){
		$('.normal-login').fadeIn('fast');
	});	

	setTimeout(function(){
		validate_login();
		validate_claveDinamica();
		validate_login_unlock();
		validate_claveDinamica_unlock();
	},100);
}

function validate_login(){
	num_cliente = $('.form-login .num-cliente').val().length;
	clave_accesso = $('.form-login .clave-accesso').val().length;

	if( (num_cliente>2) && (clave_accesso>2) ){
		$('.form-login #btn-continue').removeAttr('disabled');
	}else{
		$('.form-login #btn-continue').attr('disabled','disabled');
	}
}
function validate_claveDinamica(){
	clave_dinamica = $('.form-login .clave-dinamica').val().length;

	if(clave_dinamica>2){
		$('.form-login #btn-enter').removeAttr('disabled');
	}else{
		$('.form-login #btn-enter').attr('disabled','disabled');
	}
}

function validate_login_unlock(){
	num_cliente = $('.form-login .num-cliente-unlock').val().length;
	clave_accesso = $('.form-login .usuario-unlock').val().length;

	if( (num_cliente>=1) && (clave_accesso>=1) ){
		$('.form-login #btn-continue-unlock').removeAttr('disabled');
	}else{
		$('.form-login #btn-continue-unlock').attr('disabled','disabled');
	}
}
function validate_claveDinamica_unlock(){
	clave_dinamica = $('.form-login .clave-dinamica-unlock').val().length;

	if(clave_dinamica>2){
		$('.form-login #btn-enter-unlock').removeAttr('disabled');
	}else{
		$('.form-login #btn-enter-unlock').attr('disabled','disabled');
	}
}
function show_success_unlock(){
	$('.unlock-login').fadeOut('fast',function(){
		$('.success-unlock').fadeIn('fast');
	});
}

function goTo(url,seccion){
	document.cookie = seccion;
	window.location.href = url;
}

function scroll_bottom(){
	$("html, body").animate({ scrollTop: $(document).height() }, "slow", function(){
		$(".footer").addClass("active")
		setTimeout(function(){
			$(".footer").removeClass("active")
		},2000)
	})
}

actual_banner = 1;
var int_banners;

function set_login_bg_banner( bg_banner ){
	$('.bg-image').fadeOut('slow');
	$('.video-login').fadeOut('slow');
	$('.text-banner').hide();

	$('.bg-'+bg_banner).fadeIn('slow');
	$('.video-'+bg_banner).fadeIn('slow');
	$('.text-banner-'+bg_banner).show();

	$('.banners .banner').removeClass('active');
	$('.banners .banner-'+bg_banner).addClass('active');

	$('.banners .banner .progress_show .line').css('width', '1%');
	
	setTimeout(function(){
		$('.banners .banner-'+bg_banner+' .progress_show .line').animate({
			'width': '100%'
		},5900);	
	},100);
}

function fn_banners(){
	set_login_bg_banner('01');
	int_banners = setInterval(function(){ 
		next_banner = actual_banner+1;
		if( next_banner == 6 ){
			next_banner = 1;
		}
		actual_banner = next_banner;
		set_login_bg_banner( '0'+next_banner );		
	}, 6000);
}

function btn_challng( btn ){
	console.log($(btn).offset())
	if( $(window).width() > 991 ){
		if( $(btn).hasClass('active') ){
			$(btn).removeClass('active');
			$('.tooltip-netkey').fadeOut('fast');
		}else{
			$(btn).addClass('active');
			$('.tooltip-netkey').css({
				'top' : $(btn).offset().top - 150,
				'left' : $(btn).offset().left + 60

			});
			$('.tooltip-netkey-01').fadeIn('fast');
		}
	}else{
		if( $(btn).hasClass('active') ){
			$(btn).removeClass('active');
			$('.tooltip-netkey').fadeOut('fast');
		}else{
			$(btn).addClass('active');
			$('.tooltip-netkey').css({
				'top' : 100,
				'left' : 0,
				'right' : 0

			});
			$('.tooltip-netkey-01').fadeIn('fast');
		}
	}
}

function change_tooltip( tltp ){
	$('.tooltip-netkey').fadeOut('fast',function(){
		$(tltp).fadeIn('fast');
	});
}

function show_rules( btn ){
	if( $(window).width() > 991 ){
		if( $(btn).hasClass('active') ){
			$(btn).removeClass('active');
			$('.tooltip-rules').fadeOut('fast');
		}else{
			$(btn).addClass('active');
			$('.tooltip-rules').css({
				'top' : $(btn).offset().top - 15,
				'left' : $(btn).offset().left + 60

			});
			$('.tooltip-rules').fadeIn('fast');
		}
	}else{
		if( $(btn).hasClass('active') ){
			$(btn).removeClass('active');
			$('.tooltip-rules').fadeOut('fast');
		}else{
			$(btn).addClass('active');
			$('.tooltip-rules').css({
				'top' : 100,
				'left' : 0,
				'right' : 0

			});
			$('.tooltip-rules').fadeIn('fast');
		}
	}
}

function show_menu_box_dash( btn, menu_show ){
	var boxSizeX = $(btn).closest("li").width();
	var boxIndex = $(btn).closest("li").index()+1;
	console.log(boxIndex)
	console.log(boxSizeX)
	if( $(btn).hasClass('active') ){
		$(btn).removeClass('active');
		$(menu_show).fadeOut('fast');
	}else{
		$('.box-banner .ico-help, .box-banner .ico-menu').removeClass('active');
		$('.box-banner .menu-box, .box-banner .help-box').hide();
        setTimeout(function() {
            $(btn).addClass('active');
            if(deviceWidth<992){
            	 $(menu_show).children(".arrow").removeClass("left")
            } else {
            	 if (menu_show == ".help-box-saldos") {
	                var position = boxIndex % 4
	                console.log(position)
	                if (position != 0) {
	                    $(menu_show).css({
	                        "right": -(boxSizeX + 20),
	                        "left": ""

	                    })
	                    $(menu_show).children(".arrow").removeClass("right").addClass("left")
	                } else if (position == 0) {
	                    $(menu_show).css({
	                        "left": -(boxSizeX + 20),
	                        "right": ""
	                    })
	                    $(menu_show).children(".arrow").removeClass("left").addClass("right")
	                }
	            }
            }
           
            $(menu_show).fadeIn('fast');
        }, 300);
	}
}

function show_menu_user( btn, menu_show ){
	if( $(btn).hasClass('active') ){
		$(btn).removeClass('active');
		$(menu_show).fadeOut('fast');
		$(btn).children('button').removeClass('active');
	}else{
		console.log($(btn).children('button').offset())
		setTimeout(function(){
			$(btn).addClass('active');
			$(btn).children('button').addClass('active');
			$(menu_show).css({
				'right': -104,
				'top': 50
			});
			$(menu_show).fadeIn('fast');
		},400)
	}
}

function edit_dashboard(){
	var boxAd = "<li class='col-md-3 box-add'>"+
				"<div class='box-banner add' data-toggle='modal' data-target='.modal-personaliza-dash'>"+
				"<div class='ico-banner icon-add'></div>"+
				"<p class='text-center add'>Añadir a inicio</p>"+
				"</div>"+
				"</li>"

	$('.personaliza-row').hide();
	$('.buttons-edit-dashboard').fadeIn('fast');
	$('.box-banner .remove-box').fadeIn('fast');
	$('.sortable-widget').append(boxAd).prepend(boxAd);
	$(".uneditable .black-overlay").show();
}

function add_box(added, box ){
	var addedIndex = $(added).closest(".widget").index();
	var addedWidget = widgets[addedIndex];
	var addedWidgetTitle = addedWidget.title;
	var addedWidgetIcon = addedWidget.iconClass;
	var addedWidgetCategory = addedWidget.category;
	var addedWidgetDescription = addedWidget.description;
	var addedOriginalIndex = $(added).closest(".widget").data("original-index");
	addedWidget.originalIndex = addedOriginalIndex;
	addedWidgets.push(addedWidget)
	widgets.splice(addedIndex,1);
	var newWidget = "<li class='col-md-3 temp' data-widget-index='"+addedOriginalIndex+"' data-widget-category='"+addedWidgetCategory+"'>"+
					"<div class='box-banner'>"+
					"<h3 class='widget-title'>"+
					"<span class='icon ico-help'></span>"+addedWidgetTitle+""+
					"</h3>"+
					"<div class='ico-banner "+addedWidgetIcon+"'></div>"+
					"<p class='text-center'>"+addedWidgetDescription+"</p>"+
					"<button class='btn btn-success pull-right'>Continuar</button>"+
					"<div class='remove-box' onclick='removeWidget(this)'>"+
					"<div class='icon-remove'></div>"+
					"<p>Quitar de inicio</p>"+
					"<p class='legend'>Si quitas este acceso directo lo puedes agregar de nuevo dando clic en agregar a inicio</p>"+
					"</div>"+
					"<div class='added-box'>"+
					"<div class='icon-check'></div>"+
					"<p>Agregado a inicio</p>"+
					"</div>"+
					"</div>"+
					"</li>"
	var totalWidgets = $(".sortable-widget>li").length
	$(newWidget).insertAfter($(".sortable-widget>li").eq(totalWidgets-2))
	$(".added-box").show();
	$(".modal-personaliza-dash").modal("hide");
}

function cancel_edit_dashboard(){
	var totalWidgets = $(".sortable-widget>li").length
	$('.personaliza-row').show();
	$('.buttons-edit-dashboard').fadeOut('fast');
	$('.box-banner .remove-box').fadeOut('fast');
	$('.box-banner .added-box').fadeOut('fast');
	$(".sortable-widget>li").eq(totalWidgets-1).remove();
	$(".sortable-widget>li").eq(0).remove();
	$('.banners .box-transferencia-cuentas').hide();
	$(".uneditable .black-overlay").hide();
	$(".sortable-widget li.temp").remove();
	$(".sortable-widget .to-remove").removeClass("hidden to-remove");
	restoreWidgetArray();
}
function done_edit_dashboard(){
	var totalWidgets = $(".sortable-widget>li").length
	$('.personaliza-row').show();
	$('.buttons-edit-dashboard').fadeOut('fast');
	$('.box-banner .remove-box').fadeOut('fast');
	$('.box-banner .added-box').fadeOut('fast');
	$(".sortable-widget>li").eq(totalWidgets-1).remove();
	$(".sortable-widget>li").eq(0).remove();
	$(".uneditable .black-overlay").hide();
	$(".sortable-widget li").removeClass("temp");
	updateSavedArray();
	deleteWidgets();
}

function restoreWidgetArray(){
	addedWidgets.sort(function(a, b) {
	    return a.originalIndex - b.originalIndex;
	});
	$(addedWidgets).each(function(){
		widgets.push(this);
	})
}

function updateSavedArray(){
	addedWidgets.sort(function(a, b) {
	    return a.originalIndex - b.originalIndex;
	});
	$(addedWidgets).each(function(){
		savedWidgets.push(this)
	})
    addedWidgets = []
}

function removeWidget(removedWidget){
	var removedWidget = $(removedWidget).closest("li")
	$(removedWidget).addClass("to-remove hidden")
}

function deleteWidgets(){
	$(".sortable-widget .to-remove").each(function(){
		console.log(this)
		var removedTitle = $(this).find(".widget-title").text();
		var removedCategory = $(this).data("widget-category");
		for(var i=0 ; i<savedWidgets.length; i++){
		    if(savedWidgets[i].title== removedTitle && savedWidgets[i].category == removedCategory){
		    	widgets.push(savedWidgets[i])
		    	console.log(widgets.length)
		        savedWidgets.splice(i,1);
		        console.log(savedWidgets)
		    }     
		}
		$(this).remove();
	})
}

function show_modal( overlay, modal ){
	$(overlay).fadeIn('fast',function(){
		$(modal).fadeIn('fast');
	})
}

function hide_modal( overlay, modal ){
	$(modal).fadeOut('fast',function(){
		$(overlay).fadeOut('fast');
	})
}

var resetCounter = false;

function modal_step1(){
	$('#step1').hide();
	$('#footer-step1').hide();
	$('#step2').show();
	$('#footer-step2').show();
}

function modal_step2(){
	$('#step2').hide();
	$('#footer-step2').hide();
	$('#step3').show();
	$('#footer-step3').show();
	resetCounter = false;
	setTimeout(function(){
		if(!resetCounter){
			modal_step3();
		}
		else {
			return false
		}
	},3000);
}

function modal_step3(){
	$('#step3').hide();
	$('#footer-step3').hide();
	$('#step4').show();
	$('#footer-step4').show();
}

function modal_return1(){
	$('#step2').hide();
	$('#footer-step2').hide();
	$('#step1').show();
	$('#footer-step1').show();
}

function modal_return2(){
	$('#step3').hide();
	$('#footer-step3').hide();
	resetCounter = true
	modal_step1();
}

function load_section(sectionUrl){
	$("#main-wrapper").load("views/"+sectionUrl)
}

function toggle_collapse_chevron(clicked){
	if(!$("#collapseOne").hasClass("collapsing")){
		console.log("animated")
		$(clicked).find("span").toggleClass("glyphicon-menu-down glyphicon-menu-up")
	} else {
		return false
	}
}

function set_selection(selection){
	var selectedText = $(selection).text();
	console.log(selectedText)
	$(selection).closest(".dropdown,.custom-dropdown").children("button").html(selectedText+"<span class='caret'></span>")
}


function search_detail(){
	setTimeout(function(){
		$('#search-modal').modal('hide');
		$(".ctrl-btn").removeClass("disabled")
		$('.hint').hide();
		$("#headingOne a").trigger("click");
		$(".panel-movements, .resumen").removeClass("hidden");
	},3000);
}

function tooltip_resumen( element ){
	$('.btm-menu').not(element).removeClass('active');
	$('.tooltip-resumen').fadeOut('fast');
	if( $(element).hasClass('active') ){
		if( $(element).next().hasClass('tooltip-resumen') ){
			$(element).next().fadeOut('fast');
		}
		$(element).removeClass('active');
	}else{
		$(element).addClass('active');
		if( $(element).next().hasClass('tooltip-resumen') ){
			$(element).next().fadeIn('fast');
		}
	}
}

function open_close_account( account, title ){
	if( $(title).hasClass('open-title') ){
		$(title).removeClass('open-title').addClass('close-title');
		$(account).find('.open-accounts').hide();
		$(account).find('.close-accounts').show();
	}else{
		$(title).removeClass('close-title').addClass('open-title');
		$(account).find('.open-accounts').show();
		$(account).find('.close-accounts').hide();
	}
}
function open_close_detail( link ){
	console.log( $(link).parent().parent().next() );
	if( $(link).parent().parent().next().hasClass('detail-row') ){

		if( $(link).parent().parent().next().css('display') == 'none' ){
			//$('.detail-row').hide();
			$(link).parent().parent().next().show();
			$(link).siblings(".detail").attr("src","img/arrow-title-up.png");
		}else{
			$(link).parent().parent().next().hide();
			$(link).siblings(".detail").attr("src","img/arrow-title-down.png");
		}
	}
}
function expadirTodo_account(){
	$(".close-title").trigger("click");
	$(".detail-row").show();
}

function contraerTodo_account(){
	$(".open-title").trigger("click");
	$(".detail-row").hide();
}