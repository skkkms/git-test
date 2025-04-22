/**
 * 20200420
 */
var MaPath					= "./markany/";				// 경로 수정 요망
var InstallPage 			= MaPath + "MaInstallPage.html";
var maErrorPage 			= MaPath + "MaErrorPage.html";
var notSupportBsCheck		= true;
var notSupportPlatformCheck = true;
var notSupportMobileCheck 	= true;
var bLoaded					= true; 
var installMsgShowFlag		= false;
var installMsg				= "웹 화면 보안 프로그램의 설치가 필요합니다. [확인]버튼을 누르면 설치 페이지로 이동합니다.";

// bIsAutoLoad : js가 해당 html에 include될 때 자동으로 WebDRM을 로드 및 언로드 시키려면 bIsAutoLoad 를 true로 셋팅하며
// 수동으로 로드하고싶으면 bIsAutoLoad값을 false로 한 뒤, 수동으로 상황에 맞게 MaLoad(), MaUnLoad()를 호출하도록 한다. (또는 MaWebDRMStart() 사용)
var bIsAutoLoad				= false;

var scopeObj;
 
// Policy
var bUseSave				= false;
var bUseCopy				= false;
var MA_EXCEPT_SAVE			= 0;		// 저장 단축키 ( IE는 메뉴까지 제어 가능 ) - 막음: 0, 뚫음: 1
var MA_EXCEPT_PRINT			= 0;		// 프린트 단축키 ( IE는 메뉴까지 제어 가능 ) - 막음: 0, 뚫음: 1
var MA_EXCEPT_DEV 			= 1;		// 개발자도구 단축키 ( IE는 메뉴까지 제어 가능 ) - 막음: 0, 뚫음: 1
var MA_EXCEPT_COPY			= 1;		// 복사 단축키 ( IE는 메뉴까지 제어 가능 )- 막음:0, 뚫음: 1
var MA_EXCEPT_NOCTL			= 0;		// 사용 안함( 건들지 말 것 )
var MA_EXCEPT_ALL			= 0;		// 크롬 보안기능중 캡쳐만 사용 ( 나머지 정책 설정 불가 )
var MA_EXCEPT_RBTN 			= 1;		// 마우스 우클릭 - 막음: 0, 뚫음: 1
var MA_SEC_CLIPBOARD		= 0;		// Secure Clipboard 이 기능을 사용하기 위해서는 MA_EXCEPT_COPY값이 1이어야 함 - 당분간 사용중지
var MA_EXCEPT_WINDOW		= 1;		// IE의 새탭, 탭복제 새창 - 막음:0, 뚫음: 1

//set ICP
var g_ICPOn					= 0;			// ICP On : 1 / Off : 0
var g_ICPType				= 2; 
var g_szICPMsg				= "MarkAny Inc.";
var g_iICPTextPercent		= 5;
var g_iICPOpacity			= 30;

var g_ICPFont				= "굴림";
var g_ICPDegree				= 35;
var g_ICPPosXPercent		= 0;
var g_ICPPosYPercent		= -70;
var g_ICPTextPercent2		= 10;
var g_ICPPosXPercent2		= 40;
var g_ICPPosYPercent2		= 30;
 
//set TITLE
var bUseRandomStr			= true;			//타이틀 랜덤 스트링 사용 여부
var szCaptionName			= "";			//타이틀명
var originalTitleName		= "";
var szUniqueVal				= "";			//타이틀 랜덤 스트링
var szAddCaptionName		= "　　　　　　　　　　　　　　　_WebDRM";	// WebDRM 적용을 위해 Title 문구 뒤에 특정 문구를 적용해야 합니다. 원하는 문구를 셋팅해 주세요.

var maeiem					= false;
var maeiem64				= false;

var maWebDrm = new Object();
var masocket;
var maobject;

// 캡쳐 막기 사용  : 1, 캡쳐 허용 : 0
// var bImgsfOn			= 1;

function getInstallPage()
{ 
	return InstallPage;
}

function supportBsCheck(bsName){
	var supportBsArr = ["Chrome", "MSIE", "Firefox", "Opera", "CEdge"];
	
	var supportBsFlag = false;
	
	for(var bs_i=0; bs_i<supportBsArr.length; bs_i++){
		if(bsName === supportBsArr[bs_i]){
			supportBsFlag = true;
			break;
		}
	}
	return supportBsFlag;
}

