import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";


const RegP = styled.div`
  padding-top:200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 200px;
  ${mobile({paddingTop: '100px'})}
`;

const RegCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  ${mobile({gridTemplateColumns: '1fr'})}
`;

const InputReg = styled.input`
  height: 32px;
  width: 250px;
  padding: 7px 0px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const BtnReg = styled.button`
  border: none;
  padding: 10px 10px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
`;

const ErrorReg = styled.span``;



const Login = () => {

    const navigate = useNavigate()
    const [erorr, seterorr] = useState("");
    const [newUser, setNewUser] = useState({
        username: undefined,
        email: undefined,
        country: undefined,
        city: undefined,
        phone: undefined,
        password: undefined,
    });

    const handleChange = (e) => {
        setNewUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", newUser);
            navigate("/login")
        } catch (err) {
            seterorr("Error ! We could not connect")
        }
    };
    return (
        <RegP>
            <RegCon>
                <InputReg
                    type="text"
                    placeholder="User Name"
                    id="username"
                    onChange={handleChange}
                />
                <InputReg
                    type="text"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                />
                <InputReg
                    type="text"
                    placeholder="Country"
                    id="country"
                    onChange={handleChange}
                />
                <InputReg
                    type="text"
                    placeholder="City"
                    id="city"
                    onChange={handleChange}
                />
                <InputReg
                    type="number"
                    placeholder="phone"
                    id="phone"
                    onChange={handleChange}
                />
                <InputReg
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                />
                <BtnReg onClick={handleClick}>Login</BtnReg>
                {erorr && <ErrorReg>{erorr}</ErrorReg>}
            </RegCon>
            <Footer />
        </RegP>
    )
}

export default Login
