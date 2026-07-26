import { useEffect, useRef } from "react";

const useDropdown = (id, open, setOpenDropdown) => {

    const dropdownRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [open, setOpenDropdown]);


    return {
        dropdownRef
    };
};

export default useDropdown;