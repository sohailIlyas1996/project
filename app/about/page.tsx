import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-100">About Genuine Spare Parts</h1>
          <p className="mt-4 text-xl text-gray-400">
            Quality Automotive Parts You Can Trust
          </p>
        </div>
        
        <div className="mt-12 text-lg text-gray-300">
          <p>
            At Genuine Spare Parts, we are dedicated to providing the highest-quality parts for your
            vehicles, machinery, and equipment. Our mission is to deliver reliable, durable, and
            certified genuine spare parts that ensure your machines run smoothly and safely.
          </p>

          <div className="mt-8 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-100">Our Mission</h2>
            <p>
              We strive to offer a wide selection of genuine parts for all major automotive brands and
              machinery, ensuring that our customers receive the best quality products at competitive prices.
              Our mission is to provide peace of mind, knowing that your vehicle or machinery is equipped
              with the most reliable and authentic parts.
            </p>

            <h2 className="text-3xl font-semibold text-gray-100">Our Vision</h2>
            <p>
              We envision becoming a leading global supplier of genuine spare parts, offering easy access to
              a vast range of products that meet the highest standards of quality and safety. We aim to build
              long-lasting relationships with our customers, providing them with exceptional service and support.
            </p>

            <h2 className="text-3xl font-semibold text-gray-100">Our Values</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-gray-300">Authenticity: Only genuine parts from trusted manufacturers.</li>
              <li className="text-gray-300">Reliability: We provide parts that ensure your equipment performs at its best.</li>
              <li className="text-gray-300">Customer satisfaction: Our commitment to delivering the best service and products.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-100">Contact Us</h3>
          <p className="text-gray-400 mt-4">
            Need help finding the right spare part or have questions about our products? Reach out to us at
            <a href="mailto:sohaililyas487@gmail.com" className="text-blue-400 hover:text-blue-600">
              support@genuinespareparts.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
