// write h2, text-input, button, and dragdrop context components in the ComponentLibrary.tsx file

// H2 Component
import React from "react";

export const XH2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h2>{children}</h2>;
};

// Text Input Component
export const XTextInput: React.FC<{
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
};

// Button Component
export const XButton: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
}> = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
};

