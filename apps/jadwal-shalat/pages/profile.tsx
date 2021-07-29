import { useEffect } from "react"

function Profile() {
    return <>
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