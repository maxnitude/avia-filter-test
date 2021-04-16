import moment from "moment";
import "moment/locale/ru";
import "./ticket-segment.scss";

const TicketSegment = ({ segment }) => {
  let hours = (segment.travelDuration / 60).toFixed(0),
    minutes = segment.travelDuration % 60,
    travelDurationHours = hours === 0 ? null : hours + " ч",
    travelDurationMinutes = minutes === 0 ? null : minutes + " мин",
    departureTime = moment(segment.departureDate).format("H:mm"),
    departureDate = moment(segment.departureDate).format("DD MMM ddd").toLowerCase(),
    arrivalTime = moment(segment.arrivalDate).format("H:mm"),
    arrivalDate = moment(segment.arrivalDate).format("DD MMM ddd").toLowerCase();

  const transfer = segment.starting ? (
    <div className="transfer__count">1 пересадка</div>
  ) : null;

  return (
    <div className="flight-to">
      <div className="firstLine">
        <span className="firstLine__from">
          {segment.departureCity?.caption}
        </span>
        <span className="firstLine__from">
          , {segment.departureAirport.caption}{" "}
        </span>
        <span className="firstLine__uid-from">
          ({segment.departureAirport.uid})
        </span>
        <i className="firstLine__arrow-icon"> &rarr; </i>
        <span className="firstLine__to">{segment.arrivalCity?.caption}</span>
        <span className="firstLine__to">
          , {segment.arrivalAirport.caption}{" "}
        </span>
        <span className="firstLine__uid-to">
          ({segment.arrivalAirport.uid})
        </span>
      </div>
      <div className="secondLine">
        <p className="fly-from">
          <span className="time">{departureTime}</span>
          <span className="date">{departureDate}</span>
        </p>

        <p className="totalTime">
          {travelDurationHours} {travelDurationMinutes}
        </p>
        <p className="fly-to">
          <span className="date">{arrivalDate}</span>
          <span className="time">{arrivalTime}</span>
        </p>
      </div>
      <div className="transfer">
        <div className="transfer__line">{transfer}</div>
      </div>
      <div className="companyName">
        <p className="companyName__content">
          Рейс выполняет: {segment.airline.caption}
        </p>
      </div>
    </div>
  );
};

export default TicketSegment;
