// eslint-disable-next-line import/no-extraneous-dependencies
import { BeatLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="w-full h-screen flex">
      <BeatLoader color="#FC4F59" />
    </div>
  )
}

export default Loading
