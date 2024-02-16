/** @format */

import { NextRequest, NextResponse } from 'next/server'

const middleware = (request: NextRequest) => {
	if (request.nextUrl.pathname === '/') {
		console.log(request)
        const response = NextResponse.next()
        
		response.cookies.set({
			name: '*i&o(n^e%s$k#k@a#n%',
			value: 'slug',
		})
		return NextResponse.redirect(new URL('/login', request.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/about/:path*', '/another/:path*'],
}

export default middleware

// matcher middleware

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const middleware = (req: NextRequest) => {
// 	const path = req.nextUrl.pathname
// 	const slug = path.slice(1)
// 	// console.log('request is ===============================================> ')
// 	// console.log(req)
// 	console.log('path is ===============================================> ')
// 	console.log(path)
// 	const response = NextResponse.next()
// response.cookies.set({
// 	name: 'aliAkbar',
// 	value: slug,
// 	path,
// })

// 	return response
// }
// export default middleware
// export const config = {
// 	matcher: [
// 		'/disclaimer', // match a single, specific page
// 		'/((?!public|static).*)', // match all paths not starting with 'public' or 'static'
// 	],
// }
