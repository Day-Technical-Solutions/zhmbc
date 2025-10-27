/** @format */

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { HandIcon as PrayingHands, Send, CheckCircle2 } from "lucide-react";
import HeroPhoto from "/images/church_pulpit_close.jpg";

export default function PrayerRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const requestTypes = [
    { value: "personal", label: "Personal" },
    { value: "family", label: "Family" },
    { value: "health", label: "Health" },
    { value: "work", label: "Work/Career" },
    { value: "other", label: "Other" },
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const form = event.currentTarget;

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      requestType: formData.get("requestType") as string,
      urgent: formData.get("urgent") === "on",
      private: formData.get("private") === "on",
      request: formData.get("request") as string,
    };

    const missing = ["name", "email", "request"].filter(
      (k) => !(payload as any)[k]
    );
    if (missing.length) {
      setErrors({ form: [`Missing: ${missing.join(", ")}`] });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/email/prayer-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      setSuccess(true);
      form.reset();
    } catch (e: any) {
      setErrors({ form: [e?.message || "Failed to submit"] });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative h-[450px]">
        <img
          src={HeroPhoto}
          alt="Prayer Request Banner"
          className="brightness-50 w-full max-h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Prayer Requests
            </h1>
            <p className="text-xl md:text-2xl">
              Share your prayer needs with our church family
            </p>
          </div>
        </div>
      </section>

      {/* Prayer Request Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PrayingHands className="mr-2 h-5 w-5" />
                  Submit a Prayer Request
                </CardTitle>
                <CardDescription>
                  Your prayer request will be shared with our prayer team who
                  will lift your needs in prayer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.name[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Request Type</Label>
                      <RadioGroup name="requestType" className="mt-2">
                        {requestTypes.map((type) => (
                          <div
                            key={type.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={type.value}
                              id={type.value}
                            />
                            <Label htmlFor={type.value}>{type.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.requestType && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.requestType[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="request">Prayer Request</Label>
                      <Textarea
                        id="request"
                        name="request"
                        rows={5}
                        placeholder="Please share your prayer request..."
                      />
                      {errors.request && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.request[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="urgent" name="urgent" />
                        <Label htmlFor="urgent">
                          This is an urgent request
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="private" name="private" />
                        <Label htmlFor="private">
                          Keep this request private (prayer team only)
                        </Label>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Submitting..." : "Submit Prayer Request"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              {success && (
                <CardFooter>
                  <div className="flex items-center text-green-600 w-full bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Prayer request submitted successfully. Our prayer team will
                    be praying for you.
                  </div>
                </CardFooter>
              )}
            </Card>

            {/* Additional Information */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                About Our Prayer Ministry
              </h3>
              <p className="text-gray-600 mb-4">
                Our dedicated prayer team commits to praying for each request
                received. We believe in the power of prayer and stand together
                with you in faith.
              </p>
              <p className="text-gray-600">
                For immediate prayer needs or to speak with a pastor, please
                call our prayer line at (305) 696-4341.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
