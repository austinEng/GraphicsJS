import React from 'react'
import {connect} from 'react-redux'
import Layout from './layout'
import {makeLayoutComponent} from './layout-item'

class CentralWindow extends Layout {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.layout()
    window.addEventListener('resize', e => {
      this.layout()
    })
  }

  render() {
    return (
      <div ref='el' className='layout central-window'>
        {this.props.children.map( child => makeLayoutComponent(child, {
          key: child.id
        }))}
      </div>
    );
  }
}

export default connect(Layout.mapStateToProps)(CentralWindow)