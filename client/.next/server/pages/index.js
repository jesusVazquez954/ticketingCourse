"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst indexPage = ({ currentUser  })=>{\n    console.log(currentUser);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"Landing page\"\n    }, void 0, false, {\n        fileName: \"/home/bv/Documents/microServices/ticketProject/client/pages/index.js\",\n        lineNumber: 5,\n        columnNumber: 12\n    }, undefined);\n};\nindexPage.getInitialProps = ()=>{\n    try {\n        const response = axios__WEBPACK_IMPORTED_MODULE_1___default().get(\"/api/users/currentuser\");\n        return response;\n    } catch (error) {\n        console.log(error);\n        throw error;\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (indexPage);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQTBCO0FBRTFCLE1BQU1DLFNBQVMsR0FBRyxDQUFDLEVBQUVDLFdBQVcsR0FBRSxHQUFLO0lBQ25DQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsV0FBVyxDQUFDLENBQUM7SUFDekIscUJBQU8sOERBQUNHLElBQUU7a0JBQUMsY0FBWTs7Ozs7aUJBQUssQ0FBQztDQUNoQztBQUVESixTQUFTLENBQUNLLGVBQWUsR0FBRyxJQUFNO0lBRTlCLElBQUk7UUFDQSxNQUFNQyxRQUFRLEdBQUdQLGdEQUFTLENBQUMsd0JBQXdCLENBQUM7UUFDcEQsT0FBT08sUUFBUSxDQUFDO0tBQ25CLENBQUMsT0FBT0UsS0FBSyxFQUFFO1FBQ1pOLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxLQUFLLENBQUMsQ0FBQztRQUNuQixNQUFNQSxLQUFLLENBQUM7S0FDZjtDQUNKO0FBRUQsaUVBQWVSLFNBQVMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL2luZGV4LmpzP2JlZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5jb25zdCBpbmRleFBhZ2UgPSAoeyBjdXJyZW50VXNlciB9KSA9PiB7XG4gICAgY29uc29sZS5sb2coY3VycmVudFVzZXIpO1xuICAgIHJldHVybiA8aDE+TGFuZGluZyBwYWdlPC9oMT47XG59O1xuXG5pbmRleFBhZ2UuZ2V0SW5pdGlhbFByb3BzID0gKCkgPT4ge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBheGlvcy5nZXQoJy9hcGkvdXNlcnMvY3VycmVudHVzZXInKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuIFxuZXhwb3J0IGRlZmF1bHQgaW5kZXhQYWdlOyJdLCJuYW1lcyI6WyJheGlvcyIsImluZGV4UGFnZSIsImN1cnJlbnRVc2VyIiwiY29uc29sZSIsImxvZyIsImgxIiwiZ2V0SW5pdGlhbFByb3BzIiwicmVzcG9uc2UiLCJnZXQiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();