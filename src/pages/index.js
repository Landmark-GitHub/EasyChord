import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()

  return (
    <main>
      Home Pagenpm
      <button type="button" onClick={() => router.push('/ChordPage')}> Click me </button>
    </main>
  )
}
