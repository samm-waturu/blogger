import React from 'react'

import {Merriweather, Montserrat} from "next/font/google";

const mont = Merriweather({
    weight: ['300'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

function Footer() {
    return (
        <>
            <div className={mont.className}>
                <section className="footer">
                    <div className="footer-inner row">

                        <div className="col-md-12">

                            <p className="description">
                                Blog description goes here.
                            </p>
                        </div>
                        <div className="col-md-12">
                            <span>About</span>&nbsp;&nbsp;
                            <span>Contact</span>&nbsp;&nbsp;
                        </div>
                    </div>
                </section>


            <section style={{fontWeight: '600'}} className="copyright">© {new Date().getFullYear().toString()}</section>
            </div>
        </>

    )
}

export default Footer
