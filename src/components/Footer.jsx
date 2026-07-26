import React from 'react'
import { FaGithub } from "react-icons/fa";
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {

    const t = useTranslation();

    return (
        <footer className="footer">
            <p>
                © {new Date().getFullYear()} {t.allRights}
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
                {t.builtWith}
            </p>
        </footer>
    )
}

export default Footer