import React from "react"
import kebabCase from "lodash/kebabCase"

import { Link } from "gatsby"

const Tag = ({ tag }) =>
  tag && (
    <li
      style={{
        borderRadius: `4px`,
        border: `1px solid grey`,
        padding: `2px 6px`,
        marginRight: `5px`,
        fontSize: `80%`,
        backgroundColor: "#007acc",
        color: "white",
        listStyle: "none",
      }}
    >
      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
    </li>
  )

export default Tag
