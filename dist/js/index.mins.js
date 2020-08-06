!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);(function(){let e=function(e,t){return function(){return e.apply(t,arguments)}};this.StackedCards=function(){function t(t){let n=t||{};this.options=this._extends(n,{layout:"slide",onClick:void 0,transformOrigin:"center",selector:"ul"}),this.draw=e(this.draw,this),this.init()}return t.prototype._extends=function(e,t){let n;for(const o in t)n=t[o],null==e[o]&&(e[o]=n);return e},t.prototype.init=function(){this.element=window.document.documentElement;let e=document.readyState;"inter"===e||"complete"===e?this.draw():document.addEventListener("DOMContentLoaded",this.draw)},t.prototype.draw=function(){let t=this,n=t.options.selector,o=t.els=document.querySelectorAll(n+" li");t.parent=o[0].parentNode;let i=o[0].getBoundingClientRect().height;o[0].parentNode.style.height=parseInt(i)+"px";let a=((o.length%2==0?-2:-1)+o.length)/2;function r(e,n){let i=n||e.target,a=0,r=0;n=n||e.target;do{i.nextElementSibling;a+=1}while(i=i.nextElementSibling);i=n||e.target;do{i.previousElementSibling;r+=1}while(i=i.previousElementSibling);t.addTransformsOnenter(a-1,r-1),t.loopNodeList(o,(function(e){e.classList.remove("active")})),n.classList.add("active"),n.classList.add(t.options.layout),n.style.zIndex=5*o.length,n.style.transform="translate(-50%, 0%)  scale(1)",void 0!==t.options.onClick&&t.options.onClick(n)}[].forEach.call(o,(function(n){n.style.transformOrigin=t.options.transformOrigin,n.addEventListener("mouseenter",e(r,t),!1)})),r.call(t,null,o[a])},t.prototype.addTransformsOnenter=function(e,t){let n=10,o=[].slice.call(this.els),i=1,a=0,r="",l=this.options.layout,s=Math.max(t,e),c=50/s,d=50/s;i=t>e?1/(t+1):1-t*(1/(e+3));for(var u=0;u<t;u++){switch(l){case"slide":u>0&&(i+=1/(s+1)),a=-50-c*(t-u),r="rotate(0deg)";break;default:a=-1*(150-2*c*u),r="rotate(0deg)"}let e=`translate(${a}%, 0%) scale(${i}) ${r}`;n+=1,o[u].style.transform=e,o[u].style.zIndex=n}n-=1;let f=0;i=1;for(u=t+1;u<e+t+1;u++){switch(f+=1,l){case"slide":i-=1/(s+3),a=-1*(50-d*f),r="rotate(0deg)";break;default:a=-1*(50-2*c*u),r="rotate(0deg)"}let e=`translate(${a}%, 0%) scale(${i}) ${r}`;n-=1,o[u].style.transform=e,o[u].style.zIndex=n}},t.prototype.loopNodeList=function(e,t,n){for(var o=0;o<e.length;o++)t.call(n,e[o])},t}()}).call(window),function(){var e=$(window).height(),t=$(document).height();function n(){let e=navigator.userAgent,t=["Android","iPhone","SymbianOS","iPad","Windows Phone","iPod"],n=!1;for(let o=0;o<t.length;o++){const i=t[o];if(e.indexOf(i)>0){n=!0;break}}return n}function o(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=`${e}=${t};expires=${o.toGMTString()}`}function i(e){for(var t=unescape(document.cookie).split("; "),n="",o=0;o<t.length;o++){var i=t[o].split("=");if(i[0]==e){n=i[1];break}}return n}function a(e,t){var n=null;return function(...o){var i=this;n||(n=setTimeout((function(){e.call(i,...o),n=null}),t))}}function r(){let e=$(".slide"),t=$(window);(n()?e.offset().top+140:e.offset().top+240)-t.scrollTop()<t.height()?(e.find(".slide-text").addClass("show"),e.find(".slide-img").addClass("show")):(e.find(".slide-text").removeClass("show"),e.find(".slide-img").removeClass("show"))}function l(){if(n())return;let o=$(".nav-tab .title");o.each((function(){let n=$(this).attr("data-id"),i=$(n).offset().top,a=$(n).height(),r=$(window).scrollTop(),l=i-129,s=i+a-129;r+e+50>=t?function(e){let t=$("#last");e.removeClass("active"),console.log("===",t),t.addClass("active")}(o):($(this).removeClass("active"),r>l&&r<s&&$(this).addClass("active"))}))}function s(){r(),l()}function c(e){$.i18n.init({fallbackLng:[],lng:e,resGetPath:`./locales/${e}/translate.json`},(function(e,t){$("[data-i18n]").i18n(),$("[data-i18n-html]").each((function(){var e=$(this).attr("data-i18n-html");$(this).html($.t(e)),function(){$("#textPrint").css("opacity",1);let e=$("#textPrint"),t=i("language")||"en",n="en"===t?"words":"chars";console.log(n,t,"-==");let o=new SplitText(e,{type:n});(new TimelineMax).staggerFrom("words"===n?o.words:o.chars,.8,{opcity:0,scale:0,y:0,ease:Elastic.easeInOut},.1)}()}))}))}function d(){let e=$(".m-icon"),t=$(".nav");$(".nav-tab");e&&e.on("click",(function(){t.hasClass("openNav")?t.removeClass("openNav"):t.addClass("openNav")}))}return{init(){let e=i("language")||"en",t=$(".nav .language");c(e),console.log(e),"en"===e?t.find(".text").text("English"):t.find(".text").text("简体中文"),function(){let e=$("#_img");e.html("");let t=e.width()-50,n=t/900,o=new THREE.WebGLRenderer({antialias:!0,alpha:!0});o.setSize(t,900),e.append(o.domElement);let i=new THREE.Scene,a=new THREE.PerspectiveCamera(50,n,.1,1e3);a.position.z=500,a.up.y=7,a.lookAt(new THREE.Vector3(0,0,0));var r=new THREE.Group;i.add(new THREE.AmbientLight(16777215,2));let l=new THREE.DirectionalLight(16777215,3);l.position.set(1500,2500,0),i.add(l);let s=(new THREE.TextureLoader).load("images/earthloop.png"),c=new THREE.MeshLambertMaterial({map:s,side:THREE.DoubleSide,transparent:!0,opacity:.8}),d=new THREE.Mesh(new THREE.SphereGeometry(130,60,60),c);r.add(d);let u=(new THREE.TextureLoader).load("images/outerloop.png"),f=new THREE.MeshLambertMaterial({map:u,side:THREE.DoubleSide,transparent:!0,opacity:.8,color:4093689}),p=new THREE.Group,g=new THREE.Mesh(new THREE.SphereGeometry(150,60,60),f);p.add(g),r.add(p),r.rotation.x=.1,r.rotation.y=-.3,r.rotation.z=-.4,i.add(r),function e(){requestAnimationFrame(e),d.rotation.y+=8e-4,p.rotation.y+=-.001,o.render(i,a)}()}(),function(){let e=$(".nav .language"),t=$("#globalLocation .earth-location");e.click((function(){let e=$.trim($(this).text());t.hasClass("zhbg");"English"===e?($(this).find(".text").text("简体中文"),c("zh"),o("language","zh",1)):($(this).find(".text").text("English"),c("en"),o("language","en",1))}))}(),function(){s();let e=$(window);e.scroll(a(s,800)),e.resize(a(l,800))}(),function(){let e=new ScrollMagic.Controller;["technology tec-introduce","technology tec-info-text","ourTeam team-introduce","industryBanner industry-title","industryBanner stacked-img","industryBanner industry-slides","globalLocation global-title","globalLocation earth-location"].forEach((function(t,o){let i=t.split(" "),a=$("."+i[1]).hasClass("scroll-delay")?450:100;a=$("."+i[1]).hasClass("scroll-delay")&&n()?250:80;let r=TweenMax.fromTo($("."+i[1]),1,{opacity:0},{opacity:1,ease:Bounce.easeInOut},.2);new ScrollMagic.Scene({triggerElement:"#"+i[0],offset:a,triggerHook:n()?.65:.75,duration:200}).setPin($("."+i[1])).setTween(r).addTo(e)})),$("#technology .card").each((function(t,n){let o;o=0===t?.95:1===t?.85:.75;let i=TweenMax.fromTo(n,1,{top:"50px",opacity:0},{top:0,opacity:1,ease:Linear.easeNone});new ScrollMagic.Scene({triggerElement:"#technology",offset:550,triggerHook:o,duration:200}).setPin($(n)).setTween(i).addTo(e)}));for(var t=document.getElementsByClassName("team-card"),o=0;o<t.length;o++)new ScrollMagic.Scene({triggerElement:t[o],offset:50,triggerHook:.9}).setClassToggle(t[o],"visible").addTo(e)}(),function(){let e=null;e=new Swiper("#banner .swiper-container",{pagination:"#banner .swiper-pagination",paginationClickable:!0,speed:800,autoplay:3400,loop:!0,autoplayDisableOnInteraction:!1})}(),d(),new Swiper("#industryBanner .swiper-container",{loop:!0,autoplayDisableOnInteraction:!1,pagination:"#industryBanner .swiper-pagination",paginationClickable:!0}),window.addEventListener("resize",a(d,800),!1),window.addEventListener("resize",a(r,800),!1)}}}().init()},function(e,t,n){}]);