function setMaPolicy()
{
	var Policy;

	// 캡처: 차단(1), 허용(0)
	var bImgsfOn			= 1;

	const token = localStorage.getItem('accessToken')
	$.ajax({
		async: false,
		url: `/api/v1/iaa/system/capture`,
		headers: {
			'Authorization' : 'Bearer ' + token
		}
	}).done(data => {
		if (data.captureYn === 'Y') {
			bImgsfOn = 0
		}
	})

	var MA_VIRTUALBOX		= 0x00000001;
	var MA_VMWARE			= 0x00000002;
	var MA_VIRTUALPC		= 0x00000004;
	var MA_QEMU				= 0x00000008;
	var MA_PARALLELS		= 0x00000010;
	var MA_CITRIX			= 0x00000020;
	var MA_VMALLOWALL		= MA_VIRTUALBOX | MA_VMWARE | MA_VIRTUALPC | MA_QEMU | MA_PARALLELS | MA_CITRIX;		// 모든 가상머신을 허용
	var MA_DEFAULT			= 0xFFFFFFFF;		// 모든 가상머신을 허용 안함
	// 여러개의 가상머신을 예외시키고자 하는 경우 비트연산자 | 를 사용해 추가시킨다.
	// ex) exceptVm = MA_CITRIX | MA_PARALLELS;
	var exceptVm = MA_VMALLOWALL;
	
	// 캡쳐 시도 시 화면 보호 - 전체화면 : 1, 해당화면 : 0, Unconditional Protect : 2
	var bCoverOpt = 0;

	// 서브클래싱 사용 : 1, 사용안함 : 0
	var bSubclassing =	1;
	
	// 예외프로세스를 여러개 넘기고자 할경우 구분자 | 를 넣는다 ( | 사용시 띄어쓰기 미사용 )
	// ex) exceptProc = "rc40app.exe|snippingtool.exe"; (최대 5개)
	var exceptProc = "";
	
	// 원격데스크톱 허용 : 0, 허용안함: 1
	// 심규석 프로 요청으로 원격데스크탑 허용으로 변경. Modified by sh.sam.lee @ 2023-10-23
	var bRemote = 0;
	
	// Function Policy Start
	var fPolicy = 0X00;
	
	// 캐시, 쿠키 삭제 유무
	// 적용 URL만 삭제 : 1, 삭제 안함 : 0, 전체 삭제 : 2
	var protectCache = 0;	

	// 이부분은 건들지 말것
	if( MA_EXCEPT_SAVE === 1 )			fPolicy = fPolicy | 0X01;
	if( MA_EXCEPT_PRINT === 1 )			fPolicy = fPolicy | 0X02;
	if( MA_EXCEPT_DEV === 1 )			fPolicy = fPolicy | 0X04;
	if( MA_EXCEPT_COPY === 1 )			fPolicy = fPolicy | 0X08;
	if( MA_EXCEPT_NOCTL === 1 )			fPolicy = fPolicy | 0X10;
	if( MA_EXCEPT_ALL === 1 )			fPolicy = fPolicy | 0X20;
	if( MA_EXCEPT_RBTN === 1 )			fPolicy = fPolicy | 0X40;
	if( MA_SEC_CLIPBOARD === 1 )		fPolicy = fPolicy | 0X80;
	if( MA_EXCEPT_WINDOW === 1 )		fPolicy = fPolicy | 0X100;
	// 0x100
	
	// Function Policy End
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	// ICP Policy Start
	var ICPOn				= g_ICPOn;							// ICP On : 1 / Off : 0	
	var ICPMessage			= MaBase64.encode(g_szICPMsg);		// ICP Print String
	var ICPType				= g_ICPType;
	var ICPOpacity			= g_iICPOpacity; 
	var ICPTextPercent		= g_iICPTextPercent;
	var ICPFont				= MaBase64.encode(g_ICPFont);
	var ICPDegree			= g_ICPDegree;
	var ICPPosXPercent		= g_ICPPosXPercent;
	var ICPPosYPercent		= g_ICPPosYPercent;
	
	var ICPTextPercent2		= g_ICPTextPercent2;
	var ICPPosXPercent2		= g_ICPPosXPercent2;
	var ICPPosYPercent2		= g_ICPPosYPercent2;
	
	var ICPPolicy			= "\"icpopt\":{\"on\":" + ICPOn +",\"message\":\""+ ICPMessage +"\",\"type\":" + ICPType +",\"opacity\":"+ ICPOpacity +",\"textpercent\":" + ICPTextPercent + ",\"font\":\"" + ICPFont + "\",\"degree\":" + ICPDegree + ",\"posxpercent\":" + ICPPosXPercent + ",\"posypercent\":" + ICPPosYPercent + ",\"textpercent2\":" + ICPTextPercent2 + ",\"posxpercent2\":" + ICPPosXPercent2 + ",\"posypercent2\":" + ICPPosYPercent2 +"}";
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	// Hook Policy Start
	var KbdHook		= 0;		// default : 0
	var mouseHook	= 0;		// default : 0
	var HookPolicy = "\"hookopt\":{\"kbd\":" + KbdHook + ",\"mouse\":" + mouseHook + "},";
	// Hook Policy End
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	//Policy = "\"fpolicy\":\""+ fPolicy.toString(16) + "\",\"imgsfopt\":{\"imgsfon\":"  + bImgsfOn + ",\"exceptvm\":"  + exceptVm + ",\"coveropt\":" + bCoverOpt + ",\"remote\":" + bRemote + ",\"dosubclass\":" + bSubclassing + ",\"exceptprocess\":\"" + exceptProc + "\"}," + HookPolicy + ICPPolicy;
	Policy = "\"protectcache\":" + protectCache + ",\"fpolicy\":\""+ fPolicy.toString(16) + "\",\"imgsfopt\":{\"imgsfon\":"  + bImgsfOn + ",\"exceptvm\":"  + exceptVm + ",\"coveropt\":" + bCoverOpt + ",\"remote\":" + bRemote + ",\"dosubclass\":" + bSubclassing + ",\"exceptprocess\":\"" + exceptProc + "\"}," + HookPolicy + ICPPolicy;
	
	bUseSave		= MA_EXCEPT_SAVE;
	bUseCopy		= MA_EXCEPT_COPY;

	return Policy;
}

