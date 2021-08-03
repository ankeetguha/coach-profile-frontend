"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CoachService = _interopRequireDefault(require("@/controllers/CoachService"));

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Importing CoachService
//Importing libraries
var _default = {
  methods: {
    getCoach: function getCoach(fields) {
      var coach;
      return regeneratorRuntime.async(function getCoach$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_lodash["default"].isEmpty(this.$store.state.coach)) {
                _context.next = 8;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(_CoachService["default"].GetCoach(fields));

            case 3:
              coach = _context.sent;
              this.$store.commit("updateCoach", coach);
              return _context.abrupt("return", coach);

            case 8:
              return _context.abrupt("return", this.$store.state.coach);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    },
    //Extract first name from string
    getFirstName: function getFirstName(fullName) {
      if (fullName.indexOf(' ') >= 0) {
        fullName = fullName.split(' ');
      }

      return fullName[0];
    },
    validateForm: function validateForm(formFields) {
      var hasErrors = false;

      for (var _i = 0, _Object$keys = Object.keys(formFields); _i < _Object$keys.length; _i++) {
        var field = _Object$keys[_i];

        if (formFields[field].type == 'group') {
          this.validateForm(formFields[field].fields);
        } else if (!this.validateData(formFields[field])) {
          formFields[field].hasError = true;
          hasErrors = true;
        } else {
          formFields[field].hasError = false;
        }
      }

      return {
        hasErrors: hasErrors,
        formFields: formFields
      };
    },
    validateData: function validateData(field) {
      switch (field.type) {
        case "text":
        case "textarea":
        case "tel":
        case "date":
        case "number":
        case "money":
        case "password":
          if (field.required && (field.value == undefined || field.value.length == 0)) return false;else return true;

        case "toggle":
        case "checkbox":
          return true;

        case "radio":
          if (field.required && (field.modelName == undefined || field.modelName.length == 0)) return false;else return true;

        case "file-large":
          if (field.required && (field.fileList == undefined || field.fileList.length == 0)) return false;else return true;

        case "dropdown":
          if (field.required && field.value == null) return false;else return true;

        case "multiple-select-dropdown":
          if (field.required && field.selectedItems.length == 0) return false;else return true;

        case "email":
          if (field.required && (field.value == undefined || field.value.length == 0)) return false;else if (!field.required && (field.value == undefined || field.value.length == 0)) {
            return true;
          } else {
            var emailValidator = /^\w+[\w-+.]*@\w+([-.]\w+)*\.[a-zA-Z]{2,}$/;
            return field.value.match(emailValidator);
          }
      }
    },
    //Reset form fields
    resetFields: function resetFields(formFields) {
      for (var _i2 = 0, _Object$keys2 = Object.keys(formFields); _i2 < _Object$keys2.length; _i2++) {
        var field = _Object$keys2[_i2];
        if (formFields[field].type == "group") this.resetFields(formFields[field].fields);else if (formFields[field].type == "file-large") formFields[field].fileList = [];else {
          formFields[field].value = null;
        }
      }
    },
    //Conver the number to Indian Number
    convertToIndianNumber: function convertToIndianNumber(number) {
      if (typeof number == 'number') return number.toLocaleString('en-IN');else return parseInt(number).toLocaleString('en-IN');
    },
    //Convert to date and month
    convertToMonthDate: function convertToMonthDate(date) {
      return (0, _moment["default"])(date).format('Do MMMM');
    }
  }
};
exports["default"] = _default;