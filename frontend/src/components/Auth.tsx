import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "@shreyas.ss10/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = res.data;
      localStorage.setItem("token", "Bearer " + jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing");
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="p-6">
        <div className="text-center">
          <div className="text-4xl font-bold"> Create an account</div>
          <div className="text-xl text-slate-500 mt-2">
            {type === "signup"
              ? "Already have an account? "
              : "Don't have an account? "}
            <Link
              to={type === "signup" ? "/signin" : "/signup"}
              className="underline"
            >
              {type === "signup" ? "Sign In" : "Sign Up"}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          {type === "signup" ? (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
          ) : null}
          <LabelledInput
            label="Email"
            placeholder="johndoe@gmail.com"
            type="email"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />
          <LabelledInput
            label="Password"
            placeholder="******"
            type="password"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />
        </div>

        <button
          onClick={sendRequest}
          className="bg-black mt-10  text-white text-xl font-bold w-xs md:w-full rounded-lg p-2 "
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div className="text-xl font-bold mt-2">{label}</div>
      <input
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
        className="w-xs md:w-md mt-2 h-9 border border-slate-300 p-2"
      ></input>
    </div>
  );
}
