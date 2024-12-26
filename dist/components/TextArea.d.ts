import React from 'react';
interface SizeClasses {
    [key: string]: string;
}
interface ColorClasses {
    [key: string]: string;
}
interface TextAreaProps {
    label?: string;
    size?: keyof SizeClasses;
    color?: keyof ColorClasses;
    required?: boolean;
    className?: string;
    wrapperClass?: string;
    labelClass?: string;
    labelTextClass?: string;
    sx?: React.CSSProperties;
    rows?: number;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    [key: string]: any;
}
declare const TextArea: React.FC<TextAreaProps>;
export default TextArea;
