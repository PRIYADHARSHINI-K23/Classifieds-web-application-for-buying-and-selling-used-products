import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className="min-h-screen min-w-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Pulsing Medical Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative flex flex-col items-center gap-12 z-10">
        {/* Premium Clinical Spinner */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 border-8 border-blue-600/10 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

          {/* Inner Pulse Node */}
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping"></div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-1 bg-blue-600 rounded-full"></span>
            <h2 className="text-sm font-black text-blue-900/40 uppercase tracking-[0.4em]">Resource Initialization</h2>
            <span className="w-10 h-1 bg-blue-600 rounded-full"></span>
          </div>
          <p className="text-[10px] font-black text-blue-950 uppercase tracking-[0.2em] italic opacity-80 animate-pulse">Synchronizing Data Streams...</p>
        </div>
      </div>

      {/* Micro-Carbon Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.03] pointer-events-none"></div>
    </div>
  );
};

export default Loader;
