// 2020/02/04

class TestModeClass {
  constructor() {
    this.who = 'student';
    this.userName = 'testman';
    this.hash = 'testhash';
    this.ACpostURL = "https://httpbin.org/response-headers?freeform=%7B%22codeState%22%3A%22AC%22%2C%22errorMessage%22%3A%22%22%2C%22exeTime%22%3A%2290ms%22%2C%22errorOutputCompare%22%3A%22%22%2C%22OutputAvailable%22%3A%22false%22%2C%22wrongOutput%22%3A%22%22%2C%22expectedOutput%22%3A%22%22%2C%22memoryUsage%22%3A%22used%2072KB%22%2C%22verdictTime%22%3A%2211%3A59%3A59%20%202019%2F01%2F01%22%2C%22userName%22%3A%22testman%22%2C%22Class%22%3A%22CSIE110%22%2C%22hash%22%3A%22testhash%22%7D";
    this.CEpostURL = "https://httpbin.org/response-headers?freeform=%7B%22codeState%22%3A%22CE%22%2C%22errorMessage%22%3A%22compile%20error%2C%20code%3A%204906.%20...%22%2C%22exeTime%22%3A%22%22%2C%22errorOutputCompare%22%3A%22%22%2C%22OutputAvailable%22%3A%22false%22%2C%22wrongOutput%22%3A%22%22%2C%22expectedOutput%22%3A%22%22%2C%22memoryUsage%22%3A%22%22%2C%22verdictTime%22%3A%2211%3A59%3A59%20%202019%2F01%2F01%22%2C%22userName%22%3A%22testman%22%2C%22Class%22%3A%22CSIE110%22%2C%22hash%22%3A%22testhash%22%7D";
    this.TLEpostURL = "https://httpbin.org/response-headers?freeform=%7B%22codeState%22%3A%22TLE%22%2C%22errorMessage%22%3A%22%22%2C%22exeTime%22%3A%225000ms%22%2C%22errorOutputCompare%22%3A%22%22%2C%22OutputAvailable%22%3A%22false%22%2C%22wrongOutput%22%3A%22%22%2C%22expectedOutput%22%3A%22%22%2C%22memoryUsage%22%3A%22%22%2C%22verdictTime%22%3A%2211%3A59%3A59%20%202019%2F01%2F01%22%2C%22userName%22%3A%22testman%22%2C%22Class%22%3A%22CSIE110%22%2C%22hash%22%3A%22testhash%22%7D";
    this.WApostURL = "https://httpbin.org/response-headers?freeform=%7B%22codeState%22%3A%22WA%22%2C%22errorMessage%22%3A%22%22%2C%22exeTime%22%3A%2290ms%22%2C%22errorOutputCompare%22%3A%22%22%2C%22OutputAvailable%22%3A%22true%22%2C%22wrongOutput%22%3A%220%22%2C%22expectedOutput%22%3A%223%22%2C%22memoryUsage%22%3A%22used%2072KB%22%2C%22verdictTime%22%3A%2211%3A59%3A59%20%202019%2F01%2F01%22%2C%22userName%22%3A%22testman%22%2C%22Class%22%3A%22CSIE110%22%2C%22hash%22%3A%22testhash%22%7D";
    this.MLEpostURL = "https://httpbin.org/response-headers?freeform=%7B%22codeState%22%3A%22MLE%22%2C%22errorMessage%22%3A%22%22%2C%22exeTime%22%3A%2290ms%22%2C%22errorOutputCompare%22%3A%22%22%2C%22OutputAvailable%22%3A%22false%22%2C%22wrongOutput%22%3A%22%22%2C%22expectedOutput%22%3A%22%22%2C%22memoryUsage%22%3A%22used%2050000KB%22%2C%22verdictTime%22%3A%2211%3A59%3A59%20%202019%2F01%2F01%22%2C%22userName%22%3A%22testman%22%2C%22Class%22%3A%22CSIE110%22%2C%22hash%22%3A%22testhash%22%7D";
  }
  Login() {
    localStorage.setItem("who", this.who);
    localStorage.setItem("userName", this.userName);
    localStorage.setItem("hash", this.hash);
    location.reload();
  }
  Logout() {
    localStorage.clear();
    location.reload();
  }
  SubmitAC() {
    postURL = this.ACpostURL;  // postURL declared in problem.js #187
    document.getElementById('submitBtn').click();
  }
  SubmitCE() {
    postURL = this.CEpostURL;
    document.getElementById('submitBtn').click();
  }
  SubmitTLE() {
    postURL = this.TLEpostURL;
    document.getElementById('submitBtn').click();
  }
  SubmitWA() {
    postURL = this.WApostURL;
    document.getElementById('submitBtn').click();
  }
  SubmitMLE() {
    postURL = this.MLEpostURL;
    document.getElementById('submitBtn').click();
  }
}

var Test = new TestModeClass();
testMode = true;  // declared in problem.js #188

// // AC
// {"codeState":"AC","errorMessage":"","exeTime":"90ms","errorOutputCompare":"","OutputAvailable":"false","wrongOutput":"","expectedOutput":"","memoryUsage":"used 72KB","verdictTime":"11:59:59  2019/01/01","userName":"testman","Class":"CSIE110","hash":"testhash"}

// //CE
// {"codeState":"CE","errorMessage":"compile error, code: 4906. ...","exeTime":"","errorOutputCompare":"","OutputAvailable":"false","wrongOutput":"","expectedOutput":"","memoryUsage":"","verdictTime":"11:59:59  2019/01/01","userName":"testman","Class":"CSIE110","hash":"testhash"}

// //TLE
// {"codeState":"TLE","errorMessage":"","exeTime":"5000ms","errorOutputCompare":"","OutputAvailable":"false","wrongOutput":"","expectedOutput":"","memoryUsage":"","verdictTime":"11:59:59  2019/01/01","userName":"testman","Class":"CSIE110","hash":"testhash"}

// //WA
// {"codeState":"WA","errorMessage":"","exeTime":"90ms","errorOutputCompare":"","OutputAvailable":"true","wrongOutput":"0","expectedOutput":"3","memoryUsage":"used 72KB","verdictTime":"11:59:59  2019/01/01","userName":"testman","Class":"CSIE110","hash":"testhash"}

// //MLE
// {"codeState":"MLE","errorMessage":"","exeTime":"90ms","errorOutputCompare":"","OutputAvailable":"false","wrongOutput":"","expectedOutput":"","memoryUsage":"used 50000KB","verdictTime":"11:59:59  2019/01/01","userName":"testman","Class":"CSIE110","hash":"testhash"}
