import reactDOM from 'react-dom'

interface ModalPortalProps {
  children: React.ReactNode
  nodeName: string
}

const ModalPortal = ({ children, nodeName }: ModalPortalProps) => {
  if (typeof window === 'undefined') {
    return null
  }

  const node = document.getElementById(nodeName) as Element
  return reactDOM.createPortal(children, node)
}

export default ModalPortal
