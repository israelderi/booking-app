import styled from "styled-components";
import { BsFillPersonFill, BsCalendarDay } from 'react-icons/bs';
import { FaTaxi, FaPlane, FaCarAlt } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';
import { MdAttractions } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import bgHeader from '../imges/header.png'
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import { mobile } from "../responsive";


const HeaderCompo = styled.div`
  width:100%;
  color: white;
  display: flex;
  justify-content: center;
  position: relative;
  background-image: url(${(props) => props.bg}); 
  background-size: cover;
  background-size: 100% 83%;
  background-repeat: no-repeat;
  background-color: #003580;
  background-position: bottom;
  ${mobile({ backgroundSize: "100% 78%" })} 
`;


const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 20px 0px 100px 0px;
  margin: ${(props) => props.type === "list" && '20px 0px 0px 0px'}; 
      
`;

const HeaderList = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  margin-bottom: 50px;
  ${mobile({ display: "grid", gridTemplateColumns: '1fr 1fr 1fr ', gap: '14px', maxWidth: "90%", marginLeft: "10px" })}; 
`;

const HeaderListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: center;
  font-size: 15px;
  border: ${(props) => props.type === "Activ" && '1px solid white'};
  padding: ${(props) => props.type === "Activ" && '12px 15px'};
  width: ${(props) => props.type === "Activ" && '70px'};
  border-radius: ${(props) => props.type === "Activ" && '2rem'};
  background-color: ${(props) => props.type === "Activ" && '#0f448d'};
`;
const HeaderTitle = styled.h1`
  font-size:50px;
  ${mobile({ fontSize: "35px", marginLeft: "20px" })} 
`;

const HeaderDesc = styled.p`
 margin: 20px 0px;
 letter-spacing: 3px;
 font-weight: 100;
 font-size: 20px;
 opacity:0.9;
 ${mobile({ fontSize: "15px", marginLeft: "20px" })} 
`;
const HeaderBtn = styled.button`
 background-color: #0071c2;
  color: white;
  font-weight: 800;
  border: none;
  padding: 15px;
  cursor: pointer; 
  :hover{
    background-color: #087fd4;
  }
  ${mobile({ marginLeft: '20px' })}
`;
const SearchBtn = styled.button`
 background-color: #0071c2;
  color: white;
  font-weight: 800;
  border: none;
  padding: 15px;
  cursor: pointer;
  width: 120px;
  height: 100%;
  font-size: 18px; 
  :hover{
    background-color: #087fd4;
  }
  ${mobile({ width: '97%', height: '95%', marginLeft: '5px', padding: '0px' })}
`;
const HeaderSearch = styled.div`
  height: 50px;
  background-color: #febb02;
  border: 4px solid #febb02;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0px 0px;
  border-radius: 0.5rem;
  position: absolute;
  bottom: -25px;
  width: 100%;
  max-width: 1024px;
  ${mobile({ display: "grid", gridTemplateColumns: '1fr', height: "200px", width: "90%", bottom: "-140px", left: 17 })} 
`;
const HeaderSearchItem = styled.div`
  display: flex;
  align-items: center;
  text-align:center;
  gap: 10px;
  background-color: white;
  height:100%;
  width:100%;
  margin:0 5px;
  color:lightgray;
  padding: 0 15px;
  ${mobile({ height: "97%", width: "89%" })}
`;
const HeaderSearchInput = styled.input`
  border: none;
  outline: none;
`;
const HeaderSearchText = styled.span`
  color: lightgray;
  cursor: pointer;
`;
const DateCon = styled.div`
  position: absolute;
  top: 50px;
  z-index: 2;
  ${mobile({ top: '85px' })}
`;
const Options = styled.div`
  z-index: 2;
  position: absolute;
  top: 50px;
  background-color: white;
  color: gray;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  ${mobile({ top: '130px' })}
`;
const OptionsItem = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;
const OptionCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: black;
`;
const OptionsBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #0071c2;
  color: #0071c2;
  cursor: pointer;
  background-color: white;
  border-radius:3px;
  :disabled{
    cursor: not-allowed;
  }
`;

const Header = ({ type }) => {

  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <HeaderCompo bg={type === 'list' ? '' : bgHeader}>
      <HeaderContainer type={type}>
        <HeaderList>
          <HeaderListItem type='Activ'>
            <IoIosBed /> <span>Stays</span>
          </HeaderListItem>
          <HeaderListItem>
            <FaPlane /> <span>Flights</span>
          </HeaderListItem>
          <HeaderListItem>
            <FaCarAlt /> <span> Car rentals</span>
          </HeaderListItem>
          <HeaderListItem>
            <MdAttractions /> <span>Attractions</span>
          </HeaderListItem>
          <HeaderListItem>
            <FaTaxi /> <span>Airport taxis</span>
          </HeaderListItem>
        </HeaderList>
        {type !== 'list' &&
          <>
            <HeaderTitle>Save 15% with Late <br />Escape Deals</HeaderTitle>
            <HeaderDesc>There’s still time to check one more destination off your wishlist<br />Created By Israel Deri Full Stack Developer</HeaderDesc>
            <a href="https://www.linkedin.com/in/deriisrael/"> <HeaderBtn>my Linkedin Profile</HeaderBtn> </a>
            <HeaderSearch>
              <HeaderSearchItem>
                <IoIosBed />
                <HeaderSearchInput type='text' placeholder="Where are you going?" onChange={(e) => setDestination(e.target.value)} />
              </HeaderSearchItem>
              <HeaderSearchItem>
                <BsCalendarDay />
                <HeaderSearchText onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</HeaderSearchText>
                {openDate && <DateCon>
                  <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                </DateCon>}
              </HeaderSearchItem>
              <HeaderSearchItem>
                <BsFillPersonFill />
                <HeaderSearchText onClick={() => setOpenOptions(!openOptions)}>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</HeaderSearchText>
                {openOptions && <Options>
                  <OptionsItem>
                    <AiFillCloseCircle size={'25px'} color='red' onClick={() => setOpenOptions(!openOptions)} />
                  </OptionsItem>
                  <OptionsItem>
                    <HeaderSearchText>adult</HeaderSearchText>
                    <OptionCounter>
                      <OptionsBtn disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</OptionsBtn>
                      <HeaderSearchText>{options.adult}</HeaderSearchText>
                      <OptionsBtn onClick={() => handleOption("adult", "i")}>+</OptionsBtn>
                    </OptionCounter>
                  </OptionsItem>
                  <OptionsItem>
                    <HeaderSearchText>children</HeaderSearchText>
                    <OptionCounter>
                      <OptionsBtn disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>-</OptionsBtn>
                      <HeaderSearchText>{options.children}</HeaderSearchText>
                      <OptionsBtn onClick={() => handleOption("children", "i")}>+</OptionsBtn>
                    </OptionCounter>
                  </OptionsItem>
                  <OptionsItem>
                    <HeaderSearchText>room</HeaderSearchText>
                    <OptionCounter>
                      <OptionsBtn disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</OptionsBtn>
                      <HeaderSearchText>{options.room}</HeaderSearchText>
                      <OptionsBtn onClick={() => handleOption("room", "i")}>+</OptionsBtn>
                    </OptionCounter>
                  </OptionsItem>
                </Options>}
              </HeaderSearchItem>
              <SearchBtn onClick={handleSearch}>Search</SearchBtn>
            </HeaderSearch></>}
      </HeaderContainer>
    </HeaderCompo>
  )
}

export default Header