// getWebDRMPacket() param 1 : load, 0 : unload
function getWebDRMPacket(i)
{ 
	var browser = get_browser();
	/*
	try
	{
		var caption = window.parent.document.title;
	}
	catch(e)
	{
		var caption = document.title;
	}
	*/

	var varBrowser;
	if( browser == 'Firefox' )					varBrowser = "F"; 
	else if( browser == "Chrome" )				varBrowser = "C"; 
	else if( browser == "Opera" )				varBrowser = "O"; 
	else if( browser == "EDGE" )				varBrowser = "E"; 
	else if( browser == "MSIE" )				varBrowser = "IE";
	else if( browser == "Safari" )				varBrowser = "S";
	else if( browser == "CEdge" )				varBrowser = "CE";
	
	// add x64
	else if( browser == "MSIEX64" )				varBrowser = "IE64"; 
	else if( browser == "ChromeX64" )			varBrowser = "C64"; 
	else if( browser == "FirefoxX64" )			varBrowser = "F64"; 
	else if( browser == "OperaX64" )			varBrowser = "O64"; 
	else if( browser == "CEdgeX64" )			varBrowser = "CE64"; 
	
	if(maeiem === true)
		varBrowser = "CEIEM";
	else if(maeiem64 === true)
		varBrowser = "CEIEM64";

	
	var caption = MaBase64.encode(maWebDrm.caption);
	if( browser == 'MSIE' )
	{
		if( get_browser_version() <10 )
			var charset = document.charset;
		else
			var charset = document.characterSet;
	}
	else
		var charset = document.characterSet;
	 
	var url = location.host + "/" + location.search;
	
	if( url.length > 80 )
	{
		var tmpUrl = url;
		url = "";
		 url = tmpUrl.substring(0, 80);
	}
	
	url = MaBase64.encode(url);
	
	if( i === 1 )
		var packet = "[{\"uid\":\"uid\",\"opcode\":\"sWebdrmLoad\",\"browserInfo\":\"" + varBrowser + "\",\"url\":\"" + url + "\",\"uniqueid\":\"" + szUniqueVal + "\",\"caption\":\"" + caption +"\",\"charset\":\"" + charset + "\"," + setMaPolicy() + "}][WEBDRMEOF]";
	else if( i === 0 )
		var packet = "[{\"uid\":\"uid\",\"opcode\":\"sWebdrmUnload\",\"browserInfo\":\"" + varBrowser + "\",\"url\":\"" + url + "\",\"uniqueid\":\"" + szUniqueVal + "\",\"caption\":\"" + caption +"\",\"charset\":\"" + charset + "\"," + setMaPolicy() + "}][WEBDRMEOF]";
	
	return packet;
}

