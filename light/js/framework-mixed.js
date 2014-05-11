/* Modernizr 2.8.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-input-inputtypes-shiv-cssclasses-load
 */
;window.Modernizr=function(a,b,c){function v(a){j.cssText=a}function w(a,b){return v(prefixes.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}function A(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)p[c[d]]=c[d]in k;return p.list&&(p.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),p}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),o[a[d]]=!!e;return o}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.0",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n={},o={},p={},q=[],r=q.slice,s,t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e});for(var B in n)u(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.input||A(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},v(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};



/**
 * 一点乱七八糟的代码,一般框架都支持的
 * 这里的代码不要乱加到通用脚本里,我只是随手写的
 * @fileoverview framework-mixed.js
 * @author:{@link mailto:ranklau@gmail.com rank}
 * @last-modified : 2011-8-8
 */

//简单写一个自定义事件
var CustEvent = (function() {	
	var ce = function() {};
	ce.createEvents = function(host, e) {
	
		var events = (typeof(e)=='string') ? e.replace(/\s/, '').split(',') : e,
			map    = host.__events = host.__events || {};	
		
		for (var i=0, l=events.length; i<l; i++) {
			map[events[i]] = map[events[i]] || [];
		}
		
		(typeof host.on!='function') && (host.on = function(type, handler) {
			return map[type].push(handler);
		});
		
		(typeof host.fire!='function') && (host.fire = function(type) {
			var args = Array.prototype.slice.call(arguments, 1),
				hostHandler = host['on'+type];
			(typeof hostHandler=='function') && (hostHandler.apply(host, args));
			for (var i=0, list=map[type], l=list.length; i<l; i++) {
				(list[i] && typeof(list[i])=='function') && list[i].apply(host, args);
			}
		});
	};
	
	return ce;
})();

//获取delegate后的target元素
var eventH = {
	target: function(e) {
		return window.event ? window.event.srcElement : e.target;
	}
};

//继承
var classH = {
    extend : function(cls,p,runCon){
        if(runCon == null) runCon = true;
        var wrapped = function() {   
            if(runCon) p.apply(this, arguments);
            var ret = cls.apply(this, arguments);
            return ret;
        }   
        wrapped.toString = function(){ return cls.toString(); }   
    
        var T = function(){};
        T.prototype = p.prototype;
        wrapped.prototype = new T();
        wrapped.$class = cls;
        wrapped.$super = cls.$super = p;
        wrapped.prototype.constructor = wrapped;

		for(var i in cls.prototype){
			if(cls.prototype.hasOwnProperty(i))
				wrapped.prototype[i] = cls.prototype[i];
		}
        wrapped.extend = function(){
            throw new Error("you maynot apply the same wrapper twice.");
        }
        return wrapped;
	}
}

//简单写一个兼容版的绑定dom事件
//用typedef去做了个hook使mouseenter和mouseleave都能得以兼容所有浏览器
var eventTargetH = (function(){
	var _interface  = window.addEventListener ? 'addEventListener' : 'attachEvent';
	var _typedefined = {};
	var _type       = function(type) { 
		type = _typedefined[type] ? _typedefined[type].name : type;
		return (_interface=='attachEvent') ? 'on'+type : type; 
	};
	var _typedef    = function (name, newname, handler) { 
		_typedefined[newname] = { name: name, handler: handler };
	};
	var _handler    = function(el, type, handler) { 
		return _typedefined[type] ? function(e) {
			return _typedefined[type].handler.call(el, e, handler);
		} : function(e) {return handler.call(el, e)};
	};
	
	_typedef('mouseover', 'mouseenter', function(e, handler) {
        var el = this, target = e.relatedTarget || e.fromElement || null;
        if (!target || target == el || dom.contains(el, target)) { return null; }
        return handler.call(el, e);
	});
	_typedef('mouseout', 'mouseleave', function (e, handler) {
        var el = this, target = e.relatedTarget || e.toElement || null;
        if (!target || target == el || dom.contains(el,target)) { return null; }
        return handler.call(el, e);
    });
    
	return {
		on: function(el, type, handler, capture) {
			fn   = _handler(el, type, handler);
			type = _type(type);
			return el[_interface](type, fn, capture||false);
		}
	};
})();

