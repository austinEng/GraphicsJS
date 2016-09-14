'use strict'

const koa = require('koa')
const logger = require('koa-logger')
const pug = require('pug')
const path = require('path')
var router = require('koa-router')()
var app = koa()

function flattenLayout(layout, components = []) {
  let component = Object.assign({}, layout)
  components.push(component)

  if (typeof layout.children === 'undefined') return []

  for (let i = 0; i < layout.children.length; i++) {
    let index = components.length
    Array.prototype.push.apply(components, flattenLayout(layout.children[i], components))
    component.children[i] = index
  }

  return components
}


function renderLayout(layout, state = {}) {
  state = Object.assign({}, state)
  state.layout = layout
  return pug.renderFile(path.join(__dirname, 'main.pug'), {
    // html: renderToString(Provider({
    //   store: configureStore(state),
    //   children: React.createElement(App, null, null)
    // })),
    preloadedState: state
  })
}

// router.get('/', function *(next) {
//   this.body = renderLayout(flattenLayout({
//     class: 'CentralWindow'
//   }))
// })

const {Types} = require('./src/components/utils')

const ViewportLayout = {
  layout: {
    root: 0,
    floating: [6],
    classes: {
      0: Types.CentralWindow, 
      1: Types.HorizontalPanelLayout,
      2: Types.VerticalPanelLayout,
      3: Types.Viewport,
      4: Types.Viewport,
      5: Types.Viewport,
      6: Types.Canvas
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
    },
  },
  props: {
    0: {
      test: 'hi'
    },
    3: {
      aspectRatio: 16/9,
    },
    4: {
      aspectRatio: 1,
    },
    5: {
      aspectRatio: 4/3,
    }
  }
}

router.get('/viewport', function *(next) {
  this.body = pug.renderFile(path.join(__dirname, 'main.pug'), {
    preloadedState: ViewportLayout
  })
})

router.get('/', function *(next) {
  this.body = pug.renderFile(path.join(__dirname, 'main.pug'), {
    preloadedState: ViewportLayout
  })
})

app
  .use(logger())
  .use(require('koa-static')(path.join(__dirname, 'CLIENT')))
  .use(router.routes())
  .use(router.allowedMethods())

var server = app.listen({ host: 'localhost', port: 3000 }, () => {
  console.log("Component server listening on %s:%s", server.address().address, server.address().port);  
})