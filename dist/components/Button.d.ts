import * as React from 'react';
interface SizeClasses {
    [key: string]: string;
}
interface ColorClasses {
    [key: string]: string;
}
interface ClickEffects {
    [key: string]: string;
}
interface ButtonProps {
    children: React.ReactNode;
    size?: keyof SizeClasses;
    color?: keyof ColorClasses;
    clickEffect?: keyof ClickEffects;
    isLoading?: boolean;
    className?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    [key: string]: any;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
