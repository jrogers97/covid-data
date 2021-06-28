import { useState } from "react";
import CovidDataContext from "./CovidDataContext";

const CovidDataProvider = ({ children }) => {
	const [overviewData, setOverviewData] = useState([]);
	const [stateData, setStateData] = useState({});

	return (
		<CovidDataContext.Provider
			value={{
				overviewData,
				stateData,
				setOverviewData,
				setStateData,
			}}
		>
			{children}
		</CovidDataContext.Provider>
	);
};

export default CovidDataProvider;
