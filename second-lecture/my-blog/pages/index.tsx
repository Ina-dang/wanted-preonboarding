import * as react from "react"
import { FC } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { GetStaticProps } from "next"
import Link from "next/link"

import { HomePageProps } from "./interfaces"

const HomPage: FC<HomePageProps> = ({ posts }) => {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link href={`/${post.id}`}>
              <a>
                <h2>{post.title}</h2>
              </a>
            </Link>
            <p>{post.date}</p>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const postsDirectory = path.join(process.cwd(), "__posts")
  const filenames = fs.readdirSync(postsDirectory)
  const posts = filenames?.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      id: data.id as string,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
    }
  })

  return {
    props: {
      posts,
    },
  }
}

export default HomPage
