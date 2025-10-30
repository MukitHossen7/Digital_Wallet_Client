const PricingFAQ = () => {
  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan anytime.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Refunds are provided within 14 days of subscription for eligible plans.",
    },
    {
      question: "Are there hidden fees?",
      answer: "No, all fees are transparent and mentioned in each plan.",
    },
  ];

  return (
    <div className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Pricing FAQs
      </h2>
      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 ">
            <h3 className="font-semibold ">{faq.question}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingFAQ;
