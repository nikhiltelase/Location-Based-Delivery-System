import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const InputField = ({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  showPasswordToggle,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-xs text-gray-600 mb-1">{label}</label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon size={16} />
          </div>
        )}

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full 
            ${Icon ? "pl-10" : "pl-3"} 
            pr-${showPasswordToggle ? "10" : "3"} 
            py-2 
            text-sm 
            border 
            border-gray-300 
            rounded-lg 
            focus:outline-none 
            focus:ring-2 
            focus:ring-green-500
          `}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
