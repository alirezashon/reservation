import { useEffect, useState } from 'react'
import styles from './index.module.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GiCrossMark } from 'react-icons/gi'
import Products from './Products'
import { Get } from './Actions'
interface Post {
	_id: string
	title: string
	src: string
	price: number
	category: string
	quantity: number
	description: string
}

const Basket = () => {
	const [isDragging, setIsDragging] = useState<boolean>(false)
	const [position, setPosition] = useState<number>(40)
	const [isBasketOpen, setIsBasketOpen] = useState<boolean>(false)
	const [isBasketFullScreen, setIsBasketFull] = useState<boolean>(false)

	const drawrHandler = (e: DragEvent) => {
		const newPosition = (e.clientX / window.innerWidth) * 100
		isDragging ? setPosition(newPosition) : ''
	}

	
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				const newPosition = (e.clientX / window.innerWidth) * 100
				setPosition(newPosition)
			}
		}
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('mouseup', () => setIsDragging(false))
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', () => setIsDragging)
		}
	}, [isDragging])

	const calculatePrice = async () => {
		const client = localStorage.getItem('user')
		const products = JSON.parse(
			localStorage.getItem('#B!@%$&K&E^T*O(s&') || '[]'
		)
		const response = await fetch('/api/data/Shop', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				products,
				client: client,
				authType: 'S&H!O*P^I$N#G$T^I@M*E',
			}),
		})
 		const data = await response.json()
 	}
	return (
		<>
 			{isBasketOpen ? (
				<div
					className={styles.basketDrawer}
					onMouseDown={() => setIsDragging(true)}>
					<div className={styles.basketHeader}>
						<p>total price</p>
						<GiCrossMark
							className={styles.cross}
							size={'4vh'}
							onClick={() => setIsBasketOpen(false)}
						/>
					</div>
					<div className={styles.basketBase}>
						<button onClick={() => calculatePrice()}>میخوامشون</button>
						<Products/>
					</div>
				</div>
			) : (
				<div>
					<AiOutlineShoppingCart
						className={styles.basketBall}
						color={'white'}
						size={'7vh'}
						onClick={() => setIsBasketOpen(true)}
					/>
				</div>
			)}
		</>
	)
}
export default Basket
