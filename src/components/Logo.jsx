import logoSvg from '../images/logo.svg'
import './Logo.css'

export default function Logo({ variant = 'brand', size = 'default' }) {
  return (
    <span className={`site-logo-wrap site-logo-wrap--${variant} site-logo-wrap--${size}`}>
      <img src={logoSvg} alt="UyTop" className="site-logo" />
    </span>
  )
}
