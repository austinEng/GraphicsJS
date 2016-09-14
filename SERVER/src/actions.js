
export const SET_SIZES = 'SET_SIZES'
export const DISTRIBUTE_SIZES = 'DISTRIBUTE_SIZES'
export const INIT_GL = 'INIT_GL'

export function setSizes(sizes) {
  return {type: SET_SIZES, sizes}
}

export function distributeSizes(id, size) {
  return {type: DISTRIBUTE_SIZES, id, size}
}

export function initGL(context, Module, Bindings) {
  return {type: INIT_GL, context, Module, Bindings}
}