function showInstallMsg(){
	var installPageMoveFlag = confirm(installMsg);
	if( installPageMoveFlag === false){
		if( bUseRandomStr === true )
		{
			try
			{
				getTopWindow().document.title = originalTitleName;
			}
			catch(err)
			{
				document.title = originalTitleName;
			}
		}
		if( MA_EXCEPT_RBTN == 0 )
			parent.document.oncontextmenu = function(){return true};
		if( MA_EXCEPT_COPY == 0 ){
			parent.document.ondragstart = function(){return true};
			parent.document.onselectstart = function(){return true};
		}
		if( MA_EXCEPT_SAVE === 0 )
		{
			window.onkeydown = function()
			{
				if (event.ctrlKey && event.keyCode == 83)
				{
				   event.keyCode = 0;
				   event.returnValue = true;
				}
			}
		}
		if( MA_EXCEPT_COPY === 0 )
		{
			window.onkeydown = function()
			{
				if (event.ctrlKey && event.keyCode == 67)
				{
				   event.keyCode = 0;
				   event.returnValue = true;
				}
			}
		}
		if( MA_EXCEPT_PRINT === 0 )
		{
			window.onkeydown = function()
			{
				if (event.ctrlKey && event.keyCode == 80)
				{
				   event.keyCode = 0;
				   event.returnValue = true;
				}
			}
		}
		if( MA_EXCEPT_DEV === 0 )
		{
			window.onkeydown = function()
			{
				if (event.keyCode == 123)
				{
				   event.keyCode = 0;
				   event.returnValue = true;
				}
			}
		}
	}else{
		sendInstallPage();
	}
}

function sendInstallPage()
{
	parent.document.location = getInstallPage();
}

function getXMLHttpRequest() {
	var xmlhttp = false;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				xmlhttp = false;
			}
		}
	}
	return xmlhttp;
};

function setUniqueTitle(){
	szUniqueVal = randomString(3); //TODO 왜 따로..또 날리죠

	if( bUseRandomStr === false )
	{
		try
		{
			szCaptionName = getTopWindow().document.title;
		}
		catch(err)
		{
			szCaptionName = document.title;
		}
		return szCaptionName;
	}
	
	try
	{
		originalTitleName = getTopWindow().document.title;
		
		if(originalTitleName.length == 0)
		{
			getTopWindow().document.title = location.host + szAddCaptionName + "[" + szUniqueVal + "]";
		}
		else
		{
			getTopWindow().document.title = originalTitleName + szAddCaptionName + "[" + szUniqueVal + "]";
		}
		szCaptionName = getTopWindow().document.title;
	}
	catch(e)
	{
		originalTitleName =  document.title;

		if(originalTitleName.length == 0)
		{
			document.title = location.host + szAddCaptionName + "[" + szUniqueVal + "]";
		}
		else
		{
			document.title = originalTitleName + szAddCaptionName + "[" + szUniqueVal + "]";
		}
		szCaptionName = document.title;
	}
	return szCaptionName;
}

function checkAgentVersion(agentResData){
	var versionCheckResult = -9000;			//시그니처가 없을 경우
	
	if( agentResData ){
		var iCheck = agentResData.lastIndexOf(MarkanySignature);
		if (iCheck >= 0)
		{
			var arrValue = agentResData.split(';');
			if (arrValue.length >= 1) {
				versionCheckResult = parseInt(arrValue[1]) - iVersion;
			}
		}
	}
	
	return versionCheckResult;
}

function checkInjectSuccess(str)
{
	var iCheck;
	iCheck = str.lastIndexOf('EIEM64');
	if(iCheck >= 0)
		maeiem64 = true;
	
	iCheck = str.lastIndexOf('EIEM32');
	if(iCheck >= 0)
		maeiem = true;
	
	iCheck = str.lastIndexOf('injectSuccess');
	return iCheck;
}
	
