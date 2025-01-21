export const handleError = (error: unknown) => {
  console.error(error)

  if (error instanceof Error) throw error

  throw new Error('Unknown error')
}

export const handleErrorGracefully = (error: unknown) => {
  console.error(error)

  return null
}
