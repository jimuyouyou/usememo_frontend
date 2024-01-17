"use client";
import { useState } from "react";
import { authenticate } from "@/app/lib/actions";
import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { setAccessToken } from "../lib/apolloClient";

export default function LoginForm() {
  const [email, setEmail] = useState("lisa@simpson.com");
  const [password, setPassword] = useState("secret42");
  const [error, setError] = useState("");
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  const handleLogin = async () => {
    // Basic email and password validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    // dispatch({
    //   email: email.trim(),
    //   password: password.trim(),
    // });
    const res = await fetch("api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    // set jwt token into following gql headers
    const data = await res.json();
    if (data && data.accessToken) {
      setAccessToken();
      router.push("/dashboard");
    }
    console.log("data", data);

    // Add your login logic here (e.g., API call, authentication)
    console.log(`Logging in with email: ${email} and password: ${password}`);
  };

  return (
    <div className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={()=>{}}
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={()=>{}}
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <LoginButton handleLogin={handleLogin} />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface MyComponentProps {
  handleLogin: () => void; // Adjust the function signature based on your requirements
}

const LoginButton: React.FC<MyComponentProps> = ({ handleLogin }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-4 w-full"
      aria-disabled={pending}
      onClick={handleLogin}
    >
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
};

// function LoginButton({handleLogin: MyComponentProps }) {
//   const { pending } = useFormStatus();

//   return (
//     <Button className="mt-4 w-full" aria-disabled={pending} onClick={ handleLogin}>
//       Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//     </Button>
//   );
// }
