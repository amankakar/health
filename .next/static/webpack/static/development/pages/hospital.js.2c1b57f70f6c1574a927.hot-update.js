webpackHotUpdate("static/development/pages/hospital.js",{

/***/ "./pages/hospital.js":
/*!***************************!*\
  !*** ./pages/hospital.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _build_contracts_ReceptionsitFactory_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../build/contracts/ReceptionsitFactory.json */ "./build/contracts/ReceptionsitFactory.json");
var _build_contracts_ReceptionsitFactory_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../build/contracts/ReceptionsitFactory.json */ "./build/contracts/ReceptionsitFactory.json", 1);
/* harmony import */ var _build_contracts_Receptionsit_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../build/contracts/Receptionsit.json */ "./build/contracts/Receptionsit.json");
var _build_contracts_Receptionsit_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../build/contracts/Receptionsit.json */ "./build/contracts/Receptionsit.json", 1);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../routes */ "./routes.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ethereum_web3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ethereum/web3 */ "./ethereum/web3.js");
/* harmony import */ var truffle_contract__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! truffle-contract */ "./node_modules/truffle-contract/index.js");
/* harmony import */ var truffle_contract__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(truffle_contract__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.js");
/* harmony import */ var _ethereum_receptionFactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ethereum/receptionFactory */ "./ethereum/receptionFactory.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var index =
/*#__PURE__*/
function (_Component) {
  _inherits(index, _Component);

  function index() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(index)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      web3: null,
      accounts: null,
      hospitalName: "",
      receptionistName: "",
      instanceFactory1: "",
      receptionistInstance: "",
      recetionistAddress: "",
      instanceFactory: "",
      receptionist: "",
      receptionList: []
    });

    return _this;
  }

  _createClass(index, [{
    key: "renderHospitals",
    value: function renderHospitals() {
      console.log("BRFORE:", this.props.receptionist);
      var items = this.props.receptionist.map(function (element, index) {
        var address = element[3];
        return {
          header: "Hospital Name:  " + element[0],
          description: "Admin Name:  " + element[1],
          meta: "Account of Admin:  " + element[2],
          extra: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_routes__WEBPACK_IMPORTED_MODULE_5__["Link"], {
            route: "hospital/".concat(address)
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
            color: "blue"
          }, "Visit Hospital")),
          fluid: true
        };
      });
      console.log("Lenght", this.props.receptionist);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Card"].Group, {
        items: items,
        style: {
          color: "black",
          marginTop: 10,
          borderRadius: 4,
          margin: 10,
          fontFamily: "Times New Roman, Times, serif",
          fontSize: 20
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.noAddress === null) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_8__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            color: "red"
          }
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "You are not Registered as Hospital Admin or you have selected wrong account in metamask")));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_8__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_routes__WEBPACK_IMPORTED_MODULE_5__["Link"], {
          route: "hospital/register"
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Button"], {
          floated: "right",
          primary: true,
          content: "Register New Admin/Receptionist",
          icon: "add circle",
          labelPosition: "left"
        }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            marginLeft: 300
          }
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "List Of All Registered Hospitals")), " "), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, this.renderHospitals()));
      }
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var accounts, Contract, instanceFactory, hospitalAddress, receptionCount, receptionist;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //const web3 = await getWeb3();
                console.log("web3", _ethereum_web3__WEBPACK_IMPORTED_MODULE_6__["default"].version);
                _context.next = 3;
                return _ethereum_web3__WEBPACK_IMPORTED_MODULE_6__["default"].eth.getAccounts();

              case 3:
                accounts = _context.sent;
                //this.setState({ web3, accounts });
                Contract = truffle_contract__WEBPACK_IMPORTED_MODULE_7___default()(_build_contracts_ReceptionsitFactory_json__WEBPACK_IMPORTED_MODULE_2__);
                Contract.setProvider(_ethereum_web3__WEBPACK_IMPORTED_MODULE_6__["default"].currentProvider);
                console.log("accounts", accounts);
                _context.next = 9;
                return Contract.deployed();

              case 9:
                instanceFactory = _context.sent;
                console.log("Address:", instanceFactory);
                _context.next = 13;
                return instanceFactory.accountToAddress.call(accounts[0]);

              case 13:
                hospitalAddress = _context.sent;
                console.log(accounts);

                if (!(hospitalAddress == 0x0000000000000000000000000000000000000000)) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", {
                  noAddress: null
                });

              case 19:
                _context.next = 21;
                return instanceFactory.getReceptionList.call();

              case 21:
                receptionCount = _context.sent;
                console.log("List of :", receptionCount);
                _context.next = 25;
                return Promise.all(Array(parseInt(receptionCount)).fill().map(function (element, index) {
                  return instanceFactory.receptionSummary.call(index);
                }));

              case 25:
                receptionist = _context.sent;
                console.log("Receptionist Array", receptionist[0]);
                return _context.abrupt("return", {
                  receptionist: receptionist
                });

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps() {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return index;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (index);
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/hospital")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=hospital.js.2c1b57f70f6c1574a927.hot-update.js.map