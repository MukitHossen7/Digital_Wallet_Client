const StorySection = () => {
  return (
    <div>
      <section className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Story</h2>
          <h3 className="text-xl font-medium mb-3">
            How NeoPay started and where we are now
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            NeoPay started with a simple mission: to make digital financial
            transactions simple, fast, and secure. We envisioned a platform
            where users, agents, and businesses can manage money effortlessly
            without worrying about security or delays.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Over the years, we have grown into a trusted digital wallet system
            with thousands of satisfied users. Our continuous innovation ensures
            that everyone can access financial services anytime, anywhere.
          </p>
        </div>
      </section>
    </div>
  );
};

export default StorySection;
