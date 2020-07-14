
  let container = document.getElementById("_img");
  let width = container.clientWidth;
  let	height = container.clientHeight;
  let pageRender = (function () {
    var winH = $(window).height();
    function saveCookie(cookieName, cookieValue, cookieDates) {
      var d = new Date();
      d.setDate(d.getDate() + cookieDates);
      document.cookie = `${cookieName}=${cookieValue};expires=${d.toGMTString()}`
    }
    //取cookie
    function getCookie(cookieName) {
      var cookieStr = unescape(document.cookie);
      var arr = cookieStr.split("; ");
      var cookieValue = "";
      for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
        if (temp[0] == cookieName) {
          cookieValue = temp[1];
          break;
        }
      }
      return cookieValue;
    }

    function throttle(fn, wait) {
      var timer = null;
      return function (...args) {
        var _this = this;
        if (!timer) {
          timer = setTimeout(function () {
            fn.call(_this, ...args);
            timer = null;
          }, wait);
        }
      }
    }

    function splitText() {
      $('#textPrint').css('opacity', 1);
      let target = $('#textPrint');
      let split = new SplitText(target, { type: 'chars' });
      let tl = new TimelineMax();
      tl.staggerFrom(
        split.chars,
        0.5,
        { opcity: 0, scale: 0, y: 0, ease: Elastic.easeInOut },
        0.05
      );
    }

    function checkLanguage() {
      let language = $('.nav .language'),
        changeImg = $('#globalLocation .bottom-earth');
      language.click(function () {
        let text = $.trim($(this).text());
        // console.log( $.trim($(this).text()), ' $(this).text();')
        if (text === 'English') {
          $(this).find('.text').text('简体中文');
          changeImg.attr({ src: "./images/zhearth.png" });
          lang("zh");
          saveCookie("language", "zh", 1);
        } else {
          $(this).find('.text').text('English');
          changeImg.attr({ src: "./images/enearth.png" });
          lang("en");
          saveCookie("language", "en", 1);
        }
      })
    }

    function loadScrollMagic() {
      let controller = new ScrollMagic.Controller();

      // let tl = new TimelineMax();
      // let sections = document.querySelectorAll('section');
      // [].slice.call(sections, 1).forEach((item, index) => {
      //   console.log(item, index)
      //   let targetEle = $(item).attr('id');
      //   console.log(`#${targetEle}`,'`#${targetEle}`');
      //   let scene = {
      //     triggerElement: `#${targetEle}`,
      //     triggerHook: .95,
      //     offset: 150,
      //     duration: 200,
      //   },
      //   tl = TweenMax.fromTo(`#${targetEle}`, 1, {
      //     opacity: .2
      //   }, {
      //     opacity: 1,
      //     ease: Linear.easeNone 
      //   });
      //   new ScrollMagic.Scene(scene).setTween(tl).addTo(controller);
      // })

      //
      ['technology tec-introduce', 'technology tec-info-text', 'ourTeam team-introduce', 'industryBanner industry-title', 'industryBanner industry-slides', 'globalLocation global-title', 'globalLocation earth-location'].forEach(function (item, i) {
        let target = item.split(' ');
        // console.log(object)
        let offset = $(`.${target[1]}`).hasClass('scroll-delay') ? 450 : 100;
        let tl = TweenMax.fromTo($(`.${target[1]}`), 1, {
          opacity: 0
        }, {
          opacity: 1,
          ease: Bounce.easeInOut
        }, .2);
        new ScrollMagic.Scene({
          triggerElement: `#${target[0]}`,
          offset,
          triggerHook: .95,
          duration: 200,
        }).setPin($(`.${target[1]}`)).setTween(tl).addTo(controller);
      })

      //#technology .card
      $('#technology .card').each(function (i, item) {
        // console.log(item)
        let triggerHook;
        if (i === 0) {
          triggerHook = .95
        } else if (i === 1) {
          triggerHook = .85
        } else {
          triggerHook = .75
        }
        let tl = TweenMax.fromTo(item, 1, {
          top: '50px',
          opacity: 0
        }, {
          top: 0,
          opacity: 1,
          ease: Linear.easeNone
        });
        new ScrollMagic.Scene({
          triggerElement: '#technology',
          offset: 550,
          triggerHook,
          duration: 200,
        }).setPin($(item)).setTween(tl).addTo(controller);
      })

      // team card
      var teamCard = document.getElementsByClassName("team-card");
      for (var i = 0; i < teamCard.length; i++) {
        // console.log(teamCard, 'teamCard')
        new ScrollMagic.Scene({
          triggerElement: teamCard[i],
          offset: 50,
          triggerHook: 0.9,
        })
          // .setPin($(teamCard[i]))
          .setClassToggle(teamCard[i], "visible") // add class toggle
          .addTo(controller)
      }
      // $('#banner .slide-img').each(function (i, item){
      // let tl = new TweenLite.to($(item), 4, {autoAlpha:1, delay:5 });
      //   new ScrollMagic.Scene({
      //       triggerElement: $(item),
      //       triggerHook: 0,
      //       duration: 200,
      //   }).setTween(tl).addTo(controller);
      // })



    }

    function showSwiper() {
      let slide = $('.slide'),
        win = $(window),
        slideOffsetTop = slide.offset().top + 240,
        winScrollTop = win.scrollTop(),
        winH = win.height();
      // console.log('slideOffsetTop', slideOffsetTop - winScrollTop, winH)
      if (slideOffsetTop - winScrollTop < winH) {
        slide.find('.slide-text').addClass('show');
        slide.find('.slide-img').addClass('show');
      } else {
        slide.find('.slide-text').removeClass('show');
        slide.find('.slide-img').removeClass('show');
      }
    }

    function navMonitor() {
      width = container.clientWidth;
      height = container.clientHeight;
      let navHeight = 20 + 109,
      navTitleList = $('.nav-tab .title');
      navTitleList.each(function () {
        let id = $(this).attr('data-id');
        let itemOffTop = $(id).offset().top,
          itemHeight = $(id).height(),
          winScrollT = $(window).scrollTop();
        let offsetTop = itemOffTop - navHeight;
        let offsetBottom = itemOffTop + itemHeight - navHeight;
        if (itemHeight < winH) {
          offsetTop = offsetTop - (winH - itemHeight);
        }
        $(this).removeClass('active')
        // console.log('offsetTop', offsetTop, winScrollT, 'winScrollT', offsetBottom, 'offsetBottom', winScrollT > offsetTop, winScrollT < offsetBottom);
        if (winScrollT > offsetTop && winScrollT < offsetBottom) {
          $(this).addClass('active');
        }
      })
    }

    function scrollEvent() {
      showSwiper();
      navMonitor()
    }

    function scrollMonitor() {
      scrollEvent()
      let win = $(window);
      win.scroll(throttle(scrollEvent, 800));
      win.resize(throttle(navMonitor, 800));
    }

    function loadSwiper() {
      let swiper = null;
      swiper = new Swiper('#banner .swiper-container', {
        pagination: '#banner .swiper-pagination',
        paginationClickable: true,
        // speed:800,
        // autoplay:4400,
        autoplayDisableOnInteraction: false,
        effect: 'fade',
      })
    }

    function load3DSwiper() {
      new Swiper('#industryBanner .swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loopedSlides: 3,
        loop: true,
        pagination: '#industryBanner .swiper-pagination',
        paginationClickable: true,
        onProgress: function (swiper, progress) {
          console.log('onProgress');
          let curSlide = swiper.slides[swiper.activeIndex];
          $(curSlide).css('opacity', 1);
          $(curSlide).prev().css('opacity', .3);
          $(curSlide).next().css('opacity', .3);
          for (let i = 0; i < swiper.slides.length; i++) {
            var slide = swiper.slides.eq(i);
            var slideProgress = swiper.slides[i].progress;
            var modify = 1;
            if (Math.abs(slideProgress) > 1) {
              modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
            }
            var translate = slideProgress * modify * 337.5 + 'px';
            var scale = 1 - Math.abs(slideProgress) / 5;
            var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
            slide.transform('translateX(' + translate + ') scale(' + scale + ')');
            slide.css('zIndex', zIndex);
            // slide.css('opacity', 1);
            if (Math.abs(slideProgress) > 1) {
              slide.css('opacity', 0);
            }
          }
        },
        onSetTransition: function (swiper, transition) {
          for (var i = 0; i < swiper.slides.length; i++) {
            var slide = swiper.slides.eq(i)
            slide.transition(transition);
          }
        },
        onInit: function (swiper) {
          const curSlide = swiper.slides[swiper.activeIndex];
          $(curSlide).prev().css('opacity', .3);
          $(curSlide).next().css('opacity', .3);
        },
        onSlideChangeEnd: function (swiper) {
          //swiper-slide-active
          const curSlide = swiper.slides[swiper.activeIndex];
          $(curSlide).css('opacity', 1);
          $(curSlide).prev().css('opacity', .3);
          $(curSlide).next().css('opacity', .3);
          // console.log(' swiper.slides',  swiper.slides, curSlide, $(curSlide).prev(), $(curSlide).next())
        },
        //处理分页器bug
        // onSlideChangeStart: function(swiper) {
        // 	if (swiper.activeIndex == 4) {
        // 		swiper.bullets.eq(9).addClass('swiper-pagination-bullet-active');
        // 		console.log(swiper.bullets.length);
        // 	}
        // }
      });
    }

    function lang(language) {
      $.i18n.init({
        // locales/'+language+'/translation.json
        lng: language, //指定语言
        resGetPath: `./locales/${language}/translate.json`,
        ns: {
          namespaces: ['translation', 'message'],
          defaultNs: 'translation' //默认使用的，不指定namespace时
        }
      }, function (err, t) {
        $('[data-i18n]').i18n(); // 通过选择器集体翻译
        $('[data-i18n-html]').each(function () {
          var date_name = $(this).attr("data-i18n-html");
          $(this).html($.t(date_name));
        });
      });
    }


    function loadEarth() {
      let aspect = width / height;
      let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      let scene = new THREE.Scene();

      let camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
      camera.position.z = 500;
      camera.up.y = 7;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      var system = new THREE.Group(); // planetary system

      scene.add(
        new THREE.AmbientLight(0xFFFFFF, 0.6)
      );

      let light = new THREE.DirectionalLight(0xFFFFFF, 3);
      light.position.set(1500, 2500, 0);
      scene.add(light);
      let texture = new THREE.TextureLoader().load("images/earthloop.png");
      let material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: .8
        // color: 0x0C2D4D
      });

      let planet = new THREE.Mesh(
        new THREE.SphereGeometry(140, 60, 60),
        material
      );

      system.add(planet);

      let textureW = new THREE.TextureLoader().load("images/outerloop.png");
      let materialW = new THREE.MeshLambertMaterial({
        map: textureW,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: .8
        // color: 0x0C2D4D
      });

      let asteroids = new THREE.Group();

      let asteroid = new THREE.Mesh(
        new THREE.SphereGeometry(180, 60, 60),
        materialW
      );
      asteroids.add(asteroid);
      // }

      system.add(asteroids);

      system.rotation.x = 0.1;
      system.rotation.y = -.3;
      system.rotation.z = -0.4;

      scene.add(system);


      function render() {
        requestAnimationFrame(render);

        planet.rotation.y += 0.011;
        planet.rotation.z -= 0.0005;

        asteroids.rotation.y += -0.003;

        renderer.render(scene, camera);
      }
      render();
    }

    return {
      init() {
        let langType = getCookie("language") || "en";
        lang(langType);
        loadEarth();
        splitText();
        checkLanguage();
        scrollMonitor();
        loadScrollMagic();
        loadSwiper();
        load3DSwiper();
      }
    }
  })()
  pageRender.init();