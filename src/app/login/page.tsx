import { getProviders } from 'next-auth/react'
import { LoginButton } from './_components/LoginButton'

const Home = async () => {
  const providers = await getProviders()
  if (providers === null) return null

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <LoginButton key={provider.name} loginProvider={provider} />
      ))}
    </div>
  )
}

export default Home
