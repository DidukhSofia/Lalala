import React, { Component } from 'react';
import './Seat.css';

class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeats: [],
      purchasedSeats: [],
    };
  }

  componentDidMount() {
    const savedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const savedPurchasedSeats = JSON.parse(localStorage.getItem('purchasedSeats')) || [];

    this.setState({
      selectedSeats: savedSelectedSeats,
      purchasedSeats: savedPurchasedSeats,
    });
  }

  selectSeat(row, column) {
    const { selectedSeats, purchasedSeats } = this.state;

    if (purchasedSeats.some(s => s.row === row && s.column === column)) {
      return;
    }

    const isSelected = selectedSeats.some(s => s.row === row && s.column === column);

    if (isSelected) {
      const updatedSeats = selectedSeats.filter(seat => seat.row !== row || seat.column !== column);
      this.setState({ selectedSeats: updatedSeats }, () => {
        localStorage.setItem('selectedSeats', JSON.stringify(updatedSeats));
      });
      console.log(`Seat unselected: Row ${row}, Column ${column}`);
    } else {
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

    const newPurchasedSeats = [...purchasedSeats, ...selectedSeats];

    this.setState({ 
      purchasedSeats: newPurchasedSeats,
      selectedSeats: [],
    }, () => {
      localStorage.setItem('purchasedSeats', JSON.stringify(newPurchasedSeats));
      localStorage.removeItem('selectedSeats'); 
    });

    console.log('Payment successful!');
  }

  resetSelection() {
    this.setState({ selectedSeats: [] }, () => {
      localStorage.removeItem('selectedSeats');
    });
    console.log('Selection reset');
  }

  render() {
    const { selectedSeats, purchasedSeats } = this.state;
    const { seats } = this.props;

    console.log("Seats in Seat component:", seats); // Логування даних

    if (!seats || seats.length === 0) {
      return <div>No seats available for this session.</div>;
    }

    const rows = 10;
    const columns = 15;
    const seatGrid = Array.from({ length: rows }, () => Array(columns).fill(null));

    seats.forEach(seat => {
      const isSelected = selectedSeats.some(s => s.row === seat.row && s.column === seat.column);
      const isPurchased = purchasedSeats.some(s => s.row === seat.row && s.column === seat.column);
      const isAvailable = !isSelected && !isPurchased;

      seatGrid[seat.row - 1][seat.column - 1] = (
        <div
          className={`Seat
            ${isSelected ? "selected" : ""}
            ${isPurchased ? "purchased" : ""}
            ${isAvailable ? "available" : ""}
          `}
          key={`${seat.row}-${seat.column}`}
          onClick={() => this.selectSeat(seat.row, seat.column)}
          title={isPurchased ? "Seat already paid for" : "Click to select"}
          style={{
            pointerEvents: isPurchased ? 'none' : 'auto'
          }}
        >
          {seat.row}-{seat.column}
        </div>
      );
    });

    return (
      <div>
        <h1>Seat Selection</h1>
        <div>
          {seatGrid.map((row, rowIndex) => (
            <div className="Row" key={rowIndex}>
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