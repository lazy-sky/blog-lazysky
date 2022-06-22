import { useRouter } from 'next/router'
import Image from 'next/image'

import { ArrowLeftIcon } from '../../../assets/images'

const BackButton = () => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  return (
    <button type='button' onClick={handleBackClick}>
      <Image src={ArrowLeftIcon} height={24} width={24} alt='logo' />
    </button>
  )
}

export default BackButton
