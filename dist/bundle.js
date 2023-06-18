/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookings": () => (/* binding */ bookings),
/* harmony export */   "setData": () => (/* binding */ setData),
/* harmony export */   "rooms": () => (/* binding */ rooms),
/* harmony export */   "loginPage": () => (/* binding */ loginPage)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_single_room_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _images_double_room_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _images_single_junior_suite_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _images_double_junior_suite_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _images_single_suite_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _images_double_suite_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _images_single_residential_suite_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _images_double_residential_suite_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var _images_customer_rating_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(16);
/* harmony import */ var _images_booking_page_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7);
/* harmony import */ var _images_close_symbol_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(18);
/* harmony import */ var _dom_updates__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(19);
/* harmony import */ var _booking_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(20);
// =========================================================
// ===============   variables and imports   ===============
// =========================================================

















let customers;
let rooms;
let bookings;
let currentUser;
let userBookings;
let selectedDate;
let bookingConfirmed = false;
const todaysDate = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.getTodaysDate)();
const pastTrips = document.querySelector('#past-trips');
const futureTrips = document.querySelector('#upcoming-trips');
const dropdownLinks = document.querySelector('.user-profile');
const formData = document.querySelector('#booking-options');
const roomType = document.querySelector('#room-types');
const displayRoomsBtn = document.querySelector('.see-available-rooms');
const loginBtn = document.querySelector('.login-btn');
const userPassword = document.querySelector('#password');
const username = document.querySelector('#username');
const loginPage = document.querySelector('.modal-login');
const userLogout = document.querySelector('#user-logout');
const loginForm = document.querySelector('#login');
const listenPageClick = document.querySelector('#page');
const bookingBtnTab = document.querySelector('#bookings')

// =========================================================
// ==================   event listeners   ==================
// =========================================================

window.addEventListener('load', () => {
  setData();
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.setCalendarDates)();
});

dropdownLinks.addEventListener('click', _dom_updates__WEBPACK_IMPORTED_MODULE_13__.handleDropdown);

pastTrips.addEventListener('click', () => {
  userBookings = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.getUserBookings)(todaysDate, currentUser.id, bookings, 'past');
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.resetTripMessage)(userBookings);
  
  if (typeof userBookings === 'object') {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.populateBookings)(userBookings, rooms);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.viewDashboardBackground)(false);
  } else {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeBookings)();
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.viewDashboardBackground)(true);
  }
});

futureTrips.addEventListener('click', () => {
  userBookings = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.getUserBookings)(todaysDate, currentUser.id, bookings, 'upcoming');
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.resetTripMessage)(userBookings);

  if (typeof userBookings === 'object') {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.populateBookings)(userBookings, rooms);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.viewDashboardBackground)(false);
  } else {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeBookings)(userBookings);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.viewDashboardBackground)(true);
  }
});

formData.addEventListener('submit', (e) => {
  e.preventDefault();
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.resetTripMessage)();
  selectedDate = new Date(`${_dom_updates__WEBPACK_IMPORTED_MODULE_13__.pickedDate.value}T00:00`).toLocaleDateString("en-CA");
  const selectedRoomType = roomType.value;
  const availableRooms = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.filterOutUnavailableRooms)(selectedDate, bookings, rooms)
  const filteredRooms = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.filterAvailableRoomsByType)(availableRooms, selectedRoomType, selectedDate);
  
  if(typeof filteredRooms === 'string') {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeBookings)();
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.displayTripMessage)(filteredRooms);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.viewDashboardBackground)(true);
  } else {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.populateAvailableRooms)(filteredRooms);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.viewDashboardBackground)(false);
  }
  
  let roomsToBook = document.querySelectorAll('.rooms');
  roomsToBook.forEach((room) => {
    room.addEventListener('keyup', (e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        const selectedRoom = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.findRoom)(room.id, rooms);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.showRoomModal)(selectedRoom, selectedDate);
      }
    });

    room.addEventListener('click', () => {
      const selectedRoom = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.findRoom)(room.id, rooms);
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.showRoomModal)(selectedRoom, selectedDate);
    });
  });
});

_dom_updates__WEBPACK_IMPORTED_MODULE_13__.navBtns.forEach(button => {
  button.addEventListener('click', () => {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.handleActiveBtn)();
    button.classList.add('nav-tab-active');
    button.style.color = '#212427';
    
    if (button.id === 'bookings') {
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeHidden)(displayRoomsBtn);
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeHidden)(roomType);
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.pickedDate);
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.resetRoomDisplay)();
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.resetTripMessage)();
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeBookings)(userBookings);
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.viewDashboardBackground)(true);
    } else {
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(displayRoomsBtn);
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(roomType);
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.pickedDate);
    }
  });
});

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const checkedUsername = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.checkUsername)(username.value);
  const checkedPassword = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_14__.checkPassword)(userPassword.value);
  

  if (typeof checkedUsername === 'number'  && checkedPassword) {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(loginPage);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.banner);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.welcomeMessage);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.coverImg);
    
    getCustomer(checkedUsername)
      .then((user) => {
        currentUser = user; 
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.getUserInfo)(user);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.updateNightsStayed)();
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.updateTotalSpent)();
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.updateCustomerStatus)();
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.populateUserProfile)(user.name);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.populateUserWelcome)(user.name);
      });

  } else {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.displayUserError)(true);
  }

  loginForm.reset();
});

_dom_updates__WEBPACK_IMPORTED_MODULE_13__.bookingModal.addEventListener('click', (e) => { 
  if (e.target.classList.contains('book-room')) {
    bookingConfirmed = true;
  }

  if (e.target.classList.contains('modal') && !bookingConfirmed){
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.bookingModal); 
  } else if (e.target.classList.contains('modal') && bookingConfirmed) {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.bookingModal);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.viewDashboardBackground)(true)
    ;(0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.resetRoomDisplay)();
  }
  bookingConfirmed = false;
});

userLogout.addEventListener('click', () => {
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.removeHidden)(loginPage);
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.banner);
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.adjustBannerStyleBg)(false);
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.welcomeMessage);
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.addHidden)(_dom_updates__WEBPACK_IMPORTED_MODULE_13__.coverImg);
  _dom_updates__WEBPACK_IMPORTED_MODULE_13__.userDropdownMenu.setAttribute('aria-expanded', 'false');
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.resetRoomDisplay)();
  currentUser = undefined;
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.displayUserError)(false);
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_13__.handleActiveBtn)();
  bookingBtnTab.classList.add('nav-tab-active');
});

listenPageClick.addEventListener('click', (e) => {
  if (e.target !== _dom_updates__WEBPACK_IMPORTED_MODULE_13__.userDropdownMenu && !_dom_updates__WEBPACK_IMPORTED_MODULE_13__.userDropdownMenu.contains(e.target) && !e.target.parentNode.classList.contains('user-profile-drop')) {
    _dom_updates__WEBPACK_IMPORTED_MODULE_13__.userDropdownMenu.setAttribute('aria-expanded', 'false');
  }
});

// =========================================================
// =====================   functions   =====================
// =========================================================

const setData = () => {
  (0,_api_calls__WEBPACK_IMPORTED_MODULE_12__.getAllData)()
    .then(resolve => {
      customers = resolve[0].customers;
      rooms = resolve[1].rooms;
      bookings = resolve[2].bookings;
    });
};

const getCustomer = (userId) => {
  return (0,_api_calls__WEBPACK_IMPORTED_MODULE_12__.findCustomer)(userId);
};




