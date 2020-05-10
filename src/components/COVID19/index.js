import React from 'react';
import csv from 'csvtojson';
import request from 'request';

import CanvasJSChart from '../CanvasJS';

const url = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv';
const newYorkCity = 'New York City';

const getDifference = (arr, index, key) => {
  return index === 0
  ? arr[0][key]
  : arr[index][key] - arr[index-1][key];
}

const getPercentageIncrease = (arr, index, key) =>
  (index === 0 || parseInt(arr[index - 1][key]) === 0)
  ? 0
  : (getDifference(arr, index, key) * 1.0) / arr[index - 1][key] * 100;

const getJson = json => {
  const nycCovid = json
    .filter(j => j.county === newYorkCity && new Date(j.date) > new Date('2020-03-18'));

  const getUTCDate = date => new Date(
    new Date(date).getUTCFullYear(),
    new Date(date).getUTCMonth(),
    new Date(date).getUTCDate());

  const payloadForChart = nycCovid
    .map((j, index) => ({
      date: getUTCDate(j.date),
      cases: parseInt(j.cases),
      deaths: parseInt(j.deaths),
      percentageIncrease: {
        cases: getPercentageIncrease(nycCovid, index, "cases"),
        deaths: getPercentageIncrease(nycCovid, index, "deaths"),
      },
      added: {
        cases: getDifference(nycCovid, index, "cases"),
        deaths: getDifference(nycCovid, index, "deaths")
      }
    }));
  return payloadForChart;
}

class COVID19 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  getCasesOptions = (items) => ({
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title:{
      text: "COVID-19 Cases in New York City"
    },
    axisY: [
      {
        title: "Cases",
      }
    ],
    // axisY2: [
    //   {
    //     title: "% Increase of Cases",
    //   }
    // ],
    axisX: {
      title: "Date",
      valueFormatString: "DD-MMM",
    },
    data: [
      {
        type: "stackedColumn",
        toolTipContent: "Date {x}: {y} added cases",
        dataPoints: items.map(i => ({x: i.date, y: i.added.cases})),
        color: 'green'
      },
      // {
      //   type: "stackedColumn",
      //   toolTipContent: "Date {x}: {z} cases",
      //   dataPoints: items.map(i => ({x: i.date, y: i.cases - i.added.cases, z: i.cases})),
      // },
      // {
      //   type: "spline",
      //   toolTipContent: "Date {x}: {y}% case increase",
      //   axisYType: "secondary",
      //   dataPoints: items.map(i => ({x: i.date, y: i.percentageIncrease.cases})),
      // },
    ]
  });

  getDeathsOptions = (items) => ({
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title:{
      text: "COVID-19 Deaths in New York City"
    },
    axisY: [
      {
        title: "Deaths",
      },
    ],
    // axisY2: [
    //   {
    //     title: "% Increase of Deaths",
    //   }
    // ],
    axisX: {
      title: "Date",
      valueFormatString: "DD-MMM",
    },
    data: [
      {
        type: "stackedColumn",
        toolTipContent: "Date {x}: {y} added deaths",
        dataPoints: items.map(i => ({x: i.date, y: i.added.deaths})),
        color: 'red'
      },
      // {
      //   type: "stackedColumn",
      //   toolTipContent: "Date {x}: {z} deaths",
      //   dataPoints: items.map(i => ({x: i.date, y: i.deaths - i.added.deaths, z: i.deaths})),
      // },
      // {
      //   type: "spline",
      //   toolTipContent: "Date {x}: {y}% death increase",
      //   axisYType: "secondary",
      //   dataPoints: items.map(i => ({x: i.date, y: i.percentageIncrease.deaths})),
      // }
    ]
  })

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
      return (
      <div>
        <CanvasJSChart options = {this.getCasesOptions(items)}
          onRef={ref => this.chart = ref}
        />
        <CanvasJSChart options = {this.getDeathsOptions(items)}
          onRef={ref => this.chart = ref}
        />
        <div id="covid-footer">
          This data was sourced from <a href="https://github.com/nytimes/covid-19-data" target="_blank" rel="noopener noreferrer">The NY Times Covid-19 repository</a> 
        </div>
      </div>
      );
    }
  }

  componentDidMount = async () => await this.updateChart();

  updateChart = async () => {
    try {
      const json = await csv().fromStream(request.get(url));
      this.setState({
        isLoaded: true,
        items: getJson(json),
      });
      this.chart.render();
    }
    catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }
}

export default COVID19;
