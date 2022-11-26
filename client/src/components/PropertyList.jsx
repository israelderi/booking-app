import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { mobile } from "../responsive";

const ProperContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  ${mobile({display: "none"})}
`;

const ProperItem = styled.div`
  flex:1;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
`;

const ProperImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProperTitles = styled.div``;

const ProperText = styled.h1`
font-size: 18px;
color: #444;
font-size: ${(props) => props.type === "propNum" && '14px'};
font-weight: ${(props) => props.type === "propNum" && '300'};
`;

const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotels/countByType");

    const images = [
        "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
        "https://q-xx.bstatic.com/xdata/images/hotel/300x240/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
        "https://q-xx.bstatic.com/xdata/images/hotel/300x240/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=",
        "https://r-xx.bstatic.com/xdata/images/hotel/300x240/52979454.jpeg?k=6ac6d0afd28e4ce00a8f817cc3045039e064469a3f9a88059706c0b45adf2e7d&o=",
      ];

    return (
        <ProperContainer>
            {loading ? (
        "loading"
      ) : (
        <>
        {data &&
            images.map((img,i) => (
            <ProperItem key={i}>
                <ProperImg src= {img}/>
                <ProperTitles>
                    <ProperText>{data[i]?.type}</ProperText>
                    <ProperText type='propNum'>{data[i]?.count} {data[i]?.type}</ProperText>
                </ProperTitles>
            </ProperItem>
            ))}
        </>
        )}
        </ProperContainer>
    )
}

export default PropertyList
