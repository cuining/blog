import Meta from '../components/meta'
import Link from 'next/link'

export default ({ children }) => (
  <main>
    <div className="logo">
      <Link href="//linnk.app">
        <a>linnk.app</a>
      </Link>
    </div>
    {children}
    <Meta />
    <style jsx>{`
      main {
        padding: 25px 50px;
      }

      .logo {
        margin-bottom: 50px;
      }

      a {
        text-decoration: none;
      }

      @media (max-width: 500px) {
        main {
          padding: 25px 15px;
        }

        .logo {
          margin-bottom: 20px;
        }
      }
    `}</style>
  </main>
)
