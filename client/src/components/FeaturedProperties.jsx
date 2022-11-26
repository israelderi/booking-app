import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { mobile } from "../responsive";

const FpContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  ${mobile({flexDirection: 'column'})}
`;
const FpItem = styled.div`
  flex: 1;
  gap: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${mobile({ margin: '0px 30px'})}
`;
const FpImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
`;
const FpText = styled.span`
color: #333;
font-weight: ${(props) => props.type === "name" && 'bold'};
font-weight: ${(props) => props.type === "city" && 100};
font-weight: ${(props) => props.type === "price" && 600};
font-size: ${(props) => props.type === "rating" && '14px'};
font-size: ${(props) => props.type === "name" && '18px'};
`;
const FpRating = styled.div``;

const FpRatingBtn = styled.button`
  background-color: #003580;
  color: white;
  border: none;
  padding: 5px;
  margin-right: 10px;
  font-weight: 500;
  border-top-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;

const FeaturedProperties = () => {

  const navigate = useNavigate();
    const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
    return (
        <FpContainer>
             {loading ? (
        "Loading"
      ) : (
        <>
        {data.map((item) => (
             <FpItem key={item._id} onClick={()=> navigate(`/hotels/${item._id}`)}>
                <FpImg src={item.photos[0]} />
                <FpText type='name'>{item.name}</FpText>
                <FpText type='city'>{item.city}</FpText>
                <FpText type='price'>Starting from ${item.cheapestPrice}</FpText>
                {item.rating &&(
                <FpRating>
                    <FpRatingBtn>{item.rating}</FpRatingBtn>
                    <FpText type='rating'>Very Good</FpText>
                </FpRating>)}
            </FpItem> 
            ))}
            </>
            )}
        </FpContainer>
    )
}

export default FeaturedProperties
