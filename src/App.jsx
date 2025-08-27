import React, { useRef, useState } from 'react'
import Flipbook from './Flipbook'

export default function App() {
  const [file, setFile] = useState(null)


  return (
    <div>
      <div className="toolbar">
        <div className="spacer" />
        <span className="badge">Valhora - Catálogo</span>
      </div>
      <Flipbook src={file ? URL.createObjectURL(file) : "/Valhora.pdf"} />
    </div>
  )
}
