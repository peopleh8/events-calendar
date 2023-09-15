import { FC } from 'react'
import styled from 'styled-components'
import { exportToImage } from '../utils/exportToImage'
import { exportToJson } from '../utils/exportToJson'
import { exportToPdf } from '../utils/exportToPdf'
import { exportToXml } from '../utils/exportToXml'
import { IExportButtonsProps } from '../types/exportButtonsType'
import Button from './ui/Button'

const ExportButtons: FC<IExportButtonsProps> = ({ calendar, events }) => {
  const Buttons = styled.div`
    display: flex;
    margin-bottom: 10px;
  `
  
  return (
    <Buttons>
      <Button onClick={() => exportToImage(calendar, 'calendar')}>Export to Image</Button>
      <Button onClick={() => exportToPdf(calendar, 'calendar')}>Export to PDF</Button> 
      <Button onClick={() => exportToJson(events, 'calendar')}>Export to JSON</Button>
      <Button onClick={() => exportToXml(events, 'calendar')}>Export to XML</Button>
    </Buttons>
  )
}

export default ExportButtons