const Testimonials = () => {
    const data = [
        {
            name: 'Sita Sharma',
            text: 'Excellent service — fast delivery and authentic products. Highly recommend!',
            role: 'Verified Buyer'
        },
        {
            name: 'Rajesh Kumar',
            text: 'Customer support helped me choose the right medicines and explained dosage clearly.',
            role: 'Customer'
        },
        {
            name: 'Anita Singh',
            text: 'Reliable and trustworthy. The quality of products is top-notch.',
            role: 'Regular Customer'
        }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">What Our Customers Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {data.map((d, i) => (
                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100" key={i}>
                        <p className="text-gray-700 mb-4">"{d.text}"</p>
                        <p className="font-semibold text-gray-900">{d.name}</p>
                        <p className="text-sm text-gray-600">{d.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
