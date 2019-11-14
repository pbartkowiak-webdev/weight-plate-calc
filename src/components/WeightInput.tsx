import React from 'react';
import './styles/WeightInput.css';

function WeightInput(props: any) {
	return (
		<div className="weight-input">
			<label
				className="weight-input__label"
				htmlFor={props.name}
				>{props.label}</label>
			<input
				id={props.label}
				name={props.name}
				className="weight-input__input"
				value={props.value}
				onChange={props.onChange}
				type="text"
				autoComplete="off"
			/>
			{ 
				props.afterInputLabel
				? <label className="weight-input__label weight-input__label--after-input">{props.afterInputLabel}</label>
				: null
			}
		</div>
	)
}

export default WeightInput;