import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import moment from 'moment'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButton'
import { selectPostById } from './postsSlice'

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params

    const post = useSelector(state => selectPostById(state, postId))

    const date = moment(post.date).format('MMMM Do YYYY, h:mm:ss a')

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p>{date} &nbsp;(<TimeAgo timestamp={post.date} />)</p>
                <PostAuthor userId={post.user} />
                <p className="post-content">{post.content}</p>
                <ReactionButtons post={post} />
                <br />
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            </article>
        </section>
    )
}