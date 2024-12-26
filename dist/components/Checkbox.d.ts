import * as React from 'react';
interface ColorClasses {
    [key: string]: string;
}
interface SizeClasses {
    [key: string]: string;
}
interface CheckboxProps {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    size?: keyof SizeClasses;
    color?: keyof ColorClasses;
    label?: string;
    className?: string;
    wrapperClass?: string;
    sx?: React.CSSProperties;
    [key: string]: any;
}
declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
