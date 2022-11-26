import styled from "styled-components";
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../components/SearchItem";
import useFetch from "../hooks/useFetch";
import { mobile } from "../responsive";

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  ${mobile({ flexDirection: 'column'})}
`;
const ListWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  gap: 20px;
  ${mobile({ flexDirection: 'column'})}
`;
const ListSearch = styled.div`
  flex: 1;
  background-color: #febb02;
  padding: 10px;
  border-radius: 10px;
  position: sticky;
  top: 10px;
  height: max-content;
  ${mobile({ position: 'static', margin: '40px'})}
`;
const ListTitle = styled.h1`
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;
`;
const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;
const ListInp = styled.input`
  height: 30px;
  border: none;
  padding: 5px 10px;
  width: ${(props) => props.type === "number" && '50px'};
  border-radius: 4px;
`;
const InpLabel = styled.label`
  font-size: 12px;
`;
const SpanDate = styled.span`
  height: 30px;
  padding: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
`;
const OptionsCon = styled.div`
  padding: 10px;
`;
const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #555;
  font-size: 12px;
`;
const ListBtn = styled.button`
  padding: 10px;
  background-color: #0071c2;
  color: white;
  border: none;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
`;
const ListResult = styled.div`
  flex: 3;
`;

const List = () => {

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <>
      <NavBar />
      <Header type='list' />
      <ListContainer>
        <ListWrapper>
            <ListSearch>
              <ListTitle>Search</ListTitle>
                <ListItem>
                  <InpLabel>Destination</InpLabel>
                  <ListInp placeholder={destination} type="text" />
                </ListItem>
                <ListItem>
                  <InpLabel>Check-in Date</InpLabel>
                  <SpanDate onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</SpanDate>
                  {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
                </ListItem>
                <ListItem>
                  <InpLabel>Options</InpLabel>
                  <OptionsCon>
                    <OptionItem>
                    <InpLabel>Min price per night</InpLabel>
                    <ListInp onChange={(e) => setMin(e.target.value)} type="number" placeholder='0' />
                    </OptionItem>
                    <OptionItem>
                    <InpLabel>Max price per night</InpLabel>
                    <ListInp onChange={(e) => setMax(e.target.value)} type="number" placeholder='0' />
                    </OptionItem>
                    <OptionItem>
                    <InpLabel>Adult</InpLabel>
                    <ListInp min={1} type="number" placeholder={options.adult} />
                    </OptionItem>
                    <OptionItem>
                    <InpLabel>Children</InpLabel>
                    <ListInp min={0} type="number" placeholder={options.children} />
                    </OptionItem>
                    <OptionItem>
                    <InpLabel>Room</InpLabel>
                    <ListInp min={1} type="number" placeholder={options.room} />
                    </OptionItem>
                  </OptionsCon>
                </ListItem>
                <ListBtn onClick={handleClick}>Search</ListBtn>
            </ListSearch>
            <ListResult>
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}  
            </ListResult>
        </ListWrapper>
      </ListContainer>
    </>
  )
}

export default List
