
import Image from 'next/image'
import styles from './index.module.css'
import { FaMinus } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import { Add, Remove } from '../Actions'
interface Post {
	_id: string
	name: string
	src: string
	price: string
	inBasket?: number
}
interface BasketStore {
	id: string
	count: number
}
const Products: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([])
	const [postStates, setPostStates] = useState<Post[]>(posts)

	const updateBasketState = (posts: Post[], basketItems: BasketStore[]) => {
		const updatedPosts = posts?.map((post) => {
			const matchingItem = basketItems.find((item) => item.id === post._id)

			return {
				...post,
				inBasket: matchingItem ? matchingItem.count : 0,
			}
		})

		setPostStates(updatedPosts)
	}

	const getData = async (data: string[]) => {
		const response = await fetch('/api/data/Post/Client/bulk', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bulkID: data,
				authType: 'G&E!T*P^R$O#D$U^C@T*B^u$l*K$',
			}),
		})
		const posts = await response.json()
		setPosts(posts.products)
	}
	useEffect(() => {
		const basketPost: string[] = JSON.parse(
			localStorage.getItem('#B!@%$&K&E^T*O(s&') || '[]'
		)
		const productsID = basketPost.map(
			(post) => post.split('*2%2&7(7)5%5!1@2')[0]
		)
		getData(productsID)
		const basketSide: BasketStore[] = []

		if (basketPost.length > 0) {
			basketPost.forEach((post) => {
				const [postId, quantityStr] = post.split('*2%2&7(7)5%5!1@2')
				const count = parseInt(quantityStr)
				basketSide.push({ id: postId, count })
			})
			updateBasketState(posts, basketSide)
		}
	}, [posts])

	return (
		<>
			{postStates&& postStates.map((obj) => (
				<div key={obj._id} className={styles.postsContainer}>
					<div className={styles.productBox}>
						<Image
							src={obj.src}
							alt={obj.name}
							width={222}
							height={222}
							className={styles.image}
						/>
						<div className={styles.productDetails}>
							<div className={styles.title}>
								<h4>{obj.name}</h4>
							</div>
							<div className={styles.details}>
								<div className={styles.priceBox}>
									<p>{obj.price}</p>
								</div>
								<div className={styles.controlBox}>
									<MdAddCircle
										className={styles.inceriment}
										size={'3vh'}
										onClick={() => Add(obj._id)}
									/>
									<p className={styles.quantity}>{obj.inBasket}</p>
									<FaMinus
										className={styles.deceriment}
										size={'3vh'}
										onClick={() => Remove(obj._id)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
export default Products
