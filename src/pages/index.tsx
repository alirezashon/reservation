/** @format */

import Basket from '@/Components/Basket'
import Menu from '@/Components/Menu'
import AdminMenu from '@/Components/Menu/Admin'
import Nav from '@/Components/Nav'

const Home = () => {
	return (
		<>
			<Basket />
			<Nav />
			<AdminMenu />
		</>
	)
}
export default Home
