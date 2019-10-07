/* eslint react/prop-types: 0 */ //

import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import AppActions from '@redux/actions/AppActions'
import Select from '@components/Select'
import Typography from '@components/Typography'

function ThumbnailSelect({ thumbnails, thumbnail, setThumbnail }) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        opacity: 1,
      }}
    >
      <Select
        options={[
          {
            label: 'Select device',
            value: '',
            icon:
              'https://storage.googleapis.com/test-template-47607.appspot.com/thumbnailDevices/57wCc7s16xKe549ER7tl.svg',
          },
          ...thumbnails.map(device => ({
            label: device.name,
            value: device.id,
            icon: device.image,
          })),
        ]}
        renderInput={option => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={option.icon}
                alt={option.url}
                style={{
                  width: 24,
                  height: 24,
                  objectFit: 'contain',
                  marginRight: 8,
                }}
              />
              <Typography variant="caption">{option.label}</Typography>
            </div>
          )
        }}
        renderOption={option => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={option.icon}
                alt={option.url}
                style={{
                  width: 24,
                  height: 24,
                  objectFit: 'contain',
                  marginRight: 8,
                }}
              />
              <Typography variant="caption">{option.label}</Typography>
            </div>
          )
        }}
        value={thumbnail}
        optionsColor="grey-light"
        onChange={setThumbnail}
        reverse
      />
    </div>
  )
}

const mapStateToProps = state => ({
  thumbnails: state.adminDeviceThumbnail.list,
  thumbnail: state.app.thumbnail,
})

const mapDispatchToProps = {
  setThumbnail: AppActions.setThumbnail,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ThumbnailSelect)
