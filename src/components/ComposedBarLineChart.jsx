import React from "react";
import { parseISO, format } from "date-fns";
import {
	ComposedChart,
	XAxis,
	YAxis,
	Bar,
	Line,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import ClipLoader from "react-spinners/ClipLoader";
import {
	addCommasToNumber,
	getSingleDataValueWithAverage,
} from "../utils/utils";

const DATA_DISPLAY_NAMES = {
	newCases: "New cases",
	newDeaths: "New deaths",
	hospitalizations: "Hospitalizations",
	sevenDayAvg: "7-day average",
};

const tooltipValueFormatter = (value, name) => {
	return [addCommasToNumber(value), DATA_DISPLAY_NAMES[name]];
};

const tooltipLabelFormatter = (dateStr) => {
	return format(parseISO(dateStr), "MMM d, yyyy");
};

const xAxisTickFormatter = (dateStr) => {
	const date = parseISO(dateStr);
	if (date.getMonth() % 2 === 0) {
		return format(date, "MMM d");
	}
	return "";
};

export default function ComposedBarLineChart({
	title,
	data,
	dataKey,
	barColor,
	lineColor,
}) {
	const displayData = data
		? getSingleDataValueWithAverage(data, dataKey)
		: null;
	return (
		<>
			<h4 className="text-muted">{title}</h4>
			{displayData ? (
				<ResponsiveContainer height={250} width="100%">
					<ComposedChart data={displayData}>
						<XAxis
							dataKey="date"
							axisLine={false}
							tickLine={false}
							tickFormatter={xAxisTickFormatter}
						/>
						<YAxis
							dataKey={dataKey}
							axisLine={false}
							tickLine={false}
							tickFormatter={addCommasToNumber}
						/>
						<Bar
							dataKey={dataKey}
							fill={barColor}
							isAnimationActive={false}
						/>
						<Line
							dataKey="sevenDayAvg"
							dot={false}
							stroke={lineColor}
							strokeWidth={2}
							isAnimationActive={false}
						/>

						<Tooltip
							formatter={tooltipValueFormatter}
							labelFormatter={tooltipLabelFormatter}
						/>
						<CartesianGrid vertical={false} opacity={0.5} />
					</ComposedChart>
				</ResponsiveContainer>
			) : (
				<div
					className="d-flex align-items-center justify-content-center"
					style={{ height: "250px" }}
				>
					<ClipLoader size={100} color={barColor} />
				</div>
			)}
		</>
	);
}
