import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import PropTypes from "prop-types";
import useCallBinanceAPI from "../../Hooks/useCallBinanceAPI";

const Spline = (props) => {
  const { symbol } = props;

  const [options] = useCallBinanceAPI(
    symbol,
    {
      plotOptions: {
        spline: {
          color: "#F0B90B",
        },
      },
      chart: {
        zoomType: "x",
        height: 150,
        backgroundColor: "#14151a",
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },

      title: {
        text: "",
      },
      xAxis: {
        type: "datetime",
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      tooltip: {
        split: true,
      },

      series: [],
    },
    "spline"
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

Spline.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default Spline;
