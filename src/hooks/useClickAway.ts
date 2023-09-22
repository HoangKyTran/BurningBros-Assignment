import React, { useEffect, useRef } from 'react';

export const useClickAway = (callback: () => void): React.RefObject<HTMLDivElement> => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickAway = (event: MouseEvent) => {
            console.log("🚀:", { target: event.target, ref: ref?.current, bool: ref?.current?.contains(event.target as Node) });
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickAway);

        return () => {
            document.removeEventListener('mousedown', handleClickAway);
        };
    }, [callback]);

    return ref;
};