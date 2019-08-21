import React from 'react'
import './styles.scss'
import Typography from '../Typography'
import Select from '../Select'
import {
  SCREENS_DEVICES,
  SCREENS_RESOLUTIONS,
  SCREENS_ORDER_NAME,
  SCREENS_MIME,
} from '@common/constants/ScreensConstant'
import Button from '../Button'
import Paper from '../Paper'
import Icon from '../Icon'
import CloseModalIcon from '@svgs/close-modal.svg'
import classNames from 'classnames'
import { TEMPLATE_TYPES } from '@common/constants/TemplateConstant'
import PropTypes from 'prop-types'

function ExportModal({ design, closeModal, templateType }) {
  const handleExport = () => {
    const link = document.createElement('a')
    link.download = 'canvas-image-export.jpeg'
    link.href = design
    link.click()
  }
  return (
    <div className="c-export-modal">
      <div className="c-export-modal__header">
        <Typography
          variant="h5"
          color="text-primary"
          weight="semi-bold"
          style={{ margintBottom: 12, color: '#333333', alignSelf: 'flex-start' }}
        >
          Your design
        </Typography>
        <div role="button" tabIndex={0} onMouseDown={closeModal}>
          <Icon size="large" button>
            <CloseModalIcon />
          </Icon>
        </div>
      </div>

      <div className="c-export-modal__content">
        <div className="c-export-modal__content-actions">
          <Select
            options={SCREENS_DEVICES}
            onChange={() => {}}
            value={0}
            optionsColor="grey-light"
            inputHeight={40}
            top={44}
            containerStyle={{ margintBottom: 21 }}
          />

          <div className="c-export-modal__content-actions-name">
            <Select
              options={SCREENS_RESOLUTIONS}
              onChange={() => {}}
              value={0}
              optionsColor="grey-light"
              containerStyle={{ width: 86, borderRadius: 8 }}
              inputHeight={40}
              top={44}
            />

            <Select
              options={SCREENS_ORDER_NAME}
              onChange={() => {}}
              value={0}
              optionsColor="grey-light"
              containerStyle={{ width: 90, borderRadius: 8 }}
              inputHeight={40}
              top={44}
            />

            <Select
              options={SCREENS_MIME}
              onChange={() => {}}
              value={0}
              optionsColor="grey-light"
              containerStyle={{ width: 86, borderRadius: 8 }}
              inputHeight={40}
              top={44}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              containerStyle={{ height: 50, width: 245, marginBottom: 10 }}
              onClick={handleExport}
            >
              <Typography color="light" weight="semi-bold">
                Export
              </Typography>
              <Typography color="light" variant="body2" muted>
                {' '}
                (2 days left)
              </Typography>
            </Button>
            <Typography variant="caption" muted>
              *Trial export
            </Typography>
          </div>
        </div>

        <div className="c-export-modal__content-preview">
          <Typography muted variant="body2">
            Preview
          </Typography>
          <Paper
            elevation={8}
            className={classNames(
              {
                [`c-export-modal__content-preview-img-container--one-screen`]:
                  templateType === TEMPLATE_TYPES.ONE_SCREEN,
                [`c-export-modal__content-preview-img-container--two-screen`]:
                  templateType === TEMPLATE_TYPES.TWO_SCREEN,
              },
              'c-export-modal__content-preview-img-container'
            )}
          >
            <img src={design} alt="" className="c-export-modal__content-preview-img" />
          </Paper>
        </div>
      </div>
      <Typography muted variant="body2">
        OR
      </Typography>
      <div className="c-export-modal__footer">
        <div className="c-export-modal__footer-description-container">
          <Typography variant="caption" muted style={{ height: 19 }}>
            Export always from
          </Typography>
          <Typography variant="h6" style={{ color: '#333333', height: 32 }} weight="semi-bold">
            $10 per month
          </Typography>
          <Typography
            variant="caption"
            style={{ color: '#7B7B7C', alignSelf: 'center', height: 17 }}
          >
            Billed annually
          </Typography>
        </div>

        <Button color="secondary" containerStyle={{ width: 245 }}>
          <Typography color="light" weight="semi-bold">
            Upgrade PRO
          </Typography>
        </Button>
      </div>
    </div>
  )
}

ExportModal.propTypes = {
  design: PropTypes.shape({}).isRequired,
  closeModal: PropTypes.func.isRequired,
  templateType: PropTypes.string.isRequired,
}

export default ExportModal
