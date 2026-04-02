import brand1 from '../../../src/assets/images/Home/brand1.svg';
import brand2 from '../../../src/assets/images/Home/brand2.svg';

const TopBrands = () => {
    const brands = [brand1, brand2, brand1, brand2];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Top Brands</h2>
                <p className="text-sm text-gray-500">Trusted brands and partners</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
                {brands.map((b, i) => (
                    <div key={i} className="flex items-center justify-center bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <img src={b} alt={`brand-${i}`} className="w-24 h-auto object-contain" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopBrands;
