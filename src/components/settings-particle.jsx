import React from 'react'
import Settings from './settings'
import {connect} from 'react-redux'
import ComponentWrapper from './component-wrapper'
import PropertyField from './property-field'

export const PORT = 42673
class ParticleSettings extends Settings {
  constructor(props) {
    super(props)
    this.displayName = 'Particle Settings'
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

  }

  stop() {

  }

  reset() {
    
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
