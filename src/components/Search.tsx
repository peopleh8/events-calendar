import { FC } from 'react'
import { ISearchProps } from '../types/searchTypes'
import Title from './ui/Title'
import Input from './ui/Input'

const Search: FC<ISearchProps> = ({ search, changeSearch }) => {
  return (
    <div 
      className='search'
      style={{
        marginBottom: 20
      }}
    >
      <Title>Search</Title>
      <Input 
        className='search-inp' 
        name='search'
        autoComplete='off'
        type="text" 
        placeholder='Search...'
        value={search}
        onChange={changeSearch}
      />
    </div>
  )
}

export default Search