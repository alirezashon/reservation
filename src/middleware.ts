/** @format */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === '/') {
		const cookie = `${req.cookies.get('CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k')}`|| ''
		const token = cookie.split('=')[1]
		if (!token) {
			console.log(req.cookies)
			return NextResponse.redirect(new URL('/Login', req.url))
		} else {
			;(async () => {
				try {
					const response = await fetch('/api/Auth/Session/Validator', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							authType: 'ClIeNt_ValidaTe*%',
							token: token,
						}),
					})
					await response.json()
					if (response.status !== 200) {
						return NextResponse.redirect(new URL('/Login', req.url))
					}
				} catch (error) {
					console.log(error)
				}
			})()
		}
	}
}
