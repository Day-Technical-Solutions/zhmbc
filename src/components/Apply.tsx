/** @format */

"use client";
import {Download, Mail, MapPin, Phone, Clock, FileText, CheckCircle, Printer} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import HeroPhoto from "/images/church_pulpit.jpg";

export default function Apply() {
	const handleDownloadApplication = () => {
		const link = document.createElement("a");
		link.href = "/files/ZHMBC_Pastoral_Employment_Application.docx";
		link.download = "ZHMBC-Senior-Pastoral-Application.docx";
		link.rel = "noopener";
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	return (
		<main className="flex-1 w-full">
			{/* Hero Section */}
			<section className="relative h-[450px]">
				<img
					src={HeroPhoto}
					alt="Senior Pastoral Program Banner"
					className="brightness-50 w-full max-h-full object-cover"
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center text-white">
						<h1 className="text-4xl md:text-6xl font-bold mb-4">Senior Pastoral Program</h1>
						<p className="text-xl md:text-2xl">
							Answer the call to shepherd God's people with wisdom and compassion
						</p>
					</div>
				</div>
			</section>
			{/* Introduction Section */}
			<section className="py-16 bg-background">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center mb-12">
						<h2 className="text-3xl font-bold mb-6">The Call to Senior Pastoral Ministry</h2>
						<p className="text-lg text-muted-foreground mb-4">
							The position of Senior Pastor at ZHMBC is a sacred responsibility that requires
							spiritual maturity, theological depth, and a proven track record of faithful ministry.
							We seek a shepherd who will lead our congregation with wisdom, compassion, and
							unwavering commitment to God&apos;s Word.
						</p>
						<p className="text-lg text-muted-foreground">
							Due to the significance of this role, we require all applications to be submitted via
							mail. This allows our pastoral search committee to give each application the careful,
							prayerful consideration it deserves.
						</p>
					</div>

					{/* Requirements Cards */}
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
									<FileText className="h-8 w-8 text-indigo-600" />
								</div>
								<CardTitle>Theological Education</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									Master of Divinity or equivalent theological degree from an accredited seminary is
									required.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
									<Clock className="h-8 w-8 text-indigo-600" />
								</div>
								<CardTitle>Ministry Experience</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									Minimum of 10 years in pastoral ministry, with at least 5 years in a senior
									leadership role.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
									<CheckCircle className="h-8 w-8 text-indigo-600" />
								</div>
								<CardTitle>Ordination Status</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									Must be ordained and in good standing within the Baptist denomination or
									affiliated fellowship.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Download Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="grid md:grid-cols-2 gap-8">
							{/* Download Card */}
							<Card className="border-2 border-indigo-200">
								<CardHeader className="text-center">
									<div className="mx-auto w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
										<Download className="h-10 w-10 text-white" />
									</div>
									<CardTitle className="text-2xl">Download Application</CardTitle>
									<CardDescription className="text-base">
										Download, print, and complete the official Senior Pastoral Application form.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<Button
										onClick={handleDownloadApplication}
										className="w-full text-lg py-6 bg-indigo-600 hover:bg-indigo-700"
										size="lg">
										<Download className="mr-2 h-5 w-5" />
										Download Application (.docx)
									</Button>
									<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
										<Printer className="h-4 w-4" />
										<span>Print on standard letter-size paper</span>
									</div>
									<ul className="space-y-3">
										{[
											"Personal Information & Contact Details",
											"Educational Background & Credentials",
											"Ministry History & Experience",
											"Vision for Pastoral Leadership",
											"References",
										].map((item, index) => (
											<li key={index} className="flex items-start gap-3">
												<CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>

							{/* Application Contents */}
							<Card>
								<CardHeader className="text-center">
									<div className="mx-auto w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
										<Download className="h-10 w-10 text-white" />
									</div>
									<CardTitle className="text-2xl">Pastoral Vacancy Announcement </CardTitle>
									<CardDescription className="text-base">
										The vacancy announcement packet contains the following sections:
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<Button
										onClick={handleDownloadApplication}
										className="w-full text-lg py-6 bg-indigo-600 hover:bg-indigo-700"
										size="lg">
										<Download className="mr-2 h-5 w-5" />
										Download Announcement (.docx)
									</Button>
									<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
										<Printer className="h-4 w-4" />
										<span>Not necessary for submission</span>
									</div>
									<ul className="space-y-3">
										{[
											"Role Requirements and Responsibilites",
											"Application Submission Instructions",
											"Required Documentation",
											"Committee Contact information",
											"Resources",
										].map((item, index) => (
											<li key={index} className="flex items-start gap-3">
												<CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Mailing Information Section */}
			<section className="py-16 bg-background">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-12">Submission Instructions</h2>

						<div className="grid md:grid-cols-2 gap-8">
							{/* Mailing Address Card */}
							<Card className="border-2 border-indigo-200">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
											<Mail className="h-6 w-6 text-indigo-600" />
										</div>
										<div>
											<CardTitle>Mail Your Application</CardTitle>
											<CardDescription>Send completed application to:</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="bg-muted/50 p-6 rounded-lg space-y-2">
										<p className="font-bold text-lg">Pastoral Search Committee</p>
										<p className="font-semibold">
											Zion Hope Missionary Baptist Church of Miami, Inc.
										</p>
										<div className="flex items-start gap-2 mt-4">
											<MapPin className="h-5 w-5 text-indigo-600 mt-0.5" />
											<div>
												<p>P.O. Box 470326</p>
												<p>ATTN: Pastoral Search Committee</p>
												<p>Miami, FL 33247</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Contact Information Card */}
							<Card>
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
											<Phone className="h-6 w-6 text-indigo-600" />
										</div>
										<div>
											<CardTitle>Questions?</CardTitle>
											<CardDescription>Contact the search committee:</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-3">
										<div className="flex items-center gap-3">
											<Phone className="h-5 w-5 text-indigo-600" />
											<span>(305) 696-4341</span>
										</div>
										<div className="flex items-center gap-3">
											<Mail className="h-5 w-5 text-indigo-600" />
											<span>zhmbc17@gmail.com</span>
										</div>
									</div>
									<p className="text-sm text-muted-foreground pt-4 border-t">
										All inquiries are handled with strict confidentiality.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Required Documents Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">Required Documents</h2>
						<p className="text-center text-muted-foreground mb-12">
							Please include the following documents with your completed application:
						</p>

						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{[
								{
									title: "Completed Application",
									desc: "All sections must be filled out completely",
								},
								{title: "Curriculum Vitae", desc: "Detailed CV or resume of ministry experience"},
								{title: "Ordination Certificate", desc: "Copy of your ordination documentation"},
								{
									title: "Ministerial License",
									desc: "Copy of your official ministerial license",
								},
								{title: "Sermon Samples", desc: "USB drive with 2 recent sermon recordings"},
								{title: "Reference Letters", desc: "5 Letters from ministry references"},
							].map((doc, index) => (
								<Card key={index} className="text-center">
									<CardContent className="pt-6">
										<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<FileText className="h-6 w-6 text-indigo-600" />
										</div>
										<h3 className="font-semibold mb-2">{doc.title}</h3>
										<p className="text-sm text-muted-foreground">{doc.desc}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="py-16 bg-background">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-8">Selection Process</h2>
						<div className="space-y-6">
							{[
								{
									step: "1",
									title: "Application Review",
									desc: "Search committee reviews all applications (4-6 weeks)",
								},
								{
									step: "2",
									title: "Initial Interview",
									desc: "Phone or video interview with selected candidates",
								},
								{
									step: "3",
									title: "In-Person Visit",
									desc: "On-site visit, meet congregation, and preach trial sermon",
								},
								{
									step: "4",
									title: "Final Selection",
									desc: "Congregational vote and official call extended",
								},
							].map((item, index) => (
								<div key={index} className="flex items-center gap-6">
									<div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
										{item.step}
									</div>
									<div className="text-left">
										<h3 className="font-semibold text-lg">{item.title}</h3>
										<p className="text-muted-foreground">{item.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
