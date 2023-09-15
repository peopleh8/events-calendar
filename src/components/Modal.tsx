import { FC } from 'react'
import { IModalProps } from '../types/modalTypes'
import { ModalContent, ModalWrapper } from './ui/Modal'

const Modal: FC<IModalProps> = ({ children, visible, toggleVisible }) => {
  return (
    <ModalWrapper 
      visible={visible}
      onClick={() => toggleVisible(false)}
    >
      <ModalContent 
        onClick={e => e.stopPropagation()}
      >
        {children}
      </ModalContent>
    </ModalWrapper>
  )
}

export default Modal