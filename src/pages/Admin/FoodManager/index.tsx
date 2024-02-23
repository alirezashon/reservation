 
import { useState } from 'react'
import AgentList from './List'
import AgentManagement from './Actions'
const Design = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
 				<div style={{ display: 'flex' }}>
					<AgentManagement
 					/>
					 
					<AgentList
 					/>
				</div>
			
		</>
	)
}
export default Design
