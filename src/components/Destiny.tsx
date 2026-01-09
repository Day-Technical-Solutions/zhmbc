"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeroPhoto from "/images/church_pulpit.jpg";

import { Send, CheckCircle2, BookOpen, Heart, Cross } from "lucide-react";

export default function Destiny() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [cvFile, setCvFile] = useState<File | null>(null);

  const ministries = ["Administration", "Youth Ministry"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF and Word documents are allowed");
        return;
      }
      setCvFile(file);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const form = event.currentTarget;

    const formData = new FormData(event.currentTarget);
    const fd = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      memberSince: formData.get("memberSince") as string,
      positionApplying: formData.get("positionApplying") as string,
      ministry: formData.get("ministry") as string,
      experience: formData.get("experience") as string,
      qualifications: formData.get("qualifications") as string,
      motivation: formData.get("motivation") as string,
      availability: formData.get("availability") as string,
      references: formData.get("references") as string,
      hasCV: cvFile !== null,
    };

    try {
      const formData = new FormData(event.currentTarget);
      console.log(fd);

      // Include CV file (if selected)
      if (cvFile) {
        formData.set("hasCV", "true");
      } else {
        formData.set("hasCV", "false");
      }

      const res = await fetch("/api/email/application", {
        method: "POST",
        body: formData, // Browser will set correct multipart boundary
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `Failed to submit application`);
      }

      // Success
      setSuccess(true);
      form.reset();

      setCvFile(null);
    } catch (err: any) {
      console.error("Application submission failed:", err);
      setErrors({ form: [err?.message || "Failed to submit"] });
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
          alt="Destiny Pastoral Program Banner"
          className="brightness-50 w-full max-h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Destiny Pastoral Program
            </h1>
            <p className="text-xl md:text-2xl">
              Answer the call to shepherd God's people with wisdom and
              compassion
            </p>
          </div>
        </div>
      </section>

      {/* Program Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">
              About Destiny Pastoral Program
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              The Destiny Pastoral Program is a sacred pathway for those who
              feel called to serve as shepherds of God's flock. This
              comprehensive program identifies, trains, and mentors individuals
              with a genuine calling to pastoral ministry, equipping them with
              theological knowledge, pastoral skills, and spiritual wisdom
              needed to lead and nurture our church community.
            </p>
            <p className="text-gray-600 text-lg">
              We seek servant leaders who are committed to biblical teaching,
              compassionate care, and transformative leadership that glorifies
              God and edifies His people.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <BookOpen className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Theological Training
              </h3>
              <p className="text-gray-600">
                In-depth biblical and theological education under experienced
                ministers
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Heart className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pastoral Care</h3>
              <p className="text-gray-600">
                Hands-on training in counseling, visitation, and shepherding
                God's people
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Cross className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Spiritual Formation
              </h3>
              <p className="text-gray-600">
                Spiritual mentorship and character development for effective
                ministry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Pastoral Application Form</CardTitle>
                <CardDescription>
                  Please complete all fields below. We take each application
                  seriously and prayerfully consider every candidate called to
                  pastoral ministry.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" name="firstName" />
                          {errors.firstName && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.firstName[0]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" name="lastName" />
                          {errors.lastName && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.lastName[0]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
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
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" />
                        {errors.phone && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.phone[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" />
                      {errors.address && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.address[0]}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                        />
                        {errors.dateOfBirth && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.dateOfBirth[0]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="memberSince">Member Since</Label>
                        <Input
                          id="memberSince"
                          name="memberSince"
                          type="text"
                          placeholder="e.g., 2020"
                        />
                        {errors.memberSince && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.memberSince[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Position Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 mt-6">
                        Pastoral Position
                      </h3>
                      <div>
                        <Label htmlFor="positionApplying">
                          Specific Pastoral Role
                        </Label>
                        <Input
                          id="positionApplying"
                          name="positionApplying"
                          placeholder="e.g., Associate Pastor, Youth Pastor, Assistant Pastor"
                        />
                        {errors.positionApplying && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.positionApplying[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ministry">Primary Ministry Focus</Label>
                      <Select name="ministry">
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary ministry focus" />
                        </SelectTrigger>
                        <SelectContent>
                          {ministries.map((ministry) => (
                            <SelectItem key={ministry} value={ministry}>
                              {ministry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.ministry && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.ministry[0]}
                        </p>
                      )}
                    </div>

                    {/* Experience and Qualifications */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 mt-6">
                        Ministry Experience & Education
                      </h3>
                      <div>
                        <Label htmlFor="experience">
                          Ministry and Pastoral Experience
                        </Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          rows={4}
                          placeholder="Describe your previous ministry experience, leadership roles, preaching/teaching experience, etc."
                        />
                        {errors.experience && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.experience[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="qualifications">
                        Theological Education & Qualifications
                      </Label>
                      <Textarea
                        id="qualifications"
                        name="qualifications"
                        rows={4}
                        placeholder="List your theological education, degrees, certificates, ordination, licenses, and relevant training..."
                      />
                      {errors.qualifications && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.qualifications[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="motivation">
                        Your Call to Pastoral Ministry
                      </Label>
                      <Textarea
                        id="motivation"
                        name="motivation"
                        rows={4}
                        placeholder="Share your testimony of God's call to pastoral ministry and your vision for serving His people..."
                      />
                      {errors.motivation && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.motivation[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="availability">
                        Availability for Ministry
                      </Label>
                      <Textarea
                        id="availability"
                        name="availability"
                        rows={3}
                        placeholder="Describe your availability for pastoral duties, including teaching, counseling, visitation, and administrative responsibilities..."
                      />
                      {errors.availability && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.availability[0]}
                        </p>
                      )}
                    </div>

                    {/* References */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 mt-6">
                        Pastoral References
                      </h3>
                      <div>
                        <Label htmlFor="references">
                          Please provide three pastoral or ministerial
                          references
                        </Label>
                        <Textarea
                          id="references"
                          name="references"
                          rows={4}
                          placeholder="Include name, title/position, relationship to you, phone number, and email for each reference..."
                        />
                        {errors.references && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.references[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 mt-6">
                        Ministry Resume/CV
                      </h3>
                      <div>
                        <Label htmlFor="cv">
                          Upload your Ministry Resume/CV (Optional)
                        </Label>
                        <div className="mt-2">
                          <Input
                            id="cv"
                            name="cv"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="cursor-pointer"
                          />
                          {cvFile && (
                            <p className="text-sm text-green-600 mt-2 flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              {cvFile.name} selected
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Accepted formats: PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting
                        ? "Submitting..."
                        : "Submit Pastoral Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              {success && (
                <CardFooter>
                  <div className="flex items-center text-green-600 w-full bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Application submitted successfully! Our pastoral leadership
                    team will prayerfully review your application and contact
                    you soon.
                  </div>
                </CardFooter>
              )}
            </Card>

            {/* Additional Information */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Application Process
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  • Your application will be prayerfully reviewed by our senior
                  pastoral team
                </li>
                <li>
                  • You'll be contacted within 1-2 weeks for an initial pastoral
                  interview
                </li>
                <li>
                  • Selected candidates will participate in multiple interviews
                  and pastoral assessments
                </li>
              </ul>
              <p className="mt-4 text-gray-600">
                For questions about the pastoral application process, please
                contact our church office at (305) 696-4341 or email
                zhmbc17@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
