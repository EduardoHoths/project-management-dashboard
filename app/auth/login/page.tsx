"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-blue-400 to-indigo-500">
          <Image
            src="/login-bg.jpg"
            alt="Login background"
            layout="fill"
            objectFit="cover"
            className="mix-blend-overlay opacity-50"
          />
        </div>
        <CardHeader className="space-y-1 pt-6">
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Sign in to your account using Google
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-6">
          <Button
            variant="outline"
            className="w-full max-w-sm h-12 mt-4 bg-white hover:bg-gray-600 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition-all duration-300 ease-in-out transform"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <svg
              className="mr-2 h-5 w-5"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
