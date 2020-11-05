!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);(function(){let e=function(e,t){return function(){return e.apply(t,arguments)}};this.StackedCards=function(){function t(t){let n=t||{};this.options=this._extends(n,{layout:"slide",onClick:void 0,transformOrigin:"center",selector:"ul"}),this.draw=e(this.draw,this),this.init()}return t.prototype._extends=function(e,t){let n;for(const o in t)n=t[o],null==e[o]&&(e[o]=n);return e},t.prototype.init=function(){this.element=window.document.documentElement;let e=document.readyState;"inter"===e||"complete"===e?this.draw():document.addEventListener("DOMContentLoaded",this.draw)},t.prototype.draw=function(){let t=this,n=t.options.selector,o=t.els=document.querySelectorAll(n+" li");t.parent=o[0].parentNode;let i=o[0].getBoundingClientRect().height;o[0].parentNode.style.height=parseInt(i)+"px";let a=((o.length%2==0?-2:-1)+o.length)/2;function r(e,n){let i=n||e.target,a=0,r=0;n=n||e.target;do{i.nextElementSibling;a+=1}while(i=i.nextElementSibling);i=n||e.target;do{i.previousElementSibling;r+=1}while(i=i.previousElementSibling);t.addTransformsOnenter(a-1,r-1),t.loopNodeList(o,(function(e){e.classList.remove("active")})),n.classList.add("active"),n.classList.add(t.options.layout),n.style.zIndex=5*o.length,n.style.transform="translate(-50%, 0%)  scale(1)",void 0!==t.options.onClick&&t.options.onClick(n)}[].forEach.call(o,(function(n){n.style.transformOrigin=t.options.transformOrigin,n.addEventListener("mouseenter",e(r,t),!1)})),r.call(t,null,o[a])},t.prototype.addTransformsOnenter=function(e,t){let n=10,o=[].slice.call(this.els),i=1,a=0,r="",l=this.options.layout,s=Math.max(t,e),c=50/s,d=50/s;i=t>e?1/(t+1):1-t*(1/(e+3));for(var u=0;u<t;u++){switch(l){case"slide":u>0&&(i+=1/(s+1)),a=-50-c*(t-u),r="rotate(0deg)";break;default:a=-1*(150-2*c*u),r="rotate(0deg)"}let e=`translate(${a}%, 0%) scale(${i}) ${r}`;n+=1,o[u].style.transform=e,o[u].style.zIndex=n}n-=1;let f=0;i=1;for(u=t+1;u<e+t+1;u++){switch(f+=1,l){case"slide":i-=1/(s+3),a=-1*(50-d*f),r="rotate(0deg)";break;default:a=-1*(50-2*c*u),r="rotate(0deg)"}let e=`translate(${a}%, 0%) scale(${i}) ${r}`;n-=1,o[u].style.transform=e,o[u].style.zIndex=n}},t.prototype.loopNodeList=function(e,t,n){for(var o=0;o<e.length;o++)t.call(n,e[o])},t}()}).call(window),function(){let e=$(window).height(),t=null;function n(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=`${e}=${t};expires=${o.toGMTString()}`}function o(e,t=500){var n=null,o=0;return function(...i){var a=this,r=new Date,l=t-(r-o);l<=0?(clearTimeout(n),n=null,o=r,e.call(a,...i)):n=setTimeout((function(){clearTimeout(n),n=null,o=new Date,e.call(a,...i)}),l)}}function i(){if(window.isPhone())return;let t=$(".nav-tab .title"),n=$(window).scrollTop(),o=$(document).height();t.each((function(){let i=$(this).attr("data-id"),a=$(i).offset().top,r=a-129,l=a+$(i).height()-129;n+e+50>=o?function(e){let t=$("#last");e.removeClass("active"),t.addClass("active")}(t):($(this).removeClass("active"),n>r&&n<l&&$(this).addClass("active"))}))}function a(e){$.i18n.init({fallbackLng:[],lng:e,resGetPath:`./locales/${e}/translate.json`},(function(e,t){$("[data-i18n]").i18n(),$("[data-i18n-html]").each((function(){var e=$(this).attr("data-i18n-html");$(this).html($.t(e)),function(){$("#textPrint").css("opacity",1);let e=$("#textPrint"),t="en"===s()?"words":"chars",n=new SplitText(e,{type:t});(new TimelineMax).staggerFrom("words"===t?n.words:n.chars,.8,{opcity:0,scale:0,y:0,ease:Elastic.easeInOut},.1)}()}))}))}function r(){let e=$("#_img").find("canvas"),n=.6*(document.documentElement.clientWidth-180-101)-50;e.width(n),t=new THREE.PerspectiveCamera(50,n/900,.1,1e3),t.position.z=n<640?600:500,t.updateProjectionMatrix()}function l(){let e=$(".m-icon"),t=$(".nav");e&&e.on("click",(function(){t.hasClass("openNav")?t.removeClass("openNav"):t.addClass("openNav")}))}function s(){let e=function(e){for(var t=unescape(document.cookie).split("; "),n="",o=0;o<t.length;o++){var i=t[o].split("=");if(i[0]==e){n=i[1];break}}return n}("language");if(e)return e;let t=function(e){let t=location.search,n="";if(e&&t&&"?"===t[0]){t.substr(1).split("&").forEach(t=>{t&&t.split("=")[0]===e&&(n=t.split["="][1])})}return n}("locale").toLowerCase();if(["zh","en"].indexOf(t)>=0)return t;let n=navigator.language.slice(0,2);return["zh","en"].indexOf(n)>=0?n:"en"}return{init(){let e=s(),c=$(".nav .language");"en"===e?c.find(".text").text("English"):c.find(".text").text("简体中文"),"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js",{scope:"/"}).then((function(e){e.installing?console.log("Service worker installing"):e.waiting?console.log("Service worker installed"):e.active&&console.log("Service worker active")})).catch((function(e){console.log("Registration failed with"+e)})),a(e),function(){let e=$("#_img"),n=.6*(document.documentElement.clientWidth-180-101)-50,o=n/900,i=new THREE.WebGLRenderer({antialias:!0,alpha:!0});i.setSize(n,900),e.append(i.domElement);let a=new THREE.Scene;t=new THREE.PerspectiveCamera(50,o,.1,1e3),t.position.z=n<640?600:500,t.up.y=7,t.lookAt(new THREE.Vector3(0,0,0));var r=new THREE.Group;a.add(new THREE.AmbientLight(16777215,2));let l=new THREE.DirectionalLight(16777215,3);l.position.set(1500,2500,0),a.add(l);let s=(new THREE.TextureLoader).load("images/earthloop.png"),c=new THREE.MeshLambertMaterial({map:s,side:THREE.DoubleSide,transparent:!0,opacity:.8}),d=new THREE.Mesh(new THREE.SphereGeometry(130,60,60),c);r.add(d);let u=(new THREE.TextureLoader).load("images/outerloop.png"),f=new THREE.MeshLambertMaterial({map:u,side:THREE.DoubleSide,transparent:!0,opacity:.8,color:4093689}),g=new THREE.Group,p=new THREE.Mesh(new THREE.SphereGeometry(150,60,60),f);g.add(p),r.add(g),r.rotation.x=.1,r.rotation.y=-.3,r.rotation.z=-.4,a.add(r),function e(){requestAnimationFrame(e),d.rotation.y+=8e-4,g.rotation.y+=-.001,i.render(a,t)}()}(),function(){let e=$(".nav .language"),t=$("#globalLocation .earth-location");e.click((function(){let e=$.trim($(this).text());t.hasClass("zhbg");"English"===e?($(this).find(".text").text("简体中文"),a("zh"),n("language","zh",1)):($(this).find(".text").text("English"),a("en"),n("language","en",1))}))}(),function(){let e=null;e=new Swiper("#banner .swiper-container",{pagination:"#banner .swiper-pagination",paginationClickable:!0,speed:800,autoplay:3400,loop:!0,autoplayDisableOnInteraction:!1}),e.container[0].onmouseover=function(){e.stopAutoplay()},e.container[0].onmouseout=function(){e.startAutoplay()}}(),function(){let e=new ScrollMagic.Controller,t=document.getElementsByClassName("team-card"),n=document.getElementsByClassName("slide"),o=$("#technology .card");["technology tec-introduce","technology tec-info-text","ourTeam team-introduce","ourTeam stacked-img","globalLocation global-title","globalLocation earth-location"].forEach((function(t){let n=t.split(" "),o="."+n[1],i=$(o).hasClass("scroll-delay"),a=i?200:100;a=i&&window.isPhone()?250:a,a=".stacked-img"===o?1500:a;let r=TweenMax.fromTo($(o),1,{opacity:0},{opacity:1,ease:Bounce.easeInOut});new ScrollMagic.Scene({triggerElement:"#"+n[0],offset:a,triggerHook:window.isPhone()?.65:.85,duration:200}).setPin($(o)).setTween(r).addTo(e)})),o.each((function(t,n){let o,i=$(n);o=0===t?.95:1===t?.85:.75;let a=TweenMax.fromTo(n,1,{top:"50px",opacity:0},{top:0,opacity:1,ease:Linear.easeNone});new ScrollMagic.Scene({triggerElement:"#technology",offset:550,triggerHook:o,duration:200}).setPin(i).setTween(a).addTo(e)}));for(var i=0;i<t.length;i++)new ScrollMagic.Scene({triggerElement:t[i],offset:50,triggerHook:.9}).setClassToggle(t[i],"visible").addTo(e);for(let t=0;t<n.length;t++){let o=$(n[t]),i=o.find(".slide-text"),a=o.find(".slide-img");new ScrollMagic.Scene({triggerElement:o[0],offset:100,triggerHook:.85}).setClassToggle([i[0],a[0]],"show").addTo(e)}}(),l(),function(){i();let e=$(window);e.scroll(o(i,800)),e.resize(o(i,800))}(),$(".nav-tab").on("click",(function(e){const t=$(e.target).attr("data-id");if(t){const e=$(t).offset().top;$("html,body").animate({scrollTop:e},400)}})),window.addEventListener("resize",(o(l,800),void o(r,500)),!1)}}}().init()},function(e,t,n){}]);