// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import SeatPicker from "react-seat-picker";
// import "./Seats.css";

// function Seats() {
//   const [selected, setSelected] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   let navigate = useNavigate();
//   const price = 30;
//   const totalprice = price * selected.length;

//   // Завантаження даних з JSON
//   useEffect(() => {
//     fetch("/Get_All.json")
//       .then((response) => response.json())
//       .then((data) => {
//         setRows(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Помилка завантаження місць:", error);
//         setLoading(false);
//       });
//   }, []);

//   const addSeatCallback = ({ row, number, id }, addCb) => {
//     setSelected((prevItems) => [...prevItems, number]);
//     addCb(row, number, id);
//   };

//   const removeSeatCallback = ({ row, number }, removeCb) => {
//     setSelected((list) => list.filter((item) => item !== number));
//     removeCb(row, number);
//   };

//   if (loading) {
//     return <h3>Завантаження місць...</h3>;
//   }

//   return (
//     <div className="seats">
//       <div className="screens">
//         <h3 className="screen">SCREEN</h3>
//       </div>

//       <h5 className="seat_price">CLASSIC $30</h5>
//       <SeatPicker
//         addSeatCallback={addSeatCallback}
//         removeSeatCallback={removeSeatCallback}
//         rows={rows}
//         alpha
//         maxReservableSeats={10}
//         visible
//       />
//       {selected.length !== 0 ? (
//         <>
//           <div className="seat-price">
//             <div className="seat-select">
//               <h1 className="seats-select">SEAT: {selected.toString()}</h1>
//             </div>
//             <div className="totalprice">
//               <h1 className="price">Price: ${totalprice}</h1>
//             </div>
//           </div>
//           <button
//             className="continue"
//             onClick={() =>
//               navigate("/Final", { state: { selectedSeats: selected, totalPrice: totalprice } })
//             }
//           >
//             Continue
//           </button>
//         </>
//       ) : null}
//     </div>
//   );
// }

// export default Seats;
