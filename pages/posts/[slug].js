import React from 'react'
import { getAllPosts, getPostBySlug } from '../api/api';
import markdownToHtml from '../api/markdownToHTML';

const Post = ({ post }) => {
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.author.name}</p>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}

export default Post;

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
