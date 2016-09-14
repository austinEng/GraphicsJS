
const Types = {
  CentralWindow: 'CentralWindow',
  HorizontalPanelLayout: 'HorizontalPanelLayout',
  VerticalPanelLayout: 'VerticalPanelLayout',
  HorizontalLayout: 'HorizontalLayout',
  VerticalLayout: 'VerticalLayout',
  Viewport: 'Viewport',
  Canvas: 'Canvas'
}

function getComponentClass(name) {
  switch(name) {
    case Types.CentralWindow:
      return require('./central-window.jsx').default
    case Types.HorizontalPanelLayout:
      return require('./horizontal-panel-layout.jsx').default
    case Types.VerticalPanelLayout:
      return require('./vertical-panel-layout.jsx').default
    case Types.HorizontalLayout:
      return require('./horizontal-layout.jsx').default
    case Types.VerticalLayout:
      return require('./vertical-layout.jsx').default
    case Types.Viewport:
      return require('./viewport.jsx').default
    case Types.Canvas:
      return require('./canvas.jsx').default
  }
}

module.exports = {
  getComponentClass,
  Types
}