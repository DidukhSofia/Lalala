import React, { Component } from 'react';
import './Seat.css';

class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: null,   // Store movie data
      selectedSeats: [],  // Track selected seats before payment
      purchasedSeats: [], // Track permanently purchased seats
    };
  }

  componentDidMount() {
    // Fetch movie data
    fetch('/Get_All.json')  // Assuming movies.json is in the public folder
      .then(response => response.json())
      .then(data => {
        console.log("Movie Data:", data);  // Log the fetched data to check its structure
        this.setState({ movieData: data });

        // Завантаження стану з localStorage
        const savedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
        const savedPurchasedSeats = JSON.parse(localStorage.getItem('purchasedSeats')) || [];

        this.setState({
          selectedSeats: savedSelectedSeats,
          purchasedSeats: savedPurchasedSeats,
        });
      })
      .catch(error => console.error('Error loading the movie data:', error));
  }

  selectSeat(row, column) {
    const { selectedSeats, purchasedSeats } = this.state;

    // Перевірка, чи місце вже куплено (не можна зняти вибір)
    if (purchasedSeats.some(s => s.row === row && s.column === column)) {
      return;
    }

    const isSelected = selectedSeats.some(s => s.row === row && s.column === column);

    if (isSelected) {
      // Видалити місце з вибраних (лише якщо воно не куплене)
      const updatedSeats = selectedSeats.filter(seat => seat.row !== row || seat.column !== column);
      this.setState({ selectedSeats: updatedSeats }, () => {
        localStorage.setItem('selectedSeats', JSON.stringify(updatedSeats));
      });
      console.log(`Seat unselected: Row ${row}, Column ${column}`);
    } else {
      // Додати місце до вибраних
      const updatedSeats = [...selectedSeats, { row, column }];
      this.setState({ selectedSeats: updatedSeats }, () => {
        localStorage.setItem('selectedSeats', JSON.stringify(updatedSeats));
      });
      console.log(`Seat selected: Row ${row}, Column ${column}`);
    }
  }

  handlePayment() {
    const { selectedSeats, purchasedSeats } = this.state;

    if (selectedSeats.length === 0) {
      console.log('No seats selected for payment.');
      return;
    }

    // Додаємо вибрані місця до куплених
    const newPurchasedSeats = [...purchasedSeats, ...selectedSeats];

    this.setState({ 
      purchasedSeats: newPurchasedSeats,
      selectedSeats: [],
    }, () => {
      localStorage.setItem('purchasedSeats', JSON.stringify(newPurchasedSeats));
      localStorage.removeItem('selectedSeats');  // Очищуємо тимчасові вибрані місця
    });

    console.log('Payment successful!');
  }

  resetSelection() {
    // Скидає лише вибрані місця, але не куплені
    this.setState({ selectedSeats: [] }, () => {
      localStorage.removeItem('selectedSeats');
    });
    console.log('Selection reset');
  }

  render() {
    const { movieData, selectedSeats, purchasedSeats } = this.state;

    if (!movieData) {
      return <div>Loading...</div>;
    }

    const movie = movieData.movies[0]; // Get the first movie (you can change this to loop through movies if needed)

    // Create an empty array for seats based on hall configuration
    const seats = Array.from({ length: 10 }, () => Array(15).fill(null));

    // Map over the session seats and fill the seats array
    movie.sessions.forEach(session => {
      session.seats.forEach(seat => {
        const isSelected = selectedSeats.some(s => s.row === seat.row && s.column === seat.column);
        const isPurchased = purchasedSeats.some(s => s.row === seat.row && s.column === seat.column);
        const isAvailable = !isSelected && !isPurchased;

        seats[seat.row - 1][seat.column - 1] = (
          <div
            className={`Seat
              ${isSelected ? "selected" : ""}
              ${isPurchased ? "purchased unavailable" : ""}
              ${isAvailable ? "available" : ""}
            `}
            key={`${seat.row}-${seat.column}`}
            onClick={() => this.selectSeat(seat.row, seat.column)}
            title={isPurchased ? "Seat already paid for" : "Click to select"}
            style={{
              pointerEvents: isPurchased ? 'none' : 'auto'  // Вимикає куплені місця
            }}
          >
            {/* Empty text content or you can add some representation */}
          </div>
        );
      });
    });

    return (
      <div>
        <h1>{movie.filmName}</h1>
        <div>
          {seats.map((row, rowIndex) => (
            <div className={`Row`} key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
              {row}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => this.handlePayment()} 
            disabled={selectedSeats.length === 0}
          >
            {selectedSeats.length === 0 ? 'Select seats' : 'Pay'}
          </button>
          
          {selectedSeats.length > 0 && (
            <button onClick={() => this.resetSelection()} style={{ marginLeft: '10px' }}>
              Reset Selection
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Seat;
