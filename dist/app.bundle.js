!function(e){function n(n){for(var a,i,l=n[0],s=n[1],c=n[2],u=0,h=[];u<l.length;u++)i=l[u],o[i]&&h.push(o[i][0]),o[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);for(d&&d(n);h.length;)h.shift()();return r.push.apply(r,c||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],a=!0,i=1;i<t.length;i++){var s=t[i];0!==o[s]&&(a=!1)}a&&(r.splice(n--,1),e=l(l.s=t[0]))}return e}var a={},i={3:0},o={3:0},r=[];function l(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.e=function(e){var n=[];i[e]?n.push(i[e]):0!==i[e]&&{5:1}[e]&&n.push(i[e]=new Promise(function(n,t){for(var a=e+".css",o=l.p+a,r=document.getElementsByTagName("link"),s=0;s<r.length;s++){var c=(d=r[s]).getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(c===a||c===o))return n()}var u=document.getElementsByTagName("style");for(s=0;s<u.length;s++){var d;if((c=(d=u[s]).getAttribute("data-href"))===a||c===o)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var a=n&&n.target&&n.target.src||o,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete i[e],h.parentNode.removeChild(h),t(r)},h.href=o,document.getElementsByTagName("head")[0].appendChild(h)}).then(function(){i[e]=0}));var t=o[e];if(0!==t)if(t)n.push(t[2]);else{var a=new Promise(function(n,a){t=o[e]=[n,a]});n.push(t[2]=a);var r,s=document.createElement("script");s.charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.src=function(e){return l.p+""+e+".app.bundle.js"}(e);var c=new Error;r=function(n){s.onerror=s.onload=null,clearTimeout(u);var t=o[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;c.message="Loading chunk "+e+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,t[1](c)}o[e]=void 0}};var u=setTimeout(function(){r({type:"timeout",target:s})},12e4);s.onerror=s.onload=r,document.head.appendChild(s)}return Promise.all(n)},l.m=e,l.c=a,l.d=function(e,n,t){l.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,n){if(1&n&&(e=l(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)l.d(t,a,function(n){return e[n]}.bind(null,a));return t},l.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(n,"a",n),n},l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.p="",l.oe=function(e){throw console.error(e),e};var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=n,s=s.slice();for(var u=0;u<s.length;u++)n(s[u]);var d=c;r.push([24,6]),t()}([,,,,function(e,n,t){"use strict";var a=t(0),i=t.n(a),o=t(14);var r={sendDialog:async e=>{const n={msg:e};try{const e=await fetch("/dialogflow",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});return await e.json()}catch(e){return console.log(e),e}},getSimplifiedLastDialog:e=>{let n="";for(const t of e.messages)n+=t.content;return{user:{text:e.queryText},bot:{text:n,intent:e.intent.displayName,subjects:e.subjects}}},getDebug:e=>e,getLog:(e,n)=>({agent:e,type:"DialogFlow",language:n.languageCode,conversation:n.fulfillmentMessages,messages:n.messages,data:n})},l=t(16),s=t.n(l),c=t(17),u=t.n(c),d=t(18),h=t.n(d),g=t(19),p=t.n(g),m=t(7);t.d(n,"a",function(){return _}),t.d(n,"d",function(){return A}),t.d(n,"c",function(){return j}),t.d(n,"b",function(){return E});let f,v,y,b=!1,k=null;const _=()=>{C("DialogFlow"),w(),i()("body").on("video-ended",e=>{x(),i()("body").off("video-ended")})},w=()=>{i()("#select-bot-dialogflow").click(()=>{C("DialogFlow")}),i()("#select-bot-recastai").click(()=>{C("RecastAI")}),i()("#about-button").click(()=>{D()})},C=async e=>{"RecastAI"==(f=e)?(v||(v=await t.e(4).then(t.bind(null,125))),k=v):"DialogFlow"==f&&(k=r),i()("#current-bot-name").html(`Bot: ${f}`)},x=()=>{let e=3e3*Math.random(.8,1);setTimeout(()=>{E("hello")},e)},A=e=>(I(e),E(e),!1),j=e=>{b=e},D=()=>{let e="md-dark";b&&(e="md-light ");const n={icon:"adb",iconColor:e,text:"this is the about text"},t=h()(n);i()(t).appendTo(i()("#conversation")),F()},I=e=>{let n="md-dark";b&&(n="md-light ");const t={icon:"account_circle",iconColor:n,text:e},a=s()(t);i()(a).appendTo(i()("#conversation")),F(),S("human",e)},E=async e=>{const n=await k.sendDialog(e);let t;if("RecastAI"==f?t=n.results.messages:"DialogFlow"==f&&(t=n.messages),t.length>0){let e=0,a=0;for(const i of t)"text"==i.type?a+=M(i.content)+500:a+=1e3,N(n,i,e,a),e=a;const i=await T(n);i&&P(i,a)}},T=async e=>{if(0==e.subjects.length)return null;Object(m.b)(e.subjects[0]);const n=k.getSimplifiedLastDialog(e),t=await fetch("/getVideo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});return await t.json()},M=e=>{return 1e3*Math.random(.1,1)+20*e.length},N=(e,n,t,a)=>{let r;"RecastAI"==f?r="filter_tilt_shift":"DialogFlow"==f&&(r="adb");let l="md-dark";b&&(l="md-light ");const s={icon:r,iconColor:l,debug:!0,text:""},c=u()(s),d=i()(c).appendTo(i()("#conversation")),h=i()(d).find(".balloon");null!=e&&d.data(e),F();const g=new o.a;if(g.on("done",()=>{i()("#spinner").remove(),function(e,n){i()(`<span>${n.content}</span>`).appendTo(e),F()}(h,n)}),g.start(a,1e3),null!=e){const e=i()(d).find(".debug-button");d.data().debug=!1,e.click(d,function(e){L(e,d)})}d.hide(),d.delay(t).toggle("slow"),S("bot",e)},P=(e,n)=>{let t=i.a.Event("botResponse",{videoData:e});i()("body").trigger(t)},S=(e,n)=>{let t={};"human"==e?(t.agent=e,t.message=n):"bot"==e&&(t=k.getLog(e,n))},L=async e=>{const n=i()(e.data);if(1==n.data().debug)e.stopPropagation(),n.data().debug=!1,n.find(".debug").remove();else{n.data().debug=!0;const e=k.getDebug(n.data());let a;"RecastAI"==f?y?a=y(e):await t.e(1).then(t.t.bind(null,126,7)).then(({default:n})=>{a=(y=n)(e)}):"DialogFlow"==f&&(a=p()(e)),i()(a).appendTo(i()(n))}F()},Y=()=>i()("#conversation")[0].scrollHeight,F=()=>{let e=Y();i()("#conversation-wrapper").animate({scrollTop:e},1e3)};i()(window).resize(function(){var e=i()(window).height()-i()("#conversation-input").outerHeight();i()("#conversation-wrapper").height(e);var n=Y();F(n)})},,,function(e,n,t){"use strict";t.d(n,"a",function(){return i}),t.d(n,"b",function(){return o});let a="";const i=()=>a,o=e=>a=e},function(e,n,t){"use strict";(function(e){var a=t(9),i=t.n(a),o=t(10);let r=!0;n.a={render:()=>{const n=o.home,t=i()(n);e("#app").empty()&&e("#app").append(t),e("#start").on("click",()=>{a()}),e("#title").on("click",()=>{a()}),e("body").keypress(e=>{32==e.which&&r&&(event.preventDefault(),r=!1,a())});const a=()=>{e("#app").empty();const n=e.Event("start");e("body").trigger(n)}}}}).call(this,t(0))},function(e,n,t){var a=t(2);e.exports=(a.default||a).template({compiler:[7,">= 4.0.0"],main:function(e,n,t,a,i){var o,r,l=null!=n?n:e.nullContext||{},s=t.helperMissing,c=e.escapeExpression;return'<div id="home">\n\n    <div id="intro" class="uk-section uk-section-seconday uk-height-viewport">\n        <div class="uk-container uk-container-xsmall uk-margin-large-top">\n\n            <div class="uk-margin-top uk-text-center">\n                <h1 id="title" class="uk-heading-xlarge uk-margin-large-bottom font-share-tech-mono uk-margin-remove-bottom">'+c("function"==typeof(r=null!=(r=t.title||(null!=n?n.title:n))?r:s)?r.call(l,{name:"title",hash:{},data:i}):r)+'</h1>\n\n                <div class="uk-container uk-animation-slide-bottom-medium uk-margin-large-bottom">\n                    <div class="avatar left">\n                        <i class="material-icons uk-light">adb</i>\n                    </div>\n                    <div class="balloon balloon-left balloon-home">\n                        <p class="uk-text-lead uk-margin-remove-bottom">'+c("function"==typeof(r=null!=(r=t.balloon||(null!=n?n.balloon:n))?r:s)?r.call(l,{name:"balloon",hash:{},data:i}):r)+'</p>\n                    </div>\n                </div>\n\n                <p class="uk-light uk-margin-large-bottom">'+(null!=(o="function"==typeof(r=null!=(r=t.description||(null!=n?n.description:n))?r:s)?r.call(l,{name:"description",hash:{},data:i}):r)?o:"")+'</p>\n            </div>\n\n            <div class="dialog uk-margin-large-top uk-animation-fade uk-light">\n                <a id="start" href="#" class="uk-link-text">\n                    <h5 class="uk-h5 uk-text-center font-share-tech-mono uk-text-uppercase">Press space to start.</h5>\n                </a>\n            </div>\n\n        </div>\n\n    </div>\n    <hr>\n    <div id="team" class="uk-margin-large-top">\n\n        <div class="uk-container uk-container-xsmall uk-margin-medium-top">\n\n            <div class="uk-light uk-text-center">\n                <h2 class="uk-h2 uk-margin-large-bottom font-share-tech-mono">Who developed?</h2>\n            </div>\n\n            <div class="dialog">\n                <div>\n                    <img class="uk-border-circle" data-src="assets/julia.jpg" width="50" height="50" alt="Julia Salles" uk-img>\n                    <span class="uk-light uk-text-bold uk-text-baseline uk-padding-small">Julia Salles</span>\n                </div>\n\n                <div class="balloon balloon-left balloon-home uk-margin-left">\n                    PhD candidate in Communication Studies at Université du Québec à Montréal and a Lecturer at\n                    Université de Montréal. <a href="mailto:juliacsalles@yahoo.com.br" class="uk-dark uk-link-text">juliacsalles@yahoo.com.br</a>\n                </div>\n            </div>\n\n            <div class="dialog">\n                <div class="uk-margin-large-top uk-align-right uk-margin-remove-bottom">\n                    <span class="uk-light uk-text-bold uk-text-baseline uk-padding-small">Luciano Frizzera</span>\n                    <img class="uk-border-circle" data-src="assets/luciano.jpg" width="50" height="50" alt="Luciano Frizzera" uk-img>\n                </div>\n\n                <div class="dialog balloon balloon-right balloon-home uk-margin-right">PhD candidate in Communication Studies at Concordia University. <a href="mailto:lucaju@gmail.com" class="uk-dark uk-link-text">lucaju@gmail.com</a>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n    <div id="about" class="uk-margin-large-top uk-light">\n\n        <div class="uk-container uk-container-xsmall">\n\n            <div class="uk-margin-top uk-text-center">\n                <h2 class="uk-h2 uk-margin-large-bottom font-share-tech-mono">Tell me more about the project</h2>\n            </div>\n            <div>'+(null!=(o="function"==typeof(r=null!=(r=t.about||(null!=n?n.about:n))?r:s)?r.call(l,{name:"about",hash:{},data:i}):r)?o:"")+'</div>\n        </div>\n    </div>\n\n\n    <div id="code" class="uk-margin-large-top uk-light">\n\n        <div class="uk-container uk-container-xsmall">\n\n            <div class="uk-margin-top uk-text-center">\n                <h2 class="uk-h2 uk-margin-large-bottom font-share-tech-mono">Can I see the code?</h2>\n            </div>\n\n            <div class="uk-container uk-container-xsmall uk-margin-large-top">\n                <div>\n                    <a href="" target="_blank">\n                        <img class="uk-align-center" width="45" data-src="assets/github.png" alt="Github" uk-img>\n                    </a>\n                </div>\n                <div class="uk-width-auto">\n                    <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">\n                        <img class="uk-align-center" width="100" data-src="assets/cc-by-nc.png" alt="CC" uk-img>\n                    </a>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n    <div id="sponsors" class="uk-margin-large-top uk-light">\n\n        <div class="uk-container uk-container-xsmall">\n\n            <div class="uk-margin-top uk-text-center">\n                <h2 class="uk-h2 uk-margin-large-bottom font-share-tech-mono">Have it received any support?</h2>\n            </div>\n\n            <div class="uk-grid-small uk-margin-large-bottom" uk-grid>\n\n                <div class="uk-width-expand">\n                    <a href="https://github.com/lucaju/dancing-fitbit" target="_blank">\n                        <img class="uk-align-center" width="80" data-src="assets/capes.png" alt="Capes" uk-img>\n                    </a>\n                </div>\n                <div class="uk-width-expand">\n                    <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">\n                        <img class="uk-align-center" width="100" data-src="assets/hexagram.png" alt="Hexagram" uk-img>\n                    </a>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>'},useData:!0})},function(e){e.exports=JSON.parse('{"home":{"title":"On Chance","balloon":"How randomness changes your life?","description":"From the uncertainty about the weather to the choices we make at the supermarket, chance is constantly affecting our lives. But if we could have more data and develop more precise models and algorithms, could we predict and control future events? On Chance is a documentary chatbot exploring the philosophy and science of randomness. Have a chat about how randomness affects our lives and explore the notion of chance through conversations, movie scenes, archive material and original interviews.","startButton":"Start","headphones":"Better with headphones","team":{"title":"Authors","list":[{"name":"Julia Salles","bio":"Julia Salles is a PhD candidate in Communication Studies at Université du Québec à Montréal and a Lecturer at Université de Montréal. She created the edited video of the dance performance, integrating the visuals and sounds produced by Luciano and Samuel. She also worked on developing this web interactive platform, as a way to present the materials in an interactive and non-linear form."},{"name":"Luciano Frizzera","bio":"Luciano Frizzera is a PhD candidate in Communication Studies at Concordia University. He retrieved the Fitbit data generated through Florence’s week of self-tracking – not only those accessible to the Fitbit user, but more extensively, those produced, collected and archived by Fitbit. He also worked on creating the visualizations, producing data-driven graphs, that aim to get rid of any linearity or consistency afforded by Fitbit to its user."}]},"about":"<p>The development of digital technologies and access to vast amounts of data have revived the human ambition to plan and control the future. Using predictive models based on large collections of data, analysts claim to be able to reduce uncertainty and increase control over interactions with the world.</p><p>Nevertheless, since the end of the 19th century, non-deterministic scientific fields have emerged putting randomness at the center of various theories. The development of statistical physics, quantum mechanics, molecular biology, chaos and algorithmic complexity, contributed to the questioning of the deterministic paradigm according to which all events are pre-determined by the past. On Chance addresses the apparent conflict between determinism and randomness in contemporary culture.</p><p>On Chance is part of a research-creation thesis in communication studies aiming to explore how chatbots can be used as interactive tools for conversational documentary storytelling. A chatbot is a human-computer interaction interface that uses artificial intelligence (AI), especially in natural language processing. In On Chance, the chatbot is an interactive tool to explore the archive material and original content.</p>","sponsors":{"title":"Sponsors","list":[{"name":"Sponsor 1","logo":"logo.png"},{"name":"Sponsor 1","logo":"logo.png"}]}}}')},function(e,n,t){"use strict";(function(e){var a=t(12),i=t(22);const o=()=>{const n=e("#video-section"),t=e("#side-bar");n.removeClass("l9 m8"),n.addClass("l12 m12"),t.css("display","none"),e("body").on("video-ended",()=>{n.removeClass("l12 m12"),n.addClass("l9 m8"),t.css("opacity",0),t.css("display","inline"),t.animate({opacity:1},3e3),e("body").off("video-ended"),e("textarea").focus()})};n.a={render:()=>{e('<div id="main" class="row">').appendTo(e("#app")),i.a.render(),a.a.render(),e(window).resize(),o()}}}).call(this,t(0))},function(e,n,t){"use strict";var a=t(0),i=t.n(a),o=t(13),r=t.n(o),l=t(4);let s=!1;const c=()=>{i()("#toggle-dark-mode").click(()=>{u()}),i()("#userinput").keypress(e=>{if(13==e.which){event.preventDefault();const e=i()("#userinput").val();i()("#userinput").val(""),l.d(e)}})},u=()=>{let e=i()("#side-bar"),n=i()("#conversation-wrapper"),t=i()("#conversation-input"),a=i()(".material-icons"),o=i()("#userinput");s?(s=!1,l.c(s),e.removeClass("darken-4"),n.removeClass("darken-4"),t.removeClass("darken-3"),a.removeClass("md-light"),e.addClass("lighten-5"),n.addClass("lighten-5"),t.addClass("lighten-5"),a.addClass("md-dark"),o.addClass("md-dark")):(s=!0,l.c(s),e.removeClass("lighten-5"),n.removeClass("lighten-5"),t.removeClass("lighten-5"),a.removeClass("md-dark"),o.removeClass("md-dark"),e.addClass("darken-4"),n.addClass("darken-4"),t.addClass("darken-3"),a.addClass("md-light"),o.addClass("md-light"))};n.a={render:()=>{const e=r()();i()(e).appendTo(i()("#main")),l.a(),c(),u()}}},function(e,n,t){var a=t(2);e.exports=(a.default||a).template({compiler:[7,">= 4.0.0"],main:function(e,n,t,a,i){return'<div id="side-bar" class="col l3 m4 s12 blue-grey lighten-5">\n\n    <div id="conversation-wrapper" class="blue-grey lighten-5">\n        <div id="conversation"></div>\n    </div>\n\n    <div id="conversation-input" class="blue-grey lighten-5 z-depth-3">\n        <div class="input-field col s12">\n            <textarea id="userinput" class="materialize-textarea" placeholder="Type here"></textarea>\n        </div>\n    </div>\n    \n</div>'},useData:!0})},,,function(e,n,t){var a=t(2);e.exports=(a.default||a).template({compiler:[7,">= 4.0.0"],main:function(e,n,t,a,i){var o,r=null!=n?n:e.nullContext||{},l=t.helperMissing,s=e.escapeExpression;return'<div class="dialog">\n\t<div class="avatar right">\n\t\t<i class="material-icons '+s("function"==typeof(o=null!=(o=t.iconColor||(null!=n?n.iconColor:n))?o:l)?o.call(r,{name:"iconColor",hash:{},data:i}):o)+'">account_circle</i>\n\t</div>\n\t<div class="balloon human blue-grey lighten-4 right right-align">'+s("function"==typeof(o=null!=(o=t.text||(null!=n?n.text:n))?o:l)?o.call(r,{name:"text",hash:{},data:i}):o)+"</div>\n</div>"},useData:!0})},function(e,n,t){var a=t(2);e.exports=(a.default||a).template({1:function(e,n,t,a,i){var o;return"\t"+e.escapeExpression("function"==typeof(o=null!=(o=t.text||(null!=n?n.text:n))?o:t.helperMissing)?o.call(null!=n?n:e.nullContext||{},{name:"text",hash:{},data:i}):o)+"\n"},3:function(e,n,t,a,i){return"\t<div class='debug-button'>\n\t\t<i class='material-icons debug-icon'>info</i>\n\t</div>\n"},compiler:[7,">= 4.0.0"],main:function(e,n,t,a,i){var o,r,l=null!=n?n:e.nullContext||{},s=t.helperMissing,c=e.escapeExpression;return'<div class="dialog">\n\t<div class="avatar left">\n\t\t<i class="material-icons '+c("function"==typeof(r=null!=(r=t.iconColor||(null!=n?n.iconColor:n))?r:s)?r.call(l,{name:"iconColor",hash:{},data:i}):r)+'">'+c("function"==typeof(r=null!=(r=t.icon||(null!=n?n.icon:n))?r:s)?r.call(l,{name:"icon",hash:{},data:i}):r)+"</i>\n\t</div>\n"+(null!=(o=t.if.call(l,null!=n?n.text:n,{name:"if",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?o:"")+"\t<div class=\"balloon bot purple lighten-4\">\n\t\t<div id='spinner' class='spinner'>\n\t\t\t<div class='bounce1'></div>\n\t\t\t<div class='bounce2'></div>\n\t\t\t<div class='bounce3'></div>\n\t\t</div>\n\t</div>\n"+(null!=(o=t.if.call(l,null!=n?n.debug:n,{name:"if",hash:{},fn:e.program(3,i,0),inverse:e.noop,data:i}))?o:"")+"</div>"},useData:!0})},function(e,n,t){var a=t(2);e.exports=(a.default||a).template({compiler:[7,">= 4.0.0"],main:function(e,n,t,a,i){var o;return'<div class="dialog">\n\t<div class="balloon about blue-grey darken-3 blue-grey-text text-lighten-4">'+e.escapeExpression("function"==typeof(o=null!=(o=t.text||(null!=n?n.text:n))?o:t.helperMissing)?o.call(null!=n?n:e.nullContext||{},{name:"text",hash:{},data:i}):o)+"</div>\n</div>"},useData:!0})},function(e,n,t){var a=t(2);e.exports=(a.default||a).template({1:function(e,n,t,a,i){var o;return"<b>Speech Recognition Confidence: </b>"+e.escapeExpression("function"==typeof(o=null!=(o=t.speechRecognitionConfidence||(null!=n?n.speechRecognitionConfidence:n))?o:t.helperMissing)?o.call(null!=n?n:e.nullContext||{},{name:"speechRecognitionConfidence",hash:{},data:i}):o)+"<br />"},3:function(e,n,t,a,i){var o,r,l=null!=n?n:e.nullContext||{};return"    &nbsp;&nbsp;- Lifespan Count: "+e.escapeExpression("function"==typeof(r=null!=(r=t.lifespanCount||(null!=n?n.lifespanCount:n))?r:t.helperMissing)?r.call(l,{name:"lifespanCount",hash:{},data:i}):r)+"<br />\n    "+(null!=(o=t.if.call(l,null!=n?n.parameters:n,{name:"if",hash:{},fn:e.program(4,i,0),inverse:e.noop,data:i}))?o:"")+"\n"},4:function(e,n,t,a,i){var o;return"&nbsp;&nbsp;- Parameters: "+e.escapeExpression("function"==typeof(o=null!=(o=t.parameters||(null!=n?n.parameters:n))?o:t.helperMissing)?o.call(null!=n?n:e.nullContext||{},{name:"parameters",hash:{},data:i}):o)+"<br />"},compiler:[7,">= 4.0.0"],main:function(e,n,t,a,i){var o,r,l=null!=n?n:e.nullContext||{},s=t.helperMissing,c=e.escapeExpression,u=e.lambda;return"<div class='debug'>\n    <b>Action: </b> "+c("function"==typeof(r=null!=(r=t.action||(null!=n?n.action:n))?r:s)?r.call(l,{name:"action",hash:{},data:i}):r)+"<br />\n    <b>Language: </b>"+c("function"==typeof(r=null!=(r=t.languageCode||(null!=n?n.languageCode:n))?r:s)?r.call(l,{name:"languageCode",hash:{},data:i}):r)+"<br />\n    <b>Query Text: </b>"+c("function"==typeof(r=null!=(r=t.queryText||(null!=n?n.queryText:n))?r:s)?r.call(l,{name:"queryText",hash:{},data:i}):r)+"<br />\n    "+(null!=(o=t.if.call(l,null!=n?n.speechRecognitionConfidence:n,{name:"if",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?o:"")+"\n    \n    <b>Intent: </b>"+c(u(null!=(o=null!=n?n.intent:n)?o.displayName:o,n))+"<br />\n    &nbsp;&nbsp;- Confidence: "+c("function"==typeof(r=null!=(r=t.intentDetectionConfidence||(null!=n?n.intentDetectionConfidence:n))?r:s)?r.call(l,{name:"intentDetectionConfidence",hash:{},data:i}):r)+"<br />\n    &nbsp;&nbsp;- Priority: "+c(u(null!=(o=null!=n?n.intent:n)?o.priority:o,n))+"<br />\n\n    <b>Contexts: </b><br />\n"+(null!=(o=t.each.call(l,null!=n?n.outputContexts:n,{name:"each",hash:{},fn:e.program(3,i,0),inverse:e.noop,data:i}))?o:"")+"\n</div>"},useData:!0})},function(e){e.exports=JSON.parse('[{"id":"M1","YoutubeID":"","fileName":"M1_Match_Point.mp4","subject":["Everyday Life"],"intent":["Movie"],"title":"Match Point","author":"Woody Allen","year":2005,"duration":"00:38","genre":"Feature film","language":"English","caption":"English","keywords":["sport","tennis","luck","movie","everyday life"]},{"id":"M2","YoutubeID":"","fileName":"M2_Chinese_Puzzle.mp4","subject":["Everyday Life"],"intent":["Movie"],"title":"Chinese Puzzle","author":"Cédric Klapish","year":2013,"duration":"00:37","genre":"Feature film","language":"French","caption":"English","keywords":["everyday life","movie","uncertainty","unforseen"]},{"id":"M3","YoutubeID":"","fileName":"M3_The science_of_sleep.mp4","subject":["Everyday Life"],"intent":["Movie"],"title":"The Science of Sleep","author":"Michel Gondry","year":2006,"duration":"00:44","genre":"Feature film","language":"English","caption":"","keywords":["randomness","brain","organization","everyday life","movie"]},{"id":"M4","YoutubeID":"","fileName":"M4_The_Curious Case_of_Benjamin_Button.mp4","subject":["Everyday Life"],"intent":["Movie"],"title":"Benjamin Button","author":"David Fincher","year":2008,"duration":"03:13","genre":"Feature film","language":"English","caption":"","keywords":["accident","design","everyday life","movie","control","intersection"]},{"id":"M7","YoutubeID":"","fileName":"M5_Westworld_1.mp4","subject":["Everyday Life"],"intent":["Movie"],"title":"WestWorld","author":"Jonathan Nolan","year":2016,"duration":"00:41","genre":"TV series","language":"English","caption":"","keywords":["disarray","order","everyday life","purpose","ugliness","beauty","nature","splendor","believe","days"]},{"id":"M6","YoutubeID":"","fileName":"M6_Westworld_2.mp4","subject":["Everyday Life"],"intent":["Movie"],"title":"WestWorld","author":"Jonathan Nolan","year":2016,"duration":"00:17","genre":"TV series","language":"English","caption":"","keywords":["routine","chance","encounter","repetition","daily life","everyday life","chance encounter","change","love","all lives"]},{"id":"A1","YoutubeID":"","fileName":"A1_Paul Auster_Siri Hustvedt.mp4","subject":["Everyday Life"],"intent":["Internet Archive"],"title":"Paul Auster & Siri Hustvedt","author":"Paul Auster","year":2014,"duration":"01:11","genre":"Interview","language":"English","caption":"","keywords":["random event","everyday life","lightening","uncertainty","change"]},{"id":"A2","YoutubeID":"","fileName":"A2_Predictable_Randomness _ Biology.mp4","subject":["Everyday Life"],"intent":["Internet Archive"],"title":"Predictable Randomness","author":"Benjamin de Bivort","year":2015,"duration":"00:32","genre":"TedTalk","language":"English","caption":"","keywords":["randomness","random","biology","mutation","brain","cells","nature","nurture","everyday life"]},{"id":"A3","YoutubeID":"","fileName":"A3_Age_of_Uncertainty.mp4","subject":["Everyday Life"],"intent":["Internet Archive"],"title":"The Age of Uncertainty","author":"John Kenneth Galbrait","year":1977,"duration":"00:30","genre":"TV","language":"English","caption":"","keywords":["uncertainty","History","World War","capitalism","socialism","politics"]},{"id":"A4","YoutubeID":"","fileName":"A4_Predictable_Randomness_Nature_Nurture.mp4","subject":["Everyday Life"],"intent":["Internet Archive"],"title":"Predictable Randomness","author":"Benjamin de Bivort","year":2015,"duration":"00:32","genre":"TedTalk","language":"English","caption":"","keywords":["randomness","random","biology","mutation","deterministic","cells","nature","nurture","everyday life","individuals"]},{"id":"A5","YoutubeID":"","fileName":"A5_drunkards_walk.mp4","subject":["Everyday Life","Lottery"],"intent":["Internet Archive"],"title":"Drunkards Walk 1","author":"Leonard Mlodinow","year":2008,"duration":"01:00","genre":"Conference","language":"English","caption":"","keywords":["lottery","chance","luck","probability","uncertainty","everyday life"]},{"id":"A6","YoutubeID":"","fileName":"A6_drunkards_walk_2.mp4","subject":["Everyday Life"],"intent":["Internet Archive"],"title":"Drunkards Walk 2","author":"Leonard Mlodinow","year":2008,"duration":"01:13","genre":"Conference","language":"English","caption":"","keywords":["random walk","drunkard walk","unpredictable","everyday life","goal","purpose","uncertainty","mathematics"]},{"id":"A8","YoutubeID":"","fileName":"A8_drunkards_walk_6.mp4","subject":["Everyday Life"],"intent":["Internet Archive"],"title":"Drunkards Walk 6","author":"Leonard Mlodinow","year":2008,"duration":"00:57","genre":"Conference","language":"English","caption":"","keywords":["randomness","mathematics","everyday life","success","failure","probability"]},{"id":"A9","YoutubeID":"","fileName":"A9_drunkards_walk_7.mp4","subject":["Everyday Life","Probability"],"intent":["Internet Archive"],"title":"Drunkards Walk 7","author":"Leonard Mlodinow","year":2008,"duration":"00:51","genre":"Conference","language":"English","caption":"","keywords":["entropy","randomness","everyday life","economics","nobel","kahneman","tversky","uncertain","probability","heuristics","biases","statistics"]},{"id":"A10","YoutubeID":"","fileName":"A10_The_surprising_power_of_uncertainty.mp4","subject":["Everyday Life"],"intent":["Internet Archive"],"title":"The Surprising Power of Uncertainty","author":"Shohini Ghose","year":2016,"duration":"00:33","genre":"TedTalk","language":"English","caption":"","keywords":["uncertainty","quantum","identity","shape shifter","search","power"]},{"id":"A11","YoutubeID":"","fileName":"A11_Predictable_Randomness _ Benjamin_de_Bivort _ Snowflakes.mp4\\n","subject":["Everyday Life"],"intent":["Internet Archive"],"title":"Predictable Randomness","author":"Benjamin de Bivort","year":2015,"duration":"00:18","genre":"TedTalk","language":"English","caption":"","keywords":["random process","biology","snowflakes","snow","storm","genetic","environement","changes"]},{"id":"U1","YoutubeID":"","fileName":"U1_surprising_power_uncertainty.mp4","subject":["Uncertainty Principle"],"title":"The Surprising Power of Uncertainty","author":"Shohini Ghose","year":2016,"duration":"00:52","genre":"TedTalk","language":"English","caption":"","keywords":["quantum physics","uncertainty","electron","position","speed","particles","identity","control","universe","einstein"]},{"id":"U2","YoutubeID":"","fileName":"U2_A_Serious_Man.mp4","subject":["Uncertainty Principle"],"title":"A Serious Man","author":"Cohen Brothers","year":2009,"duration":"00:51","genre":"Feature Film","language":"English","caption":"","keywords":["uncertainty","principle","physics","equation","cohen","school","formula","prove","midterm"]},{"id":"U3","YoutubeID":"","fileName":"U3_The_Uncertainty_Principle _ Genius.mp4","subject":["Uncertainty Principle"],"title":"The Uncertainty Principle Genius","author":"Brian Grazer and Ron Howard","year":2017,"duration":"02:06","genre":"Science pop","language":"English","caption":"","keywords":["uncertainty","principle","physics","einstein","bohr","particle","quantum","relativity"]},{"id":"U4","YoutubeID":"","fileName":"U4_What_is_the_Heisenberg_Uncertainty_Principle","subject":["Uncertainty Principle"],"title":"TedEd","author":"Chad Orzel & Henrik Malmgren","year":2014,"duration":"04:21","genre":"TedEd","language":"English"},{"id":"ART1","YoutubeID":"","fileName":"ART1_Francois_Morellet.mp4","subject":["Art"],"intent":["About"],"title":"François Morellet - 2011 (Extrait de l\'art et la manière sur Arte)","author":"François Morellet","year":2011,"duration":"00:37","genre":"Contemporary art","language":"French","caption":"","keywords":["Morellet","art","lines","contemporary","creative process","geometry","system","serious","shapes","randomness","hasard"]},{"id":"ART2","YoutubeID":"","fileName":"ART2_Pierre_Boulez_on_John_Cage.mp4","subject":["Art"],"intent":["About"],"title":"Pierre Boulez on John Cage","author":"Pierre Boulez","year":2010,"duration":"00:30","genre":"Contemporary art","language":"English","caption":"","keywords":["Boulez","john cage","chance","buddhism","operations","disorder","order","music"]},{"id":"AW1","YoutubeID":"","fileName":"AW1_Christian_Boltanski_ Chance.mp4","subject":["Art"],"intent":["Work"],"title":"Chance. French Pavilion; Venice Biennale","author":"Christian Boltanski","year":2011,"duration":"02:13","genre":"Contemporary art","language":"N/A","caption":"","keywords":["chance","art","population","time","society","installation","venice","boltanski","biennale","french pavilion"]},{"id":"AW2","YoutubeID":"","fileName":"AW2_John Cage_ Music_of_Changes_1951.mp4","subject":["Art"],"intent":["Work"],"title":"John Cage_ Music of Changes (1951)","author":"John Cage","year":1951,"duration":"04:02","genre":"Contemporary art","language":"N/A","caption":"","keywords":["john cage","cage","music","changes","chance","operations","yi king","piano"]},{"id":"AW3","YoutubeID":"","fileName":"AW3_Olafur.mp4","subject":["Art"],"intent":["Work"],"title":"Olafur","author":"Olafur Eliasson","year":2004,"duration":"03:51","genre":"Contemporary art","language":"N/A","caption":"","keywords":["olafur eliasson","uncertain","museum","installation","dance","contemporary","art"]},{"id":"P1","YoutubeID":"","fileName":"P1_drunkards_walk_5.mp4","subject":["Probability"],"title":"Drunkards Walk 5","author":"Leonard Mlodinow","year":2008,"duration":"03:13","genre":"Conference","language":"English","caption":"","keywords":["probability","probabilities","conditional","medical","result","test","health","cancer","doctors","chances","tumor","false positive","false negative","data"]},{"id":"C1","YoutubeID":"","fileName":"C1_Surprising_power_uncertainty.mp4","subject":["Computation"],"title":"The Surprising Power of Uncertainty","author":"Shohini Ghose","year":2016,"duration":"01:08","genre":"TedTalk","language":"English","caption":"","keywords":["data","algorithm","uncertainty","search","data analysis","quantum"]},{"id":"S1","YoutubeID":"","fileName":"S1_drunkards_walk_4.mp4","subject":["Sports","Probability"],"title":"Drunkard Walk 4","author":"Leonard Mlodinow","year":2008,"duration":"01:45","genre":"Conference","language":"English","caption":"","keywords":["sport","probability","series","playoff","random","chance"]},{"id":"S2","YoutubeID":"","fileName":"S2_Why_underdogs_do_better_in_hockey_than basketball.mp4","subject":["Sports"],"title":"Why underdogs do better in hockey than basketball?","author":"Vox","year":"","duration":"07:06","genre":"Reportage","language":"English","caption":"","keywords":["sport","luck","probability","statistics","football","hockey","predict"]},{"id":"Q1","YoutubeID":"","fileName":"Q1_Elegant_Universe_1.mp4","subject":["Quantum Mechanics"],"title":"The Elegant Universe","author":"Brian Greene","year":2003,"duration":"00:43","genre":"Science pop","language":"English","caption":"","keywords":["quantum","mechanics","physics","einstein","bohr","relativity","order","predictable","atoms","game","chance","uncertainty","probability","outcome","possibility","universe"]},{"id":"Q2","YoutubeID":"","fileName":"Q2_Elegant_Universe_2.mp4","subject":["Quantum Mechanics"],"title":"The Elegant Universe","author":"Brian Greene","year":2003,"duration":"00:41","genre":"Science pop","language":"English","caption":"","keywords":["quantum","mechanics","physics","einstein","bohr","relativity","order","predictable","atoms","game","chance","uncertainty","probability","outcome","possibility","universe"]},{"id":"AI1","YoutubeID":"","fileName":"AI1_Predictive_algorithms.mp4","subject":["Artificial Intelligence"],"intent":["Artificial Intelligence"],"title":"The_danger_of_predictive_algorithms_in_criminal_justice","author":"Hany Farid","year":2018,"duration":"01:07","genre":"TedTalk","language":"English","caption":"","keywords":["predictive","algorithm","online","pattern","prediction","loan","banks","democracy","job","admissions","decisions","behavior","behaviour","finance","risk","assessment"]},{"id":"AI2","YoutubeID":"","fileName":"AI2_Predictive_algorithms_2.mp4","subject":["Artificial Intelligence"],"intent":["Artificial Intelligence"],"title":"The_danger_of_predictive_algorithms_in_criminal_justice","author":"Hany Farid","year":2018,"duration":"01:06","genre":"TedTalk","language":"English","caption":"","keywords":["journalism","predictive","algorithm","disadvantageous","black","defendants","white","difference","bias","predicted","risk"]},{"id":"AI3","YoutubeID":"","fileName":"AI3_Predictive_algorithms_3.mp4","subject":["Artificial Intelligence"],"intent":["Artificial Intelligence"],"title":"The_danger_of_predictive_algorithms_in_criminal_justice","author":"Hany Farid","year":2018,"duration":"01:27","genre":"TedTalk","language":"English","caption":"","keywords":["big data","machine learning","technology","data","social inequalities","predictive","algorithms","accuracy","fairness","hiring","finance","loan","criminal justice","artificial intelligence","ML","AI","data analytics","fair","humans","admissions"]},{"id":"AI4","YoutubeID":"","fileName":"AI4_Predictive_policing_cathy_oneil.mp4","subject":["Artificial Intelligence"],"intent":["Artificial Intelligence"],"title":"Weapons_of_Math_Destruction","author":"Cathy O\'Neil","year":2018,"duration":"02:00","genre":"GoogleTalk","language":"English","caption":"","keywords":["algorithms","fair","past","pattern","criminal justice","black","white","arrest","bias","local conditions","police","predictive policing","feedback loop","wall street","data","predictive algorithms"]},{"id":"AI5","YoutubeID":"","fileName":"AI5_About_Algorithms_cathy_oneil","subject":["Artificial Intelligence"],"intent":["Artificial Intelligence"],"title":"Weapons_of_Math_Destruction","author":"Cathy O\'Neil","year":2018,"duration":"01:54","genre":"GoogleTalk","language":"English","caption":"","keywords":["what is an algorithm","algorithm","choices","data","success","objective","function","food","example","time","curate","definition","optimize","children","time","train","past","agenda","objective","stakeholder"]}]')},function(e,n,t){var a=t(2);e.exports=(a.default||a).template({compiler:[7,">= 4.0.0"],main:function(e,n,t,a,i){return'<div id="video-section" class="col l9 m8 s12 black">\n\t<div class="video valign-wrapper">\n\t\t<div id="player"></div>\n\t\t<video id="local-player" class="video-js"></video>\n\t</div>\n</div>'},useData:!0})},function(e,n,t){"use strict";var a=t(0),i=t.n(a),o=t(20);let r,l;const s=async()=>{const e=Math.floor(Math.random()*Math.floor(5));c(o[e])},c=e=>{r.play(e)};var u=t(21),d=t.n(u);n.a={render:()=>{const e=d()();i()(e).appendTo(i()("#main")),(async()=>{l||(l=await Promise.all([t.e(5),t.e(2)]).then(t.bind(null,128))),r=l,i()("#player").hide(),r.initiate(),s(),i()("body").on("botResponse",e=>{c(e.videoData)})})(),i()(window).resize(function(){let e=i()(window).height();i()(".video").height(e)})}}},,function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),o=(t(25),t(28),t(29),t(30),t(8)),r=t(11);i()("body").on("start",()=>{i()("body").off("start"),r.a.render()}),o.a.render()},,,,,,function(e,n,t){}]);