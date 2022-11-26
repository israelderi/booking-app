import styled from "styled-components";
import Logoimg from '../imges/logoNav.png';
import language from '../imges/usa.png';
import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #003580;
  display: flex;
  justify-content: center;
  padding-top:20px;
`;
const NavContainer = styled.div`
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

const Logo = styled.img`
    width: 180px;
    height: 50px;
`;

const NavItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  font-size: 30px;
  margin-left: 15px;
  padding-top: 5px;
  cursor: pointer;
`;


const ButtonLang = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  cursor: pointer;
`;
const UserName = styled.span`
  margin-right: 10px;
  font-weight: 500;
  font-size: 20px;
`;
const LogoutBtn = styled.button`
  font-size: 15px;
  font-weight: bold;
  padding: 6px 10px;
  display: flex;
  gap: 5px;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
`;


const Navbar = () => {

  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
  }

  return (

    <Container>
      <NavContainer>
        <Link to='/'><Logo src={Logoimg} /></Link>
        {user ?
          <NavItems type='logo'>
            <UserName>{user.username}</UserName>
            <LogoutBtn onClick={handleClick}>Logout<FiLogOut /></LogoutBtn>
          </NavItems>
          : (
            <NavItems>
              <ButtonLang src={language} />
              <Icon onClick={() => navigate('/login')}><FaUserCircle /></Icon>
            </NavItems>
          )}
      </NavContainer>
    </Container>
  )
}

export default Navbar
