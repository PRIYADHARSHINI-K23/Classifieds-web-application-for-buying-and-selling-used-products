import expertA from '../../../src/assets/images/Home/expert1.svg';
import expertB from '../../../src/assets/images/Home/expert2.svg';

const MeetOurExperts = () => {
    const experts = [
        { name: 'Dr. Neha Sharma', role: 'Chief Pharmacist', img: expertA },
        { name: 'Dr. Ajay Singh', role: 'Medical Advisor', img: expertB },
        { name: 'Ritu Verma', role: 'Nutritionist', img: expertA }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Meet Our Experts</h2>
                <p className="text-sm text-gray-500">Qualified professionals to guide you</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {experts.map((ex, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <img src={ex.img} alt={ex.name} className="mx-auto w-28 h-28 rounded-full object-cover mb-3" />
                        <h3 className="font-semibold text-gray-900">{ex.name}</h3>
                        <p className="text-sm text-gray-600">{ex.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MeetOurExperts;
