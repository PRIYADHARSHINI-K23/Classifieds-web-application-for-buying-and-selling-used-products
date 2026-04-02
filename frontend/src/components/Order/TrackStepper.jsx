import { Step, StepLabel, Stepper } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { formatDate } from '../../utils/functions';

const TrackStepper = ({ activeStep, orderOn, shippedAt, deliveredAt }) => {

    const steps = [
        {
            status: "Ordered",
            dt: formatDate(orderOn),
        },
        {
            status: "Shipped",
            dt: formatDate(shippedAt),
        },
        {
            status: "Delivered",
            dt: formatDate(deliveredAt),
        },
    ];

    const completedIcon = (
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <i className="material-icons text-xl">✅</i>
        </div>
    );
    const activeIcon = (
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 animate-pulse">
            <i className="material-icons text-xl animate-spin-slow">🔄</i>
        </div>
    );
    const pendingIcon = (
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-200 border border-blue-100">
            <i className="material-icons text-xl">⏳</i>
        </div>
    );

    return (
        <div className="w-full py-10">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index}
                        completed={activeStep > index}
                    >
                        <StepLabel
                            icon={
                                activeStep > index ? completedIcon : (activeStep === index ? activeIcon : pendingIcon)
                            }
                        >
                            <div className="flex flex-col gap-1 mt-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep >= index ? 'text-blue-950' : 'text-blue-900/30'}`}>
                                    {item.status}
                                </span>
                                {item.dt !== "Invalid Date" && (
                                    <span className="text-[9px] font-bold italic text-blue-900/40 uppercase">
                                        {item.dt}
                                    </span>
                                )}
                            </div>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default TrackStepper;
