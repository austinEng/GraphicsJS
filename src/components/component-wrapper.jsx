import React from 'react'
require('../style/component.scss')

class ComponentWrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='component-wrapper'>
        <ul className='component-header'>
          <li>{this.props.component.displayName}</li>
        </ul>
        <div className='component-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default ComponentWrapper
