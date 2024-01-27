export const generateScopes = (scopes: string[], prefix?: string): string => {
  return scopes.map((scope) => `${prefix ?? ''}${scope}`).join(' ')
}
