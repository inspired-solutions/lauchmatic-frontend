import React from 'react'
import styles from './styles.scss'

////////////////////////////////////////////////////////////////////////////////////////////////////

function DemoComponent() {
  return (
    <div>
      <style jsx>{styles}</style>
      <div className="demo-component-class">hola</div>
    </div>
  )
}
export default DemoComponent
