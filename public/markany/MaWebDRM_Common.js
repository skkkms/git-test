﻿﻿var iVersion				= 25175;
var MarkanySignature 		= "MARKANYWEBDRM";
var maLicense				= "8cKM2fomjgaYAn9ivA3oyudZT5Yw4LGPm9TNH5/JJ24ifQ==";

var maResultCode;
var maMsgArr = {	
                	  1001 : "웹 화면 보안(MaWebDRM)을 지원하지 않는 브라우져로 접속하였습니다."
                	, 1002 : "웹 화면 보안(MaWebDRM)을 지원하지 않는 플렛폼으로 접속하였습니다."
                	, 2001 : "잘못된 경로로 접근하였습니다."
                	, 2002 : "개발자도구를 닫고 다시 접속해 주세요."
					, 3001 : "MarkAny WebDRM license has expired"
				};
 
var maSupportingRangeArr = {
							"Windows NT" : [ "Chrome", "MSIE", "Firefox", "Opera", "CEdge" ]
							//, "Linux" : [ "Chrome", "Firefox", "Opera" ]
							//, "Mac OS X" : [ "Chrome", "Firefox", "Opera", "Safari" ]
						};

function checkMobileDevice(){

	var mobileKeyWords = new Array('Android','iPhone','iPod','BlackBerry','Windows CE','SAMSUNG','LG','MOT','SonyEricsson');
	for(var info in mobileKeyWords){
		if(navigator.userAgent.indexOf(mobileKeyWords[info]) >= 0){
			return true;
		}		
	}
	return false;
}

function checkIE(){
	if(navigator.userAgent.indexOf("MaWebDRM") >= 0){
		return true;
	}
	return false;
}

function IsHTTPS()
{
	if(window.location.protocol === 'https:') 
		return true;
	return false;
}


function IsXHR()
{	
	if( get_browser() == 'MSIE' || get_browser() == 'MSIEX64'  )
		return true;
	else if( get_browser() == 'Safari' )
		return true;
	else
		return false;
}


/**
 * 	20150904_hcchoi\n
 * 	프레임 형식으로 인베딩되어 webDRM이 동작했을 경우\n
 *  최상위 윈도우에 화면가리기 <div>를 생성하기 위해\n
 *  루프를 돌면 윈도우와 상위 윈도우를 비교하여\n
 *  최상위 윈도우를 찾아 리턴해줍니다.
 */
function getTopWindow(){
	try
	{
		var topWindow = window.self;
		for( ; ; ){
			if( topWindow.top == topWindow ){
				break;
			}
			topWindow = topWindow.top;
		}
	}
	catch(e)
	{
		
	}
	
	return topWindow;
}

function isTopWindow(){
	try
	{
		var bRet = true;
		var topWindow = window.self;
		for( ; ; ){
			if( topWindow.top == topWindow ){
				break;
			}
			else
			{
				bRet = false;
				break;
			}
			// topWindow = topWindow.top;
		}
	}
	catch(e)
	{
		
	}
	
	return bRet;
	//return topWindow;
}

