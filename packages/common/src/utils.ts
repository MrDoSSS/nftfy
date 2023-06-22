export const sliceAddress = (
  address: `0x${string}` | undefined,
  length = 4
) => {
  if (!address) return ''

  return `${address.slice(0, length)}...${address.slice(
    address.length - length + 1
  )}`
}
