import { FC } from 'react'
import styled from 'styled-components'
import { IModalEditProps } from '../types/modalTypes'
import Title from './ui/Title'
import Form from './ui/Form'
import Input from './ui/Input'
import { Item, List } from './ui/Filter'
import Button from './ui/Button'

const EditEvent: FC<IModalEditProps> = ({ name, colors, setName, setColor, setSubmit, setRemove }) => {
  const Buttons = styled.div`
    display: flex;
  `
  
  return (
    <div>
      <Title>Edit Event</Title>
      <Form
        autoComplete='off'
        onSubmit={setSubmit}
      >
        <Input 
          type='text' 
          name='name'
          placeholder='Edit Event...'
          value={name}
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
        <Buttons>
          <Button type='submit'>Edit Event</Button>
          <Button type='button' onClick={setRemove}>Remove Event</Button>
        </Buttons>
      </Form>
    </div>
  )
}

export default EditEvent