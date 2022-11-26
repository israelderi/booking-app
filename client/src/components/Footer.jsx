import styled from "styled-components";
import img1 from '../imges/footer-img1.png';
import img2 from '../imges/footer-img2.png';
import img3 from '../imges/footer-img3.png';
import img4 from '../imges/footer-img4.png';
import img5 from '../imges/footer-img5.png';
import Logo from '../imges/logoBlue.png';
import { mobile } from "../responsive";

const FooterContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  font-size: 12px;
  padding-top:20px;
`;
const FooterLists = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const FooterListLogo = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  ${mobile({marginBottom: -100, marginLeft: '10px'})}
`;
const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;
const FooterListItem = styled.li`
  margin-bottom: 10px;
  color: #003580;
  cursor: pointer;
  ${mobile({display: 'none'})}
`;
const FooterText = styled.div`
${mobile({marginLeft: '10px'})}
`;

const FooterImgs = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    ${mobile({display: 'none'})}
`;
const FooterImg = styled.img`
    width:120px;
    height: 30px;
    height: ${(props) => props.type === "logo" && '80px'};
    width: ${(props) => props.type === "logo" && '160px'};
`;

const Footer = () => {

    return (
        <FooterContainer>
            <FooterLists>
                <FooterListLogo>
                <FooterImg type='logo' src={Logo} />
                </FooterListLogo>
                <FooterList>
                    <FooterListItem>Countries</FooterListItem>
                    <FooterListItem>Regions</FooterListItem>
                    <FooterListItem>Cities</FooterListItem>
                    <FooterListItem>Districts</FooterListItem>
                    <FooterListItem>Airports</FooterListItem>
                </FooterList>
                <FooterList>
                    <FooterListItem>Hotels</FooterListItem>
                    <FooterListItem>Places of interest</FooterListItem>
                    <FooterListItem>Apartments</FooterListItem>
                    <FooterListItem>Resorts</FooterListItem>
                    <FooterListItem>Villas</FooterListItem>
                </FooterList>
                <FooterList>
                    <FooterListItem>Hostels</FooterListItem>
                    <FooterListItem>B&Bs</FooterListItem>
                    <FooterListItem>Guest houses</FooterListItem>
                    <FooterListItem>Unique places to stay</FooterListItem>
                    <FooterListItem>Discover</FooterListItem>
                </FooterList>
                <FooterList>
                    <FooterListItem>All destinations</FooterListItem>
                    <FooterListItem>Reviews</FooterListItem>
                    <FooterListItem>Unpacked: Travel articles</FooterListItem>
                    <FooterListItem>Travel communities</FooterListItem>
                    <FooterListItem>Seasonal and holiday deals</FooterListItem>
                </FooterList>
            </FooterLists>
            <FooterText>Copyright Israel Deri Full Stack Developer © 2022</FooterText>
            <FooterImgs>
            <FooterImg src={img1} />
            <FooterImg src={img2} />
            <FooterImg src={img3} />
            <FooterImg src={img4} />
            <FooterImg src={img5} />
            </FooterImgs>
        </FooterContainer>
    )
}

export default Footer
