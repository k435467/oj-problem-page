// 2020/02/04
class TestModeClass {
  constructor() {
    this.loginSuccPostURL = "https://httpbin.org/response-headers?freeform=%7B%22who%22%20%3A%20%22student%22%2C%22userName%22%20%3A%20%22testman%22%2C%22stats%22%20%3A%20%22success%22%2C%22hash%22%20%3A%20%22testhash%22%7D";
    this.loginFailPostURL = "https://httpbin.org/response-headers?freeform=%7B%22who%22%20%3A%20%22error%22%2C%22userName%22%20%3A%20%22amagood%22%2C%22stats%22%20%3A%20%22fail%22%2C%22hash%22%20%3A%20%22testhash%22%7D";
  }
  LoginSucc() {
    postURL = this.loginSuccPostURL;  // postURL declared in login.js #8
    document.getElementById('loginBtn').click();
  }
  LoginFail() {
    postURL = this.loginFailPostURL;
    document.getElementById('loginBtn').click();
  }
}

var Test = new TestModeClass();
testMode = true;  // declared in login.js #9

// success
// {"who" : "student","userName" : "testman","stats" : "success","hash" : "testhash"}

// fail
// {"who" : "error","userName" : "testman","stats" : "fail","hash" : "testhash"}