function randomString(string_length)
{
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var randomstring = '';
	for (var i=0; i<string_length; i++)
	{
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

function addZero(x, n) {
	while (x.toString().length < n) { 
		x = "0" + x;
	}
	return x;
}

ua = navigator.userAgent;
uaOs = ua.match(/(CrOS\ \w+|Windows\ NT|Mac\ OS\ X|Linux)\ ([\d\._]+)?/);
uaBrowser = ua.match(/(opera|chrome|safari|firefox|msie|trident|edge(?=\/))\/?\s*(\d+)/i) || [];

function getOsName() {
	if(uaOs){
		return uaOs [1] || "Unknown";	
	}else{
		return ua.match(/(CrOS\ \w+|Windows\ NT|Mac\ OS\ X|Linux)/)[1];
	}
}

function getOsVersion(){
	if(uaOs){
		return uaOs [2] || "Unknown";	
	}else{
		return "Unknown";
	}
}

function getOsBit(){
	var osBit = '';
	M = ua.match( /\(.*(Windows|Linux).*(WOW64|Win64|i686|x86_64).*?\)/i ) || [];
	if( ua.indexOf('Macintosh') > 0 ){
		osBit = '64';
	}else if( M[2] != null ){
		if( M[2].indexOf('64') > 0 ){
			osBit = '64';
		}else{
		osBit = '32';
		}
	}else{
		osBit = '32';
	}
	
	return osBit;
}

function getBrowserName() {
	var tem;
	if (/trident/i.test(uaBrowser[1])) {
		tem = ua.match(/\QQBrowser\/(\d+)/)
		if (tem != null) {
			return 'QQ';
		}
		return 'MSIE';
	}
	if (uaBrowser[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/)
		if (tem != null) {
			return 'Opera';
		}
		tem = ua.match(/\bEdg\/(\d+)/)
		if (tem != null) {
			return 'CEdge';
		}
		tem = ua.match(/\bEdge\/(\d+)/)
		if (tem != null) {
			return 'Edge';
		}
		tem = ua.match(/\bUBrowser\/(\d+)/)
		if (tem != null) {
			return 'UBrowser';
		}
		tem = ua.match(/\bWhale\/(\d+)/)
		if (tem != null) {
			return 'Whale';
		}
		tem = ua.match("MetaSr")
		if (tem != null) {
			return 'Sogou';
		}
	}
	tem = ua.match(/\bSwing\/(\d+)/)
		if (tem != null) {
			return 'Swing';
	}
	tem = ua.match(/\Maxthon\/(\d+)/)
		if (tem != null) {
			return 'Maxthon';
	}
	tem = ua.match(/\YaBrowser\/(\d+)/)
		if (tem != null) {
			return 'Yandex';
	}
		
	return uaBrowser[1];
}

function getBrowserVersion() {
	var tem;
	if (/trident/i.test(uaBrowser[0])) {
		//tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		//return tem[1];
		return '11';	
	}
	if (uaBrowser[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/)
		if (tem != null) {
			return tem[1];
		}
		tem = ua.match(/\bEdge\/(\d+)/)
		if (tem != null) {
			return tem[1];
		}
		tem = ua.match(/\bUBrowser\/(\d+)/)
		if (tem != null) {
			return tem[1];
		}
		tem = ua.match(/\bWhale\/(\d+)/)
		if (tem != null) {
			return tem[1];
		}
	}
	tem = ua.match(/\bSwing\/(\d+)/)
		if (tem != null) {
			return tem[1]
	}
	return uaBrowser[2];
}


function getBrowserBit(){
	var bsBit = '';
	M = ua.match(/ \(.*(Windows|Linux).*(x64|x86_64).*?\)/) || [];

	if( M[2] != null ){
		if (M[2].indexOf('64') > 0 ){
			bsBit = '64';
		}
	}else{
		bsBit = '32';
	}			
	return bsBit;
}

function isMSIEX64() {
	const ua = navigator.userAgent
	return (ua.indexOf("Win64") != -1 || ua.indexOf("x64") != -1)
}

// Whale | EDGE | MSIEX64 | MSIE | OperaX64 | Opera | ChromeX64 | FirefoxX64 | MSIEX64 | M[0]
function get_browser()
{
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		
	if(ua.indexOf("Whale") != -1)
		return 'Whale';
	
	if(ua.indexOf("Edg\/") != -1)
	{
		if( getBrowserBit() == '64' )
			return 'CEdgeX64';
		else
			return 'CEdge';
	}
	
	if(ua.indexOf("Edge") != -1)
		return 'EDGE';
	
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		if(isMSIEX64())
			return 'MSIEX64'
		
        return 'MSIE';
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) {
            //return 'Opera';
			// WebDRM의 경우 구형 오페라와 신형 오페라에 따라 인젝션하는 dll이 다르기 때문에 구분]
			
			//hcchoi_20170911 opera x64 add
			if( ua.match('x64') ){
				return 'OperaX64';
			}else{
				return 'Opera';
			}
        }
    }
	if (M[1] === 'Chrome') {
		tem = ua.match('x64')
        if (tem != null) {
			return 'ChromeX64';	//Chrome 64비트 모듈
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
	
	if( M[0] === 'Firefox'){
		tem = ua.match('x64')
		if (tem != null) {
			return 'FirefoxX64';	//Chrome 64비트 모듈
        }
	}
	
	if (M[0] === 'MSIE') {
		if(isMSIEX64())
			return 'MSIEX64';
		
		return 'MSIE';
	}
	
    return M[0];
}

function get_browser_version()
{
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return tem[1];
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) {
            return tem[1];
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[1];
}

var MaBase64 = {
		// private property
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	 
		// public method for encoding
		encode : function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
	 
			input = MaBase64._utf8_encode(input);
	 
			while (i < input.length) {
	 
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
	 
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
	 
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
	 
				output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	 
			}
	 
			return output;
		},
	 
		// public method for decoding
		decode : function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
	 
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	 
			while (i < input.length) {
	 
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));
	 
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
	 
				output = output + String.fromCharCode(chr1);
	 
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
	 
			}
	 
			output = MaBase64._utf8_decode(output);
	 
			return output;
	 
		},
	 
		// private method for UTF-8 encoding
		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	 
			for (var n = 0; n < string.length; n++) {
	 
				var c = string.charCodeAt(n);
	 
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
	 
			return utftext;
		},
	 
		// private method for UTF-8 decoding
		_utf8_decode : function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
	 
			while ( i < utftext.length ) {
	 
				c = utftext.charCodeAt(i);
	 
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1); 
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					// c3 = utftext.charCodeAt(i+2);
					var c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
	 
			}
	 
			return string;
		}
	 }

