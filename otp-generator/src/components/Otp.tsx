import React, { useRef, useState } from "react";
import "./OtpStyle.css";

interface Props {
  otpLength?: number;
}

const Otp = ({ otpLength = 6 }: Props) => {
  const [otpField, setOtpField] = useState(new Array(otpLength).fill(""));
  const inputRef = useRef<HTMLInputElement>();
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = e.key;
    if (isNaN(Number(key))) {
      //   if (key == "Backspace") {
      //     console.log("back space");
      //   }
      return;
    }
    console.log("typed key", key);
    const changedOTP = [...otpField];
    changedOTP[index] = key;
    setOtpField(changedOTP);
  };
  console.log(otpField);
  return (
    <div className="container">
      {otpField.map((item, index) => (
        <input
          ref={inputRef}
          key={index}
          type="text"
          value={item}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default Otp;
