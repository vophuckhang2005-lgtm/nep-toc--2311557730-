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


/**
 * Đăng nhập thật bằng tài khoản Google qua Firebase Authentication
 * Hỗ trợ chuyển hướng trực tiếp (Redirect) sang accounts.google.com
 */
async function signInWithGoogleRedirect() {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    throw new Error('Firebase Authentication SDK chưa được tải.');
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.setCustomParameters({ prompt: 'select_account' });

  // Chuyển hướng trực tiếp trang web sang accounts.google.com
  await firebase.auth().signInWithRedirect(provider);
}

/**
 * Kiểm tra kết quả sau khi Google chuyển hướng người dùng trở lại website
 */
async function checkGoogleRedirectResult() {
  if (typeof firebase === 'undefined' || !firebase.auth) return null;
  try {
    const result = await firebase.auth().getRedirectResult();
    if (result && result.user) {
      return result.user;
    }
  } catch (err) {
    console.error('Lỗi nhận kết quả từ Google Redirect:', err);
    throw err;
  }
  return null;
}

/**
 * Đăng xuất khỏi Firebase Auth
 */
async function signOutFirebase() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn('Lỗi khi đăng xuất Firebase Auth:', e);
    }
  }
}
