import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/auth";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.5v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.6v3h3.9c2.28-2.09 3.61-5.18 3.61-8.84z"
      />
      <path
        fill="#34A853"
        d="M12.045 24c3.27 0 5.91-1.08 7.9-2.98l-3.9-3c-1.08.72-2.47 1.16-4 1.16-3.13 0-5.78-2.1-6.73-4.96h-3.98v3.09C3.345 21.2 7.375 24 12.045 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.315 14.22c-.25-.74-.38-1.53-.38-2.35s.13-1.61.38-2.35V6.43h-3.98C.515 8.23 0 10.05 0 12.05c0 2s.515 3.82 1.335 5.62l3.98-3.09v-1.36z"
      />
      <path
        fill="#EA4335"
        d="M12.045 4.75c1.77 0 3.37.61 4.62 1.8l3.42-3.42C17.955 1.19 15.315 0 12.045 0 7.375 0 3.345 2.8 1.335 6.43l3.98 3.09c.95-2.86 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

async function handleGoogleSignIn() {
  "use server";
  await signIn("google");
}

async function handleGithubSignIn() {
  "use server";
  await signIn("github");
}

const SignInFormClient = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <form action={handleGoogleSignIn}>
          <Button type="submit" variant={"outline"} className="w-full">
            <GoogleIcon className="mr-2 h-4 w-4" />
            <span>Sign in with Google</span>
          </Button>
        </form>
        <form action={handleGithubSignIn}>
          <Button type="submit" variant={"outline"} className="w-full">
            <GithubIcon className="mr-2 h-4 w-4" />
            <span>Sign in with Github</span>
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;
