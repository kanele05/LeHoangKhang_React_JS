import React, { useMemo, useState, useRef } from 'react';

function generateProducts(count) {
  const products = new Array(count).fill(null).map((_, i) => {
    const price = Math.round((Math.random() * 990 + 10) * 100) / 100; // 10..1000
    return { id: i + 1, name: `Product ${i + 1}`, price };
  });
  return products;
}

function ProductFiller() {
  const [count, setCount] = useState(3000);
  const [search, setSearch] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [optimized, setOptimized] = useState(true);
  const products = useMemo(() => generateProducts(count), [count]);

  const labelPrefix = optimized ? 'optimized' : 'unoptimized';

  const computeUnoptimized = () => {
    console.time('filter - unoptimized');
    const f = products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (min !== '' && p.price < Number(min)) return false;
      if (max !== '' && p.price > Number(max)) return false;
      return true;
    });
    console.timeEnd('filter - unoptimized');

    console.time('total - unoptimized');
    const t = f.reduce((s, p) => s + p.price, 0);
    console.timeEnd('total - unoptimized');

    return { list: f, total: t };
  };

  const filteredMemo = useMemo(() => {
    console.time('filter - optimized');
    const f = products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (min !== '' && p.price < Number(min)) return false;
      if (max !== '' && p.price > Number(max)) return false;
      return true;
    });
    console.timeEnd('filter - optimized');
    return f;
  }, [products, search, min, max]);

  const totalMemo = useMemo(() => {
    console.time('total - optimized');
    const t = filteredMemo.reduce((s, p) => s + p.price, 0);
    console.timeEnd('total - optimized');
    return t;
  }, [filteredMemo]);

  let filtered, total;
  if (optimized) {
    filtered = filteredMemo;
    total = totalMemo;
  } else {
    const r = computeUnoptimized();
    filtered = r.list;
    total = r.total;
  }

  const visible = filtered.slice(0, 100);

  return (
    <div>
      <h2>Product Filter + Total ({count} products)</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <label>
          Count:
          <select value={count} onChange={e => setCount(Number(e.target.value))}>
            <option value={1000}>1000</option>
            <option value={2000}>2000</option>
            <option value={3000}>3000</option>
            <option value={5000}>5000</option>
          </select>
        </label>

        <label>
          Search:
          <input value={search} onChange={e => setSearch(e.target.value)} />
        </label>

        <label>
          Min price:
          <input type="number" value={min} onChange={e => setMin(e.target.value)} />
        </label>

        <label>
          Max price:
          <input type="number" value={max} onChange={e => setMax(e.target.value)} />
        </label>

        <label>
          Optimized:
          <input type="checkbox" checked={optimized} onChange={e => setOptimized(e.target.checked)} />
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Filtered count:</strong> {filtered.length} &nbsp; <strong>Total:</strong> {total.toFixed(2)}
        <div style={{ fontSize: 12, color: '#666' }}>Showing first {visible.length} items to avoid heavy DOM</div>
      </div>

      <ul style={{ maxHeight: 300, overflow: 'auto' }}>
        {visible.map(p => (
          <li key={p.id}>{p.name} - ${p.price.toFixed(2)}</li>
        ))}
      </ul>

      <div style={{ marginTop: 12, fontSize: 12, color: '#444' }}>
        Open the console to see timing logs for filter and total computations. Toggle "Optimized" to compare.
      </div>
    </div>
  );
}

export default ProductFiller;
