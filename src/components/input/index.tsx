import React from "react";
// import Styles from "./styles.module.scss";

const Input = ({
  type,
  placeholder,
  label,
  minLength,
  maxLength,
  defaultValue,
  required,
  errors,
  disabled=false,
  register,
}: any) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        disabled ={disabled}
        {...register(label, {
          required: required,
          minLength: minLength ? minLength : null,
          maxLength: maxLength ? maxLength : null,
        })}
        defaultValue={defaultValue ? defaultValue : null}
      />
      {errors === "required" && (
        <span>This Field Is Required</span>
      )}
      {errors === "maxLength" && (
        <p>
          {placeholder} cannot exceed {maxLength} characters
        </p>
      )}
      {errors === "minLength" && (
        <p>
          {placeholder} must contain atleast {minLength} characters
        </p>
      )}
    </div>
  );
};

export default Input;
