

const config = require("./config.js");



function getOpenID() {
  return wx.getStorageSync("OpenId");
}

function setOpenID(OpenId) {
  return wx.setStorageSync("OpenId", OpenId)
}

function isBindEmp() {
  return wx.getStorageSync("IsBindEmp")
}

function setBindEmp(IsBindEmp) {
  return wx.setStorageSync("IsBindEmp", IsBindEmp)
}

function setCookie1(cookiesString) {

    wx.setStorageSync("cookie", cookiesString);

}

function getCookieString1() {
  return wx.getStorageSync("cookie")
}

// Cookie管理
function setCookie(cookiesString) {

   const cookies = cookiesString.split(/,(?=[A-Z|\.])/g)
    console.log(cookies)
  const arrCookies = {};
  console.log("now save Cookie:");

  cookies.map((value, index) => {
    /* 
    取Cookie的主键，第一个=号之前的字符串
    如果savedCookies中有此主键，覆盖，没有，则添加
    */
    const items = value.split(";");
    if (items && items.length == 0)
      return;

    const data = items[0].split("=");
    if (data && data.length == 0)
      return;

    var key = data[0];

    arrCookies[key] = value;

  });

  var arrCookiesExist = getCookie();
  console.log(arrCookiesExist);

  if (arrCookiesExist && arrCookiesExist != null) {

    Object.assign(arrCookies, arrCookiesExist);
  }
  /**
   * 
   */
//   var cookiearr={}
//   for(var item in arrCookies){
//     cookiearr[item]=arrCookies[item].replace(/;.*$/,'');
//   }

  wx.setStorageSync("cookie", arrCookies);
  wx.setStorageSync("cookieTimeStamp", Date.parse(new Date()));
}


function getCookie() {
  return wx.getStorageSync("cookie")
}

function getCookieString() {
  var arrCookiesExist = getCookie();
  var arrCookiesExistValue = Object.values(arrCookiesExist);

  var result = "";

  for (var i = 0; i < arrCookiesExistValue.length; i++) {
    if (result.length > 0)
      result += ";";

    result += arrCookiesExistValue[i].replace(/;/g,",");
  }
//   console.log(result)
  return result;
// return "Abp.Localization.CultureName=zh-CN; HT.PartID=abe2d2c9-3246-4fbf-bd63-a1027fe0c053; HT.PartDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8; HT.ShopID=e9786c53-6227-49c6-8fd1-2a9638e3d538; HT.ShopDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e5%ba%97; .AspNet.ApplicationCookie=5ydlQ_PMHlLW_a-1oRAkWC3ikJgJiqZClyCYYDb9NEf17wE1NM2AMSdYwqMkiBFcGaL7twHF1QreFcLslr6ZqeBxxyEAxLUytcoCUfbJWIE6jv0vwGflvB3Bzn0CcbqwS91Bp-z0IjQTeVWhlFzr-f8IEBI81iPstiXQJzuZcqjefeV3Pi2l69-3prj7M0aoSx2yEZmUtjr7OQ9qnHu-Op6tB9IbmVKdf3DPG5__Vu17UZNVdfDxa6APkCgCeIZH0YQKIC83qgdzQI7peVLne2QRY5wFe9V843uvn3vhFX9t4x0jc_4QyGSCAUXMoseQWLV6c0RT0nKy1Ar5G3dxE_Aj5E_pTr15pPMBdEX3mVfMgc9gtPxi8ewGQVhjQzMqmdtR8BMnr7EMDFcNeQ_QYhFvP2_-UXsrEyRnkcKKYZsyyKli3VM0ihOZQWmTH2jotj3UOlZqYyLHprgH77qs9MCp5LHIeIF1lKGtv3LXFFQ8n5AAXwfDtePo2QE-pkMUcNzEpJ63TiqWRiYfFg8OsElPlhJozK-pKC1DIqHR8dfSnTdXLACyK4F16AchS5AN8t_EaT1RVWjLZLcQPTkkj8UsUnfTLETAU_IXXU6b6odfydDvCiUKY1IugnLZ56Jf; ASP.NET_SessionId=3gjvbcw0vylvmwlloyj3gknz; __RequestVerificationToken_L1N1bnA1=1CUzyXsQbzSihykUF1BfCVgO-JDUKjq04Hj-p7dm8PLRM235UhpQMQk4bMrwgow9Xm-37aZdulvZcrk7fPKzZjSfzTR7ZeRR-G7FzwznL_s1; JSESSIONID=9EDB6234B7B47FC43233E5C110591963; atlassian.xsrf.token=B5I5-QD1J-MCPA-T2MD_225dbe26b121c0ce7a125e59b2e770697b102fba_lin; XSRF-TOKEN=4efAeQRwwAZBe8Ry6R1A29j_JkR76gftPDn1Xvh5M2gpFAhuve2r7AUjIPIaIoldRDJKauNPBICpmyc-17EG7Z51WRNlQ09yvbh_852CRFiVmrS-DhmCMzC0hTZd1uispfGsqfsqwrAKcLCdXrJn1Q2"

}

function removeLocalCookie() {
  wx.removeStorageSync("cookie");
  wx.removeStorageSync("cookieTimeStamp");
  console.log("remove cookie!");
}


function checkCookieTimeout() {

  var cookie = getCookie();
  if (cookie == null || cookie == "undefined") {
    console.log("cookie is empty");
    return false;
  }

  var cookieTimeStamp = wx.getStorageSync("cookieTimeStamp");
  var nowTimeStamp = Date.parse(new Date());
  // console.log(cookieTimeStamp);
  // console.log(nowTimeStamp)

  if (nowTimeStamp - cookieTimeStamp >= config.CookeTimeout * 60 * 1000) {
    removeLocalCookie();
    return false;
  }

  return true
}


module.exports = {
  setCookie,
  getCookie,
  getCookieString,
  removeLocalCookie,
  checkCookieTimeout,
  getOpenID,
  setOpenID,
  isBindEmp,
  setBindEmp
}
