type Tier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Basic",
    price: "$0 / month",
    description: "For casual users to start sending & receiving money.",
    features: [
      "Wallet creation",
      "Send money up to $500/month",
      "View transaction history",
    ],
  },
  {
    name: "Pro",
    price: "$9.99 / month",
    description: "For regular users who want more transaction limits.",
    features: [
      "All Basic features",
      "Send money up to $5000/month",
      "Priority support",
      "Access to analytics dashboard",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$29.99 / month",
    description: "For businesses or high-volume users.",
    features: [
      "All Pro features",
      "Unlimited transactions",
      "Dedicated account manager",
      "Advanced reporting",
    ],
  },
];

const PricingSection = () => {
  return (
    <div className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Pricing Plans
      </h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center">
        Choose a plan that suits your wallet usage.
      </p>

      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`border rounded-xl p-6 shadow-sm transition transform hover:scale-105 duration-300
              ${
                tier.popular
                  ? "border-gray-700 dark:border-gray-200 border-2"
                  : ""
              }`}
          >
            {tier.popular && (
              <div
                className="text-xs font-semibold uppercase mb-2 max-w-28 px-2 py-1 rounded-full 
                border border-gray-800 dark:border-gray-200 
                text-gray-800 dark:text-gray-200 
                bg-gray-200 dark:bg-gray-900 
                text-center"
              >
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {tier.name}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {tier.description}
            </p>
            <p className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white">
              {tier.price}
            </p>
            <ul className="mt-6 space-y-2">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`mt-6 w-full rounded-lg py-2 px-4 font-semibold transition duration-200
    ${
      tier.popular
        ? "bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        : "bg-gray-200 text-gray-900 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-600"
    }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
