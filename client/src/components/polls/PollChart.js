import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";

const pieOptions = {
  pieHole: 0.5,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};

const PollChart = ({ poll, poll: { title, options, owner, updated } }) => {
  const data = options.map(option => [option.optionName, option.votes.length]);

  console.log(data);

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={[["Option", "Votes"], ...data]}
        options={pieOptions}
        graph_id="PieChart"
        width={"100%"}
        height={"400px"}
        legend_toggle
      />
    </div>
  );
};

PollChart.propTypes = {};

export default PollChart;
