import { useState } from "react";
import TicketContent from "../Ticket/Ticket";
import "./ticket-list.scss";


const TicketList = ({ tickets }) => {
  const [counter, setCounter] = useState(2);
  const maxLength = tickets.length;
  const plusCounter = () => {
    const newCounter = Math.min(maxLength, counter + 2);
    setCounter(newCounter);
  };
  if (tickets.length === 0) {
    return <h4 className="message-alert">Билетов нет</h4>;
  }

  return (
    <div className="ticket-list">
      {tickets.slice(0, counter).map((ticket, index) => {
        return (
          <TicketContent
            key={index}
            ticket={ticket}
          />
        );
      })}

      {maxLength <= counter ? null : (
        <div className="view_more">
            <button onClick={plusCounter} className="view_more-button">
                <span className="view_more-button_sign"></span>
                <div className="view_more-button_title">
                    <span>Загрузить еще</span>
                </div>
            </button>
        </div>
      )}
    </div>
  );
};
export default TicketList;
