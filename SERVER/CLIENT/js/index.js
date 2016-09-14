webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(70);

	var _reactRedux = __webpack_require__(36);

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	var _configureStore = __webpack_require__(289);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _configureStore2.default)(window.__PRELOADED_STATE__);

	console.log('INITIAL STATE:', store.getState());

	(0, _reactDom.render)(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: store },
	  _react2.default.createElement(_app2.default, null)
	), document.getElementById('root'));

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(43);

	var _reduxThunk = __webpack_require__(290);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(291);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reducers = __webpack_require__(292);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// const {createStore, applyMiddleware} = require('redux')
	// const thunkMiddleware = require('redux-thunk').default
	// const createLogger = require('redux-logger')
	// const {graphicsApp} = require('./reducers')

	var loggerMiddleware = (0, _reduxLogger2.default)();

	function configureStore(preloadedState) {
	  return (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware));
	}

	// import createStore from 'redux'
	// import graphicsApp from './reducers'

	// export default function configureStore(preloadedState) {
	//   return createStore(
	//     graphicsApp,
	//     preloadedState
	//   )
	// }

/***/ },

/***/ 290:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch;
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }

	        return next(action);
	      };
	    };
	  };
	}

	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	exports['default'] = thunk;

/***/ },

/***/ 291:
/***/ function(module, exports) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * parse the level option of createLogger
	 *
	 * @property {string | function | object} level - console[level]
	 * @property {object} action
	 * @property {array} payload
	 * @property {string} type
	 */

	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
	    case "object":
	      return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case "function":
	      return level(action);
	    default:
	      return level;
	  }
	}

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string | function | object} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _options$level = options.level;
	  var level = _options$level === undefined ? "log" : _options$level;
	  var _options$logger = options.logger;
	  var logger = _options$logger === undefined ? console : _options$logger;
	  var _options$logErrors = options.logErrors;
	  var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	  var collapsed = options.collapsed;
	  var predicate = options.predicate;
	  var _options$duration = options.duration;
	  var duration = _options$duration === undefined ? false : _options$duration;
	  var _options$timestamp = options.timestamp;
	  var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	  var transformer = options.transformer;
	  var _options$stateTransfo = options.stateTransformer;
	  var // deprecated
	  stateTransformer = _options$stateTransfo === undefined ? function (state) {
	    return state;
	  } : _options$stateTransfo;
	  var _options$actionTransf = options.actionTransformer;
	  var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	    return actn;
	  } : _options$actionTransf;
	  var _options$errorTransfo = options.errorTransformer;
	  var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	    return error;
	  } : _options$errorTransfo;
	  var _options$colors = options.colors;
	  var colors = _options$colors === undefined ? {
	    title: function title() {
	      return "#000000";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  } : _options$colors;

	  // exit if console undefined

	  if (typeof logger === "undefined") {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }

	  if (transformer) {
	    console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	  }

	  var logBuffer = [];
	  function printBuffer() {
	    logBuffer.forEach(function (logEntry, key) {
	      var started = logEntry.started;
	      var startedTime = logEntry.startedTime;
	      var action = logEntry.action;
	      var prevState = logEntry.prevState;
	      var error = logEntry.error;
	      var took = logEntry.took;
	      var nextState = logEntry.nextState;

	      var nextEntry = logBuffer[key + 1];
	      if (nextEntry) {
	        nextState = nextEntry.prevState;
	        took = nextEntry.started - started;
	      }
	      // message
	      var formattedAction = actionTransformer(action);
	      var isCollapsed = typeof collapsed === "function" ? collapsed(function () {
	        return nextState;
	      }, action) : collapsed;

	      var formattedTime = formatTime(startedTime);
	      var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	      var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");

	      // render
	      try {
	        if (isCollapsed) {
	          if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	        } else {
	          if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	        }
	      } catch (e) {
	        logger.log(title);
	      }

	      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
	      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
	      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
	      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");

	      if (prevStateLevel) {
	        if (colors.prevState) logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[prevStateLevel]("prev state", prevState);
	      }

	      if (actionLevel) {
	        if (colors.action) logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[actionLevel]("action", formattedAction);
	      }

	      if (error && errorLevel) {
	        if (colors.error) logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[errorLevel]("error", error);
	      }

	      if (nextStateLevel) {
	        if (colors.nextState) logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[nextStateLevel]("next state", nextState);
	      }

	      try {
	        logger.groupEnd();
	      } catch (e) {
	        logger.log("—— log end ——");
	      }
	    });
	    logBuffer.length = 0;
	  }

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        var logEntry = {};
	        logBuffer.push(logEntry);

	        logEntry.started = timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;

	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }

	        logEntry.took = timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());

	        printBuffer();

	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}

	module.exports = createLogger;

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(59);

	var _redux = __webpack_require__(43);

	var _actions = __webpack_require__(64);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	// export function graphicsApp(state = {}, action) {
	//   return state
	// }


	function sizes() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _actions.SET_SIZES:
	      return Object.assign({}, state, action.sizes);
	    default:
	      return state;
	  }
	}

	function distributeSizeProperty(state, newSizes, id, property) {
	  var children = state.children;
	  var sizes = state.sizes;


	  var parentProp = newSizes[id][property];
	  if (typeof parentProp === 'undefined') parentProp = sizes[id][property];

	  var childIds = children[id];

	  var childProperties = childIds.map(function (childId) {
	    var childSize = sizes[childId] || {};
	    return childSize[property] || parentProp / childIds.length;
	  });
	  var total = childProperties.reduce(function (a, b) {
	    return a + b;
	  });

	  childIds.forEach(function (childId, i) {
	    var prop = _defineProperty({}, property, parentProp * childProperties[i] / total);
	    if (newSizes.hasOwnProperty(childId)) {
	      Object.assign(newSizes[childId], prop);
	    } else {
	      newSizes[childId] = prop;
	    }
	  });
	}

	function promoteSizeProperty(state, newSizes, id, property) {
	  var children = state.children;
	  var sizes = state.sizes;

	  var parentProp = newSizes[id][property];
	  if (typeof parentProp === 'undefined') parentProp = sizes[id][property];
	  var childIds = children[id];

	  childIds.forEach(function (childId, i) {
	    var prop = _defineProperty({}, property, parentProp);
	    if (newSizes.hasOwnProperty(childId)) {
	      Object.assign(newSizes[childId], prop);
	    } else {
	      newSizes[childId] = prop;
	    }
	  });
	}

	function recursiveDistribute(state, newSizes, id) {
	  var children = state.children;
	  var sizes = state.sizes;
	  var classes = state.classes;


	  var childIds = children[id];
	  if (typeof childIds === 'undefined') return newSizes;

	  var nextSizes = Object.assign({}, newSizes);

	  promoteSizeProperty(state, nextSizes, id, 'width');
	  promoteSizeProperty(state, nextSizes, id, 'height');

	  switch (classes[id]) {
	    case _utils.Types.HorizontalPanelLayout:
	    case _utils.Types.HorizontalLayout:
	      distributeSizeProperty(state, nextSizes, id, 'width');
	      break;
	    case _utils.Types.VerticalPanelLayout:
	    case _utils.Types.VerticalLayout:
	      distributeSizeProperty(state, nextSizes, id, 'height');
	      break;
	  }

	  childIds.forEach(function (childId) {
	    Object.assign(nextSizes, recursiveDistribute(state, nextSizes, childId));
	  });

	  return nextSizes;
	}

	function reduceLayout(state, action) {
	  switch (action.type) {
	    case _actions.DISTRIBUTE_SIZES:
	      var newSizes = recursiveDistribute(state, _defineProperty({}, action.id, action.size), action.id);
	      var nextState = Object.assign({}, state);
	      for (var newSize in newSizes) {
	        if (nextState.sizes.hasOwnProperty(newSize)) {
	          Object.assign(nextState.sizes[newSize], newSizes[newSize]);
	        } else {
	          nextState.sizes[newSize] = newSizes[newSize];
	        }
	      }
	      return nextState;
	    default:
	      return state;
	  }
	}

	function layout() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  var nextState = Object.assign({}, state, reduceLayout(state, action));
	  return Object.assign({}, nextState, { sizes: sizes(nextState.sizes, action) });
	}

	function props() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  return state;
	}

	function gl() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _actions.INIT_GL:
	      return Object.assign({}, state, {
	        context: action.context,
	        Module: action.Module,
	        Bindings: action.Bindings
	      });
	    default:
	      return state;
	  }
	}

	var rootReducer = (0, _redux.combineReducers)({
	  layout: layout,
	  props: props,
	  gl: gl
	});

	exports.default = rootReducer;

/***/ }

});