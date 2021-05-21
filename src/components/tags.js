import React from "react"
import PropTypes from "prop-types"

// Components
import { graphql, useStaticQuery } from "gatsby"
import Tag from "./tag"

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
    <div>
      <ul>
        {group.map(tag => (
          <Tag key={tag.fieldValue} tag={tag.fieldValue} />
        ))}
      </ul>
    </div>
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
