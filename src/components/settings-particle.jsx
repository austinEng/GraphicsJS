import React from 'react'
import Settings from './settings'
import {connect} from 'react-redux'
import ComponentWrapper from './component-wrapper'
import PropertyField from './property-field'
import request from 'superagent'
import {runtimeInitialized} from './app'
import {Bindings} from '../scene'

export const PORT = 42673
class ParticleSettings extends Settings {
  constructor(props) {
    super(props)
    this.displayName = 'Particle Settings'
    this.fluidContainer = null;
    this.running = false;
  }

  render() {
    return (
      <ComponentWrapper component={this}>
        <div className='settings'>
          <div className='form-row'>
            <label>Server</label>
            <PropertyField field='server' pprops={this.props} />
          </div>

          <div className='form-row'>
            <label>Size</label>
            <PropertyField field='sizeX' size='3' pprops={this.props} />
            <PropertyField field='sizeY' size='3' pprops={this.props} />
            <PropertyField field='sizeZ' size='3' pprops={this.props} />
          </div>

          <div className='form-row'>
            <label>Resolution</label>
            <PropertyField field='resolution' size='3' pprops={this.props} />
          </div>

          <br/>

          <div className='form-row'>
            <button onClick={this.start.bind(this)}>Run</button>
            <button onClick={this.stop.bind(this)}>Stop</button>
            <button onClick={this.reset.bind(this)}>Reset</button>
          </div>
        </div>
      </ComponentWrapper>
    )
  }

  start() {
    runtimeInitialized.then(() => {
      if (!this.fluidContainer) {
        this.fluidContainer = Bindings.initializeFluidContainer(this.props.sizeX, this.props.sizeY, this.props.sizeZ, this.props.resolution)
        console.log('Created fluid container', this.fluidContainer)
      }
      // Bindings.updateFluidContainer(this.fluidContainer)
      // console.log('stepped')
      this.running = true;
      requestAnimationFrame(this.step.bind(this))
    })
  }

  step() {
    if (!this.fluidContainer || !this.running) return;
    let d = new Date()
    Bindings.updateFluidContainer(this.fluidContainer)
    console.log(new Date() - d)
    requestAnimationFrame(this.step.bind(this))
  }

  stop() {
    this.running = false;
  }

  reset() {
    if (!this.fluidContainer) return;
    console.log('Destroying fluid container', this.fluidContainer)
    Bindings.destroyFluidContainer(this.fluidContainer)
    this.fluidContainer = null
  }
}

ParticleSettings.defaultProps = {
  server: `http://127.0.0.1:${PORT}`,
  sizeX: 20,
  sizeY: 10,
  sizeZ: 20,
  resolution: 10
}

function mapStateToProps(state, ownProps) {
  return state.props[ownProps.id] || {}
}

export default connect(mapStateToProps)(ParticleSettings)
