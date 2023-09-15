import styled from 'styled-components'

const Button = styled.button`
  background: #2c3e50;
  display: block;
  border: none;
  outline: none;
  font-size: 1em;
  line-height: 1.5;
  padding: 0.4em 0.65em;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  border-radius: 0.25em;
  cursor: pointer;
  & + & {
    margin-left: 5px;
  }
  &:focus {
    border: none;
    outline: none;
  }
  &:hover {
    background: #1e2b37;
  }
`

export default Button