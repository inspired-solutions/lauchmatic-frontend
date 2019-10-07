/* eslint camelcase: 0 */ //

import React, { useCallback } from 'react'
import _debounce from 'lodash-es/debounce'
import Typography from '../../Typography'
import './styles.scss'
import Select from '../../Select'
import ButtonGroup from '../../ButtonGroup'

import {
  FONTS_FAMILIES,
  FONT_STYLES,
  FONT_SIZES,
  TEXT_ALIGN,
} from './../../../common/constants/FontConstants'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import ColorPicker from '../../ColorPicker'
import PropTypes from 'prop-types'
import IText from './../../../interfaces/IText'
import TextHelpers from './../../../common/helpers/TextHelpers'
import AdminTextAction from './../../../redux/actions/AdminTextActions'

function TextMenuOptions({ updateText, selectedText, texts }) {
  const handleChangeFontFamily = async value => {
    /** call redux */
    /**call service */

    updateText({ font_family: value, id: selectedText.id })
  }
  const handleChangeFontSize = async value => {
    updateText({ font_size: value, id: selectedText.id })
  }
  const handleChangefontStyle = async value => {
    updateText({ font_style: value, id: selectedText.id })
  }
  const handleChangeTextAlignment = async value => {
    updateText({ text_align: value, id: selectedText.id })
  }
  const handleChangeColor = async value => {
    updateText({ color: value, id: selectedText.id })
  }

  const { font_family, font_size, text_align, font_style, color } = TextHelpers.getCurrentText(
    texts,
    selectedText.id
  )
  console.log(font_family)
  return (
    <div
      className="c-text-menu-options"
      style={{
        position: "relative",
        height: "100%",
        ...(!selectedText.id ? { opacity: "0.5" } : {})
      }}
    >
      <div
        style={
          !selectedText.id
            ? {
                zIndex: 4,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
                backgroundColor: "var(--color-grey)",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.5,
                color: "white"
              }
            : { display: "none" }
        }
      >
        No text is selected
      </div>
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
      <div
        className="c-text-menu-options__selects-container"
        style={{ marginTop: 32 }}
      >
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
              icon: text_align.icon,
              value: text_align.value
            }))}
            value={text_align}
            onChange={handleChangeTextAlignment}
            style={{ marginTop: 4 }}
          />
        </div>
      </div>
      {/* <div className="c-text-menu-options__color-picker" style={{ marginTop: 32 }}>
        <Typography
          variant="body2"
          color="text-secondary"
          weight="semi-bold"
          style={{ marginBottom: 4 }}
        >
          Color
        </Typography>
        <ColorPicker onChange={handleChangeColor} value={color} />
      </div> */}
    </div>
  );
}
const mapStateToProps = state => ({
  selectedText: state.adminApp.selectedText,
  texts: state.adminText.list
});

const mapDispatchToProps = {
  updateText: AdminTextAction.updateText,
  // updateTextTemplate: TemplateAction.updateTextTemplate,
}

TextMenuOptions.defaultProps = {
  updateText: () => {},
  selectedText: {},
  texts: [],
  // updateTextTemplate: () => {},
}
TextMenuOptions.propTypes = {
  selectedText: PropTypes.string,
  texts: PropTypes.arrayOf(PropTypes.shape(IText)),
  updateText: PropTypes.func,
  // updateTextTemplate: PropTypes.func,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TextMenuOptions)
