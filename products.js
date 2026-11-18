// Cơ sở dữ liệu sản phẩm cao cấp - Nếp Tóc Hair Accessories Boutique
const PRODUCTS = [
  // Nhóm 1: Kẹp càng cua (Claw Clips)
  {
    id: 1,
    name: "Kẹp Càng Cua Hoa Sứ Pastel Pháp",
    category: "claw",
    categoryName: "Kẹp càng cua",
    price: 45000,
    originalPrice: 65000,
    rating: 4.9,
    reviewsCount: 142,
    description: "Chất liệu nhựa Acrylic bóng mờ cao cấp, lò xo thép không gỉ 8 vòng chịu lực, kẹp chắc mọi độ dày tóc mà không đau da đầu.",
    emoji: "🌸",
    spec: "Chiều dài: 11.5cm • Trọng lượng: 28g",
    material: "Acrylic mờ & Thép titan",
    bgGradient: "radial-gradient(circle at 50% 40%, #fff0f3 0%, #ffd6dc 60%, #ffb3c1 100%)",
    accentColor: "#d94868",
    tag: "Bán chạy nhất",
    swatches: [
      { name: "Hồng phấn", color: "#ffccd5" },
      { name: "Kem sữa", color: "#fff3bf" },
      { name: "Trắng sứ", color: "#f1f3f5" }
    ]
  },
  {
    id: 2,
    name: "Kẹp Càng Cua Kim Loại Tối Giản Hàn Quốc",
    category: "claw",
    categoryName: "Kẹp càng cua",
    price: 65000,
    originalPrice: 85000,
    rating: 5.0,
    reviewsCount: 98,
    description: "Đúc rỗng từ hợp kim mạ vàng champagne 18K phủ bóng chống oxy hóa, phong cách chic thanh lịch cho quý cô công sở.",
    emoji: "✨",
    spec: "Chiều dài: 11.0cm • Trọng lượng: 35g",
    material: "Hợp kim mạ Champagne Gold",
    bgGradient: "radial-gradient(circle at 50% 40%, #fff9db 0%, #ffeaa7 60%, #fdcb6e 100%)",
    accentColor: "#d48806",
    tag: "Xu hướng 2026",
    swatches: [
      { name: "Vàng Champagne", color: "#ffe066" },
      { name: "Bạc Ánh Kim", color: "#ced4da" },
      { name: "Vàng Hồng", color: "#fcc2d7" }
    ]
  },
  {
    id: 3,
    name: "Kẹp Càng Cua Lông Nhung Thu Đông Cao Cấp",
    category: "claw",
    categoryName: "Kẹp càng cua",
    price: 55000,
    originalPrice: 75000,
    rating: 4.8,
    reviewsCount: 76,
    description: "Bọc vải nhung lông cừu mềm mịn tuyệt đối, ôm trọn lọn tóc dịu êm, mang lại vẻ ngoài ngọt ngào và ấm áp.",
    emoji: "🧸",
    spec: "Chiều dài: 12.0cm • Trọng lượng: 30g",
    material: "Lông nhung mịn & Khung ABS",
    bgGradient: "radial-gradient(circle at 50% 40%, #fdf0ed 0%, #fad2e1 60%, #e2b4bd 100%)",
    accentColor: "#ad4e65",
    tag: "Bộ sưu tập mới",
    swatches: [
      { name: "Nâu Mocha", color: "#d4a373" },
      { name: "Trắng Kem", color: "#fefae0" },
      { name: "Hồng Khói", color: "#e8b4b8" }
    ]
  },
  {
    id: 4,
    name: "Kẹp Càng Cua Cẩm Thạch Hổ Phách Vintage",
    category: "claw",
    categoryName: "Kẹp càng cua",
    price: 85000,
    originalPrice: 115000,
    rating: 5.0,
    reviewsCount: 165,
    description: "Vân đá cẩm thạch thủ công vân loang độc bản trên từng chiếc, bề mặt tráng men bóng gương sang trọng chuẩn tiểu thư.",
    emoji: "🐚",
    spec: "Chiều dài: 10.5cm • Trọng lượng: 32g",
    material: "Cellulose Acetate sinh học",
    bgGradient: "radial-gradient(circle at 50% 40%, #edf2f7 0%, #dbe4ee 60%, #a2b2c8 100%)",
    accentColor: "#3182ce",
    tag: "Bản giới hạn",
    swatches: [
      { name: "Hổ phách", color: "#c08552" },
      { name: "Cẩm thạch ngọc", color: "#84a98c" },
      { name: "Đá mắt mèo", color: "#6c757d" }
    ]
  },

  // Nhóm 2: Kẹp mái & Set (Hairpins & Sets)
  {
    id: 5,
    name: "Set 5 Kẹp Tăm Đính Ngọc Trai Nhân Tạo",
    category: "clip-set",
    categoryName: "Kẹp mái & Set",
    price: 75000,
    originalPrice: 95000,
    rating: 4.9,
    reviewsCount: 210,
    description: "Bộ 5 thanh kẹp tăm đính hạt ngọc ánh xà cừ kích cỡ đa dạng, tạo điểm nhấn kiêu sa cho tóc uốn lượn sóng hoặc tóc tết.",
    emoji: "🦪",
    spec: "Bộ gồm 5 chiếc • Chiều dài: 7.0cm",
    material: "Ngọc trai nhân tạo & Hợp kim mạ vàng",
    bgGradient: "radial-gradient(circle at 50% 40%, #f8f0fc 0%, #eebefa 60%, #d0bfff 100%)",
    accentColor: "#7950f2",
    tag: "Được yêu thích",
    swatches: [
      { name: "Ngọc trai trắng", color: "#f8f9fa" },
      { name: "Ngọc ánh kim", color: "#ffe066" },
      { name: "Xà cừ tím nhạt", color: "#eebefa" }
    ]
  },
  {
    id: 6,
    name: "Set 3 Kẹp Nơ Ruy Băng Lụa Tiểu Thư",
    category: "clip-set",
    categoryName: "Kẹp mái & Set",
    price: 60000,
    originalPrice: 80000,
    rating: 4.9,
    reviewsCount: 115,
    description: "Dải lụa Satin cao cấp xếp nơ phồng tự nhiên, đuôi nơ rũ mềm mại chuyển động theo từng bước chân của nàng.",
    emoji: "🎀",
    spec: "Bộ gồm 3 chiếc nơ • Bản rộng: 8.0cm",
    material: "Lụa Satin dệt kim & Xương kẹp mỏ vịt",
    bgGradient: "radial-gradient(circle at 50% 40%, #fff0f6 0%, #ffdeeb 60%, #fcc2d7 100%)",
    accentColor: "#c2255c",
    tag: "Độc quyền Nếp Tóc",
    swatches: [
      { name: "Đỏ Rượu Vang", color: "#9c36b5" },
      { name: "Đen Huyền Bí", color: "#343a40" },
      { name: "Hồng Pastel", color: "#f783ac" }
    ]
  },
  {
    id: 7,
    name: "Kẹp Bấm Giọt Nước Men Sứ Cổ Điển",
    category: "clip-set",
    categoryName: "Kẹp mái & Set",
    price: 35000,
    originalPrice: 50000,
    rating: 4.8,
    reviewsCount: 64,
    description: "Hình giọt nước viền uốn mềm mại, phủ lớp men sứ mịn lì chống trầy, kẹp mái giữ tóc con hoàn hảo suốt ngày dài.",
    emoji: "💧",
    spec: "Chiều dài: 6.8cm • Trọng lượng: 12g",
    material: "Thép lò xo tráng men cao cấp",
    bgGradient: "radial-gradient(circle at 50% 40%, #e6fcf5 0%, #c3fae8 60%, #63e6be 100%)",
    accentColor: "#0ca678",
    tag: "Thiết yếu",
    swatches: [
      { name: "Xanh Mint", color: "#63e6be" },
      { name: "Vàng Bơ", color: "#ffe066" },
      { name: "Tím Oải Hương", color: "#d0bfff" }
    ]
  },
  {
    id: 8,
    name: "Set 10 Kẹp Càng Cua Mini Hoa Cúc Nhí",
    category: "clip-set",
    categoryName: "Kẹp mái & Set",
    price: 50000,
    originalPrice: 70000,
    rating: 5.0,
    reviewsCount: 189,
    description: "Set 10 đóa hoa cúc nhí 10 sắc thái pastel trong trẻo, tha hồ tạo kiểu tóc bím nửa đầu phong cách mùa hè thanh xuân.",
    emoji: "🌼",
    spec: "Hộp mica 10 chiếc • Kích thước: 2.2cm/chiếc",
    material: "Nhựa resin hoa nổi 3D",
    bgGradient: "radial-gradient(circle at 50% 40%, #f4fce3 0%, #e9fac8 60%, #c0eb75 100%)",
    accentColor: "#74b816",
    tag: "Set tiết kiệm",
    swatches: [
      { name: "Pastel Mix", color: "#ffc9c9" },
      { name: "Hoa Cúc Trắng", color: "#ffffff" },
      { name: "Vàng Hướng Dương", color: "#ffe066" }
    ]
  }
];
