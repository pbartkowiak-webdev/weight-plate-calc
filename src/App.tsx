import React from 'react';
import './App.css';
import Header from './components/Header';
import ExpectedWeightInput from './components/ExpectedWeightInput';
import Controls from './components/Controls';
import Results from './components/Results';
import ChangeWeightsModal from './components/ChangeWeightsModal';

class App extends React.Component {
	state:any = {
		showChangeWeightModal: false,
		expectedWeight: '',
		barWeight: '',
		barWeghtUsed: '',
		barbellTotalWeight: 0,
		resultPlatesEquals: [],
		resultPlatesClosests: [],
		resultAllCombinations: [],
		'availablePlates--25' : '',
		'availablePlates--20' : '',
		'availablePlates--15' : '',
		'availablePlates--10' : '',
		'availablePlates--5'  : '',
		'availablePlates--2.5': '',
		'availablePlates--2'  : '',
		'availablePlates--1.25': '',
		'availablePlates--1'  : '',
		'availablePlates--0.5': ''
	}

	toggleChangeWeightsModal = () => {
		this.setState({
			showChangeWeightModal: !this.state.showChangeWeightModal
		});
	}

	closeChangeWeightsModal = () => {
		this.setState({
			showChangeWeightModal: false
		});
	}

	onInputChange = (event:any) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	calculate = () => {
		const allCombinations = this.getAll();
		const equals = this.findEquals(allCombinations);

		let closests = [];
		let barbellTotalWeight;

		if (!equals.length) {
			closests = this.findClosests(allCombinations);
		}

		// Determine Barbell Total Weight
		if (equals.length) {
			barbellTotalWeight = equals[0].totalWeight; 
		} else if (closests.length) {
			barbellTotalWeight = closests[0].totalWeight; 
		} else {
			barbellTotalWeight = 0;
		}

		this.setState({
			resultPlatesEquals: equals,
			resultPlatesClosests: closests,
			resultAllCombinations: [],
			barbellTotalWeight,
			barWeightUsed: this.state.barWeight
		});
	}

	findClosests(combinations:any) {
		const expectedWeight = Number(this.state.expectedWeight);
		let bestResult:any = null;
		let results:any = [];

		combinations.forEach((obj:any) => {
			const difference = expectedWeight - obj.totalWeight;
			if (bestResult === null) {
				results.push(obj);
				bestResult = difference;
			} else {
				if (bestResult === difference) {
					results.push(obj);
				}
				if ((difference > 0) && (difference < bestResult)) {
					results = [obj];
					bestResult = difference;
				}
			}
		});
		return results;
	}

	findEquals(combinations:any) {
		const expectedWeight = Number(this.state.expectedWeight);
		return combinations.filter((obj:any) => obj.totalWeight === expectedWeight);
	}

	getAllAvailablePlates = () => {
		const resultArray:any = []
		const platesArray = [
			this.getPlate('25'),
			this.getPlate('20'),
			this.getPlate('15'),
			this.getPlate('10'),
			this.getPlate('5'),
			this.getPlate('2.5'),
			this.getPlate('2'),
			this.getPlate('1.25'),
			this.getPlate('1'),
			this.getPlate('0.5')
		];
		platesArray.forEach((plateObj) => {
			for (let i = 0; i < plateObj.amount; i++) {
				resultArray.push(plateObj.weight);
			}
		});
		return resultArray.sort((a:number, b:number) => b - a);
	}

	getPlate = (plateWeight:any) => {
		let p = Number(this.state[`availablePlates--${plateWeight}`]);
		let plateAmount;
		if (!p) {
			plateAmount = 0;
		} else {
			// divide amount by 2 as using as pair 
			plateAmount = p % 2 === 0 ? p/2 : (p - 1)/2;
		}
		// return only even number of plates
		return {
			weight: Number(plateWeight),
			amount: plateAmount
		};
	}

	sumPlates = (plates:any) => {
		return plates.reduce((sum:any, plateWeight:any) => {
			return sum + plateWeight
		}, 0);
	}

	getCombinations = (arr:any) => {
		let subarr:any;
		if (arr.length === 1) return [arr];
		else {
			subarr = this.getCombinations(arr.slice(1));
			return subarr.concat(subarr.map((e:any) => e.concat(arr[0])), [[arr[0]]]);
		}
	}

	// TotalWeight contains bar weight
	getAll = () => {
		const barWeight = Number(this.state.barWeight) || 0;
		const availablePlates = this.getAllAvailablePlates();
		const combinations = this.getCombinations(availablePlates);
		const combinationsWithWeights = combinations.map((combinationArr:any) => {
			return {
				plates: combinationArr,
				totalWeight: barWeight + (2 * this.sumPlates(combinationArr))
			};
		});
		// Remove duplicates
		const noDuplicates = this.removeDuplicates(combinationsWithWeights)
		return noDuplicates;
	}

	showAllCombinations = () => {
		const allCombinations = this.getAll();
		this.setState({
			resultPlatesEquals: [],
			resultPlatesClosests: [],
			resultAllCombinations: allCombinations.sort((a:any, b:any) => a.totalWeight - b.totalWeight),
			barWeightUsed: this.state.barWeight
		});
	}

	removeDuplicates = (combinations:any) => {
		return combinations.reduce((newArr:any, element:any) => {
			const newPlates = JSON.stringify(element.plates);
			var checkMe = newArr.filter((platesData:any) => {
				return JSON.stringify(platesData.plates) === newPlates;
			});

			if (!checkMe.length) {
				newArr.push(element);
			}
			return newArr;
		}, []);
	}

	render () {
		return (
			<div className="App">
			<Header />
			<ExpectedWeightInput
				expectedWeight={this.state.expectedWeight}
				onInputChange={this.onInputChange}
			/>
			<Controls 
				calculate={this.calculate}
				showAllCombinations={this.showAllCombinations}
				toggleChangeWeightsModal={this.toggleChangeWeightsModal}
				expectedWeight={this.state.expectedWeight}
			/>
			<Results
				resultPlatesEquals={this.state.resultPlatesEquals}
				resultPlatesClosests={this.state.resultPlatesClosests}
				resultAllCombinations={this.state.resultAllCombinations}
				barWeightUsed={this.state.barWeightUsed}
				barbellTotalWeight={this.state.barbellTotalWeight}
			/>
			<ChangeWeightsModal
				show={this.state.showChangeWeightModal}
				onHide={this.closeChangeWeightsModal}
				onInputChange={this.onInputChange}
				state={this.state}
			/>
		</div>
		)

	};
}

export default App;
