import Line from "../../images/line.svg";
import "./Seat.css"

import React, { Component } from 'react';
import { CiAlarmOn, CiLocationOn } from 'react-icons/ci'; // Adjust imports as necessary
import { BsCalendar2Date } from 'react-icons/bs';

class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: 'Loading...',
      posterPath: '/default-poster.jpg', // Default poster if not found
      sessionStartTime: null,
      sessionEndTime: null,
      sessionPrice: null,
    };
  }

  componentDidMount() {
    const { sessionId } = this.props;

    // Fetch session data
    fetch(`https://localhost:7230/api/Sessions/${sessionId}`)
      .then(response => response.json())
      .then(session => {
        if (!session || !session.movieId) {
          throw new Error('Invalid session data');
        }

        // Fetch movie data based on session's movieId
        return fetch(`https://localhost:7230/api/Movie/${session.movieId}`)
          .then(response => response.json())
          .then(movie => {
            // Now that we have both session and movie data, update the state
            this.setState({
              movieName: movie.filmName || 'Film not found',
              posterPath: movie.posterPath || '/default-poster.jpg',
              sessionStartTime: session.startTime,
              sessionEndTime: session.endTime,
              sessionPrice: session.price,
            });
          });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({
          movieName: 'Data not available',
          posterPath: '/default-poster.jpg',
        });
      });
  }

  // Format date and time (you can adjust the format as needed)
  formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
    return new Date(date).toLocaleTimeString('en-GB', options);
  }
  

  render() {
    return (
      <section className="widget">
        <div>
          <div className="widget-container">
            <img src={this.state.posterPath} alt={this.state.movieName} className="widget-poster" />
            <div className="widget-container-text">
              <h1 className="widget__name">{this.state.movieName}</h1>
              <div className="widget__format">
                <p className="format">2D</p>
                <p className="format">SDH</p>
              </div>
              <div className="widget-container__time">
                <CiAlarmOn style={{ color: "grey", fontSize: "20px" }} />
                <p className="widget__time">
                  <strong>Час {this.formatTime(this.state.sessionStartTime)} <strong>-</strong> {this.formatTime(this.state.sessionEndTime)}</strong>
                </p>
              </div>
              <div className="widget__date">
                <BsCalendar2Date style={{ color: "grey", fontSize: "20px" }} />
                <p className="widget__current-date"><strong>{this.formatDate(this.state.sessionStartTime)}</strong></p>
              </div>
              <div className="widget-container__location">
                <CiLocationOn style={{ color: "grey", fontSize: "20px" }} />
                <p className="widget__location"><strong>Lux Cinema Theatre</strong></p>
              </div>
            </div>
          </div>

          <div className="widget__seatplan">
            <div className="widget__seat-reserved">
              <div className="widget-container__price">
                <p className="widget__red-block"></p>
                <p className="widget__price">Super Lux - {this.state.sessionPrice} грн</p>
              </div>
              <div className="widget-reserved">
                <p className="widget__grey-block"></p>
                <p className="widget__text">Заброньовано</p>
              </div>
            </div>
            <img src={Line} alt="Seat Plan Divider" className="widget__seatplan-line" />
            <p className="widget__screen">Екран</p>

            {/* Replace this with your actual seat grid rendering logic */}
            <div>
              {/* Example seat rendering */}
              <div className="Row">Row 1: Seat 1, Seat 2</div>
              <div className="Row">Row 2: Seat 1, Seat 2</div>
            </div>
          </div>
        </div>

        <div className='widget__cart'>
          <div className='widget__cart-btn' style={{ textAlign: 'center', backgroundColor: 'white' }}>
            <button className="widget__button">
              Pay
            </button>
            <button
              className="widget__button"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Clear All Seats
            </button>
          </div>
          <div className="widget__cart-info">
            <p>Куплено білетів: {/* Insert purchased seats count here */}</p>
            {/* Insert purchased seats details here */}
          </div>
        </div>
      </section>
    );
  }
}

export default Seat;
