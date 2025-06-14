import React from "react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: [
      "Shorten unlimited links",
      "Basic dashboard",
      "Public analytics",
      "Basic spam protection"
    ],
    cta: "Get Started",
    bg: "bg-white",
    text: "text-gray-900",
    border: "border-gray-200"
  },
  {
    name: "Pro",
    price: "₹99/mo",
    features: [
      "Everything in Free",
      "Link expiration options",
      "Custom slugs",
      "Geo analytics",
      "Safe browsing filter"
    ],
    cta: "Upgrade to Pro",
    bg: "bg-blue-50",
    text: "text-blue-900",
    border: "border-blue-300"
  },
  {
    name: "Advanced",
    price: "₹199/mo",
    features: [
      "Everything in Pro",
      "AI spam detection",
      "Bulk shortening API",
      "Drive & Gmail integration",
      "Priority support"
    ],
    cta: "Go Advanced",
    bg: "bg-yellow-50",
    text: "text-yellow-900",
    border: "border-yellow-300"
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6 text-black">Choose Your Plan</h2>
        <p className="text-center text-gray-600 mb-10">
          Scale your link shortening experience with powerful AI & analytics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 shadow-xl ${plan.bg} ${plan.text} border ${plan.border}`}
            >
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2 text-green-600">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-black text-white py-2 rounded-xl hover:bg-opacity-80 transition">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
