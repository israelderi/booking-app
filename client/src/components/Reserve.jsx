//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from 'react-icons/ai';
import { mobile } from "../responsive";

const ReserveCom = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.418);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  background-color: white;
  border-radius: 2rem;
  padding: 30px;
  position: relative;
  ${mobile({margin: '20px'})}
`;
const Span = styled.span`
 font-weight: 900;
 font-size: 20px;
 color: #0071c2;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 20px;
`;
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Title = styled.div`
 font-weight: 900;
 color: green;
`;
const Desc = styled.div`
 font-weight: 300;
 color: gray;
`;
const MaxPeople = styled.div`
 font-size: 12px;
 font-weight: 900;
`;
const Price = styled.div`
 font-weight: 900;
`;
const SelectRooms = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 8px;
  color: gray;
`;
const Room = styled.div`
  display: flex;
  flex-direction: column;
`;
const Checkboxinp = styled.input`
 
`;
const RoomNumber = styled.label`
 
`;
const IconClose = styled.span`
 position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  margin: 10px;
  font-size: 30px;
  color: gray;
`;
const Button = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
`;



const Reserve = ({ setOpen, hotelId }) => {

    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { date } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const alldates = getDatesInRange(date[0].startDate, date[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    };

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: alldates,
                    });
                    return res.data;
                })
            );
            setOpen(false);
            navigate("/");
        } catch (err) { }
    };
    return (
        <ReserveCom>
            <Container>
                <IconClose><AiFillCloseCircle onClick={() => setOpen(false)}/></IconClose>
                <Span>Select your rooms:</Span>
                {data.map((item) => (
                    <Item key={item._id}>
                        <ItemInfo>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <MaxPeople>
                                Max people: <b>{item.maxPeople}</b>
                            </MaxPeople>
                            <Price>${item.price}</Price>
                        </ItemInfo>
                        <SelectRooms>
                            {item.roomNumbers.map((roomNumber) => (
                                <Room>
                                    <RoomNumber>{roomNumber.number}</RoomNumber>
                                    <Checkboxinp
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </Room>
                            ))}
                        </SelectRooms>
                    </Item>
                ))}
                <Button onClick={handleClick}>
                    Reserve Now!
                </Button>
            </Container>
        </ReserveCom>
    );
};

export default Reserve;