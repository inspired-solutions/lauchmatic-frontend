import React, { useRef } from 'react'
import Typography from '@components/Typography'
import Button from '@components/Button'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import AdminDevicesAction from '@redux/actions/AdminDeviceActions'
import ImageDevice from '@components/AdminPage/ImageDevice'
import ItemTypes from '@common/ItemTypes'

////////////////////////////////////////////////////////////////////////////////////////////////////

function AddDevices({ devices, addDevices }) {
  const inpuFile = useRef(null)
  const loadImage = event => {
    // const { addImageMenu } = this.props
    try {
      const reader = new FileReader()
      reader.onload = e => {
        const img = new Image()
        img.onload = () => {
          if (
            (img.width == 1242 && img.height == 2688) ||
            (img.width == 2688 && img.height == 1242)
          ) {
            addDevices({
              url: e.target.result,
              name: e.target.result,
            })
          } else {
            alert('Error, only allowed images with 1242 x 2688(resolution)')
            document.getElementById('file-add-device').value = null
          }
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(event.target.files[0])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      style={{
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 32,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" color="text-secondary" weight="semi-bold">
            Upload a image .png
          </Typography>
          <Typography variant="body2" muted>
            From your computer
          </Typography>
        </div>
        <input
          id="file-add-device"
          type="file"
          accept="image/png"
          onChange={loadImage}
          style={{ display: 'none' }}
          ref={inpuFile}
        />
        <Button
          color="success"
          onClick={() => {
            inpuFile.current.click()
          }}
          variant="outlined"
        >
          <Typography variant="body1" weight="semi-bold">
            Import
          </Typography>
        </Button>
      </div>
      {!!devices.length && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" color="text-secondary" weight="semi-bold">
              Images Uploaded
            </Typography>
            <Typography variant="body2" muted>
              Drag a screen into any device on the right
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 40,
              flexWrap: 'wrap',
            }}
          >
            {devices.map(device => (
              <ImageDevice device={device} itemType={ItemTypes.DEVICE} key={device.id} />
              // <img
              //   src={device.url}
              //   alt={device.name}
              //   key={device.id}
              //   style={{
              //     marginTop: 8,
              //     width: 100,
              //     height: 200,
              //     objectFit: 'contain',
              //     border: '1px dashed  var(--color-grey-light)',
              //   }}
              // />
              // <Image
              //   image={device}
              //   key={device.id}
              //   menuOptionOnAlert={SELECTED_MODULE.TEMPLATES}
              //   messageOnAlert="You need to add a template first!"
              //   itemType={ItemTypes.IMAGE}
              // />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  devices: state.adminDevice.listDevices,
})

const mapDispatchToProps = {
  addDevices: AdminDevicesAction.addDevices,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddDevices)
