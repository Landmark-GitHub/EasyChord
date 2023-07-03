import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()

  return (
    <main>
      Home Pagenpm <br/>
      <button className='bg-red-700 p-3' type="button" onClick={() => router.push('/ChordPage')}> Click me </button>
    </main>
  )
}
