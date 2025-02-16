import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl bg-white shadow-lg">
        <CardHeader className="pt-16 px-8">
          <div className="animate-bounce">
            <svg
              className="mx-auto h-32 w-32 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-6 px-8 pb-8">
          <h1 className="text-6xl font-bold text-indigo-600">404</h1>
          <p className="text-2xl font-semibold text-gray-800">
            Oops! Page not found
          </p>
          <p className="text-xl text-gray-600">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-16 px-8">
          <Button
            asChild
            size="lg"
            className="bg-indigo-600 text-white hover:bg-indigo-700 text-lg px-8 py-3"
          >
            <Link to="/">Return to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
