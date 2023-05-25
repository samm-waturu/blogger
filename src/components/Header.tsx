import React from 'react'
import {Montserrat} from "next/font/google";
const mont = Montserrat({
    weight: ['700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

function Header() {
    return (
        <>
            <div className={mont.className}>
                <header className="header-block row">
                    <div className="blog-title">
                        <h1>read.</h1>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Header
