const Stats = () => {
    const stats = [
        { number: '10K+', label: 'Products Available' },
        { number: '50K+', label: 'Happy Customers' },
        { number: '24/7', label: 'Customer Support' }
    ];

    return (
        <section className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl shadow-xl p-8 sm:p-12 text-white mt-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {stats.map((s, i) => (
                        <div key={i}>
                            <p className="text-4xl sm:text-5xl font-bold mb-2">{s.number}</p>
                            <p className="text-blue-100">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
