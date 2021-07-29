(function($) {
  'use strict';

  /*-------------------------------------------------------------------------------
  Preloader
	-------------------------------------------------------------------------------*/
  $(window).on('load', function() {
    $('.acr-preloader').addClass('hidden');
  });

  /*-------------------------------------------------------------------------------
  Aside Jewelry
	-------------------------------------------------------------------------------*/
  $(".aside-trigger").on('click', function() {
    $(".main-aside").toggleClass('open');
    $("body").toggleClass('aside-open');
  });
  $(".main-aside .menu-item-has-children > a").on('click', function(e) {

    e.preventDefault();

    var submenu = $(this).next(".submenu");

    if ($(this).parent().hasClass('active')) {
      submenu.slideUp(200);
      $(this).parent().siblings().find('.submenu').slideUp(200);
      $(this).parent().removeClass('active');
    } else {
      $(this).closest('ul').find(".menu-item-has-children").find('.submenu').slideUp(200);
      $(this).closest('ul').find(".menu-item-has-children").removeClass('active');
      $(this).parent().addClass('active');
      submenu.slideDown(200);
    }

  });

  /*-------------------------------------------------------------------------------
  Sticky Header
	-------------------------------------------------------------------------------*/
  var header = $(".can-sticky");
  var headerHeight = header.innerHeight();

  function doSticky() {
    if (window.pageYOffset > headerHeight) {
      header.addClass("sticky");
    } else {
      header.removeClass("sticky");
    }
  }
  doSticky();

  /*-------------------------------------------------------------------------------
  Navigation cart Toggle
  -------------------------------------------------------------------------------*/
  // $(".dropdown-btn>a").on('mouseover', function(e) {
  //   e.preventDefault();
  //   var submenu = $(this).next(".cart-dropdown-menu");
  //   submenu.toggleClass('show');
  // });
  // $(".mobile-search>a").on('click', function() {
  //   $(".mutiple-search").slideToggle('');
  // });

  $(".dropdown-btn>a")
      .mouseenter(function (){
        let submenu = $(this).next(".cart-dropdown-menu");
        submenu.addClass('show');
      })
      .mouseleave(function (){
        let submenu = $(this).next(".cart-dropdown-menu");
        submenu.removeClass('show');
        $(submenu)
            .mouseenter(function (){
              submenu.addClass('show');
            })
            .mouseleave(function (){
              submenu.removeClass('show');
            })
      });

  /*-------------------------------------------------------------------------------
  Filters Scroll
  -------------------------------------------------------------------------------*/
  $('.product-main-wrapper').niceScroll({
    cursorcolor: "#dcdcdc",
    cursorwidth: "5px"
  });

  /*-------------------------------------------------------------------------------
  Banner Slider (Home v1)
  -------------------------------------------------------------------------------*/
  $(".banner-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true,
    prevArrow: $('.banner .slider-prev'),
    nextArrow: $('.banner .slider-next'),
  });

  /*-------------------------------------------------------------------------------
  Banner Slider (Home v1)
  -------------------------------------------------------------------------------*/
  $(".product-banner-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.product-banner-inner .slider-prev'),
    nextArrow: $('.product-banner-inner .slider-next'),
  });

  /*-------------------------------------------------------------------------------
  Banner featured slider (Home v2)
  -------------------------------------------------------------------------------*/
  $(".banner-featured-slider").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: false,
    autoplay: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

  /*-------------------------------------------------------------------------------
    Banner (Style 2)
    -------------------------------------------------------------------------------*/
  $("#myInput").on('click', function() {
    $(".filter-option").addClass('show-search');
  });
  $(document).on("click", function(event) {
    var $trigger = $(".input-group");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $(".show-search").removeClass("show-search");
    }
  });

  // Search Category
  $(".cat-selc").on("click", ".init", function() {
    $(this).closest(".cat-selc").children('.cat-selc li:not(.init)').toggleClass("animatedcat");
    $(this).closest(".cat-selc").children('.cat-selc li.init').toggleClass("arrowh3");
  });
  var allOptions = $(".cat-selc").children('li:not(.init)');
  $(".cat-selc").on("click", "li:not(.init)", function() {
    allOptions.removeClass('selected');
    $(this).addClass('selected');
    $(".cat-selc").children('.init').html($(this).html());
    allOptions.toggleClass("animatedcat");
    $(this).closest(".cat-selc").children('.cat-selc li.init').removeClass("arrowh3");
  });
  $(document).on("click", function(event) {
    var $trigger = $(".cat-selc");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $(".animatedcat").removeClass("animatedcat");
      $(".cat-selc li.init").removeClass("arrowh3");
    }
  });

  // Desktop Nav
  $("#open-nav").on('click', function() {
    $("#mySidenav").css("width", "500px");
  });
  $("#close-nav").on('click', function() {
    $("#mySidenav").css("width", "0%");
  });
  // Mobile Nav
  $("#mobile-open-nav").on('click', function() {
    $("#mobile-mySidenav").css("width", "100%");
  });
  $("#mobile-close-nav").on('click', function() {
    $("#mobile-mySidenav").css("width", "0%");
  });
  $('.dropdown-menu li>a').append('<span></span>');
  $('.megamenu .menu-style>ul>li a').append('<span></span>');

  // side nav
  $(document).ready(function() {
    $('.mobile-nav .sidenav li.custom-dropdown-nav>a').on('click', function() {
      $(this).removeAttr('href');
      var element = $(this).parent('li');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp();
      } else {
        element.addClass('open');
        element.children('ul').slideDown();
        element.siblings('li').children('ul').slideUp();
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp();
      }
    });
    $('.mobile-nav .sidenav li.custom-dropdown-nav>a').append('<span class="arrow"></span>');
  });

  // Search bar
  $("#search-btn").click(function() {
    $("#main-sec").hide();
    $("#show-search").show();
  });
  $("#close").click(function() {
    $("#show-search").hide();
    $("#main-sec").show();
  });

  /*-------------------------------------------------------------------------------
  About Slider
  -------------------------------------------------------------------------------*/

  $('.about-slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: false,
    accessibility: true,
    responsive: [{
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Product Slider
  -------------------------------------------------------------------------------*/
  $(".products-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.products .slider-prev'),
    nextArrow: $('.products .slider-next'),
    dots: false,
    responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Product Slider Center
  -------------------------------------------------------------------------------*/
  $(".products-slider-center").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: "30px",
    responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Deals Slider
  -------------------------------------------------------------------------------*/
  $(".deals-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: true,
    responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Featured Slider
  -------------------------------------------------------------------------------*/
  $(".featured-slider").each(function() {

    var $this = $(this);

    $this.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: $this.prev('.section-title-wrap').find('.slider-prev'),
      nextArrow: $this.prev('.section-title-wrap').find('.slider-next'),
      autoplay: false,
    });

  });

  /*-------------------------------------------------------------------------------
  Top Jobs Slider (Home v1)
  -------------------------------------------------------------------------------*/
  $(".top-products-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: true,
    prevArrow: $('.top-products .slider-prev'),
    nextArrow: $('.top-products .slider-next'),
    responsive: [{
      breakpoint: 991,
      settings: {
        arrows: false,
        dots: true,
      }
    }, ]
  });

  /*-------------------------------------------------------------------------------
  Clients Slider
  -------------------------------------------------------------------------------*/
  $(".clients-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  });

  /*-------------------------------------------------------------------------------
  Agents Slider
  -------------------------------------------------------------------------------*/
  $(".agents-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.agents .slider-prev'),
    nextArrow: $('.agents .slider-next'),
    dots: false,
    responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Coming Soon & Login Sliders
  -------------------------------------------------------------------------------*/
  $(".acr-cs-bg-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: true,
  });

  /*-------------------------------------------------------------------------------
  Product Gallery Sliders (Product details v2)
  -------------------------------------------------------------------------------*/
  $('.product-thumbnail-slider-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-thumbnail-slider-nav'
  });
  $('.product-thumbnail-slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.product-thumbnail-slider-main',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    autoplay: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    }, ]
  });

  /*-------------------------------------------------------------------------------
    Shop-detail slider-v2
  -------------------------------------------------------------------------------*/

  $('.detail-page-slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.detail-page-slider-nav'
  });
  $('.detail-page-slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.detail-page-slider-for',
    arrows: true,
    dots: true,
    focusOnSelect: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 567,
      settings: {
        slidesToShow: 2,
      }
    }]
  });

  /*-------------------------------------------------------------------------------
    Shop-detail slider-v1
  -------------------------------------------------------------------------------*/

  $('.detail-page-slider-1').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.detail-page-slider-nav-1'
  });
  $('.detail-page-slider-nav-1').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.detail-page-slider-1',
    arrows: false,
    dots: false,
    vertical: true,
    centerMode: true,
    centerPadding: 20,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        vertical: false,
      }
    }]
  });

  /*-------------------------------------------------------------------------------
  Sidebar filter collapse (Product grid and list)
  -------------------------------------------------------------------------------*/
  $(".acr-collapse-trigger").on('click', function() {
    $(this).next().slideToggle(200);
  });

  /*-------------------------------------------------------------------------------
  Trigger advanced Search
  -------------------------------------------------------------------------------*/
  $(".advanced-search-trigger").on('click', function() {
    $(".advanced-search").slideToggle(200);
    $(this).toggleClass('active');
  });

  /*-------------------------------------------------------------------------------
  Trigger product filter
  -------------------------------------------------------------------------------*/
  $(".filter-trigger").on('click', function() {
    $(".acr-filter-form").slideToggle(300);
  });

  /*-------------------------------------------------------------------------------
  Select2
  -------------------------------------------------------------------------------*/
  $('.acr-select2').select2({
    allowClear: false
  });

  /*-------------------------------------------------------------------------------
   Open/Close Category Bar
   -------------------------------------------------------------------------------*/
   $(".acr-category-mm").on('click', function(){
     $(this).toggleClass('open');
   })

  /*-------------------------------------------------------------------------------
  Tooltips
  -------------------------------------------------------------------------------*/
  $('[data-toggle="tooltip"]').tooltip();

  /*-------------------------------------------------------------------------------
  Load More Features (Product Details)
  -------------------------------------------------------------------------------*/
  $(".load-more-features").on('click', function() {
    $(this).hide(0);
    $(".hidden-product-features").slideDown();
  });

  /*-------------------------------------------------------------------------------
  Magnific Popup
  -------------------------------------------------------------------------------*/
  $('.popup-youtube').magnificPopup({
    type: 'iframe'
  });
  $('.popup-vimeo').magnificPopup({
    type: 'iframe'
  });
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });
  $('.gallery-thumb').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    },
  });
  $('.magnific-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    removalDelay: 300,
    easing: 'ease-in-out',
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    }

  });

  /*-------------------------------------------------------------------------------
    Zoom image js
    -------------------------------------------------------------------------------*/

  $('.product-zoom-image')
    .wrap('<span style="display:inline-block" class="product-single-zoom"></span>')
    .css('display', 'block')
    .parent()
    .zoom();

  /*-------------------------------------------------------------------------------
  Masonry
  -------------------------------------------------------------------------------*/
  $('.masonry').imagesLoaded(function() {
    var isotopeContainer = $('.masonry');
    isotopeContainer.isotope({
      itemSelector: '.masonry-item',
    });
  });



  $('.our-project-2-wrap').masonry({
    itemSelector: '.grid-item',
    columnWidth: 1,
    percentPosition: true
  });

  //--Masonary item refresh on tab click--//

  var container = $('.our-project-2');

  $('.our-project .hc-tab-wrap a.nav-link[data-toggle=tab]').each(function() {
    var $this = $(this);

    $this.on('shown.bs.tab', function() {
      container.masonry({
        columnWidth: '.project-img',
        itemSelector: '.project-img'
      });

    });
  });

  /*-------------------------------------------------------------------------------
   Add / Subtract Quantity Js
   -------------------------------------------------------------------------------*/

  $(".qty-box span").on('click', function() {
    var qty = $(this).closest('.qty-box').find('input');
    var qtyVal = parseInt(qty.val());
    if ($(this).hasClass('qty-add')) {
      qty.val(qtyVal + 1);
    } else {
      return qtyVal > 1 ? qty.val(qtyVal - 1) : 0;
    }
  })

  /*-------------------------------------------------------------------------------
    Counter
    -------------------------------------------------------------------------------*/

  $('.counter-number').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 4000,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });

  /*-------------------------------------------------------------------------------
  Submit product Gallery Upload
  -------------------------------------------------------------------------------*/
  if ($("#acrProductGallery").length) {
    // This prevents using the class 'dropzone' which will conflict with new instances of DropZone created programatically
    // Set this to true, or delete if you want to create an instance of Dropzone without having to write any code:
    // More info here: https://www.dropzonejs.com/#configuration
    Dropzone.autoDiscover = false;
    $("#acrProductGallery").dropzone({
      url: "https://androthemes.com/scripts/silence.php",
      paramName: "file",
      maxFiles: 5,
      maxFilesize: 5,
      addRemoveLinks: true,
      acceptedFiles: "image/*,application/pdf,.psd",
    });
  }

  //On scroll events
  $(window).on('scroll', function() {

    doSticky();

  });

})(jQuery);
