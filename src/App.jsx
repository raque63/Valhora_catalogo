import React, { useRef, useState } from 'react'
import Flipbook from './Flipbook'
import pdfFile from './assets/Valhora.pdf';

export default function App() {
  const [file, setFile] = useState(null)

  const src = file || '/valhora.pdf'
  return (
    <div>
      <div className="toolbar">
        <div className="spacer" />
        <span className="badge">Valhora - Catálogo</span>
      </div>
      <Flipbook src={file ? URL.createObjectURL(file) : '/valhora.pdf'} />
    </div>
  )
}
