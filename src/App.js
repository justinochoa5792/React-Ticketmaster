import { useState } from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import "./App.css";

import NavBar from "./component/NavBar";

function App() {
  const [value, setValue] = useState("");
  const [tickets, setTickets] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${value}&countryCode=US&apikey=${process.env.REACT_APP_API}`
    );
    console.log(response.data._embedded.events);
    setTickets(response.data._embedded.events);
  };

  const renderEvents = () => {
    return tickets.map((tics) => {
      return (
        <ul>
          <li>
            <strong>{tics.name}</strong>
          </li>
          <li>
            <strong>Info: </strong>
            {tics.info}
          </li>
          <li>
            <strong>Please Note: </strong>
            {tics.pleaseNote}
          </li>
        </ul>
      );
    });
  };
  return (
    <div className="App">
      <NavBar />
      <h1>TicketMaster</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          name="searchText"
          value={value}
          onChange={handleChange}
          label="Search for Events"
          fullWidth={true}
        />
      </form>
      {renderEvents()}
    </div>
  );
}

export default App;
