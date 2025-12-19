var Yd=Object.defineProperty;var $d=(i,e,t)=>e in i?Yd(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var R=(i,e,t)=>$d(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fl="166",jd=0,Lc=1,Kd=2,Lu=1,Zd=2,Gn=3,Qn=0,Ft=1,rn=2,yt=0,Rn=1,Ln=2,Dc=3,Nc=4,Jd=5,Yn=100,Qd=101,ef=102,tf=103,nf=104,sf=200,rf=201,of=202,af=203,lr=204,cr=205,lf=206,cf=207,hf=208,uf=209,df=210,ff=211,pf=212,mf=213,gf=214,_f=0,vf=1,xf=2,xo=3,yf=4,Mf=5,Sf=6,wf=7,Du=0,bf=1,Af=2,Kn=0,Tf=1,Ef=2,Cf=3,Nu=4,Rf=5,Pf=6,If=7,Uc="attached",Lf="detached",Uu=300,ys=301,Ms=302,ka=303,Ha=304,Po=306,un=1e3,on=1001,yo=1002,Je=1003,Fu=1004,Qs=1005,et=1006,lo=1007,an=1008,dn=1009,Ou=1010,Bu=1011,gi=1012,Ol=1013,Ni=1014,Sn=1015,wn=1016,Bl=1017,zl=1018,Ss=1020,zu=35902,ku=1021,Hu=1022,qt=1023,Vu=1024,Gu=1025,pi=1026,ws=1027,kl=1028,Hl=1029,Wu=1030,Vl=1031,Gl=1033,co=33776,ho=33777,uo=33778,fo=33779,Va=35840,Ga=35841,Wa=35842,Xa=35843,qa=36196,Ya=37492,$a=37496,ja=37808,Ka=37809,Za=37810,Ja=37811,Qa=37812,el=37813,tl=37814,nl=37815,il=37816,sl=37817,rl=37818,ol=37819,al=37820,ll=37821,po=36492,cl=36494,hl=36495,Xu=36283,ul=36284,dl=36285,fl=36286,er=2200,pl=2201,Df=2202,hr=2300,ur=2301,Ko=2302,ps=2400,ms=2401,Mo=2402,Wl=2500,Nf=2501,Uf=0,qu=1,ml=2,Ff=3200,Of=3201,Xl=0,Bf=1,xn="",zt="srgb",wt="srgb-linear",ql="display-p3",Io="display-p3-linear",So="linear",pt="srgb",wo="rec709",bo="p3",Vi=7680,Fc=519,zf=512,kf=513,Hf=514,Yu=515,Vf=516,Gf=517,Wf=518,Xf=519,gl=35044,dr=35048,Oc="300 es",$n=2e3,Ao=2001;class Oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bc=1234567;const ir=Math.PI/180,bs=180/Math.PI;function bn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function Rt(i,e,t){return Math.max(e,Math.min(t,i))}function Yl(i,e){return(i%e+e)%e}function qf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Yf(i,e,t){return i!==e?(t-i)/(e-i):0}function sr(i,e,t){return(1-t)*i+t*e}function $f(i,e,t,n){return sr(i,e,1-Math.exp(-t*n))}function jf(i,e=1){return e-Math.abs(Yl(i,e*2)-e)}function Kf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Zf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Jf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Qf(i,e){return i+Math.random()*(e-i)}function ep(i){return i*(.5-Math.random())}function tp(i){i!==void 0&&(Bc=i);let e=Bc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function np(i){return i*ir}function ip(i){return i*bs}function sp(i){return(i&i-1)===0&&i!==0}function rp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function op(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ap(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const lp={DEG2RAD:ir,RAD2DEG:bs,generateUUID:bn,clamp:Rt,euclideanModulo:Yl,mapLinear:qf,inverseLerp:Yf,lerp:sr,damp:$f,pingpong:jf,smoothstep:Kf,smootherstep:Zf,randInt:Jf,randFloat:Qf,randFloatSpread:ep,seededRandom:tp,degToRad:np,radToDeg:ip,isPowerOfTwo:sp,ceilPowerOfTwo:rp,floorPowerOfTwo:op,setQuaternionFromProperEuler:ap,normalize:ot,denormalize:yn};class Z{constructor(e=0,t=0){Z.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,s,r,o,a,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],v=s[1],x=s[4],w=s[7],N=s[2],E=s[5],C=s[8];return r[0]=o*_+a*v+l*N,r[3]=o*m+a*x+l*E,r[6]=o*p+a*w+l*C,r[1]=c*_+h*v+u*N,r[4]=c*m+h*x+u*E,r[7]=c*p+h*w+u*C,r[2]=d*_+f*v+g*N,r[5]=d*m+f*x+g*E,r[8]=d*p+f*w+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Zo.makeScale(e,t)),this}rotate(e){return this.premultiply(Zo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zo=new Ve;function $u(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function cp(){const i=fr("canvas");return i.style.display="block",i}const zc={};function $l(i){i in zc||(zc[i]=!0,console.warn(i))}function hp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const kc=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Hc=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Cr={[wt]:{transfer:So,primaries:wo,toReference:i=>i,fromReference:i=>i},[zt]:{transfer:pt,primaries:wo,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Io]:{transfer:So,primaries:bo,toReference:i=>i.applyMatrix3(Hc),fromReference:i=>i.applyMatrix3(kc)},[ql]:{transfer:pt,primaries:bo,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Hc),fromReference:i=>i.applyMatrix3(kc).convertLinearToSRGB()}},up=new Set([wt,Io]),Qe={enabled:!0,_workingColorSpace:wt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!up.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Cr[e].toReference,s=Cr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Cr[i].primaries},getTransfer:function(i){return i===xn?So:Cr[i].transfer}};function _s(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Jo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Gi;class dp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gi===void 0&&(Gi=fr("canvas")),Gi.width=e.width,Gi.height=e.height;const n=Gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=_s(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_s(t[n]/255)*255):t[n]=_s(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fp=0;class ju{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=bn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Qo(s[o].image)):r.push(Qo(s[o]))}else r=Qo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Qo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?dp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let pp=0;class Pt extends Oi{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=on,s=on,r=et,o=an,a=qt,l=dn,c=Pt.DEFAULT_ANISOTROPY,h=xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=bn(),this.name="",this.source=new ju(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Z(0,0),this.repeat=new Z(1,1),this.center=new Z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case un:e.x=e.x-Math.floor(e.x);break;case on:e.x=e.x<0?0:1;break;case yo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case un:e.y=e.y-Math.floor(e.y);break;case on:e.y=e.y<0?0:1;break;case yo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=Uu;Pt.DEFAULT_ANISOTROPY=1;class Ke{constructor(e=0,t=0,n=0,s=1){Ke.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,w=(f+1)/2,N=(p+1)/2,E=(h+d)/4,C=(u+_)/4,P=(g+m)/4;return x>w&&x>N?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=E/n,r=C/n):w>N?w<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),n=E/s,r=P/s):N<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),n=C/r,s=P/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mp extends Oi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ke(0,0,e,t),this.scissorTest=!1,this.viewport=new Ke(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:et,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Pt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ju(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vt extends mp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ku extends Pt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=on,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gp extends Pt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=on,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class at{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const N=Math.sqrt(x),E=Math.atan2(N,p*v);m=Math.sin(m*E)/N,a=Math.sin(a*E)/N}const w=a*v;if(l=l*m+d*w,c=c*m+f*w,h=h*m+g*w,u=u*m+_*w,m===1-a){const N=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=N,c*=N,h*=N,u*=N}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ea.copy(this).projectOnVector(e),this.sub(ea)}reflect(e){return this.sub(ea.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ea=new T,Vc=new at;class ei{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(e.matrixWorld),this.expandByPoint(gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rr.copy(n.boundingBox)),Rr.applyMatrix4(e.matrixWorld),this.union(Rr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,gn),gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zs),Pr.subVectors(this.max,zs),Wi.subVectors(e.a,zs),Xi.subVectors(e.b,zs),qi.subVectors(e.c,zs),si.subVectors(Xi,Wi),ri.subVectors(qi,Xi),vi.subVectors(Wi,qi);let t=[0,-si.z,si.y,0,-ri.z,ri.y,0,-vi.z,vi.y,si.z,0,-si.x,ri.z,0,-ri.x,vi.z,0,-vi.x,-si.y,si.x,0,-ri.y,ri.x,0,-vi.y,vi.x,0];return!ta(t,Wi,Xi,qi,Pr)||(t=[1,0,0,0,1,0,0,0,1],!ta(t,Wi,Xi,qi,Pr))?!1:(Ir.crossVectors(si,ri),t=[Ir.x,Ir.y,Ir.z],ta(t,Wi,Xi,qi,Pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const On=[new T,new T,new T,new T,new T,new T,new T,new T],gn=new T,Rr=new ei,Wi=new T,Xi=new T,qi=new T,si=new T,ri=new T,vi=new T,zs=new T,Pr=new T,Ir=new T,xi=new T;function ta(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){xi.fromArray(i,r);const a=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),l=e.dot(xi),c=t.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const _p=new ei,ks=new T,na=new T;class Nn{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):_p.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ks.subVectors(e,this.center);const t=ks.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ks,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(na.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ks.copy(e.center).add(na)),this.expandByPoint(ks.copy(e.center).sub(na))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new T,ia=new T,Lr=new T,oi=new T,sa=new T,Dr=new T,ra=new T;class Lo{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bn.copy(this.origin).addScaledVector(this.direction,t),Bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ia.copy(e).add(t).multiplyScalar(.5),Lr.copy(t).sub(e).normalize(),oi.copy(this.origin).sub(ia);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Lr),a=oi.dot(this.direction),l=-oi.dot(Lr),c=oi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ia).addScaledVector(Lr,d),f}intersectSphere(e,t){Bn.subVectors(e.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Bn)!==null}intersectTriangle(e,t,n,s,r){sa.subVectors(t,e),Dr.subVectors(n,e),ra.crossVectors(sa,Dr);let o=this.direction.dot(ra),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;oi.subVectors(this.origin,e);const l=a*this.direction.dot(Dr.crossVectors(oi,Dr));if(l<0)return null;const c=a*this.direction.dot(sa.cross(oi));if(c<0||l+c>o)return null;const h=-a*oi.dot(ra);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ie{constructor(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m){Ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m)}set(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ie().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Yi.setFromMatrixColumn(e,0).length(),r=1/Yi.setFromMatrixColumn(e,1).length(),o=1/Yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vp,e,xp)}lookAt(e,t,n){const s=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),ai.crossVectors(n,jt),ai.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),ai.crossVectors(n,jt)),ai.normalize(),Nr.crossVectors(jt,ai),s[0]=ai.x,s[4]=Nr.x,s[8]=jt.x,s[1]=ai.y,s[5]=Nr.y,s[9]=jt.y,s[2]=ai.z,s[6]=Nr.z,s[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],x=n[7],w=n[11],N=n[15],E=s[0],C=s[4],P=s[8],b=s[12],y=s[1],A=s[5],z=s[9],O=s[13],q=s[2],$=s[6],W=s[10],j=s[14],Y=s[3],le=s[7],_e=s[11],de=s[15];return r[0]=o*E+a*y+l*q+c*Y,r[4]=o*C+a*A+l*$+c*le,r[8]=o*P+a*z+l*W+c*_e,r[12]=o*b+a*O+l*j+c*de,r[1]=h*E+u*y+d*q+f*Y,r[5]=h*C+u*A+d*$+f*le,r[9]=h*P+u*z+d*W+f*_e,r[13]=h*b+u*O+d*j+f*de,r[2]=g*E+_*y+m*q+p*Y,r[6]=g*C+_*A+m*$+p*le,r[10]=g*P+_*z+m*W+p*_e,r[14]=g*b+_*O+m*j+p*de,r[3]=v*E+x*y+w*q+N*Y,r[7]=v*C+x*A+w*$+N*le,r[11]=v*P+x*z+w*W+N*_e,r[15]=v*b+x*O+w*j+N*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-t*l*u+t*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,x=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,w=h*_*c-g*u*c+g*a*f-o*_*f-h*a*p+o*u*p,N=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,E=t*v+n*x+s*w+r*N;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return e[0]=v*C,e[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*C,e[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*p+n*l*p)*C,e[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*C,e[4]=x*C,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*C,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*C,e[7]=(o*d*r-h*l*r+h*s*c-t*d*c-o*s*f+t*l*f)*C,e[8]=w*C,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*C,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*p+t*a*p)*C,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*C,e[12]=N*C,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*C,e[14]=(g*a*s-o*_*s-g*n*l+t*_*l+o*n*m-t*a*m)*C,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*d+t*a*d)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,v=l*c,x=l*h,w=l*u,N=n.x,E=n.y,C=n.z;return s[0]=(1-(_+p))*N,s[1]=(f+w)*N,s[2]=(g-x)*N,s[3]=0,s[4]=(f-w)*E,s[5]=(1-(d+p))*E,s[6]=(m+v)*E,s[7]=0,s[8]=(g+x)*C,s[9]=(m-v)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Yi.set(s[0],s[1],s[2]).length();const o=Yi.set(s[4],s[5],s[6]).length(),a=Yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],_n.copy(this);const c=1/r,h=1/o,u=1/a;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=$n){const l=this.elements,c=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(a===$n)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ao)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=$n){const l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(o-r),d=(t+e)*c,f=(n+s)*h;let g,_;if(a===$n)g=(o+r)*u,_=-2*u;else if(a===Ao)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Yi=new T,_n=new Ie,vp=new T(0,0,0),xp=new T(1,1,1),ai=new T,Nr=new T,jt=new T,Gc=new Ie,Wc=new at;class mt{constructor(e=0,t=0,n=0,s=mt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wc.setFromEuler(this),this.setFromQuaternion(Wc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mt.DEFAULT_ORDER="XYZ";class Zu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yp=0;const Xc=new T,$i=new at,zn=new Ie,Ur=new T,Hs=new T,Mp=new T,Sp=new at,qc=new T(1,0,0),Yc=new T(0,1,0),$c=new T(0,0,1),jc={type:"added"},wp={type:"removed"},ji={type:"childadded",child:null},oa={type:"childremoved",child:null};class ut extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ut.DEFAULT_UP.clone();const e=new T,t=new mt,n=new at,s=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ie},normalMatrix:{value:new Ve}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.multiply($i),this}rotateOnWorldAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.premultiply($i),this}rotateX(e){return this.rotateOnAxis(qc,e)}rotateY(e){return this.rotateOnAxis(Yc,e)}rotateZ(e){return this.rotateOnAxis($c,e)}translateOnAxis(e,t){return Xc.copy(e).applyQuaternion(this.quaternion),this.position.add(Xc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qc,e)}translateY(e){return this.translateOnAxis(Yc,e)}translateZ(e){return this.translateOnAxis($c,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ur.copy(e):Ur.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Hs,Ur,this.up):zn.lookAt(Ur,Hs,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(zn),this.quaternion.premultiply($i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jc),ji.child=e,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wp),oa.child=e,this.dispatchEvent(oa),oa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jc),ji.child=e,this.dispatchEvent(ji),ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,e,Mp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,Sp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ut.DEFAULT_UP=new T(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new T,kn=new T,aa=new T,Hn=new T,Ki=new T,Zi=new T,Kc=new T,la=new T,ca=new T,ha=new T;class Mn{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vn.subVectors(e,t),s.cross(vn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vn.subVectors(s,t),kn.subVectors(n,t),aa.subVectors(e,t);const o=vn.dot(vn),a=vn.dot(kn),l=vn.dot(aa),c=kn.dot(kn),h=kn.dot(aa),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static isFrontFacing(e,t,n,s){return vn.subVectors(n,t),kn.subVectors(e,t),vn.cross(kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),vn.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Mn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Ki.subVectors(s,n),Zi.subVectors(r,n),la.subVectors(e,n);const l=Ki.dot(la),c=Zi.dot(la);if(l<=0&&c<=0)return t.copy(n);ca.subVectors(e,s);const h=Ki.dot(ca),u=Zi.dot(ca);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Ki,o);ha.subVectors(e,r);const f=Ki.dot(ha),g=Zi.dot(ha);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Zi,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Kc.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(Kc,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Ki,o).addScaledVector(Zi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ju={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Fr={h:0,s:0,l:0};function ua(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class te{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Qe.workingColorSpace){if(e=Yl(e,1),t=Rt(t,0,1),n=Rt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ua(o,r,e+1/3),this.g=ua(o,r,e),this.b=ua(o,r,e-1/3)}return Qe.toWorkingColorSpace(this,s),this}setStyle(e,t=zt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const n=Ju[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}copyLinearToSRGB(e){return this.r=Jo(e.r),this.g=Jo(e.g),this.b=Jo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return Qe.fromWorkingColorSpace(Bt.copy(this),e),Math.round(Rt(Bt.r*255,0,255))*65536+Math.round(Rt(Bt.g*255,0,255))*256+Math.round(Rt(Bt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(Bt.copy(this),t);const n=Bt.r,s=Bt.g,r=Bt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=zt){Qe.fromWorkingColorSpace(Bt.copy(this),e);const t=Bt.r,n=Bt.g,s=Bt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(Fr);const n=sr(li.h,Fr.h,t),s=sr(li.s,Fr.s,t),r=sr(li.l,Fr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new te;te.NAMES=Ju;let bp=0;class hn extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=bn(),this.name="",this.type="Material",this.blending=Rn,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lr,this.blendDst=cr,this.blendEquation=Yn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=xo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Rn&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lr&&(n.blendSrc=this.blendSrc),this.blendDst!==cr&&(n.blendDst=this.blendDst),this.blendEquation!==Yn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class ln extends hn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mt,this.combine=Du,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new T,Or=new Z;class Mt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return $l("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyMatrix3(e),this.setXY(t,Or.x,Or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gl&&(e.usage=this.usage),e}}class Qu extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ed extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class dt extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ap=0;const nn=new Ie,da=new ut,Ji=new T,Kt=new ei,Vs=new ei,Dt=new T;class gt extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=bn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($u(e)?ed:Qu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return da.lookAt(e),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ei);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Kt.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(e){const n=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Vs.setFromBufferAttribute(a),this.morphTargetsRelative?(Dt.addVectors(Kt.min,Vs.min),Kt.expandByPoint(Dt),Dt.addVectors(Kt.max,Vs.max),Kt.expandByPoint(Dt)):(Kt.expandByPoint(Vs.min),Kt.expandByPoint(Vs.max))}Kt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Dt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Dt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Dt.fromBufferAttribute(a,c),l&&(Ji.fromBufferAttribute(e,c),Dt.add(Ji)),s=Math.max(s,n.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new T,l[P]=new T;const c=new T,h=new T,u=new T,d=new Z,f=new Z,g=new Z,_=new T,m=new T;function p(P,b,y){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(A),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(A),a[P].add(_),a[b].add(_),a[y].add(_),l[P].add(m),l[b].add(m),l[y].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let P=0,b=v.length;P<b;++P){const y=v[P],A=y.start,z=y.count;for(let O=A,q=A+z;O<q;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const x=new T,w=new T,N=new T,E=new T;function C(P){N.fromBufferAttribute(s,P),E.copy(N);const b=a[P];x.copy(b),x.sub(N.multiplyScalar(N.dot(b))).normalize(),w.crossVectors(E,b);const A=w.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,A)}for(let P=0,b=v.length;P<b;++P){const y=v[P],A=y.start,z=y.count;for(let O=A,q=A+z;O<q;O+=3)C(e.getX(O+0)),C(e.getX(O+1)),C(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new T,r=new T,o=new T,a=new T,l=new T,c=new T,h=new T,u=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Mt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zc=new Ie,yi=new Lo,Br=new Nn,Jc=new T,Qi=new T,es=new T,ts=new T,fa=new T,zr=new T,kr=new Z,Hr=new Z,Vr=new Z,Qc=new T,eh=new T,th=new T,Gr=new T,Wr=new T;class ht extends ut{constructor(e=new gt,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){zr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(fa.fromBufferAttribute(u,e),o?zr.addScaledVector(fa,h):zr.addScaledVector(fa.sub(t),h))}t.add(zr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(r),yi.copy(e.ray).recast(e.near),!(Br.containsPoint(yi.origin)===!1&&(yi.intersectSphere(Br,Jc)===null||yi.origin.distanceToSquared(Jc)>(e.far-e.near)**2))&&(Zc.copy(r).invert(),yi.copy(e.ray).applyMatrix4(Zc),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,yi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let w=v,N=x;w<N;w+=3){const E=a.getX(w),C=a.getX(w+1),P=a.getX(w+2);s=Xr(this,p,e,n,c,h,u,E,C,P),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=a.getX(m),x=a.getX(m+1),w=a.getX(m+2);s=Xr(this,o,e,n,c,h,u,v,x,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let w=v,N=x;w<N;w+=3){const E=w,C=w+1,P=w+2;s=Xr(this,p,e,n,c,h,u,E,C,P),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=m,x=m+1,w=m+2;s=Xr(this,o,e,n,c,h,u,v,x,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Tp(i,e,t,n,s,r,o,a){let l;if(e.side===Ft?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Qn,a),l===null)return null;Wr.copy(a),Wr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Wr);return c<t.near||c>t.far?null:{distance:c,point:Wr.clone(),object:i}}function Xr(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Qi),i.getVertexPosition(l,es),i.getVertexPosition(c,ts);const h=Tp(i,e,t,n,Qi,es,ts,Gr);if(h){s&&(kr.fromBufferAttribute(s,a),Hr.fromBufferAttribute(s,l),Vr.fromBufferAttribute(s,c),h.uv=Mn.getInterpolation(Gr,Qi,es,ts,kr,Hr,Vr,new Z)),r&&(kr.fromBufferAttribute(r,a),Hr.fromBufferAttribute(r,l),Vr.fromBufferAttribute(r,c),h.uv1=Mn.getInterpolation(Gr,Qi,es,ts,kr,Hr,Vr,new Z)),o&&(Qc.fromBufferAttribute(o,a),eh.fromBufferAttribute(o,l),th.fromBufferAttribute(o,c),h.normal=Mn.getInterpolation(Gr,Qi,es,ts,Qc,eh,th,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new T,materialIndex:0};Mn.getNormal(Qi,es,ts,u.normal),h.face=u}return h}class Rs extends gt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(u,2));function g(_,m,p,v,x,w,N,E,C,P,b){const y=w/C,A=N/P,z=w/2,O=N/2,q=E/2,$=C+1,W=P+1;let j=0,Y=0;const le=new T;for(let _e=0;_e<W;_e++){const de=_e*A-O;for(let Ce=0;Ce<$;Ce++){const Me=Ce*y-z;le[_]=Me*v,le[m]=de*x,le[p]=q,c.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[p]=E>0?1:-1,h.push(le.x,le.y,le.z),u.push(Ce/C),u.push(1-_e/P),j+=1}}for(let _e=0;_e<P;_e++)for(let de=0;de<C;de++){const Ce=d+de+$*_e,Me=d+de+$*(_e+1),X=d+(de+1)+$*(_e+1),Q=d+(de+1)+$*_e;l.push(Ce,Me,Q),l.push(Me,X,Q),Y+=6}a.addGroup(f,Y,b),f+=Y,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function As(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Wt(i){const e={};for(let t=0;t<i.length;t++){const n=As(i[t]);for(const s in n)e[s]=n[s]}return e}function Ep(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function td(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const fi={clone:As,merge:Wt};var Cp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends hn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cp,this.fragmentShader=Rp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=Ep(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class nd extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=$n}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ci=new T,nh=new Z,ih=new Z;class kt extends nd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ir*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ci.x,ci.y).multiplyScalar(-e/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-e/ci.z)}getViewSize(e,t){return this.getViewBounds(e,nh,ih),t.subVectors(ih,nh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ir*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ns=-90,is=1;class Pp extends ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new kt(ns,is,e,t);s.layers=this.layers,this.add(s);const r=new kt(ns,is,e,t);r.layers=this.layers,this.add(r);const o=new kt(ns,is,e,t);o.layers=this.layers,this.add(o);const a=new kt(ns,is,e,t);a.layers=this.layers,this.add(a);const l=new kt(ns,is,e,t);l.layers=this.layers,this.add(l);const c=new kt(ns,is,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===$n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ao)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class id extends Pt{constructor(e,t,n,s,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ys,super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ip extends Vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new id(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:et}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Rs(5,5,5),r=new Tt({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:yt});r.uniforms.tEquirect.value=t;const o=new ht(s,r),a=t.minFilter;return t.minFilter===an&&(t.minFilter=et),new Pp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const pa=new T,Lp=new T,Dp=new Ve;class di{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=pa.subVectors(n,t).cross(Lp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(pa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Dp.getNormalMatrix(e),s=this.coplanarPoint(pa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new Nn,qr=new T;class jl{constructor(e=new di,t=new di,n=new di,s=new di,r=new di,o=new di){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=$n){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],v=s[13],x=s[14],w=s[15];if(n[0].setComponents(l-r,d-c,m-f,w-p).normalize(),n[1].setComponents(l+r,d+c,m+f,w+p).normalize(),n[2].setComponents(l+o,d+h,m+g,w+v).normalize(),n[3].setComponents(l-o,d-h,m-g,w-v).normalize(),n[4].setComponents(l-a,d-u,m-_,w-x).normalize(),t===$n)n[5].setComponents(l+a,d+u,m+_,w+x).normalize();else if(t===Ao)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(qr.x=s.normal.x>0?e.max.x:e.min.x,qr.y=s.normal.y>0?e.max.y:e.min.y,qr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(qr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Np(i){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(i.bindBuffer(c,a),u.count===-1&&d.length===0&&i.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class ti extends gt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const v=p*d-o;for(let x=0;x<c;x++){const w=x*u-r;g.push(w,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const x=v+c*p,w=v+c*(p+1),N=v+1+c*(p+1),E=v+1+c*p;f.push(x,w,E),f.push(w,N,E)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ti(e.width,e.height,e.widthSegments,e.heightSegments)}}var Up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$p=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,em=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,im=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,sm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,om=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,um="gl_FragColor = linearToOutputTexel( gl_FragColor );",dm=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,fm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_m=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ym=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,wm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Em=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Im=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Dm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Um=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Fm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Om=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,km=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ym=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$m=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Km=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ig=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ug=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ug=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Og=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Vg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$g=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,t0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,n0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,r0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,c0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,h0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,d0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,f0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:Up,alphahash_pars_fragment:Fp,alphamap_fragment:Op,alphamap_pars_fragment:Bp,alphatest_fragment:zp,alphatest_pars_fragment:kp,aomap_fragment:Hp,aomap_pars_fragment:Vp,batching_pars_vertex:Gp,batching_vertex:Wp,begin_vertex:Xp,beginnormal_vertex:qp,bsdfs:Yp,iridescence_fragment:$p,bumpmap_pars_fragment:jp,clipping_planes_fragment:Kp,clipping_planes_pars_fragment:Zp,clipping_planes_pars_vertex:Jp,clipping_planes_vertex:Qp,color_fragment:em,color_pars_fragment:tm,color_pars_vertex:nm,color_vertex:im,common:sm,cube_uv_reflection_fragment:rm,defaultnormal_vertex:om,displacementmap_pars_vertex:am,displacementmap_vertex:lm,emissivemap_fragment:cm,emissivemap_pars_fragment:hm,colorspace_fragment:um,colorspace_pars_fragment:dm,envmap_fragment:fm,envmap_common_pars_fragment:pm,envmap_pars_fragment:mm,envmap_pars_vertex:gm,envmap_physical_pars_fragment:Em,envmap_vertex:_m,fog_vertex:vm,fog_pars_vertex:xm,fog_fragment:ym,fog_pars_fragment:Mm,gradientmap_pars_fragment:Sm,lightmap_pars_fragment:wm,lights_lambert_fragment:bm,lights_lambert_pars_fragment:Am,lights_pars_begin:Tm,lights_toon_fragment:Cm,lights_toon_pars_fragment:Rm,lights_phong_fragment:Pm,lights_phong_pars_fragment:Im,lights_physical_fragment:Lm,lights_physical_pars_fragment:Dm,lights_fragment_begin:Nm,lights_fragment_maps:Um,lights_fragment_end:Fm,logdepthbuf_fragment:Om,logdepthbuf_pars_fragment:Bm,logdepthbuf_pars_vertex:zm,logdepthbuf_vertex:km,map_fragment:Hm,map_pars_fragment:Vm,map_particle_fragment:Gm,map_particle_pars_fragment:Wm,metalnessmap_fragment:Xm,metalnessmap_pars_fragment:qm,morphinstance_vertex:Ym,morphcolor_vertex:$m,morphnormal_vertex:jm,morphtarget_pars_vertex:Km,morphtarget_vertex:Zm,normal_fragment_begin:Jm,normal_fragment_maps:Qm,normal_pars_fragment:eg,normal_pars_vertex:tg,normal_vertex:ng,normalmap_pars_fragment:ig,clearcoat_normal_fragment_begin:sg,clearcoat_normal_fragment_maps:rg,clearcoat_pars_fragment:og,iridescence_pars_fragment:ag,opaque_fragment:lg,packing:cg,premultiplied_alpha_fragment:hg,project_vertex:ug,dithering_fragment:dg,dithering_pars_fragment:fg,roughnessmap_fragment:pg,roughnessmap_pars_fragment:mg,shadowmap_pars_fragment:gg,shadowmap_pars_vertex:_g,shadowmap_vertex:vg,shadowmask_pars_fragment:xg,skinbase_vertex:yg,skinning_pars_vertex:Mg,skinning_vertex:Sg,skinnormal_vertex:wg,specularmap_fragment:bg,specularmap_pars_fragment:Ag,tonemapping_fragment:Tg,tonemapping_pars_fragment:Eg,transmission_fragment:Cg,transmission_pars_fragment:Rg,uv_pars_fragment:Pg,uv_pars_vertex:Ig,uv_vertex:Lg,worldpos_vertex:Dg,background_vert:Ng,background_frag:Ug,backgroundCube_vert:Fg,backgroundCube_frag:Og,cube_vert:Bg,cube_frag:zg,depth_vert:kg,depth_frag:Hg,distanceRGBA_vert:Vg,distanceRGBA_frag:Gg,equirect_vert:Wg,equirect_frag:Xg,linedashed_vert:qg,linedashed_frag:Yg,meshbasic_vert:$g,meshbasic_frag:jg,meshlambert_vert:Kg,meshlambert_frag:Zg,meshmatcap_vert:Jg,meshmatcap_frag:Qg,meshnormal_vert:e0,meshnormal_frag:t0,meshphong_vert:n0,meshphong_frag:i0,meshphysical_vert:s0,meshphysical_frag:r0,meshtoon_vert:o0,meshtoon_frag:a0,points_vert:l0,points_frag:c0,shadow_vert:h0,shadow_frag:u0,sprite_vert:d0,sprite_frag:f0},ue={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Cn={basic:{uniforms:Wt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Wt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new te(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Wt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Wt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Wt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new te(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Wt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Wt([ue.points,ue.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Wt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Wt([ue.common,ue.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Wt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Wt([ue.sprite,ue.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Wt([ue.common,ue.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Wt([ue.lights,ue.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Cn.physical={uniforms:Wt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Yr={r:0,b:0,g:0},Si=new mt,p0=new Ie;function m0(i,e,t,n,s,r,o){const a=new te(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const w=g(v);w===null?p(a,l):w&&w.isColor&&(p(w,1),x=!0);const N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===Po)?(h===void 0&&(h=new ht(new Rs(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:As(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Si.copy(x.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(p0.makeRotationFromEuler(Si)),h.material.toneMapped=Qe.getTransfer(w.colorSpace)!==pt,(u!==w||d!==w.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new ht(new ti(2,2),new Tt({name:"BackgroundMaterial",uniforms:As(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(w.colorSpace)!==pt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=w,d=w.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,x){v.getRGB(Yr,td(i)),n.buffers.color.setClear(Yr.r,Yr.g,Yr.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(a,l)},render:_,addToRenderList:m}}function g0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(y,A,z,O,q){let $=!1;const W=u(O,z,A);r!==W&&(r=W,c(r.object)),$=f(y,O,z,q),$&&g(y,O,z,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,w(y,A,z,O),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,A,z){const O=z.wireframe===!0;let q=n[y.id];q===void 0&&(q={},n[y.id]=q);let $=q[A.id];$===void 0&&($={},q[A.id]=$);let W=$[O];return W===void 0&&(W=d(l()),$[O]=W),W}function d(y){const A=[],z=[],O=[];for(let q=0;q<t;q++)A[q]=0,z[q]=0,O[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:z,attributeDivisors:O,object:y,attributes:{},index:null}}function f(y,A,z,O){const q=r.attributes,$=A.attributes;let W=0;const j=z.getAttributes();for(const Y in j)if(j[Y].location>=0){const _e=q[Y];let de=$[Y];if(de===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(de=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(de=y.instanceColor)),_e===void 0||_e.attribute!==de||de&&_e.data!==de.data)return!0;W++}return r.attributesNum!==W||r.index!==O}function g(y,A,z,O){const q={},$=A.attributes;let W=0;const j=z.getAttributes();for(const Y in j)if(j[Y].location>=0){let _e=$[Y];_e===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(_e=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(_e=y.instanceColor));const de={};de.attribute=_e,_e&&_e.data&&(de.data=_e.data),q[Y]=de,W++}r.attributes=q,r.attributesNum=W,r.index=O}function _(){const y=r.newAttributes;for(let A=0,z=y.length;A<z;A++)y[A]=0}function m(y){p(y,0)}function p(y,A){const z=r.newAttributes,O=r.enabledAttributes,q=r.attributeDivisors;z[y]=1,O[y]===0&&(i.enableVertexAttribArray(y),O[y]=1),q[y]!==A&&(i.vertexAttribDivisor(y,A),q[y]=A)}function v(){const y=r.newAttributes,A=r.enabledAttributes;for(let z=0,O=A.length;z<O;z++)A[z]!==y[z]&&(i.disableVertexAttribArray(z),A[z]=0)}function x(y,A,z,O,q,$,W){W===!0?i.vertexAttribIPointer(y,A,z,q,$):i.vertexAttribPointer(y,A,z,O,q,$)}function w(y,A,z,O){_();const q=O.attributes,$=z.getAttributes(),W=A.defaultAttributeValues;for(const j in $){const Y=$[j];if(Y.location>=0){let le=q[j];if(le===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(le=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(le=y.instanceColor)),le!==void 0){const _e=le.normalized,de=le.itemSize,Ce=e.get(le);if(Ce===void 0)continue;const Me=Ce.buffer,X=Ce.type,Q=Ce.bytesPerElement,he=X===i.INT||X===i.UNSIGNED_INT||le.gpuType===Ol;if(le.isInterleavedBufferAttribute){const fe=le.data,Oe=fe.stride,be=le.offset;if(fe.isInstancedInterleavedBuffer){for(let Ne=0;Ne<Y.locationSize;Ne++)p(Y.location+Ne,fe.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Ne=0;Ne<Y.locationSize;Ne++)m(Y.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let Ne=0;Ne<Y.locationSize;Ne++)x(Y.location+Ne,de/Y.locationSize,X,_e,Oe*Q,(be+de/Y.locationSize*Ne)*Q,he)}else{if(le.isInstancedBufferAttribute){for(let fe=0;fe<Y.locationSize;fe++)p(Y.location+fe,le.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let fe=0;fe<Y.locationSize;fe++)m(Y.location+fe);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let fe=0;fe<Y.locationSize;fe++)x(Y.location+fe,de/Y.locationSize,X,_e,de*Q,de/Y.locationSize*fe*Q,he)}}else if(W!==void 0){const _e=W[j];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(Y.location,_e);break;case 3:i.vertexAttrib3fv(Y.location,_e);break;case 4:i.vertexAttrib4fv(Y.location,_e);break;default:i.vertexAttrib1fv(Y.location,_e)}}}}v()}function N(){P();for(const y in n){const A=n[y];for(const z in A){const O=A[z];for(const q in O)h(O[q].object),delete O[q];delete A[z]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;const A=n[y.id];for(const z in A){const O=A[z];for(const q in O)h(O[q].object),delete O[q];delete A[z]}delete n[y.id]}function C(y){for(const A in n){const z=n[A];if(z[y.id]===void 0)continue;const O=z[y.id];for(const q in O)h(O[q].object),delete O[q];delete z[y.id]}}function P(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:N,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function _0(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function v0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==qt&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const C=E===wn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==dn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Sn&&!C)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=f>0,N=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:w,maxSamples:N}}function x0(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new di,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const v=r?0:n,x=v*4;let w=p.clippingState||null;l.value=w,w=h(g,d,x,f);for(let N=0;N!==x;++N)w[N]=t[N];p.clippingState=w,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,w=f;x!==_;++x,w+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(m,w),m[w+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function y0(i){let e=new WeakMap;function t(o,a){return a===ka?o.mapping=ys:a===Ha&&(o.mapping=Ms),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ka||a===Ha)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ip(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class vr extends nd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const gs=4,sh=[.125,.215,.35,.446,.526,.582],Ei=20,ma=new vr,rh=new te;let ga=null,_a=0,va=0,xa=!1;const Ti=(1+Math.sqrt(5))/2,ss=1/Ti,oh=[new T(-Ti,ss,0),new T(Ti,ss,0),new T(-ss,0,Ti),new T(ss,0,Ti),new T(0,Ti,-ss),new T(0,Ti,ss),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)];class _l{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ga=this._renderer.getRenderTarget(),_a=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ga,_a,va),this._renderer.xr.enabled=xa,e.scissorTest=!1,$r(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ys||e.mapping===Ms?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ga=this._renderer.getRenderTarget(),_a=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:et,minFilter:et,generateMipmaps:!1,type:wn,format:qt,colorSpace:wt,depthBuffer:!1},s=ah(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ah(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=M0(r)),this._blurMaterial=S0(r,e,t)}return s}_compileMaterial(e){const t=new ht(this._lodPlanes[0],e);this._renderer.compile(t,ma)}_sceneToCubeUV(e,t,n,s){const a=new kt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(rh),h.toneMapping=Kn,h.autoClear=!1;const f=new ln({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),g=new ht(new Rs,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(rh),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):v===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;$r(s,v*x,p>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ys||e.mapping===Ms;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ht(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;$r(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ma)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=oh[(s-r-1)%oh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ht(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ei-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ei;m>Ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ei}`);const p=[];let v=0;for(let C=0;C<Ei;++C){const P=C/_,b=Math.exp(-P*P/2);p.push(b),C===0?v+=b:C<m&&(v+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const w=this._sizeLods[s],N=3*w*(s>x-gs?s-x+gs:0),E=4*(this._cubeSize-w);$r(t,N,E,3*w,2*w),l.setRenderTarget(t),l.render(u,ma)}}function M0(i){const e=[],t=[],n=[];let s=i;const r=i-gs+1+sh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-gs?l=sh[o-i+gs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*f),x=new Float32Array(m*g*f),w=new Float32Array(p*g*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,P=E>2?0:-1,b=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];v.set(b,_*g*E),x.set(d,m*g*E);const y=[E,E,E,E,E,E];w.set(y,p*g*E)}const N=new gt;N.setAttribute("position",new Mt(v,_)),N.setAttribute("uv",new Mt(x,m)),N.setAttribute("faceIndex",new Mt(w,p)),e.push(N),s>gs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ah(i,e,t){const n=new Vt(i,e,t);return n.texture.mapping=Po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $r(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function S0(i,e,t){const n=new Float32Array(Ei),s=new T(0,1,0);return new Tt({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yt,depthTest:!1,depthWrite:!1})}function lh(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yt,depthTest:!1,depthWrite:!1})}function ch(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yt,depthTest:!1,depthWrite:!1})}function Kl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function w0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ka||l===Ha,h=l===ys||l===Ms;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new _l(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new _l(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function b0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&$l("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function A0(i,e,t,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,w=v.length;x<w;x+=3){const N=v[x+0],E=v[x+1],C=v[x+2];d.push(N,E,E,C,C,N)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,w=v.length/3-1;x<w;x+=3){const N=x+0,E=x+1,C=x+2;d.push(N,E,E,C,C,N)}}else return;const m=new($u(d)?ed:Qu)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function T0(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v];for(let v=0;v<_.length;v++)t.update(p,n,_[v])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function E0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function C0(i,e,t){const n=new WeakMap,s=new Ke;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let w=0;g===!0&&(w=1),_===!0&&(w=2),m===!0&&(w=3);let N=a.attributes.position.count*w,E=1;N>e.maxTextureSize&&(E=Math.ceil(N/e.maxTextureSize),N=e.maxTextureSize);const C=new Float32Array(N*E*4*u),P=new Ku(C,N,E,u);P.type=Sn,P.needsUpdate=!0;const b=w*4;for(let A=0;A<u;A++){const z=p[A],O=v[A],q=x[A],$=N*E*4*A;for(let W=0;W<z.count;W++){const j=W*b;g===!0&&(s.fromBufferAttribute(z,W),C[$+j+0]=s.x,C[$+j+1]=s.y,C[$+j+2]=s.z,C[$+j+3]=0),_===!0&&(s.fromBufferAttribute(O,W),C[$+j+4]=s.x,C[$+j+5]=s.y,C[$+j+6]=s.z,C[$+j+7]=0),m===!0&&(s.fromBufferAttribute(q,W),C[$+j+8]=s.x,C[$+j+9]=s.y,C[$+j+10]=s.z,C[$+j+11]=q.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new Z(N,E)},n.set(a,d),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function R0(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class pr extends Pt{constructor(e,t,n,s,r,o,a,l,c,h=pi){if(h!==pi&&h!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===pi&&(n=Ni),n===void 0&&h===ws&&(n=Ss),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Je,this.minFilter=l!==void 0?l:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const rd=new Pt,hh=new pr(1,1),od=new Ku,ad=new gp,ld=new id,uh=[],dh=[],fh=new Float32Array(16),ph=new Float32Array(9),mh=new Float32Array(4);function Ps(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=uh[s];if(r===void 0&&(r=new Float32Array(s),uh[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function It(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Do(i,e){let t=dh[e];t===void 0&&(t=new Int32Array(e),dh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function P0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function I0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2fv(this.addr,e),Lt(t,e)}}function L0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;i.uniform3fv(this.addr,e),Lt(t,e)}}function D0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4fv(this.addr,e),Lt(t,e)}}function N0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;mh.set(n),i.uniformMatrix2fv(this.addr,!1,mh),Lt(t,n)}}function U0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;ph.set(n),i.uniformMatrix3fv(this.addr,!1,ph),Lt(t,n)}}function F0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;fh.set(n),i.uniformMatrix4fv(this.addr,!1,fh),Lt(t,n)}}function O0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function B0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2iv(this.addr,e),Lt(t,e)}}function z0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3iv(this.addr,e),Lt(t,e)}}function k0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4iv(this.addr,e),Lt(t,e)}}function H0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function V0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2uiv(this.addr,e),Lt(t,e)}}function G0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3uiv(this.addr,e),Lt(t,e)}}function W0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4uiv(this.addr,e),Lt(t,e)}}function X0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(hh.compareFunction=Yu,r=hh):r=rd,t.setTexture2D(e||r,s)}function q0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ad,s)}function Y0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||ld,s)}function $0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||od,s)}function j0(i){switch(i){case 5126:return P0;case 35664:return I0;case 35665:return L0;case 35666:return D0;case 35674:return N0;case 35675:return U0;case 35676:return F0;case 5124:case 35670:return O0;case 35667:case 35671:return B0;case 35668:case 35672:return z0;case 35669:case 35673:return k0;case 5125:return H0;case 36294:return V0;case 36295:return G0;case 36296:return W0;case 35678:case 36198:case 36298:case 36306:case 35682:return X0;case 35679:case 36299:case 36307:return q0;case 35680:case 36300:case 36308:case 36293:return Y0;case 36289:case 36303:case 36311:case 36292:return $0}}function K0(i,e){i.uniform1fv(this.addr,e)}function Z0(i,e){const t=Ps(e,this.size,2);i.uniform2fv(this.addr,t)}function J0(i,e){const t=Ps(e,this.size,3);i.uniform3fv(this.addr,t)}function Q0(i,e){const t=Ps(e,this.size,4);i.uniform4fv(this.addr,t)}function e_(i,e){const t=Ps(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function t_(i,e){const t=Ps(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function n_(i,e){const t=Ps(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function i_(i,e){i.uniform1iv(this.addr,e)}function s_(i,e){i.uniform2iv(this.addr,e)}function r_(i,e){i.uniform3iv(this.addr,e)}function o_(i,e){i.uniform4iv(this.addr,e)}function a_(i,e){i.uniform1uiv(this.addr,e)}function l_(i,e){i.uniform2uiv(this.addr,e)}function c_(i,e){i.uniform3uiv(this.addr,e)}function h_(i,e){i.uniform4uiv(this.addr,e)}function u_(i,e,t){const n=this.cache,s=e.length,r=Do(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||rd,r[o])}function d_(i,e,t){const n=this.cache,s=e.length,r=Do(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||ad,r[o])}function f_(i,e,t){const n=this.cache,s=e.length,r=Do(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||ld,r[o])}function p_(i,e,t){const n=this.cache,s=e.length,r=Do(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||od,r[o])}function m_(i){switch(i){case 5126:return K0;case 35664:return Z0;case 35665:return J0;case 35666:return Q0;case 35674:return e_;case 35675:return t_;case 35676:return n_;case 5124:case 35670:return i_;case 35667:case 35671:return s_;case 35668:case 35672:return r_;case 35669:case 35673:return o_;case 5125:return a_;case 36294:return l_;case 36295:return c_;case 36296:return h_;case 35678:case 36198:case 36298:case 36306:case 35682:return u_;case 35679:case 36299:case 36307:return d_;case 35680:case 36300:case 36308:case 36293:return f_;case 36289:case 36303:case 36311:case 36292:return p_}}class g_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=j0(t.type)}}class __{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=m_(t.type)}}class v_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function gh(i,e){i.seq.push(e),i.map[e.id]=e}function x_(i,e,t){const n=i.name,s=n.length;for(ya.lastIndex=0;;){const r=ya.exec(n),o=ya.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){gh(t,c===void 0?new g_(a,i,e):new __(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new v_(a),gh(t,u)),t=u}}}class mo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);x_(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function _h(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const y_=37297;let M_=0;function S_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function w_(i){const e=Qe.getPrimaries(Qe.workingColorSpace),t=Qe.getPrimaries(i);let n;switch(e===t?n="":e===bo&&t===wo?n="LinearDisplayP3ToLinearSRGB":e===wo&&t===bo&&(n="LinearSRGBToLinearDisplayP3"),i){case wt:case Io:return[n,"LinearTransferOETF"];case zt:case ql:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function vh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+S_(i.getShaderSource(e),o)}else return s}function b_(i,e){const t=w_(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function A_(i,e){let t;switch(e){case Tf:t="Linear";break;case Ef:t="Reinhard";break;case Cf:t="OptimizedCineon";break;case Nu:t="ACESFilmic";break;case Pf:t="AgX";break;case If:t="Neutral";break;case Rf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function T_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function E_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function C_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function tr(i){return i!==""}function xh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const R_=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(i){return i.replace(R_,I_)}const P_=new Map;function I_(i,e){let t=He[e];if(t===void 0){const n=P_.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return vl(t)}const L_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mh(i){return i.replace(L_,D_)}function D_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function N_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Lu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Zd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function U_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ys:case Ms:e="ENVMAP_TYPE_CUBE";break;case Po:e="ENVMAP_TYPE_CUBE_UV";break}return e}function F_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ms:e="ENVMAP_MODE_REFRACTION";break}return e}function O_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Du:e="ENVMAP_BLENDING_MULTIPLY";break;case bf:e="ENVMAP_BLENDING_MIX";break;case Af:e="ENVMAP_BLENDING_ADD";break}return e}function B_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function z_(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=N_(t),c=U_(t),h=F_(t),u=O_(t),d=B_(t),f=T_(t),g=E_(r),_=s.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(tr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(tr).join(`
`),p.length>0&&(p+=`
`)):(m=[Sh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),p=[Sh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kn?"#define TONE_MAPPING":"",t.toneMapping!==Kn?He.tonemapping_pars_fragment:"",t.toneMapping!==Kn?A_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,b_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(tr).join(`
`)),o=vl(o),o=xh(o,t),o=yh(o,t),a=vl(a),a=xh(a,t),a=yh(a,t),o=Mh(o),a=Mh(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=v+m+o,w=v+p+a,N=_h(s,s.VERTEX_SHADER,x),E=_h(s,s.FRAGMENT_SHADER,w);s.attachShader(_,N),s.attachShader(_,E),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(A){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(_).trim(),O=s.getShaderInfoLog(N).trim(),q=s.getShaderInfoLog(E).trim();let $=!0,W=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,N,E);else{const j=vh(s,N,"vertex"),Y=vh(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+z+`
`+j+`
`+Y)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||q==="")&&(W=!1);W&&(A.diagnostics={runnable:$,programLog:z,vertexShader:{log:O,prefix:m},fragmentShader:{log:q,prefix:p}})}s.deleteShader(N),s.deleteShader(E),P=new mo(s,_),b=C_(s,_)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,y_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=M_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=N,this.fragmentShader=E,this}let k_=0;class H_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new V_(e),t.set(e,n)),n}}class V_{constructor(e){this.id=k_++,this.code=e,this.usedTimes=0}}function G_(i,e,t,n,s,r,o){const a=new Zu,l=new H_,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,y,A,z,O){const q=z.fog,$=O.geometry,W=b.isMeshStandardMaterial?z.environment:null,j=(b.isMeshStandardMaterial?t:e).get(b.envMap||W),Y=j&&j.mapping===Po?j.image.height:null,le=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const _e=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,de=_e!==void 0?_e.length:0;let Ce=0;$.morphAttributes.position!==void 0&&(Ce=1),$.morphAttributes.normal!==void 0&&(Ce=2),$.morphAttributes.color!==void 0&&(Ce=3);let Me,X,Q,he;if(le){const Ze=Cn[le];Me=Ze.vertexShader,X=Ze.fragmentShader}else Me=b.vertexShader,X=b.fragmentShader,l.update(b),Q=l.getVertexShaderID(b),he=l.getFragmentShaderID(b);const fe=i.getRenderTarget(),Oe=O.isInstancedMesh===!0,be=O.isBatchedMesh===!0,Ne=!!b.map,tt=!!b.matcap,D=!!j,ft=!!b.aoMap,Xe=!!b.lightMap,qe=!!b.bumpMap,Se=!!b.normalMap,lt=!!b.displacementMap,Ue=!!b.emissiveMap,ze=!!b.metalnessMap,L=!!b.roughnessMap,S=b.anisotropy>0,G=b.clearcoat>0,ne=b.dispersion>0,ie=b.iridescence>0,ee=b.sheen>0,Te=b.transmission>0,ce=S&&!!b.anisotropyMap,ve=G&&!!b.clearcoatMap,ke=G&&!!b.clearcoatNormalMap,se=G&&!!b.clearcoatRoughnessMap,me=ie&&!!b.iridescenceMap,Ge=ie&&!!b.iridescenceThicknessMap,Re=ee&&!!b.sheenColorMap,xe=ee&&!!b.sheenRoughnessMap,Ae=!!b.specularMap,Pe=!!b.specularColorMap,ct=!!b.specularIntensityMap,F=Te&&!!b.transmissionMap,re=Te&&!!b.thicknessMap,K=!!b.gradientMap,J=!!b.alphaMap,ae=b.alphaTest>0,Fe=!!b.alphaHash,je=!!b.extensions;let _t=Kn;b.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(_t=i.toneMapping);const Et={shaderID:le,shaderType:b.type,shaderName:b.name,vertexShader:Me,fragmentShader:X,defines:b.defines,customVertexShaderID:Q,customFragmentShaderID:he,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:be,batchingColor:be&&O._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&O.instanceColor!==null,instancingMorph:Oe&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:fe===null?i.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:wt,alphaToCoverage:!!b.alphaToCoverage,map:Ne,matcap:tt,envMap:D,envMapMode:D&&j.mapping,envMapCubeUVHeight:Y,aoMap:ft,lightMap:Xe,bumpMap:qe,normalMap:Se,displacementMap:d&&lt,emissiveMap:Ue,normalMapObjectSpace:Se&&b.normalMapType===Bf,normalMapTangentSpace:Se&&b.normalMapType===Xl,metalnessMap:ze,roughnessMap:L,anisotropy:S,anisotropyMap:ce,clearcoat:G,clearcoatMap:ve,clearcoatNormalMap:ke,clearcoatRoughnessMap:se,dispersion:ne,iridescence:ie,iridescenceMap:me,iridescenceThicknessMap:Ge,sheen:ee,sheenColorMap:Re,sheenRoughnessMap:xe,specularMap:Ae,specularColorMap:Pe,specularIntensityMap:ct,transmission:Te,transmissionMap:F,thicknessMap:re,gradientMap:K,opaque:b.transparent===!1&&b.blending===Rn&&b.alphaToCoverage===!1,alphaMap:J,alphaTest:ae,alphaHash:Fe,combine:b.combine,mapUv:Ne&&_(b.map.channel),aoMapUv:ft&&_(b.aoMap.channel),lightMapUv:Xe&&_(b.lightMap.channel),bumpMapUv:qe&&_(b.bumpMap.channel),normalMapUv:Se&&_(b.normalMap.channel),displacementMapUv:lt&&_(b.displacementMap.channel),emissiveMapUv:Ue&&_(b.emissiveMap.channel),metalnessMapUv:ze&&_(b.metalnessMap.channel),roughnessMapUv:L&&_(b.roughnessMap.channel),anisotropyMapUv:ce&&_(b.anisotropyMap.channel),clearcoatMapUv:ve&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:ke&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:xe&&_(b.sheenRoughnessMap.channel),specularMapUv:Ae&&_(b.specularMap.channel),specularColorMapUv:Pe&&_(b.specularColorMap.channel),specularIntensityMapUv:ct&&_(b.specularIntensityMap.channel),transmissionMapUv:F&&_(b.transmissionMap.channel),thicknessMapUv:re&&_(b.thicknessMap.channel),alphaMapUv:J&&_(b.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Se||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!$.attributes.uv&&(Ne||J),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:O.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ce,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:_t,decodeVideoTexture:Ne&&b.map.isVideoTexture===!0&&Qe.getTransfer(b.map.colorSpace)===pt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===rn,flipSided:b.side===Ft,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:je&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(je&&b.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Et.vertexUv1s=c.has(1),Et.vertexUv2s=c.has(2),Et.vertexUv3s=c.has(3),c.clear(),Et}function p(b){const y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(const A in b.defines)y.push(A),y.push(b.defines[A]);return b.isRawShaderMaterial===!1&&(v(y,b),x(y,b),y.push(i.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function v(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function x(b,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.doubleSided&&a.enable(10),y.flipSided&&a.enable(11),y.useDepthPacking&&a.enable(12),y.dithering&&a.enable(13),y.transmission&&a.enable(14),y.sheen&&a.enable(15),y.opaque&&a.enable(16),y.pointsUvs&&a.enable(17),y.decodeVideoTexture&&a.enable(18),y.alphaToCoverage&&a.enable(19),b.push(a.mask)}function w(b){const y=g[b.type];let A;if(y){const z=Cn[y];A=fi.clone(z.uniforms)}else A=b.uniforms;return A}function N(b,y){let A;for(let z=0,O=h.length;z<O;z++){const q=h[z];if(q.cacheKey===y){A=q,++A.usedTimes;break}}return A===void 0&&(A=new z_(i,y,b,r),h.push(A)),A}function E(b){if(--b.usedTimes===0){const y=h.indexOf(b);h[y]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:w,acquireProgram:N,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:P}}function W_(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function X_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function wh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||X_),n.length>1&&n.sort(d||wh),s.length>1&&s.sort(d||wh)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function q_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new bh,i.set(n,[o])):s>=r.length?(o=new bh,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Y_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new te};break;case"SpotLight":t={position:new T,direction:new T,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new te,groundColor:new te};break;case"RectAreaLight":t={color:new te,position:new T,halfWidth:new T,halfHeight:new T};break}return i[e.id]=t,t}}}function $_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let j_=0;function K_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Z_(i){const e=new Y_,t=$_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);const s=new T,r=new Ie,o=new Ie;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,v=0,x=0,w=0,N=0,E=0,C=0;c.sort(K_);for(let b=0,y=c.length;b<y;b++){const A=c[b],z=A.color,O=A.intensity,q=A.distance,$=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=z.r*O,u+=z.g*O,d+=z.b*O;else if(A.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(A.sh.coefficients[W],O);C++}else if(A.isDirectionalLight){const W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const j=A.shadow,Y=t.get(A);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=A.shadow.matrix,v++}n.directional[f]=W,f++}else if(A.isSpotLight){const W=e.get(A);W.position.setFromMatrixPosition(A.matrixWorld),W.color.copy(z).multiplyScalar(O),W.distance=q,W.coneCos=Math.cos(A.angle),W.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),W.decay=A.decay,n.spot[_]=W;const j=A.shadow;if(A.map&&(n.spotLightMap[N]=A.map,N++,j.updateMatrices(A),A.castShadow&&E++),n.spotLightMatrix[_]=j.matrix,A.castShadow){const Y=t.get(A);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,n.spotShadow[_]=Y,n.spotShadowMap[_]=$,w++}_++}else if(A.isRectAreaLight){const W=e.get(A);W.color.copy(z).multiplyScalar(O),W.halfWidth.set(A.width*.5,0,0),W.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=W,m++}else if(A.isPointLight){const W=e.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),W.distance=A.distance,W.decay=A.decay,A.castShadow){const j=A.shadow,Y=t.get(A);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,Y.shadowCameraNear=j.camera.near,Y.shadowCameraFar=j.camera.far,n.pointShadow[g]=Y,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=A.shadow.matrix,x++}n.point[g]=W,g++}else if(A.isHemisphereLight){const W=e.get(A);W.skyColor.copy(A.color).multiplyScalar(O),W.groundColor.copy(A.groundColor).multiplyScalar(O),n.hemi[p]=W,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==v||P.numPointShadows!==x||P.numSpotShadows!==w||P.numSpotMaps!==N||P.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=w,n.spotShadowMap.length=w,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=w+N-E,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=v,P.numPointShadows=x,P.numSpotShadows=w,P.numSpotMaps=N,P.numLightProbes=C,n.version=j_++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const x=c[p];if(x.isDirectionalLight){const w=n.directional[u];w.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),u++}else if(x.isSpotLight){const w=n.spot[f];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const w=n.rectArea[g];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const w=n.point[d];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const w=n.hemi[_];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Ah(i){const e=new Z_(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function J_(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Ah(i),e.set(s,[a])):r>=o.length?(a=new Ah(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Q_ extends hn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ev extends hn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function iv(i,e,t){let n=new jl;const s=new Z,r=new Z,o=new Ke,a=new Q_({depthPacking:Of}),l=new ev,c={},h=t.maxTextureSize,u={[Qn]:Ft,[Ft]:Qn,[rn]:rn},d=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Z},radius:{value:4}},vertexShader:tv,fragmentShader:nv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new gt;g.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ht(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lu;let p=this.type;this.render=function(E,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const b=i.getRenderTarget(),y=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),z=i.state;z.setBlending(yt),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const O=p!==Gn&&this.type===Gn,q=p===Gn&&this.type!==Gn;for(let $=0,W=E.length;$<W;$++){const j=E[$],Y=j.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const le=Y.getFrameExtents();if(s.multiply(le),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/le.x),s.x=r.x*le.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/le.y),s.y=r.y*le.y,Y.mapSize.y=r.y)),Y.map===null||O===!0||q===!0){const de=this.type!==Gn?{minFilter:Je,magFilter:Je}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Vt(s.x,s.y,de),Y.map.texture.name=j.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const _e=Y.getViewportCount();for(let de=0;de<_e;de++){const Ce=Y.getViewport(de);o.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),z.viewport(o),Y.updateMatrices(j,de),n=Y.getFrustum(),w(C,P,Y.camera,j,this.type)}Y.isPointLightShadow!==!0&&this.type===Gn&&v(Y,P),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,y,A)};function v(E,C){const P=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Vt(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,P,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,P,f,_,null)}function x(E,C,P,b){let y=null;const A=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(A!==void 0)y=A;else if(y=P.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const z=y.uuid,O=C.uuid;let q=c[z];q===void 0&&(q={},c[z]=q);let $=q[O];$===void 0&&($=y.clone(),q[O]=$,C.addEventListener("dispose",N)),y=$}if(y.visible=C.visible,y.wireframe=C.wireframe,b===Gn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const z=i.properties.get(y);z.light=P}return y}function w(E,C,P,b,y){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===Gn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);const O=e.update(E),q=E.material;if(Array.isArray(q)){const $=O.groups;for(let W=0,j=$.length;W<j;W++){const Y=$[W],le=q[Y.materialIndex];if(le&&le.visible){const _e=x(E,le,b,y);E.onBeforeShadow(i,E,C,P,O,_e,Y),i.renderBufferDirect(P,null,O,_e,E,Y),E.onAfterShadow(i,E,C,P,O,_e,Y)}}}else if(q.visible){const $=x(E,q,b,y);E.onBeforeShadow(i,E,C,P,O,$,null),i.renderBufferDirect(P,null,O,$,E,null),E.onAfterShadow(i,E,C,P,O,$,null)}}const z=E.children;for(let O=0,q=z.length;O<q;O++)w(z[O],C,P,b,y)}function N(E){E.target.removeEventListener("dispose",N);for(const P in c){const b=c[P],y=E.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}function sv(i){function e(){let F=!1;const re=new Ke;let K=null;const J=new Ke(0,0,0,0);return{setMask:function(ae){K!==ae&&!F&&(i.colorMask(ae,ae,ae,ae),K=ae)},setLocked:function(ae){F=ae},setClear:function(ae,Fe,je,_t,Et){Et===!0&&(ae*=_t,Fe*=_t,je*=_t),re.set(ae,Fe,je,_t),J.equals(re)===!1&&(i.clearColor(ae,Fe,je,_t),J.copy(re))},reset:function(){F=!1,K=null,J.set(-1,0,0,0)}}}function t(){let F=!1,re=null,K=null,J=null;return{setTest:function(ae){ae?he(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(ae){re!==ae&&!F&&(i.depthMask(ae),re=ae)},setFunc:function(ae){if(K!==ae){switch(ae){case _f:i.depthFunc(i.NEVER);break;case vf:i.depthFunc(i.ALWAYS);break;case xf:i.depthFunc(i.LESS);break;case xo:i.depthFunc(i.LEQUAL);break;case yf:i.depthFunc(i.EQUAL);break;case Mf:i.depthFunc(i.GEQUAL);break;case Sf:i.depthFunc(i.GREATER);break;case wf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=ae}},setLocked:function(ae){F=ae},setClear:function(ae){J!==ae&&(i.clearDepth(ae),J=ae)},reset:function(){F=!1,re=null,K=null,J=null}}}function n(){let F=!1,re=null,K=null,J=null,ae=null,Fe=null,je=null,_t=null,Et=null;return{setTest:function(Ze){F||(Ze?he(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(Ze){re!==Ze&&!F&&(i.stencilMask(Ze),re=Ze)},setFunc:function(Ze,fn,en){(K!==Ze||J!==fn||ae!==en)&&(i.stencilFunc(Ze,fn,en),K=Ze,J=fn,ae=en)},setOp:function(Ze,fn,en){(Fe!==Ze||je!==fn||_t!==en)&&(i.stencilOp(Ze,fn,en),Fe=Ze,je=fn,_t=en)},setLocked:function(Ze){F=Ze},setClear:function(Ze){Et!==Ze&&(i.clearStencil(Ze),Et=Ze)},reset:function(){F=!1,re=null,K=null,J=null,ae=null,Fe=null,je=null,_t=null,Et=null}}}const s=new e,r=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,v=null,x=null,w=null,N=null,E=new te(0,0,0),C=0,P=!1,b=null,y=null,A=null,z=null,O=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,W=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(j)[1]),$=W>=1):j.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),$=W>=2);let Y=null,le={};const _e=i.getParameter(i.SCISSOR_BOX),de=i.getParameter(i.VIEWPORT),Ce=new Ke().fromArray(_e),Me=new Ke().fromArray(de);function X(F,re,K,J){const ae=new Uint8Array(4),Fe=i.createTexture();i.bindTexture(F,Fe),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<K;je++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(re+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return Fe}const Q={};Q[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),he(i.DEPTH_TEST),r.setFunc(xo),qe(!1),Se(Lc),he(i.CULL_FACE),ft(yt);function he(F){c[F]!==!0&&(i.enable(F),c[F]=!0)}function fe(F){c[F]!==!1&&(i.disable(F),c[F]=!1)}function Oe(F,re){return h[F]!==re?(i.bindFramebuffer(F,re),h[F]=re,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=re),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=re),!0):!1}function be(F,re){let K=d,J=!1;if(F){K=u.get(re),K===void 0&&(K=[],u.set(re,K));const ae=F.textures;if(K.length!==ae.length||K[0]!==i.COLOR_ATTACHMENT0){for(let Fe=0,je=ae.length;Fe<je;Fe++)K[Fe]=i.COLOR_ATTACHMENT0+Fe;K.length=ae.length,J=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,J=!0);J&&i.drawBuffers(K)}function Ne(F){return f!==F?(i.useProgram(F),f=F,!0):!1}const tt={[Yn]:i.FUNC_ADD,[Qd]:i.FUNC_SUBTRACT,[ef]:i.FUNC_REVERSE_SUBTRACT};tt[tf]=i.MIN,tt[nf]=i.MAX;const D={[sf]:i.ZERO,[rf]:i.ONE,[of]:i.SRC_COLOR,[lr]:i.SRC_ALPHA,[df]:i.SRC_ALPHA_SATURATE,[hf]:i.DST_COLOR,[lf]:i.DST_ALPHA,[af]:i.ONE_MINUS_SRC_COLOR,[cr]:i.ONE_MINUS_SRC_ALPHA,[uf]:i.ONE_MINUS_DST_COLOR,[cf]:i.ONE_MINUS_DST_ALPHA,[ff]:i.CONSTANT_COLOR,[pf]:i.ONE_MINUS_CONSTANT_COLOR,[mf]:i.CONSTANT_ALPHA,[gf]:i.ONE_MINUS_CONSTANT_ALPHA};function ft(F,re,K,J,ae,Fe,je,_t,Et,Ze){if(F===yt){g===!0&&(fe(i.BLEND),g=!1);return}if(g===!1&&(he(i.BLEND),g=!0),F!==Jd){if(F!==_||Ze!==P){if((m!==Yn||x!==Yn)&&(i.blendEquation(i.FUNC_ADD),m=Yn,x=Yn),Ze)switch(F){case Rn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ln:i.blendFunc(i.ONE,i.ONE);break;case Dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Rn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ln:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}p=null,v=null,w=null,N=null,E.set(0,0,0),C=0,_=F,P=Ze}return}ae=ae||re,Fe=Fe||K,je=je||J,(re!==m||ae!==x)&&(i.blendEquationSeparate(tt[re],tt[ae]),m=re,x=ae),(K!==p||J!==v||Fe!==w||je!==N)&&(i.blendFuncSeparate(D[K],D[J],D[Fe],D[je]),p=K,v=J,w=Fe,N=je),(_t.equals(E)===!1||Et!==C)&&(i.blendColor(_t.r,_t.g,_t.b,Et),E.copy(_t),C=Et),_=F,P=!1}function Xe(F,re){F.side===rn?fe(i.CULL_FACE):he(i.CULL_FACE);let K=F.side===Ft;re&&(K=!K),qe(K),F.blending===Rn&&F.transparent===!1?ft(yt):ft(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);const J=F.stencilWrite;o.setTest(J),J&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ue(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?he(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(F){b!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),b=F)}function Se(F){F!==jd?(he(i.CULL_FACE),F!==y&&(F===Lc?i.cullFace(i.BACK):F===Kd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),y=F}function lt(F){F!==A&&($&&i.lineWidth(F),A=F)}function Ue(F,re,K){F?(he(i.POLYGON_OFFSET_FILL),(z!==re||O!==K)&&(i.polygonOffset(re,K),z=re,O=K)):fe(i.POLYGON_OFFSET_FILL)}function ze(F){F?he(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function L(F){F===void 0&&(F=i.TEXTURE0+q-1),Y!==F&&(i.activeTexture(F),Y=F)}function S(F,re,K){K===void 0&&(Y===null?K=i.TEXTURE0+q-1:K=Y);let J=le[K];J===void 0&&(J={type:void 0,texture:void 0},le[K]=J),(J.type!==F||J.texture!==re)&&(Y!==K&&(i.activeTexture(K),Y=K),i.bindTexture(F,re||Q[F]),J.type=F,J.texture=re)}function G(){const F=le[Y];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ne(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Te(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ke(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function se(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ge(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(F){Ce.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Ce.copy(F))}function xe(F){Me.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Me.copy(F))}function Ae(F,re){let K=l.get(re);K===void 0&&(K=new WeakMap,l.set(re,K));let J=K.get(F);J===void 0&&(J=i.getUniformBlockIndex(re,F.name),K.set(F,J))}function Pe(F,re){const J=l.get(re).get(F);a.get(re)!==J&&(i.uniformBlockBinding(re,J,F.__bindingPointIndex),a.set(re,J))}function ct(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},Y=null,le={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,v=null,x=null,w=null,N=null,E=new te(0,0,0),C=0,P=!1,b=null,y=null,A=null,z=null,O=null,Ce.set(0,0,i.canvas.width,i.canvas.height),Me.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:he,disable:fe,bindFramebuffer:Oe,drawBuffers:be,useProgram:Ne,setBlending:ft,setMaterial:Xe,setFlipSided:qe,setCullFace:Se,setLineWidth:lt,setPolygonOffset:Ue,setScissorTest:ze,activeTexture:L,bindTexture:S,unbindTexture:G,compressedTexImage2D:ne,compressedTexImage3D:ie,texImage2D:me,texImage3D:Ge,updateUBOMapping:Ae,uniformBlockBinding:Pe,texStorage2D:ke,texStorage3D:se,texSubImage2D:ee,texSubImage3D:Te,compressedTexSubImage2D:ce,compressedTexSubImage3D:ve,scissor:Re,viewport:xe,reset:ct}}function Th(i,e,t,n){const s=rv(n);switch(t){case ku:return i*e;case Vu:return i*e;case Gu:return i*e*2;case kl:return i*e/s.components*s.byteLength;case Hl:return i*e/s.components*s.byteLength;case Wu:return i*e*2/s.components*s.byteLength;case Vl:return i*e*2/s.components*s.byteLength;case Hu:return i*e*3/s.components*s.byteLength;case qt:return i*e*4/s.components*s.byteLength;case Gl:return i*e*4/s.components*s.byteLength;case co:case ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case uo:case fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ga:case Xa:return Math.max(i,16)*Math.max(e,8)/4;case Va:case Wa:return Math.max(i,8)*Math.max(e,8)/2;case qa:case Ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Za:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case el:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case tl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case nl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case rl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ol:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case al:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ll:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case po:case cl:case hl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Xu:case ul:return Math.ceil(i/4)*Math.ceil(e/4)*8;case dl:case fl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rv(i){switch(i){case dn:case Ou:return{byteLength:1,components:1};case gi:case Bu:case wn:return{byteLength:2,components:1};case Bl:case zl:return{byteLength:2,components:4};case Ni:case Ol:case Sn:return{byteLength:4,components:1};case zu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function ov(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Z,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,S){return f?new OffscreenCanvas(L,S):fr("canvas")}function _(L,S,G){let ne=1;const ie=ze(L);if((ie.width>G||ie.height>G)&&(ne=G/Math.max(ie.width,ie.height)),ne<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const ee=Math.floor(ne*ie.width),Te=Math.floor(ne*ie.height);u===void 0&&(u=g(ee,Te));const ce=S?g(ee,Te):u;return ce.width=ee,ce.height=Te,ce.getContext("2d").drawImage(L,0,0,ee,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+ee+"x"+Te+")."),ce}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),L;return L}function m(L){return L.generateMipmaps&&L.minFilter!==Je&&L.minFilter!==et}function p(L){i.generateMipmap(L)}function v(L,S,G,ne,ie=!1){if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ee=S;if(S===i.RED&&(G===i.FLOAT&&(ee=i.R32F),G===i.HALF_FLOAT&&(ee=i.R16F),G===i.UNSIGNED_BYTE&&(ee=i.R8)),S===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.R8UI),G===i.UNSIGNED_SHORT&&(ee=i.R16UI),G===i.UNSIGNED_INT&&(ee=i.R32UI),G===i.BYTE&&(ee=i.R8I),G===i.SHORT&&(ee=i.R16I),G===i.INT&&(ee=i.R32I)),S===i.RG&&(G===i.FLOAT&&(ee=i.RG32F),G===i.HALF_FLOAT&&(ee=i.RG16F),G===i.UNSIGNED_BYTE&&(ee=i.RG8)),S===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.RG8UI),G===i.UNSIGNED_SHORT&&(ee=i.RG16UI),G===i.UNSIGNED_INT&&(ee=i.RG32UI),G===i.BYTE&&(ee=i.RG8I),G===i.SHORT&&(ee=i.RG16I),G===i.INT&&(ee=i.RG32I)),S===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),S===i.RGBA){const Te=ie?So:Qe.getTransfer(ne);G===i.FLOAT&&(ee=i.RGBA32F),G===i.HALF_FLOAT&&(ee=i.RGBA16F),G===i.UNSIGNED_BYTE&&(ee=Te===pt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function x(L,S){let G;return L?S===null||S===Ni||S===Ss?G=i.DEPTH24_STENCIL8:S===Sn?G=i.DEPTH32F_STENCIL8:S===gi&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ni||S===Ss?G=i.DEPTH_COMPONENT24:S===Sn?G=i.DEPTH_COMPONENT32F:S===gi&&(G=i.DEPTH_COMPONENT16),G}function w(L,S){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Je&&L.minFilter!==et?Math.log2(Math.max(S.width,S.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?S.mipmaps.length:1}function N(L){const S=L.target;S.removeEventListener("dispose",N),C(S),S.isVideoTexture&&h.delete(S)}function E(L){const S=L.target;S.removeEventListener("dispose",E),b(S)}function C(L){const S=n.get(L);if(S.__webglInit===void 0)return;const G=L.source,ne=d.get(G);if(ne){const ie=ne[S.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&P(L),Object.keys(ne).length===0&&d.delete(G)}n.remove(L)}function P(L){const S=n.get(L);i.deleteTexture(S.__webglTexture);const G=L.source,ne=d.get(G);delete ne[S.__cacheKey],o.memory.textures--}function b(L){const S=n.get(L);if(L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(S.__webglFramebuffer[ne]))for(let ie=0;ie<S.__webglFramebuffer[ne].length;ie++)i.deleteFramebuffer(S.__webglFramebuffer[ne][ie]);else i.deleteFramebuffer(S.__webglFramebuffer[ne]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[ne])}else{if(Array.isArray(S.__webglFramebuffer))for(let ne=0;ne<S.__webglFramebuffer.length;ne++)i.deleteFramebuffer(S.__webglFramebuffer[ne]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ne=0;ne<S.__webglColorRenderbuffer.length;ne++)S.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[ne]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const G=L.textures;for(let ne=0,ie=G.length;ne<ie;ne++){const ee=n.get(G[ne]);ee.__webglTexture&&(i.deleteTexture(ee.__webglTexture),o.memory.textures--),n.remove(G[ne])}n.remove(L)}let y=0;function A(){y=0}function z(){const L=y;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),y+=1,L}function O(L){const S=[];return S.push(L.wrapS),S.push(L.wrapT),S.push(L.wrapR||0),S.push(L.magFilter),S.push(L.minFilter),S.push(L.anisotropy),S.push(L.internalFormat),S.push(L.format),S.push(L.type),S.push(L.generateMipmaps),S.push(L.premultiplyAlpha),S.push(L.flipY),S.push(L.unpackAlignment),S.push(L.colorSpace),S.join()}function q(L,S){const G=n.get(L);if(L.isVideoTexture&&lt(L),L.isRenderTargetTexture===!1&&L.version>0&&G.__version!==L.version){const ne=L.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Me(G,L,S);return}}t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+S)}function $(L,S){const G=n.get(L);if(L.version>0&&G.__version!==L.version){Me(G,L,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+S)}function W(L,S){const G=n.get(L);if(L.version>0&&G.__version!==L.version){Me(G,L,S);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+S)}function j(L,S){const G=n.get(L);if(L.version>0&&G.__version!==L.version){X(G,L,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+S)}const Y={[un]:i.REPEAT,[on]:i.CLAMP_TO_EDGE,[yo]:i.MIRRORED_REPEAT},le={[Je]:i.NEAREST,[Fu]:i.NEAREST_MIPMAP_NEAREST,[Qs]:i.NEAREST_MIPMAP_LINEAR,[et]:i.LINEAR,[lo]:i.LINEAR_MIPMAP_NEAREST,[an]:i.LINEAR_MIPMAP_LINEAR},_e={[zf]:i.NEVER,[Xf]:i.ALWAYS,[kf]:i.LESS,[Yu]:i.LEQUAL,[Hf]:i.EQUAL,[Wf]:i.GEQUAL,[Vf]:i.GREATER,[Gf]:i.NOTEQUAL};function de(L,S){if(S.type===Sn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===et||S.magFilter===lo||S.magFilter===Qs||S.magFilter===an||S.minFilter===et||S.minFilter===lo||S.minFilter===Qs||S.minFilter===an)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,Y[S.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,Y[S.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,Y[S.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,le[S.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,le[S.minFilter]),S.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,_e[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Je||S.minFilter!==Qs&&S.minFilter!==an||S.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Ce(L,S){let G=!1;L.__webglInit===void 0&&(L.__webglInit=!0,S.addEventListener("dispose",N));const ne=S.source;let ie=d.get(ne);ie===void 0&&(ie={},d.set(ne,ie));const ee=O(S);if(ee!==L.__cacheKey){ie[ee]===void 0&&(ie[ee]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),ie[ee].usedTimes++;const Te=ie[L.__cacheKey];Te!==void 0&&(ie[L.__cacheKey].usedTimes--,Te.usedTimes===0&&P(S)),L.__cacheKey=ee,L.__webglTexture=ie[ee].texture}return G}function Me(L,S,G){let ne=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ne=i.TEXTURE_3D);const ie=Ce(L,S),ee=S.source;t.bindTexture(ne,L.__webglTexture,i.TEXTURE0+G);const Te=n.get(ee);if(ee.version!==Te.__version||ie===!0){t.activeTexture(i.TEXTURE0+G);const ce=Qe.getPrimaries(Qe.workingColorSpace),ve=S.colorSpace===xn?null:Qe.getPrimaries(S.colorSpace),ke=S.colorSpace===xn||ce===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let se=_(S.image,!1,s.maxTextureSize);se=Ue(S,se);const me=r.convert(S.format,S.colorSpace),Ge=r.convert(S.type);let Re=v(S.internalFormat,me,Ge,S.colorSpace,S.isVideoTexture);de(ne,S);let xe;const Ae=S.mipmaps,Pe=S.isVideoTexture!==!0,ct=Te.__version===void 0||ie===!0,F=ee.dataReady,re=w(S,se);if(S.isDepthTexture)Re=x(S.format===ws,S.type),ct&&(Pe?t.texStorage2D(i.TEXTURE_2D,1,Re,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Re,se.width,se.height,0,me,Ge,null));else if(S.isDataTexture)if(Ae.length>0){Pe&&ct&&t.texStorage2D(i.TEXTURE_2D,re,Re,Ae[0].width,Ae[0].height);for(let K=0,J=Ae.length;K<J;K++)xe=Ae[K],Pe?F&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,xe.width,xe.height,me,Ge,xe.data):t.texImage2D(i.TEXTURE_2D,K,Re,xe.width,xe.height,0,me,Ge,xe.data);S.generateMipmaps=!1}else Pe?(ct&&t.texStorage2D(i.TEXTURE_2D,re,Re,se.width,se.height),F&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se.width,se.height,me,Ge,se.data)):t.texImage2D(i.TEXTURE_2D,0,Re,se.width,se.height,0,me,Ge,se.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Pe&&ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Re,Ae[0].width,Ae[0].height,se.depth);for(let K=0,J=Ae.length;K<J;K++)if(xe=Ae[K],S.format!==qt)if(me!==null)if(Pe){if(F)if(S.layerUpdates.size>0){const ae=Th(xe.width,xe.height,S.format,S.type);for(const Fe of S.layerUpdates){const je=xe.data.subarray(Fe*ae/xe.data.BYTES_PER_ELEMENT,(Fe+1)*ae/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,Fe,xe.width,xe.height,1,me,je,0,0)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,xe.width,xe.height,se.depth,me,xe.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Re,xe.width,xe.height,se.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?F&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,xe.width,xe.height,se.depth,me,Ge,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,Re,xe.width,xe.height,se.depth,0,me,Ge,xe.data)}else{Pe&&ct&&t.texStorage2D(i.TEXTURE_2D,re,Re,Ae[0].width,Ae[0].height);for(let K=0,J=Ae.length;K<J;K++)xe=Ae[K],S.format!==qt?me!==null?Pe?F&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,xe.width,xe.height,me,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,K,Re,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?F&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,xe.width,xe.height,me,Ge,xe.data):t.texImage2D(i.TEXTURE_2D,K,Re,xe.width,xe.height,0,me,Ge,xe.data)}else if(S.isDataArrayTexture)if(Pe){if(ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Re,se.width,se.height,se.depth),F)if(S.layerUpdates.size>0){const K=Th(se.width,se.height,S.format,S.type);for(const J of S.layerUpdates){const ae=se.data.subarray(J*K/se.data.BYTES_PER_ELEMENT,(J+1)*K/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,se.width,se.height,1,me,Ge,ae)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,me,Ge,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,se.width,se.height,se.depth,0,me,Ge,se.data);else if(S.isData3DTexture)Pe?(ct&&t.texStorage3D(i.TEXTURE_3D,re,Re,se.width,se.height,se.depth),F&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,me,Ge,se.data)):t.texImage3D(i.TEXTURE_3D,0,Re,se.width,se.height,se.depth,0,me,Ge,se.data);else if(S.isFramebufferTexture){if(ct)if(Pe)t.texStorage2D(i.TEXTURE_2D,re,Re,se.width,se.height);else{let K=se.width,J=se.height;for(let ae=0;ae<re;ae++)t.texImage2D(i.TEXTURE_2D,ae,Re,K,J,0,me,Ge,null),K>>=1,J>>=1}}else if(Ae.length>0){if(Pe&&ct){const K=ze(Ae[0]);t.texStorage2D(i.TEXTURE_2D,re,Re,K.width,K.height)}for(let K=0,J=Ae.length;K<J;K++)xe=Ae[K],Pe?F&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,me,Ge,xe):t.texImage2D(i.TEXTURE_2D,K,Re,me,Ge,xe);S.generateMipmaps=!1}else if(Pe){if(ct){const K=ze(se);t.texStorage2D(i.TEXTURE_2D,re,Re,K.width,K.height)}F&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Ge,se)}else t.texImage2D(i.TEXTURE_2D,0,Re,me,Ge,se);m(S)&&p(ne),Te.__version=ee.version,S.onUpdate&&S.onUpdate(S)}L.__version=S.version}function X(L,S,G){if(S.image.length!==6)return;const ne=Ce(L,S),ie=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+G);const ee=n.get(ie);if(ie.version!==ee.__version||ne===!0){t.activeTexture(i.TEXTURE0+G);const Te=Qe.getPrimaries(Qe.workingColorSpace),ce=S.colorSpace===xn?null:Qe.getPrimaries(S.colorSpace),ve=S.colorSpace===xn||Te===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const ke=S.isCompressedTexture||S.image[0].isCompressedTexture,se=S.image[0]&&S.image[0].isDataTexture,me=[];for(let J=0;J<6;J++)!ke&&!se?me[J]=_(S.image[J],!0,s.maxCubemapSize):me[J]=se?S.image[J].image:S.image[J],me[J]=Ue(S,me[J]);const Ge=me[0],Re=r.convert(S.format,S.colorSpace),xe=r.convert(S.type),Ae=v(S.internalFormat,Re,xe,S.colorSpace),Pe=S.isVideoTexture!==!0,ct=ee.__version===void 0||ne===!0,F=ie.dataReady;let re=w(S,Ge);de(i.TEXTURE_CUBE_MAP,S);let K;if(ke){Pe&&ct&&t.texStorage2D(i.TEXTURE_CUBE_MAP,re,Ae,Ge.width,Ge.height);for(let J=0;J<6;J++){K=me[J].mipmaps;for(let ae=0;ae<K.length;ae++){const Fe=K[ae];S.format!==qt?Re!==null?Pe?F&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ae,0,0,Fe.width,Fe.height,Re,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ae,Ae,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ae,0,0,Fe.width,Fe.height,Re,xe,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ae,Ae,Fe.width,Fe.height,0,Re,xe,Fe.data)}}}else{if(K=S.mipmaps,Pe&&ct){K.length>0&&re++;const J=ze(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,re,Ae,J.width,J.height)}for(let J=0;J<6;J++)if(se){Pe?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,me[J].width,me[J].height,Re,xe,me[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ae,me[J].width,me[J].height,0,Re,xe,me[J].data);for(let ae=0;ae<K.length;ae++){const je=K[ae].image[J].image;Pe?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ae+1,0,0,je.width,je.height,Re,xe,je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ae+1,Ae,je.width,je.height,0,Re,xe,je.data)}}else{Pe?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Re,xe,me[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ae,Re,xe,me[J]);for(let ae=0;ae<K.length;ae++){const Fe=K[ae];Pe?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ae+1,0,0,Re,xe,Fe.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ae+1,Ae,Re,xe,Fe.image[J])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),ee.__version=ie.version,S.onUpdate&&S.onUpdate(S)}L.__version=S.version}function Q(L,S,G,ne,ie,ee){const Te=r.convert(G.format,G.colorSpace),ce=r.convert(G.type),ve=v(G.internalFormat,Te,ce,G.colorSpace);if(!n.get(S).__hasExternalTextures){const se=Math.max(1,S.width>>ee),me=Math.max(1,S.height>>ee);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,ee,ve,se,me,S.depth,0,Te,ce,null):t.texImage2D(ie,ee,ve,se,me,0,Te,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),Se(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ie,n.get(G).__webglTexture,0,qe(S)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,ie,n.get(G).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function he(L,S,G){if(i.bindRenderbuffer(i.RENDERBUFFER,L),S.depthBuffer){const ne=S.depthTexture,ie=ne&&ne.isDepthTexture?ne.type:null,ee=x(S.stencilBuffer,ie),Te=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=qe(S);Se(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,ee,S.width,S.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,ee,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ee,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,L)}else{const ne=S.textures;for(let ie=0;ie<ne.length;ie++){const ee=ne[ie],Te=r.convert(ee.format,ee.colorSpace),ce=r.convert(ee.type),ve=v(ee.internalFormat,Te,ce,ee.colorSpace),ke=qe(S);G&&Se(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,ve,S.width,S.height):Se(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ke,ve,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ve,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(L,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q(S.depthTexture,0);const ne=n.get(S.depthTexture).__webglTexture,ie=qe(S);if(S.depthTexture.format===pi)Se(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(S.depthTexture.format===ws)Se(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Oe(L){const S=n.get(L),G=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!S.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");fe(S.__webglFramebuffer,L)}else if(G){S.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[ne]),S.__webglDepthbuffer[ne]=i.createRenderbuffer(),he(S.__webglDepthbuffer[ne],L,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=i.createRenderbuffer(),he(S.__webglDepthbuffer,L,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function be(L,S,G){const ne=n.get(L);S!==void 0&&Q(ne.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Oe(L)}function Ne(L){const S=L.texture,G=n.get(L),ne=n.get(S);L.addEventListener("dispose",E);const ie=L.textures,ee=L.isWebGLCubeRenderTarget===!0,Te=ie.length>1;if(Te||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=S.version,o.memory.textures++),ee){G.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[ce]=[];for(let ve=0;ve<S.mipmaps.length;ve++)G.__webglFramebuffer[ce][ve]=i.createFramebuffer()}else G.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let ce=0;ce<S.mipmaps.length;ce++)G.__webglFramebuffer[ce]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Te)for(let ce=0,ve=ie.length;ce<ve;ce++){const ke=n.get(ie[ce]);ke.__webglTexture===void 0&&(ke.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&Se(L)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ce=0;ce<ie.length;ce++){const ve=ie[ce];G.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[ce]);const ke=r.convert(ve.format,ve.colorSpace),se=r.convert(ve.type),me=v(ve.internalFormat,ke,se,ve.colorSpace,L.isXRRenderTarget===!0),Ge=qe(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,me,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,G.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),he(G.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),de(i.TEXTURE_CUBE_MAP,S);for(let ce=0;ce<6;ce++)if(S.mipmaps&&S.mipmaps.length>0)for(let ve=0;ve<S.mipmaps.length;ve++)Q(G.__webglFramebuffer[ce][ve],L,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ve);else Q(G.__webglFramebuffer[ce],L,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(S)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let ce=0,ve=ie.length;ce<ve;ce++){const ke=ie[ce],se=n.get(ke);t.bindTexture(i.TEXTURE_2D,se.__webglTexture),de(i.TEXTURE_2D,ke),Q(G.__webglFramebuffer,L,ke,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,0),m(ke)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ce=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,ne.__webglTexture),de(ce,S),S.mipmaps&&S.mipmaps.length>0)for(let ve=0;ve<S.mipmaps.length;ve++)Q(G.__webglFramebuffer[ve],L,S,i.COLOR_ATTACHMENT0,ce,ve);else Q(G.__webglFramebuffer,L,S,i.COLOR_ATTACHMENT0,ce,0);m(S)&&p(ce),t.unbindTexture()}L.depthBuffer&&Oe(L)}function tt(L){const S=L.textures;for(let G=0,ne=S.length;G<ne;G++){const ie=S[G];if(m(ie)){const ee=L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Te=n.get(ie).__webglTexture;t.bindTexture(ee,Te),p(ee),t.unbindTexture()}}}const D=[],ft=[];function Xe(L){if(L.samples>0){if(Se(L)===!1){const S=L.textures,G=L.width,ne=L.height;let ie=i.COLOR_BUFFER_BIT;const ee=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(L),ce=S.length>1;if(ce)for(let ve=0;ve<S.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let ve=0;ve<S.length;ve++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[ve]);const ke=n.get(S[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ke,0)}i.blitFramebuffer(0,0,G,ne,0,0,G,ne,ie,i.NEAREST),l===!0&&(D.length=0,ft.length=0,D.push(i.COLOR_ATTACHMENT0+ve),L.depthBuffer&&L.resolveDepthBuffer===!1&&(D.push(ee),ft.push(ee),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ft)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,D))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let ve=0;ve<S.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,Te.__webglColorRenderbuffer[ve]);const ke=n.get(S[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const S=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function qe(L){return Math.min(s.maxSamples,L.samples)}function Se(L){const S=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function lt(L){const S=o.render.frame;h.get(L)!==S&&(h.set(L,S),L.update())}function Ue(L,S){const G=L.colorSpace,ne=L.format,ie=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||G!==wt&&G!==xn&&(Qe.getTransfer(G)===pt?(ne!==qt||ie!==dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),S}function ze(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=A,this.setTexture2D=q,this.setTexture2DArray=$,this.setTexture3D=W,this.setTextureCube=j,this.rebindTextures=be,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=Se}function av(i,e){function t(n,s=xn){let r;const o=Qe.getTransfer(s);if(n===dn)return i.UNSIGNED_BYTE;if(n===Bl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===zu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ou)return i.BYTE;if(n===Bu)return i.SHORT;if(n===gi)return i.UNSIGNED_SHORT;if(n===Ol)return i.INT;if(n===Ni)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===wn)return i.HALF_FLOAT;if(n===ku)return i.ALPHA;if(n===Hu)return i.RGB;if(n===qt)return i.RGBA;if(n===Vu)return i.LUMINANCE;if(n===Gu)return i.LUMINANCE_ALPHA;if(n===pi)return i.DEPTH_COMPONENT;if(n===ws)return i.DEPTH_STENCIL;if(n===kl)return i.RED;if(n===Hl)return i.RED_INTEGER;if(n===Wu)return i.RG;if(n===Vl)return i.RG_INTEGER;if(n===Gl)return i.RGBA_INTEGER;if(n===co||n===ho||n===uo||n===fo)if(o===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===co)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===co)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ho)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===uo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Va||n===Ga||n===Wa||n===Xa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Va)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ga)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qa||n===Ya||n===$a)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===qa||n===Ya)return o===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===$a)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ja||n===Ka||n===Za||n===Ja||n===Qa||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===ll)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ja)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ka)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Za)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ja)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qa)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===el)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===tl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===il)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ol)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===al)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ll)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===po||n===cl||n===hl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===po)return o===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===hl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xu||n===ul||n===dl||n===fl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===po)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ul)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===dl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class lv extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class cn extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cv={type:"move"};class Ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new cn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const hv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Pt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Tt({vertexShader:hv,fragmentShader:uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new ti(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fv extends Oi{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new dv,m=t.getContextAttributes();let p=null,v=null;const x=[],w=[],N=new Z;let E=null;const C=new kt;C.layers.enable(1),C.viewport=new Ke;const P=new kt;P.layers.enable(2),P.viewport=new Ke;const b=[C,P],y=new lv;y.layers.enable(1),y.layers.enable(2);let A=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=x[X];return Q===void 0&&(Q=new Ma,x[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=x[X];return Q===void 0&&(Q=new Ma,x[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=x[X];return Q===void 0&&(Q=new Ma,x[X]=Q),Q.getHandSpace()};function O(X){const Q=w.indexOf(X.inputSource);if(Q===-1)return;const he=x[Q];he!==void 0&&(he.update(X.inputSource,X.frame,c||o),he.dispatchEvent({type:X.type,data:X.inputSource}))}function q(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",$);for(let X=0;X<x.length;X++){const Q=w[X];Q!==null&&(w[X]=null,x[X].disconnect(Q))}A=null,z=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,s=null,v=null,Me.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",q),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(N),s.renderState.layers===void 0){const Q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Vt(f.framebufferWidth,f.framebufferHeight,{format:qt,type:dn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Q=null,he=null,fe=null;m.depth&&(fe=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=m.stencil?ws:pi,he=m.stencil?Ss:Ni);const Oe={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Oe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Vt(d.textureWidth,d.textureHeight,{format:qt,type:dn,depthTexture:new pr(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Me.setContext(s),Me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(X){for(let Q=0;Q<X.removed.length;Q++){const he=X.removed[Q],fe=w.indexOf(he);fe>=0&&(w[fe]=null,x[fe].disconnect(he))}for(let Q=0;Q<X.added.length;Q++){const he=X.added[Q];let fe=w.indexOf(he);if(fe===-1){for(let be=0;be<x.length;be++)if(be>=w.length){w.push(he),fe=be;break}else if(w[be]===null){w[be]=he,fe=be;break}if(fe===-1)break}const Oe=x[fe];Oe&&Oe.connect(he)}}const W=new T,j=new T;function Y(X,Q,he){W.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(he.matrixWorld);const fe=W.distanceTo(j),Oe=Q.projectionMatrix.elements,be=he.projectionMatrix.elements,Ne=Oe[14]/(Oe[10]-1),tt=Oe[14]/(Oe[10]+1),D=(Oe[9]+1)/Oe[5],ft=(Oe[9]-1)/Oe[5],Xe=(Oe[8]-1)/Oe[0],qe=(be[8]+1)/be[0],Se=Ne*Xe,lt=Ne*qe,Ue=fe/(-Xe+qe),ze=Ue*-Xe;Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ze),X.translateZ(Ue),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const L=Ne+Ue,S=tt+Ue,G=Se-ze,ne=lt+(fe-ze),ie=D*tt/S*L,ee=ft*tt/S*L;X.projectionMatrix.makePerspective(G,ne,ie,ee,L,S),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function le(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;_.texture!==null&&(X.near=_.depthNear,X.far=_.depthFar),y.near=P.near=C.near=X.near,y.far=P.far=C.far=X.far,(A!==y.near||z!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),A=y.near,z=y.far,C.near=A,C.far=z,P.near=A,P.far=z,C.updateProjectionMatrix(),P.updateProjectionMatrix(),X.updateProjectionMatrix());const Q=X.parent,he=y.cameras;le(y,Q);for(let fe=0;fe<he.length;fe++)le(he[fe],Q);he.length===2?Y(y,C,P):y.projectionMatrix.copy(C.projectionMatrix),_e(X,y,Q)};function _e(X,Q,he){he===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(he.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=bs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let de=null;function Ce(X,Q){if(h=Q.getViewerPose(c||o),g=Q,h!==null){const he=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let fe=!1;he.length!==y.cameras.length&&(y.cameras.length=0,fe=!0);for(let be=0;be<he.length;be++){const Ne=he[be];let tt=null;if(f!==null)tt=f.getViewport(Ne);else{const ft=u.getViewSubImage(d,Ne);tt=ft.viewport,be===0&&(e.setRenderTargetTextures(v,ft.colorTexture,d.ignoreDepthValues?void 0:ft.depthStencilTexture),e.setRenderTarget(v))}let D=b[be];D===void 0&&(D=new kt,D.layers.enable(be),D.viewport=new Ke,b[be]=D),D.matrix.fromArray(Ne.transform.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale),D.projectionMatrix.fromArray(Ne.projectionMatrix),D.projectionMatrixInverse.copy(D.projectionMatrix).invert(),D.viewport.set(tt.x,tt.y,tt.width,tt.height),be===0&&(y.matrix.copy(D.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),fe===!0&&y.cameras.push(D)}const Oe=s.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")){const be=u.getDepthInformation(he[0]);be&&be.isValid&&be.texture&&_.init(e,be,s.renderState)}}for(let he=0;he<x.length;he++){const fe=w[he],Oe=x[he];fe!==null&&Oe!==void 0&&Oe.update(fe,Q,c||o)}de&&de(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Me=new sd;Me.setAnimationLoop(Ce),this.setAnimationLoop=function(X){de=X},this.dispose=function(){}}}const wi=new mt,pv=new Ie;function mv(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,td(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,x,w){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,w)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,v,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ft&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ft&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),x=v.envMap,w=v.envMapRotation;x&&(m.envMap.value=x,wi.copy(w),wi.x*=-1,wi.y*=-1,wi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),m.envMapRotation.value.setFromMatrix4(pv.makeRotationFromEuler(wi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ft&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function gv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const w=x.program;n.uniformBlockBinding(v,w)}function c(v,x){let w=s[v.id];w===void 0&&(g(v),w=h(v),s[v.id]=w,v.addEventListener("dispose",m));const N=x.program;n.updateUBOMapping(v,N);const E=e.render.frame;r[v.id]!==E&&(d(v),r[v.id]=E)}function h(v){const x=u();v.__bindingPointIndex=x;const w=i.createBuffer(),N=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,N,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,w),w}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=s[v.id],w=v.uniforms,N=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let E=0,C=w.length;E<C;E++){const P=Array.isArray(w[E])?w[E]:[w[E]];for(let b=0,y=P.length;b<y;b++){const A=P[b];if(f(A,E,b,N)===!0){const z=A.__offset,O=Array.isArray(A.value)?A.value:[A.value];let q=0;for(let $=0;$<O.length;$++){const W=O[$],j=_(W);typeof W=="number"||typeof W=="boolean"?(A.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,z+q,A.__data)):W.isMatrix3?(A.__data[0]=W.elements[0],A.__data[1]=W.elements[1],A.__data[2]=W.elements[2],A.__data[3]=0,A.__data[4]=W.elements[3],A.__data[5]=W.elements[4],A.__data[6]=W.elements[5],A.__data[7]=0,A.__data[8]=W.elements[6],A.__data[9]=W.elements[7],A.__data[10]=W.elements[8],A.__data[11]=0):(W.toArray(A.__data,q),q+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,x,w,N){const E=v.value,C=x+"_"+w;if(N[C]===void 0)return typeof E=="number"||typeof E=="boolean"?N[C]=E:N[C]=E.clone(),!0;{const P=N[C];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return N[C]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function g(v){const x=v.uniforms;let w=0;const N=16;for(let C=0,P=x.length;C<P;C++){const b=Array.isArray(x[C])?x[C]:[x[C]];for(let y=0,A=b.length;y<A;y++){const z=b[y],O=Array.isArray(z.value)?z.value:[z.value];for(let q=0,$=O.length;q<$;q++){const W=O[q],j=_(W),Y=w%N;Y!==0&&N-Y<j.boundary&&(w+=N-Y),z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=w,w+=j.storage}}}const E=w%N;return E>0&&(w+=N-E),v.__size=w,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const w=o.indexOf(x.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class _v{constructor(e={}){const{canvas:t=cp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this.toneMapping=Kn,this.toneMappingExposure=1;const x=this;let w=!1,N=0,E=0,C=null,P=-1,b=null;const y=new Ke,A=new Ke;let z=null;const O=new te(0);let q=0,$=t.width,W=t.height,j=1,Y=null,le=null;const _e=new Ke(0,0,$,W),de=new Ke(0,0,$,W);let Ce=!1;const Me=new jl;let X=!1,Q=!1;const he=new Ie,fe=new T,Oe=new Ke,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ne=!1;function tt(){return C===null?j:1}let D=n;function ft(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fl}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",J,!1),t.addEventListener("webglcontextcreationerror",ae,!1),D===null){const U="webgl2";if(D=ft(U,M),D===null)throw ft(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Xe,qe,Se,lt,Ue,ze,L,S,G,ne,ie,ee,Te,ce,ve,ke,se,me,Ge,Re,xe,Ae,Pe,ct;function F(){Xe=new b0(D),Xe.init(),Ae=new av(D,Xe),qe=new v0(D,Xe,e,Ae),Se=new sv(D),lt=new E0(D),Ue=new W_,ze=new ov(D,Xe,Se,Ue,qe,Ae,lt),L=new y0(x),S=new w0(x),G=new Np(D),Pe=new g0(D,G),ne=new A0(D,G,lt,Pe),ie=new R0(D,ne,G,lt),Ge=new C0(D,qe,ze),ke=new x0(Ue),ee=new G_(x,L,S,Xe,qe,Pe,ke),Te=new mv(x,Ue),ce=new q_,ve=new J_(Xe),me=new m0(x,L,S,Se,ie,d,l),se=new iv(x,ie,qe),ct=new gv(D,lt,qe,Se),Re=new _0(D,Xe,lt),xe=new T0(D,Xe,lt),lt.programs=ee.programs,x.capabilities=qe,x.extensions=Xe,x.properties=Ue,x.renderLists=ce,x.shadowMap=se,x.state=Se,x.info=lt}F();const re=new fv(x,D);this.xr=re,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=Xe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Xe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(M){M!==void 0&&(j=M,this.setSize($,W,!1))},this.getSize=function(M){return M.set($,W)},this.setSize=function(M,U,H=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=M,W=U,t.width=Math.floor(M*j),t.height=Math.floor(U*j),H===!0&&(t.style.width=M+"px",t.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set($*j,W*j).floor()},this.setDrawingBufferSize=function(M,U,H){$=M,W=U,j=H,t.width=Math.floor(M*H),t.height=Math.floor(U*H),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(y)},this.getViewport=function(M){return M.copy(_e)},this.setViewport=function(M,U,H,V){M.isVector4?_e.set(M.x,M.y,M.z,M.w):_e.set(M,U,H,V),Se.viewport(y.copy(_e).multiplyScalar(j).round())},this.getScissor=function(M){return M.copy(de)},this.setScissor=function(M,U,H,V){M.isVector4?de.set(M.x,M.y,M.z,M.w):de.set(M,U,H,V),Se.scissor(A.copy(de).multiplyScalar(j).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(M){Se.setScissorTest(Ce=M)},this.setOpaqueSort=function(M){Y=M},this.setTransparentSort=function(M){le=M},this.getClearColor=function(M){return M.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor.apply(me,arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha.apply(me,arguments)},this.clear=function(M=!0,U=!0,H=!0){let V=0;if(M){let k=!1;if(C!==null){const oe=C.texture.format;k=oe===Gl||oe===Vl||oe===Hl}if(k){const oe=C.texture.type,ge=oe===dn||oe===Ni||oe===gi||oe===Ss||oe===Bl||oe===zl,we=me.getClearColor(),pe=me.getClearAlpha(),Le=we.r,Be=we.g,De=we.b;ge?(f[0]=Le,f[1]=Be,f[2]=De,f[3]=pe,D.clearBufferuiv(D.COLOR,0,f)):(g[0]=Le,g[1]=Be,g[2]=De,g[3]=pe,D.clearBufferiv(D.COLOR,0,g))}else V|=D.COLOR_BUFFER_BIT}U&&(V|=D.DEPTH_BUFFER_BIT),H&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",J,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),ce.dispose(),ve.dispose(),Ue.dispose(),L.dispose(),S.dispose(),ie.dispose(),Pe.dispose(),ct.dispose(),ee.dispose(),re.dispose(),re.removeEventListener("sessionstart",en),re.removeEventListener("sessionend",An),pn.stop()};function K(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function J(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const M=lt.autoReset,U=se.enabled,H=se.autoUpdate,V=se.needsUpdate,k=se.type;F(),lt.autoReset=M,se.enabled=U,se.autoUpdate=H,se.needsUpdate=V,se.type=k}function ae(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Fe(M){const U=M.target;U.removeEventListener("dispose",Fe),je(U)}function je(M){_t(M),Ue.remove(M)}function _t(M){const U=Ue.get(M).programs;U!==void 0&&(U.forEach(function(H){ee.releaseProgram(H)}),M.isShaderMaterial&&ee.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,H,V,k,oe){U===null&&(U=be);const ge=k.isMesh&&k.matrixWorld.determinant()<0,we=Er(M,U,H,V,k);Se.setMaterial(V,ge);let pe=H.index,Le=1;if(V.wireframe===!0){if(pe=ne.getWireframeAttribute(H),pe===void 0)return;Le=2}const Be=H.drawRange,De=H.attributes.position;let nt=Be.start*Le,vt=(Be.start+Be.count)*Le;oe!==null&&(nt=Math.max(nt,oe.start*Le),vt=Math.min(vt,(oe.start+oe.count)*Le)),pe!==null?(nt=Math.max(nt,0),vt=Math.min(vt,pe.count)):De!=null&&(nt=Math.max(nt,0),vt=Math.min(vt,De.count));const xt=vt-nt;if(xt<0||xt===1/0)return;Pe.setup(k,V,we,H,pe);let Yt,it=Re;if(pe!==null&&(Yt=G.get(pe),it=xe,it.setIndex(Yt)),k.isMesh)V.wireframe===!0?(Se.setLineWidth(V.wireframeLinewidth*tt()),it.setMode(D.LINES)):it.setMode(D.TRIANGLES);else if(k.isLine){let Ee=V.linewidth;Ee===void 0&&(Ee=1),Se.setLineWidth(Ee*tt()),k.isLineSegments?it.setMode(D.LINES):k.isLineLoop?it.setMode(D.LINE_LOOP):it.setMode(D.LINE_STRIP)}else k.isPoints?it.setMode(D.POINTS):k.isSprite&&it.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)it.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Xe.get("WEBGL_multi_draw"))it.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ee=k._multiDrawStarts,Nt=k._multiDrawCounts,st=k._multiDrawCount,mn=pe?G.get(pe).bytesPerElement:1,Hi=Ue.get(V).currentProgram.getUniforms();for(let $t=0;$t<st;$t++)Hi.setValue(D,"_gl_DrawID",$t),it.render(Ee[$t]/mn,Nt[$t])}else if(k.isInstancedMesh)it.renderInstances(nt,xt,k.count);else if(H.isInstancedBufferGeometry){const Ee=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Nt=Math.min(H.instanceCount,Ee);it.renderInstances(nt,xt,Nt)}else it.render(nt,xt)};function Et(M,U,H){M.transparent===!0&&M.side===rn&&M.forceSinglePass===!1?(M.side=Ft,M.needsUpdate=!0,_i(M,U,H),M.side=Qn,M.needsUpdate=!0,_i(M,U,H),M.side=rn):_i(M,U,H)}this.compile=function(M,U,H=null){H===null&&(H=M),m=ve.get(H),m.init(U),v.push(m),H.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),M!==H&&M.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights();const V=new Set;return M.traverse(function(k){const oe=k.material;if(oe)if(Array.isArray(oe))for(let ge=0;ge<oe.length;ge++){const we=oe[ge];Et(we,H,k),V.add(we)}else Et(oe,H,k),V.add(oe)}),v.pop(),m=null,V},this.compileAsync=function(M,U,H=null){const V=this.compile(M,U,H);return new Promise(k=>{function oe(){if(V.forEach(function(ge){Ue.get(ge).currentProgram.isReady()&&V.delete(ge)}),V.size===0){k(M);return}setTimeout(oe,10)}Xe.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Ze=null;function fn(M){Ze&&Ze(M)}function en(){pn.stop()}function An(){pn.start()}const pn=new sd;pn.setAnimationLoop(fn),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(M){Ze=M,re.setAnimationLoop(M),M===null?pn.stop():pn.start()},re.addEventListener("sessionstart",en),re.addEventListener("sessionend",An),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(U),U=re.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,U,C),m=ve.get(M,v.length),m.init(U),v.push(m),he.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Me.setFromProjectionMatrix(he),Q=this.localClippingEnabled,X=ke.init(this.clippingPlanes,Q),_=ce.get(M,p.length),_.init(),p.push(_),re.enabled===!0&&re.isPresenting===!0){const oe=x.xr.getDepthSensingMesh();oe!==null&&Os(oe,U,-1/0,x.sortObjects)}Os(M,U,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(Y,le),Ne=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Ne&&me.addToRenderList(_,M),this.info.render.frame++,X===!0&&ke.beginShadows();const H=m.state.shadowsArray;se.render(H,M,U),X===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=_.opaque,k=_.transmissive;if(m.setupLights(),U.isArrayCamera){const oe=U.cameras;if(k.length>0)for(let ge=0,we=oe.length;ge<we;ge++){const pe=oe[ge];ni(V,k,M,pe)}Ne&&me.render(M);for(let ge=0,we=oe.length;ge<we;ge++){const pe=oe[ge];Bs(_,M,pe,pe.viewport)}}else k.length>0&&ni(V,k,M,U),Ne&&me.render(M),Bs(_,M,U);C!==null&&(ze.updateMultisampleRenderTarget(C),ze.updateRenderTargetMipmap(C)),M.isScene===!0&&M.onAfterRender(x,M,U),Pe.resetDefaultState(),P=-1,b=null,v.pop(),v.length>0?(m=v[v.length-1],X===!0&&ke.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Os(M,U,H,V){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)H=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Me.intersectsSprite(M)){V&&Oe.setFromMatrixPosition(M.matrixWorld).applyMatrix4(he);const ge=ie.update(M),we=M.material;we.visible&&_.push(M,ge,we,H,Oe.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Me.intersectsObject(M))){const ge=ie.update(M),we=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Oe.copy(M.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Oe.copy(ge.boundingSphere.center)),Oe.applyMatrix4(M.matrixWorld).applyMatrix4(he)),Array.isArray(we)){const pe=ge.groups;for(let Le=0,Be=pe.length;Le<Be;Le++){const De=pe[Le],nt=we[De.materialIndex];nt&&nt.visible&&_.push(M,ge,nt,H,Oe.z,De)}}else we.visible&&_.push(M,ge,we,H,Oe.z,null)}}const oe=M.children;for(let ge=0,we=oe.length;ge<we;ge++)Os(oe[ge],U,H,V)}function Bs(M,U,H,V){const k=M.opaque,oe=M.transmissive,ge=M.transparent;m.setupLightsView(H),X===!0&&ke.setGlobalState(x.clippingPlanes,H),V&&Se.viewport(y.copy(V)),k.length>0&&ki(k,U,H),oe.length>0&&ki(oe,U,H),ge.length>0&&ki(ge,U,H),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function ni(M,U,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new Vt(1,1,{generateMipmaps:!0,type:Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float")?wn:dn,minFilter:an,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const oe=m.state.transmissionRenderTarget[V.id],ge=V.viewport||y;oe.setSize(ge.z,ge.w);const we=x.getRenderTarget();x.setRenderTarget(oe),x.getClearColor(O),q=x.getClearAlpha(),q<1&&x.setClearColor(16777215,.5),Ne?me.render(H):x.clear();const pe=x.toneMapping;x.toneMapping=Kn;const Le=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),X===!0&&ke.setGlobalState(x.clippingPlanes,V),ki(M,H,V),ze.updateMultisampleRenderTarget(oe),ze.updateRenderTargetMipmap(oe),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let De=0,nt=U.length;De<nt;De++){const vt=U[De],xt=vt.object,Yt=vt.geometry,it=vt.material,Ee=vt.group;if(it.side===rn&&xt.layers.test(V.layers)){const Nt=it.side;it.side=Ft,it.needsUpdate=!0,Tn(xt,H,V,Yt,it,Ee),it.side=Nt,it.needsUpdate=!0,Be=!0}}Be===!0&&(ze.updateMultisampleRenderTarget(oe),ze.updateRenderTargetMipmap(oe))}x.setRenderTarget(we),x.setClearColor(O,q),Le!==void 0&&(V.viewport=Le),x.toneMapping=pe}function ki(M,U,H){const V=U.isScene===!0?U.overrideMaterial:null;for(let k=0,oe=M.length;k<oe;k++){const ge=M[k],we=ge.object,pe=ge.geometry,Le=V===null?ge.material:V,Be=ge.group;we.layers.test(H.layers)&&Tn(we,U,H,pe,Le,Be)}}function Tn(M,U,H,V,k,oe){M.onBeforeRender(x,U,H,V,k,oe),M.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.transparent===!0&&k.side===rn&&k.forceSinglePass===!1?(k.side=Ft,k.needsUpdate=!0,x.renderBufferDirect(H,U,V,k,M,oe),k.side=Qn,k.needsUpdate=!0,x.renderBufferDirect(H,U,V,k,M,oe),k.side=rn):x.renderBufferDirect(H,U,V,k,M,oe),M.onAfterRender(x,U,H,V,k,oe)}function _i(M,U,H){U.isScene!==!0&&(U=be);const V=Ue.get(M),k=m.state.lights,oe=m.state.shadowsArray,ge=k.state.version,we=ee.getParameters(M,k.state,oe,U,H),pe=ee.getProgramCacheKey(we);let Le=V.programs;V.environment=M.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(M.isMeshStandardMaterial?S:L).get(M.envMap||V.environment),V.envMapRotation=V.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Le===void 0&&(M.addEventListener("dispose",Fe),Le=new Map,V.programs=Le);let Be=Le.get(pe);if(Be!==void 0){if(V.currentProgram===Be&&V.lightsStateVersion===ge)return Tr(M,we),Be}else we.uniforms=ee.getUniforms(M),M.onBeforeCompile(we,x),Be=ee.acquireProgram(we,pe),Le.set(pe,Be),V.uniforms=we.uniforms;const De=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(De.clippingPlanes=ke.uniform),Tr(M,we),V.needsLights=Ye(M),V.lightsStateVersion=ge,V.needsLights&&(De.ambientLightColor.value=k.state.ambient,De.lightProbe.value=k.state.probe,De.directionalLights.value=k.state.directional,De.directionalLightShadows.value=k.state.directionalShadow,De.spotLights.value=k.state.spot,De.spotLightShadows.value=k.state.spotShadow,De.rectAreaLights.value=k.state.rectArea,De.ltc_1.value=k.state.rectAreaLTC1,De.ltc_2.value=k.state.rectAreaLTC2,De.pointLights.value=k.state.point,De.pointLightShadows.value=k.state.pointShadow,De.hemisphereLights.value=k.state.hemi,De.directionalShadowMap.value=k.state.directionalShadowMap,De.directionalShadowMatrix.value=k.state.directionalShadowMatrix,De.spotShadowMap.value=k.state.spotShadowMap,De.spotLightMatrix.value=k.state.spotLightMatrix,De.spotLightMap.value=k.state.spotLightMap,De.pointShadowMap.value=k.state.pointShadowMap,De.pointShadowMatrix.value=k.state.pointShadowMatrix),V.currentProgram=Be,V.uniformsList=null,Be}function Ar(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=mo.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Tr(M,U){const H=Ue.get(M);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function Er(M,U,H,V,k){U.isScene!==!0&&(U=be),ze.resetTextureUnits();const oe=U.fog,ge=V.isMeshStandardMaterial?U.environment:null,we=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:wt,pe=(V.isMeshStandardMaterial?S:L).get(V.envMap||ge),Le=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Be=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),De=!!H.morphAttributes.position,nt=!!H.morphAttributes.normal,vt=!!H.morphAttributes.color;let xt=Kn;V.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(xt=x.toneMapping);const Yt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,it=Yt!==void 0?Yt.length:0,Ee=Ue.get(V),Nt=m.state.lights;if(X===!0&&(Q===!0||M!==b)){const tn=M===b&&V.id===P;ke.setState(V,M,tn)}let st=!1;V.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Nt.state.version||Ee.outputColorSpace!==we||k.isBatchedMesh&&Ee.batching===!1||!k.isBatchedMesh&&Ee.batching===!0||k.isBatchedMesh&&Ee.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ee.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ee.instancing===!1||!k.isInstancedMesh&&Ee.instancing===!0||k.isSkinnedMesh&&Ee.skinning===!1||!k.isSkinnedMesh&&Ee.skinning===!0||k.isInstancedMesh&&Ee.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ee.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ee.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ee.instancingMorph===!1&&k.morphTexture!==null||Ee.envMap!==pe||V.fog===!0&&Ee.fog!==oe||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ke.numPlanes||Ee.numIntersection!==ke.numIntersection)||Ee.vertexAlphas!==Le||Ee.vertexTangents!==Be||Ee.morphTargets!==De||Ee.morphNormals!==nt||Ee.morphColors!==vt||Ee.toneMapping!==xt||Ee.morphTargetsCount!==it)&&(st=!0):(st=!0,Ee.__version=V.version);let mn=Ee.currentProgram;st===!0&&(mn=_i(V,U,k));let Hi=!1,$t=!1,Yo=!1;const bt=mn.getUniforms(),ii=Ee.uniforms;if(Se.useProgram(mn.program)&&(Hi=!0,$t=!0,Yo=!0),V.id!==P&&(P=V.id,$t=!0),Hi||b!==M){bt.setValue(D,"projectionMatrix",M.projectionMatrix),bt.setValue(D,"viewMatrix",M.matrixWorldInverse);const tn=bt.map.cameraPosition;tn!==void 0&&tn.setValue(D,fe.setFromMatrixPosition(M.matrixWorld)),qe.logarithmicDepthBuffer&&bt.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&bt.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),b!==M&&(b=M,$t=!0,Yo=!0)}if(k.isSkinnedMesh){bt.setOptional(D,k,"bindMatrix"),bt.setOptional(D,k,"bindMatrixInverse");const tn=k.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),bt.setValue(D,"boneTexture",tn.boneTexture,ze))}k.isBatchedMesh&&(bt.setOptional(D,k,"batchingTexture"),bt.setValue(D,"batchingTexture",k._matricesTexture,ze),bt.setOptional(D,k,"batchingIdTexture"),bt.setValue(D,"batchingIdTexture",k._indirectTexture,ze),bt.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&bt.setValue(D,"batchingColorTexture",k._colorsTexture,ze));const $o=H.morphAttributes;if(($o.position!==void 0||$o.normal!==void 0||$o.color!==void 0)&&Ge.update(k,H,mn),($t||Ee.receiveShadow!==k.receiveShadow)&&(Ee.receiveShadow=k.receiveShadow,bt.setValue(D,"receiveShadow",k.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(ii.envMap.value=pe,ii.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(ii.envMapIntensity.value=U.environmentIntensity),$t&&(bt.setValue(D,"toneMappingExposure",x.toneMappingExposure),Ee.needsLights&&qo(ii,Yo),oe&&V.fog===!0&&Te.refreshFogUniforms(ii,oe),Te.refreshMaterialUniforms(ii,V,j,W,m.state.transmissionRenderTarget[M.id]),mo.upload(D,Ar(Ee),ii,ze)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(mo.upload(D,Ar(Ee),ii,ze),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&bt.setValue(D,"center",k.center),bt.setValue(D,"modelViewMatrix",k.modelViewMatrix),bt.setValue(D,"normalMatrix",k.normalMatrix),bt.setValue(D,"modelMatrix",k.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const tn=V.uniformsGroups;for(let jo=0,qd=tn.length;jo<qd;jo++){const Ic=tn[jo];ct.update(Ic,mn),ct.bind(Ic,mn)}}return mn}function qo(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function Ye(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(M,U,H){Ue.get(M.texture).__webglTexture=U,Ue.get(M.depthTexture).__webglTexture=H;const V=Ue.get(M);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||Xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,U){const H=Ue.get(M);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(M,U=0,H=0){C=M,N=U,E=H;let V=!0,k=null,oe=!1,ge=!1;if(M){const pe=Ue.get(M);pe.__useDefaultFramebuffer!==void 0?(Se.bindFramebuffer(D.FRAMEBUFFER,null),V=!1):pe.__webglFramebuffer===void 0?ze.setupRenderTarget(M):pe.__hasExternalTextures&&ze.rebindTextures(M,Ue.get(M.texture).__webglTexture,Ue.get(M.depthTexture).__webglTexture);const Le=M.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(ge=!0);const Be=Ue.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Be[U])?k=Be[U][H]:k=Be[U],oe=!0):M.samples>0&&ze.useMultisampledRTT(M)===!1?k=Ue.get(M).__webglMultisampledFramebuffer:Array.isArray(Be)?k=Be[H]:k=Be,y.copy(M.viewport),A.copy(M.scissor),z=M.scissorTest}else y.copy(_e).multiplyScalar(j).floor(),A.copy(de).multiplyScalar(j).floor(),z=Ce;if(Se.bindFramebuffer(D.FRAMEBUFFER,k)&&V&&Se.drawBuffers(M,k),Se.viewport(y),Se.scissor(A),Se.setScissorTest(z),oe){const pe=Ue.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,H)}else if(ge){const pe=Ue.get(M.texture),Le=U||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,pe.__webglTexture,H||0,Le)}P=-1},this.readRenderTargetPixels=function(M,U,H,V,k,oe,ge){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Ue.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ge!==void 0&&(we=we[ge]),we){Se.bindFramebuffer(D.FRAMEBUFFER,we);try{const pe=M.texture,Le=pe.format,Be=pe.type;if(!qe.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-V&&H>=0&&H<=M.height-k&&D.readPixels(U,H,V,k,Ae.convert(Le),Ae.convert(Be),oe)}finally{const pe=C!==null?Ue.get(C).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,pe)}}},this.readRenderTargetPixelsAsync=async function(M,U,H,V,k,oe,ge){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=Ue.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ge!==void 0&&(we=we[ge]),we){Se.bindFramebuffer(D.FRAMEBUFFER,we);try{const pe=M.texture,Le=pe.format,Be=pe.type;if(!qe.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=M.width-V&&H>=0&&H<=M.height-k){const De=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,De),D.bufferData(D.PIXEL_PACK_BUFFER,oe.byteLength,D.STREAM_READ),D.readPixels(U,H,V,k,Ae.convert(Le),Ae.convert(Be),0),D.flush();const nt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);await hp(D,nt,4);try{D.bindBuffer(D.PIXEL_PACK_BUFFER,De),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,oe)}finally{D.deleteBuffer(De),D.deleteSync(nt)}return oe}}finally{const pe=C!==null?Ue.get(C).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,pe)}}},this.copyFramebufferToTexture=function(M,U=null,H=0){M.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,M=arguments[1]);const V=Math.pow(2,-H),k=Math.floor(M.image.width*V),oe=Math.floor(M.image.height*V),ge=U!==null?U.x:0,we=U!==null?U.y:0;ze.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,ge,we,k,oe),Se.unbindTexture()},this.copyTextureToTexture=function(M,U,H=null,V=null,k=0){M.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,M=arguments[1],U=arguments[2],k=arguments[3]||0,H=null);let oe,ge,we,pe,Le,Be;H!==null?(oe=H.max.x-H.min.x,ge=H.max.y-H.min.y,we=H.min.x,pe=H.min.y):(oe=M.image.width,ge=M.image.height,we=0,pe=0),V!==null?(Le=V.x,Be=V.y):(Le=0,Be=0);const De=Ae.convert(U.format),nt=Ae.convert(U.type);ze.setTexture2D(U,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const vt=D.getParameter(D.UNPACK_ROW_LENGTH),xt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Yt=D.getParameter(D.UNPACK_SKIP_PIXELS),it=D.getParameter(D.UNPACK_SKIP_ROWS),Ee=D.getParameter(D.UNPACK_SKIP_IMAGES),Nt=M.isCompressedTexture?M.mipmaps[k]:M.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,Nt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Nt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,we),D.pixelStorei(D.UNPACK_SKIP_ROWS,pe),M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,k,Le,Be,oe,ge,De,nt,Nt.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,k,Le,Be,Nt.width,Nt.height,De,Nt.data):D.texSubImage2D(D.TEXTURE_2D,k,Le,Be,oe,ge,De,nt,Nt),D.pixelStorei(D.UNPACK_ROW_LENGTH,vt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Yt),D.pixelStorei(D.UNPACK_SKIP_ROWS,it),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ee),k===0&&U.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Se.unbindTexture()},this.copyTextureToTexture3D=function(M,U,H=null,V=null,k=0){M.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,M=arguments[2],U=arguments[3],k=arguments[4]||0);let oe,ge,we,pe,Le,Be,De,nt,vt;const xt=M.isCompressedTexture?M.mipmaps[k]:M.image;H!==null?(oe=H.max.x-H.min.x,ge=H.max.y-H.min.y,we=H.max.z-H.min.z,pe=H.min.x,Le=H.min.y,Be=H.min.z):(oe=xt.width,ge=xt.height,we=xt.depth,pe=0,Le=0,Be=0),V!==null?(De=V.x,nt=V.y,vt=V.z):(De=0,nt=0,vt=0);const Yt=Ae.convert(U.format),it=Ae.convert(U.type);let Ee;if(U.isData3DTexture)ze.setTexture3D(U,0),Ee=D.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)ze.setTexture2DArray(U,0),Ee=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const Nt=D.getParameter(D.UNPACK_ROW_LENGTH),st=D.getParameter(D.UNPACK_IMAGE_HEIGHT),mn=D.getParameter(D.UNPACK_SKIP_PIXELS),Hi=D.getParameter(D.UNPACK_SKIP_ROWS),$t=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,xt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,pe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Le),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Be),M.isDataTexture||M.isData3DTexture?D.texSubImage3D(Ee,k,De,nt,vt,oe,ge,we,Yt,it,xt.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Ee,k,De,nt,vt,oe,ge,we,Yt,xt.data):D.texSubImage3D(Ee,k,De,nt,vt,oe,ge,we,Yt,it,xt),D.pixelStorei(D.UNPACK_ROW_LENGTH,Nt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,st),D.pixelStorei(D.UNPACK_SKIP_PIXELS,mn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Hi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,$t),k===0&&U.generateMipmaps&&D.generateMipmap(Ee),Se.unbindTexture()},this.initRenderTarget=function(M){Ue.get(M).__webglFramebuffer===void 0&&ze.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ze.setTextureCube(M,0):M.isData3DTexture?ze.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ze.setTexture2DArray(M,0):ze.setTexture2D(M,0),Se.unbindTexture()},this.resetState=function(){N=0,E=0,C=null,Se.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ql?"display-p3":"srgb",t.unpackColorSpace=Qe.workingColorSpace===Io?"display-p3":"srgb"}}class No{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new te(e),this.density=t}clone(){return new No(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class cd extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mt,this.environmentIntensity=1,this.environmentRotation=new mt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class hd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return $l("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gt=new T;class mr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new mr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Zl extends hn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let rs;const Gs=new T,os=new T,as=new T,ls=new Z,Ws=new Z,ud=new Ie,jr=new T,Xs=new T,Kr=new T,Eh=new Z,Sa=new Z,Ch=new Z;class dd extends ut{constructor(e=new Zl){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new gt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new hd(t,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new mr(n,3,0,!1)),rs.setAttribute("uv",new mr(n,2,3,!1))}this.geometry=rs,this.material=e,this.center=new Z(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),os.setFromMatrixScale(this.matrixWorld),ud.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&os.multiplyScalar(-as.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Zr(jr.set(-.5,-.5,0),as,o,os,s,r),Zr(Xs.set(.5,-.5,0),as,o,os,s,r),Zr(Kr.set(.5,.5,0),as,o,os,s,r),Eh.set(0,0),Sa.set(1,0),Ch.set(1,1);let a=e.ray.intersectTriangle(jr,Xs,Kr,!1,Gs);if(a===null&&(Zr(Xs.set(-.5,.5,0),as,o,os,s,r),Sa.set(0,1),a=e.ray.intersectTriangle(jr,Kr,Xs,!1,Gs),a===null))return;const l=e.ray.origin.distanceTo(Gs);l<e.near||l>e.far||t.push({distance:l,point:Gs.clone(),uv:Mn.getInterpolation(Gs,jr,Xs,Kr,Eh,Sa,Ch,new Z),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Zr(i,e,t,n,s,r){ls.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ws.x=r*ls.x-s*ls.y,Ws.y=s*ls.x+r*ls.y):Ws.copy(ls),i.copy(e),i.x+=Ws.x,i.y+=Ws.y,i.applyMatrix4(ud)}const Rh=new T,Ph=new Ke,Ih=new Ke,vv=new T,Lh=new Ie,Jr=new T,wa=new Nn,Dh=new Ie,ba=new Lo;class xv extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Uc,this.bindMatrix=new Ie,this.bindMatrixInverse=new Ie,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ei),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jr),this.boundingBox.expandByPoint(Jr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Nn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jr),this.boundingSphere.expandByPoint(Jr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wa.copy(this.boundingSphere),wa.applyMatrix4(s),e.ray.intersectsSphere(wa)!==!1&&(Dh.copy(s).invert(),ba.copy(e.ray).applyMatrix4(Dh),!(this.boundingBox!==null&&ba.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ba)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ke,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Uc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Lf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Ph.fromBufferAttribute(s.attributes.skinIndex,e),Ih.fromBufferAttribute(s.attributes.skinWeight,e),Rh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Ih.getComponent(r);if(o!==0){const a=Ph.getComponent(r);Lh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(vv.copy(Rh).applyMatrix4(Lh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class fd extends ut{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Bi extends Pt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Je,h=Je,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Nh=new Ie,yv=new Ie;class Jl{constructor(e=[],t=[]){this.uuid=bn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ie)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ie;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:yv;Nh.multiplyMatrices(a,t[r]),Nh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Jl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Bi(t,e,e,qt,Sn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new fd),this.bones.push(o),this.boneInverses.push(new Ie().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class xl extends Mt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const cs=new Ie,Uh=new Ie,Qr=[],Fh=new ei,Mv=new Ie,qs=new ht,Ys=new Nn;class pd extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Mv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ei),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cs),Fh.copy(e.boundingBox).applyMatrix4(cs),this.boundingBox.union(Fh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cs),Ys.copy(e.boundingSphere).applyMatrix4(cs),this.boundingSphere.union(Ys)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(qs.geometry=this.geometry,qs.material=this.material,qs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ys.copy(this.boundingSphere),Ys.applyMatrix4(n),e.ray.intersectsSphere(Ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,cs),Uh.multiplyMatrices(n,cs),qs.matrixWorld=Uh,qs.raycast(e,Qr);for(let o=0,a=Qr.length;o<a;o++){const l=Qr[o];l.instanceId=r,l.object=this,t.push(l)}Qr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new xl(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Bi(new Float32Array(s*this.count),s,this.count,kl,Sn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Ql extends hn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const To=new T,Eo=new T,Oh=new Ie,$s=new Lo,eo=new Nn,Aa=new T,Bh=new T;class Uo extends ut{constructor(e=new gt,t=new Ql){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)To.fromBufferAttribute(t,s-1),Eo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=To.distanceTo(Eo);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),eo.copy(n.boundingSphere),eo.applyMatrix4(s),eo.radius+=r,e.ray.intersectsSphere(eo)===!1)return;Oh.copy(s).invert(),$s.copy(e.ray).applyMatrix4(Oh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),v=h.getX(_+1),x=to(this,e,$s,l,p,v);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=to(this,e,$s,l,_,m);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=to(this,e,$s,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=to(this,e,$s,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function to(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(To.fromBufferAttribute(o,s),Eo.fromBufferAttribute(o,r),t.distanceSqToSegment(To,Eo,Aa,Bh)>n)return;Aa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Aa);if(!(l<e.near||l>e.far))return{distance:l,point:Bh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,object:i}}const zh=new T,kh=new T;class Sv extends Uo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)zh.fromBufferAttribute(t,s),kh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+zh.distanceTo(kh);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wv extends Uo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class zi extends hn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Hh=new Ie,yl=new Lo,no=new Nn,io=new T;class Is extends ut{constructor(e=new gt,t=new zi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(s),no.radius+=r,e.ray.intersectsSphere(no)===!1)return;Hh.copy(s).invert(),yl.copy(e.ray).applyMatrix4(Hh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);io.fromBufferAttribute(u,m),Vh(io,m,l,s,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)io.fromBufferAttribute(u,g),Vh(io,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Vh(i,e,t,n,s,r,o){const a=yl.distanceSqToPoint(i);if(a<t){const l=new T;yl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class ec extends Pt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new Z:new T);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new T,s=[],r=[],o=[],a=new T,l=new Ie;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new T)}r[0]=new T,o[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Rt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Rt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class tc extends Un{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Z){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class bv extends tc{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function nc(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const so=new T,Ta=new nc,Ea=new nc,Ca=new nc;class Av extends Un{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new T){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(so.subVectors(s[0],s[1]).add(s[0]),c=so);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(so.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=so),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ta.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),Ea.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),Ca.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ta.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Ea.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ca.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ta.calc(l),Ea.calc(l),Ca.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new T().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Gh(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function Tv(i,e){const t=1-i;return t*t*e}function Ev(i,e){return 2*(1-i)*i*e}function Cv(i,e){return i*i*e}function rr(i,e,t,n){return Tv(i,e)+Ev(i,t)+Cv(i,n)}function Rv(i,e){const t=1-i;return t*t*t*e}function Pv(i,e){const t=1-i;return 3*t*t*i*e}function Iv(i,e){return 3*(1-i)*i*i*e}function Lv(i,e){return i*i*i*e}function or(i,e,t,n,s){return Rv(i,e)+Pv(i,t)+Iv(i,n)+Lv(i,s)}class md extends Un{constructor(e=new Z,t=new Z,n=new Z,s=new Z){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Z){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(or(e,s.x,r.x,o.x,a.x),or(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Dv extends Un{constructor(e=new T,t=new T,n=new T,s=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new T){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(or(e,s.x,r.x,o.x,a.x),or(e,s.y,r.y,o.y,a.y),or(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class gd extends Un{constructor(e=new Z,t=new Z){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Z){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nv extends Un{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _d extends Un{constructor(e=new Z,t=new Z,n=new Z){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Z){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(rr(e,s.x,r.x,o.x),rr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uv extends Un{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(rr(e,s.x,r.x,o.x),rr(e,s.y,r.y,o.y),rr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class vd extends Un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Z){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Gh(a,l.x,c.x,h.x,u.x),Gh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new Z().fromArray(s))}return this}}var Wh=Object.freeze({__proto__:null,ArcCurve:bv,CatmullRomCurve3:Av,CubicBezierCurve:md,CubicBezierCurve3:Dv,EllipseCurve:tc,LineCurve:gd,LineCurve3:Nv,QuadraticBezierCurve:_d,QuadraticBezierCurve3:Uv,SplineCurve:vd});class Fv extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wh[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Wh[s.type]().fromJSON(s))}return this}}class Ov extends Fv{constructor(e){super(),this.type="Path",this.currentPoint=new Z,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new gd(this.currentPoint.clone(),new Z(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new _d(this.currentPoint.clone(),new Z(e,t),new Z(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new md(this.currentPoint.clone(),new Z(e,t),new Z(n,s),new Z(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new vd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){const c=new tc(e,t,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ic extends gt{constructor(e=[new Z(0,-.5),new Z(.5,0),new Z(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Rt(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/t,u=new T,d=new Z,f=new T,g=new T,_=new T;let m=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(g)}for(let v=0;v<=t;v++){const x=n+v*h*s,w=Math.sin(x),N=Math.cos(x);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*w,u.y=e[E].y,u.z=e[E].x*N,o.push(u.x,u.y,u.z),d.x=v/t,d.y=E/(e.length-1),a.push(d.x,d.y);const C=l[3*E+0]*w,P=l[3*E+1],b=l[3*E+0]*N;c.push(C,P,b)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){const w=x+v*e.length,N=w,E=w+e.length,C=w+e.length+1,P=w+1;r.push(N,E,P),r.push(C,P,E)}this.setIndex(r),this.setAttribute("position",new dt(o,3)),this.setAttribute("uv",new dt(a,2)),this.setAttribute("normal",new dt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ic(e.points,e.segments,e.phiStart,e.phiLength)}}class sc extends ic{constructor(e=1,t=1,n=4,s=8){const r=new Ov;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new sc(e.radius,e.length,e.capSegments,e.radialSegments)}}class rc extends gt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new T,h=new Z;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(a,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Fo extends gt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;v(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new dt(u,3)),this.setAttribute("normal",new dt(d,3)),this.setAttribute("uv",new dt(f,2));function v(){const w=new T,N=new T;let E=0;const C=(t-e)/n;for(let P=0;P<=r;P++){const b=[],y=P/r,A=y*(t-e)+e;for(let z=0;z<=s;z++){const O=z/s,q=O*l+a,$=Math.sin(q),W=Math.cos(q);N.x=A*$,N.y=-y*n+m,N.z=A*W,u.push(N.x,N.y,N.z),w.set($,C,W).normalize(),d.push(w.x,w.y,w.z),f.push(O,1-y),b.push(g++)}_.push(b)}for(let P=0;P<s;P++)for(let b=0;b<r;b++){const y=_[b][P],A=_[b+1][P],z=_[b+1][P+1],O=_[b][P+1];h.push(y,A,O),h.push(A,z,O),E+=6}c.addGroup(p,E,0),p+=E}function x(w){const N=g,E=new Z,C=new T;let P=0;const b=w===!0?e:t,y=w===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const A=g;for(let z=0;z<=s;z++){const q=z/s*l+a,$=Math.cos(q),W=Math.sin(q);C.x=b*W,C.y=m*y,C.z=b*$,u.push(C.x,C.y,C.z),d.push(0,y,0),E.x=$*.5+.5,E.y=W*.5*y+.5,f.push(E.x,E.y),g++}for(let z=0;z<s;z++){const O=N+z,q=A+z;w===!0?h.push(q,q+1,O):h.push(q+1,q,O),P+=3}c.addGroup(p,P,w===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class oc extends Fo{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new oc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ac extends gt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/s,f=new T,g=new Z;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const v=p+m,x=v,w=v+n+1,N=v+n+2,E=v+1;a.push(x,w,E),a.push(w,N,E)}}this.setIndex(a),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ls extends gt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new T,d=new T,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const v=[],x=p/n;let w=0;p===0&&o===0?w=.5/t:p===n&&l===Math.PI&&(w=-.5/t);for(let N=0;N<=t;N++){const E=N/t;u.x=-e*Math.cos(s+E*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(s+E*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(E+w,1-x),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const x=h[p][v+1],w=h[p][v],N=h[p+1][v],E=h[p+1][v+1];(p!==0||o>0)&&f.push(x,w,E),(p!==n-1||l<Math.PI)&&f.push(w,N,E)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ls(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Pn extends hn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xl,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Qt extends Pn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Z(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Bv extends hn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xl,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}function ro(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function zv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function kv(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Xh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function xd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class xr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Hv extends xr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ps,endingEnd:ps}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ms:r=e,a=2*t-n;break;case Mo:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ms:o=e,l=2*n-t;break;case Mo:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,v=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-f)*m+(1.5+f)*_+.5*g,w=f*m-f*_;for(let N=0;N!==a;++N)r[N]=p*o[h+N]+v*o[c+N]+x*o[l+N]+w*o[u+N];return r}}class yd extends xr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class Vv extends xr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Fn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ro(t,this.TimeBufferType),this.values=ro(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ro(e.times,Array),values:ro(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Vv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Hv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case hr:t=this.InterpolantFactoryMethodDiscrete;break;case ur:t=this.InterpolantFactoryMethodLinear;break;case Ko:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hr;case this.InterpolantFactoryMethodLinear:return ur;case this.InterpolantFactoryMethodSmooth:return Ko}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&zv(s))for(let a=0,l=s.length;a!==l;++a){const c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ko,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=ur;class Ds extends Fn{constructor(e,t,n){super(e,t,n)}}Ds.prototype.ValueTypeName="bool";Ds.prototype.ValueBufferType=Array;Ds.prototype.DefaultInterpolation=hr;Ds.prototype.InterpolantFactoryMethodLinear=void 0;Ds.prototype.InterpolantFactoryMethodSmooth=void 0;class Md extends Fn{}Md.prototype.ValueTypeName="color";class Ts extends Fn{}Ts.prototype.ValueTypeName="number";class Gv extends xr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t);let c=e*a;for(let h=c+a;c!==h;c+=4)at.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Jt extends Fn{InterpolantFactoryMethodLinear(e){return new Gv(this.times,this.values,this.getValueSize(),e)}}Jt.prototype.ValueTypeName="quaternion";Jt.prototype.InterpolantFactoryMethodSmooth=void 0;class Ns extends Fn{constructor(e,t,n){super(e,t,n)}}Ns.prototype.ValueTypeName="string";Ns.prototype.ValueBufferType=Array;Ns.prototype.DefaultInterpolation=hr;Ns.prototype.InterpolantFactoryMethodLinear=void 0;Ns.prototype.InterpolantFactoryMethodSmooth=void 0;class Zn extends Fn{}Zn.prototype.ValueTypeName="vector";class Xn{constructor(e="",t=-1,n=[],s=Wl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=bn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Xv(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Fn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=kv(l);l=Xh(l,1,h),c=Xh(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Ts(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];xd(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let v=0;v!==d[g].morphTargets.length;++v){const x=d[g];m.push(x.time),p.push(x.morphTarget===_?1:0)}s.push(new Ts(".morphTargetInfluence["+_+"]",m,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(Zn,f+".position",d,"pos",s),n(Jt,f+".quaternion",d,"rot",s),n(Zn,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Wv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ts;case"vector":case"vector2":case"vector3":case"vector4":return Zn;case"color":return Md;case"quaternion":return Jt;case"bool":case"boolean":return Ds;case"string":return Ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Xv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Wv(i.type);if(i.times===void 0){const t=[],n=[];xd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const jn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class qv{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Yv=new qv;class Us{constructor(e){this.manager=e!==void 0?e:Yv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Us.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vn={};class $v extends Error{constructor(e,t){super(e),this.response=t}}class Sd extends Us{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=jn.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Vn[e]!==void 0){Vn[e].push({onLoad:t,onProgress:n,onError:s});return}Vn[e]=[],Vn[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Vn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){v();function v(){u.read().then(({done:x,value:w})=>{if(x)p.close();else{_+=w.byteLength;const N=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let E=0,C=h.length;E<C;E++){const P=h[E];P.onProgress&&P.onProgress(N)}p.enqueue(w),v()}},x=>{p.error(x)})}}});return new Response(m)}else throw new $v(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{jn.add(e,c);const h=Vn[e];delete Vn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Vn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Vn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class jv extends Us{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=jn.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=fr("img");function l(){h(),jn.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Kv extends Us{constructor(e){super(e)}load(e,t,n,s){const r=new Pt,o=new jv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Oo extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new te(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Zv extends Oo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ra=new Ie,qh=new T,Yh=new T;class lc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Z(512,512),this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jl,this._frameExtents=new Z(1,1),this._viewportCount=1,this._viewports=[new Ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;qh.setFromMatrixPosition(e.matrixWorld),t.position.copy(qh),Yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yh),t.updateMatrixWorld(),Ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Jv extends lc{constructor(){super(new kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=bs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Qv extends Oo{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Jv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const $h=new Ie,js=new T,Pa=new T;class ex extends lc{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Z(4,2),this._viewportCount=6,this._viewports=[new Ke(2,1,1,1),new Ke(0,1,1,1),new Ke(3,1,1,1),new Ke(1,1,1,1),new Ke(3,0,1,1),new Ke(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),js.setFromMatrixPosition(e.matrixWorld),n.position.copy(js),Pa.copy(n.position),Pa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Pa),n.updateMatrixWorld(),s.makeTranslation(-js.x,-js.y,-js.z),$h.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($h)}}class wd extends Oo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ex}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class tx extends lc{constructor(){super(new vr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yr extends Oo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new tx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ar{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class nx extends Us{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=jn.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return jn.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),jn.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});jn.add(e,l),r.manager.itemStart(e)}}class bd{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=jh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=jh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function jh(){return(typeof performance>"u"?Date:performance).now()}class ix{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,s=this.valueSize,r=e*s+s;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,s);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){at.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){const o=this._workIndex*r;at.multiplyQuaternionsFlat(e,o,e,t,e,n),at.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){const o=1-s;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*s}}}const cc="\\[\\]\\.:\\/",sx=new RegExp("["+cc+"]","g"),hc="[^"+cc+"]",rx="[^"+cc.replace("\\.","")+"]",ox=/((?:WC+[\/:])*)/.source.replace("WC",hc),ax=/(WCOD+)?/.source.replace("WCOD",rx),lx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hc),cx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hc),hx=new RegExp("^"+ox+ax+lx+cx+"$"),ux=["material","materials","bones","map"];class dx{constructor(e,t,n){const s=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class rt{constructor(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(sx,"")}static parseTrackName(e){const t=hx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);ux.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[s];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=dx;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class fx{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:ps,endingEnd:ps};for(let c=0;c!==o;++c){const h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=pl,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const s=this._mixer,r=s.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Nf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Wl:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let s=this.time+e,r=this._loopCount;const o=n===Df;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===er){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){const a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){const s=this._interpolantSettings;n?(s.endingStart=ms,s.endingEnd=ms):(e?s.endingStart=this.zeroSlopeAtStart?ms:ps:s.endingStart=Mo,t?s.endingEnd=this.zeroSlopeAtEnd?ms:ps:s.endingEnd=Mo)}_scheduleFading(e,t,n){const s=this._mixer,r=s.time;let o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}const px=new Float32Array(1);class mx extends Oi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=s[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;g=new ix(rt.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const s=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const s=this._bindingsByRootAndName,r=this._bindings;let o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new yd(new Float32Array(2),new Float32Array(2),1,px),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const s=t||this._root,r=s.uuid;let o=typeof e=="string"?Xn.findByName(s,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Wl),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new fx(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){const n=t||this._root,s=n.uuid,r=typeof e=="string"?Xn.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fl);class Bo extends ht{constructor(){const e=Bo.SkyShader,t=new Tt({name:e.name,uniforms:fi.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Ft,depthWrite:!1});super(new Rs(1,1,1),t),this.isSky=!0}}Bo.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new T},up:{value:new T(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function I(i,e,t){return Math.min(t,Math.max(e,i))}function B(i,e,t){return i+(e-i)*t}function Kh(i,e,t){const n=I((t-i)/(e-i),0,1);return n*n*(3-2*n)}function Li(i){return i*Math.PI/180}function Zh(i){const e=Math.sin(i*127.1)*43758.5453123;return e-Math.floor(e)}function Jh(i,e){const t=Math.max(1e-9,Zh(i)),n=Math.max(1e-9,Zh(e));return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*n)}function gx(i){return Math.max(0,Math.min(1,i))}function _x(i){return i-Math.floor(i)}function Dn(i){let e=i>>>0;return()=>{e+=1831565813;let t=Math.imul(e^e>>>15,1|e);return t^=t+Math.imul(t^t>>>7,61|t),((t^t>>>14)>>>0)/4294967296}}function Qh(i){return _x(Math.sin(i)*43758.5453123)}function Ct(i,e,t){const n=gx((t-i)/(e-i));return n*n*(3-2*n)}function vx(i,e=0){const t=Math.floor(i),n=i-t,s=Qh(t+e*101.13),r=Qh(t+1+e*101.13);return s+(r-s)*Ct(0,1,n)}function Ia(i,e=0,t=4){let n=.5,s=1,r=0,o=0;for(let a=0;a<t;a++)r+=n*vx(i*s,e+a*17),o+=n,n*=.5,s*=2;return o>0?r/o:0}function eu(i,e,t){const n=Math.min(e,t),s=Math.max(e,t);return n+Math.floor(i()*(s-n+1))}function tu(i){const e=Math.max(32,Math.floor(i.size)),t=Dn(i.seed),n=[],s=Math.max(4,Math.floor(i.components)),r=Math.max(1,Math.floor(i.freqMin)),o=Math.max(r,Math.floor(i.freqMax));for(let f=0;f<s;f++){let g=0,_=0;for(let x=0;x<8&&g===0&&_===0;x++)g=eu(t,-o,o),_=eu(t,-o,o),Math.abs(g)<r&&(g=0),Math.abs(_)<r&&(_=0);g===0&&_===0&&(g=r);const m=t()*Math.PI*2,p=Math.sqrt(g*g+_*_),v=1/Math.pow(Math.max(.001,p),Math.max(.1,i.falloff));n.push({kx:g,ky:_,phase:m,amp:v})}let a=0;for(const f of n)a+=f.amp;const l=a>1e-6?1/a:1;for(const f of n)f.amp*=l;const c=new Uint8Array(e*e*4),h=Math.PI*2,u=Math.max(0,i.strength);for(let f=0;f<e;f++){const g=f/e;for(let _=0;_<e;_++){const m=_/e;let p=0,v=0;for(const A of n){const z=h*(A.kx*m+A.ky*g)+A.phase,O=Math.cos(z);p+=A.amp*O*h*A.kx,v+=A.amp*O*h*A.ky}let x=-p*u,w=1,N=-v*u;const E=1/Math.max(1e-9,Math.sqrt(x*x+w*w+N*N));x*=E,w*=E,N*=E;const C=Math.max(0,Math.min(255,Math.round((x*.5+.5)*255))),P=Math.max(0,Math.min(255,Math.round((N*.5+.5)*255))),b=Math.max(0,Math.min(255,Math.round((w*.5+.5)*255))),y=(f*e+_)*4;c[y+0]=C,c[y+1]=P,c[y+2]=b,c[y+3]=255}}const d=new Bi(c,e,e);return d.name="MicroNormalTexture",d.flipY=!1,d.colorSpace=xn,d.wrapS=un,d.wrapT=un,d.generateMipmaps=!0,d.minFilter=an,d.magFilter=et,d.needsUpdate=!0,d}function xx(){const i=tu({size:256,seed:1337421,components:14,freqMin:4,freqMax:42,strength:.0075,falloff:1.15}),e=tu({size:256,seed:991103,components:18,freqMin:14,freqMax:96,strength:.0105,falloff:1.25});return i.name="MicroNormal_Ripples",e.name="MicroNormal_Capillary",{ripples:i,capillary:e}}const hs=32,nu=(()=>{const i=new Bi(new Uint8Array([0,0,0,255]),1,1);return i.needsUpdate=!0,i.flipY=!1,i.colorSpace=wt,i.minFilter=et,i.magFilter=et,i})(),iu=(()=>{const i=new Bi(new Uint8Array([0,0,0,255]),1,1);return i.needsUpdate=!0,i.flipY=!1,i.colorSpace=wt,i.minFilter=et,i.magFilter=et,i})();(()=>{const i=new Bi(new Uint8Array([128,128,255,255]),1,1);return i.needsUpdate=!0,i.flipY=!1,i.colorSpace=xn,i.minFilter=et,i.magFilter=et,i.wrapS=un,i.wrapT=un,i})();const su=xx();class yx{constructor(e){R(this,"material");R(this,"shader",null);R(this,"uniforms");const t=[],n=[];for(let s=0;s<hs;s++)t.push(new Ke(1,0,0,1)),n.push(new Ke(0,0,0,0));this.uniforms={u_time:{value:0},u_origin:{value:new Z(0,0)},u_current:{value:new Z(0,0)},u_tideHeight:{value:0},u_waveA:{value:t},u_waveB:{value:n},u_foamIntensity:{value:e.foamIntensity},u_foamSlopeStart:{value:e.foamSlopeStart},u_foamSlopeEnd:{value:e.foamSlopeEnd},u_waterClarity:{value:.7},u_sunDir:{value:new T(0,1,0)},u_sunColor:{value:new te("#ffffff")},u_sunIntensity:{value:1},u_reflectionMap:{value:nu},u_reflectionMatrix:{value:new Ie},u_reflectionStrength:{value:0},u_reflectionTexel:{value:new Z(1,1)},u_reflectionBlur:{value:0},u_reflectionEdgeFade:{value:.03},u_foamMap:{value:iu},u_foamCenter:{value:new Z(0,0)},u_foamWorldSize:{value:240},u_wind:{value:new Z(0,0)},u_microNormal1:{value:su.ripples},u_microNormal2:{value:su.capillary},u_microScale1:{value:.28},u_microScale2:{value:.85},u_microStrength:{value:.08},u_microFadeNear:{value:70},u_microFadeFar:{value:320}},this.material=new Qt({color:new te(e.waterColor),roughness:.045,metalness:0,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.25,ior:1.333,reflectivity:.78}),this.material.side=rn,this.setWaves(e.waves),this.material.onBeforeCompile=s=>{s.uniforms.u_time=this.uniforms.u_time,s.uniforms.u_origin=this.uniforms.u_origin,s.uniforms.u_current=this.uniforms.u_current,s.uniforms.u_tideHeight=this.uniforms.u_tideHeight,s.uniforms.u_waveA=this.uniforms.u_waveA,s.uniforms.u_waveB=this.uniforms.u_waveB,s.uniforms.u_foamIntensity=this.uniforms.u_foamIntensity,s.uniforms.u_foamSlopeStart=this.uniforms.u_foamSlopeStart,s.uniforms.u_foamSlopeEnd=this.uniforms.u_foamSlopeEnd,s.uniforms.u_waterClarity=this.uniforms.u_waterClarity,s.uniforms.u_sunDir=this.uniforms.u_sunDir,s.uniforms.u_sunColor=this.uniforms.u_sunColor,s.uniforms.u_sunIntensity=this.uniforms.u_sunIntensity,s.uniforms.u_reflectionMap=this.uniforms.u_reflectionMap,s.uniforms.u_reflectionMatrix=this.uniforms.u_reflectionMatrix,s.uniforms.u_reflectionStrength=this.uniforms.u_reflectionStrength,s.uniforms.u_reflectionTexel=this.uniforms.u_reflectionTexel,s.uniforms.u_reflectionBlur=this.uniforms.u_reflectionBlur,s.uniforms.u_reflectionEdgeFade=this.uniforms.u_reflectionEdgeFade,s.uniforms.u_foamMap=this.uniforms.u_foamMap,s.uniforms.u_foamCenter=this.uniforms.u_foamCenter,s.uniforms.u_foamWorldSize=this.uniforms.u_foamWorldSize,s.uniforms.u_wind=this.uniforms.u_wind,s.uniforms.u_microNormal1=this.uniforms.u_microNormal1,s.uniforms.u_microNormal2=this.uniforms.u_microNormal2,s.uniforms.u_microScale1=this.uniforms.u_microScale1,s.uniforms.u_microScale2=this.uniforms.u_microScale2,s.uniforms.u_microStrength=this.uniforms.u_microStrength,s.uniforms.u_microFadeNear=this.uniforms.u_microFadeNear,s.uniforms.u_microFadeFar=this.uniforms.u_microFadeFar,s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
        varying float vFoam;
        varying vec2 vWorldXZ;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;

        varying vec4 vReflProj;

        uniform float u_time;
        uniform vec2 u_origin;
        uniform vec2 u_current;
        uniform float u_tideHeight;
        uniform mat4 u_reflectionMatrix;
        uniform vec4 u_waveA[${hs}];
        uniform vec4 u_waveB[${hs}];
        uniform float u_foamSlopeStart;
        uniform float u_foamSlopeEnd;`),s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        // Ocean Gerstner displacement in object space, driven by world-XZ (origin + local XZ)
        vec2 worldXZ = transformed.xz + u_origin;
        vWorldXZ = worldXZ;

        vec3 disp = vec3(0.0);
        float dxdx = 0.0;
        float dxdz = 0.0;
        float dzdx = 0.0;
        float dzdz = 0.0;
        float dydx = 0.0;
        float dydz = 0.0;

        for (int i = 0; i < ${hs}; i++) {
          vec2 dir = normalize(u_waveA[i].xy);
          float A = u_waveA[i].z;
          float k = u_waveA[i].w;
          float omega = u_waveB[i].x;
          float phase0 = u_waveB[i].y;
          float Q = u_waveB[i].z;

          float w = omega + k * dot(dir, u_current);
          float theta = k * dot(dir, worldXZ) - w * u_time + phase0;

          float s = sin(theta);
          float c = cos(theta);

          disp.y += A * s;
          disp.xz += dir * (Q * A * c);

          float WAk = Q * A * k;

          dxdx += -dir.x * dir.x * WAk * s;
          dxdz += -dir.x * dir.y * WAk * s;
          dzdx += -dir.y * dir.x * WAk * s;
          dzdz += -dir.y * dir.y * WAk * s;

          dydx += A * k * dir.x * c;
          dydz += A * k * dir.y * c;
        }

        transformed.xyz += disp;
        transformed.y += u_tideHeight;

        // Surface normal from analytic partial derivatives (object space)
        vec3 T = vec3(1.0 + dxdx, dydx, dzdx);
        vec3 B = vec3(dxdz, dydz, 1.0 + dzdz);
        vec3 n = normalize(cross(B, T));

        // Override vNormal (view space)
        vNormal = normalize(normalMatrix * n);

        // Also keep world normal + world pos for custom glint/shading
        vWorldNormal = normalize(mat3(modelMatrix) * n);
        vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;

        // World -> reflection UV projection (planar reflection RT)
        vReflProj = u_reflectionMatrix * vec4(vWorldPos, 1.0);

        float slope = 1.0 - n.y;
        float foamSlope = smoothstep(u_foamSlopeStart, u_foamSlopeEnd, slope);
        float foamCrest = smoothstep(0.0, 0.25, disp.y);
        vFoam = foamSlope * foamCrest;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
        varying float vFoam;
        varying vec2 vWorldXZ;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        varying vec4 vReflProj;

        uniform float u_foamIntensity;
        uniform float u_time;
        uniform vec2 u_current;
        uniform float u_waterClarity;

        uniform sampler2D u_reflectionMap;
        uniform float u_reflectionStrength;
        uniform vec2 u_reflectionTexel;
        uniform float u_reflectionBlur;
        uniform float u_reflectionEdgeFade;

        uniform sampler2D u_foamMap;
        uniform vec2 u_foamCenter;
        uniform float u_foamWorldSize;

        uniform vec2 u_wind;
        uniform sampler2D u_microNormal1;
        uniform sampler2D u_microNormal2;
        uniform float u_microScale1;
        uniform float u_microScale2;
        uniform float u_microStrength;
        uniform float u_microFadeNear;
        uniform float u_microFadeFar;

        // World normal after micro-normal perturbation (written in normal pass).
        vec3 gWorldNormal;

        uniform vec3 u_sunDir;
        uniform vec3 u_sunColor;
        uniform float u_sunIntensity;`),s.fragmentShader=s.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        // --- Micro normals (capillary/wind ripples) ---
        vec3 NmacroW = normalize(vWorldNormal);

        // Wind-aligned coordinate frame (prevents obvious axis-aligned tiling).
        vec2 windV = u_wind;
        float windLen = length(windV);
        vec2 wDir = windLen > 1e-6 ? (windV / windLen) : vec2(1.0, 0.0);
        vec2 wPerp = vec2(-wDir.y, wDir.x);

        // Flow field for micro detail: mostly wind drift, a bit of surface current.
        vec2 flow = u_current * 0.18 + windV * 0.02;
        vec2 wpos = vWorldXZ + flow * u_time;
        vec2 p = vec2(dot(wpos, wDir), dot(wpos, wPerp));

        // Slight anisotropy suggests wind streaking.
        vec2 uv1 = vec2(p.x * u_microScale1 * 1.20, p.y * u_microScale1 * 0.70);
        vec2 uv2 = vec2(p.x * u_microScale2 * 0.85, p.y * u_microScale2 * 1.10) + vec2(31.7, -15.2);

        vec3 n1 = texture2D(u_microNormal1, uv1).xyz * 2.0 - 1.0;
        vec3 n2 = texture2D(u_microNormal2, uv2).xyz * 2.0 - 1.0;
        vec3 nTS = normalize(mix(n1, n2, 0.55));

        // Basis around macro normal (world space).
        vec3 up = vec3(0.0, 1.0, 0.0);
        vec3 T = cross(up, NmacroW);
        float t2 = dot(T, T);
        T = (t2 > 1e-8) ? normalize(T) : vec3(1.0, 0.0, 0.0);
        vec3 B = normalize(cross(NmacroW, T));

        vec3 NmicroW = normalize(T * nTS.x + B * nTS.y + NmacroW * nTS.z);

        // Fade micro detail with distance to prevent shimmering.
        float distXZ = length(cameraPosition.xz - vWorldPos.xz);
        float microFade = 1.0 - smoothstep(u_microFadeNear, u_microFadeFar, distXZ);
        float microAmt = clamp(u_microStrength, 0.0, 1.0) * microFade;

        // Wave slope-foam dampens micro facets (helps keep sunset highlight stable).
        microAmt *= (1.0 - clamp(vFoam, 0.0, 1.0) * 0.55);

        vec3 NfinalW = normalize(mix(NmacroW, NmicroW, microAmt));
        gWorldNormal = NfinalW;

        // Feed view-space normal back into the PBR lighting pipeline.
        normal = normalize(mat3(viewMatrix) * NfinalW);
        `),s.fragmentShader=s.fragmentShader.replace("#include <opaque_fragment>",`// --- Foam (instantaneous + persistent field) ---
        float foamInstant = clamp(vFoam, 0.0, 1.0);

        vec2 fuv = (vWorldXZ - u_foamCenter) / max(1e-6, u_foamWorldSize) + vec2(0.5);
        float inFoam = step(0.0, fuv.x) * step(0.0, fuv.y) * step(fuv.x, 1.0) * step(fuv.y, 1.0);
        float foamPersist = texture2D(u_foamMap, fuv).r * inFoam;
        foamPersist = pow(clamp(foamPersist, 0.0, 1.0), 1.15);

        float foam = clamp((foamInstant * 0.55 + foamPersist * 1.10) * u_foamIntensity, 0.0, 1.0);

        // --- Water transmission tint (cheap absorption) ---
        float viewDist = length(vViewPosition);
        float absorb = mix(0.00052, 0.00018, clamp(u_waterClarity, 0.0, 1.0));
        float att = exp(-absorb * viewDist);
        vec3 deep = vec3(0.02, 0.10, 0.18);
        vec3 green = vec3(0.02, 0.19, 0.17);
        vec3 tint = mix(green, deep, clamp(u_waterClarity, 0.0, 1.0));
        outgoingLight = mix(tint, outgoingLight, clamp(0.50 + 0.50 * att, 0.0, 1.0));

        // --- Planar reflection (stable horizon/sky/objects) ---
        // Use the *macro* normal for the reflection UV distortion so it stays stable.
        vec3 Nmacro = normalize(vWorldNormal);
        // Use the micro-perturbed normal for small-facet sunglint.
        vec3 N = normalize(gWorldNormal);

        vec3 V = normalize(cameraPosition - vWorldPos);
        float ndvRaw = dot(Nmacro, V);
        float viewAbove = step(0.0, ndvRaw);
        float ndv = max(ndvRaw, 0.0);

        vec2 ruv = vReflProj.xy / max(vReflProj.w, 1e-6);
        // Subtle distortion from macro wave normal (kept small to avoid shimmer).
        ruv += Nmacro.xz * (0.03 + 0.02 * (1.0 - clamp(u_waterClarity, 0.0, 1.0))) * (1.0 - foam * 0.75);

        // Soft edge fade to prevent hard popping when the proj rect clips.
        float e = max(u_reflectionEdgeFade, 0.0001);
        float inBounds =
          smoothstep(0.0, e, ruv.x) * smoothstep(0.0, e, ruv.y) *
          (1.0 - smoothstep(1.0 - e, 1.0, ruv.x)) *
          (1.0 - smoothstep(1.0 - e, 1.0, ruv.y));

        vec3 reflCol = texture2D(u_reflectionMap, ruv).rgb;
        // Roughness-aware blur fallback (cheap 5-tap). Only enabled on High/Max.
        if (u_reflectionBlur > 0.001) {
          vec2 off = u_reflectionTexel * u_reflectionBlur;
          vec3 s1 = texture2D(u_reflectionMap, ruv + vec2(off.x, 0.0)).rgb;
          vec3 s2 = texture2D(u_reflectionMap, ruv - vec2(off.x, 0.0)).rgb;
          vec3 s3 = texture2D(u_reflectionMap, ruv + vec2(0.0, off.y)).rgb;
          vec3 s4 = texture2D(u_reflectionMap, ruv - vec2(0.0, off.y)).rgb;
          reflCol = reflCol * 0.40 + (s1 + s2 + s3 + s4) * 0.15;
        }

        // Water Fresnel (Schlick, F0 ~ 0.02 for IOR~1.33)
        float F0 = 0.020;
        float fresW = F0 + (1.0 - F0) * pow(1.0 - ndv, 5.0);

        float reflAmt = clamp(u_reflectionStrength, 0.0, 1.25) * fresW;
        reflAmt *= inBounds * viewAbove;
        // Foam kills coherent mirror reflection.
        reflAmt *= (1.0 - foam * 0.88);

        // Fresnel mix: grazing -> reflection dominates.
        outgoingLight = mix(outgoingLight, reflCol, clamp(reflAmt, 0.0, 1.0));

        // --- Foam (whitens crests) ---
        outgoingLight = mix(outgoingLight, vec3(1.0), foam * 0.95);

        // --- Sunset sunglint path (highlight spice) ---
        vec3 L = normalize(u_sunDir);

        // Use micro normals only partially so the "golden path" stays coherent.
        vec3 Ngl = normalize(mix(Nmacro, N, 0.85));

        vec3 R = reflect(-L, Ngl);
        float rv = max(dot(R, V), 0.0);

        float fres = pow(1.0 - ndv, 5.0);

        // Sharper when sun is low on the horizon
        float sunLow = clamp(1.0 - abs(L.y) * 2.2, 0.0, 1.0);
        float gloss = mix(180.0, 720.0, sunLow);
        float spec = pow(rv, gloss);

        // Foam reduces mirror glint
        spec *= mix(1.0, 0.30, foam);

        // Reduce glint slightly when planar reflection is already strong.
        float glintGate = mix(1.0, 0.55, clamp(reflAmt, 0.0, 1.0));

        // Final glint contribution
        vec3 sunCol = u_sunColor;
        outgoingLight += sunCol * (u_sunIntensity * 1.15) * spec * (0.30 + 0.70 * fres) * glintGate * viewAbove;

        // --- Underside surface glow (when the camera is underwater) ---
        // We don't attempt true refraction here (too heavy for mobile), but we do
        // add a physically-plausible "sun patch" and grazing sheen so the surface
        // reads correctly from below.
        float viewBelow = 1.0 - viewAbove;
        if (viewBelow > 0.5) {
          // Spec-like hotspot from the sun reflection direction.
          float rvUnder = max(dot(R, V), 0.0);
          float glossUnder = mix(120.0, 220.0, sunLow);
          float specUnder = pow(rvUnder, glossUnder);

          // A broader forward-scatter-ish glow when looking up.
          float upGlow = pow(max(dot(Nmacro, L), 0.0), 10.0);

          float underAmt = (specUnder * 0.55 + upGlow * 0.18) * u_sunIntensity;
          // Foam kills coherent highlights even from below.
          underAmt *= mix(1.0, 0.35, foam);

          // Slightly water-filtered (less saturated) sun color.
          vec3 sunW = mix(vec3(0.12, 0.24, 0.30), sunCol, 0.72);
          outgoingLight += sunW * underAmt;

          // Grazing sheen from below (total internal reflection vibe).
          float ndvUnder = clamp(-ndvRaw, 0.0, 1.0);
          float fresUnder = F0 + (1.0 - F0) * pow(1.0 - ndvUnder, 5.0);
          outgoingLight += sunW * fresUnder * u_sunIntensity * 0.08 * (1.0 - foam * 0.7);
        }

        #include <opaque_fragment>`),this.shader=s},this.material.customProgramCacheKey=()=>"OceanMaterial_v6_underwater_glow",this.setWaves(e.waves)}setWaves(e){this.writeWaves(e),this.material.needsUpdate=!0}writeWaves(e){const t=Math.min(e.length,hs);for(let n=0;n<hs;n++)if(n<t){const s=e[n];this.uniforms.u_waveA.value[n].set(s.dirX,s.dirZ,s.A,s.k),this.uniforms.u_waveB.value[n].set(s.omega,s.phase,s.Q,0)}else this.uniforms.u_waveA.value[n].set(1,0,0,1),this.uniforms.u_waveB.value[n].set(0,0,0,0)}update(e,t){this.uniforms.u_time.value=t.time_s,this.uniforms.u_origin.value.copy(t.originXZ),this.uniforms.u_current.value.copy(t.currentXZ),this.uniforms.u_tideHeight.value=t.tideHeight_m,this.uniforms.u_waterClarity.value=I(t.waterClarity,0,1),this.uniforms.u_foamIntensity.value=I(t.foamIntensity,0,3),this.uniforms.u_foamSlopeStart.value=I(t.foamSlopeStart,0,2),this.uniforms.u_foamSlopeEnd.value=I(t.foamSlopeEnd,0,2),this.uniforms.u_wind.value.copy(t.windXZ),this.uniforms.u_microStrength.value=I(t.microStrength,0,.35),this.uniforms.u_microFadeNear.value=Math.max(1,t.microFadeNear_m),this.uniforms.u_microFadeFar.value=Math.max(this.uniforms.u_microFadeNear.value+1,t.microFadeFar_m),this.uniforms.u_sunDir.value.copy(t.sunDir).normalize(),this.uniforms.u_sunColor.value.copy(t.sunColor),this.uniforms.u_sunIntensity.value=I(t.sunIntensity,0,1.5),this.shader}bindPlanarReflection(e,t){this.uniforms.u_reflectionMap.value=e??nu,this.uniforms.u_reflectionMatrix.value=t??new Ie}setPlanarReflectionStrength(e){this.uniforms.u_reflectionStrength.value=I(e,0,1.25)}setPlanarReflectionSampling(e){if(e.texel!==void 0)if(typeof e.texel=="number"){const t=Math.max(1e-6,e.texel);this.uniforms.u_reflectionTexel.value.set(t,t)}else this.uniforms.u_reflectionTexel.value.copy(e.texel);e.blur!==void 0&&(this.uniforms.u_reflectionBlur.value=Math.max(0,e.blur)),e.edgeFade!==void 0&&(this.uniforms.u_reflectionEdgeFade.value=I(e.edgeFade,0,.25))}bindFoamMap(e){this.uniforms.u_foamMap.value=e??iu}setFoamFieldTransform(e,t){this.uniforms.u_foamCenter.value.copy(e),this.uniforms.u_foamWorldSize.value=Math.max(.001,t)}}const us=24;class uc{constructor(e,t){R(this,"centerXZ",new Z(0,0));R(this,"worldSize_m");R(this,"rtA");R(this,"rtB");R(this,"pingIsA",!0);R(this,"simScene",new cd);R(this,"simCam",new vr(-1,1,1,-1,0,1));R(this,"quad");R(this,"uniforms");R(this,"mat");R(this,"tmpDelta",new Z);R(this,"tmpFlow",new Z);R(this,"tmpWind",new Z);R(this,"tmpWakePos",new Z);R(this,"tmpWakeDir",new Z(0,1));const n=Math.max(64,Math.floor(t.size));this.worldSize_m=Math.max(20,t.worldSize_m);const r=!!e.extensions.get("EXT_color_buffer_float")||!!e.extensions.get("EXT_color_buffer_half_float")?wn:dn,o=()=>{const u=new Vt(n,n,{format:qt,type:r,depthBuffer:!1,stencilBuffer:!1,minFilter:et,magFilter:et});return u.texture.name="FoamFieldRT",u.texture.flipY=!1,u.texture.colorSpace=wt,u.texture.generateMipmaps=!1,u.texture.wrapS=on,u.texture.wrapT=on,u};this.rtA=o(),this.rtB=o();const a=[],l=[];for(let u=0;u<us;u++)a.push(new Ke(1,0,0,1)),l.push(new Ke(0,0,0,0));this.uniforms={u_prev:{value:this.rtA.texture},u_dt:{value:.016},u_time:{value:0},u_worldSize:{value:this.worldSize_m},u_center:{value:new Z(0,0)},u_recenterDeltaUV:{value:new Z(0,0)},u_texel:{value:new Z(1/n,1/n)},u_flow:{value:new Z(0,0)},u_current:{value:new Z(0,0)},u_injectStrength:{value:.5},u_decay:{value:.06},u_slopeStart:{value:.26},u_slopeEnd:{value:.52},u_crestStart:{value:.18},u_crestEnd:{value:.72},u_wakePos:{value:new Z(0,0)},u_wakeDir:{value:new Z(0,1)},u_wakeStrength:{value:0},u_wakeRadius:{value:1.6},u_wakeLength:{value:4.6},u_waveA:{value:a},u_waveB:{value:l}},this.mat=new Tt({uniforms:this.uniforms,depthTest:!1,depthWrite:!1,transparent:!1,blending:yt,vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        varying vec2 vUv;

        uniform sampler2D u_prev;
        uniform float u_dt;
        uniform float u_time;
        uniform float u_worldSize;
        uniform vec2 u_center;
        uniform vec2 u_recenterDeltaUV;
        uniform vec2 u_texel;

        uniform vec2 u_flow;
        uniform vec2 u_current;

        uniform float u_injectStrength;
        uniform float u_decay;
        uniform float u_slopeStart;
        uniform float u_slopeEnd;
        uniform float u_crestStart;
        uniform float u_crestEnd;

        uniform vec2 u_wakePos;
        uniform vec2 u_wakeDir;
        uniform float u_wakeStrength;
        uniform float u_wakeRadius;
        uniform float u_wakeLength;

        uniform vec4 u_waveA[${us}];
        uniform vec4 u_waveB[${us}];

        float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }

        void main() {
          // Map previous texture into the new "window" and advect by flow.
          vec2 velUV = (u_flow * u_dt) / max(1e-6, u_worldSize);
          vec2 uvPrev = vUv + u_recenterDeltaUV - velUV;

          float inPrev = step(0.0, uvPrev.x) * step(0.0, uvPrev.y) * step(uvPrev.x, 1.0) * step(uvPrev.y, 1.0);

          // Mild directional smear along the flow to create streaky foam.
          vec2 fdir = normalize(u_flow + vec2(1e-5, 0.0));
          vec2 smear = fdir * u_texel * 1.25;
          float p0 = texture2D(u_prev, uvPrev).r;
          float p1 = texture2D(u_prev, uvPrev - smear).r;
          float p2 = texture2D(u_prev, uvPrev + smear).r;
          float prev = (p0 * 0.70 + p1 * 0.15 + p2 * 0.15) * inPrev;

          // Exponential decay.
          prev *= exp(-u_decay * u_dt);

          // World position for injection evaluation.
          vec2 worldXZ = u_center + (vUv - 0.5) * u_worldSize;

          // --- Wave breaking proxy (slope + cresting) ---
          float dydx = 0.0;
          float dydz = 0.0;
          float height = 0.0;
          float aSum = 0.0;

          for (int i = 0; i < ${us}; i++) {
            vec2 dir = normalize(u_waveA[i].xy);
            float A = u_waveA[i].z;
            float k = u_waveA[i].w;
            float omega = u_waveB[i].x;
            float phase0 = u_waveB[i].y;

            float w = omega + k * dot(dir, u_current);
            float theta = k * dot(dir, worldXZ) - w * u_time + phase0;
            float s = sin(theta);
            float c = cos(theta);

            height += A * s;
            dydx += A * k * dir.x * c;
            dydz += A * k * dir.y * c;
            aSum += A;
          }

          float slope = length(vec2(dydx, dydz));
          float slopeGate = smoothstep(u_slopeStart, u_slopeEnd, slope);

          float crestNorm = height / max(0.001, aSum);
          float crestGate = smoothstep(u_crestStart, u_crestEnd, crestNorm);

          float breakMask = slopeGate * crestGate;

          // Add a little spatial noise so it doesn't look like a perfect analytic mask.
          float n = hash12(worldXZ * 0.08 + u_time * 0.04);
          breakMask *= smoothstep(0.15, 1.0, n);

          float foam = prev;
          foam += breakMask * u_injectStrength * u_dt;

          // --- Wake injection (optional) ---
          if (u_wakeStrength > 0.0001) {
            vec2 d = worldXZ - u_wakePos;
            vec2 wdir = normalize(u_wakeDir + vec2(1e-6, 0.0));
            vec2 wperp = vec2(-wdir.y, wdir.x);

            float along = dot(d, wdir);
            float back = max(0.0, -along);
            float side = dot(d, wperp);

            float wake = exp(-(side * side) / max(1e-4, (u_wakeRadius * u_wakeRadius)));
            wake *= exp(-(back * back) / max(1e-4, (u_wakeLength * u_wakeLength)));

            foam += wake * u_wakeStrength * u_dt;
          }

          foam = clamp(foam, 0.0, 1.0);
          gl_FragColor = vec4(foam, foam, foam, 1.0);
        }
      `});const c=new ti(2,2);this.quad=new ht(c,this.mat),this.simScene.add(this.quad);const h=e.getRenderTarget();e.setRenderTarget(this.rtA),e.clear(),e.setRenderTarget(this.rtB),e.clear(),e.setRenderTarget(h)}dispose(){this.rtA.dispose(),this.rtB.dispose(),this.mat.dispose(),this.quad.geometry.dispose()}reset(e,t){t?this.centerXZ.copy(t):this.centerXZ.set(0,0),this.pingIsA=!0,this.uniforms.u_center.value.copy(this.centerXZ),this.uniforms.u_recenterDeltaUV.value.set(0,0);const n=e.getRenderTarget();e.setRenderTarget(this.rtA),e.clear(),e.setRenderTarget(this.rtB),e.clear(),e.setRenderTarget(n)}get texture(){return(this.pingIsA?this.rtA:this.rtB).texture}setWorldSize(e){this.worldSize_m=Math.max(20,e),this.uniforms.u_worldSize.value=this.worldSize_m}setSize(e){const t=Math.max(64,Math.floor(e));this.rtA.setSize(t,t),this.rtB.setSize(t,t),this.uniforms.u_texel.value.set(1/t,1/t)}writeWaves(e){const t=Math.min(e.length,us),n=this.uniforms.u_waveA.value,s=this.uniforms.u_waveB.value;for(let r=0;r<us;r++)if(r<t){const o=e[r];n[r].set(o.dirX,o.dirZ,o.A,o.k),s[r].set(o.omega,o.phase,o.Q,0)}else n[r].set(1,0,0,1),s[r].set(0,0,0,0)}update(e,t){const n=I(t.dt_s,0,.05);if(n<=0)return;this.tmpDelta.copy(t.centerXZ).sub(this.centerXZ);const s=this.tmpDelta.x/Math.max(1e-6,this.worldSize_m),r=this.tmpDelta.y/Math.max(1e-6,this.worldSize_m);this.uniforms.u_recenterDeltaUV.value.set(s,r),this.tmpWind.set(Math.cos(t.windDirTo_rad),Math.sin(t.windDirTo_rad));const o=I(t.windSpeed_mps*.02,0,.45);this.tmpWind.multiplyScalar(o),this.tmpFlow.copy(t.currentXZ).add(this.tmpWind);const a=I(t.storminess,0,1),l=I(t.windSpeed_mps/18,0,1);let c=0,h=0,u=0;for(const x of t.waves){const w=x.A_m*x.A_m;c+=Math.cos(x.dirTo_rad)*w,h+=Math.sin(x.dirTo_rad)*w,u+=w}const d=u>1e-8?Math.sqrt(c*c+h*h)/u:1,f=I(1-d,0,1);this.uniforms.u_injectStrength.value=(.22+.78*l)*(.75+1.25*a)*(1+1.05*f),this.uniforms.u_decay.value=B(.045,.085,a)*(1+.3*f),this.uniforms.u_slopeStart.value=B(.3,.19,l),this.uniforms.u_slopeEnd.value=this.uniforms.u_slopeStart.value+B(.2,.3,l),this.uniforms.u_crestStart.value=B(.15,.08,l),this.uniforms.u_crestEnd.value=B(.7,.52,l);const g=I(t.wakeStrength??0,0,1.5);g>1e-4&&t.wakePosXZ&&t.wakeDirXZ?(this.tmpWakePos.copy(t.wakePosXZ),this.tmpWakeDir.copy(t.wakeDirXZ),this.tmpWakeDir.lengthSq()>1e-8?this.tmpWakeDir.normalize():this.tmpWakeDir.set(0,1),this.uniforms.u_wakePos.value.copy(this.tmpWakePos),this.uniforms.u_wakeDir.value.copy(this.tmpWakeDir),this.uniforms.u_wakeStrength.value=g):this.uniforms.u_wakeStrength.value=0,this.uniforms.u_dt.value=n,this.uniforms.u_time.value=t.time_s,this.uniforms.u_center.value.copy(t.centerXZ),this.uniforms.u_flow.value.copy(this.tmpFlow),this.uniforms.u_current.value.copy(t.currentXZ),this.writeWaves(t.waves);const _=this.pingIsA?this.rtA:this.rtB,m=this.pingIsA?this.rtB:this.rtA;this.uniforms.u_prev.value=_.texture;const p=e.getRenderTarget(),v=e.xr.enabled;e.xr.enabled=!1,e.setRenderTarget(m),e.render(this.simScene,this.simCam),e.setRenderTarget(p),e.xr.enabled=v,this.pingIsA=!this.pingIsA,this.centerXZ.copy(t.centerXZ)}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class In{constructor(e,t,n,s,r="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),In.nextNameID=In.nextNameID||0,this.$name.id=`lil-gui-name-${++In.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Mx extends In{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ml(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Sx={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:Ml,toHexString:Ml},gr={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},wx={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){const n=gr.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;const s=i*n<<16^e*n<<8^t*n<<0;return gr.toHexString(s)}},bx={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const n=gr.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;const s=i*n<<16^e*n<<8^t*n<<0;return gr.toHexString(s)}},Ax=[Sx,gr,wx,bx];function Tx(i){return Ax.find(e=>e.match(i))}class Ex extends In{constructor(e,t,n,s){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Tx(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=Ml(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class La extends In{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Cx extends In{constructor(e,t,n,s,r,o){super(e,t,n,"number"),this._initInput(),this.min(s),this.max(r);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let v=parseFloat(this.$input.value);isNaN(v)||(this._stepExplicit&&(v=this._snap(v)),this.setValue(this._clamp(v)))},n=v=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+v),this.$input.value=this.getValue())},s=v=>{v.key==="Enter"&&this.$input.blur(),v.code==="ArrowUp"&&(v.preventDefault(),n(this._step*this._arrowKeyMultiplier(v))),v.code==="ArrowDown"&&(v.preventDefault(),n(this._step*this._arrowKeyMultiplier(v)*-1))},r=v=>{this._inputFocused&&(v.preventDefault(),n(this._step*this._normalizeMouseWheel(v)))};let o=!1,a,l,c,h,u;const d=5,f=v=>{a=v.clientX,l=c=v.clientY,o=!0,h=this.getValue(),u=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",_)},g=v=>{if(o){const x=v.clientX-a,w=v.clientY-l;Math.abs(w)>d?(v.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>d&&_()}if(!o){const x=v.clientY-c;u-=x*this._step*this._arrowKeyMultiplier(v),h+u>this._max?u=this._max-h:h+u<this._min&&(u=this._min-h),this._snapClampSetValue(h+u)}c=v.clientY},_=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",_)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(p,v,x,w,N)=>(p-v)/(x-v)*(N-w)+w,t=p=>{const v=this.$slider.getBoundingClientRect();let x=e(p,v.left,v.right,this._min,this._max);this._snapClampSetValue(x)},n=p=>{this._setDraggingStyle(!0),t(p.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=p=>{t(p.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)};let o=!1,a,l;const c=p=>{p.preventDefault(),this._setDraggingStyle(!0),t(p.touches[0].clientX),o=!1},h=p=>{p.touches.length>1||(this._hasScrollBar?(a=p.touches[0].clientX,l=p.touches[0].clientY,o=!0):c(p),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=p=>{if(o){const v=p.touches[0].clientX-a,x=p.touches[0].clientY-l;Math.abs(v)>Math.abs(x)?c(p):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else p.preventDefault(),t(p.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},f=this._callOnFinishChange.bind(this),g=400;let _;const m=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const x=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(f,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Rx extends In{constructor(e,t,n,s){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class Px extends In{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Ix=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: none;
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
  }
  .lil-gui button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Lx(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let ru=!1;class dc{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:s,title:r="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",c=>{(c.code==="Enter"||c.code==="Space")&&(c.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!ru&&a&&(Lx(Ix),ru=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=o}add(e,t,n,s,r){if(Object(n)===n)return new Rx(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new Cx(this,e,t,n,s,r);case"boolean":return new Mx(this,e,t);case"string":return new Px(this,e,t);case"function":return new La(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new Ex(this,e,t,n)}addFolder(e){const t=new dc({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof La||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof La)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const Ad=["New Moon","Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon","Waning Gibbous","Last Quarter","Waning Crescent"];function Dx(i){switch(i){case"New Moon":return 0;case"Waxing Crescent":return .125;case"First Quarter":return .25;case"Waxing Gibbous":return .375;case"Full Moon":return .5;case"Waning Gibbous":return .625;case"Last Quarter":return .75;case"Waning Crescent":return .875;default:return .5}}const Td=["Custom","Equator (superstorm demo)","Monterey Bay, CA (kelp forest)","Maldives Atoll (tropical clear)","Drake Passage (Southern Ocean)","Prince William Sound, Alaska (cold fjords)"];function Mr(i){switch(i){case"Low":return"Fastest. Lower ocean mesh density, fewer particles/waves. Best for weak phones.";case"Medium":return"Balanced. Decent mesh density + particles. Good default on most devices.";case"High":return"Prettier. Higher mesh density + more wave components + nicer sky updates.";case"Max":return"Max visuals. Highest mesh density, more particles, and experimental screen-space ray-traced reflections (heavy).";default:return""}}const fc="ocean-sim-settings",Ed=1;function Ut(i,e,t){return Math.min(t,Math.max(e,i))}function Nx(){try{const i=typeof window<"u"&&!!window.matchMedia&&window.matchMedia("(pointer: coarse)").matches,e=typeof navigator<"u"?navigator.userAgent:"",t=/Android|iPhone|iPad|iPod/i.test(e);return i||t}catch{return!1}}function Ux(){try{const i=navigator==null?void 0:navigator.deviceMemory;return typeof i=="number"&&Number.isFinite(i)?i:null}catch{return null}}function Fx(){try{return typeof window<"u"&&!!window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Ox(){const i=Nx(),e=Ux();return i?e!==null&&e<=2?"Low":"Medium":e!==null?e<=2?"Low":e<=4?"Medium":e<=6?"High":"Max":"High"}function Cd(){const i=Ox(),e=Fx();return{gameStarted:!1,locationPreset:"Equator (superstorm demo)",latitude_deg:1.2,longitude_deg:-28,coastProximity:0,depth_m:4800,dayOfYear:205,timeOfDay_h:20.25,moonPhaseName:"Full Moon",moonDistanceMultiplier:1,precipChance_pct:100,stormsIn2to4hChance_pct:100,verticalWindShear_mps:1.5,hurricaneChanceAdjust_pct:20,otterosity_pct:55,exoticEncounters_pct:8,otterFurSilhouette:i==="High"||i==="Max",cameraDistance_m:9,cameraElevation_m:1.05,clarity_pct:55,quality:i,qualityInfo:Mr(i),perfOverlay:!0,reduceFlashes:e,audioEnabled:!0,masterVolume:.55,derived_state:"—",derived_clock:"—",derived_airTemp_C:0,derived_waterTemp_C:0,derived_cloudCover:0,derived_visibility_km:0,derived_windSpeed_mps:0,derived_windDirFrom_deg:0,derived_precip:"—",derived_Hs_m:0,derived_Tp_s:0,derived_tideScale:1,derived_stormETA:"—",derived_stormChanceEff_pct:0,derived_hurricaneChanceEff_pct:0}}const Bx=["Low","Medium","High","Max"];function zx(i){return typeof i=="string"&&Bx.includes(i)}function kx(i){return typeof i=="string"&&Td.includes(i)}function Hx(i){return typeof i=="string"&&Ad.includes(i)}function Vx(i){if(typeof window>"u")return;let e=null;try{const n=window.localStorage.getItem(fc);if(!n)return;const s=JSON.parse(n);if(!s||s.v!==Ed)return;e=s}catch{return}const t=e.data??{};kx(t.locationPreset)&&(i.locationPreset=t.locationPreset),typeof t.latitude_deg=="number"&&Number.isFinite(t.latitude_deg)&&(i.latitude_deg=Ut(t.latitude_deg,-80,80)),typeof t.longitude_deg=="number"&&Number.isFinite(t.longitude_deg)&&(i.longitude_deg=Ut(t.longitude_deg,-180,180)),typeof t.coastProximity=="number"&&Number.isFinite(t.coastProximity)&&(i.coastProximity=Ut(t.coastProximity,0,1)),typeof t.depth_m=="number"&&Number.isFinite(t.depth_m)&&(i.depth_m=Ut(t.depth_m,5,6e3)),typeof t.dayOfYear=="number"&&Number.isFinite(t.dayOfYear)&&(i.dayOfYear=Ut(t.dayOfYear,1,365)),typeof t.timeOfDay_h=="number"&&Number.isFinite(t.timeOfDay_h)&&(i.timeOfDay_h=Ut(t.timeOfDay_h,0,24)),Hx(t.moonPhaseName)&&(i.moonPhaseName=t.moonPhaseName),typeof t.moonDistanceMultiplier=="number"&&Number.isFinite(t.moonDistanceMultiplier)&&(i.moonDistanceMultiplier=Ut(t.moonDistanceMultiplier,.85,1.15)),typeof t.precipChance_pct=="number"&&Number.isFinite(t.precipChance_pct)&&(i.precipChance_pct=Ut(t.precipChance_pct,0,100)),typeof t.stormsIn2to4hChance_pct=="number"&&Number.isFinite(t.stormsIn2to4hChance_pct)&&(i.stormsIn2to4hChance_pct=Ut(t.stormsIn2to4hChance_pct,0,100)),typeof t.verticalWindShear_mps=="number"&&Number.isFinite(t.verticalWindShear_mps)&&(i.verticalWindShear_mps=Ut(t.verticalWindShear_mps,0,30)),typeof t.hurricaneChanceAdjust_pct=="number"&&Number.isFinite(t.hurricaneChanceAdjust_pct)&&(i.hurricaneChanceAdjust_pct=Ut(t.hurricaneChanceAdjust_pct,-20,20)),typeof t.otterosity_pct=="number"&&Number.isFinite(t.otterosity_pct)&&(i.otterosity_pct=Ut(t.otterosity_pct,0,100)),typeof t.exoticEncounters_pct=="number"&&Number.isFinite(t.exoticEncounters_pct)&&(i.exoticEncounters_pct=Ut(t.exoticEncounters_pct,0,100)),typeof t.otterFurSilhouette=="boolean"&&(i.otterFurSilhouette=t.otterFurSilhouette),typeof t.cameraDistance_m=="number"&&Number.isFinite(t.cameraDistance_m)&&(i.cameraDistance_m=Ut(t.cameraDistance_m,9,18)),typeof t.cameraElevation_m=="number"&&Number.isFinite(t.cameraElevation_m)&&(i.cameraElevation_m=Ut(t.cameraElevation_m,.35,3)),typeof t.clarity_pct=="number"&&Number.isFinite(t.clarity_pct)&&(i.clarity_pct=Ut(t.clarity_pct,0,100)),zx(t.quality)&&(i.quality=t.quality),typeof t.perfOverlay=="boolean"&&(i.perfOverlay=t.perfOverlay),typeof t.reduceFlashes=="boolean"&&(i.reduceFlashes=t.reduceFlashes),typeof t.audioEnabled=="boolean"&&(i.audioEnabled=t.audioEnabled),typeof t.masterVolume=="number"&&Number.isFinite(t.masterVolume)&&(i.masterVolume=Ut(t.masterVolume,0,1)),i.qualityInfo=Mr(i.quality)}function go(i){if(typeof window>"u")return;const e={locationPreset:i.locationPreset,latitude_deg:i.latitude_deg,longitude_deg:i.longitude_deg,coastProximity:i.coastProximity,depth_m:i.depth_m,dayOfYear:i.dayOfYear,timeOfDay_h:i.timeOfDay_h,moonPhaseName:i.moonPhaseName,moonDistanceMultiplier:i.moonDistanceMultiplier,precipChance_pct:i.precipChance_pct,stormsIn2to4hChance_pct:i.stormsIn2to4hChance_pct,verticalWindShear_mps:i.verticalWindShear_mps,hurricaneChanceAdjust_pct:i.hurricaneChanceAdjust_pct,otterosity_pct:i.otterosity_pct,exoticEncounters_pct:i.exoticEncounters_pct,otterFurSilhouette:i.otterFurSilhouette,cameraDistance_m:i.cameraDistance_m,cameraElevation_m:i.cameraElevation_m,clarity_pct:i.clarity_pct,quality:i.quality,perfOverlay:i.perfOverlay,reduceFlashes:i.reduceFlashes,audioEnabled:i.audioEnabled,masterVolume:i.masterVolume},t={v:Ed,data:e};try{window.localStorage.setItem(fc,JSON.stringify(t))}catch{}}function Gx(){if(!(typeof window>"u"))try{window.localStorage.removeItem(fc)}catch{}}function Wx(i,e){const t=new dc({title:"Ocean (Otter) Simulator"});t.domElement.style.userSelect="none";const n={startGame:()=>{i.gameStarted||(i.gameStarted=!0,e.onStartGame(),e.onAnyChange())},newGame:()=>{i.gameStarted=!1,e.onNewGame(),e.onAnyChange()},resetSettings:()=>{var z;(z=e.onResetSettings)==null||z.call(e)}},s=t.addFolder("Game");s.add(n,"startGame").name("Start / Resume"),s.add(n,"newGame").name("Reset"),s.open();const r=t.addFolder("Location"),o={Custom:{latitude_deg:i.latitude_deg,longitude_deg:i.longitude_deg,coastProximity:i.coastProximity,depth_m:i.depth_m},"Equator (superstorm demo)":{latitude_deg:1.2,longitude_deg:-28,coastProximity:0,depth_m:4800},"Monterey Bay, CA (kelp forest)":{latitude_deg:36.62,longitude_deg:-121.9,coastProximity:.9,depth_m:120},"Maldives Atoll (tropical clear)":{latitude_deg:3.2,longitude_deg:73.22,coastProximity:.7,depth_m:55},"Drake Passage (Southern Ocean)":{latitude_deg:-56.3,longitude_deg:-67.7,coastProximity:.05,depth_m:4200},"Prince William Sound, Alaska (cold fjords)":{latitude_deg:60.75,longitude_deg:-147.6,coastProximity:.95,depth_m:240}},a=r.add(i,"locationPreset",Td).name("preset"),l=r.add(i,"latitude_deg",-80,80,.1).name("latitude (°)"),c=r.add(i,"longitude_deg",-180,180,.1).name("longitude (°)"),h=r.add(i,"coastProximity",0,1,.01).name("coast proximity (0–1)"),u=r.add(i,"depth_m",5,6e3,1).name("depth (m)");function d(z){if(z==="Custom")return;const O=o[z];O&&(i.latitude_deg=O.latitude_deg,i.longitude_deg=O.longitude_deg,i.coastProximity=O.coastProximity,i.depth_m=O.depth_m,l.updateDisplay(),c.updateDisplay(),h.updateDisplay(),u.updateDisplay())}a.onChange(()=>{d(i.locationPreset),e.onAnyChange()});const f=()=>{i.locationPreset!=="Custom"&&(i.locationPreset="Custom",a.updateDisplay()),e.onAnyChange()};l.onChange(f),c.onChange(f),h.onChange(f),u.onChange(f);const g=t.addFolder("Time"),_=g.add(i,"timeOfDay_h",0,24,.01).name("time (h)"),m=g.add(i,"dayOfYear",1,365,1).name("day of year (1–365)");_.onChange(e.onAnyChange),m.onChange(e.onAnyChange);const p=t.addFolder("Moon");p.add(i,"moonPhaseName",Ad).name("phase").onChange(e.onAnyChange),p.add(i,"moonDistanceMultiplier",.85,1.15,5e-4).name("distance").onChange(e.onAnyChange);const v=t.addFolder("Weather");v.add(i,"precipChance_pct",0,100,1).name("precip chance (%)").onChange(e.onAnyChange),v.add(i,"stormsIn2to4hChance_pct",0,100,1).name("chance of storms in 2–4hrs (%)").onChange(e.onAnyChange),v.add(i,"verticalWindShear_mps",0,30,.1).name("vertical wind shear (m/s)").onChange(e.onAnyChange),v.add(i,"hurricaneChanceAdjust_pct",-20,20,1).name("hurricane chance adjust (±%)").onChange(e.onAnyChange);const x=t.addFolder("Sea Otter");x.add(i,"otterosity_pct",0,100,1).name("Otterosity").onChange(e.onAnyChange),x.add(i,"exoticEncounters_pct",0,100,1).name("exotic encounters (%)").onChange(e.onAnyChange),x.add(i,"otterFurSilhouette").name("fur silhouette (Hi/Max)").onChange(e.onAnyChange);const w=t.addFolder("Camera");w.add(i,"cameraDistance_m",9,18,.01).name("distance (m)").onChange(()=>{var z;(z=e.onCameraChange)==null||z.call(e)}),w.add(i,"cameraElevation_m",.35,3,.01).name("elevation (m)").onChange(()=>{var z;(z=e.onCameraChange)==null||z.call(e)}),t.addFolder("Water").add(i,"clarity_pct",0,100,1).name("clarity (%)").onChange(e.onAnyChange);const E=t.addFolder("Performance Mode"),C=E.add(i,"quality",["Low","Medium","High","Max"]).name("mode");C.listen(),C.onChange(()=>{i.qualityInfo=Mr(i.quality),e.onAnyChange()}),E.add(i,"qualityInfo").name("what this does").listen(),E.add(i,"perfOverlay").name("perf overlay").onChange(e.onAnyChange),t.addFolder("Accessibility").add(i,"reduceFlashes").name("reduce flashes/grain").onChange(e.onAnyChange);const b=t.addFolder("Audio");b.add(i,"audioEnabled").name("enabled").onChange(e.onAnyChange),b.add(i,"masterVolume",0,1,.01).name("volume").onChange(e.onAnyChange);const y=t.addFolder("Readouts");return y.add(i,"derived_state").name("state").listen(),y.add(i,"derived_clock").name("clock").listen(),y.add(i,"derived_airTemp_C").name("air °C").listen(),y.add(i,"derived_waterTemp_C").name("water °C").listen(),y.add(i,"derived_cloudCover").name("cloud").listen(),y.add(i,"derived_visibility_km").name("vis km").listen(),y.add(i,"derived_windSpeed_mps").name("wind m/s").listen(),y.add(i,"derived_windDirFrom_deg").name("wind from°").listen(),y.add(i,"derived_precip").name("precip").listen(),y.add(i,"derived_stormETA").name("storm ETA").listen(),y.add(i,"derived_stormChanceEff_pct").name("storm % (eff)").listen(),y.add(i,"derived_hurricaneChanceEff_pct").name("hurricane % (eff)").listen(),y.add(i,"derived_Hs_m").name("Hs (m)").listen(),y.add(i,"derived_Tp_s").name("Tp (s)").listen(),y.add(i,"derived_tideScale").name("tide scale").listen(),r.open(),g.open(),v.open(),y.open(),t.addFolder("Settings").add(n,"resetSettings").name("reset saved settings"),t}function ds(i){let e=i%360;return e<0&&(e+=360),e}function ou(i,e,t){const n=(e-i+540)%360-180;return ds(i+n*t)}function pc(i,e){const t=I(i,1,365),n=2*Math.PI*(t-172)/365,s=e>=0?1:-1;return Math.sin(n)*s}function Xx(i,e){const t=I(i,-80,80),n=Math.abs(t),s=B(28,-1,Ct(0,80,n)),r=B(1.5,7,Ct(15,60,n)),o=pc(e,t);return I(s+r*o,-1.8,30)}function qx(i,e,t,n,s){const r=I(e,-80,80),o=Math.abs(r),a=B(2,14,Ct(10,65,o)),l=pc(t,r),c=(n%24+24)%24,h=Math.sin((c-14)/24*2*Math.PI),u=B(.5,3.5,Ct(0,1,1-s));return i+a*l+u*h}function Da(i){const e=I(i,-80,80),t=Math.abs(e);return t<30?e>=0?45:135:t<60?270:90}function Yx(i,e){const t=Ct(16,27,i),n=I(e,0,1);return I(.12+.88*t*n,0,1)}function $x(i,e,t,n,s){const r=Ct(25.5,29,i),o=Ct(35,10,Math.abs(e)),a=I(t,0,1),c=1-I(n/20,0,1),h=I(.55+(s-.5)*.8,0,1),u=I(r*o*a*Math.pow(c,1.2)*h,0,1),d=I(u*100,0,95),f=I(.18+.82*r*Math.pow(c,1.35),0,1);return{chanceBase_pct:d,severity01:f}}class jx{constructor(){R(this,"time_s",0);R(this,"rng",Dn(99122));R(this,"cloudCover",.25);R(this,"precip",0);R(this,"storm",0);R(this,"hurricane",0);R(this,"windSpeed",6);R(this,"windDirFrom",250);R(this,"gustiness",.25);R(this,"steadyAge_s",0);R(this,"scheduledStormEta_s",-1);R(this,"stormActive_s",0);R(this,"stormDuration_s",0);R(this,"stormStrength",0);R(this,"stormDirFrom",250)}reset(e){if(this.time_s=0,this.cloudCover=.25,this.precip=0,this.storm=0,this.hurricane=0,this.windSpeed=6,this.gustiness=.25,this.steadyAge_s=0,this.scheduledStormEta_s=-1,this.stormActive_s=0,this.stormDuration_s=0,this.stormStrength=0,e){const n=Math.floor((e.latitude_deg*1e3+e.longitude_deg*1e3+e.dayOfYear*17+e.timeOfDay_h*13)%2147483647);this.rng=Dn(n),this.windDirFrom=Da(e.latitude_deg),this.stormDirFrom=this.windDirFrom}const t=8+this.rng()*14;if(this.steadyAge_s=t*3600,e!=null&&e.force){const n=e.force;n.cloudCover01!==void 0&&(this.cloudCover=I(n.cloudCover01,0,1)),n.precip01!==void 0&&(this.precip=I(n.precip01,0,1)),n.storm01!==void 0&&(this.storm=I(n.storm01,0,1)),n.hurricane01!==void 0&&(this.hurricane=I(n.hurricane01,0,1)),n.windSpeed_mps!==void 0&&(this.windSpeed=I(n.windSpeed_mps,0,75)),n.windDirFrom_deg!==void 0&&(this.windDirFrom=ds(n.windDirFrom_deg)),n.gustiness01!==void 0&&(this.gustiness=I(n.gustiness01,0,1)),n.steadyAge_h!==void 0&&(this.steadyAge_s=I(n.steadyAge_h,0,96)*3600),(n.stormActiveElapsed_s??0)>0&&(this.scheduledStormEta_s=-1,this.stormStrength=I(n.stormStrength01??Math.max(0,this.storm),0,1),this.stormDirFrom=ds(n.stormDirFrom_deg??this.windDirFrom),this.stormDuration_s=Math.max(1,n.stormDuration_s??2*3600),this.stormActive_s=Math.max(.001,n.stormActiveElapsed_s??.001))}}update(e,t){this.time_s+=e;const n=I(t.latitude_deg,-80,80),s=I(t.longitude_deg,-180,180),r=I(t.coastProximity,0,1),o=Xx(n,t.dayOfYear),a=Math.abs(n),l=Ct(12,55,a)*(1-Ct(62,80,a)*.55),c=pc(t.dayOfYear,n),h=I(.2+.55*l+.2*Math.abs(c)+.1*r,.12,.95),u=this.time_s/3600,d=n*.73+s*.19+t.dayOfYear*.013,f=Ia(u*.2+d*.1,d,4),g=Ia(u*.06+d*.2,d+11.7,4),_=Ia(u*.015+d*.7,d+33.1,5),m=I(t.precipChance_pct/100,0,1),p=I(t.stormsIn2to4hChance_pct/100,0,1),v=Ct(8,26,o),x=I(.28+.5*v+.28*m+.12*r+(g-.5)*.18,0,1),w=.22+.65*x+.22*l+(g-.5)*(.75*h),N=I(Ct(.35,1.05,w),0,1),E=N+(m-.5)*.85+(f-.5)*.3+x*.25,C=I(Ct(.92,1.18,E),0,1),P=Yx(o,x),b=I(p*P*B(.65,1,h),0,.999);if(this.scheduledStormEta_s<0&&this.stormActive_s<=0){const re=b<=0?0:-Math.log(1-b)/10800;if(this.rng()<re*e){this.scheduledStormEta_s=B(2*3600,4*3600,this.rng()),this.stormStrength=I(.25+.75*P+(this.rng()-.5)*.2,.15,1),this.stormDuration_s=B(45*60,3*3600,.35+.65*this.stormStrength);const K=Da(n);this.stormDirFrom=ds(K+(this.rng()*2-1)*B(25,85,this.stormStrength))}}let y=0;this.scheduledStormEta_s>=0&&(this.scheduledStormEta_s-=e,y=I(Ct(2*3600,0,this.scheduledStormEta_s),0,1),this.scheduledStormEta_s<=0&&(this.stormActive_s=.001,this.scheduledStormEta_s=-1));let A=0;if(this.stormActive_s>0){this.stormActive_s+=e;const F=this.stormActive_s,re=Math.max(.001,this.stormDuration_s),K=Ct(0,10*60,F),J=1-Ct(re*.55,re,F);A=I(K*J,0,1),F>=re&&(this.stormActive_s=0,this.stormDuration_s=0,this.stormStrength=0)}const z=I(Math.max(y*this.stormStrength*.85,A*this.stormStrength),0,1),O=I(t.verticalWindShear_mps,0,30),{chanceBase_pct:q,severity01:$}=$x(o,n,x,O,_),W=I(q+I(t.hurricaneChanceAdjust_pct,-20,20),0,100),Y=W/100*I(.55+(_-.5)*.9,0,1),le=I(Ct(.35,.75,Y),0,1),_e=B(30,10,h),de=B(38,12,h),Ce=B(55,16,h),Me=B(120,30,h),X=1-Math.exp(-e/Math.max(.001,_e)),Q=1-Math.exp(-e/Math.max(.001,de)),he=1-Math.exp(-e/Math.max(.001,Ce)),fe=1-Math.exp(-e/Math.max(.001,Me)),Oe=z*.55+le*.65;this.cloudCover=B(this.cloudCover,I(N+Oe,0,1),X);const be=z*.65+le*.75;this.precip=B(this.precip,I(C+be,0,1),Q),this.storm=B(this.storm,z,he),this.hurricane=B(this.hurricane,le,fe);const Ne=Da(n),tt=(g-.5)*40*(.2+.8*h),D=this.storm*35,ft=this.hurricane*55,Xe=ds(Ne+tt+(D+ft)*(n>=0?1:-1)),qe=I(y*.75+A*1,0,1),Se=ou(Xe,this.stormDirFrom,qe),Ue=3+Ct(0,1,Math.sin(Li(Math.min(90,a))))*3.5+r*.7,ze=7*this.cloudCover+10*this.precip+14*this.storm,L=this.hurricane>.01?B(18,70,Math.pow($*this.hurricane,.7)):0,S=I(Ue+ze+L,0,75),G=I(.15+.25*this.precip+.35*this.storm+.55*this.hurricane,0,1),ne=B(20,7,h),ie=1-Math.exp(-e/Math.max(.001,ne));this.windSpeed=B(this.windSpeed,S,ie),this.windDirFrom=ou(this.windDirFrom,Se,ie),this.gustiness=B(this.gustiness,G,ie);const ee=Math.abs((Se-this.windDirFrom+540)%360-180);this.windSpeed>1.5&&ee<25?this.steadyAge_s=Math.min(this.steadyAge_s+e,48*3600):this.steadyAge_s=Math.max(0,this.steadyAge_s-e*2.5);const Te=qx(o,n,t.dayOfYear,t.timeOfDay_h,this.cloudCover),ce=this.precip<.08?"None":Te<=0?"Snow":"Rain",ve=I(B(65,10,this.cloudCover*.7)*B(1,.25,this.precip)*B(1,.55,this.storm),1,80),ke=this.storm>.55?.03*Math.pow(this.storm,2.2):0,se=I(Math.max(this.storm,this.hurricane),0,1),me=B(180,1200,Ct(0,1,se)),Ge=I(B(1,.35,r)*B(.65,1,1-se*.25),.1,1),Re=this.steadyAge_s/3600,xe=B(.35,1.75,1-se);let Ae=0;if(this.hurricane>.25){const F=this.windSpeed;F>=70?Ae=5:F>=58?Ae=4:F>=50?Ae=3:F>=43?Ae=2:F>=33?Ae=1:Ae=0}let Pe="Clear";Ae>0?Pe=`Hurricane (Cat ${Ae})`:this.storm>.55?Pe="Thunderstorm":this.precip>.15?Pe=ce==="Snow"?"Snow":"Rain":this.cloudCover>.55&&(Pe="Cloudy");const ct=this.scheduledStormEta_s>=0?this.scheduledStormEta_s/3600:-1;return{airTemp_C:Te,waterTemp_C:o,cloudCover:I(this.cloudCover,0,1),visibility_km:ve,precipType:ce,precipIntensity:I(this.precip,0,1),storminess:I(this.storm,0,1),hurricaneIntensity:I(this.hurricane,0,1),windSpeed_mps:this.windSpeed,windDirFrom_deg:ds(this.windDirFrom),gustiness:this.gustiness,stormRadius_km:me,fetchUtilization:Ge,stormAge_h:Re,windRamp_h:xe,lightningRate_hz:ke,hurricaneCategory:Ae,stateName:Pe,stormEta_h:ct,stormChanceEffective_pct:Math.round(b*100),hurricaneChanceEffective_pct:Math.round(W)}}}function au(i,e){if(e===Uf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===ml||e===qu){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===ml)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Kx extends Us{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ty(t)}),this.register(function(t){return new ny(t)}),this.register(function(t){return new uy(t)}),this.register(function(t){return new dy(t)}),this.register(function(t){return new fy(t)}),this.register(function(t){return new sy(t)}),this.register(function(t){return new ry(t)}),this.register(function(t){return new oy(t)}),this.register(function(t){return new ay(t)}),this.register(function(t){return new ey(t)}),this.register(function(t){return new ly(t)}),this.register(function(t){return new iy(t)}),this.register(function(t){return new hy(t)}),this.register(function(t){return new cy(t)}),this.register(function(t){return new Jx(t)}),this.register(function(t){return new py(t)}),this.register(function(t){return new my(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ar.extractUrlBase(e);o=ar.resolveURL(c,this.path)}else o=ar.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Sd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Rd){try{o[We.KHR_BINARY_GLTF]=new gy(e)}catch(u){s&&s(u);return}r=JSON.parse(o[We.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Ry(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case We.KHR_MATERIALS_UNLIT:o[u]=new Qx;break;case We.KHR_DRACO_MESH_COMPRESSION:o[u]=new _y(r,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:o[u]=new vy;break;case We.KHR_MESH_QUANTIZATION:o[u]=new xy;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Zx(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Jx{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new te(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],wt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new yr(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new wd(h),c.distance=u;break;case"spot":c=new Qv(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Wn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Qx{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return ln}extendParams(e,t,n){const s=[];e.color=new te(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],wt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,zt))}return Promise.all(s)}}class ey{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class ty{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Z(a,a)}return Promise.all(r)}}class ny{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class iy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class sy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new te(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],wt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,zt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class ry{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class oy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new te().setRGB(a[0],a[1],a[2],wt),Promise.all(r)}}class ay{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class ly{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new te().setRGB(a[0],a[1],a[2],wt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,zt)),Promise.all(r)}}class cy{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class hy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Qt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class uy{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class dy{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class fy{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class py{constructor(e){this.name=We.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class my{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==sn.TRIANGLES&&c.mode!==sn.TRIANGLE_STRIP&&c.mode!==sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Ie,m=new T,p=new at,v=new T(1,1,1),x=new pd(g.geometry,g.material,d);for(let w=0;w<d;w++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,w),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,w),l.SCALE&&v.fromBufferAttribute(l.SCALE,w),x.setMatrixAt(w,_.compose(m,p,v));for(const w in l)if(w==="_COLOR_0"){const N=l[w];x.instanceColor=new xl(N.array,N.itemSize,N.normalized)}else w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"&&g.geometry.setAttribute(w,l[w]);ut.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Rd="glTF",Ks=12,lu={JSON:1313821514,BIN:5130562};class gy{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ks),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Rd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Ks,r=new DataView(e,Ks);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===lu.JSON){const c=new Uint8Array(e,Ks+o,a);this.content=n.decode(c)}else if(l===lu.BIN){const c=Ks+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class _y{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Sl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Sl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=vs[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},a,c,wt,d)})})}}class vy{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class xy{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class Pd extends xr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,v=1-m,x=p-d+u;for(let w=0;w!==a;w++){const N=o[_+w+a],E=o[_+w+l]*h,C=o[g+w+a],P=o[g+w]*h;r[w]=v*N+x*E+m*C+p*P}return r}}const yy=new at;class My extends Pd{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return yy.fromArray(r).normalize().toArray(r),r}}const sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},vs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},cu={9728:Je,9729:et,9984:Fu,9985:lo,9986:Qs,9987:an},hu={33071:on,33648:yo,10497:un},Na={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Sl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Sy={CUBICSPLINE:void 0,LINEAR:ur,STEP:hr},Ua={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function wy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Pn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Qn})),i.DefaultMaterial}function bi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Wn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function by(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Ay(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ty(i){let e;const t=i.extensions&&i.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Fa(t.attributes):e=i.indices+":"+Fa(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Fa(i.targets[n]);return e}function Fa(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function wl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ey(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Cy=new Ie;class Ry{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Zx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Kv(this.options.manager):this.textureLoader=new nx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Sd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return bi(r,a,s),Wn(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(ar.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=Na[s.type],a=vs[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Mt(c,o,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Na[s.type],c=vs[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let x=t.cache.get(v);x||(_=new c(a,p*f,s.count*f/h),x=new hd(_,f/h),t.cache.add(v,x)),m=new mr(x,l,d%f/h,g)}else a===null?_=new c(s.count*l):_=new c(a,d,s.count*l),m=new Mt(_,l,g);if(s.sparse!==void 0){const p=Na.SCALAR,v=vs[s.sparse.indices.componentType],x=s.sparse.indices.byteOffset||0,w=s.sparse.values.byteOffset||0,N=new v(o[1],x,s.sparse.count*p),E=new c(o[2],w,s.sparse.count*l);a!==null&&(m=new Mt(m.array.slice(),m.itemSize,m.normalized));for(let C=0,P=N.length;C<P;C++){const b=N[C];if(m.setX(b,E[C*l]),l>=2&&m.setY(b,E[C*l+1]),l>=3&&m.setZ(b,E[C*l+2]),l>=4&&m.setW(b,E[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=cu[d.magFilter]||et,h.minFilter=cu[d.minFilter]||an,h.wrapS=hu[d.wrapS]||un,h.wrapT=hu[d.wrapT]||un,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=s.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Pt(_);m.needsUpdate=!0,d(m)}),t.load(ar.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Wn(u,o),u.userData.mimeType=o.mimeType||Ey(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[We.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new zi,hn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Ql,hn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Pn}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[We.KHR_MATERIALS_UNLIT]){const u=s[We.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new te(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],wt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,zt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=rn);const h=r.alphaMode||Ua.OPAQUE;if(h===Ua.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Ua.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==ln&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Z(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==ln&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==ln){const u=r.emissiveFactor;a.emissive=new te().setRGB(u[0],u[1],u[2],wt)}return r.emissiveTexture!==void 0&&o!==ln&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,zt)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),Wn(u,r),t.associations.set(u,{materials:e}),r.extensions&&bi(s,u,r),u})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return uu(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Ty(c),u=s[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[We.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=uu(new gt,c,t),s[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?wy(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=o[f];let p;const v=c[f];if(m.mode===sn.TRIANGLES||m.mode===sn.TRIANGLE_STRIP||m.mode===sn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new xv(_,v):new ht(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===sn.TRIANGLE_STRIP?p.geometry=au(p.geometry,qu):m.mode===sn.TRIANGLE_FAN&&(p.geometry=au(p.geometry,ml));else if(m.mode===sn.LINES)p=new Sv(_,v);else if(m.mode===sn.LINE_STRIP)p=new Uo(_,v);else if(m.mode===sn.LINE_LOOP)p=new wv(_,v);else if(m.mode===sn.POINTS)p=new Is(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Ay(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Wn(p,r),m.extensions&&bi(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&bi(s,u[0],r),u[0];const d=new cn;r.extensions&&bi(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new kt(lp.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new vr(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Wn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Ie;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Jl(a,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,v=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let v=0,x=d.length;v<x;v++){const w=d[v],N=f[v],E=g[v],C=_[v],P=m[v];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const b=n._createAnimationTracks(w,N,E,C,P);if(b)for(let y=0;y<b.length;y++)p.push(b[y])}return new Xn(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Cy)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new fd:c.length>1?h=new cn:c.length===1?h=c[0]:h=new ut,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Wn(h,r),r.extensions&&bi(n,h,r),r.matrix!==void 0){const u=new Ie;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new cn;n.name&&(r.name=s.createUniqueName(n.name)),Wn(r,n),n.extensions&&bi(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof hn||d instanceof Pt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,l=[];hi[r.path]===hi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(hi[r.path]){case hi.weights:c=Ts;break;case hi.rotation:c=Jt;break;case hi.position:case hi.scale:c=Zn;break;default:switch(n.itemSize){case 1:c=Ts;break;case 2:case 3:default:c=Zn;break}break}const h=s.interpolation!==void 0?Sy[s.interpolation]:ur,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+hi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=wl(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Jt?My:Pd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Py(i,e,t){const n=e.attributes,s=new ei;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new T(l[0],l[1],l[2]),new T(c[0],c[1],c[2])),a.normalized){const h=wl(vs[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new T,l=new T;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=wl(vs[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new Nn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function uu(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(const o in n){const a=Sl[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Qe.workingColorSpace!==wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Qe.workingColorSpace}" not supported.`),Wn(i,e),Py(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?by(i,e.targets,t):i})}function fs(i,e,t,n,s,r={height_m:0,normal:new T,disp:new T,slope:0},o=new T,a=new T){const l=r.disp;l.set(0,0,0);let c=0,h=0,u=0,d=0,f=0,g=0;for(let m=0;m<i.length;m++){const p=i[m],v=p.dirX,x=p.dirZ,w=p.A,N=p.k,E=p.omega,C=p.phase,P=p.Q,b=v*n.x+x*n.y,y=E+N*b,A=N*(v*e.x+x*e.y)-y*t+C,z=Math.sin(A),O=Math.cos(A);l.y+=w*z,l.x+=v*(P*w*O),l.z+=x*(P*w*O);const q=P*w*N;c+=-v*v*q*z,h+=-v*x*q*z,u+=-x*v*q*z,d+=-x*x*q*z,f+=w*N*v*O,g+=w*N*x*O}const _=l.y+s;return o.set(1+c,f,u),a.set(h,g,1+d),r.normal.crossVectors(a,o).normalize(),r.slope=1-r.normal.y,r.height_m=_,r}jn.enabled=!0;const Oa=new Map;function du(i,e){const t=Oa.get(e);if(t)return t;const n=new Promise((s,r)=>{i.load(e,s,void 0,r)});return n.catch(()=>{Oa.delete(e)}),Oa.set(e,n),n}class Iy{constructor(){R(this,"group");R(this,"position",new T(0,0,0));R(this,"gazeDir",new T(0,.08,-1).normalize());R(this,"bodyForward",new T(1,0,0));R(this,"paddleImpulse01",0);R(this,"wetness01",0);R(this,"lookMode","Horizon");R(this,"rng",Dn(133742));R(this,"stormPhase",this.rng()*Math.PI*2);R(this,"stormPhase2",this.rng()*Math.PI*2);R(this,"lookTimer_s",0);R(this,"blinkTimer_s",2.8);R(this,"yaw",0);R(this,"gazeYawOffset",0);R(this,"gazeYawOffsetTarget",0);R(this,"submerge_m",0);R(this,"splashCooldown_s",0);R(this,"wetness",0);R(this,"appearanceMode","High");R(this,"furSilhouette",!0);R(this,"loader",new Kx);R(this,"loadTicket",0);R(this,"preloadStarted",!1);R(this,"model",null);R(this,"furObj",null);R(this,"nodes",{});R(this,"mixer",null);R(this,"mixerRoot",null);R(this,"idleAction",null);R(this,"paddleAction",null);R(this,"diveAction",null);R(this,"resurfaceAction",null);R(this,"blinkAction",null);R(this,"whiskerTwitchAction",null);R(this,"wasUnderwater",!1);R(this,"paddlePeriod_s",1.6);R(this,"wetMats",[]);R(this,"buoySampleFwd_m",.42);R(this,"buoySampleSide_m",.28);R(this,"floatOffset_m",.05);R(this,"prevXZ",new Z(0,0));R(this,"prevWaveDispXZ",new Z(0,0));R(this,"waveDispInit",!1);R(this,"speed_mps",0);R(this,"tmpWaveSample",{height_m:0,normal:new T,disp:new T,slope:0});R(this,"tmpWaveT",new T);R(this,"tmpWaveB",new T);R(this,"tmpV2a",new Z);R(this,"tmpV2b",new Z);R(this,"tmpV2c",new Z);R(this,"tmpV2d",new Z);R(this,"tmpV3a",new T);R(this,"tmpV3b",new T);R(this,"tmpV3c",new T);R(this,"tmpQuatA",new at);R(this,"tmpQuatB",new at);R(this,"tmpQuatC",new at);R(this,"up",new T(0,1,0));R(this,"tmpWetCol",new te);R(this,"tmpDryCol",new te);R(this,"fallbackEyeOffset",new T(0,.86,.1));R(this,"fallbackHeadOffset",new T(0,.95,.05));this.group=new cn,this.group.name="SeaOtter";const e=new Pn({color:new te("#4e3924"),roughness:.98,metalness:0,flatShading:!0}),t=new Ls(.34,8,8),n=new ht(t,e);n.name="__placeholder",n.position.set(0,.48,0),this.group.add(n),this.group.position.copy(this.position),this.prevXZ.set(0,0),this.loadModel(this.appearanceMode,this.furSilhouette),this.preloadAllModels()}setAppearance(e,t){const n=e==="High"&&t;if(e===this.appearanceMode){this.furSilhouette=n,this.furObj&&(this.furObj.visible=n);return}this.loadModel(e,n)}reset(){this.position.set(0,0,0),this.gazeDir.set(0,.08,-1).normalize(),this.bodyForward.set(1,0,0),this.lookMode="Horizon",this.lookTimer_s=0,this.blinkTimer_s=2.8+this.rng()*3.2,this.yaw=0,this.gazeYawOffset=0,this.gazeYawOffsetTarget=0,this.submerge_m=0,this.splashCooldown_s=0,this.wetness=0,this.wetness01=0,this.paddleImpulse01=0,this.prevXZ.set(0,0),this.prevWaveDispXZ.set(0,0),this.waveDispInit=!1,this.speed_mps=0,this.group.position.copy(this.position),this.group.quaternion.identity(),this.idleAction&&this.idleAction.reset().play(),this.paddleAction&&this.paddleAction.reset().play()}getEyeWorldPosition(e=new T){return this.nodes.eyeL?this.nodes.eyeL.getWorldPosition(e):e.copy(this.fallbackEyeOffset).applyMatrix4(this.group.matrixWorld)}getHeadWorldPosition(e=new T){return this.nodes.head?this.nodes.head.getWorldPosition(e):e.copy(this.fallbackHeadOffset).applyMatrix4(this.group.matrixWorld)}isUnderwaterView(){return this.submerge_m>.28}update(e,t){const n=t.dt_s,s=I(e.storminess,0,1),r=I(e.waveChaos,0,1),o=I(e.otterosity,0,1),a=I((s-.35)/.45,0,1);this.lookTimer_s-=n,this.blinkTimer_s-=n,this.splashCooldown_s=Math.max(0,this.splashCooldown_s-n);const l=this.tmpV2a.set(t.currentXZ.x,t.currentXZ.y),c=(this.rng()*2-1)*.014*(.25+.75*r);this.yaw+=c*n*60;const h=this.tmpV2b.set(Math.cos(this.yaw),Math.sin(this.yaw)).multiplyScalar(.028);l.add(h),this.position.x+=l.x*n,this.position.z+=l.y*n;const u=I(.28+1.55*s+1.25*r,.22,3.1),d=this.tmpV2c.set(this.position.x,this.position.z);fs(t.waves,d,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB);const f=this.tmpWaveSample.disp.x-this.prevWaveDispXZ.x,g=this.tmpWaveSample.disp.z-this.prevWaveDispXZ.y;if(this.waveDispInit?(this.position.x+=I(f,-1.8,1.8)*u,this.position.z+=I(g,-1.8,1.8)*u):this.waveDispInit=!0,this.prevWaveDispXZ.set(this.tmpWaveSample.disp.x,this.tmpWaveSample.disp.z),this.bodyForward.set(Math.cos(this.yaw),0,Math.sin(this.yaw)).normalize(),n>1e-6){const be=this.position.x-this.prevXZ.x,Ne=this.position.z-this.prevXZ.y;this.speed_mps=Math.sqrt(be*be+Ne*Ne)/n}else this.speed_mps=0;this.prevXZ.set(this.position.x,this.position.z);const _=this.bodyForward,m=this.tmpV3a.set(-_.z,0,_.x).normalize(),p=this.tmpV2a.set(this.position.x+_.x*this.buoySampleFwd_m,this.position.z+_.z*this.buoySampleFwd_m),v=this.tmpV2b.set(this.position.x-_.x*this.buoySampleFwd_m,this.position.z-_.z*this.buoySampleFwd_m),x=fs(t.waves,p,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB).height_m,w=fs(t.waves,v,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB).height_m,N=this.tmpV2c.set(this.position.x-m.x*this.buoySampleSide_m,this.position.z-m.z*this.buoySampleSide_m),E=this.tmpV2d.set(this.position.x+m.x*this.buoySampleSide_m,this.position.z+m.z*this.buoySampleSide_m),C=fs(t.waves,N,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB).height_m,P=fs(t.waves,E,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB).height_m,b=(x+w+C+P)*.25,y=(x-w)/Math.max(1e-4,2*this.buoySampleFwd_m),A=(P-C)/Math.max(1e-4,2*this.buoySampleSide_m),z=this.tmpV3b.copy(this.up).addScaledVector(_,-y).addScaledVector(m,-A).normalize(),O=Math.min(1.2,Math.sqrt(y*y+A*A)),q=I((O-.16)/.35,0,1)*(.15+.85*s);this.splashCooldown_s<=0&&this.rng()<q*n&&(this.submerge_m=Math.max(this.submerge_m,B(.18,1.05,s)),this.splashCooldown_s=B(4.5,.9,s)),this.submerge_m=B(this.submerge_m,0,I(n*B(.45,1.6,1-s),0,1));const $=B(this.floatOffset_m,-.14,s),W=b+$-this.submerge_m,j=B(6,15,s)*B(1,1.3,r);this.position.y=B(this.position.y,W,I(n*j,0,1));const Y=s*(.1+.12*r);if(Y>.001){const be=Math.sin(t.time_s*(1.6+1.1*r)+this.stormPhase)*Y,Ne=Math.cos(t.time_s*(2.1+1.4*r)+this.stormPhase2)*Y*.8;z.addScaledVector(_,be).addScaledVector(m,Ne).normalize()}const le=this.tmpQuatA.setFromUnitVectors(this.up,z),_e=this.tmpQuatB.setFromAxisAngle(this.up,this.yaw),de=this.tmpQuatC.copy(_e).multiply(le),Ce=B(3,10,s)*B(1,1.2,r);if(this.group.quaternion.slerp(de,I(n*Ce,0,1)),this.group.position.copy(this.position),this.lookTimer_s<=0){const be=o,Ne=I(.08+.85*Math.pow(be,1.18),0,1),tt=1-s,D=Ne*B(.02,.1,tt)*(1-s*.6),Xe=B(.1,.26,be)*B(.55,.25,s)*(1-a),qe=this.rng();qe<D?this.lookMode="Underwater":qe<D+Xe?this.lookMode="Sky":this.lookMode="Horizon";const Se=B(2.4,6.5,1-s),lt=B(0,5,be)*(this.rng()*.6+.4);this.lookTimer_s=Se+lt;const Ue=B(.04,.42,be)*B(1,.45,a);this.gazeYawOffsetTarget=(this.rng()*2-1)*Ue}this.gazeYawOffset=B(this.gazeYawOffset,this.gazeYawOffsetTarget,I(n*1.2,0,1));const Me=this.yaw+this.gazeYawOffset,X=Math.cos(Me),Q=Math.sin(Me),he=this.tmpV3c.set(0,0,0);if(this.lookMode==="Horizon")if(a>.001&&typeof e.windDirTo_rad=="number"){const be=e.windDirTo_rad+Math.PI,Ne=Math.cos(be),tt=Math.sin(be),D=B(0,.85,a);he.set(B(X,Ne,D),B(.1,.03,D),B(Q,tt,D)).normalize()}else he.set(X,.1,Q).normalize();else if(this.lookMode==="Sky"){const be=e.interestDir;be&&be.y>.08&&a<.15?he.copy(be).normalize():he.set(X*.2,.98,Q*.2).normalize()}else he.set(X*.45,-.62,Q*.45).normalize();this.gazeDir.lerp(he,I(n*2,0,1)).normalize(),this.updateAnimations(n,s,r),this.applyStormPose(t.time_s,s,r);const fe=I(this.submerge_m*1.25+this.paddleImpulse01*.28+s*.25,0,1),Oe=fe>this.wetness?2.5:.25;this.wetness=B(this.wetness,fe,I(n*Oe,0,1)),this.wetness01=this.wetness,this.applyWetnessToMaterials(this.wetness)}updateAnimations(e,t,n){var c,h,u;if(!this.mixer)return;const s=I(this.speed_mps/.18,0,1),r=I(.18+.95*(t*.65+n*.6),0,1),o=I(r*(.25+.75*s),0,1);this.paddleAction&&(this.paddleAction.setEffectiveWeight(o),this.paddleAction.setEffectiveTimeScale(B(.7,1.6,o)));const a=this.isUnderwaterView();a&&!this.wasUnderwater?(c=this.diveAction)==null||c.reset().play():!a&&this.wasUnderwater&&((h=this.resurfaceAction)==null||h.reset().play()),this.wasUnderwater=a,this.blinkTimer_s<=0&&((u=this.blinkAction)==null||u.reset().play(),this.whiskerTwitchAction&&this.rng()<.7&&this.whiskerTwitchAction.reset().play(),this.blinkTimer_s=2.8+this.rng()*4.5),this.mixer.update(e);let l=0;if(this.paddleAction){const d=this.paddleAction.time%this.paddlePeriod_s/this.paddlePeriod_s,f=Math.exp(-Math.pow((d-.18)/.07,2)),g=Math.exp(-Math.pow((d-.68)/.07,2));l=I((f+g)*.85*o,0,1)}this.paddleImpulse01=l}applyStormPose(e,t,n){const s=this.nodes.head,r=this.nodes.tail,o=this.nodes.flipperL,a=this.nodes.flipperR;if(!s&&!r&&!o&&!a)return;const l=I(t*(.35+.65*n),0,1);if(l<=.001)return;const c=Math.sin(e*(2.2+1.3*n)+this.stormPhase)*.12*l,h=Math.sin(e*(1.7+1.1*n)+this.stormPhase2)*.1*l,u=Math.sin(e*(3.1+1.6*n)+this.stormPhase2)*.18*l;s&&(s.rotation.x+=c,s.rotation.y+=h),r&&(r.rotation.y+=u*.6,r.rotation.z+=u*.45),o&&(o.rotation.z+=u*.8),a&&(a.rotation.z-=u*.8)}applyWetnessToMaterials(e){if(!this.wetMats.length)return;const t=I(Math.pow(e,1.18),0,1);for(const n of this.wetMats)this.tmpWetCol.copy(n.dryColor).multiplyScalar(.72),n.mat.color.copy(n.dryColor).lerp(this.tmpWetCol,t),n.mat.roughness=B(n.dryRoughness,.38,t),n.mat.clearcoat=B(n.dryClearcoat,.62,t),n.mat.clearcoatRoughness=B(n.dryClearcoatRoughness,.18,t)}urlForMode(e){return e==="Low"?"models/otter/otter_low.glb":e==="Medium"?"models/otter/otter_medium.glb":"models/otter/otter_high.glb"}preloadAllModels(){if(this.preloadStarted)return;this.preloadStarted=!0;const e=["Low","Medium","High"];for(const t of e){const n=this.urlForMode(t);du(this.loader,n).catch(()=>{})}}loadModel(e,t){const n=this.urlForMode(e),s=++this.loadTicket;du(this.loader,n).then(r=>{s===this.loadTicket&&this.useLoadedModel(r,e,t)}).catch(r=>{console.warn(`[otter] Failed to load ${n}`,r),this.appearanceMode=e,this.furSilhouette=t;try{const o="otter-load-error";let a=document.getElementById(o);a||(a=document.createElement("div"),a.id=o,a.style.position="fixed",a.style.left="10px",a.style.bottom="10px",a.style.zIndex="9999",a.style.maxWidth="min(560px, 90vw)",a.style.padding="10px 12px",a.style.borderRadius="10px",a.style.background="rgba(0,0,0,0.70)",a.style.color="#fff",a.style.font="12px/1.35 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",document.body.appendChild(a)),a.textContent=`Otter model failed to load: ${n}. If you're testing on phone, make sure you're using the dev server (localhost:5173), not opening index.html directly.`}catch{}})}useLoadedModel(e,t,n){this.model&&(this.group.remove(this.model),this.model=null),this.furObj=null;const s=this.group.getObjectByName("__placeholder");s&&(this.group.remove(s),Ly(s));const r=e.scene;r.name="otterModel",r.rotation.y=-Math.PI/2;const o=t==="Low"?.48:t==="Medium"?.5:.52;r.scale.setScalar(o),this.model=r,this.group.add(r),this.furObj=r.getObjectByName("fur")||null,this.furObj&&(this.furObj.visible=n),this.applyMaterials(t),this.cacheRigNodes(),this.setupAnimations(),this.appearanceMode=t,this.furSilhouette=n}cacheRigNodes(){this.nodes={},this.model&&(this.nodes.body=this.model.getObjectByName("Body")||void 0,this.nodes.head=this.model.getObjectByName("Head")||void 0,this.nodes.tail=this.model.getObjectByName("Tail")||void 0,this.nodes.flipperL=this.model.getObjectByName("FlipperL")||void 0,this.nodes.flipperR=this.model.getObjectByName("FlipperR")||void 0,this.nodes.eyeL=this.model.getObjectByName("EyeL")||void 0,this.nodes.eyeR=this.model.getObjectByName("EyeR")||void 0,this.nodes.whiskers=this.model.getObjectByName("Whiskers")||void 0)}applyMaterials(e){if(!this.model)return;this.wetMats.length=0;const t=e==="Low",n=e==="Medium",s=e==="High",r=this.model.userData??(this.model.userData={}),o=r.otterMaterials;let a,l,c,h;if(o&&o.mode===e)a=o.furMat,l=o.furShellMat,c=o.eyeMat,h=o.whiskMat,a.color.copy(o.furDry.color),a.roughness=o.furDry.roughness,a.clearcoat=o.furDry.clearcoat,a.clearcoatRoughness=o.furDry.clearcoatRoughness,l.color.copy(o.furShellDry.color),l.roughness=o.furShellDry.roughness,l.clearcoat=o.furShellDry.clearcoat,l.clearcoatRoughness=o.furShellDry.clearcoatRoughness;else{const u=new te(t?"#6a4a2b":s?"#62462b":"#5a4028"),d=new te("#6f5232"),f=new te("#0a0a0a"),g=new te("#d9d1c5");a=new Qt({color:u,roughness:t?.96:.92,metalness:0,clearcoat:.1,clearcoatRoughness:.4,sheen:s?1:.75,sheenRoughness:.86,sheenColor:new te("#caa46a")}),a.flatShading=t,n?fu(a,new te("#e7c89a"),.22,2.2):s&&fu(a,new te("#e7c89a"),.12,2.6),l=new Qt({color:d,roughness:.98,metalness:0,clearcoat:.05,clearcoatRoughness:.55,sheen:.9,sheenRoughness:.92,sheenColor:new te("#caa46a")}),l.flatShading=t,c=new Pn({color:f,roughness:.55,metalness:0}),c.flatShading=t,h=new Pn({color:g,roughness:.8,metalness:0}),r.otterMaterials={mode:e,furMat:a,furShellMat:l,eyeMat:c,whiskMat:h,furDry:{color:a.color.clone(),roughness:a.roughness,clearcoat:a.clearcoat,clearcoatRoughness:a.clearcoatRoughness},furShellDry:{color:l.color.clone(),roughness:l.roughness,clearcoat:l.clearcoat,clearcoatRoughness:l.clearcoatRoughness}}}this.wetMats.push({mat:a,dryColor:a.color.clone(),dryRoughness:a.roughness,dryClearcoat:a.clearcoat,dryClearcoatRoughness:a.clearcoatRoughness}),s&&this.wetMats.push({mat:l,dryColor:l.color.clone(),dryRoughness:l.roughness,dryClearcoat:l.clearcoat,dryClearcoatRoughness:l.clearcoatRoughness}),this.model.traverse(u=>{const d=u;if(!d.isMesh)return;const f=d.material,g=Array.isArray(f)?f[0]:f,_=(g==null?void 0:g.name)??"";_==="Eye"?d.material=c:_==="Whisker"?d.material=h:_==="FurShell"?d.material=l:d.material=a}),this.applyWetnessToMaterials(this.wetness)}setupAnimations(){if(!this.model)return;if(this.mixer)try{this.mixer.stopAllAction(),this.mixerRoot&&this.mixer.uncacheRoot(this.mixerRoot)}catch{}this.mixer=new mx(this.model),this.mixerRoot=this.model,this.idleAction=null,this.paddleAction=null,this.diveAction=null,this.resurfaceAction=null,this.blinkAction=null,this.whiskerTwitchAction=null;const e=this.nodes.body,t=this.nodes.head,n=this.nodes.tail,s=this.nodes.flipperL,r=this.nodes.flipperR,o=this.nodes.eyeL,a=this.nodes.eyeR,l=this.nodes.whiskers,c=[];{const h=[],d=[0,1.5,3,4.5,6];if(e){const f=[1,1,1],g=[1.02,.985,1.02],_=[.99,1.01,.99];h.push(new Zn(`${e.name}.scale`,d,[...f,...g,..._,...g,...f]))}if(t){const f=new at().setFromEuler(new mt(.02,0,0,"YXZ")),g=new at().setFromEuler(new mt(.03,.08,0,"YXZ")),_=new at().setFromEuler(new mt(.01,-.06,0,"YXZ"));h.push(new Jt(`${t.name}.quaternion`,d,[f.x,f.y,f.z,f.w,g.x,g.y,g.z,g.w,_.x,_.y,_.z,_.w,g.x,g.y,g.z,g.w,f.x,f.y,f.z,f.w]))}if(n){const f=new at().setFromEuler(new mt(0,0,.06)),g=new at().setFromEuler(new mt(0,0,-.06));h.push(new Jt(`${n.name}.quaternion`,[0,3,6],[f.x,f.y,f.z,f.w,g.x,g.y,g.z,g.w,f.x,f.y,f.z,f.w]))}h.length&&c.push(new Xn("Idle",6,h))}{const h=[],u=this.paddlePeriod_s,d=[0,u*.25,u*.5,u*.75,u],f=.55,g=-.35;if(s){const _=new at().setFromEuler(new mt(0,0,f)),m=new at().setFromEuler(new mt(0,0,g));h.push(new Jt(`${s.name}.quaternion`,d,[_.x,_.y,_.z,_.w,m.x,m.y,m.z,m.w,_.x,_.y,_.z,_.w,m.x,m.y,m.z,m.w,_.x,_.y,_.z,_.w]))}if(r){const _=new at().setFromEuler(new mt(0,0,-f)),m=new at().setFromEuler(new mt(0,0,-g));h.push(new Jt(`${r.name}.quaternion`,d,[_.x,_.y,_.z,_.w,m.x,m.y,m.z,m.w,_.x,_.y,_.z,_.w,m.x,m.y,m.z,m.w,_.x,_.y,_.z,_.w]))}h.length&&c.push(new Xn("Paddle",u,h))}if(t){const u=new at().setFromEuler(new mt(.02,0,0,"YXZ")),d=new at().setFromEuler(new mt(-.38,0,0,"YXZ"));c.push(new Xn("Dive",1,[new Jt(`${t.name}.quaternion`,[0,1],[u.x,u.y,u.z,u.w,d.x,d.y,d.z,d.w])])),c.push(new Xn("Resurface",1,[new Jt(`${t.name}.quaternion`,[0,1],[d.x,d.y,d.z,d.w,u.x,u.y,u.z,u.w])]))}if(o&&a){const u=o.scale,d=Math.max(.001,u.y*.08),f=[0,.06,.12,.18],g=[u.x,u.y,u.z],_=[u.x,d,u.z];c.push(new Xn("Blink",.18,[new Zn(`${o.name}.scale`,f,[...g,..._,...g,...g]),new Zn(`${a.name}.scale`,f,[...g,..._,...g,...g])]))}if(l){const u=new at().setFromEuler(new mt(0,0,.02)),d=new at().setFromEuler(new mt(0,0,-.04));c.push(new Xn("WhiskerTwitch",.55,[new Jt(`${l.name}.quaternion`,[0,.55*.5,.55],[u.x,u.y,u.z,u.w,d.x,d.y,d.z,d.w,u.x,u.y,u.z,u.w])]))}for(const h of c){const u=this.mixer.clipAction(h);h.name==="Idle"?(u.setLoop(pl,1/0),u.play(),this.idleAction=u):h.name==="Paddle"?(u.setLoop(pl,1/0),u.enabled=!0,u.play(),u.setEffectiveWeight(0),this.paddleAction=u):h.name==="Dive"?(u.setLoop(er,1),u.clampWhenFinished=!0,u.enabled=!0,this.diveAction=u):h.name==="Resurface"?(u.setLoop(er,1),u.clampWhenFinished=!0,u.enabled=!0,this.resurfaceAction=u):h.name==="Blink"?(u.setLoop(er,1),u.clampWhenFinished=!0,u.enabled=!0,this.blinkAction=u):h.name==="WhiskerTwitch"&&(u.setLoop(er,1),u.clampWhenFinished=!0,u.enabled=!0,this.whiskerTwitchAction=u)}this.blinkTimer_s=2.5+this.rng()*3.5,this.wasUnderwater=!1}}function Ly(i){i.traverse(e=>{const t=e;t.geometry&&typeof t.geometry.dispose=="function"&&t.geometry.dispose();const n=t.material;if(Array.isArray(n))for(const s of n)s&&typeof s.dispose=="function"&&s.dispose();else n&&typeof n.dispose=="function"&&n.dispose()})}function fu(i,e,t,n){i.onBeforeCompile=s=>{s.uniforms.u_rimColor={value:e},s.uniforms.u_rimStrength={value:t},s.uniforms.u_rimPower={value:n},s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
       uniform vec3 u_rimColor;
       uniform float u_rimStrength;
       uniform float u_rimPower;`),s.fragmentShader=s.fragmentShader.replace("#include <opaque_fragment>",`float _rim = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), u_rimPower);
       outgoingLight += u_rimColor * (u_rimStrength * _rim);
       #include <opaque_fragment>`)},i.customProgramCacheKey=()=>`otter_fur_rim_${t.toFixed(3)}_${n.toFixed(3)}`}class Dy{constructor(){R(this,"tmpPos",new T);R(this,"tmpLook",new T);R(this,"tmpFwd",new T);R(this,"tmpGaze",new T);R(this,"up",new T(0,1,0));R(this,"camPos",new T(0,1.05,9));R(this,"lookAtPos",new T(0,1.2,0));R(this,"waterY_m",0);R(this,"initialized",!1)}update(e,t){const n=t.dt_s,s=this.tmpGaze.copy(t.gazeDir);s.lengthSq()>1e-10?s.normalize():s.set(0,.12,-1),s.y=I(s.y,-.25,.95),s.normalize();const r=I(t.storminess,0,1),o=I(t.followDistance_m??9,9,18),a=I(t.followElevation_m??1.05,.35,3),l=o,c=a,h=this.tmpFwd.copy(t.bodyForward);h.y=0,h.lengthSq()<1e-6&&(h.copy(s),h.y=0),h.normalize();const u=this.tmpPos.copy(t.headPos).addScaledVector(h,-l).addScaledVector(this.up,c);if(!this.initialized)this.waterY_m=t.surfaceHeight_m;else{const m=B(.35,.55,r),p=1-Math.exp(-n/Math.max(.001,m));this.waterY_m=B(this.waterY_m,t.surfaceHeight_m,p)}u.y=Math.max(u.y,this.waterY_m+.26);const d=B(.22,.38,r),f=1-Math.exp(-n/Math.max(.001,d));this.initialized?this.camPos.lerp(u,f):this.camPos.copy(u),e.position.copy(this.camPos),e.fov=B(e.fov,52,I(n*2,0,1)),e.updateProjectionMatrix();const _=this.tmpLook.copy(t.eyePos).addScaledVector(s,60);if(_.y=Math.max(_.y,this.waterY_m-2.5),!this.initialized)this.lookAtPos.copy(_),this.initialized=!0;else{const m=B(.14,.24,r),p=1-Math.exp(-n/Math.max(.001,m));this.lookAtPos.lerp(_,p)}e.lookAt(this.lookAtPos)}}class Ny{constructor(){R(this,"group",new cn);R(this,"tmpFwd",new T);R(this,"tmpLeft",new T);R(this,"islands",[]);R(this,"layout",[]);const e=new Pn({color:new te("#14131b"),roughness:1,metalness:0,emissive:new te("#050509"),emissiveIntensity:.2}),t=this.makeIsland(e,420,22);this.islands.push(t),this.layout.push({dist:5200,side:-2600,scale:new T(1.2,1,.8),y:-6});const n=this.makeIsland(e,680,26);this.islands.push(n),this.layout.push({dist:6100,side:0,scale:new T(2.6,.75,.8),y:-9});const s=this.makeIsland(e,760,28);this.islands.push(s),this.layout.push({dist:5600,side:2700,scale:new T(3,.85,.9),y:-8});for(const r of this.islands)r.castShadow=!1,r.receiveShadow=!1,this.group.add(r);this.group.frustumCulled=!1}update(e,t,n){const s=this.tmpFwd.copy(t);s.y=0,s.lengthSq()<1e-6&&s.set(0,0,-1),s.normalize(),this.tmpLeft.set(0,1,0).cross(s).normalize();for(let r=0;r<this.islands.length;r++){const o=this.islands[r],a=this.layout[r];o.position.set(e.x+s.x*a.dist+this.tmpLeft.x*a.side,n+a.y,e.z+s.z*a.dist+this.tmpLeft.z*a.side),o.scale.copy(a.scale)}}makeIsland(e,t,n){const s=new Fo(t*.95,t,70,n,2,!1),r=s.getAttribute("position"),o=new T;for(let l=0;l<r.count;l++){if(o.set(r.getX(l),r.getY(l),r.getZ(l)),o.y>10?1:0){const h=Math.sin(o.x*.004+o.z*.006)+Math.cos(o.z*.005-o.x*.003),u=Math.sin((o.x+o.z)*.002)*.7+.3;o.y+=(h*8+u*10)*.6,o.x+=Math.sin(o.z*.008)*6,o.z+=Math.cos(o.x*.008)*6}r.setXYZ(l,o.x,o.y,o.z)}return r.needsUpdate=!0,s.computeVertexNormals(),new ht(s,e)}}function bl(i,e){const t=Math.abs(i);return e>=23&&t<38?"Tropical":t>60||e<4?"Polar":"Temperate"}class Uy{constructor(e){R(this,"group",new cn);R(this,"rng",Dn(920155));R(this,"params");R(this,"fishColTropical",new te("#6cc6ff"));R(this,"fishColTemperate",new te("#a7b2c9"));R(this,"fishColPolar",new te("#c9d6ff"));R(this,"fish");R(this,"fishCount");R(this,"fishPos");R(this,"fishVel");R(this,"tmpObj",new ut);R(this,"glow");R(this,"glowCount",260);R(this,"glowPos");R(this,"dolphin");R(this,"dolphinTimer_s",999);R(this,"dolphinActive_s",0);this.params=e,this.fishCount=240;const t=new oc(.06,.22,8,1);t.rotateX(Math.PI*.5);const n=new Pn({color:e.biome==="Tropical"?new te("#6cc6ff"):new te("#a7b2c9"),roughness:.55,metalness:.05});this.fish=new pd(t,n,this.fishCount),this.fish.instanceMatrix.setUsage(dr),this.group.add(this.fish),this.fishPos=[],this.fishVel=[];for(let c=0;c<this.fishCount;c++)this.fishPos.push(new T((this.rng()*2-1)*18,-2-this.rng()*8,(this.rng()*2-1)*18)),this.fishVel.push(new T((this.rng()*2-1)*.6,0,(this.rng()*2-1)*.6));this.glowPos=new Float32Array(this.glowCount*3);for(let c=0;c<this.glowCount;c++){const h=c*3;this.glowPos[h+0]=(this.rng()*2-1)*22,this.glowPos[h+1]=-.5-this.rng()*10,this.glowPos[h+2]=(this.rng()*2-1)*22}const s=new gt,r=new Mt(this.glowPos,3);r.setUsage(dr),s.setAttribute("position",r);const o=new zi({color:new te("#74f7ff"),size:.08,transparent:!0,opacity:0,depthWrite:!1,blending:Ln});this.glow=new Is(s,o),this.group.add(this.glow);const a=new sc(.2,1.2,8,12),l=new Pn({color:new te("#6f7c8c"),roughness:.35,metalness:.05});this.dolphin=new ht(a,l),this.dolphin.visible=!1,this.group.add(this.dolphin)}reset(){const e=B(2,7.5,I(this.params.coastProximity,0,1));for(let t=0;t<this.fishCount;t++)this.fishPos[t].set((this.rng()*2-1)*18,-e-this.rng()*8,(this.rng()*2-1)*18),this.fishVel[t].set((this.rng()*2-1)*.6,0,(this.rng()*2-1)*.6);for(let t=0;t<this.glowCount;t++){const n=t*3;this.glowPos[n+0]=(this.rng()*2-1)*22,this.glowPos[n+1]=-.5-this.rng()*10,this.glowPos[n+2]=(this.rng()*2-1)*22}this.glow.geometry.getAttribute("position").needsUpdate=!0,this.dolphin.visible=!1,this.dolphinTimer_s=999,this.dolphinActive_s=0}setParams(e){this.params=e;const t=this.fish.material;e.biome==="Tropical"?t.color.copy(this.fishColTropical):e.biome==="Polar"?t.color.copy(this.fishColPolar):t.color.copy(this.fishColTemperate)}update(e){const{dt_s:t,time_s:n}=e,s=e.otterPos,r=.55+.55*Math.sin(n*.22),o=B(2,7.5,I(this.params.coastProximity,0,1)),a=B(22,14,I(this.params.coastProximity,0,1)),l=this.tmpObj;for(let d=0;d<this.fishCount;d++){const f=this.fishPos[d],g=this.fishVel[d];g.x+=Math.sin(n*.7+d)*.15*t,g.z+=Math.cos(n*.6+d*.7)*.15*t,g.x+=-f.x/a*.18*t,g.z+=-f.z/a*.18*t;const _=Math.hypot(g.x,g.z),m=B(.9,1.6,r);_>m&&(g.x=g.x/_*m,g.z=g.z/_*m),f.x+=g.x*t,f.z+=g.z*t,f.y=-o-.6*Math.sin(n*.9+d*.25)-this.rng()*.08,f.x<-a&&(f.x=a),f.x>a&&(f.x=-a),f.z<-a&&(f.z=a),f.z>a&&(f.z=-a);const p=s.x+f.x,v=e.surfaceY+f.y,x=s.z+f.z;l.position.set(p,v,x),l.lookAt(p+g.x,v,x+g.z),l.updateMatrix(),this.fish.setMatrixAt(d,l.matrix)}this.fish.instanceMatrix.needsUpdate=!0;const c=this.glow.material;c.opacity=B(c.opacity,I(e.nightFactor*.85,0,.85),I(t*.8,0,1));const h=this.glow.geometry.getAttribute("position");for(let d=0;d<this.glowCount;d++){const f=d*3,g=this.glowPos[f+0],_=this.glowPos[f+1],m=this.glowPos[f+2];h.setXYZ(d,s.x+g,e.surfaceY+_,s.z+m)}h.needsUpdate=!0;const u=I(this.params.exoticEncounters,0,1);if(this.dolphinTimer_s-=t,this.dolphinTimer_s<=0&&u>.02){const d=u*B(7e-4,15e-5,e.storminess);if(this.rng()<d*t*60){this.dolphinActive_s=B(1.6,2.8,this.rng()),this.dolphinTimer_s=B(15,45,1-u)+this.rng()*10;const f=this.rng()*Math.PI*2,g=B(8,22,this.rng());this.dolphin.position.set(s.x+Math.cos(f)*g,e.surfaceY-.4,s.z+Math.sin(f)*g),this.dolphin.rotation.set(0,f+Math.PI,0),this.dolphin.visible=!0}}if(this.dolphinActive_s>0){this.dolphinActive_s-=t;const d=1-this.dolphinActive_s/2.4,f=Math.sin(Math.PI*I(d,0,1));this.dolphin.position.y=e.surfaceY+f*1.25,this.dolphin.rotation.x=-Math.PI*.15+f*Math.PI*.35,this.dolphinActive_s<=0&&(this.dolphin.visible=!1)}}}class Id{constructor(e){R(this,"group",new cn);R(this,"rng",Dn(188122));R(this,"rainCol",new te("#b8dcff"));R(this,"snowCol",new te("#ffffff"));R(this,"count",800);R(this,"positions");R(this,"velocities");R(this,"geo");R(this,"points");this.count=e==="Max"?1800:e==="High"?1200:e==="Medium"?800:450,this.positions=new Float32Array(this.count*3),this.velocities=new Float32Array(this.count*3);for(let s=0;s<this.count;s++){const r=s*3;this.positions[r+0]=(this.rng()*2-1)*18,this.positions[r+1]=this.rng()*14+2,this.positions[r+2]=(this.rng()*2-1)*18,this.velocities[r+0]=0,this.velocities[r+1]=-12,this.velocities[r+2]=0}this.geo=new gt;const t=new Mt(this.positions,3);t.setUsage(dr),this.geo.setAttribute("position",t);const n=new zi({color:new te("#b8dcff"),size:2.2,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Ln});this.points=new Is(this.geo,n),this.points.frustumCulled=!1,this.group.add(this.points)}setQuality(e){}dispose(){this.geo.dispose(),this.points.material.dispose()}update(e){const t=this.points.material;if(!e.visible||e.intensity<=.01||e.mode==="None"){t.opacity=B(t.opacity,0,I(e.dt_s*2.2,0,1));return}const n=I(e.intensity,0,1);t.opacity=B(t.opacity,0+n*(e.mode==="Rain"?.85:.65),I(e.dt_s*1.8,0,1)),t.size=e.mode==="Rain"?B(1.8,3,n):B(2.4,4.6,n),t.color.copy(e.mode==="Rain"?this.rainCol:this.snowCol);const s=e.windDirFrom_deg*Math.PI/180,r=Math.cos(s+Math.PI)*(2+n*7),o=Math.sin(s+Math.PI)*(2+n*7),a=e.mode==="Rain"?B(10,32,n):B(1.8,6.5,n),l=this.geo.getAttribute("position");for(let c=0;c<this.count;c++){const h=c*3;this.positions[h+0]+=(this.velocities[h+0]+r)*e.dt_s,this.positions[h+1]+=-a*e.dt_s,this.positions[h+2]+=(this.velocities[h+2]+o)*e.dt_s,this.positions[h+1]<-2&&(this.positions[h+0]=(this.rng()*2-1)*18,this.positions[h+1]=12+this.rng()*6,this.positions[h+2]=(this.rng()*2-1)*18),this.positions[h+0]<-20&&(this.positions[h+0]=20),this.positions[h+0]>20&&(this.positions[h+0]=-20),this.positions[h+2]<-20&&(this.positions[h+2]=20),this.positions[h+2]>20&&(this.positions[h+2]=-20),l.setXYZ(c,e.cameraPos.x+this.positions[h+0],e.cameraPos.y+this.positions[h+1],e.cameraPos.z+this.positions[h+2])}l.needsUpdate=!0}}class mc{constructor(e={}){R(this,"mesh");R(this,"uniforms");R(this,"layerOffset");R(this,"densityScale");R(this,"opacityScale");R(this,"coverScale");R(this,"stormScale");R(this,"rainScale");R(this,"windScale");R(this,"stepsScale");R(this,"opacity",0);R(this,"windOffset",new Z(0,0));R(this,"windDirXZ",new Z(1,0));const t=e.radius??9e3;this.layerOffset=e.layerOffset??0,this.densityScale=e.densityScale??1,this.opacityScale=e.opacityScale??1,this.coverScale=e.coverScale??1,this.stormScale=e.stormScale??1,this.rainScale=e.rainScale??1,this.windScale=e.windScale??1,this.stepsScale=e.stepsScale??1;const n=new Ls(t,64,32);this.uniforms={u_time:{value:0},u_windOffset:{value:this.windOffset},u_windDirXZ:{value:this.windDirXZ},u_cover:{value:.25},u_storm:{value:0},u_rain:{value:0},u_sunDir:{value:new T(0,1,0)},u_sunColor:{value:new te("#ffffff")},u_sunIntensity:{value:1},u_night:{value:0},u_lightning:{value:0},u_lightningDir:{value:new T(0,1,0)},u_opacity:{value:0},u_layerOffset:{value:this.layerOffset},u_densityScale:{value:this.densityScale},u_steps:{value:8}};const s=new Tt({uniforms:this.uniforms,transparent:!0,depthWrite:!1,depthTest:!1,side:Ft,vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        precision highp float;

        varying vec3 vDir;

        uniform float u_time;
        uniform vec2  u_windOffset;
        uniform vec2  u_windDirXZ;

        uniform float u_cover;
        uniform float u_storm;
        uniform float u_rain;

        uniform vec3  u_sunDir;
        uniform vec3  u_sunColor;
        uniform float u_sunIntensity;
        uniform float u_night;
        uniform float u_lightning;
        uniform vec3  u_lightningDir;

        uniform float u_opacity;
        uniform float u_layerOffset;
        uniform float u_densityScale;
        uniform float u_steps;

        // ---- small 3D value noise + fBm ----
        float hash13(vec3 p) {
          return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
        }

        float noise3(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);

          float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
          float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
          float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
          float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
          float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
          float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
          float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
          float n111 = hash13(i + vec3(1.0, 1.0, 1.0));

          float n00 = mix(n000, n100, f.x);
          float n10 = mix(n010, n110, f.x);
          float n01 = mix(n001, n101, f.x);
          float n11 = mix(n011, n111, f.x);
          float n0  = mix(n00, n10, f.y);
          float n1  = mix(n01, n11, f.y);
          return mix(n0, n1, f.z);
        }

        float fbm4(vec3 p) {
          float v = 0.0;
          float a = 0.5;
          v += a * noise3(p); p *= 2.02; a *= 0.5;
          v += a * noise3(p); p *= 2.03; a *= 0.5;
          v += a * noise3(p); p *= 2.01; a *= 0.5;
          v += a * noise3(p);
          return v;
        }

        // Cloud density proxy (0..1) from a 3D coordinate.
        float densityAt(vec3 p, float cover, float storm, float rain) {
          float overcast = clamp((cover - 0.50) / 0.50, 0.0, 1.0);
          float stratus  = clamp(overcast * 0.85 + rain * 0.65, 0.0, 1.0);
          float cumulus  = clamp((1.0 - overcast) * (1.0 - rain) * (1.0 - storm * 0.55), 0.0, 1.0);

          float freqX = mix(6.2, 2.4, stratus) + cumulus * 1.6;
          float freqY = mix(3.0, 1.2, stratus) + storm * 0.7;

          vec3 q = vec3(p.x * freqX, p.y * (0.55 + freqY), p.z * freqX);

          float base   = fbm4(q);
          float detail = fbm4(q * 2.15 + 17.0);
          float n = base * 0.65 + detail * 0.35;

          // Stratus banding / layering.
          vec3 qb = vec3(q.x * 0.55, q.y * (2.4 + stratus * 1.8), q.z * 0.55);
          float bands = fbm4(qb + vec3(0.0, u_time * 0.02, 0.0));
          n = mix(n, bands, stratus * 0.82) + cumulus * 0.10 * bands;

          float thr  = mix(0.44, 0.28, clamp(cover * 0.9 + storm * 0.45, 0.0, 1.0));
          float span = mix(0.62, 0.30, clamp(stratus * 0.9 + storm * 0.65, 0.0, 1.0));

          float v = clamp((n - thr) / max(1e-3, span), 0.0, 1.0);

          float harsh = mix(0.0, 0.22, storm);
          if (harsh > 0.001) {
            v = clamp(v + (v * (1.0 - v)) * harsh * 2.0, 0.0, 1.0);
          }

          // Slightly bias down so low cover is "wispy" rather than chunky blobs.
          v = pow(v, mix(1.55, 1.05, cover));
          return v;
        }

        void main() {
          vec3 dir = normalize(vDir);

          // Kill clouds below the horizon; soften near the horizon.
          float horizon = smoothstep(-0.03, 0.22, dir.y);
          if (horizon <= 0.001 || u_opacity <= 0.001) {
            discard;
          }

          float cover = clamp(u_cover, 0.0, 1.0);
          float storm = clamp(max(u_storm, 0.0), 0.0, 1.0);
          float rain  = clamp(u_rain, 0.0, 1.0);

          // A slightly stronger "visual cover" than the raw input.
          float coverVis = clamp((cover - 0.06) / 0.94, 0.0, 1.0);

          // Sunset factor from sun elevation.
          float sunset = clamp(1.0 - clamp((u_sunDir.y + 0.02) / 0.32, 0.0, 1.0), 0.0, 1.0);

          // Base colors (matched to the old deck; now shaded in-shader).
          vec3 colDay    = vec3(1.0);
          vec3 colSunset = vec3(1.0, 0.824, 0.627);
          vec3 colNight  = vec3(0.420, 0.478, 0.651);

          vec3 baseCol = mix(colDay, colSunset, sunset * u_sunIntensity);
          baseCol = mix(baseCol, colNight, clamp(u_night, 0.0, 1.0));

          float darkness = clamp(storm * 0.70 + rain * 0.38, 0.0, 1.0);
          // Darken more aggressively in storms (the old deck could look too "day-bright").
          baseCol *= (1.0 - 0.78 * darkness);

          // Lightning: localized flash that silhouettes the underside/edges.
          float flash = clamp(u_lightning, 0.0, 1.0);
          vec3 ldir = normalize(u_lightningDir);
          float lAlign = pow(clamp(dot(dir, ldir), 0.0, 1.0), 10.0);
          // Global lift + strong local glow (so it doesn't brighten the whole dome).
          baseCol += flash * vec3(0.10, 0.12, 0.16);

          // Ray path gets longer toward the horizon.
          float path = clamp(1.0 / max(0.18, dir.y + 0.06), 0.85, 3.2);
          float thickness = mix(1.0, 1.35, clamp((cover - 0.35) / 0.65, 0.0, 1.0)) * path;
          thickness *= mix(1.0, 1.55, storm);

          // Wind drift in "noise space".
          vec3 wind = vec3(u_windOffset.x, 0.0, u_windOffset.y);

          // Raymarch with a fixed upper bound; dynamic early-exit via u_steps.
          const int MAX_STEPS = 10;

          float trans = 1.0;
          vec3  colAcc = vec3(0.0);

          vec3 sunDir = normalize(u_sunDir);
          float mu = clamp(dot(dir, sunDir), -1.0, 1.0);

          // Forward-scattering phase (cheap Henyey–Greenstein-ish).
          float g = 0.62;
          float phase = (1.0 - g*g) / pow(1.0 + g*g - 2.0*g*mu, 1.35);
          phase = clamp(phase, 0.0, 3.25);

          for (int i = 0; i < MAX_STEPS; i++) {
            float fi = float(i);
            if (fi >= u_steps) break;

            float h = (fi + 0.5) / max(1.0, u_steps);

            // A thin shell in noise-space: move along dir + a small vertical lift.
            vec3 p = dir * (2.6 + h * 1.9);
            p += wind * 18.0;
            p += vec3(0.0, u_time * 0.02, 0.0);
            p += vec3(0.0, h * 2.25, 0.0);
            p += vec3(0.0, u_layerOffset, 0.0);

            float dens = densityAt(p, cover, storm, rain) * u_densityScale;
            dens *= coverVis;
            dens *= horizon;

            // Step extinction (keep small so the (1-a) transmittance approximation is stable).
            float a = dens * (0.18 * thickness) / max(1.0, u_steps);
            a = clamp(a, 0.0, 0.33);

            // Cheap self-shadow: sample forward along sunDir in the same noise field.
            vec3 sp1 = p + sunDir * 0.35;
            vec3 sp2 = p + sunDir * 0.75;
            float sd1 = densityAt(sp1, cover, storm, rain);
            float sd2 = densityAt(sp2, cover, storm, rain);
            float occ = clamp(sd1 * 0.55 + sd2 * 0.45, 0.0, 1.0);
            float lightAtten = mix(1.0, 0.40, occ * (0.75 + 0.25 * storm));

            float edge = dens * (1.0 - dens);

            // Base cloud body.
            vec3 stepCol = baseCol;

            // --- Lightning glow ---
            // Edge term acts like a crude silhouette detector (bright rims).
            float edge01 = pow(clamp(edge * 4.0, 0.0, 1.0), 0.75);
            // Strongly localized to the flash direction, but keep a tiny ambient
            // contribution so the whole sky still "reads" as flashing.
            float bolt = flash * (0.12 + 0.88 * lAlign);
            // Blue-white storm lightning.
            vec3 boltCol = vec3(0.65, 0.78, 1.00);
            // Occlusion reduces interior glow so edges pop.
            float boltShade = (0.25 + 0.75 * (1.0 - occ));
            stepCol += boltCol * bolt * boltShade * (0.12 + 1.85 * edge01);

            // Sun lighting: warmed by u_sunColor (set in main.ts) + forward scattering.
            vec3 sunCol = u_sunColor;
            float sunPow = u_sunIntensity * (0.06 + 0.34 * phase);
            sunPow *= lightAtten;
            sunPow *= (0.55 + 0.45 * edge);
            stepCol += sunCol * sunPow;

            // Subtle underside glow at sunset, especially with thicker cover.
            stepCol += sunCol * (sunset * u_sunIntensity) * (0.04 + 0.10 * coverVis) * (1.0 - 0.75 * storm);

            // Accumulate with transmittance.
            colAcc += stepCol * a * trans;
            trans *= (1.0 - a);
            if (trans <= 0.02) break;
          }

          float alpha = (1.0 - trans) * u_opacity;
          alpha = clamp(alpha, 0.0, 0.96);

          // Extra horizon softening (prevents hard banding near y=0).
          alpha *= horizon;

          // Desaturate a bit in heavy storms (foggy / thick cloud base feel).
          float grey = dot(colAcc, vec3(0.299, 0.587, 0.114));
          colAcc = mix(colAcc, vec3(grey), storm * 0.22);

          gl_FragColor = vec4(colAcc, alpha);
        }
      `});this.mesh=new ht(n,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}update(e){this.mesh.position.copy(e.center);const t=I(e.cloudCover*this.coverScale,0,1),n=I(Math.max(e.storminess,e.hurricaneIntensity)*this.stormScale,0,1),s=I(e.precipIntensity*this.rainScale,0,1),r=I((t-.08)/.92,0,1)*.92*this.opacityScale;this.opacity=B(this.opacity,r,I(e.dt_s*.8,0,1));const o=e.windDirFrom_deg*Math.PI/180+Math.PI;this.windDirXZ.set(Math.cos(o),Math.sin(o));const a=(1e-5+e.windSpeed_mps*22e-7*this.windScale)*(.25+.75*t);this.windOffset.x+=this.windDirXZ.x*a*e.dt_s,this.windOffset.y+=this.windDirXZ.y*a*e.dt_s*.35;const l=e.quality==="Low"?4:e.quality==="Medium"?6:e.quality==="High"?8:10,c=I(l*this.stepsScale,3,10);this.uniforms.u_time.value=e.time_s,this.uniforms.u_cover.value=t,this.uniforms.u_storm.value=n,this.uniforms.u_rain.value=s,this.uniforms.u_sunDir.value.copy(e.sunDir),this.uniforms.u_sunColor.value.copy(e.sunColor),this.uniforms.u_sunIntensity.value=I(e.sunIntensity,0,1),this.uniforms.u_night.value=I(e.nightFactor,0,1),this.uniforms.u_lightning.value=I(e.lightningFlash01,0,1),this.uniforms.u_lightningDir.value.copy(e.lightningDir).normalize(),this.uniforms.u_opacity.value=this.opacity,this.uniforms.u_steps.value=c}}class Fy{constructor(){R(this,"mesh");R(this,"opacity",0);R(this,"tex");R(this,"tmpAntiSun",new T);const e=Oy();this.tex=e;const t=new ln({map:e,transparent:!0,opacity:0,depthWrite:!1,blending:Ln}),n=new ac(35,40,96,1,0,Math.PI);this.mesh=new ht(n,t),this.mesh.frustumCulled=!1,this.mesh.position.set(0,20,0)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.tex.dispose()}update(e){const t=this.mesh.material,n=e.sunElevation_rad,s=I(1-Math.abs(n-.18)/.25,0,1),o=e.precipIntensity>.12&&n>.02&&e.cloudCover<.85?s*(1-e.cloudCover)*I(e.precipIntensity,0,1):0;this.opacity=B(this.opacity,o,I(e.dt_s*1,0,1)),t.opacity=this.opacity*.55;const a=this.tmpAntiSun.copy(e.sunDir).multiplyScalar(-1);a.y=.08,a.normalize(),this.mesh.position.copy(e.center).addScaledVector(a,220),this.mesh.position.y=e.center.y+22,this.mesh.lookAt(e.center),this.mesh.rotateX(Math.PI*.5)}}function Oy(){const i=document.createElement("canvas");i.width=512,i.height=16;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,i.width,0);t.addColorStop(0,"rgba(255,0,0,0.0)"),t.addColorStop(.08,"rgba(255,0,0,0.9)"),t.addColorStop(.22,"rgba(255,165,0,0.9)"),t.addColorStop(.36,"rgba(255,255,0,0.9)"),t.addColorStop(.5,"rgba(0,255,0,0.9)"),t.addColorStop(.64,"rgba(0,127,255,0.9)"),t.addColorStop(.78,"rgba(75,0,130,0.9)"),t.addColorStop(.92,"rgba(148,0,211,0.9)"),t.addColorStop(1,"rgba(148,0,211,0.0)"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height);const n=new ec(i);return n.wrapS=on,n.wrapT=on,n.minFilter=et,n.magFilter=et,n}class By{constructor(){R(this,"points");R(this,"rng",Dn(340001));R(this,"max",220);R(this,"pos");R(this,"vel");R(this,"life");R(this,"geo");R(this,"idx",0);this.pos=new Float32Array(this.max*3),this.vel=new Float32Array(this.max*3),this.life=new Float32Array(this.max),this.geo=new gt;const e=new Mt(this.pos,3);e.setUsage(dr),this.geo.setAttribute("position",e);const t=new zi({color:new te("#ffffff"),size:.08,transparent:!0,opacity:0,depthWrite:!1,blending:Ln});this.points=new Is(this.geo,t),this.points.frustumCulled=!1}dispose(){this.geo.dispose(),this.points.material.dispose()}update(e){const t=e.dt_s,n=this.points.material,s=I((e.slope-.22)/.35,0,1),r=I(e.sprayBias01??0,0,1),o=s*s*Zs(10,75,e.intensity)*(.7+.6*r),a=Math.cos(e.windDirTo_rad),l=Math.sin(e.windDirTo_rad),c=Math.max(e.surfaceY+.05,e.origin.y+.12),h=Zs(e.surfaceY+.05,c,r),u=Math.min(14,Math.floor(o*t));for(let g=0;g<u;g++)this.spawn(e.origin,h,e.surfaceY,a,l,e.intensity,r);let d=!1;for(let g=0;g<this.max;g++){if(this.life[g]<=0)continue;d=!0,this.life[g]-=t;const _=g*3;this.vel[_+1]-=9.81*t,this.pos[_+0]+=this.vel[_+0]*t,this.pos[_+1]+=this.vel[_+1]*t,this.pos[_+2]+=this.vel[_+2]*t,this.pos[_+1]<e.surfaceY-.1&&(this.life[g]=0)}this.geo.getAttribute("position").needsUpdate=!0;const f=d?I(.15+.55*e.intensity,0,.85):0;n.opacity+=(f-n.opacity)*I(t*3,0,1)}spawn(e,t,n,s,r,o,a){const l=this.idx++%this.max;this.life[l]=Zs(.6,1.4,this.rng())*(.6+.4*o);const c=l*3,h=(this.rng()*2-1)*.65,u=(this.rng()*2-1)*.65;this.pos[c+0]=e.x+h,this.pos[c+1]=t+(this.rng()*2-1)*.06*a,this.pos[c+2]=e.z+u;const d=Zs(1.8,6.5,this.rng())*(.5+.5*o),f=Zs(.2,2.4,this.rng())*o;this.vel[c+0]=s*f+(this.rng()*2-1)*.35,this.vel[c+1]=d,this.vel[c+2]=r*f+(this.rng()*2-1)*.35}}function Zs(i,e,t){return i+(e-i)*t}class zy{constructor(){R(this,"mesh");R(this,"intensity",0);const e=new ti(7,7,1,1);e.rotateX(-Math.PI/2);const t=new Tt({transparent:!0,depthWrite:!1,uniforms:{u_time:{value:0},u_intensity:{value:0},u_sun:{value:1},u_sunset:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_intensity;
        uniform float u_sun;
        uniform float u_sunset;

        float ring(float r, float t, float freq, float width) {
          float w = sin(r * freq - t) * 0.5 + 0.5;
          return smoothstep(1.0 - width, 1.0, w);
        }

        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float r = length(p);

          // Fade out near center so it doesn't look like a sticker.
          float centerFade = smoothstep(0.06, 0.22, r);
          float edgeFade = 1.0 - smoothstep(0.75, 1.0, r);

          float t = u_time * 2.1;

          // A few expanding rings
          float a = 0.0;
          a += ring(r, t, 18.0, 0.10) * 0.60;
          a += ring(r, t + 1.1, 14.0, 0.12) * 0.45;
          a += ring(r, t + 2.2, 10.0, 0.14) * 0.30;

          a *= centerFade * edgeFade;

          // Warm tint at sunset, cooler otherwise.
          vec3 warm = vec3(1.0, 0.80, 0.62);
          vec3 cool = vec3(0.78, 0.90, 1.0);
          vec3 col = mix(cool, warm, u_sunset);
          col *= 0.16 + 0.26 * u_sun;

          float alpha = a * u_intensity;
          gl_FragColor = vec4(col, alpha);
        }
      `});this.mesh=new ht(e,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}update(e){const t=I(e.calmness,0,1);this.intensity=B(this.intensity,t,I(e.dt_s*1.2,0,1)),this.mesh.position.set(e.center.x,e.surfaceY+.02,e.center.z);const n=this.mesh.material;n.uniforms.u_time.value=e.time_s,n.uniforms.u_intensity.value=this.intensity*.9,n.uniforms.u_sun.value=I(e.sunIntensity,0,1),n.uniforms.u_sunset.value=I(e.sunset,0,1);const s=B(.95,1.18,t);this.mesh.scale.setScalar(s),this.mesh.visible=this.intensity>.02}}class ky{constructor(){R(this,"mesh");R(this,"intensity",0);R(this,"length_m",5);R(this,"width_m",1.8);const e=new ti(1,1,1,16);e.rotateX(-Math.PI/2);const t=new Tt({transparent:!0,depthWrite:!1,blending:Rn,uniforms:{u_time:{value:0},u_intensity:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_intensity;

        float sat(float x){ return clamp(x, 0.0, 1.0); }

        void main(){
          // vUv.y : 0 at near (otter), 1 at far tail.
          float along = vUv.y;
          float across = abs(vUv.x - 0.5) * 2.0;

          // Smooth edges + tail fade.
          float edge = sat(1.0 - pow(across, 2.2));
          float tail = sat(1.0 - along);
          tail = pow(tail, 1.25);

          // A couple ripple bands drifting backward.
          float phase = u_time * 1.4;
          float r0 = 0.5 + 0.5 * sin((along * 12.0 - phase) * 6.28318);
          float r1 = 0.5 + 0.5 * sin((along * 22.0 - phase * 1.35) * 6.28318);
          float rip = mix(r0, r1, 0.55);
          rip = pow(rip, 1.8);

          float a = u_intensity * edge * tail * (0.25 + 0.75 * rip);
          a *= sat(1.0 - across * 1.05);

          // Slightly bluish-white foam cue.
          vec3 col = vec3(0.88, 0.92, 0.96);
          gl_FragColor = vec4(col, a);
        }
      `});this.mesh=new ht(e,t),this.mesh.name="WakeRibbon",this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}update(e){const t=this.mesh.material;t.uniforms.u_time.value=e.time_s;const n=I(e.speed_mps/.3,0,1),s=I(e.paddleImpulse01,0,1),r=I((.35+.75*n+.55*s)*(.25+.75*e.calm01),0,1);this.intensity=B(this.intensity,r,I(e.dt_s*6,0,1)),t.uniforms.u_intensity.value=this.intensity;const o=B(3,9,n)+s*2,a=B(1.4,3.2,n)+s*.6;this.length_m=B(this.length_m,o,I(e.dt_s*3,0,1)),this.width_m=B(this.width_m,a,I(e.dt_s*3,0,1)),this.mesh.scale.set(this.width_m,1,this.length_m);const l=Math.atan2(e.forwardXZ.x,e.forwardXZ.y);this.mesh.rotation.y=l;const c=this.length_m*.38;this.mesh.position.set(e.centerXZ.x-e.forwardXZ.x*c,e.surfaceY_m+.02,e.centerXZ.y-e.forwardXZ.y*c),this.mesh.visible=this.intensity>.02}}class Hy{constructor(){R(this,"el");R(this,"enabled",!0);R(this,"acc_s",0);this.el=document.createElement("div"),Object.assign(this.el.style,{position:"fixed",left:"8px",bottom:"8px",padding:"8px 10px",borderRadius:"8px",background:"rgba(0,0,0,0.35)",color:"white",fontFamily:'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',fontSize:"12px",lineHeight:"1.25",zIndex:"40",whiteSpace:"pre",userSelect:"none",pointerEvents:"none",backdropFilter:"blur(2px)"}),this.el.textContent="",document.body.appendChild(this.el)}setEnabled(e){this.enabled=e,this.el.style.display=e?"block":"none"}dispose(){this.enabled=!1,this.el.remove()}update(e,t){if(!this.enabled||(this.acc_s+=e,this.acc_s<.12))return;this.acc_s=0;const n=`dt  ${t.dt_ms.toFixed(1)}ms
ema ${t.dtEma_ms.toFixed(1)}ms  (${t.fpsEma.toFixed(0)} fps)
avg ${t.dtAvg_ms.toFixed(1)}ms
mode ${t.quality}
refl ${t.reflectionRT_px}px  (${t.reflectionUpdatesPerSec.toFixed(1)}/s)
env  ${t.envInterval_s.toFixed(1)}s  Δθ ${t.envAngleDelta_deg.toFixed(2)}°`;this.el.textContent=n}}class Vy{constructor(){R(this,"group",new cn);R(this,"rng",Dn(552901));R(this,"bolts",[]);R(this,"boltCount",8);R(this,"segments",12);R(this,"tmpDir",new T);R(this,"tmpStart",new T);R(this,"tmpEnd",new T);R(this,"tmpUp",new T);R(this,"tmpRight",new T);R(this,"tmpPerp",new T);R(this,"tmpPos",new T);this.group.name="LightningBolts";const e=this.segments+1;for(let t=0;t<this.boltCount;t++){const n=new gt,s=new Float32Array(e*3);n.setAttribute("position",new Mt(s,3));const r=new Ql({color:new te("#e6f4ff"),transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Ln}),o=new Uo(n,r);o.frustumCulled=!1,o.visible=!1,this.group.add(o);const a=new rc(1,16),l=new ln({color:new te("#e6f4ff"),transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Ln,side:rn}),c=new ht(a,l);c.rotation.x=-Math.PI/2,c.visible=!1,c.frustumCulled=!1,this.group.add(c),this.bolts.push({line:o,impact:c,life_s:0,age_s:0,active:!1})}}dispose(){var e;for(const t of this.bolts)t.line.geometry.dispose(),t.line.material.dispose(),(e=t.impact)==null||e.geometry.dispose(),t.impact&&t.impact.material.dispose()}spawn(e){const t=this.allocBolt();if(!t)return;const n=I(e.storminess,0,1),s=e.type??(this.rng()<B(.45,.7,n)?"ground":"cloud"),o=Math.atan2(e.flashDir.z,e.flashDir.x)+(this.rng()*2-1)*B(.35,.85,n),a=Math.cos(o),l=Math.sin(o);if(s==="ground"){const h=B(320,1200,this.rng()),u=B(520,180,n)+B(-60,80,this.rng());this.tmpStart.copy(e.cameraPos).addScaledVector(this.tmpDir.set(a,0,l),h),this.tmpStart.y=e.waterLevel+u,this.tmpEnd.copy(this.tmpStart),this.tmpEnd.y=e.waterLevel-.25}else{const h=B(260,880,this.rng()),u=h+B(180,620,this.rng()),d=B(240,560,this.rng())*B(1,.8,n),f=d+B(-120,140,this.rng()),g=o+(this.rng()*2-1)*B(.6,1.2,n),_=Math.cos(g),m=Math.sin(g);this.tmpStart.copy(e.cameraPos).addScaledVector(this.tmpDir.set(a,0,l),h),this.tmpStart.y=e.waterLevel+d,this.tmpEnd.copy(e.cameraPos).addScaledVector(this.tmpDir.set(_,0,m),u),this.tmpEnd.y=e.waterLevel+f}this.writeBoltGeometry(t.line.geometry,this.tmpStart,this.tmpEnd,s),t.line.visible=!0;const c=t.line.material;if(c.opacity=1,t.impact)if(s==="ground"){t.impact.visible=!0,t.impact.position.set(this.tmpEnd.x,e.waterLevel+.02,this.tmpEnd.z);const h=B(12,32,this.rng())*B(.7,1.1,n);t.impact.scale.setScalar(h),t.impact.material.opacity=.85}else t.impact.visible=!1;t.life_s=B(.16,.28,this.rng())*(s==="ground"?1.2:.9),t.age_s=0,t.active=!0}update(e){const t=e.dt_s;for(const n of this.bolts){if(!n.active)continue;n.age_s+=t;const s=n.age_s/Math.max(1e-6,n.life_s);if(s>=1){n.active=!1,n.line.visible=!1,n.impact&&(n.impact.visible=!1);continue}const r=I(1-s,0,1),o=n.line.material;if(o.opacity=r,n.impact){const a=n.impact.material;a.opacity=r*.8}}}allocBolt(){for(const n of this.bolts)if(!n.active)return n;let e=null,t=-1;for(const n of this.bolts)n.age_s>t&&(t=n.age_s,e=n);return e}writeBoltGeometry(e,t,n,s){const r=e.getAttribute("position");this.tmpDir.subVectors(n,t);const o=Math.max(.001,this.tmpDir.length());this.tmpDir.multiplyScalar(1/o),this.tmpUp.set(0,1,0),Math.abs(this.tmpDir.dot(this.tmpUp))>.9&&this.tmpUp.set(1,0,0),this.tmpRight.crossVectors(this.tmpDir,this.tmpUp).normalize(),this.tmpPerp.crossVectors(this.tmpRight,this.tmpDir).normalize();const a=s==="ground"?B(10,32,this.rng()):B(16,38,this.rng());for(let l=0;l<=this.segments;l++){const c=l/this.segments;this.tmpPos.copy(t).lerp(n,c);const h=s==="ground"?1-c:Math.sin(Math.PI*c),u=a*h*(.35+.65*this.rng()),d=(this.rng()*2-1)*u,f=(this.rng()*2-1)*u*.55;this.tmpPos.addScaledVector(this.tmpRight,d),this.tmpPos.addScaledVector(this.tmpPerp,f),r.setXYZ(l,this.tmpPos.x,this.tmpPos.y,this.tmpPos.z)}r.needsUpdate=!0}}class Gy{constructor(){R(this,"points");R(this,"rng",Dn(991771));R(this,"max",520);R(this,"pos");R(this,"vel");R(this,"life");R(this,"geo");R(this,"idx",0);R(this,"gustTimer_s",0);R(this,"gustActive_s",0);R(this,"gustStrength",0);this.pos=new Float32Array(this.max*3),this.vel=new Float32Array(this.max*3),this.life=new Float32Array(this.max),this.geo=new gt;const e=new Mt(this.pos,3);e.setUsage(dr),this.geo.setAttribute("position",e);const t=new zi({color:new te("#e6f4ff"),size:.12,transparent:!0,opacity:0,depthWrite:!1,blending:Ln});this.points=new Is(this.geo,t),this.points.frustumCulled=!1}dispose(){this.geo.dispose(),this.points.material.dispose()}update(e){const t=e.dt_s,n=this.points.material;if(!e.visible){this.points.visible=!1,n.opacity=0;return}this.points.visible=!0,this.gustTimer_s-=t,this.gustActive_s=Math.max(0,this.gustActive_s-t),this.gustTimer_s<=0&&(this.gustTimer_s=B(.35,1.45,this.rng()),this.gustActive_s=B(.18,.55,this.rng()),this.gustStrength=B(.35,1,this.rng())*I(e.gustiness+e.storminess*.5,0,1));const s=this.gustActive_s>0?this.gustStrength:0,r=I(e.windSpeed_mps/26,0,1),o=I(e.storminess,0,1),a=B(6,90,r)*(.35+.65*(e.gustiness+s))*(.45+.55*o),l=Math.min(20,Math.floor(a*t)),c=Math.cos(e.windDirTo_rad),h=Math.sin(e.windDirTo_rad),u=-h,d=c;for(let _=0;_<l;_++)this.spawn(e.center,e.surfaceY,c,h,u,d,r,s,o);let f=!1;for(let _=0;_<this.max;_++){if(this.life[_]<=0)continue;f=!0,this.life[_]-=t;const m=_*3;this.vel[m+1]-=(6-2.5*s)*t,this.vel[m+0]+=c*(.25+.65*r)*t,this.vel[m+2]+=h*(.25+.65*r)*t,this.pos[m+0]+=this.vel[m+0]*t,this.pos[m+1]+=this.vel[m+1]*t,this.pos[m+2]+=this.vel[m+2]*t,this.pos[m+1]<e.surfaceY-.1&&(this.life[_]=0)}this.geo.getAttribute("position").needsUpdate=!0;const g=f?I(.12+.65*(r*.6+s*.7+o*.35),0,.85):0;n.opacity+=(g-n.opacity)*I(t*3,0,1)}spawn(e,t,n,s,r,o,a,l,c){const h=this.idx++%this.max;this.life[h]=B(.7,1.6,this.rng())*(.55+.45*a);const u=h*3,d=B(6,26,this.rng())*(.55+.45*a),f=(this.rng()*2-1)*B(4,14,this.rng()),g=B(.05,.55,this.rng())+c*.15;this.pos[u+0]=e.x+n*d+r*f,this.pos[u+1]=t+g,this.pos[u+2]=e.z+s*d+o*f;const _=B(1.2,4.8,this.rng())*(.4+.6*c)*(.65+.35*l),m=B(2,8,this.rng())*(.35+.65*a)*(.6+.4*l);this.vel[u+0]=n*m+r*(this.rng()*2-1)*.6,this.vel[u+1]=_,this.vel[u+2]=s*m+o*(this.rng()*2-1)*.6}}const pu=(()=>{try{const i=navigator==null?void 0:navigator.deviceMemory;return typeof i=="number"&&Number.isFinite(i)?i:null}catch{return null}})(),Es=(()=>{try{const i=typeof window<"u"&&!!window.matchMedia&&window.matchMedia("(pointer: coarse)").matches,e=typeof navigator<"u"?navigator.userAgent:"",t=/Android|iPhone|iPad|iPod/i.test(e),n=pu!==null&&pu<=4;return i||t||n}catch{return!1}})();function Wy(i){return Es?i==="Low"?1.25:i==="Medium"?1.5:i==="High"?1.75:2:i==="Low"?1.5:i==="Medium"?2:i==="High"?2.5:3}function zo(i,e){const t=window.devicePixelRatio||1;i.setPixelRatio(Math.min(t,Wy(e))),i.setSize(window.innerWidth,window.innerHeight)}function Xy(i,e,t){const n=document.createElement("div");Object.assign(n.style,{position:"fixed",left:"10px",top:"10px",maxWidth:"calc(100% - 20px)",maxHeight:"45vh",overflow:"auto",padding:"10px 12px",background:"rgba(0,0,0,0.70)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:"10px",fontFamily:'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',fontSize:"12px",lineHeight:"1.35",zIndex:"9999",whiteSpace:"pre-wrap",display:"none"}),document.body.appendChild(n);let s=!1;const r=(o,a)=>{if(s)return;s=!0;const l=typeof a=="string"?a:a instanceof Error?a.stack??a.message:JSON.stringify(a);n.textContent=`${o}

${l}

Tip: If this says WebGL context lost, lower quality (Performance → quality) or reload.`,n.style.display="block"};window.addEventListener("error",o=>{r("Runtime error",o.error??o.message)}),window.addEventListener("unhandledrejection",o=>{r("Unhandled promise rejection",o.reason)}),i.addEventListener("webglcontextlost",o=>{o.preventDefault(),r("WebGL context lost","Your browser/GPU driver stopped the WebGL context. Try lowering quality or reloading."),e==null||e()},{passive:!1}),i.addEventListener("webglcontextrestored",()=>{s=!1,n.style.display="none",t==null||t()},{passive:!0})}function qy(i){const e=new gt,t=new Float32Array(i*3);for(let r=0;r<i;r++){const o=4500+Math.random()*2500,a=Math.random()*Math.PI*2,l=Math.acos(2*Math.random()-1),c=o*Math.sin(l)*Math.cos(a),h=o*Math.cos(l),u=o*Math.sin(l)*Math.sin(a);t[r*3+0]=c,t[r*3+1]=h,t[r*3+2]=u}e.setAttribute("position",new Mt(t,3));const n=new zi({color:new te("#ffffff"),size:1.2,sizeAttenuation:!0,transparent:!0,opacity:0,depthWrite:!1}),s=new Is(e,n);return s.frustumCulled=!1,s}function Yy(){const i=Ky("#fff7cf"),e=new Zl({map:i,transparent:!0,opacity:1,depthWrite:!1,blending:Ln}),t=new dd(e);return t.scale.setScalar(450),t}function $y(i){const e=Ld(i),t=new Zl({map:e,transparent:!0,opacity:1,depthWrite:!1}),n=new dd(t);return n.scale.setScalar(220),n}function jy(i,e){var s;const t=Math.round(e*1e3)/1e3;i.__phaseKey!==t&&((s=i.map)==null||s.dispose(),i.map=Ld(e),i.needsUpdate=!0,i.__phaseKey=t)}function Ky(i){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d"),n=t.createRadialGradient(128,128,5,128,128,128);n.addColorStop(0,i),n.addColorStop(.15,i),n.addColorStop(.35,"rgba(255,255,255,0.55)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);const s=new ec(e);return s.minFilter=et,s.magFilter=et,s}function Ld(i){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");t.clearRect(0,0,256,256),t.beginPath(),t.arc(128,128,112,0,Math.PI*2),t.closePath(),t.fillStyle="#d9d9d9",t.fill(),t.globalAlpha=.1;for(let c=0;c<180;c++){const h=1+Math.random()*8,u=128+(Math.random()*2-1)*86,d=128+(Math.random()*2-1)*86;t.beginPath(),t.arc(u,d,h,0,Math.PI*2),t.closePath(),t.fillStyle=Math.random()<.5?"#bdbdbd":"#efefef",t.fill()}t.globalAlpha=1;const n=(i%1+1)%1,s=Math.cos((n-.5)*Math.PI*2)*.5+.5,o=(n<.5?B(1,-1,n/.5):B(-1,1,(n-.5)/.5))*90;t.save(),t.globalCompositeOperation="destination-in",t.beginPath(),t.arc(128,128,112,0,Math.PI*2),t.closePath(),t.fillStyle="#ffffff",t.fill(),t.restore(),t.save(),t.globalCompositeOperation="source-atop",t.fillStyle=`rgba(0,0,0,${B(.98,0,s)})`,t.beginPath(),t.arc(128+o,128,112,0,Math.PI*2),t.closePath(),t.fill(),t.restore();const a=t.createRadialGradient(108,108,10,128,128,120);a.addColorStop(0,"rgba(255,255,255,0.35)"),a.addColorStop(1,"rgba(255,255,255,0.0)"),t.fillStyle=a,t.beginPath(),t.arc(128,128,112,0,Math.PI*2),t.closePath(),t.fill();const l=new ec(e);return l.minFilter=et,l.magFilter=et,l}class Zy{constructor(){R(this,"ctx",null);R(this,"master",null);R(this,"windSrc",null);R(this,"waveSrc",null);R(this,"hissSrc",null);R(this,"rainSrc",null);R(this,"windGain",null);R(this,"waveGain",null);R(this,"hissGain",null);R(this,"rainGain",null);R(this,"currentWind",0);R(this,"currentWave",0);R(this,"currentHiss",0);R(this,"currentRain",0)}async enable(){if(this.ctx)return;const e=window.AudioContext||window.webkitAudioContext;if(this.ctx=new e,this.ctx.state==="suspended")try{await this.ctx.resume()}catch{}this.master=this.ctx.createGain(),this.master.gain.value=.55,this.master.connect(this.ctx.destination);const t=this.createNoiseBuffer(this.ctx,2),n=this.ctx.createBufferSource();n.buffer=t,n.loop=!0,this.windSrc=n;const s=this.ctx.createBiquadFilter();s.type="highpass",s.frequency.value=120;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.value=2200,this.windGain=this.ctx.createGain(),this.windGain.gain.value=0,n.connect(s),s.connect(r),r.connect(this.windGain),this.windGain.connect(this.master);const o=this.ctx.createBufferSource();o.buffer=t,o.loop=!0,this.waveSrc=o;const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.value=450,this.waveGain=this.ctx.createGain(),this.waveGain.gain.value=0,o.connect(a),a.connect(this.waveGain),this.waveGain.connect(this.master);const l=this.ctx.createBufferSource();l.buffer=t,l.loop=!0,this.hissSrc=l;const c=this.ctx.createBiquadFilter();c.type="highpass",c.frequency.value=2500,this.hissGain=this.ctx.createGain(),this.hissGain.gain.value=0,l.connect(c),c.connect(this.hissGain),this.hissGain.connect(this.master),n.start(),o.start(),l.start();const h=this.ctx.createBufferSource();h.buffer=t,h.loop=!0,this.rainSrc=h;const u=this.ctx.createBiquadFilter();u.type="bandpass",u.frequency.value=1700,u.Q.value=.7,this.rainGain=this.ctx.createGain(),this.rainGain.gain.value=0,h.connect(u),u.connect(this.rainGain),this.rainGain.connect(this.master),h.start()}async resume(){if(this.ctx&&this.ctx.state==="suspended")try{await this.ctx.resume()}catch{}}async suspend(){if(this.ctx&&this.ctx.state==="running")try{await this.ctx.suspend()}catch{}}async close(){var e,t,n,s,r,o,a,l,c,h,u,d,f;if(this.ctx){try{(e=this.windSrc)==null||e.stop()}catch{}try{(t=this.waveSrc)==null||t.stop()}catch{}try{(n=this.hissSrc)==null||n.stop()}catch{}try{(s=this.rainSrc)==null||s.stop()}catch{}try{(r=this.windSrc)==null||r.disconnect()}catch{}try{(o=this.waveSrc)==null||o.disconnect()}catch{}try{(a=this.hissSrc)==null||a.disconnect()}catch{}try{(l=this.rainSrc)==null||l.disconnect()}catch{}try{(c=this.windGain)==null||c.disconnect()}catch{}try{(h=this.waveGain)==null||h.disconnect()}catch{}try{(u=this.hissGain)==null||u.disconnect()}catch{}try{(d=this.rainGain)==null||d.disconnect()}catch{}try{(f=this.master)==null||f.disconnect()}catch{}this.windSrc=null,this.waveSrc=null,this.hissSrc=null,this.rainSrc=null,this.windGain=null,this.waveGain=null,this.hissGain=null,this.rainGain=null,this.master=null;try{await this.ctx.close()}catch{}this.ctx=null}}setMasterVolume(e){this.master&&(this.master.gain.value=I(e,0,1.2))}update(e,t){if(!this.ctx||!this.windGain||!this.waveGain||!this.hissGain||!this.rainGain)return;const n=I(t.U10,0,40),s=I(t.Hs,0,12),r=I(Math.pow(n/18,1.25),0,1),o=I(Math.pow(s/3,1.15),0,1),a=I(n/25*(s/5),0,1),l=I(t.rain,0,1),c=I(e*1.6,0,1);this.currentWind=B(this.currentWind,r*.45,c),this.currentWave=B(this.currentWave,o*.35,c),this.currentHiss=B(this.currentHiss,a*.25,c),this.currentRain=B(this.currentRain,l*.55,c),this.windGain.gain.value=this.currentWind,this.waveGain.gain.value=this.currentWave,this.hissGain.gain.value=this.currentHiss,this.rainGain.gain.value=this.currentRain}createNoiseBuffer(e,t){const n=Math.floor(t*e.sampleRate),s=e.createBuffer(1,n,e.sampleRate),r=s.getChannelData(0);for(let o=0;o<n;o++)r[o]=Math.random()*2-1;return s}}class Jy{constructor(e){R(this,"el");R(this,"visible",!1);R(this,"tapHandler",null);this.el=document.createElement("div"),this.el.textContent=e,Object.assign(this.el.style,{position:"fixed",left:"0",top:"0",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",background:"rgba(0,0,0,0.35)",color:"white",fontFamily:"system-ui, -apple-system, Segoe UI, Roboto, sans-serif",fontSize:"16px",letterSpacing:"0.3px",zIndex:"50",userSelect:"none",backdropFilter:"blur(2px)"}),this.el.style.opacity="0",this.el.style.pointerEvents="none",document.body.appendChild(this.el)}show(){this.visible||(this.visible=!0,this.el.style.pointerEvents="auto",this.el.style.opacity="1")}hide(){this.visible&&(this.visible=!1,this.el.style.pointerEvents="none",this.el.style.opacity="0")}onTap(e){this.tapHandler&&this.el.removeEventListener("pointerdown",this.tapHandler),this.tapHandler=t=>{t.preventDefault(),e()},this.el.addEventListener("pointerdown",this.tapHandler,{passive:!1})}dispose(){this.tapHandler&&(this.el.removeEventListener("pointerdown",this.tapHandler),this.tapHandler=null),this.el.remove()}}class Qy{constructor(e){R(this,"audio",new Zy);R(this,"audioHint",new Jy("Tap to enable sound"));R(this,"audioArmed",!1);this.params=e,this.audioHint.onTap(async()=>{this.audioArmed||(await this.audio.enable(),this.audioArmed=!0,this.audioHint.hide(),this.updateState())})}updateHint(){if(!this.params.audioEnabled){this.audioHint.hide();return}this.audioArmed||this.audioHint.show()}async updateState(){if(this.audioArmed){if(!this.params.audioEnabled||document.hidden){this.audio.suspend();return}this.audio.resume()}}updateFrame(e,t){this.params.audioEnabled&&this.audioArmed&&!document.hidden?(this.audio.setMasterVolume(this.params.masterVolume),this.audio.update(e,t)):this.audioArmed&&this.audio.setMasterVolume(0)}dispose(){this.audioHint.dispose(),this.audio.close()}}class eM{constructor(e,t){R(this,"textureMatrix",new Ie);R(this,"mirrorCamera",new kt);R(this,"renderTarget");R(this,"_bias",new Ie().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1));R(this,"_normal",new T(0,1,0));R(this,"_reflectorWorldPos",new T);R(this,"_cameraWorldPos",new T);R(this,"_rotationMatrix",new Ie);R(this,"_lookAtPos",new T(0,0,-1));R(this,"_view",new T);R(this,"_target",new T);R(this,"_mirrorPlane",new di);R(this,"_clipPlane",new Ke);R(this,"_q",new Ke);R(this,"_hidePrev",[]);R(this,"_clipBias");const n=Math.max(16,Math.floor(t.size)),s=!!t.generateMipmaps,o=!!e.extensions.get("EXT_color_buffer_float")||!!e.extensions.get("EXT_color_buffer_half_float")?wn:dn,a=new Vt(n,n,{format:qt,type:o,depthBuffer:!0,stencilBuffer:!1,minFilter:s?an:et,magFilter:et});a.texture.name="PlanarReflectionRT",a.texture.flipY=!1,a.texture.colorSpace=wt,a.texture.generateMipmaps=s,e.capabilities.isWebGL2&&typeof t.multisample=="number"&&(a.samples=Math.max(0,Math.floor(t.multisample))),this.renderTarget=a,this._clipBias=t.clipBias??9e-4}setSize(e){const t=Math.max(16,Math.floor(e));this.renderTarget.setSize(t,t)}dispose(){this.renderTarget.dispose()}update(e,t,n,s,r=[]){if(n.updateMatrixWorld(),this._cameraWorldPos.setFromMatrixPosition(n.matrixWorld),this._reflectorWorldPos.set(this._cameraWorldPos.x,s,this._cameraWorldPos.z),this._view.subVectors(this._reflectorWorldPos,this._cameraWorldPos),this._view.dot(this._normal)>0)return;this._view.reflect(this._normal).negate(),this._view.add(this._reflectorWorldPos),this._rotationMatrix.extractRotation(n.matrixWorld),this._lookAtPos.set(0,0,-1),this._lookAtPos.applyMatrix4(this._rotationMatrix),this._lookAtPos.add(this._cameraWorldPos),this._target.subVectors(this._reflectorWorldPos,this._lookAtPos),this._target.reflect(this._normal).negate(),this._target.add(this._reflectorWorldPos);const o=this.mirrorCamera;o.position.copy(this._view),o.up.set(0,1,0),o.up.applyMatrix4(this._rotationMatrix),o.up.reflect(this._normal),o.lookAt(this._target),o.near=n.near,o.far=n.far,o.aspect=n.aspect,o.fov=n.fov,o.updateMatrixWorld(),o.matrixWorldInverse.copy(o.matrixWorld).invert(),o.projectionMatrix.copy(n.projectionMatrix),this.textureMatrix.copy(this._bias),this.textureMatrix.multiply(o.projectionMatrix),this.textureMatrix.multiply(o.matrixWorldInverse),this._mirrorPlane.setFromNormalAndCoplanarPoint(this._normal,this._reflectorWorldPos),this._mirrorPlane.applyMatrix4(o.matrixWorldInverse),this._clipPlane.set(this._mirrorPlane.normal.x,this._mirrorPlane.normal.y,this._mirrorPlane.normal.z,this._mirrorPlane.constant);const l=o.projectionMatrix.elements;this._q.x=(Math.sign(this._clipPlane.x)+l[8])/l[0],this._q.y=(Math.sign(this._clipPlane.y)+l[9])/l[5],this._q.z=-1,this._q.w=(1+l[10])/l[14];const c=2/this._clipPlane.dot(this._q);this._clipPlane.multiplyScalar(c),l[2]=this._clipPlane.x,l[6]=this._clipPlane.y,l[10]=this._clipPlane.z+1-this._clipBias,l[14]=this._clipPlane.w;const h=e.getRenderTarget(),u=e.xr.enabled,d=e.shadowMap.autoUpdate,f=e.toneMapping,g=r.length;this._hidePrev.length=g;for(let _=0;_<g;_++){const m=r[_];this._hidePrev[_]=m.visible,m.visible=!1}try{e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.toneMapping=Kn,e.setRenderTarget(this.renderTarget),e.clear(),e.render(t,o)}finally{e.setRenderTarget(h),e.toneMapping=f,e.xr.enabled=u,e.shadowMap.autoUpdate=d;for(let _=0;_<g;_++)r[_].visible=this._hidePrev[_]}}}class tM{constructor(e,t,n){R(this,"planarRefl",null);R(this,"reflUpdatesPerSec",0);R(this,"reflSizeTarget",0);R(this,"reflTimer_s",0);R(this,"reflUpdateCount",0);R(this,"reflRateTimer_s",0);R(this,"reflLadder",[]);R(this,"reflSizeIndex",0);R(this,"reflScaleCooldown_s",0);R(this,"prevCamPos",new T);R(this,"prevCamQuat",new at);R(this,"camMotion",1);this.renderer=e,this.oceanMat=t,this.hideList=n}rebuild(e){var s;(s=this.planarRefl)==null||s.dispose(),this.planarRefl=null,this.reflLadder=nM(e.quality),this.reflSizeIndex=Math.max(0,this.reflLadder.length-1);const t=iM(e.quality,this.reflLadder);if(this.reflSizeTarget=t,this.reflScaleCooldown_s=0,this.reflTimer_s=0,this.reflUpdateCount=0,this.reflRateTimer_s=0,this.reflUpdatesPerSec=0,t<=0){this.oceanMat.bindPlanarReflection(null,null),this.oceanMat.setPlanarReflectionStrength(0);return}const n=!Es&&(e.quality==="High"||e.quality==="Max");this.planarRefl=new eM(this.renderer,{size:t,generateMipmaps:n,clipBias:.0012}),this.oceanMat.setPlanarReflectionSampling({texel:1/t,blur:0,edgeFade:.02}),this.oceanMat.bindPlanarReflection(this.planarRefl.renderTarget.texture,this.planarRefl.textureMatrix)}update(e){if(!this.planarRefl||e.underwater){this.oceanMat.setPlanarReflectionStrength(0);return}const{dt:t,params:n,scene:s,camera:r,tideHeight_m:o,storminess:a,foamBoost:l,lightningFlashFx:c,dtEma_s:h}=e;if(this.reflScaleCooldown_s=Math.max(0,this.reflScaleCooldown_s-t),this.reflScaleCooldown_s<=0&&this.reflLadder.length>1){const b=h*1e3,y=b>23.5,A=b<17;y&&this.reflSizeIndex>0?(this.reflSizeIndex--,this.reflScaleCooldown_s=1.25):A&&this.reflSizeIndex<this.reflLadder.length-1&&(this.reflSizeIndex++,this.reflScaleCooldown_s=2);const z=this.reflLadder[this.reflSizeIndex];z!==this.reflSizeTarget&&(this.reflSizeTarget=z,this.planarRefl.setSize(this.reflSizeTarget))}const u=r.position.distanceTo(this.prevCamPos),d=Math.abs(this.prevCamQuat.dot(r.quaternion)),f=2*Math.acos(I(d,0,1));this.prevCamPos.copy(r.position),this.prevCamQuat.copy(r.quaternion),this.camMotion=u*45+f*18;const g=this.camMotion<.75,_=b=>b==="Low"?.25:b==="Medium"?.18:b==="High"?.12:.085,m=b=>b==="Low"?.11:b==="Medium"?.065:0,v=c>.05?0:g?_(n.quality):m(n.quality);this.reflTimer_s+=t,this.reflTimer_s>=v&&(this.planarRefl.update(this.renderer,s,r,o,this.hideList),this.reflTimer_s=0,this.reflUpdateCount++),this.reflRateTimer_s+=t,this.reflRateTimer_s>=1&&(this.reflUpdatesPerSec=this.reflUpdateCount/this.reflRateTimer_s,this.reflUpdateCount=0,this.reflRateTimer_s=0);const x=n.quality==="Max"?1:n.quality==="High"?.95:.9,w=I(l*.8+a*.6,0,1),N=I(c*(.35+.65*a),0,.85),E=x*B(1,.62,w)+N;this.oceanMat.setPlanarReflectionStrength(E);const P=(n.quality==="Max"?2.2:n.quality==="High"?1.25:0)*w;this.oceanMat.setPlanarReflectionSampling({texel:1/Math.max(1,this.reflSizeTarget),blur:P,edgeFade:.03})}dispose(){var e;(e=this.planarRefl)==null||e.dispose(),this.planarRefl=null}}function nM(i){return i==="Low"?[256,384]:i==="Medium"?[512]:i==="High"?[768]:[768,1024]}function iM(i,e){return e.length===1||Es?e[0]:Math.min(window.innerWidth,window.innerHeight)>=800?e[1]:e[0]}const _o={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Sr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const sM=new vr(-1,1,1,-1,0,1);class rM extends gt{constructor(){super(),this.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new dt([0,2,0,0,2,0],2))}}const oM=new rM;class Dd{constructor(e){this._mesh=new ht(oM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,sM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class gc extends Sr{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Tt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=fi.clone(e.uniforms),this.material=new Tt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Dd(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class mu extends Sr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class aM extends Sr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class gu{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Z);this._width=n.width,this._height=n.height,t=new Vt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:wn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new gc(_o),this.copyPass.material.blending=yt,this.clock=new bd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}mu!==void 0&&(o instanceof mu?n=!0:o instanceof aM&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Z);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class lM extends Sr{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new te}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const En={defines:{MAX_STEP:0,PERSPECTIVE_CAMERA:!0,DISTANCE_ATTENUATION:!0,FRESNEL:!0,INFINITE_THICK:!1,SELECTIVE:!1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tMetalness:{value:null},tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new Z},cameraProjectionMatrix:{value:new Ie},cameraInverseProjectionMatrix:{value:new Ie},opacity:{value:.5},maxDistance:{value:180},cameraRange:{value:0},thickness:{value:.018}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`
		// precision highp float;
		precision highp sampler2D;
		varying vec2 vUv;
		uniform sampler2D tDepth;
		uniform sampler2D tNormal;
		uniform sampler2D tMetalness;
		uniform sampler2D tDiffuse;
		uniform float cameraRange;
		uniform vec2 resolution;
		uniform float opacity;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform float maxDistance;
		uniform float thickness;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;
		#include <packing>
		float pointToLineDistance(vec3 x0, vec3 x1, vec3 x2) {
			//x0: point, x1: linePointA, x2: linePointB
			//https://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
			return length(cross(x0-x1,x0-x2))/length(x2-x1);
		}
		float pointPlaneDistance(vec3 point,vec3 planePoint,vec3 planeNormal){
			// https://mathworld.wolfram.com/Point-PlaneDistance.html
			//// https://en.wikipedia.org/wiki/Plane_(geometry)
			//// http://paulbourke.net/geometry/pointlineplane/
			float a=planeNormal.x,b=planeNormal.y,c=planeNormal.z;
			float x0=point.x,y0=point.y,z0=point.z;
			float x=planePoint.x,y=planePoint.y,z=planePoint.z;
			float d=-(a*x+b*y+c*z);
			float distance=(a*x0+b*y0+c*z0+d)/sqrt(a*a+b*b+c*c);
			return distance;
		}
		float getDepth( const in vec2 uv ) {
			return texture2D( tDepth, uv ).x;
		}
		float getViewZ( const in float depth ) {
			#ifdef PERSPECTIVE_CAMERA
				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
			#else
				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
			#endif
		}
		vec3 getViewPosition( const in vec2 uv, const in float depth/*clip space*/, const in float clipW ) {
			vec4 clipPosition = vec4( ( vec3( uv, depth ) - 0.5 ) * 2.0, 1.0 );//ndc
			clipPosition *= clipW; //clip
			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;//view
		}
		vec3 getViewNormal( const in vec2 uv ) {
			return unpackRGBToNormal( texture2D( tNormal, uv ).xyz );
		}
		vec2 viewPositionToXY(vec3 viewPosition){
			vec2 xy;
			vec4 clip=cameraProjectionMatrix*vec4(viewPosition,1);
			xy=clip.xy;//clip
			float clipW=clip.w;
			xy/=clipW;//NDC
			xy=(xy+1.)/2.;//uv
			xy*=resolution;//screen
			return xy;
		}
		void main(){
			#ifdef SELECTIVE
				float metalness=texture2D(tMetalness,vUv).r;
				if(metalness==0.) return;
			#endif

			float depth = getDepth( vUv );
			float viewZ = getViewZ( depth );
			if(-viewZ>=cameraFar) return;

			float clipW = cameraProjectionMatrix[2][3] * viewZ+cameraProjectionMatrix[3][3];
			vec3 viewPosition=getViewPosition( vUv, depth, clipW );

			vec2 d0=gl_FragCoord.xy;
			vec2 d1;

			vec3 viewNormal=getViewNormal( vUv );

			#ifdef PERSPECTIVE_CAMERA
				vec3 viewIncidentDir=normalize(viewPosition);
				vec3 viewReflectDir=reflect(viewIncidentDir,viewNormal);
			#else
				vec3 viewIncidentDir=vec3(0,0,-1);
				vec3 viewReflectDir=reflect(viewIncidentDir,viewNormal);
			#endif

			float maxReflectRayLen=maxDistance/dot(-viewIncidentDir,viewNormal);
			// dot(a,b)==length(a)*length(b)*cos(theta) // https://www.mathsisfun.com/algebra/vectors-dot-product.html
			// if(a.isNormalized&&b.isNormalized) dot(a,b)==cos(theta)
			// maxDistance/maxReflectRayLen=cos(theta)
			// maxDistance/maxReflectRayLen==dot(a,b)
			// maxReflectRayLen==maxDistance/dot(a,b)

			vec3 d1viewPosition=viewPosition+viewReflectDir*maxReflectRayLen;
			#ifdef PERSPECTIVE_CAMERA
				if(d1viewPosition.z>-cameraNear){
					//https://tutorial.math.lamar.edu/Classes/CalcIII/EqnsOfLines.aspx
					float t=(-cameraNear-viewPosition.z)/viewReflectDir.z;
					d1viewPosition=viewPosition+viewReflectDir*t;
				}
			#endif
			d1=viewPositionToXY(d1viewPosition);

			float totalLen=length(d1-d0);
			float xLen=d1.x-d0.x;
			float yLen=d1.y-d0.y;
			float totalStep=max(abs(xLen),abs(yLen));
			float xSpan=xLen/totalStep;
			float ySpan=yLen/totalStep;
			for(float i=0.;i<float(MAX_STEP);i++){
				if(i>=totalStep) break;
				vec2 xy=vec2(d0.x+i*xSpan,d0.y+i*ySpan);
				if(xy.x<0.||xy.x>resolution.x||xy.y<0.||xy.y>resolution.y) break;
				float s=length(xy-d0)/totalLen;
				vec2 uv=xy/resolution;

				float d = getDepth(uv);
				float vZ = getViewZ( d );
				if(-vZ>=cameraFar) continue;
				float cW = cameraProjectionMatrix[2][3] * vZ+cameraProjectionMatrix[3][3];
				vec3 vP=getViewPosition( uv, d, cW );

				#ifdef PERSPECTIVE_CAMERA
					// https://comp.nus.edu.sg/~lowkl/publications/lowk_persp_interp_techrep.pdf
					float recipVPZ=1./viewPosition.z;
					float viewReflectRayZ=1./(recipVPZ+s*(1./d1viewPosition.z-recipVPZ));
				#else
					float viewReflectRayZ=viewPosition.z+s*(d1viewPosition.z-viewPosition.z);
				#endif

				// if(viewReflectRayZ>vZ) continue; // will cause "npm run make-screenshot webgl_postprocessing_ssr" high probability hang.
				// https://github.com/mrdoob/three.js/pull/21539#issuecomment-821061164
				if(viewReflectRayZ<=vZ){

					bool hit;
					#ifdef INFINITE_THICK
						hit=true;
					#else
						float away=pointToLineDistance(vP,viewPosition,d1viewPosition);

						float minThickness;
						vec2 xyNeighbor=xy;
						xyNeighbor.x+=1.;
						vec2 uvNeighbor=xyNeighbor/resolution;
						vec3 vPNeighbor=getViewPosition(uvNeighbor,d,cW);
						minThickness=vPNeighbor.x-vP.x;
						minThickness*=3.;
						float tk=max(minThickness,thickness);

						hit=away<=tk;
					#endif

					if(hit){
						vec3 vN=getViewNormal( uv );
						if(dot(viewReflectDir,vN)>=0.) continue;
						float distance=pointPlaneDistance(vP,viewPosition,viewNormal);
						if(distance>maxDistance) break;
						float op=opacity;
						#ifdef DISTANCE_ATTENUATION
							float ratio=1.-(distance/maxDistance);
							float attenuation=ratio*ratio;
							op=opacity*attenuation;
						#endif
						#ifdef FRESNEL
							float fresnelCoe=(dot(viewIncidentDir,viewReflectDir)+1.)/2.;
							op*=fresnelCoe;
						#endif
						vec4 reflectColor=texture2D(tDiffuse,uv);
						gl_FragColor.xyz=reflectColor.xyz;
						gl_FragColor.a=op;
						break;
					}
				}
			}
		}
	`},oo={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 uv ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, uv ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, uv ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			float d = 1.0 - depth;
			// d=(d-.999)*1000.;
			gl_FragColor = vec4( vec3( d ), 1.0 );

		}

	`},ui={uniforms:{tDiffuse:{value:null},resolution:{value:new Z},opacity:{value:.5}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;
		void main() {
			//reverse engineering from PhotoShop blur filter, then change coefficient

			vec2 texelSize = ( 1.0 / resolution );

			vec4 c=texture2D(tDiffuse,vUv);

			vec2 offset;

			offset=(vec2(-1,0))*texelSize;
			vec4 cl=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(1,0))*texelSize;
			vec4 cr=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(0,-1))*texelSize;
			vec4 cb=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(0,1))*texelSize;
			vec4 ct=texture2D(tDiffuse,vUv+offset);

			// float coeCenter=.5;
			// float coeSide=.125;
			float coeCenter=.2;
			float coeSide=.2;
			float a=c.a*coeCenter+cl.a*coeSide+cr.a*coeSide+cb.a*coeSide+ct.a*coeSide;
			vec3 rgb=(c.rgb*c.a*coeCenter+cl.rgb*cl.a*coeSide+cr.rgb*cr.a*coeSide+cb.rgb*cb.a*coeSide+ct.rgb*ct.a*coeSide)/a;
			gl_FragColor=vec4(rgb,a);

		}
	`};class qn extends Sr{constructor({renderer:e,scene:t,camera:n,width:s,height:r,selects:o,bouncing:a=!1,groundReflector:l}){super(),this.width=s!==void 0?s:512,this.height=r!==void 0?r:512,this.clear=!0,this.renderer=e,this.scene=t,this.camera=n,this.groundReflector=l,this.opacity=En.uniforms.opacity.value,this.output=0,this.maxDistance=En.uniforms.maxDistance.value,this.thickness=En.uniforms.thickness.value,this.tempColor=new te,this._selects=o,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(h){this._selects!==h&&(this._selects=h,Array.isArray(h)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=a,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(h){this._bouncing!==h&&(this._bouncing=h,h?this.ssrMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture:this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=En.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(h){this._distanceAttenuation!==h&&(this._distanceAttenuation=h,this.ssrMaterial.defines.DISTANCE_ATTENUATION=h,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=En.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(h){this._fresnel!==h&&(this._fresnel=h,this.ssrMaterial.defines.FRESNEL=h,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=En.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(h){this._infiniteThick!==h&&(this._infiniteThick=h,this.ssrMaterial.defines.INFINITE_THICK=h,this.ssrMaterial.needsUpdate=!0)}});const c=new pr;c.type=gi,c.minFilter=Je,c.magFilter=Je,this.beautyRenderTarget=new Vt(this.width,this.height,{minFilter:Je,magFilter:Je,type:wn,depthTexture:c,depthBuffer:!0}),this.prevRenderTarget=new Vt(this.width,this.height,{minFilter:Je,magFilter:Je}),this.normalRenderTarget=new Vt(this.width,this.height,{minFilter:Je,magFilter:Je,type:wn}),this.metalnessRenderTarget=new Vt(this.width,this.height,{minFilter:Je,magFilter:Je,type:wn}),this.ssrRenderTarget=new Vt(this.width,this.height,{minFilter:Je,magFilter:Je}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),this.ssrMaterial=new Tt({defines:Object.assign({},En.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:fi.clone(En.uniforms),vertexShader:En.vertexShader,fragmentShader:En.fragmentShader,blending:yt}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Bv,this.normalMaterial.blending=yt,this.metalnessOnMaterial=new ln({color:"white"}),this.metalnessOffMaterial=new ln({color:"black"}),this.blurMaterial=new Tt({defines:Object.assign({},ui.defines),uniforms:fi.clone(ui.uniforms),vertexShader:ui.vertexShader,fragmentShader:ui.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new Tt({defines:Object.assign({},ui.defines),uniforms:fi.clone(ui.uniforms),vertexShader:ui.vertexShader,fragmentShader:ui.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Tt({defines:Object.assign({},oo.defines),uniforms:fi.clone(oo.uniforms),vertexShader:oo.vertexShader,fragmentShader:oo.fragmentShader,blending:yt}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Tt({uniforms:fi.clone(_o.uniforms),vertexShader:_o.vertexShader,fragmentShader:_o.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:lr,blendDst:cr,blendEquation:Yn,blendSrcAlpha:lr,blendDstAlpha:cr,blendEquationAlpha:Yn}),this.fsQuad=new Dd(null),this.originalClearColor=new te}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,t){switch(e.setRenderTarget(this.beautyRenderTarget),e.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),e.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this.renderMetalness(e,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.renderPass(e,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this.renderPass(e,this.blurMaterial,this.blurRenderTarget),this.renderPass(e,this.blurMaterial2,this.blurRenderTarget2)),this.output){case qn.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=Rn,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=yt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=Rn,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t));break;case qn.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=yt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=Rn,this.renderPass(e,this.copyMaterial,this.prevRenderTarget));break;case qn.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case qn.OUTPUT.Depth:this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case qn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=yt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case qn.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=yt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}renderPass(e,t,n,s,r){this.originalClearColor.copy(e.getClearColor(this.tempColor));const o=e.getClearAlpha(this.tempColor),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}renderOverride(e,t,n,s,r){this.originalClearColor.copy(e.getClearColor(this.tempColor));const o=e.getClearAlpha(this.tempColor),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}renderMetalness(e,t,n,s,r){this.originalClearColor.copy(e.getClearColor(this.tempColor));const o=e.getClearAlpha(this.tempColor),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.traverseVisible(l=>{l._SSRPassBackupMaterial=l.material,this._selects.includes(l)?l.material=this.metalnessOnMaterial:l.material=this.metalnessOffMaterial}),e.render(this.scene,this.camera),this.scene.traverseVisible(l=>{l.material=l._SSRPassBackupMaterial}),e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}setSize(e,t){this.width=e,this.height=t,this.ssrMaterial.defines.MAX_STEP=Math.sqrt(e*e+t*t),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(e,t),this.prevRenderTarget.setSize(e,t),this.ssrRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.metalnessRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.blurRenderTarget2.setSize(e,t),this.ssrMaterial.uniforms.resolution.value.set(e,t),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t),this.blurMaterial2.uniforms.resolution.value.set(e,t)}}qn.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7};function _u(i){return Math.max(0,Math.min(1,i))}function vu(i,e){let t=i-e;return t-=Math.round(t),t}function cM(i){const e=Math.max(32,Math.floor(i.size)),t=Math.max(2,Math.floor(i.cells)),n=Dn(i.seed),s=new Float32Array(t*t),r=new Float32Array(t*t);for(let l=0;l<t;l++)for(let c=0;c<t;c++){const h=l*t+c;s[h]=n(),r[h]=n()}const o=new Uint8Array(e*e*4);for(let l=0;l<e;l++){const c=l/e;for(let h=0;h<e;h++){const u=h/e,d=Math.floor(u*t),f=Math.floor(c*t);let g=1e9,_=1e9;for(let w=-1;w<=1;w++)for(let N=-1;N<=1;N++){let E=d+N,C=f+w;E=(E%t+t)%t,C=(C%t+t)%t;const P=C*t+E,b=(E+s[P])/t,y=(C+r[P])/t,A=vu(u,b),z=vu(c,y),O=Math.sqrt(A*A+z*z);O<g?(_=g,g=O):O<_&&(_=O)}const m=Math.max(0,_-g);let p=Math.exp(-m*42);p=Math.pow(p,1.55),p=_u(p),p=_u((p-.18)*1.28+.18);const v=Math.max(0,Math.min(255,Math.round(p*255))),x=(l*e+h)*4;o[x+0]=v,o[x+1]=v,o[x+2]=v,o[x+3]=255}}const a=new Bi(o,e,e);return a.name="CausticsTexture",a.flipY=!1,a.colorSpace=xn,a.wrapS=un,a.wrapT=un,a.generateMipmaps=!0,a.minFilter=an,a.magFilter=et,a.needsUpdate=!0,a}const hM=cM({size:256,seed:771233,cells:10}),uM={uniforms:{tDiffuse:{value:null},tDepth:{value:null},u_time:{value:0},u_underwater:{value:0},u_hasDepth:{value:1},u_cameraNear:{value:.1},u_cameraFar:{value:1e3},u_invProj:{value:new Ie},u_invView:{value:new Ie},u_sunUv:{value:new Z(.5,.5)},u_sunInView:{value:1},u_sunIntensity:{value:1},u_sunColor:{value:new te("#ffffff")},u_clarity:{value:.7},u_waterLevel:{value:0},u_resolution:{value:new Z(1,1)},u_caustics:{value:hM}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    precision highp float;

    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;

    uniform float u_time;
    uniform float u_underwater;

    uniform float u_hasDepth;
    uniform float u_cameraNear;
    uniform float u_cameraFar;
    uniform mat4 u_invProj;
    uniform mat4 u_invView;

    uniform vec2 u_sunUv;
    uniform float u_sunInView;
    uniform float u_sunIntensity;
    uniform vec3 u_sunColor;

    uniform float u_clarity;
    uniform float u_waterLevel;
    uniform vec2 u_resolution;

    uniform sampler2D u_caustics;

    varying vec2 vUv;

    float saturate(float x) { return clamp(x, 0.0, 1.0); }

    // Reconstruct view-space position from depth.
    vec3 reconstructViewPos(vec2 uv, float depth01) {
      vec4 clip = vec4(uv * 2.0 - 1.0, depth01 * 2.0 - 1.0, 1.0);
      vec4 view = u_invProj * clip;
      return view.xyz / max(1e-6, view.w);
    }

    vec3 reconstructWorldPos(vec3 viewPos) {
      vec4 w = u_invView * vec4(viewPos, 1.0);
      return w.xyz;
    }

    float luma(vec3 c) {
      return dot(c, vec3(0.2126, 0.7152, 0.0722));
    }

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);

      float uw = saturate(u_underwater);
      if (uw < 0.001) {
        gl_FragColor = base;
        return;
      }

      float hasDepth = step(0.5, u_hasDepth);
      float depth01 = hasDepth > 0.5 ? texture2D(tDepth, vUv).x : 1.0;

      vec3 viewPos = vec3(0.0, 0.0, -25.0);
      vec3 worldPos = vec3(0.0);
      float viewDist = 25.0;

      if (hasDepth > 0.5) {
        viewPos = reconstructViewPos(vUv, depth01);
        viewDist = length(viewPos);
        worldPos = reconstructWorldPos(viewPos);
      } else {
        // Fallback: a gentle depth gradient (still better than nothing).
        viewDist = mix(12.0, 120.0, saturate(vUv.y));
      }

      float clarity = saturate(u_clarity);

      // Approx depth below the surface (meters). Only meaningful when we have worldPos.
      float depthBelow = hasDepth > 0.5 ? max(0.0, u_waterLevel - worldPos.y) : 0.0;

      // --- Subtle refraction shimmer near the surface ---
      float surfaceProx = exp(-depthBelow * mix(0.35, 0.14, clarity));
      float distortAmt = uw * surfaceProx * 0.004;
      vec2 dUv = vUv;
      // Use caustics texture as a stable distortion noise.
      float dA = texture2D(u_caustics, vUv * 1.15 + vec2(u_time * 0.032, u_time * 0.021)).r;
      float dB = texture2D(u_caustics, vUv * 1.15 + vec2(-u_time * 0.027, u_time * 0.018) + vec2(0.37, 0.11)).r;
      dUv += (vec2(dA, dB) - 0.5) * distortAmt;
      vec3 col = texture2D(tDiffuse, dUv).rgb;

      // --- Beer–Lambert absorption + in-scattering ---
      // Tuned for meters-as-units.
      float absorb = mix(0.20, 0.075, clarity);
      float scatter = mix(0.33, 0.12, clarity);
      float att = exp(-absorb * viewDist);
      float sca = 1.0 - exp(-scatter * viewDist);

      // Water body scatter color (turbid -> greener, clear -> bluer).
      vec3 waterClear = vec3(0.06, 0.26, 0.36);
      vec3 waterTurbid = vec3(0.05, 0.20, 0.16);
      vec3 waterCol = mix(waterTurbid, waterClear, clarity);

      col = col * att + waterCol * sca * 0.88;

      // --- Caustics (projected in world XZ, fades quickly with depth) ---
      if (hasDepth > 0.5) {
        float sunI = saturate(u_sunIntensity);
        float caFade = exp(-depthBelow * mix(0.28, 0.10, clarity));
        float caStrength = uw * sunI * caFade * (0.20 + 0.80 * clarity);

        // World-space projected caustics. Two layers for richer motion.
        float s1 = mix(0.095, 0.13, clarity);
        float s2 = s1 * 1.47;

        vec2 uv1 = worldPos.xz * s1 + vec2(u_time * 0.055, -u_time * 0.043);
        vec2 uv2 = worldPos.xz * s2 + vec2(-u_time * 0.031, u_time * 0.062) + vec2(13.7, -8.2);

        float c1 = texture2D(u_caustics, uv1).r;
        float c2 = texture2D(u_caustics, uv2).r;
        float ca = pow(saturate(c1 * 0.72 + c2 * 0.28), 1.7);
        ca = smoothstep(0.22, 0.98, ca);

        // Caustics are warmer near sunset, but still water-filtered.
        vec3 caCol = mix(waterCol, u_sunColor, 0.72);
        col += caCol * ca * caStrength * 0.85;
      }

      // --- Sun shafts (cheap radial blur toward projected sun) ---
      float sunInView = saturate(u_sunInView);
      float sunI = saturate(u_sunIntensity);

      if (sunInView > 0.5 && sunI > 0.02) {
        vec2 delta = u_sunUv - vUv;
        float distToSun = length(delta);

        // Fade shafts as you get farther from the sun.
        float sunFall = exp(-distToSun * 3.3);

        // A little stronger in slightly turbid water.
        float turb = 1.0 - clarity;
        float shaftStrength = uw * sunI * (0.06 + 0.32 * turb);

        const int SAMPLES = 10;
        vec2 stepUV = delta * (0.85 / float(SAMPLES));
        vec2 uv = vUv;
        float acc = 0.0;
        float wsum = 0.0;

        for (int i = 0; i < SAMPLES; i++) {
          uv += stepUV;
          vec3 s = texture2D(tDiffuse, uv).rgb;
          float lum = luma(s);
          float b = smoothstep(0.62, 1.0, lum);
          float w = 1.0 - float(i) / float(SAMPLES);
          acc += b * w;
          wsum += w;
        }

        acc /= max(1e-6, wsum);

        vec3 shaftCol = mix(waterCol, u_sunColor, 0.62);
        col += shaftCol * acc * shaftStrength * sunFall;

        // Soft halo around the sun position.
        float halo = exp(-distToSun * distToSun * 55.0);
        col += shaftCol * halo * uw * sunI * 0.10;
      }

      // Clamp to avoid blowing out on mobile tone mapping.
      col = min(col, vec3(4.0));

      vec3 outCol = mix(base.rgb, col, uw);
      gl_FragColor = vec4(outCol, base.a);
    }
  `};class dM extends gc{constructor(){super(uM)}render(e,t,n,s,r){const o=(n==null?void 0:n.depthTexture)??null;this.uniforms.tDepth.value=o,this.uniforms.u_hasDepth.value=o?1:0,super.render(e,t,n,s,r)}}const fM={uniforms:{tDiffuse:{value:null},u_time:{value:0},u_grain:{value:.03},u_vignette:{value:.22},u_saturation:{value:1.08},u_contrast:{value:1.06},u_warmth:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float u_time;
    uniform float u_grain;
    uniform float u_vignette;
    uniform float u_saturation;
    uniform float u_contrast;
    uniform float u_warmth;

    varying vec2 vUv;

    float hash(vec2 p) {
      // Simple, fast hash for grain.
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    void main() {
      vec4 col = texture2D(tDiffuse, vUv);

      // Contrast
      col.rgb = (col.rgb - 0.5) * u_contrast + 0.5;

      // Saturation
      float l = dot(col.rgb, vec3(0.2126, 0.7152, 0.0722));
      col.rgb = mix(vec3(l), col.rgb, u_saturation);

      // Warmth (sunset grade)
      col.rgb += u_warmth * vec3(0.06, 0.03, -0.02);

      // Vignette
      float d = distance(vUv, vec2(0.5));
      float vig = smoothstep(0.82, 0.35, d);
      col.rgb *= mix(1.0 - u_vignette, 1.0, vig);

      // Film grain (very subtle)
      float n = hash(vUv * vec2(1920.0, 1080.0) + u_time * 1.7);
      col.rgb += (n - 0.5) * (u_grain * 0.08);

      gl_FragColor = col;
    }
  `};function _c(i,e){var a,l,c,h;if(i!=null&&i.composer)try{(l=(a=i.composer).dispose)==null||l.call(a)}catch{}(h=(c=i==null?void 0:i.composerDepthTex)==null?void 0:c.dispose)==null||h.call(c);let t=null,n=null,s=null,r=null,o=null;if(e.params.quality==="Low")return{composer:t,ssrPass:n,underwaterPass:s,gradePass:r,composerDepthTex:o};try{if(e.renderer.capabilities.isWebGL2||!!e.renderer.extensions.get("WEBGL_depth_texture")){o=new pr(window.innerWidth,window.innerHeight),o.format=pi,o.type=gi,o.minFilter=Je,o.magFilter=Je,o.generateMipmaps=!1;const d=new Vt(window.innerWidth,window.innerHeight,{format:qt,type:dn,depthBuffer:!0,stencilBuffer:!1});d.texture.name="ComposerRT",d.depthTexture=o,t=new gu(e.renderer,d);try{const f=t.renderTarget2;if(f&&!f.depthTexture){const g=new pr(window.innerWidth,window.innerHeight);g.name="ComposerDepthTex2",g.format=pi,g.type=gi,g.minFilter=Je,g.magFilter=Je,g.generateMipmaps=!1,f.depthTexture=g,f.depthBuffer=!0}}catch{}}else t=new gu(e.renderer);if(t.setSize(window.innerWidth,window.innerHeight),t.addPass(new lM(e.scene,e.camera)),e.params.quality==="Max"&&!Es)try{n=new qn({renderer:e.renderer,scene:e.scene,camera:e.camera,width:window.innerWidth,height:window.innerHeight,groundReflector:null,selects:[e.ocean]}),n.opacity=.18,n.maxDistance=420,n.thickness=.018,n.infiniteThick=!1,t.addPass(n)}catch(d){console.warn("[Max] SSR init failed; continuing without SSR.",d),n=null}s=new dM,s.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),t.addPass(s),r=new gc(fM),t.addPass(r)}catch(u){console.warn("PostFX init failed; falling back to standard renderer.",u),t=null,n=null,s=null,r=null,o=null}return{composer:t,ssrPass:n,underwaterPass:s,gradePass:r,composerDepthTex:o}}function pM(i){const e=I(i,1,365),t=2*Math.PI*(e-81)/365;return Li(23.44)*Math.sin(t)}function xu(i,e,t){const n=Math.sin(i),s=Math.cos(i),r=Math.sin(e),o=Math.cos(e),a=Math.cos(t),l=Math.sin(t),c=n*r+s*o*a,h=Math.asin(I(c,-1,1)),u=Math.max(1e-6,Math.cos(h)),d=-l*o/u,f=(r-Math.sin(h)*n)/(u*s+1e-6),g=Math.atan2(d,f);return{alt:h,az:g}}function yu(i,e){const t=Math.cos(i),n=t*Math.sin(e),s=Math.sin(i),r=t*Math.cos(e);return[n,s,r]}function mM(i){const e=Li(I(i.latitude_deg,-89.9,89.9)),t=pM(i.dayOfYear),n=(i.timeOfDay_h%24+24)%24,s=Li((n-12)*15),r=xu(e,t,s),o=yu(r.alt,r.az),a=(i.moonPhase%1+1)%1,l=s+a*2*Math.PI,c=t*.6,h=xu(e,c,l),u=yu(h.alt,h.az),d=Kh(-.02,.15,r.alt),f=Kh(-.05,.08,h.alt)*(1-d*.85),g=I(i.moonDistanceMultiplier,.5,2),_=1/(g*g*g);return{sunDir:o,moonDir:u,sunElevation_rad:r.alt,moonElevation_rad:h.alt,sunIntensity:d,moonIntensity:f,tideScale:_}}const Zt=9.81;function gM(i,e){const t=Math.max(0,i),n=_M(t),s=t*Math.sqrt(n),o=e*Math.PI/180+Math.PI;return{Ug:t,U10:t,Cd:n,uStar:s,windDirTo_rad:o}}function _M(i){const e=.001*(1.1+.035*i);return I(e,8e-4,.0045)}function vM(i,e,t){const n=Math.max(1e-6,i.uStar),s=Math.max(1,e.stormRadius_km*1e3*2*I(e.fetchUtilization,.05,1)),r=Math.max(0,e.stormAge_h),o=I(e.windRamp_h,0,24),l=Math.max(0,r-.5*o)*3600,c=.00523*Math.pow(Zt*l/n,1.5),h=n*n/Zt*c,u=Math.max(1,Math.min(s,h)),d=Zt*u/(n*n);let f=n*n/Zt*(.0413*Math.pow(d,.5)),g=n/Zt*(.651*Math.pow(d,1/3));const _=n*n/Zt*211.5,m=n/Zt*239.8;f=Math.min(f,_),g=Math.min(g,m);const p=Math.max(.5,t.depth_m),v=9.78*Math.sqrt(p/Zt);return g=Math.min(g,v),f=Math.min(f,.6*p),{Hs_m:f,Tp_s:g,fetchEffective_m:u,fetchGeom_m:s,fetchFromDuration_m:h}}function xM(i,e){const t=Math.max(.5,e),n=i*i;let s=Math.max(1e-6,n/Zt);for(let r=0;r<12;r++){const o=s*t,a=Math.tanh(o),l=Zt*s*a-n,c=1/Math.cosh(o),h=t*c*c,u=Zt*(a+s*h),d=l/Math.max(1e-9,u);if(s-=d,Math.abs(d)<1e-7)break}return Math.max(1e-6,s)}function Nd(i,e,t,n){if(i<=0)return 0;const s=i<=e?.07:.09,r=Math.exp(-Math.pow(i-e,2)/(2*s*s*e*e));return t*(Zt*Zt)*Math.pow(2*Math.PI,-4)*Math.pow(i,-5)*Math.exp(-1.25*Math.pow(e/i,4))*Math.pow(n,r)}function yM(i,e,t,n,s){const r=Math.pow(i/4,2);if(r<=0)return 0;const o=2048,a=(s-n)/o;let l=0;for(let c=0;c<o;c++){const h=n+(c+.5)*a;l+=Nd(h,e,1,t)*a}return l<=1e-12?0:r/l}function Ba(i){const e=Math.max(0,Math.floor(i.waveCount));if(e<=0)return[];const t=Math.max(0,i.Hs_m),n=Math.max(1e-6,i.fp_hz),s=Math.max(.01,Math.min(i.fmin_hz,i.fmax_hz*.999)),r=Math.max(s*1.05,i.fmax_hz),o=I(i.gamma,1,7),a=yM(t,n,o,s,r),l=Math.log(s),c=Math.log(r),h=[];for(let u=0;u<e;u++){const d=(u+.5)/e,f=Math.exp(l+(c-l)*d),g=I(1+.08*Jh(i.seed+i.seedOffset+u*13,i.seed+i.seedOffset+u*29),.75,1.25),_=I(f*g,s,r),m=2*Math.PI*_,p=xM(m,i.depth_m),v=Math.exp(l+(c-l)*Math.max(0,(u-.5)/e)),x=Math.exp(l+(c-l)*Math.min(1,(u+1.5)/e)),w=Math.max(1e-6,.5*(x-v)),N=Nd(_,n,a,o),E=Math.sqrt(Math.max(0,2*N*w)),C=Jh(i.seed+i.seedOffset+u*17,i.seed+i.seedOffset+u*37)*i.spread_rad,P=i.dirTo_rad+C,b=Math.cos(P),y=Math.sin(P),A=2*Math.PI*((i.seed+i.seedOffset+u*91)*1e-4%1),z=1/Math.max(1e-6,p*E*Math.max(1,e)),O=I(i.choppiness*z,0,1);h.push({dirX:b,dirZ:y,A:E,k:p,omega:m,phase:A,Q:O})}return h}function Mu(i){const e=Math.floor(I(i.waveCount,4,48)),t=Math.max(0,i.Hs_m),n=Math.max(.5,i.Tp_s),s=1/n,r=I(i.swellVariance??.33,0,.85),o=Math.pow(t/4,2),a=o*r,l=Math.max(0,o-a),c=4*Math.sqrt(Math.max(0,a)),h=4*Math.sqrt(Math.max(0,l)),u=Math.max(2,Math.min(e-8,Math.round(e*.3))),d=Math.max(4,e-u),f=I(i.directionalSpread,0,1),g=Li(10+110*f),_=Li(4+28*f),m=Math.max(.03,.25*s),p=Math.max(m*1.1,8*s),x=1/I(n*(1.35+.45*r),5,22),w=Math.max(.015,.18*x),N=Math.max(w*1.1,Math.min(.95*s,1.6*x)),E=I(i.gamma,1,7),C=I(1+.25*(E-1),1,2),P=i.windDirTo_rad,b=i.swellDirTo_rad??i.windDirTo_rad,y=I(i.choppiness,0,2),A=I(i.choppiness*.55,0,1.25),z=I((f-.55)/.45,0,1);let O;if(z<.01)O=Ba({Hs_m:h,fp_hz:s,fmin_hz:m,fmax_hz:p,gamma:E,dirTo_rad:P,spread_rad:g,choppiness:y,depth_m:i.depth_m,waveCount:d,seed:i.seed,seedOffset:0});else{const $=[{dir:P,w:(1-z)*1+z*.42,seedOffset:0,chop:y},{dir:P+Math.PI*.5,w:z*.22,seedOffset:2e3,chop:y*.95},{dir:P-Math.PI*.5,w:z*.22,seedOffset:4e3,chop:y*.95},{dir:P+Math.PI,w:z*.18,seedOffset:6e3,chop:y*.8}],W=$.reduce((Me,X)=>Me+Math.max(0,X.w),0),j=W>1e-6?1/W:1,Y=$.map(Me=>d*Math.max(0,Me.w)*j),le=Y.map(Me=>Math.max(1,Math.floor(Me)));let _e=d-le.reduce((Me,X)=>Me+X,0);const de=Y.map((Me,X)=>({i:X,f:Me-Math.floor(Me)}));de.sort((Me,X)=>X.f-Me.f);let Ce=0;for(;_e>0;)le[de[Ce%de.length].i]+=1,_e--,Ce++;for(;_e<0;){let Me=-1,X=1/0;for(let Q=0;Q<$.length;Q++)le[Q]>1&&$[Q].w<X&&(Me=Q,X=$[Q].w);if(Me<0)break;le[Me]-=1,_e++}O=[];for(let Me=0;Me<$.length;Me++){const X=$[Me],Q=l*(Math.max(0,X.w)*j),he=4*Math.sqrt(Math.max(0,Q));if(he<=0||le[Me]<=0)continue;const fe=Li(12+80*z);O.push(...Ba({Hs_m:he,fp_hz:s,fmin_hz:m,fmax_hz:p,gamma:E,dirTo_rad:X.dir,spread_rad:fe,choppiness:I(X.chop,0,2),depth_m:i.depth_m,waveCount:le[Me],seed:i.seed,seedOffset:X.seedOffset}))}}const q=Ba({Hs_m:c,fp_hz:x,fmin_hz:w,fmax_hz:N,gamma:C,dirTo_rad:b,spread_rad:_,choppiness:A,depth_m:i.depth_m,waveCount:u,seed:i.seed,seedOffset:10007});return[...O,...q]}const MM=new T,SM=new T,ao=new T,wM=new T,Su=new T,wu=new Z,bu=new Z,Au=new Z,Ai=new Z,za=new Z,Tu=new T,Js=new T,bM={height_m:0,normal:new T,disp:new T,slope:0},AM=new T,TM=new T,EM=new te("#052436"),CM=new te("#0a3a32"),RM=new te("#062b3f"),Eu=new te,PM=new te("#6a86a8"),IM=new te("#f2b17b"),LM=new te("#3a445c"),DM=new te("#05070c"),Cu=new te;function NM(i){const e=new bd;let t=document.hidden,n=999,s=1/60,r=1/60,o=0,a=0,l=0,c=0,h=-1,u=-1,d=-1;const f=new T(0,1,0);let g=0,_=0,m=0,p=0,v=0,x=bl(i.params.latitude_deg,12);function w(){t=document.hidden,t?e.stop():(e.start(),s=1/60,r=1/60,o=0),i.audio.updateState()}document.addEventListener("visibilitychange",w),w();const N={resetPerfStats:()=>{s=1/60,r=1/60,o=0,a=0},resetEnvTimers:()=>{l=0,n=999,h=-1,u=-1,d=-1},onContextRestored:()=>{w()},onContextLost:()=>{t=!0,e.stop()}};function E(){if(requestAnimationFrame(E),t||i.contextLost)return;const C=e.getDelta(),P=Math.min(.05,Math.max(0,C));i.simTime_s+=P;const b=1-Math.exp(-P/.25);s=B(s,P,b);const y=1-Math.exp(-P/1.2);if(r=B(r,P,y),a>0&&(a=Math.max(0,a-P)),i.params.quality!=="Low"){const Ye=Es?.03571428571428571:.03125,M=Es?4.5:7;if(r>Ye?o+=P:o=Math.max(0,o-P*.5),o>=M&&a<=0){const U=i.params.quality==="Max"?"High":i.params.quality==="High"?"Medium":"Low";i.setQuality(U),o=0,a=12}}else o=0;i.params.gameStarted?i.timeOfDay_h=(i.timeOfDay_h+P/3600)%24:(i.timeOfDay_h=i.params.timeOfDay_h,i.dayOfYear=i.params.dayOfYear);const A=i.weatherSim.update(P,{latitude_deg:i.params.latitude_deg,longitude_deg:i.params.longitude_deg,dayOfYear:i.dayOfYear,timeOfDay_h:i.timeOfDay_h,coastProximity:i.params.coastProximity,precipChance_pct:i.params.precipChance_pct,stormsIn2to4hChance_pct:i.params.stormsIn2to4hChance_pct,verticalWindShear_mps:i.params.verticalWindShear_mps,hurricaneChanceAdjust_pct:i.params.hurricaneChanceAdjust_pct}),z=Dx(i.params.moonPhaseName),O=mM({latitude_deg:i.params.latitude_deg,dayOfYear:i.dayOfYear,timeOfDay_h:i.timeOfDay_h,moonPhase:z,moonDistanceMultiplier:i.params.moonDistanceMultiplier}),q=MM.set(O.sunDir[0],O.sunDir[1],O.sunDir[2]).normalize(),$=SM.set(O.moonDir[0],O.moonDir[1],O.moonDir[2]).normalize(),W=I(1-O.sunIntensity,0,1),j=I(1-I((O.sunElevation_rad+.04)/.35,0,1),0,1),Y=12.42*3600,le=i.simTime_s/Y*Math.PI*2,_e=B(.35,1.25,I(i.params.coastProximity,0,1)),de=Math.sin(le)*_e*O.tideScale,Ce=I(A.cloudCover,0,1);i.skyUniforms.rayleigh.value=B(.65,2.7,1-Ce)*B(1,.55,j),i.skyUniforms.turbidity.value=B(6,16,Ce)+j*B(2,10,1-Ce),i.skyUniforms.mieCoefficient.value=B(.004,.02,Ce)+j*.012,i.skyUniforms.mieDirectionalG.value=B(.82,.92,Ce)+j*.02,i.skyUniforms.sunPosition.value.copy(q).multiplyScalar(1e4);const Me=O.sunIntensity*(1-.72*Ce),X=I(1-I((O.sunElevation_rad+.02)/.45,0,1),0,1);i.tmpSunColor.set("#ffffff").lerp(i.sunWarmColor,X),i.sunLight.color.copy(i.tmpSunColor),i.sunLight.intensity=B(0,1.35,I(Me,0,1)),i.sunLight.position.copy(q).multiplyScalar(100),i.moonLight.intensity=B(0,.35,O.moonIntensity)*(1-.35*Ce),i.moonLight.position.copy($).multiplyScalar(100),i.ambient.intensity=B(.25,.62,1-W)*B(1,.72,Ce);const Q=I(A.storminess*.85+A.precipIntensity*.65+A.hurricaneIntensity*1,0,1),he=i.params.reduceFlashes?.35:1,fe=B(.03,.85,Math.pow(Q,1.35))*he;if(_*=Math.exp(-P*10.5),v-=P,p<=0&&Math.random()<fe*P&&(p=2+Math.floor(Math.random()*4),v=0),p>0&&v<=0){p-=1,v=B(.05,.18,Math.random()),_=Math.max(_,B(.65,1,Math.random()));const Ye=Math.random()*Math.PI*2,M=B(.33*Math.PI,.49*Math.PI,Math.random());ao.set(Math.cos(Ye)*Math.sin(M),Math.cos(M),Math.sin(Ye)*Math.sin(M)).normalize(),i.lightningDir.copy(ao),i.lightningLight.position.copy(i.camera.position).addScaledVector(ao,220),i.lightningLight.target.position.copy(i.camera.position);const U=Math.random()<B(.25,.6,Q)?2:1;for(let H=0;H<U;H++)i.lightningBolts.spawn({cameraPos:i.camera.position,flashDir:i.lightningDir,storminess:Q,waterLevel:de})}m=_*he;const Oe=m*B(4,32,Q);i.lightningLight.intensity=Oe,i.lightningBolts.update({dt_s:P}),i.sunSprite.position.copy(i.camera.position).addScaledVector(q,4800);const be=i.sunSprite.material;be.opacity=I(Me,0,1),be.color.copy(i.tmpSunColor),i.sunSprite.scale.setScalar(B(420,560,j)),i.moonSprite.position.copy(i.camera.position).addScaledVector($,4600),jy(i.moonSprite.material,z),i.moonSprite.material.opacity=I(O.moonIntensity,0,1),i.stars.position.copy(i.camera.position);const Ne=I(A.storminess*.85+A.precipIntensity*.95+A.hurricaneIntensity*1,0,1),tt=I(W*(1-A.cloudCover)*(1-Ne),0,1);if(i.stars.material.opacity=B(i.stars.material.opacity,tt,I(P*.5,0,1)),g<.02){const Ye=pe=>pe==="Low"?[6,10]:pe==="Medium"?[4,4.8]:pe==="High"?[2,3.2]:[1,2];if(l<=0){const pe=Ye(i.params.quality);l=B(pe[0],pe[1],Math.random())}const M=I(f.dot(q),-1,1);c=Math.acos(M)*180/Math.PI;const U=pe=>pe==="Low"?.65:pe==="Medium"?.45:pe==="High"?.28:.18,H=Math.abs(Ce-(h<0?Ce:h)),V=Math.abs(j-(u<0?j:u)),k=Math.abs(W-(d<0?W:d)),oe=i.params.quality==="Low"?.12:.08,ge=U(i.params.quality),we=c>=ge||H>=oe||V>=.06||k>=.08;if(n+=P,n>=l&&we){const pe=i.pmrem.fromScene(i.sky);i.envRT&&i.envRT.dispose(),i.envRT=pe,i.scene.environment=i.envRT.texture,f.copy(q),h=Ce,u=j,d=W;const Le=Ye(i.params.quality);l=B(Le[0],Le[1],Math.random()),n=0}}else n=l*.85;const D=A.windDirFrom_deg*Math.PI/180+Math.PI,ft=i.params.latitude_deg>=0?Math.PI/4:-Math.PI/4,Xe=D+ft,qe=I(A.windSpeed_mps*.014,0,1.2)+.04*Math.sin(le);bu.set(Math.cos(Xe)*qe,Math.sin(Xe)*qe);const Se=bu,lt=gM(A.windSpeed_mps,A.windDirFrom_deg),Ue={depth_m:i.params.depth_m},ze={stormRadius_km:A.stormRadius_km,fetchUtilization:A.fetchUtilization,stormAge_h:A.stormAge_h,windRamp_h:A.windRamp_h},L=vM(lt,ze,Ue),S=I(Math.max(A.precipIntensity,A.storminess,A.hurricaneIntensity),0,1),G=I(S*.85+A.gustiness*.35,0,1),ne=B(55,16,G),ie=1-Math.exp(-P/Math.max(.001,ne)),ee=I(S*.95+A.hurricaneIntensity*.6+A.gustiness*.35,0,1),Te=I(L.Hs_m*B(1,2.25,Math.pow(ee,1.45)),.4,24),ce=I(L.Tp_s*B(1,1.32,Math.pow(ee,1.25)),3.5,22);i.seaHs_m=B(i.seaHs_m,Te,ie),i.seaTp_s=B(i.seaTp_s,ce,ie),i.windDirTo_rad=Ru(i.windDirTo_rad,lt.windDirTo_rad,I(P*.35,0,1));const ve=B(320,180,G),ke=1-Math.exp(-P/Math.max(.001,ve));i.swellDirTo_rad=Ru(i.swellDirTo_rad,i.windDirTo_rad,ke);const se=I(.28+.65*A.gustiness+.65*S,0,1),me=I(B(.25,1,se)+S*.12,0,1),Ge=I((me-.55)/.45,0,1),Re=I(A.windSpeed_mps/18,0,1),xe=I(.95+1.05*se+.55*Re,.65,2.6),Ae=I(.55-.45*S-.25*Re,.15,.65);if(i.needsRebuild||i.wavesTarget.length===0){const Ye=UM(i.params.quality);i.wavesTarget=Mu({Hs_m:i.seaHs_m,Tp_s:i.seaTp_s,depth_m:i.params.depth_m,windDirTo_rad:i.windDirTo_rad,swellDirTo_rad:i.swellDirTo_rad,swellVariance:Ae,waveCount:Ye,directionalSpread:me,gamma:B(1.6,4.2,I(A.storminess+A.hurricaneIntensity,0,1)),choppiness:xe,seed:1337}),i.wavesCurrent.length!==i.wavesTarget.length&&(i.wavesCurrent=i.wavesTarget.map(M=>({...M}))),i.needsRebuild=!1}else i.simTime_s%2<P&&(i.wavesTarget=Mu({Hs_m:i.seaHs_m,Tp_s:i.seaTp_s,depth_m:i.params.depth_m,windDirTo_rad:i.windDirTo_rad,swellDirTo_rad:i.swellDirTo_rad,swellVariance:Ae,waveCount:i.wavesTarget.length,directionalSpread:me,gamma:B(1.6,4.2,I(A.storminess+A.hurricaneIntensity,0,1)),choppiness:xe,seed:1337}));const Pe=I(P*.85,0,1);for(let Ye=0;Ye<i.wavesCurrent.length;Ye++){const M=i.wavesCurrent[Ye],U=i.wavesTarget[Ye];M.dirX=B(M.dirX,U.dirX,Pe),M.dirZ=B(M.dirZ,U.dirZ,Pe),M.A=B(M.A,U.A,Pe),M.k=B(M.k,U.k,Pe),M.omega=B(M.omega,U.omega,Pe),M.phase=U.phase,M.Q=B(M.Q,U.Q,Pe)}i.oceanMat.writeWaves(i.wavesCurrent),i.ocean.position.set(i.camera.position.x,0,i.camera.position.z);const ct=I(i.params.clarity_pct/100,0,1),F=I(ct*(1-.22*S-.15*A.precipIntensity)*B(1,.78,I(i.params.coastProximity,0,1)),0,1),re=I(i.params.coastProximity,0,1);Eu.copy(CM).lerp(EM,F).lerp(RM,1-re*.4),i.oceanMat.material.color.copy(Eu);const K=I(se*.75+I(i.seaHs_m/5,0,1)*.35,0,1),J=B(.55,2.15,K),ae=B(.24,.11,K),Fe=B(.68,.38,K);Au.set(Math.cos(i.windDirTo_rad)*A.windSpeed_mps,Math.sin(i.windDirTo_rad)*A.windSpeed_mps);const je=i.params.quality==="Max"?1:i.params.quality==="High"?.85:i.params.quality==="Medium"?.65:.45,_t=(.04+.08*Re)*je*(1-.35*S),Et=i.params.quality==="Low"?35:i.params.quality==="Medium"?55:i.params.quality==="High"?70:80,Ze=i.params.quality==="Low"?170:i.params.quality==="Medium"?250:i.params.quality==="High"?320:400;i.oceanMat.update(P,{time_s:i.simTime_s,originXZ:wu.set(i.ocean.position.x,i.ocean.position.z),currentXZ:Se,tideHeight_m:de,waterClarity:F,foamIntensity:J,foamSlopeStart:ae,foamSlopeEnd:Fe,windXZ:Au,microStrength:_t,microFadeNear_m:Et,microFadeFar_m:Ze,sunDir:q,sunColor:i.sunLight.color,sunIntensity:Me});const fn=I(i.params.otterosity_pct/100,0,1),en=Me>.15?q:O.moonIntensity>.18?$:void 0;if(i.otter.update({otterosity:fn,storminess:I(A.precipIntensity+A.storminess*.7+A.hurricaneIntensity,0,1),waveChaos:se,windDirTo_rad:i.windDirTo_rad,interestDir:en},{dt_s:P,time_s:i.simTime_s,waves:i.wavesCurrent,currentXZ:Se,tideHeight_m:de}),Ai.set(i.otter.position.x,i.otter.position.z),P>1e-6){const Ye=Ai.x-i.otterPrevXZ.x,M=Ai.y-i.otterPrevXZ.y;i.otterSpeed_mps=Math.sqrt(Ye*Ye+M*M)/P}else i.otterSpeed_mps=0;i.otterPrevXZ.copy(Ai),za.set(i.otter.bodyForward.x,i.otter.bodyForward.z);const An=fs(i.wavesCurrent,wu.set(i.otter.position.x,i.otter.position.z),i.simTime_s,Se,de,bM,AM,TM),pn=i.otter.getHeadWorldPosition(ao),Os=i.otter.getEyeWorldPosition(wM);i.otterOrbMesh.position.copy(pn),i.otterOrbMesh.position.y+=.32,i.otterOrbLight.position.copy(i.otterOrbMesh.position);const Bs=I(.35+.65*W+.45*I(A.storminess+A.hurricaneIntensity,0,1),0,1);i.otterOrbLight.intensity=B(2.5,10,Bs),i.otterOrbMesh.material.emissiveIntensity=B(2.5,4.2,Bs),i.camRig.update(i.camera,{dt_s:P,gazeDir:i.otter.gazeDir,bodyForward:i.otter.bodyForward,headPos:pn,eyePos:Os,surfaceHeight_m:An.height_m,underwater:i.otter.isUnderwaterView(),storminess:I(A.precipIntensity+A.storminess+A.hurricaneIntensity,0,1),followDistance_m:i.params.cameraDistance_m,followElevation_m:i.params.cameraElevation_m}),i.camera.updateMatrixWorld(),i.sky.position.copy(i.camera.position),i.camera.getWorldDirection(Su),i.otterFillLight.position.copy(i.camera.position).addScaledVector(Su,-2),i.otterFillLight.position.y+=3,i.otterFillLight.target.position.copy(pn),i.otterFillLight.color.copy(i.tmpSunColor).lerp(i.otterFillNightColor,W),i.otterFillLight.intensity=B(.12,.4,W)*(.85+.4*Ce);const ni=I(1-(A.storminess*.75+A.hurricaneIntensity+A.precipIntensity*.6+se*.25),0,1),ki=I(1-I((O.sunElevation_rad+.04)/.35,0,1),0,1);i.ripples.update({dt_s:P,time_s:i.simTime_s,center:i.otter.position,surfaceY:An.height_m,calmness:ni,sunIntensity:Me,sunset:ki}),i.wakeRibbon.update({dt_s:P,time_s:i.simTime_s,centerXZ:Ai,forwardXZ:za,surfaceY_m:An.height_m,speed_mps:i.otterSpeed_mps,paddleImpulse01:i.otter.paddleImpulse01??0,calm01:ni});const Tn=i.camera.position.y<An.height_m-.08;if(g=B(g,Tn?1:0,I(P*3,0,1)),i.underwaterDome.visible=g>.02,i.underwaterDome.visible&&(i.underwaterDome.position.copy(i.camera.position),i.underwaterDome.material.color.copy(i.fogUnder.color)),i.postFX.ssrPass&&(i.postFX.ssrPass.enabled=g<.02),i.postFX.underwaterPass){i.postFX.underwaterPass.enabled=g>.001,Tu.copy(i.camera.position).addScaledVector(q,12e3),Js.copy(Tu).project(i.camera);const Ye=Js.x*.5+.5,M=Js.y*.5+.5,U=Js.z>-1&&Js.z<1&&Ye>-.15&&Ye<1.15&&M>-.15&&M<1.15?1:0;i.postFX.underwaterPass.uniforms.u_time.value=i.simTime_s,i.postFX.underwaterPass.uniforms.u_underwater.value=g,i.postFX.underwaterPass.uniforms.u_clarity.value=F,i.postFX.underwaterPass.uniforms.u_waterLevel.value=de,i.postFX.underwaterPass.uniforms.u_sunUv.value.set(Ye,M),i.postFX.underwaterPass.uniforms.u_sunInView.value=U,i.postFX.underwaterPass.uniforms.u_sunIntensity.value=Me,i.postFX.underwaterPass.uniforms.u_sunColor.value.copy(i.sunLight.color),i.postFX.underwaterPass.uniforms.u_invProj.value.copy(i.camera.projectionMatrixInverse),i.postFX.underwaterPass.uniforms.u_invView.value.copy(i.camera.matrixWorld)}const _i=i.otter.paddleImpulse01??0,Ar=I(I(i.otterSpeed_mps/.25,0,1)*(.15+.35*ni)+_i*(.18+.22*ni),0,1);if(i.foamField.update(i.renderer,{dt_s:P,time_s:i.simTime_s,centerXZ:Ai,waves:i.wavesCurrent,currentXZ:Se,windDirTo_rad:i.windDirTo_rad,windSpeed_mps:A.windSpeed_mps,storminess:S,wakePosXZ:Ai,wakeDirXZ:za,wakeStrength:Ar}),i.oceanMat.bindFoamMap(i.foamField.texture),i.oceanMat.setFoamFieldTransform(i.foamField.centerXZ,i.foamField.worldSize_m),i.islands.update(i.camera.position,i.otter.bodyForward,de),Tn){i.fogUnder.color.set("#053044"),i.fogUnder.density=B(.055,.018,F),i.scene.fog=i.fogUnder,i.renderer.toneMappingExposure=B(i.renderer.toneMappingExposure,1,I(P*2,0,1)),i.stars.visible=!1,i.sunSprite.visible=!1,i.moonSprite.visible=!1,i.sky.visible=!1;for(const Ye of i.cloudLayers)Ye.deck.mesh.visible=!1;i.islands.group.visible=!1,i.rainbow.mesh.visible=!1,i.splashes.points.visible=!1,i.lightningBolts.group.visible=!1,i.windSpray.points.visible=!1}else{const Ye=I(A.cloudCover*.55+A.precipIntensity*.85+A.storminess*.9+A.hurricaneIntensity*1,0,1),M=I(1-I(A.visibility_km,1,80)/80,0,1);Cu.copy(PM).lerp(IM,j*.72).lerp(i.sunLight.color,j*.18).lerp(LM,Ye*.65).lerp(DM,W*.7),i.fogAbove.color.copy(Cu);const U=B(3e-5,18e-5,M),H=B(.95,1.35,I(Ye*.85+j*.55,0,1)),V=I(U*H,2e-5,24e-5);i.fogAbove.density=B(i.fogAbove.density,V,I(P*1.4,0,1)),i.scene.fog=i.fogAbove;const k=I(B(1.08,1.18,j)*B(1,.9,W)+m*.55,.55,1.85);i.renderer.toneMappingExposure=B(i.renderer.toneMappingExposure,k,I(P*2.5,0,1)),i.stars.visible=!0,i.sunSprite.visible=!0,i.moonSprite.visible=!0,i.sky.visible=!0;for(const oe of i.cloudLayers)oe.deck.mesh.visible=!0;i.islands.group.visible=!0,i.rainbow.mesh.visible=!0,i.splashes.points.visible=!0,i.lightningBolts.group.visible=!0,i.windSpray.points.visible=!0}x=bl(i.params.latitude_deg,A.waterTemp_C),i.life.setParams({biome:x,coastProximity:i.params.coastProximity,exoticEncounters:i.params.exoticEncounters_pct/100}),i.life.update({dt_s:P,time_s:i.simTime_s,otterPos:i.otter.position,surfaceY:de,nightFactor:W,storminess:I(A.precipIntensity+A.storminess+A.hurricaneIntensity,0,1)});const Tr=i.qualityRank[i.params.quality];for(const Ye of i.cloudLayers){const M=Tr>=i.qualityRank[Ye.minQuality];Ye.deck.mesh.visible=M&&!Tn,!(!M||Tn)&&Ye.deck.update({dt_s:P,time_s:i.simTime_s,center:i.camera.position,cloudCover:A.cloudCover,windDirFrom_deg:A.windDirFrom_deg,windSpeed_mps:A.windSpeed_mps,sunDir:q,sunColor:i.sunLight.color,sunIntensity:Me,nightFactor:W,lightningFlash01:m,lightningDir:i.lightningDir,storminess:A.storminess,hurricaneIntensity:A.hurricaneIntensity,precipIntensity:A.precipIntensity,quality:i.params.quality})}i.precip.update({dt_s:P,time_s:i.simTime_s,cameraPos:i.camera.position,windDirFrom_deg:A.windDirFrom_deg,intensity:A.precipIntensity,mode:A.precipType==="Snow"?"Snow":A.precipType==="Rain"?"Rain":"None",visible:!Tn}),i.rainbow.update({dt_s:P,center:i.camera.position,sunDir:q,sunElevation_rad:O.sunElevation_rad,precipIntensity:A.precipIntensity,cloudCover:A.cloudCover}),i.splashes.update({dt_s:P,origin:i.otter.position,surfaceY:An.height_m,slope:An.slope,intensity:I(I(A.windSpeed_mps/20,0,1)*(.25+.75*I(A.storminess+A.hurricaneIntensity,0,1))*(1+.9*Ge)+_i*(.2+.25*ni)+i.otter.wetness01*.25,0,1),windDirTo_rad:lt.windDirTo_rad,sprayBias01:I(i.otter.wetness01*.7+S*.25+I(A.windSpeed_mps/30,0,1)*.2,0,1)}),i.windSpray.update({dt_s:P,time_s:i.simTime_s,center:i.camera.position,surfaceY:An.height_m,windDirTo_rad:i.windDirTo_rad,windSpeed_mps:A.windSpeed_mps,gustiness:A.gustiness,storminess:S,visible:!Tn}),i.audio.updateFrame(P,{U10:A.windSpeed_mps,Hs:i.seaHs_m,rain:A.precipIntensity}),i.params.derived_state=A.stateName,i.params.derived_airTemp_C=Math.round(A.airTemp_C*10)/10,i.params.derived_waterTemp_C=Math.round(A.waterTemp_C*10)/10,i.params.derived_cloudCover=Math.round(A.cloudCover*100)/100,i.params.derived_visibility_km=Math.round(A.visibility_km*10)/10,i.params.derived_windSpeed_mps=Math.round(A.windSpeed_mps*10)/10,i.params.derived_windDirFrom_deg=Math.round(A.windDirFrom_deg),i.params.derived_precip=A.precipType==="None"?"None":`${A.precipType} (${Math.round(A.precipIntensity*100)}%)`,i.params.derived_Hs_m=Math.round(i.seaHs_m*100)/100,i.params.derived_Tp_s=Math.round(i.seaTp_s*100)/100,i.params.derived_tideScale=Math.round(O.tideScale*1e3)/1e3;const Er=Math.floor(i.timeOfDay_h),qo=Math.floor((i.timeOfDay_h-Er)*60);if(i.params.derived_clock=`${String(Er).padStart(2,"0")}:${String(qo).padStart(2,"0")}`,A.stormEta_h<0?i.params.derived_stormETA="—":A.stormEta_h>=1?i.params.derived_stormETA=`in ${Math.round(A.stormEta_h*10)/10}h`:i.params.derived_stormETA=`in ${Math.max(1,Math.round(A.stormEta_h*60))}m`,i.params.derived_stormChanceEff_pct=A.stormChanceEffective_pct,i.params.derived_hurricaneChanceEff_pct=A.hurricaneChanceEffective_pct,i.postFX.gradePass){const Ye=I(1-I((O.sunElevation_rad+.04)/.35,0,1),0,1),M=Ye*(1-W*.55)*(1-g),U=i.params.reduceFlashes?.65:1,H=i.params.reduceFlashes?.4:1,V=i.params.reduceFlashes?.96:1;i.postFX.gradePass.uniforms.u_time.value=i.simTime_s,i.postFX.gradePass.uniforms.u_warmth.value=.22*M*U;const k=i.params.quality==="Max"?.03:i.params.quality==="High"?.032:.034;i.postFX.gradePass.uniforms.u_grain.value=k*H,i.postFX.gradePass.uniforms.u_vignette.value=B(.22,.12,g)*U,i.postFX.gradePass.uniforms.u_saturation.value=B(1.04,1.13,Ye)*B(1,.88,g)*V,i.postFX.gradePass.uniforms.u_contrast.value=B(1.03,1.08,Ye)*B(1,.92,g)*V}i.planarReflections.update({dt:P,dtEma_s:s,params:i.params,scene:i.scene,camera:i.camera,tideHeight_m:de,storminess:S,foamBoost:K,lightningFlashFx:m,underwater:Tn}),i.perfOverlay.update(P,{dt_ms:P*1e3,dtEma_ms:s*1e3,dtAvg_ms:r*1e3,fpsEma:1/Math.max(1e-6,s),quality:i.params.quality,reflectionRT_px:i.planarReflections.planarRefl?i.planarReflections.planarRefl.renderTarget.width:0,reflectionUpdatesPerSec:i.planarReflections.reflUpdatesPerSec,envInterval_s:l,envAngleDelta_deg:c}),i.postFX.composer?i.postFX.composer.render():i.renderer.render(i.scene,i.camera)}return E(),N}function Ru(i,e,t){const n=(e-i+Math.PI*3)%(Math.PI*2)-Math.PI;return i+n*t}function UM(i){return i==="Max"||i==="High"?32:i==="Medium"?24:16}const ye=Cd();Vx(ye);let Cs=!0,nr=null,Al=!1,Ht=null;const St=new _v({antialias:!0,powerPreference:"high-performance"});zo(St,ye.quality);St.outputColorSpace=zt;St.toneMapping=Nu;St.toneMappingExposure=1.1;document.body.style.margin="0";document.body.style.overflow="hidden";const FM=document.getElementById("app")??document.body;FM.appendChild(St.domElement);Object.assign(St.domElement.style,{position:"fixed",left:"0",top:"0",width:"100%",height:"100%",zIndex:"0",display:"block"});Xy(St.domElement,()=>{Al=!0,Ht==null||Ht.onContextLost()},()=>{Al=!1,$M()});const _r=new Hy;_r.setEnabled(ye.perfOverlay);const mi=new _l(St);var Iu;(Iu=mi.compileCubemapShader)==null||Iu.call(mi);let Di=null;const $e=new cd;$e.background=new te(0);const OM=new No(new te("#6a7aa0"),4e-5),Ud=new No(new te("#053044"),.03),Fd=(()=>{const i=new Ls(9e3,16,12),e=new ln({color:Ud.color.clone(),side:Ft,depthWrite:!1,depthTest:!1}),t=new ht(i,e);return t.visible=!1,t.frustumCulled=!1,t.renderOrder=-1e3,t})();$e.add(Fd);const Ui=new kt(52,window.innerWidth/window.innerHeight,.1,2e4);Ui.position.set(0,1.2,2.5);const ko=new Bo;ko.scale.setScalar(1e4);$e.add(ko);const wr=ko.material.uniforms;wr.turbidity.value=10;wr.rayleigh.value=2.3;wr.mieCoefficient.value=.007;wr.mieDirectionalG.value=.8;const Ho=new yr(16777215,1);Ho.position.set(1,1,0);Ho.castShadow=!1;$e.add(Ho);const vc=new yr(10205439,.25);vc.position.set(-1,1,0);$e.add(vc);const Od=new Zv(8956671,725024,.55);$e.add(Od);const br=new yr(new te("#e6f2ff"),0);br.name="LightningLight";br.castShadow=!1;$e.add(br);$e.add(br.target);const Vo=new yr(16777215,0);Vo.castShadow=!1;$e.add(Vo);$e.add(Vo.target);const BM=new te("#ffffff"),zM=new te("#ffb26b"),kM=new te("#cfe7ff"),Tl=new Z;let El=0;const Bd=qy(2500);$e.add(Bd);const zd=Yy();$e.add(zd);const kd=$y(.5);$e.add(kd);const Co=i=>i==="Max"?340:i==="High"?260:i==="Medium"?180:128,xc=i=>i==="Max"?512:i==="High"?384:256,yc=i=>i==="Max"?300:i==="High"?260:i==="Medium"?220:180,Hd=new ti(12e3,12e3,Co(ye.quality),Co(ye.quality));Hd.rotateX(-Math.PI/2);let Cl=[],Rl=[];const Mc=new yx({waterColor:new te("#0a2a3a"),foamIntensity:1.1,foamSlopeStart:.18,foamSlopeEnd:.62,waves:[]}),Jn=new ht(Hd,Mc.material);Jn.frustumCulled=!1;$e.add(Jn);let Fi=new uc(St,{size:xc(ye.quality),worldSize_m:yc(ye.quality)}),Xt=_c(null,{renderer:St,scene:$e,camera:Ui,ocean:Jn,params:ye});const xs=new Iy;$e.add(xs.group);const HM=i=>i==="Low"?"Low":i==="Medium"?"Medium":"High";function Ro(){const i=HM(ye.quality),e=i==="High"&&ye.otterFurSilhouette;xs.setAppearance(i,e)}Ro();const Sc=new ht(new Ls(.12,18,18),new Pn({color:new te("#081018"),emissive:new te("#bfe4ff"),emissiveIntensity:3,roughness:.2,metalness:0}));Sc.name="OtterOrb";$e.add(Sc);const Go=new wd(new te("#bfe4ff"),0,32,2);Go.name="OtterOrbLight";Go.castShadow=!1;$e.add(Go);const VM=new Dy,Vd=new jx;let Pl=0,Ci=ye.timeOfDay_h,Ri=ye.dayOfYear,Il=1,Ll=7.5,Dl=Math.PI,Nl=Math.PI;const GM=new T(0,1,0),WM=bl(ye.latitude_deg,12),wc=new Uy({biome:WM,coastProximity:ye.coastProximity,exoticEncounters:ye.exoticEncounters_pct/100});$e.add(wc.group);let Pi=new Id(ye.quality);$e.add(Pi.group);const bc=new mc({layerOffset:-.18,densityScale:1.1,opacityScale:1,coverScale:1,stormScale:1.05,rainScale:1,windScale:.85,stepsScale:1});bc.mesh.renderOrder=-12;$e.add(bc.mesh);const Ac=new mc({layerOffset:.22,densityScale:.85,opacityScale:.7,coverScale:.78,stormScale:.9,rainScale:.75,windScale:1.05,stepsScale:.75});Ac.mesh.renderOrder=-11;$e.add(Ac.mesh);const Tc=new mc({layerOffset:.68,densityScale:.55,opacityScale:.55,coverScale:.58,stormScale:.65,rainScale:.45,windScale:1.25,stepsScale:.6});Tc.mesh.renderOrder=-10;$e.add(Tc.mesh);const Gd=[{deck:bc,minQuality:"Low"},{deck:Ac,minQuality:"Medium"},{deck:Tc,minQuality:"High"}],XM={Low:0,Medium:1,High:2,Max:3},Ec=new Vy;$e.add(Ec.group);const Wd=new Ny;$e.add(Wd.group);const Cc=new Fy;$e.add(Cc.mesh);const Rc=new By;$e.add(Rc.points);const Pc=new Gy;$e.add(Pc.points);const Wo=new zy;$e.add(Wo.mesh);const Xo=new ky;$e.add(Xo.mesh);const qM=[Jn,Wo.mesh,Xo.mesh],Fs=new tM(St,Mc,qM);Fs.rebuild(ye);const Ii=new Qy(ye);Ii.updateHint();let Pu=ye.quality;function vo(){Pl=0,Il=13.5,Ll=13.8,Dl=Math.PI,Nl=Math.PI,Cl=[],Rl=[],Cs=!0,Vd.reset({latitude_deg:ye.latitude_deg,longitude_deg:ye.longitude_deg,dayOfYear:Ri,timeOfDay_h:Ci,force:{cloudCover01:.98,precip01:1,storm01:1,hurricane01:.15,windSpeed_mps:42,windDirFrom_deg:42,gustiness01:1,steadyAge_h:36,stormStrength01:1,stormDirFrom_deg:42,stormDuration_s:2.5*3600,stormActiveElapsed_s:35*60}}),xs.reset(),wc.reset(),Tl.set(xs.position.x,xs.position.z),El=0,Fi.reset(St,Tl)}function Ul(){if(ye.quality===Pu)return;Pu=ye.quality,zo(St,ye.quality);const i=new ti(12e3,12e3,Co(ye.quality),Co(ye.quality));i.rotateX(-Math.PI/2),Jn.geometry.dispose(),Jn.geometry=i,$e.remove(Pi.group),Pi.dispose(),Pi=new Id(ye.quality),$e.add(Pi.group),Xt=_c(Xt,{renderer:St,scene:$e,camera:Ui,ocean:Jn,params:ye}),Fs.rebuild(ye),Ht==null||Ht.resetEnvTimers(),Fi.dispose(),Fi=new uc(St,{size:xc(ye.quality),worldSize_m:yc(ye.quality)}),Cs=!0,Ht==null||Ht.resetPerfStats()}function Xd(){var i,e;if(nr)try{const t=((i=nr.controllersRecursive)==null?void 0:i.call(nr))??[];for(const n of t)(e=n.updateDisplay)==null||e.call(n)}catch{}}function YM(i){ye.quality!==i&&(ye.quality=i,ye.qualityInfo=Mr(ye.quality),Ul(),Ro(),go(ye),Xd())}nr=Wx(ye,{onAnyChange:()=>{Ci=ye.timeOfDay_h,Ri=ye.dayOfYear,Ul(),Ro(),Ii.updateHint(),Ii.updateState(),_r.setEnabled(ye.perfOverlay),Cs=!0,go(ye)},onCameraChange:()=>{ye.cameraDistance_m=I(ye.cameraDistance_m,9,18),ye.cameraElevation_m=I(ye.cameraElevation_m,.35,3),go(ye)},onStartGame:()=>{ye.gameStarted=!0,Ci=ye.timeOfDay_h,Ri=ye.dayOfYear,vo()},onNewGame:()=>{ye.gameStarted=!1,Ci=ye.timeOfDay_h,Ri=ye.dayOfYear,vo()},onResetSettings:()=>{Gx();const i=Cd();Object.assign(ye,i),ye.qualityInfo=Mr(ye.quality),Ci=ye.timeOfDay_h,Ri=ye.dayOfYear,Ul(),Ro(),Ii.updateHint(),Ii.updateState(),_r.setEnabled(ye.perfOverlay),vo(),go(ye),Xd()}});vo();window.addEventListener("resize",()=>{var i,e,t,n;Ui.aspect=window.innerWidth/window.innerHeight,Ui.updateProjectionMatrix(),zo(St,ye.quality);try{(e=(i=Xt.composer)==null?void 0:i.setSize)==null||e.call(i,window.innerWidth,window.innerHeight),(n=(t=Xt.ssrPass)==null?void 0:t.setSize)==null||n.call(t,window.innerWidth,window.innerHeight),Xt.underwaterPass&&Xt.underwaterPass.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight)}catch{}try{Fs.rebuild(ye)}catch{}});function $M(){var i;zo(St,ye.quality),Di&&(Di.dispose(),Di=null),$e.environment=null,(i=mi.compileCubemapShader)==null||i.call(mi),Xt=_c(Xt,{renderer:St,scene:$e,camera:Ui,ocean:Jn,params:ye}),Fs.rebuild(ye),Fi.dispose(),Fi=new uc(St,{size:xc(ye.quality),worldSize_m:yc(ye.quality)}),Cs=!0,Ht==null||Ht.resetEnvTimers(),Ht==null||Ht.onContextRestored()}window.addEventListener("beforeunload",()=>{var i,e,t,n,s,r,o,a,l,c;Di&&Di.dispose();try{(e=(i=Xt.composer)==null?void 0:i.dispose)==null||e.call(i)}catch{}try{(n=(t=Xt.composerDepthTex)==null?void 0:t.dispose)==null||n.call(t)}catch{}try{(r=(s=Xt.ssrPass)==null?void 0:s.dispose)==null||r.call(s)}catch{}try{(a=(o=Xt.underwaterPass)==null?void 0:o.dispose)==null||a.call(o)}catch{}try{(c=(l=Xt.gradePass)==null?void 0:l.dispose)==null||c.call(l)}catch{}mi.dispose(),Fs.dispose(),Fi.dispose();for(const h of Gd)h.deck.dispose();Ec.dispose(),Cc.dispose(),Wo.dispose(),Xo.dispose(),Ii.dispose(),_r.dispose(),Pi.dispose(),Rc.dispose(),Pc.dispose(),St.dispose()});const jM={params:ye,renderer:St,scene:$e,camera:Ui,ocean:Jn,oceanMat:Mc,foamField:Fi,sky:ko,skyUniforms:wr,sunLight:Ho,moonLight:vc,ambient:Od,lightningLight:br,stars:Bd,sunSprite:zd,moonSprite:kd,underwaterDome:Fd,fogAbove:OM,fogUnder:Ud,sunWarmColor:zM,tmpSunColor:BM,otterFillLight:Vo,otterFillNightColor:kM,weatherSim:Vd,otter:xs,camRig:VM,otterOrbMesh:Sc,otterOrbLight:Go,life:wc,precip:Pi,cloudLayers:Gd,qualityRank:XM,lightningBolts:Ec,lightningDir:GM,islands:Wd,rainbow:Cc,splashes:Rc,windSpray:Pc,ripples:Wo,wakeRibbon:Xo,perfOverlay:_r,pmrem:mi,get envRT(){return Di},set envRT(i){Di=i},planarReflections:Fs,audio:Ii,get postFX(){return Xt},set postFX(i){Xt=i},setQuality:YM,get contextLost(){return Al},get needsRebuild(){return Cs},set needsRebuild(i){Cs=i},get wavesCurrent(){return Cl},set wavesCurrent(i){Cl=i},get wavesTarget(){return Rl},set wavesTarget(i){Rl=i},get simTime_s(){return Pl},set simTime_s(i){Pl=i},get timeOfDay_h(){return Ci},set timeOfDay_h(i){Ci=i},get dayOfYear(){return Ri},set dayOfYear(i){Ri=i},get seaHs_m(){return Il},set seaHs_m(i){Il=i},get seaTp_s(){return Ll},set seaTp_s(i){Ll=i},get windDirTo_rad(){return Dl},set windDirTo_rad(i){Dl=i},get swellDirTo_rad(){return Nl},set swellDirTo_rad(i){Nl=i},otterPrevXZ:Tl,get otterSpeed_mps(){return El},set otterSpeed_mps(i){El=i}};Ht=NM(jM);
