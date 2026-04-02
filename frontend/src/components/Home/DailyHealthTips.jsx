const DailyHealthTips = () => {
    const tips = [
        { title: 'Stay Hydrated', desc: 'Drink at least 8 glasses of water daily for overall health.' },
        { title: 'Balanced Diet', desc: 'Include a variety of foods: proteins, fruits, and vegetables.' },
        { title: 'Sleep Well', desc: 'Aim for 7-8 hours of quality sleep every night.' },
        { title: 'Exercise', desc: '30 minutes of daily activity improves mood and health.' }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Daily Health Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {tips.map((t, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-1">{t.title}</h3>
                        <p className="text-sm text-gray-600">{t.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DailyHealthTips;
