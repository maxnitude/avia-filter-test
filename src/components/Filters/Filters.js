import "./filters.scss";

const Filters = ({
  sorting,
  filtering,
  filters,
  airlinesList,
}) => {

  const handleFilter = (key, value) => {
    filtering(key, value)
  };

  const validator = (value) => {
      let changedValue = value.replace(/[^\d]/g,'');
      return changedValue
  }

  return (
    <div className="filters">
      <div className="sort">
        <p className="sort__name"><strong>Сортировать</strong></p>
        <label>
          <input name="sort" type="radio" value="toHighPrice" onClick={() => sorting("Sort Ascending")} />
          <span> - по возрастанию</span>
        </label>
        <label>
          <input name="sort" type="radio" value="toLowPrice" onClick={() => sorting("Sort Descending")} />
          <span> - по убыванию</span>
        </label>
        <label>
          <input name="sort" type="radio" value="timeInFly" onClick={() => sorting("Sort by time")} />
          <span> - по времени в пути</span>
        </label>
      </div>
      <div className="filter">
        <p className="filter__name"><strong>Фильтровать</strong></p>
        <label>
          <input
            type="checkbox"
            className="filter__oneTransfer"
            checked={filters.oneTransfer}
            onChange={(e) => handleFilter("oneTransfer", e.target.checked)}
          />
          <span>- 1 пересадка</span>
        </label>
        <label>
          <input
            type="checkbox"
            className="filter__withoutTransfer"
            checked={filters.withoutTransfer}
            onChange={(e) => handleFilter("withoutTransfer", e.target.checked)}
          />
          <span>- без пересадок</span>
        </label>
      </div>
      <div className="price">
        <p className="price__name"><strong>Цена</strong></p>
        <label>
          <span>От </span>
          <input
            type="search"
            placeholder="0"
            className="price__from"
            onChange={(e) => handleFilter("priceFrom", validator(e.target.value))}
            value={filters.priceFrom}
          />
        </label>
        <label>
          <span>До </span>
          <input
            type="search"
            placeholder="1000000"
            className="price__to"
            onChange={(e) => handleFilter("priceTo", validator(e.target.value))}
            value={filters.priceTo}
          />
        </label>
      </div>
      <div className="companies">
        <p className="company__name"><strong>Авиакомпании</strong></p>
        {airlinesList.length !== 0 &&
          airlinesList.map((item, index) => {
            return (
              <label key={index}>
                <input
                  type="checkbox"
                  className="company__input"
                  checked={filters.selectedAirlines.includes(item.uid)}
                  onChange={() => handleFilter("Select Airlines", item.uid)}
                />
                - {item.caption}
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default Filters;