/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_booking_page_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_booking_page_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --brand-colour:  #cfd1d1;\n  --black:#212427;\n  --nav-grey: #333333;\n  --white: #ffffff;\n  --dashboard-grey: #484848;\n  --logo-colour: #542e71;\n  --logo-colour-hover: #381255; }\n\n* {\n  font-family: 'Inter', sans-serif;\n  margin: 0;\n  padding: 0;\n  color: var(--dashboard-grey);\n  box-sizing: border-box; }\n\nli {\n  list-style-type: none; }\n\na {\n  text-decoration: none; }\n\n.cover {\n  z-index: -1;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-color: rgba(255, 255, 255, 0.2);\n  background-blend-mode: lighten;\n  width: 100%;\n  height: 100vh;\n  position: absolute; }\n\nbutton {\n  background-color: var(--logo-colour);\n  color: var(--white);\n  border-radius: 0.3rem;\n  padding: 0.6em 1.5em;\n  font-size: 16px;\n  border-color: var(--logo-colour);\n  transition: background-color 0.3s ease; }\n\ninput, select {\n  border-radius: 0.3rem;\n  border-width: 2px;\n  border-color: #999999;\n  font-size: 16px;\n  padding: 0.475em 1.2em; }\n\n.modal-esc .modal-esc-img {\n  width: 50px;\n  min-height: auto; }\n\n.error-handle {\n  background-color: var(--white);\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  z-index: 2; }\n  .error-handle p {\n    margin: 1em;\n    font-size: 4rem;\n    color: #212427; }\n\n.banner {\n  position: sticky;\n  top: 0px;\n  width: 100vw; }\n\n.logo-bar {\n  background-color: var(--white);\n  min-height: 4rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  top: 0; }\n  .logo-bar .user-name {\n    color: var(--logo-colour); }\n\n.dashboard-title {\n  font-size: 2rem;\n  font-weight: 600;\n  padding-left: 1rem;\n  color: var(--logo-colour); }\n\nh1 .logo {\n  font-weight: 200; }\n\n.user-profile {\n  padding-right: 1rem;\n  font-size: 1.1rem; }\n  .user-profile a {\n    display: flex;\n    align-items: center; }\n  .user-profile .profile-icon {\n    width: 2.4rem;\n    padding-right: .3em;\n    filter: invert(20%) sepia(35%) saturate(1725%) hue-rotate(240deg) brightness(93%) contrast(92%); }\n  .user-profile .user-chevron {\n    width: 2rem;\n    padding-left: 0.2;\n    filter: invert(20%) sepia(35%) saturate(1725%) hue-rotate(240deg) brightness(93%) contrast(92%); }\n\nnav {\n  margin: 1em; }\n  nav .trip-actions, nav #booking-options {\n    margin-top: 1.2em;\n    display: flex;\n    gap: 2rem; }\n  nav .nav-tab {\n    font-size: 1.2rem;\n    background: none;\n    border: none;\n    color: var(--dashboard-grey);\n    padding: 0 0 0.2em 0;\n    font-weight: 500; }\n  nav .mob-container {\n    display: flex;\n    gap: 1em; }\n  nav .nav-tab-active {\n    color: var(--black);\n    border-bottom: solid var(--black); }\n  nav #booking-options {\n    gap: 1rem; }\n  nav form {\n    min-height: 33px;\n    padding-bottom: 1em; }\n  nav .welcome-user {\n    font-family: 'Playfair Display', serif;\n    font-size: 3rem;\n    color: var(--dashboard-grey); }\n  nav #pick-day {\n    padding: 0.45em 1.2em; }\n\n.dropdown-container {\n  position: relative; }\n  .dropdown-container .vip-status {\n    font-size: 1.2rem;\n    font-weight: 300;\n    display: flex;\n    align-items: center; }\n    .dropdown-container .vip-status img {\n      width: 2rem;\n      padding-right: 0.5em; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 3rem;\n  right: 0.5rem;\n  padding: 1em;\n  border: 0.1rem solid var(--black);\n  border-radius: .3rem;\n  background-color: var(--white); }\n\n.user-data-box {\n  display: flex;\n  flex-direction: column;\n  box-shadow: 16px 16px 15px -5px rgba(0, 0, 0, 0.22), -6px -6px 15px -5px rgba(0, 0, 0, 0.22);\n  border-radius: .3rem;\n  padding: 1em;\n  margin: 1em 0;\n  font-size: 1.1rem; }\n  .user-data-box .user-metrix {\n    font-size: 2rem;\n    margin-top: .2em;\n    font-weight: 500; }\n\n.user-item {\n  font-size: 1.4rem;\n  font-weight: 400; }\n\n.user-settings {\n  padding: 0  0 0.5em 0; }\n\n.user-logout {\n  padding: 0.5em 0 0 0; }\n\nmain {\n  display: flex;\n  flex-direction: column; }\n  main .welcome-message {\n    padding: 0 .5em;\n    text-align: center;\n    font-size: 4rem;\n    font-weight: 400;\n    font-weight: 500;\n    letter-spacing: .15rem;\n    font-family: 'Playfair Display', serif;\n    color: var(--dashboard-grey); }\n  main .trip-message {\n    margin: 1em;\n    font-size: 1.3rem; }\n\n@media (max-width: 800px) {\n  nav .welcome-user {\n    font-size: 2rem; }\n  .logo-bar .user-name {\n    display: none; }\n  .dashboard-title {\n    font-size: 1.6rem; }\n  main .welcome-message {\n    font-size: 3rem; } }\n\n@media (max-width: 1025px) and (orientation: landscape) {\n  nav .welcome-user {\n    font-size: 2rem; }\n  main .welcome-message {\n    font-size: 3rem; } }\n\n@media (max-height: 450px) {\n  .dropdown-menu {\n    padding: .8em 1em;\n    min-width: 19rem; }\n  .user-data-box {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: .7em;\n    padding: .5em;\n    margin: .5em 0;\n    font-size: 1rem; }\n    .user-data-box .user-metrix {\n      font-size: 1.2rem; }\n  .user-item {\n    font-size: 1rem;\n    font-weight: 500; }\n  .user-logout {\n    padding: 0; } }\n\n.available-rooms {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 1em;\n  gap: 1.5rem; }\n\n.rooms {\n  display: flex;\n  min-width: 700px;\n  min-height: 375px;\n  gap: 1rem;\n  border-radius: .3em;\n  box-shadow: 16px 16px 15px -5px rgba(0, 0, 0, 0.22), -6px -6px 15px -5px rgba(0, 0, 0, 0.22); }\n  .rooms .room-info {\n    padding: 2em 2em 2em 0.5em;\n    line-height: 1.5rem;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between; }\n  .rooms .room-image {\n    object-fit: cover;\n    object-position: center;\n    border-radius: 0.3em 0 0 .3em;\n    min-width: 50%; }\n  .rooms h3 {\n    font-size: 1.5rem;\n    padding-bottom: .6rem;\n    font-weight: 500; }\n  .rooms .bed-size {\n    font-size: 1.1rem;\n    font-weight: 500;\n    padding-bottom: .4rem; }\n  .rooms .room-cost {\n    padding-top: .6rem;\n    font-size: 2.5rem;\n    font-weight: 700; }\n  .rooms img {\n    max-width: 300px;\n    min-height: 344px; }\n  .rooms .room-type {\n    font-family: 'Playfair Display', serif;\n    font-weight: 600;\n    font-size: 2.25rem; }\n  .rooms .amenities {\n    font-weight: 500; }\n    .rooms .amenities li {\n      font-weight: 400;\n      list-style-type: disc;\n      list-style-position: inside;\n      line-height: normal;\n      padding-left: 10px; }\n  .rooms .amenities p {\n    padding-bottom: 5px; }\n\n@media (max-width: 630px) {\n  button, select, input {\n    font-size: 0.9rem; }\n  .rooms {\n    width: 100%;\n    min-width: auto;\n    min-height: auto; }\n    .rooms .room-type {\n      font-size: 2rem; }\n    .rooms .room-info {\n      line-height: 1.5rem;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-start; }\n    .rooms .room-cost {\n      padding-top: 1.6rem; }\n    .rooms .room-image {\n      min-height: fit-content; } }\n\n@media (max-width: 580px) {\n  .logo {\n    display: none; }\n  nav {\n    margin: 0.5em 1em;\n    display: flex;\n    flex-direction: column;\n    align-items: center; }\n    nav #welcome-user {\n      align-self: baseline; }\n    nav .trip-actions {\n      flex-direction: column;\n      gap: .5em;\n      margin-top: 0.2em; }\n      nav .trip-actions .nav-tab {\n        font-size: 1.1rem; }\n    nav #booking-options {\n      flex-direction: column;\n      gap: 0.5em;\n      margin-top: 0.2em; }\n    nav .mob-container {\n      flex-direction: row; } }\n\n@media (max-width: 300px) {\n  nav .mob-container {\n    flex-direction: column;\n    gap: .5em; }\n  main .welcome-message {\n    font-size: 2.5rem; } }\n\n@media (max-width: 930px) and (orientation: landscape) {\n  .banner {\n    position: static; } }\n\n@media (max-width: 930px) and (orientation: portrait) {\n  .rooms {\n    flex-direction: column; }\n    .rooms img {\n      min-width: 0; }\n    .rooms .room-image {\n      width: 100%;\n      max-width: none;\n      border-radius: 0.3em 0.3em 0 0;\n      min-width: 0; }\n    .rooms .room-info {\n      padding: 0 1em 1.5em 1.5em; } }\n\n.modal {\n  --gap: 15px;\n  position: fixed;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--gap);\n  background: rgba(0, 0, 0, 0.5); }\n\n#inner-modal {\n  background: var(--white);\n  overflow: hidden;\n  border-radius: .3em;\n  min-height: 344px;\n  position: relative; }\n  #inner-modal .modal-room {\n    min-width: 900px;\n    min-height: 450px; }\n  #inner-modal button + button {\n    margin-left: 1rem; }\n  #inner-modal .btn-container {\n    margin-top: .8em; }\n  #inner-modal .another-room {\n    color: var(--logo-colour);\n    background-color: var(--white); }\n  #inner-modal .room-info > .modal-esc {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 0;\n    margin: .6em 1em 0 0;\n    font-size: 2rem;\n    font-weight: 500;\n    background: none;\n    border: none;\n    color: var(--black); }\n  #inner-modal .booking-thanks {\n    margin-right: 1.5em; }\n  #inner-modal .modal-info {\n    width: 500px; }\n\n@media (max-width: 580px) {\n  #inner-modal {\n    max-height: 95vh;\n    min-height: auto;\n    position: relative; }\n    #inner-modal .modal-room {\n      min-width: auto;\n      min-height: auto; }\n    #inner-modal .room-image {\n      max-height: 280px; }\n    #inner-modal .btn-container {\n      margin-top: 1em;\n      display: flex;\n      flex-direction: column;\n      width: fit-content;\n      gap: 0.5em; }\n    #inner-modal #book-room {\n      margin: 0; } }\n\n@media (max-width: 1025px) and (orientation: landscape) {\n  .rooms {\n    min-width: 95vw;\n    min-height: auto; }\n  #inner-modal {\n    max-height: 95vh;\n    position: relative; }\n    #inner-modal .modal-info {\n      width: auto; }\n    #inner-modal .modal-room {\n      min-width: auto;\n      min-height: auto; }\n    #inner-modal .room-image {\n      min-width: auto; }\n    #inner-modal .btn-container {\n      margin-top: 1em; }\n    #inner-modal button + button {\n      margin: .5em 0 0 0; } }\n\n@media (max-height: 376px) and (orientation: landscape) {\n  .rooms .room-info {\n    padding: 1em 1em 1em 0.3em; }\n  .rooms .room-cost {\n    font-size: 1.8rem; }\n  .rooms .room-type {\n    font-size: 1.5rem;\n    padding-bottom: .3em; }\n  .rooms .bed-size {\n    font-size: 1rem;\n    padding-bottom: 0; }\n  .rooms .amenities {\n    font-size: 0.9rem; }\n  #inner-modal .btn-container {\n    margin-top: 0.4em; }\n  #inner-modal button + button {\n    margin: .2em 0 0 0; } }\n\n@media (max-height: 290px) and (orientation: landscape) {\n  button {\n    padding: 0.3em 1em; }\n  .rooms .room-info {\n    padding: .5em .5em .5em 0.3em; }\n  .rooms .room-type {\n    font-size: 1rem;\n    padding-bottom: .3em; }\n  .rooms .room-cost {\n    font-size: 1rem; }\n  .rooms .room-image {\n    max-width: 245px;\n    min-height: auto; }\n  .rooms .amenities {\n    font-size: 0.7rem; }\n  #inner-modal {\n    min-height: auto; }\n    #inner-modal .modal-room {\n      max-width: 95vw !important;\n      max-height: 95vh !important; } }\n\n.modal-login {\n  position: fixed;\n  top: 0;\n  width: 100vw;\n  text-align: center;\n  display: flex;\n  justify-content: center; }\n  .modal-login .img-container {\n    background-color: var(--black);\n    float: left;\n    width: 50vw; }\n  .modal-login .cover-login {\n    display: block;\n    opacity: .7;\n    width: 50vw;\n    height: 100vh;\n    position: relative;\n    object-fit: cover;\n    object-position: center; }\n  .modal-login .inner-modal-login {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 3em;\n    height: 100vh;\n    width: 50vw;\n    padding-top: 15%;\n    line-height: 0.7;\n    background-color: #e4ebfb; }\n    .modal-login .inner-modal-login .login-btn {\n      align-self: flex-start;\n      margin: 0 auto; }\n  .modal-login .hotel-title {\n    font-size: 5rem;\n    text-align: center;\n    color: var(--logo-colour); }\n    .modal-login .hotel-title .logo-login {\n      font-size: 3.15rem;\n      font-weight: 100; }\n  .modal-login #login {\n    display: flex;\n    flex-direction: column;\n    gap: 1em; }\n\n@media (max-width: 1000px) and (orientation: portrait) {\n  .modal-login {\n    flex-direction: column; }\n    .modal-login .img-container, .modal-login .cover-login {\n      width: 100vw;\n      height: 50vh; }\n    .modal-login .hotel-title {\n      font-size: 3rem; }\n      .modal-login .hotel-title .logo-login {\n        font-size: 1.9rem; }\n    .modal-login .inner-modal-login {\n      gap: 1.5em;\n      height: 50vh;\n      width: 100vw;\n      padding-top: 0;\n      padding-top: 10%; }\n  #inner-modal .modal-info {\n    width: auto; } }\n\n@media (max-width: 1025px) and (orientation: landscape) {\n  .modal-login .hotel-title {\n    font-size: 3rem; }\n    .modal-login .hotel-title .logo-login {\n      font-size: 1.9rem; }\n  .modal-login .inner-modal-login {\n    gap: 1.5em;\n    padding-top: 0;\n    padding-top: 5%; } }\n\n[aria-expanded=\"true\"] {\n  display: block; }\n\n[aria-expanded=\"false\"] {\n  display: none; }\n\n.hidden {\n  display: none; }\n\nbutton:hover, input:hover, select:hover {\n  cursor: pointer; }\n\nbutton:not(.nav-tab):hover, button:not(.nav-tab):focus {\n  background-color: var(--logo-colour-hover); }\n\n#another-room:hover {\n  color: var(--logo-colour-hover);\n  border-color: var(--logo-colour-hover); }\n\n.nav-tab:hover, .nav-tab:focus, #user-logout:hover, #user-logout:focus {\n  color: var(--black) !important; }\n\n.user-name:hover {\n  color: var(--logo-colour-hover); }\n\n.user-chevron:hover, .profile-icon:hover {\n  filter: invert(8%) sepia(39%) saturate(5166%) hue-rotate(264deg) brightness(103%) contrast(99%); }\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":[":root {\n  --brand-colour:  #cfd1d1;\n  --black:#212427;\n  --nav-grey: #333333;\n  --white: #ffffff;\n  --dashboard-grey: #484848;\n  --logo-colour: #542e71;\n  --logo-colour-hover: #381255; }\n\n* {\n  font-family: 'Inter', sans-serif;\n  margin: 0;\n  padding: 0;\n  color: var(--dashboard-grey);\n  box-sizing: border-box; }\n\nli {\n  list-style-type: none; }\n\na {\n  text-decoration: none; }\n\n.cover {\n  z-index: -1;\n  background-image: url(\"../images/booking-page.jpg\");\n  background-size: cover;\n  background-color: rgba(255, 255, 255, 0.2);\n  background-blend-mode: lighten;\n  width: 100%;\n  height: 100vh;\n  position: absolute; }\n\nbutton {\n  background-color: var(--logo-colour);\n  color: var(--white);\n  border-radius: 0.3rem;\n  padding: 0.6em 1.5em;\n  font-size: 16px;\n  border-color: var(--logo-colour);\n  transition: background-color 0.3s ease; }\n\ninput, select {\n  border-radius: 0.3rem;\n  border-width: 2px;\n  border-color: #999999;\n  font-size: 16px;\n  padding: 0.475em 1.2em; }\n\n.modal-esc .modal-esc-img {\n  width: 50px;\n  min-height: auto; }\n\n.error-handle {\n  background-color: var(--white);\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  z-index: 2; }\n  .error-handle p {\n    margin: 1em;\n    font-size: 4rem;\n    color: #212427; }\n\n.banner {\n  position: sticky;\n  top: 0px;\n  width: 100vw; }\n\n.logo-bar {\n  background-color: var(--white);\n  min-height: 4rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  top: 0; }\n  .logo-bar .user-name {\n    color: var(--logo-colour); }\n\n.dashboard-title {\n  font-size: 2rem;\n  font-weight: 600;\n  padding-left: 1rem;\n  color: var(--logo-colour); }\n\nh1 .logo {\n  font-weight: 200; }\n\n.user-profile {\n  padding-right: 1rem;\n  font-size: 1.1rem; }\n  .user-profile a {\n    display: flex;\n    align-items: center; }\n  .user-profile .profile-icon {\n    width: 2.4rem;\n    padding-right: .3em;\n    filter: invert(20%) sepia(35%) saturate(1725%) hue-rotate(240deg) brightness(93%) contrast(92%); }\n  .user-profile .user-chevron {\n    width: 2rem;\n    padding-left: 0.2;\n    filter: invert(20%) sepia(35%) saturate(1725%) hue-rotate(240deg) brightness(93%) contrast(92%); }\n\nnav {\n  margin: 1em; }\n  nav .trip-actions, nav #booking-options {\n    margin-top: 1.2em;\n    display: flex;\n    gap: 2rem; }\n  nav .nav-tab {\n    font-size: 1.2rem;\n    background: none;\n    border: none;\n    color: var(--dashboard-grey);\n    padding: 0 0 0.2em 0;\n    font-weight: 500; }\n  nav .mob-container {\n    display: flex;\n    gap: 1em; }\n  nav .nav-tab-active {\n    color: var(--black);\n    border-bottom: solid var(--black); }\n  nav #booking-options {\n    gap: 1rem; }\n  nav form {\n    min-height: 33px;\n    padding-bottom: 1em; }\n  nav .welcome-user {\n    font-family: 'Playfair Display', serif;\n    font-size: 3rem;\n    color: var(--dashboard-grey); }\n  nav #pick-day {\n    padding: 0.45em 1.2em; }\n\n.dropdown-container {\n  position: relative; }\n  .dropdown-container .vip-status {\n    font-size: 1.2rem;\n    font-weight: 300;\n    display: flex;\n    align-items: center; }\n    .dropdown-container .vip-status img {\n      width: 2rem;\n      padding-right: 0.5em; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 3rem;\n  right: 0.5rem;\n  padding: 1em;\n  border: 0.1rem solid var(--black);\n  border-radius: .3rem;\n  background-color: var(--white); }\n\n.user-data-box {\n  display: flex;\n  flex-direction: column;\n  box-shadow: 16px 16px 15px -5px rgba(0, 0, 0, 0.22), -6px -6px 15px -5px rgba(0, 0, 0, 0.22);\n  border-radius: .3rem;\n  padding: 1em;\n  margin: 1em 0;\n  font-size: 1.1rem; }\n  .user-data-box .user-metrix {\n    font-size: 2rem;\n    margin-top: .2em;\n    font-weight: 500; }\n\n.user-item {\n  font-size: 1.4rem;\n  font-weight: 400; }\n\n.user-settings {\n  padding: 0  0 0.5em 0; }\n\n.user-logout {\n  padding: 0.5em 0 0 0; }\n\nmain {\n  display: flex;\n  flex-direction: column; }\n  main .welcome-message {\n    padding: 0 .5em;\n    text-align: center;\n    font-size: 4rem;\n    font-weight: 400;\n    font-weight: 500;\n    letter-spacing: .15rem;\n    font-family: 'Playfair Display', serif;\n    color: var(--dashboard-grey); }\n  main .trip-message {\n    margin: 1em;\n    font-size: 1.3rem; }\n\n@media (max-width: 800px) {\n  nav .welcome-user {\n    font-size: 2rem; }\n  .logo-bar .user-name {\n    display: none; }\n  .dashboard-title {\n    font-size: 1.6rem; }\n  main .welcome-message {\n    font-size: 3rem; } }\n\n@media (max-width: 1025px) and (orientation: landscape) {\n  nav .welcome-user {\n    font-size: 2rem; }\n  main .welcome-message {\n    font-size: 3rem; } }\n\n@media (max-height: 450px) {\n  .dropdown-menu {\n    padding: .8em 1em;\n    min-width: 19rem; }\n  .user-data-box {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: .7em;\n    padding: .5em;\n    margin: .5em 0;\n    font-size: 1rem; }\n    .user-data-box .user-metrix {\n      font-size: 1.2rem; }\n  .user-item {\n    font-size: 1rem;\n    font-weight: 500; }\n  .user-logout {\n    padding: 0; } }\n\n.available-rooms {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 1em;\n  gap: 1.5rem; }\n\n.rooms {\n  display: flex;\n  min-width: 700px;\n  min-height: 375px;\n  gap: 1rem;\n  border-radius: .3em;\n  box-shadow: 16px 16px 15px -5px rgba(0, 0, 0, 0.22), -6px -6px 15px -5px rgba(0, 0, 0, 0.22); }\n  .rooms .room-info {\n    padding: 2em 2em 2em 0.5em;\n    line-height: 1.5rem;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between; }\n  .rooms .room-image {\n    object-fit: cover;\n    object-position: center;\n    border-radius: 0.3em 0 0 .3em;\n    min-width: 50%; }\n  .rooms h3 {\n    font-size: 1.5rem;\n    padding-bottom: .6rem;\n    font-weight: 500; }\n  .rooms .bed-size {\n    font-size: 1.1rem;\n    font-weight: 500;\n    padding-bottom: .4rem; }\n  .rooms .room-cost {\n    padding-top: .6rem;\n    font-size: 2.5rem;\n    font-weight: 700; }\n  .rooms img {\n    max-width: 300px;\n    min-height: 344px; }\n  .rooms .room-type {\n    font-family: 'Playfair Display', serif;\n    font-weight: 600;\n    font-size: 2.25rem; }\n  .rooms .amenities {\n    font-weight: 500; }\n    .rooms .amenities li {\n      font-weight: 400;\n      list-style-type: disc;\n      list-style-position: inside;\n      line-height: normal;\n      padding-left: 10px; }\n  .rooms .amenities p {\n    padding-bottom: 5px; }\n\n@media (max-width: 630px) {\n  button, select, input {\n    font-size: 0.9rem; }\n  .rooms {\n    width: 100%;\n    min-width: auto;\n    min-height: auto; }\n    .rooms .room-type {\n      font-size: 2rem; }\n    .rooms .room-info {\n      line-height: 1.5rem;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-start; }\n    .rooms .room-cost {\n      padding-top: 1.6rem; }\n    .rooms .room-image {\n      min-height: fit-content; } }\n\n@media (max-width: 580px) {\n  .logo {\n    display: none; }\n  nav {\n    margin: 0.5em 1em;\n    display: flex;\n    flex-direction: column;\n    align-items: center; }\n    nav #welcome-user {\n      align-self: baseline; }\n    nav .trip-actions {\n      flex-direction: column;\n      gap: .5em;\n      margin-top: 0.2em; }\n      nav .trip-actions .nav-tab {\n        font-size: 1.1rem; }\n    nav #booking-options {\n      flex-direction: column;\n      gap: 0.5em;\n      margin-top: 0.2em; }\n    nav .mob-container {\n      flex-direction: row; } }\n\n@media (max-width: 300px) {\n  nav .mob-container {\n    flex-direction: column;\n    gap: .5em; }\n  main .welcome-message {\n    font-size: 2.5rem; } }\n\n@media (max-width: 930px) and (orientation: landscape) {\n  .banner {\n    position: static; } }\n\n@media (max-width: 930px) and (orientation: portrait) {\n  .rooms {\n    flex-direction: column; }\n    .rooms img {\n      min-width: 0; }\n    .rooms .room-image {\n      width: 100%;\n      max-width: none;\n      border-radius: 0.3em 0.3em 0 0;\n      min-width: 0; }\n    .rooms .room-info {\n      padding: 0 1em 1.5em 1.5em; } }\n\n.modal {\n  --gap: 15px;\n  position: fixed;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--gap);\n  background: rgba(0, 0, 0, 0.5); }\n\n#inner-modal {\n  background: var(--white);\n  overflow: hidden;\n  border-radius: .3em;\n  min-height: 344px;\n  position: relative; }\n  #inner-modal .modal-room {\n    min-width: 900px;\n    min-height: 450px; }\n  #inner-modal button + button {\n    margin-left: 1rem; }\n  #inner-modal .btn-container {\n    margin-top: .8em; }\n  #inner-modal .another-room {\n    color: var(--logo-colour);\n    background-color: var(--white); }\n  #inner-modal .room-info > .modal-esc {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 0;\n    margin: .6em 1em 0 0;\n    font-size: 2rem;\n    font-weight: 500;\n    background: none;\n    border: none;\n    color: var(--black); }\n  #inner-modal .booking-thanks {\n    margin-right: 1.5em; }\n  #inner-modal .modal-info {\n    width: 500px; }\n\n@media (max-width: 580px) {\n  #inner-modal {\n    max-height: 95vh;\n    min-height: auto;\n    position: relative; }\n    #inner-modal .modal-room {\n      min-width: auto;\n      min-height: auto; }\n    #inner-modal .room-image {\n      max-height: 280px; }\n    #inner-modal .btn-container {\n      margin-top: 1em;\n      display: flex;\n      flex-direction: column;\n      width: fit-content;\n      gap: 0.5em; }\n    #inner-modal #book-room {\n      margin: 0; } }\n\n@media (max-width: 1025px) and (orientation: landscape) {\n  .rooms {\n    min-width: 95vw;\n    min-height: auto; }\n  #inner-modal {\n    max-height: 95vh;\n    position: relative; }\n    #inner-modal .modal-info {\n      width: auto; }\n    #inner-modal .modal-room {\n      min-width: auto;\n      min-height: auto; }\n    #inner-modal .room-image {\n      min-width: auto; }\n    #inner-modal .btn-container {\n      margin-top: 1em; }\n    #inner-modal button + button {\n      margin: .5em 0 0 0; } }\n\n@media (max-height: 376px) and (orientation: landscape) {\n  .rooms .room-info {\n    padding: 1em 1em 1em 0.3em; }\n  .rooms .room-cost {\n    font-size: 1.8rem; }\n  .rooms .room-type {\n    font-size: 1.5rem;\n    padding-bottom: .3em; }\n  .rooms .bed-size {\n    font-size: 1rem;\n    padding-bottom: 0; }\n  .rooms .amenities {\n    font-size: 0.9rem; }\n  #inner-modal .btn-container {\n    margin-top: 0.4em; }\n  #inner-modal button + button {\n    margin: .2em 0 0 0; } }\n\n@media (max-height: 290px) and (orientation: landscape) {\n  button {\n    padding: 0.3em 1em; }\n  .rooms .room-info {\n    padding: .5em .5em .5em 0.3em; }\n  .rooms .room-type {\n    font-size: 1rem;\n    padding-bottom: .3em; }\n  .rooms .room-cost {\n    font-size: 1rem; }\n  .rooms .room-image {\n    max-width: 245px;\n    min-height: auto; }\n  .rooms .amenities {\n    font-size: 0.7rem; }\n  #inner-modal {\n    min-height: auto; }\n    #inner-modal .modal-room {\n      max-width: 95vw !important;\n      max-height: 95vh !important; } }\n\n.modal-login {\n  position: fixed;\n  top: 0;\n  width: 100vw;\n  text-align: center;\n  display: flex;\n  justify-content: center; }\n  .modal-login .img-container {\n    background-color: var(--black);\n    float: left;\n    width: 50vw; }\n  .modal-login .cover-login {\n    display: block;\n    opacity: .7;\n    width: 50vw;\n    height: 100vh;\n    position: relative;\n    object-fit: cover;\n    object-position: center; }\n  .modal-login .inner-modal-login {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 3em;\n    height: 100vh;\n    width: 50vw;\n    padding-top: 15%;\n    line-height: 0.7;\n    background-color: #e4ebfb; }\n    .modal-login .inner-modal-login .login-btn {\n      align-self: flex-start;\n      margin: 0 auto; }\n  .modal-login .hotel-title {\n    font-size: 5rem;\n    text-align: center;\n    color: var(--logo-colour); }\n    .modal-login .hotel-title .logo-login {\n      font-size: 3.15rem;\n      font-weight: 100; }\n  .modal-login #login {\n    display: flex;\n    flex-direction: column;\n    gap: 1em; }\n\n@media (max-width: 1000px) and (orientation: portrait) {\n  .modal-login {\n    flex-direction: column; }\n    .modal-login .img-container, .modal-login .cover-login {\n      width: 100vw;\n      height: 50vh; }\n    .modal-login .hotel-title {\n      font-size: 3rem; }\n      .modal-login .hotel-title .logo-login {\n        font-size: 1.9rem; }\n    .modal-login .inner-modal-login {\n      gap: 1.5em;\n      height: 50vh;\n      width: 100vw;\n      padding-top: 0;\n      padding-top: 10%; }\n  #inner-modal .modal-info {\n    width: auto; } }\n\n@media (max-width: 1025px) and (orientation: landscape) {\n  .modal-login .hotel-title {\n    font-size: 3rem; }\n    .modal-login .hotel-title .logo-login {\n      font-size: 1.9rem; }\n  .modal-login .inner-modal-login {\n    gap: 1.5em;\n    padding-top: 0;\n    padding-top: 5%; } }\n\n[aria-expanded=\"true\"] {\n  display: block; }\n\n[aria-expanded=\"false\"] {\n  display: none; }\n\n.hidden {\n  display: none; }\n\nbutton:hover, input:hover, select:hover {\n  cursor: pointer; }\n\nbutton:not(.nav-tab):hover, button:not(.nav-tab):focus {\n  background-color: var(--logo-colour-hover); }\n\n#another-room:hover {\n  color: var(--logo-colour-hover);\n  border-color: var(--logo-colour-hover); }\n\n.nav-tab:hover, .nav-tab:focus, #user-logout:hover, #user-logout:focus {\n  color: var(--black) !important; }\n\n.user-name:hover {\n  color: var(--logo-colour-hover); }\n\n.user-chevron:hover, .profile-icon:hover {\n  filter: invert(8%) sepia(39%) saturate(5166%) hue-rotate(264deg) brightness(103%) contrast(99%); }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/booking-page.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single-room.jpg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/double-room.jpg");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single-junior-suite.jpg");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/double-junior-suite.jpg");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single-suite.jpg");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/double-suite.jpg");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single-residential-suite.jpg");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/double-residential-suite.jpg");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/customer-rating.png");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/close-symbol.png");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllData": () => (/* binding */ getAllData),
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "deleteBooking": () => (/* binding */ deleteBooking),
/* harmony export */   "findCustomer": () => (/* binding */ findCustomer),
/* harmony export */   "errorHandle": () => (/* binding */ errorHandle),
/* harmony export */   "postBooking": () => (/* binding */ postBooking)
/* harmony export */ });
/* harmony import */ var _dom_updates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);



