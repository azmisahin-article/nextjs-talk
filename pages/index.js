import { createPartner, readPartner } from '@/lib/controllers'
import { create } from '@/lib/helpers'
import Head from 'next/head'
import Image from 'next/image'
import logo from '../assets/logo.svg'

/**
 * server side
 * @param {*} context 
 * @returns 
 */
export async function getServerSideProps(context) {
  // first create
  const partnerResponse = await createPartner()
  // 
  const partnersResponse = await readPartner()

  if (!partnerResponse) {
    return {
      notFound: true,
    }
  }

  // serialized as JSON
  const partnerJSON = JSON.parse(JSON.stringify(partnerResponse))
  const partnersJSON = JSON.parse(JSON.stringify(partnersResponse))

  return {
    props: { partnerJSON, partnersJSON }, // will be passed to the page component as props
  }

}

export default function Home({ partnerJSON, partnersJSON }) {

  var partner1 = partnerJSON
  var partner2 = { _id: null, calendar: null }
  const partners = partnersJSON

  return (
    <>
      <Head>
        <title>Talk</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container'>
        <header className='d-flex justify-content-center py-3'>
          <figure>
            <Image src={logo} width='32' height='32' alt='talk'></Image>
            <button type="button" className='position-relative'>
              Talkers
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                {partners.length}+
                <span className='visually-hidden'>unread messages</span>
              </span>
            </button>
          </figure>
        </header>
        <section>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{partner1._id}t</h5>
                  <p className='card-text'>{new Date(partner1.calendar).toLocaleString()}</p>
                  <a href="#" className='btn btn-success'>I am ready</a>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='card' style={{ display: partner2._id ? "block" : "none" }}>
                <div className='card-body'>
                  <h5 className='card-title'>{partner2._id}</h5>
                  <p className='card-text'>{new Date(partner2.calendar).toLocaleString()}</p>
                  <a href="#" className='btn btn-success'>Partner are ready</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
