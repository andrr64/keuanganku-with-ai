import { useState, useCallback } from "react";

export function useModalState(defaultOpen: boolean = false) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return { isOpen, open, close };
}
