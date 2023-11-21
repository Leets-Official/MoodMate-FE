import { useState } from 'react'
import { DEPARTMENT_LIST } from '@/_constants/info'

interface AccordionProps {
  onDepartmentSelect: (department: string) => void
  className?: string
  itemClassName?: string
  buttonClassName?: string
}

const Accordion = ({
  onDepartmentSelect,
  className,
  itemClassName,
  buttonClassName,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] =
    useState('학과를 선택하세요')

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (department: string) => {
    setSelectedDepartment(department)
    setIsOpen(false)
    onDepartmentSelect(department)
  }

  return (
    <div className={className}>
      <button type="button" className={buttonClassName} onClick={handleOpen}>
        {selectedDepartment}
        <span>{isOpen ? '▼' : '▲'}</span>
      </button>
      {isOpen && (
        <div className="max-h-20 overflow-y-scroll">
          {DEPARTMENT_LIST.map((department) => (
            <button
              key={department}
              className={itemClassName}
              onClick={() => handleSelect(department)}
              type="button"
            >
              {department}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Accordion
