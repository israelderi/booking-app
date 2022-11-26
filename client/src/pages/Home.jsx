import styled from "styled-components";
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Featured  from "../components/Featured";
import PropertyList from "../components/PropertyList";
import FeaturedProperties from "../components/FeaturedProperties";
import Email from "../components/Email";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const HomeContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const HomeTitle1 = styled.h1`
  width: 1024px;
  font-size: 20px;
  margin-bottom: -10px;
  ${mobile({ display: 'none'})}
`;
const HomeTitle = styled.h1`
  width: 1024px;
  font-size: 20px;
  margin-bottom: -10px;
  ${mobile({fontSize: '16px', width: '70%', color: '#0f3ca4'})}
`;

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <HomeContainer>
      <Featured/>
      <HomeTitle1>Browse by property type</HomeTitle1>
      <PropertyList />
      <HomeTitle>BStay at our top unique properties</HomeTitle>
      <FeaturedProperties />
       <Email />
       <Footer />
      </HomeContainer>
    </>
  )
}

export default Home

