import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ControlsButton from './ControlsButton';
import WeightInput from './WeightInput';
import './styles/ChangeWeightsModal.css';

function ChangeWeightsModal(props: any) {
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			animation={false}
			centered
			dialogClassName="modal-custom"
		>
			<Modal.Dialog>
				<WeightInput
					label="Bar Weight"
					afterInputLabel="kgs"
					name="barWeight"
					value={props.state.barWeight}
					onChange={props.onInputChange}
				/>
				<hr/>
				<div className="available-plates-list">
					<WeightInput
						label="25 kg plates" 
						name="availablePlates--25"
						value={props.state['availablePlates--25']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="20 kg plates" 
						name="availablePlates--20"
						value={props.state['availablePlates--20']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="15 kg plates" 
						name="availablePlates--15"
						value={props.state['availablePlates--15']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="10 kg plates" 
						name="availablePlates--10"
						value={props.state['availablePlates--10']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="5 kg plates" 
						name="availablePlates--5"
						value={props.state['availablePlates--5']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="2.5 kg plates" 
						name="availablePlates--2.5"
						value={props.state['availablePlates--2.5']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="2 kg plates" 
						name="availablePlates--2"
						value={props.state['availablePlates--2']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="1.25 kg plates" 
						name="availablePlates--1.25"
						value={props.state['availablePlates--1.25']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="1 kg plates" 
						name="availablePlates--1"
						value={props.state['availablePlates--1']}
						onChange={props.onInputChange}
					/>
					<WeightInput
						label="0.5 kg plates" 
						name="availablePlates--0.5"
						value={props.state['availablePlates--0.5']}
						onChange={props.onInputChange}
					/>
				</div>
				<ControlsButton
					label="Close"
					onClick={props.onHide}
				/>
			</Modal.Dialog>
		</Modal>
	);
}

export default ChangeWeightsModal;