import React from 'react';
import './styles/Controls.css';
import ControlsButton from './ControlsButton';

function Controls(props:any) {
	return (
		<div className="controls">
			<div className="controls__holder">
				<ControlsButton
					label="Calculate"
					additionalClass={props.expectedWeight ? '' : 'disabled'}
					onClick={props.calculate}
				/>
				<ControlsButton
					label="Change Available Weights"
					onClick={props.toggleChangeWeightsModal}
				/>
				<ControlsButton
					label="Get All Combinations"
					onClick={props.showAllCombinations}
				/>
			</div>
		</div>
	)
}

export default Controls;