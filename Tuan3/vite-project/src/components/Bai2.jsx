import React, { useState, useEffect } from 'react';

function UseEffectBasic() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock">
      <h2>Digital Clock</h2>
      <div className="time">{now.toLocaleTimeString()}</div>
    </div>
  );
}

export default UseEffectBasic;
