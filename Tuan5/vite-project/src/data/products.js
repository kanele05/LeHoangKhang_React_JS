// Dữ liệu sản phẩm tĩnh — mô phỏng API response
export const PRODUCTS = [
  {
    id: 1,
    name: 'Mechanical Keyboard',
    price: 1_250_000,
    emoji: '⌨️',
    category: 'Peripherals',
    description: 'RGB, TKL layout, Cherry MX switches',
  },
  {
    id: 2,
    name: 'Gaming Mouse',
    price: 650_000,
    emoji: '🖱️',
    category: 'Peripherals',
    description: 'DPI 400–16000, 6 programmable buttons',
  },
  {
    id: 3,
    name: 'Monitor 27"',
    price: 5_990_000,
    emoji: '🖥️',
    category: 'Display',
    description: '2K IPS, 165Hz, 1ms response time',
  },
  {
    id: 4,
    name: 'USB-C Hub',
    price: 450_000,
    emoji: '🔌',
    category: 'Accessories',
    description: '7-in-1: HDMI, USB-A x3, SD, PD 100W',
  },
  {
    id: 5,
    name: 'Webcam 1080p',
    price: 890_000,
    emoji: '📷',
    category: 'Accessories',
    description: 'Auto-focus, built-in dual mic',
  },
  {
    id: 6,
    name: 'Headset Pro',
    price: 1_490_000,
    emoji: '🎧',
    category: 'Audio',
    description: '7.1 surround, noise-cancelling mic',
  },
  {
    id: 7,
    name: 'Desk Lamp LED',
    price: 320_000,
    emoji: '💡',
    category: 'Accessories',
    description: 'Adjustable brightness, USB powered',
  },
  {
    id: 8,
    name: 'Laptop Stand',
    price: 280_000,
    emoji: '💻',
    category: 'Accessories',
    description: 'Aluminum, adjustable height 6 levels',
  },
];

export const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
