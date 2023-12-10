interface UserInfoProps {
  userNickname: string
  year: number
  userDepartment: string
}
const Profile = ({ userNickname, year, userDepartment }: UserInfoProps) => {
  return (
    <section className="flex flex-col">
      <div className="mx-auto text-center">
        <p className="mt-16">로고</p>
        <p className="mt-4 text-[18px] font-bold">{userNickname}</p>
      </div>
      <div className="mt-3 justify-center px-4 pt-[4px] h-[30px] text-[14px] text-[#4D4D4D] flex mx-auto border border-[#4D4D4D] rounded-[25px]">
        <p className="mr-3">{year}</p>
        <p className="mr-3 ">|</p>
        <p>{userDepartment}</p>
      </div>
      <div className="w-auto h-2 bg-[#E6E6E6] mt-6" />
    </section>
  )
}

export default Profile
