import React from 'react';
import './styles/ControlsButton.css';

function ControlsButton(props: any) {
	return (
		<button
			onClick={props.onClick}
			className={`controls-button ${props.additionalClass}`}>{props.label}</button>
	);
}

export default ControlsButton;