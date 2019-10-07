/* eslint camelcase: 0 */ //

import React, { useCallback } from 'react'
import _debounce from 'lodash-es/debounce'
import Typography from '../Typography'
import './styles.scss'
import Select from '../Select'
import ButtonGroup from '../ButtonGroup'

import {
  FONTS_FAMILIES,
  FONT_STYLES,
  FONT_SIZES,
  TEXT_ALIGN,
} from '@common/constants/FontConstants'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import TextActions from '@redux/actions/TextActions'

import ColorPicker from '../ColorPicker'
import PropTypes from 'prop-types'
import IText from '@interfaces/IText'
import TemplateAction from '@redux/actions/TemplateAction'
import TextHelpers from '@common/helpers/TextHelpers'

function TextMenuOptions({ updateText, updateTextTemplate, selectedText, texts, currentTemplate }) {
  const updateTextCallBack = useCallback(_debounce(text => updateText(text), 2000), [])
  const handleChangeFontFamily = async value => {
    /** call redux */
    await updateTextTemplate(currentTemplate, { font_family: value, id: selectedText })
    /**call service */
    updateTextCallBack.cancel()
    await updateTextCallBack({ font_family: value, id: selectedText })
  }
  const handleChangeFontSize = async value => {
    await updateTextTemplate(currentTemplate, { font_size: value, id: selectedText })
    updateTextCallBack.cancel()
    await updateTextCallBack({ font_size: value, id: selectedText })
  }
  const handleChangefontStyle = async value => {
    await updateTextTemplate(currentTemplate, { font_style: value, id: selectedText })
    updateTextCallBack.cancel()
    await updateTextCallBack({ font_style: value, id: selectedText })
  }
  const handleChangeTextAlignment = async value => {
    await updateTextTemplate(currentTemplate, { text_align: value, id: selectedText })
    updateTextCallBack.cancel()
    await updateTextCallBack({ text_align: value, id: selectedText })
  }
  const handleChangeColor = async value => {
    await updateTextTemplate(currentTemplate, { color: value, id: selectedText })
    updateTextCallBack.cancel()
    await updateTextCallBack({ color: value, id: selectedText })
  }

  const { font_family, font_size, text_align, font_style, color } = TextHelpers.getCurrentText(
    texts,
    selectedText
  )

  return (
    <div className="c-text-menu-options">
      <div className="c-text-menu-options__selects-container">
        <div style={{ width: 230 }}>
          <Select
            value={font_family || FONTS_FAMILIES[0].value}
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
            value={font_size || FONT_SIZES[0].value}
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
            value={font_style || FONT_STYLES[0].value}
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
            options={TEXT_ALIGN.map(text_align => ({
              value: text_align.value,
              icon: text_align.icon,
            }))}
            value={text_align}
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
  currentTemplate: state.app.currentTemplate,
})

const mapDispatchToProps = {
  updateText: TextActions.updateText,
  updateTextTemplate: TemplateAction.updateTextTemplate,
}

TextMenuOptions.defaultProps = {
  updateText: () => {},
  selectedText: '',
  currentTemplate: {},
  texts: [],
  updateTextTemplate: () => {},
}
TextMenuOptions.propTypes = {
  selectedText: PropTypes.string,
  texts: PropTypes.arrayOf(PropTypes.shape(IText)),
  currentTemplate: PropTypes.shape({}),
  updateText: PropTypes.func,
  updateTextTemplate: PropTypes.func,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TextMenuOptions)
