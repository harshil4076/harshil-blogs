import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <section className={utilStyles.introSection}>
        {/* //add intro text */}
        <p>
          Welcome to my portfolio website! I am a skilled developer specializing
          in React, TypeScript, TailwindCss, GraphQL, and Node.js. With years of
          experience under my belt, I have honed my skills in creating
          innovative and cutting-edge solutions for clients.
        </p>
        <p>
          I have worked on a wide range of projects, from small-scale web
          applications to complex enterprise systems. My expertise in front-end
          development, coupled with my proficiency in back-end technologies,
          allows me to provide end-to-end solutions that are scalable,
          efficient, and secure.
        </p>
      </section>
      {/* Add section to display a horizontal list of tech stack  */}
      {/* Add logo to each item in the list */}
      <section>
        <h2>Some of the technologies that I have worked with.</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.techListItem}>
            <img
              src="/images/react.png"
              alt="React Logo"
              className={utilStyles.logo}
            />
            React
          </li>
          <li className={utilStyles.techListItem}>
            Remix
            <img
              src="/images/remix.png"
              alt="Remix Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Nextjs
            <img
              src="/images/nextjs.png"
              alt="Nextjs Logo"
              className={utilStyles.logo}
            />
          </li>

          <li className={utilStyles.techListItem}>
            TypeScript
            <img
              src="/images/typescript.png"
              alt="TypeScript Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            GraphQL
            <img
              src="/images/graphql.png"
              alt="GraphQL Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Apollo
            <img
              src="/images/apollo.png"
              alt="Apollo Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Graphql Yoga
            <img
              src="/images/graphql-yoga.png"
              alt="Graphql Yoga Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Node.js
            <img
              src="/images/nodejs.png"
              alt="Nodejs Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            MongoDB
            <img
              src="/images/mongodb.png"
              alt="MongoDB Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            PostgreSQL
            <img
              src="/images/postgresql.png"
              alt="PostgreSQL Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Neo4j
            <img
              src="/images/neo4j.png"
              alt="Neo4j Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            TailwindCSS
            <img
              src="/images/tailwindcss.png"
              alt="TailwindCSS Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Material UI
            <img
              src="/images/mui.png"
              alt="Material UI Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            D3.js
            <img
              src="/images/d3js.png"
              alt="D3js Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            CytoScape.js
            <img
              src="/images/cytoscape.png"
              alt="CytoScapejs Logo"
              className={utilStyles.logo}
            />
          </li>

          <li className={utilStyles.techListItem}>
            AWS
            <img
              src="/images/aws.png"
              alt="AWS Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            GCP
            <img
              src="/images/gcp.png"
              alt="GCP Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Docker
            <img
              src="/images/docker.png"
              alt="Docker Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Kubernetes
            <img
              src="/images/kubernetes.png"
              alt="Kubernetes Logo"
              className={utilStyles.logo}
            />
          </li>
          <li className={utilStyles.techListItem}>
            Helm
            <img
              src="/images/helm.png"
              alt="Helm Logo"
              className={utilStyles.logo}
            />
          </li>
        </ul>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <Link href="/projects/d3-histogram">D3 Histogram</Link>
        {/* TOD0: Add a link to a project blog that explins carstack client */}
      </section>
    </Layout>
  );
}
