(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function NE(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Py={exports:{}},pu={},Ny={exports:{}},re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xo=Symbol.for("react.element"),DE=Symbol.for("react.portal"),bE=Symbol.for("react.fragment"),OE=Symbol.for("react.strict_mode"),VE=Symbol.for("react.profiler"),LE=Symbol.for("react.provider"),ME=Symbol.for("react.context"),jE=Symbol.for("react.forward_ref"),FE=Symbol.for("react.suspense"),UE=Symbol.for("react.memo"),zE=Symbol.for("react.lazy"),Jp=Symbol.iterator;function BE(t){return t===null||typeof t!="object"?null:(t=Jp&&t[Jp]||t["@@iterator"],typeof t=="function"?t:null)}var Dy={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},by=Object.assign,Oy={};function pi(t,e,n){this.props=t,this.context=e,this.refs=Oy,this.updater=n||Dy}pi.prototype.isReactComponent={};pi.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};pi.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Vy(){}Vy.prototype=pi.prototype;function vd(t,e,n){this.props=t,this.context=e,this.refs=Oy,this.updater=n||Dy}var wd=vd.prototype=new Vy;wd.constructor=vd;by(wd,pi.prototype);wd.isPureReactComponent=!0;var Zp=Array.isArray,Ly=Object.prototype.hasOwnProperty,Ed={current:null},My={key:!0,ref:!0,__self:!0,__source:!0};function jy(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)Ly.call(e,r)&&!My.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:Xo,type:t,key:i,ref:o,props:s,_owner:Ed.current}}function $E(t,e){return{$$typeof:Xo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Td(t){return typeof t=="object"&&t!==null&&t.$$typeof===Xo}function qE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var em=/\/+/g;function hc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?qE(""+t.key):e.toString(36)}function ol(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Xo:case DE:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+hc(o,0):r,Zp(s)?(n="",t!=null&&(n=t.replace(em,"$&/")+"/"),ol(s,e,n,"",function(h){return h})):s!=null&&(Td(s)&&(s=$E(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(em,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",Zp(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+hc(i,l);o+=ol(i,e,n,u,s)}else if(u=BE(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+hc(i,l++),o+=ol(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Va(t,e,n){if(t==null)return t;var r=[],s=0;return ol(t,r,"","",function(i){return e.call(n,i,s++)}),r}function HE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var yt={current:null},al={transition:null},WE={ReactCurrentDispatcher:yt,ReactCurrentBatchConfig:al,ReactCurrentOwner:Ed};function Fy(){throw Error("act(...) is not supported in production builds of React.")}re.Children={map:Va,forEach:function(t,e,n){Va(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Va(t,function(){e++}),e},toArray:function(t){return Va(t,function(e){return e})||[]},only:function(t){if(!Td(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};re.Component=pi;re.Fragment=bE;re.Profiler=VE;re.PureComponent=vd;re.StrictMode=OE;re.Suspense=FE;re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=WE;re.act=Fy;re.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=by({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Ed.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)Ly.call(e,u)&&!My.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:Xo,type:t.type,key:s,ref:i,props:r,_owner:o}};re.createContext=function(t){return t={$$typeof:ME,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:LE,_context:t},t.Consumer=t};re.createElement=jy;re.createFactory=function(t){var e=jy.bind(null,t);return e.type=t,e};re.createRef=function(){return{current:null}};re.forwardRef=function(t){return{$$typeof:jE,render:t}};re.isValidElement=Td;re.lazy=function(t){return{$$typeof:zE,_payload:{_status:-1,_result:t},_init:HE}};re.memo=function(t,e){return{$$typeof:UE,type:t,compare:e===void 0?null:e}};re.startTransition=function(t){var e=al.transition;al.transition={};try{t()}finally{al.transition=e}};re.unstable_act=Fy;re.useCallback=function(t,e){return yt.current.useCallback(t,e)};re.useContext=function(t){return yt.current.useContext(t)};re.useDebugValue=function(){};re.useDeferredValue=function(t){return yt.current.useDeferredValue(t)};re.useEffect=function(t,e){return yt.current.useEffect(t,e)};re.useId=function(){return yt.current.useId()};re.useImperativeHandle=function(t,e,n){return yt.current.useImperativeHandle(t,e,n)};re.useInsertionEffect=function(t,e){return yt.current.useInsertionEffect(t,e)};re.useLayoutEffect=function(t,e){return yt.current.useLayoutEffect(t,e)};re.useMemo=function(t,e){return yt.current.useMemo(t,e)};re.useReducer=function(t,e,n){return yt.current.useReducer(t,e,n)};re.useRef=function(t){return yt.current.useRef(t)};re.useState=function(t){return yt.current.useState(t)};re.useSyncExternalStore=function(t,e,n){return yt.current.useSyncExternalStore(t,e,n)};re.useTransition=function(){return yt.current.useTransition()};re.version="18.3.1";Ny.exports=re;var pe=Ny.exports;const KE=NE(pe);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var GE=pe,QE=Symbol.for("react.element"),YE=Symbol.for("react.fragment"),XE=Object.prototype.hasOwnProperty,JE=GE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ZE={key:!0,ref:!0,__self:!0,__source:!0};function Uy(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)XE.call(e,r)&&!ZE.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:QE,type:t,key:i,ref:o,props:s,_owner:JE.current}}pu.Fragment=YE;pu.jsx=Uy;pu.jsxs=Uy;Py.exports=pu;var f=Py.exports,th={},zy={exports:{}},bt={},By={exports:{}},$y={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,$){var Z=D.length;D.push($);e:for(;0<Z;){var me=Z-1>>>1,te=D[me];if(0<s(te,$))D[me]=$,D[Z]=te,Z=me;else break e}}function n(D){return D.length===0?null:D[0]}function r(D){if(D.length===0)return null;var $=D[0],Z=D.pop();if(Z!==$){D[0]=Z;e:for(var me=0,te=D.length,_e=te>>>1;me<_e;){var Me=2*(me+1)-1,qt=D[Me],Ht=Me+1,Wt=D[Ht];if(0>s(qt,Z))Ht<te&&0>s(Wt,qt)?(D[me]=Wt,D[Ht]=Z,me=Ht):(D[me]=qt,D[Me]=Z,me=Me);else if(Ht<te&&0>s(Wt,Z))D[me]=Wt,D[Ht]=Z,me=Ht;else break e}}return $}function s(D,$){var Z=D.sortIndex-$.sortIndex;return Z!==0?Z:D.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],p=1,y=null,_=3,R=!1,C=!1,V=!1,L=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,E=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(D){for(var $=n(h);$!==null;){if($.callback===null)r(h);else if($.startTime<=D)r(h),$.sortIndex=$.expirationTime,e(u,$);else break;$=n(h)}}function O(D){if(V=!1,S(D),!C)if(n(u)!==null)C=!0,St(B);else{var $=n(h);$!==null&&$t(O,$.startTime-D)}}function B(D,$){C=!1,V&&(V=!1,x(g),g=-1),R=!0;var Z=_;try{for(S($),y=n(u);y!==null&&(!(y.expirationTime>$)||D&&!A());){var me=y.callback;if(typeof me=="function"){y.callback=null,_=y.priorityLevel;var te=me(y.expirationTime<=$);$=t.unstable_now(),typeof te=="function"?y.callback=te:y===n(u)&&r(u),S($)}else r(u);y=n(u)}if(y!==null)var _e=!0;else{var Me=n(h);Me!==null&&$t(O,Me.startTime-$),_e=!1}return _e}finally{y=null,_=Z,R=!1}}var z=!1,v=null,g=-1,w=5,T=-1;function A(){return!(t.unstable_now()-T<w)}function P(){if(v!==null){var D=t.unstable_now();T=D;var $=!0;try{$=v(!0,D)}finally{$?I():(z=!1,v=null)}}else z=!1}var I;if(typeof E=="function")I=function(){E(P)};else if(typeof MessageChannel<"u"){var Pe=new MessageChannel,xn=Pe.port2;Pe.port1.onmessage=P,I=function(){xn.postMessage(null)}}else I=function(){L(P,0)};function St(D){v=D,z||(z=!0,I())}function $t(D,$){g=L(function(){D(t.unstable_now())},$)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){C||R||(C=!0,St(B))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return _},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(D){switch(_){case 1:case 2:case 3:var $=3;break;default:$=_}var Z=_;_=$;try{return D()}finally{_=Z}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,$){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var Z=_;_=D;try{return $()}finally{_=Z}},t.unstable_scheduleCallback=function(D,$,Z){var me=t.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?me+Z:me):Z=me,D){case 1:var te=-1;break;case 2:te=250;break;case 5:te=1073741823;break;case 4:te=1e4;break;default:te=5e3}return te=Z+te,D={id:p++,callback:$,priorityLevel:D,startTime:Z,expirationTime:te,sortIndex:-1},Z>me?(D.sortIndex=Z,e(h,D),n(u)===null&&D===n(h)&&(V?(x(g),g=-1):V=!0,$t(O,Z-me))):(D.sortIndex=te,e(u,D),C||R||(C=!0,St(B))),D},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(D){var $=_;return function(){var Z=_;_=$;try{return D.apply(this,arguments)}finally{_=Z}}}})($y);By.exports=$y;var eT=By.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tT=pe,Dt=eT;function F(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var qy=new Set,Io={};function os(t,e){ei(t,e),ei(t+"Capture",e)}function ei(t,e){for(Io[t]=e,t=0;t<e.length;t++)qy.add(e[t])}var Un=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),nh=Object.prototype.hasOwnProperty,nT=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,tm={},nm={};function rT(t){return nh.call(nm,t)?!0:nh.call(tm,t)?!1:nT.test(t)?nm[t]=!0:(tm[t]=!0,!1)}function sT(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function iT(t,e,n,r){if(e===null||typeof e>"u"||sT(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function _t(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){et[t]=new _t(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];et[e]=new _t(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){et[t]=new _t(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){et[t]=new _t(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){et[t]=new _t(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){et[t]=new _t(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){et[t]=new _t(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){et[t]=new _t(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){et[t]=new _t(t,5,!1,t.toLowerCase(),null,!1,!1)});var Id=/[\-:]([a-z])/g;function xd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Id,xd);et[e]=new _t(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Id,xd);et[e]=new _t(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Id,xd);et[e]=new _t(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){et[t]=new _t(t,1,!1,t.toLowerCase(),null,!1,!1)});et.xlinkHref=new _t("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){et[t]=new _t(t,1,!1,t.toLowerCase(),null,!0,!0)});function Sd(t,e,n,r){var s=et.hasOwnProperty(e)?et[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(iT(e,n,s,r)&&(n=null),r||s===null?rT(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Gn=tT.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,La=Symbol.for("react.element"),Ns=Symbol.for("react.portal"),Ds=Symbol.for("react.fragment"),Ad=Symbol.for("react.strict_mode"),rh=Symbol.for("react.profiler"),Hy=Symbol.for("react.provider"),Wy=Symbol.for("react.context"),Rd=Symbol.for("react.forward_ref"),sh=Symbol.for("react.suspense"),ih=Symbol.for("react.suspense_list"),kd=Symbol.for("react.memo"),er=Symbol.for("react.lazy"),Ky=Symbol.for("react.offscreen"),rm=Symbol.iterator;function Fi(t){return t===null||typeof t!="object"?null:(t=rm&&t[rm]||t["@@iterator"],typeof t=="function"?t:null)}var Ae=Object.assign,dc;function Ji(t){if(dc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);dc=e&&e[1]||""}return`
`+dc+t}var fc=!1;function pc(t,e){if(!t||fc)return"";fc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var s=h.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{fc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ji(t):""}function oT(t){switch(t.tag){case 5:return Ji(t.type);case 16:return Ji("Lazy");case 13:return Ji("Suspense");case 19:return Ji("SuspenseList");case 0:case 2:case 15:return t=pc(t.type,!1),t;case 11:return t=pc(t.type.render,!1),t;case 1:return t=pc(t.type,!0),t;default:return""}}function oh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ds:return"Fragment";case Ns:return"Portal";case rh:return"Profiler";case Ad:return"StrictMode";case sh:return"Suspense";case ih:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Wy:return(t.displayName||"Context")+".Consumer";case Hy:return(t._context.displayName||"Context")+".Provider";case Rd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case kd:return e=t.displayName||null,e!==null?e:oh(t.type)||"Memo";case er:e=t._payload,t=t._init;try{return oh(t(e))}catch{}}return null}function aT(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return oh(e);case 8:return e===Ad?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Tr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Gy(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function lT(t){var e=Gy(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ma(t){t._valueTracker||(t._valueTracker=lT(t))}function Qy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Gy(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Rl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ah(t,e){var n=e.checked;return Ae({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function sm(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Tr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Yy(t,e){e=e.checked,e!=null&&Sd(t,"checked",e,!1)}function lh(t,e){Yy(t,e);var n=Tr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?uh(t,e.type,n):e.hasOwnProperty("defaultValue")&&uh(t,e.type,Tr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function im(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function uh(t,e,n){(e!=="number"||Rl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Zi=Array.isArray;function qs(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Tr(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function ch(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(F(91));return Ae({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function om(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(F(92));if(Zi(n)){if(1<n.length)throw Error(F(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Tr(n)}}function Xy(t,e){var n=Tr(e.value),r=Tr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function am(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Jy(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function hh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Jy(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ja,Zy=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ja=ja||document.createElement("div"),ja.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ja.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function xo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var lo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},uT=["Webkit","ms","Moz","O"];Object.keys(lo).forEach(function(t){uT.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),lo[e]=lo[t]})});function e_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||lo.hasOwnProperty(t)&&lo[t]?(""+e).trim():e+"px"}function t_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=e_(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var cT=Ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function dh(t,e){if(e){if(cT[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(F(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(F(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(F(61))}if(e.style!=null&&typeof e.style!="object")throw Error(F(62))}}function fh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ph=null;function Cd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var mh=null,Hs=null,Ws=null;function lm(t){if(t=ea(t)){if(typeof mh!="function")throw Error(F(280));var e=t.stateNode;e&&(e=vu(e),mh(t.stateNode,t.type,e))}}function n_(t){Hs?Ws?Ws.push(t):Ws=[t]:Hs=t}function r_(){if(Hs){var t=Hs,e=Ws;if(Ws=Hs=null,lm(t),e)for(t=0;t<e.length;t++)lm(e[t])}}function s_(t,e){return t(e)}function i_(){}var mc=!1;function o_(t,e,n){if(mc)return t(e,n);mc=!0;try{return s_(t,e,n)}finally{mc=!1,(Hs!==null||Ws!==null)&&(i_(),r_())}}function So(t,e){var n=t.stateNode;if(n===null)return null;var r=vu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(F(231,e,typeof n));return n}var gh=!1;if(Un)try{var Ui={};Object.defineProperty(Ui,"passive",{get:function(){gh=!0}}),window.addEventListener("test",Ui,Ui),window.removeEventListener("test",Ui,Ui)}catch{gh=!1}function hT(t,e,n,r,s,i,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(p){this.onError(p)}}var uo=!1,kl=null,Cl=!1,yh=null,dT={onError:function(t){uo=!0,kl=t}};function fT(t,e,n,r,s,i,o,l,u){uo=!1,kl=null,hT.apply(dT,arguments)}function pT(t,e,n,r,s,i,o,l,u){if(fT.apply(this,arguments),uo){if(uo){var h=kl;uo=!1,kl=null}else throw Error(F(198));Cl||(Cl=!0,yh=h)}}function as(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function a_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function um(t){if(as(t)!==t)throw Error(F(188))}function mT(t){var e=t.alternate;if(!e){if(e=as(t),e===null)throw Error(F(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return um(s),t;if(i===r)return um(s),e;i=i.sibling}throw Error(F(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?t:e}function l_(t){return t=mT(t),t!==null?u_(t):null}function u_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=u_(t);if(e!==null)return e;t=t.sibling}return null}var c_=Dt.unstable_scheduleCallback,cm=Dt.unstable_cancelCallback,gT=Dt.unstable_shouldYield,yT=Dt.unstable_requestPaint,De=Dt.unstable_now,_T=Dt.unstable_getCurrentPriorityLevel,Pd=Dt.unstable_ImmediatePriority,h_=Dt.unstable_UserBlockingPriority,Pl=Dt.unstable_NormalPriority,vT=Dt.unstable_LowPriority,d_=Dt.unstable_IdlePriority,mu=null,fn=null;function wT(t){if(fn&&typeof fn.onCommitFiberRoot=="function")try{fn.onCommitFiberRoot(mu,t,void 0,(t.current.flags&128)===128)}catch{}}var en=Math.clz32?Math.clz32:IT,ET=Math.log,TT=Math.LN2;function IT(t){return t>>>=0,t===0?32:31-(ET(t)/TT|0)|0}var Fa=64,Ua=4194304;function eo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Nl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=eo(l):(i&=o,i!==0&&(r=eo(i)))}else o=n&~s,o!==0?r=eo(o):i!==0&&(r=eo(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-en(e),s=1<<n,r|=t[n],e&=~s;return r}function xT(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ST(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-en(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=xT(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function _h(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function f_(){var t=Fa;return Fa<<=1,!(Fa&4194240)&&(Fa=64),t}function gc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Jo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-en(e),t[e]=n}function AT(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-en(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Nd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-en(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var de=0;function p_(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var m_,Dd,g_,y_,__,vh=!1,za=[],hr=null,dr=null,fr=null,Ao=new Map,Ro=new Map,nr=[],RT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hm(t,e){switch(t){case"focusin":case"focusout":hr=null;break;case"dragenter":case"dragleave":dr=null;break;case"mouseover":case"mouseout":fr=null;break;case"pointerover":case"pointerout":Ao.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ro.delete(e.pointerId)}}function zi(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=ea(e),e!==null&&Dd(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function kT(t,e,n,r,s){switch(e){case"focusin":return hr=zi(hr,t,e,n,r,s),!0;case"dragenter":return dr=zi(dr,t,e,n,r,s),!0;case"mouseover":return fr=zi(fr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return Ao.set(i,zi(Ao.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Ro.set(i,zi(Ro.get(i)||null,t,e,n,r,s)),!0}return!1}function v_(t){var e=Br(t.target);if(e!==null){var n=as(e);if(n!==null){if(e=n.tag,e===13){if(e=a_(n),e!==null){t.blockedOn=e,__(t.priority,function(){g_(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ll(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=wh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);ph=r,n.target.dispatchEvent(r),ph=null}else return e=ea(n),e!==null&&Dd(e),t.blockedOn=n,!1;e.shift()}return!0}function dm(t,e,n){ll(t)&&n.delete(e)}function CT(){vh=!1,hr!==null&&ll(hr)&&(hr=null),dr!==null&&ll(dr)&&(dr=null),fr!==null&&ll(fr)&&(fr=null),Ao.forEach(dm),Ro.forEach(dm)}function Bi(t,e){t.blockedOn===e&&(t.blockedOn=null,vh||(vh=!0,Dt.unstable_scheduleCallback(Dt.unstable_NormalPriority,CT)))}function ko(t){function e(s){return Bi(s,t)}if(0<za.length){Bi(za[0],t);for(var n=1;n<za.length;n++){var r=za[n];r.blockedOn===t&&(r.blockedOn=null)}}for(hr!==null&&Bi(hr,t),dr!==null&&Bi(dr,t),fr!==null&&Bi(fr,t),Ao.forEach(e),Ro.forEach(e),n=0;n<nr.length;n++)r=nr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<nr.length&&(n=nr[0],n.blockedOn===null);)v_(n),n.blockedOn===null&&nr.shift()}var Ks=Gn.ReactCurrentBatchConfig,Dl=!0;function PT(t,e,n,r){var s=de,i=Ks.transition;Ks.transition=null;try{de=1,bd(t,e,n,r)}finally{de=s,Ks.transition=i}}function NT(t,e,n,r){var s=de,i=Ks.transition;Ks.transition=null;try{de=4,bd(t,e,n,r)}finally{de=s,Ks.transition=i}}function bd(t,e,n,r){if(Dl){var s=wh(t,e,n,r);if(s===null)Ac(t,e,r,bl,n),hm(t,r);else if(kT(s,t,e,n,r))r.stopPropagation();else if(hm(t,r),e&4&&-1<RT.indexOf(t)){for(;s!==null;){var i=ea(s);if(i!==null&&m_(i),i=wh(t,e,n,r),i===null&&Ac(t,e,r,bl,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Ac(t,e,r,null,n)}}var bl=null;function wh(t,e,n,r){if(bl=null,t=Cd(r),t=Br(t),t!==null)if(e=as(t),e===null)t=null;else if(n=e.tag,n===13){if(t=a_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return bl=t,null}function w_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(_T()){case Pd:return 1;case h_:return 4;case Pl:case vT:return 16;case d_:return 536870912;default:return 16}default:return 16}}var lr=null,Od=null,ul=null;function E_(){if(ul)return ul;var t,e=Od,n=e.length,r,s="value"in lr?lr.value:lr.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return ul=s.slice(t,1<r?1-r:void 0)}function cl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ba(){return!0}function fm(){return!1}function Ot(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ba:fm,this.isPropagationStopped=fm,this}return Ae(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ba)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ba)},persist:function(){},isPersistent:Ba}),e}var mi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Vd=Ot(mi),Zo=Ae({},mi,{view:0,detail:0}),DT=Ot(Zo),yc,_c,$i,gu=Ae({},Zo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ld,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==$i&&($i&&t.type==="mousemove"?(yc=t.screenX-$i.screenX,_c=t.screenY-$i.screenY):_c=yc=0,$i=t),yc)},movementY:function(t){return"movementY"in t?t.movementY:_c}}),pm=Ot(gu),bT=Ae({},gu,{dataTransfer:0}),OT=Ot(bT),VT=Ae({},Zo,{relatedTarget:0}),vc=Ot(VT),LT=Ae({},mi,{animationName:0,elapsedTime:0,pseudoElement:0}),MT=Ot(LT),jT=Ae({},mi,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),FT=Ot(jT),UT=Ae({},mi,{data:0}),mm=Ot(UT),zT={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},BT={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$T={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qT(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=$T[t])?!!e[t]:!1}function Ld(){return qT}var HT=Ae({},Zo,{key:function(t){if(t.key){var e=zT[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=cl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?BT[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ld,charCode:function(t){return t.type==="keypress"?cl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?cl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),WT=Ot(HT),KT=Ae({},gu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gm=Ot(KT),GT=Ae({},Zo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ld}),QT=Ot(GT),YT=Ae({},mi,{propertyName:0,elapsedTime:0,pseudoElement:0}),XT=Ot(YT),JT=Ae({},gu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ZT=Ot(JT),eI=[9,13,27,32],Md=Un&&"CompositionEvent"in window,co=null;Un&&"documentMode"in document&&(co=document.documentMode);var tI=Un&&"TextEvent"in window&&!co,T_=Un&&(!Md||co&&8<co&&11>=co),ym=" ",_m=!1;function I_(t,e){switch(t){case"keyup":return eI.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function x_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var bs=!1;function nI(t,e){switch(t){case"compositionend":return x_(e);case"keypress":return e.which!==32?null:(_m=!0,ym);case"textInput":return t=e.data,t===ym&&_m?null:t;default:return null}}function rI(t,e){if(bs)return t==="compositionend"||!Md&&I_(t,e)?(t=E_(),ul=Od=lr=null,bs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return T_&&e.locale!=="ko"?null:e.data;default:return null}}var sI={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!sI[t.type]:e==="textarea"}function S_(t,e,n,r){n_(r),e=Ol(e,"onChange"),0<e.length&&(n=new Vd("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var ho=null,Co=null;function iI(t){L_(t,0)}function yu(t){var e=Ls(t);if(Qy(e))return t}function oI(t,e){if(t==="change")return e}var A_=!1;if(Un){var wc;if(Un){var Ec="oninput"in document;if(!Ec){var wm=document.createElement("div");wm.setAttribute("oninput","return;"),Ec=typeof wm.oninput=="function"}wc=Ec}else wc=!1;A_=wc&&(!document.documentMode||9<document.documentMode)}function Em(){ho&&(ho.detachEvent("onpropertychange",R_),Co=ho=null)}function R_(t){if(t.propertyName==="value"&&yu(Co)){var e=[];S_(e,Co,t,Cd(t)),o_(iI,e)}}function aI(t,e,n){t==="focusin"?(Em(),ho=e,Co=n,ho.attachEvent("onpropertychange",R_)):t==="focusout"&&Em()}function lI(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return yu(Co)}function uI(t,e){if(t==="click")return yu(e)}function cI(t,e){if(t==="input"||t==="change")return yu(e)}function hI(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var nn=typeof Object.is=="function"?Object.is:hI;function Po(t,e){if(nn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!nh.call(e,s)||!nn(t[s],e[s]))return!1}return!0}function Tm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Im(t,e){var n=Tm(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Tm(n)}}function k_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?k_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function C_(){for(var t=window,e=Rl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Rl(t.document)}return e}function jd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function dI(t){var e=C_(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&k_(n.ownerDocument.documentElement,n)){if(r!==null&&jd(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Im(n,i);var o=Im(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var fI=Un&&"documentMode"in document&&11>=document.documentMode,Os=null,Eh=null,fo=null,Th=!1;function xm(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Th||Os==null||Os!==Rl(r)||(r=Os,"selectionStart"in r&&jd(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),fo&&Po(fo,r)||(fo=r,r=Ol(Eh,"onSelect"),0<r.length&&(e=new Vd("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Os)))}function $a(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Vs={animationend:$a("Animation","AnimationEnd"),animationiteration:$a("Animation","AnimationIteration"),animationstart:$a("Animation","AnimationStart"),transitionend:$a("Transition","TransitionEnd")},Tc={},P_={};Un&&(P_=document.createElement("div").style,"AnimationEvent"in window||(delete Vs.animationend.animation,delete Vs.animationiteration.animation,delete Vs.animationstart.animation),"TransitionEvent"in window||delete Vs.transitionend.transition);function _u(t){if(Tc[t])return Tc[t];if(!Vs[t])return t;var e=Vs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in P_)return Tc[t]=e[n];return t}var N_=_u("animationend"),D_=_u("animationiteration"),b_=_u("animationstart"),O_=_u("transitionend"),V_=new Map,Sm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function kr(t,e){V_.set(t,e),os(e,[t])}for(var Ic=0;Ic<Sm.length;Ic++){var xc=Sm[Ic],pI=xc.toLowerCase(),mI=xc[0].toUpperCase()+xc.slice(1);kr(pI,"on"+mI)}kr(N_,"onAnimationEnd");kr(D_,"onAnimationIteration");kr(b_,"onAnimationStart");kr("dblclick","onDoubleClick");kr("focusin","onFocus");kr("focusout","onBlur");kr(O_,"onTransitionEnd");ei("onMouseEnter",["mouseout","mouseover"]);ei("onMouseLeave",["mouseout","mouseover"]);ei("onPointerEnter",["pointerout","pointerover"]);ei("onPointerLeave",["pointerout","pointerover"]);os("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));os("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));os("onBeforeInput",["compositionend","keypress","textInput","paste"]);os("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));os("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));os("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var to="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),gI=new Set("cancel close invalid load scroll toggle".split(" ").concat(to));function Am(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,pT(r,e,void 0,t),t.currentTarget=null}function L_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;Am(s,l,h),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;Am(s,l,h),i=u}}}if(Cl)throw t=yh,Cl=!1,yh=null,t}function we(t,e){var n=e[Rh];n===void 0&&(n=e[Rh]=new Set);var r=t+"__bubble";n.has(r)||(M_(e,t,2,!1),n.add(r))}function Sc(t,e,n){var r=0;e&&(r|=4),M_(n,t,r,e)}var qa="_reactListening"+Math.random().toString(36).slice(2);function No(t){if(!t[qa]){t[qa]=!0,qy.forEach(function(n){n!=="selectionchange"&&(gI.has(n)||Sc(n,!1,t),Sc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[qa]||(e[qa]=!0,Sc("selectionchange",!1,e))}}function M_(t,e,n,r){switch(w_(e)){case 1:var s=PT;break;case 4:s=NT;break;default:s=bd}n=s.bind(null,e,n,t),s=void 0,!gh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Ac(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Br(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}o_(function(){var h=i,p=Cd(n),y=[];e:{var _=V_.get(t);if(_!==void 0){var R=Vd,C=t;switch(t){case"keypress":if(cl(n)===0)break e;case"keydown":case"keyup":R=WT;break;case"focusin":C="focus",R=vc;break;case"focusout":C="blur",R=vc;break;case"beforeblur":case"afterblur":R=vc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":R=pm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":R=OT;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":R=QT;break;case N_:case D_:case b_:R=MT;break;case O_:R=XT;break;case"scroll":R=DT;break;case"wheel":R=ZT;break;case"copy":case"cut":case"paste":R=FT;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":R=gm}var V=(e&4)!==0,L=!V&&t==="scroll",x=V?_!==null?_+"Capture":null:_;V=[];for(var E=h,S;E!==null;){S=E;var O=S.stateNode;if(S.tag===5&&O!==null&&(S=O,x!==null&&(O=So(E,x),O!=null&&V.push(Do(E,O,S)))),L)break;E=E.return}0<V.length&&(_=new R(_,C,null,n,p),y.push({event:_,listeners:V}))}}if(!(e&7)){e:{if(_=t==="mouseover"||t==="pointerover",R=t==="mouseout"||t==="pointerout",_&&n!==ph&&(C=n.relatedTarget||n.fromElement)&&(Br(C)||C[zn]))break e;if((R||_)&&(_=p.window===p?p:(_=p.ownerDocument)?_.defaultView||_.parentWindow:window,R?(C=n.relatedTarget||n.toElement,R=h,C=C?Br(C):null,C!==null&&(L=as(C),C!==L||C.tag!==5&&C.tag!==6)&&(C=null)):(R=null,C=h),R!==C)){if(V=pm,O="onMouseLeave",x="onMouseEnter",E="mouse",(t==="pointerout"||t==="pointerover")&&(V=gm,O="onPointerLeave",x="onPointerEnter",E="pointer"),L=R==null?_:Ls(R),S=C==null?_:Ls(C),_=new V(O,E+"leave",R,n,p),_.target=L,_.relatedTarget=S,O=null,Br(p)===h&&(V=new V(x,E+"enter",C,n,p),V.target=S,V.relatedTarget=L,O=V),L=O,R&&C)t:{for(V=R,x=C,E=0,S=V;S;S=As(S))E++;for(S=0,O=x;O;O=As(O))S++;for(;0<E-S;)V=As(V),E--;for(;0<S-E;)x=As(x),S--;for(;E--;){if(V===x||x!==null&&V===x.alternate)break t;V=As(V),x=As(x)}V=null}else V=null;R!==null&&Rm(y,_,R,V,!1),C!==null&&L!==null&&Rm(y,L,C,V,!0)}}e:{if(_=h?Ls(h):window,R=_.nodeName&&_.nodeName.toLowerCase(),R==="select"||R==="input"&&_.type==="file")var B=oI;else if(vm(_))if(A_)B=cI;else{B=lI;var z=aI}else(R=_.nodeName)&&R.toLowerCase()==="input"&&(_.type==="checkbox"||_.type==="radio")&&(B=uI);if(B&&(B=B(t,h))){S_(y,B,n,p);break e}z&&z(t,_,h),t==="focusout"&&(z=_._wrapperState)&&z.controlled&&_.type==="number"&&uh(_,"number",_.value)}switch(z=h?Ls(h):window,t){case"focusin":(vm(z)||z.contentEditable==="true")&&(Os=z,Eh=h,fo=null);break;case"focusout":fo=Eh=Os=null;break;case"mousedown":Th=!0;break;case"contextmenu":case"mouseup":case"dragend":Th=!1,xm(y,n,p);break;case"selectionchange":if(fI)break;case"keydown":case"keyup":xm(y,n,p)}var v;if(Md)e:{switch(t){case"compositionstart":var g="onCompositionStart";break e;case"compositionend":g="onCompositionEnd";break e;case"compositionupdate":g="onCompositionUpdate";break e}g=void 0}else bs?I_(t,n)&&(g="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(g="onCompositionStart");g&&(T_&&n.locale!=="ko"&&(bs||g!=="onCompositionStart"?g==="onCompositionEnd"&&bs&&(v=E_()):(lr=p,Od="value"in lr?lr.value:lr.textContent,bs=!0)),z=Ol(h,g),0<z.length&&(g=new mm(g,t,null,n,p),y.push({event:g,listeners:z}),v?g.data=v:(v=x_(n),v!==null&&(g.data=v)))),(v=tI?nI(t,n):rI(t,n))&&(h=Ol(h,"onBeforeInput"),0<h.length&&(p=new mm("onBeforeInput","beforeinput",null,n,p),y.push({event:p,listeners:h}),p.data=v))}L_(y,e)})}function Do(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ol(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=So(t,n),i!=null&&r.unshift(Do(t,i,s)),i=So(t,e),i!=null&&r.push(Do(t,i,s))),t=t.return}return r}function As(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Rm(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,s?(u=So(n,i),u!=null&&o.unshift(Do(n,u,l))):s||(u=So(n,i),u!=null&&o.push(Do(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var yI=/\r\n?/g,_I=/\u0000|\uFFFD/g;function km(t){return(typeof t=="string"?t:""+t).replace(yI,`
`).replace(_I,"")}function Ha(t,e,n){if(e=km(e),km(t)!==e&&n)throw Error(F(425))}function Vl(){}var Ih=null,xh=null;function Sh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ah=typeof setTimeout=="function"?setTimeout:void 0,vI=typeof clearTimeout=="function"?clearTimeout:void 0,Cm=typeof Promise=="function"?Promise:void 0,wI=typeof queueMicrotask=="function"?queueMicrotask:typeof Cm<"u"?function(t){return Cm.resolve(null).then(t).catch(EI)}:Ah;function EI(t){setTimeout(function(){throw t})}function Rc(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),ko(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);ko(e)}function pr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Pm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var gi=Math.random().toString(36).slice(2),hn="__reactFiber$"+gi,bo="__reactProps$"+gi,zn="__reactContainer$"+gi,Rh="__reactEvents$"+gi,TI="__reactListeners$"+gi,II="__reactHandles$"+gi;function Br(t){var e=t[hn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[zn]||n[hn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Pm(t);t!==null;){if(n=t[hn])return n;t=Pm(t)}return e}t=n,n=t.parentNode}return null}function ea(t){return t=t[hn]||t[zn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ls(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(F(33))}function vu(t){return t[bo]||null}var kh=[],Ms=-1;function Cr(t){return{current:t}}function Te(t){0>Ms||(t.current=kh[Ms],kh[Ms]=null,Ms--)}function ye(t,e){Ms++,kh[Ms]=t.current,t.current=e}var Ir={},ct=Cr(Ir),Tt=Cr(!1),Qr=Ir;function ti(t,e){var n=t.type.contextTypes;if(!n)return Ir;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function It(t){return t=t.childContextTypes,t!=null}function Ll(){Te(Tt),Te(ct)}function Nm(t,e,n){if(ct.current!==Ir)throw Error(F(168));ye(ct,e),ye(Tt,n)}function j_(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(F(108,aT(t)||"Unknown",s));return Ae({},n,r)}function Ml(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ir,Qr=ct.current,ye(ct,t),ye(Tt,Tt.current),!0}function Dm(t,e,n){var r=t.stateNode;if(!r)throw Error(F(169));n?(t=j_(t,e,Qr),r.__reactInternalMemoizedMergedChildContext=t,Te(Tt),Te(ct),ye(ct,t)):Te(Tt),ye(Tt,n)}var Nn=null,wu=!1,kc=!1;function F_(t){Nn===null?Nn=[t]:Nn.push(t)}function xI(t){wu=!0,F_(t)}function Pr(){if(!kc&&Nn!==null){kc=!0;var t=0,e=de;try{var n=Nn;for(de=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Nn=null,wu=!1}catch(s){throw Nn!==null&&(Nn=Nn.slice(t+1)),c_(Pd,Pr),s}finally{de=e,kc=!1}}return null}var js=[],Fs=0,jl=null,Fl=0,Lt=[],Mt=0,Yr=null,Dn=1,bn="";function Fr(t,e){js[Fs++]=Fl,js[Fs++]=jl,jl=t,Fl=e}function U_(t,e,n){Lt[Mt++]=Dn,Lt[Mt++]=bn,Lt[Mt++]=Yr,Yr=t;var r=Dn;t=bn;var s=32-en(r)-1;r&=~(1<<s),n+=1;var i=32-en(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,Dn=1<<32-en(e)+s|n<<s|r,bn=i+t}else Dn=1<<i|n<<s|r,bn=t}function Fd(t){t.return!==null&&(Fr(t,1),U_(t,1,0))}function Ud(t){for(;t===jl;)jl=js[--Fs],js[Fs]=null,Fl=js[--Fs],js[Fs]=null;for(;t===Yr;)Yr=Lt[--Mt],Lt[Mt]=null,bn=Lt[--Mt],Lt[Mt]=null,Dn=Lt[--Mt],Lt[Mt]=null}var Nt=null,Ct=null,Ie=!1,Jt=null;function z_(t,e){var n=jt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function bm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Nt=t,Ct=pr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Nt=t,Ct=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Yr!==null?{id:Dn,overflow:bn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=jt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Nt=t,Ct=null,!0):!1;default:return!1}}function Ch(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ph(t){if(Ie){var e=Ct;if(e){var n=e;if(!bm(t,e)){if(Ch(t))throw Error(F(418));e=pr(n.nextSibling);var r=Nt;e&&bm(t,e)?z_(r,n):(t.flags=t.flags&-4097|2,Ie=!1,Nt=t)}}else{if(Ch(t))throw Error(F(418));t.flags=t.flags&-4097|2,Ie=!1,Nt=t}}}function Om(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Nt=t}function Wa(t){if(t!==Nt)return!1;if(!Ie)return Om(t),Ie=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Sh(t.type,t.memoizedProps)),e&&(e=Ct)){if(Ch(t))throw B_(),Error(F(418));for(;e;)z_(t,e),e=pr(e.nextSibling)}if(Om(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(F(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Ct=pr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Ct=null}}else Ct=Nt?pr(t.stateNode.nextSibling):null;return!0}function B_(){for(var t=Ct;t;)t=pr(t.nextSibling)}function ni(){Ct=Nt=null,Ie=!1}function zd(t){Jt===null?Jt=[t]:Jt.push(t)}var SI=Gn.ReactCurrentBatchConfig;function qi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,t))}return t}function Ka(t,e){throw t=Object.prototype.toString.call(e),Error(F(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Vm(t){var e=t._init;return e(t._payload)}function $_(t){function e(x,E){if(t){var S=x.deletions;S===null?(x.deletions=[E],x.flags|=16):S.push(E)}}function n(x,E){if(!t)return null;for(;E!==null;)e(x,E),E=E.sibling;return null}function r(x,E){for(x=new Map;E!==null;)E.key!==null?x.set(E.key,E):x.set(E.index,E),E=E.sibling;return x}function s(x,E){return x=_r(x,E),x.index=0,x.sibling=null,x}function i(x,E,S){return x.index=S,t?(S=x.alternate,S!==null?(S=S.index,S<E?(x.flags|=2,E):S):(x.flags|=2,E)):(x.flags|=1048576,E)}function o(x){return t&&x.alternate===null&&(x.flags|=2),x}function l(x,E,S,O){return E===null||E.tag!==6?(E=Vc(S,x.mode,O),E.return=x,E):(E=s(E,S),E.return=x,E)}function u(x,E,S,O){var B=S.type;return B===Ds?p(x,E,S.props.children,O,S.key):E!==null&&(E.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===er&&Vm(B)===E.type)?(O=s(E,S.props),O.ref=qi(x,E,S),O.return=x,O):(O=yl(S.type,S.key,S.props,null,x.mode,O),O.ref=qi(x,E,S),O.return=x,O)}function h(x,E,S,O){return E===null||E.tag!==4||E.stateNode.containerInfo!==S.containerInfo||E.stateNode.implementation!==S.implementation?(E=Lc(S,x.mode,O),E.return=x,E):(E=s(E,S.children||[]),E.return=x,E)}function p(x,E,S,O,B){return E===null||E.tag!==7?(E=Kr(S,x.mode,O,B),E.return=x,E):(E=s(E,S),E.return=x,E)}function y(x,E,S){if(typeof E=="string"&&E!==""||typeof E=="number")return E=Vc(""+E,x.mode,S),E.return=x,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case La:return S=yl(E.type,E.key,E.props,null,x.mode,S),S.ref=qi(x,null,E),S.return=x,S;case Ns:return E=Lc(E,x.mode,S),E.return=x,E;case er:var O=E._init;return y(x,O(E._payload),S)}if(Zi(E)||Fi(E))return E=Kr(E,x.mode,S,null),E.return=x,E;Ka(x,E)}return null}function _(x,E,S,O){var B=E!==null?E.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return B!==null?null:l(x,E,""+S,O);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case La:return S.key===B?u(x,E,S,O):null;case Ns:return S.key===B?h(x,E,S,O):null;case er:return B=S._init,_(x,E,B(S._payload),O)}if(Zi(S)||Fi(S))return B!==null?null:p(x,E,S,O,null);Ka(x,S)}return null}function R(x,E,S,O,B){if(typeof O=="string"&&O!==""||typeof O=="number")return x=x.get(S)||null,l(E,x,""+O,B);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case La:return x=x.get(O.key===null?S:O.key)||null,u(E,x,O,B);case Ns:return x=x.get(O.key===null?S:O.key)||null,h(E,x,O,B);case er:var z=O._init;return R(x,E,S,z(O._payload),B)}if(Zi(O)||Fi(O))return x=x.get(S)||null,p(E,x,O,B,null);Ka(E,O)}return null}function C(x,E,S,O){for(var B=null,z=null,v=E,g=E=0,w=null;v!==null&&g<S.length;g++){v.index>g?(w=v,v=null):w=v.sibling;var T=_(x,v,S[g],O);if(T===null){v===null&&(v=w);break}t&&v&&T.alternate===null&&e(x,v),E=i(T,E,g),z===null?B=T:z.sibling=T,z=T,v=w}if(g===S.length)return n(x,v),Ie&&Fr(x,g),B;if(v===null){for(;g<S.length;g++)v=y(x,S[g],O),v!==null&&(E=i(v,E,g),z===null?B=v:z.sibling=v,z=v);return Ie&&Fr(x,g),B}for(v=r(x,v);g<S.length;g++)w=R(v,x,g,S[g],O),w!==null&&(t&&w.alternate!==null&&v.delete(w.key===null?g:w.key),E=i(w,E,g),z===null?B=w:z.sibling=w,z=w);return t&&v.forEach(function(A){return e(x,A)}),Ie&&Fr(x,g),B}function V(x,E,S,O){var B=Fi(S);if(typeof B!="function")throw Error(F(150));if(S=B.call(S),S==null)throw Error(F(151));for(var z=B=null,v=E,g=E=0,w=null,T=S.next();v!==null&&!T.done;g++,T=S.next()){v.index>g?(w=v,v=null):w=v.sibling;var A=_(x,v,T.value,O);if(A===null){v===null&&(v=w);break}t&&v&&A.alternate===null&&e(x,v),E=i(A,E,g),z===null?B=A:z.sibling=A,z=A,v=w}if(T.done)return n(x,v),Ie&&Fr(x,g),B;if(v===null){for(;!T.done;g++,T=S.next())T=y(x,T.value,O),T!==null&&(E=i(T,E,g),z===null?B=T:z.sibling=T,z=T);return Ie&&Fr(x,g),B}for(v=r(x,v);!T.done;g++,T=S.next())T=R(v,x,g,T.value,O),T!==null&&(t&&T.alternate!==null&&v.delete(T.key===null?g:T.key),E=i(T,E,g),z===null?B=T:z.sibling=T,z=T);return t&&v.forEach(function(P){return e(x,P)}),Ie&&Fr(x,g),B}function L(x,E,S,O){if(typeof S=="object"&&S!==null&&S.type===Ds&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case La:e:{for(var B=S.key,z=E;z!==null;){if(z.key===B){if(B=S.type,B===Ds){if(z.tag===7){n(x,z.sibling),E=s(z,S.props.children),E.return=x,x=E;break e}}else if(z.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===er&&Vm(B)===z.type){n(x,z.sibling),E=s(z,S.props),E.ref=qi(x,z,S),E.return=x,x=E;break e}n(x,z);break}else e(x,z);z=z.sibling}S.type===Ds?(E=Kr(S.props.children,x.mode,O,S.key),E.return=x,x=E):(O=yl(S.type,S.key,S.props,null,x.mode,O),O.ref=qi(x,E,S),O.return=x,x=O)}return o(x);case Ns:e:{for(z=S.key;E!==null;){if(E.key===z)if(E.tag===4&&E.stateNode.containerInfo===S.containerInfo&&E.stateNode.implementation===S.implementation){n(x,E.sibling),E=s(E,S.children||[]),E.return=x,x=E;break e}else{n(x,E);break}else e(x,E);E=E.sibling}E=Lc(S,x.mode,O),E.return=x,x=E}return o(x);case er:return z=S._init,L(x,E,z(S._payload),O)}if(Zi(S))return C(x,E,S,O);if(Fi(S))return V(x,E,S,O);Ka(x,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,E!==null&&E.tag===6?(n(x,E.sibling),E=s(E,S),E.return=x,x=E):(n(x,E),E=Vc(S,x.mode,O),E.return=x,x=E),o(x)):n(x,E)}return L}var ri=$_(!0),q_=$_(!1),Ul=Cr(null),zl=null,Us=null,Bd=null;function $d(){Bd=Us=zl=null}function qd(t){var e=Ul.current;Te(Ul),t._currentValue=e}function Nh(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Gs(t,e){zl=t,Bd=Us=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Et=!0),t.firstContext=null)}function zt(t){var e=t._currentValue;if(Bd!==t)if(t={context:t,memoizedValue:e,next:null},Us===null){if(zl===null)throw Error(F(308));Us=t,zl.dependencies={lanes:0,firstContext:t}}else Us=Us.next=t;return e}var $r=null;function Hd(t){$r===null?$r=[t]:$r.push(t)}function H_(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,Hd(e)):(n.next=s.next,s.next=n),e.interleaved=n,Bn(t,r)}function Bn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var tr=!1;function Wd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function W_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Mn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function mr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,le&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Bn(t,n)}return s=r.interleaved,s===null?(e.next=e,Hd(r)):(e.next=s.next,s.next=e),r.interleaved=e,Bn(t,n)}function hl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Nd(t,n)}}function Lm(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Bl(t,e,n,r){var s=t.updateQueue;tr=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?i=h:o.next=h,o=u;var p=t.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==o&&(l===null?p.firstBaseUpdate=h:l.next=h,p.lastBaseUpdate=u))}if(i!==null){var y=s.baseState;o=0,p=h=u=null,l=i;do{var _=l.lane,R=l.eventTime;if((r&_)===_){p!==null&&(p=p.next={eventTime:R,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var C=t,V=l;switch(_=e,R=n,V.tag){case 1:if(C=V.payload,typeof C=="function"){y=C.call(R,y,_);break e}y=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=V.payload,_=typeof C=="function"?C.call(R,y,_):C,_==null)break e;y=Ae({},y,_);break e;case 2:tr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,_=s.effects,_===null?s.effects=[l]:_.push(l))}else R={eventTime:R,lane:_,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(h=p=R,u=y):p=p.next=R,o|=_;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;_=l,l=_.next,_.next=null,s.lastBaseUpdate=_,s.shared.pending=null}}while(!0);if(p===null&&(u=y),s.baseState=u,s.firstBaseUpdate=h,s.lastBaseUpdate=p,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Jr|=o,t.lanes=o,t.memoizedState=y}}function Mm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(F(191,s));s.call(r)}}}var ta={},pn=Cr(ta),Oo=Cr(ta),Vo=Cr(ta);function qr(t){if(t===ta)throw Error(F(174));return t}function Kd(t,e){switch(ye(Vo,e),ye(Oo,t),ye(pn,ta),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:hh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=hh(e,t)}Te(pn),ye(pn,e)}function si(){Te(pn),Te(Oo),Te(Vo)}function K_(t){qr(Vo.current);var e=qr(pn.current),n=hh(e,t.type);e!==n&&(ye(Oo,t),ye(pn,n))}function Gd(t){Oo.current===t&&(Te(pn),Te(Oo))}var xe=Cr(0);function $l(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Cc=[];function Qd(){for(var t=0;t<Cc.length;t++)Cc[t]._workInProgressVersionPrimary=null;Cc.length=0}var dl=Gn.ReactCurrentDispatcher,Pc=Gn.ReactCurrentBatchConfig,Xr=0,Se=null,Fe=null,He=null,ql=!1,po=!1,Lo=0,AI=0;function st(){throw Error(F(321))}function Yd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!nn(t[n],e[n]))return!1;return!0}function Xd(t,e,n,r,s,i){if(Xr=i,Se=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,dl.current=t===null||t.memoizedState===null?PI:NI,t=n(r,s),po){i=0;do{if(po=!1,Lo=0,25<=i)throw Error(F(301));i+=1,He=Fe=null,e.updateQueue=null,dl.current=DI,t=n(r,s)}while(po)}if(dl.current=Hl,e=Fe!==null&&Fe.next!==null,Xr=0,He=Fe=Se=null,ql=!1,e)throw Error(F(300));return t}function Jd(){var t=Lo!==0;return Lo=0,t}function cn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?Se.memoizedState=He=t:He=He.next=t,He}function Bt(){if(Fe===null){var t=Se.alternate;t=t!==null?t.memoizedState:null}else t=Fe.next;var e=He===null?Se.memoizedState:He.next;if(e!==null)He=e,Fe=t;else{if(t===null)throw Error(F(310));Fe=t,t={memoizedState:Fe.memoizedState,baseState:Fe.baseState,baseQueue:Fe.baseQueue,queue:Fe.queue,next:null},He===null?Se.memoizedState=He=t:He=He.next=t}return He}function Mo(t,e){return typeof e=="function"?e(t):e}function Nc(t){var e=Bt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=Fe,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,h=i;do{var p=h.lane;if((Xr&p)===p)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var y={lane:p,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=y,o=r):u=u.next=y,Se.lanes|=p,Jr|=p}h=h.next}while(h!==null&&h!==i);u===null?o=r:u.next=l,nn(r,e.memoizedState)||(Et=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,Se.lanes|=i,Jr|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Dc(t){var e=Bt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);nn(i,e.memoizedState)||(Et=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function G_(){}function Q_(t,e){var n=Se,r=Bt(),s=e(),i=!nn(r.memoizedState,s);if(i&&(r.memoizedState=s,Et=!0),r=r.queue,Zd(J_.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||He!==null&&He.memoizedState.tag&1){if(n.flags|=2048,jo(9,X_.bind(null,n,r,s,e),void 0,null),We===null)throw Error(F(349));Xr&30||Y_(n,e,s)}return s}function Y_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Se.updateQueue,e===null?(e={lastEffect:null,stores:null},Se.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function X_(t,e,n,r){e.value=n,e.getSnapshot=r,Z_(e)&&ev(t)}function J_(t,e,n){return n(function(){Z_(e)&&ev(t)})}function Z_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!nn(t,n)}catch{return!0}}function ev(t){var e=Bn(t,1);e!==null&&tn(e,t,1,-1)}function jm(t){var e=cn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Mo,lastRenderedState:t},e.queue=t,t=t.dispatch=CI.bind(null,Se,t),[e.memoizedState,t]}function jo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Se.updateQueue,e===null?(e={lastEffect:null,stores:null},Se.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function tv(){return Bt().memoizedState}function fl(t,e,n,r){var s=cn();Se.flags|=t,s.memoizedState=jo(1|e,n,void 0,r===void 0?null:r)}function Eu(t,e,n,r){var s=Bt();r=r===void 0?null:r;var i=void 0;if(Fe!==null){var o=Fe.memoizedState;if(i=o.destroy,r!==null&&Yd(r,o.deps)){s.memoizedState=jo(e,n,i,r);return}}Se.flags|=t,s.memoizedState=jo(1|e,n,i,r)}function Fm(t,e){return fl(8390656,8,t,e)}function Zd(t,e){return Eu(2048,8,t,e)}function nv(t,e){return Eu(4,2,t,e)}function rv(t,e){return Eu(4,4,t,e)}function sv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function iv(t,e,n){return n=n!=null?n.concat([t]):null,Eu(4,4,sv.bind(null,e,t),n)}function ef(){}function ov(t,e){var n=Bt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Yd(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function av(t,e){var n=Bt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Yd(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function lv(t,e,n){return Xr&21?(nn(n,e)||(n=f_(),Se.lanes|=n,Jr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Et=!0),t.memoizedState=n)}function RI(t,e){var n=de;de=n!==0&&4>n?n:4,t(!0);var r=Pc.transition;Pc.transition={};try{t(!1),e()}finally{de=n,Pc.transition=r}}function uv(){return Bt().memoizedState}function kI(t,e,n){var r=yr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},cv(t))hv(e,n);else if(n=H_(t,e,n,r),n!==null){var s=mt();tn(n,t,r,s),dv(n,e,r)}}function CI(t,e,n){var r=yr(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(cv(t))hv(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,nn(l,o)){var u=e.interleaved;u===null?(s.next=s,Hd(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=H_(t,e,s,r),n!==null&&(s=mt(),tn(n,t,r,s),dv(n,e,r))}}function cv(t){var e=t.alternate;return t===Se||e!==null&&e===Se}function hv(t,e){po=ql=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function dv(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Nd(t,n)}}var Hl={readContext:zt,useCallback:st,useContext:st,useEffect:st,useImperativeHandle:st,useInsertionEffect:st,useLayoutEffect:st,useMemo:st,useReducer:st,useRef:st,useState:st,useDebugValue:st,useDeferredValue:st,useTransition:st,useMutableSource:st,useSyncExternalStore:st,useId:st,unstable_isNewReconciler:!1},PI={readContext:zt,useCallback:function(t,e){return cn().memoizedState=[t,e===void 0?null:e],t},useContext:zt,useEffect:Fm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,fl(4194308,4,sv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return fl(4194308,4,t,e)},useInsertionEffect:function(t,e){return fl(4,2,t,e)},useMemo:function(t,e){var n=cn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=cn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=kI.bind(null,Se,t),[r.memoizedState,t]},useRef:function(t){var e=cn();return t={current:t},e.memoizedState=t},useState:jm,useDebugValue:ef,useDeferredValue:function(t){return cn().memoizedState=t},useTransition:function(){var t=jm(!1),e=t[0];return t=RI.bind(null,t[1]),cn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Se,s=cn();if(Ie){if(n===void 0)throw Error(F(407));n=n()}else{if(n=e(),We===null)throw Error(F(349));Xr&30||Y_(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,Fm(J_.bind(null,r,i,t),[t]),r.flags|=2048,jo(9,X_.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=cn(),e=We.identifierPrefix;if(Ie){var n=bn,r=Dn;n=(r&~(1<<32-en(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Lo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=AI++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},NI={readContext:zt,useCallback:ov,useContext:zt,useEffect:Zd,useImperativeHandle:iv,useInsertionEffect:nv,useLayoutEffect:rv,useMemo:av,useReducer:Nc,useRef:tv,useState:function(){return Nc(Mo)},useDebugValue:ef,useDeferredValue:function(t){var e=Bt();return lv(e,Fe.memoizedState,t)},useTransition:function(){var t=Nc(Mo)[0],e=Bt().memoizedState;return[t,e]},useMutableSource:G_,useSyncExternalStore:Q_,useId:uv,unstable_isNewReconciler:!1},DI={readContext:zt,useCallback:ov,useContext:zt,useEffect:Zd,useImperativeHandle:iv,useInsertionEffect:nv,useLayoutEffect:rv,useMemo:av,useReducer:Dc,useRef:tv,useState:function(){return Dc(Mo)},useDebugValue:ef,useDeferredValue:function(t){var e=Bt();return Fe===null?e.memoizedState=t:lv(e,Fe.memoizedState,t)},useTransition:function(){var t=Dc(Mo)[0],e=Bt().memoizedState;return[t,e]},useMutableSource:G_,useSyncExternalStore:Q_,useId:uv,unstable_isNewReconciler:!1};function Yt(t,e){if(t&&t.defaultProps){e=Ae({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Dh(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ae({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Tu={isMounted:function(t){return(t=t._reactInternals)?as(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=mt(),s=yr(t),i=Mn(r,s);i.payload=e,n!=null&&(i.callback=n),e=mr(t,i,s),e!==null&&(tn(e,t,s,r),hl(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=mt(),s=yr(t),i=Mn(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=mr(t,i,s),e!==null&&(tn(e,t,s,r),hl(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=mt(),r=yr(t),s=Mn(n,r);s.tag=2,e!=null&&(s.callback=e),e=mr(t,s,r),e!==null&&(tn(e,t,r,n),hl(e,t,r))}};function Um(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!Po(n,r)||!Po(s,i):!0}function fv(t,e,n){var r=!1,s=Ir,i=e.contextType;return typeof i=="object"&&i!==null?i=zt(i):(s=It(e)?Qr:ct.current,r=e.contextTypes,i=(r=r!=null)?ti(t,s):Ir),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Tu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function zm(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Tu.enqueueReplaceState(e,e.state,null)}function bh(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},Wd(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=zt(i):(i=It(e)?Qr:ct.current,s.context=ti(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Dh(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Tu.enqueueReplaceState(s,s.state,null),Bl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function ii(t,e){try{var n="",r=e;do n+=oT(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function bc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Oh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var bI=typeof WeakMap=="function"?WeakMap:Map;function pv(t,e,n){n=Mn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Kl||(Kl=!0,qh=r),Oh(t,e)},n}function mv(t,e,n){n=Mn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){Oh(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Oh(t,e),typeof r!="function"&&(gr===null?gr=new Set([this]):gr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Bm(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new bI;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=KI.bind(null,t,e,n),e.then(t,t))}function $m(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function qm(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Mn(-1,1),e.tag=2,mr(n,e,1))),n.lanes|=1),t)}var OI=Gn.ReactCurrentOwner,Et=!1;function pt(t,e,n,r){e.child=t===null?q_(e,null,n,r):ri(e,t.child,n,r)}function Hm(t,e,n,r,s){n=n.render;var i=e.ref;return Gs(e,s),r=Xd(t,e,n,r,i,s),n=Jd(),t!==null&&!Et?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,$n(t,e,s)):(Ie&&n&&Fd(e),e.flags|=1,pt(t,e,r,s),e.child)}function Wm(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!uf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,gv(t,e,i,r,s)):(t=yl(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Po,n(o,r)&&t.ref===e.ref)return $n(t,e,s)}return e.flags|=1,t=_r(i,r),t.ref=e.ref,t.return=e,e.child=t}function gv(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(Po(i,r)&&t.ref===e.ref)if(Et=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(Et=!0);else return e.lanes=t.lanes,$n(t,e,s)}return Vh(t,e,n,r,s)}function yv(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ye(Bs,kt),kt|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ye(Bs,kt),kt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ye(Bs,kt),kt|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,ye(Bs,kt),kt|=r;return pt(t,e,s,n),e.child}function _v(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Vh(t,e,n,r,s){var i=It(n)?Qr:ct.current;return i=ti(e,i),Gs(e,s),n=Xd(t,e,n,r,i,s),r=Jd(),t!==null&&!Et?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,$n(t,e,s)):(Ie&&r&&Fd(e),e.flags|=1,pt(t,e,n,s),e.child)}function Km(t,e,n,r,s){if(It(n)){var i=!0;Ml(e)}else i=!1;if(Gs(e,s),e.stateNode===null)pl(t,e),fv(e,n,r),bh(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=zt(h):(h=It(n)?Qr:ct.current,h=ti(e,h));var p=n.getDerivedStateFromProps,y=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";y||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&zm(e,o,r,h),tr=!1;var _=e.memoizedState;o.state=_,Bl(e,r,o,s),u=e.memoizedState,l!==r||_!==u||Tt.current||tr?(typeof p=="function"&&(Dh(e,n,p,r),u=e.memoizedState),(l=tr||Um(e,n,l,r,_,u,h))?(y||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,W_(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Yt(e.type,l),o.props=h,y=e.pendingProps,_=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=zt(u):(u=It(n)?Qr:ct.current,u=ti(e,u));var R=n.getDerivedStateFromProps;(p=typeof R=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==y||_!==u)&&zm(e,o,r,u),tr=!1,_=e.memoizedState,o.state=_,Bl(e,r,o,s);var C=e.memoizedState;l!==y||_!==C||Tt.current||tr?(typeof R=="function"&&(Dh(e,n,R,r),C=e.memoizedState),(h=tr||Um(e,n,h,r,_,C,u)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,C,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,C,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=C),o.props=r,o.state=C,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),r=!1)}return Lh(t,e,n,r,i,s)}function Lh(t,e,n,r,s,i){_v(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&Dm(e,n,!1),$n(t,e,i);r=e.stateNode,OI.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=ri(e,t.child,null,i),e.child=ri(e,null,l,i)):pt(t,e,l,i),e.memoizedState=r.state,s&&Dm(e,n,!0),e.child}function vv(t){var e=t.stateNode;e.pendingContext?Nm(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Nm(t,e.context,!1),Kd(t,e.containerInfo)}function Gm(t,e,n,r,s){return ni(),zd(s),e.flags|=256,pt(t,e,n,r),e.child}var Mh={dehydrated:null,treeContext:null,retryLane:0};function jh(t){return{baseLanes:t,cachePool:null,transitions:null}}function wv(t,e,n){var r=e.pendingProps,s=xe.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),ye(xe,s&1),t===null)return Ph(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Su(o,r,0,null),t=Kr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=jh(n),e.memoizedState=Mh,t):tf(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return VI(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=_r(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=_r(l,i):(i=Kr(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?jh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=Mh,r}return i=t.child,t=i.sibling,r=_r(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function tf(t,e){return e=Su({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ga(t,e,n,r){return r!==null&&zd(r),ri(e,t.child,null,n),t=tf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function VI(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=bc(Error(F(422))),Ga(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=Su({mode:"visible",children:r.children},s,0,null),i=Kr(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&ri(e,t.child,null,o),e.child.memoizedState=jh(o),e.memoizedState=Mh,i);if(!(e.mode&1))return Ga(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(F(419)),r=bc(i,r,void 0),Ga(t,e,o,r)}if(l=(o&t.childLanes)!==0,Et||l){if(r=We,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Bn(t,s),tn(r,t,s,-1))}return lf(),r=bc(Error(F(421))),Ga(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=GI.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Ct=pr(s.nextSibling),Nt=e,Ie=!0,Jt=null,t!==null&&(Lt[Mt++]=Dn,Lt[Mt++]=bn,Lt[Mt++]=Yr,Dn=t.id,bn=t.overflow,Yr=e),e=tf(e,r.children),e.flags|=4096,e)}function Qm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Nh(t.return,e,n)}function Oc(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Ev(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(pt(t,e,r.children,n),r=xe.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Qm(t,n,e);else if(t.tag===19)Qm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ye(xe,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&$l(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),Oc(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&$l(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}Oc(e,!0,n,null,i);break;case"together":Oc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function pl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function $n(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Jr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(F(153));if(e.child!==null){for(t=e.child,n=_r(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=_r(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function LI(t,e,n){switch(e.tag){case 3:vv(e),ni();break;case 5:K_(e);break;case 1:It(e.type)&&Ml(e);break;case 4:Kd(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;ye(Ul,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ye(xe,xe.current&1),e.flags|=128,null):n&e.child.childLanes?wv(t,e,n):(ye(xe,xe.current&1),t=$n(t,e,n),t!==null?t.sibling:null);ye(xe,xe.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Ev(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ye(xe,xe.current),r)break;return null;case 22:case 23:return e.lanes=0,yv(t,e,n)}return $n(t,e,n)}var Tv,Fh,Iv,xv;Tv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Fh=function(){};Iv=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,qr(pn.current);var i=null;switch(n){case"input":s=ah(t,s),r=ah(t,r),i=[];break;case"select":s=Ae({},s,{value:void 0}),r=Ae({},r,{value:void 0}),i=[];break;case"textarea":s=ch(t,s),r=ch(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Vl)}dh(n,r);var o;n=null;for(h in s)if(!r.hasOwnProperty(h)&&s.hasOwnProperty(h)&&s[h]!=null)if(h==="style"){var l=s[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(Io.hasOwnProperty(h)?i||(i=[]):(i=i||[]).push(h,null));for(h in r){var u=r[h];if(l=s!=null?s[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(Io.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&we("scroll",t),i||l===u||(i=[])):(i=i||[]).push(h,u))}n&&(i=i||[]).push("style",n);var h=i;(e.updateQueue=h)&&(e.flags|=4)}};xv=function(t,e,n,r){n!==r&&(e.flags|=4)};function Hi(t,e){if(!Ie)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function it(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function MI(t,e,n){var r=e.pendingProps;switch(Ud(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return it(e),null;case 1:return It(e.type)&&Ll(),it(e),null;case 3:return r=e.stateNode,si(),Te(Tt),Te(ct),Qd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Wa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Jt!==null&&(Kh(Jt),Jt=null))),Fh(t,e),it(e),null;case 5:Gd(e);var s=qr(Vo.current);if(n=e.type,t!==null&&e.stateNode!=null)Iv(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(F(166));return it(e),null}if(t=qr(pn.current),Wa(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[hn]=e,r[bo]=i,t=(e.mode&1)!==0,n){case"dialog":we("cancel",r),we("close",r);break;case"iframe":case"object":case"embed":we("load",r);break;case"video":case"audio":for(s=0;s<to.length;s++)we(to[s],r);break;case"source":we("error",r);break;case"img":case"image":case"link":we("error",r),we("load",r);break;case"details":we("toggle",r);break;case"input":sm(r,i),we("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},we("invalid",r);break;case"textarea":om(r,i),we("invalid",r)}dh(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Ha(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Ha(r.textContent,l,t),s=["children",""+l]):Io.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&we("scroll",r)}switch(n){case"input":Ma(r),im(r,i,!0);break;case"textarea":Ma(r),am(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Vl)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Jy(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[hn]=e,t[bo]=r,Tv(t,e,!1,!1),e.stateNode=t;e:{switch(o=fh(n,r),n){case"dialog":we("cancel",t),we("close",t),s=r;break;case"iframe":case"object":case"embed":we("load",t),s=r;break;case"video":case"audio":for(s=0;s<to.length;s++)we(to[s],t);s=r;break;case"source":we("error",t),s=r;break;case"img":case"image":case"link":we("error",t),we("load",t),s=r;break;case"details":we("toggle",t),s=r;break;case"input":sm(t,r),s=ah(t,r),we("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=Ae({},r,{value:void 0}),we("invalid",t);break;case"textarea":om(t,r),s=ch(t,r),we("invalid",t);break;default:s=r}dh(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?t_(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Zy(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&xo(t,u):typeof u=="number"&&xo(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Io.hasOwnProperty(i)?u!=null&&i==="onScroll"&&we("scroll",t):u!=null&&Sd(t,i,u,o))}switch(n){case"input":Ma(t),im(t,r,!1);break;case"textarea":Ma(t),am(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Tr(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?qs(t,!!r.multiple,i,!1):r.defaultValue!=null&&qs(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=Vl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return it(e),null;case 6:if(t&&e.stateNode!=null)xv(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(F(166));if(n=qr(Vo.current),qr(pn.current),Wa(e)){if(r=e.stateNode,n=e.memoizedProps,r[hn]=e,(i=r.nodeValue!==n)&&(t=Nt,t!==null))switch(t.tag){case 3:Ha(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ha(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[hn]=e,e.stateNode=r}return it(e),null;case 13:if(Te(xe),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ie&&Ct!==null&&e.mode&1&&!(e.flags&128))B_(),ni(),e.flags|=98560,i=!1;else if(i=Wa(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(F(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(F(317));i[hn]=e}else ni(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;it(e),i=!1}else Jt!==null&&(Kh(Jt),Jt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||xe.current&1?Ue===0&&(Ue=3):lf())),e.updateQueue!==null&&(e.flags|=4),it(e),null);case 4:return si(),Fh(t,e),t===null&&No(e.stateNode.containerInfo),it(e),null;case 10:return qd(e.type._context),it(e),null;case 17:return It(e.type)&&Ll(),it(e),null;case 19:if(Te(xe),i=e.memoizedState,i===null)return it(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)Hi(i,!1);else{if(Ue!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=$l(t),o!==null){for(e.flags|=128,Hi(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ye(xe,xe.current&1|2),e.child}t=t.sibling}i.tail!==null&&De()>oi&&(e.flags|=128,r=!0,Hi(i,!1),e.lanes=4194304)}else{if(!r)if(t=$l(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Hi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Ie)return it(e),null}else 2*De()-i.renderingStartTime>oi&&n!==1073741824&&(e.flags|=128,r=!0,Hi(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=De(),e.sibling=null,n=xe.current,ye(xe,r?n&1|2:n&1),e):(it(e),null);case 22:case 23:return af(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?kt&1073741824&&(it(e),e.subtreeFlags&6&&(e.flags|=8192)):it(e),null;case 24:return null;case 25:return null}throw Error(F(156,e.tag))}function jI(t,e){switch(Ud(e),e.tag){case 1:return It(e.type)&&Ll(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return si(),Te(Tt),Te(ct),Qd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Gd(e),null;case 13:if(Te(xe),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(F(340));ni()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Te(xe),null;case 4:return si(),null;case 10:return qd(e.type._context),null;case 22:case 23:return af(),null;case 24:return null;default:return null}}var Qa=!1,lt=!1,FI=typeof WeakSet=="function"?WeakSet:Set,W=null;function zs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ce(t,e,r)}else n.current=null}function Uh(t,e,n){try{n()}catch(r){Ce(t,e,r)}}var Ym=!1;function UI(t,e){if(Ih=Dl,t=C_(),jd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,p=0,y=t,_=null;t:for(;;){for(var R;y!==n||s!==0&&y.nodeType!==3||(l=o+s),y!==i||r!==0&&y.nodeType!==3||(u=o+r),y.nodeType===3&&(o+=y.nodeValue.length),(R=y.firstChild)!==null;)_=y,y=R;for(;;){if(y===t)break t;if(_===n&&++h===s&&(l=o),_===i&&++p===r&&(u=o),(R=y.nextSibling)!==null)break;y=_,_=y.parentNode}y=R}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(xh={focusedElem:t,selectionRange:n},Dl=!1,W=e;W!==null;)if(e=W,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,W=t;else for(;W!==null;){e=W;try{var C=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var V=C.memoizedProps,L=C.memoizedState,x=e.stateNode,E=x.getSnapshotBeforeUpdate(e.elementType===e.type?V:Yt(e.type,V),L);x.__reactInternalSnapshotBeforeUpdate=E}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(O){Ce(e,e.return,O)}if(t=e.sibling,t!==null){t.return=e.return,W=t;break}W=e.return}return C=Ym,Ym=!1,C}function mo(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&Uh(e,n,i)}s=s.next}while(s!==r)}}function Iu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function zh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Sv(t){var e=t.alternate;e!==null&&(t.alternate=null,Sv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[hn],delete e[bo],delete e[Rh],delete e[TI],delete e[II])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Av(t){return t.tag===5||t.tag===3||t.tag===4}function Xm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Av(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Bh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Vl));else if(r!==4&&(t=t.child,t!==null))for(Bh(t,e,n),t=t.sibling;t!==null;)Bh(t,e,n),t=t.sibling}function $h(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for($h(t,e,n),t=t.sibling;t!==null;)$h(t,e,n),t=t.sibling}var Qe=null,Xt=!1;function Jn(t,e,n){for(n=n.child;n!==null;)Rv(t,e,n),n=n.sibling}function Rv(t,e,n){if(fn&&typeof fn.onCommitFiberUnmount=="function")try{fn.onCommitFiberUnmount(mu,n)}catch{}switch(n.tag){case 5:lt||zs(n,e);case 6:var r=Qe,s=Xt;Qe=null,Jn(t,e,n),Qe=r,Xt=s,Qe!==null&&(Xt?(t=Qe,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Qe.removeChild(n.stateNode));break;case 18:Qe!==null&&(Xt?(t=Qe,n=n.stateNode,t.nodeType===8?Rc(t.parentNode,n):t.nodeType===1&&Rc(t,n),ko(t)):Rc(Qe,n.stateNode));break;case 4:r=Qe,s=Xt,Qe=n.stateNode.containerInfo,Xt=!0,Jn(t,e,n),Qe=r,Xt=s;break;case 0:case 11:case 14:case 15:if(!lt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Uh(n,e,o),s=s.next}while(s!==r)}Jn(t,e,n);break;case 1:if(!lt&&(zs(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Ce(n,e,l)}Jn(t,e,n);break;case 21:Jn(t,e,n);break;case 22:n.mode&1?(lt=(r=lt)||n.memoizedState!==null,Jn(t,e,n),lt=r):Jn(t,e,n);break;default:Jn(t,e,n)}}function Jm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new FI),e.forEach(function(r){var s=QI.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Gt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Qe=l.stateNode,Xt=!1;break e;case 3:Qe=l.stateNode.containerInfo,Xt=!0;break e;case 4:Qe=l.stateNode.containerInfo,Xt=!0;break e}l=l.return}if(Qe===null)throw Error(F(160));Rv(i,o,s),Qe=null,Xt=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(h){Ce(s,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)kv(e,t),e=e.sibling}function kv(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Gt(e,t),ln(t),r&4){try{mo(3,t,t.return),Iu(3,t)}catch(V){Ce(t,t.return,V)}try{mo(5,t,t.return)}catch(V){Ce(t,t.return,V)}}break;case 1:Gt(e,t),ln(t),r&512&&n!==null&&zs(n,n.return);break;case 5:if(Gt(e,t),ln(t),r&512&&n!==null&&zs(n,n.return),t.flags&32){var s=t.stateNode;try{xo(s,"")}catch(V){Ce(t,t.return,V)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Yy(s,i),fh(l,o);var h=fh(l,i);for(o=0;o<u.length;o+=2){var p=u[o],y=u[o+1];p==="style"?t_(s,y):p==="dangerouslySetInnerHTML"?Zy(s,y):p==="children"?xo(s,y):Sd(s,p,y,h)}switch(l){case"input":lh(s,i);break;case"textarea":Xy(s,i);break;case"select":var _=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var R=i.value;R!=null?qs(s,!!i.multiple,R,!1):_!==!!i.multiple&&(i.defaultValue!=null?qs(s,!!i.multiple,i.defaultValue,!0):qs(s,!!i.multiple,i.multiple?[]:"",!1))}s[bo]=i}catch(V){Ce(t,t.return,V)}}break;case 6:if(Gt(e,t),ln(t),r&4){if(t.stateNode===null)throw Error(F(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(V){Ce(t,t.return,V)}}break;case 3:if(Gt(e,t),ln(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ko(e.containerInfo)}catch(V){Ce(t,t.return,V)}break;case 4:Gt(e,t),ln(t);break;case 13:Gt(e,t),ln(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(sf=De())),r&4&&Jm(t);break;case 22:if(p=n!==null&&n.memoizedState!==null,t.mode&1?(lt=(h=lt)||p,Gt(e,t),lt=h):Gt(e,t),ln(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!p&&t.mode&1)for(W=t,p=t.child;p!==null;){for(y=W=p;W!==null;){switch(_=W,R=_.child,_.tag){case 0:case 11:case 14:case 15:mo(4,_,_.return);break;case 1:zs(_,_.return);var C=_.stateNode;if(typeof C.componentWillUnmount=="function"){r=_,n=_.return;try{e=r,C.props=e.memoizedProps,C.state=e.memoizedState,C.componentWillUnmount()}catch(V){Ce(r,n,V)}}break;case 5:zs(_,_.return);break;case 22:if(_.memoizedState!==null){eg(y);continue}}R!==null?(R.return=_,W=R):eg(y)}p=p.sibling}e:for(p=null,y=t;;){if(y.tag===5){if(p===null){p=y;try{s=y.stateNode,h?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=y.stateNode,u=y.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=e_("display",o))}catch(V){Ce(t,t.return,V)}}}else if(y.tag===6){if(p===null)try{y.stateNode.nodeValue=h?"":y.memoizedProps}catch(V){Ce(t,t.return,V)}}else if((y.tag!==22&&y.tag!==23||y.memoizedState===null||y===t)&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;p===y&&(p=null),y=y.return}p===y&&(p=null),y.sibling.return=y.return,y=y.sibling}}break;case 19:Gt(e,t),ln(t),r&4&&Jm(t);break;case 21:break;default:Gt(e,t),ln(t)}}function ln(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Av(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(xo(s,""),r.flags&=-33);var i=Xm(t);$h(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=Xm(t);Bh(t,l,o);break;default:throw Error(F(161))}}catch(u){Ce(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function zI(t,e,n){W=t,Cv(t)}function Cv(t,e,n){for(var r=(t.mode&1)!==0;W!==null;){var s=W,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Qa;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||lt;l=Qa;var h=lt;if(Qa=o,(lt=u)&&!h)for(W=s;W!==null;)o=W,u=o.child,o.tag===22&&o.memoizedState!==null?tg(s):u!==null?(u.return=o,W=u):tg(s);for(;i!==null;)W=i,Cv(i),i=i.sibling;W=s,Qa=l,lt=h}Zm(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,W=i):Zm(t)}}function Zm(t){for(;W!==null;){var e=W;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:lt||Iu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!lt)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:Yt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&Mm(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Mm(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var p=h.memoizedState;if(p!==null){var y=p.dehydrated;y!==null&&ko(y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}lt||e.flags&512&&zh(e)}catch(_){Ce(e,e.return,_)}}if(e===t){W=null;break}if(n=e.sibling,n!==null){n.return=e.return,W=n;break}W=e.return}}function eg(t){for(;W!==null;){var e=W;if(e===t){W=null;break}var n=e.sibling;if(n!==null){n.return=e.return,W=n;break}W=e.return}}function tg(t){for(;W!==null;){var e=W;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Iu(4,e)}catch(u){Ce(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){Ce(e,s,u)}}var i=e.return;try{zh(e)}catch(u){Ce(e,i,u)}break;case 5:var o=e.return;try{zh(e)}catch(u){Ce(e,o,u)}}}catch(u){Ce(e,e.return,u)}if(e===t){W=null;break}var l=e.sibling;if(l!==null){l.return=e.return,W=l;break}W=e.return}}var BI=Math.ceil,Wl=Gn.ReactCurrentDispatcher,nf=Gn.ReactCurrentOwner,Ft=Gn.ReactCurrentBatchConfig,le=0,We=null,Ve=null,Je=0,kt=0,Bs=Cr(0),Ue=0,Fo=null,Jr=0,xu=0,rf=0,go=null,vt=null,sf=0,oi=1/0,Pn=null,Kl=!1,qh=null,gr=null,Ya=!1,ur=null,Gl=0,yo=0,Hh=null,ml=-1,gl=0;function mt(){return le&6?De():ml!==-1?ml:ml=De()}function yr(t){return t.mode&1?le&2&&Je!==0?Je&-Je:SI.transition!==null?(gl===0&&(gl=f_()),gl):(t=de,t!==0||(t=window.event,t=t===void 0?16:w_(t.type)),t):1}function tn(t,e,n,r){if(50<yo)throw yo=0,Hh=null,Error(F(185));Jo(t,n,r),(!(le&2)||t!==We)&&(t===We&&(!(le&2)&&(xu|=n),Ue===4&&rr(t,Je)),xt(t,r),n===1&&le===0&&!(e.mode&1)&&(oi=De()+500,wu&&Pr()))}function xt(t,e){var n=t.callbackNode;ST(t,e);var r=Nl(t,t===We?Je:0);if(r===0)n!==null&&cm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&cm(n),e===1)t.tag===0?xI(ng.bind(null,t)):F_(ng.bind(null,t)),wI(function(){!(le&6)&&Pr()}),n=null;else{switch(p_(r)){case 1:n=Pd;break;case 4:n=h_;break;case 16:n=Pl;break;case 536870912:n=d_;break;default:n=Pl}n=Mv(n,Pv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Pv(t,e){if(ml=-1,gl=0,le&6)throw Error(F(327));var n=t.callbackNode;if(Qs()&&t.callbackNode!==n)return null;var r=Nl(t,t===We?Je:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Ql(t,r);else{e=r;var s=le;le|=2;var i=Dv();(We!==t||Je!==e)&&(Pn=null,oi=De()+500,Wr(t,e));do try{HI();break}catch(l){Nv(t,l)}while(!0);$d(),Wl.current=i,le=s,Ve!==null?e=0:(We=null,Je=0,e=Ue)}if(e!==0){if(e===2&&(s=_h(t),s!==0&&(r=s,e=Wh(t,s))),e===1)throw n=Fo,Wr(t,0),rr(t,r),xt(t,De()),n;if(e===6)rr(t,r);else{if(s=t.current.alternate,!(r&30)&&!$I(s)&&(e=Ql(t,r),e===2&&(i=_h(t),i!==0&&(r=i,e=Wh(t,i))),e===1))throw n=Fo,Wr(t,0),rr(t,r),xt(t,De()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(F(345));case 2:Ur(t,vt,Pn);break;case 3:if(rr(t,r),(r&130023424)===r&&(e=sf+500-De(),10<e)){if(Nl(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){mt(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Ah(Ur.bind(null,t,vt,Pn),e);break}Ur(t,vt,Pn);break;case 4:if(rr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-en(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=De()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*BI(r/1960))-r,10<r){t.timeoutHandle=Ah(Ur.bind(null,t,vt,Pn),r);break}Ur(t,vt,Pn);break;case 5:Ur(t,vt,Pn);break;default:throw Error(F(329))}}}return xt(t,De()),t.callbackNode===n?Pv.bind(null,t):null}function Wh(t,e){var n=go;return t.current.memoizedState.isDehydrated&&(Wr(t,e).flags|=256),t=Ql(t,e),t!==2&&(e=vt,vt=n,e!==null&&Kh(e)),t}function Kh(t){vt===null?vt=t:vt.push.apply(vt,t)}function $I(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!nn(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function rr(t,e){for(e&=~rf,e&=~xu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-en(e),r=1<<n;t[n]=-1,e&=~r}}function ng(t){if(le&6)throw Error(F(327));Qs();var e=Nl(t,0);if(!(e&1))return xt(t,De()),null;var n=Ql(t,e);if(t.tag!==0&&n===2){var r=_h(t);r!==0&&(e=r,n=Wh(t,r))}if(n===1)throw n=Fo,Wr(t,0),rr(t,e),xt(t,De()),n;if(n===6)throw Error(F(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ur(t,vt,Pn),xt(t,De()),null}function of(t,e){var n=le;le|=1;try{return t(e)}finally{le=n,le===0&&(oi=De()+500,wu&&Pr())}}function Zr(t){ur!==null&&ur.tag===0&&!(le&6)&&Qs();var e=le;le|=1;var n=Ft.transition,r=de;try{if(Ft.transition=null,de=1,t)return t()}finally{de=r,Ft.transition=n,le=e,!(le&6)&&Pr()}}function af(){kt=Bs.current,Te(Bs)}function Wr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,vI(n)),Ve!==null)for(n=Ve.return;n!==null;){var r=n;switch(Ud(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ll();break;case 3:si(),Te(Tt),Te(ct),Qd();break;case 5:Gd(r);break;case 4:si();break;case 13:Te(xe);break;case 19:Te(xe);break;case 10:qd(r.type._context);break;case 22:case 23:af()}n=n.return}if(We=t,Ve=t=_r(t.current,null),Je=kt=e,Ue=0,Fo=null,rf=xu=Jr=0,vt=go=null,$r!==null){for(e=0;e<$r.length;e++)if(n=$r[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}$r=null}return t}function Nv(t,e){do{var n=Ve;try{if($d(),dl.current=Hl,ql){for(var r=Se.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}ql=!1}if(Xr=0,He=Fe=Se=null,po=!1,Lo=0,nf.current=null,n===null||n.return===null){Ue=1,Fo=e,Ve=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=Je,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,p=l,y=p.tag;if(!(p.mode&1)&&(y===0||y===11||y===15)){var _=p.alternate;_?(p.updateQueue=_.updateQueue,p.memoizedState=_.memoizedState,p.lanes=_.lanes):(p.updateQueue=null,p.memoizedState=null)}var R=$m(o);if(R!==null){R.flags&=-257,qm(R,o,l,i,e),R.mode&1&&Bm(i,h,e),e=R,u=h;var C=e.updateQueue;if(C===null){var V=new Set;V.add(u),e.updateQueue=V}else C.add(u);break e}else{if(!(e&1)){Bm(i,h,e),lf();break e}u=Error(F(426))}}else if(Ie&&l.mode&1){var L=$m(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),qm(L,o,l,i,e),zd(ii(u,l));break e}}i=u=ii(u,l),Ue!==4&&(Ue=2),go===null?go=[i]:go.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var x=pv(i,u,e);Lm(i,x);break e;case 1:l=u;var E=i.type,S=i.stateNode;if(!(i.flags&128)&&(typeof E.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(gr===null||!gr.has(S)))){i.flags|=65536,e&=-e,i.lanes|=e;var O=mv(i,l,e);Lm(i,O);break e}}i=i.return}while(i!==null)}Ov(n)}catch(B){e=B,Ve===n&&n!==null&&(Ve=n=n.return);continue}break}while(!0)}function Dv(){var t=Wl.current;return Wl.current=Hl,t===null?Hl:t}function lf(){(Ue===0||Ue===3||Ue===2)&&(Ue=4),We===null||!(Jr&268435455)&&!(xu&268435455)||rr(We,Je)}function Ql(t,e){var n=le;le|=2;var r=Dv();(We!==t||Je!==e)&&(Pn=null,Wr(t,e));do try{qI();break}catch(s){Nv(t,s)}while(!0);if($d(),le=n,Wl.current=r,Ve!==null)throw Error(F(261));return We=null,Je=0,Ue}function qI(){for(;Ve!==null;)bv(Ve)}function HI(){for(;Ve!==null&&!gT();)bv(Ve)}function bv(t){var e=Lv(t.alternate,t,kt);t.memoizedProps=t.pendingProps,e===null?Ov(t):Ve=e,nf.current=null}function Ov(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=jI(n,e),n!==null){n.flags&=32767,Ve=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ue=6,Ve=null;return}}else if(n=MI(n,e,kt),n!==null){Ve=n;return}if(e=e.sibling,e!==null){Ve=e;return}Ve=e=t}while(e!==null);Ue===0&&(Ue=5)}function Ur(t,e,n){var r=de,s=Ft.transition;try{Ft.transition=null,de=1,WI(t,e,n,r)}finally{Ft.transition=s,de=r}return null}function WI(t,e,n,r){do Qs();while(ur!==null);if(le&6)throw Error(F(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(F(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(AT(t,i),t===We&&(Ve=We=null,Je=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ya||(Ya=!0,Mv(Pl,function(){return Qs(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ft.transition,Ft.transition=null;var o=de;de=1;var l=le;le|=4,nf.current=null,UI(t,n),kv(n,t),dI(xh),Dl=!!Ih,xh=Ih=null,t.current=n,zI(n),yT(),le=l,de=o,Ft.transition=i}else t.current=n;if(Ya&&(Ya=!1,ur=t,Gl=s),i=t.pendingLanes,i===0&&(gr=null),wT(n.stateNode),xt(t,De()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Kl)throw Kl=!1,t=qh,qh=null,t;return Gl&1&&t.tag!==0&&Qs(),i=t.pendingLanes,i&1?t===Hh?yo++:(yo=0,Hh=t):yo=0,Pr(),null}function Qs(){if(ur!==null){var t=p_(Gl),e=Ft.transition,n=de;try{if(Ft.transition=null,de=16>t?16:t,ur===null)var r=!1;else{if(t=ur,ur=null,Gl=0,le&6)throw Error(F(331));var s=le;for(le|=4,W=t.current;W!==null;){var i=W,o=i.child;if(W.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(W=h;W!==null;){var p=W;switch(p.tag){case 0:case 11:case 15:mo(8,p,i)}var y=p.child;if(y!==null)y.return=p,W=y;else for(;W!==null;){p=W;var _=p.sibling,R=p.return;if(Sv(p),p===h){W=null;break}if(_!==null){_.return=R,W=_;break}W=R}}}var C=i.alternate;if(C!==null){var V=C.child;if(V!==null){C.child=null;do{var L=V.sibling;V.sibling=null,V=L}while(V!==null)}}W=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,W=o;else e:for(;W!==null;){if(i=W,i.flags&2048)switch(i.tag){case 0:case 11:case 15:mo(9,i,i.return)}var x=i.sibling;if(x!==null){x.return=i.return,W=x;break e}W=i.return}}var E=t.current;for(W=E;W!==null;){o=W;var S=o.child;if(o.subtreeFlags&2064&&S!==null)S.return=o,W=S;else e:for(o=E;W!==null;){if(l=W,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Iu(9,l)}}catch(B){Ce(l,l.return,B)}if(l===o){W=null;break e}var O=l.sibling;if(O!==null){O.return=l.return,W=O;break e}W=l.return}}if(le=s,Pr(),fn&&typeof fn.onPostCommitFiberRoot=="function")try{fn.onPostCommitFiberRoot(mu,t)}catch{}r=!0}return r}finally{de=n,Ft.transition=e}}return!1}function rg(t,e,n){e=ii(n,e),e=pv(t,e,1),t=mr(t,e,1),e=mt(),t!==null&&(Jo(t,1,e),xt(t,e))}function Ce(t,e,n){if(t.tag===3)rg(t,t,n);else for(;e!==null;){if(e.tag===3){rg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(gr===null||!gr.has(r))){t=ii(n,t),t=mv(e,t,1),e=mr(e,t,1),t=mt(),e!==null&&(Jo(e,1,t),xt(e,t));break}}e=e.return}}function KI(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=mt(),t.pingedLanes|=t.suspendedLanes&n,We===t&&(Je&n)===n&&(Ue===4||Ue===3&&(Je&130023424)===Je&&500>De()-sf?Wr(t,0):rf|=n),xt(t,e)}function Vv(t,e){e===0&&(t.mode&1?(e=Ua,Ua<<=1,!(Ua&130023424)&&(Ua=4194304)):e=1);var n=mt();t=Bn(t,e),t!==null&&(Jo(t,e,n),xt(t,n))}function GI(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Vv(t,n)}function QI(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(e),Vv(t,n)}var Lv;Lv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Tt.current)Et=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Et=!1,LI(t,e,n);Et=!!(t.flags&131072)}else Et=!1,Ie&&e.flags&1048576&&U_(e,Fl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;pl(t,e),t=e.pendingProps;var s=ti(e,ct.current);Gs(e,n),s=Xd(null,e,r,t,s,n);var i=Jd();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,It(r)?(i=!0,Ml(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Wd(e),s.updater=Tu,e.stateNode=s,s._reactInternals=e,bh(e,r,t,n),e=Lh(null,e,r,!0,i,n)):(e.tag=0,Ie&&i&&Fd(e),pt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(pl(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=XI(r),t=Yt(r,t),s){case 0:e=Vh(null,e,r,t,n);break e;case 1:e=Km(null,e,r,t,n);break e;case 11:e=Hm(null,e,r,t,n);break e;case 14:e=Wm(null,e,r,Yt(r.type,t),n);break e}throw Error(F(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Yt(r,s),Vh(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Yt(r,s),Km(t,e,r,s,n);case 3:e:{if(vv(e),t===null)throw Error(F(387));r=e.pendingProps,i=e.memoizedState,s=i.element,W_(t,e),Bl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=ii(Error(F(423)),e),e=Gm(t,e,r,n,s);break e}else if(r!==s){s=ii(Error(F(424)),e),e=Gm(t,e,r,n,s);break e}else for(Ct=pr(e.stateNode.containerInfo.firstChild),Nt=e,Ie=!0,Jt=null,n=q_(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ni(),r===s){e=$n(t,e,n);break e}pt(t,e,r,n)}e=e.child}return e;case 5:return K_(e),t===null&&Ph(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Sh(r,s)?o=null:i!==null&&Sh(r,i)&&(e.flags|=32),_v(t,e),pt(t,e,o,n),e.child;case 6:return t===null&&Ph(e),null;case 13:return wv(t,e,n);case 4:return Kd(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=ri(e,null,r,n):pt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Yt(r,s),Hm(t,e,r,s,n);case 7:return pt(t,e,e.pendingProps,n),e.child;case 8:return pt(t,e,e.pendingProps.children,n),e.child;case 12:return pt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,ye(Ul,r._currentValue),r._currentValue=o,i!==null)if(nn(i.value,o)){if(i.children===s.children&&!Tt.current){e=$n(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Mn(-1,n&-n),u.tag=2;var h=i.updateQueue;if(h!==null){h=h.shared;var p=h.pending;p===null?u.next=u:(u.next=p.next,p.next=u),h.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Nh(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(F(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Nh(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}pt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Gs(e,n),s=zt(s),r=r(s),e.flags|=1,pt(t,e,r,n),e.child;case 14:return r=e.type,s=Yt(r,e.pendingProps),s=Yt(r.type,s),Wm(t,e,r,s,n);case 15:return gv(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Yt(r,s),pl(t,e),e.tag=1,It(r)?(t=!0,Ml(e)):t=!1,Gs(e,n),fv(e,r,s),bh(e,r,s,n),Lh(null,e,r,!0,t,n);case 19:return Ev(t,e,n);case 22:return yv(t,e,n)}throw Error(F(156,e.tag))};function Mv(t,e){return c_(t,e)}function YI(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(t,e,n,r){return new YI(t,e,n,r)}function uf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function XI(t){if(typeof t=="function")return uf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Rd)return 11;if(t===kd)return 14}return 2}function _r(t,e){var n=t.alternate;return n===null?(n=jt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function yl(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")uf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Ds:return Kr(n.children,s,i,e);case Ad:o=8,s|=8;break;case rh:return t=jt(12,n,e,s|2),t.elementType=rh,t.lanes=i,t;case sh:return t=jt(13,n,e,s),t.elementType=sh,t.lanes=i,t;case ih:return t=jt(19,n,e,s),t.elementType=ih,t.lanes=i,t;case Ky:return Su(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Hy:o=10;break e;case Wy:o=9;break e;case Rd:o=11;break e;case kd:o=14;break e;case er:o=16,r=null;break e}throw Error(F(130,t==null?t:typeof t,""))}return e=jt(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Kr(t,e,n,r){return t=jt(7,t,r,e),t.lanes=n,t}function Su(t,e,n,r){return t=jt(22,t,r,e),t.elementType=Ky,t.lanes=n,t.stateNode={isHidden:!1},t}function Vc(t,e,n){return t=jt(6,t,null,e),t.lanes=n,t}function Lc(t,e,n){return e=jt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function JI(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gc(0),this.expirationTimes=gc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gc(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function cf(t,e,n,r,s,i,o,l,u){return t=new JI(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=jt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Wd(i),t}function ZI(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ns,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function jv(t){if(!t)return Ir;t=t._reactInternals;e:{if(as(t)!==t||t.tag!==1)throw Error(F(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(It(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(F(171))}if(t.tag===1){var n=t.type;if(It(n))return j_(t,n,e)}return e}function Fv(t,e,n,r,s,i,o,l,u){return t=cf(n,r,!0,t,s,i,o,l,u),t.context=jv(null),n=t.current,r=mt(),s=yr(n),i=Mn(r,s),i.callback=e??null,mr(n,i,s),t.current.lanes=s,Jo(t,s,r),xt(t,r),t}function Au(t,e,n,r){var s=e.current,i=mt(),o=yr(s);return n=jv(n),e.context===null?e.context=n:e.pendingContext=n,e=Mn(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=mr(s,e,o),t!==null&&(tn(t,s,o,i),hl(t,s,o)),o}function Yl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function sg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function hf(t,e){sg(t,e),(t=t.alternate)&&sg(t,e)}function ex(){return null}var Uv=typeof reportError=="function"?reportError:function(t){console.error(t)};function df(t){this._internalRoot=t}Ru.prototype.render=df.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(F(409));Au(t,e,null,null)};Ru.prototype.unmount=df.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Zr(function(){Au(null,t,null,null)}),e[zn]=null}};function Ru(t){this._internalRoot=t}Ru.prototype.unstable_scheduleHydration=function(t){if(t){var e=y_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<nr.length&&e!==0&&e<nr[n].priority;n++);nr.splice(n,0,t),n===0&&v_(t)}};function ff(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ku(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function ig(){}function tx(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var h=Yl(o);i.call(h)}}var o=Fv(e,r,t,0,null,!1,!1,"",ig);return t._reactRootContainer=o,t[zn]=o.current,No(t.nodeType===8?t.parentNode:t),Zr(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var h=Yl(u);l.call(h)}}var u=cf(t,0,!1,null,null,!1,!1,"",ig);return t._reactRootContainer=u,t[zn]=u.current,No(t.nodeType===8?t.parentNode:t),Zr(function(){Au(e,u,n,r)}),u}function Cu(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=Yl(o);l.call(u)}}Au(e,o,t,s)}else o=tx(n,e,t,s,r);return Yl(o)}m_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=eo(e.pendingLanes);n!==0&&(Nd(e,n|1),xt(e,De()),!(le&6)&&(oi=De()+500,Pr()))}break;case 13:Zr(function(){var r=Bn(t,1);if(r!==null){var s=mt();tn(r,t,1,s)}}),hf(t,1)}};Dd=function(t){if(t.tag===13){var e=Bn(t,134217728);if(e!==null){var n=mt();tn(e,t,134217728,n)}hf(t,134217728)}};g_=function(t){if(t.tag===13){var e=yr(t),n=Bn(t,e);if(n!==null){var r=mt();tn(n,t,e,r)}hf(t,e)}};y_=function(){return de};__=function(t,e){var n=de;try{return de=t,e()}finally{de=n}};mh=function(t,e,n){switch(e){case"input":if(lh(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=vu(r);if(!s)throw Error(F(90));Qy(r),lh(r,s)}}}break;case"textarea":Xy(t,n);break;case"select":e=n.value,e!=null&&qs(t,!!n.multiple,e,!1)}};s_=of;i_=Zr;var nx={usingClientEntryPoint:!1,Events:[ea,Ls,vu,n_,r_,of]},Wi={findFiberByHostInstance:Br,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},rx={bundleType:Wi.bundleType,version:Wi.version,rendererPackageName:Wi.rendererPackageName,rendererConfig:Wi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Gn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=l_(t),t===null?null:t.stateNode},findFiberByHostInstance:Wi.findFiberByHostInstance||ex,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Xa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xa.isDisabled&&Xa.supportsFiber)try{mu=Xa.inject(rx),fn=Xa}catch{}}bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nx;bt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ff(e))throw Error(F(200));return ZI(t,e,null,n)};bt.createRoot=function(t,e){if(!ff(t))throw Error(F(299));var n=!1,r="",s=Uv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=cf(t,1,!1,null,null,n,!1,r,s),t[zn]=e.current,No(t.nodeType===8?t.parentNode:t),new df(e)};bt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(F(188)):(t=Object.keys(t).join(","),Error(F(268,t)));return t=l_(e),t=t===null?null:t.stateNode,t};bt.flushSync=function(t){return Zr(t)};bt.hydrate=function(t,e,n){if(!ku(e))throw Error(F(200));return Cu(null,t,e,!0,n)};bt.hydrateRoot=function(t,e,n){if(!ff(t))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=Uv;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Fv(e,null,t,1,n??null,s,!1,i,o),t[zn]=e.current,No(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new Ru(e)};bt.render=function(t,e,n){if(!ku(e))throw Error(F(200));return Cu(null,t,e,!1,n)};bt.unmountComponentAtNode=function(t){if(!ku(t))throw Error(F(40));return t._reactRootContainer?(Zr(function(){Cu(null,null,t,!1,function(){t._reactRootContainer=null,t[zn]=null})}),!0):!1};bt.unstable_batchedUpdates=of;bt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!ku(n))throw Error(F(200));if(t==null||t._reactInternals===void 0)throw Error(F(38));return Cu(t,e,n,!1,r)};bt.version="18.3.1-next-f1338f8080-20240426";function zv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zv)}catch(t){console.error(t)}}zv(),zy.exports=bt;var sx=zy.exports,og=sx;th.createRoot=og.createRoot,th.hydrateRoot=og.hydrateRoot;var ag={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bv=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ix=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},$v={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,h=u?t[s+2]:0,p=i>>2,y=(i&3)<<4|l>>4;let _=(l&15)<<2|h>>6,R=h&63;u||(R=64,o||(_=64)),r.push(n[p],n[y],n[_],n[R])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Bv(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ix(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const y=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||h==null||y==null)throw new ox;const _=i<<2|l>>4;if(r.push(_),h!==64){const R=l<<4&240|h>>2;if(r.push(R),y!==64){const C=h<<6&192|y;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ox extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ax=function(t){const e=Bv(t);return $v.encodeByteArray(e,!0)},Xl=function(t){return ax(t).replace(/\./g,"")},qv=function(t){try{return $v.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lx(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ux=()=>lx().__FIREBASE_DEFAULTS__,cx=()=>{if(typeof process>"u"||typeof ag>"u")return;const t=ag.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},hx=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&qv(t[1]);return e&&JSON.parse(e)},Pu=()=>{try{return ux()||cx()||hx()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Hv=t=>{var e,n;return(n=(e=Pu())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Wv=t=>{const e=Hv(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Kv=()=>{var t;return(t=Pu())===null||t===void 0?void 0:t.config},Gv=t=>{var e;return(e=Pu())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dx{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qv(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Xl(JSON.stringify(n)),Xl(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fx(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ht())}function px(){var t;const e=(t=Pu())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function mx(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function gx(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function yx(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _x(){const t=ht();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function vx(){return!px()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function wx(){try{return typeof indexedDB=="object"}catch{return!1}}function Ex(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tx="FirebaseError";class Tn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Tx,Object.setPrototypeOf(this,Tn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,na.prototype.create)}}class na{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Ix(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Tn(s,l,r)}}function Ix(t,e){return t.replace(xx,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const xx=/\{\$([^}]+)}/g;function Sx(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Jl(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(lg(i)&&lg(o)){if(!Jl(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function lg(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function no(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ro(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Ax(t,e){const n=new Rx(t,e);return n.subscribe.bind(n)}class Rx{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");kx(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Mc),s.error===void 0&&(s.error=Mc),s.complete===void 0&&(s.complete=Mc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function kx(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Mc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(t){return t&&t._delegate?t._delegate:t}class xr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cx{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new dx;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Nx(e))try{this.getOrInitializeService({instanceIdentifier:zr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=zr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=zr){return this.instances.has(e)}getOptions(e=zr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Px(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=zr){return this.component?this.component.multipleInstances?e:zr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Px(t){return t===zr?void 0:t}function Nx(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dx{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Cx(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ie||(ie={}));const bx={debug:ie.DEBUG,verbose:ie.VERBOSE,info:ie.INFO,warn:ie.WARN,error:ie.ERROR,silent:ie.SILENT},Ox=ie.INFO,Vx={[ie.DEBUG]:"log",[ie.VERBOSE]:"log",[ie.INFO]:"info",[ie.WARN]:"warn",[ie.ERROR]:"error"},Lx=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Vx[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class pf{constructor(e){this.name=e,this._logLevel=Ox,this._logHandler=Lx,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ie))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?bx[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ie.DEBUG,...e),this._logHandler(this,ie.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ie.VERBOSE,...e),this._logHandler(this,ie.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ie.INFO,...e),this._logHandler(this,ie.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ie.WARN,...e),this._logHandler(this,ie.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ie.ERROR,...e),this._logHandler(this,ie.ERROR,...e)}}const Mx=(t,e)=>e.some(n=>t instanceof n);let ug,cg;function jx(){return ug||(ug=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fx(){return cg||(cg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yv=new WeakMap,Gh=new WeakMap,Xv=new WeakMap,jc=new WeakMap,mf=new WeakMap;function Ux(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(vr(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Yv.set(n,t)}).catch(()=>{}),mf.set(e,t),e}function zx(t){if(Gh.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Gh.set(t,e)}let Qh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Gh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Xv.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return vr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Bx(t){Qh=t(Qh)}function $x(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Fc(this),e,...n);return Xv.set(r,e.sort?e.sort():[e]),vr(r)}:Fx().includes(t)?function(...e){return t.apply(Fc(this),e),vr(Yv.get(this))}:function(...e){return vr(t.apply(Fc(this),e))}}function qx(t){return typeof t=="function"?$x(t):(t instanceof IDBTransaction&&zx(t),Mx(t,jx())?new Proxy(t,Qh):t)}function vr(t){if(t instanceof IDBRequest)return Ux(t);if(jc.has(t))return jc.get(t);const e=qx(t);return e!==t&&(jc.set(t,e),mf.set(e,t)),e}const Fc=t=>mf.get(t);function Hx(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=vr(o);return r&&o.addEventListener("upgradeneeded",u=>{r(vr(o.result),u.oldVersion,u.newVersion,vr(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const Wx=["get","getKey","getAll","getAllKeys","count"],Kx=["put","add","delete","clear"],Uc=new Map;function hg(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Uc.get(e))return Uc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Kx.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Wx.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),s&&u.done]))[0]};return Uc.set(e,i),i}Bx(t=>({...t,get:(e,n,r)=>hg(e,n)||t.get(e,n,r),has:(e,n)=>!!hg(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gx{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Qx(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Qx(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Yh="@firebase/app",dg="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn=new pf("@firebase/app"),Yx="@firebase/app-compat",Xx="@firebase/analytics-compat",Jx="@firebase/analytics",Zx="@firebase/app-check-compat",eS="@firebase/app-check",tS="@firebase/auth",nS="@firebase/auth-compat",rS="@firebase/database",sS="@firebase/data-connect",iS="@firebase/database-compat",oS="@firebase/functions",aS="@firebase/functions-compat",lS="@firebase/installations",uS="@firebase/installations-compat",cS="@firebase/messaging",hS="@firebase/messaging-compat",dS="@firebase/performance",fS="@firebase/performance-compat",pS="@firebase/remote-config",mS="@firebase/remote-config-compat",gS="@firebase/storage",yS="@firebase/storage-compat",_S="@firebase/firestore",vS="@firebase/vertexai-preview",wS="@firebase/firestore-compat",ES="firebase",TS="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh="[DEFAULT]",IS={[Yh]:"fire-core",[Yx]:"fire-core-compat",[Jx]:"fire-analytics",[Xx]:"fire-analytics-compat",[eS]:"fire-app-check",[Zx]:"fire-app-check-compat",[tS]:"fire-auth",[nS]:"fire-auth-compat",[rS]:"fire-rtdb",[sS]:"fire-data-connect",[iS]:"fire-rtdb-compat",[oS]:"fire-fn",[aS]:"fire-fn-compat",[lS]:"fire-iid",[uS]:"fire-iid-compat",[cS]:"fire-fcm",[hS]:"fire-fcm-compat",[dS]:"fire-perf",[fS]:"fire-perf-compat",[pS]:"fire-rc",[mS]:"fire-rc-compat",[gS]:"fire-gcs",[yS]:"fire-gcs-compat",[_S]:"fire-fst",[wS]:"fire-fst-compat",[vS]:"fire-vertex","fire-js":"fire-js",[ES]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl=new Map,xS=new Map,Jh=new Map;function fg(t,e){try{t.container.addComponent(e)}catch(n){qn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function es(t){const e=t.name;if(Jh.has(e))return qn.debug(`There were multiple attempts to register component ${e}.`),!1;Jh.set(e,t);for(const n of Zl.values())fg(n,t);for(const n of xS.values())fg(n,t);return!0}function Nu(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function dn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},wr=new na("app","Firebase",SS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AS{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new xr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw wr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls=TS;function Jv(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Xh,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw wr.create("bad-app-name",{appName:String(s)});if(n||(n=Kv()),!n)throw wr.create("no-options");const i=Zl.get(s);if(i){if(Jl(n,i.options)&&Jl(r,i.config))return i;throw wr.create("duplicate-app",{appName:s})}const o=new Dx(s);for(const u of Jh.values())o.addComponent(u);const l=new AS(n,r,o);return Zl.set(s,l),l}function gf(t=Xh){const e=Zl.get(t);if(!e&&t===Xh&&Kv())return Jv();if(!e)throw wr.create("no-app",{appName:t});return e}function mn(t,e,n){var r;let s=(r=IS[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),qn.warn(l.join(" "));return}es(new xr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RS="firebase-heartbeat-database",kS=1,Uo="firebase-heartbeat-store";let zc=null;function Zv(){return zc||(zc=Hx(RS,kS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Uo)}catch(n){console.warn(n)}}}}).catch(t=>{throw wr.create("idb-open",{originalErrorMessage:t.message})})),zc}async function CS(t){try{const n=(await Zv()).transaction(Uo),r=await n.objectStore(Uo).get(e0(t));return await n.done,r}catch(e){if(e instanceof Tn)qn.warn(e.message);else{const n=wr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});qn.warn(n.message)}}}async function pg(t,e){try{const r=(await Zv()).transaction(Uo,"readwrite");await r.objectStore(Uo).put(e,e0(t)),await r.done}catch(n){if(n instanceof Tn)qn.warn(n.message);else{const r=wr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});qn.warn(r.message)}}}function e0(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PS=1024,NS=30*24*60*60*1e3;class DS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new OS(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=mg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=NS}),this._storage.overwrite(this._heartbeatsCache))}catch(r){qn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=mg(),{heartbeatsToSend:r,unsentEntries:s}=bS(this._heartbeatsCache.heartbeats),i=Xl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return qn.warn(n),""}}}function mg(){return new Date().toISOString().substring(0,10)}function bS(t,e=PS){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),gg(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),gg(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class OS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wx()?Ex().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await CS(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return pg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return pg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function gg(t){return Xl(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VS(t){es(new xr("platform-logger",e=>new Gx(e),"PRIVATE")),es(new xr("heartbeat",e=>new DS(e),"PRIVATE")),mn(Yh,dg,t),mn(Yh,dg,"esm2017"),mn("fire-js","")}VS("");var LS="firebase",MS="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mn(LS,MS,"app");var yg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Gr,t0;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function w(){}w.prototype=g.prototype,v.D=g.prototype,v.prototype=new w,v.prototype.constructor=v,v.C=function(T,A,P){for(var I=Array(arguments.length-2),Pe=2;Pe<arguments.length;Pe++)I[Pe-2]=arguments[Pe];return g.prototype[A].apply(T,I)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,g,w){w||(w=0);var T=Array(16);if(typeof g=="string")for(var A=0;16>A;++A)T[A]=g.charCodeAt(w++)|g.charCodeAt(w++)<<8|g.charCodeAt(w++)<<16|g.charCodeAt(w++)<<24;else for(A=0;16>A;++A)T[A]=g[w++]|g[w++]<<8|g[w++]<<16|g[w++]<<24;g=v.g[0],w=v.g[1],A=v.g[2];var P=v.g[3],I=g+(P^w&(A^P))+T[0]+3614090360&4294967295;g=w+(I<<7&4294967295|I>>>25),I=P+(A^g&(w^A))+T[1]+3905402710&4294967295,P=g+(I<<12&4294967295|I>>>20),I=A+(w^P&(g^w))+T[2]+606105819&4294967295,A=P+(I<<17&4294967295|I>>>15),I=w+(g^A&(P^g))+T[3]+3250441966&4294967295,w=A+(I<<22&4294967295|I>>>10),I=g+(P^w&(A^P))+T[4]+4118548399&4294967295,g=w+(I<<7&4294967295|I>>>25),I=P+(A^g&(w^A))+T[5]+1200080426&4294967295,P=g+(I<<12&4294967295|I>>>20),I=A+(w^P&(g^w))+T[6]+2821735955&4294967295,A=P+(I<<17&4294967295|I>>>15),I=w+(g^A&(P^g))+T[7]+4249261313&4294967295,w=A+(I<<22&4294967295|I>>>10),I=g+(P^w&(A^P))+T[8]+1770035416&4294967295,g=w+(I<<7&4294967295|I>>>25),I=P+(A^g&(w^A))+T[9]+2336552879&4294967295,P=g+(I<<12&4294967295|I>>>20),I=A+(w^P&(g^w))+T[10]+4294925233&4294967295,A=P+(I<<17&4294967295|I>>>15),I=w+(g^A&(P^g))+T[11]+2304563134&4294967295,w=A+(I<<22&4294967295|I>>>10),I=g+(P^w&(A^P))+T[12]+1804603682&4294967295,g=w+(I<<7&4294967295|I>>>25),I=P+(A^g&(w^A))+T[13]+4254626195&4294967295,P=g+(I<<12&4294967295|I>>>20),I=A+(w^P&(g^w))+T[14]+2792965006&4294967295,A=P+(I<<17&4294967295|I>>>15),I=w+(g^A&(P^g))+T[15]+1236535329&4294967295,w=A+(I<<22&4294967295|I>>>10),I=g+(A^P&(w^A))+T[1]+4129170786&4294967295,g=w+(I<<5&4294967295|I>>>27),I=P+(w^A&(g^w))+T[6]+3225465664&4294967295,P=g+(I<<9&4294967295|I>>>23),I=A+(g^w&(P^g))+T[11]+643717713&4294967295,A=P+(I<<14&4294967295|I>>>18),I=w+(P^g&(A^P))+T[0]+3921069994&4294967295,w=A+(I<<20&4294967295|I>>>12),I=g+(A^P&(w^A))+T[5]+3593408605&4294967295,g=w+(I<<5&4294967295|I>>>27),I=P+(w^A&(g^w))+T[10]+38016083&4294967295,P=g+(I<<9&4294967295|I>>>23),I=A+(g^w&(P^g))+T[15]+3634488961&4294967295,A=P+(I<<14&4294967295|I>>>18),I=w+(P^g&(A^P))+T[4]+3889429448&4294967295,w=A+(I<<20&4294967295|I>>>12),I=g+(A^P&(w^A))+T[9]+568446438&4294967295,g=w+(I<<5&4294967295|I>>>27),I=P+(w^A&(g^w))+T[14]+3275163606&4294967295,P=g+(I<<9&4294967295|I>>>23),I=A+(g^w&(P^g))+T[3]+4107603335&4294967295,A=P+(I<<14&4294967295|I>>>18),I=w+(P^g&(A^P))+T[8]+1163531501&4294967295,w=A+(I<<20&4294967295|I>>>12),I=g+(A^P&(w^A))+T[13]+2850285829&4294967295,g=w+(I<<5&4294967295|I>>>27),I=P+(w^A&(g^w))+T[2]+4243563512&4294967295,P=g+(I<<9&4294967295|I>>>23),I=A+(g^w&(P^g))+T[7]+1735328473&4294967295,A=P+(I<<14&4294967295|I>>>18),I=w+(P^g&(A^P))+T[12]+2368359562&4294967295,w=A+(I<<20&4294967295|I>>>12),I=g+(w^A^P)+T[5]+4294588738&4294967295,g=w+(I<<4&4294967295|I>>>28),I=P+(g^w^A)+T[8]+2272392833&4294967295,P=g+(I<<11&4294967295|I>>>21),I=A+(P^g^w)+T[11]+1839030562&4294967295,A=P+(I<<16&4294967295|I>>>16),I=w+(A^P^g)+T[14]+4259657740&4294967295,w=A+(I<<23&4294967295|I>>>9),I=g+(w^A^P)+T[1]+2763975236&4294967295,g=w+(I<<4&4294967295|I>>>28),I=P+(g^w^A)+T[4]+1272893353&4294967295,P=g+(I<<11&4294967295|I>>>21),I=A+(P^g^w)+T[7]+4139469664&4294967295,A=P+(I<<16&4294967295|I>>>16),I=w+(A^P^g)+T[10]+3200236656&4294967295,w=A+(I<<23&4294967295|I>>>9),I=g+(w^A^P)+T[13]+681279174&4294967295,g=w+(I<<4&4294967295|I>>>28),I=P+(g^w^A)+T[0]+3936430074&4294967295,P=g+(I<<11&4294967295|I>>>21),I=A+(P^g^w)+T[3]+3572445317&4294967295,A=P+(I<<16&4294967295|I>>>16),I=w+(A^P^g)+T[6]+76029189&4294967295,w=A+(I<<23&4294967295|I>>>9),I=g+(w^A^P)+T[9]+3654602809&4294967295,g=w+(I<<4&4294967295|I>>>28),I=P+(g^w^A)+T[12]+3873151461&4294967295,P=g+(I<<11&4294967295|I>>>21),I=A+(P^g^w)+T[15]+530742520&4294967295,A=P+(I<<16&4294967295|I>>>16),I=w+(A^P^g)+T[2]+3299628645&4294967295,w=A+(I<<23&4294967295|I>>>9),I=g+(A^(w|~P))+T[0]+4096336452&4294967295,g=w+(I<<6&4294967295|I>>>26),I=P+(w^(g|~A))+T[7]+1126891415&4294967295,P=g+(I<<10&4294967295|I>>>22),I=A+(g^(P|~w))+T[14]+2878612391&4294967295,A=P+(I<<15&4294967295|I>>>17),I=w+(P^(A|~g))+T[5]+4237533241&4294967295,w=A+(I<<21&4294967295|I>>>11),I=g+(A^(w|~P))+T[12]+1700485571&4294967295,g=w+(I<<6&4294967295|I>>>26),I=P+(w^(g|~A))+T[3]+2399980690&4294967295,P=g+(I<<10&4294967295|I>>>22),I=A+(g^(P|~w))+T[10]+4293915773&4294967295,A=P+(I<<15&4294967295|I>>>17),I=w+(P^(A|~g))+T[1]+2240044497&4294967295,w=A+(I<<21&4294967295|I>>>11),I=g+(A^(w|~P))+T[8]+1873313359&4294967295,g=w+(I<<6&4294967295|I>>>26),I=P+(w^(g|~A))+T[15]+4264355552&4294967295,P=g+(I<<10&4294967295|I>>>22),I=A+(g^(P|~w))+T[6]+2734768916&4294967295,A=P+(I<<15&4294967295|I>>>17),I=w+(P^(A|~g))+T[13]+1309151649&4294967295,w=A+(I<<21&4294967295|I>>>11),I=g+(A^(w|~P))+T[4]+4149444226&4294967295,g=w+(I<<6&4294967295|I>>>26),I=P+(w^(g|~A))+T[11]+3174756917&4294967295,P=g+(I<<10&4294967295|I>>>22),I=A+(g^(P|~w))+T[2]+718787259&4294967295,A=P+(I<<15&4294967295|I>>>17),I=w+(P^(A|~g))+T[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(A+(I<<21&4294967295|I>>>11))&4294967295,v.g[2]=v.g[2]+A&4294967295,v.g[3]=v.g[3]+P&4294967295}r.prototype.u=function(v,g){g===void 0&&(g=v.length);for(var w=g-this.blockSize,T=this.B,A=this.h,P=0;P<g;){if(A==0)for(;P<=w;)s(this,v,P),P+=this.blockSize;if(typeof v=="string"){for(;P<g;)if(T[A++]=v.charCodeAt(P++),A==this.blockSize){s(this,T),A=0;break}}else for(;P<g;)if(T[A++]=v[P++],A==this.blockSize){s(this,T),A=0;break}}this.h=A,this.o+=g},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;var w=8*this.o;for(g=v.length-8;g<v.length;++g)v[g]=w&255,w/=256;for(this.u(v),v=Array(16),g=w=0;4>g;++g)for(var T=0;32>T;T+=8)v[w++]=this.g[g]>>>T&255;return v};function i(v,g){var w=l;return Object.prototype.hasOwnProperty.call(w,v)?w[v]:w[v]=g(v)}function o(v,g){this.h=g;for(var w=[],T=!0,A=v.length-1;0<=A;A--){var P=v[A]|0;T&&P==g||(w[A]=P,T=!1)}this.g=w}var l={};function u(v){return-128<=v&&128>v?i(v,function(g){return new o([g|0],0>g?-1:0)}):new o([v|0],0>v?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return y;if(0>v)return L(h(-v));for(var g=[],w=1,T=0;v>=w;T++)g[T]=v/w|0,w*=4294967296;return new o(g,0)}function p(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return L(p(v.substring(1),g));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(g,8)),T=y,A=0;A<v.length;A+=8){var P=Math.min(8,v.length-A),I=parseInt(v.substring(A,A+P),g);8>P?(P=h(Math.pow(g,P)),T=T.j(P).add(h(I))):(T=T.j(w),T=T.add(h(I)))}return T}var y=u(0),_=u(1),R=u(16777216);t=o.prototype,t.m=function(){if(V(this))return-L(this).m();for(var v=0,g=1,w=0;w<this.g.length;w++){var T=this.i(w);v+=(0<=T?T:4294967296+T)*g,g*=4294967296}return v},t.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(C(this))return"0";if(V(this))return"-"+L(this).toString(v);for(var g=h(Math.pow(v,6)),w=this,T="";;){var A=O(w,g).g;w=x(w,A.j(g));var P=((0<w.g.length?w.g[0]:w.h)>>>0).toString(v);if(w=A,C(w))return P+T;for(;6>P.length;)P="0"+P;T=P+T}},t.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function C(v){if(v.h!=0)return!1;for(var g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function V(v){return v.h==-1}t.l=function(v){return v=x(this,v),V(v)?-1:C(v)?0:1};function L(v){for(var g=v.g.length,w=[],T=0;T<g;T++)w[T]=~v.g[T];return new o(w,~v.h).add(_)}t.abs=function(){return V(this)?L(this):this},t.add=function(v){for(var g=Math.max(this.g.length,v.g.length),w=[],T=0,A=0;A<=g;A++){var P=T+(this.i(A)&65535)+(v.i(A)&65535),I=(P>>>16)+(this.i(A)>>>16)+(v.i(A)>>>16);T=I>>>16,P&=65535,I&=65535,w[A]=I<<16|P}return new o(w,w[w.length-1]&-2147483648?-1:0)};function x(v,g){return v.add(L(g))}t.j=function(v){if(C(this)||C(v))return y;if(V(this))return V(v)?L(this).j(L(v)):L(L(this).j(v));if(V(v))return L(this.j(L(v)));if(0>this.l(R)&&0>v.l(R))return h(this.m()*v.m());for(var g=this.g.length+v.g.length,w=[],T=0;T<2*g;T++)w[T]=0;for(T=0;T<this.g.length;T++)for(var A=0;A<v.g.length;A++){var P=this.i(T)>>>16,I=this.i(T)&65535,Pe=v.i(A)>>>16,xn=v.i(A)&65535;w[2*T+2*A]+=I*xn,E(w,2*T+2*A),w[2*T+2*A+1]+=P*xn,E(w,2*T+2*A+1),w[2*T+2*A+1]+=I*Pe,E(w,2*T+2*A+1),w[2*T+2*A+2]+=P*Pe,E(w,2*T+2*A+2)}for(T=0;T<g;T++)w[T]=w[2*T+1]<<16|w[2*T];for(T=g;T<2*g;T++)w[T]=0;return new o(w,0)};function E(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function S(v,g){this.g=v,this.h=g}function O(v,g){if(C(g))throw Error("division by zero");if(C(v))return new S(y,y);if(V(v))return g=O(L(v),g),new S(L(g.g),L(g.h));if(V(g))return g=O(v,L(g)),new S(L(g.g),g.h);if(30<v.g.length){if(V(v)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var w=_,T=g;0>=T.l(v);)w=B(w),T=B(T);var A=z(w,1),P=z(T,1);for(T=z(T,2),w=z(w,2);!C(T);){var I=P.add(T);0>=I.l(v)&&(A=A.add(w),P=I),T=z(T,1),w=z(w,1)}return g=x(v,A.j(g)),new S(A,g)}for(A=y;0<=v.l(g);){for(w=Math.max(1,Math.floor(v.m()/g.m())),T=Math.ceil(Math.log(w)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),P=h(w),I=P.j(g);V(I)||0<I.l(v);)w-=T,P=h(w),I=P.j(g);C(P)&&(P=_),A=A.add(P),v=x(v,I)}return new S(A,v)}t.A=function(v){return O(this,v).h},t.and=function(v){for(var g=Math.max(this.g.length,v.g.length),w=[],T=0;T<g;T++)w[T]=this.i(T)&v.i(T);return new o(w,this.h&v.h)},t.or=function(v){for(var g=Math.max(this.g.length,v.g.length),w=[],T=0;T<g;T++)w[T]=this.i(T)|v.i(T);return new o(w,this.h|v.h)},t.xor=function(v){for(var g=Math.max(this.g.length,v.g.length),w=[],T=0;T<g;T++)w[T]=this.i(T)^v.i(T);return new o(w,this.h^v.h)};function B(v){for(var g=v.g.length+1,w=[],T=0;T<g;T++)w[T]=v.i(T)<<1|v.i(T-1)>>>31;return new o(w,v.h)}function z(v,g){var w=g>>5;g%=32;for(var T=v.g.length-w,A=[],P=0;P<T;P++)A[P]=0<g?v.i(P+w)>>>g|v.i(P+w+1)<<32-g:v.i(P+w);return new o(A,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,t0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,Gr=o}).apply(typeof yg<"u"?yg:typeof self<"u"?self:typeof window<"u"?window:{});var Ja=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var n0,so,r0,_l,Zh,s0,i0,o0;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,c,d){return a==Array.prototype||a==Object.prototype||(a[c]=d.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ja=="object"&&Ja];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function s(a,c){if(c)e:{var d=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var N=a[m];if(!(N in d))break e;d=d[N]}a=a[a.length-1],m=d[a],c=c(m),c!=m&&c!=null&&e(d,a,{configurable:!0,writable:!0,value:c})}}function i(a,c){a instanceof String&&(a+="");var d=0,m=!1,N={next:function(){if(!m&&d<a.length){var b=d++;return{value:c(b,a[b]),done:!1}}return m=!0,{done:!0,value:void 0}}};return N[Symbol.iterator]=function(){return N},N}s("Array.prototype.values",function(a){return a||function(){return i(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var c=typeof a;return c=c!="object"?c:a?Array.isArray(a)?"array":c:"null",c=="array"||c=="object"&&typeof a.length=="number"}function h(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function p(a,c,d){return a.call.apply(a.bind,arguments)}function y(a,c,d){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var N=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(N,m),a.apply(c,N)}}return function(){return a.apply(c,arguments)}}function _(a,c,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,_.apply(null,arguments)}function R(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function C(a,c){function d(){}d.prototype=c.prototype,a.aa=c.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(m,N,b){for(var q=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)q[ge-2]=arguments[ge];return c.prototype[N].apply(m,q)}}function V(a){const c=a.length;if(0<c){const d=Array(c);for(let m=0;m<c;m++)d[m]=a[m];return d}return[]}function L(a,c){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(u(m)){const N=a.length||0,b=m.length||0;a.length=N+b;for(let q=0;q<b;q++)a[N+q]=m[q]}else a.push(m)}}class x{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function E(a){return/^[\s\xa0]*$/.test(a)}function S(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function O(a){return O[" "](a),a}O[" "]=function(){};var B=S().indexOf("Gecko")!=-1&&!(S().toLowerCase().indexOf("webkit")!=-1&&S().indexOf("Edge")==-1)&&!(S().indexOf("Trident")!=-1||S().indexOf("MSIE")!=-1)&&S().indexOf("Edge")==-1;function z(a,c,d){for(const m in a)c.call(d,a[m],m,a)}function v(a,c){for(const d in a)c.call(void 0,a[d],d,a)}function g(a){const c={};for(const d in a)c[d]=a[d];return c}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,c){let d,m;for(let N=1;N<arguments.length;N++){m=arguments[N];for(d in m)a[d]=m[d];for(let b=0;b<w.length;b++)d=w[b],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function A(a){var c=1;a=a.split(":");const d=[];for(;0<c&&a.length;)d.push(a.shift()),c--;return a.length&&d.push(a.join(":")),d}function P(a){l.setTimeout(()=>{throw a},0)}function I(){var a=$;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class Pe{constructor(){this.h=this.g=null}add(c,d){const m=xn.get();m.set(c,d),this.h?this.h.next=m:this.g=m,this.h=m}}var xn=new x(()=>new St,a=>a.reset());class St{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let $t,D=!1,$=new Pe,Z=()=>{const a=l.Promise.resolve(void 0);$t=()=>{a.then(me)}};var me=()=>{for(var a;a=I();){try{a.h.call(a.g)}catch(d){P(d)}var c=xn;c.j(a),100>c.h&&(c.h++,a.next=c.g,c.g=a)}D=!1};function te(){this.s=this.s,this.C=this.C}te.prototype.s=!1,te.prototype.ma=function(){this.s||(this.s=!0,this.N())},te.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function _e(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}_e.prototype.h=function(){this.defaultPrevented=!0};var Me=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return a}();function qt(a,c){if(_e.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget){if(B){e:{try{O(c.nodeName);var N=!0;break e}catch{}N=!1}N||(c=null)}}else d=="mouseover"?c=a.fromElement:d=="mouseout"&&(c=a.toElement);this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Ht[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&qt.aa.h.call(this)}}C(qt,_e);var Ht={2:"touch",3:"pen",4:"mouse"};qt.prototype.h=function(){qt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Wt="closure_listenable_"+(1e6*Math.random()|0),Xu=0;function Ju(a,c,d,m,N){this.listener=a,this.proxy=null,this.src=c,this.type=d,this.capture=!!m,this.ha=N,this.key=++Xu,this.da=this.fa=!1}function ps(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ms(a){this.src=a,this.g={},this.h=0}ms.prototype.add=function(a,c,d,m,N){var b=a.toString();a=this.g[b],a||(a=this.g[b]=[],this.h++);var q=Ii(a,c,m,N);return-1<q?(c=a[q],d||(c.fa=!1)):(c=new Ju(c,this.src,b,!!m,N),c.fa=d,a.push(c)),c};function Ti(a,c){var d=c.type;if(d in a.g){var m=a.g[d],N=Array.prototype.indexOf.call(m,c,void 0),b;(b=0<=N)&&Array.prototype.splice.call(m,N,1),b&&(ps(c),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Ii(a,c,d,m){for(var N=0;N<a.length;++N){var b=a[N];if(!b.da&&b.listener==c&&b.capture==!!d&&b.ha==m)return N}return-1}var xi="closure_lm_"+(1e6*Math.random()|0),Si={};function ma(a,c,d,m,N){if(Array.isArray(c)){for(var b=0;b<c.length;b++)ma(a,c[b],d,m,N);return null}return d=_a(d),a&&a[Wt]?a.K(c,d,h(m)?!!m.capture:!1,N):Vt(a,c,d,!1,m,N)}function Vt(a,c,d,m,N,b){if(!c)throw Error("Invalid event type");var q=h(N)?!!N.capture:!!N,ge=Ri(a);if(ge||(a[xi]=ge=new ms(a)),d=ge.add(c,d,m,q,b),d.proxy)return d;if(m=gs(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)Me||(N=q),N===void 0&&(N=!1),a.addEventListener(c.toString(),m,N);else if(a.attachEvent)a.attachEvent(Ai(c.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function gs(){function a(d){return c.call(a.src,a.listener,d)}const c=ya;return a}function ga(a,c,d,m,N){if(Array.isArray(c))for(var b=0;b<c.length;b++)ga(a,c[b],d,m,N);else m=h(m)?!!m.capture:!!m,d=_a(d),a&&a[Wt]?(a=a.i,c=String(c).toString(),c in a.g&&(b=a.g[c],d=Ii(b,d,m,N),-1<d&&(ps(b[d]),Array.prototype.splice.call(b,d,1),b.length==0&&(delete a.g[c],a.h--)))):a&&(a=Ri(a))&&(c=a.g[c.toString()],a=-1,c&&(a=Ii(c,d,m,N)),(d=-1<a?c[a]:null)&&ys(d))}function ys(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[Wt])Ti(c.i,a);else{var d=a.type,m=a.proxy;c.removeEventListener?c.removeEventListener(d,m,a.capture):c.detachEvent?c.detachEvent(Ai(d),m):c.addListener&&c.removeListener&&c.removeListener(m),(d=Ri(c))?(Ti(d,a),d.h==0&&(d.src=null,c[xi]=null)):ps(a)}}}function Ai(a){return a in Si?Si[a]:Si[a]="on"+a}function ya(a,c){if(a.da)a=!0;else{c=new qt(c,this);var d=a.listener,m=a.ha||a.src;a.fa&&ys(a),a=d.call(m,c)}return a}function Ri(a){return a=a[xi],a instanceof ms?a:null}var _s="__closure_events_fn_"+(1e9*Math.random()>>>0);function _a(a){return typeof a=="function"?a:(a[_s]||(a[_s]=function(c){return a.handleEvent(c)}),a[_s])}function je(){te.call(this),this.i=new ms(this),this.M=this,this.F=null}C(je,te),je.prototype[Wt]=!0,je.prototype.removeEventListener=function(a,c,d,m){ga(this,a,c,d,m)};function $e(a,c){var d,m=a.F;if(m)for(d=[];m;m=m.F)d.push(m);if(a=a.M,m=c.type||c,typeof c=="string")c=new _e(c,a);else if(c instanceof _e)c.target=c.target||a;else{var N=c;c=new _e(m,a),T(c,N)}if(N=!0,d)for(var b=d.length-1;0<=b;b--){var q=c.g=d[b];N=Or(q,m,!0,c)&&N}if(q=c.g=a,N=Or(q,m,!0,c)&&N,N=Or(q,m,!1,c)&&N,d)for(b=0;b<d.length;b++)q=c.g=d[b],N=Or(q,m,!1,c)&&N}je.prototype.N=function(){if(je.aa.N.call(this),this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],m=0;m<d.length;m++)ps(d[m]);delete a.g[c],a.h--}}this.F=null},je.prototype.K=function(a,c,d,m){return this.i.add(String(a),c,!1,d,m)},je.prototype.L=function(a,c,d,m){return this.i.add(String(a),c,!0,d,m)};function Or(a,c,d,m){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();for(var N=!0,b=0;b<c.length;++b){var q=c[b];if(q&&!q.da&&q.capture==d){var ge=q.listener,Ge=q.ha||q.src;q.fa&&Ti(a.i,q),N=ge.call(Ge,m)!==!1&&N}}return N&&!m.defaultPrevented}function k(a,c,d){if(typeof a=="function")d&&(a=_(a,d));else if(a&&typeof a.handleEvent=="function")a=_(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(a,c||0)}function U(a){a.g=k(()=>{a.g=null,a.i&&(a.i=!1,U(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class ee extends te{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:U(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ne(a){te.call(this),this.h=a,this.g={}}C(ne,te);var oe=[];function he(a){z(a.g,function(c,d){this.g.hasOwnProperty(d)&&ys(c)},a),a.g={}}ne.prototype.N=function(){ne.aa.N.call(this),he(this)},ne.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Sn=l.JSON.stringify,vs=l.JSON.parse,Ke=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function an(){}an.prototype.h=null;function ws(a){return a.h||(a.h=a.i())}function va(){}var At={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function An(){_e.call(this,"d")}C(An,_e);function Es(){_e.call(this,"c")}C(Es,_e);var Vr={},up=null;function wa(){return up=up||new je}Vr.La="serverreachability";function cp(a){_e.call(this,Vr.La,a)}C(cp,_e);function ki(a){const c=wa();$e(c,new cp(c))}Vr.STAT_EVENT="statevent";function hp(a,c){_e.call(this,Vr.STAT_EVENT,a),this.stat=c}C(hp,_e);function ft(a){const c=wa();$e(c,new hp(c,a))}Vr.Ma="timingevent";function dp(a,c){_e.call(this,Vr.Ma,a),this.size=c}C(dp,_e);function Ci(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},c)}function Pi(){this.g=!0}Pi.prototype.xa=function(){this.g=!1};function lE(a,c,d,m,N,b){a.info(function(){if(a.g)if(b)for(var q="",ge=b.split("&"),Ge=0;Ge<ge.length;Ge++){var ue=ge[Ge].split("=");if(1<ue.length){var nt=ue[0];ue=ue[1];var rt=nt.split("_");q=2<=rt.length&&rt[1]=="type"?q+(nt+"="+ue+"&"):q+(nt+"=redacted&")}}else q=null;else q=b;return"XMLHTTP REQ ("+m+") [attempt "+N+"]: "+c+`
`+d+`
`+q})}function uE(a,c,d,m,N,b,q){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+N+"]: "+c+`
`+d+`
`+b+" "+q})}function Ts(a,c,d,m){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+hE(a,d)+(m?" "+m:"")})}function cE(a,c){a.info(function(){return"TIMEOUT: "+c})}Pi.prototype.info=function(){};function hE(a,c){if(!a.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var m=d[a];if(!(2>m.length)){var N=m[1];if(Array.isArray(N)&&!(1>N.length)){var b=N[0];if(b!="noop"&&b!="stop"&&b!="close")for(var q=1;q<N.length;q++)N[q]=""}}}}return Sn(d)}catch{return c}}var Ea={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},fp={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Zu;function Ta(){}C(Ta,an),Ta.prototype.g=function(){return new XMLHttpRequest},Ta.prototype.i=function(){return{}},Zu=new Ta;function Qn(a,c,d,m){this.j=a,this.i=c,this.l=d,this.R=m||1,this.U=new ne(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new pp}function pp(){this.i=null,this.g="",this.h=!1}var mp={},ec={};function tc(a,c,d){a.L=1,a.v=Aa(Rn(c)),a.m=d,a.P=!0,gp(a,null)}function gp(a,c){a.F=Date.now(),Ia(a),a.A=Rn(a.v);var d=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),Pp(d.i,"t",m),a.C=0,d=a.j.J,a.h=new pp,a.g=Gp(a.j,d?c:null,!a.m),0<a.O&&(a.M=new ee(_(a.Y,a,a.g),a.O)),c=a.U,d=a.g,m=a.ca;var N="readystatechange";Array.isArray(N)||(N&&(oe[0]=N.toString()),N=oe);for(var b=0;b<N.length;b++){var q=ma(d,N[b],m||c.handleEvent,!1,c.h||c);if(!q)break;c.g[q.key]=q}c=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,c)):(a.u="GET",a.g.ea(a.A,a.u,null,c)),ki(),lE(a.i,a.u,a.A,a.l,a.R,a.m)}Qn.prototype.ca=function(a){a=a.target;const c=this.M;c&&kn(a)==3?c.j():this.Y(a)},Qn.prototype.Y=function(a){try{if(a==this.g)e:{const rt=kn(this.g);var c=this.g.Ba();const Ss=this.g.Z();if(!(3>rt)&&(rt!=3||this.g&&(this.h.h||this.g.oa()||Mp(this.g)))){this.J||rt!=4||c==7||(c==8||0>=Ss?ki(3):ki(2)),nc(this);var d=this.g.Z();this.X=d;t:if(yp(this)){var m=Mp(this.g);a="";var N=m.length,b=kn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Lr(this),Ni(this);var q="";break t}this.h.i=new l.TextDecoder}for(c=0;c<N;c++)this.h.h=!0,a+=this.h.i.decode(m[c],{stream:!(b&&c==N-1)});m.length=0,this.h.g+=a,this.C=0,q=this.h.g}else q=this.g.oa();if(this.o=d==200,uE(this.i,this.u,this.A,this.l,this.R,rt,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ge,Ge=this.g;if((ge=Ge.g?Ge.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(ge)){var ue=ge;break t}}ue=null}if(d=ue)Ts(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,rc(this,d);else{this.o=!1,this.s=3,ft(12),Lr(this),Ni(this);break e}}if(this.P){d=!0;let Kt;for(;!this.J&&this.C<q.length;)if(Kt=dE(this,q),Kt==ec){rt==4&&(this.s=4,ft(14),d=!1),Ts(this.i,this.l,null,"[Incomplete Response]");break}else if(Kt==mp){this.s=4,ft(15),Ts(this.i,this.l,q,"[Invalid Chunk]"),d=!1;break}else Ts(this.i,this.l,Kt,null),rc(this,Kt);if(yp(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),rt!=4||q.length!=0||this.h.h||(this.s=1,ft(16),d=!1),this.o=this.o&&d,!d)Ts(this.i,this.l,q,"[Invalid Chunked Response]"),Lr(this),Ni(this);else if(0<q.length&&!this.W){this.W=!0;var nt=this.j;nt.g==this&&nt.ba&&!nt.M&&(nt.j.info("Great, no buffering proxy detected. Bytes received: "+q.length),uc(nt),nt.M=!0,ft(11))}}else Ts(this.i,this.l,q,null),rc(this,q);rt==4&&Lr(this),this.o&&!this.J&&(rt==4?qp(this.j,this):(this.o=!1,Ia(this)))}else CE(this.g),d==400&&0<q.indexOf("Unknown SID")?(this.s=3,ft(12)):(this.s=0,ft(13)),Lr(this),Ni(this)}}}catch{}finally{}};function yp(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function dE(a,c){var d=a.C,m=c.indexOf(`
`,d);return m==-1?ec:(d=Number(c.substring(d,m)),isNaN(d)?mp:(m+=1,m+d>c.length?ec:(c=c.slice(m,m+d),a.C=m+d,c)))}Qn.prototype.cancel=function(){this.J=!0,Lr(this)};function Ia(a){a.S=Date.now()+a.I,_p(a,a.I)}function _p(a,c){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ci(_(a.ba,a),c)}function nc(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Qn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(cE(this.i,this.A),this.L!=2&&(ki(),ft(17)),Lr(this),this.s=2,Ni(this)):_p(this,this.S-a)};function Ni(a){a.j.G==0||a.J||qp(a.j,a)}function Lr(a){nc(a);var c=a.M;c&&typeof c.ma=="function"&&c.ma(),a.M=null,he(a.U),a.g&&(c=a.g,a.g=null,c.abort(),c.ma())}function rc(a,c){try{var d=a.j;if(d.G!=0&&(d.g==a||sc(d.h,a))){if(!a.K&&sc(d.h,a)&&d.G==3){try{var m=d.Da.g.parse(c)}catch{m=null}if(Array.isArray(m)&&m.length==3){var N=m;if(N[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Da(d),Pa(d);else break e;lc(d),ft(18)}}else d.za=N[1],0<d.za-d.T&&37500>N[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ci(_(d.Za,d),6e3));if(1>=Ep(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else jr(d,11)}else if((a.K||d.g==a)&&Da(d),!E(c))for(N=d.Da.g.parse(c),c=0;c<N.length;c++){let ue=N[c];if(d.T=ue[0],ue=ue[1],d.G==2)if(ue[0]=="c"){d.K=ue[1],d.ia=ue[2];const nt=ue[3];nt!=null&&(d.la=nt,d.j.info("VER="+d.la));const rt=ue[4];rt!=null&&(d.Aa=rt,d.j.info("SVER="+d.Aa));const Ss=ue[5];Ss!=null&&typeof Ss=="number"&&0<Ss&&(m=1.5*Ss,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const Kt=a.g;if(Kt){const Oa=Kt.g?Kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Oa){var b=m.h;b.g||Oa.indexOf("spdy")==-1&&Oa.indexOf("quic")==-1&&Oa.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(ic(b,b.h),b.h=null))}if(m.D){const cc=Kt.g?Kt.g.getResponseHeader("X-HTTP-Session-Id"):null;cc&&(m.ya=cc,ve(m.I,m.D,cc))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var q=a;if(m.qa=Kp(m,m.J?m.ia:null,m.W),q.K){Tp(m.h,q);var ge=q,Ge=m.L;Ge&&(ge.I=Ge),ge.B&&(nc(ge),Ia(ge)),m.g=q}else Bp(m);0<d.i.length&&Na(d)}else ue[0]!="stop"&&ue[0]!="close"||jr(d,7);else d.G==3&&(ue[0]=="stop"||ue[0]=="close"?ue[0]=="stop"?jr(d,7):ac(d):ue[0]!="noop"&&d.l&&d.l.ta(ue),d.v=0)}}ki(4)}catch{}}var fE=class{constructor(a,c){this.g=a,this.map=c}};function vp(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function wp(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Ep(a){return a.h?1:a.g?a.g.size:0}function sc(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function ic(a,c){a.g?a.g.add(c):a.h=c}function Tp(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}vp.prototype.cancel=function(){if(this.i=Ip(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Ip(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const d of a.g.values())c=c.concat(d.D);return c}return V(a.i)}function pE(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var c=[],d=a.length,m=0;m<d;m++)c.push(a[m]);return c}c=[],d=0;for(m in a)c[d++]=a[m];return c}function mE(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var c=[];a=a.length;for(var d=0;d<a;d++)c.push(d);return c}c=[],d=0;for(const m in a)c[d++]=m;return c}}}function xp(a,c){if(a.forEach&&typeof a.forEach=="function")a.forEach(c,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,c,void 0);else for(var d=mE(a),m=pE(a),N=m.length,b=0;b<N;b++)c.call(void 0,m[b],d&&d[b],a)}var Sp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function gE(a,c){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var m=a[d].indexOf("="),N=null;if(0<=m){var b=a[d].substring(0,m);N=a[d].substring(m+1)}else b=a[d];c(b,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function Mr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Mr){this.h=a.h,xa(this,a.j),this.o=a.o,this.g=a.g,Sa(this,a.s),this.l=a.l;var c=a.i,d=new Oi;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),Ap(this,d),this.m=a.m}else a&&(c=String(a).match(Sp))?(this.h=!1,xa(this,c[1]||"",!0),this.o=Di(c[2]||""),this.g=Di(c[3]||"",!0),Sa(this,c[4]),this.l=Di(c[5]||"",!0),Ap(this,c[6]||"",!0),this.m=Di(c[7]||"")):(this.h=!1,this.i=new Oi(null,this.h))}Mr.prototype.toString=function(){var a=[],c=this.j;c&&a.push(bi(c,Rp,!0),":");var d=this.g;return(d||c=="file")&&(a.push("//"),(c=this.o)&&a.push(bi(c,Rp,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(bi(d,d.charAt(0)=="/"?vE:_E,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",bi(d,EE)),a.join("")};function Rn(a){return new Mr(a)}function xa(a,c,d){a.j=d?Di(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function Sa(a,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);a.s=c}else a.s=null}function Ap(a,c,d){c instanceof Oi?(a.i=c,TE(a.i,a.h)):(d||(c=bi(c,wE)),a.i=new Oi(c,a.h))}function ve(a,c,d){a.i.set(c,d)}function Aa(a){return ve(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Di(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function bi(a,c,d){return typeof a=="string"?(a=encodeURI(a).replace(c,yE),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function yE(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Rp=/[#\/\?@]/g,_E=/[#\?:]/g,vE=/[#\?]/g,wE=/[#\?@]/g,EE=/#/g;function Oi(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function Yn(a){a.g||(a.g=new Map,a.h=0,a.i&&gE(a.i,function(c,d){a.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=Oi.prototype,t.add=function(a,c){Yn(this),this.i=null,a=Is(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(c),this.h+=1,this};function kp(a,c){Yn(a),c=Is(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function Cp(a,c){return Yn(a),c=Is(a,c),a.g.has(c)}t.forEach=function(a,c){Yn(this),this.g.forEach(function(d,m){d.forEach(function(N){a.call(c,N,m,this)},this)},this)},t.na=function(){Yn(this);const a=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let m=0;m<c.length;m++){const N=a[m];for(let b=0;b<N.length;b++)d.push(c[m])}return d},t.V=function(a){Yn(this);let c=[];if(typeof a=="string")Cp(this,a)&&(c=c.concat(this.g.get(Is(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)c=c.concat(a[d])}return c},t.set=function(a,c){return Yn(this),this.i=null,a=Is(this,a),Cp(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},t.get=function(a,c){return a?(a=this.V(a),0<a.length?String(a[0]):c):c};function Pp(a,c,d){kp(a,c),0<d.length&&(a.i=null,a.g.set(Is(a,c),V(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var m=c[d];const b=encodeURIComponent(String(m)),q=this.V(m);for(m=0;m<q.length;m++){var N=b;q[m]!==""&&(N+="="+encodeURIComponent(String(q[m]))),a.push(N)}}return this.i=a.join("&")};function Is(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function TE(a,c){c&&!a.j&&(Yn(a),a.i=null,a.g.forEach(function(d,m){var N=m.toLowerCase();m!=N&&(kp(this,m),Pp(this,N,d))},a)),a.j=c}function IE(a,c){const d=new Pi;if(l.Image){const m=new Image;m.onload=R(Xn,d,"TestLoadImage: loaded",!0,c,m),m.onerror=R(Xn,d,"TestLoadImage: error",!1,c,m),m.onabort=R(Xn,d,"TestLoadImage: abort",!1,c,m),m.ontimeout=R(Xn,d,"TestLoadImage: timeout",!1,c,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else c(!1)}function xE(a,c){const d=new Pi,m=new AbortController,N=setTimeout(()=>{m.abort(),Xn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:m.signal}).then(b=>{clearTimeout(N),b.ok?Xn(d,"TestPingServer: ok",!0,c):Xn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(N),Xn(d,"TestPingServer: error",!1,c)})}function Xn(a,c,d,m,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),m(d)}catch{}}function SE(){this.g=new Ke}function AE(a,c,d){const m=d||"";try{xp(a,function(N,b){let q=N;h(N)&&(q=Sn(N)),c.push(m+b+"="+encodeURIComponent(q))})}catch(N){throw c.push(m+"type="+encodeURIComponent("_badmap")),N}}function Ra(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Ra,an),Ra.prototype.g=function(){return new ka(this.l,this.j)},Ra.prototype.i=function(a){return function(){return a}}({});function ka(a,c){je.call(this),this.D=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(ka,je),t=ka.prototype,t.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=c,this.readyState=1,Li(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(c.body=a),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Vi(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Li(this)),this.g&&(this.readyState=3,Li(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Np(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Np(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?Vi(this):Li(this),this.readyState==3&&Np(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Vi(this))},t.Qa=function(a){this.g&&(this.response=a,Vi(this))},t.ga=function(){this.g&&Vi(this)};function Vi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Li(a)}t.setRequestHeader=function(a,c){this.u.append(a,c)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=c.next();return a.join(`\r
`)};function Li(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ka.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Dp(a){let c="";return z(a,function(d,m){c+=m,c+=":",c+=d,c+=`\r
`}),c}function oc(a,c,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Dp(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ve(a,c,d))}function ke(a){je.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(ke,je);var RE=/^https?$/i,kE=["POST","PUT"];t=ke.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,c,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Zu.g(),this.v=this.o?ws(this.o):ws(Zu),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(b){bp(this,b);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var N in m)d.set(N,m[N]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const b of m.keys())d.set(b,m.get(b));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(b=>b.toLowerCase()=="content-type"),N=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(kE,c,void 0))||m||N||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,q]of d)this.g.setRequestHeader(b,q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Lp(this),this.u=!0,this.g.send(a),this.u=!1}catch(b){bp(this,b)}};function bp(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.m=5,Op(a),Ca(a)}function Op(a){a.A||(a.A=!0,$e(a,"complete"),$e(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,$e(this,"complete"),$e(this,"abort"),Ca(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ca(this,!0)),ke.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Vp(this):this.bb())},t.bb=function(){Vp(this)};function Vp(a){if(a.h&&typeof o<"u"&&(!a.v[1]||kn(a)!=4||a.Z()!=2)){if(a.u&&kn(a)==4)k(a.Ea,0,a);else if($e(a,"readystatechange"),kn(a)==4){a.h=!1;try{const q=a.Z();e:switch(q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var m;if(m=q===0){var N=String(a.D).match(Sp)[1]||null;!N&&l.self&&l.self.location&&(N=l.self.location.protocol.slice(0,-1)),m=!RE.test(N?N.toLowerCase():"")}d=m}if(d)$e(a,"complete"),$e(a,"success");else{a.m=6;try{var b=2<kn(a)?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.Z()+"]",Op(a)}}finally{Ca(a)}}}}function Ca(a,c){if(a.g){Lp(a);const d=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,c||$e(a,"ready");try{d.onreadystatechange=m}catch{}}}function Lp(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function kn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<kn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),vs(c)}};function Mp(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function CE(a){const c={};a=(a.g&&2<=kn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(E(a[m]))continue;var d=A(a[m]);const N=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const b=c[N]||[];c[N]=b,b.push(d)}v(c,function(m){return m.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Mi(a,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||c}function jp(a){this.Aa=0,this.i=[],this.j=new Pi,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Mi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Mi("baseRetryDelayMs",5e3,a),this.cb=Mi("retryDelaySeedMs",1e4,a),this.Wa=Mi("forwardChannelMaxRetries",2,a),this.wa=Mi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new vp(a&&a.concurrentRequestLimit),this.Da=new SE,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=jp.prototype,t.la=8,t.G=1,t.connect=function(a,c,d,m){ft(0),this.W=a,this.H=c||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Kp(this,null,this.W),Na(this)};function ac(a){if(Fp(a),a.G==3){var c=a.U++,d=Rn(a.I);if(ve(d,"SID",a.K),ve(d,"RID",c),ve(d,"TYPE","terminate"),ji(a,d),c=new Qn(a,a.j,c),c.L=2,c.v=Aa(Rn(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=Gp(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Ia(c)}Wp(a)}function Pa(a){a.g&&(uc(a),a.g.cancel(),a.g=null)}function Fp(a){Pa(a),a.u&&(l.clearTimeout(a.u),a.u=null),Da(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Na(a){if(!wp(a.h)&&!a.s){a.s=!0;var c=a.Ga;$t||Z(),D||($t(),D=!0),$.add(c,a),a.B=0}}function PE(a,c){return Ep(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=c.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ci(_(a.Ga,a,c),Hp(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const N=new Qn(this,this.j,a);let b=this.o;if(this.S&&(b?(b=g(b),T(b,this.S)):b=this.S),this.m!==null||this.O||(N.H=b,b=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(c+=m,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=zp(this,N,c),d=Rn(this.I),ve(d,"RID",a),ve(d,"CVER",22),this.D&&ve(d,"X-HTTP-Session-Id",this.D),ji(this,d),b&&(this.O?c="headers="+encodeURIComponent(String(Dp(b)))+"&"+c:this.m&&oc(d,this.m,b)),ic(this.h,N),this.Ua&&ve(d,"TYPE","init"),this.P?(ve(d,"$req",c),ve(d,"SID","null"),N.T=!0,tc(N,d,null)):tc(N,d,c),this.G=2}}else this.G==3&&(a?Up(this,a):this.i.length==0||wp(this.h)||Up(this))};function Up(a,c){var d;c?d=c.l:d=a.U++;const m=Rn(a.I);ve(m,"SID",a.K),ve(m,"RID",d),ve(m,"AID",a.T),ji(a,m),a.m&&a.o&&oc(m,a.m,a.o),d=new Qn(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),c&&(a.i=c.D.concat(a.i)),c=zp(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),ic(a.h,d),tc(d,m,c)}function ji(a,c){a.H&&z(a.H,function(d,m){ve(c,m,d)}),a.l&&xp({},function(d,m){ve(c,m,d)})}function zp(a,c,d){d=Math.min(a.i.length,d);var m=a.l?_(a.l.Na,a.l,a):null;e:{var N=a.i;let b=-1;for(;;){const q=["count="+d];b==-1?0<d?(b=N[0].g,q.push("ofs="+b)):b=0:q.push("ofs="+b);let ge=!0;for(let Ge=0;Ge<d;Ge++){let ue=N[Ge].g;const nt=N[Ge].map;if(ue-=b,0>ue)b=Math.max(0,N[Ge].g-100),ge=!1;else try{AE(nt,q,"req"+ue+"_")}catch{m&&m(nt)}}if(ge){m=q.join("&");break e}}}return a=a.i.splice(0,d),c.D=a,m}function Bp(a){if(!a.g&&!a.u){a.Y=1;var c=a.Fa;$t||Z(),D||($t(),D=!0),$.add(c,a),a.v=0}}function lc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ci(_(a.Fa,a),Hp(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,$p(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ci(_(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ft(10),Pa(this),$p(this))};function uc(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function $p(a){a.g=new Qn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var c=Rn(a.qa);ve(c,"RID","rpc"),ve(c,"SID",a.K),ve(c,"AID",a.T),ve(c,"CI",a.F?"0":"1"),!a.F&&a.ja&&ve(c,"TO",a.ja),ve(c,"TYPE","xmlhttp"),ji(a,c),a.m&&a.o&&oc(c,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Aa(Rn(c)),d.m=null,d.P=!0,gp(d,a)}t.Za=function(){this.C!=null&&(this.C=null,Pa(this),lc(this),ft(19))};function Da(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function qp(a,c){var d=null;if(a.g==c){Da(a),uc(a),a.g=null;var m=2}else if(sc(a.h,c))d=c.D,Tp(a.h,c),m=1;else return;if(a.G!=0){if(c.o)if(m==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var N=a.B;m=wa(),$e(m,new dp(m,d)),Na(a)}else Bp(a);else if(N=c.s,N==3||N==0&&0<c.X||!(m==1&&PE(a,c)||m==2&&lc(a)))switch(d&&0<d.length&&(c=a.h,c.i=c.i.concat(d)),N){case 1:jr(a,5);break;case 4:jr(a,10);break;case 3:jr(a,6);break;default:jr(a,2)}}}function Hp(a,c){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*c}function jr(a,c){if(a.j.info("Error code "+c),c==2){var d=_(a.fb,a),m=a.Xa;const N=!m;m=new Mr(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||xa(m,"https"),Aa(m),N?IE(m.toString(),d):xE(m.toString(),d)}else ft(2);a.G=0,a.l&&a.l.sa(c),Wp(a),Fp(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ft(2)):(this.j.info("Failed to ping google.com"),ft(1))};function Wp(a){if(a.G=0,a.ka=[],a.l){const c=Ip(a.h);(c.length!=0||a.i.length!=0)&&(L(a.ka,c),L(a.ka,a.i),a.h.i.length=0,V(a.i),a.i.length=0),a.l.ra()}}function Kp(a,c,d){var m=d instanceof Mr?Rn(d):new Mr(d);if(m.g!="")c&&(m.g=c+"."+m.g),Sa(m,m.s);else{var N=l.location;m=N.protocol,c=c?c+"."+N.hostname:N.hostname,N=+N.port;var b=new Mr(null);m&&xa(b,m),c&&(b.g=c),N&&Sa(b,N),d&&(b.l=d),m=b}return d=a.D,c=a.ya,d&&c&&ve(m,d,c),ve(m,"VER",a.la),ji(a,m),m}function Gp(a,c,d){if(c&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Ca&&!a.pa?new ke(new Ra({eb:d})):new ke(a.pa),c.Ha(a.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Qp(){}t=Qp.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function ba(){}ba.prototype.g=function(a,c){return new Rt(a,c)};function Rt(a,c){je.call(this),this.g=new jp(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(a?a["X-WebChannel-Client-Profile"]=c.va:a={"X-WebChannel-Client-Profile":c.va}),this.g.S=a,(a=c&&c.Sb)&&!E(a)&&(this.g.m=a),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!E(c)&&(this.g.D=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new xs(this)}C(Rt,je),Rt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Rt.prototype.close=function(){ac(this.g)},Rt.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Sn(a),a=d);c.i.push(new fE(c.Ya++,a)),c.G==3&&Na(c)},Rt.prototype.N=function(){this.g.l=null,delete this.j,ac(this.g),delete this.g,Rt.aa.N.call(this)};function Yp(a){An.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const d in c){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}C(Yp,An);function Xp(){Es.call(this),this.status=1}C(Xp,Es);function xs(a){this.g=a}C(xs,Qp),xs.prototype.ua=function(){$e(this.g,"a")},xs.prototype.ta=function(a){$e(this.g,new Yp(a))},xs.prototype.sa=function(a){$e(this.g,new Xp)},xs.prototype.ra=function(){$e(this.g,"b")},ba.prototype.createWebChannel=ba.prototype.g,Rt.prototype.send=Rt.prototype.o,Rt.prototype.open=Rt.prototype.m,Rt.prototype.close=Rt.prototype.close,o0=function(){return new ba},i0=function(){return wa()},s0=Vr,Zh={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ea.NO_ERROR=0,Ea.TIMEOUT=8,Ea.HTTP_ERROR=6,_l=Ea,fp.COMPLETE="complete",r0=fp,va.EventType=At,At.OPEN="a",At.CLOSE="b",At.ERROR="c",At.MESSAGE="d",je.prototype.listen=je.prototype.K,so=va,ke.prototype.listenOnce=ke.prototype.L,ke.prototype.getLastError=ke.prototype.Ka,ke.prototype.getLastErrorCode=ke.prototype.Ba,ke.prototype.getStatus=ke.prototype.Z,ke.prototype.getResponseJson=ke.prototype.Oa,ke.prototype.getResponseText=ke.prototype.oa,ke.prototype.send=ke.prototype.ea,ke.prototype.setWithCredentials=ke.prototype.Ha,n0=ke}).apply(typeof Ja<"u"?Ja:typeof self<"u"?self:typeof window<"u"?window:{});const _g="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}at.UNAUTHENTICATED=new at(null),at.GOOGLE_CREDENTIALS=new at("google-credentials-uid"),at.FIRST_PARTY=new at("first-party-uid"),at.MOCK_USER=new at("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yi="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts=new pf("@firebase/firestore");function Ki(){return ts.logLevel}function K(t,...e){if(ts.logLevel<=ie.DEBUG){const n=e.map(yf);ts.debug(`Firestore (${yi}): ${t}`,...n)}}function Hn(t,...e){if(ts.logLevel<=ie.ERROR){const n=e.map(yf);ts.error(`Firestore (${yi}): ${t}`,...n)}}function ai(t,...e){if(ts.logLevel<=ie.WARN){const n=e.map(yf);ts.warn(`Firestore (${yi}): ${t}`,...n)}}function yf(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(t="Unexpected state"){const e=`FIRESTORE (${yi}) INTERNAL ASSERTION FAILED: `+t;throw Hn(e),new Error(e)}function fe(t,e){t||Y()}function J(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends Tn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a0{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class jS{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(at.UNAUTHENTICATED))}shutdown(){}}class FS{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class US{constructor(e){this.t=e,this.currentUser=at.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){fe(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new jn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new jn,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new jn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(fe(typeof r.accessToken=="string"),new a0(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return fe(e===null||typeof e=="string"),new at(e)}}class zS{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=at.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class BS{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new zS(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(at.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class $S{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class qS{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){fe(this.o===void 0);const r=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,K("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(fe(typeof n.token=="string"),this.R=n.token,new $S(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HS(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l0{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=HS(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function ce(t,e){return t<e?-1:t>e?1:0}function li(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new H(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new H(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new H(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new H(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ze.fromMillis(Date.now())}static fromDate(e){return ze.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new ze(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ce(this.nanoseconds,e.nanoseconds):ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e){this.timestamp=e}static fromTimestamp(e){return new X(e)}static min(){return new X(new ze(0,0))}static max(){return new X(new ze(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(e,n,r){n===void 0?n=0:n>e.length&&Y(),r===void 0?r=e.length-n:r>e.length-n&&Y(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return zo.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof zo?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Ee extends zo{construct(e,n,r){return new Ee(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new H(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Ee(n)}static emptyPath(){return new Ee([])}}const WS=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Xe extends zo{construct(e,n,r){return new Xe(e,n,r)}static isValidIdentifier(e){return WS.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Xe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Xe(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new H(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new H(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new H(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new H(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Xe(n)}static emptyPath(){return new Xe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(Ee.fromString(e))}static fromName(e){return new G(Ee.fromString(e).popFirst(5))}static empty(){return new G(Ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ee.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new Ee(e.slice()))}}function KS(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=X.fromTimestamp(r===1e9?new ze(n+1,0):new ze(n,r));return new Sr(s,G.empty(),e)}function GS(t){return new Sr(t.readTime,t.key,-1)}class Sr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Sr(X.min(),G.empty(),-1)}static max(){return new Sr(X.max(),G.empty(),-1)}}function QS(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=G.comparator(t.documentKey,e.documentKey),n!==0?n:ce(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YS="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class XS{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sa(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==YS)throw t;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&Y(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new j((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof j?n:j.resolve(n)}catch(n){return j.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):j.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):j.reject(n)}static resolve(e){return new j((n,r)=>{n(e)})}static reject(e){return new j((n,r)=>{r(e)})}static waitFor(e){return new j((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(e){let n=j.resolve(!1);for(const r of e)n=n.next(s=>s?j.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new j((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let u=0;u<i;u++){const h=u;n(e[h]).next(p=>{o[h]=p,++l,l===i&&r(o)},p=>s(p))}})}static doWhile(e,n){return new j((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function JS(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function ia(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}_f.oe=-1;function Du(t){return t==null}function eu(t){return t===0&&1/t==-1/0}function ZS(t){return typeof t=="number"&&Number.isInteger(t)&&!eu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vg(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function us(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function u0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,n){this.comparator=e,this.root=n||Ye.EMPTY}insert(e,n){return new Re(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ye.BLACK,null,null))}remove(e){return new Re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ye.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Za(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Za(this.root,e,this.comparator,!1)}getReverseIterator(){return new Za(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Za(this.root,e,this.comparator,!0)}}class Za{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ye{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Ye.RED,this.left=s??Ye.EMPTY,this.right=i??Ye.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new Ye(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ye.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return Ye.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ye.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ye.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Y();const e=this.left.check();if(e!==this.right.check())throw Y();return e+(this.isRed()?0:1)}}Ye.EMPTY=null,Ye.RED=!0,Ye.BLACK=!1;Ye.EMPTY=new class{constructor(){this.size=0}get key(){throw Y()}get value(){throw Y()}get color(){throw Y()}get left(){throw Y()}get right(){throw Y()}copy(e,n,r,s,i){return this}insert(e,n,r){return new Ye(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.comparator=e,this.data=new Re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new wg(this.data.getIterator())}getIteratorFrom(e){return new wg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Ze)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Ze(this.comparator);return n.data=e,n}}class wg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e){this.fields=e,e.sort(Xe.comparator)}static empty(){return new Pt([])}unionWith(e){let n=new Ze(Xe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Pt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return li(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new c0("Invalid base64 string: "+i):i}}(e);return new tt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new tt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}tt.EMPTY_BYTE_STRING=new tt("");const eA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ar(t){if(fe(!!t),typeof t=="string"){let e=0;const n=eA.exec(t);if(fe(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ne(t.seconds),nanos:Ne(t.nanos)}}function Ne(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function ns(t){return typeof t=="string"?tt.fromBase64String(t):tt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vf(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function wf(t){const e=t.mapValue.fields.__previous_value__;return vf(e)?wf(e):e}function Bo(t){const e=Ar(t.mapValue.fields.__local_write_time__.timestampValue);return new ze(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e,n,r,s,i,o,l,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class $o{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new $o("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof $o&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el={mapValue:{}};function rs(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?vf(t)?4:rA(t)?9007199254740991:nA(t)?10:11:Y()}function wn(t,e){if(t===e)return!0;const n=rs(t);if(n!==rs(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Bo(t).isEqual(Bo(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Ar(s.timestampValue),l=Ar(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return ns(s.bytesValue).isEqual(ns(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ne(s.geoPointValue.latitude)===Ne(i.geoPointValue.latitude)&&Ne(s.geoPointValue.longitude)===Ne(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ne(s.integerValue)===Ne(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ne(s.doubleValue),l=Ne(i.doubleValue);return o===l?eu(o)===eu(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return li(t.arrayValue.values||[],e.arrayValue.values||[],wn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(vg(o)!==vg(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!wn(o[u],l[u])))return!1;return!0}(t,e);default:return Y()}}function qo(t,e){return(t.values||[]).find(n=>wn(n,e))!==void 0}function ui(t,e){if(t===e)return 0;const n=rs(t),r=rs(e);if(n!==r)return ce(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ce(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ne(i.integerValue||i.doubleValue),u=Ne(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Eg(t.timestampValue,e.timestampValue);case 4:return Eg(Bo(t),Bo(e));case 5:return ce(t.stringValue,e.stringValue);case 6:return function(i,o){const l=ns(i),u=ns(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),u=o.split("/");for(let h=0;h<l.length&&h<u.length;h++){const p=ce(l[h],u[h]);if(p!==0)return p}return ce(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=ce(Ne(i.latitude),Ne(o.latitude));return l!==0?l:ce(Ne(i.longitude),Ne(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Tg(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,u,h,p;const y=i.fields||{},_=o.fields||{},R=(l=y.value)===null||l===void 0?void 0:l.arrayValue,C=(u=_.value)===null||u===void 0?void 0:u.arrayValue,V=ce(((h=R==null?void 0:R.values)===null||h===void 0?void 0:h.length)||0,((p=C==null?void 0:C.values)===null||p===void 0?void 0:p.length)||0);return V!==0?V:Tg(R,C)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===el.mapValue&&o===el.mapValue)return 0;if(i===el.mapValue)return 1;if(o===el.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),h=o.fields||{},p=Object.keys(h);u.sort(),p.sort();for(let y=0;y<u.length&&y<p.length;++y){const _=ce(u[y],p[y]);if(_!==0)return _;const R=ui(l[u[y]],h[p[y]]);if(R!==0)return R}return ce(u.length,p.length)}(t.mapValue,e.mapValue);default:throw Y()}}function Eg(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ce(t,e);const n=Ar(t),r=Ar(e),s=ce(n.seconds,r.seconds);return s!==0?s:ce(n.nanos,r.nanos)}function Tg(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=ui(n[s],r[s]);if(i)return i}return ce(n.length,r.length)}function ci(t){return ed(t)}function ed(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Ar(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return ns(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return G.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=ed(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ed(n.fields[o])}`;return s+"}"}(t.mapValue):Y()}function Ig(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function td(t){return!!t&&"integerValue"in t}function Ef(t){return!!t&&"arrayValue"in t}function xg(t){return!!t&&"nullValue"in t}function Sg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function vl(t){return!!t&&"mapValue"in t}function nA(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function _o(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return us(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=_o(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=_o(t.arrayValue.values[n]);return e}return Object.assign({},t)}function rA(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.value=e}static empty(){return new wt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!vl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=_o(n)}setAll(e){let n=Xe.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=_o(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());vl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return wn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];vl(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){us(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new wt(_o(this.value))}}function h0(t){const e=[];return us(t.fields,(n,r)=>{const s=new Xe([n]);if(vl(r)){const i=h0(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Pt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new ut(e,0,X.min(),X.min(),X.min(),wt.empty(),0)}static newFoundDocument(e,n,r,s){return new ut(e,1,n,X.min(),r,s,0)}static newNoDocument(e,n){return new ut(e,2,n,X.min(),X.min(),wt.empty(),0)}static newUnknownDocument(e,n){return new ut(e,3,n,X.min(),X.min(),wt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(X.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=X.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ut&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e,n){this.position=e,this.inclusive=n}}function Ag(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),n.key):r=ui(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Rg(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!wn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,n="asc"){this.field=e,this.dir=n}}function sA(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d0{}class Le extends d0{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new oA(e,n,r):n==="array-contains"?new uA(e,r):n==="in"?new cA(e,r):n==="not-in"?new hA(e,r):n==="array-contains-any"?new dA(e,r):new Le(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new aA(e,r):new lA(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(ui(n,this.value)):n!==null&&rs(this.value)===rs(n)&&this.matchesComparison(ui(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Y()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class rn extends d0{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new rn(e,n)}matches(e){return f0(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function f0(t){return t.op==="and"}function p0(t){return iA(t)&&f0(t)}function iA(t){for(const e of t.filters)if(e instanceof rn)return!1;return!0}function nd(t){if(t instanceof Le)return t.field.canonicalString()+t.op.toString()+ci(t.value);if(p0(t))return t.filters.map(e=>nd(e)).join(",");{const e=t.filters.map(n=>nd(n)).join(",");return`${t.op}(${e})`}}function m0(t,e){return t instanceof Le?function(r,s){return s instanceof Le&&r.op===s.op&&r.field.isEqual(s.field)&&wn(r.value,s.value)}(t,e):t instanceof rn?function(r,s){return s instanceof rn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&m0(o,s.filters[l]),!0):!1}(t,e):void Y()}function g0(t){return t instanceof Le?function(n){return`${n.field.canonicalString()} ${n.op} ${ci(n.value)}`}(t):t instanceof rn?function(n){return n.op.toString()+" {"+n.getFilters().map(g0).join(" ,")+"}"}(t):"Filter"}class oA extends Le{constructor(e,n,r){super(e,n,r),this.key=G.fromName(r.referenceValue)}matches(e){const n=G.comparator(e.key,this.key);return this.matchesComparison(n)}}class aA extends Le{constructor(e,n){super(e,"in",n),this.keys=y0("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class lA extends Le{constructor(e,n){super(e,"not-in",n),this.keys=y0("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function y0(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>G.fromName(r.referenceValue))}class uA extends Le{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ef(n)&&qo(n.arrayValue,this.value)}}class cA extends Le{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&qo(this.value.arrayValue,n)}}class hA extends Le{constructor(e,n){super(e,"not-in",n)}matches(e){if(qo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!qo(this.value.arrayValue,n)}}class dA extends Le{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ef(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>qo(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function kg(t,e=null,n=[],r=[],s=null,i=null,o=null){return new fA(t,e,n,r,s,i,o)}function Tf(t){const e=J(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>nd(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Du(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ci(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ci(r)).join(",")),e.ue=n}return e.ue}function If(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!sA(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!m0(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Rg(t.startAt,e.startAt)&&Rg(t.endAt,e.endAt)}function rd(t){return G.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function pA(t,e,n,r,s,i,o,l){return new _i(t,e,n,r,s,i,o,l)}function xf(t){return new _i(t)}function Cg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function _0(t){return t.collectionGroup!==null}function vo(t){const e=J(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Ze(Xe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Ho(i,r))}),n.has(Xe.keyField().canonicalString())||e.ce.push(new Ho(Xe.keyField(),r))}return e.ce}function gn(t){const e=J(t);return e.le||(e.le=mA(e,vo(t))),e.le}function mA(t,e){if(t.limitType==="F")return kg(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ho(s.field,i)});const n=t.endAt?new tu(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new tu(t.startAt.position,t.startAt.inclusive):null;return kg(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function sd(t,e){const n=t.filters.concat([e]);return new _i(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function id(t,e,n){return new _i(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function bu(t,e){return If(gn(t),gn(e))&&t.limitType===e.limitType}function v0(t){return`${Tf(gn(t))}|lt:${t.limitType}`}function ks(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>g0(s)).join(", ")}]`),Du(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>ci(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>ci(s)).join(",")),`Target(${r})`}(gn(t))}; limitType=${t.limitType})`}function Ou(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):G.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of vo(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,u){const h=Ag(o,l,u);return o.inclusive?h<=0:h<0}(r.startAt,vo(r),s)||r.endAt&&!function(o,l,u){const h=Ag(o,l,u);return o.inclusive?h>=0:h>0}(r.endAt,vo(r),s))}(t,e)}function gA(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function w0(t){return(e,n)=>{let r=!1;for(const s of vo(t)){const i=yA(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function yA(t,e,n){const r=t.field.isKeyField()?G.comparator(e.key,n.key):function(i,o,l){const u=o.data.field(i),h=l.data.field(i);return u!==null&&h!==null?ui(u,h):Y()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Y()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){us(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return u0(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _A=new Re(G.comparator);function Wn(){return _A}const E0=new Re(G.comparator);function io(...t){let e=E0;for(const n of t)e=e.insert(n.key,n);return e}function T0(t){let e=E0;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Hr(){return wo()}function I0(){return wo()}function wo(){return new vi(t=>t.toString(),(t,e)=>t.isEqual(e))}const vA=new Re(G.comparator),wA=new Ze(G.comparator);function se(...t){let e=wA;for(const n of t)e=e.add(n);return e}const EA=new Ze(ce);function TA(){return EA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eu(e)?"-0":e}}function x0(t){return{integerValue:""+t}}function IA(t,e){return ZS(e)?x0(e):Sf(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(){this._=void 0}}function xA(t,e,n){return t instanceof Wo?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&vf(i)&&(i=wf(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Ko?A0(t,e):t instanceof Go?R0(t,e):function(s,i){const o=S0(s,i),l=Pg(o)+Pg(s.Pe);return td(o)&&td(s.Pe)?x0(l):Sf(s.serializer,l)}(t,e)}function SA(t,e,n){return t instanceof Ko?A0(t,e):t instanceof Go?R0(t,e):n}function S0(t,e){return t instanceof nu?function(r){return td(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Wo extends Vu{}class Ko extends Vu{constructor(e){super(),this.elements=e}}function A0(t,e){const n=k0(e);for(const r of t.elements)n.some(s=>wn(s,r))||n.push(r);return{arrayValue:{values:n}}}class Go extends Vu{constructor(e){super(),this.elements=e}}function R0(t,e){let n=k0(e);for(const r of t.elements)n=n.filter(s=>!wn(s,r));return{arrayValue:{values:n}}}class nu extends Vu{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Pg(t){return Ne(t.integerValue||t.doubleValue)}function k0(t){return Ef(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AA{constructor(e,n){this.field=e,this.transform=n}}function RA(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Ko&&s instanceof Ko||r instanceof Go&&s instanceof Go?li(r.elements,s.elements,wn):r instanceof nu&&s instanceof nu?wn(r.Pe,s.Pe):r instanceof Wo&&s instanceof Wo}(t.transform,e.transform)}class kA{constructor(e,n){this.version=e,this.transformResults=n}}class Ut{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ut}static exists(e){return new Ut(void 0,e)}static updateTime(e){return new Ut(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function wl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Lu{}function C0(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Af(t.key,Ut.none()):new oa(t.key,t.data,Ut.none());{const n=t.data,r=wt.empty();let s=new Ze(Xe.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Nr(t.key,r,new Pt(s.toArray()),Ut.none())}}function CA(t,e,n){t instanceof oa?function(s,i,o){const l=s.value.clone(),u=Dg(s.fieldTransforms,i,o.transformResults);l.setAll(u),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Nr?function(s,i,o){if(!wl(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Dg(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(P0(s)),u.setAll(l),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Eo(t,e,n,r){return t instanceof oa?function(i,o,l,u){if(!wl(i.precondition,o))return l;const h=i.value.clone(),p=bg(i.fieldTransforms,u,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Nr?function(i,o,l,u){if(!wl(i.precondition,o))return l;const h=bg(i.fieldTransforms,u,o),p=o.data;return p.setAll(P0(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(y=>y.field))}(t,e,n,r):function(i,o,l){return wl(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function PA(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=S0(r.transform,s||null);i!=null&&(n===null&&(n=wt.empty()),n.set(r.field,i))}return n||null}function Ng(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&li(r,s,(i,o)=>RA(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class oa extends Lu{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Nr extends Lu{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function P0(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Dg(t,e,n){const r=new Map;fe(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,SA(o,l,n[s]))}return r}function bg(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,xA(i,o,e))}return r}class Af extends Lu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class NA extends Lu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DA{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&CA(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Eo(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Eo(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=I0();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const u=C0(o,l);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(X.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),se())}isEqual(e){return this.batchId===e.batchId&&li(this.mutations,e.mutations,(n,r)=>Ng(n,r))&&li(this.baseMutations,e.baseMutations,(n,r)=>Ng(n,r))}}class Rf{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){fe(e.mutations.length===r.length);let s=function(){return vA}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Rf(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bA{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OA{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oe,ae;function VA(t){switch(t){default:return Y();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function N0(t){if(t===void 0)return Hn("GRPC error has no .code"),M.UNKNOWN;switch(t){case Oe.OK:return M.OK;case Oe.CANCELLED:return M.CANCELLED;case Oe.UNKNOWN:return M.UNKNOWN;case Oe.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Oe.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Oe.INTERNAL:return M.INTERNAL;case Oe.UNAVAILABLE:return M.UNAVAILABLE;case Oe.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Oe.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Oe.NOT_FOUND:return M.NOT_FOUND;case Oe.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Oe.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Oe.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Oe.ABORTED:return M.ABORTED;case Oe.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Oe.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Oe.DATA_LOSS:return M.DATA_LOSS;default:return Y()}}(ae=Oe||(Oe={}))[ae.OK=0]="OK",ae[ae.CANCELLED=1]="CANCELLED",ae[ae.UNKNOWN=2]="UNKNOWN",ae[ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ae[ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ae[ae.NOT_FOUND=5]="NOT_FOUND",ae[ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",ae[ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",ae[ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",ae[ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ae[ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ae[ae.ABORTED=10]="ABORTED",ae[ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",ae[ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",ae[ae.INTERNAL=13]="INTERNAL",ae[ae.UNAVAILABLE=14]="UNAVAILABLE",ae[ae.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LA(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MA=new Gr([4294967295,4294967295],0);function Og(t){const e=LA().encode(t),n=new t0;return n.update(e),new Uint8Array(n.digest())}function Vg(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Gr([n,r],0),new Gr([s,i],0)]}class kf{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new oo(`Invalid padding: ${n}`);if(r<0)throw new oo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new oo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new oo(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Gr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Gr.fromNumber(r)));return s.compare(MA)===1&&(s=new Gr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Og(e),[r,s]=Vg(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new kf(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=Og(e),[r,s]=Vg(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class oo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,aa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Mu(X.min(),s,new Re(ce),Wn(),se())}}class aa{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new aa(r,n,se(),se(),se())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class D0{constructor(e,n){this.targetId=e,this.me=n}}class b0{constructor(e,n,r=tt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Lg{constructor(){this.fe=0,this.ge=jg(),this.pe=tt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=se(),n=se(),r=se();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:Y()}}),new aa(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=jg()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,fe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class jA{constructor(e){this.Le=e,this.Be=new Map,this.ke=Wn(),this.qe=Mg(),this.Qe=new Re(ce)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:Y()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(rd(i))if(r===0){const o=new G(i.path);this.Ue(n,o,ut.newNoDocument(o,X.min()))}else fe(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=ns(r).toUint8Array()}catch(u){if(u instanceof c0)return ai("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new kf(o,s,i)}catch(u){return ai(u instanceof oo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&rd(l.target)){const u=new G(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,ut.newNoDocument(u,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=se();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Mu(e,n,this.Qe,this.ke,r);return this.ke=Wn(),this.qe=Mg(),this.Qe=new Re(ce),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Lg,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new Ze(ce),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||K("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Lg),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Mg(){return new Re(G.comparator)}function jg(){return new Re(G.comparator)}const FA={asc:"ASCENDING",desc:"DESCENDING"},UA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},zA={and:"AND",or:"OR"};class BA{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function od(t,e){return t.useProto3Json||Du(e)?e:{value:e}}function ru(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function O0(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function $A(t,e){return ru(t,e.toTimestamp())}function yn(t){return fe(!!t),X.fromTimestamp(function(n){const r=Ar(n);return new ze(r.seconds,r.nanos)}(t))}function Cf(t,e){return ad(t,e).canonicalString()}function ad(t,e){const n=function(s){return new Ee(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function V0(t){const e=Ee.fromString(t);return fe(U0(e)),e}function ld(t,e){return Cf(t.databaseId,e.path)}function Bc(t,e){const n=V0(e);if(n.get(1)!==t.databaseId.projectId)throw new H(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new G(M0(n))}function L0(t,e){return Cf(t.databaseId,e)}function qA(t){const e=V0(t);return e.length===4?Ee.emptyPath():M0(e)}function ud(t){return new Ee(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function M0(t){return fe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Fg(t,e,n){return{name:ld(t,e),fields:n.value.mapValue.fields}}function HA(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:Y()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,p){return h.useProto3Json?(fe(p===void 0||typeof p=="string"),tt.fromBase64String(p||"")):(fe(p===void 0||p instanceof Buffer||p instanceof Uint8Array),tt.fromUint8Array(p||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const p=h.code===void 0?M.UNKNOWN:N0(h.code);return new H(p,h.message||"")}(o);n=new b0(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Bc(t,r.document.name),i=yn(r.document.updateTime),o=r.document.createTime?yn(r.document.createTime):X.min(),l=new wt({mapValue:{fields:r.document.fields}}),u=ut.newFoundDocument(s,i,o,l),h=r.targetIds||[],p=r.removedTargetIds||[];n=new El(h,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Bc(t,r.document),i=r.readTime?yn(r.readTime):X.min(),o=ut.newNoDocument(s,i),l=r.removedTargetIds||[];n=new El([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Bc(t,r.document),i=r.removedTargetIds||[];n=new El([],i,s,null)}else{if(!("filter"in e))return Y();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new OA(s,i),l=r.targetId;n=new D0(l,o)}}return n}function WA(t,e){let n;if(e instanceof oa)n={update:Fg(t,e.key,e.value)};else if(e instanceof Af)n={delete:ld(t,e.key)};else if(e instanceof Nr)n={update:Fg(t,e.key,e.data),updateMask:t1(e.fieldMask)};else{if(!(e instanceof NA))return Y();n={verify:ld(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof Wo)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ko)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Go)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof nu)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw Y()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:$A(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Y()}(t,e.precondition)),n}function KA(t,e){return t&&t.length>0?(fe(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?yn(s.updateTime):yn(i);return o.isEqual(X.min())&&(o=yn(i)),new kA(o,s.transformResults||[])}(n,e))):[]}function GA(t,e){return{documents:[L0(t,e.path)]}}function QA(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=L0(t,s);const i=function(h){if(h.length!==0)return F0(rn.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(p=>function(_){return{field:Cs(_.field),direction:JA(_.dir)}}(p))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=od(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:s}}function YA(t){let e=qA(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){fe(r===1);const p=n.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];n.where&&(i=function(y){const _=j0(y);return _ instanceof rn&&p0(_)?_.getFilters():[_]}(n.where));let o=[];n.orderBy&&(o=function(y){return y.map(_=>function(C){return new Ho(Ps(C.field),function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(_))}(n.orderBy));let l=null;n.limit&&(l=function(y){let _;return _=typeof y=="object"?y.value:y,Du(_)?null:_}(n.limit));let u=null;n.startAt&&(u=function(y){const _=!!y.before,R=y.values||[];return new tu(R,_)}(n.startAt));let h=null;return n.endAt&&(h=function(y){const _=!y.before,R=y.values||[];return new tu(R,_)}(n.endAt)),pA(e,s,o,i,l,"F",u,h)}function XA(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Y()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function j0(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Ps(n.unaryFilter.field);return Le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ps(n.unaryFilter.field);return Le.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ps(n.unaryFilter.field);return Le.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ps(n.unaryFilter.field);return Le.create(o,"!=",{nullValue:"NULL_VALUE"});default:return Y()}}(t):t.fieldFilter!==void 0?function(n){return Le.create(Ps(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Y()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return rn.create(n.compositeFilter.filters.map(r=>j0(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Y()}}(n.compositeFilter.op))}(t):Y()}function JA(t){return FA[t]}function ZA(t){return UA[t]}function e1(t){return zA[t]}function Cs(t){return{fieldPath:t.canonicalString()}}function Ps(t){return Xe.fromServerFormat(t.fieldPath)}function F0(t){return t instanceof Le?function(n){if(n.op==="=="){if(Sg(n.value))return{unaryFilter:{field:Cs(n.field),op:"IS_NAN"}};if(xg(n.value))return{unaryFilter:{field:Cs(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Sg(n.value))return{unaryFilter:{field:Cs(n.field),op:"IS_NOT_NAN"}};if(xg(n.value))return{unaryFilter:{field:Cs(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Cs(n.field),op:ZA(n.op),value:n.value}}}(t):t instanceof rn?function(n){const r=n.getFilters().map(s=>F0(s));return r.length===1?r[0]:{compositeFilter:{op:e1(n.op),filters:r}}}(t):Y()}function t1(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function U0(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e,n,r,s,i=X.min(),o=X.min(),l=tt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new cr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new cr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new cr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new cr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n1{constructor(e){this.ct=e}}function r1(t){const e=YA({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?id(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s1{constructor(){this.un=new i1}addToCollectionParentIndex(e,n){return this.un.add(n),j.resolve()}getCollectionParents(e,n){return j.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return j.resolve()}deleteFieldIndex(e,n){return j.resolve()}deleteAllFieldIndexes(e){return j.resolve()}createTargetIndexes(e,n){return j.resolve()}getDocumentsMatchingTarget(e,n){return j.resolve(null)}getIndexType(e,n){return j.resolve(0)}getFieldIndexes(e,n){return j.resolve([])}getNextCollectionGroupToUpdate(e){return j.resolve(null)}getMinOffset(e,n){return j.resolve(Sr.min())}getMinOffsetFromCollectionGroup(e,n){return j.resolve(Sr.min())}updateCollectionGroup(e,n,r){return j.resolve()}updateIndexEntries(e,n){return j.resolve()}}class i1{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Ze(Ee.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ze(Ee.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new hi(0)}static kn(){return new hi(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o1{constructor(){this.changes=new vi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ut.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?j.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a1{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l1{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Eo(r.mutation,s,Pt.empty(),ze.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,n,r=se()){const s=Hr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=io();return i.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Hr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,se()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=Wn();const o=wo(),l=function(){return wo()}();return n.forEach((u,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof Nr)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),Eo(p.mutation,h,p.mutation.getFieldMask(),ze.now())):o.set(h.key,Pt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,p)=>o.set(h,p)),n.forEach((h,p)=>{var y;return l.set(h,new a1(p,(y=o.get(h))!==null&&y!==void 0?y:null))}),l))}recalculateAndSaveOverlays(e,n){const r=wo();let s=new Re((o,l)=>o-l),i=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let p=r.get(u)||Pt.empty();p=l.applyToLocalView(h,p),r.set(u,p);const y=(s.get(l.batchId)||se()).add(u);s=s.insert(l.batchId,y)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,p=u.value,y=I0();p.forEach(_=>{if(!i.has(_)){const R=C0(n.get(_),r.get(_));R!==null&&y.set(_,R),i=i.add(_)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,y))}return j.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return G.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):_0(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):j.resolve(Hr());let l=-1,u=i;return o.next(h=>j.forEach(h,(p,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),i.get(p)?j.resolve():this.remoteDocumentCache.getEntry(e,p).next(_=>{u=u.insert(p,_)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,se())).next(p=>({batchId:l,changes:T0(p)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new G(n)).next(r=>{let s=io();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=io();return this.indexManager.getCollectionParents(e,i).next(l=>j.forEach(l,u=>{const h=function(y,_){return new _i(_,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(p=>{p.forEach((y,_)=>{o=o.insert(y,_)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((u,h)=>{const p=h.getKey();o.get(p)===null&&(o=o.insert(p,ut.newInvalidDocument(p)))});let l=io();return o.forEach((u,h)=>{const p=i.get(u);p!==void 0&&Eo(p.mutation,h,Pt.empty(),ze.now()),Ou(n,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u1{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return j.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:yn(s.createTime)}}(n)),j.resolve()}getNamedQuery(e,n){return j.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:r1(s.bundledQuery),readTime:yn(s.readTime)}}(n)),j.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c1{constructor(){this.overlays=new Re(G.comparator),this.Ir=new Map}getOverlay(e,n){return j.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Hr();return j.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),j.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),j.resolve()}getOverlaysForCollection(e,n,r){const s=Hr(),i=n.length+1,o=new G(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return j.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Re((h,p)=>h-p);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=Hr(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const l=Hr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,p)=>l.set(h,p)),!(l.size()>=s)););return j.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new bA(n,r));let i=this.Ir.get(n);i===void 0&&(i=se(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h1{constructor(){this.sessionToken=tt.EMPTY_BYTE_STRING}getSessionToken(e){return j.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,j.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(){this.Tr=new Ze(qe.Er),this.dr=new Ze(qe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new qe(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new qe(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new G(new Ee([])),r=new qe(n,e),s=new qe(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new G(new Ee([])),r=new qe(n,e),s=new qe(n,e+1);let i=se();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new qe(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class qe{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return G.comparator(e.key,n.key)||ce(e.wr,n.wr)}static Ar(e,n){return ce(e.wr,n.wr)||G.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d1{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new Ze(qe.Er)}checkEmpty(e){return j.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new DA(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new qe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return j.resolve(o)}lookupMutationBatch(e,n){return j.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return j.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return j.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return j.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new qe(n,0),s=new qe(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),j.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Ze(ce);return n.forEach(s=>{const i=new qe(s,0),o=new qe(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),j.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;G.isDocumentKey(i)||(i=i.child(""));const o=new qe(new G(i),0);let l=new Ze(ce);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(u.wr)),!0)},o),j.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){fe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return j.forEach(n.mutations,s=>{const i=new qe(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new qe(n,0),s=this.br.firstAfterOrEqual(r);return j.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,j.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f1{constructor(e){this.Mr=e,this.docs=function(){return new Re(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return j.resolve(r?r.document.mutableCopy():ut.newInvalidDocument(n))}getEntries(e,n){let r=Wn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ut.newInvalidDocument(s))}),j.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Wn();const o=n.path,l=new G(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:p}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||QS(GS(p),r)<=0||(s.has(p.key)||Ou(n,p))&&(i=i.insert(p.key,p.mutableCopy()))}return j.resolve(i)}getAllFromCollectionGroup(e,n,r,s){Y()}Or(e,n){return j.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new p1(this)}getSize(e){return j.resolve(this.size)}}class p1 extends o1{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),j.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m1{constructor(e){this.persistence=e,this.Nr=new vi(n=>Tf(n),If),this.lastRemoteSnapshotVersion=X.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Pf,this.targetCount=0,this.kr=hi.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),j.resolve()}getLastRemoteSnapshotVersion(e){return j.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return j.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),j.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),j.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new hi(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,j.resolve()}updateTargetData(e,n){return this.Kn(n),j.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,j.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),j.waitFor(i).next(()=>s)}getTargetCount(e){return j.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return j.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),j.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),j.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),j.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return j.resolve(r)}containsKey(e,n){return j.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g1{constructor(e,n){this.qr={},this.overlays={},this.Qr=new _f(0),this.Kr=!1,this.Kr=!0,this.$r=new h1,this.referenceDelegate=e(this),this.Ur=new m1(this),this.indexManager=new s1,this.remoteDocumentCache=function(s){return new f1(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new n1(n),this.Gr=new u1(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new c1,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new d1(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){K("MemoryPersistence","Starting transaction:",e);const s=new y1(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return j.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class y1 extends XS{constructor(e){super(),this.currentSequenceNumber=e}}class Nf{constructor(e){this.persistence=e,this.Jr=new Pf,this.Yr=null}static Zr(e){return new Nf(e)}get Xr(){if(this.Yr)return this.Yr;throw Y()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),j.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),j.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),j.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return j.forEach(this.Xr,r=>{const s=G.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,X.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return j.or([()=>j.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=se(),s=se();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Df(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _1{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v1{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return vx()?8:JS(ht())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new _1;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(Ki()<=ie.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",ks(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),j.resolve()):(Ki()<=ie.DEBUG&&K("QueryEngine","Query:",ks(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Ki()<=ie.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",ks(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,gn(n))):j.resolve())}Yi(e,n){if(Cg(n))return j.resolve(null);let r=gn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=id(n,null,"F"),r=gn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=se(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(n,l);return this.ns(n,h,o,u.readTime)?this.Yi(e,id(n,null,"F")):this.rs(e,h,n,u)}))})))}Zi(e,n,r,s){return Cg(n)||s.isEqual(X.min())?j.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?j.resolve(null):(Ki()<=ie.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ks(n)),this.rs(e,o,n,KS(s,-1)).next(l=>l))})}ts(e,n){let r=new Ze(w0(e));return n.forEach((s,i)=>{Ou(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return Ki()<=ie.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",ks(n)),this.Ji.getDocumentsMatchingQuery(e,n,Sr.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w1{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new Re(ce),this._s=new vi(i=>Tf(i),If),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new l1(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function E1(t,e,n,r){return new w1(t,e,n,r)}async function z0(t,e){const n=J(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let u=se();for(const h of s){o.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}for(const h of i){l.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}return n.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function T1(t,e){const n=J(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,p){const y=h.batch,_=y.keys();let R=j.resolve();return _.forEach(C=>{R=R.next(()=>p.getEntry(u,C)).next(V=>{const L=h.docVersions.get(C);fe(L!==null),V.version.compareTo(L)<0&&(y.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),p.addEntry(V)))})}),R.next(()=>l.mutationQueue.removeMutationBatch(u,y))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=se();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function B0(t){const e=J(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function I1(t,e){const n=J(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((p,y)=>{const _=s.get(y);if(!_)return;l.push(n.Ur.removeMatchingKeys(i,p.removedDocuments,y).next(()=>n.Ur.addMatchingKeys(i,p.addedDocuments,y)));let R=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(y)!==null?R=R.withResumeToken(tt.EMPTY_BYTE_STRING,X.min()).withLastLimboFreeSnapshotVersion(X.min()):p.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(p.resumeToken,r)),s=s.insert(y,R),function(V,L,x){return V.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(_,R,p)&&l.push(n.Ur.updateTargetData(i,R))});let u=Wn(),h=se();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,p))}),l.push(x1(i,o,e.documentUpdates).next(p=>{u=p.Ps,h=p.Is})),!r.isEqual(X.min())){const p=n.Ur.getLastRemoteSnapshotVersion(i).next(y=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(p)}return j.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(n.os=s,i))}function x1(t,e,n){let r=se(),s=se();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Wn();return n.forEach((l,u)=>{const h=i.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(X.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):K("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ps:o,Is:s}})}function S1(t,e){const n=J(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function A1(t,e){const n=J(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,j.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new cr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function cd(t,e,n){const r=J(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!ia(o))throw o;K("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function Ug(t,e,n){const r=J(t);let s=X.min(),i=se();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,p){const y=J(u),_=y._s.get(p);return _!==void 0?j.resolve(y.os.get(_)):y.Ur.getTargetData(h,p)}(r,o,gn(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:X.min(),n?i:se())).next(l=>(R1(r,gA(e),l),{documents:l,Ts:i})))}function R1(t,e,n){let r=t.us.get(e)||X.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class zg{constructor(){this.activeTargetIds=TA()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class k1{constructor(){this.so=new zg,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new zg,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C1{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){K("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){K("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tl=null;function $c(){return tl===null?tl=function(){return 268435456+Math.round(2147483648*Math.random())}():tl++,"0x"+tl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P1={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N1{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="WebChannelConnection";class D1 extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=$c(),u=this.xo(n,r.toUriEncodedString());K("RestConnection",`Sending RPC '${n}' ${l}:`,u,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(n,u,h,s).then(p=>(K("RestConnection",`Received RPC '${n}' ${l}: `,p),p),p=>{throw ai("RestConnection",`RPC '${n}' ${l} failed with error: `,p,"url: ",u,"request:",s),p})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+yi}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=P1[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=$c();return new Promise((o,l)=>{const u=new n0;u.setWithCredentials(!0),u.listenOnce(r0.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case _l.NO_ERROR:const p=u.getResponseJson();K(ot,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),o(p);break;case _l.TIMEOUT:K(ot,`RPC '${e}' ${i} timed out`),l(new H(M.DEADLINE_EXCEEDED,"Request time out"));break;case _l.HTTP_ERROR:const y=u.getStatus();if(K(ot,`RPC '${e}' ${i} failed with status:`,y,"response text:",u.getResponseText()),y>0){let _=u.getResponseJson();Array.isArray(_)&&(_=_[0]);const R=_==null?void 0:_.error;if(R&&R.status&&R.message){const C=function(L){const x=L.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(x)>=0?x:M.UNKNOWN}(R.status);l(new H(C,R.message))}else l(new H(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new H(M.UNAVAILABLE,"Connection failed."));break;default:Y()}}finally{K(ot,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);K(ot,`RPC '${e}' ${i} sending request:`,s),u.send(n,"POST",h,r,15)})}Bo(e,n,r){const s=$c(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=o0(),l=i0(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const p=i.join("");K(ot,`Creating RPC '${e}' stream ${s}: ${p}`,u);const y=o.createWebChannel(p,u);let _=!1,R=!1;const C=new N1({Io:L=>{R?K(ot,`Not sending because RPC '${e}' stream ${s} is closed:`,L):(_||(K(ot,`Opening RPC '${e}' stream ${s} transport.`),y.open(),_=!0),K(ot,`RPC '${e}' stream ${s} sending:`,L),y.send(L))},To:()=>y.close()}),V=(L,x,E)=>{L.listen(x,S=>{try{E(S)}catch(O){setTimeout(()=>{throw O},0)}})};return V(y,so.EventType.OPEN,()=>{R||(K(ot,`RPC '${e}' stream ${s} transport opened.`),C.yo())}),V(y,so.EventType.CLOSE,()=>{R||(R=!0,K(ot,`RPC '${e}' stream ${s} transport closed`),C.So())}),V(y,so.EventType.ERROR,L=>{R||(R=!0,ai(ot,`RPC '${e}' stream ${s} transport errored:`,L),C.So(new H(M.UNAVAILABLE,"The operation could not be completed")))}),V(y,so.EventType.MESSAGE,L=>{var x;if(!R){const E=L.data[0];fe(!!E);const S=E,O=S.error||((x=S[0])===null||x===void 0?void 0:x.error);if(O){K(ot,`RPC '${e}' stream ${s} received error:`,O);const B=O.status;let z=function(w){const T=Oe[w];if(T!==void 0)return N0(T)}(B),v=O.message;z===void 0&&(z=M.INTERNAL,v="Unknown error status: "+B+" with message "+O.message),R=!0,C.So(new H(z,v)),y.close()}else K(ot,`RPC '${e}' stream ${s} received:`,E),C.bo(E)}}),V(l,s0.STAT_EVENT,L=>{L.stat===Zh.PROXY?K(ot,`RPC '${e}' stream ${s} detected buffering proxy`):L.stat===Zh.NOPROXY&&K(ot,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.wo()},0),C}}function qc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ju(t){return new BA(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $0{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q0{constructor(e,n,r,s,i,o,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new $0(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(Hn(n.toString()),Hn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new H(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return K("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(K("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class b1 extends q0{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=HA(this.serializer,e),r=function(i){if(!("targetChange"in i))return X.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?X.min():o.readTime?yn(o.readTime):X.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=ud(this.serializer),n.addTarget=function(i,o){let l;const u=o.target;if(l=rd(u)?{documents:GA(i,u)}:{query:QA(i,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=O0(i,o.resumeToken);const h=od(i,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(X.min())>0){l.readTime=ru(i,o.snapshotVersion.toTimestamp());const h=od(i,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=XA(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=ud(this.serializer),n.removeTarget=e,this.a_(n)}}class O1 extends q0{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return fe(!!e.streamToken),this.lastStreamToken=e.streamToken,fe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){fe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=KA(e.writeResults,e.commitTime),r=yn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=ud(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>WA(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V1 extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new H(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,ad(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new H(M.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,ad(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new H(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class L1{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Hn(n),this.D_=!1):K("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M1{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{cs(this)&&(K("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=J(u);h.L_.add(4),await la(h),h.q_.set("Unknown"),h.L_.delete(4),await Fu(h)}(this))})}),this.q_=new L1(r,s)}}async function Fu(t){if(cs(t))for(const e of t.B_)await e(!0)}async function la(t){for(const e of t.B_)await e(!1)}function H0(t,e){const n=J(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Lf(n)?Vf(n):wi(n).r_()&&Of(n,e))}function bf(t,e){const n=J(t),r=wi(n);n.N_.delete(e),r.r_()&&W0(n,e),n.N_.size===0&&(r.r_()?r.o_():cs(n)&&n.q_.set("Unknown"))}function Of(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(X.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}wi(t).A_(e)}function W0(t,e){t.Q_.xe(e),wi(t).R_(e)}function Vf(t){t.Q_=new jA({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),wi(t).start(),t.q_.v_()}function Lf(t){return cs(t)&&!wi(t).n_()&&t.N_.size>0}function cs(t){return J(t).L_.size===0}function K0(t){t.Q_=void 0}async function j1(t){t.q_.set("Online")}async function F1(t){t.N_.forEach((e,n)=>{Of(t,e)})}async function U1(t,e){K0(t),Lf(t)?(t.q_.M_(e),Vf(t)):t.q_.set("Unknown")}async function z1(t,e,n){if(t.q_.set("Online"),e instanceof b0&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){K("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await su(t,r)}else if(e instanceof El?t.Q_.Ke(e):e instanceof D0?t.Q_.He(e):t.Q_.We(e),!n.isEqual(X.min()))try{const r=await B0(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const p=i.N_.get(h);p&&i.N_.set(h,p.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,h)=>{const p=i.N_.get(u);if(!p)return;i.N_.set(u,p.withResumeToken(tt.EMPTY_BYTE_STRING,p.snapshotVersion)),W0(i,u);const y=new cr(p.target,u,h,p.sequenceNumber);Of(i,y)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){K("RemoteStore","Failed to raise snapshot:",r),await su(t,r)}}async function su(t,e,n){if(!ia(e))throw e;t.L_.add(1),await la(t),t.q_.set("Offline"),n||(n=()=>B0(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{K("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await Fu(t)})}function G0(t,e){return e().catch(n=>su(t,n,e))}async function Uu(t){const e=J(t),n=Rr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;B1(e);)try{const s=await S1(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,$1(e,s)}catch(s){await su(e,s)}Q0(e)&&Y0(e)}function B1(t){return cs(t)&&t.O_.length<10}function $1(t,e){t.O_.push(e);const n=Rr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function Q0(t){return cs(t)&&!Rr(t).n_()&&t.O_.length>0}function Y0(t){Rr(t).start()}async function q1(t){Rr(t).p_()}async function H1(t){const e=Rr(t);for(const n of t.O_)e.m_(n.mutations)}async function W1(t,e,n){const r=t.O_.shift(),s=Rf.from(r,e,n);await G0(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Uu(t)}async function K1(t,e){e&&Rr(t).V_&&await async function(r,s){if(function(o){return VA(o)&&o!==M.ABORTED}(s.code)){const i=r.O_.shift();Rr(r).s_(),await G0(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Uu(r)}}(t,e),Q0(t)&&Y0(t)}async function $g(t,e){const n=J(t);n.asyncQueue.verifyOperationInProgress(),K("RemoteStore","RemoteStore received new credentials");const r=cs(n);n.L_.add(3),await la(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await Fu(n)}async function G1(t,e){const n=J(t);e?(n.L_.delete(2),await Fu(n)):e||(n.L_.add(2),await la(n),n.q_.set("Unknown"))}function wi(t){return t.K_||(t.K_=function(n,r,s){const i=J(n);return i.w_(),new b1(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:j1.bind(null,t),Ro:F1.bind(null,t),mo:U1.bind(null,t),d_:z1.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Lf(t)?Vf(t):t.q_.set("Unknown")):(await t.K_.stop(),K0(t))})),t.K_}function Rr(t){return t.U_||(t.U_=function(n,r,s){const i=J(n);return i.w_(),new O1(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:q1.bind(null,t),mo:K1.bind(null,t),f_:H1.bind(null,t),g_:W1.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Uu(t)):(await t.U_.stop(),t.O_.length>0&&(K("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new jn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new Mf(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function jf(t,e){if(Hn("AsyncQueue",`${e}: ${t}`),ia(t))return new H(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e){this.comparator=e?(n,r)=>e(n,r)||G.comparator(n.key,r.key):(n,r)=>G.comparator(n.key,r.key),this.keyedMap=io(),this.sortedSet=new Re(this.comparator)}static emptySet(e){return new Ys(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ys)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Ys;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(){this.W_=new Re(G.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):Y():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class di{constructor(e,n,r,s,i,o,l,u,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new di(e,n,Ys.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&bu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q1{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class Y1{constructor(){this.queries=Hg(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=J(n),i=s.queries;s.queries=Hg(),i.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new H(M.ABORTED,"Firestore shutting down"))}}function Hg(){return new vi(t=>v0(t),bu)}async function X0(t,e){const n=J(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new Q1,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=jf(o,`Initialization of query '${ks(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&Ff(n)}async function J0(t,e){const n=J(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function X1(t,e){const n=J(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&Ff(n)}function J1(t,e,n){const r=J(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function Ff(t){t.Y_.forEach(e=>{e.next()})}var hd,Wg;(Wg=hd||(hd={})).ea="default",Wg.Cache="cache";class Z0{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new di(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=di.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==hd.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e){this.key=e}}class tw{constructor(e){this.key=e}}class Z1{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=se(),this.mutatedKeys=se(),this.Aa=w0(e),this.Ra=new Ys(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new qg,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,y)=>{const _=s.get(p),R=Ou(this.query,y)?y:null,C=!!_&&this.mutatedKeys.has(_.key),V=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let L=!1;_&&R?_.data.isEqual(R.data)?C!==V&&(r.track({type:3,doc:R}),L=!0):this.ga(_,R)||(r.track({type:2,doc:R}),L=!0,(u&&this.Aa(R,u)>0||h&&this.Aa(R,h)<0)&&(l=!0)):!_&&R?(r.track({type:0,doc:R}),L=!0):_&&!R&&(r.track({type:1,doc:_}),L=!0,(u||h)&&(l=!0)),L&&(R?(o=o.add(R),i=V?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((p,y)=>function(R,C){const V=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Y()}};return V(R)-V(C)}(p.type,y.type)||this.Aa(p.doc,y.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,h=u!==this.Ea;return this.Ea=u,o.length!==0||h?{snapshot:new di(this.query,e.Ra,i,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new qg,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=se(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new tw(r))}),this.da.forEach(r=>{e.has(r)||n.push(new ew(r))}),n}ba(e){this.Ta=e.Ts,this.da=se();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return di.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class eR{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class tR{constructor(e){this.key=e,this.va=!1}}class nR{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new vi(l=>v0(l),bu),this.Ma=new Map,this.xa=new Set,this.Oa=new Re(G.comparator),this.Na=new Map,this.La=new Pf,this.Ba={},this.ka=new Map,this.qa=hi.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function rR(t,e,n=!0){const r=aw(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await nw(r,e,n,!0),s}async function sR(t,e){const n=aw(t);await nw(n,e,!0,!1)}async function nw(t,e,n,r){const s=await A1(t.localStore,gn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await iR(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&H0(t.remoteStore,s),l}async function iR(t,e,n,r,s){t.Ka=(y,_,R)=>async function(V,L,x,E){let S=L.view.ma(x);S.ns&&(S=await Ug(V.localStore,L.query,!1).then(({documents:v})=>L.view.ma(v,S)));const O=E&&E.targetChanges.get(L.targetId),B=E&&E.targetMismatches.get(L.targetId)!=null,z=L.view.applyChanges(S,V.isPrimaryClient,O,B);return Gg(V,L.targetId,z.wa),z.snapshot}(t,y,_,R);const i=await Ug(t.localStore,e,!0),o=new Z1(e,i.Ts),l=o.ma(i.documents),u=aa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(l,t.isPrimaryClient,u);Gg(t,n,h.wa);const p=new eR(e,n,o);return t.Fa.set(e,p),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function oR(t,e,n){const r=J(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!bu(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await cd(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&bf(r.remoteStore,s.targetId),dd(r,s.targetId)}).catch(sa)):(dd(r,s.targetId),await cd(r.localStore,s.targetId,!0))}async function aR(t,e){const n=J(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),bf(n.remoteStore,r.targetId))}async function lR(t,e,n){const r=mR(t);try{const s=await function(o,l){const u=J(o),h=ze.now(),p=l.reduce((R,C)=>R.add(C.key),se());let y,_;return u.persistence.runTransaction("Locally write mutations","readwrite",R=>{let C=Wn(),V=se();return u.cs.getEntries(R,p).next(L=>{C=L,C.forEach((x,E)=>{E.isValidDocument()||(V=V.add(x))})}).next(()=>u.localDocuments.getOverlayedDocuments(R,C)).next(L=>{y=L;const x=[];for(const E of l){const S=PA(E,y.get(E.key).overlayedDocument);S!=null&&x.push(new Nr(E.key,S,h0(S.value.mapValue),Ut.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,x,l)}).next(L=>{_=L;const x=L.applyToLocalDocumentSet(y,V);return u.documentOverlayCache.saveOverlays(R,L.batchId,x)})}).then(()=>({batchId:_.batchId,changes:T0(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,u){let h=o.Ba[o.currentUser.toKey()];h||(h=new Re(ce)),h=h.insert(l,u),o.Ba[o.currentUser.toKey()]=h}(r,s.batchId,n),await ua(r,s.changes),await Uu(r.remoteStore)}catch(s){const i=jf(s,"Failed to persist write");n.reject(i)}}async function rw(t,e){const n=J(t);try{const r=await I1(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(fe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?fe(o.va):s.removedDocuments.size>0&&(fe(o.va),o.va=!1))}),await ua(n,r,e)}catch(r){await sa(r)}}function Kg(t,e,n){const r=J(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const u=J(o);u.onlineState=l;let h=!1;u.queries.forEach((p,y)=>{for(const _ of y.j_)_.Z_(l)&&(h=!0)}),h&&Ff(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function uR(t,e,n){const r=J(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new Re(G.comparator);o=o.insert(i,ut.newNoDocument(i,X.min()));const l=se().add(i),u=new Mu(X.min(),new Map,new Re(ce),o,l);await rw(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),Uf(r)}else await cd(r.localStore,e,!1).then(()=>dd(r,e,n)).catch(sa)}async function cR(t,e){const n=J(t),r=e.batch.batchId;try{const s=await T1(n.localStore,e);iw(n,r,null),sw(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await ua(n,s)}catch(s){await sa(s)}}async function hR(t,e,n){const r=J(t);try{const s=await function(o,l){const u=J(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return u.mutationQueue.lookupMutationBatch(h,l).next(y=>(fe(y!==null),p=y.keys(),u.mutationQueue.removeMutationBatch(h,y))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,p,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>u.localDocuments.getDocuments(h,p))})}(r.localStore,e);iw(r,e,n),sw(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await ua(r,s)}catch(s){await sa(s)}}function sw(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function iw(t,e,n){const r=J(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function dd(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||ow(t,r)})}function ow(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(bf(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Uf(t))}function Gg(t,e,n){for(const r of n)r instanceof ew?(t.La.addReference(r.key,e),dR(t,r)):r instanceof tw?(K("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||ow(t,r.key)):Y()}function dR(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(K("SyncEngine","New document in limbo: "+n),t.xa.add(r),Uf(t))}function Uf(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new G(Ee.fromString(e)),r=t.qa.next();t.Na.set(r,new tR(n)),t.Oa=t.Oa.insert(n,r),H0(t.remoteStore,new cr(gn(xf(n.path)),r,"TargetPurposeLimboResolution",_f.oe))}}async function ua(t,e,n){const r=J(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(h=>{var p;if((h||n)&&r.isPrimaryClient){const y=h?!h.fromCache:(p=n==null?void 0:n.targetChanges.get(u.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,y?"current":"not-current")}if(h){s.push(h);const y=Df.Wi(u.targetId,h);i.push(y)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(u,h){const p=J(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>j.forEach(h,_=>j.forEach(_.$i,R=>p.persistence.referenceDelegate.addReference(y,_.targetId,R)).next(()=>j.forEach(_.Ui,R=>p.persistence.referenceDelegate.removeReference(y,_.targetId,R)))))}catch(y){if(!ia(y))throw y;K("LocalStore","Failed to update sequence numbers: "+y)}for(const y of h){const _=y.targetId;if(!y.fromCache){const R=p.os.get(_),C=R.snapshotVersion,V=R.withLastLimboFreeSnapshotVersion(C);p.os=p.os.insert(_,V)}}}(r.localStore,i))}async function fR(t,e){const n=J(t);if(!n.currentUser.isEqual(e)){K("SyncEngine","User change. New user:",e.toKey());const r=await z0(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new H(M.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ua(n,r.hs)}}function pR(t,e){const n=J(t),r=n.Na.get(e);if(r&&r.va)return se().add(r.key);{let s=se();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function aw(t){const e=J(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=rw.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=pR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=uR.bind(null,e),e.Ca.d_=X1.bind(null,e.eventManager),e.Ca.$a=J1.bind(null,e.eventManager),e}function mR(t){const e=J(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=hR.bind(null,e),e}class iu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ju(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return E1(this.persistence,new v1,e.initialUser,this.serializer)}Ga(e){return new g1(Nf.Zr,this.serializer)}Wa(e){return new k1}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}iu.provider={build:()=>new iu};class fd{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Kg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=fR.bind(null,this.syncEngine),await G1(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Y1}()}createDatastore(e){const n=ju(e.databaseInfo.databaseId),r=function(i){return new D1(i)}(e.databaseInfo);return function(i,o,l,u){return new V1(i,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new M1(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Kg(this.syncEngine,n,0),function(){return Bg.D()?new Bg:new C1}())}createSyncEngine(e,n){return function(s,i,o,l,u,h,p){const y=new nR(s,i,o,l,u,h);return p&&(y.Qa=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=J(s);K("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await la(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}fd.provider={build:()=>new fd};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Hn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gR{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=at.UNAUTHENTICATED,this.clientId=l0.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{K("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(K("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new jn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=jf(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Hc(t,e){t.asyncQueue.verifyOperationInProgress(),K("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await z0(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Qg(t,e){t.asyncQueue.verifyOperationInProgress();const n=await yR(t);K("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>$g(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>$g(e.remoteStore,s)),t._onlineComponents=e}async function yR(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){K("FirestoreClient","Using user provided OfflineComponentProvider");try{await Hc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;ai("Error using user provided cache. Falling back to memory cache: "+n),await Hc(t,new iu)}}else K("FirestoreClient","Using default OfflineComponentProvider"),await Hc(t,new iu);return t._offlineComponents}async function uw(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(K("FirestoreClient","Using user provided OnlineComponentProvider"),await Qg(t,t._uninitializedComponentsProvider._online)):(K("FirestoreClient","Using default OnlineComponentProvider"),await Qg(t,new fd))),t._onlineComponents}function _R(t){return uw(t).then(e=>e.syncEngine)}async function cw(t){const e=await uw(t),n=e.eventManager;return n.onListen=rR.bind(null,e.syncEngine),n.onUnlisten=oR.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=sR.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=aR.bind(null,e.syncEngine),n}function vR(t,e,n={}){const r=new jn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,h){const p=new lw({next:_=>{p.Za(),o.enqueueAndForget(()=>J0(i,y));const R=_.docs.has(l);!R&&_.fromCache?h.reject(new H(M.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&_.fromCache&&u&&u.source==="server"?h.reject(new H(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),y=new Z0(xf(l.path),p,{includeMetadataChanges:!0,_a:!0});return X0(i,y)}(await cw(t),t.asyncQueue,e,n,r)),r.promise}function wR(t,e,n={}){const r=new jn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,h){const p=new lw({next:_=>{p.Za(),o.enqueueAndForget(()=>J0(i,y)),_.fromCache&&u.source==="server"?h.reject(new H(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),y=new Z0(l,p,{includeMetadataChanges:!0,_a:!0});return X0(i,y)}(await cw(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hw(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dw(t,e,n){if(!n)throw new H(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function ER(t,e,n,r){if(e===!0&&r===!0)throw new H(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Xg(t){if(!G.isDocumentKey(t))throw new H(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Jg(t){if(G.isDocumentKey(t))throw new H(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function zu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Y()}function sn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=zu(t);throw new H(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new H(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new H(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ER("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=hw((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new H(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new H(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new H(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Bu{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zg({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new H(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new H(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zg(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new jS;switch(r.type){case"firstParty":return new BS(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new H(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Yg.get(n);r&&(K("ComponentProvider","Removing Datastore"),Yg.delete(n),r.terminate())}(this),Promise.resolve()}}function TR(t,e,n,r={}){var s;const i=(t=sn(t,Bu))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&ai("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=at.MOCK_USER;else{l=Qv(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new H(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new at(h)}t._authCredentials=new FS(new a0(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new hs(this.firestore,e,this._query)}}class gt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Er(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new gt(this.firestore,e,this._key)}}class Er extends hs{constructor(e,n,r){super(e,n,xf(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new gt(this.firestore,null,new G(e))}withConverter(e){return new Er(this.firestore,e,this._path)}}function un(t,e,...n){if(t=Be(t),dw("collection","path",e),t instanceof Bu){const r=Ee.fromString(e,...n);return Jg(r),new Er(t,null,r)}{if(!(t instanceof gt||t instanceof Er))throw new H(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ee.fromString(e,...n));return Jg(r),new Er(t.firestore,null,r)}}function Qt(t,e,...n){if(t=Be(t),arguments.length===1&&(e=l0.newId()),dw("doc","path",e),t instanceof Bu){const r=Ee.fromString(e,...n);return Xg(r),new gt(t,null,new G(r))}{if(!(t instanceof gt||t instanceof Er))throw new H(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ee.fromString(e,...n));return Xg(r),new gt(t.firestore,t instanceof Er?t.converter:null,new G(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new $0(this,"async_queue_retry"),this.Vu=()=>{const r=qc();r&&K("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=qc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=qc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new jn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ia(e))throw e;K("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Hn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=Mf.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&Y()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class ds extends Bu{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new ey,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ey(e),this._firestoreClient=void 0,await e}}}function IR(t,e){const n=typeof t=="object"?t:gf(),r=typeof t=="string"?t:"(default)",s=Nu(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Wv("firestore");i&&TR(s,...i)}return s}function zf(t){if(t._terminated)throw new H(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||xR(t),t._firestoreClient}function xR(t){var e,n,r;const s=t._freezeSettings(),i=function(l,u,h,p){return new tA(l,u,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,hw(p.experimentalLongPollingOptions),p.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new gR(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e){this._byteString=e}static fromBase64String(e){try{return new fi(tt.fromBase64String(e))}catch(n){throw new H(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new fi(tt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new H(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Xe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new H(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new H(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ce(this._lat,e._lat)||ce(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SR=/^__.*__$/;class AR{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Nr(e,this.data,this.fieldMask,n,this.fieldTransforms):new oa(e,this.data,n,this.fieldTransforms)}}class fw{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Nr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function pw(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Y()}}class qf{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new qf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return ou(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(pw(this.Cu)&&SR.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class RR{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||ju(e)}Qu(e,n,r,s=!1){return new qf({Cu:e,methodName:n,qu:r,path:Xe.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Hu(t){const e=t._freezeSettings(),n=ju(t._databaseId);return new RR(t._databaseId,!!e.ignoreUndefinedProperties,n)}function mw(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);Wf("Data must be an object, but it was:",o,r);const l=gw(r,o);let u,h;if(i.merge)u=new Pt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const y of i.mergeFields){const _=pd(e,y,n);if(!o.contains(_))throw new H(M.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);_w(p,_)||p.push(_)}u=new Pt(p),h=o.fieldTransforms.filter(y=>u.covers(y.field))}else u=null,h=o.fieldTransforms;return new AR(new wt(l),u,h)}class Wu extends qu{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Wu}}class Hf extends qu{_toFieldTransform(e){return new AA(e.path,new Wo)}isEqual(e){return e instanceof Hf}}function kR(t,e,n,r){const s=t.Qu(1,e,n);Wf("Data must be an object, but it was:",s,r);const i=[],o=wt.empty();us(r,(u,h)=>{const p=Kf(e,u,n);h=Be(h);const y=s.Nu(p);if(h instanceof Wu)i.push(p);else{const _=ca(h,y);_!=null&&(i.push(p),o.set(p,_))}});const l=new Pt(i);return new fw(o,l,s.fieldTransforms)}function CR(t,e,n,r,s,i){const o=t.Qu(1,e,n),l=[pd(e,r,n)],u=[s];if(i.length%2!=0)throw new H(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)l.push(pd(e,i[_])),u.push(i[_+1]);const h=[],p=wt.empty();for(let _=l.length-1;_>=0;--_)if(!_w(h,l[_])){const R=l[_];let C=u[_];C=Be(C);const V=o.Nu(R);if(C instanceof Wu)h.push(R);else{const L=ca(C,V);L!=null&&(h.push(R),p.set(R,L))}}const y=new Pt(h);return new fw(p,y,o.fieldTransforms)}function PR(t,e,n,r=!1){return ca(n,t.Qu(r?4:3,e))}function ca(t,e){if(yw(t=Be(t)))return Wf("Unsupported field value:",e,t),gw(t,e);if(t instanceof qu)return function(r,s){if(!pw(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let u=ca(l,s.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=Be(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return IA(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ze.fromDate(r);return{timestampValue:ru(s.serializer,i)}}if(r instanceof ze){const i=new ze(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ru(s.serializer,i)}}if(r instanceof Bf)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof fi)return{bytesValue:O0(s.serializer,r._byteString)};if(r instanceof gt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Cf(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof $f)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Sf(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${zu(r)}`)}(t,e)}function gw(t,e){const n={};return u0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):us(t,(r,s)=>{const i=ca(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function yw(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ze||t instanceof Bf||t instanceof fi||t instanceof gt||t instanceof qu||t instanceof $f)}function Wf(t,e,n){if(!yw(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=zu(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function pd(t,e,n){if((e=Be(e))instanceof $u)return e._internalPath;if(typeof e=="string")return Kf(t,e);throw ou("Field path arguments must be of type string or ",t,!1,void 0,n)}const NR=new RegExp("[~\\*/\\[\\]]");function Kf(t,e,n){if(e.search(NR)>=0)throw ou(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new $u(...e.split("."))._internalPath}catch{throw ou(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function ou(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new H(M.INVALID_ARGUMENT,l+t+u)}function _w(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new gt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new DR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Gf("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class DR extends vw{data(){return super.data()}}function Gf(t,e){return typeof e=="string"?Kf(t,e):e instanceof $u?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bR(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new H(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Qf{}class ww extends Qf{}function ty(t,e,...n){let r=[];e instanceof Qf&&r.push(e),r=r.concat(n),function(i){const o=i.filter(u=>u instanceof Xf).length,l=i.filter(u=>u instanceof Yf).length;if(o>1||o>0&&l>0)throw new H(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class Yf extends ww{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Yf(e,n,r)}_apply(e){const n=this._parse(e);return Ew(e._query,n),new hs(e.firestore,e.converter,sd(e._query,n))}_parse(e){const n=Hu(e.firestore);return function(i,o,l,u,h,p,y){let _;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new H(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){sy(y,p);const R=[];for(const C of y)R.push(ry(u,i,C));_={arrayValue:{values:R}}}else _=ry(u,i,y)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||sy(y,p),_=PR(l,o,y,p==="in"||p==="not-in");return Le.create(h,p,_)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}class Xf extends Qf{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Xf(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:rn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const u of l)Ew(o,u),o=sd(o,u)}(e._query,n),new hs(e.firestore,e.converter,sd(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Jf extends ww{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Jf(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new H(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new H(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ho(i,o)}(e._query,this._field,this._direction);return new hs(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new _i(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function ny(t,e="asc"){const n=e,r=Gf("orderBy",t);return Jf._create(r,n)}function ry(t,e,n){if(typeof(n=Be(n))=="string"){if(n==="")throw new H(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!_0(e)&&n.indexOf("/")!==-1)throw new H(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Ee.fromString(n));if(!G.isDocumentKey(r))throw new H(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ig(t,new G(r))}if(n instanceof gt)return Ig(t,n._key);throw new H(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${zu(n)}.`)}function sy(t,e){if(!Array.isArray(t)||t.length===0)throw new H(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ew(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new H(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new H(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class OR{convertValue(e,n="none"){switch(rs(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ne(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(ns(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw Y()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return us(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ne(o.doubleValue));return new $f(i)}convertGeoPoint(e){return new Bf(Ne(e.latitude),Ne(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=wf(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Bo(e));default:return null}}convertTimestamp(e){const n=Ar(e);return new ze(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ee.fromString(e);fe(U0(r));const s=new $o(r.get(1),r.get(3)),i=new G(r.popFirst(5));return s.isEqual(n)||Hn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tw(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Iw extends vw{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Tl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Gf("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Tl extends Iw{data(e={}){return super.data(e)}}class VR{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new ao(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Tl(this._firestore,this._userDataWriter,r.key,r,new ao(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new H(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const u=new Tl(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ao(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Tl(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ao(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),p=o.indexOf(l.doc.key)),{type:LR(l.type),doc:u,oldIndex:h,newIndex:p}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function LR(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Y()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MR(t){t=sn(t,gt);const e=sn(t.firestore,ds);return vR(zf(e),t._key).then(n=>FR(e,t,n))}class xw extends OR{constructor(e){super(),this.firestore=e}convertBytes(e){return new fi(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new gt(this.firestore,null,n)}}function Gi(t){t=sn(t,hs);const e=sn(t.firestore,ds),n=zf(e),r=new xw(e);return bR(t._query),wR(n,t._query).then(s=>new VR(e,r,t,s))}function jR(t,e,n){t=sn(t,gt);const r=sn(t.firestore,ds),s=Tw(t.converter,e);return Ku(r,[mw(Hu(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Ut.none())])}function Qi(t,e,n,...r){t=sn(t,gt);const s=sn(t.firestore,ds),i=Hu(s);let o;return o=typeof(e=Be(e))=="string"||e instanceof $u?CR(i,"updateDoc",t._key,e,n,r):kR(i,"updateDoc",t._key,e),Ku(s,[o.toMutation(t._key,Ut.exists(!0))])}function Wc(t){return Ku(sn(t.firestore,ds),[new Af(t._key,Ut.none())])}function Yi(t,e){const n=sn(t.firestore,ds),r=Qt(t),s=Tw(t.converter,e);return Ku(n,[mw(Hu(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Ut.exists(!1))]).then(()=>r)}function Ku(t,e){return function(r,s){const i=new jn;return r.asyncQueue.enqueueAndForget(async()=>lR(await _R(r),s,i)),i.promise}(zf(t),e)}function FR(t,e,n){const r=n.docs.get(e._key),s=new xw(t);return new Iw(t,s,e._key,r,new ao(n.hasPendingWrites,n.fromCache),e.converter)}function Cn(){return new Hf("serverTimestamp")}(function(e,n=!0){(function(s){yi=s})(ls),es(new xr("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new ds(new US(r.getProvider("auth-internal")),new qS(r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new H(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new $o(h.options.projectId,p)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),mn(_g,"4.7.3",e),mn(_g,"4.7.3","esm2017")})();function Zf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Sw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const UR=Sw,Aw=new na("auth","Firebase",Sw());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au=new pf("@firebase/auth");function zR(t,...e){au.logLevel<=ie.WARN&&au.warn(`Auth (${ls}): ${t}`,...e)}function Il(t,...e){au.logLevel<=ie.ERROR&&au.error(`Auth (${ls}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t,...e){throw ep(t,...e)}function _n(t,...e){return ep(t,...e)}function Rw(t,e,n){const r=Object.assign(Object.assign({},UR()),{[e]:n});return new na("auth","Firebase",r).create(e,{appName:t.name})}function Fn(t){return Rw(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ep(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Aw.create(t,...e)}function Q(t,e,...n){if(!t)throw ep(e,...n)}function On(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Il(e),new Error(e)}function Kn(t,e){t||On(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function md(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function BR(){return iy()==="http:"||iy()==="https:"}function iy(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $R(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(BR()||gx()||"connection"in navigator)?navigator.onLine:!0}function qR(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,n){this.shortDelay=e,this.longDelay=n,Kn(n>e,"Short delay should be less than long delay!"),this.isMobile=fx()||yx()}get(){return $R()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(t,e){Kn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;On("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;On("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;On("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HR={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WR=new ha(3e4,6e4);function Dr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function br(t,e,n,r,s={}){return Cw(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=ra(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},i);return mx()||(h.referrerPolicy="no-referrer"),kw.fetch()(Pw(t,t.config.apiHost,n,l),h)})}async function Cw(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},HR),e);try{const s=new GR(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw nl(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw nl(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw nl(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw nl(t,"user-disabled",o);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Rw(t,p,h);on(t,p)}}catch(s){if(s instanceof Tn)throw s;on(t,"network-request-failed",{message:String(s)})}}async function da(t,e,n,r,s={}){const i=await br(t,e,n,r,s);return"mfaPendingCredential"in i&&on(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Pw(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?tp(t.config,s):`${t.config.apiScheme}://${s}`}function KR(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class GR{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(_n(this.auth,"network-request-failed")),WR.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function nl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=_n(t,e,r);return s.customData._tokenResponse=n,s}function oy(t){return t!==void 0&&t.enterprise!==void 0}class QR{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return KR(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function YR(t,e){return br(t,"GET","/v2/recaptchaConfig",Dr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XR(t,e){return br(t,"POST","/v1/accounts:delete",e)}async function Nw(t,e){return br(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function To(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function JR(t,e=!1){const n=Be(t),r=await n.getIdToken(e),s=np(r);Q(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:To(Kc(s.auth_time)),issuedAtTime:To(Kc(s.iat)),expirationTime:To(Kc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Kc(t){return Number(t)*1e3}function np(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Il("JWT malformed, contained fewer than 3 sections"),null;try{const s=qv(n);return s?JSON.parse(s):(Il("Failed to decode base64 JWT payload"),null)}catch(s){return Il("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ay(t){const e=np(t);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qo(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Tn&&ZR(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function ZR({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=To(this.lastLoginAt),this.creationTime=To(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lu(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Qo(t,Nw(n,{idToken:r}));Q(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Dw(i.providerUserInfo):[],l=nk(t.providerData,o),u=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),p=u?h:!1,y={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new gd(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(t,y)}async function tk(t){const e=Be(t);await lu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function nk(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Dw(t){return t.map(e=>{var{providerId:n}=e,r=Zf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rk(t,e){const n=await Cw(t,{},async()=>{const r=ra({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Pw(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",kw.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function sk(t,e){return br(t,"POST","/v2/accounts:revokeToken",Dr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ay(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const n=ay(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await rk(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Xs;return r&&(Q(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(Q(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Q(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Xs,this.toJSON())}_performRefresh(){return On("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zn(t,e){Q(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Vn{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Zf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ek(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new gd(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Qo(this,this.stsTokenManager.getToken(this.auth,e));return Q(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return JR(this,e)}reload(){return tk(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Vn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await lu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(dn(this.auth.app))return Promise.reject(Fn(this.auth));const e=await this.getIdToken();return await Qo(this,XR(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,u,h,p;const y=(r=n.displayName)!==null&&r!==void 0?r:void 0,_=(s=n.email)!==null&&s!==void 0?s:void 0,R=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,C=(o=n.photoURL)!==null&&o!==void 0?o:void 0,V=(l=n.tenantId)!==null&&l!==void 0?l:void 0,L=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,x=(h=n.createdAt)!==null&&h!==void 0?h:void 0,E=(p=n.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:S,emailVerified:O,isAnonymous:B,providerData:z,stsTokenManager:v}=n;Q(S&&v,e,"internal-error");const g=Xs.fromJSON(this.name,v);Q(typeof S=="string",e,"internal-error"),Zn(y,e.name),Zn(_,e.name),Q(typeof O=="boolean",e,"internal-error"),Q(typeof B=="boolean",e,"internal-error"),Zn(R,e.name),Zn(C,e.name),Zn(V,e.name),Zn(L,e.name),Zn(x,e.name),Zn(E,e.name);const w=new Vn({uid:S,auth:e,email:_,emailVerified:O,displayName:y,isAnonymous:B,photoURL:C,phoneNumber:R,tenantId:V,stsTokenManager:g,createdAt:x,lastLoginAt:E});return z&&Array.isArray(z)&&(w.providerData=z.map(T=>Object.assign({},T))),L&&(w._redirectEventId=L),w}static async _fromIdTokenResponse(e,n,r=!1){const s=new Xs;s.updateFromServerResponse(n);const i=new Vn({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await lu(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];Q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Dw(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Xs;l.updateFromIdToken(r);const u=new Vn({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new gd(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ly=new Map;function Ln(t){Kn(t instanceof Function,"Expected a class definition");let e=ly.get(t);return e?(Kn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ly.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}bw.type="NONE";const uy=bw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(t,e,n){return`firebase:${t}:${e}:${n}`}class Js{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=xl(this.userKey,s.apiKey,i),this.fullPersistenceKey=xl("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Vn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Js(Ln(uy),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Ln(uy);const o=xl(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const p=await h._get(o);if(p){const y=Vn._fromJSON(e,p);h!==i&&(l=y),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Js(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Js(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cy(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Mw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ow(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Fw(e))return"Blackberry";if(Uw(e))return"Webos";if(Vw(e))return"Safari";if((e.includes("chrome/")||Lw(e))&&!e.includes("edge/"))return"Chrome";if(jw(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ow(t=ht()){return/firefox\//i.test(t)}function Vw(t=ht()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Lw(t=ht()){return/crios\//i.test(t)}function Mw(t=ht()){return/iemobile/i.test(t)}function jw(t=ht()){return/android/i.test(t)}function Fw(t=ht()){return/blackberry/i.test(t)}function Uw(t=ht()){return/webos/i.test(t)}function rp(t=ht()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ik(t=ht()){var e;return rp(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ok(){return _x()&&document.documentMode===10}function zw(t=ht()){return rp(t)||jw(t)||Uw(t)||Fw(t)||/windows phone/i.test(t)||Mw(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bw(t,e=[]){let n;switch(t){case"Browser":n=cy(ht());break;case"Worker":n=`${cy(ht())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ls}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ak{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lk(t,e={}){return br(t,"GET","/v2/passwordPolicy",Dr(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uk=6;class ck{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:uk,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hk{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new hy(this),this.idTokenSubscription=new hy(this),this.beforeStateQueue=new ak(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Aw,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Ln(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Js.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Nw(this,{idToken:e}),r=await Vn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(dn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await lu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qR()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(dn(this.app))return Promise.reject(Fn(this));const n=e?Be(e):null;return n&&Q(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return dn(this.app)?Promise.reject(Fn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return dn(this.app)?Promise.reject(Fn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ln(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await lk(this),n=new ck(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new na("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await sk(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Ln(e)||this._popupRedirectResolver;Q(n,this,"argument-error"),this.redirectPersistenceManager=await Js.create(this,[Ln(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Bw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&zR(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function fs(t){return Be(t)}class hy{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ax(n=>this.observer=n)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function dk(t){Gu=t}function $w(t){return Gu.loadJS(t)}function fk(){return Gu.recaptchaEnterpriseScript}function pk(){return Gu.gapiScript}function mk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const gk="recaptcha-enterprise",yk="NO_RECAPTCHA";class _k{constructor(e){this.type=gk,this.auth=fs(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{YR(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new QR(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{l(u)})})}function s(i,o,l){const u=window.grecaptcha;oy(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(yk)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&oy(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=fk();u.length!==0&&(u+=l),$w(u).then(()=>{s(l,i,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function dy(t,e,n,r=!1){const s=new _k(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function yd(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await dy(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await dy(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vk(t,e){const n=Nu(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Jl(i,e??{}))return s;on(s,"already-initialized")}return n.initialize({options:e})}function wk(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Ln);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ek(t,e,n){const r=fs(t);Q(r._canInitEmulator,r,"emulator-config-failed"),Q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=qw(e),{host:o,port:l}=Tk(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Ik()}function qw(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Tk(t){const e=qw(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:fy(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:fy(o)}}}function fy(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Ik(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return On("not implemented")}_getIdTokenResponse(e){return On("not implemented")}_linkToIdToken(e,n){return On("not implemented")}_getReauthenticationResolver(e){return On("not implemented")}}async function xk(t,e){return br(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sk(t,e){return da(t,"POST","/v1/accounts:signInWithPassword",Dr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ak(t,e){return da(t,"POST","/v1/accounts:signInWithEmailLink",Dr(t,e))}async function Rk(t,e){return da(t,"POST","/v1/accounts:signInWithEmailLink",Dr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo extends sp{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Yo(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Yo(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yd(e,n,"signInWithPassword",Sk);case"emailLink":return Ak(e,{email:this._email,oobCode:this._password});default:on(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yd(e,r,"signUpPassword",xk);case"emailLink":return Rk(e,{idToken:n,email:this._email,oobCode:this._password});default:on(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zs(t,e){return da(t,"POST","/v1/accounts:signInWithIdp",Dr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kk="http://localhost";class ss extends sp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ss(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):on("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Zf(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new ss(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Zs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Zs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Zs(e,n)}buildRequest(){const e={requestUri:kk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ra(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ck(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Pk(t){const e=no(ro(t)).link,n=e?no(ro(e)).deep_link_id:null,r=no(ro(t)).deep_link_id;return(r?no(ro(r)).link:null)||r||n||e||t}class ip{constructor(e){var n,r,s,i,o,l;const u=no(ro(e)),h=(n=u.apiKey)!==null&&n!==void 0?n:null,p=(r=u.oobCode)!==null&&r!==void 0?r:null,y=Ck((s=u.mode)!==null&&s!==void 0?s:null);Q(h&&p&&y,"argument-error"),this.apiKey=h,this.operation=y,this.code=p,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=Pk(e);try{return new ip(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(){this.providerId=Ei.PROVIDER_ID}static credential(e,n){return Yo._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=ip.parseLink(n);return Q(r,"argument-error"),Yo._fromEmailAndCode(e,r.code,r.tenantId)}}Ei.PROVIDER_ID="password";Ei.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ei.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa extends Hw{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr extends fa{constructor(){super("facebook.com")}static credential(e){return ss._fromParams({providerId:sr.PROVIDER_ID,signInMethod:sr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sr.credentialFromTaggedObject(e)}static credentialFromError(e){return sr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sr.credential(e.oauthAccessToken)}catch{return null}}}sr.FACEBOOK_SIGN_IN_METHOD="facebook.com";sr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir extends fa{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ss._fromParams({providerId:ir.PROVIDER_ID,signInMethod:ir.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ir.credentialFromTaggedObject(e)}static credentialFromError(e){return ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return ir.credential(n,r)}catch{return null}}}ir.GOOGLE_SIGN_IN_METHOD="google.com";ir.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends fa{constructor(){super("github.com")}static credential(e){return ss._fromParams({providerId:or.PROVIDER_ID,signInMethod:or.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return or.credentialFromTaggedObject(e)}static credentialFromError(e){return or.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return or.credential(e.oauthAccessToken)}catch{return null}}}or.GITHUB_SIGN_IN_METHOD="github.com";or.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar extends fa{constructor(){super("twitter.com")}static credential(e,n){return ss._fromParams({providerId:ar.PROVIDER_ID,signInMethod:ar.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ar.credentialFromTaggedObject(e)}static credentialFromError(e){return ar.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ar.credential(n,r)}catch{return null}}}ar.TWITTER_SIGN_IN_METHOD="twitter.com";ar.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nk(t,e){return da(t,"POST","/v1/accounts:signUp",Dr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Vn._fromIdTokenResponse(e,r,s),o=py(r);return new is({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=py(r);return new is({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function py(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu extends Tn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,uu.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new uu(e,n,r,s)}}function Ww(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?uu._fromErrorAndOperation(t,i,e,r):i})}async function Dk(t,e,n=!1){const r=await Qo(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return is._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bk(t,e,n=!1){const{auth:r}=t;if(dn(r.app))return Promise.reject(Fn(r));const s="reauthenticate";try{const i=await Qo(t,Ww(r,s,e,t),n);Q(i.idToken,r,"internal-error");const o=np(i.idToken);Q(o,r,"internal-error");const{sub:l}=o;return Q(t.uid===l,r,"user-mismatch"),is._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&on(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kw(t,e,n=!1){if(dn(t.app))return Promise.reject(Fn(t));const r="signIn",s=await Ww(t,r,e),i=await is._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function Ok(t,e){return Kw(fs(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gw(t){const e=fs(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Vk(t,e,n){if(dn(t.app))return Promise.reject(Fn(t));const r=fs(t),o=await yd(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Nk).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Gw(t),u}),l=await is._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function Lk(t,e,n){return dn(t.app)?Promise.reject(Fn(t)):Ok(Be(t),Ei.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Gw(t),r})}function Mk(t,e,n,r){return Be(t).onIdTokenChanged(e,n,r)}function jk(t,e,n){return Be(t).beforeAuthStateChanged(e,n)}function Fk(t,e,n,r){return Be(t).onAuthStateChanged(e,n,r)}function Uk(t){return Be(t).signOut()}const cu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(cu,"1"),this.storage.removeItem(cu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zk=1e3,Bk=10;class Yw extends Qw{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);ok()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Bk):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},zk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Yw.type="LOCAL";const $k=Yw;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw extends Qw{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Xw.type="SESSION";const Jw=Xw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Qu(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async h=>h(n.origin,i)),u=await qk(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Qu.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function op(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const h=op("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(y){const _=y;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(_.data.response);break;default:clearTimeout(p),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(){return window}function Wk(t){vn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zw(){return typeof vn().WorkerGlobalScope<"u"&&typeof vn().importScripts=="function"}async function Kk(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Gk(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Qk(){return Zw()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eE="firebaseLocalStorageDb",Yk=1,hu="firebaseLocalStorage",tE="fbase_key";class pa{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Yu(t,e){return t.transaction([hu],e?"readwrite":"readonly").objectStore(hu)}function Xk(){const t=indexedDB.deleteDatabase(eE);return new pa(t).toPromise()}function _d(){const t=indexedDB.open(eE,Yk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(hu,{keyPath:tE})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(hu)?e(r):(r.close(),await Xk(),e(await _d()))})})}async function my(t,e,n){const r=Yu(t,!0).put({[tE]:e,value:n});return new pa(r).toPromise()}async function Jk(t,e){const n=Yu(t,!1).get(e),r=await new pa(n).toPromise();return r===void 0?null:r.value}function gy(t,e){const n=Yu(t,!0).delete(e);return new pa(n).toPromise()}const Zk=800,eC=3;class nE{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _d(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>eC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zw()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Qu._getInstance(Qk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Kk(),!this.activeServiceWorker)return;this.sender=new Hk(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Gk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await _d();return await my(e,cu,"1"),await gy(e,cu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>my(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Jk(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>gy(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Yu(s,!1).getAll();return new pa(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Zk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}nE.type="LOCAL";const tC=nE;new ha(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nC(t,e){return e?Ln(e):(Q(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap extends sp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Zs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Zs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function rC(t){return Kw(t.auth,new ap(t),t.bypassAuthState)}function sC(t){const{auth:e,user:n}=t;return Q(n,e,"internal-error"),bk(n,new ap(t),t.bypassAuthState)}async function iC(t){const{auth:e,user:n}=t;return Q(n,e,"internal-error"),Dk(n,new ap(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return rC;case"linkViaPopup":case"linkViaRedirect":return iC;case"reauthViaPopup":case"reauthViaRedirect":return sC;default:on(this.auth,"internal-error")}}resolve(e){Kn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Kn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oC=new ha(2e3,1e4);class $s extends rE{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,$s.currentPopupAction&&$s.currentPopupAction.cancel(),$s.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){Kn(this.filter.length===1,"Popup operations only handle one event");const e=op();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(_n(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_n(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$s.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_n(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,oC.get())};e()}}$s.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aC="pendingRedirect",Sl=new Map;class lC extends rE{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Sl.get(this.auth._key());if(!e){try{const r=await uC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Sl.set(this.auth._key(),e)}return this.bypassAuthState||Sl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function uC(t,e){const n=dC(e),r=hC(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function cC(t,e){Sl.set(t._key(),e)}function hC(t){return Ln(t._redirectPersistence)}function dC(t){return xl(aC,t.config.apiKey,t.name)}async function fC(t,e,n=!1){if(dn(t.app))return Promise.reject(Fn(t));const r=fs(t),s=nC(r,e),o=await new lC(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pC=10*60*1e3;class mC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!gC(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!sE(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(_n(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=pC&&this.cachedEventUids.clear(),this.cachedEventUids.has(yy(e))}saveEventToCache(e){this.cachedEventUids.add(yy(e)),this.lastProcessedEventTime=Date.now()}}function yy(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function sE({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function gC(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return sE(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yC(t,e={}){return br(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _C=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,vC=/^https?/;async function wC(t){if(t.config.emulator)return;const{authorizedDomains:e}=await yC(t);for(const n of e)try{if(EC(n))return}catch{}on(t,"unauthorized-domain")}function EC(t){const e=md(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!vC.test(n))return!1;if(_C.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TC=new ha(3e4,6e4);function _y(){const t=vn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function IC(t){return new Promise((e,n)=>{var r,s,i;function o(){_y(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{_y(),n(_n(t,"network-request-failed"))},timeout:TC.get()})}if(!((s=(r=vn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=vn().gapi)===null||i===void 0)&&i.load)o();else{const l=mk("iframefcb");return vn()[l]=()=>{gapi.load?o():n(_n(t,"network-request-failed"))},$w(`${pk()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Al=null,e})}let Al=null;function xC(t){return Al=Al||IC(t),Al}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SC=new ha(5e3,15e3),AC="__/auth/iframe",RC="emulator/auth/iframe",kC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},CC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function PC(t){const e=t.config;Q(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?tp(e,RC):`https://${t.config.authDomain}/${AC}`,r={apiKey:e.apiKey,appName:t.name,v:ls},s=CC.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ra(r).slice(1)}`}async function NC(t){const e=await xC(t),n=vn().gapi;return Q(n,t,"internal-error"),e.open({where:document.body,url:PC(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:kC,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=_n(t,"network-request-failed"),l=vn().setTimeout(()=>{i(o)},SC.get());function u(){vn().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},bC=500,OC=600,VC="_blank",LC="http://localhost";class vy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function MC(t,e,n,r=bC,s=OC){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},DC),{width:r.toString(),height:s.toString(),top:i,left:o}),h=ht().toLowerCase();n&&(l=Lw(h)?VC:n),Ow(h)&&(e=e||LC,u.scrollbars="yes");const p=Object.entries(u).reduce((_,[R,C])=>`${_}${R}=${C},`,"");if(ik(h)&&l!=="_self")return jC(e||"",l),new vy(null);const y=window.open(e||"",l,p);Q(y,t,"popup-blocked");try{y.focus()}catch{}return new vy(y)}function jC(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FC="__/auth/handler",UC="emulator/auth/handler",zC=encodeURIComponent("fac");async function wy(t,e,n,r,s,i){Q(t.config.authDomain,t,"auth-domain-config-required"),Q(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ls,eventId:s};if(e instanceof Hw){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Sx(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries({}))o[p]=y}if(e instanceof fa){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(o.scopes=p.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await t._getAppCheckToken(),h=u?`#${zC}=${encodeURIComponent(u)}`:"";return`${BC(t)}?${ra(l).slice(1)}${h}`}function BC({config:t}){return t.emulator?tp(t,UC):`https://${t.authDomain}/${FC}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc="webStorageSupport";class $C{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jw,this._completeRedirectFn=fC,this._overrideRedirectResult=cC}async _openPopup(e,n,r,s){var i;Kn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await wy(e,n,r,md(),s);return MC(e,o,op())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await wy(e,n,r,md(),s);return Wk(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Kn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await NC(e),r=new mC(e);return n.register("authEvent",s=>(Q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Gc,{type:Gc},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Gc];o!==void 0&&n(!!o),on(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=wC(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return zw()||Vw()||rp()}}const qC=$C;var Ey="@firebase/auth",Ty="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HC{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WC(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function KC(t){es(new xr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Bw(t)},h=new hk(r,s,i,u);return wk(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),es(new xr("auth-internal",e=>{const n=fs(e.getProvider("auth").getImmediate());return(r=>new HC(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),mn(Ey,Ty,WC(t)),mn(Ey,Ty,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GC=5*60,QC=Gv("authIdTokenMaxAge")||GC;let Iy=null;const YC=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>QC)return;const s=n==null?void 0:n.token;Iy!==s&&(Iy=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function XC(t=gf()){const e=Nu(t,"auth");if(e.isInitialized())return e.getImmediate();const n=vk(t,{popupRedirectResolver:qC,persistence:[tC,$k,Jw]}),r=Gv("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=YC(i.toString());jk(n,o,()=>o(n.currentUser)),Mk(n,l=>o(l))}}const s=Hv("auth");return s&&Ek(n,`http://${s}`),n}function JC(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}dk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=_n("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",JC().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});KC("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iE="firebasestorage.googleapis.com",ZC="storageBucket",eP=2*60*1e3,tP=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In extends Tn{constructor(e,n,r=0){super(Qc(e),`Firebase Storage: ${n} (${Qc(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,In.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Qc(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var En;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(En||(En={}));function Qc(t){return"storage/"+t}function nP(){const t="An unknown error occurred, please check the error payload for server response.";return new In(En.UNKNOWN,t)}function rP(){return new In(En.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function sP(){return new In(En.CANCELED,"User canceled the upload/download.")}function iP(t){return new In(En.INVALID_URL,"Invalid URL '"+t+"'.")}function oP(t){return new In(En.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function xy(t){return new In(En.INVALID_ARGUMENT,t)}function oE(){return new In(En.APP_DELETED,"The Firebase app was deleted.")}function aP(t){return new In(En.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=Zt.makeFromUrl(e,n)}catch{return new Zt(e,"")}if(r.path==="")return r;throw oP(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(O){O.path.charAt(O.path.length-1)==="/"&&(O.path_=O.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function h(O){O.path_=decodeURIComponent(O.path)}const p="v[A-Za-z0-9_]+",y=n.replace(/[.]/g,"\\."),_="(/([^?#]*).*)?$",R=new RegExp(`^https?://${y}/${p}/b/${s}/o${_}`,"i"),C={bucket:1,path:3},V=n===iE?"(?:storage.googleapis.com|storage.cloud.google.com)":n,L="([^?#]*)",x=new RegExp(`^https?://${V}/${s}/${L}`,"i"),S=[{regex:l,indices:u,postModify:i},{regex:R,indices:C,postModify:h},{regex:x,indices:{bucket:1,path:2},postModify:h}];for(let O=0;O<S.length;O++){const B=S[O],z=B.regex.exec(e);if(z){const v=z[B.indices.bucket];let g=z[B.indices.path];g||(g=""),r=new Zt(v,g),B.postModify(r);break}}if(r==null)throw iP(e);return r}}class lP{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uP(t,e,n){let r=1,s=null,i=null,o=!1,l=0;function u(){return l===2}let h=!1;function p(...L){h||(h=!0,e.apply(null,L))}function y(L){s=setTimeout(()=>{s=null,t(R,u())},L)}function _(){i&&clearTimeout(i)}function R(L,...x){if(h){_();return}if(L){_(),p.call(null,L,...x);return}if(u()||o){_(),p.call(null,L,...x);return}r<64&&(r*=2);let S;l===1?(l=2,S=0):S=(r+Math.random())*1e3,y(S)}let C=!1;function V(L){C||(C=!0,_(),!h&&(s!==null?(L||(l=2),clearTimeout(s),y(0)):L||(l=1)))}return y(0),i=setTimeout(()=>{o=!0,V(!0)},n),V}function cP(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hP(t){return t!==void 0}function Sy(t,e,n,r){if(r<e)throw xy(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw xy(`Invalid value for '${t}'. Expected ${n} or less.`)}function dP(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var du;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(du||(du={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fP(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pP{constructor(e,n,r,s,i,o,l,u,h,p,y,_=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=h,this.progressCallback_=p,this.connectionFactory_=y,this.retry=_,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,C)=>{this.resolve_=R,this.reject_=C,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new rl(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const u=l.loaded,h=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,h)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===du.NO_ERROR,u=i.getStatus();if(!l||fP(u,this.additionalRetryCodes_)&&this.retry){const p=i.getErrorCode()===du.ABORT;r(!1,new rl(!1,null,p));return}const h=this.successCodes_.indexOf(u)!==-1;r(!0,new rl(h,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());hP(u)?i(u):i()}catch(u){o(u)}else if(l!==null){const u=nP();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(s.canceled){const u=this.appDelete_?oE():sP();o(u)}else{const u=rP();o(u)}};this.canceled_?n(!1,new rl(!1,null,!0)):this.backoffId_=uP(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&cP(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class rl{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function mP(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function gP(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function yP(t,e){e&&(t["X-Firebase-GMPID"]=e)}function _P(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function vP(t,e,n,r,s,i,o=!0){const l=dP(t.urlParams),u=t.url+l,h=Object.assign({},t.headers);return yP(h,e),mP(h,n),gP(h,i),_P(h,r),new pP(u,t.method,h,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wP(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function EP(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e,n){this._service=e,n instanceof Zt?this._location=n:this._location=Zt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new fu(e,n)}get root(){const e=new Zt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return EP(this._location.path)}get storage(){return this._service}get parent(){const e=wP(this._location.path);if(e===null)return null;const n=new Zt(this._location.bucket,e);return new fu(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw aP(e)}}function Ay(t,e){const n=e==null?void 0:e[ZC];return n==null?null:Zt.makeFromBucketSpec(n,t)}function TP(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:Qv(s,t.app.options.projectId))}class IP{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=iE,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=eP,this._maxUploadRetryTime=tP,this._requests=new Set,s!=null?this._bucket=Zt.makeFromBucketSpec(s,this._host):this._bucket=Ay(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Zt.makeFromBucketSpec(this._url,e):this._bucket=Ay(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Sy("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Sy("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new fu(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new lP(oE());{const o=vP(e,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const Ry="@firebase/storage",ky="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aE="storage";function xP(t=gf(),e){t=Be(t);const r=Nu(t,aE).getImmediate({identifier:e}),s=Wv("storage");return s&&SP(r,...s),r}function SP(t,e,n,r={}){TP(t,e,n,r)}function AP(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new IP(n,r,s,e,ls)}function RP(){es(new xr(aE,AP,"PUBLIC").setMultipleInstances(!0)),mn(Ry,ky,""),mn(Ry,ky,"esm2017")}RP();const kP={apiKey:"AIzaSyAdK3Sk7G6WAFnV-yuN_PNwkUyi9Rbx7hY",authDomain:"socrates-86d13.firebaseapp.com",projectId:"socrates-86d13",storageBucket:"socrates-86d13.firebasestorage.app",messagingSenderId:"411404101720",appId:"1:411404101720:web:14700b2225728fbbe7c22d"},lp=Jv(kP),be=IR(lp),sl=XC(lp);xP(lp);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var CP={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PP=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),dt=(t,e)=>{const n=pe.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:u,...h},p)=>pe.createElement("svg",{ref:p,...CP,width:s,height:s,stroke:r,strokeWidth:o?Number(i)*24/Number(s):i,className:["lucide",`lucide-${PP(t)}`,l].join(" "),...h},[...e.map(([y,_])=>pe.createElement(y,_)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NP=dt("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xi=dt("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DP=dt("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bP=dt("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const il=dt("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yc=dt("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xc=dt("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cy=dt("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OP=dt("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jc=dt("PenSquare",[["path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1qinfi"}],["path",{d:"M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z",key:"w2jsv5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=dt("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VP=dt("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LP=dt("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zc=dt("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eh=dt("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MP=dt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function jP(){var je,$e,Or;const[t,e]=pe.useState(null),[n,r]=pe.useState(null),[s,i]=pe.useState(!0),[o,l]=pe.useState("login"),[u,h]=pe.useState("dashboard"),[p,y]=pe.useState(!0),[_,R]=pe.useState([]),[C,V]=pe.useState([]),[L,x]=pe.useState([]),[E,S]=pe.useState([]),[O,B]=pe.useState([]),[z,v]=pe.useState(!1),[g,w]=pe.useState(""),[T,A]=pe.useState(null),[P,I]=pe.useState(""),[Pe,xn]=pe.useState(null),[St,$t]=pe.useState(null),[D,$]=pe.useState({}),[Z,me]=pe.useState(!1),[te,_e]=pe.useState(null);pe.useEffect(()=>{const k=Fk(sl,async U=>{if(U){e(U);const ee=await MR(Qt(be,"schools",U.uid));ee.exists()&&r({id:ee.id,...ee.data()})}else e(null),r(null);i(!1)});return()=>k()},[]),pe.useEffect(()=>{n&&Me()},[n]);const Me=async()=>{if(n)try{const k=await Gi(ty(un(be,"schools",n.id,"students"),ny("lastName")));R(k.docs.map(he=>({id:he.id,...he.data()})));const U=await Gi(un(be,"schools",n.id,"classes"));V(U.docs.map(he=>({id:he.id,...he.data()})));const ee=await Gi(un(be,"schools",n.id,"gradingPeriods"));B(ee.docs.map(he=>({id:he.id,...he.data()})));const ne=await Gi(un(be,"schools",n.id,"grades"));x(ne.docs.map(he=>({id:he.id,...he.data()})));const oe=await Gi(ty(un(be,"schools",n.id,"payments"),ny("date","desc")));S(oe.docs.map(he=>({id:he.id,...he.data()})))}catch(k){console.error("Error:",k)}},qt=async k=>{k.preventDefault();try{const{email:U,password:ee,schoolName:ne,phone:oe}=D,he=await Vk(sl,U,ee);await jR(Qt(be,"schools",he.user.uid),{name:ne,email:U,phone:oe,createdAt:Cn(),subscription:"trial",trialEndsAt:new Date(Date.now()+30*24*60*60*1e3)}),$({})}catch(U){alert("Echec inscription: "+U.message)}},Ht=async k=>{k.preventDefault();try{await Lk(sl,D.email,D.password),$({})}catch(U){alert("Echec connexion: "+U.message)}},Wt=async()=>{await Uk(sl),me(!1),_e(null)},Xu=k=>{k.preventDefault();const U=_.find(ee=>{var ne,oe;return(((ne=ee.parentEmail)==null?void 0:ne.toLowerCase())===((oe=D.parentContact)==null?void 0:oe.toLowerCase())||ee.parentPhone===D.parentContact)&&ee.parentPin===D.parentPin});U?(_e(U),me(!0),$({})):alert("Identifiants invalides.")},Ju=async k=>{k.preventDefault();try{T?await Qi(Qt(be,"schools",n.id,"students",T.id),{...D,updatedAt:Cn()}):await Yi(un(be,"schools",n.id,"students"),{...D,createdAt:Cn()}),v(!1),A(null),$({}),Me()}catch(U){alert("Erreur: "+U.message)}},ps=async k=>{if(confirm("Supprimer cet eleve?"))try{await Wc(Qt(be,"schools",n.id,"students",k)),Me()}catch(U){alert("Erreur: "+U.message)}},ms=async k=>{k.preventDefault();try{T?await Qi(Qt(be,"schools",n.id,"classes",T.id),{...D,updatedAt:Cn()}):await Yi(un(be,"schools",n.id,"classes"),{...D,createdAt:Cn()}),v(!1),A(null),$({}),Me()}catch(U){alert("Erreur: "+U.message)}},Ti=async k=>{if(confirm("Supprimer cette classe?"))try{await Wc(Qt(be,"schools",n.id,"classes",k)),Me()}catch(U){alert("Erreur: "+U.message)}},Ii=async k=>{k.preventDefault();try{T?await Qi(Qt(be,"schools",n.id,"gradingPeriods",T.id),D):await Yi(un(be,"schools",n.id,"gradingPeriods"),D),v(!1),A(null),$({}),Me()}catch(U){alert("Erreur: "+U.message)}},xi=async(k,U,ee,ne)=>{try{const oe=L.find(he=>he.studentId===k&&he.classId===U&&he.periodId===ee);oe?await Qi(Qt(be,"schools",n.id,"grades",oe.id),{score:ne,updatedAt:Cn()}):await Yi(un(be,"schools",n.id,"grades"),{studentId:k,classId:U,periodId:ee,score:ne,createdAt:Cn()}),Me()}catch(oe){alert("Erreur: "+oe.message)}},Si=async k=>{k.preventDefault();try{T?await Qi(Qt(be,"schools",n.id,"payments",T.id),{...D,amount:parseFloat(D.amount),updatedAt:Cn()}):await Yi(un(be,"schools",n.id,"payments"),{...D,amount:parseFloat(D.amount),date:D.date||new Date().toISOString().split("T")[0],createdAt:Cn()}),v(!1),A(null),$({}),Me()}catch(U){alert("Erreur: "+U.message)}},ma=async k=>{if(confirm("Supprimer ce paiement?"))try{await Wc(Qt(be,"schools",n.id,"payments",k)),Me()}catch(U){alert("Erreur: "+U.message)}},Vt=(k,U=null)=>{w(k),A(U),$(U||{}),v(!0)},gs=k=>{const U=_.find(oe=>oe.id===k),ee=parseFloat(U==null?void 0:U.tuitionAmount)||0,ne=E.filter(oe=>oe.studentId===k).reduce((oe,he)=>oe+(parseFloat(he.amount)||0),0);return ee-ne},ga=k=>{const U=parseFloat(k);return U>=90?"A":U>=80?"B":U>=70?"C":U>=60?"D":"F"},ys=k=>{const U=L.filter(Ke=>Ke.studentId===k.id),ne=C.filter(Ke=>{var an;return(an=k.enrolledClasses)==null?void 0:an.includes(Ke.id)}).map(Ke=>{const an=O.map(At=>{const An=U.find(Es=>Es.classId===Ke.id&&Es.periodId===At.id);return'<td style="border:1px solid #e5e7eb;padding:8px;text-align:center;">'+((An==null?void 0:An.score)||"-")+"</td>"}).join(""),ws=U.filter(At=>At.classId===Ke.id).map(At=>parseFloat(At.score)||0),va=ws.length>0?(ws.reduce((At,An)=>At+An,0)/ws.length).toFixed(1):"-";return'<tr><td style="border:1px solid #e5e7eb;padding:8px;font-weight:500;">'+Ke.name+"</td>"+an+'<td style="border:1px solid #e5e7eb;padding:8px;text-align:center;font-weight:bold;">'+va+"</td></tr>"}).join(""),oe=O.map(Ke=>'<th style="border:1px solid #e5e7eb;padding:8px;background:#f8fafc;">'+Ke.name+"</th>").join(""),he=U.map(Ke=>parseFloat(Ke.score)||0).filter(Ke=>Ke>0),Sn=he.length>0?(he.reduce((Ke,an)=>Ke+an,0)/he.length).toFixed(2):"N/A",vs=window.open("","_blank");vs.document.write('<html><head><title>Bulletin</title></head><body style="font-family:sans-serif;padding:40px;"><h1 style="color:#1e3a5f;">'+((n==null?void 0:n.name)||"SOCRATES")+"</h1><h2>Bulletin Scolaire</h2><p><strong>Eleve:</strong> "+k.firstName+" "+k.lastName+"</p><p><strong>Niveau:</strong> "+(k.gradeLevel||"N/A")+'</p><table style="width:100%;border-collapse:collapse;margin:20px 0;"><thead><tr><th style="border:1px solid #e5e7eb;padding:8px;background:#1e3a5f;color:white;">Matiere</th>'+oe+'<th style="border:1px solid #e5e7eb;padding:8px;background:#f8fafc;">Moyenne</th></tr></thead><tbody>'+ne+'</tbody></table><div style="background:#1e3a5f;color:white;padding:20px;text-align:center;border-radius:8px;"><p>Moyenne Generale</p><h1>'+Sn+'</h1></div><button onclick="window.print()" style="margin-top:20px;padding:10px 20px;">Imprimer</button></body></html>'),vs.document.close()},Ai=k=>{const U=_.find(ne=>ne.id===k.studentId),ee=window.open("","_blank");ee.document.write('<html><head><title>Recu</title></head><body style="font-family:sans-serif;padding:40px;max-width:400px;margin:0 auto;"><h1 style="color:#1e3a5f;">'+((n==null?void 0:n.name)||"SOCRATES")+"</h1><h3>Recu de Paiement</h3><p>Recu #"+k.id.slice(0,8).toUpperCase()+"</p><hr/><p><strong>Date:</strong> "+new Date(k.date).toLocaleDateString()+"</p><p><strong>Eleve:</strong> "+(U?U.firstName+" "+U.lastName:"N/A")+"</p><p><strong>Description:</strong> "+(k.description||"Frais de scolarite")+"</p><p><strong>Methode:</strong> "+(k.method||"Especes")+'</p><div style="background:#f0f0f0;padding:20px;text-align:center;margin:20px 0;border-radius:8px;"><p>Montant Paye</p><h1 style="color:#1e3a5f;">$'+k.amount.toFixed(2)+'</h1></div><p style="text-align:center;color:green;font-weight:bold;">PAYE</p><button onclick="window.print()" style="margin-top:20px;padding:10px 20px;width:100%;">Imprimer</button></body></html>'),ee.document.close()},ya=_.filter(k=>(k.firstName+" "+k.lastName).toLowerCase().includes(P.toLowerCase())),Ri=_.length,_s=E.reduce((k,U)=>k+(parseFloat(U.amount)||0),0),_a=_.filter(k=>gs(k.id)>0).length;if(s)return f.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-socrates-navy to-socrates-blue",children:f.jsxs("div",{className:"text-center text-white",children:[f.jsx("div",{className:"text-6xl mb-4",children:"🦉"}),f.jsx("h1",{className:"font-display text-3xl mb-2",children:"SOCRATES"}),f.jsx("p",{className:"text-blue-200",children:"Chargement..."})]})});if(Z&&te){const k=L.filter(ne=>ne.studentId===te.id),U=E.filter(ne=>ne.studentId===te.id),ee=gs(te.id);return f.jsxs("div",{className:"min-h-screen bg-gray-50",children:[f.jsx("header",{className:"bg-gradient-to-r from-socrates-navy to-socrates-blue text-white p-4",children:f.jsxs("div",{className:"max-w-6xl mx-auto flex items-center justify-between",children:[f.jsxs("div",{className:"flex items-center gap-3",children:[f.jsx("span",{className:"text-3xl",children:"🦉"}),f.jsxs("div",{children:[f.jsx("h1",{className:"font-display text-xl",children:"SOCRATES"}),f.jsx("p",{className:"text-xs text-blue-200",children:"Portail Parent"})]})]}),f.jsxs("div",{className:"flex items-center gap-4",children:[f.jsxs("span",{className:"text-sm",children:[te.firstName," ",te.lastName]}),f.jsxs("button",{onClick:()=>{me(!1),_e(null)},className:"bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm flex items-center gap-2",children:[f.jsx(Cy,{size:16}),"Deconnexion"]})]})]})}),f.jsxs("div",{className:"max-w-6xl mx-auto p-6",children:[f.jsx("div",{className:"bg-white rounded-xl shadow-lg p-6 mb-6",children:f.jsxs("div",{className:"flex items-center gap-4",children:[f.jsxs("div",{className:"w-16 h-16 rounded-full bg-socrates-navy text-white flex items-center justify-center text-2xl font-bold",children:[(je=te.firstName)==null?void 0:je[0],($e=te.lastName)==null?void 0:$e[0]]}),f.jsxs("div",{children:[f.jsxs("h2",{className:"text-2xl font-bold text-gray-800",children:[te.firstName," ",te.lastName]}),f.jsxs("p",{className:"text-gray-500",children:["Niveau: ",te.gradeLevel||"N/A"]})]}),f.jsx("div",{className:"ml-auto",children:f.jsxs("button",{onClick:()=>ys(te),className:"bg-socrates-blue text-white px-4 py-2 rounded-lg hover:bg-socrates-navy flex items-center gap-2",children:[f.jsx(Yc,{size:18}),"Telecharger Bulletin"]})})]})}),f.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[f.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[f.jsxs("h3",{className:"text-lg font-bold text-gray-800 mb-4 flex items-center gap-2",children:[f.jsx(Xi,{size:20,className:"text-socrates-blue"}),"Notes"]}),f.jsxs("div",{className:"space-y-3",children:[C.filter(ne=>{var oe;return(oe=te.enrolledClasses)==null?void 0:oe.includes(ne.id)}).map(ne=>{const oe=k.filter(Sn=>Sn.classId===ne.id),he=oe.length>0?(oe.reduce((Sn,vs)=>Sn+(parseFloat(vs.score)||0),0)/oe.length).toFixed(1):"-";return f.jsxs("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded-lg",children:[f.jsx("span",{className:"font-medium",children:ne.name}),f.jsx("span",{className:"text-2xl font-bold text-socrates-navy",children:he})]},ne.id)}),C.filter(ne=>{var oe;return(oe=te.enrolledClasses)==null?void 0:oe.includes(ne.id)}).length===0&&f.jsx("p",{className:"text-gray-500 text-center py-4",children:"Aucune classe inscrite"})]})]}),f.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[f.jsxs("h3",{className:"text-lg font-bold text-gray-800 mb-4 flex items-center gap-2",children:[f.jsx(il,{size:20,className:"text-socrates-blue"}),"Paiements"]}),f.jsxs("div",{className:`p-4 rounded-lg mb-4 ${ee<=0?"bg-green-50":"bg-red-50"}`,children:[f.jsx("p",{className:"text-sm text-gray-600",children:"Solde actuel"}),f.jsxs("p",{className:`text-3xl font-bold ${ee<=0?"text-green-600":"text-red-600"}`,children:["$",Math.abs(ee).toFixed(2),ee<=0?" (Paye)":" (Du)"]})]}),f.jsxs("div",{className:"space-y-2 max-h-60 overflow-y-auto",children:[U.map(ne=>f.jsxs("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded-lg",children:[f.jsxs("div",{children:[f.jsxs("p",{className:"font-medium",children:["$",ne.amount.toFixed(2)]}),f.jsx("p",{className:"text-xs text-gray-500",children:new Date(ne.date).toLocaleDateString()})]}),f.jsx("button",{onClick:()=>Ai(ne),className:"text-socrates-blue hover:text-socrates-navy",children:f.jsx(Yc,{size:18})})]},ne.id)),U.length===0&&f.jsx("p",{className:"text-gray-500 text-center py-4",children:"Aucun paiement enregistre"})]})]})]})]})]})}return t?f.jsxs("div",{className:"min-h-screen bg-gray-50 flex",children:[f.jsxs("aside",{className:`${p?"w-64":"w-20"} bg-gradient-to-b from-socrates-navy to-socrates-blue text-white transition-all duration-300 flex flex-col`,children:[f.jsx("div",{className:"p-4 border-b border-white/10",children:f.jsxs("div",{className:"flex items-center gap-3",children:[f.jsx("span",{className:"text-3xl",children:"🦉"}),p&&f.jsxs("div",{children:[f.jsx("h1",{className:"font-display text-xl",children:"SOCRATES"}),f.jsx("p",{className:"text-xs text-blue-200 italic",children:"Vers la lumiere"})]})]})}),f.jsx("nav",{className:"flex-1 p-4",children:f.jsx("ul",{className:"space-y-2",children:[{id:"dashboard",icon:NP,label:"Tableau de bord"},{id:"students",icon:eh,label:"Eleves"},{id:"classes",icon:Xi,label:"Classes"},{id:"grades",icon:Xc,label:"Notes"},{id:"payments",icon:il,label:"Paiements"},{id:"settings",icon:LP,label:"Parametres"}].map(k=>f.jsx("li",{children:f.jsxs("button",{onClick:()=>h(k.id),className:`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${u===k.id?"bg-white/20 text-white":"text-blue-100 hover:bg-white/10"}`,children:[f.jsx(k.icon,{size:20}),p&&f.jsx("span",{children:k.label})]})},k.id))})}),f.jsx("div",{className:"p-4 border-t border-white/10",children:f.jsxs("button",{onClick:Wt,className:"w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 rounded-lg transition",children:[f.jsx(Cy,{size:20}),p&&f.jsx("span",{children:"Deconnexion"})]})})]}),f.jsxs("main",{className:"flex-1 overflow-auto",children:[f.jsxs("header",{className:"bg-white shadow-sm px-6 py-4 flex items-center justify-between",children:[f.jsxs("div",{className:"flex items-center gap-4",children:[f.jsx("button",{onClick:()=>y(!p),className:"text-gray-500 hover:text-gray-700",children:f.jsx(OP,{size:24})}),f.jsx("h2",{className:"text-xl font-semibold text-gray-800",children:u==="dashboard"?"Tableau de bord":u==="students"?"Eleves":u==="classes"?"Classes":u==="grades"?"Notes":u==="payments"?"Paiements":"Parametres"})]}),f.jsxs("div",{className:"flex items-center gap-4",children:[f.jsx("span",{className:"text-sm text-gray-500",children:n==null?void 0:n.name}),f.jsx("div",{className:"w-10 h-10 rounded-full bg-socrates-navy text-white flex items-center justify-center font-bold",children:((Or=n==null?void 0:n.name)==null?void 0:Or[0])||"S"})]})]}),f.jsxs("div",{className:"p-6",children:[u==="dashboard"&&f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:"grid md:grid-cols-4 gap-6",children:[f.jsx("div",{className:"bg-white rounded-xl shadow-lg p-6",children:f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsxs("div",{children:[f.jsx("p",{className:"text-sm text-gray-500",children:"Total Eleves"}),f.jsx("p",{className:"text-3xl font-bold text-socrates-navy",children:Ri})]}),f.jsx(eh,{className:"text-socrates-blue",size:32})]})}),f.jsx("div",{className:"bg-white rounded-xl shadow-lg p-6",children:f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsxs("div",{children:[f.jsx("p",{className:"text-sm text-gray-500",children:"Total Classes"}),f.jsx("p",{className:"text-3xl font-bold text-socrates-navy",children:C.length})]}),f.jsx(Xi,{className:"text-green-600",size:32})]})}),f.jsx("div",{className:"bg-white rounded-xl shadow-lg p-6",children:f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsxs("div",{children:[f.jsx("p",{className:"text-sm text-gray-500",children:"Revenus"}),f.jsxs("p",{className:"text-3xl font-bold text-socrates-navy",children:["$",_s.toFixed(0)]})]}),f.jsx(il,{className:"text-yellow-600",size:32})]})}),f.jsx("div",{className:"bg-white rounded-xl shadow-lg p-6",children:f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsxs("div",{children:[f.jsx("p",{className:"text-sm text-gray-500",children:"En attente"}),f.jsx("p",{className:"text-3xl font-bold text-red-500",children:_a})]}),f.jsx(bP,{className:"text-red-500",size:32})]})})]}),f.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[f.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-4",children:"Actions rapides"}),f.jsxs("div",{className:"flex flex-wrap gap-3",children:[f.jsxs("button",{onClick:()=>{h("students"),Vt("student")},className:"bg-socrates-blue text-white px-4 py-2 rounded-lg hover:bg-socrates-navy flex items-center gap-2",children:[f.jsx(Rs,{size:18}),"Ajouter Eleve"]}),f.jsxs("button",{onClick:()=>{h("classes"),Vt("class")},className:"bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2",children:[f.jsx(Rs,{size:18}),"Ajouter Classe"]}),f.jsxs("button",{onClick:()=>{h("payments"),Vt("payment")},className:"bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2",children:[f.jsx(Rs,{size:18}),"Enregistrer Paiement"]})]})]})]}),u==="students"&&f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsxs("div",{className:"relative",children:[f.jsx(VP,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",size:20}),f.jsx("input",{type:"text",placeholder:"Rechercher...",value:P,onChange:k=>I(k.target.value),className:"pl-10 pr-4 py-2 border rounded-lg w-64"})]}),f.jsxs("button",{onClick:()=>Vt("student"),className:"bg-socrates-blue text-white px-4 py-2 rounded-lg hover:bg-socrates-navy flex items-center gap-2",children:[f.jsx(Rs,{size:18}),"Ajouter Eleve"]})]}),f.jsxs("div",{className:"bg-white rounded-xl shadow-lg overflow-hidden",children:[f.jsxs("table",{className:"w-full",children:[f.jsx("thead",{className:"bg-gray-50",children:f.jsxs("tr",{children:[f.jsx("th",{className:"text-left py-4 px-6 text-sm font-medium text-gray-500",children:"Eleve"}),f.jsx("th",{className:"text-left py-4 px-6 text-sm font-medium text-gray-500",children:"Niveau"}),f.jsx("th",{className:"text-left py-4 px-6 text-sm font-medium text-gray-500",children:"Solde"}),f.jsx("th",{className:"text-right py-4 px-6 text-sm font-medium text-gray-500",children:"Actions"})]})}),f.jsx("tbody",{children:ya.map(k=>{var U,ee;return f.jsxs("tr",{className:"border-b hover:bg-gray-50",children:[f.jsx("td",{className:"py-4 px-6",children:f.jsxs("div",{className:"flex items-center gap-3",children:[f.jsxs("div",{className:"w-10 h-10 rounded-full bg-socrates-blue text-white flex items-center justify-center font-bold",children:[(U=k.firstName)==null?void 0:U[0],(ee=k.lastName)==null?void 0:ee[0]]}),f.jsxs("p",{className:"font-medium",children:[k.firstName," ",k.lastName]})]})}),f.jsx("td",{className:"py-4 px-6 text-gray-600",children:k.gradeLevel||"-"}),f.jsx("td",{className:"py-4 px-6",children:f.jsxs("span",{className:`font-semibold ${gs(k.id)>0?"text-red-500":"text-green-500"}`,children:["$",Math.abs(gs(k.id)).toFixed(2)]})}),f.jsx("td",{className:"py-4 px-6",children:f.jsxs("div",{className:"flex items-center justify-end gap-2",children:[f.jsx("button",{onClick:()=>ys(k),className:"p-2 text-gray-500 hover:text-socrates-blue rounded-lg",children:f.jsx(Xc,{size:18})}),f.jsx("button",{onClick:()=>Vt("student",k),className:"p-2 text-gray-500 hover:text-yellow-600 rounded-lg",children:f.jsx(Jc,{size:18})}),f.jsx("button",{onClick:()=>ps(k.id),className:"p-2 text-gray-500 hover:text-red-600 rounded-lg",children:f.jsx(Zc,{size:18})})]})})]},k.id)})})]}),ya.length===0&&f.jsxs("div",{className:"text-center py-12 text-gray-500",children:[f.jsx(eh,{size:48,className:"mx-auto mb-4 opacity-50"}),f.jsx("p",{children:"Aucun eleve"})]})]})]}),u==="classes"&&f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsx("h3",{className:"text-lg font-semibold text-gray-800",children:"Classes"}),f.jsxs("div",{className:"flex gap-2",children:[f.jsxs("button",{onClick:()=>Vt("period"),className:"bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2",children:[f.jsx(DP,{size:18}),"Periodes"]}),f.jsxs("button",{onClick:()=>Vt("class"),className:"bg-socrates-blue text-white px-4 py-2 rounded-lg hover:bg-socrates-navy flex items-center gap-2",children:[f.jsx(Rs,{size:18}),"Ajouter Classe"]})]})]}),O.length>0&&f.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[f.jsx("h4",{className:"font-medium text-gray-700 mb-3",children:"Periodes"}),f.jsx("div",{className:"flex flex-wrap gap-2",children:O.map(k=>f.jsx("span",{className:"bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm",children:k.name},k.id))})]}),f.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[C.map(k=>f.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[f.jsxs("div",{className:"flex items-start justify-between mb-4",children:[f.jsx(Xi,{size:24,className:"text-socrates-blue"}),f.jsxs("div",{className:"flex gap-1",children:[f.jsx("button",{onClick:()=>Vt("class",k),className:"p-2 text-gray-400 hover:text-yellow-600 rounded-lg",children:f.jsx(Jc,{size:16})}),f.jsx("button",{onClick:()=>Ti(k.id),className:"p-2 text-gray-400 hover:text-red-600 rounded-lg",children:f.jsx(Zc,{size:16})})]})]}),f.jsx("h3",{className:"font-semibold text-gray-800",children:k.name}),f.jsx("p",{className:"text-sm text-gray-500",children:k.teacher||"Aucun enseignant"}),f.jsxs("p",{className:"text-sm text-gray-400 mt-2",children:[_.filter(U=>{var ee;return(ee=U.enrolledClasses)==null?void 0:ee.includes(k.id)}).length," eleves"]})]},k.id)),C.length===0&&f.jsxs("div",{className:"col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg",children:[f.jsx(Xi,{size:48,className:"mx-auto mb-4 opacity-50"}),f.jsx("p",{children:"Aucune classe"})]})]})]}),u==="grades"&&f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:"flex items-center gap-4",children:[f.jsxs("select",{value:(Pe==null?void 0:Pe.id)||"",onChange:k=>xn(C.find(U=>U.id===k.target.value)),className:"px-4 py-2 border rounded-lg",children:[f.jsx("option",{value:"",children:"Selectionner classe"}),C.map(k=>f.jsx("option",{value:k.id,children:k.name},k.id))]}),f.jsxs("select",{value:(St==null?void 0:St.id)||"",onChange:k=>$t(O.find(U=>U.id===k.target.value)),className:"px-4 py-2 border rounded-lg",children:[f.jsx("option",{value:"",children:"Selectionner periode"}),O.map(k=>f.jsx("option",{value:k.id,children:k.name},k.id))]})]}),Pe&&St?f.jsxs("div",{className:"bg-white rounded-xl shadow-lg overflow-hidden",children:[f.jsx("div",{className:"p-4 border-b bg-gray-50",children:f.jsxs("h3",{className:"font-semibold",children:[Pe.name," - ",St.name]})}),f.jsxs("table",{className:"w-full",children:[f.jsx("thead",{children:f.jsxs("tr",{className:"border-b",children:[f.jsx("th",{className:"text-left py-3 px-6 text-sm font-medium text-gray-500",children:"Eleve"}),f.jsx("th",{className:"text-left py-3 px-6 text-sm font-medium text-gray-500",children:"Note"}),f.jsx("th",{className:"text-left py-3 px-6 text-sm font-medium text-gray-500",children:"Lettre"})]})}),f.jsx("tbody",{children:_.filter(k=>{var U;return(U=k.enrolledClasses)==null?void 0:U.includes(Pe.id)}).map(k=>{const U=L.find(ee=>ee.studentId===k.id&&ee.classId===Pe.id&&ee.periodId===St.id);return f.jsxs("tr",{className:"border-b hover:bg-gray-50",children:[f.jsxs("td",{className:"py-3 px-6 font-medium",children:[k.firstName," ",k.lastName]}),f.jsx("td",{className:"py-3 px-6",children:f.jsx("input",{type:"number",min:"0",max:"100",value:(U==null?void 0:U.score)||"",onChange:ee=>xi(k.id,Pe.id,St.id,ee.target.value),className:"w-20 px-3 py-1 border rounded",placeholder:"--"})}),f.jsx("td",{className:"py-3 px-6",children:(U==null?void 0:U.score)&&f.jsx("span",{className:`px-2 py-1 rounded text-sm font-bold ${parseFloat(U.score)>=90?"bg-green-100 text-green-700":parseFloat(U.score)>=80?"bg-blue-100 text-blue-700":parseFloat(U.score)>=70?"bg-yellow-100 text-yellow-700":"bg-red-100 text-red-700"}`,children:ga(U.score)})})]},k.id)})})]})]}):f.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-12 text-center text-gray-500",children:[f.jsx(Xc,{size:48,className:"mx-auto mb-4 opacity-50"}),f.jsx("p",{children:"Selectionnez classe et periode"})]})]}),u==="payments"&&f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsx("div",{className:"flex gap-4",children:f.jsxs("div",{className:"bg-white rounded-lg shadow px-4 py-2",children:[f.jsx("span",{className:"text-sm text-gray-500",children:"Total"}),f.jsxs("p",{className:"text-xl font-bold text-green-600",children:["$",_s.toFixed(2)]})]})}),f.jsxs("button",{onClick:()=>Vt("payment"),className:"bg-socrates-blue text-white px-4 py-2 rounded-lg hover:bg-socrates-navy flex items-center gap-2",children:[f.jsx(Rs,{size:18}),"Enregistrer Paiement"]})]}),f.jsxs("div",{className:"bg-white rounded-xl shadow-lg overflow-hidden",children:[f.jsxs("table",{className:"w-full",children:[f.jsx("thead",{className:"bg-gray-50",children:f.jsxs("tr",{children:[f.jsx("th",{className:"text-left py-4 px-6 text-sm font-medium text-gray-500",children:"Date"}),f.jsx("th",{className:"text-left py-4 px-6 text-sm font-medium text-gray-500",children:"Eleve"}),f.jsx("th",{className:"text-left py-4 px-6 text-sm font-medium text-gray-500",children:"Montant"}),f.jsx("th",{className:"text-right py-4 px-6 text-sm font-medium text-gray-500",children:"Actions"})]})}),f.jsx("tbody",{children:E.map(k=>{const U=_.find(ee=>ee.id===k.studentId);return f.jsxs("tr",{className:"border-b hover:bg-gray-50",children:[f.jsx("td",{className:"py-4 px-6 text-gray-600",children:new Date(k.date).toLocaleDateString()}),f.jsx("td",{className:"py-4 px-6 font-medium",children:U?`${U.firstName} ${U.lastName}`:"Inconnu"}),f.jsxs("td",{className:"py-4 px-6 font-semibold text-green-600",children:["$",k.amount.toFixed(2)]}),f.jsx("td",{className:"py-4 px-6",children:f.jsxs("div",{className:"flex items-center justify-end gap-2",children:[f.jsx("button",{onClick:()=>Ai(k),className:"p-2 text-gray-500 hover:text-socrates-blue rounded-lg",children:f.jsx(Yc,{size:18})}),f.jsx("button",{onClick:()=>Vt("payment",k),className:"p-2 text-gray-500 hover:text-yellow-600 rounded-lg",children:f.jsx(Jc,{size:18})}),f.jsx("button",{onClick:()=>ma(k.id),className:"p-2 text-gray-500 hover:text-red-600 rounded-lg",children:f.jsx(Zc,{size:18})})]})})]},k.id)})})]}),E.length===0&&f.jsxs("div",{className:"text-center py-12 text-gray-500",children:[f.jsx(il,{size:48,className:"mx-auto mb-4 opacity-50"}),f.jsx("p",{children:"Aucun paiement"})]})]})]}),u==="settings"&&f.jsxs("div",{className:"max-w-2xl space-y-6",children:[f.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[f.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-4",children:"Ecole"}),f.jsxs("div",{className:"space-y-4",children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Nom"}),f.jsx("input",{type:"text",value:(n==null?void 0:n.name)||"",className:"w-full px-4 py-2 border rounded-lg bg-gray-50",readOnly:!0})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),f.jsx("input",{type:"email",value:(n==null?void 0:n.email)||(t==null?void 0:t.email)||"",className:"w-full px-4 py-2 border rounded-lg bg-gray-50",readOnly:!0})]})]})]}),f.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[f.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-4",children:"Abonnement"}),f.jsxs("div",{className:"flex items-center justify-between p-4 bg-blue-50 rounded-lg",children:[f.jsx("div",{children:f.jsx("p",{className:"font-medium text-socrates-navy",children:(n==null?void 0:n.subscription)==="trial"?"Essai gratuit":"Actif"})}),f.jsx("button",{className:"bg-socrates-blue text-white px-4 py-2 rounded-lg hover:bg-socrates-navy",children:"Mettre a niveau"})]})]})]})]})]}),z&&f.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",children:f.jsxs("div",{className:"bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto",children:[f.jsxs("div",{className:"p-6 border-b flex items-center justify-between",children:[f.jsxs("h3",{className:"text-lg font-semibold text-gray-800",children:[T?"Modifier":"Ajouter"," ",g==="student"?"Eleve":g==="class"?"Classe":g==="period"?"Periode":"Paiement"]}),f.jsx("button",{onClick:()=>{v(!1),A(null),$({})},className:"text-gray-400 hover:text-gray-600",children:f.jsx(MP,{size:24})})]}),f.jsxs("form",{onSubmit:g==="student"?Ju:g==="class"?ms:g==="period"?Ii:g==="payment"?Si:k=>k.preventDefault(),className:"p-6 space-y-4",children:[g==="student"&&f.jsxs(f.Fragment,{children:[f.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Prenom"}),f.jsx("input",{type:"text",required:!0,value:D.firstName||"",onChange:k=>$({...D,firstName:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Nom"}),f.jsx("input",{type:"text",required:!0,value:D.lastName||"",onChange:k=>$({...D,lastName:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Niveau"}),f.jsxs("select",{value:D.gradeLevel||"",onChange:k=>$({...D,gradeLevel:k.target.value}),className:"w-full px-4 py-2 border rounded-lg",children:[f.jsx("option",{value:"",children:"Selectionner"}),["Prescolaire","Maternelle","1ere","2eme","3eme","4eme","5eme","6eme","7eme","8eme","9eme","NS1","NS2","NS3","Philo"].map(k=>f.jsx("option",{value:k,children:k},k))]})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Classes"}),f.jsxs("div",{className:"border rounded-lg p-3 max-h-32 overflow-y-auto space-y-2",children:[C.map(k=>{var U;return f.jsxs("label",{className:"flex items-center gap-2",children:[f.jsx("input",{type:"checkbox",checked:((U=D.enrolledClasses)==null?void 0:U.includes(k.id))||!1,onChange:ee=>{const ne=D.enrolledClasses||[];$({...D,enrolledClasses:ee.target.checked?[...ne,k.id]:ne.filter(oe=>oe!==k.id)})}}),f.jsx("span",{className:"text-sm",children:k.name})]},k.id)}),C.length===0&&f.jsx("p",{className:"text-sm text-gray-500",children:"Aucune classe"})]})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Frais ($)"}),f.jsx("input",{type:"number",min:"0",step:"0.01",value:D.tuitionAmount||"",onChange:k=>$({...D,tuitionAmount:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]}),f.jsxs("div",{className:"border-t pt-4",children:[f.jsx("p",{className:"text-sm font-medium text-gray-700 mb-3",children:"Acces Parent"}),f.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Email parent"}),f.jsx("input",{type:"email",value:D.parentEmail||"",onChange:k=>$({...D,parentEmail:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Tel parent"}),f.jsx("input",{type:"tel",value:D.parentPhone||"",onChange:k=>$({...D,parentPhone:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]})]}),f.jsxs("div",{className:"mt-3",children:[f.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"PIN"}),f.jsx("input",{type:"text",maxLength:6,value:D.parentPin||"",onChange:k=>$({...D,parentPin:k.target.value}),className:"w-full px-4 py-2 border rounded-lg",placeholder:"6 chiffres"})]})]})]}),g==="class"&&f.jsxs(f.Fragment,{children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Nom classe"}),f.jsx("input",{type:"text",required:!0,value:D.name||"",onChange:k=>$({...D,name:k.target.value}),className:"w-full px-4 py-2 border rounded-lg",placeholder:"Mathematiques"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Enseignant"}),f.jsx("input",{type:"text",value:D.teacher||"",onChange:k=>$({...D,teacher:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Salle"}),f.jsx("input",{type:"text",value:D.room||"",onChange:k=>$({...D,room:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]})]}),g==="period"&&f.jsxs(f.Fragment,{children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Nom periode"}),f.jsx("input",{type:"text",required:!0,value:D.name||"",onChange:k=>$({...D,name:k.target.value}),className:"w-full px-4 py-2 border rounded-lg",placeholder:"Trimestre 1"})]}),f.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Debut"}),f.jsx("input",{type:"date",value:D.startDate||"",onChange:k=>$({...D,startDate:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Fin"}),f.jsx("input",{type:"date",value:D.endDate||"",onChange:k=>$({...D,endDate:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]})]})]}),g==="payment"&&f.jsxs(f.Fragment,{children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Eleve"}),f.jsxs("select",{required:!0,value:D.studentId||"",onChange:k=>$({...D,studentId:k.target.value}),className:"w-full px-4 py-2 border rounded-lg",children:[f.jsx("option",{value:"",children:"Selectionner"}),_.map(k=>f.jsxs("option",{value:k.id,children:[k.firstName," ",k.lastName]},k.id))]})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Montant ($)"}),f.jsx("input",{type:"number",required:!0,min:"0",step:"0.01",value:D.amount||"",onChange:k=>$({...D,amount:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Date"}),f.jsx("input",{type:"date",value:D.date||new Date().toISOString().split("T")[0],onChange:k=>$({...D,date:k.target.value}),className:"w-full px-4 py-2 border rounded-lg"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Methode"}),f.jsxs("select",{value:D.method||"Especes",onChange:k=>$({...D,method:k.target.value}),className:"w-full px-4 py-2 border rounded-lg",children:[f.jsx("option",{value:"Especes",children:"Especes"}),f.jsx("option",{value:"Cheque",children:"Cheque"}),f.jsx("option",{value:"Virement",children:"Virement"}),f.jsx("option",{value:"Mobile",children:"Mobile"})]})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Description"}),f.jsx("input",{type:"text",value:D.description||"",onChange:k=>$({...D,description:k.target.value}),className:"w-full px-4 py-2 border rounded-lg",placeholder:"Frais scolarite"})]})]}),f.jsxs("div",{className:"flex gap-3 pt-4",children:[f.jsx("button",{type:"button",onClick:()=>{v(!1),A(null),$({})},className:"flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50",children:"Annuler"}),f.jsx("button",{type:"submit",className:"flex-1 bg-socrates-blue text-white px-4 py-2 rounded-lg hover:bg-socrates-navy",children:T?"Modifier":"Enregistrer"})]})]})]})})]}):f.jsx("div",{className:"min-h-screen bg-gradient-to-br from-socrates-navy via-socrates-blue to-socrates-light flex items-center justify-center p-4",children:f.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl w-full max-w-md p-8",children:[f.jsxs("div",{className:"text-center mb-8",children:[f.jsx("div",{className:"text-6xl mb-2",children:"🦉"}),f.jsx("h1",{className:"font-display text-3xl text-socrates-navy",children:"SOCRATES"}),f.jsx("p",{className:"text-gray-500 italic",children:"Vers la lumiere"})]}),f.jsxs("div",{className:"flex mb-6 bg-gray-100 rounded-lg p-1",children:[f.jsx("button",{onClick:()=>l("login"),className:`flex-1 py-2 rounded-lg text-sm font-medium transition ${o==="login"?"bg-white shadow text-socrates-navy":"text-gray-500"}`,children:"Connexion"}),f.jsx("button",{onClick:()=>l("register"),className:`flex-1 py-2 rounded-lg text-sm font-medium transition ${o==="register"?"bg-white shadow text-socrates-navy":"text-gray-500"}`,children:"Inscription"}),f.jsx("button",{onClick:()=>l("parent"),className:`flex-1 py-2 rounded-lg text-sm font-medium transition ${o==="parent"?"bg-white shadow text-socrates-navy":"text-gray-500"}`,children:"Parent"})]}),o==="login"&&f.jsxs("form",{onSubmit:Ht,className:"space-y-4",children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),f.jsx("input",{type:"email",required:!0,value:D.email||"",onChange:k=>$({...D,email:k.target.value}),className:"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-socrates-blue",placeholder:"ecole@exemple.com"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Mot de passe"}),f.jsx("input",{type:"password",required:!0,value:D.password||"",onChange:k=>$({...D,password:k.target.value}),className:"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-socrates-blue",placeholder:"********"})]}),f.jsx("button",{type:"submit",className:"w-full bg-gradient-to-r from-socrates-navy to-socrates-blue text-white py-3 rounded-lg font-semibold hover:opacity-90",children:"Se connecter"})]}),o==="register"&&f.jsxs("form",{onSubmit:qt,className:"space-y-4",children:[f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Nom de l ecole"}),f.jsx("input",{type:"text",required:!0,value:D.schoolName||"",onChange:k=>$({...D,schoolName:k.target.value}),className:"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-socrates-blue",placeholder:"Academie Excellence"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),f.jsx("input",{type:"email",required:!0,value:D.email||"",onChange:k=>$({...D,email:k.target.value}),className:"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-socrates-blue",placeholder:"admin@ecole.com"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Telephone"}),f.jsx("input",{type:"tel",value:D.phone||"",onChange:k=>$({...D,phone:k.target.value}),className:"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-socrates-blue",placeholder:"+509 1234 5678"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Mot de passe"}),f.jsx("input",{type:"password",required:!0,minLength:6,value:D.password||"",onChange:k=>$({...D,password:k.target.value}),className:"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-socrates-blue",placeholder:"Min 6 caracteres"})]}),f.jsx("button",{type:"submit",className:"w-full bg-gradient-to-r from-socrates-navy to-socrates-blue text-white py-3 rounded-lg font-semibold hover:opacity-90",children:"Creer un compte"}),f.jsx("p",{className:"text-xs text-center text-gray-500",children:"30 jours essai gratuit"})]}),o==="parent"&&f.jsxs("form",{onSubmit:Xu,className:"space-y-4",children:[f.jsx("div",{className:"bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4",children:f.jsx("p",{className:"text-sm text-blue-800",children:"Entrez email ou telephone et PIN fournis par ecole."})}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email ou Telephone"}),f.jsx("input",{type:"text",required:!0,value:D.parentContact||"",onChange:k=>$({...D,parentContact:k.target.value}),className:"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-socrates-blue",placeholder:"parent@email.com"})]}),f.jsxs("div",{children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"PIN"}),f.jsx("input",{type:"password",required:!0,maxLength:6,value:D.parentPin||"",onChange:k=>$({...D,parentPin:k.target.value}),className:"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-socrates-blue text-center text-2xl tracking-widest",placeholder:"******"})]}),f.jsx("button",{type:"submit",className:"w-full bg-gradient-to-r from-socrates-navy to-socrates-blue text-white py-3 rounded-lg font-semibold hover:opacity-90",children:"Acceder au portail"})]})]})})}th.createRoot(document.getElementById("root")).render(f.jsx(KE.StrictMode,{children:f.jsx(jP,{})}));
