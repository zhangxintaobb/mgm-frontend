/* eslint-disable @typescript-eslint/no-unused-vars */
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from "react";
import { Label } from "reactstrap";
import { Button } from "../common/button";
import Input from "../common/input/Input";
import "./LoginBox.scss";

const enum LOGIN_VERIFY_STEP {
  username,
  password
}

const LoginBox = () => {
  const [currentStep, setCurrentStep] = useState(LOGIN_VERIFY_STEP.password);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const renderLoginVerifyStep = useMemo(() => {
    switch (currentStep) {
      case LOGIN_VERIFY_STEP.username:
        return (
          <>
            <Button color="neutral" size="m" className="w-100">
              使用微信登录
            </Button>
            <div className="login-seperator-container">
              <span className="login-seperator">或者</span>
            </div>
            <Label for="username">用户名</Label>
            <Input
              autoFocus
              id="username"
              type="text"
              placeholder="用户名"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
            />
            <Button
              color="primary"
              size="m"
              className="w-100 mt-m"
              onClick={() => {
                setCurrentStep(LOGIN_VERIFY_STEP.password);
              }}
            >
              下一步
            </Button>
          </>
        );
      case LOGIN_VERIFY_STEP.password:
        return (
          <>
            <Button
              color="i-primary"
              size="i-s"
              className="d-flex align-items-center mb-m text-gray-700"
              onClick={() => {
                setCurrentStep(LOGIN_VERIFY_STEP.username);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-s" />
              {username}
            </Button>

            <Label for="password-login">密码</Label>
            <Input
              autoFocus
              id="password-login"
              type={showPassword ? "text" : "password"}
              placeholder="密码"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target);
              }}
              showPassword
              onShowPassword={() => {
                setShowPassword(!showPassword);
              }}
            />
            <Button color="primary" size="m" className="w-100 mt-m">
              登录
            </Button>
          </>
        );
      default:
        return null;
    }
  }, [currentStep, showPassword, username]);
  return (
    <div id="login-box">
      <h2 className="text-center mb-m">登录</h2>
      {renderLoginVerifyStep}
    </div>
  );
};

export default LoginBox;
