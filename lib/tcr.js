(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tcr", [], factory);
	else if(typeof exports === 'object')
		exports["tcr"] = factory();
	else
		root["tcr"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Registry = exports.Account = undefined;

var _components = __webpack_require__(5);

exports.Account = _components.Account;
exports.Registry = _components.Registry;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Registry = exports.Account = undefined;

var _Account = __webpack_require__(6);

var _Account2 = _interopRequireDefault(_Account);

var _Registry = __webpack_require__(7);

var _Registry2 = _interopRequireDefault(_Registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Account = _Account2.default;
exports.Registry = _Registry2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contracts = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function () {
  function Account(address, tokenAddress, provider) {
    _classCallCheck(this, Account);

    this.address = address;
    this.provider = provider;
    this.tokenContract = (0, _contracts.contract)('StandardToken', tokenAddress, provider);
  }

  _createClass(Account, [{
    key: 'getTokenBalance',
    value: function getTokenBalance() {
      return this.tokenContract.methods.balanceOf(this.address).call();
    }
  }, {
    key: 'getEtherBalance',
    value: function getEtherBalance() {
      return this.provider.eth.getBalance(this.address);
    }
  }]);

  return Account;
}();

exports.default = Account;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contracts = __webpack_require__(14);

var _Account = __webpack_require__(6);

var _Account2 = _interopRequireDefault(_Account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Registry = function () {
  function Registry(address, provider) {
    _classCallCheck(this, Registry);

    this.address = address;
    this.provider = provider;
    this.contract = (0, _contracts.contract)('Registry', address, provider);
  }

  _createClass(Registry, [{
    key: 'getAccount',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address) {
        var tokenAddress;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.contract.methods.token().call();

              case 2:
                tokenAddress = _context.sent;
                return _context.abrupt('return', new _Account2.default(address, tokenAddress, this.provider));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAccount(_x) {
        return _ref.apply(this, arguments);
      }

      return getAccount;
    }()
  }]);

  return Registry;
}();

exports.default = Registry;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"self","type":"AttributeStore.Data storage"},{"name":"UUID","type":"bytes32"},{"name":"attrName","type":"string"}],"name":"getAttribute","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"AttributeStore.Data storage"},{"name":"UUID","type":"bytes32"},{"name":"attrName","type":"string"},{"name":"attrVal","type":"uint256"}],"name":"attachAttribute","outputs":[],"payable":false,"type":"function"}]

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"_self","type":"Challenge.Data storage"}],"name":"canBeResolved","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_self","type":"Challenge.Data storage"}],"name":"isResolved","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_self","type":"Challenge.Data storage"},{"name":"_voter","type":"address"},{"name":"_salt","type":"uint256"}],"name":"claimReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_self","type":"Challenge.Data storage"}],"name":"challengeWinnerReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_self","type":"Challenge.Data storage"},{"name":"_voter","type":"address"},{"name":"_salt","type":"uint256"}],"name":"voterReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_self","type":"Challenge.Data storage"}],"name":"isInitialized","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"}]

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"self","type":"DLL.Data storage"},{"name":"curr","type":"uint256"}],"name":"getNext","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"DLL.Data storage"},{"name":"curr","type":"uint256"}],"name":"getPrev","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"DLL.Data storage"},{"name":"curr","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"DLL.Data storage"},{"name":"prev","type":"uint256"},{"name":"curr","type":"uint256"},{"name":"next","type":"uint256"}],"name":"insert","outputs":[],"payable":false,"type":"function"}]

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"getTotalNumberOfTokensForWinningOption","outputs":[{"name":"numTokens","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"commitStageActive","outputs":[{"name":"active","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"revealStageActive","outputs":[{"name":"active","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_voteQuorum","type":"uint256"},{"name":"_commitDuration","type":"uint256"},{"name":"_revealDuration","type":"uint256"}],"name":"startPoll","outputs":[{"name":"pollID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voteTokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"}],"name":"getLastNode","outputs":[{"name":"pollID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"isPassed","outputs":[{"name":"passed","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pollMap","outputs":[{"name":"commitEndDate","type":"uint256"},{"name":"revealEndDate","type":"uint256"},{"name":"voteQuorum","type":"uint256"},{"name":"votesFor","type":"uint256"},{"name":"votesAgainst","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"}],"name":"getLockedTokens","outputs":[{"name":"numTokens","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_pollID","type":"uint256"},{"name":"_secretHash","type":"bytes32"},{"name":"_numTokens","type":"uint256"},{"name":"_prevPollID","type":"uint256"}],"name":"commitVote","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_pollID","type":"uint256"}],"name":"hasBeenRevealed","outputs":[{"name":"revealed","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_prevID","type":"uint256"},{"name":"_nextID","type":"uint256"},{"name":"_voter","type":"address"},{"name":"_numTokens","type":"uint256"}],"name":"validPosition","outputs":[{"name":"valid","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"pollExists","outputs":[{"name":"exists","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"rescueTokens","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"},{"name":"_pollID","type":"uint256"}],"name":"attrUUID","outputs":[{"name":"UUID","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_numTokens","type":"uint256"}],"name":"requestVotingRights","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_pollID","type":"uint256"},{"name":"_voteOption","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"revealVote","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_pollID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"getNumPassingTokens","outputs":[{"name":"correctVotes","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_numTokens","type":"uint256"}],"name":"getInsertPointForNumTokens","outputs":[{"name":"prevNode","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_pollID","type":"uint256"}],"name":"getNumTokens","outputs":[{"name":"numTokens","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_pollID","type":"uint256"}],"name":"getCommitHash","outputs":[{"name":"commitHash","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_terminationDate","type":"uint256"}],"name":"isExpired","outputs":[{"name":"expired","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_numTokens","type":"uint256"}],"name":"withdrawVotingRights","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"pollEnded","outputs":[{"name":"ended","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_tokenAddr","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"pollID","type":"uint256"},{"indexed":false,"name":"numTokens","type":"uint256"}],"name":"VoteCommitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"pollID","type":"uint256"},{"indexed":false,"name":"numTokens","type":"uint256"},{"indexed":false,"name":"choice","type":"uint256"}],"name":"VoteRevealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voteQuorum","type":"uint256"},{"indexed":false,"name":"commitDuration","type":"uint256"},{"indexed":false,"name":"revealDuration","type":"uint256"},{"indexed":false,"name":"pollID","type":"uint256"}],"name":"PollCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"numTokens","type":"uint256"}],"name":"VotingRightsGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"numTokens","type":"uint256"}],"name":"VotingRightsWithdrawn","type":"event"}]

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[],"name":"PROCESSBY","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"processProposal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"proposals","outputs":[{"name":"appExpiry","type":"uint256"},{"name":"challengeID","type":"uint256"},{"name":"deposit","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"},{"name":"processBy","type":"uint256"},{"name":"value","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"propExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_challengeID","type":"uint256"}],"name":"challengeWinnerReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"}],"name":"get","outputs":[{"name":"value","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"challengeCanBeResolved","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"challengeReparameterization","outputs":[{"name":"challengeID","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_challengeID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"claimReward","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"challenges","outputs":[{"name":"rewardPool","type":"uint256"},{"name":"voting","type":"address"},{"name":"token","type":"address"},{"name":"challengeID","type":"uint256"},{"name":"challenger","type":"address"},{"name":"resolved","type":"bool"},{"name":"stake","type":"uint256"},{"name":"winningTokens","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_challengeID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"voterReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_value","type":"uint256"}],"name":"proposeReparameterization","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"canBeSet","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"params","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"voting","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_plcrAddr","type":"address"},{"name":"_minDeposit","type":"uint256"},{"name":"_pMinDeposit","type":"uint256"},{"name":"_applyStageLen","type":"uint256"},{"name":"_pApplyStageLen","type":"uint256"},{"name":"_commitStageLen","type":"uint256"},{"name":"_pCommitStageLen","type":"uint256"},{"name":"_revealStageLen","type":"uint256"},{"name":"_pRevealStageLen","type":"uint256"},{"name":"_dispensationPct","type":"uint256"},{"name":"_pDispensationPct","type":"uint256"},{"name":"_voteQuorum","type":"uint256"},{"name":"_pVoteQuorum","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposer","type":"address"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"propID","type":"bytes32"}],"name":"_ReparameterizationProposal","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"challenger","type":"address"},{"indexed":false,"name":"propID","type":"bytes32"},{"indexed":false,"name":"pollID","type":"uint256"}],"name":"_NewChallenge","type":"event"}]

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"_domain","type":"string"}],"name":"appWasMade","outputs":[{"name":"exists","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_domain","type":"string"}],"name":"updateStatus","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_domain","type":"string"},{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_challengeID","type":"uint256"}],"name":"challengeWinnerReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_domain","type":"string"}],"name":"challenge","outputs":[{"name":"challengeID","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_challengeID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"claimReward","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_domain","type":"string"},{"name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"challenges","outputs":[{"name":"rewardPool","type":"uint256"},{"name":"voting","type":"address"},{"name":"token","type":"address"},{"name":"challengeID","type":"uint256"},{"name":"challenger","type":"address"},{"name":"resolved","type":"bool"},{"name":"stake","type":"uint256"},{"name":"winningTokens","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_challengeID","type":"uint256"},{"name":"_voter","type":"address"}],"name":"tokenClaims","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_challengeID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"voterReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_domain","type":"string"}],"name":"isWhitelisted","outputs":[{"name":"whitelisted","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_domain","type":"string"},{"name":"_amount","type":"uint256"}],"name":"apply","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"listings","outputs":[{"name":"applicationExpiry","type":"uint256"},{"name":"whitelisted","type":"bool"},{"name":"owner","type":"address"},{"name":"unstakedDeposit","type":"uint256"},{"name":"challengeID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_domain","type":"string"}],"name":"canBeWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_domain","type":"string"}],"name":"challengeCanBeResolved","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_termDate","type":"uint256"}],"name":"isExpired","outputs":[{"name":"expired","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_domain","type":"string"}],"name":"challengeExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"parameterizer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_domain","type":"string"}],"name":"exit","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"voting","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_plcrAddr","type":"address"},{"name":"_paramsAddr","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"domain","type":"string"},{"indexed":false,"name":"deposit","type":"uint256"}],"name":"_Application","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"domain","type":"string"},{"indexed":false,"name":"deposit","type":"uint256"},{"indexed":false,"name":"pollID","type":"uint256"}],"name":"_Challenge","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"domain","type":"string"},{"indexed":false,"name":"added","type":"uint256"},{"indexed":false,"name":"newTotal","type":"uint256"}],"name":"_Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"domain","type":"string"},{"indexed":false,"name":"withdrew","type":"uint256"},{"indexed":false,"name":"newTotal","type":"uint256"}],"name":"_Withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"domain","type":"string"}],"name":"_NewDomainWhitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"domain","type":"string"}],"name":"_ApplicationRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"domain","type":"string"}],"name":"_ListingRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"challengeID","type":"uint256"}],"name":"_ChallengeFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"challengeID","type":"uint256"}],"name":"_ChallengeSucceeded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"challengeID","type":"uint256"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"_RewardClaimed","type":"event"}]

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contract = contract;
function contract(name, address, provider) {
  var abi = __webpack_require__(17)("./" + name + ".json");

  if (!abi) {
    return null;
  }

  return new provider.eth.Contract(abi, address);
}

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./AttributeStore.json": 8,
	"./Challenge.json": 9,
	"./DLL.json": 10,
	"./PLCRVoting.json": 11,
	"./Parameterizer.json": 12,
	"./Registry.json": 13,
	"./StandardToken.json": 16
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 17;

/***/ })
/******/ ]);
});
//# sourceMappingURL=tcr.js.map