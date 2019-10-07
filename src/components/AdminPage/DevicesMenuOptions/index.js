import React, { useState } from 'react'
import ButtonGroup from '../..//ButtonGroup'
import CreateDevice from './CreateDevice'
import AddDevices from './AddDevice'

const DEVICES_OPTIONS = [
  {
    icon: null,
    label: 'Add',
    value: 1,
  },
  {
    icon: null,
    label: 'Create',
    value: 2,
  },
]

function DevicesMenuOptions() {
  const [currentOption, setCurrentOption] = useState(1)

  const handleChangeTab = option => {
    setCurrentOption(option)
  }

  return (
    <div className="c-devices-menu-options">
      <ButtonGroup
        options={DEVICES_OPTIONS}
        value={currentOption}
        onChange={handleChangeTab}
        full
      />
      {currentOption === 1 && <AddDevices />}
      {currentOption === 2 && <CreateDevice />}
    </div>
  )
}

export default DevicesMenuOptions
