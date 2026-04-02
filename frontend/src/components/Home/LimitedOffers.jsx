import { offerProducts } from '../../../utils/constants';

const LimitedOffers = () => {
    const offers = offerProducts.slice(0, 8);

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-8 bg-red-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Limited Time Offers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {offers.map((o, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-1">{o.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{o.offer}</p>
                        <p className="text-xs text-gray-600">{o.tag}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LimitedOffers;
