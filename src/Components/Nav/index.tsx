 import { PiUserCircleGearFill } from 'react-icons/pi'
import { AiOutlineShoppingCart } from 'react-icons/ai'

import styles from './index.module.css'
const Nav: React.FC = () => {
	return (
		<>
            <div className={styles.topNav}>
				<PiUserCircleGearFill className={styles.profileIcon} />
				<AiOutlineShoppingCart className={styles.profileIcon} />
            </div>
		</>
	)
}
export default Nav
