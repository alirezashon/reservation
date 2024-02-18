
import React, { useState } from 'react'
import styles from './index.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer, Zoom } from 'react-toastify'
 

const FoodManagement = () => {
	const [action, setAction] = useState<string>('insert')
	const [foodName, setFoodName] = useState<string>('')
	const [foodCode, setFoodCode] = useState<string>('')
	const [headerText, setHeaderText] = useState<string>('Food Management')
	const [widthPercentage, setWidthPercentage] = useState<number>(1)
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
			foodCode,
			user,
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
				style={{ width: `${50 * widthPercentage}vw` }}>
				<h2
					className={styles.header}
					onMouseOver={() => setHeaderText('==')}
					onMouseLeave={() => setHeaderText('Food Management')}>
					{headerText}
				</h2>
				<div className={styles.formBox}>
					<form
						className={styles.form}
						style={{ width: `${33 * widthPercentage}vw` }}
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
										htmlFor={action+'Food'}
										className={styles.radioLabel}>
										{action}
									</label>
								</div>
							))}
						</div>

						<div className={styles.labelBox}>
							<label  className={styles.label}>
							نام غذا &nbsp;
								<input
									className={styles.input}
									style={{ width: `${22 * widthPercentage}vw` }}
									type='text'
									placeholder='Food Name'
									value={foodName}
									onChange={(e) => setFoodName(e.target.value)}
									required
								/>
							</label>
						</div>
						{action !== 'delete' && (
							<div className={styles.labelBox}>
								<label  className={styles.label}>
									قیمت &nbsp;
									<input
										className={styles.input}
										style={{ width: `${22 * widthPercentage}vw` }}
										placeholder='Food Code'
										type='text'
										value={foodCode}
										onChange={(e) => setFoodCode(e.target.value)}
										required
									/>
								</label>
							</div>
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
