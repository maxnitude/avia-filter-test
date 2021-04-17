import { useState, useEffect } from "react";
import Filters from "./components/Filters/Filters";
import TicketList from "./components/TicketList/TicketList";
import response from "./flights.json";

const App = () => {

  const allTickets = response.result.flights;
  const [tickets, setTickets] = useState(allTickets);
  const [airlinesList, setAirlinesList] = useState([]);
  const [sortingType, setSortingType] = useState("none");
  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    selectedAirlines: [],
    oneTransfer: false,
    withoutTransfer: false,
  });

  useEffect(() => {
    const companies = [];
    response.result.flights.forEach((ticket) => {
      if (!companies.find((item) => item.uid === ticket.flight.carrier.uid)) {
        companies.push(ticket.flight.carrier);
      }
    });
    setAirlinesList(companies);
  }, []);


  const mainFilter = (data, filters) => {

    let filteredData = data;

    if (filters.priceFrom !== "") {
      filteredData = filteredData.filter(
        (item) => +item.flight.price.total.amount > +filters.priceFrom
      );
    }

    if (filters.priceTo !== "") {
      filteredData = filteredData.filter(
        (item) => +item.flight.price.total.amount < +filters.priceTo
      );
    }
    if (filters.selectedAirlines.length !== 0) {
      filteredData = filteredData.filter((item) =>
      filters.selectedAirlines.includes(item.flight.carrier.uid)
      );
    }
    if (filters.oneTransfer) {
      filteredData = filteredData.filter((item) =>
        item.flight.legs.some((item) =>
          item.segments.some((segment) => segment.starting)
        )
      );
    }
    if (filters.withoutTransfer) {
      filteredData = filteredData.filter((item) =>
        item.flight.legs.every((item) =>
          item.segments.every((segment) => segment.starting === false)
        )
      );
    }
    return filteredData;
  }

  const sorting = (type, data = tickets) => {
    const ascendingPrice = (data) => {
        const byHighPrice = [...data].sort((prev, next) => {
          return +prev.flight.price.total.amount - +next.flight.price.total.amount;
        });
        setTickets(byHighPrice);
      };

      const descendingPrice = (data) => {
        const byLowPrice = [...data].sort((prev, next) => {
          return +next.flight.price.total.amount - +prev.flight.price.total.amount;
        });
        setTickets(byLowPrice);
      };

      const flightTime = (data) => {
        const byTimeInFly = [...data].sort((prev, next) => {
          return (
            prev.flight.legs.reduce((a, b) => a + b.duration, 0) - next.flight.legs.reduce((a, b) => a + b.duration, 0)
          );
        });
        setTickets(byTimeInFly);
      };

      if (type === "Sort Ascending") {
        ascendingPrice(data);
        setSortingType("Sort Ascending")
      } else if (type === "Sort Descending") {
        descendingPrice(data);
        setSortingType("Sort Descending")
      } else if (type === "Sort by time") {
        flightTime(data);
        setSortingType("Sort by time")
      } else setTickets(data)
 
  };

  const changeFilterSettings = (key, value) => {
    const airLinesFilter = (uid) => {
      let filteredAirlinesList = [...filters.selectedAirlines];
      if (filteredAirlinesList.includes(uid)) {
        const itemIndex = filteredAirlinesList.findIndex(item => item === uid);
        filteredAirlinesList = [...filteredAirlinesList.slice(0, itemIndex),
                            ...filteredAirlinesList.slice(itemIndex + 1)];
      } else {
        filteredAirlinesList.push(uid);
      }
      setFilters({ ...filters, selectedAirlines: filteredAirlinesList });
    };

    if (filters.hasOwnProperty(key)) {
      setFilters({ ...filters, [key]: value })

    } else if (key === "Select Airlines") {
      airLinesFilter(value)
    }
  }

  useEffect(() => {
    sorting(sortingType, mainFilter(allTickets, filters));
  }, [allTickets, filters, sortingType]);


  return (
    <div className="app">
      <Filters
        sorting={sorting}
        filtering={changeFilterSettings}
        filters={filters}
        airlinesList={airlinesList}
      />
      <TicketList tickets={tickets} />
    </div>
  );
};

export default App;
