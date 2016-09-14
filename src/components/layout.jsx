import React from 'react'
import {deserializeComponent} from './utils'
import LayoutItem from './layout-item'
import {distributeSizes} from '../actions'

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  get classNames() {
    return 'layout'
  }

  static get propTypes() {
    return {
      // dispatch: React.PropTypes.func.isRequired,
    }
  }

  static mapStateToProps(state, ownProps) {
    const { props } = state
    const {children, classes, sizes} = state.layout

    return Object.assign({
      children: children[ownProps.id].map(id => {
        return {
          id,
          _class: classes[id],
          // sizeHint: sizes[id]
        }
      })
    }, props[ownProps.id])
  }

  layout() {
    this.props.dispatch(distributeSizes(this.props.id, {
      width: this.refs.el.clientWidth, 
      height: this.refs.el.clientHeight
    }))
  }

  componentDidMount() {
    // this.layout()
  }

}