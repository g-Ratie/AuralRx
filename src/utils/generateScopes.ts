export const generateScopes = (scopes: string[], prefix = '', needOpenId = false): string => {
  const openId = needOpenId ? ['openid'] : []
  const scopesWithPrefix = scopes.map((scope) => `${prefix}${scope}`)
  return [...openId, ...scopesWithPrefix].join(' ')
}
