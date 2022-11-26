import { Link } from "react-router-dom";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { mobile } from "../responsive";

const ItemContainer = styled.div`
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  ${mobile({ flexDirection: 'column'})}
`;

const ItemImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  ${mobile({ width: '100%'})}
`;
const ItemDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 2;
`;
const ItemTitle = styled.h1`
  font-size: 20px;
  color: #0071c2;
  margin-bottom:0;
  margin-top: 0;
`;
const ItemText = styled.span`
  font-size: 12px;
  font-size: ${(props) => props.type === "Price" && '26px'};
  font-size: ${(props) => props.type === "CancelOpSubtitle" && '11px'};
  font-weight: ${(props) => props.type === "Studio"|| "CancelOp" && 'bold'};
  font-weight: ${(props) => props.type === "grade" && '500'};
  color: ${(props) => props.type === "CancelOpSubtitle" && '#008009'};
  color: ${(props) => props.type === "CancelOp" && '#008009'};
`;
const ItemTaxiOp = styled.span`
  font-size: 12px;
  background-color: #008009;
  color: white;
  width: max-content;
  padding: 5px 10px;
  border-radius: 0.5rem;
  border: none;
`;
const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ItemRating = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ width: '30%'})}
`;
const ItemRatingBtn = styled.button`
  background-color: #003580;
  color: white;
  border: none;
  padding: 7px;
  font-size:14px;
  margin-right: 10px;
  font-weight: 600;
  border-top-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;
const ItemDetailTexts = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SeeHotelBtn = styled.button`
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  padding: 10px 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const SearchItem = ({ item }) => {
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/hotels/${item._id}`)
  };

  return (
    <ItemContainer>
      <ItemImg src ={item.photos[0]} />
            <ItemDesc>
                <ItemTitle>{item.name}</ItemTitle>
                    <ItemText>{item.distance}m from center</ItemText>
                    <ItemTaxiOp>Free airport taxi</ItemTaxiOp>
                    <ItemText type='Studio'>Studio Apartment with Air conditioning</ItemText>
                    <ItemText>{item.desc}</ItemText>
                    <ItemText type='CancelOp'>Free cancellation</ItemText>
                    <ItemText type="CancelOpSubtitle">You can cancel later, so lock in this great price today!</ItemText>
                    </ItemDesc>
                    <ItemDetails>
                    {item.rating &&
                        <ItemRating>
                            <ItemText type="grade">Excellent</ItemText>
                            <ItemRatingBtn>{item.rating}</ItemRatingBtn>
                        </ItemRating>}
                        <ItemDetailTexts>
                        <ItemText type='Price'>${item.cheapestPrice}</ItemText>
                        <ItemText>Includes taxes and fees</ItemText>
                        <SeeHotelBtn onClick={handleClick}>See availability</SeeHotelBtn>
                        </ItemDetailTexts>
                    </ItemDetails>
    </ItemContainer>
  )
}

export default SearchItem
