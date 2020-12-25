import React from 'react';


const Footer = () => {
    return (
        <footer className="footer d-flex justify-content-between">
            <div>
                © smdurjoy all rights reserved. Designed and Developed by {' '}
                <a rel="noopener noreferrer" target="_blank" href="https://smdurjoy.com">smdurjoy</a>.
            </div>
            <div>
                <a className="ml-2" rel="noopener noreferrer" target="_blank" href="https://smdurjoy.com">Privacy</a> {' - '}
                <a rel="noopener noreferrer" target="_blank" href="https://smdurjoy.com">Terms</a>
            </div>
        </footer>   
    );
}   
export default Footer;
