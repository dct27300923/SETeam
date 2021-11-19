/** @jsxImportSource @emotion/react */

import Layout from '../components/Layout'
import Link from 'next/link'
import { css, jsx }from '@emotion/react';

export default function Home() {
  return (
    <Layout>
      <h1 css={css`
        font-size: 10rem;
      `}>inline css using emotion</h1>
      <div className="buttons">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Split Buttons with Icon</h6>
        </div>
        <a href="#" className="btn btn-primary btn-circle">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
      </div>
    </Layout>
  )
}
