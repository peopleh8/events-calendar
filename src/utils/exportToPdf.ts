import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const exportToPdf = (element: HTMLElement, fileName: string): void => {
  if (element) {
    html2canvas(element).then((canvas) => {
      const imgDataUrl = canvas.toDataURL('image/png')
      const pdf = new jsPDF()

      pdf.addImage(imgDataUrl, 'PNG', 10, 10, 190, 0)
      pdf.save(`${fileName}.pdf`)
    })
  }
}