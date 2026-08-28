import { useState } from "react";
import "./Dropdown.css";
import React from "react";

export interface Option<T> {
  value: T;
  label: string;
}

interface Props<T> {
  value: T;
  options: Option<T>[];
  onChange: (optionValue: T) => void;
  label: string;
}

export default function Dropdown<T>({
  value,
  options,
  onChange,
  label,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(option: Option<T>) {
    const optionValue = option.value;
    onChange(optionValue);
    setIsOpen(false);
  }

  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <div className="dropdown">
        <button className="dropdown-btn" onClick={toggleDropdown}>
          {label}: {selectedOption ? selectedOption.label : ""}{" "}
          {isOpen ? "▴" : "▾"}
        </button>

        {isOpen && (
          <ul className="dropdown-content">
            {options.map((option) => (
              <li
                onClick={() => handleOptionClick(option)}
                className="dropdown-option"
                key={option.label}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
