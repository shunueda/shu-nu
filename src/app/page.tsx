import { Footer } from '#components/footer'
import { Nav } from '#components/nav'
import classes from './page.module.scss'

export default function Page() {
  return (
    <>
      <Nav />
      <section className={classes.content}>
        <h1>Shun Ueda</h1>
        <div className={classes.info}>
          <p>
            Software engineer. Passionate about using technology to solve
            real-world problems.
          </p>
          <p>
            Interested in mathematics (particularly structures), functional
            programming, ethics, apologetics, and atheism.
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}
