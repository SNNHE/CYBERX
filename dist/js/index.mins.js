!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);let o=document.getElementById("_img"),i=o.clientWidth,a=o.clientHeight;(function(){var e=$(window).height(),t=$(document).height();function n(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=`${e}=${t};expires=${o.toGMTString()}`}function r(e,t){var n=null;return function(...o){var i=this;n||(n=setTimeout((function(){e.call(i,...o),n=null}),t))}}function s(){let n=$(".nav-tab .title");n.each((function(){let o=$(this).attr("data-id"),i=$(o).offset().top,a=$(o).height(),r=$(window).scrollTop(),s=i-129,l=i+a-129;if(r+e+20>=t)return console.log(r,e,t),void function(e){let t=$("#last");e.removeClass("active"),t.addClass("active")}(n);$(this).removeClass("active"),r>s&&r<l&&$(this).addClass("active")}))}function l(){!function(){let e=$(".slide"),t=$(window);e.offset().top+240-t.scrollTop()<t.height()?(e.find(".slide-text").addClass("show"),e.find(".slide-img").addClass("show")):(e.find(".slide-text").removeClass("show"),e.find(".slide-img").removeClass("show"))}(),s()}function c(e){$.i18n.init({fallbackLng:[],lng:e,resGetPath:`./locales/${e}/translate.json`},(function(e,t){$("[data-i18n]").i18n(),$("[data-i18n-html]").each((function(){var e=$(this).attr("data-i18n-html");$(this).html($.t(e))}))}))}return{init(){c(function(e){for(var t=unescape(document.cookie).split("; "),n="",o=0;o<t.length;o++){var i=t[o].split("=");if(i[0]==e){n=i[1];break}}return n}("language")||"en"),function(){let e=i/a,t=new THREE.WebGLRenderer({antialias:!0,alpha:!0});t.setSize(i,a),o.appendChild(t.domElement);let n=new THREE.Scene,r=new THREE.PerspectiveCamera(50,e,.1,1e3);r.position.z=500,r.up.y=7,r.lookAt(new THREE.Vector3(0,0,0));var s=new THREE.Group;n.add(new THREE.AmbientLight(16777215,2));let l=new THREE.DirectionalLight(16777215,3);l.position.set(1500,2500,0),n.add(l);let c=(new THREE.TextureLoader).load("images/earthloop.png"),d=new THREE.MeshLambertMaterial({map:c,side:THREE.DoubleSide,transparent:!0,opacity:.8}),u=new THREE.Mesh(new THREE.SphereGeometry(130,60,60),d);s.add(u);let p=(new THREE.TextureLoader).load("images/outerloop.png"),f=new THREE.MeshLambertMaterial({map:p,side:THREE.DoubleSide,transparent:!0,opacity:.8,color:4093689}),g=new THREE.Group,h=new THREE.Mesh(new THREE.SphereGeometry(150,60,60),f);g.add(h),s.add(g),s.rotation.x=.1,s.rotation.y=-.3,s.rotation.z=-.4,n.add(s),function e(){requestAnimationFrame(e),u.rotation.y+=.011,g.rotation.y+=-.003,t.render(n,r)}()}(),function(){$("#textPrint").css("opacity",1);let e=$("#textPrint"),t=new SplitText(e,{type:"chars"});(new TimelineMax).staggerFrom(t.chars,.5,{opcity:0,scale:0,y:0,ease:Elastic.easeInOut},.05)}(),function(){let e=$(".nav .language"),t=$("#globalLocation .earth-location");e.click((function(){let e=$.trim($(this).text()),o=t.hasClass("zhbg");"English"===e?($(this).find(".text").text("简体中文"),!o&&t.addClass("zhbg"),c("zh"),n("language","zh",1)):($(this).find(".text").text("English"),o&&t.removeClass("zhbg"),c("en"),n("language","en",1))}))}(),function(){l();let e=$(window);e.scroll(r(l,800)),e.resize(r(s,800))}(),function(){let e=new ScrollMagic.Controller;["technology tec-introduce","technology tec-info-text","ourTeam team-introduce","industryBanner industry-title","industryBanner industry-slides","globalLocation global-title","globalLocation earth-location"].forEach((function(t,n){let o=t.split(" "),i=$("."+o[1]).hasClass("scroll-delay")?450:100,a=TweenMax.fromTo($("."+o[1]),1,{opacity:0},{opacity:1,ease:Bounce.easeInOut},.2);new ScrollMagic.Scene({triggerElement:"#"+o[0],offset:i,triggerHook:.95,duration:200}).setPin($("."+o[1])).setTween(a).addTo(e)})),$("#technology .card").each((function(t,n){let o;o=0===t?.95:1===t?.85:.75;let i=TweenMax.fromTo(n,1,{top:"50px",opacity:0},{top:0,opacity:1,ease:Linear.easeNone});new ScrollMagic.Scene({triggerElement:"#technology",offset:550,triggerHook:o,duration:200}).setPin($(n)).setTween(i).addTo(e)}));for(var t=document.getElementsByClassName("team-card"),n=0;n<t.length;n++)new ScrollMagic.Scene({triggerElement:t[n],offset:50,triggerHook:.9}).setClassToggle(t[n],"visible").addTo(e)}(),function(){let e=null;e=new Swiper("#banner .swiper-container",{pagination:"#banner .swiper-pagination",paginationClickable:!0,speed:800,autoplay:4400,autoplayDisableOnInteraction:!1,effect:"fade"})}(),new Swiper("#industryBanner .swiper-container",{watchSlidesProgress:!0,slidesPerView:"auto",centeredSlides:!0,loopedSlides:3,loop:!0,pagination:"#industryBanner .swiper-pagination",paginationClickable:!0,onProgress:function(e,t){console.log("onProgress");let n=e.slides[e.activeIndex];$(n).css("opacity",1),$(n).prev().css("opacity",.3),$(n).next().css("opacity",.3);for(let t=0;t<e.slides.length;t++){var o=e.slides.eq(t),i=e.slides[t].progress,a=1;Math.abs(i)>1&&(a=.3*(Math.abs(i)-1)+1);var r=i*a*337.5+"px",s=1-Math.abs(i)/5,l=999-Math.abs(Math.round(10*i));o.transform("translateX("+r+") scale("+s+")"),o.css("zIndex",l),Math.abs(i)>1&&o.css("opacity",0)}},onSetTransition:function(e,t){for(var n=0;n<e.slides.length;n++)e.slides.eq(n).transition(t)},onInit:function(e){const t=e.slides[e.activeIndex];$(t).prev().css("opacity",.3),$(t).next().css("opacity",.3)},onSlideChangeEnd:function(e){const t=e.slides[e.activeIndex];$(t).css("opacity",1),$(t).prev().css("opacity",.3),$(t).next().css("opacity",.3)}})}}})().init()},function(e,t,n){}]);