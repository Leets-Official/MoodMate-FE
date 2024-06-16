'use client'

import { MY_DEPARTMENT_PAGE } from '@/_constants/info'

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
  const getSortedDepartmentList = () =>
    [...MY_DEPARTMENT_PAGE.DEPARTMENT_LIST].sort()
  const handleSelect = (department: string) => {
    onDepartmentSelect(department)
  }

  return (
    <>
      {isOpen ? (
        <div className="relatvie w-full max-h-48 rounded-[16px] overflow-y-scroll scrollbar-hide bg-onepink">
          {getSortedDepartmentList().map((department) => (
            <button
              key={department}
              className={`w-full h-12 ${
                selectedDepartment === department
                  ? 'bg-FFF3F4 text-primary'
                  : 'bg-FFF3F4 text-darkgray'
              } hover:text-primary hover:bg-zeropink font-sans font-medium leading-normal`}
              onClick={() => handleSelect(department)}
              type="button"
            >
              {department}
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full h-48" />
      )}

      <button
        type="button"
        className={`w-full h-[48px] rounded-[16px] mt-2 bg-onepink flex justify-between items-center px-4 relative ${
          selectedDepartment && 'border-[1px] border-primary'
        }`}
        onClick={onOpen}
      >
        <span
          className={`${
            selectedDepartment ? 'text-primary' : 'text-darkgray'
          } not-italic font-medium leading-normal`}
        >
          {selectedDepartment || MY_DEPARTMENT_PAGE.WARNINGS}
        </span>
        <span className="absolute right-[18px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
          >
            <path
              d="M7.26481 0.334747C6.84179 -0.111583 6.15482 -0.111583 5.73181 0.334746L0.317258 6.04776C-0.105754 6.49409 -0.105754 7.21892 0.317258 7.66525C0.74027 8.11158 1.42724 8.11158 1.85025 7.66525L6.5 2.75921L11.1497 7.66168C11.5728 8.10801 12.2597 8.10801 12.6827 7.66168C13.1058 7.21536 13.1058 6.49052 12.6827 6.04419L7.26819 0.331176L7.26481 0.334747Z"
              fill={selectedDepartment ? '#FC4F59' : '#333333'}
            />
          </svg>
        </span>
      </button>
    </>
  )
}

export default Accordion
