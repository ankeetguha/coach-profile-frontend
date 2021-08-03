"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Variables = _interopRequireDefault(require("../mixins/Variables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require('dotenv').config();

var apiURL = _Variables["default"].skipperAPIURL;

var CoachService =
/*#__PURE__*/
function () {
  function CoachService() {
    _classCallCheck(this, CoachService);
  }

  _createClass(CoachService, null, [{
    key: "GetCoach",
    //Service to get coach
    value: function GetCoach(fields) {
      return new Promise(function (resolve, reject) {
        resolve(function _callee() {
          return regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return regeneratorRuntime.awrap(_axios["default"].post("".concat(apiURL, "/coach/get"), {
                    fields: fields
                  }, {
                    withCredentials: true
                  }).then(function (response) {
                    return response.data;
                  }, function (error) {
                    console.log(error);
                    return false;
                  }));

                case 3:
                  return _context.abrupt("return", _context.sent);

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](0);
                  console.log('err', _context.t0);
                  reject(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, null, null, [[0, 6]]);
        }());
      });
    }
  }, {
    key: "SendMessage",
    value: function SendMessage(fields) {
      return new Promise(function (resolve, reject) {
        resolve(function _callee2() {
          return regeneratorRuntime.async(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return regeneratorRuntime.awrap(_axios["default"].post("".concat(apiURL, "/coach/book-plan"), {
                    fields: fields
                  }, {
                    withCredentials: true
                  }).then(function (response) {
                    return response.data;
                  }, function (error) {
                    console.log(error);
                    return false;
                  }));

                case 3:
                  return _context2.abrupt("return", _context2.sent);

                case 6:
                  _context2.prev = 6;
                  _context2.t0 = _context2["catch"](0);
                  console.log('err', _context2.t0);
                  reject(_context2.t0);

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, null, null, [[0, 6]]);
        }());
      });
    }
  }]);

  return CoachService;
}();

var _default = CoachService;
exports["default"] = _default;