import femaleImage from 'public/illustration/female/mypage/myprofile.png'
import maleImage from 'public/illustration/male/mypage/myprofile.png'
import Image from 'next/image'
import UserNickname from './UserNickname'
import YearDept from './YearDept'

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
  const age = year?.toString().slice(-2)

  return (
    <section className="flex flex-col">
      <div className="mx-auto text-center flex flex-col items-center justify-center">
        <Image src={gender} alt="gender" className="mt-4 w-[70px] h-[72px]" />
        <UserNickname userNickname={userNickname} />
      </div>
      <YearDept age={age} userDepartment={userDepartment} />
      <div className="w-auto h-2 bg-lightgray mt-6" />
    </section>
  )
}

export default Profile
