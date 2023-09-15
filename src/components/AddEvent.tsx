import { FC } from 'react'
import { IModalAddProps } from '../types/modalTypes'
import Title from './ui/Title'
import Form from './ui/Form'
import Input from './ui/Input'
import Button from './ui/Button'
import { Item, List } from './ui/Filter'

const AddEvent: FC<IModalAddProps> = ({ name, colors, setName, setColor, setSubmit }) => {
  return (
    <div className='add-event'>
      <Title>Add Event</Title>
      <Form 
        autoComplete='off'
        onSubmit={setSubmit}
      >
        <Input 
          type='text' 
          name='name'
          value={name}
          placeholder='Add Event...'
          onChange={setName}
        />
        <List>
          { colors.map(item => (
            <Item
              color={item.color}
              isActive={item.isActive}
              key={item.color}
              onClick={() => setColor(item.id)}
            />
          )) }
        </List>
        <Button type='submit'>Add Event</Button>
      </Form>
    </div>
  )
}

export default AddEvent