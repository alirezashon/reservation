/** @format */

import { useEffect, useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import { GiCrossMark, GiCheckMark } from 'react-icons/gi'

interface Food {
	_id: string
	name: string
	price: number
	src: string
	quantity?: number
}
const FoodList = () => {
	const [foods, setFoods] = useState<Food[]>([])
	const [selectedFood, setSelectedFood] = useState<string[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/data/Post/Client/bulk', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ authType: 'G&E!T*P^R$O#D$U^C@T*s^f$u*l$' }),
				})
				if (!response.ok) {
					throw new Error('Failed to fetch data')
				}
				const { products } = await response.json()
				setFoods(products)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])
	const addToWeekFoods = async () => {
		try {
			const response = await fetch('/api/data/Post/Admin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					authType: '!I@N$e$r%T&O*',
					data: { day: 'شنبه', food: selectedFood[0] },
				}),
			})
			if (!response.ok) {
				throw new Error('Failed to fetch data')
			}
			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}
	return (
		<div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>نام</th>
						<th>قیمت</th>
						<th>تصویر</th>
						<th>افزودن</th>
					</tr>
				</thead>
				<tbody>
					{foods.map((food) => (
						<tr key={food._id}>
							<td>{food.name}</td>
							<td>{food.price}</td>
							<td>
								<Image
									src={`data:image/jpeg;base64,${food.src}`}
									width={90}
									height={90}
									alt={food.name}
									className={styles.image}
								/>
							</td>
							<td>
								<input
									type='checkbox'
									className={styles.checkboxInput}
									onChange={(e) => {
										const value = e.target.value
										setSelectedFood((selectedFoods) => {
											if (selectedFoods.includes(value)) {
												return selectedFoods.filter((food) => food !== value)
											} else {
												return [...selectedFoods, value]
											}
										})
									}}
									value={food._id}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.buttonBox}>
				<GiCrossMark className={styles.cross} />
				<GiCheckMark
					className={styles.check}
					onClick={addToWeekFoods}
				/>
			</div>
		</div>
	)
}
export default FoodList
