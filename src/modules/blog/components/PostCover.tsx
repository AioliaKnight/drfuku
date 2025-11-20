import Image from 'next/image'

interface PostCoverProps {
  image: string
  title: string
}

export default function PostCover({ image, title }: PostCoverProps) {
  return (
    <div className="relative h-[60vh] min-h-[500px] overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
    </div>
  )
}

