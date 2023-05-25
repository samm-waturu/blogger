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
import {Merriweather} from "next/font/google";
import Footer from "@/components/Footer";

const merri = Merriweather({
    weight: ['300'],
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
                    <p>
                        <Image src={urlFor(value).url()} alt={post.description} width={600} height={250} />
                    </p>
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
            bullet: ({children}) => <li>{children}</li>,
            number: ({children}) => <ol>{children}</ol>
        }

    }

    /*
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(() => {
        // console.log(data)
        setSumbitted({current: true})
      }).catch((err) => {
        // console.log(`err`)
        setSumbitted({current: false})

      })
    }
     */
    return (

        <>

            <div className={merri.className}>

                <section className="post-list post-content">

                    <div className="post-data">

                        {/*Starting image*/}

                        <div className={'headImg'}>
                            <Image src={post.mainImage ? urlFor(post.mainImage).url() : placeHolder } alt={post.description}/>
                        </div>

                        <h1 className="post-page-title">{post.title}</h1>

                        <p className="post-meta-data">{new Date(post._createdAt).toLocaleDateString()}</p>

                        <PortableText value={post.body} components={components} onMissingComponent={false} />

                    </div>

                    <div className="author-box">
                        <Image className={'author-img'} src={post.author.image ? urlFor(post.author.image).url() : authorPlaceHolder } alt={post.author.name} />
                    </div>

                    <div className="row">
                        <div className="col-md-6 padded">
                            <p><b>Prev</b>&nbsp;
                                <a href="#">Beautiful</a></p>
                        </div>
                        <div className="col-md-6 padded righted">

                            <p>
                                <a href="#">Webpage</a>&nbsp;<b>Next</b></p>
                        </div>
                    </div>

                </section>

            </div>

            <Footer/>
        </>

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




