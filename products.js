// products.js — SoraHome data store (Dụng cụ vệ sinh & Tiện ích gia đình thông minh)
const PRODUCTS = [
  {
    id: 1,
    name: "Cây Gạt Nước Đầu Xoay 360 Độ",
    shortName: "Cây Gạt Nước Xoay 360°",
    category: "glass",
    categoryName: "Gạt Nước & Lau Kính",
    price: 39000,
    originalPrice: 58000,
    rating: 4.9,
    reviewsCount: 185,
    tag: "Bán chạy",
    variantType: "color",
    variantLabel: "Phiên bản & Màu sắc",
    description: "Khớp nối xoay linh hoạt 360 độ lách sạch mọi góc khuất, gầm bàn ghế. Lưỡi gạt silicon mềm áp sát bề mặt, gạt sạch 100% vệt nước và bọt xà phòng trên mặt kính, gương phòng tắm và sàn nhà.",
    longDesc: "Cây gạt nước thông minh SoraHome sở hữu cơ chế khớp xoay 360 độ đa hướng linh hoạt, cho phép bạn dễ dàng lách sâu vào các khe hẹp dưới chân tủ, gầm sofa hay mặt kính trên cao mà không cần nghiêng người hay với tay mỏi mệt. Thân cán bằng thép không gỉ (Inox) chống oxy hóa, nhẹ tênh nhưng chịu lực tì đè cực tốt. Lưỡi silicon dẻo bản rộng 35cm ép sát tuyệt đối vào mọi bề mặt phẳng (kính, gương, đá hoa cương, sàn gạch men), quét sạch toàn bộ nước đọng chỉ trong một đường lướt duy nhất, không để lại bất kỳ vệt ố nước hay gây trầy xước.",
    spec: "Chiều dài cán: ~125cm • Bản rộng lưỡi gạt: 35cm • Trọng lượng: ~280g • Trục xoay 360° cơ học",
    material: "Cán Inox chống gỉ, Khớp nhựa PP nguyên sinh & Lưỡi silicon đàn hồi cao cấp",
    cardBg: "#F0F9FF",
    cardAccent: "#0284C7",
    image: "images/products/cay-gat-nuoc-360-1.jpg",
    hoverImage: "images/products/cay-gat-nuoc-360-2.jpg",
    swatches: [
      { name: "Xanh Thiên Thanh (Cán 125cm)", image: "images/products/cay-gat-nuoc-360-1.jpg", color: "#38BDF8" },
      { name: "Trắng Bắc Âu (Cán 125cm)", image: "images/products/cay-gat-nuoc-360-2.jpg", color: "#F8FAFC" },
      { name: "Combo Cây + Lưỡi Silicon Dự Phòng", image: "images/products/cay-gat-nuoc-360-3.jpg", color: "#0284C7" }
    ]
  },
  {
    id: 2,
    name: "Cây Chà Góc Tường Gạt Nước 2in1",
    shortName: "Cây Chà Góc Tường 2in1",
    category: "bathroom",
    categoryName: "Vệ Sinh Phòng Tắm & Toilet",
    price: 62000,
    originalPrice: 92000,
    rating: 5.0,
    reviewsCount: 214,
    tag: "Góc hẹp chuyên dụng",
    variantType: "color",
    variantLabel: "Màu sắc & Phân loại",
    description: "Thiết kế đầu chổi hình vát nhọn chữ V 90 độ ôm sát góc tường và đường ron gạch. Tích hợp lông chải cước chà sạch rong rêu và lưỡi cao su gạt khô nước 2 trong 1.",
    longDesc: "Dụng cụ vệ sinh chuyên dụng giải quyết triệt để nỗi ám ảnh góc chết và vết ố vàng nơi chân tường, góc nhà tắm và đường chỉ gạch. Đầu cọ được uốn tạo hình chữ V góc nhọn 90 độ giúp các sợi cước mật độ cao len lỏi sâu vào các rãnh khe gạch nhỏ nhất để đánh bật rêu mốc. Ngay phía sau đầu chải là dải cao su gạt nước đàn hồi, giúp bạn cọ sạch đến đâu gạt khô ngay đến đó, giữ sàn nhà tắm luôn thông thoáng và ngăn ngừa vi khuẩn ẩm mốc sinh sôi. Chiều dài cán 115cm giúp bạn vệ sinh thoải mái ở tư thế đứng, hoàn toàn không cần quỳ gối hay khom lưng.",
    spec: "Chiều dài cán: ~115cm • Đầu cọ chữ V: ~23cm x 5cm • Trọng lượng: ~320g • Đầu nhọn 90°",
    material: "Cán Inox cường lực, Lông cước PP cứng chống mòn & Lưỡi cao su dẻo",
    cardBg: "#F8FAFC",
    cardAccent: "#0EA5E9",
    image: "images/products/cay-cha-goc-tuong-2in1-1.jpg",
    hoverImage: "images/products/cay-cha-goc-tuong-2in1-2.jpg",
    swatches: [
      { name: "Trắng Kem Bắc Âu (Cán Inox 115cm)", image: "images/products/cay-cha-goc-tuong-2in1-1.jpg", color: "#F8FAFC" },
      { name: "Xanh Mint Kháng Khuẩn", image: "images/products/cay-cha-goc-tuong-2in1-2.jpg", color: "#CCFBF1" },
      { name: "Ghi Xám Tối Giản", image: "images/products/cay-cha-goc-tuong-2in1-3.jpg", color: "#64748B" }
    ]
  },
  {
    id: 3,
    name: "Cây Chà Sàn Gạt Nước 3in1 (Kèm Nhíp Gắp Tóc)",
    shortName: "Cây Chà Sàn 3in1 Tích Hợp Nhíp",
    category: "bathroom",
    categoryName: "Vệ Sinh Phòng Tắm & Toilet",
    price: 75000,
    originalPrice: 110000,
    rating: 5.0,
    reviewsCount: 342,
    tag: "Bestseller Nhà Tắm",
    variantType: "color",
    variantLabel: "Màu sắc & Phân loại",
    description: "Đột phá 3 trong 1: Mặt lông cọ chà sạch cặn canxi sàn gạch, thanh gạt silicon vét khô nước đọng, và cây nhíp thông minh ẩn trong cán gắp tóc rụng nắp cống không bẩn tay.",
    longDesc: "Giải pháp toàn diện nhất cho sàn nhà vệ sinh và nhà tắm gia đình. Mặt trước trang bị hàng lông chải cước cứng cáp với mật độ dày giúp đánh bay nhanh chóng mọi mảng bám xà phòng, cặn canxi và vết ố vàng lâu ngày trên nền gạch. Mặt sau là thanh gạt silicon dẻo dai giúp gạt sạch nước tràn trên sàn, làm khô cấp tốc bề mặt để chống trơn trượt cho người già và trẻ nhỏ. Điểm sáng tạo độc quyền là chiếc nhíp chuyên dụng được gài ẩn giấu khéo léo bên trong chuôi cán cầm: chỉ cần rút nhẹ ra là bạn có thể gắp sạch tóc rụng và rác vụn mắc kẹt nơi miệng cống thoát nước mà bàn tay hoàn toàn không phải chạm vào chất bẩn.",
    spec: "Chiều dài cán: ~120cm • Bản chải rộng: 23cm • Trục xoay 120° trợ lực • Tích hợp nhíp gắp tóc ẩn",
    material: "Cán thép không gỉ dày dặn, Nhựa ABS chịu lực va đập, Lông cọ PP & Lưỡi silicon",
    cardBg: "#FFF7ED",
    cardAccent: "#F97316",
    image: "images/products/cay-cha-san-3in1-1.jpg",
    hoverImage: "images/products/cay-cha-san-3in1-4.jpg",
    swatches: [
      { name: "Trắng Cam Hiện Đại (Kèm Nhíp Ẩn)", image: "images/products/cay-cha-san-3in1-1.jpg", color: "#FB923C" },
      { name: "Trắng Xám Tối Giản", image: "images/products/cay-cha-san-3in1-2.jpg", color: "#E2E8F0" },
      { name: "Xanh Pastel Tinh Tế", image: "images/products/cay-cha-san-3in1-3.jpg", color: "#BAE6FD" }
    ]
  },
  {
    id: 4,
    name: "Cây Lau Nhà Tự Vắt Bàn Lau 45cm Siêu Sạch",
    shortName: "Cây Lau Nhà Tự Vắt 45cm",
    category: "floor",
    categoryName: "Vệ Sinh Sàn & Lau Nhà",
    price: 169000,
    originalPrice: 250000,
    rating: 5.0,
    reviewsCount: 428,
    tag: "Phòng Khách & Sàn Lớn",
    variantType: "color",
    variantLabel: "Bộ sản phẩm",
    description: "Bàn lau siêu rộng 45cm nhân đôi diện tích làm sạch. Cơ cấu con trượt trợ lực tự vắt kiệt nước đến 95% và gạt sạch tóc rụng mà tay không cần chạm nước bẩn.",
    longDesc: "Cây lau nhà tự vắt thông minh thế hệ mới từ SoraHome sở hữu bàn lau ngoại cỡ 45cm giúp rút ngắn 50% thời gian lau dọn toàn bộ ngôi nhà. Hệ thống con trượt vắt ép nước 2 chiều trợ lực mượt mà, vắt kiệt đến 95% lượng nước đọng và tự động gạt sạch các sợi tóc, lông thú cưng bám dính trên bề mặt giẻ mà đôi tay bạn hoàn toàn khô ráo, không phải giặt vắt cực nhọc. Tấm giẻ lau microfiber cao cấp dệt sợi nano tĩnh điện hút giữ bụi mịn tuyệt đối, thích hợp cho cả sàn gỗ tự nhiên, sàn gạch men bóng hay đá granite.",
    spec: "Bàn lau: 45cm x 12cm • Chiều dài cán: 140cm • Hệ con trượt trợ lực kép • Tặng kèm 2 giẻ lau Microfiber",
    material: "Cán Inox sơn tĩnh điện cao cấp, Khung bàn lau chịu lực & Tấm lau Microfiber siêu thấm hút",
    cardBg: "#F0FDF4",
    cardAccent: "#16A34A",
    image: "images/products/cay-lau-nha-tu-vat-45cm-1.jpg",
    hoverImage: "images/products/cay-lau-nha-tu-vat-45cm-2.jpg",
    swatches: [
      { name: "Trắng Tinh Tươm (Kèm 2 Tấm Lau)", image: "images/products/cay-lau-nha-tu-vat-45cm-1.jpg", color: "#F8FAFC" },
      { name: "Combo Tiết Kiệm (Kèm 4 Tấm Lau Microfiber)", image: "images/products/cay-lau-nha-tu-vat-45cm-3.jpg", color: "#E2E8F0" }
    ]
  },
  {
    id: 5,
    name: "Bộ Cọ Toilet 3in1 Cán Dài Chữ V Kèm Đế Ráo Nước",
    shortName: "Bộ Cọ Toilet 3in1 Cán Dài",
    category: "bathroom",
    categoryName: "Vệ Sinh Phòng Tắm & Toilet",
    price: 59000,
    originalPrice: 88000,
    rating: 4.9,
    reviewsCount: 176,
    tag: "Kháng Khuẩn Bồn Cầu",
    variantType: "color",
    variantLabel: "Màu sắc & Phân loại",
    description: "Đầu cọ uốn cong góc chữ V luồn sâu vào vành bồn cầu và họng xả. Tích hợp cọ phụ vệ sinh khe nút xả, cán dài chống bắn bẩn kèm hộp đế đựng thông gió tự khô.",
    longDesc: "Thiết kế chuyên sâu cho khu vực bồn cầu vệ sinh, nơi tích tụ nhiều vi khuẩn và vôi cặn nhất. Đầu chổi được đúc cong góc chữ V đặc biệt ôm trọn đường viền cong bên trong thành bồn cầu và họng thoát nước sâu bên dưới mà chổi tròn thông thường hoàn toàn bất lực. Sợi lông cọ nylon kháng hóa chất tẩy rửa mạnh mẽ, không bị ăn mòn hay tòe sợi sau thời gian dài sử dụng. Cán dài thông minh giữ khoảng cách an toàn chống bắn nước bẩn vào tay áo. Đi kèm hộp đế đựng thoát nước thông thoáng đáy hở, giúp đầu cọ tự khô ráo sau khi dùng, loại bỏ mùi ẩm và nấm mốc trong nhà vệ sinh.",
    spec: "Chiều dài chổi: ~42cm • Đầu cọ chữ V: ~12cm • Kèm chổi mini phụ & Hộp đế đựng ráo nước",
    material: "Nhựa PP nguyên sinh kháng khuẩn, Sợi cước nylon đàn hồi & Hộp đế chống đọng nước",
    cardBg: "#EFF6FF",
    cardAccent: "#2563EB",
    image: "images/products/bo-co-toilet-3in1-1.jpg",
    hoverImage: "images/products/bo-co-toilet-3in1-2.jpg",
    swatches: [
      { name: "Trắng Xanh Pastel (Bộ Chổi + Đế Ráo Nước)", image: "images/products/bo-co-toilet-3in1-1.jpg", color: "#93C5FD" },
      { name: "Trắng Sứ Bắc Âu", image: "images/products/bo-co-toilet-3in1-3.jpg", color: "#F8FAFC" },
      { name: "Ghi Xám Hiện Đại", image: "images/products/bo-co-toilet-3in1-4.jpg", color: "#64748B" }
    ]
  }
];

const CATEGORIES = [
  { id: "all", name: "Tất cả dụng cụ" },
  { id: "floor", name: "Vệ sinh sàn & Lau nhà" },
  { id: "bathroom", name: "Phòng tắm & Toilet" },
  { id: "glass", name: "Gạt nước & Lau kính" }
];
