import React from 'react'
import {connect} from 'react-redux'
import {initGL} from '../actions'
import {emscriptenLoaded, runtimeInitialized} from './app'
import request from 'superagent'
require('../style/canvas.scss')

export const Bindings = {}
export var Module = {}

var canvasScriptLoaded = new Promise((resolve, reject) => {
  request.get('/emscripten/canvas.js').end((err, res) => {
    if (err) return reject(err)
    return resolve(res.text)
  })
})

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }

  static get Bindings() {
    return Bindings
  }

  componentDidMount() {
    const {canvas} = this.refs

    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    Module = {
      canvas,

      'onRuntimeInitialized': () => {
        Bindings.initGL = Module.cwrap('initGL', 'number', ['number', 'number'])
        Bindings.drawTriangle = Module.cwrap('drawTriangle', 'number', [])
        Bindings.clearGL = Module.cwrap('clearGL', 'number', [])
        Bindings.resizeGL = Module.cwrap('resizeGL', 'number', ['number', 'number'])
        Bindings.scissorViewport = Module.cwrap('scissorViewport', 'number', ['number', 'number', 'number', 'number'])
        if (!Bindings.initGL(document.body.clientWidth, document.body.clientHeight)) {
          return
        }
        gl = Module.canvas.GLctxObject.GLctx

        this.props.dispatch(initGL(gl, Module, Bindings))

        let repaint = () => {
          this.setState({
            width: document.body.clientWidth,
            height: document.body.clientHeight
          })

          gl.disable(gl.SCISSOR_TEST)
          gl.clearColor(0,0,0,0)
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
          gl.lastViewport = null

          let ev = new CustomEvent('glCleared', {})
          this.refs.canvas.dispatchEvent(ev)
        }

        document.addEventListener('splitterResize', function(ev) {
          requestAnimationFrame(repaint)  
        })
        window.addEventListener('resize', (ev) => {
          requestAnimationFrame(repaint)
        })
      }
    }

    canvasScriptLoaded.then(js => {
      eval(`(function(Module) { ${js} })(Module);`);
    })
    
  }

  render() {
    return <canvas width={`${this.state.width}px`} height={`${this.state.height}px`} ref='canvas' id='canvas' />
  }
}

function mapStateToProps(state) {
  const {gl} = state
  return {
    gl
  }
}

export default connect(mapStateToProps)(Canvas)