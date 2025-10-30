const FeatureComparison = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Compare Features
        </h2>
        <div className="mt-8 overflow-x-auto rounded">
          <table className="min-w-full border border-gray-200 dark:border-gray-700">
            <thead className="">
              <tr>
                <th className="py-3 px-4 text-left">Features</th>
                <th className="py-3 px-4 text-center">Basic</th>
                <th className="py-3 px-4 text-center">Pro</th>
                <th className="py-3 px-4 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Wallet Creation",
                "Send Money Limit",
                "Priority Support",
                "Analytics Dashboard",
                "Dedicated Manager",
              ].map((feature) => (
                <tr
                  key={feature}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {feature}
                  </td>
                  <td className="py-3 px-4 text-center">✔</td>
                  <td className="py-3 px-4 text-center">✔</td>
                  <td className="py-3 px-4 text-center">✔</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;
