import styled from 'styled-components'

export const ModalWrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.7);
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
`

export const ModalContent = styled.div`
  background: #fff;
  padding: 30px 40px;
  min-width: 250px;
  max-width: 600px;
  width: 100%;
  border-radius: 10px;
`