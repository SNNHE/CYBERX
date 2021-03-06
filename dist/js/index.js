import '../css/index.css';
  (function () {
    let _bind = function (fn, arg) {
      // console.log(fn, 'fn');
      return function () {
        return fn.apply(arg, arguments);
      }
    }
    this.StackedCards = (function() {
      function StackedCards(options) {
        let opt = options || {};
        this.options = this._extends(opt, {
          layout: "slide",
          onClick: undefined,
          transformOrigin: "center",
          selector: 'ul'
        });
        this.draw = _bind(this.draw, this);
        // console.log(this.options)
        this.init();
       };
       StackedCards.prototype._extends = function(opt, defaults) {
        let key, value;
        for (const k in defaults) {
            value = defaults[k];
            if (opt[k] == null) {
              opt[k] = value
            } 
        }
        return opt;
       }
        StackedCards.prototype.init = function(){
            // console.log('object')
          // console.log(this);
          this.element = window.document.documentElement;
          let ref = document.readyState;
          if (ref === 'inter' || ref === 'complete') {
            this.draw();
          } else {
            document.addEventListener("DOMContentLoaded", this.draw)
          }
  
        }
  
        StackedCards.prototype.draw = function() {
          let self = this;
          // console.log(this, 'this draw')
          let selector = self.options.selector;
          let els = self.els = document.querySelectorAll(selector + ' li');
          // console.log('els',els)
          self.parent = els[0].parentNode;
          let getItemHeight = els[0].getBoundingClientRect().height;
          els[0].parentNode.style.height = parseInt(getItemHeight) + 'px';
          // 求中间索引
          let lenAdjust = els.length % 2 == 0 ? -2 : -1;
          let oneHalf = (lenAdjust + els.length) / 2;
          var activeTransform ="translate(" + -50 + "%, 0%)  scale(1)";
          // this.detectSwipe();
          [].forEach.call(els, function(el) {
            el.style.transformOrigin = self.options.transformOrigin;
            // console.log(self);
            el.addEventListener('mouseenter', _bind(_enter,self), false);
          })
          function _enter(e, el){
              let enterEl = el || e.target;
              let nextCnt = 0,// 后面的个数
               prevCnt = 0;// 前面的个数
              el = el || e.target;
              do {
                let next = enterEl.nextElementSibling;
                nextCnt = nextCnt + 1;
              } while(enterEl = enterEl.nextElementSibling);
              enterEl = el || e.target;
              do {
                let prev = enterEl.previousElementSibling;
                prevCnt = prevCnt + 1;
              } while(enterEl = enterEl.previousElementSibling);
              self.addTransformsOnenter(nextCnt - 1, prevCnt - 1);
              self.loopNodeList(els, function(el) {
                el.classList.remove("active");
              });
              el.classList.add("active");
              el.classList.add(self.options.layout);
              el.style.zIndex = els.length * 5;
              el.style.transform = activeTransform;
              if (self.options.onClick !== undefined) {
                self.options.onClick(el);
              }
            }
            // console.log(els[oneHalf], oneHalf, 'els[oneHalf]')
          _enter.call(self,null,els[oneHalf])
        }
        StackedCards.prototype.addTransformsOnenter = function(nextCnt, prevCnt){
          let z = 10;
          let els = [].slice.call(this.els);
          let scale = 1, tarnslateX = 0, rotate = "";
          let layout = this.options.layout;
          let maxCutDivisor = Math.max(prevCnt, nextCnt);
          let prevDivisor = 50 / maxCutDivisor;
          let nextDivisor = 50 / maxCutDivisor;
          if (prevCnt > nextCnt) {
            scale = 1 / (prevCnt + 1);
          } else {
            scale = 1 - prevCnt * (1 / (nextCnt + 3));
          }
          for(var i = 0; i < prevCnt; i++) {
            switch(layout) {
              case "slide": 
                if (i > 0) {
                  scale = scale + 1 / (maxCutDivisor + 1); // 0.5的基础上越来越大
                }
                tarnslateX = -50 - prevDivisor * (prevCnt - i);
                rotate = "rotate(0deg)";
                break;
              default: 
                tarnslateX = (150 - prevDivisor * 2 * i) * -1;
                rotate = "rotate(0deg)";
            }
            let styleStr = `translate(${tarnslateX}%, 0%) scale(${scale}) ${rotate}`;
            // console.log(styleStr, 'styleStr')
            z = z + 1;
            els[i].style.transform = styleStr;
            els[i].style.zIndex = z;
          }
          z = z - 1;
          let j = 0;
          scale = 1;
          for(var i = prevCnt + 1; i < nextCnt + prevCnt + 1; i++) {
            j = j + 1;
            switch (layout) {
              case "slide":
                scale = scale - 1 / (maxCutDivisor + 3);// 0.5的基础上越来越小；
                tarnslateX = (50 - nextDivisor * j) * -1;// 从左到右越来越大
                rotate = "rotate(0deg)";
                break;
            
              default:
                tarnslateX = (50 - prevDivisor * 2 * i) * -1;
                rotate = "rotate(0deg)";
                break;
            }
            let styleStr = `translate(${tarnslateX}%, 0%) scale(${scale}) ${rotate}`;
            // console.log(styleStr, 'styleStr')
            z = z - 1;
            els[i].style.transform = styleStr;
            els[i].style.zIndex = z;
          }
        }
        StackedCards.prototype.loopNodeList = function(els, callback, scope) {
          for(var i = 0; i< els.length; i++) {
            callback.call(scope, els[i]);
          }
        }
      return StackedCards
    })()
  }).call(window)

  let pageRender = (function () {
    let winH = $(window).height();
    let camera = null;
    let navHeight = 20 + 109;
    // var docH =  $(document).height();
    // function isPhone() {
    //   let userAgent = navigator.userAgent;
    //   let mobile = ['Android', 'iPhone', 'SymbianOS', 'iPad', 'Windows Phone', 'iPod'];
    //   let flag = false;
    //   for (let v = 0; v < mobile.length; v++) {
    //     const cur = mobile[v];
    //     if (userAgent.indexOf(cur) > 0) {
    //       flag = true;
    //       break;
    //     }   
    //   }
    //   return flag;
    // }

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

    function throttle(fn, wait = 500) {
      var timer = null,
          previous = 0;
      return function (...args) {
        var _this = this,
            now = new Date(),
            remaining = wait - (now - previous);
        if (remaining <= 0) {
          clearTimeout(timer);
          timer = null;
          previous = now;
          fn.call(_this, ...args);
        } else {
          timer = setTimeout(function() {
            clearTimeout(timer);
            timer = null;
            previous = new Date();
            fn.call(_this, ...args);
          }, remaining)
        }
        // if (!timer) {
        //   timer = setTimeout(function () {
        //     fn.call(_this, ...args);
        //     timer = null;
        //   }, wait);
        // }
      }
    }

    function splitText() {
      $('#textPrint').css('opacity', 1);
      let target = $('#textPrint');
      let lan = defaultLang();
      let type = lan === 'en' ? 'words' : 'chars';
      // console.log(type, lan, '-==')
      let split = new SplitText(target, { type });
      let tl = new TimelineMax();
      tl.staggerFrom(
        type === 'words' ? split.words : split.chars,
        0.8,
        { opcity: 0, scale: 0, y: 0, ease:Elastic.easeInOut},
        0.1
      );
    }

    function checkLanguage() {
      let language = $('.nav .language'),
        changeImg = $('#globalLocation .earth-location');
      language.click(function () {
        let text = $.trim($(this).text());
        let hasClass = changeImg.hasClass('zhbg');
        // console.log( $.trim($(this).text()), ' $(this).text();')
        if (text === 'English') {
          $(this).find('.text').text('简体中文');
          // hasClass ? null : changeImg.addClass('zhbg');
          lang("zh");
          saveCookie("language", "zh", 1);
        } else {
          $(this).find('.text').text('English');
          // hasClass ? changeImg.removeClass('zhbg') : null;
          lang("en");
          saveCookie("language", "en", 1);
        }
      })
    }

    function loadScrollMagic() {
      let controller = new ScrollMagic.Controller();
      let teamCard = document.getElementsByClassName("team-card");
      let slide = document.getElementsByClassName("slide");
      let $technologyCard = $('#technology .card');
      let domArr = ['technology tec-introduce', 'technology tec-info-text', 'ourTeam team-introduce', 'ourTeam stacked-img', 'globalLocation global-title', 'globalLocation earth-location'];
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

      
      domArr.forEach(function (item) {
        let target = item.split(' '),
            $target = `.${target[1]}`,
            hasClass = $($target).hasClass('scroll-delay');
        let offset = hasClass ? 200 : 100;
            offset = hasClass && window.isPhone() ? 250 : offset;
            offset = $target === '.stacked-img' ? 1500 : offset;
        let tl = TweenMax.fromTo($($target), 1, {
          opacity: 0
        }, {
          opacity: 1,
          ease: Bounce.easeInOut
        });
        new ScrollMagic.Scene({
          triggerElement: `#${target[0]}`,
          offset,
          triggerHook: window.isPhone() ? .65 : .85,
          duration: 200,
        }).setPin($($target)).setTween(tl).addTo(controller);
      })

      //#technology .card
      $technologyCard.each(function (i, item) {
        // console.log(item)     
        let triggerHook,
            $item = $(item);
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
        }).setPin($item).setTween(tl).addTo(controller);
      })

      // team card
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


      for (let i = 0; i < slide.length; i++) {
        let $slide = $(slide[i]),
            $slideText = $slide.find('.slide-text'),
            $slideImg = $slide.find('.slide-img');
        new ScrollMagic.Scene({
          triggerElement: $slide[0],
          offset: 100,
          triggerHook: 0.85,
        })
          // .setPin($(slide[i]))
          .setClassToggle([$slideText[0], $slideImg[0]], "show") // add class toggle
          .addTo(controller)
      }

    }

    // function showSwiper() {
    //   let slide = $('.slide'),
    //       win = $(window),
    //       slideOffsetTop = window.isPhone() ? slide.offset().top + 140  : slide.offset().top + 240,
    //       winScrollTop = win.scrollTop(),
    //       winH = win.height();
    //   // console.log('slideOffsetTop', slideOffsetTop - winScrollTop, winH)
    //   if (slideOffsetTop - winScrollTop < winH) {
    //     slide.find('.slide-text').addClass('show');
    //     slide.find('.slide-img').addClass('show');
    //   } else {
    //     slide.find('.slide-text').removeClass('show');
    //     slide.find('.slide-img').removeClass('show');
    //   }
    // } 

    function navMonitor() {
      if (window.isPhone()) return;
      let navTitleList = $('.nav-tab .title'),
          winScrollT = $(window).scrollTop(),
          docH = $(document).height();
      navTitleList.each(function () {
        let id = $(this).attr('data-id');
        let itemOffTop = $(id).offset().top,
            itemHeight = $(id).height();
        let offsetTop = itemOffTop - navHeight;
        let offsetBottom = itemOffTop + itemHeight - navHeight;
          //  console.log(winScrollT, winH, docH)
        if(winScrollT + winH + 50 >= docH){ 
          removeActive(navTitleList);
          return;
        }
        $(this).removeClass('active');
        // console.log('offsetTop', offsetTop, winScrollT, 'winScrollT', offsetBottom, 'offsetBottom', winScrollT > offsetTop, winScrollT < offsetBottom);
        if (winScrollT > offsetTop && winScrollT < offsetBottom) {
          $(this).addClass('active');
        }
      })
    }

    function removeActive(navTitleList){
      let last = $('#last');
      navTitleList.removeClass('active');
      last.addClass('active');
    }

    // function scrollEvent() {
    //   showSwiper();
    //   navMonitor()
    // }

    function scrollMonitor() {
      // scrollEvent()
      navMonitor()
      let win = $(window);
      win.scroll(throttle(navMonitor, 800));
      win.resize(throttle(navMonitor, 800));
    }

    function loadSwiper() {
      let swiper = null;
      swiper = new Swiper('#banner .swiper-container', {
        pagination: '#banner .swiper-pagination',
        paginationClickable: true,
        speed:800,
        autoplay:3400,
        loop: true,
        autoplayDisableOnInteraction: false,
        // effect: 'fade',
      });
      //鼠标覆盖停止自动切换
      swiper.container[0].onmouseover=function(){
        swiper.stopAutoplay();
      }
      //鼠标移出开始自动切换
      swiper.container[0].onmouseout=function(){
        swiper.startAutoplay();
      }
    }
    // function load3DSwiper() {
    //   new Swiper('#industryBanner .swiper-container', {
    //     // watchSlidesProgress: true,
    //     // slidesPerView: 'auto',
    //     // centeredSlides: true,
    //     // loopedSlides: 3,
    //     loop: true,
    //     autoplayDisableOnInteraction: false,
    //     pagination: '#industryBanner .swiper-pagination',
    //     paginationClickable: true,
    //     //处理分页器bug
    //     // onSlideChangeStart: function(swiper) {
    //     // 	if (swiper.activeIndex == 4) {
    //     // 		swiper.bullets.eq(9).addClass('swiper-pagination-bullet-active');
    //     // 		console.log(swiper.bullets.length);
    //     // 	}
    //     // }
    //   });
    // }

    function lang(language) {
      $.i18n.init({
        // locales/'+language+'/translation.json
        fallbackLng: [],
        lng: language, //指定语言
        resGetPath: `./locales/${language}/translate.json`,
        // ns: {
        //   namespaces: ['translation', 'message'],
        //   defaultNs: 'translation' //默认使用的，不指定namespace时
        // }
      }, function (err, t) {
        $('[data-i18n]').i18n(); // 通过选择器集体翻译
        $('[data-i18n-html]').each(function () {
          var date_name = $(this).attr("data-i18n-html");
          $(this).html($.t(date_name));
          splitText();
        });
      });
    }


    function loadEarth() {
      let container = $("#_img");
      // container.html('');
      // let width = container.width() - 50;
      let width = (document.documentElement.clientWidth - 180 - 101) * 0.6 - 50;
      let	height = 900;
      let aspect = width / height;
      let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      container.append(renderer.domElement);

      let scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
      if(width < 640) {
        camera.position.z = 600; // 越大球越小
      } else {
        camera.position.z = 500; // 越大球越小
      }
      camera.up.y = 7;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
  
      var system = new THREE.Group(); // planetary system

      scene.add(
        new THREE.AmbientLight(0xFFFFFF, 2)
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
        new THREE.SphereGeometry(130, 60, 60),
        material
      );

      system.add(planet);

      let textureW = new THREE.TextureLoader().load("images/outerloop.png");
      let materialW = new THREE.MeshLambertMaterial({
        map: textureW,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: .8,
        color: 0X3E76F9
      });

      let asteroids = new THREE.Group();

      let asteroid = new THREE.Mesh(
        new THREE.SphereGeometry(150, 60, 60),
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

        planet.rotation.y += 0.0008;
        // planet.rotation.z -= 0.0005;

        asteroids.rotation.y += -0.001;

        renderer.render(scene, camera);
      }
      render();
    }

    function earthSize() {
      let container = $("#_img").find('canvas');
      // // camera.position.set(x,y,z)
      // let width = container.width();
      let width = (document.documentElement.clientWidth - 180 - 101) * 0.6 - 50;
      container.width(width);
      camera = new THREE.PerspectiveCamera(50, width / 900, 0.1, 1000);
      if(width < 640) {
        camera.position.z = 600; // 越大球越小
      } else {
        camera.position.z = 500; // 越大球越小
      }
      camera.updateProjectionMatrix();
    }

    function navMinBar () {
      let $mIcon = $(".m-icon"),
          $nav = $('.nav');
      if (!$mIcon) return;
      $mIcon.on('click', function() {
        let has = $nav.hasClass('openNav');
        if (has) {
          $nav.removeClass('openNav');
        } else {
          $nav.addClass('openNav')
        }
      })
    }

    function clickNav() {
      let $navTab = $('.nav-tab');
      $navTab.on('click', function(e) {
        const targetAttr = $(e.target).attr('data-id');
        if (targetAttr) {
          const eleTop = $(targetAttr).offset().top;
          $('html,body').animate({
            scrollTop: eleTop,
          }, 400);
          // console.log( $(targetAttr))
        }
      })
    }

    function installSW() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/'}).then(function(reg) {
          if (reg.installing) {
            console.log('Service worker installing');
          } else if (reg.waiting) {
            console.log('Service worker installed');
          } else if(reg.active){
            console.log('Service worker active');
          }
        })
        .catch(function(error) {
          console.log('Registration failed with' + error);
        });
      }
    }
    function resizeFun() {
      throttle(navMinBar, 800);
      throttle(earthSize, 500)
    }

    function defaultLang() {
      let locales = getCookie("language");
      if (locales) {
        return locales;
      }
      let queryParamLocale = getQueryParam("locale").toLowerCase();
      if (['zh', 'en'].indexOf(queryParamLocale) >= 0) {
        return queryParamLocale;
      }

      let browserLocal = navigator.language.slice(0, 2);
      if (['zh', 'en'].indexOf(browserLocal) >= 0) {
        return browserLocal;
      }
      return 'en';
    }

    function getQueryParam(name) {
      let search = location.search,
          value = '';
      if (name && search && search[0] === '?') {
        let params = search.substr(1).split('&'); // ["locale=en", "id=11"]
        params.forEach(e => {
          if (e && e.split('=')[0] === name) {
            value = e.split['='][1];
            // continue;
          }
        });
      }
      return value;
    }


    return {
      init() {
        let langType = defaultLang(), $language = $('.nav .language');
        langType === 'en' ? $language.find('.text').text('English'): $language.find('.text').text('简体中文');
        installSW();
        lang(langType);
        loadEarth();
        checkLanguage();
        loadSwiper();
        loadScrollMagic();
        navMinBar();
        scrollMonitor();
        clickNav();
        // load3DSwiper();
        // console.log(window.StackedCards)
        // new StackedCards({selector: '.stacked-ul'});
        window.addEventListener('resize', resizeFun(), false);
      }
    }
  })()
  pageRender.init();