// Text-only about cards (no images/icons)

const AboutCards = () => {
   const values = [
    {
        title: "Free Delivery",
        description: "Zero shipping cost on orders above ₹499. Delivered in 2-4 days."
    },
    {
        title: "Easy Returns",
        description: "15-day hassle-free returns. Pickup from your doorstep."
    },
    {
        title: "Secure Payments",
        description: "100% encrypted transactions. UPI, Cards, EMI & COD available."
    },
    {
        title: "Authentic Products",
        description: "100% genuine products with brand warranty and bill."
    },
    {
        title: "24/7 Support",
        description: "Chat, email & call support. We're here whenever you need us."
    },
    {
        title: "Price Match",
        description: "Found it cheaper? We'll match the price within 7 days."
    }
];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutCards;