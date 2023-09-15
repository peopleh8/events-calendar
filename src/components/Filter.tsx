import { FC } from 'react'
import Title from './ui/Title'
import { IFilterProps } from '../types/filterTypes'
import { Item, List } from './ui/Filter'

const Filter: FC<IFilterProps> = ({ colors, changeFilter }) => {
  return (
    <div
      className='filter'
      style={{
        marginBottom: 20
      }}
    >
      <Title>Filter</Title>
      <List>
        { colors.map(item => (
          <Item
            color={item.color}
            isActive={item.isActive}
            key={item.color}
            onClick={() => changeFilter(item.id)}
          />
        )) }
      </List>
    </div>
  )
}

export default Filter