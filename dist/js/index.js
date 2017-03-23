/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bgCanvas = document.querySelector("#bg-canvas");
var bgCanvasWrapper = document.querySelector("#bg-canvas-wrapper");
var dragLayer = document.querySelector("#drag-layer");

if (!bgCanvas.getContext) {
  throw "your browser do not support canvas api";
}
var bgContext = bgCanvas.getContext("2d");

// print rect
// ctx.fillRext(x, y, width, height)
// ctx.strokeRect(x, y, width, height)
// ctx.clearRect(x, y, width, height)
// ctx.lineWidth = 10
// ctx.lineCap = "butt | round | square"
// ctx.lineJoin=  "round | bevel | miter"
var bgImg = document.querySelector("#bg-img");
bgImg.onload = function (e) {
  var imgData = document.querySelector("#img-data");
  imgData.innerHTML = "width: " + this.width + "<br/>height: " + this.height;
  // NOTE: canvas's content will be clear when you reset the width or height attribute
  bgCanvas.width = this.width;
  bgCanvas.height = this.height;
  bgContext.drawImage(bgImg, 0, 0);
  bgCanvas.style.display = "block";
};
// NOTE: this operation will draw the whole image and may stretch the image
// bgContext.drawImage(bgImg, 0, 0, 200, 300)
var isCreatingSprite = false;
var startX = void 0,
    startY = void 0;
var sprite = void 0;
var paintCount = 0;
bgCanvasWrapper.onmousedown = function (_ref) {
  var offsetX = _ref.offsetX,
      offsetY = _ref.offsetY,
      button = _ref.button;

  if (button !== 0 || !ctrlDown) {
    return;
  }
  isCreatingSprite = true;
  startX = offsetX;
  startY = offsetY;
  sprite = document.createElement("div");
  sprite.setAttribute("class", "sprite");
  sprite.style.left = startX + "px";
  sprite.style.top = startY + "px";
  bgCanvasWrapper.append(sprite);
};
bgCanvasWrapper.onmousemove = function (_ref2) {
  var offsetX = _ref2.offsetX,
      offsetY = _ref2.offsetY,
      button = _ref2.button;

  if (button !== 0 || !ctrlDown) {
    return;
  }
  if (!isCreatingSprite) {
    return;
  }
  var width = offsetX - startX;
  var height = offsetY - startY;
  sprite.style.width = width + "px";
  sprite.style.height = height + "px";
};
bgCanvasWrapper.onmouseup = function (_ref3) {
  var offsetX = _ref3.offsetX,
      offsetY = _ref3.offsetY,
      button = _ref3.button;

  if (button !== 0 || !ctrlDown) {
    return;
  }
  isCreatingSprite = false;
  sprite = null;
};

var ctrlDown = false;
window.onkeydown = function (e) {
  // e.preventDefault()
  if (!ctrlDown && e.ctrlKey) {
    ctrlDown = true;
    dragLayer.style.display = "block";
  }
};
window.onkeyup = function (e) {
  // e.preventDefault()
  if (ctrlDown && !e.ctrlKey) {
    ctrlDown = false;
    dragLayer.style.display = "none";
  }
};

/***/ })
/******/ ]);