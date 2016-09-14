webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _utils = __webpack_require__(59);

	module.exports = {
	  layout: {
	    root: 0,
	    floating: [6],
	    classes: {
	      0: _utils.Types.CentralWindow,
	      1: _utils.Types.HorizontalPanelLayout,
	      2: _utils.Types.VerticalPanelLayout,
	      3: _utils.Types.Viewport,
	      4: _utils.Types.Viewport,
	      5: _utils.Types.Viewport,
	      6: _utils.Types.Canvas
	    },
	    sizes: {
	      2: {
	        width: 1
	      },
	      3: {
	        width: 3
	      },
	      4: {
	        height: 4
	      },
	      5: {
	        height: 3
	      }
	    },
	    children: {
	      0: [1],
	      1: [2, 3],
	      2: [4, 5]
	    }
	  },
	  props: {
	    0: {
	      test: 'hi'
	    },
	    3: {
	      aspectRatio: 16 / 9
	    },
	    4: {
	      aspectRatio: 1
	    },
	    5: {
	      aspectRatio: 4 / 3
	    }
	  }
	};

/***/ }
]);