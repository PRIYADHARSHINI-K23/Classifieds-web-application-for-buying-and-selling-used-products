import React from 'react';
import brandImg from '../../assets/images/Home/brand.svg';
import expertImg from '../../assets/images/Home/expert.svg';
import deliveryImg from '../../assets/images/Home/delivery.svg';
import tipsImg from '../../assets/images/Home/health_tips.svg';

const features = [
  { title: 'Verified Medicines', img: brandImg, desc: 'Authentic products from licensed vendors.' },
  { title: 'Specialist Support', img: expertImg, desc: 'Consult with healthcare professionals 24/7.' },
  { title: 'Express Delivery', img: deliveryImg, desc: 'Rapid fulfillment across all major cities.' },
  { title: 'Wellness Insights', img: tipsImg, desc: 'Expert health guides and medical articles.' },
];

const HomeHighlights = () => {
  return (
    <section className="bg-transparent py-4 text-left">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div key={i} className="card-premium group hover:bg-blue-50 transition-all duration-700">
            <div className="relative mb-8">
              <div className="w-20 h-20 flex items-center justify-center rounded-[2rem] bg-blue-600 shadow-2xl group-hover:rotate-[15deg] transition-all duration-700 overflow-hidden shadow-blue-600/20">
                <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all"></div>
                <img src={f.img} alt={f.title} className="w-10 h-10 object-contain relative z-10 brightness-200" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-lg group-hover:scale-110 transition-transform font-black text-xs">
                0{i + 1}
              </div>
            </div>

            <h4 className="text-xl font-black text-blue-950 mb-4 uppercase tracking-tighter leading-none">{f.title}</h4>
            <div className="w-12 h-1 bg-blue-600 mb-6 group-hover:w-full transition-all duration-700"></div>
            <p className="text-[11px] text-blue-800/60 leading-relaxed font-black uppercase tracking-widest">{f.desc}</p>

            <div className="mt-10 pt-8 border-t border-blue-100 flex items-center justify-between">
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em]">Access Info</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeHighlights;
