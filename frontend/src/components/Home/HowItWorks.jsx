import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const HowItWorks = () => {
    const steps = [
        {
            icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#0ea5e9' }} />,
            title: "Choose Products",
            description: "Browse categories, search products, and check details for every item."
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 36, color: '#06b6d4' }} />,
            title: "Quick Delivery",
            description: "Add to cart and we deliver to your doorstep quickly and safely."
        },
        {
            icon: <SupportAgentIcon sx={{ fontSize: 36, color: '#7c3aed' }} />,
            title: "Expert Support",
            description: "Our healthcare professionals are ready to help with queries."
        }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {steps.map((s, idx) => (
                    <div key={idx} className="flex flex-col items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm">{s.icon}</div>
                        <h3 className="font-semibold text-gray-900">{s.title}</h3>
                        <p className="text-sm text-gray-600">{s.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
