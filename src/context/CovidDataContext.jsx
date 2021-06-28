import { createContext } from "react";

const CovidDataContext = createContext({
	overviewData: [],
	stateData: {},
});

export default CovidDataContext;
