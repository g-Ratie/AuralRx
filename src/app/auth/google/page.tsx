import { authOptions } from '@/service/nextAuthConfig'
import { getServerSession } from 'next-auth'
import { Fitness } from './_components/Fitness'
import { Login } from './_components/Login'

const Home = async () => {
  const session = await getServerSession(authOptions)

  if (session?.provider !== 'google') return <Login />

  return <Fitness />
}

export default Home
