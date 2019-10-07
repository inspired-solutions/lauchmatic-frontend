import "./styles.scss";

import {
  COLOR_FILL,
  COLOR_FILL_TYPE,
  GRADIENT_COLOR_SELECTED
} from "./../../common/constants/BackgroundConstant";
import { SELECTED_MODULE } from "./../../common/constants/SelectedModuleConstant";
import BackgroundHelper from "./../../common/helpers/BackgroundHelper";

import React, { useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import Button from "../Button";
import ColorPicker from "../ColorPicker";
import GradientPicker from "../GradientPicker";
import Icon from "../Icon";
import Select from "../Select";
import Typography from "../Typography";
import { ReactComponent as ColorInvertIcon } from "./../../svgs/color_invert.svg";
import BackgroundActions from "./../../redux/actions/BackgroundActions";
import AppActions from "./../../redux/actions/AppActions";
import PropTypes from "prop-types";
import IBackground from "../../interfaces/IBackground";
import ITemplate from "../../interfaces/ITemplate";
import TemplateAction from "./../../redux/actions/TemplateAction";
import TemplateHelper from "./../../common/helpers/TemplateHelper";
import _debounce from "lodash-es/debounce";
import produce from "immer";
import fileHelpers from "./../../common/helpers/fileHelpers";
////////////////////////////////////////////////////////////////////////////////////////////////////

function BackgroundMenuOptions({
  getAllBackgrounds,
  currentTemplate,
  setMenuMessage,
  setBackground,
  setGradientColorEnd,
  setGradientColorStart,
  gradientColorSelected,
  backgrounds,
  setType,
  updateTemplate,
  updateBackgroundTemplate,
  setCurrentTemplate,

  templatesOneScreen,
  templatesTwoScreen,
  templatesThreeScreen
}) {
  const inputFile = useRef(null);

  const templateSelected = TemplateHelper.getCurrentTemplate(
    [...templatesOneScreen, ...templatesTwoScreen, ...templatesThreeScreen],
    currentTemplate.id
  );
  const {
    background_color: {
      type = COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR,
      background = {
        id: 0,
        value: {
          hex: "",
          opacity: "",
          gradient: "",
          imageUrl: ""
        }
      },
      gradientColorStart = {
        id: 0,
        value: {
          hex: "",
          opacity: ""
        }
      },
      gradientColorEnd = {
        id: 0,
        value: {
          hex: "",
          opacity: ""
        }
      }
    } = {}
  } = templateSelected;

  const updateTemplateCallBack = useCallback(
    _debounce(template => updateTemplate(template), 2000),
    []
  );
  useEffect(() => {
    getAllBackgrounds();
  }, []);

  const handleCheckTemplate = e => {
    if (!templateSelected.id) {
      setMenuMessage({
        menuOption: SELECTED_MODULE.TEMPLATES,
        message: "You need to add a template first!"
      });

      e.stopPropagation();
    }
  };

  const loadImage = event => {
    try {
      const reader = new FileReader();
      reader.onload = e => {
        // setBackground({
        //   id: e.target.result,
        //   value: {
        //     imageUrl: `url("${e.target.result}")`,
        //   },
        // })
        updateBackgroundTemplate(
          templateSelected,
          produce(templateSelected.background_color, draft => {
            draft.background = {
              id: e.target.result,
              value: {
                imageUrl: `url("${e.target.result}")`
              }
            };
          })
        );
        updateTemplateCallBack.cancel();
        updateTemplateCallBack({
          id: templateSelected.id,
          background_image: fileHelpers.dataURLtoBlob(e.target.result),
          name: e.target.result
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeColor = async backgroundValue => {
    if (type === COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR) {
      // await setBackground({ id: background.id, value: backgroundValue })
      updateBackgroundTemplate(
        templateSelected,
        produce(templateSelected.background_color, draft => {
          draft.background = { id: background.id, value: backgroundValue };
        })
      );
      return;
    }
    if (gradientColorSelected === GRADIENT_COLOR_SELECTED.START) {
      // setGradientColorStart({ id: background.id, value: backgroundValue })
      updateBackgroundTemplate(
        templateSelected,
        produce(templateSelected.background_color, draft => {
          draft.gradientColorStart = {
            id: background.id,
            value: backgroundValue
          };
        })
      );
      return;
    }

    // setGradientColorEnd({ id: background.id, value: backgroundValue })}
    updateBackgroundTemplate(
      templateSelected,
      produce(templateSelected.background_color, draft => {
        draft.gradientColorEnd = { id: background.id, value: backgroundValue };
      })
    );
    updateTemplateCallBack.cancel();
    updateTemplateCallBack({
      id: templateSelected.id,
      background_color: JSON.stringify(templateSelected.background_color)
    });
  };

  const getCurrentColorFromModeSelected = () => {
    if (type === COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR) {
      return background.value;
    }
    if (gradientColorSelected === GRADIENT_COLOR_SELECTED.START) {
      return gradientColorStart.value;
    }
    return gradientColorEnd.value;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="c-background-menu-options"
      onMouseDown={handleCheckTemplate}
      // style={{ height: '100%', ...(!templateSelected.id ? { opacity: '0.5' } : {}) }}
    >
      <div
        style={
          !templateSelected.id
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
        No template is selected
      </div>
      <div className="c-background-menu-options__header">
        <div className="c-background-menu-options__header-label">
          <Typography weight="semi-bold" color="text-secondary" variant="body2">
            Select an image
          </Typography>
          <Typography muted variant="body2">
            From your computer
          </Typography>
        </div>
        <input
          type="file"
          ref={ref => {
            inputFile.current = ref;
          }}
          style={{ display: "none" }}
          onChange={loadImage}
        />
        <Button
          color="info"
          variant="outlined"
          onClick={() => {
            inputFile.current.click();
            console.log("entro");
          }}
        >
          <Typography weight="semi-bold">Import</Typography>
        </Button>
      </div>
      <div className="c-background-menu-options__content">
        <div className="c-background-menu-options__content-header">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <Icon size="large">
              <ColorInvertIcon />
            </Icon>
            <Select
              value={type}
              optionsColor="light"
              options={COLOR_FILL}
              onChange={async value => {
                updateBackgroundTemplate(
                  templateSelected,
                  produce(templateSelected.background_color, draft => {
                    draft.type = value;
                  })
                );
                // setType(value)
                updateTemplateCallBack.cancel();
                await updateTemplateCallBack({
                  id: templateSelected.id,
                  background_color: JSON.stringify(
                    templateSelected.background_color
                  )
                });
              }}
              top="41"
              renderOption={option => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="body2">{option.primary}</Typography>
                  <Typography variant="body2" muted>
                    {option.secondary}
                  </Typography>
                </div>
              )}
              renderInput={option => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="body2">{option.primary}</Typography>
                  <Typography variant="body2" muted>
                    {option.secondary}
                  </Typography>
                </div>
              )}
            />
          </div>
          {type !== COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR && (
            <GradientPicker
              containerStyle={{ margin: "16px 0px 0px", width: 295 }}
              gradientColorEnd={gradientColorEnd}
              gradientColorStart={gradientColorStart}
            />
          )}
          <div style={{ width: "100%", marginTop: 18 }}>
            <ColorPicker
              // value={background.value}
              value={getCurrentColorFromModeSelected()}
              onChange={handleChangeColor}
            />
          </div>
        </div>
      </div>
      <div className="c-background-menu-options__content-gallery">
        <Typography variant="body2" weight="semi-bold">
          Predetermined
        </Typography>
        <div className="c-background-menu-options__content-gallery__color-container">
          {backgrounds.map(background => (
            <div
              role="button"
              tabIndex={0}
              key={background.id}
              className="c-background-menu-options__content-gallery__color"
              style={{
                backgroundColor: BackgroundHelper.getBackgroundColor(
                  background.value
                )
              }}
              onMouseDown={() => {
                handleChangeColor(background.value);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  backgrounds: state.backgrounds.list,
  gradientColorSelected: state.backgrounds.gradientColorSelected,

  currentTemplate: state.app.currentTemplate,
  templatesOneScreen: state.template.templatesOneScreen,
  templatesTwoScreen: state.template.templatesTwoScreen,
  templatesThreeScreen: state.template.templatesThreeScreen
});

const mapDispatchToprops = {
  setBackground: BackgroundActions.setBackground,
  getAllBackgrounds: BackgroundActions.getAll,
  setType: BackgroundActions.setType,

  setGradientColorStart: BackgroundActions.setGradientColorStart,
  setGradientColorEnd: BackgroundActions.setGradientColorEnd,
  setMenuMessage: AppActions.setMenuMessage,
  updateTemplate: TemplateAction.updateTemplate,
  setCurrentTemplate: AppActions.setCurrentTemplate,
  updateBackgroundTemplate: TemplateAction.updateBackgroundTemplate
};

BackgroundMenuOptions.propTypes = {
  backgrounds: PropTypes.arrayOf(PropTypes.shape(IBackground)).isRequired,
  background: PropTypes.shape(IBackground).isRequired,
  gradientColorSelected: PropTypes.shape(IBackground).isRequired,
  currentTemplate: PropTypes.shape(ITemplate).isRequired,

  setBackground: PropTypes.func.isRequired,
  getAllBackgrounds: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,

  setGradientColorStart: PropTypes.func.isRequired,
  setGradientColorEnd: PropTypes.func.isRequired,
  setMenuMessage: PropTypes.func.isRequired
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToprops
  )
)(BackgroundMenuOptions);
