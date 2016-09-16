import React from 'react'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import {glMatrix, mat4} from 'gl-matrix'
import {Bindings} from './canvas'
require('../style/viewport.scss')
import {glInitialized} from './canvas'
import classnames from 'classnames'
import ComponentWrapper from './component-wrapper'

class Viewport extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Viewport';
  }

  /*componentWillReceiveProps(nextProps) {
    if (nextProps.gl && !this.props.gl) {
      this.glInitialized(nextProps.gl)
    }
  }*/

  componentDidMount() {
    // let socket = io(this.props.address)
    // socket.on('connect', () =>
    //   console.log('Connected to viewport server', this.props.address)
    // )
    // socket.on('connect_error', err =>
    //   console.log(err)
    // )
    // socket.on('disconnect', () =>
    //   console.log('Disconnected from viewport server')
    // )
    // if (this.props.gl) {
    //   this.glInitialized(this.props.gl)
    // }
    this.draw = this.draw.bind(this)
    glInitialized.then(() => {
      const {gl} = this.props
      this.draw()
      // process.nextTick(this.draw)
      gl.canvas.addEventListener('glCleared', this.draw)
    })
  }

  componentWillUnmount() {
    const {gl} = this.props
    glInitialized.then(() => {
      gl.canvas.removeEventListener('glCleared', this.draw)
    })
  }

  setup() {
    const {gl, Bindings} = this.props
    // gl.enable(gl.DEPTH_TEST)
    // gl.enable(gl.SCISSOR_TEST)
    let rect = this.refs.viewport.getBoundingClientRect()
    // gl.scissor(rect.left, document.body.clientHeight - rect.top - rect.height, rect.width, rect.height)
    // gl.viewport(rect.left, document.body.clientHeight - rect.top - rect.height, rect.width, rect.height)
    gl.clearColor(0.05,0.05,0.05,1)
    Bindings.scissorViewport(rect.left, document.body.clientHeight - rect.top - rect.height, rect.width, rect.height)
  }

  draw() {
    const {gl, Bindings} = this.props
    if (gl.lastViewport != this) {
      this.setup()
      gl.lastViewport = this
    }
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    Bindings.drawTriangle()
  }

  get rect() {
    let rect = this.refs.viewport.getBoundingClientRect()
    return {
      left: rect.left,
      bottom: document.body.clientHeight - rect.top - rect.height,
      width: rect.width,
      height: rect.height
    }
  }

  get aspectRatio() {
    let rect = this.rect
    return rect.width / rect.height
  }

  get _padding() {
    return `0 0 ${100 / this.props.aspectRatio + '%'} 0`
  }

  render() {
    let classes = classnames({
      'viewport': true,
      'no-aspect': !this.props.aspectRatio
    })

    return (
      <ComponentWrapper component={this}>
        <div ref="viewport" className={classes} style={{'padding': this._padding }}></div>
      </ComponentWrapper>
    );
  }
}

Viewport.propTypes = {
  address: React.PropTypes.string,
  // aspectRatio: React.PropTypes.number.isRequired,
  gl: React.PropTypes.object
}

Viewport.defaultProps = {
  // aspectRatio: 1
}

function mapStateToProps(state, ownProps) {
  const {gl} = state
  return Object.assign({
    gl: gl.context || null,
    Module: gl.Module,
    Bindings: gl.Bindings
  }, state.props[ownProps.id], ownProps)
}

export default connect(mapStateToProps)(Viewport)
