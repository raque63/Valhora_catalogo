import React, { useRef, useState } from 'react'
import Flipbook from './Flipbook'
import pdfFile from './assets/Valhora.pdf';

export default function App() {
  const [file, setFile] = useState(null)

  const "https://drive.google.com/uc?export=view&id=1N6G7p3QgGj9oiif_-XODlD4G4OadZ1On"
  return (
    <div>
      <div className="toolbar">
        <div className="spacer" />
        <span className="badge">Valhora - Catálogo</span>
      </div>
      <Flipbook src={file ? URL.createObjectURL(file) : '/Valhora.pdf'} />
    </div>
  )
}
