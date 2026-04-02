import expertImg from '../../assets/images/Home/expert.svg';

const HomeExperts = () => {
    const experts = [
        { name: 'Dr. Neha Sharma', role: 'Chief Pharmacist', desc: 'Pharmaceutical expertise and patient counselling.' },
        { name: 'Dr. Anand Singh', role: 'Medical Advisor', desc: 'Clinical oversight and drug interactions.' },
        { name: 'Suman Verma', role: 'Nutritionist', desc: 'Diet and wellness solutions for all ages.' }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Meet Our Experts</h2>
                <p className="text-sm text-gray-500">Qualified healthcare professionals who care</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {experts.map((e, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg border border-gray-100 p-4 text-center hover:shadow-md transition-shadow">
                        <img src={expertImg} alt={e.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900">{e.name}</h3>
                        <p className="text-xs text-gray-500">{e.role}</p>
                        <p className="text-sm text-gray-600 mt-2">{e.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeExperts;