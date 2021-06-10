import React from "react";

import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
} from "recharts";

export default function Graph(props) {
	return (
		<ResponsiveContainer width="100%" aspect="1.5">
			<BarChart data={props.data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="_id"
					interval={0}
					angle={-45}
					textAnchor="end"
					height={100}
				></XAxis>
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="income" fill="#8884d8" />
			</BarChart>
		</ResponsiveContainer>
	);
}
