import * as React$1 from 'react';
import React__default, { ReactNode } from 'react';

declare const sizeClasses$5: {
    readonly xs: "px-2 py-0.5 text-xs";
    readonly sm: "px-3 py-1 text-sm";
    readonly md: "px-4 py-1.5 text-base";
    readonly lg: "px-5 py-2 text-lg";
    readonly xl: "px-6 py-2.5 text-xl";
};
declare const variantClasses$4: {
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
type ButtonSize = keyof typeof sizeClasses$5;
type ButtonVariant = keyof typeof variantClasses$4;
type ButtonClickEffect = keyof typeof clickEffects;
interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    variant?: ButtonVariant;
    clickEffect?: ButtonClickEffect;
    isLoading?: boolean;
    className?: string;
}

declare const Button: React__default.FC<ButtonProps>;

declare const sizeClasses$4: {
    readonly xs: "p-0.5 text-xs";
    readonly sm: "p-1 text-sm";
    readonly md: "p-1.5 pl-2 text-base";
    readonly lg: "p-2 pl-2.5 text-lg";
    readonly xl: "p-3 pl-4 text-xl";
};
declare const variantClasses$3: {
    readonly primary: "border-primary outline-primary accent-primary";
    readonly secondary: "border-secondary outline-secondary accent-secondary";
    readonly success: "border-success outline-success accent-success";
    readonly warning: "border-warning outline-warning accent-warning";
    readonly error: "border-error outline-error accent-error";
    readonly ghost: "focus:outline-none";
};
type RadioSize = keyof typeof sizeClasses$4;
type RadioVariant = keyof typeof variantClasses$3;
interface RadioProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, "size"> {
    checked?: boolean;
    size?: RadioSize;
    variant?: RadioVariant;
    label?: string;
    wrapperClass?: string;
    sx?: React__default.CSSProperties;
    isButton?: boolean;
}

declare const Radio: React__default.FC<RadioProps>;

declare const colorClasses: {
    readonly primary: "border-primary outline-primary accent-primary";
    readonly secondary: "border-secondary outline-secondary accent-secondary";
    readonly success: "border-success outline-success accent-success";
    readonly warning: "border-warning outline-warning accent-warning";
    readonly error: "border-error outline-error accent-error";
    readonly ghost: "border-ghost focus:border-base-300 outline-none";
};
declare const sizeClasses$3: {
    readonly xs: "h-3 w-3 text-xs";
    readonly sm: "h-4 w-4 text-sm";
    readonly md: "h-5 w-5 text-base";
    readonly lg: "h-6 w-6 text-lg";
    readonly xl: "h-7 w-7 text-xl";
};
type CheckboxSize = keyof typeof sizeClasses$3;
type CheckboxVariant = keyof typeof colorClasses;
interface CheckboxProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, "size"> {
    checked?: boolean;
    size?: CheckboxSize;
    variant?: CheckboxVariant;
    label?: string;
    wrapperClass?: string;
    sx?: React__default.CSSProperties;
}

declare const Checkbox: React__default.FC<CheckboxProps>;

declare const sizeClasses$2: {
    readonly xs: "p-0.5 text-xs";
    readonly sm: "p-1 text-sm";
    readonly md: "p-1.5 text-base";
    readonly lg: "p-2 text-lg";
    readonly xl: "p-3 text-xl";
};
declare const variantClasses$2: {
    readonly primary: "border-primary outline-primary";
    readonly secondary: "border-secondary outline-secondary";
    readonly success: "border-success outline-success";
    readonly warning: "border-warning outline-warning";
    readonly error: "border-error outline-error";
    readonly ghost: "border-ghost focus:border-base-300 outline-none";
};
type InputSize = keyof typeof sizeClasses$2;
type InputVariant = keyof typeof variantClasses$2;
interface InputProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    size?: InputSize;
    variant?: InputVariant;
    wrapperClass?: string;
    labelClass?: string;
    labelTextClass?: string;
    sx?: React__default.CSSProperties;
}

