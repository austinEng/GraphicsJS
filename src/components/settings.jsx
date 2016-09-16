import React from 'react'
import ComponentWrapper from './component-wrapper'
require('../style/settings.scss')

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Settings'
  }

  render() {
    return (
      <ComponentWrapper component={this}>
        <div></div>
      </ComponentWrapper>
    )
  }
}
