import { useState } from "react";
import TicketContent from "../Ticket/Ticket";
import "./ticket-list.scss";


const TicketList = ({ tickets }) => {
  const [counter, setCounter] = useState(2);
  const maxLength = tickets.length;

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
            <button onClick={() => setCounter(Math.min(maxLength, counter + 2))} className="view_more-button">
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
