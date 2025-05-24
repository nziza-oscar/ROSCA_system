
import React from 'react';
import { Link } from 'react-router-dom';

const FaqsPage = () => {
  const faqItems = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, mobile money, and bank transfers. All payments are processed securely."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery times vary depending on your location. Typically, orders are delivered within 3-5 business days for urban areas and 5-7 business days for rural areas. You'll receive tracking information once your order ships."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 14 days of delivery for most items. Products must be unused, in original packaging with tags attached. Some items like perishables and personal care products are non-returnable."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with a tracking number and link. You can also check your order status by logging into your account and viewing your order history."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className=" mb-12">
          <h1 className="text-3xl font-extrabold  text-primary sm:text-4xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-600">
            Find answers to common questions about shopping with us
          </p>
        </div>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5">
                <h3 className="text-lg font-medium text-slate-700 mb-3">
                  {index+1}. {item.question}
                </h3>
                <p className="text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Still have questions?
          </h3>
          <Link to="/contact" className="btn bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;