//dom的一些必要兼容
var dom = {
	create: function() {
        var temp = document.createElement('div'),
            wrap = { 
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                optgroup: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                thead: [ 1, "<table>", "</table>" ],
                tbody: [ 1,"<table>", "</table>" ],
                tfoot : [1,"<table>", "</table>"],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                th: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                _default: [ 0, "", "" ]
            },  
           tagName = /<(\w+)/i;
        return function(html, rfrag, doc) {
            var dtemp = (doc && doc.createElement('div')) || temp,
                root = dtemp,
                tag = ( tagName.exec( html ) || ["",""] )[1],
                wr = wrap[ tag ] || wrap[ '_default' ],
                dep = wr[0];
            dtemp.innerHTML = wr[1] + html + wr[2];
            while( dep-- ) {
                dtemp = dtemp.firstChild;
            }
            var el = dtemp.firstChild;
            if (!el || !rfrag) {
                while (root.firstChild) {
                    root.removeChild(root.firstChild);
                }
                return el;
            } else {
                doc = doc || document;
                var frag = doc.createDocumentFragment();
                while (el = dtemp.firstChild) {
                    frag.appendChild(el);
                }
                return frag;
            }
        };

	}(),
	getOffsets: function(e) {
		  var t = e.offsetTop; var l = e.offsetLeft; var w = e.offsetWidth; var h = e.offsetHeight;
		  while  (e=e.offsetParent) { t += e.offsetTop; l += e.offsetLeft; }; 
			return { top: t, left: l, width: w, height: h, bottom: t+h, right: l+w }
	},
	contains: function(el, target) {
		return el.contains ? el != target && el.contains(target) : !!(el.compareDocumentPosition(target) & 16);
	},
	outerHTML: function() {
		var _isNative = 'outerHTML' in document,
			_node = _isNative ? null : document.createElement('div'),
			_fn   = function(el) {_node.appendChild(el.cloneNode(true));return _node.innerHTML};
		return function (el) {
			_node.innerHTML=='' ? void 0 : _node.innerHTML = '';
			return _isNative ? el.outerHTML : _fn(el);
		}
	}(),
	getElementsByClassName: function(cls, context) {
		context = context || document;
		if (typeof context.getElementsByClassName == 'function') {
			return context.getElementsByClassName(cls);
		}
		var elements = context.getElementsByTagName('*'), result=[];
		for (var i=0, l=elements.length; i<l; i++) {
			if (dom.hasClass(elements[i], cls)) {
				result.push(elements[i]);
			}
		}
		return result;
	},
	removeClass: function(el, cls) {
		var reg = new RegExp("(\\s|^)"+className+"\\s|$")
		el.className = el.className.replace(reg,'');
	},
	hasClass: function(el, cls) {
		cls = cls.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
		return new RegExp('(?:^|\\s)' + cls + '(?:\\s|$)').test(el.className);
	},
	replaceClass: function(el, oldClass, newClass) {
		dom.removeClass(el, oldClass);
		if (newClass!=undefined) dom.addClass(el, newClass);
	},
	addClass: function(el, cls) {
		if (!dom.hasClass(el,cls)) {
			el.className = el.className || '';
			el.className=='' ? el.className=cls : el.className += ' '+cls;
		}
	}
};


//object mix
(typeof Object.mix=='undefined') && (Object.mix = function(dest, src, cover) {
	cover = (cover === false) ? false : true; //cover parameter default is true
	for (key in src) {
		if (!cover && (key in dest)) continue;
		dest[key] = src[key];
	}
	return dest;
});

//parseDate的作用是将一个字符串parse成一个Date对象
var parseDate = function(source) {
	if (typeof source== 'object') return source;
	var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ('string' == typeof source) {
        if (reg.test(source) || isNaN(Date.parse(source))) {
            var d = source.split(/ |T/),
                d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0], 
                d0 = d[0].split(/[^\d]/);
            return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, d1[0] - 0, d1[1] - 0, d1[2] - 0); 
        } else {
            return new Date(source);
        }   
    }   
    return new Date();
};

//将Date对象格式成字符串
var formatDate = function(d, pattern) {
	pattern=pattern||"yyyy-MM-dd";
    var y=d.getFullYear();
    var o = { 
        "M" : d.getMonth()+1, //month
        "d" : d.getDate(),    //day
        "h" : d.getHours(),   //hour
        "m" : d.getMinutes(), //minute
        "s" : d.getSeconds() //second
    }   
    pattern = pattern.replace(/(y+)/ig, function(a,b){
    	var len = Math.min(4,b.length);
    	return (y+"").substr(4-len);
    });
    
    for(var i in o){ 
        pattern=pattern.replace(new RegExp("("+i+"+)","g"),function(a,b){
        	return (o[i]<10 && b.length>1 )? "0"+o[i] : o[i]
        });
    }   
    return pattern;
};
if (typeof Date.prototype.format != 'function') {
	Date.prototype.format = function(pattern) {
		return formatDate.apply(this, [this, pattern]);
	};
}

/**
 * 在控制台当中(如果有的话),打印log信息,方便调试找到问题
 * @param {String} msg 打印log信息
 * @return void
 */
var log = function(msg) {
	var msie = /msie/.test(navigator.userAgent.toLowerCase());
	( (!msie) && typeof(console)!='undefined' ) ? console.log('iCalendar debug:' +msg) : void 0;
};