/**
 * 20170906_hcchoi<br>
 * 스크립트 디버그 메소드 console.log()함수 활용<br>
 * ex) use >>>> debugLog("open End Time", currentTime);<br>
 * ex) print >>>> ## |15:31:20| checkSocket () :: Start Time = [864]
 * 
 * @param valueName
 *            {String} 변수명
 * @param value
 *            {any} 변수값
 * @param caller
 *            {String} 호출함수명(자동)
 */
function MDBG(valueName, value, caller) {

	var callerFun = arguments.callee.caller;
	if (caller)
		callerFun = callerFun.caller;
	var pat = /^function\s+([a-zA-Z0-9_]+)\s*\(/i;
	pat.exec(callerFun);
	var func = new Object();
	func.name = RegExp.$1;

	var d = new Date();
	var h = addZero(d.getHours(), 2);
	var m = addZero(d.getMinutes(), 2);
	var s = addZero(d.getSeconds(), 2);
	var ms = addZero(d.getMilliseconds(), 3);
	var currentTime = h + ":" + m + ":" + s /* + ":" + ms */;

	var funNameArr = [];
	var maxFunNameLength = 20;
	var blankCount = maxFunNameLength - func.name.length;

	for (var funnamei = 0; funnamei < func.name.length; funnamei++) {
		funNameArr.push(func.name.charAt(funnamei));
	}
	for (var maxFunName = 0; maxFunName < blankCount; maxFunName++) {
		funNameArr.push(' ');
	}

	var callFunName = funNameArr.join('');

	var valueNameArr = [];
	var maxValueNameLength = 25;
	blankCount = maxValueNameLength - valueName.length;

	for (var valuenamei = 0; valuenamei < valueName.length; valuenamei++) {
		valueNameArr.push(valueName.charAt(valuenamei));
	}
	for (var maxValuenamei = 0; maxValuenamei < blankCount; maxValuenamei++) {
		valueNameArr.push(' ');
	}

	var valueName1 = valueNameArr.join('');
	var valueName2 = "## |" + currentTime + "| " + callFunName + "() :: " + valueName1;
	
	if(window.console == undefined) 
		console = {log:function(){}};
	
	console.log( valueName2, value );
	//alert("|" + currentTime + "| " + func.name + "() :: " + valueName + " = [" + value + "]");
	/*
	var log = document.getElementById("log");
	if( log == null){
		log = document.createElement("textarea");
		$(log).attr("id", "log");
		$(log).css("width", "100%");
		$(log).css("height", "300px");
		$("#contain").append(log);
	}
	log.value = log.value + "|" + currentTime + "| " + func.name + "() :: " + valueName + " = [" + value + "]\n";
	*/
	//document.writeln("## |" + currentTime + "| " + callFunName + "() :: " + valueName1 + " = [" + value + "]<br><\n>"); 
}

var maf = "LFAIL";
var userInfo = new Object();
userInfo.osName = getOsName();
userInfo.osVersion = getOsVersion();
userInfo.osBit = getOsBit();
userInfo.bsName = getBrowserName();
userInfo.bsVersion = getBrowserVersion();
userInfo.bsBit = getBrowserBit();
userInfo.protocol = window.location.protocol; 
userInfo.curl = MaBase64.encode(location.host); 
MDBG("userInfo", userInfo);

