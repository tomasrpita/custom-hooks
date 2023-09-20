import { useState, useEffect, useMemo } from 'react';

/**
 * A custom React hook to manage form state and validations.
 *
 * @param {Object} initialForm - Initial state of the form. Default is an empty object.
 * @param {Object} formValidations - Object containing validation functions and optional error messages for each form field. 
 *                                   E.g., { fieldName: [validationFunction, 'Error message'] }. Default is an empty object.
 *
 * @returns {Object} - An object containing:
 *   - All form fields and their current values. (...formState)
 *   - formState: The entire form state.
 *   - onInputChange: A function to handle input changes.
 *   - onResetForm: A function to reset the form to its initial state.
 *   - isFormValid: A boolean indicating whether the form is valid.
 *   - Validation status (and error messages) for each form field. (......formValidation)
 */
export const useForm = (initialForm = {}, formValidations = {}) => {
  
    const [formState, setFormState] = useState(initialForm);

    // Handle the state to manage any validation errors to potentially re-render the form.
    const [formValidation, setformValidation] = useState({});

    // Check validation every time the form state changes.
    useEffect(() => {
        createValidators();
    }, [formState]);

    // Determine if the form is valid. The form is valid if all fields are valid.
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            // If even a single field carries an error message string, the form is not valid.
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    // Handle input changes and update the state.
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // Reset the form state to its initial state.
    const onResetForm = () => {
        setFormState(initialForm);
    };

    // Create validators to check the form values against the given validation functions.
    const createValidators = () => {
        const formCheckValues = {};

        // Iterate over the keys of the validators, corresponding to the fields of the inputs we want to validate.
        for (const formField of Object.keys(formValidations)) {
            // Extract the validation function; a default error message is also provided.
            const [fn, errorMessage = 'This field is required.'] = formValidations[formField];

            // Create a computed property - evaluates the input value and returns an error if it fails.
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

            // Update the formValidation state.
            setformValidation(formCheckValues);
        }
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
        // Destructure the computed properties created.
        ...formValidation,
    }
}
