import { FC } from 'react'
import Search from './../components/Search'
import Filter from './../components/Filter'
import ExportButtons from './../components/ExportButtons'
import { IToolbarProps } from '../types/toolbarTypes'

const Toolbar: FC<IToolbarProps> = ({ calendar, events, search, colors, changeSearch, changeFilter }) => {
  return (
    <div className='toolbar'>
      <Search 
        search={search} 
        changeSearch={changeSearch}
      />
      <Filter 
        colors={colors} 
        changeFilter={changeFilter}
      />
      <ExportButtons
        calendar={calendar}
        events={events}
      />
    </div>
  )
}

export default Toolbar