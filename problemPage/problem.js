// 2020/02/04
// appNavbar


var appNavbar = new Vue({
  el: "#appNavbar"
})


// appEditorConfig for lang, copy toolip, copy popup, theme, tab


var appEditorConfig = new Vue({
  el: "#appEditorConfig",
  data: {
    langDisplay: "C++",
    showCopyPopup: false,
    themeSelected: "tomorrow",
    themeOptions: [
      { text: "----------Bright----------", disabled: true },
      { text: "chrome" },
      { text: "clouds" },
      { text: "crimson_editor" },
      { text: "dawn" },
      { text: "dreamweaver" },
      { text: "eclipse" },
      { text: "github" },
      { text: "iplastic" },
      { text: "solarized_light" },
      { text: "textmate" },
      { text: "tomorrow" },
      { text: "xcode" },
      { text: "kuroir" },
      { text: "katzenmilch" },
      { text: "sqlserver" },
      { text: "-----------Dark-----------", disabled: true },
      { text: "ambiance" },
      { text: "chaos" },
      { text: "clouds_midnight" },
      { text: "dracula" },
      { text: "cobalt" },
      { text: "gruvbox" },
      { text: "gob" },
      { text: "idle_fingers" },
      { text: "kr_theme" },
      { text: "merbivore" },
      { text: "merbivore_soft" },
      { text: "mono_industrial" },
      { text: "monokai" },
      { text: "pastel_on_dark" },
      { text: "solarized_dark" },
      { text: "terminal" },
      { text: "tomorrow_night" },
      { text: "tomorrow_night_blue" },
      { text: "tomorrow_night_bright" },
      { text: "tomorrow_night_eighties" },
      { text: "twilight" },
      { text: "vibrant_ink" }
    ]
  },
  methods: {
    clickLang(langDisplay, selectedLang) {
      this.langDisplay = langDisplay;
      submitObj.language = selectedLang;
      if (selectedLang == "python") {
        editor.session.setMode("ace/mode/python");
        appUploadFile.showHeaderFile = false;
        appUploadFile.headerFile = null;
      } else {
        editor.session.setMode("ace/mode/c_cpp");
        appUploadFile.showHeaderFile = true;
      }
    },
    clickTheme() {
      var acePath = 'ace/theme/' + this.themeSelected;
      editor.setTheme(acePath);
    },
    openTab(id) {
      var i = 0;
      var tabContent = document.getElementsByClassName("tabContent");
      for (i=0; i<tabContent.length; i++) {
        tabContent[i].style.display = "none";
      }
      document.getElementById(id).style.display = "block";
      appUploadFile.uploadFileMode = (id == "uploadFileTab");
    }
  }
})


// FileReader


var maxFileAmount = 10;
var mainFileReader = new FileReader();
var implementFileReaders = [];
var headerFileReaders = [];
function creatFileReaders() {
  var i = 0;
  for (i=0; i<maxFileAmount; i++) {
    implementFileReaders[i] = new FileReader();
    headerFileReaders[i] = new FileReader();
  }
}
function readMainFileContent() {
  if (appUploadFile.mainFile != null)
    mainFileReader.readAsText(appUploadFile.mainFile);
}
function readImplementFileContent() {
  var i = 0;
  for (i=0; i<maxFileAmount; i++)
    if (appUploadFile.implementFile != null && appUploadFile.implementFile[i] != undefined)
      implementFileReaders[i].readAsText(appUploadFile.implementFile[i]);
}
function readHeaderFileContent() {
  var i = 0;
  for (i=0; i<maxFileAmount; i++)
    if (appUploadFile.headerFile != null && appUploadFile.headerFile[i] != undefined)
      headerFileReaders[i].readAsText(appUploadFile.headerFile[i]);
}


// appUploadFile


var appUploadFile = new Vue({
  delimiters: ['${', '}'],
  el: "#appUploadFile",
  data: {
    uploadFileMode: false,
    showHeaderFile: true,
    showImplementFilesInvalidMsg: false,
    showHeaderFilesInvalidMsg: false,
    mainFile: null,
    implementFile: null,
    headerFile: null,
    implementFilesInvalidMsg: "",
    headerFilesInvalidMsg: ""
  },
  methods: {
    checkMainFile() {
      readMainFileContent();
    },
    checkImplementFiles() {
      if (this.implementFile != null && this.implementFile.length > maxFileAmount) {
        this.showImplementFilesInvalidMsg = true;
        this.implementFilesInvalidMsg = "files: exceed " + maxFileAmount.toString() + " files!";
      } else {
        this.showImplementFilesInvalidMsg = false;
        readImplementFileContent();
      }
    },
    checkHeaderFiles() {
      if (this.headerFile != null && this.headerFile.length > maxFileAmount) {
        this.showHeaderFilesInvalidMsg = true;
        this.headerFilesInvalidMsg = "header files: exceed " + maxFileAmount.toString() + " files!";
      } else {
        this.showHeaderFilesInvalidMsg = false;
        readHeaderFileContent();
      }
    }   
  }
})


