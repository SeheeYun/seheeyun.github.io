import React from "react"
import kebabCase from "lodash/kebabCase"
import * as styles from "./tag.module.css"

import { Link } from "gatsby"

const Tag = ({ tag }) =>
  tag && (
    <li className={styles.li}>
      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
    </li>
  )

export default Tag
