import React, { ReactNode } from 'react';

declare const sizeClasses$6: {
    readonly xs: "px-2 py-0.5 text-xs";
    readonly s: "px-3 py-1 text-sm";
    readonly m: "px-4 py-1.5 text-base";
    readonly l: "px-5 py-2 text-lg";
    readonly xl: "px-6 py-2.5 text-xl";
};
declare const colorClasses$6: {
    readonly primary: "bg-primary border-primary hover:bg-primary/50 text-white";
    readonly secondary: "bg-secondary border-secondary hover:bg-secondary-600 text-white";
    readonly success: "bg-success border-success hover:bg-success-600 text-white";
    readonly warning: "bg-warning border-warning hover:bg-warning-600 text-white";
    readonly error: "bg-error border-error hover:bg-error-600 text-white";
    readonly ghost: "bg-ghost border-ghost hover:bg-gray-100 text-gray-800 dark:text-gray-100 dark:hover:bg-gray-800/50";
};
declare const clickEffects: {
    readonly ripple: "overflow-hidden relative";
    readonly push: "transform active:scale-90 transition-transform";
    readonly none: "";
};
type ButtonSize = keyof typeof sizeClasses$6;
type ButtonColor = keyof typeof colorClasses$6;
type ButtonClickEffect = keyof typeof clickEffects;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    color?: ButtonColor;
    clickEffect?: ButtonClickEffect;
    isLoading?: boolean;
    className?: string;
}

declare const Button: React.FC<ButtonProps>;

declare const sizeClasses$5: {
    readonly xs: "p-0.5 text-xs";
    readonly s: "p-1 text-sm";
    readonly m: "p-1.5 text-base";
    readonly l: "p-2 text-lg";
    readonly xl: "p-3 text-xl";
};
declare const colorClasses$5: {
    readonly primary: "border-primary outline-primary accent-primary";
    readonly secondary: "border-secondary outline-secondary accent-secondary";
    readonly success: "border-success outline-success accent-success";
    readonly warning: "border-warning outline-warning accent-warning";
    readonly error: "border-error outline-error accent-error";
    readonly ghost: "border-ghost focus:border-base-300 outline-none";
};
type RadioSize$1 = keyof typeof sizeClasses$5;
type RadioColor$1 = keyof typeof colorClasses$5;
interface RadioProps$1 extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    checked?: boolean;
    size?: RadioSize$1;
    color?: RadioColor$1;
    label?: string;
    wrapperClass?: string;
    sx?: React.CSSProperties;
    isButton?: boolean;
}
declare const Radio: React.FC<RadioProps$1>;

declare const colorClasses$4: {
    readonly primary: "border-primary outline-primary accent-primary";
    readonly secondary: "border-secondary outline-secondary accent-secondary";
    readonly success: "border-success outline-success accent-success";
    readonly warning: "border-warning outline-warning accent-warning";
    readonly error: "border-error outline-error accent-error";
    readonly ghost: "border-ghost focus:border-base-300 outline-none";
};
declare const sizeClasses$4: {
    readonly xs: "h-3 w-3";
    readonly s: "h-4 w-4";
    readonly m: "h-5 w-5";
    readonly l: "h-6 w-6";
    readonly xl: "h-7 w-7";
};
type CheckboxSize = keyof typeof sizeClasses$4;
type CheckboxColor = keyof typeof colorClasses$4;
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    checked?: boolean;
    size?: CheckboxSize;
    color?: CheckboxColor;
    label?: string;
    wrapperClass?: string;
    sx?: React.CSSProperties;
}

declare const Checkbox: React.FC<CheckboxProps>;

declare const sizeClasses$3: {
    readonly xs: "p-0.5 text-xs";
    readonly s: "p-1 text-sm";
    readonly m: "p-1.5 text-base";
    readonly l: "p-2 text-lg";
    readonly xl: "p-3 text-xl";
};
declare const colorClasses$3: {
    readonly primary: "border-primary outline-primary";
    readonly secondary: "border-secondary outline-secondary";
    readonly success: "border-success outline-success";
    readonly warning: "border-warning outline-warning";
    readonly error: "border-error outline-error";
    readonly ghost: "border-ghost focus:border-base-300 outline-none";
};
type InputSize = keyof typeof sizeClasses$3;
type InputColor = keyof typeof colorClasses$3;
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    size?: InputSize;
    color?: InputColor;
    wrapperClass?: string;
    labelClass?: string;
    labelTextClass?: string;
    sx?: React.CSSProperties;
}

declare const Input: React.FC<InputProps>;

