interface UserNicknameProps {
  pageNum: string
}

export default function UserNickname({ pageNum }: UserNicknameProps) {
  return <div>UserNickname page {pageNum}</div>
}
