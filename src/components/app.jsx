
import React from 'react'
import {connect} from 'react-redux'
import {deserializeComponent, getComponentClass} from './utils'
import Layout from './layout'
import LayoutItem, {makeLayoutComponent} from './layout-item'
import Canvas from './canvas'
import request from 'superagent'

require('../style/app.scss')
require('../style/layout.scss')
require('../style/component.scss')

var onEmscriptenLoaded;
var onRuntimeInitialized;
export const emscriptenLoaded = new Promise((resolve, reject) => {
  onEmscriptenLoaded = resolve
})
export const runtimeInitialized = new Promise((resolve, reject) => {
  onRuntimeInitialized = resolve
})

export const Module = {
  'onRuntimeInitialized': () => {
    onRuntimeInitialized()
  },
  TOTAL_MEMORY: 201326592
}

request.get('emscripten/graphics.js').end((err, res) => {
  if (err) return console.error(err)
  eval(`(function(Module) { ${res.text} })(Module);`);
})

// emscriptenLoaded.then(() => {
//   console.log('emscripten loaded')
// })

/*window.Module = {
  '_main': function() {
    onEmscriptenLoaded()
  },
  'onRuntimeInitialized': function() {
    onRuntimeInitialized()
  }
}*/

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let Component = getComponentClass(this.props.root._class)
    return (
      <div>
        <Component id={this.props.root.id} />
        {this.props.floating.map(child => makeLayoutComponent(child, {
          key: child.id
        }))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { root, classes, sizes, children, floating } = state.layout

  return {
    root: {
      id: root,
      _class: classes[root],
      size: sizes[root],
    },
    floating: floating.map(id => {
      return {
        id,
        _class: classes[id]
      }
    })
  }

}

export default connect(mapStateToProps)(App)
