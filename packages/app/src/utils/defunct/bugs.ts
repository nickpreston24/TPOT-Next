import { useLocalStorage } from '@hooks'
import { store } from '@functions/firebase/firebase'
import isDev from './environment'

export enum BugType {
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

const searchByEmailAsync = async (search) => {
  const snapshot = await store
    .collection('users')
    .where('email', 'array-contains', search.toLowerCase())
    .orderBy('lastName')
    .get()
  return snapshot.docs.slice(0, 1)
}

export const getAllBugsAsync = async (search) => {
  const snapshot = await store
    .collection('bugs')
    .where('isDeleted', '==', false)
    .orderBy('created')
    .get()
  return snapshot.docs
}

export async function Log(message: string, options: any, id: string = null) {
  const ref = store.collection('bugs')
  const [authUser, setUser] = useLocalStorage('user', '')
  let email = (authUser as any)?.email
  isDev() && console.log(message)

  let user = (await searchByEmailAsync(email)) as any

  let bug = {
    ...options,
    email: email || '',
    username: !!user.lastName ? user?.lastName || '' + ',' + user?.firstName || '' : null,
    created: Date.now(),
    send: null,
    isDeleted: false,
    type: !!options.type ? options?.type : BugType.INFO,
    message,
  } as Bug

  if (!id) {
    ref
      .add(bug)
      .then(() => {
        console.info('Successfully added Bug to firestore bugs database')
      })
      .catch((e) => console.error('Could not create new Bug the bugs database' + e))
  } else {
    ref
      .doc(id)
      .set(bug)
      .then(() => {
        console.info(`Successfully updated Bug ${id?.toString()} to firestore bugs database`)
      })
      .catch((e) => console.error('Could not create new Bug the bugs database' + e))
  }
}

export type Bug = {
  type: BugType
  message: string
  send: Date
  username: string
  email: string
  created: Date
  isDeleted: boolean
}
