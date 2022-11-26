import styled from "styled-components";
import { mobile } from "../responsive";


const EmailContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  background-color: #003580;
  color: white;
  display: flex;
  flex-direction:column;
  align-items: center;
  gap: 10px;
  padding: 50px;
  ${mobile({ width: '100%', padding: '20px 0px'})}
`;

const MailTitle = styled.span`
font-weight: 200;
   font-size: 30px;
   font-size: ${(props) => props.type === "desc" && '18px'};
   color: ${(props) => props.type === "desc" && '#bbbbbb'};
   margin-bottom: ${(props) => props.type === "desc" && '25px'};
   font-weight: ${(props) => props.type === "desc" && 100};
`;

const MailInputContainer = styled.div`
 display:flex;
 align-items: center;
 justify-content: center;
 ${mobile({ flexDirection: 'column', gap: '10px'})}
`;

const MailInput = styled.input`
  width: 300px;
  height: 50px;
  padding: 0 10px;
  border: none;
  margin-right: 5px;
  border-radius: 5px;
`;

const MailButton = styled.button`
  height: 50px;
  width: 140px;
  background-color: #0071c2;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  font-size: 17px;
  cursor: pointer;
 
`;

const Email = () => {
  return (
    <EmailContainer>
    <MailTitle>Save time, save money !</MailTitle>
    <MailTitle type='desc'>Sign up and we'll send the best deals to you</MailTitle>
    <MailInputContainer>
        <MailInput type='text' placeholder="Your Email"/>
        <MailButton>Subscribe</MailButton>
    </MailInputContainer>
    </EmailContainer>
  )
}

export default Email
