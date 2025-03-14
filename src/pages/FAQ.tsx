import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is the car import process?",
    answer: "The car import process involves selecting your desired vehicle, getting a price quotation, making payment, and waiting for delivery. We handle all shipping, customs clearance, and registration processes for you."
  },
  {
    question: "How long does it take to import a car?",
    answer: "The typical import timeline is 4-8 weeks, depending on the source country and shipping method. This includes procurement, shipping, customs clearance, and local registration."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, M-PESA, and other secure payment methods. We can also assist with financing options through our partner banks."
  },
  {
    question: "Do you offer warranty on imported cars?",
    answer: "Yes, all our imported vehicles come with a 3-month warranty covering major mechanical components. Extended warranty options are available for purchase."
  },
  {
    question: "Can I request a specific car that's not listed?",
    answer: "Yes, we can source specific vehicles based on your requirements. Contact our team with your preferences, and we'll help find your dream car."
  },
  {
    question: "What documents do I need to import a car?",
    answer: "You'll need a valid ID, KRA PIN, and proof of residence. We'll guide you through any additional documentation required during the import process."
  },
  {
    question: "Do you handle customs clearance?",
    answer: "Yes, we handle all aspects of customs clearance, including duty payments and documentation. Our experienced team ensures smooth processing."
  },
  {
    question: "What are the import duties and taxes?",
    answer: "Import duties vary based on the vehicle's age, engine capacity, and value. We provide detailed cost breakdowns including all taxes and duties in our quotations."
  },
  {
    question: "Can I track my car's shipping status?",
    answer: "Yes, we provide regular updates and tracking information once your vehicle is shipped. You can monitor its progress through our customer portal."
  },
  {
    question: "Do you offer after-sales service?",
    answer: "Yes, we provide comprehensive after-sales support including maintenance services, repairs, and parts sourcing through our network of certified workshops."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Frequently Asked Questions</h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;