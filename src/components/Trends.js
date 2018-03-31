import React from 'react';
import { Slack } from '../lib/requests';
import {Line} from 'react-chartjs-2';



class Trends extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      chartData:{},
      slacks: [],
      validationErrors: [],
      trends: {},
    };
  }

  componentDidMount () {
    // console.log(this.props.user.id)
    var moment = require('moment');

    Slack
      .trends()
      .then(
        trendsObject => {

          const dateArray = []
            trendsObject.forEach(function(date) {
              const dateHuman = date.created_at.slice(0,-14)
                dateArray.push(dateHuman)
                });
                console.log(dateArray);

          const prodArray = []
            trendsObject.forEach(function(prod) {
                prodArray.push(prod.prod_time)
                });
                console.log(prodArray);

          const unprodArray = []
            trendsObject.forEach(function(unprod) {
                unprodArray.push(unprod.unprod_time)
                });
                console.log(unprodArray);

          const sleepArray = []
            trendsObject.forEach(function(sleep) {
                sleepArray.push(sleep.sleep_time)
                });
                console.log(sleepArray);

          const happyArray = []
            trendsObject.forEach(function(happy) {
                happyArray.push(happy.happy)
                });
                console.log(happyArray);

          this.setState({

            trends: trendsObject,
            loading: false,
            chartData:{
              labels: dateArray,

            datasets:[
              {
                label: 'Unporductive Time',
                data: unprodArray,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.1)'
                ],
                borderColor: 'tomato',
              },
              {
                label: 'Productive Time',
                data: prodArray,
                backgroundColor:[
                  'rgba(155, 206, 86, 0.1)'
                ],

                borderColor: 'palegreen'
              },
              {
                label: 'Sleep Quality',
                data: sleepArray,
                backgroundColor:[
                  'rgba(54, 162, 235, 0.1)'
                ],
                borderColor: 'deepskyblue'
              },
              {
                label: 'Happy Level',
                data: happyArray,
                backgroundColor:[
                  'rgba(255, 206, 86, 0.1)'
                ],
                borderColor: '#ffff66'
              }
            ],
          }
          });
        }
      );
    }

    static defaultProps = {
      displayTitle:true,
      displayLegend: true,
      legendPosition:'right',
    }

      render () {
        const { trends } = this.state;
        const { dates } = this.state;
        const username = this.props.user.first_name+' '+this.props.user.last_name+`'s productivity trend`

        return (
          <div className="chart">
            <Line
            	data={this.state.chartData}

            	options={{
                title:{
                 display:this.props.displayTitle,
                 text: username,
                 fontSize:30,
                 fontColor: 'white',
               },
               legend: {
                display: true,
                position: 'bottom',
                fontColor: 'white',
                labels: {
                    fontColor: '#fff'
                  }
                },
               scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: 'white'
                    },
                }],
                xAxes: [{
                    ticks: {
                      fontColor: 'white'
                  },
                }]
            }


            	}}
            />
          </div>
        )
      }
    }

    export default Trends;
