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
    Slack
      .trends()
      .then(
        trendsObject => {

          const datesArray = []
            trendsObject.forEach(function(entry) {
              const dateSliced = entry.created_at.slice(0,-19)
                datesArray.push(dateSliced)
                });
                console.log(datesArray);

          const healthyMealsArray = []
          console.log(healthyMealsArray)
            trendsObject.forEach(function(entry) {
                healthyMealsArray.push(entry.prod_time)
                });
                console.log(healthyMealsArray);

          const procrastinationArray = []
            trendsObject.forEach(function(entry) {
                procrastinationArray.push(entry.unprod_time)
                });
                console.log(procrastinationArray);

          const sleepArray = []
            trendsObject.forEach(function(entry) {
                sleepArray.push(entry.sleep_time)
                });
                console.log(sleepArray);

          const moodArray = []
            trendsObject.forEach(function(entry) {
                moodArray.push(entry.happy)
                });
                console.log(moodArray);



          this.setState({

            trends: trendsObject,
            loading: false,
            chartData:{
              labels: datesArray,

            datasets:[
              {
                label: 'Procrastination',
                data: procrastinationArray,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.1)'
                ],
                borderColor: 'tomato',
              },
              {
                label: 'Healthy Meals',
                data: healthyMealsArray,
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
                label: 'Mood',
                data: moodArray,
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
        const username = "Your lifestyle trend"

        return (
          <div className="chart">

            {this.state.trends.length < 2
              ? [
                 // If LESS than 2 entries, message is shown:
                  <main>
                    <div>
                      <p style={{color:'palegreen', 
                                  fontSize:'17px', 
                                  margin:'0px', 
                                  textAlign: 'center', 
                                  margin:'8px'}}>
                         <b>Keep comin back! You need at least 2 entries to start seeing your trend..</b>
                      </p>
                    </div>
                  </main>
                ]
              : 
            // If MORE than 2 entries, no message is shown:
              <div></div>
            }
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
