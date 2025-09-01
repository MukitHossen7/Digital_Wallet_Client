import FAQHeader from "@/components/modules/faq/FAQHeader";
import FAQHelp from "@/components/modules/faq/FAQHelp";
import FAQAccordion from "@/components/modules/faq/FAQAccordion";

const FAQ = () => {
  return (
    <main className="py-14 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <div>
        <FAQHeader />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <FAQAccordion />
          </section>
          <FAQHelp />
        </div>
      </div>
    </main>
  );
};

export default FAQ;