function sendPacket_WS()
{
	maResultCode = -5000;
	try{
		if ( masocket == undefined){
			masocket = new WebSocket( maWebDrm.uri );
			
			masocket.addEventListener("open", function(event){
				MDBG("ws:open", event);
				var sendMsg = "[{\"uid\":\"uid\",\"opcode\":\"gversion\"}][WEBDRMEOF]";
				//var sendMsg = "[{\"uid\":\"uid\",\"opcode\":\"gversion\",\"malic\":\"" + maLicense + "\",\"maurl\":\"" + userInfo.curl + "\"}][WEBDRMEOF]";
				masocket.send(sendMsg);
			});
		}

		masocket.addEventListener("message", function(event){
			var agentResData = event.data;
			
			if( maWebDrm.cmdType === "checkVersion" ){
				
				if(agentResData == maf ){
					document.location = maErrorPage + "?msg=" + 3001;
				}else{
					maResultCode = checkAgentVersion(agentResData);
					MDBG("agentVersion", maResultCode);
					if( maResultCode >= 0){
						maWebDrm.cmdType = "sendPoilcy";
						var packet = getWebDRMPacket(1);
						masocket.send( packet );
					}
					else if(maResultCode != -9000)
					{
						if( installMsgShowFlag === true )
						{
							alert(installMsg);
						}
						MDBG("sendPacket_WS sendInstallPage call : ", maResultCode);
						sendInstallPage();					
					}
				}
			}else if( maWebDrm.cmdType === "sendPoilcy" ){
				maResultCode = checkInjectSuccess(agentResData);
				MDBG("WebDRM End", "");
			}
			
			if( maResultCode < 0 ){
				MDBG("sendPacket_WS message_event", event);
				if(maResultCode != -9000 && maResultCode != -1)
				{				
					if( installMsgShowFlag === true )
					{
						alert(installMsg);
					}
					MDBG("sendPacket_WS message_event sendInstallPage call : ", maResultCode);
					if( agentResData != maf )
						sendInstallPage();
				}
			}
	    });

	    // Display any errors that occur
	    masocket.addEventListener("error", function(event) {
	    	MDBG("ws:error", event);
	    }); 
	    masocket.addEventListener("close", function(event) {
	    	MDBG("ws:close", event);
	    	//TODO
			// Def. Close Code 
			// 1006 : agent를 강제종료 했을 경우 (Server 의 소켓이 닫힐 경우)
			// 1001 : 보호대상 페이지를 벗어날 경우 또는 보호대상 페이지에서 다른 보호대상 페이지로 접속할 경우 (Client 의 소켓이 닫힐 경우) - firefox 에서만 발생
			// https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent 참고

			if( event.code == 1006 )
			{
				if(  maWebDrm.cmdType === "sendPoilcy" ){
					masocket = new WebSocket( maWebDrm.uri );
					parent.document.location = ErrorPage;
				}
			}
			if( event.code == 1005 )
				return;
			
			if( maResultCode < 0 ){

				if( installMsgShowFlag === true )
				{
					alert(installMsg);
				}
				sendInstallPage();
			}
			// WebDRM Agent를 강제종료 시켰을 경우 에러 페이지로 강제 전환시킨다. ( Code 1006 )
			/*if( event.code != 1001 )
			{
				//var url = document.location.href;
				//document.location = getErrorPage( url );
			}*/
	    });
	}catch(err){
		MDBG("WS err", err);
	}
}

function cb_CheckVersion(data)
{
	try{
		MDBG("data", data.version);
		
		if( data.version == 'LFAIL' )
		{
			alert("Markany License Failed!");
			location.href = "about:blank;";
		}
		if( data.version >= iVersion){
			bLoaded = true; // 2019-12-13 수정
			maWebDrm.cmdType = 'sendPoilcy';
			sendPacket_XHR();
		}
		else{
			if( installMsgShowFlag === true ){
				showInstallMsg();
				return;
			}
			sendInstallPage();
		}
	}catch(err){
		MDBG("catch", err);
		sendInstallPage();
	}
	MDBG("end", "");
}

function cb_CheckPolicy(data)
{
	try{
		MDBG("data", data.result);

		if(data.result == "licenseFailed")
			alert("License has Expired.");
	}catch(err){
		MDBG(" catch", err);
		//sendInstallPage();
	}
	MDBG("end", "");
}

function sendPacket_XHR()
{
	MDBG("start", "" );
	if( maWebDrm.cmdType === 'checkVersion' ){
		var sendMsg = "[{\"uid\":\"uid\",\"opcode\":\"gversion\"}][WEBDRMEOF]";
		//var sendMsg = "[{\"uid\":\"uid\",\"opcode\":\"gversion\",\"malic\":\"" + maLicense + "\",\"maurl\":\"" + userInfo.curl + "\"}][WEBDRMEOF]";
		maWebDrm.cbFun = "cb_CheckVersion";
	}else if(maWebDrm.cmdType === 'sendPoilcy' ){
		var sendMsg = getWebDRMPacket(1);
		maWebDrm.cbFun = "cb_CheckPolicy";
	}
	var param = "[WEBDRMV2]" + sendMsg;
	var url = maWebDrm.uri + "/?" + param;
	MDBG("maWebDrm.cmdType", maWebDrm.cmdType );
	
	if( maWebDrm.cmdType === 'checkVersion' ){
		$.ajax({
			url: url,
			dataType: 'jsonp',
			cache: false,
			jsonpCallback: maWebDrm.cbFun,
			timeout: 3*1000,
			success:function(data, status, err) {
			},
			error:function(data, status, err) {
				MDBG("err-status", status );
				MDBG("err-data", data );
				MDBG("err-err", err );
				
				if( installMsgShowFlag === true && maWebDrm.cmdType === "checkVersion"){
					showInstallMsg();
					return;
				}
				sendInstallPage();
			}
		});
	}else{
		$.ajax({
			url: url,
			dataType: 'jsonp',
			cache: false,
			jsonpCallback: maWebDrm.cbFun
		});
	}
}

