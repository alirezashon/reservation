/** @format */

import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer, Zoom } from 'react-toastify'

const FoodManagement = () => {
	const image = useRef<HTMLInputElement>(null)
	const [action, setAction] = useState<string>('insert')
	const [foodName, setFoodName] = useState<string>('')
	const [foodPrice, setFoodPrice] = useState<string>('')
	const [headerText, setHeaderText] = useState<string>('Food Management')
	const [imagePlain, setImagePlain] = useState<string>('')
	const actions = ['insert', 'update', 'delete']
	const handleFoods = (e: React.FormEvent) => {
		const handleFood = async (foodData: object) => {
			try {
				const res = await fetch('/api/FoodManagement', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(foodData),
				})

				const data = await res.json()
				if (res.status != 200) {
					toast.error(`${data.message}`)
				} else {
					toast.success('با موفقیت انجام شد')
				}
			} catch (error) {
				console.error('Error:', error)
			}
		}
		const user = localStorage.getItem('user')

		const foodData = {
			foodName,
			foodPrice,
			src: imagePlain,
			actionType:
				action === 'insert'
					? '%&INsertFood&%'
					: action === 'update'
					? '%&UPdateFood&%'
					: '%DEleteFood&%',
		}
		console.log(foodData)

		handleFood(foodData)
		e.preventDefault()
	}
	const handleChangeFile = () => {
		const imageFile = image.current?.files ? image.current.files[0] : null

		if (imageFile) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const imageData = reader.result?.toString().split(',')[1]
				imageData && setImagePlain(imageData)
			}
			reader.readAsDataURL(imageFile)
		}
	}
	return (
		<>
			<ToastContainer
				position={'top-right'}
				newestOnTop
				pauseOnHover
				style={{
					transform: 'rotate(-7deg)',
					margin: '2vh',
				}}
				transition={Zoom}
			/>
			<div
				className={styles.foodManagementBox}
				style={{ width: `${50}vw` }}>
				<h2
					className={styles.header}
					onMouseOver={() => setHeaderText('==')}
					onMouseLeave={() => setHeaderText('Food Management')}>
					{headerText}
				</h2>
				<div className={styles.formBox}>
					<form
						className={styles.form}
						style={{ width: `${33}vw` }}
						onSubmit={handleFoods}>
						<div className={styles.labelBox}>
							<label className={styles.label}>Action:</label>
							{actions.map((action) => (
								<div
									className={styles.radioContainer}
									key={action}>
									<input
										type='radio'
										id={action + 'Food'}
										name='FoodAction'
										value={action}
										onChange={() => setAction(action)}
									/>
									<label
										htmlFor={action + 'Food'}
										className={styles.radioLabel}>
										{action}
									</label>
								</div>
							))}
						</div>

						<div className={styles.labelBox}>
							<label className={styles.label}>
								<input
									className={styles.input}
									style={{ width: `${22}vw` }}
									type='text'
									placeholder='نام غذا'
									value={foodName}
									onChange={(e) => setFoodName(e.target.value)}
									required
								/>
							</label>
						</div>
						{action !== 'delete' && (
							<>
								<div className={styles.labelBox}>
									<label className={styles.label}>
										<input
											className={styles.input}
											style={{ width: `${22}vw` }}
											placeholder='قیمت'
											type='text'
											value={foodPrice}
											onChange={(e) => setFoodPrice(e.target.value)}
											required
										/>
									</label>
								</div>
								<div className={styles.labelBox}>
									<input
										required
										type='file'
										ref={image}
										onChange={handleChangeFile}
									/>
								</div>
							</>
						)}
						<button
							className={styles.submitBtn}
							type='submit'>
							{action.toLocaleUpperCase()}
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
export default FoodManagement
