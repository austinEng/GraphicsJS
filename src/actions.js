
export const SET_SIZES = 'SET_SIZES'
export const DISTRIBUTE_SIZES = 'DISTRIBUTE_SIZES'
export const INIT_GL = 'INIT_GL'
export const SPLIT_VIEW = 'SPLIT_VIEW'
export const SET_VIEW = 'SET_VIEW'

export function setSizes(sizes) {
  return {type: SET_SIZES, sizes}
}

export function distributeSizes(id, size) {
  return {type: DISTRIBUTE_SIZES, id, size}
}

export function initGL(context, Module, Bindings) {
  return {type: INIT_GL, context, Module, Bindings}
}

export function splitView(id, layout) {
  return {type: SPLIT_VIEW, id, layout}
}

export function setView(id, cls) {
  return {type: SET_VIEW, id, cls}
}