/*!
madevtools-detect
https://github.com/sindresorhus/madevtools-detect
By Sindre Sorhus
MIT License
*/
/*
const madevtools = {
	isOpen: false,
	orientation: undefined,
};

const mathreshold = 160;

const maemitEvent = (isOpen, orientation) => {
	globalThis.dispatchEvent(new globalThis.CustomEvent('madevtoolschange', {
		detail: {
			isOpen,
			orientation,
		},
	}));
};

const mama = ({maemitEvents = true} = {}) => {
	const widthmathreshold = globalThis.outerWidth - globalThis.innerWidth > mathreshold;
	const heightmathreshold = globalThis.outerHeight - globalThis.innerHeight > mathreshold;
	const orientation = widthmathreshold ? 'vertical' : 'horizontal';

	if (
		!(heightmathreshold && widthmathreshold)
		&& ((globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized) || widthmathreshold || heightmathreshold)
	) {
		if ((!madevtools.isOpen || madevtools.orientation !== orientation) && maemitEvents) {
			maemitEvent(true, orientation);
		}

		madevtools.isOpen = true;
		madevtools.orientation = orientation;
	} else {
		if (madevtools.isOpen && maemitEvents) {
			maemitEvent(false, undefined);
		}

		madevtools.isOpen = false;
		madevtools.orientation = undefined;
	}
};
*/
function maWebDrmSupportCheck(osName, bsName) {
	var maWebDrmSupportFlag = false;

	var supportBsArr = maSupportingRangeArr[osName];
	if( supportBsArr != null ){
		
		for(var bs_i=0; bs_i<supportBsArr.length; bs_i++){
			if( supportBsArr[bs_i] === bsName ){
				maWebDrmSupportFlag = true;
				break;
			}
			
			// if( maWebDrmSupportFlag === false && bs_i == (supportBsArr.length - 1) ){
			if( bs_i == (supportBsArr.length - 1) ){
				MDBG(bsName + "은(는) 지원 불가능한 브라우져입니다.", "");
				maResultCode = 1001;
			}
		}
	}else{
		MDBG(osName + "은(는) 지원 불가능한 플렛폼입니다.", "");
		maResultCode = 1002;
	}
	return maWebDrmSupportFlag;
}

function getMaWebDrmConnectType() {
	return window.WebSocket ? 'wss' : 'xhr'
}

function getMaWebDrmUri() {
	let uri = null
	if (window.WebSocket) {
		if (userInfo.protocol === 'http:') {
			uri = 'ws://127.0.0.1:19891'
		} else {
			uri = 'wss://127.0.0.1:29891'
		}
	} else {
		if (userInfo.protocol === 'http:') {
			uri = 'http://127.0.0.1:15398'
		} else {
			uri = 'https://127.0.0.1:15397'
		}
	}
	return uri
}

function checkBrowserIsMSIE() {
	return (userInfo.bsName == 'MSIE' || userInfo.bsName == 'MSIEX64')
}

