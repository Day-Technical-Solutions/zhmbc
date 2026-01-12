/** @format */

import {Route, Routes} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import {stripePromise} from "./lib/stripe";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
// import Events from "./components/Events";
import About from "./components/About";
import Donations from "./components/Donations";
import Contact from "./components/Contact";
import PrayerRequest from "./components/PrayerReq";
// import Destiny from "./components/Destiny";
import Apply from "./components/Apply";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				{/* <Route path="/events" element={<Events />} /> */}
				{/* <Route path="/members" element={<Members />} /> */}
				<Route path="/about" element={<About />} />
				{/* <Route path="/destiny" element={<Destiny />} /> */}
				<Route path="/apply" element={<Apply />} />
				<Route
					path="/donate"
					element={
						<Elements stripe={stripePromise}>
							<Donations />
						</Elements>
					}
				/>
				<Route path="/contact" element={<Contact />} />
				<Route path="/prayer" element={<PrayerRequest />} />
				<Route path="*" element={<NoPage />} />
			</Route>
		</Routes>
	);
}
