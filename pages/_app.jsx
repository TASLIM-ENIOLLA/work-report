import Head from 'next/head'
import {Fragment} from 'react'

import '../public/css/globals.css'

export default function App({Component, pageProps}){
    return (
        <Fragment>
            <Head>
                <meta name = 'theme-color' content = '#4285f4' />
            </Head>
            <section className = 'container-fluid'>
                <div className = 'row flex-column vh-100 vw-100'>
                    <div className = 'col overflow-y-auto no-scrollbar'>
                        <Component {...pageProps} />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}


function WindowMenuBar(){
    return (
        <div className = 'row justify-content-between align-items-center py-2'>
            <div className = 'col-auto'>
                <div className = 'gd-sage text-dark text-capitalize'>work report</div>
            </div>
            <div className = 'col-auto'>
                <div className = 'row'>
                    <div className = 'col-auto'>
                        <button
                            onClick = {() => minimizeApp()}
                            className = 'outline-0 shadow-0 border-0 bg-clear px-0'>
                            <img width = '10' src = '/images/window/window-minimize.png' />
                        </button>
                    </div>
                    <div className = 'col-auto'>
                        <button
                            onClick = {() => maximizeApp()}
                            className = 'outline-0 shadow-0 border-0 bg-clear px-0'>
                            <img width = '10' src = '/images/window/stop.png' />
                        </button>
                    </div>
                    <div className = 'col-auto'>
                        <button
                            onClick = {() => closeApp()}
                            className = 'outline-0 shadow-0 border-0 bg-clear px-0'>
                            <img width = '10' src = '/images/window/cancel.png' />
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .icon{
                    font-size: 1.3rem;
                }
            `}</style>
        </div>
    )
}
