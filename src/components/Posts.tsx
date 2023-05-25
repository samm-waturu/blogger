import React from 'react'
import {Merriweather} from 'next/font/google'
import {Posts} from "../../typings";
import Link from "next/link";

const merri = Merriweather({
    weight: ['300'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',

})

function Posts({ id, link, title, created }: Posts) {

    return (

        <Link href={`/post/${link}`} key={id} style={{textDecoration: 'none'}}>
        <>
            <div className={merri.className}>

                    <div className="col-xs-12 col-sm-12 col-lg-12 post-line">
                       <span className="post-titles">
                           <h1>{title}.</h1>
                       </span>
                        <time className="dates"><br/>{new Date(created).toLocaleDateString()}</time>
                    </div>

                    {/*Pagination*/}


            </div>
        </>
        </Link>
    )
}

export default Posts
