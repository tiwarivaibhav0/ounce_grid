/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  FormElement,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
const navigate =useNavigate();
useEffect(()=>{
    if(sessionStorage.getItem("apiKey")!==null)
    navigate("/dashboard");
},[])
  const fetchhandler = () => {
    if (user === "" || password === "") setErr("** All Fields are mandatory");
    else {
        setLoading(true);
      var data = {
        username: user,
        password: password,
      };
      var url = new URL("https://fbapi.sellernext.com/user/login");
      for (let k in data) {
        url.searchParams.append(k, data[k]);
      }

      fetch(url, {
        headers: {
          accept: "application/json",
          authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
        },
      })
        .then((res) => res.json())
        .then((data) => {
            setLoading(false)
          if (data.success) {
            sessionStorage.setItem("apiKey", data.data.token);
            alert("Welcome admin");
            navigate("/dashboard");
          } else {
            setErr("** Invalid Details");
          }
        });
    }
  };
  return (
    <div className="login-form">
      <Card>
        <FormElement>
          <TextStyles
            alignment="left"
            fontweight="bold"
            headingTypes="LG-2.8"
            subheadingTypes="LG-2.5"
            textcolor="dark"
            type="Heading"
            utility="none"
          >
            Login Form
          </TextStyles>
          <TextField
            name="Username"
            onChange={(e) => {
              setUser(e);
              setErr("");
            }}
            placeHolder="Username"
            value={user}
          />

          <TextField
            name="Password"
            onChange={(e) => {
              setPassword(e);
              setErr("");
            }}
            placeHolder="Password"
            type="password"
            value={password}
          />

          <Button content="Login" onClick={fetchhandler} type="Primary" loading={loading}/>
          {err !== "" && (
            <TextStyles
              alignment="left"
              fontweight="bold"
              textcolor="negative"
              utility="none"
            >
              {err}
            </TextStyles>
          )}
        </FormElement>
      </Card>
    </div>
  );
}

export default Login;
