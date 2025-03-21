'use client'
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ColorCodeContext } from '@/components/ColorCodeContext';
import dynamic from 'next/dynamic';

// Dynamically import ChromePicker, disabling SSR
const ChromePicker = dynamic(() => import('react-color').then((mod) => mod.ChromePicker), { ssr: false });

export default function ColorPicker() {
    const context = useContext(ColorCodeContext);
    const router = useRouter();
    
    if (!context) {
        throw new Error('ColorPickerLayout must be used within a ColorCodeProvider');
    }

    const { colorCode, setColorCode } = context;

    return (
        <ChromePicker
            className='cursor-pointer'
            color={colorCode}
            onChange={(newColor) => {
                setColorCode(newColor.hex);
                router.prefetch(`/color-picker/${newColor.hex.replace('#', '')}`);
                router.push(`/color-picker/${newColor.hex.replace('#', '')}`);
            }}
        />
    );
}