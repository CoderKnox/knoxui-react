import * as React from 'react';
interface SizeClasses {
    [key: string]: string;
}
interface ColorClasses {
    [key: string]: string;
}
interface InputProps {
    label?: string;
    size?: keyof SizeClasses;
    color?: keyof ColorClasses;
    type?: string;
    required?: boolean;
    className?: string;
    wrapperClass?: string;
    labelClass?: string;
    labelTextClass?: string;
    sx?: React.CSSProperties;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}
declare const Input: React.FC<InputProps>;
export default Input;
