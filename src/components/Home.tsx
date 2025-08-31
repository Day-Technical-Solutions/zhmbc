/** @format */

import {Clock, Calendar, MapPin, Heart, Mail, Phone, Printer} from "lucide-react";
import placeholder from "/src/images/placeholder.svg";
import {Button} from "./ui/button";
import {useNavigate} from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div>
			{/* Hero Section */}
			<section className="relative h-[600px]">
				<img
					src={placeholder}
					alt="Church"
					className="brightness-50 w-full max-h-full object-cover"
				/>

				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center text-white">
						<h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to</h1>
						<h1 className="text-4xl md:text-6xl font-bold mb-4">
							Zion Hope Missionary Baptist Church
						</h1>
						<p className="text-xl md:text-2xl mb-8">Join us in worship and community</p>
						<a
							href="#location"
							className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300">
							Join Us This Sunday
						</a>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section id="services" className="py-16 bg-gray-100">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<Clock className="h-12 w-12 text-indigo-600 mb-4" />
							<h3 className="text-xl font-semibold mb-2">Sunday Worship</h3>
							<p className="text-gray-600">
								Join us every Sunday at 10:00 AM for our main worship service.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<Clock className="h-12 w-12 text-indigo-600 mb-4" />
							<h3 className="text-xl font-semibold mb-2">Wednesday Bible Study</h3>
							<p className="text-gray-600">
								Dive deeper into God's word every Wednesday at 7:00 PM.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<Clock className="h-12 w-12 text-indigo-600 mb-4" />
							<h3 className="text-xl font-semibold mb-2">Youth Group</h3>
							<p className="text-gray-600">
								Our youth group meets every Friday at 6:30 PM for fellowship and fun.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Events Section */}
			<section id="events" className="py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="border rounded-lg overflow-hidden">
							<img
								src={placeholder}
								alt="Community Picnic"
								width={400}
								height={200}
								className="w-full h-72 object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">Community Picnic</h3>
								<p className="text-gray-600 mb-4">
									Join us for a day of food, games, and fellowship.
								</p>
								<div className="flex items-center text-gray-500 mb-2">
									<Calendar className="h-5 w-5 mr-2" />
									<span>July 15, 2023</span>
								</div>
								<div className="flex items-center text-gray-500">
									<MapPin className="h-5 w-5 mr-2" />
									<span>City Park</span>
								</div>
							</div>
						</div>
						<div className="border rounded-lg overflow-hidden">
							<img
								src={placeholder}
								alt="Vacation Bible School"
								width={400}
								height={200}
								className="w-full h-72 object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">Vacation Bible School</h3>
								<p className="text-gray-600 mb-4">
									A week of fun and learning for children ages 5-12.
								</p>
								<div className="flex items-center text-gray-500 mb-2">
									<Calendar className="h-5 w-5 mr-2" />
									<span>August 1-5, 2023</span>
								</div>
								<div className="flex items-center text-gray-500">
									<MapPin className="h-5 w-5 mr-2" />
									<span>Zion Hope Missionary Baptist Church</span>
								</div>
							</div>
						</div>
						<div className="border rounded-lg overflow-hidden">
							<img
								src={placeholder}
								alt="Worship Night"
								width={400}
								height={200}
								className="w-full h-72 object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">Worship Night</h3>
								<p className="text-gray-600 mb-4">An evening of praise and worship music.</p>
								<div className="flex items-center text-gray-500 mb-2">
									<Calendar className="h-5 w-5 mr-2" />
									<span>September 10, 2023</span>
								</div>
								<div className="flex items-center text-gray-500">
									<MapPin className="h-5 w-5 mr-2" />
									<span>Zion Hope Missionary Baptist Church Auditorium</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Members Section */}
			{/* <section id="members" className="py-16 bg-gray-100">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12">Our Members</h2>
					<p className="text-center text-gray-600 mb-8">
						Meet some of our dedicated members who serve in various ministries.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<img
								src={placeholder}
								alt="John Doe"
								width={300}
								height={300}
								className="w-full object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">John Doe</h3>
								<p className="text-gray-600 mb-2">Elder</p>
								<p className="text-gray-500">Men's Ministry</p>
							</div>
						</div>
						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<img
								src={placeholder}
								alt="Jane Smith"
								width={300}
								height={300}
								className="w-full object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
								<p className="text-gray-600 mb-2">Deaconess</p>
								<p className="text-gray-500">Women's Ministry</p>
							</div>
						</div>
						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<img
								src={placeholder}
								alt="Michael Johnson"
								width={300}
								height={300}
								className="w-full object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2">Michael Johnson</h3>
								<p className="text-gray-600 mb-2">Youth Pastor</p>
								<p className="text-gray-500">Youth Ministry</p>
							</div>
						</div>
					</div>
					<div className="text-center">
						<Button
							onClick={() => navigate("/contact")}
							className="bg-indigo-600 text-white px-6 py-6 rounded-full font-semibold text-lg hover:bg-indigo-700 transition duration-300">
							Become a Member
						</Button>
					</div>
				</div>
			</section> */}

			{/* Donations Section */}
			<section id="donations" className="py-16 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12">Support Our Ministry</h2>
					<div className="max-w-3xl mx-auto text-center">
						<p className="text-gray-600 mb-8">
							Your generous donations help us continue our mission and serve our community. Every
							contribution, no matter the size, makes a difference in the lives we touch.
						</p>
						<div className="flex justify-center mb-8">
							<Button
								onClick={() => navigate("/donate")}
								className="bg-indigo-600 text-white px-10 py-6 rounded-full font-semibold text-lg hover:bg-indigo-700 transition duration-300 inline-flex items-center w-40">
								<Heart className="mr-2 h-5 w-5" /> Donate
							</Button>
						</div>
						<p className="text-sm text-gray-500">
							For other ways to give or for any questions about donations, please contact our
							office.
						</p>
					</div>
				</div>
			</section>

			{/* Location Section */}
			<section id="location" className="py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12">Find Us</h2>
					<div className="flex flex-col md:flex-row items-center justify-center gap-8">
						<div className="w-full md:w-1/2">
							<div className="h-full">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.1376531452397!2d-80.21986492413431!3d25.82636997929792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6b8a2999629%3A0x5d306c14a9077670!2s5129%20NW%2017th%20Ave%2C%20Miami%2C%20FL%2033142!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
									style={{border: 0}}
									allowFullScreen={false}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="w-full h-72 rounded-lg shadow-lg"></iframe>
							</div>
						</div>
						<div className="w-full md:w-1/2 p-5">
							<h3 className="text-2xl font-semibold mb-4">Zion Hope Missionary Baptist Church</h3>
							<p className="text-gray-600 mb-4">
								5129 NW 17th Ave
								<br />
								Miami, FL 33142
							</p>
							<div className="flex items-center text-gray-500 mb-4">
								<Clock className="h-5 w-5 mr-2" />
								<span>Sunday Service: 10:00 AM</span>
							</div>
							<div className="flex items-center text-gray-500 mb-4">
								<Mail className="h-5 w-5 mr-2" />
								<span>zhmbc5129@gmail.com</span>
							</div>
							<div className="flex items-center text-gray-500">
								<Phone className="h-5 w-5 mr-2" />
								<span>(305) 696-4341</span>
							</div>
							<div className="flex items-center text-gray-500">
								<Printer className="h-5 w-5 mr-2" />
								<span>(305) 696-2301</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
