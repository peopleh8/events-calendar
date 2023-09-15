import { IEvent } from '../types/calendarTypes'

export const exportToXml = (obj: IEvent[], fileName: string): void => {
  const xmlData = `<events>
    ${obj.map((item) => `<event>
        <id>${item.id}</id>
        <title>${item.title}</title>
        <start>${item.start}</start>
        <end>${item.end}</end>
        <color>${item.color}</color>
      </event>
    `).join('')}
  </events>`

  const blob = new Blob([xmlData], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.xml`
  a.click()

  URL.revokeObjectURL(url)
}