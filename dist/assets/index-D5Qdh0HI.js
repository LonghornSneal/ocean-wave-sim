var zf=Object.defineProperty;var kf=(s,e,t)=>e in s?zf(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var P=(s,e,t)=>kf(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Tc="166",Vf=0,xh=1,Hf=2,Ad=1,Gf=2,ei=3,fi=0,Vt=1,mn=2,Et=0,zn=1,Hn=2,yh=3,Mh=4,Wf=5,ri=100,Xf=101,qf=102,Yf=103,$f=104,jf=200,Kf=201,Zf=202,Jf=203,qr=204,Yr=205,Qf=206,ep=207,tp=208,np=209,ip=210,sp=211,rp=212,op=213,ap=214,lp=0,cp=1,hp=2,ma=3,up=4,dp=5,fp=6,pp=7,Ed=0,mp=1,gp=2,hi=0,_p=1,vp=2,xp=3,Td=4,yp=5,Mp=6,Sp=7,Sh="attached",wp="detached",Cd=300,Ys=301,$s=302,Bl=303,zl=304,Pa=306,Mn=1e3,gn=1001,ga=1002,Qe=1003,Rd=1004,Er=1005,tt=1006,Jo=1007,_n=1008,Sn=1009,Pd=1010,Id=1011,Ui=1012,Cc=1013,ts=1014,Ln=1015,Dn=1016,Rc=1017,Pc=1018,js=1020,Ld=35902,Dd=1021,Nd=1022,Jt=1023,Ud=1024,Fd=1025,Di=1026,Ks=1027,Ic=1028,Lc=1029,Od=1030,Dc=1031,Nc=1033,Qo=33776,ea=33777,ta=33778,na=33779,kl=35840,Vl=35841,Hl=35842,Gl=35843,Wl=36196,Xl=37492,ql=37496,Yl=37808,$l=37809,jl=37810,Kl=37811,Zl=37812,Jl=37813,Ql=37814,ec=37815,tc=37816,nc=37817,ic=37818,sc=37819,rc=37820,oc=37821,ia=36492,ac=36494,lc=36495,Bd=36283,cc=36284,hc=36285,uc=36286,Tr=2200,dc=2201,bp=2202,$r=2300,jr=2301,qa=2302,zs=2400,ks=2401,_a=2402,Uc=2500,Ap=2501,Ep=0,zd=1,fc=2,Tp=3200,Cp=3201,Fc=0,Rp=1,Rn="",Xt="srgb",Rt="srgb-linear",Oc="display-p3",Ia="display-p3-linear",va="linear",xt="srgb",xa="rec709",ya="p3",as=7680,wh=519,Pp=512,Ip=513,Lp=514,kd=515,Dp=516,Np=517,Up=518,Fp=519,pc=35044,Kr=35048,bh="300 es",ai=2e3,Ma=2001;class ns{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ah=1234567;const Or=Math.PI/180,Zs=180/Math.PI;function Nn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[s&255]+Ht[s>>8&255]+Ht[s>>16&255]+Ht[s>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function Nt(s,e,t){return Math.max(e,Math.min(t,s))}function Bc(s,e){return(s%e+e)%e}function Op(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Bp(s,e,t){return s!==e?(t-s)/(e-s):0}function Br(s,e,t){return(1-t)*s+t*e}function zp(s,e,t,n){return Br(s,e,1-Math.exp(-t*n))}function kp(s,e=1){return e-Math.abs(Bc(s,e*2)-e)}function Vp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Hp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Gp(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Wp(s,e){return s+Math.random()*(e-s)}function Xp(s){return s*(.5-Math.random())}function qp(s){s!==void 0&&(Ah=s);let e=Ah+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Yp(s){return s*Or}function $p(s){return s*Zs}function jp(s){return(s&s-1)===0&&s!==0}function Kp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Zp(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Jp(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Pn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function at(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Qp={DEG2RAD:Or,RAD2DEG:Zs,generateUUID:Nn,clamp:Nt,euclideanModulo:Bc,mapLinear:Op,inverseLerp:Bp,lerp:Br,damp:zp,pingpong:kp,smoothstep:Vp,smootherstep:Hp,randInt:Gp,randFloat:Wp,randFloatSpread:Xp,seededRandom:qp,degToRad:Yp,radToDeg:$p,isPowerOfTwo:jp,ceilPowerOfTwo:Kp,floorPowerOfTwo:Zp,setQuaternionFromProperEuler:Jp,normalize:at,denormalize:Pn};class J{constructor(e=0,t=0){J.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,n,i,r,o,a,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],v=i[1],x=i[4],S=i[7],D=i[2],E=i[5],T=i[8];return r[0]=o*_+a*v+l*D,r[3]=o*m+a*x+l*E,r[6]=o*p+a*S+l*T,r[1]=c*_+h*v+u*D,r[4]=c*m+h*x+u*E,r[7]=c*p+h*S+u*T,r[2]=d*_+f*v+g*D,r[5]=d*m+f*x+g*E,r[8]=d*p+f*S+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ya.makeScale(e,t)),this}rotate(e){return this.premultiply(Ya.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ya.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ya=new Ge;function Vd(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Zr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function em(){const s=Zr("canvas");return s.style.display="block",s}const Eh={};function zc(s){s in Eh||(Eh[s]=!0,console.warn(s))}function tm(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Th=new Ge().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ch=new Ge().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fo={[Rt]:{transfer:va,primaries:xa,toReference:s=>s,fromReference:s=>s},[Xt]:{transfer:xt,primaries:xa,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Ia]:{transfer:va,primaries:ya,toReference:s=>s.applyMatrix3(Ch),fromReference:s=>s.applyMatrix3(Th)},[Oc]:{transfer:xt,primaries:ya,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Ch),fromReference:s=>s.applyMatrix3(Th).convertLinearToSRGB()}},nm=new Set([Rt,Ia]),et={enabled:!0,_workingColorSpace:Rt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!nm.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=fo[e].toReference,i=fo[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return fo[s].primaries},getTransfer:function(s){return s===Rn?va:fo[s].transfer}};function Xs(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function $a(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ls;class im{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ls===void 0&&(ls=Zr("canvas")),ls.width=e.width,ls.height=e.height;const n=ls.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ls}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Zr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Xs(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xs(t[n]/255)*255):t[n]=Xs(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sm=0;class Hd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Nn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ja(i[o].image)):r.push(ja(i[o]))}else r=ja(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function ja(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?im.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rm=0;class Ut extends ns{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=gn,i=gn,r=tt,o=_n,a=Jt,l=Sn,c=Ut.DEFAULT_ANISOTROPY,h=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Nn(),this.name="",this.source=new Hd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mn:e.x=e.x-Math.floor(e.x);break;case gn:e.x=e.x<0?0:1;break;case ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mn:e.y=e.y-Math.floor(e.y);break;case gn:e.y=e.y<0?0:1;break;case ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Cd;Ut.DEFAULT_ANISOTROPY=1;class Ze{constructor(e=0,t=0,n=0,i=1){Ze.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,S=(f+1)/2,D=(p+1)/2,E=(h+d)/4,T=(u+_)/4,N=(g+m)/4;return x>S&&x>D?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=E/n,r=T/n):S>D?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=E/i,r=N/i):D<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(D),n=T/r,i=N/r),this.set(n,i,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class om extends ns{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ut(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Hd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $t extends om{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Gd extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class am extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ht{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const D=Math.sqrt(x),E=Math.atan2(D,p*v);m=Math.sin(m*E)/D,a=Math.sin(a*E)/D}const S=a*v;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const D=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=D,c*=D,h*=D,u*=D}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,n=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ka.copy(this).projectOnVector(e),this.sub(Ka)}reflect(e){return this.sub(Ka.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ka=new A,Rh=new ht;class pi{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,bn):bn.fromBufferAttribute(r,o),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),po.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),po.copy(n.boundingBox)),po.applyMatrix4(e.matrixWorld),this.union(po)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),mo.subVectors(this.max,hr),cs.subVectors(e.a,hr),hs.subVectors(e.b,hr),us.subVectors(e.c,hr),_i.subVectors(hs,cs),vi.subVectors(us,hs),Bi.subVectors(cs,us);let t=[0,-_i.z,_i.y,0,-vi.z,vi.y,0,-Bi.z,Bi.y,_i.z,0,-_i.x,vi.z,0,-vi.x,Bi.z,0,-Bi.x,-_i.y,_i.x,0,-vi.y,vi.x,0,-Bi.y,Bi.x,0];return!Za(t,cs,hs,us,mo)||(t=[1,0,0,0,1,0,0,0,1],!Za(t,cs,hs,us,mo))?!1:(go.crossVectors(_i,vi),t=[go.x,go.y,go.z],Za(t,cs,hs,us,mo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const $n=[new A,new A,new A,new A,new A,new A,new A,new A],bn=new A,po=new pi,cs=new A,hs=new A,us=new A,_i=new A,vi=new A,Bi=new A,hr=new A,mo=new A,go=new A,zi=new A;function Za(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){zi.fromArray(s,r);const a=i.x*Math.abs(zi.x)+i.y*Math.abs(zi.y)+i.z*Math.abs(zi.z),l=e.dot(zi),c=t.dot(zi),h=n.dot(zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const lm=new pi,ur=new A,Ja=new A;class Wn{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):lm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ur.subVectors(e,this.center);const t=ur.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ur,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ja.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ur.copy(e.center).add(Ja)),this.expandByPoint(ur.copy(e.center).sub(Ja))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const jn=new A,Qa=new A,_o=new A,xi=new A,el=new A,vo=new A,tl=new A;class La{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Qa.copy(e).add(t).multiplyScalar(.5),_o.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(Qa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(_o),a=xi.dot(this.direction),l=-xi.dot(_o),c=xi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Qa).addScaledVector(_o,d),f}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),i=jn.dot(jn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,i,r){el.subVectors(t,e),vo.subVectors(n,e),tl.crossVectors(el,vo);let o=this.direction.dot(tl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xi.subVectors(this.origin,e);const l=a*this.direction.dot(vo.crossVectors(xi,vo));if(l<0)return null;const c=a*this.direction.dot(el.cross(xi));if(c<0||l+c>o)return null;const h=-a*xi.dot(tl);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ie{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m){Ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ie().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ds.setFromMatrixColumn(e,0).length(),r=1/ds.setFromMatrixColumn(e,1).length(),o=1/ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cm,e,hm)}lookAt(e,t,n){const i=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),yi.crossVectors(n,rn),yi.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),yi.crossVectors(n,rn)),yi.normalize(),xo.crossVectors(rn,yi),i[0]=yi.x,i[4]=xo.x,i[8]=rn.x,i[1]=yi.y,i[5]=xo.y,i[9]=rn.y,i[2]=yi.z,i[6]=xo.z,i[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],x=n[7],S=n[11],D=n[15],E=i[0],T=i[4],N=i[8],b=i[12],y=i[1],I=i[5],B=i[9],z=i[13],j=i[2],Z=i[6],K=i[10],Q=i[14],W=i[3],he=i[7],me=i[11],ve=i[15];return r[0]=o*E+a*y+l*j+c*W,r[4]=o*T+a*I+l*Z+c*he,r[8]=o*N+a*B+l*K+c*me,r[12]=o*b+a*z+l*Q+c*ve,r[1]=h*E+u*y+d*j+f*W,r[5]=h*T+u*I+d*Z+f*he,r[9]=h*N+u*B+d*K+f*me,r[13]=h*b+u*z+d*Q+f*ve,r[2]=g*E+_*y+m*j+p*W,r[6]=g*T+_*I+m*Z+p*he,r[10]=g*N+_*B+m*K+p*me,r[14]=g*b+_*z+m*Q+p*ve,r[3]=v*E+x*y+S*j+D*W,r[7]=v*T+x*I+S*Z+D*he,r[11]=v*N+x*B+S*K+D*me,r[15]=v*b+x*z+S*Q+D*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,x=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,S=h*_*c-g*u*c+g*a*f-o*_*f-h*a*p+o*u*p,D=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,E=t*v+n*x+i*S+r*D;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=v*T,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*T,e[2]=(a*m*r-_*l*r+_*i*c-n*m*c-a*i*p+n*l*p)*T,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*T,e[4]=x*T,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*T,e[6]=(g*l*r-o*m*r-g*i*c+t*m*c+o*i*p-t*l*p)*T,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*T,e[8]=S*T,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*T,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*p+t*a*p)*T,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*T,e[12]=D*T,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*T,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*m-t*a*m)*T,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,v=l*c,x=l*h,S=l*u,D=n.x,E=n.y,T=n.z;return i[0]=(1-(_+p))*D,i[1]=(f+S)*D,i[2]=(g-x)*D,i[3]=0,i[4]=(f-S)*E,i[5]=(1-(d+p))*E,i[6]=(m+v)*E,i[7]=0,i[8]=(g+x)*T,i[9]=(m-v)*T,i[10]=(1-(d+_))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=ds.set(i[0],i[1],i[2]).length();const o=ds.set(i[4],i[5],i[6]).length(),a=ds.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],An.copy(this);const c=1/r,h=1/o,u=1/a;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,t.setFromRotationMatrix(An),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=ai){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(a===ai)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ma)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ai){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,f=(n+i)*h;let g,_;if(a===ai)g=(o+r)*u,_=-2*u;else if(a===Ma)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ds=new A,An=new Ie,cm=new A(0,0,0),hm=new A(1,1,1),yi=new A,xo=new A,rn=new A,Ph=new Ie,Ih=new ht;class Mt{constructor(e=0,t=0,n=0,i=Mt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ph.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ph,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ih.setFromEuler(this),this.setFromQuaternion(Ih,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mt.DEFAULT_ORDER="XYZ";class Wd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let um=0;const Lh=new A,fs=new ht,Kn=new Ie,yo=new A,dr=new A,dm=new A,fm=new ht,Dh=new A(1,0,0),Nh=new A(0,1,0),Uh=new A(0,0,1),Fh={type:"added"},pm={type:"removed"},ps={type:"childadded",child:null},nl={type:"childremoved",child:null};class gt extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new A,t=new Mt,n=new ht,i=new A(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ie},normalMatrix:{value:new Ge}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis(Dh,e)}rotateY(e){return this.rotateOnAxis(Nh,e)}rotateZ(e){return this.rotateOnAxis(Uh,e)}translateOnAxis(e,t){return Lh.copy(e).applyQuaternion(this.quaternion),this.position.add(Lh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dh,e)}translateY(e){return this.translateOnAxis(Nh,e)}translateZ(e){return this.translateOnAxis(Uh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yo.copy(e):yo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(dr,yo,this.up):Kn.lookAt(yo,dr,this.up),this.quaternion.setFromRotationMatrix(Kn),i&&(Kn.extractRotation(i.matrixWorld),fs.setFromRotationMatrix(Kn),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fh),ps.child=e,this.dispatchEvent(ps),ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pm),nl.child=e,this.dispatchEvent(nl),nl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fh),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,e,dm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,fm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}gt.DEFAULT_UP=new A(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new A,Zn=new A,il=new A,Jn=new A,ms=new A,gs=new A,Oh=new A,sl=new A,rl=new A,ol=new A;class In{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),En.subVectors(e,t),i.cross(En);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){En.subVectors(i,t),Zn.subVectors(n,t),il.subVectors(e,t);const o=En.dot(En),a=En.dot(Zn),l=En.dot(il),c=Zn.dot(Zn),h=Zn.dot(il),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Jn.x),l.addScaledVector(o,Jn.y),l.addScaledVector(a,Jn.z),l)}static isFrontFacing(e,t,n,i){return En.subVectors(n,t),Zn.subVectors(e,t),En.cross(Zn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),En.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return In.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return In.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return In.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return In.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return In.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;ms.subVectors(i,n),gs.subVectors(r,n),sl.subVectors(e,n);const l=ms.dot(sl),c=gs.dot(sl);if(l<=0&&c<=0)return t.copy(n);rl.subVectors(e,i);const h=ms.dot(rl),u=gs.dot(rl);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ms,o);ol.subVectors(e,r);const f=ms.dot(ol),g=gs.dot(ol);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(gs,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Oh.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Oh,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(ms,o).addScaledVector(gs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},Mo={h:0,s:0,l:0};function al(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=et.workingColorSpace){if(e=Bc(e,1),t=Nt(t,0,1),n=Nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=al(o,r,e+1/3),this.g=al(o,r,e),this.b=al(o,r,e-1/3)}return et.toWorkingColorSpace(this,i),this}setStyle(e,t=Xt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const n=Xd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}copyLinearToSRGB(e){return this.r=$a(e.r),this.g=$a(e.g),this.b=$a(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return et.fromWorkingColorSpace(Gt.copy(this),e),Math.round(Nt(Gt.r*255,0,255))*65536+Math.round(Nt(Gt.g*255,0,255))*256+Math.round(Nt(Gt.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Gt.copy(this),t);const n=Gt.r,i=Gt.g,r=Gt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Xt){et.fromWorkingColorSpace(Gt.copy(this),e);const t=Gt.r,n=Gt.g,i=Gt.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(Mo);const n=Br(Mi.h,Mo.h,t),i=Br(Mi.s,Mo.s,t),r=Br(Mi.l,Mo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new ie;ie.NAMES=Xd;let mm=0;class yn extends ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=zn,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qr,this.blendDst=Yr,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=ma,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=as,this.stencilZFail=as,this.stencilZPass=as,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zn&&(n.blending=this.blending),this.side!==fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qr&&(n.blendSrc=this.blendSrc),this.blendDst!==Yr&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ma&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==as&&(n.stencilFail=this.stencilFail),this.stencilZFail!==as&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==as&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class vn extends yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mt,this.combine=Ed,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const It=new A,So=new J;class Ct{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return zc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)So.fromBufferAttribute(this,t),So.applyMatrix3(e),this.setXY(t,So.x,So.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pc&&(e.usage=this.usage),e}}class qd extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yd extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}}let gm=0;const dn=new Ie,ll=new gt,_s=new A,on=new pi,fr=new pi,Bt=new A;class St extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vd(e)?Yd:qd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return ll.lookAt(e),ll.updateMatrix(),this.applyMatrix4(ll.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new _t(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];fr.setFromBufferAttribute(a),this.morphTargetsRelative?(Bt.addVectors(on.min,fr.min),on.expandByPoint(Bt),Bt.addVectors(on.max,fr.max),on.expandByPoint(Bt)):(on.expandByPoint(fr.min),on.expandByPoint(fr.max))}on.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Bt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Bt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Bt.fromBufferAttribute(a,c),l&&(_s.fromBufferAttribute(e,c),Bt.add(_s)),i=Math.max(i,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<n.count;N++)a[N]=new A,l[N]=new A;const c=new A,h=new A,u=new A,d=new J,f=new J,g=new J,_=new A,m=new A;function p(N,b,y){c.fromBufferAttribute(n,N),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,N),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[N].add(_),a[b].add(_),a[y].add(_),l[N].add(m),l[b].add(m),l[y].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let N=0,b=v.length;N<b;++N){const y=v[N],I=y.start,B=y.count;for(let z=I,j=I+B;z<j;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const x=new A,S=new A,D=new A,E=new A;function T(N){D.fromBufferAttribute(i,N),E.copy(D);const b=a[N];x.copy(b),x.sub(D.multiplyScalar(D.dot(b))).normalize(),S.crossVectors(E,b);const I=S.dot(l[N])<0?-1:1;o.setXYZW(N,x.x,x.y,x.z,I)}for(let N=0,b=v.length;N<b;++N){const y=v[N],I=y.start,B=y.count;for(let z=I,j=I+B;z<j;z+=3)T(e.getX(z+0)),T(e.getX(z+1)),T(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new A,r=new A,o=new A,a=new A,l=new A,c=new A,h=new A,u=new A;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Ct(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bh=new Ie,ki=new La,wo=new Wn,zh=new A,vs=new A,xs=new A,ys=new A,cl=new A,bo=new A,Ao=new J,Eo=new J,To=new J,kh=new A,Vh=new A,Hh=new A,Co=new A,Ro=new A;class ft extends gt{constructor(e=new St,t=new vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){bo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(cl.fromBufferAttribute(u,e),o?bo.addScaledVector(cl,h):bo.addScaledVector(cl.sub(t),h))}t.add(bo)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(r),ki.copy(e.ray).recast(e.near),!(wo.containsPoint(ki.origin)===!1&&(ki.intersectSphere(wo,zh)===null||ki.origin.distanceToSquared(zh)>(e.far-e.near)**2))&&(Bh.copy(r).invert(),ki.copy(e.ray).applyMatrix4(Bh),!(n.boundingBox!==null&&ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ki)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,D=x;S<D;S+=3){const E=a.getX(S),T=a.getX(S+1),N=a.getX(S+2);i=Po(this,p,e,n,c,h,u,E,T,N),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=a.getX(m),x=a.getX(m+1),S=a.getX(m+2);i=Po(this,o,e,n,c,h,u,v,x,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,D=x;S<D;S+=3){const E=S,T=S+1,N=S+2;i=Po(this,p,e,n,c,h,u,E,T,N),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=m,x=m+1,S=m+2;i=Po(this,o,e,n,c,h,u,v,x,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function _m(s,e,t,n,i,r,o,a){let l;if(e.side===Vt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===fi,a),l===null)return null;Ro.copy(a),Ro.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ro);return c<t.near||c>t.far?null:{distance:c,point:Ro.clone(),object:s}}function Po(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,vs),s.getVertexPosition(l,xs),s.getVertexPosition(c,ys);const h=_m(s,e,t,n,vs,xs,ys,Co);if(h){i&&(Ao.fromBufferAttribute(i,a),Eo.fromBufferAttribute(i,l),To.fromBufferAttribute(i,c),h.uv=In.getInterpolation(Co,vs,xs,ys,Ao,Eo,To,new J)),r&&(Ao.fromBufferAttribute(r,a),Eo.fromBufferAttribute(r,l),To.fromBufferAttribute(r,c),h.uv1=In.getInterpolation(Co,vs,xs,ys,Ao,Eo,To,new J)),o&&(kh.fromBufferAttribute(o,a),Vh.fromBufferAttribute(o,l),Hh.fromBufferAttribute(o,c),h.normal=In.getInterpolation(Co,vs,xs,ys,kh,Vh,Hh,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new A,materialIndex:0};In.getNormal(vs,xs,ys,u.normal),h.face=u}return h}class ir extends St{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(u,2));function g(_,m,p,v,x,S,D,E,T,N,b){const y=S/T,I=D/N,B=S/2,z=D/2,j=E/2,Z=T+1,K=N+1;let Q=0,W=0;const he=new A;for(let me=0;me<K;me++){const ve=me*I-z;for(let ze=0;ze<Z;ze++){const be=ze*y-B;he[_]=be*v,he[m]=ve*x,he[p]=j,c.push(he.x,he.y,he.z),he[_]=0,he[m]=0,he[p]=E>0?1:-1,h.push(he.x,he.y,he.z),u.push(ze/T),u.push(1-me/N),Q+=1}}for(let me=0;me<N;me++)for(let ve=0;ve<T;ve++){const ze=d+ve+Z*me,be=d+ve+Z*(me+1),$=d+(ve+1)+Z*(me+1),ee=d+(ve+1)+Z*me;l.push(ze,be,ee),l.push(be,$,ee),W+=6}a.addGroup(f,W,b),f+=W,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ir(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Js(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Kt(s){const e={};for(let t=0;t<s.length;t++){const n=Js(s[t]);for(const i in n)e[i]=n[i]}return e}function vm(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function $d(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Pi={clone:Js,merge:Kt};var xm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ym=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Lt extends yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xm,this.fragmentShader=ym,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=vm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jd extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=ai}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new A,Gh=new J,Wh=new J;class Yt extends jd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(Or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,Gh,Wh),t.subVectors(Wh,Gh)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Or*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ms=-90,Ss=1;class Mm extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Yt(Ms,Ss,e,t);i.layers=this.layers,this.add(i);const r=new Yt(Ms,Ss,e,t);r.layers=this.layers,this.add(r);const o=new Yt(Ms,Ss,e,t);o.layers=this.layers,this.add(o);const a=new Yt(Ms,Ss,e,t);a.layers=this.layers,this.add(a);const l=new Yt(Ms,Ss,e,t);l.layers=this.layers,this.add(l);const c=new Yt(Ms,Ss,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===ai)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ma)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Kd extends Ut{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Ys,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Sm extends $t{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Kd(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:tt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ir(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:Js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:Et});r.uniforms.tEquirect.value=t;const o=new ft(i,r),a=t.minFilter;return t.minFilter===_n&&(t.minFilter=tt),new Mm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const hl=new A,wm=new A,bm=new Ge;class Ti{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=hl.subVectors(n,t).cross(wm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(hl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bm.getNormalMatrix(e),i=this.coplanarPoint(hl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vi=new Wn,Io=new A;class kc{constructor(e=new Ti,t=new Ti,n=new Ti,i=new Ti,r=new Ti,o=new Ti){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ai){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],v=i[13],x=i[14],S=i[15];if(n[0].setComponents(l-r,d-c,m-f,S-p).normalize(),n[1].setComponents(l+r,d+c,m+f,S+p).normalize(),n[2].setComponents(l+o,d+h,m+g,S+v).normalize(),n[3].setComponents(l-o,d-h,m-g,S-v).normalize(),n[4].setComponents(l-a,d-u,m-_,S-x).normalize(),t===ai)n[5].setComponents(l+a,d+u,m+_,S+x).normalize();else if(t===Ma)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(e){return Vi.center.set(0,0,0),Vi.radius=.7071067811865476,Vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Io.x=i.normal.x>0?e.max.x:e.min.x,Io.y=i.normal.y>0?e.max.y:e.min.y,Io.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Io)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zd(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Am(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(s.bindBuffer(c,a),u.count===-1&&d.length===0&&s.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class mi extends St{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const v=p*d-o;for(let x=0;x<c;x++){const S=x*u-r;g.push(S,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const x=v+c*p,S=v+c*(p+1),D=v+1+c*(p+1),E=v+1+c*p;f.push(x,S,E),f.push(S,D,E)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(_,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Em=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tm=`#ifdef USE_ALPHAHASH
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
#endif`,Cm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Im=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lm=`#ifdef USE_AOMAP
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
#endif`,Dm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nm=`#ifdef USE_BATCHING
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
#endif`,Um=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Om=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zm=`#ifdef USE_IRIDESCENCE
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
#endif`,km=`#ifdef USE_BUMPMAP
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
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ym=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$m=`#if defined( USE_COLOR_ALPHA )
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
#endif`,jm=`#define PI 3.141592653589793
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
} // validated`,Km=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Zm=`vec3 transformedNormal = objectNormal;
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
#endif`,Jm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,eg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ng="gl_FragColor = linearToOutputTexel( gl_FragColor );",ig=`
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
}`,sg=`#ifdef USE_ENVMAP
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
#endif`,rg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,og=`#ifdef USE_ENVMAP
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
#endif`,ag=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lg=`#ifdef USE_ENVMAP
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
#endif`,cg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ug=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fg=`#ifdef USE_GRADIENTMAP
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
}`,pg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_g=`uniform bool receiveShadow;
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
#endif`,vg=`#ifdef USE_ENVMAP
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
#endif`,xg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wg=`PhysicalMaterial material;
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
#endif`,bg=`struct PhysicalMaterial {
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
}`,Ag=`
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
#endif`,Eg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Tg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ig=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ng=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ug=`#if defined( USE_POINTS_UV )
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
#endif`,Fg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vg=`#ifdef USE_MORPHTARGETS
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
#endif`,Hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Xg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$g=`#ifdef USE_NORMALMAP
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
#endif`,jg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,t0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,n0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,i0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,s0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,r0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,l0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,c0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,h0=`float getShadowMask() {
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
}`,u0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,d0=`#ifdef USE_SKINNING
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
#endif`,f0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,p0=`#ifdef USE_SKINNING
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
#endif`,m0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,g0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,v0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,x0=`#ifdef USE_TRANSMISSION
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
#endif`,y0=`#ifdef USE_TRANSMISSION
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
#endif`,M0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const A0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E0=`uniform sampler2D t2D;
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
}`,T0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I0=`#include <common>
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
}`,L0=`#if DEPTH_PACKING == 3200
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
}`,D0=`#define DISTANCE
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
}`,N0=`#define DISTANCE
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
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`uniform float scale;
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
}`,B0=`uniform vec3 diffuse;
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
}`,z0=`#include <common>
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
}`,k0=`uniform vec3 diffuse;
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
}`,V0=`#define LAMBERT
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
}`,H0=`#define LAMBERT
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
}`,G0=`#define MATCAP
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
}`,W0=`#define MATCAP
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
}`,X0=`#define NORMAL
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
}`,q0=`#define NORMAL
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
}`,Y0=`#define PHONG
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
}`,$0=`#define PHONG
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
}`,j0=`#define STANDARD
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
}`,K0=`#define STANDARD
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
}`,Z0=`#define TOON
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
}`,J0=`#define TOON
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
}`,Q0=`uniform float size;
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
}`,e_=`uniform vec3 diffuse;
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
}`,t_=`#include <common>
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
}`,n_=`uniform vec3 color;
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
}`,i_=`uniform float rotation;
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
}`,s_=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Em,alphahash_pars_fragment:Tm,alphamap_fragment:Cm,alphamap_pars_fragment:Rm,alphatest_fragment:Pm,alphatest_pars_fragment:Im,aomap_fragment:Lm,aomap_pars_fragment:Dm,batching_pars_vertex:Nm,batching_vertex:Um,begin_vertex:Fm,beginnormal_vertex:Om,bsdfs:Bm,iridescence_fragment:zm,bumpmap_pars_fragment:km,clipping_planes_fragment:Vm,clipping_planes_pars_fragment:Hm,clipping_planes_pars_vertex:Gm,clipping_planes_vertex:Wm,color_fragment:Xm,color_pars_fragment:qm,color_pars_vertex:Ym,color_vertex:$m,common:jm,cube_uv_reflection_fragment:Km,defaultnormal_vertex:Zm,displacementmap_pars_vertex:Jm,displacementmap_vertex:Qm,emissivemap_fragment:eg,emissivemap_pars_fragment:tg,colorspace_fragment:ng,colorspace_pars_fragment:ig,envmap_fragment:sg,envmap_common_pars_fragment:rg,envmap_pars_fragment:og,envmap_pars_vertex:ag,envmap_physical_pars_fragment:vg,envmap_vertex:lg,fog_vertex:cg,fog_pars_vertex:hg,fog_fragment:ug,fog_pars_fragment:dg,gradientmap_pars_fragment:fg,lightmap_pars_fragment:pg,lights_lambert_fragment:mg,lights_lambert_pars_fragment:gg,lights_pars_begin:_g,lights_toon_fragment:xg,lights_toon_pars_fragment:yg,lights_phong_fragment:Mg,lights_phong_pars_fragment:Sg,lights_physical_fragment:wg,lights_physical_pars_fragment:bg,lights_fragment_begin:Ag,lights_fragment_maps:Eg,lights_fragment_end:Tg,logdepthbuf_fragment:Cg,logdepthbuf_pars_fragment:Rg,logdepthbuf_pars_vertex:Pg,logdepthbuf_vertex:Ig,map_fragment:Lg,map_pars_fragment:Dg,map_particle_fragment:Ng,map_particle_pars_fragment:Ug,metalnessmap_fragment:Fg,metalnessmap_pars_fragment:Og,morphinstance_vertex:Bg,morphcolor_vertex:zg,morphnormal_vertex:kg,morphtarget_pars_vertex:Vg,morphtarget_vertex:Hg,normal_fragment_begin:Gg,normal_fragment_maps:Wg,normal_pars_fragment:Xg,normal_pars_vertex:qg,normal_vertex:Yg,normalmap_pars_fragment:$g,clearcoat_normal_fragment_begin:jg,clearcoat_normal_fragment_maps:Kg,clearcoat_pars_fragment:Zg,iridescence_pars_fragment:Jg,opaque_fragment:Qg,packing:e0,premultiplied_alpha_fragment:t0,project_vertex:n0,dithering_fragment:i0,dithering_pars_fragment:s0,roughnessmap_fragment:r0,roughnessmap_pars_fragment:o0,shadowmap_pars_fragment:a0,shadowmap_pars_vertex:l0,shadowmap_vertex:c0,shadowmask_pars_fragment:h0,skinbase_vertex:u0,skinning_pars_vertex:d0,skinning_vertex:f0,skinnormal_vertex:p0,specularmap_fragment:m0,specularmap_pars_fragment:g0,tonemapping_fragment:_0,tonemapping_pars_fragment:v0,transmission_fragment:x0,transmission_pars_fragment:y0,uv_pars_fragment:M0,uv_pars_vertex:S0,uv_vertex:w0,worldpos_vertex:b0,background_vert:A0,background_frag:E0,backgroundCube_vert:T0,backgroundCube_frag:C0,cube_vert:R0,cube_frag:P0,depth_vert:I0,depth_frag:L0,distanceRGBA_vert:D0,distanceRGBA_frag:N0,equirect_vert:U0,equirect_frag:F0,linedashed_vert:O0,linedashed_frag:B0,meshbasic_vert:z0,meshbasic_frag:k0,meshlambert_vert:V0,meshlambert_frag:H0,meshmatcap_vert:G0,meshmatcap_frag:W0,meshnormal_vert:X0,meshnormal_frag:q0,meshphong_vert:Y0,meshphong_frag:$0,meshphysical_vert:j0,meshphysical_frag:K0,meshtoon_vert:Z0,meshtoon_frag:J0,points_vert:Q0,points_frag:e_,shadow_vert:t_,shadow_frag:n_,sprite_vert:i_,sprite_frag:s_},fe={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},On={basic:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ie(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Kt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Kt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new ie(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Kt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Kt([fe.points,fe.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Kt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Kt([fe.common,fe.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Kt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Kt([fe.sprite,fe.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Kt([fe.common,fe.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Kt([fe.lights,fe.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};On.physical={uniforms:Kt([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Lo={r:0,b:0,g:0},Hi=new Mt,r_=new Ie;function o_(s,e,t,n,i,r,o){const a=new ie(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const S=g(v);S===null?p(a,l):S&&S.isColor&&(p(S,1),x=!0);const D=s.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(v,x){const S=g(x);S&&(S.isCubeTexture||S.mapping===Pa)?(h===void 0&&(h=new ft(new ir(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:Js(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Hi.copy(x.backgroundRotation),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(r_.makeRotationFromEuler(Hi)),h.material.toneMapped=et.getTransfer(S.colorSpace)!==xt,(u!==S||d!==S.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new ft(new mi(2,2),new Lt({name:"BackgroundMaterial",uniforms:Js(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=et.getTransfer(S.colorSpace)!==xt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,x){v.getRGB(Lo,$d(s)),n.buffers.color.setClear(Lo.r,Lo.g,Lo.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(a,l)},render:_,addToRenderList:m}}function a_(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(y,I,B,z,j){let Z=!1;const K=u(z,B,I);r!==K&&(r=K,c(r.object)),Z=f(y,z,B,j),Z&&g(y,z,B,j),j!==null&&e.update(j,s.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,S(y,I,B,z),j!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,I,B){const z=B.wireframe===!0;let j=n[y.id];j===void 0&&(j={},n[y.id]=j);let Z=j[I.id];Z===void 0&&(Z={},j[I.id]=Z);let K=Z[z];return K===void 0&&(K=d(l()),Z[z]=K),K}function d(y){const I=[],B=[],z=[];for(let j=0;j<t;j++)I[j]=0,B[j]=0,z[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:z,object:y,attributes:{},index:null}}function f(y,I,B,z){const j=r.attributes,Z=I.attributes;let K=0;const Q=B.getAttributes();for(const W in Q)if(Q[W].location>=0){const me=j[W];let ve=Z[W];if(ve===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(ve=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(ve=y.instanceColor)),me===void 0||me.attribute!==ve||ve&&me.data!==ve.data)return!0;K++}return r.attributesNum!==K||r.index!==z}function g(y,I,B,z){const j={},Z=I.attributes;let K=0;const Q=B.getAttributes();for(const W in Q)if(Q[W].location>=0){let me=Z[W];me===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(me=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(me=y.instanceColor));const ve={};ve.attribute=me,me&&me.data&&(ve.data=me.data),j[W]=ve,K++}r.attributes=j,r.attributesNum=K,r.index=z}function _(){const y=r.newAttributes;for(let I=0,B=y.length;I<B;I++)y[I]=0}function m(y){p(y,0)}function p(y,I){const B=r.newAttributes,z=r.enabledAttributes,j=r.attributeDivisors;B[y]=1,z[y]===0&&(s.enableVertexAttribArray(y),z[y]=1),j[y]!==I&&(s.vertexAttribDivisor(y,I),j[y]=I)}function v(){const y=r.newAttributes,I=r.enabledAttributes;for(let B=0,z=I.length;B<z;B++)I[B]!==y[B]&&(s.disableVertexAttribArray(B),I[B]=0)}function x(y,I,B,z,j,Z,K){K===!0?s.vertexAttribIPointer(y,I,B,j,Z):s.vertexAttribPointer(y,I,B,z,j,Z)}function S(y,I,B,z){_();const j=z.attributes,Z=B.getAttributes(),K=I.defaultAttributeValues;for(const Q in Z){const W=Z[Q];if(W.location>=0){let he=j[Q];if(he===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(he=y.instanceColor)),he!==void 0){const me=he.normalized,ve=he.itemSize,ze=e.get(he);if(ze===void 0)continue;const be=ze.buffer,$=ze.type,ee=ze.bytesPerElement,de=$===s.INT||$===s.UNSIGNED_INT||he.gpuType===Cc;if(he.isInterleavedBufferAttribute){const ue=he.data,De=ue.stride,we=he.offset;if(ue.isInstancedInterleavedBuffer){for(let Pe=0;Pe<W.locationSize;Pe++)p(W.location+Pe,ue.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Pe=0;Pe<W.locationSize;Pe++)m(W.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,be);for(let Pe=0;Pe<W.locationSize;Pe++)x(W.location+Pe,ve/W.locationSize,$,me,De*ee,(we+ve/W.locationSize*Pe)*ee,de)}else{if(he.isInstancedBufferAttribute){for(let ue=0;ue<W.locationSize;ue++)p(W.location+ue,he.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let ue=0;ue<W.locationSize;ue++)m(W.location+ue);s.bindBuffer(s.ARRAY_BUFFER,be);for(let ue=0;ue<W.locationSize;ue++)x(W.location+ue,ve/W.locationSize,$,me,ve*ee,ve/W.locationSize*ue*ee,de)}}else if(K!==void 0){const me=K[Q];if(me!==void 0)switch(me.length){case 2:s.vertexAttrib2fv(W.location,me);break;case 3:s.vertexAttrib3fv(W.location,me);break;case 4:s.vertexAttrib4fv(W.location,me);break;default:s.vertexAttrib1fv(W.location,me)}}}}v()}function D(){N();for(const y in n){const I=n[y];for(const B in I){const z=I[B];for(const j in z)h(z[j].object),delete z[j];delete I[B]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;const I=n[y.id];for(const B in I){const z=I[B];for(const j in z)h(z[j].object),delete z[j];delete I[B]}delete n[y.id]}function T(y){for(const I in n){const B=n[I];if(B[y.id]===void 0)continue;const z=B[y.id];for(const j in z)h(z[j].object),delete z[j];delete B[y.id]}}function N(){b(),o=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:N,resetDefaultState:b,dispose:D,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function l_(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function c_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==Jt&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const T=E===Dn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Sn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Ln&&!T)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,D=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:S,maxSamples:D}}function h_(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new Ti,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const v=r?0:n,x=v*4;let S=p.clippingState||null;l.value=S,S=h(g,d,x,f);for(let D=0;D!==x;++D)S[D]=t[D];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,S=f;x!==_;++x,S+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function u_(s){let e=new WeakMap;function t(o,a){return a===Bl?o.mapping=Ys:a===zl&&(o.mapping=$s),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Bl||a===zl)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Sm(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class so extends jd{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Vs=4,Xh=[.125,.215,.35,.446,.526,.582],Yi=20,ul=new so,qh=new ie;let dl=null,fl=0,pl=0,ml=!1;const qi=(1+Math.sqrt(5))/2,ws=1/qi,Yh=[new A(-qi,ws,0),new A(qi,ws,0),new A(-ws,0,qi),new A(ws,0,qi),new A(0,qi,-ws),new A(0,qi,ws),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class mc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){dl=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(dl,fl,pl),this._renderer.xr.enabled=ml,e.scissorTest=!1,Do(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ys||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),dl=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:tt,minFilter:tt,generateMipmaps:!1,type:Dn,format:Jt,colorSpace:Rt,depthBuffer:!1},i=$h(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$h(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=d_(r)),this._blurMaterial=f_(r,e,t)}return i}_compileMaterial(e){const t=new ft(this._lodPlanes[0],e);this._renderer.compile(t,ul)}_sceneToCubeUV(e,t,n,i){const a=new Yt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(qh),h.toneMapping=hi,h.autoClear=!1;const f=new vn({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),g=new ft(new ir,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(qh),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):v===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;Do(i,v*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ys||e.mapping===$s;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jh());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new ft(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Do(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ul)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Yh[(i-r-1)%Yh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ft(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Yi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Yi;m>Yi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yi}`);const p=[];let v=0;for(let T=0;T<Yi;++T){const N=T/_,b=Math.exp(-N*N/2);p.push(b),T===0?v+=b:T<m&&(v+=2*b)}for(let T=0;T<p.length;T++)p[T]=p[T]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const S=this._sizeLods[i],D=3*S*(i>x-Vs?i-x+Vs:0),E=4*(this._cubeSize-S);Do(t,D,E,3*S,2*S),l.setRenderTarget(t),l.render(u,ul)}}function d_(s){const e=[],t=[],n=[];let i=s;const r=s-Vs+1+Xh.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Vs?l=Xh[o-s+Vs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*f),x=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let E=0;E<f;E++){const T=E%3*2/3-1,N=E>2?0:-1,b=[T,N,0,T+2/3,N,0,T+2/3,N+1,0,T,N,0,T+2/3,N+1,0,T,N+1,0];v.set(b,_*g*E),x.set(d,m*g*E);const y=[E,E,E,E,E,E];S.set(y,p*g*E)}const D=new St;D.setAttribute("position",new Ct(v,_)),D.setAttribute("uv",new Ct(x,m)),D.setAttribute("faceIndex",new Ct(S,p)),e.push(D),i>Vs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function $h(s,e,t){const n=new $t(s,e,t);return n.texture.mapping=Pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Do(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function f_(s,e,t){const n=new Float32Array(Yi),i=new A(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:Yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Vc(),fragmentShader:`

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
		`,blending:Et,depthTest:!1,depthWrite:!1})}function jh(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vc(),fragmentShader:`

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
		`,blending:Et,depthTest:!1,depthWrite:!1})}function Kh(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Et,depthTest:!1,depthWrite:!1})}function Vc(){return`

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
	`}function p_(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Bl||l===zl,h=l===Ys||l===$s;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new mc(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new mc(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function m_(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&zc("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function g_(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,S=v.length;x<S;x+=3){const D=v[x+0],E=v[x+1],T=v[x+2];d.push(D,E,E,T,T,D)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,S=v.length/3-1;x<S;x+=3){const D=x+0,E=x+1,T=x+2;d.push(D,E,E,T,T,D)}}else return;const m=new(Vd(d)?Yd:qd)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function __(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v];for(let v=0;v<_.length;v++)t.update(p,n,_[v])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function v_(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function x_(s,e,t){const n=new WeakMap,i=new Ze;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let y=function(){N.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let D=a.attributes.position.count*S,E=1;D>e.maxTextureSize&&(E=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const T=new Float32Array(D*E*4*u),N=new Gd(T,D,E,u);N.type=Ln,N.needsUpdate=!0;const b=S*4;for(let I=0;I<u;I++){const B=p[I],z=v[I],j=x[I],Z=D*E*4*I;for(let K=0;K<B.count;K++){const Q=K*b;g===!0&&(i.fromBufferAttribute(B,K),T[Z+Q+0]=i.x,T[Z+Q+1]=i.y,T[Z+Q+2]=i.z,T[Z+Q+3]=0),_===!0&&(i.fromBufferAttribute(z,K),T[Z+Q+4]=i.x,T[Z+Q+5]=i.y,T[Z+Q+6]=i.z,T[Z+Q+7]=0),m===!0&&(i.fromBufferAttribute(j,K),T[Z+Q+8]=i.x,T[Z+Q+9]=i.y,T[Z+Q+10]=i.z,T[Z+Q+11]=j.itemSize===4?i.w:1)}}d={count:u,texture:N,size:new J(D,E)},n.set(a,d),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function y_(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Jr extends Ut{constructor(e,t,n,i,r,o,a,l,c,h=Di){if(h!==Di&&h!==Ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Di&&(n=ts),n===void 0&&h===Ks&&(n=js),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Qe,this.minFilter=l!==void 0?l:Qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Jd=new Ut,Zh=new Jr(1,1),Qd=new Gd,ef=new am,tf=new Kd,Jh=[],Qh=[],eu=new Float32Array(16),tu=new Float32Array(9),nu=new Float32Array(4);function sr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Jh[i];if(r===void 0&&(r=new Float32Array(i),Jh[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Ft(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Ot(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Da(s,e){let t=Qh[e];t===void 0&&(t=new Int32Array(e),Qh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function M_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function S_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;s.uniform2fv(this.addr,e),Ot(t,e)}}function w_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;s.uniform3fv(this.addr,e),Ot(t,e)}}function b_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;s.uniform4fv(this.addr,e),Ot(t,e)}}function A_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;nu.set(n),s.uniformMatrix2fv(this.addr,!1,nu),Ot(t,n)}}function E_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;tu.set(n),s.uniformMatrix3fv(this.addr,!1,tu),Ot(t,n)}}function T_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;eu.set(n),s.uniformMatrix4fv(this.addr,!1,eu),Ot(t,n)}}function C_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function R_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;s.uniform2iv(this.addr,e),Ot(t,e)}}function P_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;s.uniform3iv(this.addr,e),Ot(t,e)}}function I_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;s.uniform4iv(this.addr,e),Ot(t,e)}}function L_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function D_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;s.uniform2uiv(this.addr,e),Ot(t,e)}}function N_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;s.uniform3uiv(this.addr,e),Ot(t,e)}}function U_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;s.uniform4uiv(this.addr,e),Ot(t,e)}}function F_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Zh.compareFunction=kd,r=Zh):r=Jd,t.setTexture2D(e||r,i)}function O_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ef,i)}function B_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||tf,i)}function z_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Qd,i)}function k_(s){switch(s){case 5126:return M_;case 35664:return S_;case 35665:return w_;case 35666:return b_;case 35674:return A_;case 35675:return E_;case 35676:return T_;case 5124:case 35670:return C_;case 35667:case 35671:return R_;case 35668:case 35672:return P_;case 35669:case 35673:return I_;case 5125:return L_;case 36294:return D_;case 36295:return N_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return F_;case 35679:case 36299:case 36307:return O_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return z_}}function V_(s,e){s.uniform1fv(this.addr,e)}function H_(s,e){const t=sr(e,this.size,2);s.uniform2fv(this.addr,t)}function G_(s,e){const t=sr(e,this.size,3);s.uniform3fv(this.addr,t)}function W_(s,e){const t=sr(e,this.size,4);s.uniform4fv(this.addr,t)}function X_(s,e){const t=sr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function q_(s,e){const t=sr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Y_(s,e){const t=sr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function $_(s,e){s.uniform1iv(this.addr,e)}function j_(s,e){s.uniform2iv(this.addr,e)}function K_(s,e){s.uniform3iv(this.addr,e)}function Z_(s,e){s.uniform4iv(this.addr,e)}function J_(s,e){s.uniform1uiv(this.addr,e)}function Q_(s,e){s.uniform2uiv(this.addr,e)}function ev(s,e){s.uniform3uiv(this.addr,e)}function tv(s,e){s.uniform4uiv(this.addr,e)}function nv(s,e,t){const n=this.cache,i=e.length,r=Da(t,i);Ft(n,r)||(s.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Jd,r[o])}function iv(s,e,t){const n=this.cache,i=e.length,r=Da(t,i);Ft(n,r)||(s.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ef,r[o])}function sv(s,e,t){const n=this.cache,i=e.length,r=Da(t,i);Ft(n,r)||(s.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||tf,r[o])}function rv(s,e,t){const n=this.cache,i=e.length,r=Da(t,i);Ft(n,r)||(s.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Qd,r[o])}function ov(s){switch(s){case 5126:return V_;case 35664:return H_;case 35665:return G_;case 35666:return W_;case 35674:return X_;case 35675:return q_;case 35676:return Y_;case 5124:case 35670:return $_;case 35667:case 35671:return j_;case 35668:case 35672:return K_;case 35669:case 35673:return Z_;case 5125:return J_;case 36294:return Q_;case 36295:return ev;case 36296:return tv;case 35678:case 36198:case 36298:case 36306:case 35682:return nv;case 35679:case 36299:case 36307:return iv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return rv}}class av{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=k_(t.type)}}class lv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ov(t.type)}}class cv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const gl=/(\w+)(\])?(\[|\.)?/g;function iu(s,e){s.seq.push(e),s.map[e.id]=e}function hv(s,e,t){const n=s.name,i=n.length;for(gl.lastIndex=0;;){const r=gl.exec(n),o=gl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){iu(t,c===void 0?new av(a,s,e):new lv(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new cv(a),iu(t,u)),t=u}}}class sa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);hv(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function su(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const uv=37297;let dv=0;function fv(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function pv(s){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(s);let n;switch(e===t?n="":e===ya&&t===xa?n="LinearDisplayP3ToLinearSRGB":e===xa&&t===ya&&(n="LinearSRGBToLinearDisplayP3"),s){case Rt:case Ia:return[n,"LinearTransferOETF"];case Xt:case Oc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function ru(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+fv(s.getShaderSource(e),o)}else return i}function mv(s,e){const t=pv(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function gv(s,e){let t;switch(e){case _p:t="Linear";break;case vp:t="Reinhard";break;case xp:t="OptimizedCineon";break;case Td:t="ACESFilmic";break;case Mp:t="AgX";break;case Sp:t="Neutral";break;case yp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function _v(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function vv(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xv(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Cr(s){return s!==""}function ou(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function au(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function gc(s){return s.replace(yv,Sv)}const Mv=new Map;function Sv(s,e){let t=He[e];if(t===void 0){const n=Mv.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return gc(t)}const wv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lu(s){return s.replace(wv,bv)}function bv(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function cu(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Av(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ad?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Gf?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ei&&(e="SHADOWMAP_TYPE_VSM"),e}function Ev(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ys:case $s:e="ENVMAP_TYPE_CUBE";break;case Pa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Tv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case $s:e="ENVMAP_MODE_REFRACTION";break}return e}function Cv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ed:e="ENVMAP_BLENDING_MULTIPLY";break;case mp:e="ENVMAP_BLENDING_MIX";break;case gp:e="ENVMAP_BLENDING_ADD";break}return e}function Rv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Pv(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Av(t),c=Ev(t),h=Tv(t),u=Cv(t),d=Rv(t),f=_v(t),g=vv(r),_=i.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cr).join(`
`),p.length>0&&(p+=`
`)):(m=[cu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),p=[cu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hi?"#define TONE_MAPPING":"",t.toneMapping!==hi?He.tonemapping_pars_fragment:"",t.toneMapping!==hi?gv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,mv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),o=gc(o),o=ou(o,t),o=au(o,t),a=gc(a),a=ou(a,t),a=au(a,t),o=lu(o),a=lu(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=v+m+o,S=v+p+a,D=su(i,i.VERTEX_SHADER,x),E=su(i,i.FRAGMENT_SHADER,S);i.attachShader(_,D),i.attachShader(_,E),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(I){if(s.debug.checkShaderErrors){const B=i.getProgramInfoLog(_).trim(),z=i.getShaderInfoLog(D).trim(),j=i.getShaderInfoLog(E).trim();let Z=!0,K=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,D,E);else{const Q=ru(i,D,"vertex"),W=ru(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+Q+`
`+W)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(z===""||j==="")&&(K=!1);K&&(I.diagnostics={runnable:Z,programLog:B,vertexShader:{log:z,prefix:m},fragmentShader:{log:j,prefix:p}})}i.deleteShader(D),i.deleteShader(E),N=new sa(i,_),b=xv(i,_)}let N;this.getUniforms=function(){return N===void 0&&T(this),N};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,uv)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=E,this}let Iv=0;class Lv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Dv(e),t.set(e,n)),n}}class Dv{constructor(e){this.id=Iv++,this.code=e,this.usedTimes=0}}function Nv(s,e,t,n,i,r,o){const a=new Wd,l=new Lv,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,y,I,B,z){const j=B.fog,Z=z.geometry,K=b.isMeshStandardMaterial?B.environment:null,Q=(b.isMeshStandardMaterial?t:e).get(b.envMap||K),W=Q&&Q.mapping===Pa?Q.image.height:null,he=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const me=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ve=me!==void 0?me.length:0;let ze=0;Z.morphAttributes.position!==void 0&&(ze=1),Z.morphAttributes.normal!==void 0&&(ze=2),Z.morphAttributes.color!==void 0&&(ze=3);let be,$,ee,de;if(he){const $e=On[he];be=$e.vertexShader,$=$e.fragmentShader}else be=b.vertexShader,$=b.fragmentShader,l.update(b),ee=l.getVertexShaderID(b),de=l.getFragmentShaderID(b);const ue=s.getRenderTarget(),De=z.isInstancedMesh===!0,we=z.isBatchedMesh===!0,Pe=!!b.map,Je=!!b.matcap,L=!!Q,nt=!!b.aoMap,je=!!b.lightMap,Xe=!!b.bumpMap,Me=!!b.normalMap,lt=!!b.displacementMap,Ne=!!b.emissiveMap,Be=!!b.metalnessMap,R=!!b.roughnessMap,M=b.anisotropy>0,X=b.clearcoat>0,se=b.dispersion>0,re=b.iridescence>0,te=b.sheen>0,Ee=b.transmission>0,le=M&&!!b.anisotropyMap,ge=X&&!!b.clearcoatMap,ke=X&&!!b.clearcoatNormalMap,ae=X&&!!b.clearcoatRoughnessMap,pe=re&&!!b.iridescenceMap,qe=re&&!!b.iridescenceThicknessMap,Te=te&&!!b.sheenColorMap,xe=te&&!!b.sheenRoughnessMap,Ce=!!b.specularMap,Fe=!!b.specularColorMap,pt=!!b.specularIntensityMap,U=Ee&&!!b.transmissionMap,oe=Ee&&!!b.thicknessMap,V=!!b.gradientMap,H=!!b.alphaMap,ne=b.alphaTest>0,Ae=!!b.alphaHash,Ve=!!b.extensions;let ct=hi;b.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(ct=s.toneMapping);const wt={shaderID:he,shaderType:b.type,shaderName:b.name,vertexShader:be,fragmentShader:$,defines:b.defines,customVertexShaderID:ee,customFragmentShaderID:de,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:we,batchingColor:we&&z._colorsTexture!==null,instancing:De,instancingColor:De&&z.instanceColor!==null,instancingMorph:De&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ue===null?s.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Rt,alphaToCoverage:!!b.alphaToCoverage,map:Pe,matcap:Je,envMap:L,envMapMode:L&&Q.mapping,envMapCubeUVHeight:W,aoMap:nt,lightMap:je,bumpMap:Xe,normalMap:Me,displacementMap:d&&lt,emissiveMap:Ne,normalMapObjectSpace:Me&&b.normalMapType===Rp,normalMapTangentSpace:Me&&b.normalMapType===Fc,metalnessMap:Be,roughnessMap:R,anisotropy:M,anisotropyMap:le,clearcoat:X,clearcoatMap:ge,clearcoatNormalMap:ke,clearcoatRoughnessMap:ae,dispersion:se,iridescence:re,iridescenceMap:pe,iridescenceThicknessMap:qe,sheen:te,sheenColorMap:Te,sheenRoughnessMap:xe,specularMap:Ce,specularColorMap:Fe,specularIntensityMap:pt,transmission:Ee,transmissionMap:U,thicknessMap:oe,gradientMap:V,opaque:b.transparent===!1&&b.blending===zn&&b.alphaToCoverage===!1,alphaMap:H,alphaTest:ne,alphaHash:Ae,combine:b.combine,mapUv:Pe&&_(b.map.channel),aoMapUv:nt&&_(b.aoMap.channel),lightMapUv:je&&_(b.lightMap.channel),bumpMapUv:Xe&&_(b.bumpMap.channel),normalMapUv:Me&&_(b.normalMap.channel),displacementMapUv:lt&&_(b.displacementMap.channel),emissiveMapUv:Ne&&_(b.emissiveMap.channel),metalnessMapUv:Be&&_(b.metalnessMap.channel),roughnessMapUv:R&&_(b.roughnessMap.channel),anisotropyMapUv:le&&_(b.anisotropyMap.channel),clearcoatMapUv:ge&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:ke&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:xe&&_(b.sheenRoughnessMap.channel),specularMapUv:Ce&&_(b.specularMap.channel),specularColorMapUv:Fe&&_(b.specularColorMap.channel),specularIntensityMapUv:pt&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:oe&&_(b.thicknessMap.channel),alphaMapUv:H&&_(b.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Me||M),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Z.attributes.uv&&(Pe||H),fog:!!j,useFog:b.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:z.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:ze,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:ct,decodeVideoTexture:Pe&&b.map.isVideoTexture===!0&&et.getTransfer(b.map.colorSpace)===xt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===mn,flipSided:b.side===Vt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ve&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&b.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return wt.vertexUv1s=c.has(1),wt.vertexUv2s=c.has(2),wt.vertexUv3s=c.has(3),c.clear(),wt}function p(b){const y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)y.push(I),y.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(v(y,b),x(y,b),y.push(s.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function v(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function x(b,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.doubleSided&&a.enable(10),y.flipSided&&a.enable(11),y.useDepthPacking&&a.enable(12),y.dithering&&a.enable(13),y.transmission&&a.enable(14),y.sheen&&a.enable(15),y.opaque&&a.enable(16),y.pointsUvs&&a.enable(17),y.decodeVideoTexture&&a.enable(18),y.alphaToCoverage&&a.enable(19),b.push(a.mask)}function S(b){const y=g[b.type];let I;if(y){const B=On[y];I=Pi.clone(B.uniforms)}else I=b.uniforms;return I}function D(b,y){let I;for(let B=0,z=h.length;B<z;B++){const j=h[B];if(j.cacheKey===y){I=j,++I.usedTimes;break}}return I===void 0&&(I=new Pv(s,y,b,r),h.push(I)),I}function E(b){if(--b.usedTimes===0){const y=h.indexOf(b);h[y]=h[h.length-1],h.pop(),b.destroy()}}function T(b){l.remove(b)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:D,releaseProgram:E,releaseShaderCache:T,programs:h,dispose:N}}function Uv(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Fv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function hu(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function uu(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Fv),n.length>1&&n.sort(d||hu),i.length>1&&i.sort(d||hu)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Ov(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new uu,s.set(n,[o])):i>=r.length?(o=new uu,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Bv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new ie};break;case"SpotLight":t={position:new A,direction:new A,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":t={color:new ie,position:new A,halfWidth:new A,halfHeight:new A};break}return s[e.id]=t,t}}}function zv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let kv=0;function Vv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Hv(s){const e=new Bv,t=zv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const i=new A,r=new Ie,o=new Ie;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,v=0,x=0,S=0,D=0,E=0,T=0;c.sort(Vv);for(let b=0,y=c.length;b<y;b++){const I=c[b],B=I.color,z=I.intensity,j=I.distance,Z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=B.r*z,u+=B.g*z,d+=B.b*z;else if(I.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(I.sh.coefficients[K],z);T++}else if(I.isDirectionalLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Q=I.shadow,W=t.get(I);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=I.shadow.matrix,v++}n.directional[f]=K,f++}else if(I.isSpotLight){const K=e.get(I);K.position.setFromMatrixPosition(I.matrixWorld),K.color.copy(B).multiplyScalar(z),K.distance=j,K.coneCos=Math.cos(I.angle),K.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),K.decay=I.decay,n.spot[_]=K;const Q=I.shadow;if(I.map&&(n.spotLightMap[D]=I.map,D++,Q.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[_]=Q.matrix,I.castShadow){const W=t.get(I);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Z,S++}_++}else if(I.isRectAreaLight){const K=e.get(I);K.color.copy(B).multiplyScalar(z),K.halfWidth.set(I.width*.5,0,0),K.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=K,m++}else if(I.isPointLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),K.distance=I.distance,K.decay=I.decay,I.castShadow){const Q=I.shadow,W=t.get(I);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=I.shadow.matrix,x++}n.point[g]=K,g++}else if(I.isHemisphereLight){const K=e.get(I);K.skyColor.copy(I.color).multiplyScalar(z),K.groundColor.copy(I.groundColor).multiplyScalar(z),n.hemi[p]=K,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const N=n.hash;(N.directionalLength!==f||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==v||N.numPointShadows!==x||N.numSpotShadows!==S||N.numSpotMaps!==D||N.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=S+D-E,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,N.directionalLength=f,N.pointLength=g,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=v,N.numPointShadows=x,N.numSpotShadows=S,N.numSpotMaps=D,N.numLightProbes=T,n.version=kv++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const x=c[p];if(x.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),u++}else if(x.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function du(s){const e=new Hv(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Gv(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new du(s),e.set(i,[a])):r>=o.length?(a=new du(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Wv extends yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xv extends yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const qv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yv=`uniform sampler2D shadow_pass;
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
}`;function $v(s,e,t){let n=new kc;const i=new J,r=new J,o=new Ze,a=new Wv({depthPacking:Cp}),l=new Xv,c={},h=t.maxTextureSize,u={[fi]:Vt,[Vt]:fi,[mn]:mn},d=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:qv,fragmentShader:Yv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ft(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ad;let p=this.type;this.render=function(E,T,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const b=s.getRenderTarget(),y=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),B=s.state;B.setBlending(Et),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const z=p!==ei&&this.type===ei,j=p===ei&&this.type!==ei;for(let Z=0,K=E.length;Z<K;Z++){const Q=E[Z],W=Q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const he=W.getFrameExtents();if(i.multiply(he),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/he.x),i.x=r.x*he.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/he.y),i.y=r.y*he.y,W.mapSize.y=r.y)),W.map===null||z===!0||j===!0){const ve=this.type!==ei?{minFilter:Qe,magFilter:Qe}:{};W.map!==null&&W.map.dispose(),W.map=new $t(i.x,i.y,ve),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const me=W.getViewportCount();for(let ve=0;ve<me;ve++){const ze=W.getViewport(ve);o.set(r.x*ze.x,r.y*ze.y,r.x*ze.z,r.y*ze.w),B.viewport(o),W.updateMatrices(Q,ve),n=W.getFrustum(),S(T,N,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===ei&&v(W,N),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,y,I)};function v(E,T){const N=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new $t(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(T,null,N,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(T,null,N,f,_,null)}function x(E,T,N,b){let y=null;const I=N.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)y=I;else if(y=N.isPointLight===!0?l:a,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const B=y.uuid,z=T.uuid;let j=c[B];j===void 0&&(j={},c[B]=j);let Z=j[z];Z===void 0&&(Z=y.clone(),j[z]=Z,T.addEventListener("dispose",D)),y=Z}if(y.visible=T.visible,y.wireframe=T.wireframe,b===ei?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:u[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,N.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=s.properties.get(y);B.light=N}return y}function S(E,T,N,b,y){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===ei)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,E.matrixWorld);const z=e.update(E),j=E.material;if(Array.isArray(j)){const Z=z.groups;for(let K=0,Q=Z.length;K<Q;K++){const W=Z[K],he=j[W.materialIndex];if(he&&he.visible){const me=x(E,he,b,y);E.onBeforeShadow(s,E,T,N,z,me,W),s.renderBufferDirect(N,null,z,me,E,W),E.onAfterShadow(s,E,T,N,z,me,W)}}}else if(j.visible){const Z=x(E,j,b,y);E.onBeforeShadow(s,E,T,N,z,Z,null),s.renderBufferDirect(N,null,z,Z,E,null),E.onAfterShadow(s,E,T,N,z,Z,null)}}const B=E.children;for(let z=0,j=B.length;z<j;z++)S(B[z],T,N,b,y)}function D(E){E.target.removeEventListener("dispose",D);for(const N in c){const b=c[N],y=E.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}function jv(s){function e(){let U=!1;const oe=new Ze;let V=null;const H=new Ze(0,0,0,0);return{setMask:function(ne){V!==ne&&!U&&(s.colorMask(ne,ne,ne,ne),V=ne)},setLocked:function(ne){U=ne},setClear:function(ne,Ae,Ve,ct,wt){wt===!0&&(ne*=ct,Ae*=ct,Ve*=ct),oe.set(ne,Ae,Ve,ct),H.equals(oe)===!1&&(s.clearColor(ne,Ae,Ve,ct),H.copy(oe))},reset:function(){U=!1,V=null,H.set(-1,0,0,0)}}}function t(){let U=!1,oe=null,V=null,H=null;return{setTest:function(ne){ne?de(s.DEPTH_TEST):ue(s.DEPTH_TEST)},setMask:function(ne){oe!==ne&&!U&&(s.depthMask(ne),oe=ne)},setFunc:function(ne){if(V!==ne){switch(ne){case lp:s.depthFunc(s.NEVER);break;case cp:s.depthFunc(s.ALWAYS);break;case hp:s.depthFunc(s.LESS);break;case ma:s.depthFunc(s.LEQUAL);break;case up:s.depthFunc(s.EQUAL);break;case dp:s.depthFunc(s.GEQUAL);break;case fp:s.depthFunc(s.GREATER);break;case pp:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}V=ne}},setLocked:function(ne){U=ne},setClear:function(ne){H!==ne&&(s.clearDepth(ne),H=ne)},reset:function(){U=!1,oe=null,V=null,H=null}}}function n(){let U=!1,oe=null,V=null,H=null,ne=null,Ae=null,Ve=null,ct=null,wt=null;return{setTest:function($e){U||($e?de(s.STENCIL_TEST):ue(s.STENCIL_TEST))},setMask:function($e){oe!==$e&&!U&&(s.stencilMask($e),oe=$e)},setFunc:function($e,en,mt){(V!==$e||H!==en||ne!==mt)&&(s.stencilFunc($e,en,mt),V=$e,H=en,ne=mt)},setOp:function($e,en,mt){(Ae!==$e||Ve!==en||ct!==mt)&&(s.stencilOp($e,en,mt),Ae=$e,Ve=en,ct=mt)},setLocked:function($e){U=$e},setClear:function($e){wt!==$e&&(s.clearStencil($e),wt=$e)},reset:function(){U=!1,oe=null,V=null,H=null,ne=null,Ae=null,Ve=null,ct=null,wt=null}}}const i=new e,r=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,v=null,x=null,S=null,D=null,E=new ie(0,0,0),T=0,N=!1,b=null,y=null,I=null,B=null,z=null;const j=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,K=0;const Q=s.getParameter(s.VERSION);Q.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Z=K>=1):Q.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Z=K>=2);let W=null,he={};const me=s.getParameter(s.SCISSOR_BOX),ve=s.getParameter(s.VIEWPORT),ze=new Ze().fromArray(me),be=new Ze().fromArray(ve);function $(U,oe,V,H){const ne=new Uint8Array(4),Ae=s.createTexture();s.bindTexture(U,Ae),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ve=0;Ve<V;Ve++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(oe,0,s.RGBA,1,1,H,0,s.RGBA,s.UNSIGNED_BYTE,ne):s.texImage2D(oe+Ve,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ne);return Ae}const ee={};ee[s.TEXTURE_2D]=$(s.TEXTURE_2D,s.TEXTURE_2D,1),ee[s.TEXTURE_CUBE_MAP]=$(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[s.TEXTURE_2D_ARRAY]=$(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ee[s.TEXTURE_3D]=$(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),de(s.DEPTH_TEST),r.setFunc(ma),Xe(!1),Me(xh),de(s.CULL_FACE),nt(Et);function de(U){c[U]!==!0&&(s.enable(U),c[U]=!0)}function ue(U){c[U]!==!1&&(s.disable(U),c[U]=!1)}function De(U,oe){return h[U]!==oe?(s.bindFramebuffer(U,oe),h[U]=oe,U===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=oe),U===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=oe),!0):!1}function we(U,oe){let V=d,H=!1;if(U){V=u.get(oe),V===void 0&&(V=[],u.set(oe,V));const ne=U.textures;if(V.length!==ne.length||V[0]!==s.COLOR_ATTACHMENT0){for(let Ae=0,Ve=ne.length;Ae<Ve;Ae++)V[Ae]=s.COLOR_ATTACHMENT0+Ae;V.length=ne.length,H=!0}}else V[0]!==s.BACK&&(V[0]=s.BACK,H=!0);H&&s.drawBuffers(V)}function Pe(U){return f!==U?(s.useProgram(U),f=U,!0):!1}const Je={[ri]:s.FUNC_ADD,[Xf]:s.FUNC_SUBTRACT,[qf]:s.FUNC_REVERSE_SUBTRACT};Je[Yf]=s.MIN,Je[$f]=s.MAX;const L={[jf]:s.ZERO,[Kf]:s.ONE,[Zf]:s.SRC_COLOR,[qr]:s.SRC_ALPHA,[ip]:s.SRC_ALPHA_SATURATE,[tp]:s.DST_COLOR,[Qf]:s.DST_ALPHA,[Jf]:s.ONE_MINUS_SRC_COLOR,[Yr]:s.ONE_MINUS_SRC_ALPHA,[np]:s.ONE_MINUS_DST_COLOR,[ep]:s.ONE_MINUS_DST_ALPHA,[sp]:s.CONSTANT_COLOR,[rp]:s.ONE_MINUS_CONSTANT_COLOR,[op]:s.CONSTANT_ALPHA,[ap]:s.ONE_MINUS_CONSTANT_ALPHA};function nt(U,oe,V,H,ne,Ae,Ve,ct,wt,$e){if(U===Et){g===!0&&(ue(s.BLEND),g=!1);return}if(g===!1&&(de(s.BLEND),g=!0),U!==Wf){if(U!==_||$e!==N){if((m!==ri||x!==ri)&&(s.blendEquation(s.FUNC_ADD),m=ri,x=ri),$e)switch(U){case zn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Hn:s.blendFunc(s.ONE,s.ONE);break;case yh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Mh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case zn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Hn:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case yh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Mh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}p=null,v=null,S=null,D=null,E.set(0,0,0),T=0,_=U,N=$e}return}ne=ne||oe,Ae=Ae||V,Ve=Ve||H,(oe!==m||ne!==x)&&(s.blendEquationSeparate(Je[oe],Je[ne]),m=oe,x=ne),(V!==p||H!==v||Ae!==S||Ve!==D)&&(s.blendFuncSeparate(L[V],L[H],L[Ae],L[Ve]),p=V,v=H,S=Ae,D=Ve),(ct.equals(E)===!1||wt!==T)&&(s.blendColor(ct.r,ct.g,ct.b,wt),E.copy(ct),T=wt),_=U,N=!1}function je(U,oe){U.side===mn?ue(s.CULL_FACE):de(s.CULL_FACE);let V=U.side===Vt;oe&&(V=!V),Xe(V),U.blending===zn&&U.transparent===!1?nt(Et):nt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),i.setMask(U.colorWrite);const H=U.stencilWrite;o.setTest(H),H&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ne(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?de(s.SAMPLE_ALPHA_TO_COVERAGE):ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(U){b!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),b=U)}function Me(U){U!==Vf?(de(s.CULL_FACE),U!==y&&(U===xh?s.cullFace(s.BACK):U===Hf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ue(s.CULL_FACE),y=U}function lt(U){U!==I&&(Z&&s.lineWidth(U),I=U)}function Ne(U,oe,V){U?(de(s.POLYGON_OFFSET_FILL),(B!==oe||z!==V)&&(s.polygonOffset(oe,V),B=oe,z=V)):ue(s.POLYGON_OFFSET_FILL)}function Be(U){U?de(s.SCISSOR_TEST):ue(s.SCISSOR_TEST)}function R(U){U===void 0&&(U=s.TEXTURE0+j-1),W!==U&&(s.activeTexture(U),W=U)}function M(U,oe,V){V===void 0&&(W===null?V=s.TEXTURE0+j-1:V=W);let H=he[V];H===void 0&&(H={type:void 0,texture:void 0},he[V]=H),(H.type!==U||H.texture!==oe)&&(W!==V&&(s.activeTexture(V),W=V),s.bindTexture(U,oe||ee[U]),H.type=U,H.texture=oe)}function X(){const U=he[W];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function se(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ke(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ae(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function qe(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(U){ze.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),ze.copy(U))}function xe(U){be.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),be.copy(U))}function Ce(U,oe){let V=l.get(oe);V===void 0&&(V=new WeakMap,l.set(oe,V));let H=V.get(U);H===void 0&&(H=s.getUniformBlockIndex(oe,U.name),V.set(U,H))}function Fe(U,oe){const H=l.get(oe).get(U);a.get(oe)!==H&&(s.uniformBlockBinding(oe,H,U.__bindingPointIndex),a.set(oe,H))}function pt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},W=null,he={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,v=null,x=null,S=null,D=null,E=new ie(0,0,0),T=0,N=!1,b=null,y=null,I=null,B=null,z=null,ze.set(0,0,s.canvas.width,s.canvas.height),be.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:de,disable:ue,bindFramebuffer:De,drawBuffers:we,useProgram:Pe,setBlending:nt,setMaterial:je,setFlipSided:Xe,setCullFace:Me,setLineWidth:lt,setPolygonOffset:Ne,setScissorTest:Be,activeTexture:R,bindTexture:M,unbindTexture:X,compressedTexImage2D:se,compressedTexImage3D:re,texImage2D:pe,texImage3D:qe,updateUBOMapping:Ce,uniformBlockBinding:Fe,texStorage2D:ke,texStorage3D:ae,texSubImage2D:te,texSubImage3D:Ee,compressedTexSubImage2D:le,compressedTexSubImage3D:ge,scissor:Te,viewport:xe,reset:pt}}function fu(s,e,t,n){const i=Kv(n);switch(t){case Dd:return s*e;case Ud:return s*e;case Fd:return s*e*2;case Ic:return s*e/i.components*i.byteLength;case Lc:return s*e/i.components*i.byteLength;case Od:return s*e*2/i.components*i.byteLength;case Dc:return s*e*2/i.components*i.byteLength;case Nd:return s*e*3/i.components*i.byteLength;case Jt:return s*e*4/i.components*i.byteLength;case Nc:return s*e*4/i.components*i.byteLength;case Qo:case ea:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ta:case na:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Vl:case Gl:return Math.max(s,16)*Math.max(e,8)/4;case kl:case Hl:return Math.max(s,8)*Math.max(e,8)/2;case Wl:case Xl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ql:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Yl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case $l:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case jl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Kl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Zl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Jl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ql:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ec:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case tc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case nc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ic:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case sc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case rc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case oc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case ia:case ac:case lc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Bd:case cc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case hc:case uc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Kv(s){switch(s){case Sn:case Pd:return{byteLength:1,components:1};case Ui:case Id:case Dn:return{byteLength:2,components:1};case Rc:case Pc:return{byteLength:2,components:4};case ts:case Cc:case Ln:return{byteLength:4,components:1};case Ld:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Zv(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new J,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return f?new OffscreenCanvas(R,M):Zr("canvas")}function _(R,M,X){let se=1;const re=Be(R);if((re.width>X||re.height>X)&&(se=X/Math.max(re.width,re.height)),se<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const te=Math.floor(se*re.width),Ee=Math.floor(se*re.height);u===void 0&&(u=g(te,Ee));const le=M?g(te,Ee):u;return le.width=te,le.height=Ee,le.getContext("2d").drawImage(R,0,0,te,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+te+"x"+Ee+")."),le}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),R;return R}function m(R){return R.generateMipmaps&&R.minFilter!==Qe&&R.minFilter!==tt}function p(R){s.generateMipmap(R)}function v(R,M,X,se,re=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let te=M;if(M===s.RED&&(X===s.FLOAT&&(te=s.R32F),X===s.HALF_FLOAT&&(te=s.R16F),X===s.UNSIGNED_BYTE&&(te=s.R8)),M===s.RED_INTEGER&&(X===s.UNSIGNED_BYTE&&(te=s.R8UI),X===s.UNSIGNED_SHORT&&(te=s.R16UI),X===s.UNSIGNED_INT&&(te=s.R32UI),X===s.BYTE&&(te=s.R8I),X===s.SHORT&&(te=s.R16I),X===s.INT&&(te=s.R32I)),M===s.RG&&(X===s.FLOAT&&(te=s.RG32F),X===s.HALF_FLOAT&&(te=s.RG16F),X===s.UNSIGNED_BYTE&&(te=s.RG8)),M===s.RG_INTEGER&&(X===s.UNSIGNED_BYTE&&(te=s.RG8UI),X===s.UNSIGNED_SHORT&&(te=s.RG16UI),X===s.UNSIGNED_INT&&(te=s.RG32UI),X===s.BYTE&&(te=s.RG8I),X===s.SHORT&&(te=s.RG16I),X===s.INT&&(te=s.RG32I)),M===s.RGB&&X===s.UNSIGNED_INT_5_9_9_9_REV&&(te=s.RGB9_E5),M===s.RGBA){const Ee=re?va:et.getTransfer(se);X===s.FLOAT&&(te=s.RGBA32F),X===s.HALF_FLOAT&&(te=s.RGBA16F),X===s.UNSIGNED_BYTE&&(te=Ee===xt?s.SRGB8_ALPHA8:s.RGBA8),X===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),X===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)}return(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function x(R,M){let X;return R?M===null||M===ts||M===js?X=s.DEPTH24_STENCIL8:M===Ln?X=s.DEPTH32F_STENCIL8:M===Ui&&(X=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ts||M===js?X=s.DEPTH_COMPONENT24:M===Ln?X=s.DEPTH_COMPONENT32F:M===Ui&&(X=s.DEPTH_COMPONENT16),X}function S(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Qe&&R.minFilter!==tt?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function D(R){const M=R.target;M.removeEventListener("dispose",D),T(M),M.isVideoTexture&&h.delete(M)}function E(R){const M=R.target;M.removeEventListener("dispose",E),b(M)}function T(R){const M=n.get(R);if(M.__webglInit===void 0)return;const X=R.source,se=d.get(X);if(se){const re=se[M.__cacheKey];re.usedTimes--,re.usedTimes===0&&N(R),Object.keys(se).length===0&&d.delete(X)}n.remove(R)}function N(R){const M=n.get(R);s.deleteTexture(M.__webglTexture);const X=R.source,se=d.get(X);delete se[M.__cacheKey],o.memory.textures--}function b(R){const M=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(M.__webglFramebuffer[se]))for(let re=0;re<M.__webglFramebuffer[se].length;re++)s.deleteFramebuffer(M.__webglFramebuffer[se][re]);else s.deleteFramebuffer(M.__webglFramebuffer[se]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[se])}else{if(Array.isArray(M.__webglFramebuffer))for(let se=0;se<M.__webglFramebuffer.length;se++)s.deleteFramebuffer(M.__webglFramebuffer[se]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let se=0;se<M.__webglColorRenderbuffer.length;se++)M.__webglColorRenderbuffer[se]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[se]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const X=R.textures;for(let se=0,re=X.length;se<re;se++){const te=n.get(X[se]);te.__webglTexture&&(s.deleteTexture(te.__webglTexture),o.memory.textures--),n.remove(X[se])}n.remove(R)}let y=0;function I(){y=0}function B(){const R=y;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),y+=1,R}function z(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function j(R,M){const X=n.get(R);if(R.isVideoTexture&&lt(R),R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){const se=R.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{be(X,R,M);return}}t.bindTexture(s.TEXTURE_2D,X.__webglTexture,s.TEXTURE0+M)}function Z(R,M){const X=n.get(R);if(R.version>0&&X.__version!==R.version){be(X,R,M);return}t.bindTexture(s.TEXTURE_2D_ARRAY,X.__webglTexture,s.TEXTURE0+M)}function K(R,M){const X=n.get(R);if(R.version>0&&X.__version!==R.version){be(X,R,M);return}t.bindTexture(s.TEXTURE_3D,X.__webglTexture,s.TEXTURE0+M)}function Q(R,M){const X=n.get(R);if(R.version>0&&X.__version!==R.version){$(X,R,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture,s.TEXTURE0+M)}const W={[Mn]:s.REPEAT,[gn]:s.CLAMP_TO_EDGE,[ga]:s.MIRRORED_REPEAT},he={[Qe]:s.NEAREST,[Rd]:s.NEAREST_MIPMAP_NEAREST,[Er]:s.NEAREST_MIPMAP_LINEAR,[tt]:s.LINEAR,[Jo]:s.LINEAR_MIPMAP_NEAREST,[_n]:s.LINEAR_MIPMAP_LINEAR},me={[Pp]:s.NEVER,[Fp]:s.ALWAYS,[Ip]:s.LESS,[kd]:s.LEQUAL,[Lp]:s.EQUAL,[Up]:s.GEQUAL,[Dp]:s.GREATER,[Np]:s.NOTEQUAL};function ve(R,M){if(M.type===Ln&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===tt||M.magFilter===Jo||M.magFilter===Er||M.magFilter===_n||M.minFilter===tt||M.minFilter===Jo||M.minFilter===Er||M.minFilter===_n)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,W[M.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,W[M.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,W[M.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,he[M.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,he[M.minFilter]),M.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,me[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Qe||M.minFilter!==Er&&M.minFilter!==_n||M.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function ze(R,M){let X=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",D));const se=M.source;let re=d.get(se);re===void 0&&(re={},d.set(se,re));const te=z(M);if(te!==R.__cacheKey){re[te]===void 0&&(re[te]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,X=!0),re[te].usedTimes++;const Ee=re[R.__cacheKey];Ee!==void 0&&(re[R.__cacheKey].usedTimes--,Ee.usedTimes===0&&N(M)),R.__cacheKey=te,R.__webglTexture=re[te].texture}return X}function be(R,M,X){let se=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(se=s.TEXTURE_3D);const re=ze(R,M),te=M.source;t.bindTexture(se,R.__webglTexture,s.TEXTURE0+X);const Ee=n.get(te);if(te.version!==Ee.__version||re===!0){t.activeTexture(s.TEXTURE0+X);const le=et.getPrimaries(et.workingColorSpace),ge=M.colorSpace===Rn?null:et.getPrimaries(M.colorSpace),ke=M.colorSpace===Rn||le===ge?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let ae=_(M.image,!1,i.maxTextureSize);ae=Ne(M,ae);const pe=r.convert(M.format,M.colorSpace),qe=r.convert(M.type);let Te=v(M.internalFormat,pe,qe,M.colorSpace,M.isVideoTexture);ve(se,M);let xe;const Ce=M.mipmaps,Fe=M.isVideoTexture!==!0,pt=Ee.__version===void 0||re===!0,U=te.dataReady,oe=S(M,ae);if(M.isDepthTexture)Te=x(M.format===Ks,M.type),pt&&(Fe?t.texStorage2D(s.TEXTURE_2D,1,Te,ae.width,ae.height):t.texImage2D(s.TEXTURE_2D,0,Te,ae.width,ae.height,0,pe,qe,null));else if(M.isDataTexture)if(Ce.length>0){Fe&&pt&&t.texStorage2D(s.TEXTURE_2D,oe,Te,Ce[0].width,Ce[0].height);for(let V=0,H=Ce.length;V<H;V++)xe=Ce[V],Fe?U&&t.texSubImage2D(s.TEXTURE_2D,V,0,0,xe.width,xe.height,pe,qe,xe.data):t.texImage2D(s.TEXTURE_2D,V,Te,xe.width,xe.height,0,pe,qe,xe.data);M.generateMipmaps=!1}else Fe?(pt&&t.texStorage2D(s.TEXTURE_2D,oe,Te,ae.width,ae.height),U&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ae.width,ae.height,pe,qe,ae.data)):t.texImage2D(s.TEXTURE_2D,0,Te,ae.width,ae.height,0,pe,qe,ae.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Fe&&pt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,oe,Te,Ce[0].width,Ce[0].height,ae.depth);for(let V=0,H=Ce.length;V<H;V++)if(xe=Ce[V],M.format!==Jt)if(pe!==null)if(Fe){if(U)if(M.layerUpdates.size>0){const ne=fu(xe.width,xe.height,M.format,M.type);for(const Ae of M.layerUpdates){const Ve=xe.data.subarray(Ae*ne/xe.data.BYTES_PER_ELEMENT,(Ae+1)*ne/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,Ae,xe.width,xe.height,1,pe,Ve,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,xe.width,xe.height,ae.depth,pe,xe.data,0,0)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,V,Te,xe.width,xe.height,ae.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?U&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,xe.width,xe.height,ae.depth,pe,qe,xe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,V,Te,xe.width,xe.height,ae.depth,0,pe,qe,xe.data)}else{Fe&&pt&&t.texStorage2D(s.TEXTURE_2D,oe,Te,Ce[0].width,Ce[0].height);for(let V=0,H=Ce.length;V<H;V++)xe=Ce[V],M.format!==Jt?pe!==null?Fe?U&&t.compressedTexSubImage2D(s.TEXTURE_2D,V,0,0,xe.width,xe.height,pe,xe.data):t.compressedTexImage2D(s.TEXTURE_2D,V,Te,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?U&&t.texSubImage2D(s.TEXTURE_2D,V,0,0,xe.width,xe.height,pe,qe,xe.data):t.texImage2D(s.TEXTURE_2D,V,Te,xe.width,xe.height,0,pe,qe,xe.data)}else if(M.isDataArrayTexture)if(Fe){if(pt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,oe,Te,ae.width,ae.height,ae.depth),U)if(M.layerUpdates.size>0){const V=fu(ae.width,ae.height,M.format,M.type);for(const H of M.layerUpdates){const ne=ae.data.subarray(H*V/ae.data.BYTES_PER_ELEMENT,(H+1)*V/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,H,ae.width,ae.height,1,pe,qe,ne)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,pe,qe,ae.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Te,ae.width,ae.height,ae.depth,0,pe,qe,ae.data);else if(M.isData3DTexture)Fe?(pt&&t.texStorage3D(s.TEXTURE_3D,oe,Te,ae.width,ae.height,ae.depth),U&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,pe,qe,ae.data)):t.texImage3D(s.TEXTURE_3D,0,Te,ae.width,ae.height,ae.depth,0,pe,qe,ae.data);else if(M.isFramebufferTexture){if(pt)if(Fe)t.texStorage2D(s.TEXTURE_2D,oe,Te,ae.width,ae.height);else{let V=ae.width,H=ae.height;for(let ne=0;ne<oe;ne++)t.texImage2D(s.TEXTURE_2D,ne,Te,V,H,0,pe,qe,null),V>>=1,H>>=1}}else if(Ce.length>0){if(Fe&&pt){const V=Be(Ce[0]);t.texStorage2D(s.TEXTURE_2D,oe,Te,V.width,V.height)}for(let V=0,H=Ce.length;V<H;V++)xe=Ce[V],Fe?U&&t.texSubImage2D(s.TEXTURE_2D,V,0,0,pe,qe,xe):t.texImage2D(s.TEXTURE_2D,V,Te,pe,qe,xe);M.generateMipmaps=!1}else if(Fe){if(pt){const V=Be(ae);t.texStorage2D(s.TEXTURE_2D,oe,Te,V.width,V.height)}U&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,pe,qe,ae)}else t.texImage2D(s.TEXTURE_2D,0,Te,pe,qe,ae);m(M)&&p(se),Ee.__version=te.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function $(R,M,X){if(M.image.length!==6)return;const se=ze(R,M),re=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+X);const te=n.get(re);if(re.version!==te.__version||se===!0){t.activeTexture(s.TEXTURE0+X);const Ee=et.getPrimaries(et.workingColorSpace),le=M.colorSpace===Rn?null:et.getPrimaries(M.colorSpace),ge=M.colorSpace===Rn||Ee===le?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const ke=M.isCompressedTexture||M.image[0].isCompressedTexture,ae=M.image[0]&&M.image[0].isDataTexture,pe=[];for(let H=0;H<6;H++)!ke&&!ae?pe[H]=_(M.image[H],!0,i.maxCubemapSize):pe[H]=ae?M.image[H].image:M.image[H],pe[H]=Ne(M,pe[H]);const qe=pe[0],Te=r.convert(M.format,M.colorSpace),xe=r.convert(M.type),Ce=v(M.internalFormat,Te,xe,M.colorSpace),Fe=M.isVideoTexture!==!0,pt=te.__version===void 0||se===!0,U=re.dataReady;let oe=S(M,qe);ve(s.TEXTURE_CUBE_MAP,M);let V;if(ke){Fe&&pt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,oe,Ce,qe.width,qe.height);for(let H=0;H<6;H++){V=pe[H].mipmaps;for(let ne=0;ne<V.length;ne++){const Ae=V[ne];M.format!==Jt?Te!==null?Fe?U&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ne,0,0,Ae.width,Ae.height,Te,Ae.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ne,Ce,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?U&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ne,0,0,Ae.width,Ae.height,Te,xe,Ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ne,Ce,Ae.width,Ae.height,0,Te,xe,Ae.data)}}}else{if(V=M.mipmaps,Fe&&pt){V.length>0&&oe++;const H=Be(pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,oe,Ce,H.width,H.height)}for(let H=0;H<6;H++)if(ae){Fe?U&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,pe[H].width,pe[H].height,Te,xe,pe[H].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,Ce,pe[H].width,pe[H].height,0,Te,xe,pe[H].data);for(let ne=0;ne<V.length;ne++){const Ve=V[ne].image[H].image;Fe?U&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ne+1,0,0,Ve.width,Ve.height,Te,xe,Ve.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ne+1,Ce,Ve.width,Ve.height,0,Te,xe,Ve.data)}}else{Fe?U&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,Te,xe,pe[H]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,Ce,Te,xe,pe[H]);for(let ne=0;ne<V.length;ne++){const Ae=V[ne];Fe?U&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ne+1,0,0,Te,xe,Ae.image[H]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ne+1,Ce,Te,xe,Ae.image[H])}}}m(M)&&p(s.TEXTURE_CUBE_MAP),te.__version=re.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ee(R,M,X,se,re,te){const Ee=r.convert(X.format,X.colorSpace),le=r.convert(X.type),ge=v(X.internalFormat,Ee,le,X.colorSpace);if(!n.get(M).__hasExternalTextures){const ae=Math.max(1,M.width>>te),pe=Math.max(1,M.height>>te);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?t.texImage3D(re,te,ge,ae,pe,M.depth,0,Ee,le,null):t.texImage2D(re,te,ge,ae,pe,0,Ee,le,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),Me(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,re,n.get(X).__webglTexture,0,Xe(M)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,re,n.get(X).__webglTexture,te),t.bindFramebuffer(s.FRAMEBUFFER,null)}function de(R,M,X){if(s.bindRenderbuffer(s.RENDERBUFFER,R),M.depthBuffer){const se=M.depthTexture,re=se&&se.isDepthTexture?se.type:null,te=x(M.stencilBuffer,re),Ee=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=Xe(M);Me(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,le,te,M.width,M.height):X?s.renderbufferStorageMultisample(s.RENDERBUFFER,le,te,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,te,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ee,s.RENDERBUFFER,R)}else{const se=M.textures;for(let re=0;re<se.length;re++){const te=se[re],Ee=r.convert(te.format,te.colorSpace),le=r.convert(te.type),ge=v(te.internalFormat,Ee,le,te.colorSpace),ke=Xe(M);X&&Me(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ke,ge,M.width,M.height):Me(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ke,ge,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ge,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ue(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),j(M.depthTexture,0);const se=n.get(M.depthTexture).__webglTexture,re=Xe(M);if(M.depthTexture.format===Di)Me(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,re):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(M.depthTexture.format===Ks)Me(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,re):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function De(R){const M=n.get(R),X=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");ue(M.__webglFramebuffer,R)}else if(X){M.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[se]),M.__webglDepthbuffer[se]=s.createRenderbuffer(),de(M.__webglDepthbuffer[se],R,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=s.createRenderbuffer(),de(M.__webglDepthbuffer,R,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function we(R,M,X){const se=n.get(R);M!==void 0&&ee(se.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),X!==void 0&&De(R)}function Pe(R){const M=R.texture,X=n.get(R),se=n.get(M);R.addEventListener("dispose",E);const re=R.textures,te=R.isWebGLCubeRenderTarget===!0,Ee=re.length>1;if(Ee||(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=M.version,o.memory.textures++),te){X.__webglFramebuffer=[];for(let le=0;le<6;le++)if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer[le]=[];for(let ge=0;ge<M.mipmaps.length;ge++)X.__webglFramebuffer[le][ge]=s.createFramebuffer()}else X.__webglFramebuffer[le]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer=[];for(let le=0;le<M.mipmaps.length;le++)X.__webglFramebuffer[le]=s.createFramebuffer()}else X.__webglFramebuffer=s.createFramebuffer();if(Ee)for(let le=0,ge=re.length;le<ge;le++){const ke=n.get(re[le]);ke.__webglTexture===void 0&&(ke.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&Me(R)===!1){X.__webglMultisampledFramebuffer=s.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let le=0;le<re.length;le++){const ge=re[le];X.__webglColorRenderbuffer[le]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,X.__webglColorRenderbuffer[le]);const ke=r.convert(ge.format,ge.colorSpace),ae=r.convert(ge.type),pe=v(ge.internalFormat,ke,ae,ge.colorSpace,R.isXRRenderTarget===!0),qe=Xe(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,qe,pe,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,X.__webglColorRenderbuffer[le])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(X.__webglDepthRenderbuffer=s.createRenderbuffer(),de(X.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(te){t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),ve(s.TEXTURE_CUBE_MAP,M);for(let le=0;le<6;le++)if(M.mipmaps&&M.mipmaps.length>0)for(let ge=0;ge<M.mipmaps.length;ge++)ee(X.__webglFramebuffer[le][ge],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,ge);else ee(X.__webglFramebuffer[le],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(M)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let le=0,ge=re.length;le<ge;le++){const ke=re[le],ae=n.get(ke);t.bindTexture(s.TEXTURE_2D,ae.__webglTexture),ve(s.TEXTURE_2D,ke),ee(X.__webglFramebuffer,R,ke,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,0),m(ke)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let le=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(le=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(le,se.__webglTexture),ve(le,M),M.mipmaps&&M.mipmaps.length>0)for(let ge=0;ge<M.mipmaps.length;ge++)ee(X.__webglFramebuffer[ge],R,M,s.COLOR_ATTACHMENT0,le,ge);else ee(X.__webglFramebuffer,R,M,s.COLOR_ATTACHMENT0,le,0);m(M)&&p(le),t.unbindTexture()}R.depthBuffer&&De(R)}function Je(R){const M=R.textures;for(let X=0,se=M.length;X<se;X++){const re=M[X];if(m(re)){const te=R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ee=n.get(re).__webglTexture;t.bindTexture(te,Ee),p(te),t.unbindTexture()}}}const L=[],nt=[];function je(R){if(R.samples>0){if(Me(R)===!1){const M=R.textures,X=R.width,se=R.height;let re=s.COLOR_BUFFER_BIT;const te=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ee=n.get(R),le=M.length>1;if(le)for(let ge=0;ge<M.length;ge++)t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let ge=0;ge<M.length;ge++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),le){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[ge]);const ke=n.get(M[ge]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ke,0)}s.blitFramebuffer(0,0,X,se,0,0,X,se,re,s.NEAREST),l===!0&&(L.length=0,nt.length=0,L.push(s.COLOR_ATTACHMENT0+ge),R.depthBuffer&&R.resolveDepthBuffer===!1&&(L.push(te),nt.push(te),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,nt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,L))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),le)for(let ge=0;ge<M.length;ge++){t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[ge]);const ke=n.get(M[ge]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,ke,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Xe(R){return Math.min(i.maxSamples,R.samples)}function Me(R){const M=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function lt(R){const M=o.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function Ne(R,M){const X=R.colorSpace,se=R.format,re=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||X!==Rt&&X!==Rn&&(et.getTransfer(X)===xt?(se!==Jt||re!==Sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),M}function Be(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=I,this.setTexture2D=j,this.setTexture2DArray=Z,this.setTexture3D=K,this.setTextureCube=Q,this.rebindTextures=we,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=Je,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=Me}function Jv(s,e){function t(n,i=Rn){let r;const o=et.getTransfer(i);if(n===Sn)return s.UNSIGNED_BYTE;if(n===Rc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Pc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ld)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Pd)return s.BYTE;if(n===Id)return s.SHORT;if(n===Ui)return s.UNSIGNED_SHORT;if(n===Cc)return s.INT;if(n===ts)return s.UNSIGNED_INT;if(n===Ln)return s.FLOAT;if(n===Dn)return s.HALF_FLOAT;if(n===Dd)return s.ALPHA;if(n===Nd)return s.RGB;if(n===Jt)return s.RGBA;if(n===Ud)return s.LUMINANCE;if(n===Fd)return s.LUMINANCE_ALPHA;if(n===Di)return s.DEPTH_COMPONENT;if(n===Ks)return s.DEPTH_STENCIL;if(n===Ic)return s.RED;if(n===Lc)return s.RED_INTEGER;if(n===Od)return s.RG;if(n===Dc)return s.RG_INTEGER;if(n===Nc)return s.RGBA_INTEGER;if(n===Qo||n===ea||n===ta||n===na)if(o===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Qo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===kl||n===Vl||n===Hl||n===Gl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===kl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Vl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wl||n===Xl||n===ql)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wl||n===Xl)return o===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ql)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yl||n===$l||n===jl||n===Kl||n===Zl||n===Jl||n===Ql||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Yl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$l)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Kl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Jl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ql)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ec)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===tc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ic)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===oc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ia||n===ac||n===lc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ia)return o===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ac)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===lc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Bd||n===cc||n===hc||n===uc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ia)return r.COMPRESSED_RED_RGTC1_EXT;if(n===cc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===hc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===js?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Qv extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class xn extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ex={type:"move"};class _l{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ex)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new xn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const tx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nx=`
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

}`;class ix{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Ut,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Lt({vertexShader:tx,fragmentShader:nx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new mi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sx extends ns{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new ix,m=t.getContextAttributes();let p=null,v=null;const x=[],S=[],D=new J;let E=null;const T=new Yt;T.layers.enable(1),T.viewport=new Ze;const N=new Yt;N.layers.enable(2),N.viewport=new Ze;const b=[T,N],y=new Qv;y.layers.enable(1),y.layers.enable(2);let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ee=x[$];return ee===void 0&&(ee=new _l,x[$]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function($){let ee=x[$];return ee===void 0&&(ee=new _l,x[$]=ee),ee.getGripSpace()},this.getHand=function($){let ee=x[$];return ee===void 0&&(ee=new _l,x[$]=ee),ee.getHandSpace()};function z($){const ee=S.indexOf($.inputSource);if(ee===-1)return;const de=x[ee];de!==void 0&&(de.update($.inputSource,$.frame,c||o),de.dispatchEvent({type:$.type,data:$.inputSource}))}function j(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",Z);for(let $=0;$<x.length;$++){const ee=S[$];ee!==null&&(S[$]=null,x[$].disconnect(ee))}I=null,B=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,v=null,be.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",j),i.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(D),i.renderState.layers===void 0){const ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new $t(f.framebufferWidth,f.framebufferHeight,{format:Jt,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ee=null,de=null,ue=null;m.depth&&(ue=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?Ks:Di,de=m.stencil?js:ts);const De={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(De),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new $t(d.textureWidth,d.textureHeight,{format:Jt,type:Sn,depthTexture:new Jr(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),be.setContext(i),be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z($){for(let ee=0;ee<$.removed.length;ee++){const de=$.removed[ee],ue=S.indexOf(de);ue>=0&&(S[ue]=null,x[ue].disconnect(de))}for(let ee=0;ee<$.added.length;ee++){const de=$.added[ee];let ue=S.indexOf(de);if(ue===-1){for(let we=0;we<x.length;we++)if(we>=S.length){S.push(de),ue=we;break}else if(S[we]===null){S[we]=de,ue=we;break}if(ue===-1)break}const De=x[ue];De&&De.connect(de)}}const K=new A,Q=new A;function W($,ee,de){K.setFromMatrixPosition(ee.matrixWorld),Q.setFromMatrixPosition(de.matrixWorld);const ue=K.distanceTo(Q),De=ee.projectionMatrix.elements,we=de.projectionMatrix.elements,Pe=De[14]/(De[10]-1),Je=De[14]/(De[10]+1),L=(De[9]+1)/De[5],nt=(De[9]-1)/De[5],je=(De[8]-1)/De[0],Xe=(we[8]+1)/we[0],Me=Pe*je,lt=Pe*Xe,Ne=ue/(-je+Xe),Be=Ne*-je;ee.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Be),$.translateZ(Ne),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const R=Pe+Ne,M=Je+Ne,X=Me-Be,se=lt+(ue-Be),re=L*Je/M*R,te=nt*Je/M*R;$.projectionMatrix.makePerspective(X,se,re,te,R,M),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function he($,ee){ee===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ee.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;_.texture!==null&&($.near=_.depthNear,$.far=_.depthFar),y.near=N.near=T.near=$.near,y.far=N.far=T.far=$.far,(I!==y.near||B!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),I=y.near,B=y.far,T.near=I,T.far=B,N.near=I,N.far=B,T.updateProjectionMatrix(),N.updateProjectionMatrix(),$.updateProjectionMatrix());const ee=$.parent,de=y.cameras;he(y,ee);for(let ue=0;ue<de.length;ue++)he(de[ue],ee);de.length===2?W(y,T,N):y.projectionMatrix.copy(T.projectionMatrix),me($,y,ee)};function me($,ee,de){de===null?$.matrix.copy(ee.matrixWorld):($.matrix.copy(de.matrixWorld),$.matrix.invert(),$.matrix.multiply(ee.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ee.projectionMatrix),$.projectionMatrixInverse.copy(ee.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Zs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ve=null;function ze($,ee){if(h=ee.getViewerPose(c||o),g=ee,h!==null){const de=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ue=!1;de.length!==y.cameras.length&&(y.cameras.length=0,ue=!0);for(let we=0;we<de.length;we++){const Pe=de[we];let Je=null;if(f!==null)Je=f.getViewport(Pe);else{const nt=u.getViewSubImage(d,Pe);Je=nt.viewport,we===0&&(e.setRenderTargetTextures(v,nt.colorTexture,d.ignoreDepthValues?void 0:nt.depthStencilTexture),e.setRenderTarget(v))}let L=b[we];L===void 0&&(L=new Yt,L.layers.enable(we),L.viewport=new Ze,b[we]=L),L.matrix.fromArray(Pe.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(Pe.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(Je.x,Je.y,Je.width,Je.height),we===0&&(y.matrix.copy(L.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ue===!0&&y.cameras.push(L)}const De=i.enabledFeatures;if(De&&De.includes("depth-sensing")){const we=u.getDepthInformation(de[0]);we&&we.isValid&&we.texture&&_.init(e,we,i.renderState)}}for(let de=0;de<x.length;de++){const ue=S[de],De=x[de];ue!==null&&De!==void 0&&De.update(ue,ee,c||o)}ve&&ve($,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const be=new Zd;be.setAnimationLoop(ze),this.setAnimationLoop=function($){ve=$},this.dispose=function(){}}}const Gi=new Mt,rx=new Ie;function ox(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,$d(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,x,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,v,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),x=v.envMap,S=v.envMapRotation;x&&(m.envMap.value=x,Gi.copy(S),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),m.envMapRotation.value.setFromMatrix4(rx.makeRotationFromEuler(Gi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ax(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const S=x.program;n.uniformBlockBinding(v,S)}function c(v,x){let S=i[v.id];S===void 0&&(g(v),S=h(v),i[v.id]=S,v.addEventListener("dispose",m));const D=x.program;n.updateUBOMapping(v,D);const E=e.render.frame;r[v.id]!==E&&(d(v),r[v.id]=E)}function h(v){const x=u();v.__bindingPointIndex=x;const S=s.createBuffer(),D=v.__size,E=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,D,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,S),S}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=i[v.id],S=v.uniforms,D=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let E=0,T=S.length;E<T;E++){const N=Array.isArray(S[E])?S[E]:[S[E]];for(let b=0,y=N.length;b<y;b++){const I=N[b];if(f(I,E,b,D)===!0){const B=I.__offset,z=Array.isArray(I.value)?I.value:[I.value];let j=0;for(let Z=0;Z<z.length;Z++){const K=z[Z],Q=_(K);typeof K=="number"||typeof K=="boolean"?(I.__data[0]=K,s.bufferSubData(s.UNIFORM_BUFFER,B+j,I.__data)):K.isMatrix3?(I.__data[0]=K.elements[0],I.__data[1]=K.elements[1],I.__data[2]=K.elements[2],I.__data[3]=0,I.__data[4]=K.elements[3],I.__data[5]=K.elements[4],I.__data[6]=K.elements[5],I.__data[7]=0,I.__data[8]=K.elements[6],I.__data[9]=K.elements[7],I.__data[10]=K.elements[8],I.__data[11]=0):(K.toArray(I.__data,j),j+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,x,S,D){const E=v.value,T=x+"_"+S;if(D[T]===void 0)return typeof E=="number"||typeof E=="boolean"?D[T]=E:D[T]=E.clone(),!0;{const N=D[T];if(typeof E=="number"||typeof E=="boolean"){if(N!==E)return D[T]=E,!0}else if(N.equals(E)===!1)return N.copy(E),!0}return!1}function g(v){const x=v.uniforms;let S=0;const D=16;for(let T=0,N=x.length;T<N;T++){const b=Array.isArray(x[T])?x[T]:[x[T]];for(let y=0,I=b.length;y<I;y++){const B=b[y],z=Array.isArray(B.value)?B.value:[B.value];for(let j=0,Z=z.length;j<Z;j++){const K=z[j],Q=_(K),W=S%D;W!==0&&D-W<Q.boundary&&(S+=D-W),B.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=Q.storage}}}const E=S%D;return E>0&&(S+=D-E),v.__size=S,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const S=o.indexOf(x.__bindingPointIndex);o.splice(S,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class lx{constructor(e={}){const{canvas:t=em(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xt,this.toneMapping=hi,this.toneMappingExposure=1;const x=this;let S=!1,D=0,E=0,T=null,N=-1,b=null;const y=new Ze,I=new Ze;let B=null;const z=new ie(0);let j=0,Z=t.width,K=t.height,Q=1,W=null,he=null;const me=new Ze(0,0,Z,K),ve=new Ze(0,0,Z,K);let ze=!1;const be=new kc;let $=!1,ee=!1;const de=new Ie,ue=new A,De=new Ze,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Pe=!1;function Je(){return T===null?Q:1}let L=n;function nt(w,O){return t.getContext(w,O)}try{const w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Tc}`),t.addEventListener("webglcontextlost",V,!1),t.addEventListener("webglcontextrestored",H,!1),t.addEventListener("webglcontextcreationerror",ne,!1),L===null){const O="webgl2";if(L=nt(O,w),L===null)throw nt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let je,Xe,Me,lt,Ne,Be,R,M,X,se,re,te,Ee,le,ge,ke,ae,pe,qe,Te,xe,Ce,Fe,pt;function U(){je=new m_(L),je.init(),Ce=new Jv(L,je),Xe=new c_(L,je,e,Ce),Me=new jv(L),lt=new v_(L),Ne=new Uv,Be=new Zv(L,je,Me,Ne,Xe,Ce,lt),R=new u_(x),M=new p_(x),X=new Am(L),Fe=new a_(L,X),se=new g_(L,X,lt,Fe),re=new y_(L,se,X,lt),qe=new x_(L,Xe,Be),ke=new h_(Ne),te=new Nv(x,R,M,je,Xe,Fe,ke),Ee=new ox(x,Ne),le=new Ov,ge=new Gv(je),pe=new o_(x,R,M,Me,re,d,l),ae=new $v(x,re,Xe),pt=new ax(L,lt,Xe,Me),Te=new l_(L,je,lt),xe=new __(L,je,lt),lt.programs=te.programs,x.capabilities=Xe,x.extensions=je,x.properties=Ne,x.renderLists=le,x.shadowMap=ae,x.state=Me,x.info=lt}U();const oe=new sx(x,L);this.xr=oe,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const w=je.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=je.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(w){w!==void 0&&(Q=w,this.setSize(Z,K,!1))},this.getSize=function(w){return w.set(Z,K)},this.setSize=function(w,O,G=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=w,K=O,t.width=Math.floor(w*Q),t.height=Math.floor(O*Q),G===!0&&(t.style.width=w+"px",t.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(Z*Q,K*Q).floor()},this.setDrawingBufferSize=function(w,O,G){Z=w,K=O,Q=G,t.width=Math.floor(w*G),t.height=Math.floor(O*G),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(y)},this.getViewport=function(w){return w.copy(me)},this.setViewport=function(w,O,G,q){w.isVector4?me.set(w.x,w.y,w.z,w.w):me.set(w,O,G,q),Me.viewport(y.copy(me).multiplyScalar(Q).round())},this.getScissor=function(w){return w.copy(ve)},this.setScissor=function(w,O,G,q){w.isVector4?ve.set(w.x,w.y,w.z,w.w):ve.set(w,O,G,q),Me.scissor(I.copy(ve).multiplyScalar(Q).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(w){Me.setScissorTest(ze=w)},this.setOpaqueSort=function(w){W=w},this.setTransparentSort=function(w){he=w},this.getClearColor=function(w){return w.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor.apply(pe,arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha.apply(pe,arguments)},this.clear=function(w=!0,O=!0,G=!0){let q=0;if(w){let k=!1;if(T!==null){const ce=T.texture.format;k=ce===Nc||ce===Dc||ce===Lc}if(k){const ce=T.texture.type,_e=ce===Sn||ce===ts||ce===Ui||ce===js||ce===Rc||ce===Pc,ye=pe.getClearColor(),Se=pe.getClearAlpha(),Ue=ye.r,Oe=ye.g,Le=ye.b;_e?(f[0]=Ue,f[1]=Oe,f[2]=Le,f[3]=Se,L.clearBufferuiv(L.COLOR,0,f)):(g[0]=Ue,g[1]=Oe,g[2]=Le,g[3]=Se,L.clearBufferiv(L.COLOR,0,g))}else q|=L.COLOR_BUFFER_BIT}O&&(q|=L.DEPTH_BUFFER_BIT),G&&(q|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",V,!1),t.removeEventListener("webglcontextrestored",H,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),le.dispose(),ge.dispose(),Ne.dispose(),R.dispose(),M.dispose(),re.dispose(),Fe.dispose(),pt.dispose(),te.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",mt),oe.removeEventListener("sessionend",Fi),Yn.stop()};function V(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function H(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=lt.autoReset,O=ae.enabled,G=ae.autoUpdate,q=ae.needsUpdate,k=ae.type;U(),lt.autoReset=w,ae.enabled=O,ae.autoUpdate=G,ae.needsUpdate=q,ae.type=k}function ne(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ae(w){const O=w.target;O.removeEventListener("dispose",Ae),Ve(O)}function Ve(w){ct(w),Ne.remove(w)}function ct(w){const O=Ne.get(w).programs;O!==void 0&&(O.forEach(function(G){te.releaseProgram(G)}),w.isShaderMaterial&&te.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,G,q,k,ce){O===null&&(O=we);const _e=k.isMesh&&k.matrixWorld.determinant()<0,ye=Uf(w,O,G,q,k);Me.setMaterial(q,_e);let Se=G.index,Ue=1;if(q.wireframe===!0){if(Se=se.getWireframeAttribute(G),Se===void 0)return;Ue=2}const Oe=G.drawRange,Le=G.attributes.position;let it=Oe.start*Ue,bt=(Oe.start+Oe.count)*Ue;ce!==null&&(it=Math.max(it,ce.start*Ue),bt=Math.min(bt,(ce.start+ce.count)*Ue)),Se!==null?(it=Math.max(it,0),bt=Math.min(bt,Se.count)):Le!=null&&(it=Math.max(it,0),bt=Math.min(bt,Le.count));const At=bt-it;if(At<0||At===1/0)return;Fe.setup(k,q,ye,G,Se);let nn,st=Te;if(Se!==null&&(nn=X.get(Se),st=xe,st.setIndex(nn)),k.isMesh)q.wireframe===!0?(Me.setLineWidth(q.wireframeLinewidth*Je()),st.setMode(L.LINES)):st.setMode(L.TRIANGLES);else if(k.isLine){let Re=q.linewidth;Re===void 0&&(Re=1),Me.setLineWidth(Re*Je()),k.isLineSegments?st.setMode(L.LINES):k.isLineLoop?st.setMode(L.LINE_LOOP):st.setMode(L.LINE_STRIP)}else k.isPoints?st.setMode(L.POINTS):k.isSprite&&st.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)st.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))st.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Re=k._multiDrawStarts,zt=k._multiDrawCounts,rt=k._multiDrawCount,wn=Se?X.get(Se).bytesPerElement:1,os=Ne.get(q).currentProgram.getUniforms();for(let sn=0;sn<rt;sn++)os.setValue(L,"_gl_DrawID",sn),st.render(Re[sn]/wn,zt[sn])}else if(k.isInstancedMesh)st.renderInstances(it,At,k.count);else if(G.isInstancedBufferGeometry){const Re=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,zt=Math.min(G.instanceCount,Re);st.renderInstances(it,At,zt)}else st.render(it,At)};function wt(w,O,G){w.transparent===!0&&w.side===mn&&w.forceSinglePass===!1?(w.side=Vt,w.needsUpdate=!0,Oi(w,O,G),w.side=fi,w.needsUpdate=!0,Oi(w,O,G),w.side=mn):Oi(w,O,G)}this.compile=function(w,O,G=null){G===null&&(G=w),m=ge.get(G),m.init(O),v.push(m),G.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),w!==G&&w.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights();const q=new Set;return w.traverse(function(k){const ce=k.material;if(ce)if(Array.isArray(ce))for(let _e=0;_e<ce.length;_e++){const ye=ce[_e];wt(ye,G,k),q.add(ye)}else wt(ce,G,k),q.add(ce)}),v.pop(),m=null,q},this.compileAsync=function(w,O,G=null){const q=this.compile(w,O,G);return new Promise(k=>{function ce(){if(q.forEach(function(_e){Ne.get(_e).currentProgram.isReady()&&q.delete(_e)}),q.size===0){k(w);return}setTimeout(ce,10)}je.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let $e=null;function en(w){$e&&$e(w)}function mt(){Yn.stop()}function Fi(){Yn.start()}const Yn=new Zd;Yn.setAnimationLoop(en),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(w){$e=w,oe.setAnimationLoop(w),w===null?Yn.stop():Yn.start()},oe.addEventListener("sessionstart",mt),oe.addEventListener("sessionend",Fi),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(O),O=oe.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,O,T),m=ge.get(w,v.length),m.init(O),v.push(m),de.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),be.setFromProjectionMatrix(de),ee=this.localClippingEnabled,$=ke.init(this.clippingPlanes,ee),_=le.get(w,p.length),_.init(),p.push(_),oe.enabled===!0&&oe.isPresenting===!0){const ce=x.xr.getDepthSensingMesh();ce!==null&&co(ce,O,-1/0,x.sortObjects)}co(w,O,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,he),Pe=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Pe&&pe.addToRenderList(_,w),this.info.render.frame++,$===!0&&ke.beginShadows();const G=m.state.shadowsArray;ae.render(G,w,O),$===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=_.opaque,k=_.transmissive;if(m.setupLights(),O.isArrayCamera){const ce=O.cameras;if(k.length>0)for(let _e=0,ye=ce.length;_e<ye;_e++){const Se=ce[_e];tn(q,k,w,Se)}Pe&&pe.render(w);for(let _e=0,ye=ce.length;_e<ye;_e++){const Se=ce[_e];ho(_,w,Se,Se.viewport)}}else k.length>0&&tn(q,k,w,O),Pe&&pe.render(w),ho(_,w,O);T!==null&&(Be.updateMultisampleRenderTarget(T),Be.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(x,w,O),Fe.resetDefaultState(),N=-1,b=null,v.pop(),v.length>0?(m=v[v.length-1],$===!0&&ke.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function co(w,O,G,q){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||be.intersectsSprite(w)){q&&De.setFromMatrixPosition(w.matrixWorld).applyMatrix4(de);const _e=re.update(w),ye=w.material;ye.visible&&_.push(w,_e,ye,G,De.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||be.intersectsObject(w))){const _e=re.update(w),ye=w.material;if(q&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),De.copy(w.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),De.copy(_e.boundingSphere.center)),De.applyMatrix4(w.matrixWorld).applyMatrix4(de)),Array.isArray(ye)){const Se=_e.groups;for(let Ue=0,Oe=Se.length;Ue<Oe;Ue++){const Le=Se[Ue],it=ye[Le.materialIndex];it&&it.visible&&_.push(w,_e,it,G,De.z,Le)}}else ye.visible&&_.push(w,_e,ye,G,De.z,null)}}const ce=w.children;for(let _e=0,ye=ce.length;_e<ye;_e++)co(ce[_e],O,G,q)}function ho(w,O,G,q){const k=w.opaque,ce=w.transmissive,_e=w.transparent;m.setupLightsView(G),$===!0&&ke.setGlobalState(x.clippingPlanes,G),q&&Me.viewport(y.copy(q)),k.length>0&&rs(k,O,G),ce.length>0&&rs(ce,O,G),_e.length>0&&rs(_e,O,G),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function tn(w,O,G,q){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[q.id]===void 0&&(m.state.transmissionRenderTarget[q.id]=new $t(1,1,{generateMipmaps:!0,type:je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float")?Dn:Sn,minFilter:_n,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const ce=m.state.transmissionRenderTarget[q.id],_e=q.viewport||y;ce.setSize(_e.z,_e.w);const ye=x.getRenderTarget();x.setRenderTarget(ce),x.getClearColor(z),j=x.getClearAlpha(),j<1&&x.setClearColor(16777215,.5),Pe?pe.render(G):x.clear();const Se=x.toneMapping;x.toneMapping=hi;const Ue=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),m.setupLightsView(q),$===!0&&ke.setGlobalState(x.clippingPlanes,q),rs(w,G,q),Be.updateMultisampleRenderTarget(ce),Be.updateRenderTargetMipmap(ce),je.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let Le=0,it=O.length;Le<it;Le++){const bt=O[Le],At=bt.object,nn=bt.geometry,st=bt.material,Re=bt.group;if(st.side===mn&&At.layers.test(q.layers)){const zt=st.side;st.side=Vt,st.needsUpdate=!0,uo(At,G,q,nn,st,Re),st.side=zt,st.needsUpdate=!0,Oe=!0}}Oe===!0&&(Be.updateMultisampleRenderTarget(ce),Be.updateRenderTargetMipmap(ce))}x.setRenderTarget(ye),x.setClearColor(z,j),Ue!==void 0&&(q.viewport=Ue),x.toneMapping=Se}function rs(w,O,G){const q=O.isScene===!0?O.overrideMaterial:null;for(let k=0,ce=w.length;k<ce;k++){const _e=w[k],ye=_e.object,Se=_e.geometry,Ue=q===null?_e.material:q,Oe=_e.group;ye.layers.test(G.layers)&&uo(ye,O,G,Se,Ue,Oe)}}function uo(w,O,G,q,k,ce){w.onBeforeRender(x,O,G,q,k,ce),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.transparent===!0&&k.side===mn&&k.forceSinglePass===!1?(k.side=Vt,k.needsUpdate=!0,x.renderBufferDirect(G,O,q,k,w,ce),k.side=fi,k.needsUpdate=!0,x.renderBufferDirect(G,O,q,k,w,ce),k.side=mn):x.renderBufferDirect(G,O,q,k,w,ce),w.onAfterRender(x,O,G,q,k,ce)}function Oi(w,O,G){O.isScene!==!0&&(O=we);const q=Ne.get(w),k=m.state.lights,ce=m.state.shadowsArray,_e=k.state.version,ye=te.getParameters(w,k.state,ce,O,G),Se=te.getProgramCacheKey(ye);let Ue=q.programs;q.environment=w.isMeshStandardMaterial?O.environment:null,q.fog=O.fog,q.envMap=(w.isMeshStandardMaterial?M:R).get(w.envMap||q.environment),q.envMapRotation=q.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Ue===void 0&&(w.addEventListener("dispose",Ae),Ue=new Map,q.programs=Ue);let Oe=Ue.get(Se);if(Oe!==void 0){if(q.currentProgram===Oe&&q.lightsStateVersion===_e)return _h(w,ye),Oe}else ye.uniforms=te.getUniforms(w),w.onBeforeCompile(ye,x),Oe=te.acquireProgram(ye,Se),Ue.set(Se,Oe),q.uniforms=ye.uniforms;const Le=q.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Le.clippingPlanes=ke.uniform),_h(w,ye),q.needsLights=Of(w),q.lightsStateVersion=_e,q.needsLights&&(Le.ambientLightColor.value=k.state.ambient,Le.lightProbe.value=k.state.probe,Le.directionalLights.value=k.state.directional,Le.directionalLightShadows.value=k.state.directionalShadow,Le.spotLights.value=k.state.spot,Le.spotLightShadows.value=k.state.spotShadow,Le.rectAreaLights.value=k.state.rectArea,Le.ltc_1.value=k.state.rectAreaLTC1,Le.ltc_2.value=k.state.rectAreaLTC2,Le.pointLights.value=k.state.point,Le.pointLightShadows.value=k.state.pointShadow,Le.hemisphereLights.value=k.state.hemi,Le.directionalShadowMap.value=k.state.directionalShadowMap,Le.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Le.spotShadowMap.value=k.state.spotShadowMap,Le.spotLightMatrix.value=k.state.spotLightMatrix,Le.spotLightMap.value=k.state.spotLightMap,Le.pointShadowMap.value=k.state.pointShadowMap,Le.pointShadowMatrix.value=k.state.pointShadowMatrix),q.currentProgram=Oe,q.uniformsList=null,Oe}function gh(w){if(w.uniformsList===null){const O=w.currentProgram.getUniforms();w.uniformsList=sa.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function _h(w,O){const G=Ne.get(w);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function Uf(w,O,G,q,k){O.isScene!==!0&&(O=we),Be.resetTextureUnits();const ce=O.fog,_e=q.isMeshStandardMaterial?O.environment:null,ye=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Rt,Se=(q.isMeshStandardMaterial?M:R).get(q.envMap||_e),Ue=q.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Oe=!!G.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Le=!!G.morphAttributes.position,it=!!G.morphAttributes.normal,bt=!!G.morphAttributes.color;let At=hi;q.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(At=x.toneMapping);const nn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,st=nn!==void 0?nn.length:0,Re=Ne.get(q),zt=m.state.lights;if($===!0&&(ee===!0||w!==b)){const un=w===b&&q.id===N;ke.setState(q,w,un)}let rt=!1;q.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==zt.state.version||Re.outputColorSpace!==ye||k.isBatchedMesh&&Re.batching===!1||!k.isBatchedMesh&&Re.batching===!0||k.isBatchedMesh&&Re.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Re.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Re.instancing===!1||!k.isInstancedMesh&&Re.instancing===!0||k.isSkinnedMesh&&Re.skinning===!1||!k.isSkinnedMesh&&Re.skinning===!0||k.isInstancedMesh&&Re.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Re.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Re.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Re.instancingMorph===!1&&k.morphTexture!==null||Re.envMap!==Se||q.fog===!0&&Re.fog!==ce||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ke.numPlanes||Re.numIntersection!==ke.numIntersection)||Re.vertexAlphas!==Ue||Re.vertexTangents!==Oe||Re.morphTargets!==Le||Re.morphNormals!==it||Re.morphColors!==bt||Re.toneMapping!==At||Re.morphTargetsCount!==st)&&(rt=!0):(rt=!0,Re.__version=q.version);let wn=Re.currentProgram;rt===!0&&(wn=Oi(q,O,k));let os=!1,sn=!1,Ga=!1;const Pt=wn.getUniforms(),gi=Re.uniforms;if(Me.useProgram(wn.program)&&(os=!0,sn=!0,Ga=!0),q.id!==N&&(N=q.id,sn=!0),os||b!==w){Pt.setValue(L,"projectionMatrix",w.projectionMatrix),Pt.setValue(L,"viewMatrix",w.matrixWorldInverse);const un=Pt.map.cameraPosition;un!==void 0&&un.setValue(L,ue.setFromMatrixPosition(w.matrixWorld)),Xe.logarithmicDepthBuffer&&Pt.setValue(L,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Pt.setValue(L,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,sn=!0,Ga=!0)}if(k.isSkinnedMesh){Pt.setOptional(L,k,"bindMatrix"),Pt.setOptional(L,k,"bindMatrixInverse");const un=k.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Pt.setValue(L,"boneTexture",un.boneTexture,Be))}k.isBatchedMesh&&(Pt.setOptional(L,k,"batchingTexture"),Pt.setValue(L,"batchingTexture",k._matricesTexture,Be),Pt.setOptional(L,k,"batchingIdTexture"),Pt.setValue(L,"batchingIdTexture",k._indirectTexture,Be),Pt.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&Pt.setValue(L,"batchingColorTexture",k._colorsTexture,Be));const Wa=G.morphAttributes;if((Wa.position!==void 0||Wa.normal!==void 0||Wa.color!==void 0)&&qe.update(k,G,wn),(sn||Re.receiveShadow!==k.receiveShadow)&&(Re.receiveShadow=k.receiveShadow,Pt.setValue(L,"receiveShadow",k.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(gi.envMap.value=Se,gi.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&O.environment!==null&&(gi.envMapIntensity.value=O.environmentIntensity),sn&&(Pt.setValue(L,"toneMappingExposure",x.toneMappingExposure),Re.needsLights&&Ff(gi,Ga),ce&&q.fog===!0&&Ee.refreshFogUniforms(gi,ce),Ee.refreshMaterialUniforms(gi,q,Q,K,m.state.transmissionRenderTarget[w.id]),sa.upload(L,gh(Re),gi,Be)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(sa.upload(L,gh(Re),gi,Be),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Pt.setValue(L,"center",k.center),Pt.setValue(L,"modelViewMatrix",k.modelViewMatrix),Pt.setValue(L,"normalMatrix",k.normalMatrix),Pt.setValue(L,"modelMatrix",k.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const un=q.uniformsGroups;for(let Xa=0,Bf=un.length;Xa<Bf;Xa++){const vh=un[Xa];pt.update(vh,wn),pt.bind(vh,wn)}}return wn}function Ff(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function Of(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,O,G){Ne.get(w.texture).__webglTexture=O,Ne.get(w.depthTexture).__webglTexture=G;const q=Ne.get(w);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=G===void 0,q.__autoAllocateDepthBuffer||je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,O){const G=Ne.get(w);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(w,O=0,G=0){T=w,D=O,E=G;let q=!0,k=null,ce=!1,_e=!1;if(w){const Se=Ne.get(w);Se.__useDefaultFramebuffer!==void 0?(Me.bindFramebuffer(L.FRAMEBUFFER,null),q=!1):Se.__webglFramebuffer===void 0?Be.setupRenderTarget(w):Se.__hasExternalTextures&&Be.rebindTextures(w,Ne.get(w.texture).__webglTexture,Ne.get(w.depthTexture).__webglTexture);const Ue=w.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(_e=!0);const Oe=Ne.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Oe[O])?k=Oe[O][G]:k=Oe[O],ce=!0):w.samples>0&&Be.useMultisampledRTT(w)===!1?k=Ne.get(w).__webglMultisampledFramebuffer:Array.isArray(Oe)?k=Oe[G]:k=Oe,y.copy(w.viewport),I.copy(w.scissor),B=w.scissorTest}else y.copy(me).multiplyScalar(Q).floor(),I.copy(ve).multiplyScalar(Q).floor(),B=ze;if(Me.bindFramebuffer(L.FRAMEBUFFER,k)&&q&&Me.drawBuffers(w,k),Me.viewport(y),Me.scissor(I),Me.setScissorTest(B),ce){const Se=Ne.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Se.__webglTexture,G)}else if(_e){const Se=Ne.get(w.texture),Ue=O||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Se.__webglTexture,G||0,Ue)}N=-1},this.readRenderTargetPixels=function(w,O,G,q,k,ce,_e){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye){Me.bindFramebuffer(L.FRAMEBUFFER,ye);try{const Se=w.texture,Ue=Se.format,Oe=Se.type;if(!Xe.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-q&&G>=0&&G<=w.height-k&&L.readPixels(O,G,q,k,Ce.convert(Ue),Ce.convert(Oe),ce)}finally{const Se=T!==null?Ne.get(T).__webglFramebuffer:null;Me.bindFramebuffer(L.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(w,O,G,q,k,ce,_e){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye){Me.bindFramebuffer(L.FRAMEBUFFER,ye);try{const Se=w.texture,Ue=Se.format,Oe=Se.type;if(!Xe.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=w.width-q&&G>=0&&G<=w.height-k){const Le=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Le),L.bufferData(L.PIXEL_PACK_BUFFER,ce.byteLength,L.STREAM_READ),L.readPixels(O,G,q,k,Ce.convert(Ue),Ce.convert(Oe),0),L.flush();const it=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);await tm(L,it,4);try{L.bindBuffer(L.PIXEL_PACK_BUFFER,Le),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ce)}finally{L.deleteBuffer(Le),L.deleteSync(it)}return ce}}finally{const Se=T!==null?Ne.get(T).__webglFramebuffer:null;Me.bindFramebuffer(L.FRAMEBUFFER,Se)}}},this.copyFramebufferToTexture=function(w,O=null,G=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1]);const q=Math.pow(2,-G),k=Math.floor(w.image.width*q),ce=Math.floor(w.image.height*q),_e=O!==null?O.x:0,ye=O!==null?O.y:0;Be.setTexture2D(w,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,_e,ye,k,ce),Me.unbindTexture()},this.copyTextureToTexture=function(w,O,G=null,q=null,k=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,w=arguments[1],O=arguments[2],k=arguments[3]||0,G=null);let ce,_e,ye,Se,Ue,Oe;G!==null?(ce=G.max.x-G.min.x,_e=G.max.y-G.min.y,ye=G.min.x,Se=G.min.y):(ce=w.image.width,_e=w.image.height,ye=0,Se=0),q!==null?(Ue=q.x,Oe=q.y):(Ue=0,Oe=0);const Le=Ce.convert(O.format),it=Ce.convert(O.type);Be.setTexture2D(O,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const bt=L.getParameter(L.UNPACK_ROW_LENGTH),At=L.getParameter(L.UNPACK_IMAGE_HEIGHT),nn=L.getParameter(L.UNPACK_SKIP_PIXELS),st=L.getParameter(L.UNPACK_SKIP_ROWS),Re=L.getParameter(L.UNPACK_SKIP_IMAGES),zt=w.isCompressedTexture?w.mipmaps[k]:w.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,zt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,zt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ye),L.pixelStorei(L.UNPACK_SKIP_ROWS,Se),w.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,k,Ue,Oe,ce,_e,Le,it,zt.data):w.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,k,Ue,Oe,zt.width,zt.height,Le,zt.data):L.texSubImage2D(L.TEXTURE_2D,k,Ue,Oe,ce,_e,Le,it,zt),L.pixelStorei(L.UNPACK_ROW_LENGTH,bt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,At),L.pixelStorei(L.UNPACK_SKIP_PIXELS,nn),L.pixelStorei(L.UNPACK_SKIP_ROWS,st),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Re),k===0&&O.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),Me.unbindTexture()},this.copyTextureToTexture3D=function(w,O,G=null,q=null,k=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,q=arguments[1]||null,w=arguments[2],O=arguments[3],k=arguments[4]||0);let ce,_e,ye,Se,Ue,Oe,Le,it,bt;const At=w.isCompressedTexture?w.mipmaps[k]:w.image;G!==null?(ce=G.max.x-G.min.x,_e=G.max.y-G.min.y,ye=G.max.z-G.min.z,Se=G.min.x,Ue=G.min.y,Oe=G.min.z):(ce=At.width,_e=At.height,ye=At.depth,Se=0,Ue=0,Oe=0),q!==null?(Le=q.x,it=q.y,bt=q.z):(Le=0,it=0,bt=0);const nn=Ce.convert(O.format),st=Ce.convert(O.type);let Re;if(O.isData3DTexture)Be.setTexture3D(O,0),Re=L.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)Be.setTexture2DArray(O,0),Re=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const zt=L.getParameter(L.UNPACK_ROW_LENGTH),rt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),wn=L.getParameter(L.UNPACK_SKIP_PIXELS),os=L.getParameter(L.UNPACK_SKIP_ROWS),sn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,At.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,At.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Se),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ue),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Oe),w.isDataTexture||w.isData3DTexture?L.texSubImage3D(Re,k,Le,it,bt,ce,_e,ye,nn,st,At.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(Re,k,Le,it,bt,ce,_e,ye,nn,At.data):L.texSubImage3D(Re,k,Le,it,bt,ce,_e,ye,nn,st,At),L.pixelStorei(L.UNPACK_ROW_LENGTH,zt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,rt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,wn),L.pixelStorei(L.UNPACK_SKIP_ROWS,os),L.pixelStorei(L.UNPACK_SKIP_IMAGES,sn),k===0&&O.generateMipmaps&&L.generateMipmap(Re),Me.unbindTexture()},this.initRenderTarget=function(w){Ne.get(w).__webglFramebuffer===void 0&&Be.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Be.setTextureCube(w,0):w.isData3DTexture?Be.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Be.setTexture2DArray(w,0):Be.setTexture2D(w,0),Me.unbindTexture()},this.resetState=function(){D=0,E=0,T=null,Me.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Oc?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===Ia?"display-p3":"srgb"}}class Na{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ie(e),this.density=t}clone(){return new Na(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class nf extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mt,this.environmentIntensity=1,this.environmentRotation=new Mt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class sf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return zc("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new A;class Qr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Qr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Hc extends yn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let bs;const pr=new A,As=new A,Es=new A,Ts=new J,mr=new J,rf=new Ie,No=new A,gr=new A,Uo=new A,pu=new J,vl=new J,mu=new J;class of extends gt{constructor(e=new Hc){if(super(),this.isSprite=!0,this.type="Sprite",bs===void 0){bs=new St;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new sf(t,5);bs.setIndex([0,1,2,0,2,3]),bs.setAttribute("position",new Qr(n,3,0,!1)),bs.setAttribute("uv",new Qr(n,2,3,!1))}this.geometry=bs,this.material=e,this.center=new J(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),As.setFromMatrixScale(this.matrixWorld),rf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Es.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&As.multiplyScalar(-Es.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Fo(No.set(-.5,-.5,0),Es,o,As,i,r),Fo(gr.set(.5,-.5,0),Es,o,As,i,r),Fo(Uo.set(.5,.5,0),Es,o,As,i,r),pu.set(0,0),vl.set(1,0),mu.set(1,1);let a=e.ray.intersectTriangle(No,gr,Uo,!1,pr);if(a===null&&(Fo(gr.set(-.5,.5,0),Es,o,As,i,r),vl.set(0,1),a=e.ray.intersectTriangle(No,Uo,gr,!1,pr),a===null))return;const l=e.ray.origin.distanceTo(pr);l<e.near||l>e.far||t.push({distance:l,point:pr.clone(),uv:In.getInterpolation(pr,No,gr,Uo,pu,vl,mu,new J),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Fo(s,e,t,n,i,r){Ts.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(mr.x=r*Ts.x-i*Ts.y,mr.y=i*Ts.x+r*Ts.y):mr.copy(Ts),s.copy(e),s.x+=mr.x,s.y+=mr.y,s.applyMatrix4(rf)}const gu=new A,_u=new Ze,vu=new Ze,cx=new A,xu=new Ie,Oo=new A,xl=new Wn,yu=new Ie,yl=new La;class hx extends ft{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sh,this.bindMatrix=new Ie,this.bindMatrixInverse=new Ie,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new pi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Oo),this.boundingBox.expandByPoint(Oo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Wn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Oo),this.boundingSphere.expandByPoint(Oo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xl.copy(this.boundingSphere),xl.applyMatrix4(i),e.ray.intersectsSphere(xl)!==!1&&(yu.copy(i).invert(),yl.copy(e.ray).applyMatrix4(yu),!(this.boundingBox!==null&&yl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,yl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ze,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Sh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===wp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;_u.fromBufferAttribute(i.attributes.skinIndex,e),vu.fromBufferAttribute(i.attributes.skinWeight,e),gu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=vu.getComponent(r);if(o!==0){const a=_u.getComponent(r);xu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(cx.copy(gu).applyMatrix4(xu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class af extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class is extends Ut{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Qe,h=Qe,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Mu=new Ie,ux=new Ie;class Gc{constructor(e=[],t=[]){this.uuid=Nn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ie)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ie;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:ux;Mu.multiplyMatrices(a,t[r]),Mu.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Gc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new is(t,e,e,Jt,Ln);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new af),this.bones.push(o),this.boneInverses.push(new Ie().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class _c extends Ct{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Cs=new Ie,Su=new Ie,Bo=[],wu=new pi,dx=new Ie,_r=new ft,vr=new Wn;class lf extends ft{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _c(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,dx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Cs),wu.copy(e.boundingBox).applyMatrix4(Cs),this.boundingBox.union(wu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Cs),vr.copy(e.boundingSphere).applyMatrix4(Cs),this.boundingSphere.union(vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(_r.geometry=this.geometry,_r.material=this.material,_r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vr.copy(this.boundingSphere),vr.applyMatrix4(n),e.ray.intersectsSphere(vr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Cs),Su.multiplyMatrices(n,Cs),_r.matrixWorld=Su,_r.raycast(e,Bo);for(let o=0,a=Bo.length;o<a;o++){const l=Bo[o];l.instanceId=r,l.object=this,t.push(l)}Bo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _c(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new is(new Float32Array(i*this.count),i,this.count,Ic,Ln));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Wc extends yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Sa=new A,wa=new A,bu=new Ie,xr=new La,zo=new Wn,Ml=new A,Au=new A;class Ua extends gt{constructor(e=new St,t=new Wc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Sa.fromBufferAttribute(t,i-1),wa.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Sa.distanceTo(wa);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(i),zo.radius+=r,e.ray.intersectsSphere(zo)===!1)return;bu.copy(i).invert(),xr.copy(e.ray).applyMatrix4(bu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),v=h.getX(_+1),x=ko(this,e,xr,l,p,v);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=ko(this,e,xr,l,_,m);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=ko(this,e,xr,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=ko(this,e,xr,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ko(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(Sa.fromBufferAttribute(o,i),wa.fromBufferAttribute(o,r),t.distanceSqToSegment(Sa,wa,Ml,Au)>n)return;Ml.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ml);if(!(l<e.near||l>e.far))return{distance:l,point:Au.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}const Eu=new A,Tu=new A;class fx extends Ua{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Eu.fromBufferAttribute(t,i),Tu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Eu.distanceTo(Tu);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class px extends Ua{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ss extends yn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Cu=new Ie,vc=new La,Vo=new Wn,Ho=new A;class rr extends gt{constructor(e=new St,t=new ss){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(i),Vo.radius+=r,e.ray.intersectsSphere(Vo)===!1)return;Cu.copy(i).invert(),vc.copy(e.ray).applyMatrix4(Cu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);Ho.fromBufferAttribute(u,m),Ru(Ho,m,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)Ho.fromBufferAttribute(u,g),Ru(Ho,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ru(s,e,t,n,i,r,o){const a=vc.distanceSqToPoint(s);if(a<t){const l=new A;vc.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Xc extends Ut{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Xn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new J:new A);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new A,i=[],r=[],o=[],a=new A,l=new Ie;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new A)}r[0]=new A,o[0]=new A;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Nt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Nt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class qc extends Xn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new J){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class mx extends qc{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Yc(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const Go=new A,Sl=new Yc,wl=new Yc,bl=new Yc;class gx extends Xn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new A){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Go.subVectors(i[0],i[1]).add(i[0]),c=Go);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Go.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Go),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Sl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),wl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),bl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Sl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),wl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),bl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Sl.calc(l),wl.calc(l),bl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new A().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Pu(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function _x(s,e){const t=1-s;return t*t*e}function vx(s,e){return 2*(1-s)*s*e}function xx(s,e){return s*s*e}function zr(s,e,t,n){return _x(s,e)+vx(s,t)+xx(s,n)}function yx(s,e){const t=1-s;return t*t*t*e}function Mx(s,e){const t=1-s;return 3*t*t*s*e}function Sx(s,e){return 3*(1-s)*s*s*e}function wx(s,e){return s*s*s*e}function kr(s,e,t,n,i){return yx(s,e)+Mx(s,t)+Sx(s,n)+wx(s,i)}class cf extends Xn{constructor(e=new J,t=new J,n=new J,i=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new J){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(e,i.x,r.x,o.x,a.x),kr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bx extends Xn{constructor(e=new A,t=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new A){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(e,i.x,r.x,o.x,a.x),kr(e,i.y,r.y,o.y,a.y),kr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hf extends Xn{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new J){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ax extends Xn{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class uf extends Xn{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(zr(e,i.x,r.x,o.x),zr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ex extends Xn{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(zr(e,i.x,r.x,o.x),zr(e,i.y,r.y,o.y),zr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class df extends Xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new J){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Pu(a,l.x,c.x,h.x,u.x),Pu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new J().fromArray(i))}return this}}var Iu=Object.freeze({__proto__:null,ArcCurve:mx,CatmullRomCurve3:gx,CubicBezierCurve:cf,CubicBezierCurve3:bx,EllipseCurve:qc,LineCurve:hf,LineCurve3:Ax,QuadraticBezierCurve:uf,QuadraticBezierCurve3:Ex,SplineCurve:df});class Tx extends Xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Iu[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Iu[i.type]().fromJSON(i))}return this}}class Cx extends Tx{constructor(e){super(),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new hf(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new uf(this.currentPoint.clone(),new J(e,t),new J(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new cf(this.currentPoint.clone(),new J(e,t),new J(n,i),new J(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new df(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new qc(e,t,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class $c extends St{constructor(e=[new J(0,-.5),new J(.5,0),new J(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Nt(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/t,u=new A,d=new J,f=new A,g=new A,_=new A;let m=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(g)}for(let v=0;v<=t;v++){const x=n+v*h*i,S=Math.sin(x),D=Math.cos(x);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*S,u.y=e[E].y,u.z=e[E].x*D,o.push(u.x,u.y,u.z),d.x=v/t,d.y=E/(e.length-1),a.push(d.x,d.y);const T=l[3*E+0]*S,N=l[3*E+1],b=l[3*E+0]*D;c.push(T,N,b)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){const S=x+v*e.length,D=S,E=S+e.length,T=S+e.length+1,N=S+1;r.push(D,E,N),r.push(T,N,E)}this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("uv",new _t(a,2)),this.setAttribute("normal",new _t(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $c(e.points,e.segments,e.phiStart,e.phiLength)}}class jc extends $c{constructor(e=1,t=1,n=4,i=8){const r=new Cx;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new jc(e.radius,e.length,e.capSegments,e.radialSegments)}}class Kc extends St{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new A,h=new J;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(a,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Fa extends St{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;v(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new _t(u,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(f,2));function v(){const S=new A,D=new A;let E=0;const T=(t-e)/n;for(let N=0;N<=r;N++){const b=[],y=N/r,I=y*(t-e)+e;for(let B=0;B<=i;B++){const z=B/i,j=z*l+a,Z=Math.sin(j),K=Math.cos(j);D.x=I*Z,D.y=-y*n+m,D.z=I*K,u.push(D.x,D.y,D.z),S.set(Z,T,K).normalize(),d.push(S.x,S.y,S.z),f.push(z,1-y),b.push(g++)}_.push(b)}for(let N=0;N<i;N++)for(let b=0;b<r;b++){const y=_[b][N],I=_[b+1][N],B=_[b+1][N+1],z=_[b][N+1];h.push(y,I,z),h.push(I,B,z),E+=6}c.addGroup(p,E,0),p+=E}function x(S){const D=g,E=new J,T=new A;let N=0;const b=S===!0?e:t,y=S===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const I=g;for(let B=0;B<=i;B++){const j=B/i*l+a,Z=Math.cos(j),K=Math.sin(j);T.x=b*K,T.y=m*y,T.z=b*Z,u.push(T.x,T.y,T.z),d.push(0,y,0),E.x=Z*.5+.5,E.y=K*.5*y+.5,f.push(E.x,E.y),g++}for(let B=0;B<i;B++){const z=D+B,j=I+B;S===!0?h.push(j,j+1,z):h.push(j+1,j,z),N+=3}c.addGroup(p,N,S===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zc extends Fa{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Zc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Jc extends St{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new A,g=new J;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const v=p+m,x=v,S=v+n+1,D=v+n+2,E=v+1;a.push(x,S,E),a.push(S,D,E)}}this.setIndex(a),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(c,3)),this.setAttribute("uv",new _t(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class or extends St{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new A,d=new A,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const v=[],x=p/n;let S=0;p===0&&o===0?S=.5/t:p===n&&l===Math.PI&&(S=-.5/t);for(let D=0;D<=t;D++){const E=D/t;u.x=-e*Math.cos(i+E*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+E*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(E+S,1-x),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const x=h[p][v+1],S=h[p][v],D=h[p+1][v],E=h[p+1][v+1];(p!==0||o>0)&&f.push(x,S,E),(p!==n-1||l<Math.PI)&&f.push(S,D,E)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(_,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new or(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class kn extends yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fc,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class hn extends kn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Rx extends yn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fc,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}function Wo(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Px(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ix(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Lu(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function ff(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class ro{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Lx extends ro{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:zs,endingEnd:zs}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ks:r=e,a=2*t-n;break;case _a:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ks:o=e,l=2*n-t;break;case _a:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,v=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-f)*m+(1.5+f)*_+.5*g,S=f*m-f*_;for(let D=0;D!==a;++D)r[D]=p*o[h+D]+v*o[c+D]+x*o[l+D]+S*o[u+D];return r}}class pf extends ro{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class Dx extends ro{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class qn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Wo(t,this.TimeBufferType),this.values=Wo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Wo(e.times,Array),values:Wo(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Dx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new pf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Lx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case $r:t=this.InterpolantFactoryMethodDiscrete;break;case jr:t=this.InterpolantFactoryMethodLinear;break;case qa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $r;case this.InterpolantFactoryMethodLinear:return jr;case this.InterpolantFactoryMethodSmooth:return qa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Px(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}qn.prototype.TimeBufferType=Float32Array;qn.prototype.ValueBufferType=Float32Array;qn.prototype.DefaultInterpolation=jr;class ar extends qn{constructor(e,t,n){super(e,t,n)}}ar.prototype.ValueTypeName="bool";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=$r;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;class mf extends qn{}mf.prototype.ValueTypeName="color";class Qs extends qn{}Qs.prototype.ValueTypeName="number";class Nx extends ro{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)ht.slerpFlat(r,0,o,c-a,o,c,l);return r}}class cn extends qn{InterpolantFactoryMethodLinear(e){return new Nx(this.times,this.values,this.getValueSize(),e)}}cn.prototype.ValueTypeName="quaternion";cn.prototype.InterpolantFactoryMethodSmooth=void 0;class lr extends qn{constructor(e,t,n){super(e,t,n)}}lr.prototype.ValueTypeName="string";lr.prototype.ValueBufferType=Array;lr.prototype.DefaultInterpolation=$r;lr.prototype.InterpolantFactoryMethodLinear=void 0;lr.prototype.InterpolantFactoryMethodSmooth=void 0;class ui extends qn{}ui.prototype.ValueTypeName="vector";class ii{constructor(e="",t=-1,n=[],i=Uc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Nn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Fx(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(qn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=Ix(l);l=Lu(l,1,h),c=Lu(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Qs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];ff(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let v=0;v!==d[g].morphTargets.length;++v){const x=d[g];m.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new Qs(".morphTargetInfluence["+_+"]",m,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(ui,f+".position",d,"pos",i),n(cn,f+".quaternion",d,"rot",i),n(ui,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ux(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Qs;case"vector":case"vector2":case"vector3":case"vector4":return ui;case"color":return mf;case"quaternion":return cn;case"bool":case"boolean":return ar;case"string":return lr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Fx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Ux(s.type);if(s.times===void 0){const t=[],n=[];ff(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const li={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Ox{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Bx=new Ox;class cr{constructor(e){this.manager=e!==void 0?e:Bx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}cr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Qn={};class zx extends Error{constructor(e,t){super(e),this.response=t}}class gf extends cr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=li.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Qn[e]!==void 0){Qn[e].push({onLoad:t,onProgress:n,onError:i});return}Qn[e]=[],Qn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Qn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){v();function v(){u.read().then(({done:x,value:S})=>{if(x)p.close();else{_+=S.byteLength;const D=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let E=0,T=h.length;E<T;E++){const N=h[E];N.onProgress&&N.onProgress(D)}p.enqueue(S),v()}},x=>{p.error(x)})}}});return new Response(m)}else throw new zx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{li.add(e,c);const h=Qn[e];delete Qn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Qn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Qn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class kx extends cr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=li.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Zr("img");function l(){h(),li.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Vx extends cr{constructor(e){super(e)}load(e,t,n,i){const r=new Ut,o=new kx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Oa extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ie(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Hx extends Oa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Al=new Ie,Du=new A,Nu=new A;class Qc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kc,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Du.setFromMatrixPosition(e.matrixWorld),t.position.copy(Du),Nu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Nu),t.updateMatrixWorld(),Al.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Al),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Al)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Gx extends Qc{constructor(){super(new Yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Zs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Wx extends Oa{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Gx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Uu=new Ie,yr=new A,El=new A;class Xx extends Qc{constructor(){super(new Yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new J(4,2),this._viewportCount=6,this._viewports=[new Ze(2,1,1,1),new Ze(0,1,1,1),new Ze(3,1,1,1),new Ze(1,1,1,1),new Ze(3,0,1,1),new Ze(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),yr.setFromMatrixPosition(e.matrixWorld),n.position.copy(yr),El.copy(n.position),El.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(El),n.updateMatrixWorld(),i.makeTranslation(-yr.x,-yr.y,-yr.z),Uu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uu)}}class _f extends Oa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Xx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class qx extends Qc{constructor(){super(new so(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oo extends Oa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new qx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Vr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Yx extends cr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=li.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return li.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),li.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});li.add(e,l),r.manager.itemStart(e)}}class vf{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Fu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Fu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Fu(){return(typeof performance>"u"?Date:performance).now()}class $x{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){ht.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;ht.multiplyQuaternionsFlat(e,o,e,t,e,n),ht.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const eh="\\[\\]\\.:\\/",jx=new RegExp("["+eh+"]","g"),th="[^"+eh+"]",Kx="[^"+eh.replace("\\.","")+"]",Zx=/((?:WC+[\/:])*)/.source.replace("WC",th),Jx=/(WCOD+)?/.source.replace("WCOD",Kx),Qx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",th),ey=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",th),ty=new RegExp("^"+Zx+Jx+Qx+ey+"$"),ny=["material","materials","bones","map"];class iy{constructor(e,t,n){const i=n||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ot{constructor(e,t,n){this.path=t,this.parsedPath=n||ot.parseTrackName(t),this.node=ot.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ot.Composite(e,t,n):new ot(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(jx,"")}static parseTrackName(e){const t=ty.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);ny.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=ot.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ot.Composite=iy;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class sy{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:zs,endingEnd:zs};for(let c=0;c!==o;++c){const h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=dc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Ap:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Uc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===bp;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Tr){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=ks,i.endingEnd=ks):(e?i.endingStart=this.zeroSlopeAtStart?ks:zs:i.endingStart=_a,t?i.endingEnd=this.zeroSlopeAtEnd?ks:zs:i.endingEnd=_a)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}const ry=new Float32Array(1);class oy extends ns{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;g=new $x(ot.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new pf(new Float32Array(2),new Float32Array(2),1,ry),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?ii.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Uc),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new sy(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?ii.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Tc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Tc);class Ba extends ft{constructor(){const e=Ba.SkyShader,t=new Lt({name:e.name,uniforms:Pi.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Vt,depthWrite:!1});super(new ir(1,1,1),t),this.isSky=!0}}Ba.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new A},up:{value:new A(0,1,0)}},vertexShader:`
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

		}`};const ra={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ao{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ay=new so(-1,1,1,-1,0,1);class ly extends St{constructor(){super(),this.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new _t([0,2,0,0,2,0],2))}}const cy=new ly;class xf{constructor(e){this._mesh=new ft(cy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ay)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class nh extends ao{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Pi.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new xf(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ou extends ao{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class hy extends ao{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Bu{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new J);this._width=n.width,this._height=n.height,t=new $t(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Dn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new nh(ra),this.copyPass.material.blending=Et,this.clock=new vf}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Ou!==void 0&&(o instanceof Ou?n=!0:o instanceof hy&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new J);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class uy extends ao{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ie}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const Un={defines:{MAX_STEP:0,PERSPECTIVE_CAMERA:!0,DISTANCE_ATTENUATION:!0,FRESNEL:!0,INFINITE_THICK:!1,SELECTIVE:!1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tMetalness:{value:null},tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new J},cameraProjectionMatrix:{value:new Ie},cameraInverseProjectionMatrix:{value:new Ie},opacity:{value:.5},maxDistance:{value:180},cameraRange:{value:0},thickness:{value:.018}},vertexShader:`

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
	`},Xo={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`

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

	`},wi={uniforms:{tDiffuse:{value:null},resolution:{value:new J},opacity:{value:.5}},vertexShader:`

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
	`};class si extends ao{constructor({renderer:e,scene:t,camera:n,width:i,height:r,selects:o,bouncing:a=!1,groundReflector:l}){super(),this.width=i!==void 0?i:512,this.height=r!==void 0?r:512,this.clear=!0,this.renderer=e,this.scene=t,this.camera=n,this.groundReflector=l,this.opacity=Un.uniforms.opacity.value,this.output=0,this.maxDistance=Un.uniforms.maxDistance.value,this.thickness=Un.uniforms.thickness.value,this.tempColor=new ie,this._selects=o,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(h){this._selects!==h&&(this._selects=h,Array.isArray(h)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=a,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(h){this._bouncing!==h&&(this._bouncing=h,h?this.ssrMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture:this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=Un.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(h){this._distanceAttenuation!==h&&(this._distanceAttenuation=h,this.ssrMaterial.defines.DISTANCE_ATTENUATION=h,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=Un.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(h){this._fresnel!==h&&(this._fresnel=h,this.ssrMaterial.defines.FRESNEL=h,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=Un.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(h){this._infiniteThick!==h&&(this._infiniteThick=h,this.ssrMaterial.defines.INFINITE_THICK=h,this.ssrMaterial.needsUpdate=!0)}});const c=new Jr;c.type=Ui,c.minFilter=Qe,c.magFilter=Qe,this.beautyRenderTarget=new $t(this.width,this.height,{minFilter:Qe,magFilter:Qe,type:Dn,depthTexture:c,depthBuffer:!0}),this.prevRenderTarget=new $t(this.width,this.height,{minFilter:Qe,magFilter:Qe}),this.normalRenderTarget=new $t(this.width,this.height,{minFilter:Qe,magFilter:Qe,type:Dn}),this.metalnessRenderTarget=new $t(this.width,this.height,{minFilter:Qe,magFilter:Qe,type:Dn}),this.ssrRenderTarget=new $t(this.width,this.height,{minFilter:Qe,magFilter:Qe}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),this.ssrMaterial=new Lt({defines:Object.assign({},Un.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:Pi.clone(Un.uniforms),vertexShader:Un.vertexShader,fragmentShader:Un.fragmentShader,blending:Et}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Rx,this.normalMaterial.blending=Et,this.metalnessOnMaterial=new vn({color:"white"}),this.metalnessOffMaterial=new vn({color:"black"}),this.blurMaterial=new Lt({defines:Object.assign({},wi.defines),uniforms:Pi.clone(wi.uniforms),vertexShader:wi.vertexShader,fragmentShader:wi.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new Lt({defines:Object.assign({},wi.defines),uniforms:Pi.clone(wi.uniforms),vertexShader:wi.vertexShader,fragmentShader:wi.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Lt({defines:Object.assign({},Xo.defines),uniforms:Pi.clone(Xo.uniforms),vertexShader:Xo.vertexShader,fragmentShader:Xo.fragmentShader,blending:Et}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Lt({uniforms:Pi.clone(ra.uniforms),vertexShader:ra.vertexShader,fragmentShader:ra.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:qr,blendDst:Yr,blendEquation:ri,blendSrcAlpha:qr,blendDstAlpha:Yr,blendEquationAlpha:ri}),this.fsQuad=new xf(null),this.originalClearColor=new ie}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,t){switch(e.setRenderTarget(this.beautyRenderTarget),e.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),e.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this.renderMetalness(e,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.renderPass(e,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this.renderPass(e,this.blurMaterial,this.blurRenderTarget),this.renderPass(e,this.blurMaterial2,this.blurRenderTarget2)),this.output){case si.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=Et,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=zn,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=Et,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=Et,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=zn,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t));break;case si.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=Et,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=Et,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=zn,this.renderPass(e,this.copyMaterial,this.prevRenderTarget));break;case si.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=Et,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case si.OUTPUT.Depth:this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case si.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Et,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case si.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=Et,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}renderPass(e,t,n,i,r){this.originalClearColor.copy(e.getClearColor(this.tempColor));const o=e.getClearAlpha(this.tempColor),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}renderOverride(e,t,n,i,r){this.originalClearColor.copy(e.getClearColor(this.tempColor));const o=e.getClearAlpha(this.tempColor),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}renderMetalness(e,t,n,i,r){this.originalClearColor.copy(e.getClearColor(this.tempColor));const o=e.getClearAlpha(this.tempColor),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.traverseVisible(l=>{l._SSRPassBackupMaterial=l.material,this._selects.includes(l)?l.material=this.metalnessOnMaterial:l.material=this.metalnessOffMaterial}),e.render(this.scene,this.camera),this.scene.traverseVisible(l=>{l.material=l._SSRPassBackupMaterial}),e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}setSize(e,t){this.width=e,this.height=t,this.ssrMaterial.defines.MAX_STEP=Math.sqrt(e*e+t*t),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(e,t),this.prevRenderTarget.setSize(e,t),this.ssrRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.metalnessRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.blurRenderTarget2.setSize(e,t),this.ssrMaterial.uniforms.resolution.value.set(e,t),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t),this.blurMaterial2.uniforms.resolution.value.set(e,t)}}si.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7};function C(s,e,t){return Math.min(t,Math.max(e,s))}function F(s,e,t){return s+(e-s)*t}function zu(s,e,t){const n=C((t-s)/(e-s),0,1);return n*n*(3-2*n)}function Zi(s){return s*Math.PI/180}function ku(s){const e=Math.sin(s*127.1)*43758.5453123;return e-Math.floor(e)}function Vu(s,e){const t=Math.max(1e-9,ku(s)),n=Math.max(1e-9,ku(e));return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*n)}function dy(s){return Math.max(0,Math.min(1,s))}function fy(s){return s-Math.floor(s)}function Gn(s){let e=s>>>0;return()=>{e+=1831565813;let t=Math.imul(e^e>>>15,1|e);return t^=t+Math.imul(t^t>>>7,61|t),((t^t>>>14)>>>0)/4294967296}}function Hu(s){return fy(Math.sin(s)*43758.5453123)}function Dt(s,e,t){const n=dy((t-s)/(e-s));return n*n*(3-2*n)}function py(s,e=0){const t=Math.floor(s),n=s-t,i=Hu(t+e*101.13),r=Hu(t+1+e*101.13);return i+(r-i)*Dt(0,1,n)}function Tl(s,e=0,t=4){let n=.5,i=1,r=0,o=0;for(let a=0;a<t;a++)r+=n*py(s*i,e+a*17),o+=n,n*=.5,i*=2;return o>0?r/o:0}function Gu(s,e,t){const n=Math.min(e,t),i=Math.max(e,t);return n+Math.floor(s()*(i-n+1))}function Wu(s){const e=Math.max(32,Math.floor(s.size)),t=Gn(s.seed),n=[],i=Math.max(4,Math.floor(s.components)),r=Math.max(1,Math.floor(s.freqMin)),o=Math.max(r,Math.floor(s.freqMax));for(let f=0;f<i;f++){let g=0,_=0;for(let x=0;x<8&&g===0&&_===0;x++)g=Gu(t,-o,o),_=Gu(t,-o,o),Math.abs(g)<r&&(g=0),Math.abs(_)<r&&(_=0);g===0&&_===0&&(g=r);const m=t()*Math.PI*2,p=Math.sqrt(g*g+_*_),v=1/Math.pow(Math.max(.001,p),Math.max(.1,s.falloff));n.push({kx:g,ky:_,phase:m,amp:v})}let a=0;for(const f of n)a+=f.amp;const l=a>1e-6?1/a:1;for(const f of n)f.amp*=l;const c=new Uint8Array(e*e*4),h=Math.PI*2,u=Math.max(0,s.strength);for(let f=0;f<e;f++){const g=f/e;for(let _=0;_<e;_++){const m=_/e;let p=0,v=0;for(const I of n){const B=h*(I.kx*m+I.ky*g)+I.phase,z=Math.cos(B);p+=I.amp*z*h*I.kx,v+=I.amp*z*h*I.ky}let x=-p*u,S=1,D=-v*u;const E=1/Math.max(1e-9,Math.sqrt(x*x+S*S+D*D));x*=E,S*=E,D*=E;const T=Math.max(0,Math.min(255,Math.round((x*.5+.5)*255))),N=Math.max(0,Math.min(255,Math.round((D*.5+.5)*255))),b=Math.max(0,Math.min(255,Math.round((S*.5+.5)*255))),y=(f*e+_)*4;c[y+0]=T,c[y+1]=N,c[y+2]=b,c[y+3]=255}}const d=new is(c,e,e);return d.name="MicroNormalTexture",d.flipY=!1,d.colorSpace=Rn,d.wrapS=Mn,d.wrapT=Mn,d.generateMipmaps=!0,d.minFilter=_n,d.magFilter=tt,d.needsUpdate=!0,d}function my(){const s=Wu({size:256,seed:1337421,components:14,freqMin:4,freqMax:42,strength:.0075,falloff:1.15}),e=Wu({size:256,seed:991103,components:18,freqMin:14,freqMax:96,strength:.0105,falloff:1.25});return s.name="MicroNormal_Ripples",e.name="MicroNormal_Capillary",{ripples:s,capillary:e}}const Rs=32,Xu=(()=>{const s=new is(new Uint8Array([0,0,0,255]),1,1);return s.needsUpdate=!0,s.flipY=!1,s.colorSpace=Rt,s.minFilter=tt,s.magFilter=tt,s})(),qu=(()=>{const s=new is(new Uint8Array([0,0,0,255]),1,1);return s.needsUpdate=!0,s.flipY=!1,s.colorSpace=Rt,s.minFilter=tt,s.magFilter=tt,s})();(()=>{const s=new is(new Uint8Array([128,128,255,255]),1,1);return s.needsUpdate=!0,s.flipY=!1,s.colorSpace=Rn,s.minFilter=tt,s.magFilter=tt,s.wrapS=Mn,s.wrapT=Mn,s})();const Yu=my();class gy{constructor(e){P(this,"material");P(this,"shader",null);P(this,"uniforms");const t=[],n=[];for(let i=0;i<Rs;i++)t.push(new Ze(1,0,0,1)),n.push(new Ze(0,0,0,0));this.uniforms={u_time:{value:0},u_origin:{value:new J(0,0)},u_current:{value:new J(0,0)},u_tideHeight:{value:0},u_waveA:{value:t},u_waveB:{value:n},u_foamIntensity:{value:e.foamIntensity},u_foamSlopeStart:{value:e.foamSlopeStart},u_foamSlopeEnd:{value:e.foamSlopeEnd},u_waterClarity:{value:.7},u_sunDir:{value:new A(0,1,0)},u_sunColor:{value:new ie("#ffffff")},u_sunIntensity:{value:1},u_reflectionMap:{value:Xu},u_reflectionMatrix:{value:new Ie},u_reflectionStrength:{value:0},u_reflectionTexel:{value:new J(1,1)},u_reflectionBlur:{value:0},u_reflectionEdgeFade:{value:.03},u_foamMap:{value:qu},u_foamCenter:{value:new J(0,0)},u_foamWorldSize:{value:240},u_wind:{value:new J(0,0)},u_microNormal1:{value:Yu.ripples},u_microNormal2:{value:Yu.capillary},u_microScale1:{value:.28},u_microScale2:{value:.85},u_microStrength:{value:.08},u_microFadeNear:{value:70},u_microFadeFar:{value:320}},this.material=new hn({color:new ie(e.waterColor),roughness:.045,metalness:0,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.25,ior:1.333,reflectivity:.78}),this.material.side=mn,this.setWaves(e.waves),this.material.onBeforeCompile=i=>{i.uniforms.u_time=this.uniforms.u_time,i.uniforms.u_origin=this.uniforms.u_origin,i.uniforms.u_current=this.uniforms.u_current,i.uniforms.u_tideHeight=this.uniforms.u_tideHeight,i.uniforms.u_waveA=this.uniforms.u_waveA,i.uniforms.u_waveB=this.uniforms.u_waveB,i.uniforms.u_foamIntensity=this.uniforms.u_foamIntensity,i.uniforms.u_foamSlopeStart=this.uniforms.u_foamSlopeStart,i.uniforms.u_foamSlopeEnd=this.uniforms.u_foamSlopeEnd,i.uniforms.u_waterClarity=this.uniforms.u_waterClarity,i.uniforms.u_sunDir=this.uniforms.u_sunDir,i.uniforms.u_sunColor=this.uniforms.u_sunColor,i.uniforms.u_sunIntensity=this.uniforms.u_sunIntensity,i.uniforms.u_reflectionMap=this.uniforms.u_reflectionMap,i.uniforms.u_reflectionMatrix=this.uniforms.u_reflectionMatrix,i.uniforms.u_reflectionStrength=this.uniforms.u_reflectionStrength,i.uniforms.u_reflectionTexel=this.uniforms.u_reflectionTexel,i.uniforms.u_reflectionBlur=this.uniforms.u_reflectionBlur,i.uniforms.u_reflectionEdgeFade=this.uniforms.u_reflectionEdgeFade,i.uniforms.u_foamMap=this.uniforms.u_foamMap,i.uniforms.u_foamCenter=this.uniforms.u_foamCenter,i.uniforms.u_foamWorldSize=this.uniforms.u_foamWorldSize,i.uniforms.u_wind=this.uniforms.u_wind,i.uniforms.u_microNormal1=this.uniforms.u_microNormal1,i.uniforms.u_microNormal2=this.uniforms.u_microNormal2,i.uniforms.u_microScale1=this.uniforms.u_microScale1,i.uniforms.u_microScale2=this.uniforms.u_microScale2,i.uniforms.u_microStrength=this.uniforms.u_microStrength,i.uniforms.u_microFadeNear=this.uniforms.u_microFadeNear,i.uniforms.u_microFadeFar=this.uniforms.u_microFadeFar,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
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
        uniform vec4 u_waveA[${Rs}];
        uniform vec4 u_waveB[${Rs}];
        uniform float u_foamSlopeStart;
        uniform float u_foamSlopeEnd;`),i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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

        for (int i = 0; i < ${Rs}; i++) {
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
        vFoam = foamSlope * foamCrest;`),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
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
        uniform float u_sunIntensity;`),i.fragmentShader=i.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
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
        `),i.fragmentShader=i.fragmentShader.replace("#include <opaque_fragment>",`// --- Foam (instantaneous + persistent field) ---
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

        #include <opaque_fragment>`),this.shader=i},this.material.customProgramCacheKey=()=>"OceanMaterial_v6_underwater_glow",this.setWaves(e.waves)}setWaves(e){this.writeWaves(e),this.material.needsUpdate=!0}writeWaves(e){const t=Math.min(e.length,Rs);for(let n=0;n<Rs;n++)if(n<t){const i=e[n];this.uniforms.u_waveA.value[n].set(i.dirX,i.dirZ,i.A,i.k),this.uniforms.u_waveB.value[n].set(i.omega,i.phase,i.Q,0)}else this.uniforms.u_waveA.value[n].set(1,0,0,1),this.uniforms.u_waveB.value[n].set(0,0,0,0)}update(e,t){this.uniforms.u_time.value=t.time_s,this.uniforms.u_origin.value.copy(t.originXZ),this.uniforms.u_current.value.copy(t.currentXZ),this.uniforms.u_tideHeight.value=t.tideHeight_m,this.uniforms.u_waterClarity.value=C(t.waterClarity,0,1),this.uniforms.u_foamIntensity.value=C(t.foamIntensity,0,3),this.uniforms.u_foamSlopeStart.value=C(t.foamSlopeStart,0,2),this.uniforms.u_foamSlopeEnd.value=C(t.foamSlopeEnd,0,2),this.uniforms.u_wind.value.copy(t.windXZ),this.uniforms.u_microStrength.value=C(t.microStrength,0,.35),this.uniforms.u_microFadeNear.value=Math.max(1,t.microFadeNear_m),this.uniforms.u_microFadeFar.value=Math.max(this.uniforms.u_microFadeNear.value+1,t.microFadeFar_m),this.uniforms.u_sunDir.value.copy(t.sunDir).normalize(),this.uniforms.u_sunColor.value.copy(t.sunColor),this.uniforms.u_sunIntensity.value=C(t.sunIntensity,0,1.5),this.shader}bindPlanarReflection(e,t){this.uniforms.u_reflectionMap.value=e??Xu,this.uniforms.u_reflectionMatrix.value=t??new Ie}setPlanarReflectionStrength(e){this.uniforms.u_reflectionStrength.value=C(e,0,1.25)}setPlanarReflectionSampling(e){if(e.texel!==void 0)if(typeof e.texel=="number"){const t=Math.max(1e-6,e.texel);this.uniforms.u_reflectionTexel.value.set(t,t)}else this.uniforms.u_reflectionTexel.value.copy(e.texel);e.blur!==void 0&&(this.uniforms.u_reflectionBlur.value=Math.max(0,e.blur)),e.edgeFade!==void 0&&(this.uniforms.u_reflectionEdgeFade.value=C(e.edgeFade,0,.25))}bindFoamMap(e){this.uniforms.u_foamMap.value=e??qu}setFoamFieldTransform(e,t){this.uniforms.u_foamCenter.value.copy(e),this.uniforms.u_foamWorldSize.value=Math.max(.001,t)}}class _y{constructor(e,t){P(this,"textureMatrix",new Ie);P(this,"mirrorCamera",new Yt);P(this,"renderTarget");P(this,"_bias",new Ie().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1));P(this,"_normal",new A(0,1,0));P(this,"_reflectorWorldPos",new A);P(this,"_cameraWorldPos",new A);P(this,"_rotationMatrix",new Ie);P(this,"_lookAtPos",new A(0,0,-1));P(this,"_view",new A);P(this,"_target",new A);P(this,"_mirrorPlane",new Ti);P(this,"_clipPlane",new Ze);P(this,"_q",new Ze);P(this,"_hidePrev",[]);P(this,"_clipBias");const n=Math.max(16,Math.floor(t.size)),i=!!t.generateMipmaps,o=!!e.extensions.get("EXT_color_buffer_float")||!!e.extensions.get("EXT_color_buffer_half_float")?Dn:Sn,a=new $t(n,n,{format:Jt,type:o,depthBuffer:!0,stencilBuffer:!1,minFilter:i?_n:tt,magFilter:tt});a.texture.name="PlanarReflectionRT",a.texture.flipY=!1,a.texture.colorSpace=Rt,a.texture.generateMipmaps=i,e.capabilities.isWebGL2&&typeof t.multisample=="number"&&(a.samples=Math.max(0,Math.floor(t.multisample))),this.renderTarget=a,this._clipBias=t.clipBias??9e-4}setSize(e){const t=Math.max(16,Math.floor(e));this.renderTarget.setSize(t,t)}dispose(){this.renderTarget.dispose()}update(e,t,n,i,r=[]){if(n.updateMatrixWorld(),this._cameraWorldPos.setFromMatrixPosition(n.matrixWorld),this._reflectorWorldPos.set(this._cameraWorldPos.x,i,this._cameraWorldPos.z),this._view.subVectors(this._reflectorWorldPos,this._cameraWorldPos),this._view.dot(this._normal)>0)return;this._view.reflect(this._normal).negate(),this._view.add(this._reflectorWorldPos),this._rotationMatrix.extractRotation(n.matrixWorld),this._lookAtPos.set(0,0,-1),this._lookAtPos.applyMatrix4(this._rotationMatrix),this._lookAtPos.add(this._cameraWorldPos),this._target.subVectors(this._reflectorWorldPos,this._lookAtPos),this._target.reflect(this._normal).negate(),this._target.add(this._reflectorWorldPos);const o=this.mirrorCamera;o.position.copy(this._view),o.up.set(0,1,0),o.up.applyMatrix4(this._rotationMatrix),o.up.reflect(this._normal),o.lookAt(this._target),o.near=n.near,o.far=n.far,o.aspect=n.aspect,o.fov=n.fov,o.updateMatrixWorld(),o.matrixWorldInverse.copy(o.matrixWorld).invert(),o.projectionMatrix.copy(n.projectionMatrix),this.textureMatrix.copy(this._bias),this.textureMatrix.multiply(o.projectionMatrix),this.textureMatrix.multiply(o.matrixWorldInverse),this._mirrorPlane.setFromNormalAndCoplanarPoint(this._normal,this._reflectorWorldPos),this._mirrorPlane.applyMatrix4(o.matrixWorldInverse),this._clipPlane.set(this._mirrorPlane.normal.x,this._mirrorPlane.normal.y,this._mirrorPlane.normal.z,this._mirrorPlane.constant);const l=o.projectionMatrix.elements;this._q.x=(Math.sign(this._clipPlane.x)+l[8])/l[0],this._q.y=(Math.sign(this._clipPlane.y)+l[9])/l[5],this._q.z=-1,this._q.w=(1+l[10])/l[14];const c=2/this._clipPlane.dot(this._q);this._clipPlane.multiplyScalar(c),l[2]=this._clipPlane.x,l[6]=this._clipPlane.y,l[10]=this._clipPlane.z+1-this._clipBias,l[14]=this._clipPlane.w;const h=e.getRenderTarget(),u=e.xr.enabled,d=e.shadowMap.autoUpdate,f=e.toneMapping,g=r.length;this._hidePrev.length=g;for(let _=0;_<g;_++){const m=r[_];this._hidePrev[_]=m.visible,m.visible=!1}try{e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.toneMapping=hi,e.setRenderTarget(this.renderTarget),e.clear(),e.render(t,o)}finally{e.setRenderTarget(h),e.toneMapping=f,e.xr.enabled=u,e.shadowMap.autoUpdate=d;for(let _=0;_<g;_++)r[_].visible=this._hidePrev[_]}}}const Ps=24;class ih{constructor(e,t){P(this,"centerXZ",new J(0,0));P(this,"worldSize_m");P(this,"rtA");P(this,"rtB");P(this,"pingIsA",!0);P(this,"simScene",new nf);P(this,"simCam",new so(-1,1,1,-1,0,1));P(this,"quad");P(this,"uniforms");P(this,"mat");P(this,"tmpDelta",new J);P(this,"tmpFlow",new J);P(this,"tmpWind",new J);P(this,"tmpWakePos",new J);P(this,"tmpWakeDir",new J(0,1));const n=Math.max(64,Math.floor(t.size));this.worldSize_m=Math.max(20,t.worldSize_m);const r=!!e.extensions.get("EXT_color_buffer_float")||!!e.extensions.get("EXT_color_buffer_half_float")?Dn:Sn,o=()=>{const u=new $t(n,n,{format:Jt,type:r,depthBuffer:!1,stencilBuffer:!1,minFilter:tt,magFilter:tt});return u.texture.name="FoamFieldRT",u.texture.flipY=!1,u.texture.colorSpace=Rt,u.texture.generateMipmaps=!1,u.texture.wrapS=gn,u.texture.wrapT=gn,u};this.rtA=o(),this.rtB=o();const a=[],l=[];for(let u=0;u<Ps;u++)a.push(new Ze(1,0,0,1)),l.push(new Ze(0,0,0,0));this.uniforms={u_prev:{value:this.rtA.texture},u_dt:{value:.016},u_time:{value:0},u_worldSize:{value:this.worldSize_m},u_center:{value:new J(0,0)},u_recenterDeltaUV:{value:new J(0,0)},u_texel:{value:new J(1/n,1/n)},u_flow:{value:new J(0,0)},u_current:{value:new J(0,0)},u_injectStrength:{value:.5},u_decay:{value:.06},u_slopeStart:{value:.26},u_slopeEnd:{value:.52},u_crestStart:{value:.18},u_crestEnd:{value:.72},u_wakePos:{value:new J(0,0)},u_wakeDir:{value:new J(0,1)},u_wakeStrength:{value:0},u_wakeRadius:{value:1.6},u_wakeLength:{value:4.6},u_waveA:{value:a},u_waveB:{value:l}},this.mat=new Lt({uniforms:this.uniforms,depthTest:!1,depthWrite:!1,transparent:!1,blending:Et,vertexShader:`
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

        uniform vec4 u_waveA[${Ps}];
        uniform vec4 u_waveB[${Ps}];

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

          for (int i = 0; i < ${Ps}; i++) {
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
      `});const c=new mi(2,2);this.quad=new ft(c,this.mat),this.simScene.add(this.quad);const h=e.getRenderTarget();e.setRenderTarget(this.rtA),e.clear(),e.setRenderTarget(this.rtB),e.clear(),e.setRenderTarget(h)}dispose(){this.rtA.dispose(),this.rtB.dispose(),this.mat.dispose(),this.quad.geometry.dispose()}reset(e,t){t?this.centerXZ.copy(t):this.centerXZ.set(0,0),this.pingIsA=!0,this.uniforms.u_center.value.copy(this.centerXZ),this.uniforms.u_recenterDeltaUV.value.set(0,0);const n=e.getRenderTarget();e.setRenderTarget(this.rtA),e.clear(),e.setRenderTarget(this.rtB),e.clear(),e.setRenderTarget(n)}get texture(){return(this.pingIsA?this.rtA:this.rtB).texture}setWorldSize(e){this.worldSize_m=Math.max(20,e),this.uniforms.u_worldSize.value=this.worldSize_m}setSize(e){const t=Math.max(64,Math.floor(e));this.rtA.setSize(t,t),this.rtB.setSize(t,t),this.uniforms.u_texel.value.set(1/t,1/t)}writeWaves(e){const t=Math.min(e.length,Ps),n=this.uniforms.u_waveA.value,i=this.uniforms.u_waveB.value;for(let r=0;r<Ps;r++)if(r<t){const o=e[r];n[r].set(o.dirX,o.dirZ,o.A,o.k),i[r].set(o.omega,o.phase,o.Q,0)}else n[r].set(1,0,0,1),i[r].set(0,0,0,0)}update(e,t){const n=C(t.dt_s,0,.05);if(n<=0)return;this.tmpDelta.copy(t.centerXZ).sub(this.centerXZ);const i=this.tmpDelta.x/Math.max(1e-6,this.worldSize_m),r=this.tmpDelta.y/Math.max(1e-6,this.worldSize_m);this.uniforms.u_recenterDeltaUV.value.set(i,r),this.tmpWind.set(Math.cos(t.windDirTo_rad),Math.sin(t.windDirTo_rad));const o=C(t.windSpeed_mps*.02,0,.45);this.tmpWind.multiplyScalar(o),this.tmpFlow.copy(t.currentXZ).add(this.tmpWind);const a=C(t.storminess,0,1),l=C(t.windSpeed_mps/18,0,1);let c=0,h=0,u=0;for(const x of t.waves){const S=x.A_m*x.A_m;c+=Math.cos(x.dirTo_rad)*S,h+=Math.sin(x.dirTo_rad)*S,u+=S}const d=u>1e-8?Math.sqrt(c*c+h*h)/u:1,f=C(1-d,0,1);this.uniforms.u_injectStrength.value=(.22+.78*l)*(.75+1.25*a)*(1+1.05*f),this.uniforms.u_decay.value=F(.045,.085,a)*(1+.3*f),this.uniforms.u_slopeStart.value=F(.3,.19,l),this.uniforms.u_slopeEnd.value=this.uniforms.u_slopeStart.value+F(.2,.3,l),this.uniforms.u_crestStart.value=F(.15,.08,l),this.uniforms.u_crestEnd.value=F(.7,.52,l);const g=C(t.wakeStrength??0,0,1.5);g>1e-4&&t.wakePosXZ&&t.wakeDirXZ?(this.tmpWakePos.copy(t.wakePosXZ),this.tmpWakeDir.copy(t.wakeDirXZ),this.tmpWakeDir.lengthSq()>1e-8?this.tmpWakeDir.normalize():this.tmpWakeDir.set(0,1),this.uniforms.u_wakePos.value.copy(this.tmpWakePos),this.uniforms.u_wakeDir.value.copy(this.tmpWakeDir),this.uniforms.u_wakeStrength.value=g):this.uniforms.u_wakeStrength.value=0,this.uniforms.u_dt.value=n,this.uniforms.u_time.value=t.time_s,this.uniforms.u_center.value.copy(t.centerXZ),this.uniforms.u_flow.value.copy(this.tmpFlow),this.uniforms.u_current.value.copy(t.currentXZ),this.writeWaves(t.waves);const _=this.pingIsA?this.rtA:this.rtB,m=this.pingIsA?this.rtB:this.rtA;this.uniforms.u_prev.value=_.texture;const p=e.getRenderTarget(),v=e.xr.enabled;e.xr.enabled=!1,e.setRenderTarget(m),e.render(this.simScene,this.simCam),e.setRenderTarget(p),e.xr.enabled=v,this.pingIsA=!this.pingIsA,this.centerXZ.copy(t.centerXZ)}}const an=9.81;function vy(s,e){const t=Math.max(0,s),n=xy(t),i=t*Math.sqrt(n),o=e*Math.PI/180+Math.PI;return{Ug:t,U10:t,Cd:n,uStar:i,windDirTo_rad:o}}function xy(s){const e=.001*(1.1+.035*s);return C(e,8e-4,.0045)}function yy(s,e,t){const n=Math.max(1e-6,s.uStar),i=Math.max(1,e.stormRadius_km*1e3*2*C(e.fetchUtilization,.05,1)),r=Math.max(0,e.stormAge_h),o=C(e.windRamp_h,0,24),l=Math.max(0,r-.5*o)*3600,c=.00523*Math.pow(an*l/n,1.5),h=n*n/an*c,u=Math.max(1,Math.min(i,h)),d=an*u/(n*n);let f=n*n/an*(.0413*Math.pow(d,.5)),g=n/an*(.651*Math.pow(d,1/3));const _=n*n/an*211.5,m=n/an*239.8;f=Math.min(f,_),g=Math.min(g,m);const p=Math.max(.5,t.depth_m),v=9.78*Math.sqrt(p/an);return g=Math.min(g,v),f=Math.min(f,.6*p),{Hs_m:f,Tp_s:g,fetchEffective_m:u,fetchGeom_m:i,fetchFromDuration_m:h}}function My(s,e){const t=Math.max(.5,e),n=s*s;let i=Math.max(1e-6,n/an);for(let r=0;r<12;r++){const o=i*t,a=Math.tanh(o),l=an*i*a-n,c=1/Math.cosh(o),h=t*c*c,u=an*(a+i*h),d=l/Math.max(1e-9,u);if(i-=d,Math.abs(d)<1e-7)break}return Math.max(1e-6,i)}function yf(s,e,t,n){if(s<=0)return 0;const i=s<=e?.07:.09,r=Math.exp(-Math.pow(s-e,2)/(2*i*i*e*e));return t*(an*an)*Math.pow(2*Math.PI,-4)*Math.pow(s,-5)*Math.exp(-1.25*Math.pow(e/s,4))*Math.pow(n,r)}function Sy(s,e,t,n,i){const r=Math.pow(s/4,2);if(r<=0)return 0;const o=2048,a=(i-n)/o;let l=0;for(let c=0;c<o;c++){const h=n+(c+.5)*a;l+=yf(h,e,1,t)*a}return l<=1e-12?0:r/l}function Cl(s){const e=Math.max(0,Math.floor(s.waveCount));if(e<=0)return[];const t=Math.max(0,s.Hs_m),n=Math.max(1e-6,s.fp_hz),i=Math.max(.01,Math.min(s.fmin_hz,s.fmax_hz*.999)),r=Math.max(i*1.05,s.fmax_hz),o=C(s.gamma,1,7),a=Sy(t,n,o,i,r),l=Math.log(i),c=Math.log(r),h=[];for(let u=0;u<e;u++){const d=(u+.5)/e,f=Math.exp(l+(c-l)*d),g=C(1+.08*Vu(s.seed+s.seedOffset+u*13,s.seed+s.seedOffset+u*29),.75,1.25),_=C(f*g,i,r),m=2*Math.PI*_,p=My(m,s.depth_m),v=Math.exp(l+(c-l)*Math.max(0,(u-.5)/e)),x=Math.exp(l+(c-l)*Math.min(1,(u+1.5)/e)),S=Math.max(1e-6,.5*(x-v)),D=yf(_,n,a,o),E=Math.sqrt(Math.max(0,2*D*S)),T=Vu(s.seed+s.seedOffset+u*17,s.seed+s.seedOffset+u*37)*s.spread_rad,N=s.dirTo_rad+T,b=Math.cos(N),y=Math.sin(N),I=2*Math.PI*((s.seed+s.seedOffset+u*91)*1e-4%1),B=1/Math.max(1e-6,p*E*Math.max(1,e)),z=C(s.choppiness*B,0,1);h.push({dirX:b,dirZ:y,A:E,k:p,omega:m,phase:I,Q:z})}return h}function $u(s){const e=Math.floor(C(s.waveCount,4,48)),t=Math.max(0,s.Hs_m),n=Math.max(.5,s.Tp_s),i=1/n,r=C(s.swellVariance??.33,0,.85),o=Math.pow(t/4,2),a=o*r,l=Math.max(0,o-a),c=4*Math.sqrt(Math.max(0,a)),h=4*Math.sqrt(Math.max(0,l)),u=Math.max(2,Math.min(e-8,Math.round(e*.3))),d=Math.max(4,e-u),f=C(s.directionalSpread,0,1),g=Zi(10+110*f),_=Zi(4+28*f),m=Math.max(.03,.25*i),p=Math.max(m*1.1,8*i),x=1/C(n*(1.35+.45*r),5,22),S=Math.max(.015,.18*x),D=Math.max(S*1.1,Math.min(.95*i,1.6*x)),E=C(s.gamma,1,7),T=C(1+.25*(E-1),1,2),N=s.windDirTo_rad,b=s.swellDirTo_rad??s.windDirTo_rad,y=C(s.choppiness,0,2),I=C(s.choppiness*.55,0,1.25),B=C((f-.55)/.45,0,1);let z;if(B<.01)z=Cl({Hs_m:h,fp_hz:i,fmin_hz:m,fmax_hz:p,gamma:E,dirTo_rad:N,spread_rad:g,choppiness:y,depth_m:s.depth_m,waveCount:d,seed:s.seed,seedOffset:0});else{const Z=[{dir:N,w:(1-B)*1+B*.42,seedOffset:0,chop:y},{dir:N+Math.PI*.5,w:B*.22,seedOffset:2e3,chop:y*.95},{dir:N-Math.PI*.5,w:B*.22,seedOffset:4e3,chop:y*.95},{dir:N+Math.PI,w:B*.18,seedOffset:6e3,chop:y*.8}],K=Z.reduce((be,$)=>be+Math.max(0,$.w),0),Q=K>1e-6?1/K:1,W=Z.map(be=>d*Math.max(0,be.w)*Q),he=W.map(be=>Math.max(1,Math.floor(be)));let me=d-he.reduce((be,$)=>be+$,0);const ve=W.map((be,$)=>({i:$,f:be-Math.floor(be)}));ve.sort((be,$)=>$.f-be.f);let ze=0;for(;me>0;)he[ve[ze%ve.length].i]+=1,me--,ze++;for(;me<0;){let be=-1,$=1/0;for(let ee=0;ee<Z.length;ee++)he[ee]>1&&Z[ee].w<$&&(be=ee,$=Z[ee].w);if(be<0)break;he[be]-=1,me++}z=[];for(let be=0;be<Z.length;be++){const $=Z[be],ee=l*(Math.max(0,$.w)*Q),de=4*Math.sqrt(Math.max(0,ee));if(de<=0||he[be]<=0)continue;const ue=Zi(12+80*B);z.push(...Cl({Hs_m:de,fp_hz:i,fmin_hz:m,fmax_hz:p,gamma:E,dirTo_rad:$.dir,spread_rad:ue,choppiness:C($.chop,0,2),depth_m:s.depth_m,waveCount:he[be],seed:s.seed,seedOffset:$.seedOffset}))}}const j=Cl({Hs_m:c,fp_hz:x,fmin_hz:S,fmax_hz:D,gamma:T,dirTo_rad:b,spread_rad:_,choppiness:I,depth_m:s.depth_m,waveCount:u,seed:s.seed,seedOffset:10007});return[...z,...j]}function wy(s){const e=C(s,1,365),t=2*Math.PI*(e-81)/365;return Zi(23.44)*Math.sin(t)}function ju(s,e,t){const n=Math.sin(s),i=Math.cos(s),r=Math.sin(e),o=Math.cos(e),a=Math.cos(t),l=Math.sin(t),c=n*r+i*o*a,h=Math.asin(C(c,-1,1)),u=Math.max(1e-6,Math.cos(h)),d=-l*o/u,f=(r-Math.sin(h)*n)/(u*i+1e-6),g=Math.atan2(d,f);return{alt:h,az:g}}function Ku(s,e){const t=Math.cos(s),n=t*Math.sin(e),i=Math.sin(s),r=t*Math.cos(e);return[n,i,r]}function by(s){const e=Zi(C(s.latitude_deg,-89.9,89.9)),t=wy(s.dayOfYear),n=(s.timeOfDay_h%24+24)%24,i=Zi((n-12)*15),r=ju(e,t,i),o=Ku(r.alt,r.az),a=(s.moonPhase%1+1)%1,l=i+a*2*Math.PI,c=t*.6,h=ju(e,c,l),u=Ku(h.alt,h.az),d=zu(-.02,.15,r.alt),f=zu(-.05,.08,h.alt)*(1-d*.85),g=C(s.moonDistanceMultiplier,.5,2),_=1/(g*g*g);return{sunDir:o,moonDir:u,sunElevation_rad:r.alt,moonElevation_rad:h.alt,sunIntensity:d,moonIntensity:f,tideScale:_}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class Vn{constructor(e,t,n,i,r="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),Vn.nextNameID=Vn.nextNameID||0,this.$name.id=`lil-gui-name-${++Vn.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Ay extends Vn{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function xc(s){let e,t;return(e=s.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=s.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=s.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Ey={isPrimitive:!0,match:s=>typeof s=="string",fromHexString:xc,toHexString:xc},eo={isPrimitive:!0,match:s=>typeof s=="number",fromHexString:s=>parseInt(s.substring(1),16),toHexString:s=>"#"+s.toString(16).padStart(6,0)},Ty={isPrimitive:!1,match:s=>Array.isArray(s),fromHexString(s,e,t=1){const n=eo.fromHexString(s);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([s,e,t],n=1){n=255/n;const i=s*n<<16^e*n<<8^t*n<<0;return eo.toHexString(i)}},Cy={isPrimitive:!1,match:s=>Object(s)===s,fromHexString(s,e,t=1){const n=eo.fromHexString(s);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:s,g:e,b:t},n=1){n=255/n;const i=s*n<<16^e*n<<8^t*n<<0;return eo.toHexString(i)}},Ry=[Ey,eo,Ty,Cy];function Py(s){return Ry.find(e=>e.match(s))}class Iy extends Vn{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Py(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=xc(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Rl extends Vn{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Ly extends Vn{constructor(e,t,n,i,r,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(r);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let v=parseFloat(this.$input.value);isNaN(v)||(this._stepExplicit&&(v=this._snap(v)),this.setValue(this._clamp(v)))},n=v=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+v),this.$input.value=this.getValue())},i=v=>{v.key==="Enter"&&this.$input.blur(),v.code==="ArrowUp"&&(v.preventDefault(),n(this._step*this._arrowKeyMultiplier(v))),v.code==="ArrowDown"&&(v.preventDefault(),n(this._step*this._arrowKeyMultiplier(v)*-1))},r=v=>{this._inputFocused&&(v.preventDefault(),n(this._step*this._normalizeMouseWheel(v)))};let o=!1,a,l,c,h,u;const d=5,f=v=>{a=v.clientX,l=c=v.clientY,o=!0,h=this.getValue(),u=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",_)},g=v=>{if(o){const x=v.clientX-a,S=v.clientY-l;Math.abs(S)>d?(v.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>d&&_()}if(!o){const x=v.clientY-c;u-=x*this._step*this._arrowKeyMultiplier(v),h+u>this._max?u=this._max-h:h+u<this._min&&(u=this._min-h),this._snapClampSetValue(h+u)}c=v.clientY},_=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",_)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(p,v,x,S,D)=>(p-v)/(x-v)*(D-S)+S,t=p=>{const v=this.$slider.getBoundingClientRect();let x=e(p,v.left,v.right,this._min,this._max);this._snapClampSetValue(x)},n=p=>{this._setDraggingStyle(!0),t(p.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",r)},i=p=>{t(p.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",r)};let o=!1,a,l;const c=p=>{p.preventDefault(),this._setDraggingStyle(!0),t(p.touches[0].clientX),o=!1},h=p=>{p.touches.length>1||(this._hasScrollBar?(a=p.touches[0].clientX,l=p.touches[0].clientY,o=!0):c(p),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=p=>{if(o){const v=p.touches[0].clientX-a,x=p.touches[0].clientY-l;Math.abs(v)>Math.abs(x)?c(p):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else p.preventDefault(),t(p.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},f=this._callOnFinishChange.bind(this),g=400;let _;const m=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const x=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(f,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Dy extends Vn{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class Ny extends Vn{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Uy=`.lil-gui {
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
}`;function Fy(s){const e=document.createElement("style");e.innerHTML=s;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Zu=!1;class sh{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:r="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",c=>{(c.code==="Enter"||c.code==="Space")&&(c.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Zu&&a&&(Fy(Uy),Zu=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=o}add(e,t,n,i,r){if(Object(n)===n)return new Dy(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new Ly(this,e,t,n,i,r);case"boolean":return new Ay(this,e,t);case"string":return new Ny(this,e,t);case"function":return new Rl(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new Iy(this,e,t,n)}addFolder(e){const t=new sh({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Rl||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Rl)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const Mf=["New Moon","Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon","Waning Gibbous","Last Quarter","Waning Crescent"];function Oy(s){switch(s){case"New Moon":return 0;case"Waxing Crescent":return .125;case"First Quarter":return .25;case"Waxing Gibbous":return .375;case"Full Moon":return .5;case"Waning Gibbous":return .625;case"Last Quarter":return .75;case"Waning Crescent":return .875;default:return .5}}const Sf=["Custom","Equator (superstorm demo)","Monterey Bay, CA (kelp forest)","Maldives Atoll (tropical clear)","Drake Passage (Southern Ocean)","Prince William Sound, Alaska (cold fjords)"];function lo(s){switch(s){case"Low":return"Fastest. Lower ocean mesh density, fewer particles/waves. Best for weak phones.";case"Medium":return"Balanced. Decent mesh density + particles. Good default on most devices.";case"High":return"Prettier. Higher mesh density + more wave components + nicer sky updates.";case"Max":return"Max visuals. Highest mesh density, more particles, and experimental screen-space ray-traced reflections (heavy).";default:return""}}const rh="ocean-sim-settings",wf=1;function kt(s,e,t){return Math.min(t,Math.max(e,s))}function By(){try{const s=typeof window<"u"&&!!window.matchMedia&&window.matchMedia("(pointer: coarse)").matches,e=typeof navigator<"u"?navigator.userAgent:"",t=/Android|iPhone|iPad|iPod/i.test(e);return s||t}catch{return!1}}function zy(){try{const s=navigator==null?void 0:navigator.deviceMemory;return typeof s=="number"&&Number.isFinite(s)?s:null}catch{return null}}function ky(){try{return typeof window<"u"&&!!window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Vy(){const s=By(),e=zy();return s?e!==null&&e<=2?"Low":"Medium":e!==null?e<=2?"Low":e<=4?"Medium":e<=6?"High":"Max":"High"}function bf(){const s=Vy(),e=ky();return{gameStarted:!1,locationPreset:"Equator (superstorm demo)",latitude_deg:1.2,longitude_deg:-28,coastProximity:0,depth_m:4800,dayOfYear:205,timeOfDay_h:20.25,moonPhaseName:"Full Moon",moonDistanceMultiplier:1,precipChance_pct:100,stormsIn2to4hChance_pct:100,verticalWindShear_mps:1.5,hurricaneChanceAdjust_pct:20,otterosity_pct:55,exoticEncounters_pct:8,otterFurSilhouette:s==="High"||s==="Max",cameraDistance_m:9,cameraElevation_m:1.05,clarity_pct:55,quality:s,qualityInfo:lo(s),perfOverlay:!0,reduceFlashes:e,audioEnabled:!0,masterVolume:.55,derived_state:"—",derived_clock:"—",derived_airTemp_C:0,derived_waterTemp_C:0,derived_cloudCover:0,derived_visibility_km:0,derived_windSpeed_mps:0,derived_windDirFrom_deg:0,derived_precip:"—",derived_Hs_m:0,derived_Tp_s:0,derived_tideScale:1,derived_stormETA:"—",derived_stormChanceEff_pct:0,derived_hurricaneChanceEff_pct:0}}const Hy=["Low","Medium","High","Max"];function Gy(s){return typeof s=="string"&&Hy.includes(s)}function Wy(s){return typeof s=="string"&&Sf.includes(s)}function Xy(s){return typeof s=="string"&&Mf.includes(s)}function qy(s){if(typeof window>"u")return;let e=null;try{const n=window.localStorage.getItem(rh);if(!n)return;const i=JSON.parse(n);if(!i||i.v!==wf)return;e=i}catch{return}const t=e.data??{};Wy(t.locationPreset)&&(s.locationPreset=t.locationPreset),typeof t.latitude_deg=="number"&&Number.isFinite(t.latitude_deg)&&(s.latitude_deg=kt(t.latitude_deg,-80,80)),typeof t.longitude_deg=="number"&&Number.isFinite(t.longitude_deg)&&(s.longitude_deg=kt(t.longitude_deg,-180,180)),typeof t.coastProximity=="number"&&Number.isFinite(t.coastProximity)&&(s.coastProximity=kt(t.coastProximity,0,1)),typeof t.depth_m=="number"&&Number.isFinite(t.depth_m)&&(s.depth_m=kt(t.depth_m,5,6e3)),typeof t.dayOfYear=="number"&&Number.isFinite(t.dayOfYear)&&(s.dayOfYear=kt(t.dayOfYear,1,365)),typeof t.timeOfDay_h=="number"&&Number.isFinite(t.timeOfDay_h)&&(s.timeOfDay_h=kt(t.timeOfDay_h,0,24)),Xy(t.moonPhaseName)&&(s.moonPhaseName=t.moonPhaseName),typeof t.moonDistanceMultiplier=="number"&&Number.isFinite(t.moonDistanceMultiplier)&&(s.moonDistanceMultiplier=kt(t.moonDistanceMultiplier,.85,1.15)),typeof t.precipChance_pct=="number"&&Number.isFinite(t.precipChance_pct)&&(s.precipChance_pct=kt(t.precipChance_pct,0,100)),typeof t.stormsIn2to4hChance_pct=="number"&&Number.isFinite(t.stormsIn2to4hChance_pct)&&(s.stormsIn2to4hChance_pct=kt(t.stormsIn2to4hChance_pct,0,100)),typeof t.verticalWindShear_mps=="number"&&Number.isFinite(t.verticalWindShear_mps)&&(s.verticalWindShear_mps=kt(t.verticalWindShear_mps,0,30)),typeof t.hurricaneChanceAdjust_pct=="number"&&Number.isFinite(t.hurricaneChanceAdjust_pct)&&(s.hurricaneChanceAdjust_pct=kt(t.hurricaneChanceAdjust_pct,-20,20)),typeof t.otterosity_pct=="number"&&Number.isFinite(t.otterosity_pct)&&(s.otterosity_pct=kt(t.otterosity_pct,0,100)),typeof t.exoticEncounters_pct=="number"&&Number.isFinite(t.exoticEncounters_pct)&&(s.exoticEncounters_pct=kt(t.exoticEncounters_pct,0,100)),typeof t.otterFurSilhouette=="boolean"&&(s.otterFurSilhouette=t.otterFurSilhouette),typeof t.cameraDistance_m=="number"&&Number.isFinite(t.cameraDistance_m)&&(s.cameraDistance_m=kt(t.cameraDistance_m,9,18)),typeof t.cameraElevation_m=="number"&&Number.isFinite(t.cameraElevation_m)&&(s.cameraElevation_m=kt(t.cameraElevation_m,.35,3)),typeof t.clarity_pct=="number"&&Number.isFinite(t.clarity_pct)&&(s.clarity_pct=kt(t.clarity_pct,0,100)),Gy(t.quality)&&(s.quality=t.quality),typeof t.perfOverlay=="boolean"&&(s.perfOverlay=t.perfOverlay),typeof t.reduceFlashes=="boolean"&&(s.reduceFlashes=t.reduceFlashes),typeof t.audioEnabled=="boolean"&&(s.audioEnabled=t.audioEnabled),typeof t.masterVolume=="number"&&Number.isFinite(t.masterVolume)&&(s.masterVolume=kt(t.masterVolume,0,1)),s.qualityInfo=lo(s.quality)}function oa(s){if(typeof window>"u")return;const e={locationPreset:s.locationPreset,latitude_deg:s.latitude_deg,longitude_deg:s.longitude_deg,coastProximity:s.coastProximity,depth_m:s.depth_m,dayOfYear:s.dayOfYear,timeOfDay_h:s.timeOfDay_h,moonPhaseName:s.moonPhaseName,moonDistanceMultiplier:s.moonDistanceMultiplier,precipChance_pct:s.precipChance_pct,stormsIn2to4hChance_pct:s.stormsIn2to4hChance_pct,verticalWindShear_mps:s.verticalWindShear_mps,hurricaneChanceAdjust_pct:s.hurricaneChanceAdjust_pct,otterosity_pct:s.otterosity_pct,exoticEncounters_pct:s.exoticEncounters_pct,otterFurSilhouette:s.otterFurSilhouette,cameraDistance_m:s.cameraDistance_m,cameraElevation_m:s.cameraElevation_m,clarity_pct:s.clarity_pct,quality:s.quality,perfOverlay:s.perfOverlay,reduceFlashes:s.reduceFlashes,audioEnabled:s.audioEnabled,masterVolume:s.masterVolume},t={v:wf,data:e};try{window.localStorage.setItem(rh,JSON.stringify(t))}catch{}}function Yy(){if(!(typeof window>"u"))try{window.localStorage.removeItem(rh)}catch{}}function $y(s,e){const t=new sh({title:"Ocean (Otter) Simulator"});t.domElement.style.userSelect="none";const n={startGame:()=>{s.gameStarted||(s.gameStarted=!0,e.onStartGame(),e.onAnyChange())},newGame:()=>{s.gameStarted=!1,e.onNewGame(),e.onAnyChange()},resetSettings:()=>{var B;(B=e.onResetSettings)==null||B.call(e)}},i=t.addFolder("Game");i.add(n,"startGame").name("Start / Resume"),i.add(n,"newGame").name("Reset"),i.open();const r=t.addFolder("Location"),o={Custom:{latitude_deg:s.latitude_deg,longitude_deg:s.longitude_deg,coastProximity:s.coastProximity,depth_m:s.depth_m},"Equator (superstorm demo)":{latitude_deg:1.2,longitude_deg:-28,coastProximity:0,depth_m:4800},"Monterey Bay, CA (kelp forest)":{latitude_deg:36.62,longitude_deg:-121.9,coastProximity:.9,depth_m:120},"Maldives Atoll (tropical clear)":{latitude_deg:3.2,longitude_deg:73.22,coastProximity:.7,depth_m:55},"Drake Passage (Southern Ocean)":{latitude_deg:-56.3,longitude_deg:-67.7,coastProximity:.05,depth_m:4200},"Prince William Sound, Alaska (cold fjords)":{latitude_deg:60.75,longitude_deg:-147.6,coastProximity:.95,depth_m:240}},a=r.add(s,"locationPreset",Sf).name("preset"),l=r.add(s,"latitude_deg",-80,80,.1).name("latitude (°)"),c=r.add(s,"longitude_deg",-180,180,.1).name("longitude (°)"),h=r.add(s,"coastProximity",0,1,.01).name("coast proximity (0–1)"),u=r.add(s,"depth_m",5,6e3,1).name("depth (m)");function d(B){if(B==="Custom")return;const z=o[B];z&&(s.latitude_deg=z.latitude_deg,s.longitude_deg=z.longitude_deg,s.coastProximity=z.coastProximity,s.depth_m=z.depth_m,l.updateDisplay(),c.updateDisplay(),h.updateDisplay(),u.updateDisplay())}a.onChange(()=>{d(s.locationPreset),e.onAnyChange()});const f=()=>{s.locationPreset!=="Custom"&&(s.locationPreset="Custom",a.updateDisplay()),e.onAnyChange()};l.onChange(f),c.onChange(f),h.onChange(f),u.onChange(f);const g=t.addFolder("Time"),_=g.add(s,"timeOfDay_h",0,24,.01).name("time (h)"),m=g.add(s,"dayOfYear",1,365,1).name("day of year (1–365)");_.onChange(e.onAnyChange),m.onChange(e.onAnyChange);const p=t.addFolder("Moon");p.add(s,"moonPhaseName",Mf).name("phase").onChange(e.onAnyChange),p.add(s,"moonDistanceMultiplier",.85,1.15,5e-4).name("distance").onChange(e.onAnyChange);const v=t.addFolder("Weather");v.add(s,"precipChance_pct",0,100,1).name("precip chance (%)").onChange(e.onAnyChange),v.add(s,"stormsIn2to4hChance_pct",0,100,1).name("chance of storms in 2–4hrs (%)").onChange(e.onAnyChange),v.add(s,"verticalWindShear_mps",0,30,.1).name("vertical wind shear (m/s)").onChange(e.onAnyChange),v.add(s,"hurricaneChanceAdjust_pct",-20,20,1).name("hurricane chance adjust (±%)").onChange(e.onAnyChange);const x=t.addFolder("Sea Otter");x.add(s,"otterosity_pct",0,100,1).name("Otterosity").onChange(e.onAnyChange),x.add(s,"exoticEncounters_pct",0,100,1).name("exotic encounters (%)").onChange(e.onAnyChange),x.add(s,"otterFurSilhouette").name("fur silhouette (Hi/Max)").onChange(e.onAnyChange);const S=t.addFolder("Camera");S.add(s,"cameraDistance_m",9,18,.01).name("distance (m)").onChange(()=>{var B;(B=e.onCameraChange)==null||B.call(e)}),S.add(s,"cameraElevation_m",.35,3,.01).name("elevation (m)").onChange(()=>{var B;(B=e.onCameraChange)==null||B.call(e)}),t.addFolder("Water").add(s,"clarity_pct",0,100,1).name("clarity (%)").onChange(e.onAnyChange);const E=t.addFolder("Performance Mode"),T=E.add(s,"quality",["Low","Medium","High","Max"]).name("mode");T.listen(),T.onChange(()=>{s.qualityInfo=lo(s.quality),e.onAnyChange()}),E.add(s,"qualityInfo").name("what this does").listen(),E.add(s,"perfOverlay").name("perf overlay").onChange(e.onAnyChange),t.addFolder("Accessibility").add(s,"reduceFlashes").name("reduce flashes/grain").onChange(e.onAnyChange);const b=t.addFolder("Audio");b.add(s,"audioEnabled").name("enabled").onChange(e.onAnyChange),b.add(s,"masterVolume",0,1,.01).name("volume").onChange(e.onAnyChange);const y=t.addFolder("Readouts");return y.add(s,"derived_state").name("state").listen(),y.add(s,"derived_clock").name("clock").listen(),y.add(s,"derived_airTemp_C").name("air °C").listen(),y.add(s,"derived_waterTemp_C").name("water °C").listen(),y.add(s,"derived_cloudCover").name("cloud").listen(),y.add(s,"derived_visibility_km").name("vis km").listen(),y.add(s,"derived_windSpeed_mps").name("wind m/s").listen(),y.add(s,"derived_windDirFrom_deg").name("wind from°").listen(),y.add(s,"derived_precip").name("precip").listen(),y.add(s,"derived_stormETA").name("storm ETA").listen(),y.add(s,"derived_stormChanceEff_pct").name("storm % (eff)").listen(),y.add(s,"derived_hurricaneChanceEff_pct").name("hurricane % (eff)").listen(),y.add(s,"derived_Hs_m").name("Hs (m)").listen(),y.add(s,"derived_Tp_s").name("Tp (s)").listen(),y.add(s,"derived_tideScale").name("tide scale").listen(),r.open(),g.open(),v.open(),y.open(),t.addFolder("Settings").add(n,"resetSettings").name("reset saved settings"),t}function Ls(s){let e=s%360;return e<0&&(e+=360),e}function Ju(s,e,t){const n=(e-s+540)%360-180;return Ls(s+n*t)}function oh(s,e){const t=C(s,1,365),n=2*Math.PI*(t-172)/365,i=e>=0?1:-1;return Math.sin(n)*i}function jy(s,e){const t=C(s,-80,80),n=Math.abs(t),i=F(28,-1,Dt(0,80,n)),r=F(1.5,7,Dt(15,60,n)),o=oh(e,t);return C(i+r*o,-1.8,30)}function Ky(s,e,t,n,i){const r=C(e,-80,80),o=Math.abs(r),a=F(2,14,Dt(10,65,o)),l=oh(t,r),c=(n%24+24)%24,h=Math.sin((c-14)/24*2*Math.PI),u=F(.5,3.5,Dt(0,1,1-i));return s+a*l+u*h}function Pl(s){const e=C(s,-80,80),t=Math.abs(e);return t<30?e>=0?45:135:t<60?270:90}function Zy(s,e){const t=Dt(16,27,s),n=C(e,0,1);return C(.12+.88*t*n,0,1)}function Jy(s,e,t,n,i){const r=Dt(25.5,29,s),o=Dt(35,10,Math.abs(e)),a=C(t,0,1),c=1-C(n/20,0,1),h=C(.55+(i-.5)*.8,0,1),u=C(r*o*a*Math.pow(c,1.2)*h,0,1),d=C(u*100,0,95),f=C(.18+.82*r*Math.pow(c,1.35),0,1);return{chanceBase_pct:d,severity01:f}}class Qy{constructor(){P(this,"time_s",0);P(this,"rng",Gn(99122));P(this,"cloudCover",.25);P(this,"precip",0);P(this,"storm",0);P(this,"hurricane",0);P(this,"windSpeed",6);P(this,"windDirFrom",250);P(this,"gustiness",.25);P(this,"steadyAge_s",0);P(this,"scheduledStormEta_s",-1);P(this,"stormActive_s",0);P(this,"stormDuration_s",0);P(this,"stormStrength",0);P(this,"stormDirFrom",250)}reset(e){if(this.time_s=0,this.cloudCover=.25,this.precip=0,this.storm=0,this.hurricane=0,this.windSpeed=6,this.gustiness=.25,this.steadyAge_s=0,this.scheduledStormEta_s=-1,this.stormActive_s=0,this.stormDuration_s=0,this.stormStrength=0,e){const n=Math.floor((e.latitude_deg*1e3+e.longitude_deg*1e3+e.dayOfYear*17+e.timeOfDay_h*13)%2147483647);this.rng=Gn(n),this.windDirFrom=Pl(e.latitude_deg),this.stormDirFrom=this.windDirFrom}const t=8+this.rng()*14;if(this.steadyAge_s=t*3600,e!=null&&e.force){const n=e.force;n.cloudCover01!==void 0&&(this.cloudCover=C(n.cloudCover01,0,1)),n.precip01!==void 0&&(this.precip=C(n.precip01,0,1)),n.storm01!==void 0&&(this.storm=C(n.storm01,0,1)),n.hurricane01!==void 0&&(this.hurricane=C(n.hurricane01,0,1)),n.windSpeed_mps!==void 0&&(this.windSpeed=C(n.windSpeed_mps,0,75)),n.windDirFrom_deg!==void 0&&(this.windDirFrom=Ls(n.windDirFrom_deg)),n.gustiness01!==void 0&&(this.gustiness=C(n.gustiness01,0,1)),n.steadyAge_h!==void 0&&(this.steadyAge_s=C(n.steadyAge_h,0,96)*3600),(n.stormActiveElapsed_s??0)>0&&(this.scheduledStormEta_s=-1,this.stormStrength=C(n.stormStrength01??Math.max(0,this.storm),0,1),this.stormDirFrom=Ls(n.stormDirFrom_deg??this.windDirFrom),this.stormDuration_s=Math.max(1,n.stormDuration_s??2*3600),this.stormActive_s=Math.max(.001,n.stormActiveElapsed_s??.001))}}update(e,t){this.time_s+=e;const n=C(t.latitude_deg,-80,80),i=C(t.longitude_deg,-180,180),r=C(t.coastProximity,0,1),o=jy(n,t.dayOfYear),a=Math.abs(n),l=Dt(12,55,a)*(1-Dt(62,80,a)*.55),c=oh(t.dayOfYear,n),h=C(.2+.55*l+.2*Math.abs(c)+.1*r,.12,.95),u=this.time_s/3600,d=n*.73+i*.19+t.dayOfYear*.013,f=Tl(u*.2+d*.1,d,4),g=Tl(u*.06+d*.2,d+11.7,4),_=Tl(u*.015+d*.7,d+33.1,5),m=C(t.precipChance_pct/100,0,1),p=C(t.stormsIn2to4hChance_pct/100,0,1),v=Dt(8,26,o),x=C(.28+.5*v+.28*m+.12*r+(g-.5)*.18,0,1),S=.22+.65*x+.22*l+(g-.5)*(.75*h),D=C(Dt(.35,1.05,S),0,1),E=D+(m-.5)*.85+(f-.5)*.3+x*.25,T=C(Dt(.92,1.18,E),0,1),N=Zy(o,x),b=C(p*N*F(.65,1,h),0,.999);if(this.scheduledStormEta_s<0&&this.stormActive_s<=0){const oe=b<=0?0:-Math.log(1-b)/10800;if(this.rng()<oe*e){this.scheduledStormEta_s=F(2*3600,4*3600,this.rng()),this.stormStrength=C(.25+.75*N+(this.rng()-.5)*.2,.15,1),this.stormDuration_s=F(45*60,3*3600,.35+.65*this.stormStrength);const V=Pl(n);this.stormDirFrom=Ls(V+(this.rng()*2-1)*F(25,85,this.stormStrength))}}let y=0;this.scheduledStormEta_s>=0&&(this.scheduledStormEta_s-=e,y=C(Dt(2*3600,0,this.scheduledStormEta_s),0,1),this.scheduledStormEta_s<=0&&(this.stormActive_s=.001,this.scheduledStormEta_s=-1));let I=0;if(this.stormActive_s>0){this.stormActive_s+=e;const U=this.stormActive_s,oe=Math.max(.001,this.stormDuration_s),V=Dt(0,10*60,U),H=1-Dt(oe*.55,oe,U);I=C(V*H,0,1),U>=oe&&(this.stormActive_s=0,this.stormDuration_s=0,this.stormStrength=0)}const B=C(Math.max(y*this.stormStrength*.85,I*this.stormStrength),0,1),z=C(t.verticalWindShear_mps,0,30),{chanceBase_pct:j,severity01:Z}=Jy(o,n,x,z,_),K=C(j+C(t.hurricaneChanceAdjust_pct,-20,20),0,100),W=K/100*C(.55+(_-.5)*.9,0,1),he=C(Dt(.35,.75,W),0,1),me=F(30,10,h),ve=F(38,12,h),ze=F(55,16,h),be=F(120,30,h),$=1-Math.exp(-e/Math.max(.001,me)),ee=1-Math.exp(-e/Math.max(.001,ve)),de=1-Math.exp(-e/Math.max(.001,ze)),ue=1-Math.exp(-e/Math.max(.001,be)),De=B*.55+he*.65;this.cloudCover=F(this.cloudCover,C(D+De,0,1),$);const we=B*.65+he*.75;this.precip=F(this.precip,C(T+we,0,1),ee),this.storm=F(this.storm,B,de),this.hurricane=F(this.hurricane,he,ue);const Pe=Pl(n),Je=(g-.5)*40*(.2+.8*h),L=this.storm*35,nt=this.hurricane*55,je=Ls(Pe+Je+(L+nt)*(n>=0?1:-1)),Xe=C(y*.75+I*1,0,1),Me=Ju(je,this.stormDirFrom,Xe),Ne=3+Dt(0,1,Math.sin(Zi(Math.min(90,a))))*3.5+r*.7,Be=7*this.cloudCover+10*this.precip+14*this.storm,R=this.hurricane>.01?F(18,70,Math.pow(Z*this.hurricane,.7)):0,M=C(Ne+Be+R,0,75),X=C(.15+.25*this.precip+.35*this.storm+.55*this.hurricane,0,1),se=F(20,7,h),re=1-Math.exp(-e/Math.max(.001,se));this.windSpeed=F(this.windSpeed,M,re),this.windDirFrom=Ju(this.windDirFrom,Me,re),this.gustiness=F(this.gustiness,X,re);const te=Math.abs((Me-this.windDirFrom+540)%360-180);this.windSpeed>1.5&&te<25?this.steadyAge_s=Math.min(this.steadyAge_s+e,48*3600):this.steadyAge_s=Math.max(0,this.steadyAge_s-e*2.5);const Ee=Ky(o,n,t.dayOfYear,t.timeOfDay_h,this.cloudCover),le=this.precip<.08?"None":Ee<=0?"Snow":"Rain",ge=C(F(65,10,this.cloudCover*.7)*F(1,.25,this.precip)*F(1,.55,this.storm),1,80),ke=this.storm>.55?.03*Math.pow(this.storm,2.2):0,ae=C(Math.max(this.storm,this.hurricane),0,1),pe=F(180,1200,Dt(0,1,ae)),qe=C(F(1,.35,r)*F(.65,1,1-ae*.25),.1,1),Te=this.steadyAge_s/3600,xe=F(.35,1.75,1-ae);let Ce=0;if(this.hurricane>.25){const U=this.windSpeed;U>=70?Ce=5:U>=58?Ce=4:U>=50?Ce=3:U>=43?Ce=2:U>=33?Ce=1:Ce=0}let Fe="Clear";Ce>0?Fe=`Hurricane (Cat ${Ce})`:this.storm>.55?Fe="Thunderstorm":this.precip>.15?Fe=le==="Snow"?"Snow":"Rain":this.cloudCover>.55&&(Fe="Cloudy");const pt=this.scheduledStormEta_s>=0?this.scheduledStormEta_s/3600:-1;return{airTemp_C:Ee,waterTemp_C:o,cloudCover:C(this.cloudCover,0,1),visibility_km:ge,precipType:le,precipIntensity:C(this.precip,0,1),storminess:C(this.storm,0,1),hurricaneIntensity:C(this.hurricane,0,1),windSpeed_mps:this.windSpeed,windDirFrom_deg:Ls(this.windDirFrom),gustiness:this.gustiness,stormRadius_km:pe,fetchUtilization:qe,stormAge_h:Te,windRamp_h:xe,lightningRate_hz:ke,hurricaneCategory:Ce,stateName:Fe,stormEta_h:pt,stormChanceEffective_pct:Math.round(b*100),hurricaneChanceEffective_pct:Math.round(K)}}}function Qu(s,e){if(e===Ep)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===fc||e===zd){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===fc)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class eM extends cr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new rM(t)}),this.register(function(t){return new oM(t)}),this.register(function(t){return new mM(t)}),this.register(function(t){return new gM(t)}),this.register(function(t){return new _M(t)}),this.register(function(t){return new lM(t)}),this.register(function(t){return new cM(t)}),this.register(function(t){return new hM(t)}),this.register(function(t){return new uM(t)}),this.register(function(t){return new sM(t)}),this.register(function(t){return new dM(t)}),this.register(function(t){return new aM(t)}),this.register(function(t){return new pM(t)}),this.register(function(t){return new fM(t)}),this.register(function(t){return new nM(t)}),this.register(function(t){return new vM(t)}),this.register(function(t){return new xM(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Vr.extractUrlBase(e);o=Vr.resolveURL(c,this.path)}else o=Vr.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new gf(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Af){try{o[Ye.KHR_BINARY_GLTF]=new yM(e)}catch(u){i&&i(u);return}r=JSON.parse(o[Ye.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new DM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Ye.KHR_MATERIALS_UNLIT:o[u]=new iM;break;case Ye.KHR_DRACO_MESH_COMPRESSION:o[u]=new MM(r,this.dracoLoader);break;case Ye.KHR_TEXTURE_TRANSFORM:o[u]=new SM;break;case Ye.KHR_MESH_QUANTIZATION:o[u]=new wM;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function tM(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Ye={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class nM{constructor(e){this.parser=e,this.name=Ye.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new ie(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Rt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new oo(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new _f(h),c.distance=u;break;case"spot":c=new Wx(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,ni(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class iM{constructor(){this.name=Ye.KHR_MATERIALS_UNLIT}getMaterialType(){return vn}extendParams(e,t,n){const i=[];e.color=new ie(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Rt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Xt))}return Promise.all(i)}}class sM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class rM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new J(a,a)}return Promise.all(r)}}class oM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class aM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class lM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ie(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Rt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Xt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class cM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class hM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ie().setRGB(a[0],a[1],a[2],Rt),Promise.all(r)}}class uM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class dM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ie().setRGB(a[0],a[1],a[2],Rt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Xt)),Promise.all(r)}}class fM{constructor(e){this.parser=e,this.name=Ye.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class pM{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class mM{constructor(e){this.parser=e,this.name=Ye.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class gM{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class _M{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class vM{constructor(e){this.name=Ye.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class xM{constructor(e){this.name=Ye.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==fn.TRIANGLES&&c.mode!==fn.TRIANGLE_STRIP&&c.mode!==fn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Ie,m=new A,p=new ht,v=new A(1,1,1),x=new lf(g.geometry,g.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,S),l.SCALE&&v.fromBufferAttribute(l.SCALE,S),x.setMatrixAt(S,_.compose(m,p,v));for(const S in l)if(S==="_COLOR_0"){const D=l[S];x.instanceColor=new _c(D.array,D.itemSize,D.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,l[S]);gt.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Af="glTF",Mr=12,ed={JSON:1313821514,BIN:5130562};class yM{constructor(e){this.name=Ye.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Mr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Af)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Mr,r=new DataView(e,Mr);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===ed.JSON){const c=new Uint8Array(e,Mr+o,a);this.content=n.decode(c)}else if(l===ed.BIN){const c=Mr+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class MM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ye.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=yc[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=yc[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=qs[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},a,c,Rt,d)})})}}class SM{constructor(){this.name=Ye.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class wM{constructor(){this.name=Ye.KHR_MESH_QUANTIZATION}}class Ef extends ro{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,v=1-m,x=p-d+u;for(let S=0;S!==a;S++){const D=o[_+S+a],E=o[_+S+l]*h,T=o[g+S+a],N=o[g+S]*h;r[S]=v*D+x*E+m*T+p*N}return r}}const bM=new ht;class AM extends Ef{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return bM.fromArray(r).normalize().toArray(r),r}}const fn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},qs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},td={9728:Qe,9729:tt,9984:Rd,9985:Jo,9986:Er,9987:_n},nd={33071:gn,33648:ga,10497:Mn},Il={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},yc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},bi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},EM={CUBICSPLINE:void 0,LINEAR:jr,STEP:$r},Ll={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function TM(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new kn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:fi})),s.DefaultMaterial}function Wi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ni(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function CM(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function RM(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function PM(s){let e;const t=s.extensions&&s.extensions[Ye.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Dl(t.attributes):e=s.indices+":"+Dl(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Dl(s.targets[n]);return e}function Dl(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Mc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function IM(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const LM=new Ie;class DM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new tM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new Vx(this.options.manager):this.textureLoader=new Yx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new gf(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Wi(r,a,i),ni(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ye.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Vr.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Il[i.type],a=qs[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Ct(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Il[i.type],c=qs[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(v);x||(_=new c(a,p*f,i.count*f/h),x=new sf(_,f/h),t.cache.add(v,x)),m=new Qr(x,l,d%f/h,g)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),m=new Ct(_,l,g);if(i.sparse!==void 0){const p=Il.SCALAR,v=qs[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,D=new v(o[1],x,i.sparse.count*p),E=new c(o[2],S,i.sparse.count*l);a!==null&&(m=new Ct(m.array.slice(),m.itemSize,m.normalized));for(let T=0,N=D.length;T<N;T++){const b=D[T];if(m.setX(b,E[T*l]),l>=2&&m.setY(b,E[T*l+1]),l>=3&&m.setZ(b,E[T*l+2]),l>=4&&m.setW(b,E[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=td[d.magFilter]||tt,h.minFilter=td[d.minFilter]||_n,h.wrapS=nd[d.wrapS]||Mn,h.wrapT=nd[d.wrapT]||Mn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Ut(_);m.needsUpdate=!0,d(m)}),t.load(Vr.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),ni(u,o),u.userData.mimeType=o.mimeType||IM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Ye.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ye.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[Ye.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new ss,yn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Wc,yn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return kn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[Ye.KHR_MATERIALS_UNLIT]){const u=i[Ye.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new ie(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Rt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Xt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=mn);const h=r.alphaMode||Ll.OPAQUE;if(h===Ll.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Ll.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==vn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new J(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==vn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==vn){const u=r.emissiveFactor;a.emissive=new ie().setRGB(u[0],u[1],u[2],Rt)}return r.emissiveTexture!==void 0&&o!==vn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Xt)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),ni(u,r),t.associations.set(u,{materials:e}),r.extensions&&Wi(i,u,r),u})}createUniqueName(e){const t=ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[Ye.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return id(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=PM(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Ye.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=id(new St,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?TM(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=o[f];let p;const v=c[f];if(m.mode===fn.TRIANGLES||m.mode===fn.TRIANGLE_STRIP||m.mode===fn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new hx(_,v):new ft(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===fn.TRIANGLE_STRIP?p.geometry=Qu(p.geometry,zd):m.mode===fn.TRIANGLE_FAN&&(p.geometry=Qu(p.geometry,fc));else if(m.mode===fn.LINES)p=new fx(_,v);else if(m.mode===fn.LINE_STRIP)p=new Ua(_,v);else if(m.mode===fn.LINE_LOOP)p=new px(_,v);else if(m.mode===fn.POINTS)p=new rr(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&RM(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ni(p,r),m.extensions&&Wi(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Wi(i,u[0],r),u[0];const d=new xn;r.extensions&&Wi(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Yt(Qp.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new so(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ni(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Ie;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Gc(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let v=0,x=d.length;v<x;v++){const S=d[v],D=f[v],E=g[v],T=_[v],N=m[v];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const b=n._createAnimationTracks(S,D,E,T,N);if(b)for(let y=0;y<b.length;y++)p.push(b[y])}return new ii(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,LM)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new af:c.length>1?h=new xn:c.length===1?h=c[0]:h=new gt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),ni(h,r),r.extensions&&Wi(n,h,r),r.matrix!==void 0){const u=new Ie;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new xn;n.name&&(r.name=i.createUniqueName(n.name)),ni(r,n),n.extensions&&Wi(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof yn||d instanceof Ut)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];bi[r.path]===bi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(bi[r.path]){case bi.weights:c=Qs;break;case bi.rotation:c=cn;break;case bi.position:case bi.scale:c=ui;break;default:switch(n.itemSize){case 1:c=Qs;break;case 2:case 3:default:c=ui;break}break}const h=i.interpolation!==void 0?EM[i.interpolation]:jr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+bi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Mc(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof cn?AM:Ef;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function NM(s,e,t){const n=e.attributes,i=new pi;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new A(l[0],l[1],l[2]),new A(c[0],c[1],c[2])),a.normalized){const h=Mc(qs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new A,l=new A;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=Mc(qs[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Wn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function id(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=yc[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return et.workingColorSpace!==Rt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),ni(s,e),NM(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?CM(s,e.targets,t):s})}function Ds(s,e,t,n,i,r={height_m:0,normal:new A,disp:new A,slope:0},o=new A,a=new A){const l=r.disp;l.set(0,0,0);let c=0,h=0,u=0,d=0,f=0,g=0;for(let m=0;m<s.length;m++){const p=s[m],v=p.dirX,x=p.dirZ,S=p.A,D=p.k,E=p.omega,T=p.phase,N=p.Q,b=v*n.x+x*n.y,y=E+D*b,I=D*(v*e.x+x*e.y)-y*t+T,B=Math.sin(I),z=Math.cos(I);l.y+=S*B,l.x+=v*(N*S*z),l.z+=x*(N*S*z);const j=N*S*D;c+=-v*v*j*B,h+=-v*x*j*B,u+=-x*v*j*B,d+=-x*x*j*B,f+=S*D*v*z,g+=S*D*x*z}const _=l.y+i;return o.set(1+c,f,u),a.set(h,g,1+d),r.normal.crossVectors(a,o).normalize(),r.slope=1-r.normal.y,r.height_m=_,r}li.enabled=!0;const Nl=new Map;function sd(s,e){const t=Nl.get(e);if(t)return t;const n=new Promise((i,r)=>{s.load(e,i,void 0,r)});return n.catch(()=>{Nl.delete(e)}),Nl.set(e,n),n}class UM{constructor(){P(this,"group");P(this,"position",new A(0,0,0));P(this,"gazeDir",new A(0,.08,-1).normalize());P(this,"bodyForward",new A(1,0,0));P(this,"paddleImpulse01",0);P(this,"wetness01",0);P(this,"lookMode","Horizon");P(this,"rng",Gn(133742));P(this,"stormPhase",this.rng()*Math.PI*2);P(this,"stormPhase2",this.rng()*Math.PI*2);P(this,"lookTimer_s",0);P(this,"blinkTimer_s",2.8);P(this,"yaw",0);P(this,"gazeYawOffset",0);P(this,"gazeYawOffsetTarget",0);P(this,"submerge_m",0);P(this,"splashCooldown_s",0);P(this,"wetness",0);P(this,"appearanceMode","High");P(this,"furSilhouette",!0);P(this,"loader",new eM);P(this,"loadTicket",0);P(this,"preloadStarted",!1);P(this,"model",null);P(this,"furObj",null);P(this,"nodes",{});P(this,"mixer",null);P(this,"mixerRoot",null);P(this,"idleAction",null);P(this,"paddleAction",null);P(this,"diveAction",null);P(this,"resurfaceAction",null);P(this,"blinkAction",null);P(this,"whiskerTwitchAction",null);P(this,"wasUnderwater",!1);P(this,"paddlePeriod_s",1.6);P(this,"wetMats",[]);P(this,"buoySampleFwd_m",.42);P(this,"buoySampleSide_m",.28);P(this,"floatOffset_m",.05);P(this,"prevXZ",new J(0,0));P(this,"prevWaveDispXZ",new J(0,0));P(this,"waveDispInit",!1);P(this,"speed_mps",0);P(this,"tmpWaveSample",{height_m:0,normal:new A,disp:new A,slope:0});P(this,"tmpWaveT",new A);P(this,"tmpWaveB",new A);P(this,"tmpV2a",new J);P(this,"tmpV2b",new J);P(this,"tmpV2c",new J);P(this,"tmpV2d",new J);P(this,"tmpV3a",new A);P(this,"tmpV3b",new A);P(this,"tmpV3c",new A);P(this,"tmpQuatA",new ht);P(this,"tmpQuatB",new ht);P(this,"tmpQuatC",new ht);P(this,"up",new A(0,1,0));P(this,"tmpWetCol",new ie);P(this,"tmpDryCol",new ie);P(this,"fallbackEyeOffset",new A(0,.86,.1));P(this,"fallbackHeadOffset",new A(0,.95,.05));this.group=new xn,this.group.name="SeaOtter";const e=new kn({color:new ie("#4e3924"),roughness:.98,metalness:0,flatShading:!0}),t=new or(.34,8,8),n=new ft(t,e);n.name="__placeholder",n.position.set(0,.48,0),this.group.add(n),this.group.position.copy(this.position),this.prevXZ.set(0,0),this.loadModel(this.appearanceMode,this.furSilhouette),this.preloadAllModels()}setAppearance(e,t){const n=e==="High"&&t;if(e===this.appearanceMode){this.furSilhouette=n,this.furObj&&(this.furObj.visible=n);return}this.loadModel(e,n)}reset(){this.position.set(0,0,0),this.gazeDir.set(0,.08,-1).normalize(),this.bodyForward.set(1,0,0),this.lookMode="Horizon",this.lookTimer_s=0,this.blinkTimer_s=2.8+this.rng()*3.2,this.yaw=0,this.gazeYawOffset=0,this.gazeYawOffsetTarget=0,this.submerge_m=0,this.splashCooldown_s=0,this.wetness=0,this.wetness01=0,this.paddleImpulse01=0,this.prevXZ.set(0,0),this.prevWaveDispXZ.set(0,0),this.waveDispInit=!1,this.speed_mps=0,this.group.position.copy(this.position),this.group.quaternion.identity(),this.idleAction&&this.idleAction.reset().play(),this.paddleAction&&this.paddleAction.reset().play()}getEyeWorldPosition(e=new A){return this.nodes.eyeL?this.nodes.eyeL.getWorldPosition(e):e.copy(this.fallbackEyeOffset).applyMatrix4(this.group.matrixWorld)}getHeadWorldPosition(e=new A){return this.nodes.head?this.nodes.head.getWorldPosition(e):e.copy(this.fallbackHeadOffset).applyMatrix4(this.group.matrixWorld)}isUnderwaterView(){return this.submerge_m>.28}update(e,t){const n=t.dt_s,i=C(e.storminess,0,1),r=C(e.waveChaos,0,1),o=C(e.otterosity,0,1),a=C((i-.35)/.45,0,1);this.lookTimer_s-=n,this.blinkTimer_s-=n,this.splashCooldown_s=Math.max(0,this.splashCooldown_s-n);const l=this.tmpV2a.set(t.currentXZ.x,t.currentXZ.y),c=(this.rng()*2-1)*.014*(.25+.75*r);this.yaw+=c*n*60;const h=this.tmpV2b.set(Math.cos(this.yaw),Math.sin(this.yaw)).multiplyScalar(.028);l.add(h),this.position.x+=l.x*n,this.position.z+=l.y*n;const u=C(.28+1.55*i+1.25*r,.22,3.1),d=this.tmpV2c.set(this.position.x,this.position.z);Ds(t.waves,d,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB);const f=this.tmpWaveSample.disp.x-this.prevWaveDispXZ.x,g=this.tmpWaveSample.disp.z-this.prevWaveDispXZ.y;if(this.waveDispInit?(this.position.x+=C(f,-1.8,1.8)*u,this.position.z+=C(g,-1.8,1.8)*u):this.waveDispInit=!0,this.prevWaveDispXZ.set(this.tmpWaveSample.disp.x,this.tmpWaveSample.disp.z),this.bodyForward.set(Math.cos(this.yaw),0,Math.sin(this.yaw)).normalize(),n>1e-6){const we=this.position.x-this.prevXZ.x,Pe=this.position.z-this.prevXZ.y;this.speed_mps=Math.sqrt(we*we+Pe*Pe)/n}else this.speed_mps=0;this.prevXZ.set(this.position.x,this.position.z);const _=this.bodyForward,m=this.tmpV3a.set(-_.z,0,_.x).normalize(),p=this.tmpV2a.set(this.position.x+_.x*this.buoySampleFwd_m,this.position.z+_.z*this.buoySampleFwd_m),v=this.tmpV2b.set(this.position.x-_.x*this.buoySampleFwd_m,this.position.z-_.z*this.buoySampleFwd_m),x=Ds(t.waves,p,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB).height_m,S=Ds(t.waves,v,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB).height_m,D=this.tmpV2c.set(this.position.x-m.x*this.buoySampleSide_m,this.position.z-m.z*this.buoySampleSide_m),E=this.tmpV2d.set(this.position.x+m.x*this.buoySampleSide_m,this.position.z+m.z*this.buoySampleSide_m),T=Ds(t.waves,D,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB).height_m,N=Ds(t.waves,E,t.time_s,t.currentXZ,t.tideHeight_m,this.tmpWaveSample,this.tmpWaveT,this.tmpWaveB).height_m,b=(x+S+T+N)*.25,y=(x-S)/Math.max(1e-4,2*this.buoySampleFwd_m),I=(N-T)/Math.max(1e-4,2*this.buoySampleSide_m),B=this.tmpV3b.copy(this.up).addScaledVector(_,-y).addScaledVector(m,-I).normalize(),z=Math.min(1.2,Math.sqrt(y*y+I*I)),j=C((z-.16)/.35,0,1)*(.15+.85*i);this.splashCooldown_s<=0&&this.rng()<j*n&&(this.submerge_m=Math.max(this.submerge_m,F(.18,1.05,i)),this.splashCooldown_s=F(4.5,.9,i)),this.submerge_m=F(this.submerge_m,0,C(n*F(.45,1.6,1-i),0,1));const Z=F(this.floatOffset_m,-.14,i),K=b+Z-this.submerge_m,Q=F(6,15,i)*F(1,1.3,r);this.position.y=F(this.position.y,K,C(n*Q,0,1));const W=i*(.1+.12*r);if(W>.001){const we=Math.sin(t.time_s*(1.6+1.1*r)+this.stormPhase)*W,Pe=Math.cos(t.time_s*(2.1+1.4*r)+this.stormPhase2)*W*.8;B.addScaledVector(_,we).addScaledVector(m,Pe).normalize()}const he=this.tmpQuatA.setFromUnitVectors(this.up,B),me=this.tmpQuatB.setFromAxisAngle(this.up,this.yaw),ve=this.tmpQuatC.copy(me).multiply(he),ze=F(3,10,i)*F(1,1.2,r);if(this.group.quaternion.slerp(ve,C(n*ze,0,1)),this.group.position.copy(this.position),this.lookTimer_s<=0){const we=o,Pe=C(.08+.85*Math.pow(we,1.18),0,1),Je=1-i,L=Pe*F(.02,.1,Je)*(1-i*.6),je=F(.1,.26,we)*F(.55,.25,i)*(1-a),Xe=this.rng();Xe<L?this.lookMode="Underwater":Xe<L+je?this.lookMode="Sky":this.lookMode="Horizon";const Me=F(2.4,6.5,1-i),lt=F(0,5,we)*(this.rng()*.6+.4);this.lookTimer_s=Me+lt;const Ne=F(.04,.42,we)*F(1,.45,a);this.gazeYawOffsetTarget=(this.rng()*2-1)*Ne}this.gazeYawOffset=F(this.gazeYawOffset,this.gazeYawOffsetTarget,C(n*1.2,0,1));const be=this.yaw+this.gazeYawOffset,$=Math.cos(be),ee=Math.sin(be),de=this.tmpV3c.set(0,0,0);if(this.lookMode==="Horizon")if(a>.001&&typeof e.windDirTo_rad=="number"){const we=e.windDirTo_rad+Math.PI,Pe=Math.cos(we),Je=Math.sin(we),L=F(0,.85,a);de.set(F($,Pe,L),F(.1,.03,L),F(ee,Je,L)).normalize()}else de.set($,.1,ee).normalize();else if(this.lookMode==="Sky"){const we=e.interestDir;we&&we.y>.08&&a<.15?de.copy(we).normalize():de.set($*.2,.98,ee*.2).normalize()}else de.set($*.45,-.62,ee*.45).normalize();this.gazeDir.lerp(de,C(n*2,0,1)).normalize(),this.updateAnimations(n,i,r),this.applyStormPose(t.time_s,i,r);const ue=C(this.submerge_m*1.25+this.paddleImpulse01*.28+i*.25,0,1),De=ue>this.wetness?2.5:.25;this.wetness=F(this.wetness,ue,C(n*De,0,1)),this.wetness01=this.wetness,this.applyWetnessToMaterials(this.wetness)}updateAnimations(e,t,n){var c,h,u;if(!this.mixer)return;const i=C(this.speed_mps/.18,0,1),r=C(.18+.95*(t*.65+n*.6),0,1),o=C(r*(.25+.75*i),0,1);this.paddleAction&&(this.paddleAction.setEffectiveWeight(o),this.paddleAction.setEffectiveTimeScale(F(.7,1.6,o)));const a=this.isUnderwaterView();a&&!this.wasUnderwater?(c=this.diveAction)==null||c.reset().play():!a&&this.wasUnderwater&&((h=this.resurfaceAction)==null||h.reset().play()),this.wasUnderwater=a,this.blinkTimer_s<=0&&((u=this.blinkAction)==null||u.reset().play(),this.whiskerTwitchAction&&this.rng()<.7&&this.whiskerTwitchAction.reset().play(),this.blinkTimer_s=2.8+this.rng()*4.5),this.mixer.update(e);let l=0;if(this.paddleAction){const d=this.paddleAction.time%this.paddlePeriod_s/this.paddlePeriod_s,f=Math.exp(-Math.pow((d-.18)/.07,2)),g=Math.exp(-Math.pow((d-.68)/.07,2));l=C((f+g)*.85*o,0,1)}this.paddleImpulse01=l}applyStormPose(e,t,n){const i=this.nodes.head,r=this.nodes.tail,o=this.nodes.flipperL,a=this.nodes.flipperR;if(!i&&!r&&!o&&!a)return;const l=C(t*(.35+.65*n),0,1);if(l<=.001)return;const c=Math.sin(e*(2.2+1.3*n)+this.stormPhase)*.12*l,h=Math.sin(e*(1.7+1.1*n)+this.stormPhase2)*.1*l,u=Math.sin(e*(3.1+1.6*n)+this.stormPhase2)*.18*l;i&&(i.rotation.x+=c,i.rotation.y+=h),r&&(r.rotation.y+=u*.6,r.rotation.z+=u*.45),o&&(o.rotation.z+=u*.8),a&&(a.rotation.z-=u*.8)}applyWetnessToMaterials(e){if(!this.wetMats.length)return;const t=C(Math.pow(e,1.18),0,1);for(const n of this.wetMats)this.tmpWetCol.copy(n.dryColor).multiplyScalar(.72),n.mat.color.copy(n.dryColor).lerp(this.tmpWetCol,t),n.mat.roughness=F(n.dryRoughness,.38,t),n.mat.clearcoat=F(n.dryClearcoat,.62,t),n.mat.clearcoatRoughness=F(n.dryClearcoatRoughness,.18,t)}urlForMode(e){return e==="Low"?"models/otter/otter_low.glb":e==="Medium"?"models/otter/otter_medium.glb":"models/otter/otter_high.glb"}preloadAllModels(){if(this.preloadStarted)return;this.preloadStarted=!0;const e=["Low","Medium","High"];for(const t of e){const n=this.urlForMode(t);sd(this.loader,n).catch(()=>{})}}loadModel(e,t){const n=this.urlForMode(e),i=++this.loadTicket;sd(this.loader,n).then(r=>{i===this.loadTicket&&this.useLoadedModel(r,e,t)}).catch(r=>{console.warn(`[otter] Failed to load ${n}`,r),this.appearanceMode=e,this.furSilhouette=t;try{const o="otter-load-error";let a=document.getElementById(o);a||(a=document.createElement("div"),a.id=o,a.style.position="fixed",a.style.left="10px",a.style.bottom="10px",a.style.zIndex="9999",a.style.maxWidth="min(560px, 90vw)",a.style.padding="10px 12px",a.style.borderRadius="10px",a.style.background="rgba(0,0,0,0.70)",a.style.color="#fff",a.style.font="12px/1.35 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",document.body.appendChild(a)),a.textContent=`Otter model failed to load: ${n}. If you're testing on phone, make sure you're using the dev server (localhost:5173), not opening index.html directly.`}catch{}})}useLoadedModel(e,t,n){this.model&&(this.group.remove(this.model),this.model=null),this.furObj=null;const i=this.group.getObjectByName("__placeholder");i&&(this.group.remove(i),FM(i));const r=e.scene;r.name="otterModel",r.rotation.y=-Math.PI/2;const o=t==="Low"?.48:t==="Medium"?.5:.52;r.scale.setScalar(o),this.model=r,this.group.add(r),this.furObj=r.getObjectByName("fur")||null,this.furObj&&(this.furObj.visible=n),this.applyMaterials(t),this.cacheRigNodes(),this.setupAnimations(),this.appearanceMode=t,this.furSilhouette=n}cacheRigNodes(){this.nodes={},this.model&&(this.nodes.body=this.model.getObjectByName("Body")||void 0,this.nodes.head=this.model.getObjectByName("Head")||void 0,this.nodes.tail=this.model.getObjectByName("Tail")||void 0,this.nodes.flipperL=this.model.getObjectByName("FlipperL")||void 0,this.nodes.flipperR=this.model.getObjectByName("FlipperR")||void 0,this.nodes.eyeL=this.model.getObjectByName("EyeL")||void 0,this.nodes.eyeR=this.model.getObjectByName("EyeR")||void 0,this.nodes.whiskers=this.model.getObjectByName("Whiskers")||void 0)}applyMaterials(e){if(!this.model)return;this.wetMats.length=0;const t=e==="Low",n=e==="Medium",i=e==="High",r=this.model.userData??(this.model.userData={}),o=r.otterMaterials;let a,l,c,h;if(o&&o.mode===e)a=o.furMat,l=o.furShellMat,c=o.eyeMat,h=o.whiskMat,a.color.copy(o.furDry.color),a.roughness=o.furDry.roughness,a.clearcoat=o.furDry.clearcoat,a.clearcoatRoughness=o.furDry.clearcoatRoughness,l.color.copy(o.furShellDry.color),l.roughness=o.furShellDry.roughness,l.clearcoat=o.furShellDry.clearcoat,l.clearcoatRoughness=o.furShellDry.clearcoatRoughness;else{const u=new ie(t?"#6a4a2b":i?"#62462b":"#5a4028"),d=new ie("#6f5232"),f=new ie("#0a0a0a"),g=new ie("#d9d1c5");a=new hn({color:u,roughness:t?.96:.92,metalness:0,clearcoat:.1,clearcoatRoughness:.4,sheen:i?1:.75,sheenRoughness:.86,sheenColor:new ie("#caa46a")}),a.flatShading=t,n?rd(a,new ie("#e7c89a"),.22,2.2):i&&rd(a,new ie("#e7c89a"),.12,2.6),l=new hn({color:d,roughness:.98,metalness:0,clearcoat:.05,clearcoatRoughness:.55,sheen:.9,sheenRoughness:.92,sheenColor:new ie("#caa46a")}),l.flatShading=t,c=new kn({color:f,roughness:.55,metalness:0}),c.flatShading=t,h=new kn({color:g,roughness:.8,metalness:0}),r.otterMaterials={mode:e,furMat:a,furShellMat:l,eyeMat:c,whiskMat:h,furDry:{color:a.color.clone(),roughness:a.roughness,clearcoat:a.clearcoat,clearcoatRoughness:a.clearcoatRoughness},furShellDry:{color:l.color.clone(),roughness:l.roughness,clearcoat:l.clearcoat,clearcoatRoughness:l.clearcoatRoughness}}}this.wetMats.push({mat:a,dryColor:a.color.clone(),dryRoughness:a.roughness,dryClearcoat:a.clearcoat,dryClearcoatRoughness:a.clearcoatRoughness}),i&&this.wetMats.push({mat:l,dryColor:l.color.clone(),dryRoughness:l.roughness,dryClearcoat:l.clearcoat,dryClearcoatRoughness:l.clearcoatRoughness}),this.model.traverse(u=>{const d=u;if(!d.isMesh)return;const f=d.material,g=Array.isArray(f)?f[0]:f,_=(g==null?void 0:g.name)??"";_==="Eye"?d.material=c:_==="Whisker"?d.material=h:_==="FurShell"?d.material=l:d.material=a}),this.applyWetnessToMaterials(this.wetness)}setupAnimations(){if(!this.model)return;if(this.mixer)try{this.mixer.stopAllAction(),this.mixerRoot&&this.mixer.uncacheRoot(this.mixerRoot)}catch{}this.mixer=new oy(this.model),this.mixerRoot=this.model,this.idleAction=null,this.paddleAction=null,this.diveAction=null,this.resurfaceAction=null,this.blinkAction=null,this.whiskerTwitchAction=null;const e=this.nodes.body,t=this.nodes.head,n=this.nodes.tail,i=this.nodes.flipperL,r=this.nodes.flipperR,o=this.nodes.eyeL,a=this.nodes.eyeR,l=this.nodes.whiskers,c=[];{const h=[],d=[0,1.5,3,4.5,6];if(e){const f=[1,1,1],g=[1.02,.985,1.02],_=[.99,1.01,.99];h.push(new ui(`${e.name}.scale`,d,[...f,...g,..._,...g,...f]))}if(t){const f=new ht().setFromEuler(new Mt(.02,0,0,"YXZ")),g=new ht().setFromEuler(new Mt(.03,.08,0,"YXZ")),_=new ht().setFromEuler(new Mt(.01,-.06,0,"YXZ"));h.push(new cn(`${t.name}.quaternion`,d,[f.x,f.y,f.z,f.w,g.x,g.y,g.z,g.w,_.x,_.y,_.z,_.w,g.x,g.y,g.z,g.w,f.x,f.y,f.z,f.w]))}if(n){const f=new ht().setFromEuler(new Mt(0,0,.06)),g=new ht().setFromEuler(new Mt(0,0,-.06));h.push(new cn(`${n.name}.quaternion`,[0,3,6],[f.x,f.y,f.z,f.w,g.x,g.y,g.z,g.w,f.x,f.y,f.z,f.w]))}h.length&&c.push(new ii("Idle",6,h))}{const h=[],u=this.paddlePeriod_s,d=[0,u*.25,u*.5,u*.75,u],f=.55,g=-.35;if(i){const _=new ht().setFromEuler(new Mt(0,0,f)),m=new ht().setFromEuler(new Mt(0,0,g));h.push(new cn(`${i.name}.quaternion`,d,[_.x,_.y,_.z,_.w,m.x,m.y,m.z,m.w,_.x,_.y,_.z,_.w,m.x,m.y,m.z,m.w,_.x,_.y,_.z,_.w]))}if(r){const _=new ht().setFromEuler(new Mt(0,0,-f)),m=new ht().setFromEuler(new Mt(0,0,-g));h.push(new cn(`${r.name}.quaternion`,d,[_.x,_.y,_.z,_.w,m.x,m.y,m.z,m.w,_.x,_.y,_.z,_.w,m.x,m.y,m.z,m.w,_.x,_.y,_.z,_.w]))}h.length&&c.push(new ii("Paddle",u,h))}if(t){const u=new ht().setFromEuler(new Mt(.02,0,0,"YXZ")),d=new ht().setFromEuler(new Mt(-.38,0,0,"YXZ"));c.push(new ii("Dive",1,[new cn(`${t.name}.quaternion`,[0,1],[u.x,u.y,u.z,u.w,d.x,d.y,d.z,d.w])])),c.push(new ii("Resurface",1,[new cn(`${t.name}.quaternion`,[0,1],[d.x,d.y,d.z,d.w,u.x,u.y,u.z,u.w])]))}if(o&&a){const u=o.scale,d=Math.max(.001,u.y*.08),f=[0,.06,.12,.18],g=[u.x,u.y,u.z],_=[u.x,d,u.z];c.push(new ii("Blink",.18,[new ui(`${o.name}.scale`,f,[...g,..._,...g,...g]),new ui(`${a.name}.scale`,f,[...g,..._,...g,...g])]))}if(l){const u=new ht().setFromEuler(new Mt(0,0,.02)),d=new ht().setFromEuler(new Mt(0,0,-.04));c.push(new ii("WhiskerTwitch",.55,[new cn(`${l.name}.quaternion`,[0,.55*.5,.55],[u.x,u.y,u.z,u.w,d.x,d.y,d.z,d.w,u.x,u.y,u.z,u.w])]))}for(const h of c){const u=this.mixer.clipAction(h);h.name==="Idle"?(u.setLoop(dc,1/0),u.play(),this.idleAction=u):h.name==="Paddle"?(u.setLoop(dc,1/0),u.enabled=!0,u.play(),u.setEffectiveWeight(0),this.paddleAction=u):h.name==="Dive"?(u.setLoop(Tr,1),u.clampWhenFinished=!0,u.enabled=!0,this.diveAction=u):h.name==="Resurface"?(u.setLoop(Tr,1),u.clampWhenFinished=!0,u.enabled=!0,this.resurfaceAction=u):h.name==="Blink"?(u.setLoop(Tr,1),u.clampWhenFinished=!0,u.enabled=!0,this.blinkAction=u):h.name==="WhiskerTwitch"&&(u.setLoop(Tr,1),u.clampWhenFinished=!0,u.enabled=!0,this.whiskerTwitchAction=u)}this.blinkTimer_s=2.5+this.rng()*3.5,this.wasUnderwater=!1}}function FM(s){s.traverse(e=>{const t=e;t.geometry&&typeof t.geometry.dispose=="function"&&t.geometry.dispose();const n=t.material;if(Array.isArray(n))for(const i of n)i&&typeof i.dispose=="function"&&i.dispose();else n&&typeof n.dispose=="function"&&n.dispose()})}function rd(s,e,t,n){s.onBeforeCompile=i=>{i.uniforms.u_rimColor={value:e},i.uniforms.u_rimStrength={value:t},i.uniforms.u_rimPower={value:n},i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
       uniform vec3 u_rimColor;
       uniform float u_rimStrength;
       uniform float u_rimPower;`),i.fragmentShader=i.fragmentShader.replace("#include <opaque_fragment>",`float _rim = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), u_rimPower);
       outgoingLight += u_rimColor * (u_rimStrength * _rim);
       #include <opaque_fragment>`)},s.customProgramCacheKey=()=>`otter_fur_rim_${t.toFixed(3)}_${n.toFixed(3)}`}class OM{constructor(){P(this,"tmpPos",new A);P(this,"tmpLook",new A);P(this,"tmpFwd",new A);P(this,"tmpGaze",new A);P(this,"up",new A(0,1,0));P(this,"camPos",new A(0,1.05,9));P(this,"lookAtPos",new A(0,1.2,0));P(this,"waterY_m",0);P(this,"initialized",!1)}update(e,t){const n=t.dt_s,i=this.tmpGaze.copy(t.gazeDir);i.lengthSq()>1e-10?i.normalize():i.set(0,.12,-1),i.y=C(i.y,-.25,.95),i.normalize();const r=C(t.storminess,0,1),o=C(t.followDistance_m??9,9,18),a=C(t.followElevation_m??1.05,.35,3),l=o,c=a,h=this.tmpFwd.copy(t.bodyForward);h.y=0,h.lengthSq()<1e-6&&(h.copy(i),h.y=0),h.normalize();const u=this.tmpPos.copy(t.headPos).addScaledVector(h,-l).addScaledVector(this.up,c);if(!this.initialized)this.waterY_m=t.surfaceHeight_m;else{const m=F(.35,.55,r),p=1-Math.exp(-n/Math.max(.001,m));this.waterY_m=F(this.waterY_m,t.surfaceHeight_m,p)}u.y=Math.max(u.y,this.waterY_m+.26);const d=F(.22,.38,r),f=1-Math.exp(-n/Math.max(.001,d));this.initialized?this.camPos.lerp(u,f):this.camPos.copy(u),e.position.copy(this.camPos),e.fov=F(e.fov,52,C(n*2,0,1)),e.updateProjectionMatrix();const _=this.tmpLook.copy(t.eyePos).addScaledVector(i,60);if(_.y=Math.max(_.y,this.waterY_m-2.5),!this.initialized)this.lookAtPos.copy(_),this.initialized=!0;else{const m=F(.14,.24,r),p=1-Math.exp(-n/Math.max(.001,m));this.lookAtPos.lerp(_,p)}e.lookAt(this.lookAtPos)}}const BM={uniforms:{tDiffuse:{value:null},u_time:{value:0},u_grain:{value:.03},u_vignette:{value:.22},u_saturation:{value:1.08},u_contrast:{value:1.06},u_warmth:{value:0}},vertexShader:`
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
  `};function od(s){return Math.max(0,Math.min(1,s))}function ad(s,e){let t=s-e;return t-=Math.round(t),t}function zM(s){const e=Math.max(32,Math.floor(s.size)),t=Math.max(2,Math.floor(s.cells)),n=Gn(s.seed),i=new Float32Array(t*t),r=new Float32Array(t*t);for(let l=0;l<t;l++)for(let c=0;c<t;c++){const h=l*t+c;i[h]=n(),r[h]=n()}const o=new Uint8Array(e*e*4);for(let l=0;l<e;l++){const c=l/e;for(let h=0;h<e;h++){const u=h/e,d=Math.floor(u*t),f=Math.floor(c*t);let g=1e9,_=1e9;for(let S=-1;S<=1;S++)for(let D=-1;D<=1;D++){let E=d+D,T=f+S;E=(E%t+t)%t,T=(T%t+t)%t;const N=T*t+E,b=(E+i[N])/t,y=(T+r[N])/t,I=ad(u,b),B=ad(c,y),z=Math.sqrt(I*I+B*B);z<g?(_=g,g=z):z<_&&(_=z)}const m=Math.max(0,_-g);let p=Math.exp(-m*42);p=Math.pow(p,1.55),p=od(p),p=od((p-.18)*1.28+.18);const v=Math.max(0,Math.min(255,Math.round(p*255))),x=(l*e+h)*4;o[x+0]=v,o[x+1]=v,o[x+2]=v,o[x+3]=255}}const a=new is(o,e,e);return a.name="CausticsTexture",a.flipY=!1,a.colorSpace=Rn,a.wrapS=Mn,a.wrapT=Mn,a.generateMipmaps=!0,a.minFilter=_n,a.magFilter=tt,a.needsUpdate=!0,a}const kM=zM({size:256,seed:771233,cells:10}),VM={uniforms:{tDiffuse:{value:null},tDepth:{value:null},u_time:{value:0},u_underwater:{value:0},u_hasDepth:{value:1},u_cameraNear:{value:.1},u_cameraFar:{value:1e3},u_invProj:{value:new Ie},u_invView:{value:new Ie},u_sunUv:{value:new J(.5,.5)},u_sunInView:{value:1},u_sunIntensity:{value:1},u_sunColor:{value:new ie("#ffffff")},u_clarity:{value:.7},u_waterLevel:{value:0},u_resolution:{value:new J(1,1)},u_caustics:{value:kM}},vertexShader:`
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
  `};class HM extends nh{constructor(){super(VM)}render(e,t,n,i,r){const o=(n==null?void 0:n.depthTexture)??null;this.uniforms.tDepth.value=o,this.uniforms.u_hasDepth.value=o?1:0,super.render(e,t,n,i,r)}}class GM{constructor(){P(this,"group",new xn);P(this,"tmpFwd",new A);P(this,"tmpLeft",new A);P(this,"islands",[]);P(this,"layout",[]);const e=new kn({color:new ie("#14131b"),roughness:1,metalness:0,emissive:new ie("#050509"),emissiveIntensity:.2}),t=this.makeIsland(e,420,22);this.islands.push(t),this.layout.push({dist:5200,side:-2600,scale:new A(1.2,1,.8),y:-6});const n=this.makeIsland(e,680,26);this.islands.push(n),this.layout.push({dist:6100,side:0,scale:new A(2.6,.75,.8),y:-9});const i=this.makeIsland(e,760,28);this.islands.push(i),this.layout.push({dist:5600,side:2700,scale:new A(3,.85,.9),y:-8});for(const r of this.islands)r.castShadow=!1,r.receiveShadow=!1,this.group.add(r);this.group.frustumCulled=!1}update(e,t,n){const i=this.tmpFwd.copy(t);i.y=0,i.lengthSq()<1e-6&&i.set(0,0,-1),i.normalize(),this.tmpLeft.set(0,1,0).cross(i).normalize();for(let r=0;r<this.islands.length;r++){const o=this.islands[r],a=this.layout[r];o.position.set(e.x+i.x*a.dist+this.tmpLeft.x*a.side,n+a.y,e.z+i.z*a.dist+this.tmpLeft.z*a.side),o.scale.copy(a.scale)}}makeIsland(e,t,n){const i=new Fa(t*.95,t,70,n,2,!1),r=i.getAttribute("position"),o=new A;for(let l=0;l<r.count;l++){if(o.set(r.getX(l),r.getY(l),r.getZ(l)),o.y>10?1:0){const h=Math.sin(o.x*.004+o.z*.006)+Math.cos(o.z*.005-o.x*.003),u=Math.sin((o.x+o.z)*.002)*.7+.3;o.y+=(h*8+u*10)*.6,o.x+=Math.sin(o.z*.008)*6,o.z+=Math.cos(o.x*.008)*6}r.setXYZ(l,o.x,o.y,o.z)}return r.needsUpdate=!0,i.computeVertexNormals(),new ft(i,e)}}function Tf(s,e){const t=Math.abs(s);return e>=23&&t<38?"Tropical":t>60||e<4?"Polar":"Temperate"}class WM{constructor(e){P(this,"group",new xn);P(this,"rng",Gn(920155));P(this,"params");P(this,"fishColTropical",new ie("#6cc6ff"));P(this,"fishColTemperate",new ie("#a7b2c9"));P(this,"fishColPolar",new ie("#c9d6ff"));P(this,"fish");P(this,"fishCount");P(this,"fishPos");P(this,"fishVel");P(this,"tmpObj",new gt);P(this,"glow");P(this,"glowCount",260);P(this,"glowPos");P(this,"dolphin");P(this,"dolphinTimer_s",999);P(this,"dolphinActive_s",0);this.params=e,this.fishCount=240;const t=new Zc(.06,.22,8,1);t.rotateX(Math.PI*.5);const n=new kn({color:e.biome==="Tropical"?new ie("#6cc6ff"):new ie("#a7b2c9"),roughness:.55,metalness:.05});this.fish=new lf(t,n,this.fishCount),this.fish.instanceMatrix.setUsage(Kr),this.group.add(this.fish),this.fishPos=[],this.fishVel=[];for(let c=0;c<this.fishCount;c++)this.fishPos.push(new A((this.rng()*2-1)*18,-2-this.rng()*8,(this.rng()*2-1)*18)),this.fishVel.push(new A((this.rng()*2-1)*.6,0,(this.rng()*2-1)*.6));this.glowPos=new Float32Array(this.glowCount*3);for(let c=0;c<this.glowCount;c++){const h=c*3;this.glowPos[h+0]=(this.rng()*2-1)*22,this.glowPos[h+1]=-.5-this.rng()*10,this.glowPos[h+2]=(this.rng()*2-1)*22}const i=new St,r=new Ct(this.glowPos,3);r.setUsage(Kr),i.setAttribute("position",r);const o=new ss({color:new ie("#74f7ff"),size:.08,transparent:!0,opacity:0,depthWrite:!1,blending:Hn});this.glow=new rr(i,o),this.group.add(this.glow);const a=new jc(.2,1.2,8,12),l=new kn({color:new ie("#6f7c8c"),roughness:.35,metalness:.05});this.dolphin=new ft(a,l),this.dolphin.visible=!1,this.group.add(this.dolphin)}reset(){const e=F(2,7.5,C(this.params.coastProximity,0,1));for(let t=0;t<this.fishCount;t++)this.fishPos[t].set((this.rng()*2-1)*18,-e-this.rng()*8,(this.rng()*2-1)*18),this.fishVel[t].set((this.rng()*2-1)*.6,0,(this.rng()*2-1)*.6);for(let t=0;t<this.glowCount;t++){const n=t*3;this.glowPos[n+0]=(this.rng()*2-1)*22,this.glowPos[n+1]=-.5-this.rng()*10,this.glowPos[n+2]=(this.rng()*2-1)*22}this.glow.geometry.getAttribute("position").needsUpdate=!0,this.dolphin.visible=!1,this.dolphinTimer_s=999,this.dolphinActive_s=0}setParams(e){this.params=e;const t=this.fish.material;e.biome==="Tropical"?t.color.copy(this.fishColTropical):e.biome==="Polar"?t.color.copy(this.fishColPolar):t.color.copy(this.fishColTemperate)}update(e){const{dt_s:t,time_s:n}=e,i=e.otterPos,r=.55+.55*Math.sin(n*.22),o=F(2,7.5,C(this.params.coastProximity,0,1)),a=F(22,14,C(this.params.coastProximity,0,1)),l=this.tmpObj;for(let d=0;d<this.fishCount;d++){const f=this.fishPos[d],g=this.fishVel[d];g.x+=Math.sin(n*.7+d)*.15*t,g.z+=Math.cos(n*.6+d*.7)*.15*t,g.x+=-f.x/a*.18*t,g.z+=-f.z/a*.18*t;const _=Math.hypot(g.x,g.z),m=F(.9,1.6,r);_>m&&(g.x=g.x/_*m,g.z=g.z/_*m),f.x+=g.x*t,f.z+=g.z*t,f.y=-o-.6*Math.sin(n*.9+d*.25)-this.rng()*.08,f.x<-a&&(f.x=a),f.x>a&&(f.x=-a),f.z<-a&&(f.z=a),f.z>a&&(f.z=-a);const p=i.x+f.x,v=e.surfaceY+f.y,x=i.z+f.z;l.position.set(p,v,x),l.lookAt(p+g.x,v,x+g.z),l.updateMatrix(),this.fish.setMatrixAt(d,l.matrix)}this.fish.instanceMatrix.needsUpdate=!0;const c=this.glow.material;c.opacity=F(c.opacity,C(e.nightFactor*.85,0,.85),C(t*.8,0,1));const h=this.glow.geometry.getAttribute("position");for(let d=0;d<this.glowCount;d++){const f=d*3,g=this.glowPos[f+0],_=this.glowPos[f+1],m=this.glowPos[f+2];h.setXYZ(d,i.x+g,e.surfaceY+_,i.z+m)}h.needsUpdate=!0;const u=C(this.params.exoticEncounters,0,1);if(this.dolphinTimer_s-=t,this.dolphinTimer_s<=0&&u>.02){const d=u*F(7e-4,15e-5,e.storminess);if(this.rng()<d*t*60){this.dolphinActive_s=F(1.6,2.8,this.rng()),this.dolphinTimer_s=F(15,45,1-u)+this.rng()*10;const f=this.rng()*Math.PI*2,g=F(8,22,this.rng());this.dolphin.position.set(i.x+Math.cos(f)*g,e.surfaceY-.4,i.z+Math.sin(f)*g),this.dolphin.rotation.set(0,f+Math.PI,0),this.dolphin.visible=!0}}if(this.dolphinActive_s>0){this.dolphinActive_s-=t;const d=1-this.dolphinActive_s/2.4,f=Math.sin(Math.PI*C(d,0,1));this.dolphin.position.y=e.surfaceY+f*1.25,this.dolphin.rotation.x=-Math.PI*.15+f*Math.PI*.35,this.dolphinActive_s<=0&&(this.dolphin.visible=!1)}}}class Cf{constructor(e){P(this,"group",new xn);P(this,"rng",Gn(188122));P(this,"rainCol",new ie("#b8dcff"));P(this,"snowCol",new ie("#ffffff"));P(this,"count",800);P(this,"positions");P(this,"velocities");P(this,"geo");P(this,"points");this.count=e==="Max"?1800:e==="High"?1200:e==="Medium"?800:450,this.positions=new Float32Array(this.count*3),this.velocities=new Float32Array(this.count*3);for(let i=0;i<this.count;i++){const r=i*3;this.positions[r+0]=(this.rng()*2-1)*18,this.positions[r+1]=this.rng()*14+2,this.positions[r+2]=(this.rng()*2-1)*18,this.velocities[r+0]=0,this.velocities[r+1]=-12,this.velocities[r+2]=0}this.geo=new St;const t=new Ct(this.positions,3);t.setUsage(Kr),this.geo.setAttribute("position",t);const n=new ss({color:new ie("#b8dcff"),size:2.2,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Hn});this.points=new rr(this.geo,n),this.points.frustumCulled=!1,this.group.add(this.points)}setQuality(e){}dispose(){this.geo.dispose(),this.points.material.dispose()}update(e){const t=this.points.material;if(!e.visible||e.intensity<=.01||e.mode==="None"){t.opacity=F(t.opacity,0,C(e.dt_s*2.2,0,1));return}const n=C(e.intensity,0,1);t.opacity=F(t.opacity,0+n*(e.mode==="Rain"?.85:.65),C(e.dt_s*1.8,0,1)),t.size=e.mode==="Rain"?F(1.8,3,n):F(2.4,4.6,n),t.color.copy(e.mode==="Rain"?this.rainCol:this.snowCol);const i=e.windDirFrom_deg*Math.PI/180,r=Math.cos(i+Math.PI)*(2+n*7),o=Math.sin(i+Math.PI)*(2+n*7),a=e.mode==="Rain"?F(10,32,n):F(1.8,6.5,n),l=this.geo.getAttribute("position");for(let c=0;c<this.count;c++){const h=c*3;this.positions[h+0]+=(this.velocities[h+0]+r)*e.dt_s,this.positions[h+1]+=-a*e.dt_s,this.positions[h+2]+=(this.velocities[h+2]+o)*e.dt_s,this.positions[h+1]<-2&&(this.positions[h+0]=(this.rng()*2-1)*18,this.positions[h+1]=12+this.rng()*6,this.positions[h+2]=(this.rng()*2-1)*18),this.positions[h+0]<-20&&(this.positions[h+0]=20),this.positions[h+0]>20&&(this.positions[h+0]=-20),this.positions[h+2]<-20&&(this.positions[h+2]=20),this.positions[h+2]>20&&(this.positions[h+2]=-20),l.setXYZ(c,e.cameraPos.x+this.positions[h+0],e.cameraPos.y+this.positions[h+1],e.cameraPos.z+this.positions[h+2])}l.needsUpdate=!0}}class ah{constructor(e={}){P(this,"mesh");P(this,"uniforms");P(this,"layerOffset");P(this,"densityScale");P(this,"opacityScale");P(this,"coverScale");P(this,"stormScale");P(this,"rainScale");P(this,"windScale");P(this,"stepsScale");P(this,"opacity",0);P(this,"windOffset",new J(0,0));P(this,"windDirXZ",new J(1,0));const t=e.radius??9e3;this.layerOffset=e.layerOffset??0,this.densityScale=e.densityScale??1,this.opacityScale=e.opacityScale??1,this.coverScale=e.coverScale??1,this.stormScale=e.stormScale??1,this.rainScale=e.rainScale??1,this.windScale=e.windScale??1,this.stepsScale=e.stepsScale??1;const n=new or(t,64,32);this.uniforms={u_time:{value:0},u_windOffset:{value:this.windOffset},u_windDirXZ:{value:this.windDirXZ},u_cover:{value:.25},u_storm:{value:0},u_rain:{value:0},u_sunDir:{value:new A(0,1,0)},u_sunColor:{value:new ie("#ffffff")},u_sunIntensity:{value:1},u_night:{value:0},u_lightning:{value:0},u_lightningDir:{value:new A(0,1,0)},u_opacity:{value:0},u_layerOffset:{value:this.layerOffset},u_densityScale:{value:this.densityScale},u_steps:{value:8}};const i=new Lt({uniforms:this.uniforms,transparent:!0,depthWrite:!1,depthTest:!1,side:Vt,vertexShader:`
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
      `});this.mesh=new ft(n,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}update(e){this.mesh.position.copy(e.center);const t=C(e.cloudCover*this.coverScale,0,1),n=C(Math.max(e.storminess,e.hurricaneIntensity)*this.stormScale,0,1),i=C(e.precipIntensity*this.rainScale,0,1),r=C((t-.08)/.92,0,1)*.92*this.opacityScale;this.opacity=F(this.opacity,r,C(e.dt_s*.8,0,1));const o=e.windDirFrom_deg*Math.PI/180+Math.PI;this.windDirXZ.set(Math.cos(o),Math.sin(o));const a=(1e-5+e.windSpeed_mps*22e-7*this.windScale)*(.25+.75*t);this.windOffset.x+=this.windDirXZ.x*a*e.dt_s,this.windOffset.y+=this.windDirXZ.y*a*e.dt_s*.35;const l=e.quality==="Low"?4:e.quality==="Medium"?6:e.quality==="High"?8:10,c=C(l*this.stepsScale,3,10);this.uniforms.u_time.value=e.time_s,this.uniforms.u_cover.value=t,this.uniforms.u_storm.value=n,this.uniforms.u_rain.value=i,this.uniforms.u_sunDir.value.copy(e.sunDir),this.uniforms.u_sunColor.value.copy(e.sunColor),this.uniforms.u_sunIntensity.value=C(e.sunIntensity,0,1),this.uniforms.u_night.value=C(e.nightFactor,0,1),this.uniforms.u_lightning.value=C(e.lightningFlash01,0,1),this.uniforms.u_lightningDir.value.copy(e.lightningDir).normalize(),this.uniforms.u_opacity.value=this.opacity,this.uniforms.u_steps.value=c}}class XM{constructor(){P(this,"mesh");P(this,"opacity",0);P(this,"tex");P(this,"tmpAntiSun",new A);const e=qM();this.tex=e;const t=new vn({map:e,transparent:!0,opacity:0,depthWrite:!1,blending:Hn}),n=new Jc(35,40,96,1,0,Math.PI);this.mesh=new ft(n,t),this.mesh.frustumCulled=!1,this.mesh.position.set(0,20,0)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.tex.dispose()}update(e){const t=this.mesh.material,n=e.sunElevation_rad,i=C(1-Math.abs(n-.18)/.25,0,1),o=e.precipIntensity>.12&&n>.02&&e.cloudCover<.85?i*(1-e.cloudCover)*C(e.precipIntensity,0,1):0;this.opacity=F(this.opacity,o,C(e.dt_s*1,0,1)),t.opacity=this.opacity*.55;const a=this.tmpAntiSun.copy(e.sunDir).multiplyScalar(-1);a.y=.08,a.normalize(),this.mesh.position.copy(e.center).addScaledVector(a,220),this.mesh.position.y=e.center.y+22,this.mesh.lookAt(e.center),this.mesh.rotateX(Math.PI*.5)}}function qM(){const s=document.createElement("canvas");s.width=512,s.height=16;const e=s.getContext("2d"),t=e.createLinearGradient(0,0,s.width,0);t.addColorStop(0,"rgba(255,0,0,0.0)"),t.addColorStop(.08,"rgba(255,0,0,0.9)"),t.addColorStop(.22,"rgba(255,165,0,0.9)"),t.addColorStop(.36,"rgba(255,255,0,0.9)"),t.addColorStop(.5,"rgba(0,255,0,0.9)"),t.addColorStop(.64,"rgba(0,127,255,0.9)"),t.addColorStop(.78,"rgba(75,0,130,0.9)"),t.addColorStop(.92,"rgba(148,0,211,0.9)"),t.addColorStop(1,"rgba(148,0,211,0.0)"),e.fillStyle=t,e.fillRect(0,0,s.width,s.height);const n=new Xc(s);return n.wrapS=gn,n.wrapT=gn,n.minFilter=tt,n.magFilter=tt,n}class YM{constructor(){P(this,"points");P(this,"rng",Gn(340001));P(this,"max",220);P(this,"pos");P(this,"vel");P(this,"life");P(this,"geo");P(this,"idx",0);this.pos=new Float32Array(this.max*3),this.vel=new Float32Array(this.max*3),this.life=new Float32Array(this.max),this.geo=new St;const e=new Ct(this.pos,3);e.setUsage(Kr),this.geo.setAttribute("position",e);const t=new ss({color:new ie("#ffffff"),size:.08,transparent:!0,opacity:0,depthWrite:!1,blending:Hn});this.points=new rr(this.geo,t),this.points.frustumCulled=!1}dispose(){this.geo.dispose(),this.points.material.dispose()}update(e){const t=e.dt_s,n=this.points.material,i=C((e.slope-.22)/.35,0,1),r=C(e.sprayBias01??0,0,1),o=i*i*Sr(10,75,e.intensity)*(.7+.6*r),a=Math.cos(e.windDirTo_rad),l=Math.sin(e.windDirTo_rad),c=Math.max(e.surfaceY+.05,e.origin.y+.12),h=Sr(e.surfaceY+.05,c,r),u=Math.min(14,Math.floor(o*t));for(let g=0;g<u;g++)this.spawn(e.origin,h,e.surfaceY,a,l,e.intensity,r);let d=!1;for(let g=0;g<this.max;g++){if(this.life[g]<=0)continue;d=!0,this.life[g]-=t;const _=g*3;this.vel[_+1]-=9.81*t,this.pos[_+0]+=this.vel[_+0]*t,this.pos[_+1]+=this.vel[_+1]*t,this.pos[_+2]+=this.vel[_+2]*t,this.pos[_+1]<e.surfaceY-.1&&(this.life[g]=0)}this.geo.getAttribute("position").needsUpdate=!0;const f=d?C(.15+.55*e.intensity,0,.85):0;n.opacity+=(f-n.opacity)*C(t*3,0,1)}spawn(e,t,n,i,r,o,a){const l=this.idx++%this.max;this.life[l]=Sr(.6,1.4,this.rng())*(.6+.4*o);const c=l*3,h=(this.rng()*2-1)*.65,u=(this.rng()*2-1)*.65;this.pos[c+0]=e.x+h,this.pos[c+1]=t+(this.rng()*2-1)*.06*a,this.pos[c+2]=e.z+u;const d=Sr(1.8,6.5,this.rng())*(.5+.5*o),f=Sr(.2,2.4,this.rng())*o;this.vel[c+0]=i*f+(this.rng()*2-1)*.35,this.vel[c+1]=d,this.vel[c+2]=r*f+(this.rng()*2-1)*.35}}function Sr(s,e,t){return s+(e-s)*t}class $M{constructor(){P(this,"mesh");P(this,"intensity",0);const e=new mi(7,7,1,1);e.rotateX(-Math.PI/2);const t=new Lt({transparent:!0,depthWrite:!1,uniforms:{u_time:{value:0},u_intensity:{value:0},u_sun:{value:1},u_sunset:{value:0}},vertexShader:`
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
      `});this.mesh=new ft(e,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}update(e){const t=C(e.calmness,0,1);this.intensity=F(this.intensity,t,C(e.dt_s*1.2,0,1)),this.mesh.position.set(e.center.x,e.surfaceY+.02,e.center.z);const n=this.mesh.material;n.uniforms.u_time.value=e.time_s,n.uniforms.u_intensity.value=this.intensity*.9,n.uniforms.u_sun.value=C(e.sunIntensity,0,1),n.uniforms.u_sunset.value=C(e.sunset,0,1);const i=F(.95,1.18,t);this.mesh.scale.setScalar(i),this.mesh.visible=this.intensity>.02}}class jM{constructor(){P(this,"mesh");P(this,"intensity",0);P(this,"length_m",5);P(this,"width_m",1.8);const e=new mi(1,1,1,16);e.rotateX(-Math.PI/2);const t=new Lt({transparent:!0,depthWrite:!1,blending:zn,uniforms:{u_time:{value:0},u_intensity:{value:0}},vertexShader:`
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
      `});this.mesh=new ft(e,t),this.mesh.name="WakeRibbon",this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}update(e){const t=this.mesh.material;t.uniforms.u_time.value=e.time_s;const n=C(e.speed_mps/.3,0,1),i=C(e.paddleImpulse01,0,1),r=C((.35+.75*n+.55*i)*(.25+.75*e.calm01),0,1);this.intensity=F(this.intensity,r,C(e.dt_s*6,0,1)),t.uniforms.u_intensity.value=this.intensity;const o=F(3,9,n)+i*2,a=F(1.4,3.2,n)+i*.6;this.length_m=F(this.length_m,o,C(e.dt_s*3,0,1)),this.width_m=F(this.width_m,a,C(e.dt_s*3,0,1)),this.mesh.scale.set(this.width_m,1,this.length_m);const l=Math.atan2(e.forwardXZ.x,e.forwardXZ.y);this.mesh.rotation.y=l;const c=this.length_m*.38;this.mesh.position.set(e.centerXZ.x-e.forwardXZ.x*c,e.surfaceY_m+.02,e.centerXZ.y-e.forwardXZ.y*c),this.mesh.visible=this.intensity>.02}}class KM{constructor(){P(this,"ctx",null);P(this,"master",null);P(this,"windSrc",null);P(this,"waveSrc",null);P(this,"hissSrc",null);P(this,"rainSrc",null);P(this,"windGain",null);P(this,"waveGain",null);P(this,"hissGain",null);P(this,"rainGain",null);P(this,"currentWind",0);P(this,"currentWave",0);P(this,"currentHiss",0);P(this,"currentRain",0)}async enable(){if(this.ctx)return;const e=window.AudioContext||window.webkitAudioContext;if(this.ctx=new e,this.ctx.state==="suspended")try{await this.ctx.resume()}catch{}this.master=this.ctx.createGain(),this.master.gain.value=.55,this.master.connect(this.ctx.destination);const t=this.createNoiseBuffer(this.ctx,2),n=this.ctx.createBufferSource();n.buffer=t,n.loop=!0,this.windSrc=n;const i=this.ctx.createBiquadFilter();i.type="highpass",i.frequency.value=120;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.value=2200,this.windGain=this.ctx.createGain(),this.windGain.gain.value=0,n.connect(i),i.connect(r),r.connect(this.windGain),this.windGain.connect(this.master);const o=this.ctx.createBufferSource();o.buffer=t,o.loop=!0,this.waveSrc=o;const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.value=450,this.waveGain=this.ctx.createGain(),this.waveGain.gain.value=0,o.connect(a),a.connect(this.waveGain),this.waveGain.connect(this.master);const l=this.ctx.createBufferSource();l.buffer=t,l.loop=!0,this.hissSrc=l;const c=this.ctx.createBiquadFilter();c.type="highpass",c.frequency.value=2500,this.hissGain=this.ctx.createGain(),this.hissGain.gain.value=0,l.connect(c),c.connect(this.hissGain),this.hissGain.connect(this.master),n.start(),o.start(),l.start();const h=this.ctx.createBufferSource();h.buffer=t,h.loop=!0,this.rainSrc=h;const u=this.ctx.createBiquadFilter();u.type="bandpass",u.frequency.value=1700,u.Q.value=.7,this.rainGain=this.ctx.createGain(),this.rainGain.gain.value=0,h.connect(u),u.connect(this.rainGain),this.rainGain.connect(this.master),h.start()}async resume(){if(this.ctx&&this.ctx.state==="suspended")try{await this.ctx.resume()}catch{}}async suspend(){if(this.ctx&&this.ctx.state==="running")try{await this.ctx.suspend()}catch{}}async close(){var e,t,n,i,r,o,a,l,c,h,u,d,f;if(this.ctx){try{(e=this.windSrc)==null||e.stop()}catch{}try{(t=this.waveSrc)==null||t.stop()}catch{}try{(n=this.hissSrc)==null||n.stop()}catch{}try{(i=this.rainSrc)==null||i.stop()}catch{}try{(r=this.windSrc)==null||r.disconnect()}catch{}try{(o=this.waveSrc)==null||o.disconnect()}catch{}try{(a=this.hissSrc)==null||a.disconnect()}catch{}try{(l=this.rainSrc)==null||l.disconnect()}catch{}try{(c=this.windGain)==null||c.disconnect()}catch{}try{(h=this.waveGain)==null||h.disconnect()}catch{}try{(u=this.hissGain)==null||u.disconnect()}catch{}try{(d=this.rainGain)==null||d.disconnect()}catch{}try{(f=this.master)==null||f.disconnect()}catch{}this.windSrc=null,this.waveSrc=null,this.hissSrc=null,this.rainSrc=null,this.windGain=null,this.waveGain=null,this.hissGain=null,this.rainGain=null,this.master=null;try{await this.ctx.close()}catch{}this.ctx=null}}setMasterVolume(e){this.master&&(this.master.gain.value=C(e,0,1.2))}update(e,t){if(!this.ctx||!this.windGain||!this.waveGain||!this.hissGain||!this.rainGain)return;const n=C(t.U10,0,40),i=C(t.Hs,0,12),r=C(Math.pow(n/18,1.25),0,1),o=C(Math.pow(i/3,1.15),0,1),a=C(n/25*(i/5),0,1),l=C(t.rain,0,1),c=C(e*1.6,0,1);this.currentWind=F(this.currentWind,r*.45,c),this.currentWave=F(this.currentWave,o*.35,c),this.currentHiss=F(this.currentHiss,a*.25,c),this.currentRain=F(this.currentRain,l*.55,c),this.windGain.gain.value=this.currentWind,this.waveGain.gain.value=this.currentWave,this.hissGain.gain.value=this.currentHiss,this.rainGain.gain.value=this.currentRain}createNoiseBuffer(e,t){const n=Math.floor(t*e.sampleRate),i=e.createBuffer(1,n,e.sampleRate),r=i.getChannelData(0);for(let o=0;o<n;o++)r[o]=Math.random()*2-1;return i}}class ZM{constructor(e){P(this,"el");P(this,"visible",!1);P(this,"tapHandler",null);this.el=document.createElement("div"),this.el.textContent=e,Object.assign(this.el.style,{position:"fixed",left:"0",top:"0",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",background:"rgba(0,0,0,0.35)",color:"white",fontFamily:"system-ui, -apple-system, Segoe UI, Roboto, sans-serif",fontSize:"16px",letterSpacing:"0.3px",zIndex:"50",userSelect:"none",backdropFilter:"blur(2px)"}),this.el.style.opacity="0",this.el.style.pointerEvents="none",document.body.appendChild(this.el)}show(){this.visible||(this.visible=!0,this.el.style.pointerEvents="auto",this.el.style.opacity="1")}hide(){this.visible&&(this.visible=!1,this.el.style.pointerEvents="none",this.el.style.opacity="0")}onTap(e){this.tapHandler&&this.el.removeEventListener("pointerdown",this.tapHandler),this.tapHandler=t=>{t.preventDefault(),e()},this.el.addEventListener("pointerdown",this.tapHandler,{passive:!1})}dispose(){this.tapHandler&&(this.el.removeEventListener("pointerdown",this.tapHandler),this.tapHandler=null),this.el.remove()}}class JM{constructor(){P(this,"el");P(this,"enabled",!0);P(this,"acc_s",0);this.el=document.createElement("div"),Object.assign(this.el.style,{position:"fixed",left:"8px",bottom:"8px",padding:"8px 10px",borderRadius:"8px",background:"rgba(0,0,0,0.35)",color:"white",fontFamily:'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',fontSize:"12px",lineHeight:"1.25",zIndex:"40",whiteSpace:"pre",userSelect:"none",pointerEvents:"none",backdropFilter:"blur(2px)"}),this.el.textContent="",document.body.appendChild(this.el)}setEnabled(e){this.enabled=e,this.el.style.display=e?"block":"none"}dispose(){this.enabled=!1,this.el.remove()}update(e,t){if(!this.enabled||(this.acc_s+=e,this.acc_s<.12))return;this.acc_s=0;const n=`dt  ${t.dt_ms.toFixed(1)}ms
ema ${t.dtEma_ms.toFixed(1)}ms  (${t.fpsEma.toFixed(0)} fps)
avg ${t.dtAvg_ms.toFixed(1)}ms
mode ${t.quality}
refl ${t.reflectionRT_px}px  (${t.reflectionUpdatesPerSec.toFixed(1)}/s)
env  ${t.envInterval_s.toFixed(1)}s  Δθ ${t.envAngleDelta_deg.toFixed(2)}°`;this.el.textContent=n}}class QM{constructor(){P(this,"group",new xn);P(this,"rng",Gn(552901));P(this,"bolts",[]);P(this,"boltCount",8);P(this,"segments",12);P(this,"tmpDir",new A);P(this,"tmpStart",new A);P(this,"tmpEnd",new A);P(this,"tmpUp",new A);P(this,"tmpRight",new A);P(this,"tmpPerp",new A);P(this,"tmpPos",new A);this.group.name="LightningBolts";const e=this.segments+1;for(let t=0;t<this.boltCount;t++){const n=new St,i=new Float32Array(e*3);n.setAttribute("position",new Ct(i,3));const r=new Wc({color:new ie("#e6f4ff"),transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Hn}),o=new Ua(n,r);o.frustumCulled=!1,o.visible=!1,this.group.add(o);const a=new Kc(1,16),l=new vn({color:new ie("#e6f4ff"),transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Hn,side:mn}),c=new ft(a,l);c.rotation.x=-Math.PI/2,c.visible=!1,c.frustumCulled=!1,this.group.add(c),this.bolts.push({line:o,impact:c,life_s:0,age_s:0,active:!1})}}dispose(){var e;for(const t of this.bolts)t.line.geometry.dispose(),t.line.material.dispose(),(e=t.impact)==null||e.geometry.dispose(),t.impact&&t.impact.material.dispose()}spawn(e){const t=this.allocBolt();if(!t)return;const n=C(e.storminess,0,1),i=e.type??(this.rng()<F(.45,.7,n)?"ground":"cloud"),o=Math.atan2(e.flashDir.z,e.flashDir.x)+(this.rng()*2-1)*F(.35,.85,n),a=Math.cos(o),l=Math.sin(o);if(i==="ground"){const h=F(320,1200,this.rng()),u=F(520,180,n)+F(-60,80,this.rng());this.tmpStart.copy(e.cameraPos).addScaledVector(this.tmpDir.set(a,0,l),h),this.tmpStart.y=e.waterLevel+u,this.tmpEnd.copy(this.tmpStart),this.tmpEnd.y=e.waterLevel-.25}else{const h=F(260,880,this.rng()),u=h+F(180,620,this.rng()),d=F(240,560,this.rng())*F(1,.8,n),f=d+F(-120,140,this.rng()),g=o+(this.rng()*2-1)*F(.6,1.2,n),_=Math.cos(g),m=Math.sin(g);this.tmpStart.copy(e.cameraPos).addScaledVector(this.tmpDir.set(a,0,l),h),this.tmpStart.y=e.waterLevel+d,this.tmpEnd.copy(e.cameraPos).addScaledVector(this.tmpDir.set(_,0,m),u),this.tmpEnd.y=e.waterLevel+f}this.writeBoltGeometry(t.line.geometry,this.tmpStart,this.tmpEnd,i),t.line.visible=!0;const c=t.line.material;if(c.opacity=1,t.impact)if(i==="ground"){t.impact.visible=!0,t.impact.position.set(this.tmpEnd.x,e.waterLevel+.02,this.tmpEnd.z);const h=F(12,32,this.rng())*F(.7,1.1,n);t.impact.scale.setScalar(h),t.impact.material.opacity=.85}else t.impact.visible=!1;t.life_s=F(.16,.28,this.rng())*(i==="ground"?1.2:.9),t.age_s=0,t.active=!0}update(e){const t=e.dt_s;for(const n of this.bolts){if(!n.active)continue;n.age_s+=t;const i=n.age_s/Math.max(1e-6,n.life_s);if(i>=1){n.active=!1,n.line.visible=!1,n.impact&&(n.impact.visible=!1);continue}const r=C(1-i,0,1),o=n.line.material;if(o.opacity=r,n.impact){const a=n.impact.material;a.opacity=r*.8}}}allocBolt(){for(const n of this.bolts)if(!n.active)return n;let e=null,t=-1;for(const n of this.bolts)n.age_s>t&&(t=n.age_s,e=n);return e}writeBoltGeometry(e,t,n,i){const r=e.getAttribute("position");this.tmpDir.subVectors(n,t);const o=Math.max(.001,this.tmpDir.length());this.tmpDir.multiplyScalar(1/o),this.tmpUp.set(0,1,0),Math.abs(this.tmpDir.dot(this.tmpUp))>.9&&this.tmpUp.set(1,0,0),this.tmpRight.crossVectors(this.tmpDir,this.tmpUp).normalize(),this.tmpPerp.crossVectors(this.tmpRight,this.tmpDir).normalize();const a=i==="ground"?F(10,32,this.rng()):F(16,38,this.rng());for(let l=0;l<=this.segments;l++){const c=l/this.segments;this.tmpPos.copy(t).lerp(n,c);const h=i==="ground"?1-c:Math.sin(Math.PI*c),u=a*h*(.35+.65*this.rng()),d=(this.rng()*2-1)*u,f=(this.rng()*2-1)*u*.55;this.tmpPos.addScaledVector(this.tmpRight,d),this.tmpPos.addScaledVector(this.tmpPerp,f),r.setXYZ(l,this.tmpPos.x,this.tmpPos.y,this.tmpPos.z)}r.needsUpdate=!0}}class eS{constructor(){P(this,"points");P(this,"rng",Gn(991771));P(this,"max",520);P(this,"pos");P(this,"vel");P(this,"life");P(this,"geo");P(this,"idx",0);P(this,"gustTimer_s",0);P(this,"gustActive_s",0);P(this,"gustStrength",0);this.pos=new Float32Array(this.max*3),this.vel=new Float32Array(this.max*3),this.life=new Float32Array(this.max),this.geo=new St;const e=new Ct(this.pos,3);e.setUsage(Kr),this.geo.setAttribute("position",e);const t=new ss({color:new ie("#e6f4ff"),size:.12,transparent:!0,opacity:0,depthWrite:!1,blending:Hn});this.points=new rr(this.geo,t),this.points.frustumCulled=!1}dispose(){this.geo.dispose(),this.points.material.dispose()}update(e){const t=e.dt_s,n=this.points.material;if(!e.visible){this.points.visible=!1,n.opacity=0;return}this.points.visible=!0,this.gustTimer_s-=t,this.gustActive_s=Math.max(0,this.gustActive_s-t),this.gustTimer_s<=0&&(this.gustTimer_s=F(.35,1.45,this.rng()),this.gustActive_s=F(.18,.55,this.rng()),this.gustStrength=F(.35,1,this.rng())*C(e.gustiness+e.storminess*.5,0,1));const i=this.gustActive_s>0?this.gustStrength:0,r=C(e.windSpeed_mps/26,0,1),o=C(e.storminess,0,1),a=F(6,90,r)*(.35+.65*(e.gustiness+i))*(.45+.55*o),l=Math.min(20,Math.floor(a*t)),c=Math.cos(e.windDirTo_rad),h=Math.sin(e.windDirTo_rad),u=-h,d=c;for(let _=0;_<l;_++)this.spawn(e.center,e.surfaceY,c,h,u,d,r,i,o);let f=!1;for(let _=0;_<this.max;_++){if(this.life[_]<=0)continue;f=!0,this.life[_]-=t;const m=_*3;this.vel[m+1]-=(6-2.5*i)*t,this.vel[m+0]+=c*(.25+.65*r)*t,this.vel[m+2]+=h*(.25+.65*r)*t,this.pos[m+0]+=this.vel[m+0]*t,this.pos[m+1]+=this.vel[m+1]*t,this.pos[m+2]+=this.vel[m+2]*t,this.pos[m+1]<e.surfaceY-.1&&(this.life[_]=0)}this.geo.getAttribute("position").needsUpdate=!0;const g=f?C(.12+.65*(r*.6+i*.7+o*.35),0,.85):0;n.opacity+=(g-n.opacity)*C(t*3,0,1)}spawn(e,t,n,i,r,o,a,l,c){const h=this.idx++%this.max;this.life[h]=F(.7,1.6,this.rng())*(.55+.45*a);const u=h*3,d=F(6,26,this.rng())*(.55+.45*a),f=(this.rng()*2-1)*F(4,14,this.rng()),g=F(.05,.55,this.rng())+c*.15;this.pos[u+0]=e.x+n*d+r*f,this.pos[u+1]=t+g,this.pos[u+2]=e.z+i*d+o*f;const _=F(1.2,4.8,this.rng())*(.4+.6*c)*(.65+.35*l),m=F(2,8,this.rng())*(.35+.65*a)*(.6+.4*l);this.vel[u+0]=n*m+r*(this.rng()*2-1)*.6,this.vel[u+1]=_,this.vel[u+2]=i*m+o*(this.rng()*2-1)*.6}}const Y=bf();qy(Y);let er=!0,Rr=null,Sc=!1;const ld=(()=>{try{const s=navigator==null?void 0:navigator.deviceMemory;return typeof s=="number"&&Number.isFinite(s)?s:null}catch{return null}})(),tr=(()=>{try{const s=typeof window<"u"&&!!window.matchMedia&&window.matchMedia("(pointer: coarse)").matches,e=typeof navigator<"u"?navigator.userAgent:"",t=/Android|iPhone|iPad|iPod/i.test(e),n=ld!==null&&ld<=4;return s||t||n}catch{return!1}})();function tS(s){return tr?s==="Low"?1.25:s==="Medium"?1.5:s==="High"?1.75:2:s==="Low"?1.5:s==="Medium"?2:s==="High"?2.5:3}const dt=new lx({antialias:!0,powerPreference:"high-performance"});function za(){const s=window.devicePixelRatio||1;dt.setPixelRatio(Math.min(s,tS(Y.quality))),dt.setSize(window.innerWidth,window.innerHeight)}za();dt.outputColorSpace=Xt;dt.toneMapping=Td;dt.toneMappingExposure=1.1;document.body.style.margin="0";document.body.style.overflow="hidden";const nS=document.getElementById("app")??document.body;nS.appendChild(dt.domElement);Object.assign(dt.domElement.style,{position:"fixed",left:"0",top:"0",width:"100%",height:"100%",zIndex:"0",display:"block"});PS(dt.domElement,()=>{Sc=!0,Ra.stop()},()=>{Sc=!1,bS()});const to=new JM;to.setEnabled(Y.perfOverlay);const Ni=new mc(dt);var bd;(bd=Ni.compileCubemapShader)==null||bd.call(Ni);let ci=null;const We=new nf;We.background=new ie(0);const qo=new Na(new ie("#6a7aa0"),4e-5),Pr=new Na(new ie("#053044"),.03),Ir=(()=>{const s=new or(9e3,16,12),e=new vn({color:Pr.color.clone(),side:Vt,depthWrite:!1,depthTest:!1}),t=new ft(s,e);return t.visible=!1,t.frustumCulled=!1,t.renderOrder=-1e3,t})();We.add(Ir);const Ke=new Yt(52,window.innerWidth/window.innerHeight,.1,2e4);Ke.position.set(0,1.2,2.5);const ji=new Ba;ji.scale.setScalar(1e4);We.add(ji);const oi=ji.material.uniforms;oi.turbidity.value=10;oi.rayleigh.value=2.3;oi.mieCoefficient.value=.007;oi.mieDirectionalG.value=.8;const Fn=new oo(16777215,1);Fn.position.set(1,1,0);Fn.castShadow=!1;We.add(Fn);const ba=new oo(10205439,.25);ba.position.set(-1,1,0);We.add(ba);const Rf=new Hx(8956671,725024,.55);We.add(Rf);const Ji=new oo(new ie("#e6f2ff"),0);Ji.name="LightningLight";Ji.castShadow=!1;We.add(Ji);We.add(Ji.target);const Ii=new oo(16777215,0);Ii.castShadow=!1;We.add(Ii);We.add(Ii.target);const Yo=new ie("#ffffff"),iS=new ie("#ffb26b"),sS=new ie("#cfe7ff"),rS=new A,oS=new A,$o=new A,aS=new A,cd=new A,hd=new J,ud=new J,dd=new J,Xi=new J,Ul=new J,Hr=new J;let Lr=0;const lS={height_m:0,normal:new A,disp:new A,slope:0},cS=new A,hS=new A,uS=new ie("#052436"),dS=new ie("#0a3a32"),fS=new ie("#062b3f"),fd=new ie,pS=new ie("#6a86a8"),mS=new ie("#f2b17b"),gS=new ie("#3a445c"),_S=new ie("#05070c"),pd=new ie,Ns=AS(2500);We.add(Ns);const Us=ES();We.add(Us);const Fs=TS(.5);We.add(Fs);const Aa=s=>s==="Max"?340:s==="High"?260:s==="Medium"?180:128,vS=s=>s==="Max"||s==="High"?32:s==="Medium"?24:16,lh=s=>s==="Max"?512:s==="High"?384:256,ch=s=>s==="Max"?300:s==="High"?260:s==="Medium"?220:180,Pf=new mi(12e3,12e3,Aa(Y.quality),Aa(Y.quality));Pf.rotateX(-Math.PI/2);let ti=[],Ai=[];const ln=new gy({waterColor:new ie("#0a2a3a"),foamIntensity:1.1,foamSlopeStart:.18,foamSlopeEnd:.62,waves:[]}),di=new ft(Pf,ln.material);di.frustumCulled=!1;We.add(di);let Bn=new ih(dt,{size:lh(Y.quality),worldSize_m:ch(Y.quality)}),ut=null,Tt=null,yt=null,qt=null,Qt=null,Tn=0;const md=new A,wr=new A;function hh(){var s;try{(s=ut==null?void 0:ut.dispose)==null||s.call(ut)}catch{}if(ut=null,Tt=null,yt=null,qt=null,Qt=null,Y.quality!=="Low")try{if(dt.capabilities.isWebGL2||!!dt.extensions.get("WEBGL_depth_texture")){Qt=new Jr(window.innerWidth,window.innerHeight),Qt.format=Di,Qt.type=Ui,Qt.minFilter=Qe,Qt.magFilter=Qe,Qt.generateMipmaps=!1;const t=new $t(window.innerWidth,window.innerHeight,{format:Jt,type:Sn,depthBuffer:!0,stencilBuffer:!1});t.texture.name="ComposerRT",t.depthTexture=Qt,ut=new Bu(dt,t);try{const n=ut.renderTarget2;if(n&&!n.depthTexture){const i=new Jr(window.innerWidth,window.innerHeight);i.name="ComposerDepthTex2",i.format=Di,i.type=Ui,i.minFilter=Qe,i.magFilter=Qe,i.generateMipmaps=!1,n.depthTexture=i,n.depthBuffer=!0}}catch{}}else ut=new Bu(dt);if(ut.setSize(window.innerWidth,window.innerHeight),ut.addPass(new uy(We,Ke)),Y.quality==="Max"&&!tr)try{Tt=new si({renderer:dt,scene:We,camera:Ke,width:window.innerWidth,height:window.innerHeight,groundReflector:null,selects:[di]}),Tt.opacity=.18,Tt.maxDistance=420,Tt.thickness=.018,Tt.infiniteThick=!1,ut.addPass(Tt)}catch(t){console.warn("[Max] SSR init failed; continuing without SSR.",t),Tt=null}yt=new HM,yt.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),ut.addPass(yt),qt=new nh(BM),ut.addPass(qt)}catch(e){console.warn("PostFX init failed; falling back to standard renderer.",e),ut=null,Tt=null,yt=null,qt=null,Qt=null}}hh();const vt=new UM;We.add(vt.group);const xS=s=>s==="Low"?"Low":s==="Medium"?"Medium":"High";function Ea(){const s=xS(Y.quality),e=s==="High"&&Y.otterFurSilhouette;vt.setAppearance(s,e)}Ea();const Hs=new ft(new or(.12,18,18),new kn({color:new ie("#081018"),emissive:new ie("#bfe4ff"),emissiveIntensity:3,roughness:.2,metalness:0}));Hs.name="OtterOrb";We.add(Hs);const no=new _f(new ie("#bfe4ff"),0,32,2);no.name="OtterOrbLight";no.castShadow=!1;We.add(no);const yS=new OM,If=new Qy;let Wt=0,pn=Y.timeOfDay_h,Li=Y.dayOfYear,Ei=1,Os=7.5,Cn=Math.PI,Dr=Math.PI,jo=0,Is=0,Ko=0,Zo=0;const Fl=new A(0,1,0);let wc=Tf(Y.latitude_deg,12);const Ta=new WM({biome:wc,coastProximity:Y.coastProximity,exoticEncounters:Y.exoticEncounters_pct/100});We.add(Ta.group);let Ki=new Cf(Y.quality);We.add(Ki.group);const uh=new ah({layerOffset:-.18,densityScale:1.1,opacityScale:1,coverScale:1,stormScale:1.05,rainScale:1,windScale:.85,stepsScale:1});uh.mesh.renderOrder=-12;We.add(uh.mesh);const dh=new ah({layerOffset:.22,densityScale:.85,opacityScale:.7,coverScale:.78,stormScale:.9,rainScale:.75,windScale:1.05,stepsScale:.75});dh.mesh.renderOrder=-11;We.add(dh.mesh);const fh=new ah({layerOffset:.68,densityScale:.55,opacityScale:.55,coverScale:.58,stormScale:.65,rainScale:.45,windScale:1.25,stepsScale:.6});fh.mesh.renderOrder=-10;We.add(fh.mesh);const aa=[{deck:uh,minQuality:"Low"},{deck:dh,minQuality:"Medium"},{deck:fh,minQuality:"High"}],gd={Low:0,Medium:1,High:2,Max:3},Gs=new QM;We.add(Gs.group);const la=new GM;We.add(la.group);const Gr=new XM;We.add(Gr.mesh);const Wr=new YM;We.add(Wr.points);const Xr=new eS;We.add(Xr.points);const ka=new $M;We.add(ka.mesh);const Va=new jM;We.add(Va.mesh);let Zt=null,ca=0,ha=0,Nr=0,_d=0;const ph=s=>s==="Low"?[256,384]:s==="Medium"?[512]:s==="High"?[768]:[768,1024];let Qi=ph(Y.quality),$i=Math.max(0,Qi.length-1),Ur=Qi[$i],br=0;const MS=[di,ka.mesh,Va.mesh];function SS(s){const e=ph(s);return e.length===1||tr?e[0]:Math.min(window.innerWidth,window.innerHeight)>=800?e[1]:e[0]}function Ha(){Zt==null||Zt.dispose(),Zt=null,Qi=ph(Y.quality),$i=Math.max(0,Qi.length-1);const s=SS(Y.quality);if(Ur=s,s<=0){ln.bindPlanarReflection(null,null),ln.setPlanarReflectionStrength(0);return}const e=!tr&&(Y.quality==="High"||Y.quality==="Max");Zt=new _y(dt,{size:s,generateMipmaps:e,clipBias:.0012}),ln.setPlanarReflectionSampling({texel:1/s,blur:0,edgeFade:.02}),ln.bindPlanarReflection(Zt.renderTarget.texture,Zt.textureMatrix)}Ha();const es=new KM;let nr=!1;const io=new ZM("Tap to enable sound");io.onTap(async()=>{nr||(await es.enable(),nr=!0,io.hide(),Ca())});function bc(){if(!Y.audioEnabled){io.hide();return}nr||io.show()}bc();async function Ca(){if(nr){if(!Y.audioEnabled||document.hidden){es.suspend();return}es.resume()}}let vd=Y.quality;function ua(){Wt=0,Ei=13.5,Os=13.8,Cn=Math.PI,Dr=Math.PI,ti=[],Ai=[],er=!0,If.reset({latitude_deg:Y.latitude_deg,longitude_deg:Y.longitude_deg,dayOfYear:Li,timeOfDay_h:pn,force:{cloudCover01:.98,precip01:1,storm01:1,hurricane01:.15,windSpeed_mps:42,windDirFrom_deg:42,gustiness01:1,steadyAge_h:36,stormStrength01:1,stormDirFrom_deg:42,stormDuration_s:2.5*3600,stormActiveElapsed_s:35*60}}),vt.reset(),Ta.reset(),Hr.set(vt.position.x,vt.position.z),Lr=0,Bn.reset(dt,Hr)}function Ac(){if(Y.quality===vd)return;vd=Y.quality,za();const s=new mi(12e3,12e3,Aa(Y.quality),Aa(Y.quality));s.rotateX(-Math.PI/2),di.geometry.dispose(),di.geometry=s,We.remove(Ki.group),Ki.dispose(),Ki=new Cf(Y.quality),We.add(Ki.group),hh(),Ha(),Ri=0,Ws=999,Bn.dispose(),Bn=new ih(dt,{size:lh(Y.quality),worldSize_m:ch(Y.quality)}),er=!0,Ci=0}function Lf(){var s,e;if(Rr)try{const t=((s=Rr.controllersRecursive)==null?void 0:s.call(Rr))??[];for(const n of t)(e=n.updateDisplay)==null||e.call(n)}catch{}}function wS(s){Y.quality!==s&&(Y.quality=s,Y.qualityInfo=lo(Y.quality),Ac(),Ea(),oa(Y),Lf())}Rr=$y(Y,{onAnyChange:()=>{pn=Y.timeOfDay_h,Li=Y.dayOfYear,Ac(),Ea(),bc(),Ca(),to.setEnabled(Y.perfOverlay),er=!0,oa(Y)},onCameraChange:()=>{Y.cameraDistance_m=C(Y.cameraDistance_m,9,18),Y.cameraElevation_m=C(Y.cameraElevation_m,.35,3),oa(Y)},onStartGame:()=>{Y.gameStarted=!0,pn=Y.timeOfDay_h,Li=Y.dayOfYear,ua()},onNewGame:()=>{Y.gameStarted=!1,pn=Y.timeOfDay_h,Li=Y.dayOfYear,ua()},onResetSettings:()=>{Yy();const s=bf();Object.assign(Y,s),Y.qualityInfo=lo(Y.quality),pn=Y.timeOfDay_h,Li=Y.dayOfYear,Ac(),Ea(),bc(),Ca(),to.setEnabled(Y.perfOverlay),ua(),oa(Y),Lf()}});ua();window.addEventListener("resize",()=>{var s,e;Ke.aspect=window.innerWidth/window.innerHeight,Ke.updateProjectionMatrix(),za();try{(s=ut==null?void 0:ut.setSize)==null||s.call(ut,window.innerWidth,window.innerHeight),(e=Tt==null?void 0:Tt.setSize)==null||e.call(Tt,window.innerWidth,window.innerHeight),yt&&yt.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight)}catch{}try{Ha()}catch{}});function bS(){var s;za(),ci&&(ci.dispose(),ci=null),We.environment=null,(s=Ni.compileCubemapShader)==null||s.call(Ni),hh(),Ha(),Bn.dispose(),Bn=new ih(dt,{size:lh(Y.quality),worldSize_m:ch(Y.quality)}),da=-1,fa=-1,pa=-1,Ri=0,Ws=999,ca=0,ha=0,Nr=0,er=!0,mh()}window.addEventListener("beforeunload",()=>{var s,e,t,n,i;ci&&ci.dispose();try{(s=ut==null?void 0:ut.dispose)==null||s.call(ut)}catch{}try{(e=Qt==null?void 0:Qt.dispose)==null||e.call(Qt)}catch{}try{(t=Tt==null?void 0:Tt.dispose)==null||t.call(Tt)}catch{}try{(n=yt==null?void 0:yt.dispose)==null||n.call(yt)}catch{}try{(i=qt==null?void 0:qt.dispose)==null||i.call(qt)}catch{}Ni.dispose(),Zt==null||Zt.dispose(),Bn.dispose();for(const r of aa)r.deck.dispose();Gs.dispose(),Gr.dispose(),ka.dispose(),Va.dispose(),io.dispose(),to.dispose(),Ki.dispose(),Wr.dispose(),Xr.dispose(),dt.dispose(),es.close()});const Ra=new vf;let Ec=document.hidden,Ws=999,Bs=1/60,Fr=1/60,Ci=0,Ar=0;const xd=new A,yd=new ht;let Md=1;const Sd=new A(0,1,0);let Ri=0,Ol=0,da=-1,fa=-1,pa=-1;function mh(){Ec=document.hidden,Ec?Ra.stop():(Ra.start(),Bs=1/60,Fr=1/60,Ci=0),Ca()}document.addEventListener("visibilitychange",mh);mh();function Df(){if(requestAnimationFrame(Df),Ec||Sc)return;const s=Ra.getDelta(),e=Math.min(.05,Math.max(0,s));Wt+=e;const t=1-Math.exp(-e/.25);Bs=F(Bs,e,t);const n=1-Math.exp(-e/1.2);if(Fr=F(Fr,e,n),Ar>0&&(Ar=Math.max(0,Ar-e)),Y.quality!=="Low"){const V=tr?.03571428571428571:.03125,H=tr?4.5:7;if(Fr>V?Ci+=e:Ci=Math.max(0,Ci-e*.5),Ci>=H&&Ar<=0){const ne=Y.quality==="Max"?"High":Y.quality==="High"?"Medium":"Low";wS(ne),Ci=0,Ar=12}}else Ci=0;Y.gameStarted?pn=(pn+e/3600)%24:(pn=Y.timeOfDay_h,Li=Y.dayOfYear);const i=If.update(e,{latitude_deg:Y.latitude_deg,longitude_deg:Y.longitude_deg,dayOfYear:Li,timeOfDay_h:pn,coastProximity:Y.coastProximity,precipChance_pct:Y.precipChance_pct,stormsIn2to4hChance_pct:Y.stormsIn2to4hChance_pct,verticalWindShear_mps:Y.verticalWindShear_mps,hurricaneChanceAdjust_pct:Y.hurricaneChanceAdjust_pct}),r=Oy(Y.moonPhaseName),o=by({latitude_deg:Y.latitude_deg,dayOfYear:Li,timeOfDay_h:pn,moonPhase:r,moonDistanceMultiplier:Y.moonDistanceMultiplier}),a=rS.set(o.sunDir[0],o.sunDir[1],o.sunDir[2]).normalize(),l=oS.set(o.moonDir[0],o.moonDir[1],o.moonDir[2]).normalize(),c=C(1-o.sunIntensity,0,1),h=C(1-C((o.sunElevation_rad+.04)/.35,0,1),0,1),u=12.42*3600,d=Wt/u*Math.PI*2,f=F(.35,1.25,C(Y.coastProximity,0,1)),g=Math.sin(d)*f*o.tideScale,_=C(i.cloudCover,0,1);oi.rayleigh.value=F(.65,2.7,1-_)*F(1,.55,h),oi.turbidity.value=F(6,16,_)+h*F(2,10,1-_),oi.mieCoefficient.value=F(.004,.02,_)+h*.012,oi.mieDirectionalG.value=F(.82,.92,_)+h*.02,oi.sunPosition.value.copy(a).multiplyScalar(1e4);const m=o.sunIntensity*(1-.72*_),p=C(1-C((o.sunElevation_rad+.02)/.45,0,1),0,1);Yo.set("#ffffff").lerp(iS,p),Fn.color.copy(Yo),Fn.intensity=F(0,1.35,C(m,0,1)),Fn.position.copy(a).multiplyScalar(100),ba.intensity=F(0,.35,o.moonIntensity)*(1-.35*_),ba.position.copy(l).multiplyScalar(100),Rf.intensity=F(.25,.62,1-c)*F(1,.72,_);const v=C(i.storminess*.85+i.precipIntensity*.65+i.hurricaneIntensity*1,0,1),x=Y.reduceFlashes?.35:1,S=F(.03,.85,Math.pow(v,1.35))*x;if(jo*=Math.exp(-e*10.5),Zo-=e,Ko<=0&&Math.random()<S*e&&(Ko=2+Math.floor(Math.random()*4),Zo=0),Ko>0&&Zo<=0){Ko-=1,Zo=F(.05,.18,Math.random()),jo=Math.max(jo,F(.65,1,Math.random()));const V=Math.random()*Math.PI*2,H=F(.33*Math.PI,.49*Math.PI,Math.random());$o.set(Math.cos(V)*Math.sin(H),Math.cos(H),Math.sin(V)*Math.sin(H)).normalize(),Fl.copy($o),Ji.position.copy(Ke.position).addScaledVector($o,220),Ji.target.position.copy(Ke.position);const ne=Math.random()<F(.25,.6,v)?2:1;for(let Ae=0;Ae<ne;Ae++)Gs.spawn({cameraPos:Ke.position,flashDir:Fl,storminess:v,waterLevel:g})}Is=jo*x;const D=Is*F(4,32,v);Ji.intensity=D,Gs.update({dt_s:e}),Us.position.copy(Ke.position).addScaledVector(a,4800);const E=Us.material;E.opacity=C(m,0,1),E.color.copy(Yo),Us.scale.setScalar(F(420,560,h)),Fs.position.copy(Ke.position).addScaledVector(l,4600),CS(Fs.material,r),Fs.material.opacity=C(o.moonIntensity,0,1),Ns.position.copy(Ke.position);const T=C(i.storminess*.85+i.precipIntensity*.95+i.hurricaneIntensity*1,0,1),N=C(c*(1-i.cloudCover)*(1-T),0,1);if(Ns.material.opacity=F(Ns.material.opacity,N,C(e*.5,0,1)),Tn<.02){const V=mt=>mt==="Low"?[6,10]:mt==="Medium"?[4,4.8]:mt==="High"?[2,3.2]:[1,2];if(Ri<=0){const mt=V(Y.quality);Ri=F(mt[0],mt[1],Math.random())}const H=C(Sd.dot(a),-1,1);Ol=Math.acos(H)*180/Math.PI;const ne=mt=>mt==="Low"?.65:mt==="Medium"?.45:mt==="High"?.28:.18,Ae=Math.abs(_-(da<0?_:da)),Ve=Math.abs(h-(fa<0?h:fa)),ct=Math.abs(c-(pa<0?c:pa)),wt=Y.quality==="Low"?.12:.08,$e=ne(Y.quality),en=Ol>=$e||Ae>=wt||Ve>=.06||ct>=.08;if(Ws+=e,Ws>=Ri&&en){const mt=Ni.fromScene(ji);ci&&ci.dispose(),ci=mt,We.environment=ci.texture,Sd.copy(a),da=_,fa=h,pa=c;const Fi=V(Y.quality);Ri=F(Fi[0],Fi[1],Math.random()),Ws=0}}else Ws=Ri*.85;const b=i.windDirFrom_deg*Math.PI/180+Math.PI,y=Y.latitude_deg>=0?Math.PI/4:-Math.PI/4,I=b+y,B=C(i.windSpeed_mps*.014,0,1.2)+.04*Math.sin(d);ud.set(Math.cos(I)*B,Math.sin(I)*B);const z=ud,j=vy(i.windSpeed_mps,i.windDirFrom_deg),Z={depth_m:Y.depth_m},K={stormRadius_km:i.stormRadius_km,fetchUtilization:i.fetchUtilization,stormAge_h:i.stormAge_h,windRamp_h:i.windRamp_h},Q=yy(j,K,Z),W=C(Math.max(i.precipIntensity,i.storminess,i.hurricaneIntensity),0,1),he=C(W*.85+i.gustiness*.35,0,1),me=F(55,16,he),ve=1-Math.exp(-e/Math.max(.001,me)),ze=C(W*.95+i.hurricaneIntensity*.6+i.gustiness*.35,0,1),be=C(Q.Hs_m*F(1,2.25,Math.pow(ze,1.45)),.4,24),$=C(Q.Tp_s*F(1,1.32,Math.pow(ze,1.25)),3.5,22);Ei=F(Ei,be,ve),Os=F(Os,$,ve),Cn=wd(Cn,j.windDirTo_rad,C(e*.35,0,1));const ee=F(320,180,he),de=1-Math.exp(-e/Math.max(.001,ee));Dr=wd(Dr,Cn,de);const ue=C(.28+.65*i.gustiness+.65*W,0,1),De=C(F(.25,1,ue)+W*.12,0,1),we=C((De-.55)/.45,0,1),Pe=C(i.windSpeed_mps/18,0,1),Je=C(.95+1.05*ue+.55*Pe,.65,2.6),L=C(.55-.45*W-.25*Pe,.15,.65);if(er||Ai.length===0){const V=vS(Y.quality);Ai=$u({Hs_m:Ei,Tp_s:Os,depth_m:Y.depth_m,windDirTo_rad:Cn,swellDirTo_rad:Dr,swellVariance:L,waveCount:V,directionalSpread:De,gamma:F(1.6,4.2,C(i.storminess+i.hurricaneIntensity,0,1)),choppiness:Je,seed:1337}),ti.length!==Ai.length&&(ti=Ai.map(H=>({...H}))),er=!1}else Wt%2<e&&(Ai=$u({Hs_m:Ei,Tp_s:Os,depth_m:Y.depth_m,windDirTo_rad:Cn,swellDirTo_rad:Dr,swellVariance:L,waveCount:Ai.length,directionalSpread:De,gamma:F(1.6,4.2,C(i.storminess+i.hurricaneIntensity,0,1)),choppiness:Je,seed:1337}));const nt=C(e*.85,0,1);for(let V=0;V<ti.length;V++){const H=ti[V],ne=Ai[V];H.dirX=F(H.dirX,ne.dirX,nt),H.dirZ=F(H.dirZ,ne.dirZ,nt),H.A=F(H.A,ne.A,nt),H.k=F(H.k,ne.k,nt),H.omega=F(H.omega,ne.omega,nt),H.phase=ne.phase,H.Q=F(H.Q,ne.Q,nt)}ln.writeWaves(ti),di.position.set(Ke.position.x,0,Ke.position.z);const je=C(Y.clarity_pct/100,0,1),Xe=C(je*(1-.22*W-.15*i.precipIntensity)*F(1,.78,C(Y.coastProximity,0,1)),0,1),Me=C(Y.coastProximity,0,1);fd.copy(dS).lerp(uS,Xe).lerp(fS,1-Me*.4),ln.material.color.copy(fd);const lt=C(ue*.75+C(Ei/5,0,1)*.35,0,1),Ne=F(.55,2.15,lt),Be=F(.24,.11,lt),R=F(.68,.38,lt);dd.set(Math.cos(Cn)*i.windSpeed_mps,Math.sin(Cn)*i.windSpeed_mps);const M=Y.quality==="Max"?1:Y.quality==="High"?.85:Y.quality==="Medium"?.65:.45,X=(.04+.08*Pe)*M*(1-.35*W),se=Y.quality==="Low"?35:Y.quality==="Medium"?55:Y.quality==="High"?70:80,re=Y.quality==="Low"?170:Y.quality==="Medium"?250:Y.quality==="High"?320:400;ln.update(e,{time_s:Wt,originXZ:hd.set(di.position.x,di.position.z),currentXZ:z,tideHeight_m:g,waterClarity:Xe,foamIntensity:Ne,foamSlopeStart:Be,foamSlopeEnd:R,windXZ:dd,microStrength:X,microFadeNear_m:se,microFadeFar_m:re,sunDir:a,sunColor:Fn.color,sunIntensity:m});const te=C(Y.otterosity_pct/100,0,1),Ee=m>.15?a:o.moonIntensity>.18?l:void 0;if(vt.update({otterosity:te,storminess:C(i.precipIntensity+i.storminess*.7+i.hurricaneIntensity,0,1),waveChaos:ue,windDirTo_rad:Cn,interestDir:Ee},{dt_s:e,time_s:Wt,waves:ti,currentXZ:z,tideHeight_m:g}),Xi.set(vt.position.x,vt.position.z),e>1e-6){const V=Xi.x-Hr.x,H=Xi.y-Hr.y;Lr=Math.sqrt(V*V+H*H)/e}else Lr=0;Hr.copy(Xi),Ul.set(vt.bodyForward.x,vt.bodyForward.z);const le=Ds(ti,hd.set(vt.position.x,vt.position.z),Wt,z,g,lS,cS,hS),ge=vt.getHeadWorldPosition($o),ke=vt.getEyeWorldPosition(aS);Hs.position.copy(ge),Hs.position.y+=.32,no.position.copy(Hs.position);const ae=C(.35+.65*c+.45*C(i.storminess+i.hurricaneIntensity,0,1),0,1);no.intensity=F(2.5,10,ae),Hs.material.emissiveIntensity=F(2.5,4.2,ae),yS.update(Ke,{dt_s:e,gazeDir:vt.gazeDir,bodyForward:vt.bodyForward,headPos:ge,eyePos:ke,surfaceHeight_m:le.height_m,underwater:vt.isUnderwaterView(),storminess:C(i.precipIntensity+i.storminess+i.hurricaneIntensity,0,1),followDistance_m:Y.cameraDistance_m,followElevation_m:Y.cameraElevation_m}),Ke.updateMatrixWorld(),ji.position.copy(Ke.position),Ke.getWorldDirection(cd),Ii.position.copy(Ke.position).addScaledVector(cd,-2),Ii.position.y+=3,Ii.target.position.copy(ge),Ii.color.copy(Yo).lerp(sS,c),Ii.intensity=F(.12,.4,c)*(.85+.4*_);const pe=C(1-(i.storminess*.75+i.hurricaneIntensity+i.precipIntensity*.6+ue*.25),0,1),qe=C(1-C((o.sunElevation_rad+.04)/.35,0,1),0,1);ka.update({dt_s:e,time_s:Wt,center:vt.position,surfaceY:le.height_m,calmness:pe,sunIntensity:m,sunset:qe}),Va.update({dt_s:e,time_s:Wt,centerXZ:Xi,forwardXZ:Ul,surfaceY_m:le.height_m,speed_mps:Lr,paddleImpulse01:vt.paddleImpulse01??0,calm01:pe});const Te=Ke.position.y<le.height_m-.08;if(Tn=F(Tn,Te?1:0,C(e*3,0,1)),Ir.visible=Tn>.02,Ir.visible&&(Ir.position.copy(Ke.position),Ir.material.color.copy(Pr.color)),Tt&&(Tt.enabled=Tn<.02),yt){yt.enabled=Tn>.001,md.copy(Ke.position).addScaledVector(a,12e3),wr.copy(md).project(Ke);const V=wr.x*.5+.5,H=wr.y*.5+.5,ne=wr.z>-1&&wr.z<1&&V>-.15&&V<1.15&&H>-.15&&H<1.15?1:0;yt.uniforms.u_time.value=Wt,yt.uniforms.u_underwater.value=Tn,yt.uniforms.u_clarity.value=Xe,yt.uniforms.u_waterLevel.value=g,yt.uniforms.u_sunUv.value.set(V,H),yt.uniforms.u_sunInView.value=ne,yt.uniforms.u_sunIntensity.value=m,yt.uniforms.u_sunColor.value.copy(Fn.color),yt.uniforms.u_invProj.value.copy(Ke.projectionMatrixInverse),yt.uniforms.u_invView.value.copy(Ke.matrixWorld)}const xe=vt.paddleImpulse01??0,Ce=C(C(Lr/.25,0,1)*(.15+.35*pe)+xe*(.18+.22*pe),0,1);if(Bn.update(dt,{dt_s:e,time_s:Wt,centerXZ:Xi,waves:ti,currentXZ:z,windDirTo_rad:Cn,windSpeed_mps:i.windSpeed_mps,storminess:W,wakePosXZ:Xi,wakeDirXZ:Ul,wakeStrength:Ce}),ln.bindFoamMap(Bn.texture),ln.setFoamFieldTransform(Bn.centerXZ,Bn.worldSize_m),la.update(Ke.position,vt.bodyForward,g),Te){Pr.color.set("#053044"),Pr.density=F(.055,.018,Xe),We.fog=Pr,dt.toneMappingExposure=F(dt.toneMappingExposure,1,C(e*2,0,1)),Ns.visible=!1,Us.visible=!1,Fs.visible=!1,ji.visible=!1;for(const V of aa)V.deck.mesh.visible=!1;la.group.visible=!1,Gr.mesh.visible=!1,Wr.points.visible=!1,Gs.group.visible=!1,Xr.points.visible=!1}else{const V=C(1-C((o.sunElevation_rad+.04)/.35,0,1),0,1),H=C(i.cloudCover*.55+i.precipIntensity*.85+i.storminess*.9+i.hurricaneIntensity*1,0,1),ne=C(1-C(i.visibility_km,1,80)/80,0,1);pd.copy(pS).lerp(mS,V*.72).lerp(Fn.color,V*.18).lerp(gS,H*.65).lerp(_S,c*.7),qo.color.copy(pd);const Ae=F(3e-5,18e-5,ne),Ve=F(.95,1.35,C(H*.85+V*.55,0,1)),ct=C(Ae*Ve,2e-5,24e-5);qo.density=F(qo.density,ct,C(e*1.4,0,1)),We.fog=qo;const wt=C(F(1.08,1.18,V)*F(1,.9,c)+Is*.55,.55,1.85);dt.toneMappingExposure=F(dt.toneMappingExposure,wt,C(e*2.5,0,1)),Ns.visible=!0,Us.visible=!0,Fs.visible=!0,ji.visible=!0;for(const $e of aa)$e.deck.mesh.visible=!0;la.group.visible=!0,Gr.mesh.visible=!0,Wr.points.visible=!0,Gs.group.visible=!0,Xr.points.visible=!0}wc=Tf(Y.latitude_deg,i.waterTemp_C),Ta.setParams({biome:wc,coastProximity:Y.coastProximity,exoticEncounters:Y.exoticEncounters_pct/100}),Ta.update({dt_s:e,time_s:Wt,otterPos:vt.position,surfaceY:g,nightFactor:c,storminess:C(i.precipIntensity+i.storminess+i.hurricaneIntensity,0,1)});const Fe=gd[Y.quality];for(const V of aa){const H=Fe>=gd[V.minQuality];V.deck.mesh.visible=H&&!Te,!(!H||Te)&&V.deck.update({dt_s:e,time_s:Wt,center:Ke.position,cloudCover:i.cloudCover,windDirFrom_deg:i.windDirFrom_deg,windSpeed_mps:i.windSpeed_mps,sunDir:a,sunColor:Fn.color,sunIntensity:m,nightFactor:c,lightningFlash01:Is,lightningDir:Fl,storminess:i.storminess,hurricaneIntensity:i.hurricaneIntensity,precipIntensity:i.precipIntensity,quality:Y.quality})}Ki.update({dt_s:e,time_s:Wt,cameraPos:Ke.position,windDirFrom_deg:i.windDirFrom_deg,intensity:i.precipIntensity,mode:i.precipType==="Snow"?"Snow":i.precipType==="Rain"?"Rain":"None",visible:!Te}),Gr.update({dt_s:e,center:Ke.position,sunDir:a,sunElevation_rad:o.sunElevation_rad,precipIntensity:i.precipIntensity,cloudCover:i.cloudCover}),Wr.update({dt_s:e,origin:vt.position,surfaceY:le.height_m,slope:le.slope,intensity:C(C(i.windSpeed_mps/20,0,1)*(.25+.75*C(i.storminess+i.hurricaneIntensity,0,1))*(1+.9*we)+xe*(.2+.25*pe)+vt.wetness01*.25,0,1),windDirTo_rad:j.windDirTo_rad,sprayBias01:C(vt.wetness01*.7+W*.25+C(i.windSpeed_mps/30,0,1)*.2,0,1)}),Xr.update({dt_s:e,time_s:Wt,center:Ke.position,surfaceY:le.height_m,windDirTo_rad:Cn,windSpeed_mps:i.windSpeed_mps,gustiness:i.gustiness,storminess:W,visible:!Te}),Y.audioEnabled&&nr&&!document.hidden?(es.setMasterVolume(Y.masterVolume),es.update(e,{U10:i.windSpeed_mps,Hs:Ei,rain:i.precipIntensity})):nr&&es.setMasterVolume(0),Y.derived_state=i.stateName,Y.derived_airTemp_C=Math.round(i.airTemp_C*10)/10,Y.derived_waterTemp_C=Math.round(i.waterTemp_C*10)/10,Y.derived_cloudCover=Math.round(i.cloudCover*100)/100,Y.derived_visibility_km=Math.round(i.visibility_km*10)/10,Y.derived_windSpeed_mps=Math.round(i.windSpeed_mps*10)/10,Y.derived_windDirFrom_deg=Math.round(i.windDirFrom_deg),Y.derived_precip=i.precipType==="None"?"None":`${i.precipType} (${Math.round(i.precipIntensity*100)}%)`,Y.derived_Hs_m=Math.round(Ei*100)/100,Y.derived_Tp_s=Math.round(Os*100)/100,Y.derived_tideScale=Math.round(o.tideScale*1e3)/1e3;const U=Math.floor(pn),oe=Math.floor((pn-U)*60);if(Y.derived_clock=`${String(U).padStart(2,"0")}:${String(oe).padStart(2,"0")}`,i.stormEta_h<0?Y.derived_stormETA="—":i.stormEta_h>=1?Y.derived_stormETA=`in ${Math.round(i.stormEta_h*10)/10}h`:Y.derived_stormETA=`in ${Math.max(1,Math.round(i.stormEta_h*60))}m`,Y.derived_stormChanceEff_pct=i.stormChanceEffective_pct,Y.derived_hurricaneChanceEff_pct=i.hurricaneChanceEffective_pct,qt){const V=C(1-C((o.sunElevation_rad+.04)/.35,0,1),0,1),H=V*(1-c*.55)*(1-Tn),ne=Y.reduceFlashes?.65:1,Ae=Y.reduceFlashes?.4:1,Ve=Y.reduceFlashes?.96:1;qt.uniforms.u_time.value=Wt,qt.uniforms.u_warmth.value=.22*H*ne;const ct=Y.quality==="Max"?.03:Y.quality==="High"?.032:.034;qt.uniforms.u_grain.value=ct*Ae,qt.uniforms.u_vignette.value=F(.22,.12,Tn)*ne,qt.uniforms.u_saturation.value=F(1.04,1.13,V)*F(1,.88,Tn)*Ve,qt.uniforms.u_contrast.value=F(1.03,1.08,V)*F(1,.92,Tn)*Ve}if(Zt&&!Te){if(br=Math.max(0,br-e),br<=0&&Qi.length>1){const tn=Bs*1e3,rs=tn>23.5,uo=tn<17;rs&&$i>0?($i--,br=1.25):uo&&$i<Qi.length-1&&($i++,br=2);const Oi=Qi[$i];Oi!==Ur&&(Ur=Oi,Zt.setSize(Ur))}const V=Ke.position.distanceTo(xd),H=Math.abs(yd.dot(Ke.quaternion)),ne=2*Math.acos(C(H,0,1));xd.copy(Ke.position),yd.copy(Ke.quaternion),Md=V*45+ne*18;const Ae=Md<.75,Ve=tn=>tn==="Low"?.25:tn==="Medium"?.18:tn==="High"?.12:.085,ct=tn=>tn==="Low"?.11:tn==="Medium"?.065:0,$e=Is>.05?0:Ae?Ve(Y.quality):ct(Y.quality);ca+=e,ca>=$e&&(Zt.update(dt,We,Ke,g,MS),ca=0,ha++),Nr+=e,Nr>=1&&(_d=ha/Nr,ha=0,Nr=0);const en=Y.quality==="Max"?1:Y.quality==="High"?.95:.9,mt=C(lt*.8+W*.6,0,1),Fi=C(Is*(.35+.65*W),0,.85),Yn=en*F(1,.62,mt)+Fi;ln.setPlanarReflectionStrength(Yn);const ho=(Y.quality==="Max"?2.2:Y.quality==="High"?1.25:0)*mt;ln.setPlanarReflectionSampling({texel:1/Math.max(1,Ur),blur:ho,edgeFade:.03})}else ln.setPlanarReflectionStrength(0);to.update(e,{dt_ms:e*1e3,dtEma_ms:Bs*1e3,dtAvg_ms:Fr*1e3,fpsEma:1/Math.max(1e-6,Bs),quality:Y.quality,reflectionRT_px:Zt?Zt.renderTarget.width:0,reflectionUpdatesPerSec:_d,envInterval_s:Ri,envAngleDelta_deg:Ol}),ut?ut.render():dt.render(We,Ke)}Df();function AS(s){const e=new St,t=new Float32Array(s*3);for(let r=0;r<s;r++){const o=4500+Math.random()*2500,a=Math.random()*Math.PI*2,l=Math.acos(2*Math.random()-1),c=o*Math.sin(l)*Math.cos(a),h=o*Math.cos(l),u=o*Math.sin(l)*Math.sin(a);t[r*3+0]=c,t[r*3+1]=h,t[r*3+2]=u}e.setAttribute("position",new Ct(t,3));const n=new ss({color:new ie("#ffffff"),size:1.2,sizeAttenuation:!0,transparent:!0,opacity:0,depthWrite:!1}),i=new rr(e,n);return i.frustumCulled=!1,i}function ES(){const s=RS("#fff7cf"),e=new Hc({map:s,transparent:!0,opacity:1,depthWrite:!1,blending:Hn}),t=new of(e);return t.scale.setScalar(450),t}function TS(s){const e=Nf(s),t=new Hc({map:e,transparent:!0,opacity:1,depthWrite:!1}),n=new of(t);return n.scale.setScalar(220),n}function CS(s,e){var i;const t=Math.round(e*1e3)/1e3;s.__phaseKey!==t&&((i=s.map)==null||i.dispose(),s.map=Nf(e),s.needsUpdate=!0,s.__phaseKey=t)}function RS(s){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d"),n=t.createRadialGradient(128,128,5,128,128,128);n.addColorStop(0,s),n.addColorStop(.15,s),n.addColorStop(.35,"rgba(255,255,255,0.55)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);const i=new Xc(e);return i.minFilter=tt,i.magFilter=tt,i}function Nf(s){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");t.clearRect(0,0,256,256),t.beginPath(),t.arc(128,128,112,0,Math.PI*2),t.closePath(),t.fillStyle="#d9d9d9",t.fill(),t.globalAlpha=.1;for(let c=0;c<180;c++){const h=1+Math.random()*8,u=128+(Math.random()*2-1)*86,d=128+(Math.random()*2-1)*86;t.beginPath(),t.arc(u,d,h,0,Math.PI*2),t.closePath(),t.fillStyle=Math.random()<.5?"#bdbdbd":"#efefef",t.fill()}t.globalAlpha=1;const n=(s%1+1)%1,i=Math.cos((n-.5)*Math.PI*2)*.5+.5,o=(n<.5?F(1,-1,n/.5):F(-1,1,(n-.5)/.5))*90;t.save(),t.globalCompositeOperation="destination-in",t.beginPath(),t.arc(128,128,112,0,Math.PI*2),t.closePath(),t.fillStyle="#ffffff",t.fill(),t.restore(),t.save(),t.globalCompositeOperation="source-atop",t.fillStyle=`rgba(0,0,0,${F(.98,0,i)})`,t.beginPath(),t.arc(128+o,128,112,0,Math.PI*2),t.closePath(),t.fill(),t.restore();const a=t.createRadialGradient(108,108,10,128,128,120);a.addColorStop(0,"rgba(255,255,255,0.35)"),a.addColorStop(1,"rgba(255,255,255,0.0)"),t.fillStyle=a,t.beginPath(),t.arc(128,128,112,0,Math.PI*2),t.closePath(),t.fill();const l=new Xc(e);return l.minFilter=tt,l.magFilter=tt,l}function wd(s,e,t){const n=(e-s+Math.PI*3)%(Math.PI*2)-Math.PI;return s+n*t}function PS(s,e,t){const n=document.createElement("div");Object.assign(n.style,{position:"fixed",left:"10px",top:"10px",maxWidth:"calc(100% - 20px)",maxHeight:"45vh",overflow:"auto",padding:"10px 12px",background:"rgba(0,0,0,0.70)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:"10px",fontFamily:'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',fontSize:"12px",lineHeight:"1.35",zIndex:"9999",whiteSpace:"pre-wrap",display:"none"}),document.body.appendChild(n);let i=!1;const r=(o,a)=>{if(i)return;i=!0;const l=typeof a=="string"?a:a instanceof Error?a.stack??a.message:JSON.stringify(a);n.textContent=`${o}

${l}

Tip: If this says WebGL context lost, lower quality (Performance → quality) or reload.`,n.style.display="block"};window.addEventListener("error",o=>{r("Runtime error",o.error??o.message)}),window.addEventListener("unhandledrejection",o=>{r("Unhandled promise rejection",o.reason)}),s.addEventListener("webglcontextlost",o=>{o.preventDefault(),r("WebGL context lost","Your browser/GPU driver stopped the WebGL context. Try lowering quality or reloading."),e==null||e()},{passive:!1}),s.addEventListener("webglcontextrestored",()=>{i=!1,n.style.display="none",t==null||t()},{passive:!0})}
