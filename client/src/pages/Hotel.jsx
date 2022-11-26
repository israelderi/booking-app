import styled from "styled-components";
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import Email from '../components/Email';
import Footer from '../components/Footer';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import Reserve from "../components/Reserve";
import { AuthContext } from "../context/AuthContext";
import { mobile } from "../responsive";

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  ${mobile({margin: "10px"})}
`;
const Slider = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.613);
  z-index: 999;
  display: flex;
  align-items: center;
`;
const IconStyle = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: lightgray;
  cursor: pointer;
`;
const IconArrow = styled.span`
  margin: 20px;
  font-size: 50px;
  color: lightgray;
  cursor: pointer;
  ${mobile({display: 'none'})}
`;
const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SliderImg = styled.img`
  width: 80%;
  height: 80vh;
  border-radius: 0.5rem;
`;
const HotelWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;
const BookNowBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 0;
  border: none;
  padding: 10px 20px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  ${mobile({display: 'none'})}
`;
const HotelTitle = styled.h1`
  font-size: 24px;
  font-size: ${(props) => props.type === "price" && '17px'};
  color: ${(props) => props.type === "price" && 'gray'};
`;
const HotelAddress = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const HoteText = styled.span`
font-weight: 500;
  color: ${(props) => props.type === "Distance" && '#0071c2'};
  color: ${(props) => props.type === "hotelPriceHighlight" && '#008009'};
  font-size: ${(props) => props.type === "price" && '12px'};
  font-weight: ${(props) => props.type === "price" && 100};
`;
const HotelImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const HotelImgWrapper = styled.div`
  width: 33%;
  ${mobile({width: '50%'})}
`;
const HotelImg = styled.img`
  width: 100%;
  height:300px;
  object-fit: cover;
  cursor: pointer;
`;
const HotelDetails = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  ${mobile({flexDirection: 'column'})}
`;
const HotelDetailsTexts = styled.div`
  flex: 3;
`;
const HotelDesc = styled.p`
  font-size: 13px;
  margin-top: 20px;
`;
const HotelDetailsPrice = styled.div`
  flex: 1;
  background-color: #ebf3ff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 0.5rem;
`;
const HotelPrice = styled.h2`
  font-weight: 300;
`;
const HotelPriceBtn = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
`;

const Hotel = () => {
  
  const [slidIndex, setSlidIndex] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenSlider = (i) => {
    setSlidIndex(i);
    setOpenSlider(true);
  };

  const MoveSlider = (direction) => {
    let newSlideNumber;

    if (direction === "left") {
      newSlideNumber = slidIndex === 0 ? 5 : slidIndex - 1;
    } else {
      newSlideNumber = slidIndex === 5 ? 0 : slidIndex + 1;
    }

    setSlidIndex(newSlideNumber)
  };

  const { date, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(date[0].endDate, date[0].startDate);

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
    
  };

  return (
    <>
      <NavBar />
      <Header type='list' />
      {loading ? (
        "loading"
      ) : (
      <HotelContainer>
        {openSlider && (
          <Slider>
            <IconStyle><AiFillCloseCircle onClick={() => setOpenSlider(false)} /></IconStyle>
            <IconArrow><BsFillArrowLeftCircleFill onClick={() => MoveSlider("left")} /></IconArrow>
            <SliderWrapper>
              <SliderImg src={data.photos[slidIndex]} alt="" />
            </SliderWrapper>
            <IconArrow><BsFillArrowRightCircleFill onClick={() => MoveSlider("right")} /></IconArrow>
          </Slider>
        )}
        <HotelWrapper>
          <BookNowBtn>Book Now!</BookNowBtn>
          <HotelTitle>{data.name}</HotelTitle>
          <HotelAddress>
            <MdLocationOn />
            <HoteText>{data.address}</HoteText>
          </HotelAddress>
        <HoteText type='Distance'>Excellent location – {data.distance}m from center</HoteText>
        <HoteText type='hotelPriceHighlight'>`Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi`</HoteText>
        <HotelImages>
            {data.photos?.map((photo, i) => (
              <HotelImgWrapper key={i}>
                 <HotelImg onClick={() => handleOpenSlider(i)} src={photo} />
              </HotelImgWrapper>
            ))}
        </HotelImages>
        <HotelDetails>
          <HotelDetailsTexts>
            <HotelTitle>{data.title}</HotelTitle>
            <HotelDesc>{data.desc}</HotelDesc>
          </HotelDetailsTexts>
             <HotelDetailsPrice>
             <HotelTitle type='price'>Perfect for a {days}-night stay!</HotelTitle>
             <HoteText type='price'>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</HoteText>
             <HotelPrice><b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}nights)</HotelPrice>
             <HotelPriceBtn onClick={handleClick}>Reserve or Book Now!</HotelPriceBtn>
            </HotelDetailsPrice>
        </HotelDetails>
        </HotelWrapper>
        <Email />
        <Footer />
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
      </HotelContainer>)}
    </>
  )
}

export default Hotel
