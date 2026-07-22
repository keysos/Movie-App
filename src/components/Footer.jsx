import React from 'react'
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <p>
                © {new Date().getFullYear()} Movie App. All rights reserved.
            </p>

            <a
                href="https://github.com/keysos"
                target='_blank'
                rel='noopener noreferrer'
                className='github-link'
            >
                <FaGithub />
                <span className="github-text">Github</span>
            </a>

            <p>
                Built with React + TMDB API
            </p>
        </footer>
    )
}

export default Footer