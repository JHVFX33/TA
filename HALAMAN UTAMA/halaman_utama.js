// Ambil elemen tombol login, pop-up, tombol kembali, dan form login
const loginButton = document.querySelector('.login');
const popup = document.getElementById('popup');
const backBtn = document.getElementById('back-btn');
const loginForm = document.getElementById('login-form');

// Saat tombol login diklik, tampilkan pop-up
loginButton.addEventListener('click', () => {
  popup.style.display = 'flex';
});
  
// Saat tombol kembali diklik, sembunyikan pop-up dan kembali ke pilihan peran
backBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  // Reset tampilan form login dan pilihan peran jika perlu
  loginForm.classList.remove('active');
  document.getElementById('role-selection').style.display = 'block';
});

// Saat form login disubmit, tampilkan alert dan sembunyikan pop-up
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Login berhasil!');
  popup.style.display = 'none';
  // Reset form dan tampilan jika perlu
  loginForm.reset();
  loginForm.classList.remove('active');
  document.getElementById('role-selection').style.display = 'block';
});
