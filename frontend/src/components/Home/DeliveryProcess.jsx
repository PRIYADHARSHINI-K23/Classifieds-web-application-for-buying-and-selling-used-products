import deliveryImg from '../../../src/assets/images/Home/delivery.svg';

const DeliveryProcess = () => {
    const steps = [
        { title: 'Order Confirmed', desc: 'We verify and process your order for prescription checks and quality.', icon: deliveryImg },
        { title: 'Packed Securely', desc: 'Packaged carefully to preserve product integrity.', icon: deliveryImg },
        { title: 'Fast Delivery', desc: 'Reliable and trackable shipping to your doorstep.', icon: deliveryImg }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">How We Deliver</h2>
                <p className="text-sm text-gray-500">From order to delivery — our process for safe shipments</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {steps.map((s, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <img src={s.icon} alt={s.title} className="mx-auto w-16 h-16 mb-2" />
                        <h3 className="font-semibold text-gray-900">{s.title}</h3>
                        <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DeliveryProcess;
