import homeSvg from '../images/home.svg'
import keysSvg from '../images/keys.svg'
import yerSvg from '../images/yer.svg'
import dachaSvg from '../images/dacha.svg'
import hotelSvg from '../images/hotel.svg'

const CATEGORY_IMAGES = {
  sotuv: homeSvg,
  ijara: keysSvg,
  yer: yerSvg,
  dacha: dachaSvg,
  mexmonxona: hotelSvg,
}

function AssetIllustration({ src, categoryId }) {
  return (
    <span className="category-illustration-wrap">
      <img
        src={src}
        alt=""
        className={[
          'category-illustration-photo',
          categoryId === 'dacha' && 'category-illustration-dacha',
        ].filter(Boolean).join(' ')}
        aria-hidden="true"
      />
    </span>
  )
}

export default function CategoryIllustration({ categoryId }) {
  const imageSrc = CATEGORY_IMAGES[categoryId]
  if (!imageSrc) return null
  return <AssetIllustration src={imageSrc} categoryId={categoryId} />
}
