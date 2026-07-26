import { useEffect, useRef } from "react";

export default function useDropdown(name, open, setOpenDropdown) {
    const dropdownRef = useRef(null);

    function toggleDropdown() {
        setOpenDropdown(open ? null : name);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        }

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [setOpenDropdown]);

    return { dropdownRef, toggleDropdown };
}