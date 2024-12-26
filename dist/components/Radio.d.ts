import * as React from 'react';
interface SizeClasses {
    [key: string]: string;
}
interface ColorClasses {
    [key: string]: string;
}
interface RadioProps {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    size?: keyof SizeClasses;
    color?: keyof ColorClasses;
    label?: string;
    className?: string;
    wrapperClass?: string;
    sx?: React.CSSProperties;
    isButton?: boolean;
    [key: string]: any;
}
declare const Radio: React.FC<RadioProps>;
export default Radio;
