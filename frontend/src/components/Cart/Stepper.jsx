import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';

const Stepper = ({ activeStep, children }) => {

    const { user } = useSelector((state) => state.user);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`;

    const steps = [
        {
            label: "LOGIN",
            desc: <p className="font-medium text-sm">{user.name} <span className="text-sm font-normal">{user.email}</span></p>
        },
        {
            label: "DELIVERY ADDRESS",
            desc: <p className="font-medium text-sm">{user.name} <span className="text-sm font-normal">{address}</span></p>
        },
        {
            label: "ORDER SUMMARY",
            desc: <p className="font-medium text-sm">{cartItems.length} Item</p>
        },
        {
            label: "PAYMENT OPTIONS",
            desc: <p className="font-medium text-sm">Paytm</p>
        }
    ]

    return (
        <div className="flex flex-col gap-6">

            {steps.map((step, index) => {

                return (
                    <div key={index} className="w-full">
                        {activeStep === index ? (
                            <div className="flex flex-col animate-fade-in-up">
                                <div className="flex items-center rounded-t-[2.5rem] bg-blue-600 px-10 py-5 gap-6 shadow-xl shadow-blue-600/20">
                                    <span className="h-8 w-8 flex items-center justify-center text-xs font-black bg-white rounded-xl text-blue-600 shadow-lg">{index + 1}</span>
                                    <h2 className="font-black text-white text-sm uppercase tracking-[0.2em]">{step.label}</h2>
                                </div>
                                {children}
                            </div>
                        ) : (
                            <Step
                                isDesc={activeStep > index}
                                {...step}
                                index={index}
                            />
                        )}
                    </div>
                )
            })}

        </div>
    );
};

const Step = ({ isDesc, label, desc, index }) => {
    return (
        <div className={`flex items-center bg-white/50 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-blue-50 transition-all duration-700 ${isDesc ? 'opacity-100' : 'opacity-40'}`}>
            <span className={`w-10 h-10 flex items-center justify-center text-[10px] font-black rounded-xl mr-6 transition-all duration-700 ${isDesc ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-blue-50 text-blue-300'}`}>
                {isDesc ? <CheckIcon sx={{ fontSize: 16 }} /> : (index + 1)}
            </span>
            <div className="flex flex-col">
                <h2 className={`font-black uppercase tracking-[0.2em] text-[10px] ${isDesc ? 'text-blue-900' : 'text-blue-900/40'}`}>
                    {label}
                </h2>
                {isDesc && (
                    <div className="mt-1 text-[11px] font-bold text-blue-600/40 italic">
                        {desc}
                    </div>
                )}
            </div>
            {isDesc && (
                <div className="ml-auto flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Verified</span>
                </div>
            )}
        </div>
    )
}

export default Stepper;
