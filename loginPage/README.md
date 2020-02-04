
A simple login page.

## Features

- instant validation (only number and alphabet)

## Used Frameworks and Tools

- [Animate.css](https://github.com/daneden/animate.css)
- [Bootstrap-Vue](https://bootstrap-vue.js.org/)
- [Vue](https://vuejs.org/)
- [Axios](https://github.com/axios/axios)
- [httpbin](https://httpbin.org/)

## Test Mode

call motheds below in browser console.

- Test.LoginSucc()
- Test.LoginFail()

#### JSON

```js
{  // request
  "action" : "login"
  "account" : "testman",
  "password" : "123456789"
}
```
```js
{  //success
  "who" : "student",  // "student"||"teacher"||"admin"
  "userName" : "testman",
  "Class" : "CSIE110",
  "stats" : "success",
  "hash" : "testhash" 
}
```
```js
{  //fail
  "who" : "error",
  "userName" : "testman",
  "stats" : "fail",
  "hash" : "testhash"
}
```
