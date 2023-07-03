import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { isAddressEqual } from 'viem'

export interface StandardMerkleTreeData<T extends any[]> {
  format: 'standard-v1'
  tree: string[]
  values: {
    value: T
    treeIndex: number
  }[]
  leafEncoding: string[]
}

export const sliceAddress = (
  address: `0x${string}` | undefined,
  length = 4
) => {
  if (!address) return ''

  return `${address.slice(0, length)}...${address.slice(
    address.length - length + 1
  )}`
}

export const generateMerkleTree = (addresses: `0x${string}`[]) => {
  const values = addresses.map((addr) => [addr.toLowerCase()])
  const tree = StandardMerkleTree.of(values, ['address'])

  return { root: tree.root, dump: tree.dump() }
}

export const getMerkleProof = <T extends any[]>(
  treeData: StandardMerkleTreeData<T>,
  address: `0x${string}`
): `0x${string}`[] | void => {
  const tree = StandardMerkleTree.load(treeData)

  for (const [i, [v]] of tree.entries()) {
    if (isAddressEqual(v, address)) {
      const proof = tree.getProof(i) as `0x${string}`[]
      return proof
    }
  }
}
