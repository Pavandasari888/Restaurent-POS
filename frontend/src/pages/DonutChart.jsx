
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = ({ pieData }) => {
const series = pieData.map(item => item.value);
const labels = pieData.map(item => item.name);

const options = {
chart: {
    type: 'donut',
},
labels,
colors: ['#2C2C2C', '#828282', '#5B5B5B'],
legend: {
    position: 'bottom'
},
responsive: [{
    breakpoint: 480,
    options: {
    chart: {
        width: 200
    },
    legend: {
        position: 'bottom'
    }
    }
}]
};

return (
<div id="chart" style={{ width: '100%', textAlign: 'center' }}>
    <ReactApexChart options={options} series={series} type="donut" width="200" />
</div>
);
};

export default DonutChart;
