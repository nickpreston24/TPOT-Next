import axios from 'axios'
import { Document } from 'firestorter'
import jwt from 'jsonwebtoken'
import { toJS } from 'mobx'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '@hooks'
import { createInstance, Paper } from '@models'
import { store } from '@functions/firebase/firebase'
import { wpapi } from '@functions/wordpress'

let endpoint = `https://www.thepathoftruth.com/wp-json/wp/v2/pages`

const wordpressContext = createContext(null)

const isTokenExpired = (token) => jwt.decode(token, { complete: true }).exp < new Date().getTime()

export const useWordpress = () => useContext(wordpressContext)

export function ProvideWordpress({ children }) {
  const wordpress = useWordpressProvider()
  return !wordpress ? (
    <>WordPress API could not be loaded!</>
  ) : (
    <wordpressContext.Provider value={wordpress}>{children}</wordpressContext.Provider>
  )
}

function useWordpressProvider() {
  const [currentPaper, setCurrentPaper] = useState(createInstance(Paper))
  const [wpUsers, setWpUsers] = useState([])
  const [superUser, setSuperUser] = useState(null)
  const [token, setToken] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useLocalStorage('user', '')

  useEffect(() => {
    const doc = new Document<any>(`users/super-user`)
    let credentials = null
    const ref = store.collection('users')

    const fetchSuperUser = async () => {
      await doc.fetch().then((response) => {
        let data = toJS(response.data)

        credentials = data['wordpress-credentials']

        setSuperUser(data)

        let config = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          url: `https://www.thepathoftruth.com/wp-json/jwt-auth/v1/token`,
          params: {
            username: credentials?.email,
            password: credentials?.password,
            token: data?.token,
          },
        }

        let savedToken = credentials?.token || localStorage.getItem('token')
        let isExpired = !credentials?.token || isTokenExpired(savedToken)

        if (isExpired) {
          let message = 'Your Wordpress JWT has expired!  Requesting new one...'
          console.warn(message)
        }

        if (!savedToken || isExpired) {
          axios(config as any)
            .then((response) => {
              let { token } = response.data
              setToken(token)
              doc
                .update({
                  'wordpress-credentials': {
                    ...credentials,
                    token,
                  },
                })
                .catch((err) =>
                  console.error('Error occured when trying to update JWT in super-user:' + err)
                )
              localStorage.setItem('token', token)
            })
            .catch((err) =>
              console.error('Error when fetching new JWT token from Wordpress:' + err)
            )
        } else {
          setToken(savedToken)
        }
      })
    }

    fetchSuperUser()
  }, [])

  useEffect(() => {
    setLoading(true)

    wpapi.users().then((users) => setWpUsers(users))

    wpapi.categories().then((data) => {
      setCategories(data)
    })

    setLoading(false)
  }, [])

  const getPageBySlug = (slug: string) => wpapi.pages().slug(slug)

  const getPageById = (id: number) => wpapi.pages().id(id)

  const getPagesForAuthor = (authorId: number, take: number = 10) =>
    wpapi.pages().author(authorId).perPage(take)

  const getDrafts = () => wpapi.pages().auth().param('status', 'publish')

  const search = (term: string) => wpapi.search(term)

  const publish = async (paper: Paper) => {
    const { author, id, slug } = paper
    let permalink = `https://www.thepathoftruth.com/${slug}.htm`
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    let query = `${endpoint}/${id}`

    const existingPaper = !!id ? (await axios.get(query, config as any)).data : false

    if (!!existingPaper) {
      if (!!paper.language && paper.language.toLowerCase() !== 'english') {
        paper.slug = paper.language + '/' + paper.slug + '_' + paper.language
      }

      let response = await axios.put(
        query,
        {
          ...paper,
          meta: {
            permalink,
            link: permalink,
          },
        },
        config as any
      )

      return response.data
    } else if (!existingPaper) {
      let response = await axios.post(
        endpoint,
        {
          ...paper,
          meta: {
            permalink,
            link: permalink,
          },
        },
        config as any
      )

      return response.data
    }
  }

  return {
    wpapi,
    wpUsers,

    getPagesForAuthor,
    getPageById,
    getPageBySlug,
    getDrafts,

    publish,
    token,
    categories,
    search,
  }
}
