interface ModalOutsideProps {
  children: React.ReactNode
  className: string
  onClose: () => void
}

const ModalOutside = ({ children, onClose, className }: ModalOutsideProps) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full ">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-40"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="presentation"
      />
      <div className={`absolute bg-white ${className}`}>{children}</div>
    </div>
  )
}
export default ModalOutside
