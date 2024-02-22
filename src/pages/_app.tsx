
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
const style = {
	backGroundColor: 'red',
}
export default function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<Head>
				<title>foodroon</title>
				<meta
					name='foodroon'
					content='personal'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/images/favicon-32x32.png'
				/>
			</Head>
			<Component {...pageProps} />
		</div>
	)
}
