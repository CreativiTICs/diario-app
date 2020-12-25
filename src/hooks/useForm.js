import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formValues, setformValues] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setformValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  return [formValues, handleInputChange, reset];
};