declare const sizeClasses$2: {
    readonly xs: "p-0.5 text-xs";
    readonly s: "p-1 text-sm";
    readonly m: "p-1.5 text-base";
    readonly l: "p-2 text-lg";
    readonly xl: "p-3 text-xl";
};
declare const colorClasses$2: {
    readonly primary: "border-primary outline-primary";
    readonly secondary: "border-secondary outline-secondary";
    readonly success: "border-success outline-success";
    readonly warning: "border-warning outline-warning";
    readonly error: "border-error outline-error";
    readonly ghost: "border-ghost focus:border-base-300 outline-none";
};
type TextareaSize = keyof typeof sizeClasses$2;
type TextareaColor = keyof typeof colorClasses$2;
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    label?: string;
    size?: TextareaSize;
    color?: TextareaColor;
    required?: boolean;
    wrapperClass?: string;
    labelClass?: string;
    labelTextClass?: string;
    sx?: React.CSSProperties;
}

declare const Textarea: React.FC<TextareaProps>;

declare const sizeClasses$1: {
    readonly xs: "text-xs";
    readonly s: "text-sm";
    readonly m: "text-base";
    readonly l: "text-lg";
    readonly xl: "text-xl";
};
declare const colorClasses$1: {
    readonly primary: "border-primary focus:border-primary";
    readonly secondary: "border-secondary focus:border-secondary";
    readonly success: "border-success focus:border-success";
    readonly warning: "border-warning focus:border-warning";
    readonly error: "border-error focus:border-error";
    readonly ghost: "border-ghost focus:border-base-300";
};
type SelectSize = keyof typeof sizeClasses$1;
type SelectColor = keyof typeof colorClasses$1;
interface Option {
    value: string | number;
    label: string;
}
interface SelectProps {
    options: Option[];
    placeholder?: string;
    multiple?: boolean;
    onChange?: (selectedOption: Option | Option[]) => void;
    label?: string;
    size?: SelectSize;
    color?: SelectColor;
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

interface Column {
    key: string;
    header: string;
    dataType?: 'string' | 'int' | 'float' | 'date' | 'datetime' | 'currency';
    sum?: boolean;
}
interface TableConfig {
    data: Record<string, any>[];
    columns: Column[];
}
type TableSize = 'xs' | 's' | 'm' | 'l' | 'xl';
interface TableProps {
    tableConfig: TableConfig;
    isSerialized?: boolean;
    size?: TableSize;
    header?: boolean;
    title?: string;
    printSize?: string;
    sum?: boolean;
}
interface SortConfig {
    key: string | null;
    direction: 'asc' | 'desc' | null;
}

declare const Table: React.FC<TableProps>;

interface DataItem {
    [key: string]: any;
}
interface PivotTableProps {
    initialData: DataItem[];
}

declare const PivotTable: React.FC<PivotTableProps>;

interface ThemeProviderProps {
    children: ReactNode;
}
declare const ThemeProvider: React.FC<ThemeProviderProps>;

declare const sizeClasses: {
    readonly xs: "p-0.5 text-xs";
    readonly s: "p-1 text-sm";
    readonly m: "p-1.5 text-base";
    readonly l: "p-2 text-lg";
    readonly xl: "p-3 text-xl";
};
declare const colorClasses: {
    readonly primary: "border-primary outline-primary accent-primary";
    readonly secondary: "border-secondary outline-secondary accent-secondary";
    readonly success: "border-success outline-success accent-success";
    readonly warning: "border-warning outline-warning accent-warning";
    readonly error: "border-error outline-error accent-error";
    readonly ghost: "border-ghost focus:border-base-300 outline-none";
};
type RadioSize = keyof typeof sizeClasses;
type RadioColor = keyof typeof colorClasses;
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    checked?: boolean;
    size?: RadioSize;
    color?: RadioColor;
    label?: string;
    wrapperClass?: string;
    sx?: React.CSSProperties;
    isButton?: boolean;
}

export { Button, type ButtonClickEffect, type ButtonColor, type ButtonProps, type ButtonSize, Checkbox, type CheckboxColor, type CheckboxProps, type CheckboxSize, type Column, type DataItem, Input, type InputColor, type InputProps, type InputSize, type Option, PivotTable, type PivotTableProps, Radio, type RadioColor, type RadioProps, type RadioSize, Select, type SelectColor, type SelectProps, type SelectSize, type SortConfig, Table, type TableConfig, type TableProps, type TableSize, Textarea, type TextareaColor, type TextareaProps, type TextareaSize, ThemeProvider };
