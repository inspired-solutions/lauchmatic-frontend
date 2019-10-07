import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Typography from '@components/Typography'
import Button from '@components/Button'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import AdminDeviceThumbnailAction from '@redux/actions/AdminDeviceThumbnailAction'

function CreateDevice({ addDeviceThumbnail, getDeviceThumbnails, devices }) {
  const [imageFile, setImageFile] = useState(null)
  const [imageDevice, setImageDevice] = useState('')
  const [nameDevice, setImageName] = useState('')
  useEffect(() => {
    getDeviceThumbnails()
  }, [])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/png',
    multiple: false,
  })
  const handleSubmit = () => {
    if (imageDevice && nameDevice) {
      const body = new FormData()
      body.append('name', nameDevice)
      body.append('image', imageFile)
      addDeviceThumbnail(body)
      acceptedFiles.pop()
      setImageDevice('')
      setImageName('')
    }
  }
  const acceptedFilesItems = acceptedFiles.map(file => {
    // console.log(file)
    console.log(file)
    const reader = new FileReader()
    reader.onload = e => {
      setImageFile(file)
      setImageDevice(e.target.result)
      // console.log(e.target.result)
    }
    reader.readAsDataURL(file)
    return null
  })
  console.log(imageDevice.substr(0, 12))
  return (
    <div
      className="c-devices-menu-options"
      style={{
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 48,
        }}
      >
        <div
          {...getRootProps({ className: 'dropzone' })}
          style={{
            border: '1px dashed  var(--color-grey-light)',
            width: 96,
            height: 96,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          {acceptedFilesItems}
          <input {...getInputProps()} />
          {imageDevice ? (
            <img
              src={imageDevice}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <Typography variant="caption" style={{ textAlign: 'center' }}>
              Drop here or click to select files (*.jpeg, *.png)
            </Typography>
          )}
        </div>
        <input
          type="text"
          value={nameDevice}
          style={{ width: 120 }}
          onChange={event => {
            setImageName(event.target.value)
          }}
        />
      </div>

      <Button
        color="primary"
        containerStyle={{ width: '100%', borderRadius: 8, marginTop: 48 }}
        variant="outlined"
        onClick={handleSubmit}
      >
        <Typography color="primary">Save</Typography>
      </Button>
      <div style={{ marginTop: 48 }}>
        <Typography variant="body1" weight="semi-bold" color="text-primary">
          Current Device Thumbnails
        </Typography>
        <div style={{ marginTop: 16 }}>
          {devices.map(device => (
            <div
              key={device.id}
              style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <img
                src={device.image}
                alt="demo_alt"
                style={{
                  width: 48,
                  height: 48,
                  objectFit: 'contain',
                  marginRight: 48,
                }}
              />
              <Typography variant="body2">{device.name}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  devices: state.adminDeviceThumbnail.list,
})
const mapDispatchToProps = {
  addDeviceThumbnail: AdminDeviceThumbnailAction.addDeviceThumbnail,
  getDeviceThumbnails: AdminDeviceThumbnailAction.getDeviceThumbnails,
}

CreateDevice.defaultProps = {
  devices: [],
}
CreateDevice.propTypes = {
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      url: PropTypes.url,
    })
  ),
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreateDevice)
