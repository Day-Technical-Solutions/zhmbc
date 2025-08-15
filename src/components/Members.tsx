/** @format */

import {Button} from "@/components/ui/button";
import placeholder from "/src/images/placeholder.svg";
import {useNavigate} from "react-router-dom";

export default function Members() {
	const navigate = useNavigate();

	const leadershipTeam = [
		{
			name: "Rev. Dr. James Wilson",
			role: "Founder",
			ministry: "Senior Pastor (1965-2010)",
			description:
				"Founded Zion Hope Missionary Baptist Church in 1965 and served faithfully for 45 years, establishing a strong foundation of faith and community service.",
			image: placeholder,
			legacy: true,
		},
		{
			name: "Rev. Michael Thompson",
			role: "Senior Pastor",
			ministry: "Lead Pastor",
			description:
				"Serving since 2010, Pastor Thompson continues to build upon our foundation while leading our congregation into the future with vision and compassion.",
			image: placeholder,
			current: true,
		},
	];

	const ministryLeaders = [
		{
			name: "John Doe",
			role: "Elder",
			ministry: "Men's Ministry",
			image: placeholder,
		},
		{
			name: "Jane Smith",
			role: "Deaconess",
			ministry: "Women's Ministry",
			image: placeholder,
		},
		{
			name: "Michael Johnson",
			role: "Youth Pastor",
			ministry: "Youth Ministry",
			image: placeholder,
		},
		{
			name: "Sarah Williams",
			role: "Director",
			ministry: "Children's Ministry",
			image: placeholder,
		},
		{
			name: "Robert Davis",
			role: "Minister",
			ministry: "Music Ministry",
			image: placeholder,
		},
		{
			name: "Patricia Brown",
			role: "Coordinator",
			ministry: "Outreach Ministry",
			image: placeholder,
		},
		{
			name: "David Martinez",
			role: "Director",
			ministry: "Young Adults Ministry",
			image: placeholder,
		},
		{
			name: "Lisa Anderson",
			role: "Coordinator",
			ministry: "Prayer Ministry",
			image: placeholder,
		},
		{
			name: "James Wilson Jr.",
			role: "Deacon",
			ministry: "Senior Adults Ministry",
			image: placeholder,
		},
	];

	return (
		<main className="flex-1 w-full">
			{/* Hero Section */}
			<section className="relative h-[300px]">
				<img
					src={placeholder}
					alt="Church"
					className="brightness-50 w-full max-h-full object-cover"
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center text-white">
						<h1 className="text-4xl md:text-6xl font-bold mb-4">Our Church Family</h1>
						<p className="text-xl md:text-2xl">Meet the people who make our ministry possible</p>
					</div>
				</div>
			</section>

			{/* Leadership Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12">Church Leadership</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8  mx-auto">
						{leadershipTeam.map((leader) => (
							<div
								key={leader.name}
								className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-100">
								<div className="md:flex">
									<div className="md:flex-shrink-0">
										<img
											src={leader.image || "/placeholder.svg"}
											alt={leader.name}
											width={400}
											height={400}
											className="h-full object-cover w-96"
										/>
									</div>
									<div className="p-8">
										<div className="flex items-center">
											<div>
												<h3 className="text-2xl font-semibold text-gray-800">{leader.name}</h3>
												<p className="mt-1 text-lg font-medium text-indigo-600">{leader.role}</p>
												<p className="mt-1 text-gray-600">{leader.ministry}</p>
											</div>
											{leader.legacy && (
												<span className="ml-auto px-3 py-1 text-sm font-semibold text-gray-500 bg-gray-100 rounded-full">
													Legacy
												</span>
											)}
											{leader.current && (
												<span className="ml-auto px-3 py-1 text-sm font-semibold text-green-500 bg-green-50 rounded-full">
													Current
												</span>
											)}
										</div>
										<p className="mt-4 text-gray-600">{leader.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Ministry Leaders Section */}
			<section className="py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12">Ministry Leaders</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{ministryLeaders.map((member) => (
							<div
								key={member.name}
								className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
								<img
									src={member.image || "/placeholder.svg"}
									alt={member.name}
									width={300}
									height={300}
									className="w-full  object-cover"
								/>
								<div className="p-6">
									<h3 className="text-xl font-semibold mb-1">{member.name}</h3>
									<p className="text-indigo-600 font-medium mb-1">{member.role}</p>
									<p className="text-gray-600">{member.ministry}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Join Us Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">Join Our Church Family</h2>
						<p className="text-gray-600 mb-8">
							We welcome all who wish to join our congregation and serve in our various ministries.
							Whether you're looking to become a member or interested in serving in a specific
							ministry, we'd love to connect with you.
						</p>
						<Button
							className="bg-indigo-600 hover:bg-indigo-700"
							onClick={() => navigate("/contact")}>
							Become a Member
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
