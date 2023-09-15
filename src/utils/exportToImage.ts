import html2canvas from 'html2canvas'

export const exportToImage = (element: HTMLElement, fileName: string): void => {
  if (element) {
    html2canvas(element).then((canvas) => {
      const imgDataUrl = canvas.toDataURL('image/png')

      const a = document.createElement('a')
      a.href = imgDataUrl
      a.download = `${fileName}.png`
      a.click()
    })
  }
}