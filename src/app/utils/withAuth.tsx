"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Component, useEffect } from "react";

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if(status === 'unauthenticated') {
        router.replace('/login');
      }
    }, [status, router]);

    if(status === 'authenticated') {
      return <WrappedComponent {...props} />
    }

    return null;
  }
};

export default withAuth