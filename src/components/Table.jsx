import classNames from "classnames";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import CovidDataContext from "../context/CovidDataContext";
import {
	transformOverviewData,
	addCommasToNumber,
	formatPercentage,
} from "../utils/utils";
import TableColumnHeader from "./TableColumnHeader";

const DATA_URL =
	"https://api.covidactnow.org/v2/states.json?apiKey=ec111c8b31de4650afe99b42a469b6d6";

// formatFn is applied to the raw data to display in a <td>
const COLUMNS = [
	{
		id: "state",
		text: "State",
		formatFn: (data) => data,
	},
	{
		id: "totalCases",
		text: "Total Cases",
		formatFn: addCommasToNumber,
	},
	{
		id: "totalDeaths",
		text: "Total Deaths",
		formatFn: addCommasToNumber,
	},
	{
		id: "casesPerHundred",
		text: "Cases per 100",
		formatFn: (data) => data,
	},
	{
		id: "deathsPerThousand",
		text: "Deaths per 1,000",
		formatFn: (data) => data,
	},
	{
		id: "partialVaccinationsPerHundred",
		text: "Partially Vaccinated",
		formatFn: formatPercentage,
	},
	{
		id: "fullVaccinationsPerHundred",
		text: "Fully Vaccinated",
		formatFn: formatPercentage,
	},
	{
		id: "testPositivity",
		text: "Test Positivity Rate",
		formatFn: formatPercentage,
	},
];

const Table = () => {
	const [sortType, setSortType] = useState(COLUMNS[0].id);
	const [sortAscending, setSortAscending] = useState(false);

	const { overviewData, setOverviewData } = useContext(CovidDataContext);

	const history = useHistory();

	useEffect(() => {
		fetch(DATA_URL)
			.then((res) => res.json())
			.then((json) => {
				setOverviewData(transformOverviewData(json));
			});
	}, [setOverviewData]);

	useEffect(() => {
		if (overviewData && sortType) {
			setOverviewData(sortData(overviewData, sortType, sortAscending));
		}
		// eslint-disable-next-line
	}, [sortType, sortAscending]);

	const handleHeaderClick = (id) => {
		if (id === sortType) {
			setSortAscending(!sortAscending);
		} else {
			setSortType(id);
			setSortAscending(false);
		}
	};

	const handleRowClick = (stateId) => {
		history.push(`/state/${stateId}`);
	};

	return !!overviewData.length ? (
		<div className="p-lg-5">
			<h2 className="mb-3">
				Sort the table by category, or select a state for more data.
			</h2>
			<div className="table-responsive">
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							{COLUMNS.map(({ id, text }, idx) => (
								<TableColumnHeader
									key={id}
									text={text}
									active={id === sortType}
									alignRight={idx !== 0}
									sortAscending={sortAscending}
									onClick={() => handleHeaderClick(id)}
								/>
							))}
						</tr>
					</thead>
					<tbody>
						{overviewData.map((state) => (
							<tr
								key={state.state}
								onClick={() => handleRowClick(state.state)}
							>
								{COLUMNS.map(({ id, formatFn }, idx) => (
									<td
										key={id}
										className={classNames({
											"table-info": id === sortType,
											"text-right": idx > 0,
										})}
									>
										{formatFn(state[id])}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	) : (
		<h2 className="text-center">Loading...</h2>
	);
};

function sortData(data, sortType, sortAscending) {
	return [...data].sort(sortDataCallback(sortType, sortAscending));
}

function sortDataCallback(sortType, sortAscending) {
	return (a, b) => {
		if (sortType === "state") {
			if (sortAscending) {
				return b[sortType] <= a[sortType] ? -1 : 1;
			} else {
				return a[sortType] <= b[sortType] ? -1 : 1;
			}
		}
		return sortAscending
			? a[sortType] - b[sortType]
			: b[sortType] - a[sortType];
	};
}

export default Table;
