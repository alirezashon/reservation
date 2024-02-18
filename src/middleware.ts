/** @format */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === '/') {
		// const cookie =
		// 	`${}` || ''
		// const token = cookie && cookie.split('=')[1]
		if (!req.cookies.get('CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k')) {
			console.log(req.cookies)
			return NextResponse.redirect(new URL('/Login', req.url))
		}
	}
}
