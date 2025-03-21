'use client'
import { createContext, useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

type Color = string;

interface ColorCodeContextType {
    colorCode: Color | undefined;
    setColorCode: (colorCode: string) => void;
}

export const ColorCodeContext = createContext<ColorCodeContextType | undefined>(undefined);

interface ColorCodeProviderProps {
    children: React.ReactNode;
}

export function ColorCodeProvider({ children }: ColorCodeProviderProps) {
    const [colorCode, setColorCode] = useState<Color | undefined>('#ff0000');
    const pathname = usePathname();

    useEffect(() => {
        // Extract the color code from the pathname (e.g., '000000' from '/color-picker/000000')
        const pathParts = pathname.split('/');
        const colorFromUrl = pathParts[pathParts.length - 1];
        
        // Only update if the color from the URL is valid and different from the current colorCode
        if (colorFromUrl && /^[0-9a-fA-F]{6}$/.test(colorFromUrl) && colorFromUrl !== colorCode?.replace('#', '')) {
            setColorCode(`#${colorFromUrl}`);
        }
    }, [pathname, colorCode]); // Depend on pathname and colorCode

    return (
        <ColorCodeContext.Provider value={{ colorCode, setColorCode }}>
            {children}
        </ColorCodeContext.Provider>
    );
}