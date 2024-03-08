// Here are more informations about the scroll restoration of React Router
// https://reactrouter.com/web/guides/scroll-restoration

import { Image } from "@themesberg/react-bootstrap"

interface Props {
  checked: boolean,
  setChecked: Function,
  background: string | undefined,
  label: string,
  disabled: boolean,
  hide: boolean,
}
export default function CheckBox({ background, label, checked, setChecked, disabled, hide }: Props) {
  return (
    <div className="ppm cbase m-2 d-flex-column align-items-center justify-content-center" style={{display: `${hide == true ? 'none': 'block'}`}} onClick={() => !disabled&&setChecked(!checked)}>
      <Image src={background} className={`coin-icon ${checked ? 'coin-icon-active':''}`} alt={label} />
      <p className="mt-1">{label}</p>
    </div>
  )
};