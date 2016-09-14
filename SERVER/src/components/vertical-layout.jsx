import React from 'react'
import {connect} from 'react-redux'
import Layout from './layout'
import {makeLayoutComponent} from './layout-item'
import {setSizes} from '../actions'
import {Direction} from './flags'

class VerticalLayout extends Layout {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div ref='el' className='layout vertical-layout'>
        {this.props.children.map( child => makeLayoutComponent(child, {
          key: child.id,
          direction: Direction.Vertical
        }))}
      </div>
    );
  }
}

export default connect(Layout.mapStateToProps)(VerticalLayout)