import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Enable the button if the email has a valid Gmail format
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailValue);
    setIsButtonDisabled(!isValidEmail);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                <li key={item}>
                  <a
                    href="/"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                <li key={item}>
                  <a
                    href="/"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">Subscribe</h3>
            <p className="text-gray-600 text-sm mb-4">
              Join our newsletter to stay up-to-date with our latest features.
            </p>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isButtonDisabled}  // Disable the button when email is invalid
                className={`${
                  subscribed
                    ? "bg-green-600"
                    : isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600"
                } text-white px-4 py-2 rounded-r-md hover:${
                  subscribed
                    ? "bg-green-700"
                    : isButtonDisabled
                    ? ""
                    : "bg-blue-700"
                } transition duration-200`}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          {/* Removed the "All rights reserved" text */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
