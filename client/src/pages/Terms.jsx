import React from 'react'

export const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-primary mb-8">Terms and Conditions</h1>

  <div className="space-y-6">
    {/* Section 1 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">1. Introduction</h2>
      <p className="text-gray-600">
        Welcome to NileMart. By accessing or using our website, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services.
      </p>
    </section>

    {/* Section 2 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">2. Account & User Responsibilities</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Users must provide accurate information when creating an account or placing an order.</li>
        <li>NileMart reserves the right to suspend or terminate accounts for fraudulent activities.</li>
      </ul>
    </section>

    {/* Section 3 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">3. Orders & Payments</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>All orders are subject to availability and confirmation.</li>
        <li>Payments must be completed before order processing.</li>
        <li>We accept various payment methods, including mobile money, credit/debit cards, and bank transfers.</li>
      </ul>
    </section>

    {/* Section 4 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">4. Shipping & Delivery</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Delivery times vary depending on location and product availability.</li>
        <li>NileMart is not responsible for delays caused by third-party couriers or unforeseen circumstances.</li>
        <li>Customers must provide a correct address to avoid delivery issues.</li>
      </ul>
    </section>

    {/* Section 5 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">5. Returns & Refunds</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Products can be returned within a specified period if they are unused and in original packaging.</li>
        <li>Refunds are processed after verification and may take a few business days.</li>
        <li>Some items (e.g., perishables, personal care products) are non-refundable.</li>
      </ul>
    </section>

    {/* Section 6 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">6. Product Pricing & Availability</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Prices are subject to change without prior notice.</li>
        <li>NileMart reserves the right to correct pricing errors and cancel orders if necessary.</li>
      </ul>
    </section>

    {/* Section 7 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">7. Privacy Policy</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>We collect and process personal information as outlined in our Privacy Policy.</li>
        <li>Your data is protected and will not be shared with third parties without consent.</li>
      </ul>
    </section>

    {/* Section 8 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">8. Limitation of Liability</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>NileMart is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</li>
        <li>Users assume all risks associated with product use.</li>
      </ul>
    </section>
    {/* Section 9 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">9. Changes to Terms</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>NileMart reserves the right to update these Terms and Conditions at any time.</li>
        <li>Continued use of our platform means acceptance of any changes.</li>
      </ul>
    </section>

    {/* Section 10 */}
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-primary mb-3">10. Contact Information</h2>
      <p className="text-gray-600">
        For any questions or concerns regarding these Terms, please contact us at [nilemart contact email/phone number].
      </p>
    </section>
  </div>
</div>
  )
}
