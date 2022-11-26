import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { mobile } from "../responsive";

const FeaturedContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  z-index: 1;
  overflow-x: scroll;
  ${mobile({marginTop:"120px", flexDirection: 'column', height:'750px'})}
`;

const FeaturedItem = styled.div`
  position: relative;
  flex: 1;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  height: 250px;
  ${mobile({margin: '0px 20px'})}
`;

const FeaturedItemTitels = styled.div`
  position: absolute;
  top: 5px;
  left: 20px;
  ${mobile({})}
`;
const FeaturedItemText = styled.h1`
 font-size: 30px;
 font-size: ${(props) => props.type === "properties" && '20px'};
 text-shadow: 1px 1px 2px black;
 ${mobile({"font-size":"20px"})}
`;

const FeaturedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity:0.8;
`;

const Featured = () => {

    const category = [
        {city: 'tel aviv', src:"https://ynet-images1.yit.co.il/picserver5/crop_images/2020/09/01/BJqUFHjmD/BJqUFHjmD_0_32_1001_563_0_x-large.jpg"},
        {city: 'london', src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcr-c5PRwuJIBf55BBWCFQj7hCwwg1E0VOKA&usqp=CAU"},
        {city: 'amsterdam', src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR95BVzim7p3MyZPieCmZLi5ChxN92OqSMKQg&usqp=CAU"}
    ]

    const { data, loading, error } = useFetch(
        "/hotels/countByCity?cities=tel aviv,london,Amsterdam"
    );
    
    
    return (
        <FeaturedContainer>
            {loading ? (
                "Loading please wait"
            ) : (
                <>
                    <FeaturedItem> 
                        <FeaturedImg src={category[0].src} />
                        <FeaturedItemTitels>
                            <FeaturedItemText>{category[0].city} 🇮🇱</FeaturedItemText>
                            <FeaturedItemText type='properties'>{data[0]} properties</FeaturedItemText>
                        </FeaturedItemTitels>
                    </FeaturedItem>
                    <FeaturedItem>
                        <FeaturedImg src={category[1].src} />
                        <FeaturedItemTitels>
                            <FeaturedItemText>{category[1].city} 🇬🇧</FeaturedItemText>
                            <FeaturedItemText type='properties'>{data[1]} properties</FeaturedItemText>
                        </FeaturedItemTitels>
                    </FeaturedItem>
                    <FeaturedItem>
                        <FeaturedImg src={category[2].src} />
                        <FeaturedItemTitels>
                            <FeaturedItemText>{category[2].city} 🇳🇱</FeaturedItemText>
                            <FeaturedItemText type='properties'>{data[2]} properties</FeaturedItemText>
                        </FeaturedItemTitels>
                    </FeaturedItem>
                </>)}
        </FeaturedContainer>
    )
}

export default Featured
