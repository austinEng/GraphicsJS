import React from 'react'
import {connect} from 'react-redux'
import {Direction} from './flags'
import classNames from 'classnames'
import {DraggableCore} from 'react-draggable'

export default class Splitter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false
    }
  }

  handleDragStart(e, {x, y}) {
    this.originX = e.clientX
    this.originY = e.clientY
    this.setState({
      dragging: true
    })
  }

  handleDrag(e, {x, y}) {
    switch(this.props.direction) {
      case Direction.Vertical:
        this.props.onDelta(e.clientX - this.originX, 0)
        break
      case Direction.Horizontal:
        this.props.onDelta(0, e.clientY - this.originY)
        break
    }
  }

  handleDragEnd(e, {x, y}) {
    switch(this.props.direction) {
      case Direction.Vertical:
        this.props.onDeltaEnd(e.clientX - this.originX, 0)
        break
      case Direction.Horizontal:
        this.props.onDeltaEnd(0, e.clientY - this.originY)
        break
    }
    this.setState({
      dragging: false
    })
  }

  render() {
    return (
      <div className='splitter'>
        <DraggableCore
          onStart={this.handleDragStart.bind(this)}
          onDrag={this.handleDrag.bind(this)}
          onStop={this.handleDragEnd.bind(this)}
        >
          <div className={classNames('splitter-target', {
            'active': this.state.dragging
          })} />
        </DraggableCore>
      </div>
    ) 
  }
}