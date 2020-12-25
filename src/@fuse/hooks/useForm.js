import _ from '@lodash';
import { useCallback, useState } from 'react';

function useForm(initialState, onSubmit) {
	const [form, setForm] = useState(initialState);

	const handleChange = useCallback(event => {
		event.persist();
		let value = null;
		switch (event.target.type) {
			case 'checkbox':
				value = event.target.checked;
				break;
			case 'radio':
				value = Number(event.target.value);
				break;
			default:
				value = event.target.value;
				break;
		}
		setForm(_form => _.setIn({ ..._form }, event.target.name, value));
	}, []);

	const resetForm = useCallback(() => {
		if (!_.isEqual(initialState, form)) {
			setForm(initialState);
		}
	}, [form, initialState]);

	const setInForm = useCallback((name, value) => {
		setForm(_form => _.setIn(_form, name, value));
	}, []);

	const handleSubmit = useCallback(
		event => {
			if (event) {
				event.preventDefault();
			}
			if (onSubmit) {
				onSubmit();
			}
		},
		[onSubmit]
	);

	return {
		form,
		handleChange,
		handleSubmit,
		resetForm,
		setForm,
		setInForm
	};
}

export default useForm;
