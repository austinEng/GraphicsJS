import React from 'react'
import {connect} from 'react-redux'
import {getComponentClass, Types} from './utils'
import {Direction} from './flags'
import {spawnContextMenu} from './context-menu'
import {splitView, setView} from '../actions'

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
      <div style={style} ref='el' className='layout-item' onContextMenu={this.handleContextMenu.bind(this)}>
        {this.props.children}
      </div>
    )
  }

  handleContextMenu(e) {
    e.preventDefault()
    e.stopPropagation()
    const self = this
    spawnContextMenu([
      {
        name: 'Windows',
        action: function() {
          console.log('windows')
        },
        children: [
          {
            name: 'Viewport',
            action: function() {
              self.props.dispatch(setView(self.props.id, Types.Viewport))
            }
          },
          {
            name: 'Split View',
            children: [
              {
                name: 'Horizontal',
                action: function() {
                  self.props.dispatch(splitView(self.props.id, Types.HorizontalPanelLayout))
                }
              },
              {
                name: 'Vertical',
                action: function() {
                  self.props.dispatch(splitView(self.props.id, Types.VerticalPanelLayout))
                },
              }
            ]
          }
        ]
      },
      {
        name: 'Settings',
        action: function() {
          console.log('settings')
        }
      }
    ], e.clientX, e.clientY)
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