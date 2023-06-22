import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  UpdateData,
} from 'firebase/firestore'
import { db } from './'
import { localhost, goerli, mainnet } from '@wagmi/core/chains'

export interface Project {
  id?: string
  name: string
  symbol: string
  contractAddress: `0x${string}`
  chainId?: number
  chain?: typeof localhost | typeof goerli | typeof mainnet
}

class Collection<T extends DocumentData = DocumentData> {
  constructor(public collectionName: string) {}

  get collectionRef() {
    return collection(db, this.collectionName).withConverter<T>(this)
  }

  docRef(id: string) {
    return doc(db, this.collectionName, id).withConverter<T>(this)
  }

  add(data: T) {
    return addDoc(this.collectionRef, data)
  }

  update(id: string, data: UpdateData<Partial<Omit<T, 'id'>>>) {
    return updateDoc(this.docRef(id), data)
  }

  delete(id: string) {
    return deleteDoc(this.docRef(id))
  }

  toFirestore(object: T) {
    return object
  }

  fromFirestore(snapshot: QueryDocumentSnapshot<T>, options: SnapshotOptions) {
    const data = snapshot.data(options)!

    return { ...data, id: snapshot.id }
  }
}

class Projects extends Collection<Project> {
  constructor() {
    super('projects')
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<Project>,
    options: SnapshotOptions
  ) {
    const data = super.fromFirestore(snapshot, options)

    if (data.chainId) {
      data.chain = [localhost, goerli, mainnet].find(
        (chain) => chain.id === data.chainId
      )
    }

    return data
  }
}

export const projects = new Projects()
