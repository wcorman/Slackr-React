import React from 'react';
import { Slack } from '../lib/requests';
import {Line} from 'react-chartjs-2';



class Trends extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      chartData:{
        labels: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],

      datasets:[
        {
          label: 'Unporductive Time',
          data: [213, 517, 213, 533, 534, 283, 213, 591, 391, 126, 210, 474, 388],
          backgroundColor:[
            'rgba(255, 99, 132, 0.1)'
          ],
          borderColor: 'tomato',
        },
        {
          label: 'Productive Time',
          data: [243, 457, 223, 713, 354, 831, 131, 591, 911, 116, 110, 741, 188],
          backgroundColor:[
            'rgba(155, 206, 86, 0.1)'
          ],

          borderColor: 'palegreen'
        },
        {
          label: 'Sleep Quality',
          data: [143, 557, 123, 413, 254, 531, 431, 791, 411, 316, 210, 941, 388],
          backgroundColor:[
            'rgba(54, 162, 235, 0.1)'
          ],
          borderColor: 'deepskyblue'
        },
        {
          label: 'Happy Level',
          data: [343, 457, 253, 643, 454, 591, 631, 681, 711, 786, 810, 891, 999],
          backgroundColor:[
            'rgba(255, 206, 86, 0.1)'
          ],
          borderColor: '#ffff66'
        }
      ],
      slacks: [],
      validationErrors: [],
      trends: {},
      dates: {}
      },
    };
  }

  componentDidMount () {
    // console.log(this.props.user.id)

    Slack
      .trends()
      .then(
        trendsObject => {
          console.log(trendsObject)
          this.setState({
            trends: trendsObject,
            loading: false,
          });
        }
      );

      Slack
        .dates()
        .then(
          dates => {
            console.log('testing:'+dates)
            this.setState({
              dates: dates,
              loading: false
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
        console.log(dates)
        return (
          <div className="chart">
            <Line
            	data={this.state.chartData}

            	options={{
                title:{
                 display:this.props.displayTitle,
                 text:'Example trend for User',
                 fontSize:30,
                 fontColor: 'white',
               },
               legend:{
                 display:true,
                 position:'bottom',
                 fontColor: 'white',

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

            <h2>Dates</h2>
          </div>
        )
      }
    }

    export default Trends;
