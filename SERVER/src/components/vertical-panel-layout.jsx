import React from 'react'
import {connect} from 'react-redux'
import Layout from './layout'
import {Direction} from './flags'
import PanelLayout from './panel-layout'

class VerticalPanelLayout extends PanelLayout {
  constructor(props) {
    super(props)
  }

  render() {
    return <PanelLayout {...this.props} direction={Direction.Vertical} />
  }
}

export default connect(Layout.mapStateToProps)(VerticalPanelLayout)
