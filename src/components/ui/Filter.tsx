import styled from 'styled-components'

export const List = styled.div`
  display: flex;
  margin: 10px 0;
`
export const Item = styled.div<{ color: string, isActive: boolean }>`
  width: 30px;
  height: 30px;
  background: ${(props) => props.color};
  cursor: pointer;
  border-radius: 50%;
  opacity: ${(props) => (props.isActive ? '0.6' : '1')};
  & + & {
    margin-left: 5px;
  }
`