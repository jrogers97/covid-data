import React from "react";
import { parseISO, format } from "date-fns";
import { formatPercentage } from "../utils/utils";
import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";
import ClipLoader from "react-spinners/ClipLoader";

const DATA_DISPLAY_NAMES = {
	partialVaccinationsPerHundred: "At least one dose",
	partialVaccinations: "At least one dose",
	fullVaccinationsPerHundred: "Fully vaccinated",
	fullVaccinations: "Fully vaccinated",
};

const xAxisTickFormatter = (dateStr) => {
	const date = parseISO(dateStr);
	if (date.getMonth() % 2 === 0) {
		return format(date, "MMM d");
	}
	return "";
};

const tooltipValueFormatter = (value, name) => {
	return [formatPercentage(value), DATA_DISPLAY_NAMES[name]];
};

const tooltipLabelFormatter = (dateStr) => {
	return format(parseISO(dateStr), "MMM d, yyyy");
};

export default function VaxChart({ data }) {
	return (
		<>
			<h4 className="text-muted">Vaccinations</h4>
			{data ? (
				<ResponsiveContainer height={250} width="100%">
					<AreaChart data={data}>
						<XAxis
							dataKey="date"
							axisLine={false}
							tickLine={false}
							tickFormatter={xAxisTickFormatter}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tickFormatter={formatPercentage}
						/>
						<Area
							type="monotone"
							dataKey="partialVaccinationsPerHundred"
							stroke="#3aa757"
							fill="#aad9b6"
							isAnimationActive={false}
						/>
						<Area
							type="monotone"
							dataKey="fullVaccinationsPerHundred"
							fill="#5fb877"
							isAnimationActive={false}
						/>

						<Tooltip
							formatter={tooltipValueFormatter}
							labelFormatter={tooltipLabelFormatter}
						/>
						<CartesianGrid vertical={false} opacity={0.5} />
					</AreaChart>
				</ResponsiveContainer>
			) : (
				<div
					className="d-flex align-items-center justify-content-center"
					style={{ height: "250px" }}
				>
					<ClipLoader size={100} color={"#5fb877"} />
				</div>
			)}
		</>
	);
}
