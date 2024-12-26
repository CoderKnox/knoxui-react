import * as React from 'react';
interface Option {
    value: string;
    label: string;
}
interface SizeClasses {
    [key: string]: string;
}
interface ColorClasses {
    [key: string]: string;
}
interface SelectProps {
    options?: Option[];
    placeholder?: string;
    multiple?: boolean;
    onChange?: (selectedOptions: Option | Option[]) => void;
    label?: string;
    size?: keyof SizeClasses;
    color?: keyof ColorClasses;
    required?: boolean;
    className?: string;
    wrapperClass?: string;
    labelClass?: string;
    labelTextClass?: string;
    sx?: React.CSSProperties;
    renderOption?: (option: Option) => React.ReactNode;
    hideSearch?: boolean;
}
declare const Select: React.FC<SelectProps>;
export default Select;