function MaLoad()
{
	MDBG("WebDRM Start", "");
	
	if( bLoaded )
	{
		bLoaded = false;
	}
	else
	{
		return;
	}
	
	if(checkBrowserIsMSIE())
	{
		if(checkIE() == false)
			sendInstallPage();
	}
	
	if(checkMobileDevice() === true && notSupportMobileCheck == true){
		document.location = maErrorPage + "?msg=" + 1002;
	}else if( checkMobileDevice() === true && notSupportMobileCheck == false ){
		return;
	}
	
	if( maWebDrmSupportCheck(userInfo.osName, userInfo.bsName) === false && checkMobileDevice() === false){
		if( notSupportPlatformCheck === true && maResultCode == 1002 ){
			document.location = maErrorPage + "?msg=" + maResultCode;
		}
		if(notSupportBsCheck === true && maResultCode == 1001){
			document.location = maErrorPage + "?msg=" + maResultCode;
		}

		return;
	}
			

	// 크롬101 업데이트후 xhr 체크안되는경우 대비해 wss 로 적용 2022-02-08--[
	maWebDrm.connectType = getMaWebDrmConnectType()
	maWebDrm.uri = getMaWebDrmUri()
	// if(window.WebSocket){
	// 	maWebDrm.connectType = 'wss';
	// 	if( userInfo.protocol === 'http:'){	
	// 		maWebDrm.uri = 'ws://127.0.0.1:19891';
	// 	}else{
	// 		maWebDrm.uri = 'wss://127.0.0.1:29891';
	// 	}
	// }else{
	// 	maWebDrm.connectType = 'xhr';	
	// 	if( userInfo.protocol === 'http:'){	
	// 		maWebDrm.uri = 'http://127.0.0.1:15398';
	// 	}else{
	// 		maWebDrm.uri = 'https://127.0.0.1:15397';
	// 	}
	// }
	
	/*maWebDrm.connectType = 'xhr';	
	if( userInfo.protocol === 'http:'){	 
		maWebDrm.uri = 'http://127.0.0.1:15398';
	}else{
		maWebDrm.uri = 'https://127.0.0.1:15397';
	}*/

	MDBG("maWebDrm.connectType =", maWebDrm.connectType);	
	MDBG("maWebDrm.uri =", maWebDrm.uri);
	// ]-- 크롬101 업데이트후 xhr 체크안되는경우 대비해 wss 로 적용 2022-02-08
	/*
	if(userInfo.bsName != "MSIEX64" && getBrowserName == "MSIE"){
		mama({maemitEvents: false});
	}
	*/
	maWebDrm.caption = setUniqueTitle();
	
	if( MA_EXCEPT_RBTN == 0 ){
		parent.document.oncontextmenu = function(){return false};
	}
	if( MA_EXCEPT_COPY == 0 ){
		parent.document.ondragstart = function(){return false};
		parent.document.onselectstart = function(){return false};
	}
	if( MA_EXCEPT_SAVE === 0 )
	{
		window.onkeydown = function()
		{
			if (event.ctrlKey && event.keyCode == 83)
			{
			   event.keyCode = 0;
			   event.returnValue = false;
			}
		}
	}
	if( MA_EXCEPT_COPY === 0 )
	{
		window.onkeydown = function()
		{
			if (event.ctrlKey && event.keyCode == 67)
			{
			   event.keyCode = 0;
			   event.returnValue = false;
			}
		}
	}
	if( MA_EXCEPT_PRINT === 0 )
	{
		window.onkeydown = function()
		{
			if (event.ctrlKey && event.keyCode == 80)
			{
			   event.keyCode = 0;
			   event.returnValue = false;
			}
		}
	}
	if( MA_EXCEPT_DEV === 0 )
	{
		window.onkeydown = function()
		{
			if (event.keyCode == 123)
			{
			   event.keyCode = 0;
			   event.returnValue = false;
			}
		}
		
		// try
		// {
			/*
			if(userInfo.bsName != "MSIEX64" && getBrowserName == "MSIE"){
				if(madevtools.isOpen == true){
					document.location = maErrorPage + "?msg=" + 2002;
				}
			}
			*/
			/*if(userInfo.bsName == "Chrome" || getBrowserName == "Opera")
			{
				var maelement = new Image();
				Object.defineProperty(maelement, 'id', {
				  get: function () {
					document.location = maErrorPage + "?msg=" + 2002;
				  }
				});
				console.log('%c', maelement);
			}*/
		// }
		// catch(e)
		// {			
			
		// }
	}
	
	maWebDrm.cmdType = "checkVersion";
	if( maWebDrm.connectType == 'xhr' ){
		sendPacket_XHR();
	}else{
		sendPacket_WS();
	}
	MDBG("maWebDrm", maWebDrm);
	
	maobject = new Object();
}

