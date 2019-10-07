import BackgroundTypes from '../../redux/types/BackgroundTypes'

const BackgroundActions = {
  getAll: () => async dispatch => {
    dispatch({
      type: BackgroundTypes.GET_ALL,
      payload: [
        {
          id: '#0288D1',
          value: {
            hex: '#0288D1',
            opacity: 100,
          },
        },
        {
          id: '#00BCD4',
          value: {
            hex: '#00BCD4',
            opacity: 100,
          },
        },
        {
          id: '#FBC02D',
          value: {
            hex: '#FBC02D',
            opacity: 100,
          },
        },
        {
          id: '#009688',
          value: {
            hex: '#009688',
            opacity: 100,
          },
        },
        {
          id: '#795548',
          value: {
            hex: '#795548',
            opacity: 100,
          },
        },
        {
          value: {
            hex: '#303F9F',
            opacity: 100,
          },
          id: '#303F9F',
        },
      ],
    })
  },
  setBackground: backgroundId => ({
    type: BackgroundTypes.SET_BACKGROUND,
    payload: backgroundId,
  }),
  setGradientColorStart: background => ({
    type: BackgroundTypes.SET_GRADIENT_COLOR_START,
    payload: background,
  }),
  setGradientColorEnd: background => ({
    type: BackgroundTypes.SET_GRADIENT_COLOR_END,
    payload: background,
  }),
  setType: type => ({
    type: BackgroundTypes.SET_BACKGROUND_TYPE,
    payload: type,
  }),

  setGradientColorSelected: gradientColorSelected => ({
    type: BackgroundTypes.SET_GRADIENT_COLOR_SELECTED,
    payload: gradientColorSelected,
  }),

  resetBackgroundActions: () => ({
    type: BackgroundTypes.RESET_BACKGROUND_STATE,
  }),
}

export default BackgroundActions
