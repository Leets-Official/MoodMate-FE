import femaleImage from 'public/illustration/female/mypage/myprofile.png'
import maleImage from 'public/illustration/male/mypage/myprofile.png'
import Image from 'next/image'

interface UserInfoProps {
  userGender: string
  userNickname: string
  year: number
  userDepartment: string
}
const Profile = ({
  userGender,
  userNickname,
  year,
  userDepartment,
}: UserInfoProps) => {
  const gender = userGender === 'MALE' ? maleImage : femaleImage
  const age = year.toString().slice(-2)
  return (
    <section className="flex flex-col">
      <div className="mx-auto text-center">
        <Image src={gender} alt="gender" className="mt-4 w-[70px] h-[72px]" />
        <p className="mt-4 text-[18px] font-bold">{userNickname}</p>
      </div>
      <div className="mt-3 justify-center px-4 pt-[4px] h-[30px] text-[14px] text-[#4D4D4D] flex mx-auto border border-[#4D4D4D] rounded-[25px]">
        <p className="mr-3">{age}년생</p>
        <p className="mr-3 ">|</p>
        <p>{userDepartment}</p>
      </div>
      <div className="w-auto h-2 bg-lightgray mt-6" />
    </section>
  )
}

export default Profile
