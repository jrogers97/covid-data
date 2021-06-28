import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ComposedBarLineChart from "./ComposedBarLineChart";
import VaxChart from "./VaxChart";
import CovidDataContext from "../context/CovidDataContext";
import { transformStateData } from "../utils/utils";
import stateNames from "../utils/stateNames";

const getStateDataUrl = (state) =>
	`https://api.covidactnow.org/v2/state/${state}.timeseries.json?apiKey=ec111c8b31de4650afe99b42a469b6d6`;

export default function StatePage() {
	const { pathname } = useLocation();
	const stateName = pathname.split("/state/")[1] || "";

	const { stateData, setStateData } = useContext(CovidDataContext);

	useEffect(() => {
		if (!stateData[stateName]) {
			fetch(getStateDataUrl(stateName))
				.then((res) => res.json())
				.then((json) =>
					setStateData({
						...stateData,
						[stateName]: transformStateData(json),
					})
				)
				.catch((err) => console.log(err));
		}
	}, [stateData, setStateData, stateName]);

	// console.log(stateData[stateName]);

	return (
		<div className="">
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item active" aria-current="page">
						{stateName}
					</li>
				</ol>
			</nav>

			<h2>{stateNames[stateName]}</h2>

			<div className="row">
				<div className="col-xl-6 col-l-12 p-3">
					<ComposedBarLineChart
						data={stateData[stateName]}
						dataKey="newCases"
						title="New cases"
						barColor="#8884d8"
						lineColor="#3531a4"
					/>
				</div>

				<div className="col-xl-6 col-l-12 p-3">
					<ComposedBarLineChart
						data={stateData[stateName]}
						dataKey="newDeaths"
						title="New deaths"
						barColor="#a4a4a4"
						lineColor="#545454"
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-6 col-l-12 p-3">
					<ComposedBarLineChart
						data={stateData[stateName]}
						dataKey="hospitalizations"
						title="Hospitalizations"
						barColor="#d25e5e"
						lineColor="#832828"
					/>
				</div>
				<div className="col-xl-6 col-l-12 p-3">
					<VaxChart data={stateData[stateName]} />
				</div>
			</div>
		</div>
	);
}
