// window.$ = window.jQuery =  require('jquery');
// window.slick =              require('./vendor/bower/slick');


jQuery(document).ready(function($){  

  /* header раскрытие списка городов */
  $('.city__choise').click(function(e) { 
      e.preventDefault();    
      $(this).closest('.city').find('.city__dropdown').toggle();   
  });
  $('.city__dropdown').mouseleave(function(){
    $(this).fadeOut();
  }); 

  /* изменение названия, телефона и почты при выборе города */
  $('.city__item').on('click', function(){
    $('.city__name').html($(this).html()); 
    $('.header__email-wrapper').html('<a class="header__email" target="_blank" href="mailto:'+$(this).data("email")+'">'+$(this).data("email")+'</a>');
    $('.footer__email-wrapper').html('E-mail: <a class="footer__email" target="_blank" href="mailto:'+$(this).data("email")+'">'+$(this).data("email")+'</a>');
    if ($(this).data("address") !== undefined) {
      $('.footer__address').html('г.'+$(this).text()+', '+$(this).data("address"));
    } else {
      $('.footer__address').hide();
    }
    var tel0 = $(this).data("tel0");
    $('.header__tel-wrapper').html('<a class="header__tel" target="_blank" href="tel:+'+tel0+'">'+tel0+'</a>');
    var tel0Name = "Телефон";    
    if ($(this).data("tel1") !== undefined) {
      var tel1 = $(this).data("tel1");
      var tel1Name = "Тел/факс";      
      $('.footer__tel-wrapper--tel1').html('Телефон: <a class="footer__tel" target="_blank" href="tel:+'+tel1+'">'+tel1+'</a>');
    } else {
      $('.footer__tel-wrapper--tel1').hide();
    }
    $('.footer__tel-wrapper--tel0').html(tel0Name+': <a class="footer__tel" target="_blank" href="tel:+'+tel0+'">'+tel0+'</a>');

    $('.city__dropdown').hide(); 
    return false;
  });

  /* Hamburger */
  $('.hamburger').click(function(e){
    e.preventDefault();
    $(this).toggleClass('hamburger--close');
    $('.nav__wrapper').toggle();
  });               

  /* Открывание меню поиска по клику на иконку */
  if ($(window).width() <= 1024) {
    $('.search__icon').click(function(e){
      e.preventDefault();
      $('.search__inner').toggle();
    });
  }               

  /* галерея "с нами уже работают" */
  $('.reviews-section__gallery').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',      
    variableWidth: true
  });

  /* Review-section in the modal window */
  $('.reviews-section__link').click( function(e){ 
    e.preventDefault(); 
    $('body').css({"overflow":"hidden"});   
    $('.overlay').show();
    $(this).closest('.reviews-section__slide').find('.reviews-section__modal').clone().appendTo($('.overlay'))
    .show()
    .animate({opacity: 1}, 200); 
  });
  /* Close the modal window */
  $('.overlay').click( function(){ 
    $('body').css({"overflow":"auto"});
    $(this).find('.reviews-section__modal')
      .animate({opacity: 0}, 200,  
        function(){
          $(this).remove();
          $('.overlay').fadeOut(400);
        }
      );
  }); 

  /* Review in the modal window */
  $('.reviews__img').click( function(e){ 
    e.preventDefault(); 
    $('body').css({"overflow":"hidden"});   
    $('.overlay').show();
    $(this).closest('.reviews__pic').find('.reviews__modal').clone().appendTo($('.overlay'))
    .show()
    .animate({opacity: 1}, 200); 
  });
  /* Close the modal window */
  $('.overlay').click( function(){ 
    $('body').css({"overflow":"auto"});
    $(this).find('.reviews__modal')
      .animate({opacity: 0}, 200,  
        function(){
          $(this).hide();
          $('.overlay').fadeOut(400);
        }
      );
  }); 

  /* Form in the modal window */
  // $('.btn[data-form]').click( function(e){
  //   e.preventDefault(); 
  //   var suffix = $(this).data("form"); 
  //   var overlay = $('.overlay');
  //   $('body').css({"overflow":"hidden"});   
  //   $(overlay).show();
  //   var formClass = '.form--' + suffix;
  //   $(overlay).find(formClass).fadeIn();    
  // });
  /* Close the modal window */
  // $('.overlay__bg, .form__close').click( function(e){ 
  //   e.preventDefault(); 
  //   $('body').css({"overflow":"auto"});
  //   $(this).closest('.overlay').find('.form').fadeOut();
  //   $('.overlay').fadeOut(400);
  // }); 

  /* Sticky and absolute form in sidebar */
  var sidebarForm = $('.sidebar__form');
  var sidebarFormTop = sidebarForm.offset().top;
  var sidebarFormLeft = sidebarForm.offset().left;
  var sidebarFormWidth = sidebarForm.width();
  var sidebarFormOuterHeight = sidebarForm.outerHeight(true);

  var newsSectionTop = $('.news-section').offset().top;
  var sidebarFormAbsolute = newsSectionTop-sidebarFormOuterHeight;

  $(window).scroll(function () {
    if ($(window).width() > 1024) {
      if ($(this).scrollTop() >= sidebarFormAbsolute ) {
        $(sidebarForm).removeClass('sidebar__form--sticky');
        $(sidebarForm).addClass('sidebar__form--absolute');
        $(sidebarForm).css({"width":sidebarFormWidth, "left":"15px"});
      } else if ($(this).scrollTop() >= sidebarFormTop ) {
        $(sidebarForm).removeClass('sidebar__form--static sidebar__form--absolute');
        $(sidebarForm).addClass('sidebar__form--sticky');
        $(sidebarForm).css({"width":sidebarFormWidth, "left":sidebarFormLeft});
      } else {
        $(sidebarForm).removeClass('sidebar__form--sticky');
        $(sidebarForm).addClass('sidebar__form--static');
      }
    }
  });
  var sideHeight = sidebarFormOuterHeight - $('.breadcrumbs').outerHeight(true);
  if ($('.content').outerHeight(true) <= sideHeight){
    $('.content').height(sideHeight)
  }


  /* for wordpress */
  $('.menu-item-has-children').children('a').attr('href', 'javascript:void(0);');

  /* форма вопроса */
  $(".btn[data-form='question']").fancybox({
      href : 'ajax-zadat-vopros',
      type : 'iframe',
      maxWidth  : 500,
      maxHeight : 750,
      minHeight : 550,
      width     : '100%',
      height    : '100%'
  });
  /* форма обратного звонка */
  $(".btn[data-form='call']").fancybox({
      href : 'ajax-zakazat-zvonok',
      type : 'iframe',
      maxWidth  : 500,
      maxHeight : 750,
      minHeight : 530,
      width     : '100%',
      height    : '100%'
  });

  /* mcc recaptcha */
  // jQuery('.sidebar .recaptcha').data('capsize','normal')

  /* mcc forms - placeholders */
  /* application */
  jQuery('.form--application .mcc-form input').each(function( key,value) {
    var e = jQuery(this);
    var text = e.closest('.mcc-value').prev('.mcc-label').find('.mcc-label-mini-div').text();
    e.attr('placeholder',text);
    e.closest('.mcc-value').prev('.mcc-label').hide();
  });
  /* forms */  
  var myForm = jQuery('.form--review, .form--question');
  myForm.find('.mcc-form input, .mcc-form textarea').each(function( key,value) {
    var e = jQuery(this);
    var text = e.closest('tr').find('.mcc-label').text();
    e.attr('placeholder',text);
    myForm.find('table tr').find('td:first').hide();
  });
  /* end for wordpress */

});

