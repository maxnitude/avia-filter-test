import Segment from '../TicketSegment/TicketSegment'
import './ticket.scss';

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket">
      <div className="header">
        <div className="header__logo"></div>
        <span className="header__price">{ticket.flight.price.total.amount} &#8381;</span>
        <span className="header__price-info">Стоимость для одного взрослого пассажира</span>
      </div>
      <div className="content">
        {ticket.flight.legs.map((item) => {
          return item.segments.map((segment, index) => {
            return (
                <div key={index}>
                    <Segment segment={segment} />
                    <hr/>
                </div>
            );
          });
        })}
      </div>
      <button className="ticket-button">ВЫБРАТЬ</button>
    </div>
  );
};

export default Ticket;
