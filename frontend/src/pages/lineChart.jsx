import ReactApexChart from "react-apexcharts";

const MinimalLineChart = ({ ordersData = [] }) => {
const series = [
{
    name: "Orders",
    data: ordersData.map(item => item.orders), // Just the y-values
},
];

const options = {
chart: {
    type: "line",
    height: 150,
    toolbar: { show: false },
    zoom: { enabled: false },
},
xaxis: {
    categories: ordersData.map(item => item.day), // Days of the week
    labels: { show: true },
    axisTicks: { show: false },
    axisBorder: { show: false },
},
yaxis: {
    labels: { show: true },
    axisTicks: { show: false },
    axisBorder: { show: false },
},
stroke: {
    curve: "smooth",
    width: 2,
},
markers: { size: 4 },
tooltip: {
    enabled: true,
},
grid: {
    show: false,
},
legend: {
    show: false,
},
};

return (
<div className="chart-wrapper">
    <ReactApexChart options={options} series={series} type="line" height={250} width={350} />
</div>
);
};

export default MinimalLineChart;
