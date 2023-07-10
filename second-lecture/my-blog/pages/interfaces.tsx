export interface Post {
  id: string
  title: string
  date: string
  description: string
}

export interface HomePageProps {
  posts: Post[]
}

export interface DetailPageProps {
  post: Post
}
