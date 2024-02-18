/** @format */

import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

type Food = {
	foodName: string
	foodCode: string
}

const FoodList = () => {
	const [foods, setFoods] = useState<Food[]>([])
	const [headerText, setHeaderText] = useState<string>('Foods List')
	const [widthPercentage, setWidthPercentage] = useState<number>(1)
	useEffect(() => {
		const fetchFoods = async () => {
			try {
				const res = await fetch('/api/FoodManagement/GET', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ authType: 'G!E@T#A^G#E$N%T^S*' }),
				})

				if (!res.ok) {
					console.error('Error fetching Foods')
					return
				}

				const data = await res.json()
				setFoods(data.foods)
			} catch (error) {
				console.error('Error:', error)
			}
			useState
		}

		fetchFoods()
	}, [])

	return (
		<div
			className={styles.foodListBackground}
			style={{ width: `${50 * widthPercentage}vw` }}>
			<h2
				className={styles.header}
				onMouseOver={() => setHeaderText('روز خوبی داشته باشید')}
				onMouseLeave={() => setHeaderText('لیست غذاها')}>
				{headerText}
			</h2>
			<div className={styles.foodsBox}>
				<div className={styles.foodBoxScroller}>
					<ul>
						{foods.map((food) => (
							<li
								className={styles.food}
								style={{ width: `${40 * widthPercentage}vw` }}
								key={food.foodName}>
								<strong className={styles.email}>Food: {food.foodName}</strong>{' '}
								<strong className={styles.name}>Code: {food.foodCode}</strong>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
export default FoodList
