import React from 'react';
import PropTypes from 'prop-types';

const AboutSite = ({ className = '', variant = 'blue', image, title, description, bullets = [] }) => {
  const isGreen = variant === 'green';
  const accentColor = isGreen ? 'emerald' : 'blue';

  return (
    <section className={`card-premium ${className} border-l-4 ${isGreen ? 'border-emerald-500' : 'border-blue-500'} group relative overflow-hidden`}>
      {/* Subtle Background Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-${accentColor}-500/10 transition-all duration-500`}></div>

      <div className="flex gap-8 items-start sm:items-center flex-col md:flex-row relative z-10">
        <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-${accentColor}-500/5 border border-${accentColor}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {image ? <img src={image} alt="icon" className={`w-12 h-12 object-contain filter grayscale-0`} /> : <span className="text-4xl">🏥</span>}
        </div>

        <div className="flex-1">
          <h3 className={`text-2xl font-black mb-3 transition-colors uppercase tracking-tight ${isGreen ? 'text-emerald-800' : 'text-blue-800'}`}>{title || 'About Quick Buy'}</h3>
          <p className="text-slate-600 leading-relaxed font-medium text-lg max-w-4xl">{description || 'Quick Buy is a premier healthcare technological platform providing authenticated clinical assets, high-precision medicines, and advanced health protocols.'}</p>

          {bullets.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {bullets.map((b, i) => (
                <span key={i} className={`inline-flex items-center px-4 py-1.5 rounded-full bg-${accentColor}-500/10 text-${accentColor}-400 text-sm font-semibold border border-${accentColor}-500/20`}>
                  <span className="mr-2">✓</span> {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

AboutSite.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['blue', 'green']),
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  bullets: PropTypes.array,
};

export default AboutSite;
