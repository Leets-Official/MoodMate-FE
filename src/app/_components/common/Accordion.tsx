import { DEPARTMENT_LIST } from '@/_constants/info'

interface AccordionProps {
  selectedDepartment: string
  onDepartmentSelect: (department: string) => void
  onOpen: () => void
  isOpen: boolean
}

const Accordion = ({
  selectedDepartment,
  onDepartmentSelect,
  onOpen,
  isOpen,
}: AccordionProps) => {
  const handleSelect = (department: string) => {
    onDepartmentSelect(department)
  }

  return (
    <div
      className={`w-72 mx-auto mt-[419px] ${
        isOpen ? 'rounded-lg flex flex-col-reverse' : 'rounded-lg h-12'
      } scrollbar-hide`}
      style={{ backgroundColor: isOpen ? '#FFF3F4' : '#FFE5E7' }}
    >
      <button
        type="button"
        className={`w-full h-12 rounded-lg ${
          selectedDepartment === '학과를 입력하세요' ? 'bg-FFE5E7' : 'bg-FC4F59'
        } text-FC4F59`}
        onClick={onOpen}
      >
        {selectedDepartment}
        <span className="ml-[50px]">{isOpen ? '▼' : '▲'}</span>
      </button>
      {isOpen && (
        <div className="max-h-36 overflow-y-scroll">
          {DEPARTMENT_LIST.map((department) => (
            <button
              key={department}
              className="w-full h-12 rounded-lg bg-FFF3F4"
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
