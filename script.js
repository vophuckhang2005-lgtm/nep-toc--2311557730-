// Cấu hình Firebase cho dự án Nếp Tóc
const firebaseConfig = {
  apiKey: "AIzaSyD_6sMed1LQ6Z-BM4R8hxu3nsgAkREa3CA",
  authDomain: "nep-toc-2311557730.firebaseapp.com",
  projectId: "nep-toc-2311557730",
  storageBucket: "nep-toc-2311557730.firebasestorage.app",
  messagingSenderId: "147444034152",
  appId: "1:147444034152:web:4875744481f981d5db69dd"
};

// Khởi tạo Firebase App
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestoreDb = (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;

/**
 * Ghi đơn hàng vào Firestore collection "donhang"
 * Tuân thủ Security Rules:
 * - Chỉ tạo tài liệu mới
 * - maDon: chuỗi tối đa 50 ký tự
 * - khachHang: hoTen, soDienThoai, diaChi, ghiChu
 * - sanPham: tối đa 20 món (ma, ten, gia, soLuong)
 * - tamTinh, phiGiao, tongTien: số >= 0
 * - thanhToan: "COD"
 * - trangThai: "moi"
 * - thoiGian: serverTimestamp
 */
async function placeOrderFirestore(orderData) {
  if (!firestoreDb) {
    throw new Error('Chưa thể kết nối đến máy chủ Firebase. Vui lòng kiểm tra lại đường truyền mạng.');
  }

  const firestorePayload = {
    maDon: String(orderData.maDon),
    khachHang: {
      hoTen: String(orderData.khachHang.hoTen).trim(),
      soDienThoai: String(orderData.khachHang.soDienThoai).trim(),
      diaChi: String(orderData.khachHang.diaChi).trim(),
      ghiChu: String(orderData.khachHang.ghiChu || '').trim()
    },
    sanPham: orderData.sanPham.map(p => ({
      ma: String(p.ma || p.id || 'SP'),
      ten: String(p.ten || p.name || ''),
      gia: Number(p.gia !== undefined ? p.gia : p.price),
      soLuong: Number(p.soLuong !== undefined ? p.soLuong : p.qty)
    })).slice(0, 20),
    tamTinh: Number(orderData.tamTinh),
    phiGiao: Number(orderData.phiGiao),
    tongTien: Number(orderData.tongTien),
    thanhToan: 'COD',
    trangThai: 'moi',
    thoiGian: firebase.firestore.FieldValue.serverTimestamp()
  };

  // Ghi đơn hàng vào collection "donhang"
  await firestoreDb.collection('donhang').doc(firestorePayload.maDon).set(firestorePayload);
  return firestorePayload.maDon;
}
