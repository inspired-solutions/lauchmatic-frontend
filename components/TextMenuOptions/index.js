import React from 'react'
import Typography from '../Typography'
import './styles.scss'
import Select from '../Select'
import ButtonGroup from '../ButtonGroup'
import LeftAlignment from '@svgs/align_left.svg'
import CenterAlignment from '@svgs/align_center.svg'
import RightAlignment from '@svgs/align_right.svg'
import { FONTS_FAMILIES, FONT_STYLES, FONT_SIZES } from '@common/constants/FontConstants'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import TextActions from '@redux/actions/TextActions'

import ColorPicker from '../ColorPicker'
import PropTypes from 'prop-types'
import IText from '@interfaces/IText'
import TextHelpers from '@common/helpers/TextHelpers'

function TextMenuOptions({ updateText, selectedText, texts }) {
  const handleChangeFontFamily = async value => {
    await updateText({ fontFamily: value, id: selectedText })
  }
  const handleChangeFontSize = async value => {
    await updateText({ fontSize: value, id: selectedText })
  }
  const handleChangefontStyle = async value => {
    await updateText({ fontStyle: value, id: selectedText })
  }
  const handleChangeTextAlignment = async value => {
    await updateText({ textAlign: value, id: selectedText })
  }
  const handleChangeColor = async value => {
    await updateText({ color: value, id: selectedText })
  }

  const { fontFamily, fontSize, textAlign, fontStyle, color } = TextHelpers.getCurrentText(
    texts,
    selectedText
  )

  return (
    <div className="c-text-menu-options">
      <div className="c-text-menu-options__selects-container">
        <div style={{ width: 230 }}>
          <Select
            value={fontFamily}
            options={FONTS_FAMILIES}
            renderLabel={
              <Typography
                variant="body2"
                color="text-secondary"
                weight="semi-bold"
                style={{ marginBottom: 4 }}
              >
                Font
              </Typography>
            }
            optionsColor="light"
            onChange={handleChangeFontFamily}
          />
        </div>
        <div style={{ width: 86 }}>
          <Select
            value={fontSize}
            options={FONT_SIZES}
            renderLabel={
              <Typography
                variant="body2"
                color="text-secondary"
                weight="semi-bold"
                style={{ marginBottom: 4 }}
              >
                Font Size
              </Typography>
            }
            optionsColor="light"
            onChange={handleChangeFontSize}
          />
        </div>
      </div>
      <div className="c-text-menu-options__selects-container" style={{ marginTop: 32 }}>
        <div style={{ width: 188 }}>
          <Select
            value={fontStyle}
            options={FONT_STYLES}
            renderLabel={
              <Typography
                variant="body2"
                color="text-secondary"
                weight="semi-bold"
                style={{ marginBottom: 4 }}
              >
                Style
              </Typography>
            }
            optionsColor="light"
            onChange={handleChangefontStyle}
          />
        </div>
        <div style={{ width: 120 }}>
          <Typography
            variant="body2"
            color="text-secondary"
            weight="semi-bold"
            style={{ marginBottom: 4 }}
          >
            Alignment
          </Typography>
          <ButtonGroup
            options={[
              { icon: <LeftAlignment />, value: 'left' },
              { icon: <CenterAlignment />, value: 'center' },
              { icon: <RightAlignment />, value: 'right' },
            ]}
            value={textAlign}
            onChange={handleChangeTextAlignment}
            style={{ marginTop: 4 }}
          />
        </div>
      </div>
      <div className="c-text-menu-options__color-picker" style={{ marginTop: 32 }}>
        <Typography
          variant="body2"
          color="text-secondary"
          weight="semi-bold"
          style={{ marginBottom: 4 }}
        >
          Color
        </Typography>
        <ColorPicker onChange={handleChangeColor} value={color} />
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  selectedText: state.texts.selectedText,
  texts: state.texts.list,
})

const mapDispatchToProps = {
  updateText: TextActions.updateText,
}

TextMenuOptions.defaultProps = {
  updateText: () => {},
  selectedText: '',
  texts: [],
}
TextMenuOptions.propTypes = {
  selectedText: PropTypes.string,
  texts: PropTypes.arrayOf(PropTypes.shape(IText)),
  updateText: PropTypes.func,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TextMenuOptions)
