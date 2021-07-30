import { useEffect, useState } from "react"
import { useAuth, createApolloClient } from '../lib/auth.js'
import { useRouter } from 'next/router'
import {
  gql,
} from '@apollo/client'


function Profile() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const client = createApolloClient()
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    role: '',
    permissions: []
  })
  
  async function getProfile(userId) {
    const { data } = await client.query({
      query: gql`
        query {
          user(_id: "${userId}") {
            _id,
            name,
            username,
            role(populate:true) {
              name,
              permissions(populate: true) {
                name
              }
            }
          }
        }
      `,
    });

    setProfile({
      name: data.user.name,
      username: data.user.username,
      role: data.user.role.name,
      permissions: data.user.role.permissions
    })
  }

  useEffect(() => {
    if (!isSignedIn()) {
        router.push('/auth/login')
    } else {
      getProfile(
        JSON.parse(localStorage.getItem('profile'))._id
      )
    }
  }, [])

  return <>
    {profile.role}
  </>
}

export async function getStaticProps() {
    const layout = 'default'
    
    return {
      props: {
        meta: {
            title: 'Profile',
            description: 'User Profile Dashboard'
        },
        layout,
      },
    }
  }

export default Profile