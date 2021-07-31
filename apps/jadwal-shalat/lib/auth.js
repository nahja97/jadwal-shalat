import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'
import { useRouter } from 'next/router'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

async function assignRefreshToken(accessToken, refreshToken) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('profile')
    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'http://localhost:4000/graphql',
        }),
        cache: new InMemoryCache(),
    })
    const LoginMutation = gql`
        mutation RefreshToken ($payload: RefreshTokenAuth!) {
            refreshToken(payload: $payload) {
                _id,
                name,
                role {
                    name,
                    permissions(populate: true) {
                    name
                    }
                }
                access_token,
                refresh_token
            }
        }
    `

    const result = await client.mutate({
        mutation: LoginMutation,
        variables: {
            payload: {
                refresh_token: refreshToken,
                access_token: accessToken
            }
        },
    })
    if (result?.data?.refreshToken?.access_token) {
        localStorage.setItem('access_token', result.data.refreshToken.access_token)
        localStorage.setItem('refresh_token', result.data.refreshToken.refresh_token)
        localStorage.setItem('profile', JSON.stringify(result.data.refreshToken))
    }
}

const getAuthHeaders = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('access_token') && parseJwt(localStorage.getItem('access_token')).exp * 1000 < Date.now()) {
            assignRefreshToken(localStorage.getItem('access_token'), localStorage.getItem('refresh_token'))
        }
        const authToken = localStorage.getItem('access_token')

        if (!authToken) return null

        return {
            authorization: `Bearer ${authToken}`,
        }
    }
    return null
  }

export const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'http://localhost:4000/graphql',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
}

export const useAuth = () => {
    return useContext(authContext)
}
function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

function useProvideAuth() {
    const router = useRouter()
    const isSignedIn = () => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('access_token') && localStorage.getItem('profile')) {
                const userProfile = parseJwt(localStorage.getItem('access_token'))
                if (JSON.parse(localStorage.getItem('profile'))._id == userProfile._id) {
                    return true
                }
            }
        }
        return false
    }

    const signIn = async (payload) => {
        const client = new ApolloClient({
            link: new HttpLink({
                uri: 'http://localhost:4000/graphql',
            }),
            cache: new InMemoryCache(),
        })
        const LoginMutation = gql`
            mutation Login($payload: ListUserAuth!) {
                login(payload: $payload) {
                    _id,
                    name,
                    access_token,
                    refresh_token,
                    role {
                        name,
                        permissions(populate: true) {
                            name
                        }
                    }
                }
            }
        `

        const result = await client.mutate({
            mutation: LoginMutation,
            variables: payload,
        })

        if (result?.data?.login?.access_token) {
            localStorage.setItem('access_token', result.data.login.access_token)
            localStorage.setItem('refresh_token', result.data.login.refresh_token)
            localStorage.setItem('profile', JSON.stringify(result.data.login))
            router.push('/profile')
        }
    }

    const signOut = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('profile')
        router.push('/auth/login')
    }

    return {
        isSignedIn,
        signIn,
        signOut,
        createApolloClient,
    }
}