import { Calendar, MapPin, Clock } from "lucide-react";
import placeholder from "/public/images/placeholder.svg";

export default function Events() {
  const events = [
    {
      title: "Community Picnic",
      description:
        "Join us for a day of food, games, and fellowship in the community.",
      date: "July 15, 2023",
      time: "11:00 AM - 3:00 PM",
      location: "City Park",
      image: placeholder,
    },
    {
      title: "Vacation Bible School",
      description:
        "A week of fun and learning for children ages 5-12. Register your children for an unforgettable experience.",
      date: "August 1-5, 2023",
      time: "9:00 AM - 12:00 PM",
      location: "Zion Hope Missionary Baptist Church",
      image: placeholder,
    },
    {
      title: "Worship Night",
      description:
        "An evening of praise and worship music featuring our church choir and special guest performers.",
      date: "September 10, 2023",
      time: "7:00 PM - 9:00 PM",
      location: "Zion Hope Missionary Baptist Church Auditorium",
      image: placeholder,
    },
    {
      title: "Youth Conference",
      description:
        "A special conference for young people featuring inspiring speakers, workshops, and fellowship.",
      date: "October 5-7, 2023",
      time: "6:00 PM - 9:00 PM",
      location: "Zion Hope Missionary Baptist Church",
      image: placeholder,
    },
    {
      title: "Thanksgiving Community Dinner",
      description:
        "Join us for our annual Thanksgiving dinner where we come together as a community to give thanks.",
      date: "November 23, 2023",
      time: "4:00 PM - 7:00 PM",
      location: "Church Fellowship Hall",
      image: placeholder,
    },
    {
      title: "Christmas Concert",
      description:
        "Annual Christmas concert featuring our choir, youth performers, and special guest artists.",
      date: "December 15, 2023",
      time: "7:00 PM - 9:00 PM",
      location: "Zion Hope Missionary Baptist Church Sanctuary",
      image: placeholder,
    },
  ];

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <img
          src={placeholder}
          alt="Church"
          className="brightness-50 w-full max-h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Upcoming Events
            </h1>
            <p className="text-xl md:text-2xl">
              Join us for these special occasions
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 "
              >
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stay Tuned Message */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Stay Tuned!</h3>
              <p className="text-gray-600">
                More exciting events are being planned. Check back regularly for
                updates or sign up for our newsletter to stay informed about
                upcoming events at Zion Hope Missionary Baptist Church.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
