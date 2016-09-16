
import {Module, runtimeInitialized} from './components/app'

export const Bindings = {}

runtimeInitialized.then(() => {
  Bindings.initializeFluidContainer = Module.cwrap('initializeFluidContainer', 'number', ['number', 'number', 'number', 'number'])
  Bindings.updateFluidContainer = Module.cwrap('updateFluidContainer', 'number', ['number'])
  Bindings.destroyFluidContainer = Module.cwrap('destroyFluidContainer', 'number', ['number'])
})