// request and response object


var submitObj = {
  "action": "submit_code",
  "qID": "",
  "language": "cpp",
  "fileAmount": 0,
  "file":
  {
    "file1": ""
  },
  "headerFileAmount": 0,
  "headerFile":
  {
    "file1": ""
  },
  "userName" : "",
  "Class" : "",
  "hash": ""
}
var postURL = "submit/"
var testMode = false
var tmpObj = {}
function copyFileStringsToSubmitObj() {
  submitObj.file["file1"] = mainFileReader.result;
  if (appUploadFile.mainFile == null)
    submitObj.file["file1"] = "";
  var i = 0;
  for (i=0; i<maxFileAmount; i++) {
    if (appUploadFile.implementFile != null && appUploadFile.implementFile.length > 0) {
      if (implementFileReaders[i].result != null && i < appUploadFile.implementFile.length)
        submitObj.file["file"+(i+2)] = implementFileReaders[i].result;
      else
        delete submitObj.file["file"+(i+2)];
    } else {
      delete submitObj.file["file"+(i+2)];
    }
    if (appUploadFile.headerFile != null && appUploadFile.headerFile.length > 0) {
      if (headerFileReaders[i].result != null && i < appUploadFile.headerFile.length)
        submitObj.headerFile["file"+(i+1)] = headerFileReaders[i].result;
      else
        delete submitObj.headerFile["file"+(i+1)];
    } else {
      delete submitObj.headerFile["file"+(i+1)];
    }
  }
}


// appSubmit for submit


var appSubmit = new Vue({
  delimiters: ['${', '}'],
  el: "#appSubmit",
  data: {
    showSpinner: false,
    codeState: "",
    errorMessage: "",
    exeTime: "",
    errorOutputCompare: "",
    OutputAvailable: false,
    htmlWrongOutput: "",
    htmlExpectedOutput: "",
    memoryUsage: "",
    verdictTime: "",
    hash: "",
    showAC: false,
    showCE: false,
    showTLE: false,
    showWA: false,
    showMLE: false,
    showERR: false
  },
  methods: {
    submitCode() {
      document.getElementById("submitBtn").setAttribute("disabled", "disabled");
      this.showSpinner = true;
      if (appUploadFile.uploadFileMode) {
        copyFileStringsToSubmitObj();
        if (appUploadFile.implementFile != null)
          submitObj.fileAmount = 1 + appUploadFile.implementFile.length;
        else
          submitObj.fileAmount = 1;
        if (appUploadFile.headerFile != null)
          submitObj.headerFileAmount = appUploadFile.headerFile.length;
        else
          submitObj.headerFileAmount = 0;
      } else {
        submitObj.fileAmount = 1;
        submitObj.file.file1 = editor.getValue();
        submitObj.headerFileAmount = 0;
      }
      this.showAC = false;
      this.showCE = false;
      this.showTLE = false;
      this.showWA = false;
      this.showMLE = false;
      this.showERR = false;
      axios.post(postURL, submitObj)
        .then(function (response) {
          console.log(response);
          appSubmit.showSpinner = false;
          if (testMode)
            tmpObj = JSON.parse(response.data.freeform);
          else
            tmpObj = response.data; console.log(tmpObj);
          appSubmit.codeState           = tmpObj.codeState;
          appSubmit.errorMessage        = tmpObj.errorMessage;
          appSubmit.exeTime             = tmpObj.exeTime;
          appSubmit.errorOutputCompare  = tmpObj.errorOutputCompare;
          appSubmit.OutputAvailable     = (tmpObj.OutputAvailable == "true");
          appSubmit.htmlWrongOutput     = '<pre id="wrongOutput" class="samplePre2">' + tmpObj.wrongOutput + '</pre>';
          appSubmit.htmlExpectedOutput  = '<pre id="expectedOutput" class="samplePre2">' + tmpObj.expectedOutput + '</pre>';
          appSubmit.memoryUsage         = tmpObj.memoryUsage;
          appSubmit.verdictTime         = tmpObj.verdictTime;
          appSubmit.hash                = tmpObj.hash;
          appSubmit["show" + tmpObj.codeState] = true;
        })
        .catch(function (error) {
          appSubmit.showSpinner = false;
          console.log(error);
          appSubmit.showERR = true;
        })
      setTimeout(function () {document.getElementById("submitBtn").removeAttribute("disabled");}, 2000);
    }
  },
})


