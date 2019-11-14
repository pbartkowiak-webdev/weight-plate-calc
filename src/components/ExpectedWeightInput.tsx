import React from 'react';
import './styles/ExpectedWeightInput.css';

function ExpectedWeightInput(props:any) {
	return (
		<div className="expected-weight-input">
			<h2 className="expected-weight-input__header">Enter Weight in KGs</h2>
			<input
				onChange={props.onInputChange}
				value={props.expectedWeight}
				className="expected-weight-input__input"
				name="expectedWeight"
				type="text"
				autoComplete="off"
			/>
		</div>
	)
}

export default ExpectedWeightInput;