/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import styles from '../styles/About.module.css';
const me = '/aboutme.jpg'

function About() {
    return (
      <div className={styles.about_container}>
        <div id={styles.left}>
          <h1>About Me</h1>
          <img className={styles.img_me} src={me} alt="About Me"/>
        </div>

        <div id={styles.right}>
          <h1>HERE&apos;S MY STORY</h1>
          <p>I&apos;m an IT Enthusiast with a focus on Software Developer like websites, mobile
apps, smart devices. I&apos;m hardworking and dedicated—all qualities I put forward
in everything I do.</p>
        </div>
      </div>
    )
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