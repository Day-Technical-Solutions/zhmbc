"use client";

import type React from "react";

import { useState } from "react";

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
import { Mail, Phone, MapPin, Send, CheckCircle2, Printer } from "lucide-react";
import { Button } from "./ui/button";
import placeholder from "/public/images/placeholder.svg";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = null;

    setSuccess(true);
    setIsSubmitting(false);
    event.currentTarget.reset();
  }

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <img
          src={placeholder}
          alt="Contact Banner"
          className="brightness-50 w-full max-h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl">
              Get in touch with our church family
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      5129 NW 17th Ave
                      <br />
                      Miami, FL 33142
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">(305) 696-4341</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Printer className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Fax</h3>
                    <p className="text-gray-600">(305) 696-2301</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">zhmbc5129@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Wednesday: 6:00 PM - 9:00 PM</p>
                  <p>Sunday: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input id="phone" name="phone" type="tel" />
                        {errors.phone && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.phone[0]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" />
                        {errors.subject && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.subject[0]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" rows={5} />
                        {errors.message && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.message[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      className="w-full mt-6"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
                {success && (
                  <CardFooter>
                    <div className="flex items-center text-green-600 w-full bg-green-50 p-3 rounded-lg">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
