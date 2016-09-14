import React from 'react'
import {connect} from 'react-redux'
import Layout from './layout'
import {makeLayoutComponent} from './layout-item'
import {setSizes} from '../actions'
import {Direction} from './flags'

export class HorizontalLayout extends Layout {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div ref='el' className='layout horizontal-layout'>
        {this.props.children.map( child => makeLayoutComponent(child, {
          key: child.id,
          direction: Direction.Horizontal
        }))}
      </div>
    );
  }
}

export default connect(Layout.mapStateToProps)(HorizontalLayout)