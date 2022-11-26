import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";
import { mobile } from "../responsive";


const LoginP = styled.div`
padding-top:200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 200px;
  ${mobile({height: '60vh'})}
`;

const LoginCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align:center;
`;

const InputLogin = styled.input`
  height: 35px;
  width: 300px;
  padding: 7px 0px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  margin-bottom: 20px;
`;

const BtnLogin = styled.button`
  border: none;
  padding: 10px 10px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
`;

const ErrorLogin = styled.span``;

const Register = styled.span`
font-weight: 100;
font-size: 12px;
color: #0036ac;
cursor: pointer;
`;


const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", user);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    return (
        <LoginP>
            <LoginCon>
                <InputLogin
                type="text"
                placeholder="User Name"
                id="username"
                onChange={handleChange}
                />
                <InputLogin
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                />
                <BtnLogin disabled={loading} onClick={handleClick}>Login</BtnLogin>
                {error && <ErrorLogin>{error.message}</ErrorLogin>}
                <br /><Register onClick={()=> navigate('/register')}>Don't have you account ? Click here to connect</Register>
            </LoginCon>
            <Footer/>
        </LoginP>
    )
}

export default Login
