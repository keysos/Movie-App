import React, { useState } from "react";

import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { FaGlobe } from "react-icons/fa";

const LanguageDropdown = ( { open, setOpenDropdown } ) => {

    const { setLanguage } = useLanguage();

    const t = useTranslation();


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

                <div className="language-menu">

                    <button onClick={() => setLanguage("pt-BR")}>
                        {t.portuguese}
                    </button>

                    <button onClick={() => setLanguage("en-US")}>
                        {t.english}
                    </button>

                    <button onClick={() => setLanguage("fr-FR")}>
                        {t.french}
                    </button>

                    <button onClick={() => setLanguage("es-ES")}>
                        {t.spanish}
                    </button>

                </div>

            )}

        </div>
    )
}

export default LanguageDropdown;