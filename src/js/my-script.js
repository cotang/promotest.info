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
    $('.header__email-wrapper').html('<a class="header__email" target="_blank" href="mailto:'+$(this).attr("data-email")+'">'+$(this).attr("data-email")+'</a>'); 
    var tel1 = $(this).attr("data-tel1");
    var hrefTel1 = tel1.replace(/\D/g, "");
    var tel2 = $(this).attr("data-tel2");
    var hrefTel2 = tel2.replace(/\D/g, "");    
    $('.header__tel-wrapper').html('<a class="header__tel" target="_blank" href="tel:+'+hrefTel1+hrefTel2+'">'+tel1+'<span>'+tel2+'</span></a>'); 
    $('.city__dropdown').hide(); 
    return false;
  });

  /* Hamburger */
  if ($(window).width() < 768) {
    var headerNavItem = $('.header .nav__item');
    $('.nav__hamburger').show();
    $(headerNavItem).hide(); 
    $('.hamburger').click(function(e){
      e.preventDefault();
      $(this).toggleClass('hamburger--close');
      $(headerNavItem).toggle();
    });               
  }

  /* Открывание меню поиска по клику на иконку */
  if ($(window).width() <= 1024) {
    $('.search__form').hide(); 
    $('.search__icon').click(function(e){
      e.preventDefault();
      $('.search__form').toggle();
    });               
  }

  /* галерея "с нами уже работают" */
  $('.reviews__gallery').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',      
    variableWidth: true
  });

  /* Open the modal window */
  $('.reviews__link').click( function(e){ 
    e.preventDefault(); 
    $('body').css({"overflow":"hidden"});   
    $('.overlay').show();
    $(this).closest('.reviews__slide').find('.reviews__modal').clone().appendTo($('.overlay'))
    .show()
    .animate({opacity: 1}, 200); 
  });
  /* Close the modal window */
  $('.overlay').click( function(){ 
    $('body').css({"overflow":"auto"});
    $('.reviews__modal')
      .animate({opacity: 0}, 200,  
        function(){
          $(this).hide();
          $('.overlay').fadeOut(400);
        }
      );
  }); 


    /* списки в формах */
  var regionInput = $('.form__region input');
  var regionList = $('.form__region-list');    
    $(regionInput).click(function() { 
      $(this).closest('.form__region').find(regionList).show();   
    });  
    $(regionList).mouseleave(function(){
      $(this).fadeOut('normal');
    }).find('li').click(function(){
      var regionText = $(this).text();
      $(this).closest('.form__region').find(regionInput).val(regionText);
      $(this).closest(regionList).mouseleave();
    }); 

  /* открывание ответа по ссылке "читать далее" */
  // $('.question__details').click(function(e) {
  //     e.preventDefault();
  //     $(this).closest('.question').find('.question__answer').toggle();      
  // });

});

