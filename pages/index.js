import React, { Component } from 'react'
import Head from 'next/head'
// import Dashboard from '../components/Dashboard'
import { ZeitCard } from '../components/ZeitCard'
import * as ROUTES from '../constants/routes'

class App extends Component {
  render() {
    return (
      <div title="TPOT Toolbox" className="container">
        <Head>
          <title>TPOT ToolBox</title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <main>

          <h1 className="title">
            Welcome to <a href="https://tpot.netlify.app">TPOT Toolbox!</a>
          </h1>

          <p className="description">
            Get started by Checking out a Document!
          </p>

          <CardLayout />
        </main>

        <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }      
        
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        `}
        </style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}
        </style>

      </div>
    )
  }
}

const CardLayout = () => {

  return (
    <div className="grid">

      <ZeitCard
        url={ROUTES.SCRIBE}
        title="Scribe"
        text='Click here use the Letter Editor!'
      />
      <ZeitCard
        url={ROUTES.TPOT}
        title="TPOT"
        text='The Path of Truth'
      />


    </div>


  )
}


export default App

