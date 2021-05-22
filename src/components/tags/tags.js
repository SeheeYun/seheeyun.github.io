import React from "react"
import PropTypes from "prop-types"
import * as styles from "./tags.module.css"
import Tag from "../tag/tag"

import { graphql, useStaticQuery } from "gatsby"

const Tags = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  const group = data.allMarkdownRemark?.group

  return (
    <ul className={styles.ul}>
      {group.map(tag => (
        <Tag key={tag.fieldValue} tag={tag.fieldValue} />
      ))}
    </ul>
  )
}

Tags.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
        }).isRequired
      ),
    }),
  }),
}

export default Tags
