import React from 'react'
import {connect} from 'react-redux'
import Layout from './layout'
import {makeLayoutComponent} from './layout-item'
import {Direction} from './flags'
import Splitter from './splitter'
import {setSizes, distributeSizes} from '../actions'

class PanelLayout extends Layout {
  constructor(props) {
    super(props);
  }

  get classNames() {
    return `${super.classNames} panel-layout ${this.props.direction}`
  }

  render() {
    let childComponents = this.props.children.map( child => makeLayoutComponent(child, {
      key: child.id,
      direction: this.props.direction,
      ref: `child.${child.id}`
    }))

    let components = Array(2*childComponents.length - 1)
    for (let i = 0; i < childComponents.length; i++) {
      components[2*i] = childComponents[i]
    }
    for (let i = 0; i < childComponents.length - 1; i++) {
      let left = this.props.children[i].id
      let right = this.props.children[i+1].id

      let onDelta = (x, y) => {
        let leftComponent = this.refs[`child.${left}`].refs.target
        let rightComponent = this.refs[`child.${right}`].refs.target

        let ev = new CustomEvent('splitterResize', {})
        document.dispatchEvent(ev)

        leftComponent.setState({
          widthOffset: x,
          heightOffset: y
        })
        rightComponent.setState({
          widthOffset: -x,
          heightOffset: -y
        })
      }

      let onDeltaEnd = (x, y) => {
        let leftComponent = this.refs[`child.${left}`].refs.target
        let rightComponent = this.refs[`child.${right}`].refs.target
        onDelta(x, y)
        const newSizes = {
          [left]: {
            width: leftComponent.size.width + leftComponent.state.widthOffset,
            height: leftComponent.size.height + leftComponent.state.heightOffset
          },
          [right]: {
            width: rightComponent.size.width + rightComponent.state.widthOffset,
            height: rightComponent.size.height + rightComponent.state.heightOffset
          }
        }
        this.props.dispatch(setSizes(newSizes))
        leftComponent.setState({
          widthOffset: 0,
          heightOffset: 0
        })
        rightComponent.setState({
          widthOffset: 0,
          heightOffset: 0
        })
        this.layout()
      }

      components[i+1] = <Splitter left={left} right={right} key={`splitter.${i}`}
        direction={this.props.direction == Direction.Horizontal ? Direction.Vertical : Direction.Horizontal} 
        onDelta={onDelta}
        onDeltaEnd={onDeltaEnd} 
      />
    }

    return (
      <div ref='el' className={this.classNames}>
        {components}
      </div>
    );
  }
}

export default PanelLayout