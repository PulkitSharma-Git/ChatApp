interface InputProps {
    type: string;
    placeholder: string;
    variant: "first" | "second";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox: React.FC<InputProps> = ({ placeholder, variant, onChange, type }) => {

    const variantTypes = {
        first: "w-50 h-14",
        second: "w-96 h-10"
    }
    return <input type={type} placeholder={placeholder} onChange={onChange} className={`flex p-5 items-center text-black justify-center z-50 rounded bg-white ${variantTypes[variant]}`} />
}

