import React from 'react'
import {connect} from 'react-redux'
import Layout from './layout'
import {Direction} from './flags'
import PanelLayout from './panel-layout'

class HorizontalPanelLayout extends PanelLayout {
  constructor(props) {
    super(props)
  }

  render() {
    return <PanelLayout {...this.props} direction={Direction.Horizontal} />
  }
}

export default connect(Layout.mapStateToProps)(HorizontalPanelLayout)
