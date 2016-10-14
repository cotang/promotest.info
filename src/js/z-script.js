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

    var prefix = $(this).data("prefix");
    var hrefPrefix = prefix.replace(/\D/g, "");
    var tel1 = $(this).data("tel1");
    var hrefTel1 = tel1.replace(/\D/g, "");
    $('.header__tel-wrapper').html('<a class="header__tel" target="_blank" href="tel:+'+hrefPrefix+hrefTel1+'">'+prefix+'<span>'+tel1+'</span></a>');
    var tel1Name = "Телефон";    
    if ($(this).data("tel2") !== undefined) {
      var tel2 = $(this).data("tel2");
      var hrefTel2 = tel2.replace(/\D/g, "");
      var tel1Name = "Тел/факс";      
      $('.footer__tel-wrapper--tel2').html('Телефон: <a class="footer__tel" target="_blank" href="tel:+'+hrefPrefix+hrefTel2+'">'+prefix+'<span>'+tel2+'</span></a>');
    } else {
      $('.footer__tel-wrapper--tel2').hide();
    }
    $('.footer__tel-wrapper--tel1').html(tel1Name+': <a class="footer__tel" target="_blank" href="tel:+'+hrefPrefix+hrefTel1+'">'+prefix+'<span>'+tel1+'</span></a>');

    var mapRegion = "img/map/" + $(this).data("map");
    $('.location__map-region img').attr({'src': mapRegion, 'alt': $(this).html(), 'title': $(this).html()});

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
  $('.search__icon').click(function(e){
    e.preventDefault();
    $('.search__form').toggle();
  });               

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
  $('.btn[data-form]').click( function(e){
    e.preventDefault(); 
    var suffix = $(this).data("form"); 
    var overlay = $('.overlay');
    $('body').css({"overflow":"hidden"});   
    $(overlay).show();
    var formClass = '.form--' + suffix;
    $(overlay).find(formClass).fadeIn();    
  });
  /* Close the modal window */
  $('.overlay__bg, .form__close').click( function(e){ 
    e.preventDefault(); 
    $('body').css({"overflow":"auto"});
    $(this).closest('.overlay').find('.form').fadeOut();
    $('.overlay').fadeOut(400);
  }); 

  /* Services dropdown */
  $('.services__item--dropdown').on('mouseenter', function(e) {
    e.preventDefault(); 
    $(this).next('.services-dropdown').show();   
  });
  $('.services-dropdown').on('mouseleave', function() {
    $(this).fadeOut();   
  });

});

  // /* Form in the modal window */
  // $('.btn[data-form]').click( function(e){
  //   e.preventDefault(); 
  //   var suffix = $(this).data("form"); 
  //   $('body').css({"overflow":"hidden"});   
  //   $('.modal').show();
  //   var formClass = '.form--' + suffix;
  //   $('.modal').find(formClass).fadeIn();
  // });
  //  Close the modal window 
  // $('.modal__overlay, .modal__close').click( function(e){ 
  //   e.preventDefault();
  //   $('body').css({"overflow":"auto"});
  //   // $(this).closest('.modal').find('input, textarea').val('');
  //   $(this).closest('.modal').find(".form").fadeOut();
  //   $(this).closest('.modal').fadeOut(400);
  // }); 