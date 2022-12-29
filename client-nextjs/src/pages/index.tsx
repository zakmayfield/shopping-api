
import { Inter } from '@next/font/google'
import styles from '../../styles/Home.module.css'

import client from '../../apollo-client'
import {gql} from '@apollo/client'

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Members {
        members {
          id
          email
        }
      }
    `
  })
}

export default function Home() {
  return (
    <>
    </>
  )
}
