export default {

    /**
     * 오즈 레포트 오픈
     * rest api 주소, 레포트명을 받아서 레포트를 팝업으로 오픈 함

     * @function openOzReport
     * @param  {string} reportNm
     * @param  {string} jsonUrl
     * @param  {string} jsopageIdnUrl
     * @param  {string} dataServiceId
     */
        openOzReportNoDigit(reportNm, jsonUrl, pageId, dataServiceId) {
        
        if(pageId==null || pageId==''){
            utils.messageBox('warning', utils.getMessageById('MSG_ALT_REPORT_REQ_PAGE_ID'));
            return false;
        };

        let url = '';
        let modifyJsonUrl = '';

        if (utils.startsWith(window.location.href, 'https')) {
            url = `https://${window.location.host}/report/ozReport.html`;
        } else {
            url = `http://${window.location.host}/report/ozReport.html`;
        }
        
        const name = "Oz Report";
        const option = "width = 1000, height = 800, top = 100, left = 200, location = no";

        if ( jsonUrl.match('&')) {
            modifyJsonUrl = jsonUrl.replace(/&/g, "!^!"); 
        }else{
            modifyJsonUrl = jsonUrl; 
        }
        url += "?reportNm=" + reportNm + "&jsonUrl=" + modifyJsonUrl + "&pageId=" +pageId + "&dataServiceId=" +dataServiceId;

        window.open(url, name, option);

    },
    /**
     * 오즈 레포트 오픈
     * rest api 주소, 레포트명을 받아서 레포트를 팝업으로 오픈 함

     * @function openOzReport
     * @param  {string} reportNm
     * @param  {string} jsonUrl
     * @param  {string} jsopageIdnUrl
     * @param  {string} dataServiceId
     * @param  {string} digitType
     */
    openOzReport(reportNm, jsonUrl, pageId, dataServiceId, digitType) {
  
        if(pageId==null || pageId=='' ){
            utils.messageBox('warning', utils.getMessageById('MSG_ALT_REPORT_REQ_PAGE_ID'));
            return false;
        };
        if(digitType==null || digitType==''){
            utils.messageBox('warning', utils.getMessageById('MSG_ALT_REPORT_REQ_NUMBER_DIGIT'));
            return false;
        };

        let url = '';
        let modifyJsonUrl = '';
        digitType = digitType.replace(/#/g,"a");
        if (utils.startsWith(window.location.href, 'https')) {
            url = `https://${window.location.host}/report/ozReport.html`;
        } else {
            url = `http://${window.location.host}/report/ozReport.html`;
        }
        
        const name = "Oz Report";
        const option = "width = 1000, height = 800, top = 100, left = 200, location = no";

        if ( jsonUrl.match('&')) {
            modifyJsonUrl = jsonUrl.replace(/&/g, "!^!"); 
        }else{
            modifyJsonUrl = jsonUrl; 
        }
        url += "?reportNm=" + reportNm + "&jsonUrl=" + modifyJsonUrl+ "&pageId=" + pageId +
         "&dataServiceId=" + dataServiceId + "&digitType=" + digitType;
        
        window.open(url, name, option);

    },

};