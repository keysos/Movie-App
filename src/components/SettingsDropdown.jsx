import React, { useState } from "react";

import { useThemeToggle } from "../context/ThemeToggleContext";
import { useTranslation } from "../hooks/useTranslation";
import { RiSettings4Fill } from "react-icons/ri";

const SettingsDropdown = ({ open, setOpenDropdown }) => {

    const { isDark, toggleTheme } = useThemeToggle();

    const t = useTranslation();

    return (
        <div className="settings">

            <button
                className="settings-button gear"
                onClick={() =>
                    setOpenDropdown(
                        open ? null : "settings"
                    )
                }
            >
                <RiSettings4Fill />
            </button>


            {open && (
                <div className="settings-menu">

                    <div className="settings-item">

                        <label className="custom-checkbox-label">

                            {t.darkMode}

                            <input
                                type="checkbox"
                                className="custom-checkbox"
                                checked={isDark}
                                onChange={toggleTheme}
                            />

                            <span className="checkmark"></span>

                        </label>

                    </div>

                </div>
            )}

        </div>
    )
}

export default SettingsDropdown;