
window.Site = (function ($, window, undefined) {
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    var user = getCookie('Aoste');
    if (user === '') {
      $('.cookie-policy').removeClass('hidden');
      $('.cookie-policy').find('.btn-2').on('click', function () {
        user = 'Welcome To Aoste Website';
        setCookie('Aoste', user, 30);
      });
    }
  }

  checkCookie();

  // focus input

  //

  var scrollBarWidth = null,
    supportsOrientationChange = 'onorientationchange' in window,
    orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';

  function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 === w2) {
      w2 = outer.clientWidth;
    }

    document.body.removeChild(outer);
    var scrollBarWidth = w1 - w2;
    return scrollBarWidth;
  }


  var scrollBarWidth = !Modernizr.touch ? 0 : getScrollBarWidth();

  function viewportWidth() {
    if (window.Modernizr.touch) {
      return $(window).width();
    } else {
      if (navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i)) {
        return document.documentElement.clientWidth;
      } else {
        return window.innerWidth || document.documentElement.clientWidth;
      }
    }
  };

  return {
    getScrollBarWidth: getScrollBarWidth,
    scrollBarWidth: scrollBarWidth,
    orientationEvent: orientationEvent,
    viewportWidth: viewportWidth
  };

})(jQuery, window);

$(function () {
  var mobileSize = 1024,
    win = $(window);
  $('[data-accord-block]').click(function () {
    $('.accord-thumbnail.second').addClass('hidden-before');
    $('.aostologie-slider-block').css({
      opacity: 1,
      zIndex: 5
    }).addClass('animation');
  });

  //Script star rating
  $('.rating-block').rater();


  function googleMap() {
    if (!$("#googleMap").length) {
      return;
    }
    var position = $('[data-position]').data('position'),
      center = position.center,
      title = position.title;

    var map = new google.maps.Map(document.getElementById("googleMap"), {
      center: new google.maps.LatLng(center.lat, center.lng - position.detal),
      zoom: position.zoom,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      // draggable: false,
      // disableDoubleClickZoom: false,
      styles: [
        {
          "featureType": "road.highway",
          "stylers": [
            { "color": "#d8d8d8" },
            { "visibility": "on" }
          ]
        }, {
          "featureType": "landscape.natural",
          "stylers": [
            { "color": "#e0e0e0" }
          ]
        }, {
          "featureType": "administrative.country",
          "stylers": [
            { "color": "#e0e0e0" }
          ]
        }, {
          "featureType": "poi.park",
          "stylers": [
            { "color": "#D1D1CF" }
          ]
        }, {
          "featureType": "landscape",
          "stylers": [
            { "color": "#e0e0e0" }
          ]
        }, {
          "featureType": "transit",
          "stylers": [
            { "visibility": "off" }
          ]
        }, {
          "featureType": "poi",
          "stylers": [
            { "visibility": "off" }
          ]
        }, {
          "featureType": "poi.park",
          "stylers": [
            { "visibility": "on" }
          ]
        }, {
          "featureType": "water",
          "stylers": [
            { "color": "#d8d8d8" }
          ]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            { "color": "#6b6b6a" }
          ]
        }, {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [
            { "color": "#6b6b6a" }
          ]
        }
      ],
    });

    var marker = new google.maps.Marker({
      position: center,
      map: map,
      icon: 'assets/images/icon-pin-marker.png',
      title: title,
      zIndex: 99999,
    });
  }

  function recettesFichePage() {
    if (!$('.recettes-fiche').length) {
      return;
    }
    var scrollBarWidth = Site.scrollBarWidth,
      mobileSize = 1024,
      prepended = false,
      dataColumnLeft = $('[data-column-left]'),
      dataIngredients = $('[data-ingredients]'),
      dataListIcon = $('[data-list-icon]');
    $(window).on(Site.orientationEvent + '.recettesFichePage', function () {
      var winWidth = $(window).width(),
        columnRight = null;
      if (winWidth + scrollBarWidth < mobileSize) {
        if (prepended) {
          return;
        }
        prepended = true;
        columnRight = dataColumnLeft.next();
        columnRight.after(dataColumnLeft);
        dataListIcon.after(dataIngredients);
      } else {
        if (!prepended) {
          return;
        }
        prepended = false;
        columnRight = dataColumnLeft.prev();
        dataColumnLeft.after(columnRight);
        dataColumnLeft.prepend(dataIngredients);
      }
    }).trigger(Site.orientationEvent + '.recettesFichePage');
  }

  function shareSocial() {
    var scrollBarWidth = Site.scrollBarWidth,
      orientationEvent = Site.orientationEvent;
    if (!$('.recettes-fiche').length && !Modernizr.touch) {
      return;
    }
    $('[data-social]').off('click.shareSocial').on('click.shareSocial', function (e) {
      e.stopPropagation();
      $(this).addClass('animation');
    });
    $('body, html').off('click.shareSocial').on('click.shareSocial', function () {
      $('[data-social]').removeClass('animation');
    });
  }

  googleMap();
  recettesFichePage();
  shareSocial();

  $('img.lazy').lazyload();
  $('span.lazy').lazyload();
  $('section.lazy').lazyload();

});

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'slider';
  var isPlayingVideo = false;
  var mobileSize = 1024;
  var frameAnimationId, currentIndex;

  var optionsPost = {
    dots: false,
    centerMode: true,
    centerPadding: '6.429rem 0 0',
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    arrows: true,
    prevArrow: '<a class ="slick-prev slick-arrow" href="#">prev</a>',
    nextArrow: '<a class ="slick-next slick-arrow" href="#">next</a>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerPadding: '3.333rem 0 0',
        }
      }
    ]
  };
  var optionsaccord = {
    dots: false,
    fade: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    prevArrow: '<a class="slick-prev slick-arrow" href="#"></a>,',
    nextArrow: '<a class="slick-next slick-arrow" href="#"></a>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          centerPadding: '3.333rem 0 0',
        }
      }
    ]
  };
  var optionsBanner = {
    dots: true,
    customPaging: function () {
      return '<canvas width="20" height="20"></canvas>';
    },
    fade: true,
    infinite: true,
    autoplay: true,
    'adaptiveHeight': true,
    autoplaySpeed: 6000,
    speed: 1090,
    slidesToShow: 1,
    prevArrow: '<a class ="slick-prev slick-arrow" href="#">prev</a>',
    nextArrow: '<a class ="slick-next slick-arrow" href="#">next</a>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false
        }
      }
    ]
  };
  var optionsCustom = {
    dots: true,
    customPaging: function () {
      return '<canvas width="20" height="20"></canvas>';
    },
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    slidesToShow: 1,
    prevArrow: '<a class ="slick-prev slick-arrow" href="#">prev</a>',
    nextArrow: '<a class ="slick-next slick-arrow" href="#">next</a>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false
        }
      }
    ]
  };
  var optionsInstagram = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000
  };
  var optionsVertical = {
    dots: true,
    infinite: true,
    autoplay: true,
    vertical: true,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  var drawCircle = function () {
    var c = $('canvas');
    c.each(function () {
      var ctx = this.getContext('2d');
      ctx.clearRect(0, 0, 18, 18);
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(9, 9, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    });
  };
  var runOutsideCircle = function (index) {
    currentIndex = index;
    if (frameAnimationId) {
      drawCircle();
      window.cancelAnimationFrame(frameAnimationId);
    }
    var c = $('canvas')[index || 0];
    var ctx = c.getContext('2d');
    var i = -0.5;
    var startTime;
    var interval = 60;
    function draw() {
      ctx.clearRect(0, 0, 18, 18);
      ctx.beginPath();
      ctx.fillStyle = '#ffe4a9';
      ctx.arc(9, 9, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = '#ffe4a9';
      ctx.arc(9, 9, 8, i * Math.PI, 1.5 * Math.PI);
      ctx.stroke();
      i += 0.02;
    }
    function animate(t) {
      if (i <= 1.5) {
        frameAnimationId = requestAnimationFrame(animate);
      }
      if (!startTime) {
        startTime = t;
      }
      if (t - startTime < interval) {
        return;
      }
      startTime = t;
      return draw();
    }
    frameAnimationId = requestAnimationFrame(animate);
  };

  var afterChangeHandler = function (event, slick, currentSlide) {
    var currentEle = $(slick.$slides[currentSlide]);
    if (!currentEle.hasClass('animated')) {
      currentEle.addClass('animated');
    }
    if (isPlayingVideo) {
      var youtubeEle = $(slick.$slider).find('[data-youtube]');
      youtubeEle.youtube('stopVideo', youtubeEle.find('[data-id]').attr('data-container'));
      youtubeEle.find('.mask-video').removeClass('hide');
      slick.$slider.slick('slickPlay');
      isPlayingVideo = !isPlayingVideo;
    }
    $('[data-image-banner-slider]').attr('class', 'image-group hidden-mb')
      .addClass('position-' + (currentSlide + 1))
      .find('img').addClass('hidden');
    $('[data-image-banner-slider] img').eq(currentSlide).removeClass('hidden');
  };

  var beforeChangeHandler = function (event, slick, currentSlide, nextSlide) {
    var currentEle = $(slick.$slides[currentSlide]);
    var nextEle = $(slick.$slides[nextSlide]);
    runOutsideCircle(nextSlide, slick.$slider);
    var youtubeEle = currentEle.find('[data-youtube]');
    if (youtubeEle.length && youtubeEle.find('.mask-video').hasClass('hide')) {
      isPlayingVideo = !isPlayingVideo;
    }
    var indexPrevBackground = currentEle.attr('data-slide-style');
    var indexNextBackground = nextEle.attr('data-slide-style');
    $('[data-img-background]').each(function (index) {
      var that = $(this);
      if (that.hasClass('animation-out')) {
        that.removeClass('animation-out');
      }
      if (index === (indexPrevBackground - 1)) {
        $('.cover-images').removeClass('style-' + indexPrevBackground);
        if (that.hasClass('animation-in')) {
          that.removeClass('animation-in');
        }
        that.addClass('animation-out');
      }
      if (index === (indexNextBackground - 1)) {
        $('.cover-images').addClass('style-' + indexNextBackground);
        that.addClass('animation-in');
      }
    });
  };

  var afterChangeHandler1 = function (event, slick, currentSlide) {
    var currentEle = $(slick.$slides[currentSlide]);
    if (!currentEle.hasClass('animated')) {
      currentEle.addClass('animated');
    }
  };

  var beforeChangeHandler1 = function (event, slick, currentSlide, nextSlide) {
    runOutsideCircle(nextSlide, slick.$slider);
  };

  var pauseOnScroll = function (element, timer) {
    var paused = false;

    $(window).on('scroll.' + pluginName, function () {
      var currentOffset = $(window).scrollTop(),
        elementOffset = element.offset().top,
        elementHeight = element.height();
      if (currentOffset > (elementOffset + elementHeight + 200)) {
        if (paused) {
          return;
        }
        paused = true;
        clearTimeout(timer);
        element.slick('slickPause');
      } else {
        if (!paused) {
          return;
        }
        paused = false;
        runOutsideCircle(element.slick('slickCurrentSlide'), element.$slider);
        timer = setTimeout(function () {
          element.slick('slickPlay');
        }, 1000);
      }
    }).trigger('scroll.' + pluginName);
  };

  var initOnInstagram = function (element, options) {
    var slickInited = false,
      scrollBarWidth = Site.scrollBarWidth;
    $(window).on(Site.orientationEvent + '.' + pluginName, function () {
      var winWidth = $(window).width();
      if (winWidth + scrollBarWidth < mobileSize) {
        if (slickInited) {
          return;
        }
        slickInited = true;
        element.slick(options);
      } else {
        if (!slickInited) {
          return;
        }
        slickInited = false;
        element.slick('unslick');
      }
    }).trigger(Site.orientationEvent + '.' + pluginName);
  };

  var initVertical = function (elm) {
    var groupNav = $('<div class="slide-nav"></div>');
    var btnClose = $('<button type="button" class="slick-arrow btn-close">x</button>');
    elm.find('.slick-arrow');
    groupNav.append(btnClose);
    groupNav.append(elm.find('.slick-arrow'));
    elm.append(groupNav);
    elm.find('.slick-prev').insertAfter('.slick-next');
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      var options = that.options;
      var optionSlider;
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;

      if (options.type === 'banner') {
        optionSlider = $.extend({}, optionsBanner, options);
      }
      if (options.type === 'sliderCustom') {
        optionSlider = $.extend({}, optionsCustom, options);
      }
      if (options.type === 'post') {
        optionSlider = $.extend({}, optionsPost, options);
      }
      if (options.type === 'accord') {
        optionSlider = $.extend({}, optionsaccord, options);

      }
      if (options.type === 'instagram') {
        optionSlider = $.extend({}, optionsInstagram, options);
      }
      if (options.type === 'vertical') {
        optionSlider = $.extend({}, optionsVertical);
        optionSlider.autoplay = false;
        optionSlider.slidesToShow = 3;
        optionSlider.infinite = false;
        that.element.on('init', function () {
          initVertical(that.element);
        });
      }
      if (optionSlider.customPaging) {
        that.element.on('init', function () {
          drawCircle();
          runOutsideCircle();
        });
      }
      if (options.type === 'instagram') {
        initOnInstagram(that.element, optionSlider);
      } else {
        that.element.slick(optionSlider);
      }
      if (options.type === 'banner') {
        that.element.on('afterChange', afterChangeHandler);
        that.element.on('beforeChange', beforeChangeHandler);
        var timer = null;
        if (optionSlider.autoplay) {
          that.element.slick('slickPause');
          timer = setTimeout(function () {
            that.element.slick('slickPlay');
          }, 1000);
        }
        pauseOnScroll(that.element, timer);
      }
      if (options.type === 'sliderCustom') {
        that.element.on('afterChange', afterChangeHandler1);
        that.element.on('beforeChange', beforeChangeHandler1);
      }

      $(window).on('resize.' + pluginName, function () {

        window.cancelAnimationFrame(frameAnimationId);

        setTimeout(function () {
          drawCircle();
          runOutsideCircle(currentIndex);
        }, 300);

      });

    },
    pauseBanner: function () {
      var that = this;
      that.element.slick('slickPause');
    },
    playBanner: function () {
      var that = this;
      setTimeout(function () {
        drawCircle();
        runOutsideCircle(currentIndex);
        that.element.slick('slickPlay');
      }, 300);
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'aostologie-slider';
  var delayTime = 0;


  var getProductName = function (el) {
    var prodName = el.find('.aostologie-slider .active .product-name').html();
    el.find('.nav-control .product-name').html(prodName);
  };

  var activeItem = function (el, currentItem) {
    el.find('.item-slider').removeClass('active');
    el.find('.item-slider:nth(' + currentItem + ')').delay(delayTime).addClass('active');
    getProductName(el);
  };

  var loadData = function (el, currentItem, dataNav) {
    activeItem(el, currentItem);
    var prodId = $('.accord-left-block .aostologie-slider .active').data('object-id'),
      ingredientId = $('.accord-right-block .aostologie-slider .active').data('object-id');
    el.find('.active').addClass('hidden-slider');
    if (dataNav === 'left') {
      $('#floatingBarsG')
        .removeClass('loading-right')
        .addClass('loading-left')
        .fadeIn();
    } else {
      $('#floatingBarsG')
        .removeClass('loading-left')
        .addClass('loading-right')
        .fadeIn();
    }
    var url = $('.aostologie-slider-block').data('custom-url');
    $.ajax({
      method: 'GET',
      url: url,
      data: { prodId: prodId, ingredientId: ingredientId },
      success: function (result) {
        $('.bg-animation .block-text .num-1').html(result);
        $('#floatingBarsG').delay(delayTime).fadeOut();
        if (delayTime > 0) {
          setTimeout(function () {
            activeItem(el, currentItem);
            el.find('.item-slider').removeClass('hidden-slider');
          }, delayTime + 100);
        }
      },
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Download progress
        xhr.addEventListener('progress', function (evt) {
          var total = evt.total;
          if (total === 0) { total = evt.loaded; }
          delayTime = total;
          if (total < 10000) { delayTime = 1000; }
        }, false);
        return xhr;
      },
      error: function () {
        //Code here
      }
    });
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }


  Plugin.prototype = {
    init: function () {
      var that = this,
        el = that.element;
      var currentItem = 0,
        totalItem = el.find('.item-slider').length;

      activeItem(el, currentItem);

      el.on('click.' + pluginName, '.nav-prev', function () {
        if (currentItem === 0) {
          currentItem = totalItem - 1;
        } else {
          currentItem--;
        }
        var dataNav = $(this).data('nav-custom');
        loadData(el, currentItem, dataNav);
        return false;
      });

      el.on('click.' + pluginName, '.nav-next', function () {
        if (totalItem - 1 === currentItem) {
          currentItem = 0;
        } else {
          currentItem++;
        }
        var dataNav = $(this).data('nav-custom');
        loadData(el, currentItem, dataNav);
        return false;
      });

    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'background-menu';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      var options = that.options;
      var images = options.image.split(',');
      that.element.css('background-image', 'url(../' + images[0] + '');
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'checkbox';
  var arrData = [];
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,
        _input = that.element.find('input[type="checkbox"]');          // arrData = [];
      _input.on('click', function () {
        if ($(this).is(':checked')) {
          var desc = $(this).parent().parent();
          var arrImage = desc.parent().find('.image').attr('data-interchange');
          arrImage = arrImage.substring(1, arrImage.length - 1);
          arrImage = arrImage.split(',');
          desc.parent().addClass('checked-item');
          var data = {
            price: parseInt(desc.find('span').text()),
            text: desc.find('.text').text(),
            title: desc.find('.title').text(),
            imgPath: arrImage[1]
          };
          arrData[data.title] = data;
        }
        else {
          var removeItem = $(this).parent().parent().find('.title').text();
          $(this).parent().parent().parent().removeClass('checked-item');
          delete arrData[removeItem];
        }
      });
    },
    getItem: function () {
      for (var key in arrData) {
        var value = arrData[key];
        var item = '<li data-price="' + value.price + '"><div class="image"><img src="' + value.imgPath + '" alt="' + value.title + '" title="' + value.title + '" width="252" height="193"></div><div class="info-desc"><div class="content"><h3 class="title">' + value.title + '</h3><div class="desc"><p>' + value.text + '</p></div><a href="javascript:;" class="link-delete" tabindex="-1" title="Supprimer ce lot">Supprimer ce lot</a></div><div class="point-number"><strong>' + value.price + '</strong></div></div></li>';
        $('.product-list ul').append(item);
      }
    },
    reItem: function () {
      arrData = [];
      $('.product-list').find('li').remove();
      $('input[type="checkbox"]').prop('checked', false);
      $('input[type="checkbox"]').parent().parent().parent().removeClass('checked-item');
    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'clickcubic';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      that.element.on('click', function () {
        $('.thumbnail-3').addClass('clicked');
      });
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'clone-input';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      that.element.on('click', function (e) {
        e.preventDefault();
        // var inputToClone = that.element.siblings('.input.input-1').last();
        var inputToClone = that.element.siblings('.row').last();
        var inputClone = inputToClone.clone();
        // var inputClone1 = inputToClone.clone();
        inputClone.insertAfter(inputToClone);
        that.element.siblings('.row').last().find('.input').val('');
        if (that.element.siblings('.row').last().find('.parsley-errors-list').length) {
          that.element.siblings('.row').last().find('.parsley-errors-list').remove();
        }
        that.element.siblings('.row').last().find('.input').parsley();
        // inputClone1.insertAfter(inputToClone);
      });

    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]({
    });
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'comment';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,
        el = that.element;
      el.on('click', '.submit-rating', function (e) {
        e.preventDefault();
        var url = el.data('custom-url');
        $.ajax({
          url: url,
          type: 'GET',
          success: function (data) {
            if (data.status === false) {
              el.find('.bind-popup').trigger('click');
            } else {
              el.submit();
            }
          }
        });
      });
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'cookie';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      this.openCookie();
    },
    openCookie: function () {
      var that = this;
      var el = that.element;
      var lastScrollTop = 0;
      $(document).on('scroll.' + pluginName, function () {
        if ($(this).scrollTop() < lastScrollTop) {
          if ($(this).scrollTop() <= el.outerHeight()) {
            if (!that.element.hasClass('fadeOut')) {
              that.element.removeClass('cookie-scroll-down');
              that.element.addClass('cookie-scroll-up');
            }
          }
        }
        else {
          if ($(this).scrollTop() > el.outerHeight()) {
            if (!that.element.hasClass('fadeOut')) {
              // alert('dadadw');

              that.element.removeClass('cookie-scroll-up');
              that.element.addClass('cookie-scroll-down');
            }
          }
        }
        lastScrollTop = $(this).scrollTop();
      }).trigger('scroll.' + pluginName);
      that.element.find('.btn-2').on('click', function () {
        that.element.addClass('fadeOut');
        that.element.removeClass('cookie-scroll-up');
        that.element.removeClass('cookie-scroll-down');
      });
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name custom-select
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
; (function ($, window, undefined) {
  var pluginName = 'custom-select',
    body = $('body');

  function dataSelector(name, value) {
    var suffix = ']';
    if (value !== undefined) {
      suffix = '=' + value + suffix;
    }
    return '[data-' + name + suffix;
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      this.eventHandlers();
    },

    eventHandlers: function () {
      this.initEvents();
    },

    initEvents: function () {
      var self = this;
      var options = self.options;
      var el = self.element;
      var text = el.find(dataSelector(options.text));
      var select = el.find(dataSelector(options.select));
      self.optionList = $('<ul class="type-combobox__list"></ul>').appendTo(el);
      select.find('option').each(function () { //Loop through option in select for the custom list
        var item = $(this);
        $('<li class="type-combobox__item" data-value="' + item.attr('value') + '">' + item.text() + '</li>').appendTo(self.optionList);
      });
      text.on('click.' + pluginName, function (ev) {
        ev.preventDefault();
        el.addClass('active');
        self.optionList.slideDown('300', function () {
          body.on('click.' + pluginName, function () {
            self.hideList();
          });
        });
      });
      self.optionList.find('li').on('click.' + pluginName, function (ev) {
        ev.preventDefault();
        var item = $(this);
        select.val(item.data('value'));
        text.text(item.text());
      });
    },

    hideList: function () {
      var self = this;
      var el = self.element;
      body.off('click.' + pluginName);
      self.optionList.slideUp('300', function () {
        el.removeClass('active');
      });
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    'text': 'text',
    'select': 'select'
  };

  $(function () {
    $(dataSelector(pluginName))[pluginName]({});
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'deleteitem';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,
        el = that.element;

      el.on('click', function () {
        var id = el.data('recette-id');
        var url = el.data('custom-url');
        $.ajax({
          url: url,
          type: 'POST',
          data: 'id=' + id,
          success: function (/*result*/) {
            $('.mes-items-block #item-' + id).remove();
          },
          error: function () {
            //Code here
          }
        });
      });
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'dropdown';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }
  Plugin.prototype = {
    init: function () {
      var that = this;
      var dropArrow = that.element;
      var li = dropArrow.parent();
      dropArrow.on('click', function () {
        $('.has-sub').not(li).removeClass('focus');
        li.toggleClass('focus');
      });
      $(document).on('click', function (e) {
        if (!$(e.target).closest('.has-sub').length) {
          li.removeClass('focus');
        }
      });
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'getlike';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,
        el = that.element;
      el.on('click', '.btn-2', function () {
        var likeBtn = $(this);
        var url = el.data('custom-url');

        $.ajax({
          url: url,
          type: 'GET',
          success: function (data) {
            el.find('.counter-like').html(data);
            likeBtn.addClass('fadeOut').css('display', 'none');
            el.find('.counter-like').addClass('fadeIn');
          }
        });
      });
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, modernizr, undefined) {

  'use strict';

  var pluginName = 'history',
    win = $(window);

  var getIndexEl = function (points, scrollTop, timeLineTop) {
    var len = points.length,
      el = points[0].parents('[data-' + pluginName + ']'),
      lastAnimate = el.find('.timeline-item.animation:last'),
      index = lastAnimate.length ? lastAnimate.index() : 0;

    for (var i = index; i < len; i++) {
      var currPoint = points[i],
        curr = currPoint.parents('.timeline-item');

      if (scrollTop + timeLineTop - 50 >= currPoint.offset().top) {
        curr.addClass('animation');
        if (!currPoint.hasClass('actived')) {
          currPoint.addClass('active actived');
          el.find('.active').not(currPoint).removeClass('active').addClass('actived');
        }
      }
    }
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var el = this.element,
        listEls = el.find('.timeline-item'),
        leng = listEls.length,
        points = [],
        timeLineTree = el.find('.timeline-tree'),
        lastHeight = 0,
        isOut = false,
        lastTop = win.scrollTop(),
        htmlEle = $('html');

      win.on('resize.' + pluginName, function () {
        if (window.Modernizr.mq('(max-width: 1023px)')) {
          setTimeout(function () {
            timeLineTree.find('.timeline-color').css('height', '');
          }, 50);
        } else {
          setTimeout(function () {
            timeLineTree.find('.timeline-color').css('height', el.outerHeight() - 15);
          }, 50);
        }

      }).trigger('resize');

      if (!htmlEle.hasClass('desktop')) {
        return false;
      }

      for (var i = 0; i < leng; i++) {
        var currIndex = listEls.filter('.timeline-item:nth-child(' + (i + 1) + ')'),
          pointEl = currIndex.find('[data-point]');

        if (pointEl.length) {
          points.push(pointEl);
        }
      }
      points.push(el.find('[data-last-point]'));


      setTimeout(function () {
        var timerScroll;
        win.on('scroll.' + pluginName, function () {
          if (!isOut) {
            clearTimeout(timerScroll);
            timerScroll = setTimeout(function () {
              var scrollTop = win.scrollTop(),
                winHeight = win.height(),
                endPos = scrollTop + winHeight,
                pointsLen = points.length,
                posArr = [],
                lastPoint;

              if (scrollTop < lastTop) {
                console.log(lastTop, scrollTop);
                return false;
              }
              lastTop = scrollTop;

              for (var i = 0; i < pointsLen; i++) {
                var currPoint = points[i],
                  currPos = currPoint.offset().top;

                if (endPos > currPos - 20) {
                  posArr.push(currPos);
                  lastPoint = currPoint;
                  if (i === pointsLen - 1) {
                    isOut = true;
                  }
                }
              }

              if (posArr.length) {
                var lastPos = posArr[posArr.length - 1],
                  timeLineTreeTop = timeLineTree.offset().top,
                  newHeight = lastPos - timeLineTreeTop + lastPoint.height(),
                  beforePoint = scrollTop - timeLineTreeTop;

                if (newHeight > lastHeight) {
                  if (lastHeight < beforePoint) {
                    timeLineTree.height(beforePoint);
                  }

                  var indexParent = lastPoint.parents('.timeline-item');

                  timeLineTree.animate({
                    height: timeLineTree.height() + (newHeight - timeLineTree.height())
                  }, {
                      duration: 600,
                      step: function (now) {
                        getIndexEl(points, now, timeLineTreeTop);
                      },
                      complete: function () {
                        indexParent.addClass('animation');
                        lastPoint.addClass('active');
                        listEls.find('.active').not(lastPoint).removeClass('active').addClass('actived');
                      }
                    });
                  lastHeight = newHeight;
                }
              }
            }, 100);
          }
        }).trigger('scroll');
      }, 250);
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {

  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window, window.Modernizr));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'hovericon';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      that.element.on('mouseover', function () {
        var dataCustom = $(this).data('custom');
        if (dataCustom) {
          $('.social-list-block .social-desc').addClass('animation');
          $(this).on('mouseleave', function () {
            $('.social-list-block .social-desc').removeClass('animation');
          });
        } else {
          var elul = $(this).next();
          elul.addClass('animation');
          elul.on('mouseleave', function () {
            $(this).removeClass('animation');
          });
        }
      });
    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'hoverimg';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      var winWidth = $(window).width();
      var size = 1024;
      var scrollBarWidth = 0;
      if (!Modernizr.touch) {
        scrollBarWidth = Site.getScrollBarWidth();
      }
      if (winWidth + scrollBarWidth >= size) {
        $('.sub-title').text('');
        var hover = that.element.find('.item-recipe');
        hover.each(function () {
          $(this).on('mouseenter', function () {
            hover.removeClass('active');
            $(this).addClass('active');
          });
          $(this).on('mouseleave', function () {
            if (that.element.filter(':hover').length > 0) {
              $(this).removeClass('active');
              var text = $(this).find('.sub-title').attr('data-text-before');
              hover.not(this).each(function () {
                $(this).on('mouseenter', function () {
                  $(this).find('.sub-title').attr('data-text-after', text);
                });
                $(this).attr('data-text-after', text);
              });
            }
          });
        });
      }
      if ((Modernizr.touch) && (winWidth + scrollBarWidth >= size)) {
        that.element.on('mouseenter', function () {
          var link = $(this).find('.image-instagram').attr('href');
          $(this).find('.image-instagram').on('click', function (e) {
            e.preventDefault();
          });
          $(this).find('.plus').on('click', function () {
            window.open(link, '_blank');
          });
        });
      }
    },
    destroy: function () {


      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'identifier';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }
  var clickClose = function (ele, classMenu) {
    $(document).on('touchstart', function (e) {
      var inside = ele.find(classMenu);
      var par = ele.parent();
      if (!$(e.target).closest(inside).length) {
        par.removeClass('active');
      }
    });
  };
  Plugin.prototype = {
    init: function () {
      var that = this;
      var menu = '.' + that.options.type;
      that.element.on('touchstart', '.icon-account', function (e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('active');
      });
      clickClose(that.element, menu);

      $(document).on('touchend', function (e) {
        var container = $('.social-block');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          $('.social-block').addClass('in-active');
        } else {
          $('.social-block').removeClass('in-active');
        }

        var secondClick = false;
        var duration = 300;
        $('.social-block').on('click', '.icon-twitter', function () {
          var that = $(this);
          if (!secondClick) {
            setTimeout(function () {
              secondClick = true;
              that.click();
            }, duration);
            return false;
          }
        });

      });

    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name plugin interchange image
 *  @description change image follow resize screen
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'interchange',
    outerDims = {
      width: $(window).width()
    },
    urlDefault = '';

  var getImage = function (options) {
    var imgSrc = '';
    var regularChar = new RegExp('\'', 'g'),
      lenOpt;
    options = options.replace(regularChar, '');
    options = options.substring(1, options.length - 1);
    options = options.split(',');
    lenOpt = options.length;
    if (options != null && lenOpt > 0) {
      // Screen default
      imgSrc = options[0];

      // Extra small devices
      if (768 > outerDims.width) {
        imgSrc = options[0];
      } else if (768 <= outerDims.width && 1024 > outerDims.width) // Small devices Tablets
      {
        if (lenOpt > 2) {
          imgSrc = options[1];
        }
      } else if (1024 <= outerDims.width) //Medium devices
      {
        if (lenOpt === 2) {
          imgSrc = options[1];
        } else if (lenOpt === 3) {
          imgSrc = options[2];
        }
      }
    }
    return imgSrc;
  };

  var setImage = function (element, options) {
    var imgSrc = getImage(options);
    if (element.is('img')) {
      var lazy = element.data('interchange-lazyload');
      if (lazy) {
        if (urlDefault !== imgSrc) {
          element.attr('data-original', imgSrc);
          urlDefault = imgSrc;
        } else {
          element.attr('data-original', urlDefault);
        }
      } else {
        if (urlDefault !== imgSrc) {
          element.attr('src', imgSrc);
          urlDefault = imgSrc;
        } else {
          element.attr('src', urlDefault);
        }
      }
    } else {
      var backgroundImg = 'url(' + imgSrc + ')';
      if (urlDefault !== backgroundImg) {
        element.css('background-image', backgroundImg);
        urlDefault = backgroundImg;
      }
    }
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,
        el = that.element,
        options = that.options.interchange;
      // Call function set image by element
      setImage(el, options);
      // Set resize on screen
      $(window).on('resize', function () {
        outerDims.width = $(window).width();
        setImage(el, options);
      });
    },
    destroy: function () {
      // remove events
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

(function ($) {

  jQuery.fn.rater = function (options) {
    var opts = $.extend({}, $.fn.rater.defaults, options);
    return this.each(function () {
      var $this = $(this);
      var $on = $this.find('.ui-rater-stars-on');
      var $off = $this.find('.ui-rater-stars-off');
      opts.size = $on.height();
      if (typeof (opts.rating) === 'undefined') { opts.rating = $on.width() / opts.size; }
      if (typeof (opts.id) === 'undefined') { opts.id = $this.attr('data-id'); }

      $off.mousemove(function (e) {
        var left = e.clientX - $off.offset().left;
        var width = $off.width() - ($off.width() - left);
        width = Math.ceil(width / (opts.size / opts.step)) * opts.size / opts.step;
        $on.width(width - 5);
      }).hover(function () { $on.addClass('ui-rater-stars-hover'); }, function () {
        $on.removeClass('ui-rater-stars-hover'); Math.ceil($on.width(opts.rating * opts.size));
      }).click(function () {
        var r = Math.ceil($on.width() / $off.width() * (opts.units * opts.step)) / opts.step;
        $off.unbind('click').unbind('mousemove').unbind('mouseenter').unbind('mouseleave');
        $off.css('cursor', 'default'); $on.css('cursor', 'default');
        $.fn.rater.rate($this, opts, r);
      }).css('cursor', 'pointer'); $on.css('cursor', 'pointer');
    });
  };

  jQuery.fn.rater.defaults = {
    postHref: location.href,
    units: 5,
    step: 1
  };

  jQuery.fn.rater.rate = function ($this, opts, rating) {
    var $on = $this.find('.ui-rater-stars-on');
    var $off = $this.find('.ui-rater-stars-off');
    $off.fadeTo(600, 0.4, function () {
      $.ajax({
        url: opts.postHref,
        type: 'POST',
        data: 'id=' + opts.id + '&rating=' + rating,
        complete: function (req) {
          if (req.status === 200) { //success
            opts.rating = parseFloat(req.responseText);
            $off.fadeTo(600, 0.1, function () {
              $on.removeClass('ui-rater-stars-hover').width(opts.rating * opts.size);
              $off.fadeTo(600, 1);
            });
          } else { //failure
            $on.removeClass('ui-rater-stars-hover').width(opts.rating * opts.size);
            $this.rater(opts);
            $off.fadeTo(2200, 1);
          }
        }
      });
    });
  };
})(jQuery);

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'lart',
    doc = $(document),
    win = $(window),
    footerTop,
    elsMaps,
    flagMouseWheel = false,
    curBlockItem = -1,
    lastPosition = 0,
    flagMouseUp = false;

  function getMaps() {
    var els = $('[data-lart]'),
      elsChilds = els.find('[data-art-item]'),

      result = {
        'listEl': [],
        'mapTop': [],
        'maps': []
      };

    if (elsChilds.length) {
      var artTop = els.offset().top;
      elsChilds.each(function () {

        var _self = $(this);

        result.listEl.push(_self);
        result.maps.push(_self.offset().top - artTop);
        result.mapTop.push(_self.offset().top);
      });

    }
    return result;
  }

  var openPopup = function (el, id) {
    el.find('.block-art-' + id).addClass('active');
  };

  var initReel = function (el, val) {
    el.trigger('frameChange', [undefined, val]);
  };

  var initCurvedLine = function (elReel, elPopup, elm, elmMask, width, height, numId, duration, subW, flag) {

    var line,
      finalLine,
      flagMouse = true,
      pathSrc = 'assets/images/',
      arrowLeft = pathSrc + 'art-arrow-left.png',
      arrowRight = pathSrc + 'art-arrow-right.png',
      arrowAninLeft = pathSrc + 'art-arrow-anin-left.png',
      arrowAninRight = pathSrc + 'art-arrow-anin-right.png',
      arrowW = 52,
      arrowH = 52,
      arrImg = (flag === 3 ? arrowLeft : arrowRight);

    var initArrow = function (canvas, ptAnimate, width, height, alpha, arrowLeft, arrowRight, cls, flag) {
      var arrow = canvas.image(arrowRight, ptAnimate.x - (width / 2), ptAnimate.y - (height / 2), width, height).attr({
        stroke: '#fff',
        fill: 'transparent',
        'class': cls,
        transform: 'r' + ptAnimate.alpha
      });

      if (flag !== 1) {
        if (ptAnimate.alpha < alpha) {
          arrow.attr({ src: arrowLeft });
        } else {
          arrow.attr({ src: arrowRight });
        }
      }

    };

    var animateLine = function (canvas, colorNumber, pathString, cb) {
      var elArt = $('.block-art-' + numId),
        sliderBlock = elArt.find('.round-slider-block');

      sliderBlock.find('.draw-mask')
        .attr('data-init', true);

      var arrowStatic = $('.block-art-' + numId).find('.arrow-ani-static');
      arrowStatic.removeClass('hidden');

      line = canvas.path(pathString).attr({
        stroke: colorNumber
      });

      var length = line.getTotalLength();

      $('path[fill*="none"]').animate({
        'to': 1
      }, {
          duration: duration,
          easing: 'easeOutQuint',
          step: function (pos, fx) {
            var offset = length * fx.pos;
            var subpath = line.getSubpath(0, offset);
            canvas.clear();

            var ptAnimate = line.getPointAtLength(offset);
            initArrow(canvas, ptAnimate, 11, 18, 360, arrowAninLeft, arrowAninRight, 'art-arrow', flag);

            finalLine = canvas.path(subpath).attr({
              stroke: colorNumber,
              'stroke-miterlimit': '25',
              'class': 'art-path'
            });
          },
          complete: function () {
            arrowStatic.addClass('hidden');
            $('.block-art-' + numId).find('.arrow-ani').removeClass('hidden');
            cb();
          }
        });

    };

    // Create path to be animated
    var canvas = new Raphael(elmMask, width, height),
      $elm = $('#' + elm),
      pathString = $elm.data('point'),
      max = $elm.data('max'),
      motionPath = $('.block-art-' + numId + ' #' + elmMask);


    animateLine(canvas, '#fff', pathString, function () {
      var html = $.trim($('.block-art-' + numId + ' #' + elm).html());
      if (html === '') {
        var l = 0,
          pt = line.getPointAtLength(l),
          totLen,
          searchDl = 1,
          elArt = $('.block-art-' + numId),
          $elmMask = $('#' + elmMask),
          elBlockSvg = $elmMask.find('svg');

        var cir = new Raphael(elm, width, height).image(arrImg, pt.x - (arrowW / 2), pt.y - (arrowH / 2), arrowW, arrowH).attr({
          stroke: '#fff',
          fill: 'transparent',
          'class': 'art-arrow hidden',
          transform: 'r' + pt.alpha
        });

        totLen = line.getTotalLength();

        var start = function () {
          // storing original coordinates
          this.ox = this.attr('x');
          this.oy = this.attr('y');
          this.attr({ opacity: 1 });
        };

        var dist = function (pt1, pt2) {
          var dx = pt1.x - pt2.x;
          var dy = pt1.y - pt2.y;
          return Math.sqrt(dx * dx + dy * dy);
        };

        var draggable = function () {
          return false;
        };

        var gradSearch = function (l0, pt) {

          l0 = l0 + totLen;
          var l1 = l0,
            dist0 = dist(line.getPointAtLength(l0 % totLen), pt),
            dist1,
            searchDir;

          if (dist(line.getPointAtLength((l0 - searchDl) % totLen), pt) >
            dist(line.getPointAtLength((l0 + searchDl) % totLen), pt)) {
            searchDir = searchDl;
          } else {
            searchDir = -searchDl;
          }

          l1 += searchDir;
          dist1 = dist(line.getPointAtLength(l1 % totLen), pt);
          while (dist1 < dist0) {
            dist0 = dist1;
            l1 += searchDir;
            dist1 = dist(line.getPointAtLength(l1 % totLen), pt);
          }
          l1 -= searchDir;

          return (l1 % totLen);
        };

        var move = function (dx, dy) {

          var tmpPt = {
            x: this.ox + dx + (arrowW / 2),
            y: this.oy + dy + (arrowH / 2)
          };

          // move will be called with dx and dy
          l = gradSearch(l, tmpPt);
          pt = line.getPointAtLength(l);
          this.attr({ x: pt.x - (arrowW / 2), y: pt.y - (arrowH / 2), transform: 'r' + pt.alpha });

          var value,
            pathWidth,
            arrPath = pathString.split(',');

          if (flag === 1) {

            pathWidth = arrPath[arrPath.length - 1];
            value = Math.round((pt.y - (arrowH / 2)) * max / (pathWidth - (arrowH / 2)) - subW);


            elBlockSvg.css('margin-top', -pt.y);
            $elmMask.css('top', pt.y);

          } else {

            if (pt.alpha < 360) {
              this.attr({ src: arrowLeft });
            } else {
              this.attr({ src: arrowRight });
            }

            pathWidth = arrPath[arrPath.length - 2];
            value = Math.round((pt.x - (arrowW / 2)) * max / (pathWidth - (arrowH / 2)) - subW);

            elBlockSvg.css('margin-left', -pt.x);
            $elmMask.css('left', pt.x);

          }

          if (value >= max - subW) {

            var sliderBlock = elArt.find('.round-slider-block');
            flagMouse = false;
            openPopup(elPopup, numId);

            cir.drag(draggable);

            sliderBlock.find('.draw-mask')
              .html('')
              .removeClass('art-action')
              .attr('data-init', true);

            sliderBlock.find('.draw-curve').html('');
            motionPath.removeAttr('style');

          } else {

            if (value > 0) {
              initReel(elReel, value);
            }

          }

        };
        var p,
          requestId;
        var animDash = function () {

          var offset = 500;

          var offsetMe = function () {
            if (offset < 0) {
              offset = 500;
            }
            p.style.strokeDashoffset = offset;
            offset--;
            requestId = requestAnimationFrame(offsetMe);
          };

          offsetMe();
        };

        var mouseover = function () {

          motionPath.find('path').attr('class', 'art-path-action art-path');
          motionPath.find('image').attr('class', 'art-arrow-animate');

          p = document.querySelector('.art-path-action');
          animDash();
        };

        var mouseout = function () {
          motionPath.find('path').attr('class', 'art-path');
          motionPath.find('image').attr('class', 'art-arrow');
          cancelAnimationFrame(requestId);
        };

        var up = function () {
          this.attr({ opacity: 1 });
          if (!flagMouse) {
            return false;
          }
          var that = this,
            step = 2;

          var timer = setInterval(function () {

            if ((l - step + 1) < 0) {
              l = 0;
              elArt.find('.arrow-ani').removeClass('hidden');
              elArt.find('#' + elm + ' image').attr('class', 'art-arrow hidden');
              initReel(elReel, 1);
              clearInterval(timer);
              return;
            }

            l = l - step;
            if (l >= 0) {
              pt = line.getPointAtLength(l);

              that.attr({ x: pt.x - (arrowW / 2), y: pt.y - (arrowH / 2), transform: 'r' + pt.alpha });
              var value,
                pathWidth,
                arrPath = pathString.split(',');

              if (flag !== 1) {

                elBlockSvg.css('margin-left', -pt.x);
                $elmMask.css('left', pt.x);

                if (pt.alpha < 360) {
                  that.attr({ src: arrowLeft });
                } else {
                  that.attr({ src: arrowRight });
                }

                pathWidth = arrPath[arrPath.length - 2];
                value = Math.round((pt.x - (arrowW / 2)) * max / (pathWidth - (arrowH / 2)) - subW);

              } else {

                elBlockSvg.css('margin-top', -pt.y);
                $elmMask.css('top', pt.y);

                pathWidth = arrPath[arrPath.length - 1];
                value = Math.round((pt.y - (arrowH / 2)) * max / (pathWidth - (arrowH / 2)) - subW);

              }
              initReel(elReel, value);
            }
          }, 5);

        };

        var mousedown = function () {
          $elm.find('image').attr('art-arrow draw-curve-option');
          setTimeout(function () {
            elArt.find('.arrow-ani').addClass('hidden');
            $elm.find('image').attr('class', 'art-arrow');
          }, 200);
        };

        cir.drag(move, start, up)
          .mouseover(mouseover)
          .mouseout(mouseout);

        var arrowAni = $('.block-art-' + numId).find('.arrow-ani');
        arrowAni.mouseover(function () {
          mousedown();
        });
      }

    });

  };

  var initAiguisezCanvas = function (el) {
    var aiguisez = $('.reel-aiguisez');
    initCurvedLine(aiguisez, el, 'draw-curve-aiguisez', 'draw-mask-aiguisez', 620, 420, '1', 1000, 6);
  };

  var initDesossageCanvas = function (el) {
    var desossage = $('.reel-desossage');
    initCurvedLine(desossage, el, 'draw-curve-desossage', 'draw-mask-desossage', 620, 420, '2', 1000, 7, 1);
  };

  var initDecouennezCanvas = function (el) {
    var decouennez = $('.reel-decouennez');
    initCurvedLine(decouennez, el, 'draw-curve-decouennez', 'draw-mask-decouennez', 620, 420, '3', 1500, 2, 3);
  };

  var initTranchezCanvas = function (el) {
    var tranchez = $('.reel-tranchez');
    initCurvedLine(tranchez, el, 'draw-curve-tranchez', 'draw-mask-tranchez', 820, 420, '4', 1500, 5);
  };

  var closePopup = function (el, elSlide, artItem) {

    if (typeof elSlide !== 'undefined' && !Modernizr.touch) {
      var elm = $('.reel-' + elSlide),
        elmDraw = el.find('.block-art-' + artItem + ' .draw-curve'),
        maxVal = elmDraw.data('max') - 1,
        delayTime = elmDraw.data('delay'),
        controlTime;

      controlTime = setInterval(function () {
        initReel(elm, maxVal--);
        if (maxVal === 0) {
          clearInterval(controlTime);
        }
      }, delayTime);

      switch (artItem) {
        case 1:
          initAiguisezCanvas(el);
          break;
        case 2:
          initDesossageCanvas(el);
          break;
        case 3:
          initDecouennezCanvas(el);
          break;
        case 4:
          initTranchezCanvas(el);
          break;
      }

    }

    el.find('.block-art-' + artItem).removeClass('active');
  };

  var initHeight = function (el, artItem, winHeight, winWidth) {

    $.each(artItem, function () {
      var _this = $(this);

      _this.css({ 'width': winWidth + 'px' });
      _this.find('img.reel').attr('height', winHeight + 'px');

    });

    var artItemBg = el.find('[data-art-bg="true"]');

    $.each(artItemBg, function () {
      var _this = $(this),
        html = '<div class="reel"></div>';

      if (_this.find('.reel').length < 1) {
        _this.find('.reel').css({ 'height': winHeight + 'px' });
        _this
          .prepend(html)
          .css({ 'width': winWidth + 'px', 'height': winHeight + 'px', 'overflow': 'hidden' });
      }
    });

    footerTop = $('.main-footer').offset().top;
    // elsMaps = getMaps();
  };

  var updateFlagMouseWhell = function () {
    flagMouseWheel = false;
  };

  var movePosition = function (isDown, artItem, elsMaps, cookieHeight1, speed) {

    flagMouseWheel = true;

    var position,
      top;

    if (isDown) {

      if (curBlockItem < artItem.length - 1) {

        if (curBlockItem === -1) {
          position = elsMaps.mapTop[0];
          curBlockItem = 0;
        } else {
          curBlockItem += 1;
          position = elsMaps.mapTop[curBlockItem];
        }

        top = position - cookieHeight1;
        $('body,html').stop().animate({ 'scrollTop': top }, speed).promise().done(updateFlagMouseWhell);


      } else {

        curBlockItem = artItem.length;
        $('body,html').stop().animate({ 'scrollTop': footerTop }, speed).promise().done(updateFlagMouseWhell);

      }

    } else {

      if (curBlockItem === 0) {
        $('body,html').stop().animate({ 'scrollTop': 0 }, speed).promise().done(updateFlagMouseWhell);
        curBlockItem -= 1;

      } else {

        curBlockItem -= 1;

        position = elsMaps.mapTop[curBlockItem];
        top = position - cookieHeight1;
        $('body,html').stop().animate({ 'scrollTop': top }, speed).promise().done(updateFlagMouseWhell);
      }
    }

  };

  var clickedOnScrollbar = function (mouseX) {
    if ($(window).outerWidth() <= mouseX) {
      return true;
    }
  };

  var redirectFallback = function (el, winWidth) {
    if (winWidth < 1024) {
      document.location.href = el.data('fallback');
    }
  };


  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,
        el = that.element,
        elDots = el.find('.art-dots-block'),
        speed = el.data('speed'),
        elOffsetTop = el.offset().top,
        elTop = elOffsetTop / 3;

      if (!Modernizr.touch) {
        $('body,html').stop().animate({ 'scrollTop': 0 }, speed / 3).promise().done(updateFlagMouseWhell);
        curBlockItem = -1;


        el.find('[data-art-reel]').removeAttr('style');


        var pathSrc = 'assets/images/',
          arrowLeft = pathSrc + 'art-arrow-left.png',
          arrowRight = pathSrc + 'art-arrow-right.png',
          arrowAninLeft = pathSrc + 'art-arrow-anin-left.png',
          arrowAninRight = pathSrc + 'art-arrow-anin-right.png',
          imgIcon = [arrowLeft, arrowRight, arrowAninLeft, arrowAninRight],
          winHeight = win.height(),
          winWidth = win.width(),
          topCb = $('.come-back-block').offset().top,
          artItem = el.find('[data-art-item]'),
          cookieHeight1 = $('.cookie-policy').height(),
          timeOut = 600;

        initHeight(el, artItem, winHeight, winWidth);
        redirectFallback(el, winWidth);
        win.on('resize', function () {
          redirectFallback(el, winWidth);
          el.find('[data-art-reel]').removeAttr('style');
          winWidth = win.width();
          winHeight = win.height();
          initHeight(el, artItem, winHeight, winWidth);

        });

        $.each(imgIcon, function (index, val) {
          var heavyImage = new Image();
          heavyImage.src = val;
        });


        doc.on('mousewheel DOMMouseScroll', function (e) {
          e.preventDefault();
          elsMaps = getMaps();
          var isDown;
          if (e.type === 'mousewheel') {
            isDown = e.originalEvent.deltaY > 0 ? true : false;
          } else if (e.type === 'DOMMouseScroll') {
            isDown = e.originalEvent.detail > 0 ? true : false;
          }

          if (!flagMouseWheel) {
            movePosition(isDown, artItem, elsMaps, cookieHeight1, speed);
          }

        });

        doc.mousedown(function (e) {
          if ($(window).outerWidth() <= e.clientX) {
            flagMouseUp = true;
          }
        });

        doc.mouseup(function (e) {

          if (clickedOnScrollbar(e.clientX) || flagMouseUp) {
            elsMaps = getMaps();
            var length = elsMaps.maps.length,
              winTop = win.scrollTop();

            if (winTop >= elOffsetTop / 2 && footerTop > winTop) {
              for (var i = length; i >= 1; i--) {
                if (elsMaps.mapTop[i - 1] - (elsMaps.listEl[i - 1].height() / 2) <= winTop) {
                  curBlockItem = i - 1;
                  break;
                }
              }
              lastPosition = winTop;
              var position = elsMaps.mapTop[curBlockItem],
                top = position - cookieHeight1;
              $('body,html').stop().animate({ 'scrollTop': top }, speed).promise().done(updateFlagMouseWhell);
              curBlockItem += 1;

            }

            if (winTop < elOffsetTop / 2) {
              curBlockItem = 0;
            }

            if (footerTop < winTop) {
              curBlockItem = length;
            }
            flagMouseUp = false;
          }
        });

        doc.on('scroll.' + pluginName, function () {
          elsMaps = getMaps();
          var length = elsMaps.maps.length,
            winTop = win.scrollTop(),
            scrollTop = winTop + elTop,
            lastBlock = $('.block-art-7').offset().top;

          if (winTop === 0) {
            curBlockItem = -1;
          }

          if (elOffsetTop > scrollTop) {

            elDots.removeClass('list-block-animation');

          } else {

            elDots.addClass('list-block-animation');

          }

          if (winHeight <= 600) {
            if (winTop === 0) {
              elDots.css('top', (winHeight - topCb) + 'px');
            } else {
              elDots.removeAttr('style');
            }
          }

          if (winTop > elTop && winTop > 0) {
            elDots
              .addClass('list-block-fixed')
              .removeClass('list-block-abs');
          } else {
            elDots.removeClass('list-block-abs list-block-fixed');
          }

          if (scrollTop >= lastBlock + elTop) {
            elDots
              .addClass('list-block-abs')
              .removeClass('list-block-fixed');


          }

          for (var i = 1; i <= length; i++) {

            if (elsMaps.maps[i - 1] <= scrollTop - 230) {


              elDots.find('.active').removeClass('active');
              elDots.find('li:nth-child(' + i + ')').addClass('active');
              if (!elsMaps.listEl[i - 1].hasClass('animation')) {
                elsMaps.listEl[i - 1].addClass('animation');
              }

              if (i === 5) {
                elDots.addClass('special-block');
              } else {
                elDots.removeClass('special-block');
              }

              switch (i) {
                case 1:
                  var elmDraw1 = el.find('.block-art-1 .draw-mask');
                  if (elmDraw1.html() === '' && elmDraw1.data('init') !== true) {
                    elmDraw1.attr('data-init', true);
                    setTimeout(function () { initAiguisezCanvas(el); }, timeOut);
                  }
                  break;
                case 2:
                  var elmDraw2 = el.find('.block-art-2 .draw-mask');
                  if (elmDraw2.html() === '' && elmDraw2.data('init') !== true) {
                    elmDraw2.attr('data-init', true);
                    setTimeout(function () { initDesossageCanvas(el); }, timeOut);
                  }
                  break;
                case 3:
                  var elmDraw3 = el.find('.block-art-3 .draw-mask');
                  if (elmDraw3.html() === '' && elmDraw3.data('init') !== true) {
                    elmDraw3.attr('data-init', true);
                    setTimeout(function () { initDecouennezCanvas(el); }, timeOut);
                  }
                  break;
                case 4:
                  var elmDraw4 = el.find('.block-art-4 .draw-mask');
                  if (elmDraw4.html() === '' && elmDraw4.data('init') !== true) {
                    elmDraw4.attr('data-init', true);
                    setTimeout(function () { initTranchezCanvas(el); }, timeOut);
                  }
                  break;
              }
            }
          }



        }).trigger('scroll.' + pluginName);



        var elmCookie = $('.cookie-policy'),
          cookieHeight = elmCookie.height();
        if (cookieHeight > 0) {
          elDots.addClass('art-dots-cookie');
        } else {
          elDots.removeClass('art-dots-cookie');
        }


        elmCookie.find('.btn').on('click', function () {
          elDots.removeClass('art-dots-cookie');
        });


        elDots.on('click.' + pluginName, 'li', function () {

          var $this = $(this),
            index = $this.index(),
            cookieHeight = $('.cookie-policy').height(),
            top = el.find('.block-art:nth-child(' + (index + 1) + ')').offset().top - cookieHeight;

          curBlockItem = index;

          $('body,html').stop().animate({ 'scrollTop': top }, speed).promise().done(updateFlagMouseWhell);

        });


      } else {
        el.find('.reel')
          .addClass('hidden')
          .removeClass('reel');
      }

      el.on('click.' + pluginName, '.view-more', function (e) {
        e.preventDefault();
        var id = $(this).data('art-id');
        openPopup(el, id);
      });


      el.on('click.' + pluginName, '.icon-close-1', function (e) {
        e.preventDefault();
        var $this = $(this),
          elSlide = $this.data('art-slider'),
          artItem = $this.data('art-item-id');

        closePopup(el, elSlide, artItem);
      });

    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'menu',
    classHide = 'hide',
    classOpen = 'open',
    classHidden = 'hidden',
    menuBlock,
    iconMenuClose,
    iconMenu,
    profileBlock,
    iconAccount,
    iconAccountClose,
    body = $('body'),
    html = $('html'),
    bgMenu = $('.bg-menu-mo'),
    topHeader = $('.top-header'),
    bannerSlider = $('[data-slider]');
  var getHeightMenu = function (cls) {

    var wHeight = $(window).height();
    var cHeight = topHeader.height() + $('.' + cls).height();
    if (wHeight > cHeight) {
      bgMenu.css('height', wHeight + 'px');
    } else {
      bgMenu.css('height', cHeight + 'px');
    }
  };
  var getHeightProfile = function (cls) {
    var cHeight = topHeader.height() + $('.' + cls).height() - 50;
    bgMenu.css('height', cHeight + 'px');
  };
  var openMenu = function (ele) {
    $('.popup, .popup-1').removeClass('open-popup').removeClass('fadeIn').addClass('hide-popup');
    $('[data-checkbox]')['checkbox']('reItem');
    body.addClass('show-menu').removeClass('show-popup').removeClass('custom-mb');
    $('main').addClass('open-main').removeClass('hide-main');
    ele.addClass(classOpen);
    menuBlock.removeClass(classHide);
    iconMenuClose.removeClass(classHidden);
    iconMenu.addClass(classHidden);
    setTimeout(function () {
      getHeightMenu('menu-block');
    }, 100);
    html.removeClass('show-popup');
    bannerSlider['slider']('pauseBanner');
  };

  var closeMenu = function (ele) {
    body.removeClass('show-menu');
    ele.removeClass(classOpen);
    menuBlock.addClass(classHide);
    iconMenuClose.addClass(classHidden);
    iconMenu.removeClass(classHidden);
    bannerSlider['slider']('playBanner');
  };

  var openProfile = function (ele) {
    $('[data-checkbox]')['checkbox']('reItem');
    body.addClass('show-menu');
    ele.addClass(classOpen);
    profileBlock.removeClass(classHide);
    iconAccountClose.removeClass(classHidden);
    iconAccount.addClass(classHidden);
    getHeightProfile('profile-block');
    html.removeClass('show-popup');
    bannerSlider['slider']('pauseBanner');
  };

  var closeProfile = function (ele) {
    body.removeClass('show-menu');
    ele.removeClass(classOpen);
    profileBlock.addClass(classHide);
    iconAccountClose.addClass(classHidden);
    iconAccount.removeClass(classHidden);
    bannerSlider['slider']('playBanner');
  };
  var initPortraitMenu = function (ele, options) {
    menuBlock = ele.find(options.menuBlock);
    iconMenuClose = ele.find(options.navBar + ' ' + options.iconClose);
    iconMenu = ele.find(options.iconMenu);
    profileBlock = ele.find(options.profileBlock);
    iconAccount = ele.find(options.iconAccount);
    iconAccountClose = ele.find(options.accountBar + ' ' + options.iconClose);
    var images = bgMenu.attr('data-image');
    images = images.split(',');
    ele.on('touchstart.' + pluginName, options.navBar, function () {
      if (!iconMenu.hasClass(classHidden)) {
        bgMenu.removeClass('style-2');
        if (images[0] !== '') {
          bgMenu.css('background-image', 'url(' + images[0] + ')');
        } else {
          bgMenu.css('background-image', 'none');
        }
        bgMenu.addClass('style-1');
      }
      else {
        bgMenu.removeClass('style-1');
      }
      if (ele.hasClass('open')) {
        if (profileBlock.hasClass('hide')) {
          closeMenu(ele);
        } else {
          closeProfile(ele);
          openMenu(ele);
        }
      } else {
        openMenu(ele);
        profileBlock.addClass('hide');
      }
    });
    ele.on('touchstart.' + pluginName, options.accountBar, function () {
      if ($(this).parent().hasClass('login')) {
        if (!iconAccount.hasClass(classHidden)) {
          bgMenu.removeClass('style-1');
          if (images[1] !== '') {
            bgMenu.css('background-image', 'url(' + images[1] + ')');
          }
          else {
            bgMenu.css('background-image', 'none');
          }
          bgMenu.addClass('style-2');
        }
        else {
          bgMenu.removeClass('style-2');
        }
        if (ele.hasClass('open')) {
          if (menuBlock.hasClass('hide')) {
            closeProfile(ele);
          } else {
            closeMenu(ele);
            openProfile(ele);
          }
        } else {
          openProfile(ele);
          menuBlock.addClass('hide');
        }
      } else {
        closeMenu(ele);
      }

    });
  };

  var initDesktopMenu = function (ele) {
    ele.find('.has-sub > a, span.icon-arrow-3').hover(function () {
      $(this).closest('.has-sub').addClass('focus');
    }, function () {
      $(this).closest('.has-sub').removeClass('focus');
    });
    ele.find('.has-sub .sub-menu').hover(function () {
      $(this).closest('.has-sub').addClass('focus');
    }, function () {
      $(this).closest('.has-sub').removeClass('focus');
    });
  };

  var initLandscapeMenu = function (ele) {
    ele.find('span.icon-arrow-3').on('click.' + pluginName, function () {
      var that = $(this);
      var containerSub = that.closest('.has-sub');
      containerSub.addClass('focus');
      $(document).on('click.' + pluginName, function (e) {
        if (!that.is(e.target)) {
          ele.find('.has-sub').removeClass('focus');
          $(document).off('click.' + pluginName);
        }
      });
    });

  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,
        options = that.options;
      if (!html.hasClass('desktop') || html.hasClass('portrait')) {
        initPortraitMenu(that.element, options);
      } else if (html.hasClass('tablet')) {
        initLandscapeMenu(that.element);
      } else {
        initDesktopMenu(that.element);
      }
      $(window).on('orientationchange', function () {
        $('header').removeClass('open');
        $('.icon-menu, .icon-account').removeClass('hidden');
        $('.icon-close').addClass('hidden');
        $('.menu-block, .profile-block').removeClass('hide');
        body.removeClass('show-menu');
      });
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    navBar: '.icon-navbar',
    accountBar: '.account-1',
    menuBlock: '.menu-block',
    iconClose: '.icon-close',
    iconMenu: '.icon-menu',
    profileBlock: '.profile-block',
    iconAccount: '.icon-account',
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'quizz';
  var flag = false;
  var totalPoint = 0,
    currentQuestion = 1,
    correctQuestion = 0,
    delayTime = 0;
  var objQuestions,
    listNumber = ['A', 'B', 'C', 'D', 'E', 'F'];

  var startProgressBar = function (opts) {
    $(opts.elementOverlay).fadeIn(50);
    $(opts.elementProgress).find('.progress-bar').css('width', ' 0%');
    $(opts.elementProgress).fadeIn(50);
  };

  var endProgressBar = function (opts) {
    $(opts.elementProgress).delay(delayTime).fadeOut(100);
    $(opts.elementOverlay).delay(delayTime).fadeOut(150);
  };

  var changeTextButton = function ($this) {
    var dataDefault = $($this).text();
    var dataText = $($this).attr('data-text');
    $($this).find('span').text(dataText);
    $($this).attr('title', dataText);
    $($this).attr('data-text', dataDefault);
  };

  var sendResponse = function (el, opts, $this) {
    if (!el.find('input:radio[name=answer-item]').is(':checked')) {
      el.find('.message-block').fadeIn();
      return false;
    }
    var questionID = $.trim($('.question-name').attr('data-id'));
    var responseID = $.trim(el.find('input:radio[name=answer-item]:checked').val());
    startProgressBar(opts);
    var url = opts.hrefQuestion;
    var custom = el.data('custom-url');
    if (custom !== '') {
      url = custom;
    }

    $.ajax({
      url: url,
      data: { questionID: questionID, responseID: responseID },
      success: function (response) {
        el.find('.answer-label').removeClass('checked correct incorrect');
        if (response !== null) {
          if (parseInt(response.responseRight) === parseInt(responseID)) {
            el.find('.answer-' + responseID).addClass('correct');
            correctQuestion++;
          } else {
            el.find('.answer-' + response.responseRight).addClass('correct');
            el.find('.answer-' + responseID).addClass('incorrect');
          }
          totalPoint += response.point;
          endProgressBar(opts);
          changeTextButton($this);
          flag = true;
        }
        if (currentQuestion >= objQuestions.length) {
          var dataText = $($this).attr('data-text-final');
          $($this).find('span').text(dataText);
        }
      },
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Download progress
        xhr.addEventListener('progress', function (evt) {
          var total = evt.total;
          if (total === 0) { total = evt.loaded; }
          if (total < 10000) { delayTime = 500; }
          var percentComplete = 100 * evt.loaded / total;
          $(opts.elementProgress).find('.progress-bar').css('width', percentComplete + '%');
        }, false);
        return xhr;
      },
      error: function () {
        //Code here
        endProgressBar(opts);
      }
    });
  };

  var nextQuestion = function (el, opts, $this) {
    if (objQuestions.length > 0 && currentQuestion < objQuestions.length) {
      if (typeof ($this) !== 'undefined') {
        startProgressBar(opts);
        changeTextButton($this);
        flag = false;
        currentQuestion++;
      } else {
        el.find('.quizz-du-mois-block').fadeIn();
      }

      el.find('.question-name').text(objQuestions[currentQuestion - 1].questionName);
      el.find('.question-name').attr('data-id', objQuestions[currentQuestion - 1].questionID);
      var responses = objQuestions[currentQuestion - 1].response;
      var html = '';
      for (var i = 0, l = responses.length; i < l; i++) {
        html += '<div class="answer-item"><input type="radio" class="answer" value="' + responses[i].responseID + '" id="answer-item-' + responses[i].responseID + '" name="answer-item"><label class="answer-label answer-' + responses[i].responseID + '" for="answer-item-' + responses[i].responseID + '"><span class="answer-number">' + listNumber[i] + '</span><span class="answer-name">' + responses[i].responseName + '</span></label></div>';
      }
      el.find('.answer-block').html(html);

      el.find('.heading-style-1 span:first-child').text((currentQuestion.toString().length < 2 ? ' 0' + currentQuestion : ' ' + currentQuestion));
      endProgressBar(opts);

    } else if (currentQuestion >= objQuestions.length) {
      el.find('#point').val(totalPoint);
      el.find('#correct').val(correctQuestion);
      el.find('#quizz-form').submit();
    }
  };

  var loadQuestion = function (el, opts) {
    startProgressBar(opts);
    var url = opts.hrefQuestion;
    var custom = el.data('question-url');
    if (custom !== '') {
      url = custom;
    }
    $.ajax({
      url: url,
      success: function (result) {
        objQuestions = result.questions;
        el.find('.heading-style-1 span:last-child').text((objQuestions.length < 10 ? '0' + objQuestions.length : objQuestions.length));
        nextQuestion(el, opts);
      },
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Download progress
        xhr.addEventListener('progress', function (evt) {
          var total = evt.total;
          if (total === 0) { total = evt.loaded; }
          if (total < 10000) { delayTime = 500; }
          var percentComplete = 100 * evt.loaded / total;
          $(opts.elementProgress).find('.progress-bar').css('width', percentComplete + '%');
        }, false);
        return xhr;
      },
      error: function () {
        //Code here
        endProgressBar(opts);
      }
    });
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;

      loadQuestion(that.element, that.options);

      that.element.on('click', '.btn-response', function () {
        (!flag) ? sendResponse(that.element, that.options, this) : nextQuestion(that.element, that.options, this);
        return false;
      });

      that.element.on('click', '.answer', function () {
        if (!flag) {
          that.element.find('.answer-label').removeClass('checked');
          that.element.find('.answer-' + $(this).val()).addClass('checked');
        }

        if (that.element.find('.message-block').css('display') === 'block') {
          that.element.find('.message-block').css('display', 'none');
        }
      });

    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    hrefQuestion: 'data/questions.json',
    hrefResponse: 'data/response.json',
    elementProgress: '.progress-quizz',
    elementOverlay: '.overlay'
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'moveelement';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      var winWidth = $(window).width();
      var scrollBarWidth = 0;
      var size = 1024;
      if (!Modernizr.touch) {
        scrollBarWidth = Site.getScrollBarWidth();
      }
      if (winWidth + scrollBarWidth < size) {
        that.element.detach().prependTo('.image-block');
      }
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'paging';
  var currenPage = 1;
  var delayProgressBar = 0;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  var recettesFicheOptions = {
    hrefPost: 'data/comments-block.html',
    elementBlock: '.comment-list',
    elementProgress: '.progress-paging',
    elementOverlay: '.overlay'
  };

  var articleExampleOptions = {
    hrefPost: 'data/comment-list-data.html',
    elementBlock: '.list-comment',
    elementProgress: '.progress-paging',
    elementOverlay: '.overlay'
  };

  var mesRecettesOptions = {
    hrefPost: 'data/mes-recettes-block.html',
    elementBlock: '.mes-items-block',
    elementProgress: '.progress-paging',
    elementOverlay: '.overlay'
  };

  var magazineArchivesOptions = {
    hrefPost: 'data/magazine-archives-block.html',
    elementBlock: '.archives-block',
    elementProgress: '.progress-paging',
    elementOverlay: '.overlay'
  };

  var startProgressBar = function (opts) {
    delayProgressBar = 0;
    $(opts.elementOverlay).fadeIn(50);
    $(opts.elementProgress).find('.progress-bar').css('width', ' 0%');
    $(opts.elementProgress).fadeIn(50);
  };

  var endProgressBar = function (opts) {
    $(opts.elementProgress).delay(delayProgressBar).fadeOut(100);
    $(opts.elementOverlay).fadeOut(150);
    if ($('.mes-block').length || $('.archives-block').length) {
      $('[data-interchange]')['interchange']();
    }
  };

  var drawPage = function (page, el) {

    el.children('li').removeClass('active');
    el.children('li').find('.page-btn').removeClass('active');

    var totalPage = parseInt(el.data('total-page'));
    var displayedPages = parseInt(el.data('displayed-pages'));
    var html = '',
      htmlEnd = '';

    if (el.data('page-control')) {
      // Generate Prev link
      if (page === 1) {
        html = '<li class="inactive"><a href="#" class="page-prev" title="Prev">Prev</a></li>';
      } else {
        html = '<li><a href="#" class="page-prev" title="Prev">Prev</a></li>';
      }

      // Generate Next link
      if (parseInt(page) < totalPage) {
        htmlEnd = '<li><a href="#" class="page-next" title="Next">Next</a></li>';
      } else {
        htmlEnd = '<li class="inactive"><a href="#" class="page-next" title="Next">Next</a></li>';
      }
    }

    if (parseInt(page) <= displayedPages - 1) {
      var end = (totalPage < displayedPages ? totalPage : displayedPages);
      for (var i = 1; i <= end; i++) {
        var active = '';
        if (i === parseInt(page)) { active = 'active'; }
        html += '<li class="' + active + '"><a href="#" class="page-btn ' + active + '" title="' + i + '">' + i + '</a></li>';
      }

      if ((parseInt(page) < totalPage - 2 && parseInt(page) >= displayedPages - 1) || totalPage > displayedPages) {
        html += '<li class="page-ellipse"><span class="ellipse">&hellip;</span></li>';
        html += '<li class=""><a href="#" class="page-btn" title="' + totalPage + '">' + totalPage + '</a></li>';
      }
    } else {
      html += '<li class=""><a href="#" class="page-btn" title="1">1</a></li>';
      html += '<li class="page-ellipse"><span class="ellipse">&hellip;</span></li>';
      for (var j = parseInt(page) - 2; j <= parseInt(page) + 2 && j <= totalPage; j++) {
        var active1 = '';
        if (j === parseInt(page)) {
          active1 = 'active';
        }
        html += '<li class="' + (j === (parseInt(page) - 2) || j === (parseInt(page) + 2) ? 'page-mobile ' : '') + active1 + '"><a href="#" class="page-btn ' + active1 + '" title="' + j + '">' + j + '</a></li>';
      }

      if (parseInt(page) < totalPage - 2) {
        html += '<li class="page-ellipse"><span class="ellipse">&hellip;</span></li>';
        html += '<li class=""><a href="#" class="page-btn" title="' + totalPage + '">' + totalPage + '</a></li>';
      }
    }
    el.html(html + htmlEnd);
    el.css('display', 'inline-block');
  };

  var goingPage = function (opts, el, page) {
    startProgressBar(opts);
    drawPage(page, el);

    var url = opts.hrefPost;
    var customUrl = el.data('custom-url');
    if (customUrl !== '' && customUrl !== 'undefined') {
      url = customUrl;
    }

    $.ajax({
      method: 'GET',
      url: url,
      data: 'page=' + page,
      success: function (result) {
        //Add class animation-out for old element
        $(opts.elementBlock + ' .animation').addClass('animation-out');

        setTimeout(function () {
          //Append new data
          $(opts.elementBlock).html(result);
          //forech new element
          $(opts.elementBlock).find('.recettes-row').each(function (i) {
            var that = $(this);
            //Settimeout add class .animation
            setTimeout(function () {
              that.addClass('animation');
            }, 100 + i * 200);

            //total time delay progress bar
            delayProgressBar += 100 + i * 200;
          });
          endProgressBar(opts);

          $('img.lazy').lazyload();

        }, 1000);
      },
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Download progress
        xhr.addEventListener('progress', function (evt) {
          var total = evt.total;
          if (total === 0) { total = evt.loaded; }
          var percentComplete = 100 * evt.loaded / total;
          $(opts.elementProgress).find('.progress-bar').css('width', percentComplete + '%');
        }, false);
        return xhr;
      },
      error: function () {
        //Code here
      }
    });
  };

  Plugin.prototype = {
    init: function () {
      var that = this;

      if ($('.recettes-fiche').length) {
        that.options = recettesFicheOptions;
      }
      if ($('.mes-block').length) {
        that.options = mesRecettesOptions;
      }
      if ($('.archives-block').length) {
        that.options = magazineArchivesOptions;
      }
      if ($('.article-comment').length) {
        that.options = articleExampleOptions;
      }
      //Draw list page
      drawPage(1, that.element);

      that.element.on('click', '.page-btn', function () {
        var page = $.trim($(this).text());
        currenPage = page;
        goingPage(that.options, that.element, page);
        return false;
      });
      that.element.on('click', '.page-prev', function () {
        if (parseInt(currenPage) <= 1) { return false; }
        currenPage = parseInt(currenPage) - 1;
        goingPage(that.options, that.element, currenPage);
        return false;
      });
      that.element.on('click', '.page-next', function () {
        var totalPage = that.element.data('total-page');
        if (parseInt(currenPage) >= totalPage) { return false; }
        currenPage = parseInt(currenPage) + 1;
        goingPage(that.options, that.element, currenPage);
        return false;
      });
    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    hrefPost: 'data/recettes-block.html',
    elementBlock: '.recettes-block',
    elementProgress: '.progress-paging',
    elementOverlay: '.overlay'
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'paralax';
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      if ($('html').hasClass('desktop')) {
        window.skrollr.init(that.options);
      }
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    forceHeight: false
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'popup-slider',
    Site = window.Site;
  var flag = true,
    flagResize = false;
  var posArr1 = [],
    sliderEle1,
    lastMove;
  var startY = 0;

  var disableTabindex = function (el) {
    el.find('.form-slider input, .form-slider select, .form-slider button').attr('tabindex', '-1');
    el.find('.form-slider .active input, .form-slider .active select, .form-slider .active button').removeAttr('tabindex');
    setTimeout(function () {
      $('iframe').attr('tabindex', '-1');
    }, 500);
  };

  var updateFlag = function () {
    flag = true;
  };


  var calculatePos = function (nextBlock, posArr, winHeight, sliderEle, dotsChild, el) {
    var nextIndex = nextBlock.index(),
      nextPos = posArr1[nextIndex],
      checkHeight = (winHeight - nextBlock.height()) / 2,
      marginTop = nextPos + parseInt(nextBlock.css('padding-top'));

    el.find('.form-slider .item').removeClass('active');
    el.find('.form-slider .item:nth(' + nextIndex + ')').addClass('active');

    if (nextIndex === 0) {
      el.find('.slider-popup').addClass('first-step');
    } else if (el.find('.first-step').length) {
      el.find('.slider-popup').removeClass('first-step');
    }

    dotsChild.removeClass('active');
    dotsChild.eq(nextIndex).addClass('active');
    if (checkHeight <= 0 || !nextIndex) {
      checkHeight = 0;
    }

    if (!nextIndex) {
      marginTop = 0;
    }

    marginTop -= checkHeight;

    if (nextIndex < posArr1.length) {
      flag = false;

      if (!Modernizr.touch) {
        sliderEle1.animate({
          'margin-top': -marginTop
        }, 100).promise().done(updateFlag);
        disableTabindex(el);
      } else {
        // sliderEle1.css('margin-top', -marginTop);
        sliderEle1.animate({
          'margin-top': -marginTop
        }, 90, 'linear').promise().done(updateFlag);
        flag = true;
        disableTabindex(el);
      }
    }
    if (nextIndex === posArr1.length - 1 && !Modernizr.touch) {
      flag = true;
    }

  };

  function PopupSlider(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  PopupSlider.prototype = {
    init: function () {
      var that = this,
        el = that.element,
        dotsEle = el.find('[data-dots-slider]'),
        dotsChild,
        prevBtn = el.find('[data-prev-arrow]'),
        nextBtn = el.find('[data-next-arrow]'),
        closeBtn = el.find('[data-close-slider]'),
        sliderEle = el.find('[data-slider-block]'),
        sliderChild = sliderEle.children(),
        currBlock = sliderChild.eq(0),
        win = $(window),
        winHeight = win.height(),
        posArr = [],
        dotsHTML = '',
        lastWidth = win.width(),
        scrollEle = $('html, body');

      el.find('.slider-popup').addClass('first-step');
      el.find('.form-slider .item:nth(0)').addClass('active');

      disableTabindex(el);

      if (Site.viewportWidth() < 768) {
        return false;
      }

      scrollEle.scrollTop(0);

      sliderChild.each(function (idx, ele) {
        var self = $(ele);

        posArr.push(self.offset().top);

        //posArr1.push(self.offset().top);

        dotsHTML += '<li><button type="button" name="item-' + idx + '"></button></li>';
      });

      // Init dots
      dotsEle.html(dotsHTML);
      dotsChild = dotsEle.children();
      dotsChild.eq(0).addClass('active');

      // Next Arrow
      nextBtn.on('click.' + pluginName, function (e) {
        e.preventDefault();

        if (flagResize) {
          currBlock = sliderChild.eq(0);
          flagResize = false;
        }

        var nextBlock = currBlock.next();

        if (nextBlock.length) {
          calculatePos(nextBlock, posArr, winHeight, sliderEle, dotsChild, el);

          currBlock = nextBlock;
          el.trigger('afterChange.' + pluginName);

        }
      });

      // Prev Arrow
      prevBtn.on('click.' + pluginName, function (e) {
        e.preventDefault();

        if (flagResize) {
          currBlock = sliderChild.eq(0);
          flagResize = false;
        }

        var nextBlock = currBlock.prev();

        if (nextBlock.length) {
          calculatePos(nextBlock, posArr, winHeight, sliderEle, dotsChild, el);

          currBlock = nextBlock;
          el.trigger('afterChange.' + pluginName);
        }
      });

      // Close button
      closeBtn.on('click.' + pluginName, function (e) {
        e.preventDefault();
        currBlock = sliderChild.eq(0);
      });


      // Click on dots
      dotsEle.on('click.' + pluginName, 'li', function () {
        var self = $(this),
          index = self.index();

        currBlock = sliderChild.eq(index);

        calculatePos(currBlock, posArr, winHeight, sliderEle, dotsChild, el);
        el.trigger('afterChange.' + pluginName);
      });

      // After change check status of slider
      el.on('afterChange.' + pluginName, function () {
        var nextBlock = currBlock.next(),
          prevBlock = currBlock.prev();

        if (nextBlock.length) {
          nextBtn.removeClass('slick-disabled');
        } else {
          nextBtn.addClass('slick-disabled');
        }

        if (prevBlock.length) {
          prevBtn.removeClass('slick-disabled');
        } else {
          prevBtn.addClass('slick-disabled');
        }
      });

      // Check mouse wheel
      el.on('mousewheel DOMMouseScroll', function (e) {
        var container = el.find('.select-control .type-combobox__list');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          var winWidth = win.width();
          var scrollBarWidth = 0;
          var size = 1024;

          if (!Modernizr.touch) {
            scrollBarWidth = Site.getScrollBarWidth();
          }
          if (flag && winWidth + scrollBarWidth >= size) {
            var isDown = e.originalEvent.deltaY > 0 ? true : false;
            if (isDown) {
              nextBtn.trigger('click');
              //disableTabindex(el);
              return false;
            } else {
              prevBtn.trigger('click');
              //disableTabindex(el);
              return false;
            }
          }

        }
      });

      el.on('touchstart', function (e) {
        startY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
        lastMove = e;
      });

      el.on('touchmove', function (e) {
        lastMove = e;
      });

      el.find('.form-slider').on('touchend', function (e) {
        var container = el.find('.form-coltrol, input, select, button, .radio-custom, .checkbox-custom, .capcha');
        var endY = lastMove.originalEvent.touches ? lastMove.originalEvent.touches[0].pageY : lastMove.pageY;
        if (!container.is(e.target) && container.has(e.target).length === 0 && endY !== startY) {
          var isDown = endY < startY ? true : false;
          if (flag) {
            if (isDown) {
              nextBtn.trigger('click');
              return false;
            } else {
              prevBtn.trigger('click');
              return false;
            }
          }
        }
      });

      // Update position
      var resizeTimer;
      win.on('resize.' + pluginName, function () {
        var currWidth = win.width(),
          newPos = [];

        flagResize = true;

        if (lastWidth === currWidth) {
          return false;
        }

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

          sliderChild.each(function () {
            var self = $(this);

            newPos.push(self.offset().top);
          });

          posArr.length = 0;
          posArr = newPos;
          lastWidth = currWidth;
        }, 500);
      });

    },
    updatePositionBlock: function () {

      var that = this,
        el = that.element,
        sliderChild;

      el.each(function (idx, ele) {

        disableTabindex(el);

        if ($(ele).hasClass('open-popup')) {
          sliderEle1 = $(ele).find('[data-slider-block]');
          sliderChild = sliderEle1.children();

          return false;
        }
      });

      if (typeof (sliderChild) !== 'undefined') {
        posArr1 = [];
        var scrollTop = 0;
        sliderChild.each(function (idx, ele) {
          var self = $(ele);
          if (idx === 0) {
            scrollTop = self.offset().top;
          }
          posArr1.push(self.offset().top - scrollTop);
        });
      }

    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new PopupSlider(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'popup-tab';
  var winWidth = $(window).width();
  var scrollBarWidth = 0;
  var size = 1024;
  if (!Modernizr.touch) {
    scrollBarWidth = Site.getScrollBarWidth();
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  function autoCenter(popup) {
    var wHeight = $(window).height();
    var popupInner = $('#' + popup).find('.popup-inner');
    var pHeight = popupInner.outerHeight();
    var distance = (wHeight - pHeight) / 2;
    if (winWidth + scrollBarWidth < size) {
      popupInner.css('margin-top', '0');
    } else {
      if (wHeight > pHeight) {
        popupInner.css('margin-top', distance + 'px');
      } else {
        popupInner.css('margin-top', '0');
      }
    }
  }

  function moveNextState(classCurrentState, ClassNextState, idNextState) {
    var textShow = $('.' + ClassNextState).find('span').text();
    $('.progress-bar li').removeClass('active');
    $('.' + ClassNextState).addClass('active');
    $('.text-step').text(textShow);
    $('.' + classCurrentState).addClass('complete');
    $('.tab-wapper .content-tab').removeClass('active');
    $('#' + idNextState).addClass('active');
  }
  function movePreState(ClassPreState, idPreState) {
    var textShow = $('.' + ClassPreState).find('span').text();
    $('.progress-bar li').removeClass('active');
    $('.' + ClassPreState).removeClass('complete');
    $('.' + ClassPreState).addClass('active');
    $('.text-step').text(textShow);
    $('.tab-wapper .content-tab').removeClass('active');
    $('#' + idPreState).addClass('active');
  }
  function calPrice() {
    var total = 0;
    $('.product-list').find('li').each(function () {
      total = total + parseInt($(this).attr('data-price'));
    });
    $('.total-block').find('.price').text(total);
    if (total === 0) {
      $('.valider').addClass('btn-disabled');
    } else {
      $('.valider').removeClass('btn-disabled');
    }
  }
  function startCal() {
    calPrice();
    $('.link-delete').on('click', function () {
      $(this).closest('li').remove();
      autoCenter('cadeaux');
      calPrice();
      $(window).scrollTop($('.total-block').offset.top());
    });
  }
  Plugin.prototype = {
    init: function () {
      var that = this;
      that.element.find('.valider').on('click', function () {
        if ($(this).hasClass('btn-disabled')) {
          return false;
        }

        moveNextState('lots-step', 'confirm-address-step', 'cadeaux-confirm-address');
        autoCenter('cadeaux');
        $(window).scrollTop(0);
      });
      that.element.find('.envoyer-btn').on('click', function () {
        if ($('.comfirm-address-form').parsley().validate()) {
          moveNextState('confirm-address-step', 'recap-step', 'cadeaux-recap');
          autoCenter('cadeaux');
          $(window).scrollTop(0);
        }
      });
      that.element.find('.retour-btn').on('click', function () {
        movePreState('lots-step', 'cadeaux-lots');
        autoCenter('cadeaux');
        $(window).scrollTop(0);
        startCal();
      });
    },
    initStarCal: function () {
      startCal();
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'popup';
  var main = $('main');
  var winWidth = $(window).width();
  var scrollBarWidth = 0;
  var size = 1024;
  if (!Modernizr.touch) {
    scrollBarWidth = Site.getScrollBarWidth();
  }
  var mobileFix = function () {
    $(document)
      .on('focus', 'input,textarea,select', function () {
        $('.cookie-policy').addClass('unfixed');
      })
      .on('blur', 'input,textarea,select', function () {
        $('.cookie-policy').removeClass('unfixed');
      });
  };

  function reloadJS() {
    var opt = {};

    if ($('#form-register').length) {
      opt.afterInit = function () {
        $('main').trigger('onInsertRegisterPopup');
      };
    }

    $.getScript('//www.google.com/recaptcha/api.js');
    $('[data-custom-select]')['custom-select']();
    $('[data-validate]')['validate'](opt);
    $('[data-popup-slider]')['popup-slider']();
    $('[data-popup-tab]')['popup-tab']();
    $('[data-interchange]')['interchange']();
  }

  function getData(val) {
    return $.when(
      $.ajax(val, {
        type: 'GET'
      })
    );
  }


  function cleanTextField(el) {
    el.find('input, textarea').val('');
  }

  function appendDomDesktop(popupContent) {
    $(popupContent).insertAfter($('main'));
    $('main').trigger('onInsertRegisterPopup');
  }

  function appendDomMobile(popupContent) {
    $(popupContent).insertAfter($('header'));
    $('main').trigger('onInsertRegisterPopup');
  }
  function showTabPopup(popup) {
    $('#' + popup).find('.lots-step').addClass('active');
    $('#' + popup).find('#cadeaux-lots').addClass('active');
  }
  function closeTabPopup(popup) {
    $('#' + popup).find('.progress-bar li').removeClass('active').removeClass('complete');
    $('#' + popup).find('.tab-wapper .content-tab').removeClass('active');
  }

  function autoCenter(popup) {
    setTimeout(function () {
      $('[data-scrollbarcustom]')['scrollbarcustom']();
      var wHeight = $(window).height();
      var popupInner = $('#' + popup).find('.popup-inner');
      var pHeight = popupInner.outerHeight();
      var distance = (wHeight - pHeight) / 2;
      if (winWidth + scrollBarWidth < size) {
        popupInner.css('margin-top', '0');
        $('[data-scrollbarcustom]')['scrollbarcustom']('openScrollbarMobile');
      } else {
        if (wHeight > pHeight) {
          popupInner.css('margin-top', distance + 'px');
        } else {
          // alert(popupInner.outerHeight() + ' ' + $(window).height());
          popupInner.css('margin-top', '0');
        }
        $('[data-scrollbarcustom]')['scrollbarcustom']('openScrollbarTablet');
      }
    }, 100);
  }
  function show(popup) {

    //$('body').css('width', '100%');
    $('input, textarea').blur();

    if ($('#' + popup).hasClass('popup-1')) {
      var slider = $('#' + popup).find('.form-slider');
      slider.css('margin-top', '0');
      $('#' + popup).find('.slick-dots li').removeClass('active');
      $('#' + popup).find('.slick-dots li:nth(0)').addClass('active');
      slider.find('.item').removeClass('active');
      slider.find('.item:nth(0)').addClass('active');
    }
    // if($('#'+popup).hasClass('popup')){
    //   $('body').css('height', $('#'+popup).find('popup-inner').outerHeight() + 'px');
    //   //$('body').css('position', 'fixed');
    // } else {
    //   $('body').css('height', '');
    //   //$('body').css('position', 'relative');
    // }

    if (!$('body').hasClass('show-popup')) {
      $('html').addClass('show-popup');
      $('body').addClass('show-popup');
    }

    $('.popup, .popup-1').not($('#' + popup)).removeClass('open-popup').removeClass('fadeIn').addClass('hide-popup');
    $('#' + popup).removeClass('hide-popup');
    if ($('#' + popup).hasClass('popup-scrollbar')) {
      $('[data-scrollbarcustom]')['scrollbarcustom']('top');
    }
    if ($('#' + popup).hasClass('popup-cadeaux')) {
      $('[data-checkbox]')['checkbox']('getItem');
    }
    $('#' + popup).addClass('fadeIn');
    $('#' + popup).addClass('open-popup');
    if ($('#' + popup).hasClass('popup-cadeaux')) {
      showTabPopup(popup);
      $('[data-popup-tab]')['popup-tab']('initStarCal');
    } else {
      $('[data-checkbox]')['checkbox']('reItem');
    }
    autoCenter(popup);
    $('a, input, button, select, iframe').attr('tabindex', '-1');
    if ($('#' + popup).hasClass('popup-1')) {
      $('body').addClass('custom-mb');
    } else {
      $('body').removeClass('custom-mb');
      $('#' + popup).find('input, select, button').removeAttr('tabindex');
    }

    $('[data-popup-slider]')['popup-slider']('updatePositionBlock');
    if ($('.parsley-error').length) {
      $('.parsley-error').removeClass('parsley-error');
      $('.parsley-errors-list').html('');
    }
    setTimeout(function () {
      $('.form-coltrol').removeClass('parsley-error');
      $('.parsley-errors-list').html('');
    }, 100);

    if ($('.error-form').length) {
      $('.error-form').removeClass('error-form');
    }
    if ($('.slick-dots .error').length) {
      $('.slick-dots .error').removeClass('error');
    }
    if ($('.error-mess').length) {
      $('.error-mess').html('');
    }
    if (!$('#' + popup).hasClass('edit-popup')) {
      cleanTextField($('#' + popup));
    }
  }

  function showMobile(popup) {
    $('input, textarea').blur();
    main.removeClass('open-main');
    main.addClass('hide-main');
    if ($('#' + popup).hasClass('popup-1')) {
      var slider = $('#' + popup).find('.form-slider');
      slider.css('margin-top', '0');
      $('#' + popup).find('.slick-dots li').removeClass('active');
      $('#' + popup).find('.slick-dots li:nth(0)').addClass('active');
      slider.find('.item').removeClass('active');
      slider.find('.item:nth(0)').addClass('active');
    }
    $('body').css('height', '');
    //$('body').css('position', 'relative');
    $('.popup, .popup-1').not($('#' + popup)).removeClass('open-popup').removeClass('fadeIn').addClass('hide-popup');
    $('#' + popup).removeClass('hide-popup');
    if ($('#' + popup).hasClass('popup-cadeaux')) {
      $('[data-checkbox]')['checkbox']('getItem');
    }
    $('#' + popup).addClass('fadeIn');
    $('#' + popup).addClass('open-popup');
    if ($('#' + popup).hasClass('popup-cadeaux')) {
      showTabPopup(popup);
      $('[data-popup-tab]')['popup-tab']('initStarCal');
    } else {
      $('[data-checkbox]')['checkbox']('reItem');
    }
    autoCenter(popup);
    if ($('#' + popup).hasClass('popup-1')) {
      $('body').addClass('custom-mb');
    } else {
      $('body').removeClass('custom-mb');
    }

    if (!$('body').hasClass('show-popup')) {
      $('html').addClass('show-popup');
      $('body').addClass('show-popup');
    }
    if ($('.parsley-error').length) {
      $('.parsley-error').removeClass('parsley-error');
      $('.parsley-errors-list').html('');
    }
    if ($('.error-form').length) {
      $('.error-form').removeClass('error-form');
    }
    if ($('.slick-dots .error').length) {
      $('.slick-dots .error').removeClass('error');
    }
    if ($('.error-mess').length) {
      $('.error-mess').html('');
    }
    $('[data-slider]')['slider']('pauseBanner');

    if (!$('#' + popup).hasClass('edit-popup')) {
      cleanTextField($('#' + popup));
    }
    setTimeout(function () {
      $(window).scrollTop(0);
    }, 100);
  }

  function close(popup) {
    $('.data-close-popup').on('click', function (e) {
      e.preventDefault();
      // $('body').css('width', 'auto');
      // $('body').css('height', 'auto');
      // $('body').css('position', 'relative');
      if ($('#' + popup).hasClass('popup-1')) {
        $('body').removeClass('custom-mb');
      }
      $('#' + popup).removeClass('open-popup');
      $('#' + popup).removeClass('fadeIn');
      $('#' + popup).addClass('hide-popup');
      if ($('#' + popup).hasClass('popup-cadeaux')) {
        closeTabPopup(popup);
        $('[data-checkbox]')['checkbox']('reItem');
      }
      if (Modernizr.touch) {
        if ($('#' + popup).hasClass('style-1')) {
          $('#' + popup).find('.desc').css('height', 'auto');
        }
      }
      if ($('body').hasClass('show-popup')) {
        $('html').removeClass('show-popup');
        $('body').removeClass('show-popup');
      }

      $('a, input, button, select, iframe').removeAttr('tabindex');
    });
  }

  function closeMobile(popup) {
    $('.data-close-popup').on('click', function (e) {
      e.preventDefault();
      main.removeClass('hide-main');
      main.addClass('open-main');
      if ($('#' + popup).hasClass('popup-1')) {
        $('body').removeClass('custom-mb');
      }
      $('#' + popup).removeClass('open-popup');
      $('#' + popup).removeClass('fadeIn');
      $('#' + popup).addClass('hide-popup');
      if ($('#' + popup).hasClass('popup-cadeaux')) {
        closeTabPopup(popup);
        $('[data-checkbox]')['checkbox']('reItem');
      }
      if ($('body').hasClass('show-popup')) {
        $('html').removeClass('show-popup');
        $('body').removeClass('show-popup');
      }

      $('[data-slider]')['slider']('playBanner');
    });

  }

  var fristRun = function (popupcontent, popup) {
    if ($('#' + popup).length) {
      show(popup);
      close(popup);
    }
    else {
      if (winWidth + scrollBarWidth < size) {
        $.when(appendDomMobile(popupcontent)).done(function () {
          reloadJS();
          showMobile(popup);
          closeMobile(popup);
        });
      }
      else {
        $.when(appendDomDesktop(popupcontent)).done(function () {
          reloadJS();
          show(popup);
          close(popup);
        });
      }
    }
  };
  var Run = function (popupcontent, popup) {
    if (winWidth + scrollBarWidth < size) {
      showMobile(popup);
      closeMobile(popup);
    }
    else {
      show(popup);
      close(popup);
    }
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {

      var that = this;
      var popupRelate = [];
      popupRelate = that.options.popuprelated;
      popupRelate = popupRelate.split(',');
      var popupcontent;
      var popupcontentRelated = [];

      function getPopup(popup, popuprelate, data) {
        var popupArea = $('<div class="popupArea"></div>');
        popupArea.append(data);
        popupcontent = popupArea.find('#' + popup)[0].outerHTML;
        $.each(popuprelate, function (index, value) {
          if (value !== '') {
            var content = popupArea.find('#' + value)[0].outerHTML;
            popupcontentRelated[value] = content;
          }
        });
      }

      that.element.on('click touchstart', function () {
        if (!$('#' + that.options.popup).length) {
          var customUrl = $(this).data('popup-url');

          if (customUrl === '') {
            customUrl = 'all-popup.html';
          }

          getData(customUrl).then(function (resp) {
            getPopup(that.options.popup, popupRelate, resp);
            fristRun(popupcontent, that.options.popup);
            $('.pop-link').on('click', function () {
              fristRun(popupcontentRelated[popupRelate[0]], popupRelate[0]);
              if (that.options.popup === 'connecter') {
                $('.btn-register').on('click', function () {
                  fristRun(popupcontentRelated[popupRelate[1]], popupRelate[1]);
                });
              }
              if (that.options.popup === 'sidentifier') {
                $('.btn-register').on('click', function () {
                  fristRun(popupcontentRelated[popupRelate[1]], popupRelate[1]);
                });
              }
              if (that.options.popup === 'edit') {
                $('.supprimer').on('click', function () {
                  fristRun(popupcontentRelated[popupRelate[1]], popupRelate[1]);
                });
              }
            });
            $('.btn-register').on('click', function () {
              fristRun(popupcontentRelated[popupRelate[1]], popupRelate[1]);
            });
          });
        }
        else {
          new Run(popupcontent, that.options.popup);
          $('.pop-link').on('click', function () {
            new Run(popupcontentRelated[popupRelate[0]], popupRelate[0]);
            if (that.options.popup === 'connecter') {
              $('.btn-register').on('click', function () {
                new Run(popupcontentRelated[popupRelate[1]], popupRelate[1]);
              });
            }
            if (that.options.popup === 'edit') {
              $('.supprimer').on('click', function () {
                new Run(popupcontentRelated[popupRelate[1]], popupRelate[1]);
              });
            }
          });
          $('.btn-register').on('click', function () {
            new Run(popupcontentRelated[popupRelate[1]], popupRelate[1]);
          });
        }
      });
      $(window).on('orientationchange', function () {

        winWidth = $(window).width();

        if (winWidth + scrollBarWidth < size) {
          $('body').removeClass('custom-mb');
          main.removeClass('hide-main');
          main.addClass('open-main');
        } else {
          $('body').removeClass('custom-mb');
          main.removeClass('open-main');
          main.removeClass('hide-main');
        }
        if ($('body').hasClass('show-popup')) {
          $('html').removeClass('show-popup');
          $('body').removeClass('show-popup');
        }
        $('.popup, .popup-1').removeClass('open-popup').removeClass('fadeIn').addClass('hide-popup');
        if ($('.popup').hasClass('popup-cadeaux')) {
          closeTabPopup('cadeaux');
          $('[data-checkbox]')['checkbox']('reItem');
        }
      });
      // Only on touch devices
      if (Modernizr.touch) {
        mobileFix();
      }
    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    elementBlock: '.popup'
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'prefill-form';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      // var that = this;
      var that = this;
      var currentUrl = decodeURIComponent(window.location.href);

      if (currentUrl.indexOf('?idfrom=') > -1) {
        that.formParams = currentUrl.slice(currentUrl.indexOf('idfrom=')).split('&');
        that.element.find('#myRegister').click();
        $('main').on('onInsertRegisterPopup', function () {
          that.prefillForm();
        });
      }
    },

    prefillForm: function () {
      var elem = this.element;
      for (var i = 0; i < this.formParams.length; i++) {
        var params = this.formParams[i].split('=');
        switch (params[0]) {
          case 'civ':
            var radioValue = params[1].toLowerCase(),
              radioList = elem.find('.radio-group').find('input[name=gender]');
            for (var j = 0; j < radioList.length; j++) {
              if (radioList.eq(j).attr('id').toLowerCase() === radioValue) {
                radioList.eq(j).prop('checked', true);
              }
            }
            break;
          case 'bd':
            var birthday = new Date(params[1]);
            elem.find('#jj-register').val(birthday.getDate());
            elem.find('#mm-register').val(birthday.getMonth() + 1);
            elem.find('#js-dob-year-register').val(birthday.getFullYear());
            elem.find('.day a').text(elem.find('#jj-register option:selected').text());
            elem.find('.month a').text(elem.find('#mm-register option:selected').text());
            elem.find('.year a').text(elem.find('#js-dob-year-register option:selected').text());
            break;
          default:
            elem.find('#' + params[0]).val(params[1]);
        }
      }
    },

    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'print',
    dataMainMenu = $('[data-main-menu]'),
    dataMobileMenu = $('[data-mobile-menu]'),
    footer = $('footer'),
    dataColumnLeft = $('[data-column-left]'),
    dataListIcon = $('[data-list-icon]'),
    dataIngredients = $('[data-ingredients]');

  function beforePrint() {
    dataMainMenu.addClass('hidden');
    dataMobileMenu.addClass('hidden');
    footer.addClass('hidden');
    dataListIcon.after(dataIngredients);
    dataColumnLeft.next().after(dataColumnLeft);
  }

  function afterPrint() {
    dataMainMenu.removeClass('hidden');
    dataMobileMenu.removeClass('hidden');
    footer.removeClass('hidden');
    dataColumnLeft.prev().before(dataColumnLeft);
    dataColumnLeft.prepend(dataIngredients);
  }

  function addListener() {
    if (window.matchMedia) {
      var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          beforePrint();
        } else {
          afterPrint();
        }
      });
    }
  }

  function print(element) {
    element.off('click.' + pluginName).on('click.' + pluginName, function () {
      beforePrint();
      window.onafterprint = afterPrint;
      setTimeout(function () {
        window.print();
      }, 1);
    });
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var element = this.element,
        scrollBarWidth = Site.scrollBarWidth,
        mobileSize = 1023;
      addListener();
      $(window).on(Site.orientationEvent + '.' + pluginName, function () {
        var winWidth = $(window).width();
        if (winWidth + scrollBarWidth > mobileSize) {
          print(element);
        } else {
          element.off('click.' + pluginName);
        }
      }).trigger(Site.orientationEvent + '.' + pluginName);
    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'produits-liste';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  var loadMore = function (el) {
    $(el).find('.item-cate-list:nth-child(n+5)').each(function (i) {
      if (!$(this).hasClass('sub-product')) {
        $(this).removeClass('hidden-produits');
        $(this).delay(100 + i * 200).addClass('show-produits');
      }
    });
    $(el).find('.readmore').removeClass('show-produits');
    $(el).find('.readmore').addClass('hidden-produits');
  };

  Plugin.prototype = {
    init: function () {
      var that = this,
        el = that.element;

      el.on('click.' + pluginName, '.readmore', function (e) {
        e.preventDefault();
        loadMore(that.element);
      });

      el.on('click.' + pluginName, '.product-item', function (e) {
        var prodId = $(this).data('product-id');
        if (el.find('.product-group-' + prodId).length) {
          e.preventDefault();
          var $div = el.find('.product-group-' + prodId);
          el.find('.sub-product').not($div).hide();
          $div.toggle();
          $('img.lazy').lazyload();
        }
      });

      el.on('click.' + pluginName, '.thumb-list .thumb-item', function (e) {
        e.preventDefault();
        var src = $(this).find('img').data('full-image');
        var sale = $(this).find('img').data('saleoff');

        el.find('.thumb-slider .item-thumb img').attr('src', src);
        el.find('.thumb-slider .product-label .sale').html(sale + '<sup>&euro;</sup>');

        el.find('.thumb-list .active').removeClass('active');
        $(this).parent().addClass('active');
      });

    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'rating';
  var delayTime = 0;

  var startProgressBar = function (opts) {
    $(opts.elementOverlay).fadeIn(50);
    $(opts.elementProgress).find('.progress-bar').css('width', ' 0%');
    $(opts.elementProgress).fadeIn(50);
  };

  var endProgressBar = function (opts) {
    $(opts.elementProgress).delay(delayTime).fadeOut(100);
    $(opts.elementOverlay).delay(delayTime).fadeOut(150);
  };

  var changeTextButton = function (el) {
    if (el.find('.noter').length) {
      var dataText = el.find('.noter').attr('data-text');
      el.find('.noter span').text(dataText);
    }
  };

  var drawStar = function (el) {
    el.find('.rating-action .item').removeClass('active half-active');
    var ratingActive = el.data('rating-active');
    if (parseFloat(ratingActive) > 0) {
      for (var i = 5, l = (5 - parseInt(ratingActive)); i > l; i--) {
        el.find('.item:nth(' + (i - 1) + ')').addClass('active');
      }
      var res = String(ratingActive).split('.');
      if (res.length > 1 && parseFloat(ratingActive) <= 5 && parseInt(res[1]) > 0) {
        el.find('.item:nth(' + (l - 1) + ')').addClass('half-active');
      }
    }
  };

  var rateStars = function (el, opts) {
    startProgressBar(opts);
    var objID = el.data('object-id');
    var rating = el.find('.active').length;
    if (el.find('.half-active').length) {
      rating = rating + 0.5;
    }
    drawStar(el);
    var url = opts.hrefPost;
    var customUrl = el.find('.rating-action').data('custom-url');
    if (customUrl !== '' && customUrl !== 'undefined') {
      url = customUrl;
    }

    $.ajax({
      url: url,
      data: { objID: objID, rating: rating },
      success: function (response) {
        if (response !== null) {
          if (response.success) {//If success
            changeTextButton(el);
          } else {//If error
            //Code here
          }
        }
        endProgressBar(opts);
      },
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Download progress
        xhr.addEventListener('progress', function (evt) {
          var total = evt.total;
          if (total === 0) { total = evt.loaded; }
          if (total < 10000) { delayTime = 800; }
          var percentComplete = 100 * evt.loaded / total;
          $(opts.elementProgress).find('.progress-bar').css('width', percentComplete + '%');
        }, false);
        return xhr;
      },
      error: function () {
        //Code here
        endProgressBar(opts);
      }
    });
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,
        el = that.element/*,
          allStars = el.children()*/;
      var dataAuto = el.find('.rating-action').data('rating-auto');

      drawStar(el);

      el.on('click.' + pluginName, '[data-full], [data-half]', function (e) {
        var self = $(e.target),
          isHalf = self.data('half'),
          item = self.parent();

        el.find('.active, .half-active').removeClass('active half-active');

        if (isHalf) {
          item.addClass('half-active');
        } else {
          item.addClass('active');
        }
        item.nextAll().addClass('active');
      });

      el.on('click.' + pluginName, '.rating-action .item', function () {
        if (dataAuto !== false) {
          rateStars(el, that.options);
        } else {
          $('#rating-value').val(el.find('.active').length);
        }
      });


      el.hover(
        function () {
          if (dataAuto !== false) {
            el.find('.rating-action .item').removeClass('active half-active');
          }
        }, function () {
          if (dataAuto !== false) {
            drawStar(el);
          }
        }
      );
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    hrefPost: 'data/rating.json',
    elementProgress: '.progress-paging',
    elementOverlay: '.overlay'
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'readmore';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      that.element.on('click', '.readmore-btn', function (e) {
        e.preventDefault();
        $(this).hide();
        that.element.find('.hidden-text').removeClass('hidden-mb');
      });
    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'scroll2position';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      that.element.find('a').on('click', function (e) {
        e.preventDefault();
        var pos = $(this).attr('href');
        var top = 0;
        if (pos !== '' && pos !== '#' && $(pos).length) {
          $('.breadcrumb-1').find('li').removeClass('active');
          $(this).parent().addClass('active');
          if ($('.categories-menu').hasClass('categories-fixed')) {
            top = $(pos).offset().top - 100;
          } else {
            top = $(pos).offset().top - (100 + parseInt($('.breadcrumb-1').css('margin-bottom').slice(0, -2)) + parseInt($('.breadcrumb-1').css('margin-top').slice(0, -2)) + $('.breadcrumb-1').outerHeight());
          }
        }
        if ($(pos).length < 1 && pos !== '#') {
          return false;
        }
        $('body,html').css('pointer-events', 'none');
        $('body,html').stop().animate({ 'scrollTop': top }, that.options.speed).promise().done(function () {
          $('body,html').css('pointer-events', 'auto');
        });
      });
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    speed: 400
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'scroll2top';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      that.element.on('click', function (e) {
        e.preventDefault();
        $('body,html').stop().animate({ 'scrollTop': 0 }, that.options.speed);
      });
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    speed: 400
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'scrollbarcustom';
  var winWidth = $(window).width();
  var scrollBarWidth = 0;
  var size = 1024;
  if (!Modernizr.touch) {
    scrollBarWidth = Site.getScrollBarWidth();
  }
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      var height = 500;
      if (winWidth + scrollBarWidth >= size) {
        if (!Modernizr.touch) {
          that.element.slimScroll({
            height: height + 'px',
            size: '7px',
            opacity: 1,
            color: '#67696a'
          });
        }
      }
    },
    openScrollbarTablet: function () {
      var height1;
      var height2;
      if (Modernizr.touch) {
        height1 = $(window).height() - ($('#legales .popup-inner').outerHeight() - $('#legales .desc').outerHeight()) - (parseInt($('#legales .popup-inner').css('margin-top')) * 2);
        $('#legales .desc').css('height', height1);
        height2 = $(window).height() - ($('#sanitaires .popup-inner').outerHeight() - $('#sanitaires .desc').outerHeight()) - (parseInt($('#sanitaires .popup-inner').css('margin-top')) * 2);
        $('#sanitaires .desc').css('height', height2);
        $('.popup-scrollbar .desc').stop().animate({
          scrollTop: 0
        }, 10);
      }
    },
    openScrollbarMobile: function () {
      if (Modernizr.touch) {
        $('#legales .desc').css('height', 'auto');
        $('#sanitaires .desc').css('height', 'auto');
      }
    },
    top: function () {
      var that = this;
      if (winWidth + scrollBarWidth >= size && !Modernizr.touch) {
        that.element.slimScroll({
          scrollTo: '0'
        });
      }
    },
    destroy: function () {

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'scrolling-fixed',
    doc = $(document);

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      var el = that.element.next();
      if (el.offset() !== undefined) {
        doc.on('scroll.' + pluginName, function () {
          if ($(this).scrollTop() >= el.offset().top) {
            that.element.addClass('categories-fixed');
          } else {
            that.element.removeClass('categories-fixed');
          }
        }).trigger('scroll.' + pluginName);
      }
    },
    destroy: function () {
      // remove events
      // deinitialize

      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

; (function ($, window, undefined) {

  'use strict';

  var pluginName = 'scrolling-animation',
    doc = $(document),
    win = $(window);


  function getMaps() {
    var els = $('[data-animation]:not(.animation)'),

      result = {
        'listEl': [],
        'maps': []
      };

    if (els.length) {

      els.each(function () {
        var _self = $(this);

        result.listEl.push(_self);

        result.maps.push(_self.offset().top - win.height());
      });

    }
    return result;
  }

  function updateState(scrollTop, elsMaps) {
    var length = elsMaps.maps.length,
      animateEl,
      listAni = [];

    var delayAnimateHandler = function (element) {
      setTimeout(function () {
        element.addClass('animation');
      }, element.data('delay'));
    };

    while (length) {
      length--;

      if (elsMaps.maps[length] <= scrollTop) {

        animateEl = elsMaps.listEl.splice(length, 1)[0];

        elsMaps.maps.splice(length, 1);

        if (animateEl.is('[data-animation-list]')) {

          listAni.push(animateEl);

        } else if (animateEl.is('[data-delay]')) {

          delayAnimateHandler(animateEl);
        } else {

          animateEl.addClass('animation');

        }

      }
    }

    return listAni;
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      setTimeout(function () {
        var elsMaps = getMaps(),
          listEls;

        doc.on('scroll.' + pluginName, function () {

          listEls = updateState(win.scrollTop(), elsMaps);

          if (listEls.length >= 1) {

            if (listEls.length === 1) {

              listEls.pop().addClass('animation');

            } else {

              (function play(list) {

                if (list.length) {

                  var _self = list.pop();

                  setTimeout(function () {

                    _self.addClass('animation');

                    play(list);

                  }, _self.data('animation-list'));
                }
              })(listEls);

            }
          }

        }).trigger('scroll.' + pluginName);
      }, 100);
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    active: 'animation'
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name search-form
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
; (function ($, window, undefined) {
  var pluginName = 'search-form';

  function dataSelector(name, value) {
    var suffix = ']';
    if (value !== undefined) {
      suffix = '=' + value + suffix;
    }
    return '[data-' + name + suffix;
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      this.eventHandlers();
    },

    eventHandlers: function () {
      this.initEvents();
    },

    initEvents: function () {
      var self = this;
      var options = self.options;
      var el = self.element;
      var filterToggle = el.find(dataSelector(options.filterToggle));
      var filterCategory = el.find(dataSelector(options.filterCategory));
      filterToggle.on('click.' + pluginName, function (ev) {
        ev.preventDefault();

        filterCategory.toggle();
        if (filterCategory.css('display') === 'block') {
          filterCategory.css('display', 'inline-block');
        }
        var dataDefault = filterToggle.text();
        var dataText = filterToggle.attr('data-text');
        filterToggle.text(dataText);
        filterToggle.attr('data-text', dataDefault);

      });
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    'active': 'hidden',
    'filterToggle': 'filter-toggle',
    'filterCategory': 'filter-category'
  };

  $(function () {
    $(dataSelector(pluginName))[pluginName]({});
  });

}(jQuery, window));

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'unit',
    win = $(window);

  function initUnit(element, detal) {
    if (!Modernizr.touch) {
      var number = parseInt(element.text());
      if (!isNaN(number)) {
        element.text(number - detal);
      }
    }
  }

  function setNumber(element, duration, detal) {
    var number = parseInt(element.text()),
      interval = null;
    if (!isNaN(number)) {
      element.data('animated', true);
      var count = 0;
      interval = setInterval(function () {
        if (count < detal) {
          number++;
          element.text(number);
          count++;
        } else {
          clearInterval(interval);
        }
      }, duration);
    }
  }

  function scrollAnimateHandler(element, duration, detal) {
    if (!Modernizr.touch) {
      win.on('scroll.' + pluginName, function () {
        var winOffset = win.scrollTop(),
          elementOffset = element.offset().top;
        if ((winOffset + win.height() - element.height()) > elementOffset && !element.data('animated')) {
          setNumber(element, duration, detal);
        }
      }).trigger('scroll.' + pluginName);
    }
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var element = this.element,
        options = this.options;

      initUnit(element, options.detal);
      scrollAnimateHandler(element, options.duration, options.detal);
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    duration: 100,
    detal: 5
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'validate';
  //var widgetId1;

  var isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  function getAge(birthDateString) {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  function validDate(day, month, year) {
    if (day < 1 || month > 12) {
      return false;
    } else if (day < 1 || day > 31) {
      return false;
    } else if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
      return false;
    } else if (month === 2) {
      var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
      if (day > 29 || (day === 29 && !isleap)) {
        return false;
      }
    }
    return true;
  }
  var initParsley = function (elm) {
    window.Parsley
      .addValidator(
      'date',
      function (value, requirements) {
        var day = $('.' + requirements + '-day').val(), // or value
          month = $('.' + requirements + '-month').val(),
          year = $('.' + requirements + '-year').val();
        if (isNumeric(day) === false || isNumeric(month) === false || isNumeric(year) === false) { return false; }
        if (isNaN(year + '-' + month + '-' + day) && getAge(year + '/' + month + '/' + day) >= 18 && validDate(parseInt(day), parseInt(month), parseInt(year)) || day === '' || month === '' || year === '') {
          return true;
        } else {
          return false;
        }
      },
      34
      )
      .addMessage('en', 'date', 'Enter a valid date');

    elm.parsley({ focus: 'none' }).on('field:validated', function () {

      var ok = $('.parsley-error').length === 0;
      $('.bs-callout-info').toggleClass('hidden', !ok);
      $('.bs-callout-warning').toggleClass('hidden', ok);
    }).on('form:error', function () {
      elm.find('.group-button').addClass('error-form');
      $(elm).find('.form-slider .item').each(function (i) {
        if ($(elm).find('.form-slider .item:nth-child(' + (i + 1) + ')').find('.parsley-errors-list li').length) {
          $('.slider-popup .slick-dots li:nth-child(' + (i + 1) + ')').addClass('error');
        } else {
          $('.slider-popup .slick-dots li:nth-child(' + (i + 1) + ')').removeClass('error');
        }
      });
      return false;
    }).on('field:success', function () {

      elm.find('.group-button').removeClass('error-form');

    }).on('form:validated', function () {

      var v = $('.g-recaptcha-response').val();
      if (v === '' || v === null) {
        $(elm).find('.capcha .error-mess').html(elm.find('.g-recaptcha').data('error-message'));
        elm.find('.group-button').addClass('error-form');
        return false;
      } else {
        $(elm).find('.capcha .error-mess').html('');
        elm.find('.group-button').removeClass('error-form');
      }

    }).on('form:submit', function (e) {
      if ($(elm).hasClass('comfirm-address-form')) {
        $.ajax({
          type: $(elm).attr('method'),
          url: $(elm).attr('action'),
          data: $(elm).serialize()
        });
        return false;
      } else {
        var v = $('.g-recaptcha-response').val();
        if (v === '' || v === null) {
          $(elm).find('.capcha .error-mess').html(elm.find('.g-recaptcha').data('error-message'));
          elm.find('.group-button').addClass('error-form');
          return false;
        } else {
          $(elm).find('.capcha .error-mess').html('');
          elm.find('.group-button').removeClass('error-form');
        }
        e.preventDefault();
      }

    });
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      initParsley(that.element);
      that.element.on('click', '.type-combobox__item', function () {
        $('.js-dob-year').parsley().validate();
      });

      if (Modernizr.touch) {
        that.element.on('touchstart', '#submit-sidentifier', function () {
          $('.form-1').parsley().validate();
        });
      }

      if (typeof this.options.afterInit === 'function') {
        setTimeout(function () {
          that.options.afterInit();
        }, 500);
      }

    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    afterInit: null
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]({});
  });

}(jQuery, window));
function recaptchaCallback() {
  jQuery('.form-slider .group-button').removeClass('error-form');
  jQuery('.capcha .error-mess').html('');
}
recaptchaCallback();

; (function ($) {
  'use strict';

  var pluginName = 'youtube';

  var loadScript = function () {
    var firstScriptTag = $('script')[0];
    if (!$('#youtube').length) {
      $('<script id="youtube" src="https://www.youtube.com/iframe_api"></script>').insertBefore(firstScriptTag);
    }
  };
  var run = function (that, callback) {
    var iframe = that.arrayIframe[that.arrayIframe.length - 1];
    that['player-' + iframe.container] = new window.YT.Player(iframe.container, {
      height: iframe.height || that.options.height,
      width: iframe.width || that.options.width,
      videoId: iframe.id,
      events: {
        'onReady': function () {
          $.isFunction(callback) && callback(that, that['player-' + iframe.container], iframe.container);
        }
      }
    });
  };
  var loadYoutube = function (that, callback) {
    window.onYouTubeIframeAPIReady = function () {
      run(that, callback);
    };
    run(that, callback);
  };
  var addEvent = function (that, player, container) {
    var options = that.options;
    that.element.find('[data-group="' + container + '"] .' + options.maskClass).addClass('hide');
    that.element.find('[data-group="' + container + '"] ' + 'iframe').css('display', 'block');
    player.playVideo();

    var slider = that.element.closest('.' + options.sliderClass);
    if (slider.length) {
      slider.slick('slickPause');
    }
  };

  var getYoutubeIframe = function (ele, arrayIframe) {
    var iframe = ele.next();
    arrayIframe.push(iframe.data());
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      that.arrayIframe = [];
      $('.btn-play').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('hide');
        loadScript();
        getYoutubeIframe($(this), that.arrayIframe);
        loadYoutube(that, addEvent);
      });
    },
    stopVideo: function (container) {
      this['player-' + container].stopVideo();
    },
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    height: 390,
    width: 640,
    maskClass: 'mask-video',
    btnPlayClass: 'btn-play',
    sliderClass: 'banner-slider'
  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
