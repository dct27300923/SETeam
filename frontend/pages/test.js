/** @jsxImportSource @emotion/react */

import Layout from '../components/Layout'
import Link from 'next/link'
import { css, jsx }from '@emotion/react';

export default function Home() {
  return (
    <Layout>
      <a href="#" download="example.mp4">download</a>
    </Layout>
  )
}
