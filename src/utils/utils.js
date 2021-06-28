export function transformOverviewData(overviewData) {
	return overviewData.map((state) => {
		return {
			state: state.state,
			totalCases: Math.round(state.actuals.cases * 100) / 100,
			totalDeaths: Math.round(state.actuals.deaths * 100) / 100,
			casesPerHundred:
				Math.round((state.actuals.cases / state.population) * 1000) /
				10,
			deathsPerThousand:
				Math.round((state.actuals.deaths / state.population) * 10000) /
				10,
			partialVaccinationsPerHundred:
				Math.round(state.metrics.vaccinationsInitiatedRatio * 1000) /
				10,
			fullVaccinationsPerHundred:
				Math.round(state.metrics.vaccinationsCompletedRatio * 1000) /
				10,
			testPositivity:
				Math.round(state.metrics.testPositivityRatio * 1000) / 10,
		};
	});
}

export function transformStateData(stateData) {
	console.log(stateData);
	const { population } = stateData;
	return stateData.actualsTimeseries.map((day) => {
		return {
			date: day.date,
			newCases: day.newCases,
			newDeaths: day.newDeaths,
			partialVaccinations: day.vaccinationsInitiated,
			fullVaccinations: day.vaccinationsCompleted,
			partialVaccinationsPerHundred: day.vaccinationsInitiated
				? Math.round((day.vaccinationsInitiated / population) * 1000) /
				  10
				: null,
			fullVaccinationsPerHundred: day.vaccinationsCompleted
				? Math.round((day.vaccinationsCompleted / population) * 1000) /
				  10
				: null,
			hospitalizations: day.hospitalBeds.currentUsageCovid,
		};
	});
}

export function getSingleDataValueWithAverage(data, key) {
	if (!data) return null;
	return data.map((day, idx, arr) => {
		const sevenDayAvg =
			arr
				.slice(idx - 6, idx + 1)
				.map((prevDay) => prevDay[key])
				.reduce((acc, curr) => acc + (curr || 0), 0) / 7;

		return {
			date: day.date,
			[key]: day[key],
			sevenDayAvg: Math.round(sevenDayAvg),
		};
	});
}

export function addCommasToNumber(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function formatPercentage(num) {
	return `${num}%`;
}
