function About() {
    return <>
    </>
}

export async function getStaticProps() {
    const layout = 'default'
    return {
      props: {
        meta: {
            title: 'About',
            description: 'Tentang Saya dan Website'
        },
        layout,
      },
    }
  }

export default About