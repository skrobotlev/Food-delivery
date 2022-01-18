import { useState, useEffect, useCallback } from "react";

// export default function validateInfo(values) {
//   let errors = {};

//   if (!values.username.trim()) {
//     errors.username = "Username required";
//   }
//   // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
//   //   errors.name = 'Enter a valid name';
//   // }

//   if (!values.email) {
//     errors.email = "Email required";
//   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//     errors.email = "Email address is invalid";
//   }
//   if (!values.password) {
//     errors.password = "Password is required";
//   } else if (values.password.length < 6) {
//     errors.password = "Password needs to be 6 characters or more";
//   }

//   if (!values.password2) {
//     errors.password2 = "Password is required";
//   } else if (values.password2 !== values.password) {
//     errors.password2 = "Passwords do not match";
//   }
//   return errors;
// }

// export const useFormValidation = (initialValues, validationSchema, callback) => {
//   const [state, setState] = useState(initialValues);
//   const [disabled, setDisabled] = useState(true);

//   const validateState = useCallback(() => {
//     const isValid = Object.keys(validationSchema).some((key) => {
//       const isRequired = validationSchema[key].required;
//       const isValue = state[key].value;
//       const isError = state[key].error;

//       return (isRequired && !isValue) || isError;
//     });
//     return isValid;
//   }, [state, validationSchema]);

//   useEffect(() => setDisabled(validateState()), [validateState]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let error = "";

//     const { required, validator } = validationSchema[name];

//     if (required) {
//       if (!value) {
//         error = "This field is required.";
//       } else {
//         if (validator.regEx && !validator.regEx.test(value)) {
//           error = validator.error;
//         } else if (validator.length && validator.length > value.length) {
//           error = validator.error;
//         }
//       }
//     }

//     setState((prevState) => ({
//       ...prevState,
//       [name]: { value, error },
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!validateState()) {
//       callback(state);
//       // reset
//       setState(initialValues);
//     }
//   };

//   return { state, disabled, handleChange, handleSubmit };
// };
