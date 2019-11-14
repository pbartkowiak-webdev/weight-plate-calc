import React from 'react';
import './styles/Results.css';
import WeightPlate from './svg/WeightPlate';

function Results(props:any) {
	let results;
	let notExactWarning;

	if (props.resultPlatesEquals && props.resultPlatesEquals.length) {
		results = props.resultPlatesEquals;
	} else if (props.resultPlatesClosests && props.resultPlatesClosests.length) {
		results = props.resultPlatesClosests;
		notExactWarning = <p className="results__text--alert">Weight combination is not exact. Presenting the closest results possible</p>;
	} else {
		results = [];
	}

	const barWeightText = props.barWeightUsed ? `Selected bar weight: ${props.barWeightUsed} kg` : 'No bar weight selected!';
	const barWeightClass = `results__text ${(props.barWeightUsed ? '' : 'results__text--alert')}`;

	if (results.length) {
		const resultsElement = results.map((result:any, index:number) => {
			return (
				<div className="results__group" key={`group-${index}`}>
					{
						result.plates.map((plateWeight:any, index:number) => {
							return (
								<WeightPlate
									plateWeight={plateWeight}
									key={`plate--${index}`}
								/>
							);
						})
					}
				</div>
			);
		});

		return (
			<div className="results">
				<div className="results__holder">
					<h3 className={barWeightClass}>{barWeightText}</h3>
					<h3 className="results__text">Total weight: {props.barbellTotalWeight} kg
						{notExactWarning}
					</h3>
					<h3 className="results__text">Load these up on each side of the bar:</h3>
					<div className="results__list">
						{resultsElement}
					</div>
				</div>
			</div>
		);
	} else if (props.resultAllCombinations && props.resultAllCombinations.length) {
		const resultsAll = props.resultAllCombinations.map((combination:any, index:number) => {
			return (
				<li
					className="results__group results__group--all"
					key={`group--${index}`} >
					<h4 className="results__text results__text--weight">{combination.totalWeight} kg</h4>
					<div>
						{
							combination.plates.map((plateWeight:any, index:number) => {
								return (
									<WeightPlate
										small={true}
										plateWeight={plateWeight}
										key={`plate--${index}`}
								/>
								)
							})
						}
					</div>
				</li>
			)
		});

		return (
			<div className="results results--all">
				<div className="results__holder">
					<h3 className={barWeightClass}>{barWeightText}</h3>
					<h3 className="results__text">All weight combinations</h3>
					<h3 className="results__text">Load these up on each side of the bar:</h3>
					<ul>
						{resultsAll}
					</ul>
				</div>
			</div>
		);
	}
	return null;

}

export default Results;