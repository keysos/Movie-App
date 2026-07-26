import React, { useState, useEffect, useRef } from "react";

import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import useDropdown from "../hooks/useDropdown";
import { FaGlobe } from "react-icons/fa";

const LanguageDropdown = ({ open, setOpenDropdown }) => {

    const { setLanguage, language } = useLanguage();

    const t = useTranslation();

    const { dropdownRef } = useDropdown(
        "language",
        open,
        setOpenDropdown
    );

    const languages = [
        { code: "pt-BR", label: t.portuguese },
        { code: "en-US", label: t.english },
        { code: "fr-FR", label: t.french },
        { code: "es-ES", label: t.spanish },
    ];

    return (
        <div className="settings">

            <button
                className="settings-button"
                onClick={() =>
                    setOpenDropdown(
                        open ? null : "language"
                    )
                }
            >
                <FaGlobe />
            </button>


            {open && (

                <div className="language-menu" ref={dropdownRef}>

                    {
                        languages.map((item) => (
                            <button
                                key={item.code}
                                className={item.code === language ? "active" : ""}
                                onClick={() => setLanguage(item.code)}>

                                <span>{item.label}</span>
                                {language === item.code && <span>✓</span>}
                            </button>
                        ))
                    }
                </div>

            )}

        </div>
    )
}

export default LanguageDropdown;