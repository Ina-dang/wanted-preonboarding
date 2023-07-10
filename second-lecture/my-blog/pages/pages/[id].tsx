import * as react from "react"
import { FC, useEffect } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { GetStaticProps, GetStaticPaths } from "next"
import { remark } from "remark"
import hljs from "highlight.js"
import remarkHtml from "remark-html"

import "highlight.js/styles/github.css"

import { DetailPageProps } from "../interfaces"

const DetailPage: FC<DetailPageProps> = ({ post }) => {
  useEffect(() => {
    hljs.highlightAll()
  }, [])
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <p>{post.description}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "__posts")
  const filenames = fs.readdirSync(postsDirectory)
  const paths = filenames.map((filename) => ({
    params: { id: path.basename(filename, ".md") },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<DetailPageProps> = async ({
  params,
}) => {
  const { id } = params
  const filePath = path.join(process.cwd(), "__posts", `${id}.md`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const processedContent = await remark()?.use(remarkHtml)?.process(content)
  const contentHtml = processedContent?.toString()

  return {
    props: {
      post: {
        id: id as string,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        content: contentHtml ? contentHtml : "가나다",
      },
    },
  }
}
