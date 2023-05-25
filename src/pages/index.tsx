import Head from 'next/head'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Posts from "@/components/Posts";
import {Post} from "../../typings";
import {GetServerSideProps} from "next";
import {GroQL} from "../../sanity.config"


interface Props {
    posts: [Post] //post=[];
}


export default function Home({posts}: Props) {
    console.log(posts)
    const noDate = new Date().toLocaleDateString()

    // @ts-ignore
    return (
        <>
            <Head>
                <title>read.</title>
                <meta name="description" content="Blog page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <>
                {/*Header*/}
                <Header/>
                {/*Slug section*/}

                <>
                    <section className="post-list row">
                        {posts ? posts.map((post) => (
                            <Posts id={post._id} key={post._id} link={post.slug.current} title={post.title}
                                   created={post._createdAt}/>
                        )) : (<Posts id={'#'} key={'#'} link={'/'} title={'No reads available'} created={noDate}/>)
                        }
                    </section>

                </>
                {/* Footer section*/}
                <Footer/>

            </>
        </>
    )
}


export const getServerSideProps = async () => {

    //GroQL query language

    const query = `*[_type == 'post'] {
    _id,
      title,
      slug,
      description,
      _createdAt
}`
    const posts = await GroQL.fetch(query)

    return {
        props: {
            posts
        }
    }

}
