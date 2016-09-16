import {Types} from '../components/utils'

module.exports = {
  layout: {
    root: 0,
    floating: [6],
    classes: {
      0: Types.CentralWindow,
      1: Types.HorizontalPanelLayout,
      // 2: Types.VerticalPanelLayout,
      3: Types.ParticleSettings,
      4: Types.Viewport,
      // 5: Types.Viewport,
      6: Types.Canvas
    },
    sizes: {
      3: {
        width: 1
      },
      4: {
        width: 3
      }
      // 2: {
      //   width: 1
      // },
      // 3: {
      //   width: 3
      // },
      // 4: {
      //   height: 4
      // },
      // 5: {
      //   height: 3
      // }
    },
    children: {
      0: [1],
      1: [3, 4]
      // 1: [2, 3],
      // 2: [4, 5]
    },
  },
  props: {
    // 0: {
    //   test: 'hi'
    // },
    // 3: {
    //   aspectRatio: 16/9,
    // },
    // 4: {
      // aspectRatio: 1,
    // },
    // 5: {
      // aspectRatio: 4/3,
    // }
  }
}
