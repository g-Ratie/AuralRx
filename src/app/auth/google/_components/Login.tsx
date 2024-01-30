import { getProviders } from 'next-auth/react'
import { LoginButton } from '../../_components/LoginButton'

export const Login = async () => {
  const provider = await getProviders()
  return <div>{provider?.google && <LoginButton loginProvider={provider.google} />}</div>
}
