
// export function graphicsApp(state = {}, action) {
//   return state
// }
import {Types} from './components/utils' 

import { combineReducers } from 'redux'
import {SET_SIZES, DISTRIBUTE_SIZES} from './actions'
import {INIT_GL} from './actions'

function sizes(state = {}, action) {
  switch(action.type) {
    case SET_SIZES:
      return Object.assign({}, state, action.sizes)
    default:
      return state
  }
}

function distributeSizeProperty(state, newSizes, id, property) {
  const {children, sizes} = state

  let parentProp = newSizes[id][property]
  if (typeof parentProp === 'undefined') parentProp = sizes[id][property]

  const childIds = children[id]

  const childProperties = childIds.map(childId => {
    const childSize = sizes[childId] || {}
    return childSize[property] || parentProp / childIds.length
  })
  const total = childProperties.reduce((a, b) => a+b)

  childIds.forEach((childId, i) => {
    let prop = {
      [property]: parentProp * childProperties[i] / total
    }
    if (newSizes.hasOwnProperty(childId)) {
      Object.assign(newSizes[childId], prop)
    } else {
      newSizes[childId] = prop
    }
  })
}

function promoteSizeProperty(state, newSizes, id, property) {
  const {children, sizes} = state
  let parentProp = newSizes[id][property]
  if (typeof parentProp === 'undefined') parentProp = sizes[id][property]
  const childIds = children[id]
  
  childIds.forEach((childId, i) => {
    let prop = {
      [property]: parentProp
    }
    if (newSizes.hasOwnProperty(childId)) {
      Object.assign(newSizes[childId], prop)
    } else {
      newSizes[childId] = prop
    }
  })
}

function recursiveDistribute(state, newSizes, id) {
  const {children, sizes, classes} = state
  
  const childIds = children[id]
  if (typeof childIds === 'undefined') return newSizes

  const nextSizes = Object.assign({}, newSizes)
  
  promoteSizeProperty(state, nextSizes, id, 'width')
  promoteSizeProperty(state, nextSizes, id, 'height')
  
  switch(classes[id]) {
    case Types.HorizontalPanelLayout:
    case Types.HorizontalLayout:
      distributeSizeProperty(state, nextSizes, id, 'width')
      break
    case Types.VerticalPanelLayout:
    case Types.VerticalLayout:
      distributeSizeProperty(state, nextSizes, id, 'height')
      break
  }

  childIds.forEach(childId => {
    Object.assign(nextSizes, recursiveDistribute(state, nextSizes, childId))
  })

  return nextSizes
}

function reduceLayout(state, action) {  
  switch(action.type) {
    case DISTRIBUTE_SIZES:
      const newSizes = recursiveDistribute(state, { [action.id]: action.size }, action.id)
      const nextState = Object.assign({}, state)
      for (let newSize in newSizes) {
        if (nextState.sizes.hasOwnProperty(newSize)) {
          Object.assign(nextState.sizes[newSize], newSizes[newSize])
        } else {
          nextState.sizes[newSize] = newSizes[newSize]
        }
      }
      return nextState
    default:
      return state
  }
}

function layout(state = {}, action) {
  const nextState = Object.assign({}, state, reduceLayout(state, action))
  return Object.assign({}, 
    nextState, 
    { sizes: sizes(nextState.sizes, action) }
  )
}

function props(state = {}, action) {
  return state
}

function gl(state = {}, action) {
  switch(action.type) {
    case INIT_GL:
      return Object.assign({}, state, { 
        context: action.context,
        Module: action.Module,
        Bindings: action.Bindings 
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  layout,
  props,
  gl
})

export default rootReducer