declare const Input: React__default.FC<InputProps>;

declare const sizeClasses$1: {
    readonly xs: "p-0.5 text-xs";
    readonly sm: "p-1 text-sm";
    readonly md: "p-1.5 text-base";
    readonly lg: "p-2 text-lg";
    readonly xl: "p-3 text-xl";
};
declare const variantClasses$1: {
    readonly primary: "border-primary outline-primary";
    readonly secondary: "border-secondary outline-secondary";
    readonly success: "border-success outline-success";
    readonly warning: "border-warning outline-warning";
    readonly error: "border-error outline-error";
    readonly ghost: "border-ghost focus:border-base-300 outline-none";
};
type TextareaSize = keyof typeof sizeClasses$1;
type TextareaVariant = keyof typeof variantClasses$1;
interface TextareaProps extends Omit<React__default.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
    label?: string;
    size?: TextareaSize;
    variant?: TextareaVariant;
    required?: boolean;
    wrapperClass?: string;
    labelClass?: string;
    labelTextClass?: string;
    sx?: React__default.CSSProperties;
}

declare const Textarea: React__default.FC<TextareaProps>;

declare const sizeClasses: {
    readonly xs: "text-xs";
    readonly sm: "text-sm";
    readonly md: "text-base";
    readonly lg: "text-lg";
    readonly xl: "text-xl";
};
declare const variantClasses: {
    readonly primary: "border-primary focus:border-primary";
    readonly secondary: "border-secondary focus:border-secondary";
    readonly success: "border-success focus:border-success";
    readonly warning: "border-warning focus:border-warning";
    readonly error: "border-error focus:border-error";
    readonly ghost: "border-ghost focus:border-base-300";
};
type SelectSize = keyof typeof sizeClasses;
type SelectVariant = keyof typeof variantClasses;
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
    variant?: SelectVariant;
    required?: boolean;
    className?: string;
    wrapperClass?: string;
    labelClass?: string;
    labelTextClass?: string;
    sx?: React__default.CSSProperties;
    renderOption?: (option: Option) => React__default.ReactNode;
    hideSearch?: boolean;
}

declare const Select: React__default.FC<SelectProps>;

interface Tab {
    label: string;
    content: React.ReactNode;
}

interface TabBarProps {
    tabs: Tab[];
}
declare const TabBar: React__default.FC<TabBarProps>;

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

declare const Table: React__default.FC<TableProps>;

interface DataItem {
    [key: string]: any;
}
interface PivotTableProps {
    initialData: DataItem[];
    title?: string;
    className?: string;
}

declare const PivotTable: React__default.FC<PivotTableProps>;

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}
declare const useTheme: () => ThemeContextType;
interface ThemeProviderProps {
    children: React$1.ReactNode;
    attribute?: string;
    defaultTheme?: string;
}
declare const ThemeProvider: React$1.FC<ThemeProviderProps>;

interface DropdownItem {
    label: string;
    href?: string;
    icon?: ReactNode;
    children?: DropdownItem[];
}
interface DropdownProps {
    items: DropdownItem[];
    label: string;
    variant?: "primary" | "secondary" | "success" | "warning" | "error" | "ghost";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
}

declare const Dropdown: React__default.FC<DropdownProps>;

export { Button, type ButtonClickEffect, type ButtonProps, type ButtonSize, type ButtonVariant, Checkbox, type CheckboxProps, type CheckboxSize, type CheckboxVariant, type Column, type DataItem, Dropdown, type DropdownItem, type DropdownProps, Input, type InputProps, type InputSize, type InputVariant, type Option, PivotTable, type PivotTableProps, Radio, type RadioProps, type RadioSize, type RadioVariant, Select, type SelectProps, type SelectSize, type SelectVariant, type SortConfig, type Tab, TabBar, Table, type TableConfig, type TableProps, type TableSize, Textarea, type TextareaProps, type TextareaSize, type TextareaVariant, ThemeProvider, useTheme };
