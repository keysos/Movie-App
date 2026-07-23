import { useEffect } from "react";

export function useDocumentTitle(title) {

  // useEffect to update the document title whenever the title prop changes
  useEffect(() => {
    document.title = title;
  }, [title]);
}