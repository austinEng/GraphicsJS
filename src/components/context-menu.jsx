import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
require('../style/context-menu.scss')

class MenuItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(e) {
    if (this.props.action) this.props.action()
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    const {name, children} = this.props
    if (!children) {
      return (
        <div className='context-menu-item' onClick={this.handleClick.bind(this)}>
          {name}
        </div>
      )
    } else {
      return (
        <div className='context-menu-item' onClick={this.handleClick.bind(this)}>
          {name}
          <MenuItemList children={children} />
        </div>
      )
    }
  }
}

class MenuItemList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='context-menu-list'>
        {this.props.children.map((item, i) => {
          return <MenuItem key={i} {...item}/>
        })}
      </div>
    )
  }
}

class ContextMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.addEventListener('click', this.close.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.close.bind(this))  
  }

  close() {
    unmountComponentAtNode(this.props.mount)
  }

  render() {
    return (
      <div style={{
        'position': 'fixed',
        'left': this.props.x,
        'top': this.props.y,
        'display': 'block'
      }} className='context-menu'>
        <MenuItemList children={this.props.options} />
      </div>
    )
  }
}

export function spawnContextMenu(options, x, y, mount='contextMenu') {
  let el = document.getElementById(mount)
  if (!el) {
    el = document.createElement('div')
    el.setAttribute('id', mount)
    document.body.appendChild(el)
  }
  render(
    <ContextMenu mount={el} x={x} y={y} options={options} />,
    el
  )
}