// Onload


var userInfo = {
  "who" : "",
  "userName" : "",
  "hash" : ""
}

window.onload = function() {
  appEditorConfig.openTab("codeEditorTab");
  userInfo.who = localStorage.getItem("who");
  userInfo.userName = localStorage.getItem("userName");
  userInfo.hash = localStorage.getItem("hash");
  this.console.log(userInfo);
  submitObj.userName = userInfo.userName;
  submitObj.hash = userInfo.hash;
  if (submitObj.userName == null || submitObj.hash == null) {
    document.getElementById("submitBtn").setAttribute("disabled", "disabled");
    document.getElementById("submitBtn").textContent = "Login before submit";
  }
  submitObj.qID = qID;
  editor.setValue(initCode);
  document.getElementsByTagName("body")[0].className = "w3-animate-opacity";
  document.getElementById("appNavbar").className = "w3-animate-top";
  document.getElementById("mainBlock1").className = "mainBlock1 w3-animate-zoom";
  document.getElementById("mainBlock2").className = "mainBlock2 w3-animate-bottom";
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  creatFileReaders();
}


// copy function


function copyFn(id) {
  var val = document.getElementById(id);
  window.getSelection().selectAllChildren(val);
  document.execCommand("Copy");
  appEditorConfig.showCopyPopup = true;
  setTimeout(function () { appEditorConfig.showCopyPopup = false; }, 1500);
}


// set aceEditor


ace.config.set("basePath", "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/");
var editor = ace.edit("aceEditor");
editor.setTheme("ace/theme/tomorrow");
editor.session.setMode("ace/mode/c_cpp");
editor.session.setUseSoftTabs(true);
editor.setShowPrintMargin(false);
editor.setOption("scrollPastEnd", 0.5)
editor.setOption("enableBasicAutocompletion", true)
editor.setOption("enableLiveAutocompletion", true)
var aceEditorFontSize = 18;
editor.commands.addCommand({
  name: 'myCommandInc',
  bindKey: { win: 'Ctrl-+', mac: 'Command-+' },
  exec: function (editor) {
    if (aceEditorFontSize < 40) {
      aceEditorFontSize += 2;
      document.getElementById('aceEditor').style.fontSize = aceEditorFontSize + 'px';
    }
  },
  readOnly: true
});
editor.commands.addCommand({
  name: 'myCommandInc2',
  bindKey: { win: 'Ctrl-=', mac: 'Command-=' },
  exec: function (editor) {
    if (aceEditorFontSize < 40) {
      aceEditorFontSize += 2;
      document.getElementById('aceEditor').style.fontSize = aceEditorFontSize + 'px';
    }
  },
  readOnly: true
});
editor.commands.addCommand({
  name: 'myCommandDec',
  bindKey: { win: 'Ctrl--', mac: 'Command--' },
  exec: function (editor) {
    if (aceEditorFontSize > 2) {
      aceEditorFontSize -= 2;
      document.getElementById('aceEditor').style.fontSize = aceEditorFontSize + 'px';
    }
  },
  readOnly: true
});
var dom = require("ace/lib/dom");
editor.commands.addCommand({
  name: 'Toggle Fullscreen',
  bindKey: "F11",
  exec: function (editor) {
    var fullScreen = dom.toggleCssClass(document.body, "fullScreen")
    dom.setCssClass(editor.container, "fullScreen", fullScreen)
    editor.setAutoScrollEditorIntoView(!fullScreen)
    editor.resize()
  },
  readOnly: true
});


// dragbar


var aceEditorContainer = document.getElementById("aceEditorContainer")
var bar = document.getElementById("dragbar")

const drag = (e) => {
  document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
  aceEditorContainer.style.height = (e.clientY - aceEditorContainer.getBoundingClientRect().top) + 'px';
  editor.resize();
}

bar.addEventListener('mousedown', () => {
  document.addEventListener('mousemove', drag);
});

bar.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', drag);
});
