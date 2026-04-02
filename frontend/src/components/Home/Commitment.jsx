const Commitment = () => {
    const items = [
        { text: 'Quality Assurance: All products are sourced from licensed suppliers and verified for authenticity.' },
        { text: 'Expert Guidance: Our qualified pharmacists are available for assistance.' },
        { text: 'Fast Delivery: Reliable and timely service across the country.' },
        { text: 'Privacy & Safety: Personal and health data secured with highest standards.' },
        { text: 'Affordable Prices: Competitive pricing without compromising quality.' }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mt-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <div className="space-y-3 text-gray-700">
                {items.map((i, idx) => (
                    <p key={idx} className="flex items-start gap-3">✓ <span className="ml-1">{i.text}</span></p>
                ))}
            </div>
        </section>
    );
};

export default Commitment;
