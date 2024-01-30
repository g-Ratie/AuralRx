import { authOptions } from '@/service/nextAuthConfig'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Login } from './_components/Login'

const Home = async () => {
  const session = await getServerSession(authOptions)

  if (session?.provider !== 'spotify') return <Login />

  return redirect('/')
}

export default Home
