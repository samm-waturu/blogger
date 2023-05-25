import {Post, slugPost} from '../../../typings'
import Header from '@/components/Header'
import {notFound} from 'next/navigation'
import {GetStaticPaths, GetStaticProps} from 'next'
import {GroQL, urlFor} from '../../../sanity.config'
import {PortableTextComponents} from '@portabletext/react'
import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import placeHolder from '../../img/post-image.png'
import authorPlaceHolder from '../../img/author-avatar.png'
import {JSXElementConstructor, Key, ReactElement, ReactFragment, ReactNode, ReactPortal, useState} from 'react'
import {Radley} from "next/font/google";
import Footer_main from "@/components/Footer_main";

const rad = Radley({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',

})

function PostedContent({post}: slugPost) {

    const components: PortableTextComponents = {
        marks: {
            // Ex. 1: custom renderer for the em / italics decorator
            em: ({children}) => <em>{children}</em>,
            strong: ({children}) => <strong>{children}</strong>,
            link: ({children, value}) => {
                const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                return (
                    <a href={value.href} style={{textDecoration: 'none'}}>
                        {children}
                    </a>
                )
            }
            // Ex. 2: rendering a custom `link` annotation
        },
        types: {
            image: ({value}) => {
                value = value.asset
                return (

                    <h3 id={'whataboutimages'}>
                        {/*<Image src={urlFor(value).url()} alt={post.description} width={600} height={320}/>*/}
                    </h3>

                )
            }
        },
        block: {
            h1: ({children}) => <h1>{children}</h1>,
            h2: ({children}) => <h2>{children}</h2>,
            h3: ({children}) => <h3>{children}</h3>,
            h4: ({children}) => <h4>{children}</h4>,
            normal: ({children}) => <p>{children}</p>
        },
        list: {
            // Ex. 1: customizing common list types
            bullet: ({children}) => <ul>{children}</ul>
        },
        listItem: {
            bullet: ({children}) => <li style={{marginBottom: 6}}>{children}</li>,
            number: ({children}) => <ol>{children}</ol>
        }

    }

    return (

        <div className={rad.className}>


            <section className="post-list post-content">

                <div className="post-data">

                    {/*<img src="post.html"></img>*/}

                        {/*<Image className={'images'} src={post.mainImage ? urlFor(post.mainImage).url() : placeHolder } width={600} height={250} alt={post.description}/>*/}

                    <h1 className="post-page-title">{post.title}</h1>

                    <p className="post-meta-data">{new Date(post._createdAt).toDateString()}</p>

                    <PortableText value={post.body} components={components} onMissingComponent={false} />

                </div>

                <div className="author-box">
                    <Image className={'author-box'} src={urlFor(post.author.image).url()} alt={post.author.name} width={50} height={50} />
                    <p>
                        {post.author.name}
                    </p>
                </div>

                {/*
                    <div className="row">
                    <div className="col-md-6 paddd">
                        <p><b>Prev</b>&nbsp;
                            <a href="#">Beautiful</a></p>
                    </div>
                    <div className="col-md-6 paddd righted">

                        <p>
                            <a href="#">Webpage</a>&nbsp;<b>Next</b></p>
                    </div>
                </div>
                */}



            </section>

            <Footer_main/>
        </div>

    )
}

export default PostedContent

export const getStaticPaths: GetStaticPaths = async () => {
    const query = ` *[_type == 'post'] {
  _id,
    slug {
      current
    }
  }`
    const posts = await GroQL.fetch(query)

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))
    // We'll pre-render only these paths at build time.
    //{fallback: false } means other routes should 404.
    //{fallback: true} means dynamism is at core
    return {paths, fallback: true}

}

export const getStaticProps: GetStaticProps = async (
    {params}
) => {

    const query = `
  *[_type == 'post' && slug.current == $slug] [0] {
  _id, _createdAt, title, mainImage, body, author -> {name,image}, slug, description,
  'comments': *[ _type == 'comment' && post._ref == ^._id && approved == true], author -> {
        name,image},
}`

    const post = await GroQL.fetch(query, {
        slug: params?.slug
    })
    if (!post) {
        return (notFound())
    }
    return {
        props: {
            post
        },
        revalidate: 25 //re-cache the page ISR
    }


}