function MaUnload()
{
	MDBG("start", "");

	var unloadStartTime = new Date();
	var unloadCompleteFlag = false;
	
	if( maWebDrm.cmdType !== 'sendPoilcy' ){
		return;
	}
	
	if( maWebDrm.connectType === 'xhr' )
	{		
		
		if( get_browser() == 'MSIE' || get_browser() == 'MSIEX64' )
		{
			var packet = getWebDRMPacket(0);
			var meta = "[WEBDRMV2]" + packet;
			var url = maWebDrm.uri + "/?" + meta;

			var xhr = getXMLHttpRequest();
			xhr.open("GET", url, false);
			xhr.onload = function (e) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						MDBG("xhr.responseText", xhr.responseText);
						if( xhr.responseText == 'reConnection' ){
							MaUnload();
							return;
						}
						unloadCompleteFlag = true;
					} else {
						MDBG("#XMLHttpRequest_err", xhr);
					}
				}
			};
			xhr.onerror = function (e) {
				console.error("Err", xhr.statusText);
			};
			xhr.send(null);
			
			for(;;){
				if( unloadCompleteFlag == true || (new Date() - unloadStartTime) > 1500 ){
					MDBG("unloadCompleteFlag", unloadCompleteFlag);
					MDBG("unloadTime", (new Date() - unloadStartTime));
					break;
				}	
			}
		}
		else
		{
			var packet = getWebDRMPacket(0);
			var meta = "[WEBDRMV2]" + packet;
			var url = maWebDrm.uri + "/?" + meta;

			if (window.fetch) {
				fetch(url, {
					method: 'GET', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, cors, *same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'omit', // include, *same-origin, omit
					headers: {
						'Content-Type': 'text/plain'
					},
					redirect: 'follow', // manual, *follow, error
					referrer: 'no-referrer' // no-referrer, *client
					//body: JSON.stringify(data), // body data type must match "Content-Type" header
				})
				.then(function(data){
					console.log(data);
				}); // parses JSON response into native JavaScript objects  
			}

			//@TEST HCCHOI_EDGECHROME
			if( navigator.sendBeacon ) 
				navigator.sendBeacon(url);
			/*
			var packet = getWebDRMPacket(0);
			var meta = "[WEBDRMV2]" + packet;
			var url = maWebDrm.uri + "/?" + meta;

			var xhr = getXMLHttpRequest();
			xhr.open("GET", url, false);
			xhr.onload = function (e) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						MDBG("xhr.responseText", xhr.responseText);
						if( xhr.responseText == 'reConnection' ){
							MaUnload();
							return;
						}
						unloadCompleteFlag = true;
					} else {
						MDBG("#XMLHttpRequest_err", xhr);
					}
				}
			};
			xhr.onerror = function (e) {
				console.error("Err", xhr.statusText);
			};
			xhr.send(null);
			
			for(;;){
				if( unloadCompleteFlag == true || (new Date() - unloadStartTime) > 1500 ){
					MDBG("unloadCompleteFlag", unloadCompleteFlag);
					MDBG("unloadTime", (new Date() - unloadStartTime));
					break;
				}	
			}*/	
		}

		
	}
	else
	{
		try
		{
			var unloadPacket = getWebDRMPacket(0);
			masocket.send( unloadPacket );
			masocket.close();
		}
		catch(e)
		{			
			MDBG(e.toString());
		}
	}
	try
	{
		if( MA_EXCEPT_RBTN == 0 )
			parent.document.oncontextmenu = function(){return true};
	}
	catch(e)
	{
		if( MA_EXCEPT_RBTN == 0 )
			document.oncontextmenu = function(){return true};
	}
	
	if( bUseRandomStr === true )
	{
		try
		{
			getTopWindow().document.title = originalTitleName;
		}
		catch(err)
		{
			document.title = originalTitleName;
		}
	}
	MDBG("end", "");
}

function MaWebDRMStart(bIsAutoLoad)
{
	
	if( bIsAutoLoad === true ){
		$(document).ready(function(){
			MaLoad();
		});
	}

	if (window.attachEvent) {
		window.attachEvent("onunload", function() {
			MaUnload();
		});
	} else if (document.addEventListener) {      
		if( userInfo.bsName !== "Opera" ) 
		{
			window.addEventListener('unload', function(event) {
				MaUnload();
			});
		}
		else
		{         
			window.onbeforeunload = function() {
				MaUnload();
			};
		}
	}
}

MaWebDRMStart(bIsAutoLoad);

function cb_Crypto(data)
{
	try{
		//console.log("plain == " + data.plain + ", index == " + data.index);
		$(scopeObj[data.index]).replaceWith(MaBase64.decode(data.plain));
		
		
	}catch(err){
		
	}
}

function MaDec(val, sid)
{
	//scopeObj = $(val).get();
	scopeObj = $("."+val);

	var scopeCnt = scopeObj.length;
	//console.log("scopeCnt == " + scopeCnt);

	if( scopeCnt === 0 )
		return;

	if( scopeCnt >= 4 )
	{
		alert("암호화 태깅은 최대 3개까지 가능합니다.");
		return;
	}

	var maStartSign = "[WEBDRMV2]";
	var maEndSign = "[WEBDRMEOF]";
	
	maWebDrm.connectType = 'xhr';	
	if( userInfo.protocol === 'http:')
		maWebDrm.uri = 'http://127.0.0.1:15398';
	else
		maWebDrm.uri = 'https://127.0.0.1:15397';
	
	var maLoop = $.when();
	for(var i=0; i<scopeCnt; i++)
	{
		(function(maIndex){
			maLoop = maLoop.then(function(){
				var maPacketArr = new Array();
				var maPacket = new Object();
				maPacket.uid = "uid";
				maPacket.opcode = "dec";
				maPacket.macodedmsg = $(scopeObj[maIndex]).text();
				maPacket.nindex = maIndex;
				maPacket.sid = sid;
				maPacketArr.push(maPacket);

				var url = maWebDrm.uri + "/?" + maStartSign + JSON.stringify(maPacketArr) + maEndSign;
				
				return $.ajax({
					url: url,
					dataType: 'jsonp',
					cache: false,
					jsonpCallback: "cb_Crypto"
				});
			});
		})(i);
	}
}
