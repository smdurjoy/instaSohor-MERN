import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/Footer/Footer';

const Fulllayout = (props) => {
    const [width, setWidth] = useState(window.innerWidth);

    /*--------------------------------------------------------------------------------*/
    /*Function that handles sidebar, changes when resizing App                        */
    /*--------------------------------------------------------------------------------*/
    useEffect(() => {
        const updateDimensions = () => {
            let element = document.getElementById('main-wrapper');
            setWidth(window.innerWidth)
            if (width < 1170) {
                element.setAttribute("data-sidebartype", "mini-sidebar");
                element.classList.add("mini-sidebar");
            } else {
                element.setAttribute("data-sidebartype", "full");
                element.classList.remove("mini-sidebar");
            }
        }
        if (document.readyState === "complete") {
            updateDimensions();
        }
        window.addEventListener("resize", updateDimensions.bind(this));
        window.addEventListener("load", updateDimensions.bind(this));
        return () => {
            window.removeEventListener("load", updateDimensions.bind(this));
            window.removeEventListener("resize", updateDimensions.bind(this));
        };
    }, [width]);

    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    return (
        <div
            id="main-wrapper"
            data-theme="light"
            data-layout="vertical"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
            data-boxed-layout="full"
        >
            {/* Header ---------------------------------------------------------- */}
            <Header />

            {/* Sidebar ---------------------------------------------------------- */}
            <Sidebar />
   
            {/* Page Main-Content ---------------------------------------------------------- */}
            <div className="page-wrapper d-block">
                <div className="page-content container-fluid">
                    {/* Childrens ---------------------------------------------------------- */}
                    {props.children}
                </div>

                {/* Footer ---------------------------------------------------------- */}
                <Footer />
            </div>
        </div>
    );
}
export default Fulllayout;
