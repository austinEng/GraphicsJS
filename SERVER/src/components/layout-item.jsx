import React from 'react'
import {connect} from 'react-redux'
import {getComponentClass} from './utils'
import {Direction} from './flags'

class LayoutItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      widthOffset: 0,
      heightOffset: 0
    }
  }

  render() {
    let style = {
      flex: this.flex
    }

    return (
      <div style={style} ref='el' className='layout-item'>
        {this.props.children}
      </div>
    )
  }

  get size() {
    return this.props.size || {}
  }

  get flex() {
    switch(this.props.direction) {
      case Direction.Horizontal:
        return this.size.width ? `1 1 ${this.size.width + this.state.widthOffset}px` : 'auto'
      case Direction.Vertical:
        return this.size.height ? `1 1 ${this.size.height + this.state.heightOffset}px` : 'auto'
      default:
        return 'auto'
    }
  }
}

function mapStateToProps(state, ownProps) {
  const {sizes} = state.layout
  return {
    size: sizes[ownProps.id],
    ref: 'target'
  }
}

const LayoutItemConnect = connect(mapStateToProps)(LayoutItem)
export default LayoutItemConnect

export function makeLayoutComponent(component, layoutProps={}, componentProps={}) {
  let Component = getComponentClass(component._class)
  return (
    <LayoutItemConnect ref={`layoutItem.${component.id}`} id={component.id} {...layoutProps} >
      <Component ref={`component.${component.id}`} id={component.id} {...componentProps} />
    </LayoutItemConnect>
  )
}