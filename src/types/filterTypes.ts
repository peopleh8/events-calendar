export enum ColorEnum {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}

export interface IColor {
  id: number
  color: string
  isActive: boolean
}

export interface IFilterProps {
  colors: IColor[],
  changeFilter: (id: number) => void
}