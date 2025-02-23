import {
  Heart,
  Users,
  Book,
  Church,
  Scroll,
  HandHeart,
  HandIcon as PrayingHands,
  Cross,
} from "lucide-react";
import placeholder from "/public/images/placeholder.svg";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Love",
      description:
        "We believe in showing Christ's love to all people, regardless of their background or circumstances.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building strong relationships and supporting one another in faith and daily life.",
    },
    {
      icon: Book,
      title: "Biblical Teaching",
      description:
        "Committed to teaching God's Word faithfully and applying it to contemporary life.",
    },
    {
      icon: HandHeart,
      title: "Service",
      description:
        "Dedicated to serving our community and meeting both spiritual and practical needs.",
    },
  ];

  const beliefs = [
    {
      title: "Scripture",
      description:
        "We believe the Bible is God's inspired Word and our ultimate authority for faith and practice.",
    },
    {
      title: "Salvation",
      description:
        "Salvation comes through faith in Jesus Christ alone, by God's grace through faith.",
    },
    {
      title: "Baptism",
      description:
        "We practice believer's baptism by immersion as a public declaration of faith in Christ.",
    },
    {
      title: "Church",
      description:
        "The church is a community of believers gathered to worship, learn, and serve together.",
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
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About ZHMBC</h1>
            <p className="text-xl md:text-2xl">
              Serving God and our community since 1965
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
              <Scroll className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To spread the love of Christ through worship, discipleship, and
              service, while building a community of believers who are deeply
              rooted in faith and actively engaged in transforming lives through
              the power of the Gospel.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
                <Church className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our History</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1965 by Rev. Dr. James Wilson, Zion Hope Missionary
                  Baptist Church began as a small gathering of faithful
                  believers in Miami, Florida. Through God's grace and the
                  dedication of its members, our church has grown into a vibrant
                  community of faith.
                </p>
                <p>
                  Over the decades, we have established numerous ministries,
                  built our current sanctuary, and continue to expand our
                  outreach programs. Under the current leadership of Rev.
                  Michael Thompson, we remain committed to our founding
                  principles while adapting to serve our community's evolving
                  needs.
                </p>
                <p>
                  Today, ZHMBC stands as a beacon of hope in our community,
                  continuing our legacy of faith, fellowship, and service to
                  God's people.
                </p>
              </div>
            </div>
            <div className="relative  rounded-lg overflow-hidden shadow-lg">
              <img
                src={placeholder}
                alt="Historic Church Photo"
                className="w-full object-cover overflow-hidden h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
              <PrayingHands className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <value.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
              <Cross className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold">What We Believe</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {beliefs.map((belief, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{belief.title}</h3>
                <p className="text-gray-600">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Visit Us This Sunday</h2>
            <p className="text-gray-600 mb-8">
              We welcome you to join us for worship and fellowship. Experience
              the warmth of our church family and the power of God's word in
              your life.
            </p>
            <div className="inline-block bg-white px-6 py-4 rounded-lg shadow-md">
              <p className="font-semibold text-gray-800">
                Sunday Service: 10:00 AM
              </p>
              <p className="text-gray-600">5129 NW 17th Ave, Miami, FL 33142</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
