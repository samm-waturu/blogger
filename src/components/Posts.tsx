import React from 'react'
import {Radley} from 'next/font/google'
import {Posts} from "../../typings";
import Link from "next/link";

const rad = Radley({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',

})

function Posts({ id, link, title, created }: Posts) {

    return (

        <Link href={`/post/${link}`} key={id} style={{textDecoration: 'none'}}>
        <>
            <div className={rad.className}>

                    <div className="col-xs-12 col-sm-12 col-lg-12 post-line">
                       <span className="post-titles">
                           <h1>{title}</h1>
                       </span>
                        <time className="dates"><br/>{new Date(created).toDateString()}</time>
                    </div>

                    {/*Pagination*/}


            </div>
        </>
        </Link>
    )
}

export default Posts
