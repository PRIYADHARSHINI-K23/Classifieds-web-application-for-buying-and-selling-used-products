const HomeAboutShort = () => {
    return (
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Who We Are</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We are dedicated to making quality healthcare products accessible to every household. We curate products from licensed suppliers and ensure authenticity in every order.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
                        <p className="text-gray-700 text-sm">To provide reliable medical products, trusted advice, and fast delivery to improve people’s health and well-being.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Our Vision</h3>
                        <p className="text-gray-700 text-sm">To be the most trusted online pharmacy and healthcare partner for customers nationwide.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAboutShort;
