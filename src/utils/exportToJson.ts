import { IEvent } from '../types/calendarTypes'

export const exportToJson = (obj: IEvent[], fileName: string): void => {
  const jsonData = JSON.stringify(obj)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.json`
  a.click()

  URL.revokeObjectURL(url)
}