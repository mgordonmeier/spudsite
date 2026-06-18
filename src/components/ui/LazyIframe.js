import React, { useRef, useEffect, useState } from 'react';

function LazyIframe({ src, title, className, style, allow, allowFullScreen, width, height }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      });
      obs.observe(ref.current);
      return () => obs.disconnect();
    }
    // Fallback: immediately show
    setVisible(true);
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {visible ? (
        <iframe
          src={src}
          title={title}
          style={{ width: width || '100%', height: height || '100%', borderRadius: 4 }}
          frameBorder="0"
          allow={allow}
          allowFullScreen={allowFullScreen}
        />
      ) : (
        <div aria-hidden="true" style={{ width: width || '100%', height: height || '100%', background: '#000' }} />
      )}
    </div>
  );
}

export default LazyIframe;
