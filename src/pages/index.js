import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const List = styled.ul`
  list-style: none;
  margin: 0
`

const ListItem = styled.li`
  margin: 0;
`

const LINKS = [
  { to: '/explosion-play', title: 'Explosion' },
  { to: '/name-animation', title: 'Name v1' },
  { to: '/name-animation-v2', title: 'Name v2' },
]

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`react`, `developer`, `brooklyn`]} />
    <h1>Hey</h1>
    <List>
      {LINKS.map(({ to, title }) => (
        <ListItem key={title}>
          <Link to={to}>{title}</Link>
        </ListItem>
      ))}
    </List>
  </Layout>
)

export default IndexPage