const getData = (data) => {
  return fetch(`https://overlook-api-seven.vercel.app/api/v1/${data}`)
      .then(response => errorHandle(response))
      .catch(error => (0,_dom_updates__WEBPACK_IMPORTED_MODULE_0__.handelErrorMessage)(error));
};

const getAllData = () => {
  return Promise.all([ getData('customers'), getData('rooms'), getData('bookings') ]);
};

const postBooking = (data) => {
  return fetch('https://overlook-api-seven.vercel.app/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => errorHandle(response))
};

const deleteBooking = (id) => {
  fetch(`https://overlook-api-seven.vercel.app/api/v1/bookings/${id}`, {
    method: 'DELETE',
    body: '',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => errorHandle(response))
    .then(() => (0,_scripts__WEBPACK_IMPORTED_MODULE_1__.setData)())
    .catch(error => (0,_dom_updates__WEBPACK_IMPORTED_MODULE_0__.handelErrorMessage)(error));
};

const findCustomer = (id) => {
  return fetch(`https://overlook-api-seven.vercel.app/api/v1/customers/${id}`)
      .then(response => errorHandle(response))
      .then(resolve => {
        return resolve
      })
      .catch(error => (0,_dom_updates__WEBPACK_IMPORTED_MODULE_0__.handelErrorMessage)(error));
};

const errorHandle = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}  ${response.statusText}`);
  }
};




/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleDropdown": () => (/* binding */ handleDropdown),
/* harmony export */   "updateNightsStayed": () => (/* binding */ updateNightsStayed),
/* harmony export */   "updateTotalSpent": () => (/* binding */ updateTotalSpent),
/* harmony export */   "populateBookings": () => (/* binding */ populateBookings),
/* harmony export */   "populateUserWelcome": () => (/* binding */ populateUserWelcome),
/* harmony export */   "populateUserProfile": () => (/* binding */ populateUserProfile),
/* harmony export */   "populateAvailableRooms": () => (/* binding */ populateAvailableRooms),
/* harmony export */   "setCalendarDates": () => (/* binding */ setCalendarDates),
/* harmony export */   "showRoomModal": () => (/* binding */ showRoomModal),
/* harmony export */   "displayTripMessage": () => (/* binding */ displayTripMessage),
/* harmony export */   "resetTripMessage": () => (/* binding */ resetTripMessage),
/* harmony export */   "updateCustomerStatus": () => (/* binding */ updateCustomerStatus),
/* harmony export */   "handleActiveBtn": () => (/* binding */ handleActiveBtn),
/* harmony export */   "addHidden": () => (/* binding */ addHidden),
/* harmony export */   "removeHidden": () => (/* binding */ removeHidden),
/* harmony export */   "removeBookings": () => (/* binding */ removeBookings),
/* harmony export */   "getUserInfo": () => (/* binding */ getUserInfo),
/* harmony export */   "viewDashboardBackground": () => (/* binding */ viewDashboardBackground),
/* harmony export */   "adjustBannerStyleBg": () => (/* binding */ adjustBannerStyleBg),
/* harmony export */   "resetRoomDisplay": () => (/* binding */ resetRoomDisplay),
/* harmony export */   "displayUserError": () => (/* binding */ displayUserError),
/* harmony export */   "handelErrorMessage": () => (/* binding */ handelErrorMessage),
/* harmony export */   "userDropdownMenu": () => (/* binding */ userDropdownMenu),
/* harmony export */   "displayRooms": () => (/* binding */ displayRooms),
/* harmony export */   "pickedDate": () => (/* binding */ pickedDate),
/* harmony export */   "bookingModal": () => (/* binding */ bookingModal),
/* harmony export */   "navBtns": () => (/* binding */ navBtns),
/* harmony export */   "welcomeMessage": () => (/* binding */ welcomeMessage),
/* harmony export */   "coverImg": () => (/* binding */ coverImg),
/* harmony export */   "banner": () => (/* binding */ banner)
/* harmony export */ });
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _booking_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
// =========================================================
// ===============   variables and imports   ===============
// =========================================================





const userDropdownMenu = document.querySelector('#user-items');
const totalNights = document.querySelector('.total-nights');
const totalSpent = document.querySelector('.total-spent');
const displayRooms = document.querySelector('.available-rooms');
const userProfile = document.querySelector('.user-name');
const welcomeUser = document.querySelector('.welcome-user');
const pickedDate = document.querySelector('#pick-day');
const bookingModal = document.querySelector('.modal');
const innerModal = document.querySelector('.inner-modal');
const tripMessage = document.querySelector('.trip-message');
const vipStatus = document.querySelector('.vip-status');
const navBtns = document.querySelectorAll('.nav-tab');
const welcomeMessage = document.querySelector('.welcome-message');
const coverImg = document.querySelector('.cover');
const banner = document.querySelector('.banner');
const falseValidation = document.querySelector('.false-validation')
const handelErrorPage = document.querySelector('.error-handle');
const errorMessage = document.querySelector('.error-message');

const todaysDate = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.getTodaysDate)();
let lastFocusedElement;
let currentUser;

// =========================================================
// =====================   functions   =====================
// =========================================================

const handleDropdown = (e) => {
  if (userDropdownMenu.getAttribute('aria-expanded') === 'true') {
    userDropdownMenu.setAttribute('aria-expanded', 'false');
  } else {
    userDropdownMenu.setAttribute('aria-expanded', 'true');
  }

  let focusableElements = userDropdownMenu.querySelectorAll('a')
  lastFocusedElement = document.activeElement;
  focusableElements[0].focus();
  focusableElements.forEach(link => link.addEventListener('keydown', handleToggleEscape));
};

const handleToggleEscape = (e) => {
  if (e.keyCode === 9 && document.activeElement.id === 'user-logout') {
    lastFocusedElement.click();
  }

  if (e.keyCode === 9 && e.shiftKey && document.activeElement.id === 'user-settings') {
    lastFocusedElement.click();
  }

  if (e.keyCode === 27) {
    lastFocusedElement.click();
  }
};

const updateNightsStayed = () => {
  const nightsStayed = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.getUserBookings)(todaysDate, currentUser.id, _scripts__WEBPACK_IMPORTED_MODULE_2__.bookings, 'past');
  totalNights.innerText = `${nightsStayed.length}`;
};

const updateCustomerStatus = () => {
  const nightsStayed = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.getUserBookings)(todaysDate, currentUser.id, _scripts__WEBPACK_IMPORTED_MODULE_2__.bookings, 'past').length;

  if (nightsStayed < 10) {
    vipStatus.innerHTML = `Prefered Customer`;
  } else if (nightsStayed < 20) {
    vipStatus.innerHTML = `Loyal Customer`;
  } else {
    vipStatus.innerHTML = `<img src="./images/customer-rating.png" alt="VIP star">VIP Customer`;
  }
};

const updateTotalSpent = () => {
  const nightsStayed = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.getUserBookings)(todaysDate, currentUser.id, _scripts__WEBPACK_IMPORTED_MODULE_2__.bookings, 'past');
  const amoutSpent = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.getTotalSpent)(nightsStayed, _scripts__WEBPACK_IMPORTED_MODULE_2__.rooms);
  totalSpent.innerText = `${amoutSpent}`;
};

const populateBookings = (bookings, rooms) => {
  resetRoomDisplay();

  bookings.forEach(booking => {
      const room = rooms.find(room => room.number === booking.roomNumber);
      const capRoomType = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.capatalizeFirstLetter)(room.roomType);

      displayRooms.innerHTML += `
      <article class="rooms" tabindex="0">
        <img class="room-image" src="${handleRoomImage(room)}" alt="turing logo">
        <div class="room-info">
          <h3 class="room-type">${capRoomType}</h3>
          <p class="bed-size">${room.numBeds} ${room.bedSize} bed${room.numBeds > 1 ? 's' : ''}${room.bidet ? ', Bidet' : '' }</p>
          <ul class="amenities">Amenities
            <li>Wifi</li>
            <li>Air conditioner</li>
            <li>Balcony</li>
            <li>Pet Friendly</li>
            <li>Access to gym and pool</li>
          </ul>
          <p class="booked-date">Date: ${booking.date}</p>
          <p class="reference">Booking Reference: ${booking.id}</p>
          <p class="room-cost">$${room.costPerNight}</p>
        </div>
      </article>`;
  });
};

const populateAvailableRooms = (availableRooms) => {
  resetRoomDisplay();

  availableRooms.forEach(room => {
    const capRoomType = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.capatalizeFirstLetter)(room.roomType);

    displayRooms.innerHTML += `
      <article class="rooms"  tabindex="0" id="${room.number}">
        <img class="room-image" src="${handleRoomImage(room)}" alt="turing logo">
        <div class="room-info">
          <h3 class="room-type">${capRoomType}</h3>
          <p class="bed-size">${room.numBeds} ${room.bedSize} bed${room.numBeds > 1 ? 's' : ''}${room.bidet ? ', Bidet' : '' }</p>
          <ul class="amenities"><p>Amenities</p>
            <li>Wifi</li>
            <li>Air conditioner</li>
            <li>Balcony</li>
            <li>Pet Friendly</li>
            <li>Access to gym and pool</li>
          </ul>
          <p class="room-cost">$${room.costPerNight}</p>
        </div>
      </article>`;
  });
};

const removeBookings = ()  => {
  resetRoomDisplay();
};

const displayTripMessage = (roomStatus) => {
  tripMessage.innerText = roomStatus;
};

const resetTripMessage = (message) => {
  if (typeof message === 'string') {
    tripMessage.innerText = `${message}`;
  } else {
    tripMessage.innerText = ``;
  }
}

const populateUserWelcome = (usersName) => {
  const firstName = usersName.split(' ')[0];
  welcomeUser.innerText = `Welcome, ${firstName}!`;
};

const populateUserProfile = (usersName) => {
  userProfile.innerText = `${usersName}`;
};

const setCalendarDates = () => {
  pickedDate.value = todaysDate;
  pickedDate.min = todaysDate;
};

const showRoomModal = (room, date) => {
  bookingModal.classList.toggle('hidden');
  const capRoomType = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.capatalizeFirstLetter)(room.roomType);

  innerModal.innerHTML = `
    <article class="rooms modal-room" id="${room.number}">
      <img class="room-image" src="${handleRoomImage(room)}" alt="turing logo">
      <div class="room-info modal-info">
        <button class="modal-esc" id="modal-esc"><img class="modal-esc-img" src="./images/close-symbol.png" alt="esc button"></button>
        <p class="booked-date" id="${date}">Stay with us on ${date}</p>
        <h3 class="room-type">${capRoomType}</h3>
        <p class="bed-size">${room.numBeds} ${room.bedSize} bed${room.numBeds > 1 ? 's' : ''}${room.bidet ? ', Bidet' : '' }</p>
        <ul class="amenities">Amenities
          <li>Wifi</li>
          <li>Air conditioner</li>
          <li>Balcony</li>
          <li>Pet Friendly</li>
          <li>Access to gym and pool</li>
        </ul>
        <p class="room-cost">$${room.costPerNight}</p>
        <div class="btn-container">
        <button class="another-room" id="another-room">PICK ANOTHER ROOM</button>
        <button class="book-room" id="book-room">BOOK NOW!</button>
        </div>
      </div>
    </article>`;

  const confirmBookingBtn = document.querySelector('.book-room');
  const anotherBookingBtn = document.querySelector('.another-room');
  const modalEsc = document.querySelector('.modal-esc');
  confirmBookingBtn.focus();

  const tabTrap = (e) => {
    if (e.keyCode === 9 && document.activeElement.id === 'book-room') {
      anotherBookingBtn.focus();
    }

    if (e.keyCode === 9 && e.shiftKey && document.activeElement.id === 'modal-esc') {
      anotherBookingBtn.focus();
    }
  };

  modalEsc.addEventListener('keydown', tabTrap);
  confirmBookingBtn.addEventListener('keydown', tabTrap);

  confirmBookingBtn.addEventListener('click', () => {
   showConfirmedBooking(room, date);
  });


  anotherBookingBtn.addEventListener('click', (e) => {
    addHidden(bookingModal);
  });
  modalEsc.addEventListener('click', (e) => {
    addHidden(bookingModal);
  });
};

const showConfirmedBooking = (room, date) => {
  const firstName = currentUser.name.split(' ')[0];
  const formatedDate = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.formatDate)(date);
  const bookRoomReceipt = (0,_booking_utils__WEBPACK_IMPORTED_MODULE_1__.formatRoomToPost)(formatedDate, room, currentUser.id);

  (0,_api_calls__WEBPACK_IMPORTED_MODULE_0__.postBooking)(bookRoomReceipt)
    .then((response) => {

    innerModal.innerHTML = `
      <article class="rooms">
        <img class="room-image" src="${handleRoomImage(room)}" alt="turing logo">
        <div class="room-info modal-info">
          <button class="modal-esc" id="modal-esc"><img class="modal-esc-img" src="./images/close-symbol.png" alt="esc button"></button>
          <h3 class="booking-thanks">${firstName}, thank you for booking a ${room.roomType} with us</h3>
          <p class="booking-date">Your booking is confirmed on ${formatedDate}</p>
          <p class="reference">Your booking reference: ${response.newBooking.id}</p>
          <div class="btn-container">
            <button class="return-main" id="return-main">return </button>
          </div>
        </div>
      </article>`;
      (0,_scripts__WEBPACK_IMPORTED_MODULE_2__.setData)();

      const closeBookingReferenceBtn = document.querySelector('.return-main');
      const modalEsc = document.querySelector('.modal-esc');
      const tabTrap = (e) => {
        if (e.keyCode === 9 && document.activeElement.id === 'return-main') {
          modalEsc.focus();
        }
    
        if (e.keyCode === 9 && e.shiftKey && document.activeElement.id === 'modal-esc') {
          closeBookingReferenceBtn.focus();
        }
      };
    
      closeBookingReferenceBtn.addEventListener('keydown', tabTrap);
         
      closeBookingReferenceBtn.addEventListener('click', () => {
        resetRoomDisplay();
        addHidden(bookingModal);
        removeHidden(welcomeMessage);
        removeHidden(coverImg);
        banner.style.background = 'none';
      });
      
      modalEsc.addEventListener('keydown', tabTrap);
      modalEsc.addEventListener('click', () => {
        resetRoomDisplay();
        addHidden(bookingModal);
        removeHidden(welcomeMessage);
        removeHidden(coverImg);
        banner.style.background = 'none';
      });
    })   
    .catch(error => handelErrorMessage(error));
};

const handleRoomImage = (room) => {
  
  if (room.numBeds === 1 && room.roomType === 'single room') {
    return `./images/single-room.jpg`;
  } else if (room.numBeds === 2 && room.roomType === 'single room') {
    return `./images/double-room.jpg`;
  } else if (room.numBeds === 1 && room.roomType === 'junior suite') {
    return `./images/single-junior-suite.jpg`;
  } else if (room.numBeds === 2 && room.roomType === 'junior suite') {
    return `./images/double-junior-suite.jpg`;
  } else if (room.numBeds === 1 && room.roomType === 'suite') {
    return `./images/single-suite.jpg`;
  } else if (room.numBeds === 2 && room.roomType === 'suite') {
    return `./images/double-suite.jpg`;
  } else if (room.numBeds === 1 && room.roomType === 'residential suite') {
    return `./images/single-residential-suite.jpg`;
  } else {
    return `./images/double-residential-suite.jpg`;
  }
};

const handleActiveBtn = () => {
  navBtns.forEach(button => {
    button.classList.remove('nav-tab-active');
    button.style.color = '#636363'
  });
};

const addHidden = (element) => {
  element.classList.add('hidden');
}

const removeHidden = (element) => {
  element.classList.remove('hidden');
}

const getUserInfo = (user) => {
  currentUser = user;
};

const adjustBannerStyleBg = (condition) => {
  return condition ? banner.style.background = '#ffffff' : banner.style.background = 'none';
};

const viewDashboardBackground = (condition) => {
  if (condition) {
    removeHidden(coverImg);
    removeHidden(welcomeMessage);
    adjustBannerStyleBg(!condition);
  } else {
    addHidden(coverImg);
    addHidden(welcomeMessage);
    adjustBannerStyleBg(!condition);
  }
};

const resetRoomDisplay = () => {
  displayRooms.innerHTML = '';
};

const displayUserError = (condition) => {
  return condition ? falseValidation.innerText = 'Please enter a valid username and password' : falseValidation.innerText = '';
};

const handelErrorMessage = (message) => {
  removeHidden(handelErrorPage);
  errorMessage.innerText = `${message}`;
  addHidden(_scripts__WEBPACK_IMPORTED_MODULE_2__.loginPage)
} 




/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkUsername": () => (/* binding */ checkUsername),
/* harmony export */   "getUserBookings": () => (/* binding */ getUserBookings),
/* harmony export */   "getTotalSpent": () => (/* binding */ getTotalSpent),
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "getTodaysDate": () => (/* binding */ getTodaysDate),
/* harmony export */   "filterOutUnavailableRooms": () => (/* binding */ filterOutUnavailableRooms),
/* harmony export */   "filterAvailableRoomsByType": () => (/* binding */ filterAvailableRoomsByType),
/* harmony export */   "findRoom": () => (/* binding */ findRoom),
/* harmony export */   "formatRoomToPost": () => (/* binding */ formatRoomToPost),
/* harmony export */   "checkPassword": () => (/* binding */ checkPassword),
/* harmony export */   "capatalizeFirstLetter": () => (/* binding */ capatalizeFirstLetter)
/* harmony export */ });
// =========================================================
// =====================   functions   =====================
// =========================================================

const getTodaysDate = () => {
  let date = new Date().toLocaleDateString("en-CA");
  return date;
};

const formatDate = (date) => {
  return date.replaceAll('-', '/');
};

const checkUsername = (username) => {
  const user = username.toLowerCase();

  const keyword = user.substring(0, 8);
  const userId = parseInt(user.substring(8));

  if (keyword !== 'customer' || isNaN(userId) || userId > 50 || userId < 1) {
    return 'Please enter a valid username and password';
  }

  return userId;
};

const getUserBookings = (date, userId, bookings, timeline) => {
  const userBookings = bookings.filter((bookings) => bookings.userID === userId);
  const todaysDate = formatDate(date);
  let timelineBookings;

  if (timeline === 'past') {
    timelineBookings = userBookings.filter(booking => todaysDate > booking.date);
  } else {
    timelineBookings = userBookings.filter(booking => todaysDate <= booking.date);
  }

  if (!timelineBookings.length) {
    return `No ${timeline} bookings${timeline === 'upcoming' ? ', book with us today!' : ''}`;
  } else {
    return timelineBookings;
  }  
};

const getTotalSpent = (userBookings, roomList) => {
  let totalSpent = 0;
  
  if (!Array.isArray(userBookings)) {
    return `$0`;
  } else {
    userBookings.forEach(booking => {
      const room = roomList.find(room => room.number === booking.roomNumber);
      totalSpent += room.costPerNight;
    });
  }

  return `$${totalSpent.toFixed(2)}`;
};

const filterOutUnavailableRooms = (date, bookings, rooms) => {
  const formatedDate = formatDate(date)
  const unavailableRooms = bookings.filter(booking => booking.date === formatedDate).map(unavailableRoom => unavailableRoom.roomNumber);
  const availableRooms = rooms.filter(room => !unavailableRooms.includes(room.number))

  return availableRooms;
};

const filterAvailableRoomsByType = (availableRooms, filterType, date) => {
  if (!availableRooms.length && filterType !== 'upcoming') { 
    return `Sorry, we are fully booked on ${date}, please consider staying with us another night`;
  } 

  if (filterType === 'All Rooms' || filterType === undefined) {
    return availableRooms;
  } else {
    const roomType = filterType.toLowerCase();
    const filteredAvailableRooms = availableRooms.filter(room => room.roomType === roomType);

    return filteredAvailableRooms;
  }
};

const findRoom = (roomNumber, rooms) => {
  return rooms.find(room => room.number === parseInt(roomNumber))
};

const formatRoomToPost = (date, room, userId) => {
  return { 
    userID: userId, 
    date: date, 
    roomNumber: room.number 
  };
};

const checkPassword = (password) => {
  return password === 'overlook2021' ? true : false;
};

const capatalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map