import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { isAddressEqual, Address } from 'viem'
import { MaybeRef, unref } from 'vue'

export interface StandardMerkleTreeData<T extends any[]> {
  format: 'standard-v1'
  tree: string[]
  values: {
    value: T
    treeIndex: number
  }[]
  leafEncoding: string[]
}

export const sliceAddress = (address?: Address, length = 4) => {
  if (!address) return ''

  return `${address.slice(0, length)}...${address.slice(
    address.length - length + 1
  )}`
}

export const generateMerkleTree = (addresses: Address[]) => {
  const values = addresses.map((addr) => [addr.toLowerCase()])
  const tree = StandardMerkleTree.of(values, ['address'])

  return { root: tree.root, dump: tree.dump() }
}

export const getMerkleProof = <T extends any[]>(
  treeData: StandardMerkleTreeData<T>,
  address: Address
): Address[] | void => {
  const tree = StandardMerkleTree.load(treeData)

  for (const [i, [v]] of tree.entries()) {
    if (isAddressEqual(v, address)) {
      const proof = tree.getProof(i) as Address[]
      return proof
    }
  }
}

type DeepUnref<T> = T extends MaybeRef<infer U>
  ? U
  : T extends Array<infer V>
  ? DeepUnref<V>[]
  : T

export const deepUnref = <T>(value: T): DeepUnref<T> => {
  if (Array.isArray(value)) {
    return value.map((item) => deepUnref(item)) as DeepUnref<T>
  }

  return unref(value) as DeepUnref<T>
}
