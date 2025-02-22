import Image, { ImageProps } from 'next/image'

import bgGradient from '@/public/bg-gradient.svg'
import logo from '@/public/ilia-orlov.svg'
import iliaOrlovPortrait from '@/public/ilia-orlov-portrait.png'

export const ImageLogo = ({ ...props }: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image src={logo} alt='Ilia Orlov logo' {...props} />
)

export const ImagePortrait = ({
  ...props
}: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image src={iliaOrlovPortrait} alt='Ilia Orlov portrait' {...props} />
)

export const ImageBgGradient = ({
  ...props
}: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image src={bgGradient} alt='Background Gradient' {...props} />
)

export const ImageBgGradientWithPortrait = () => (
  <span className='relative bg-red-500'>
    <ImagePortrait />
    <ImageBgGradient />
  </span>
)
