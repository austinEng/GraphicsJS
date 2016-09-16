import React from 'react'
import {connect} from 'react-redux'
import {setProp} from '../actions'

class PropertyField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {handleChange, field, value, pprops, ...rest} = this.props
    return <input onChange={handleChange} name={field} value={value} {...rest}></input>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    value: ownProps.pprops[ownProps.field]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChange: function(e) {
      dispatch(setProp(ownProps.pprops.id, ownProps.field, e.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyField)
