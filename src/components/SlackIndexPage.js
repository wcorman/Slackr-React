import React from "react";
import { Line } from "rc-progress";
import { Row, Col } from "reactstrap";
import { Slack } from "../lib/requests";
import SlackNewPage from "./SlackNewPage";
import Averages from "./Averages";

class SlackIndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slacks: [],
      loading: true,
      value: 0,
      title: "Slackr",
      averages: {}
    };

    this.addSlack = this.addSlack.bind(this);
    this.getAverages = this.getAverages.bind(this);
  }

  componentDidMount() {
    this.getAverages();

    Slack
      .all()
      .then(slacks => {
        this.setState({
          slacks: slacks,
          loading: false
        });
      });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.state.slacks,
      JSON.stringify(this.state.slacks)
    );
  }

  getAverages() {
    Slack
      .averages()
      .then(averagesObject => {
        this.setState({
          averages: averagesObject
        });
      });
  }

  addSlack (newSlack) {
    const {slacks} = this.state;

    this.setState({
      slacks: [
        newSlack,
        ...slacks
      ]
    });

    this.getAverages();
  }

  render() {
    const {slacks, loading} = this.state;
    const username = this.props.user.first_name;
    const total = slacks.length;
    const leftOvers = total - 9;
    const singular = total == 10;
    const moment = require("moment");

    if (loading) {
      return (
        <main className="SlackIndexPage" style={{ margin: "0 1rem" }}>
          <h2>Slacks</h2>
          <h4>Loading Slacks...</h4>
        </main>
      );
    }

    return (
      <main id="index" className="SlackIndexPage" style={{ width: "100vw" }}>
        <main style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <SlackNewPage addSlack={this.addSlack} />
            <Averages averages={this.state.averages} />
          </div>
        </main>

        <hr />
        {total == 0
          ? [
            <main
              style={{
                width: "99vw",
                minWidth: "310px",
                height: "270px",
                textAlign: "center",
                paddingBottom: "25px",
                margin: "10px",
                border: "solid",
                borderRadius: "10px",
                borderWidth: "2px",
                borderColor: "grey",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                marginBottom: "10px",
                padding: "20px",
                color: "white"
              }}
            >
              <h2 style={{color: 'palegreen'}}>Hey {this.props.user.first_name}, welcome to Slackr!</h2>
              <h4><i>Slackr</i> is a tool to help you keep track of your daily habits and gain a better understanding of how they correlate with your mood.</h4>
              <h4>Everyone is different, the trick is to be honest with yourself in gauging how <i>YOU</i> think your day went.</h4>
              <br/>
              <h4><i>Get started with your first entry by adjusting the sliders above and hitting submit!</i></h4>
            </main>
          ]
          :
           <h2 className="headings" style={{ color: "white", marginTop: "15px", marginLeft: "16px" }}>
            Recent Entries
           </h2>
        }


        <Row style={{ marginLeft: "10px", marginRight: "0px" }}>
          {slacks.slice(0, 9).map(slack =>
            <div key={slack.id}>
              <main
                id="card"
                style={{
                  width: "85%",
                  minWidth: "310px",
                  height: "270px",
                  paddingBottom: "25px",
                  margin: "10px",
                  border: "solid",
                  borderRadius: "10px",
                  borderWidth: "2px",
                  borderColor: "grey",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  marginBottom: "10px",
                  padding: "20px",
                  color: "white"
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h4 className="headings">
                    {moment(slack.created_at).format("MMM Do, YYYY")}
                  </h4>
                </div>
                <div>
                  <p className="LineText">Procrastination</p>
                  <Line
                    className="Line"
                    percent={slack.unprod_time}
                    trailColor="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2.8"
                    strokeColor="tomato"
                  />
                  <br />
                </div>
                <div>
                  <p className="LineText">Healthy Meals</p>
                  <Line
                    className="Line"
                    percent={slack.prod_time}
                    trailColor="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2.8"
                    strokeColor="palegreen"
                  />
                  <br />
                </div>
                <div>
                  <p className="LineText">Sleep Quality</p>
                  <Line
                    className="Line"
                    percent={slack.sleep_time}
                    trailColor="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2.8"
                    strokeColor="#15fbff"
                  />
                  <br />
                </div>
                <div>
                  <p className="LineText">Mood</p>
                  <Line
                    className="Line"
                    percent={slack.happy}
                    trailColor="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2.8"
                    strokeColor="#ffff66"
                  />
                  <br />
                </div>
              </main>
            </div>
          )}

          {total >= 10
            ? [
                <main
                  style={{
                    width: "200px",
                    minWidth: "310px",
                    height: "270px",
                    textAlign: "center",
                    paddingBottom: "25px",
                    margin: "10px",
                    border: "solid",
                    borderRadius: "10px",
                    borderWidth: "2px",
                    borderColor: "grey",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    marginBottom: "10px",
                    padding: "20px",
                    color: "white"
                  }}
                >
                  {singular
                    ? <h2>{" "}{leftOvers} more day not shown...</h2>
                    : <h2>{" "}{leftOvers} more days not shown...</h2>}
                  <br />
                  <h3>Keep it up, {username}!</h3>
                </main>
              ]
            : <div></div>
          }
        </Row>
      </main>
    );
  }
}
export default SlackIndexPage;
