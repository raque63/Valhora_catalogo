import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

export async function loadPdf(src) {
  const data = typeof src === 'string' ? src : URL.createObjectURL(src)
  const loadingTask = pdfjsLib.getDocument({ url: data })
  const pdf = await loadingTask.promise
  return { pdf, revoke: () => { if (typeof src !== 'string') URL.revokeObjectURL(data) } }
}

export async function renderPageToDataURL(page, scale = 1.8) {
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { alpha: false })
  canvas.width = viewport.width
  canvas.height = viewport.height
  await page.render({ canvasContext: ctx, viewport }).promise
  const url = canvas.toDataURL('image/jpeg', 0.92)
  return { url, width: canvas.width, height: canvas.height }
}
