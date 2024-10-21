"use client"

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if(name == 'email') setEmail(value);
    if(name == 'password') setPassword(value);
  }

  const onSubmit = async (e: React.FormEvent) => {
    console.log("HIT");
    e.preventDefault();

    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if(result?.ok) {
      router.replace('/');
    } else {
      console.error(result?.error);
    }
  }

  return (
    <div>
      <div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} name="email" onChange={onChangeInput} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} name="password" onChange={onChangeInput} />
        </div>
        <button onClick={onSubmit}>login</button>
      </div>
    </div>
  );
}
