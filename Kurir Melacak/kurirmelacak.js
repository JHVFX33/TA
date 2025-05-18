// Fungsi Logout
        function logout() {
            if (confirm("Apakah Anda yakin ingin logout?")) {
                window.location.href = "index.html";
            }
        }

        // Toggle Dropdown Logout
        document.getElementById("profileMenu").addEventListener("click", function (event) {
            event.stopPropagation();
            document.getElementById("logoutDropdown").classList.toggle("hidden");
        });

        // Tutup dropdown jika klik di luar
        document.addEventListener("click", function (event) {
            let dropdown = document.getElementById("logoutDropdown");
            if (!document.getElementById("profileMenu").contains(event.target)) {
                dropdown.classList.add("hidden");
            }
        });

        // Data Barang
        const namaMaterial = [
            "Besi Hollow", "Besi Beton", "Baja Ringan", "Seng Gelombang",
            "Alderon Transparan", "Plat Galvanis", "Pipa PVC", "Semen Instan",
            "Gypsum Board", "Keramik Lantai", "Paku Beton", "Cat Tembok",
            "Triplek", "Kawat Bronjong", "Asbes", "Paving Block"
        ];

        const dataBarang = Array.from({ length: 50 }, (_, i) => {
            const randomDate = new Date(2024, 0, 1 + Math.floor(Math.random() * 60));
            const formattedDate = randomDate.toLocaleDateString("id-ID");
            const randomHour = Math.floor(Math.random() * 24); // Jam 24 jam
            const randomMinute = Math.floor(Math.random() * 60); // Menit acak
            const formattedTime = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
            const materialRandom = namaMaterial[Math.floor(Math.random() * namaMaterial.length)];

            return {
                nama: materialRandom,
                lokasi: `Alamat ${i + 1}`,
                pengantaran: `${formattedDate} - ${formattedTime}`,
                nomorPesanan: Math.floor(10000000 + Math.random() * 90000000),
                status: i % 3 === 0 ? "Selesai Pengantaran" : i % 2 === 0 ? "Sedang Dikirim" : "Menunggu Pengiriman"
            };
        });

        let currentPage = 1;
        let rowsPerPage = parseInt(document.getElementById("showing").value);

        function renderTable() {
            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = "";

            let start = (currentPage - 1) * rowsPerPage;
            let paginatedData = dataBarang.slice(start, start + rowsPerPage);

            paginatedData.forEach(item => {
                tableBody.innerHTML += `
                    <tr class="hover:bg-gray-100 text-center cursor-pointer" 
                        onclick="showModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                        <td class="p-2 border">${item.nama}</td>
                        <td class="p-2 border">${item.lokasi}</td>
                        <td class="p-2 border">${item.pengantaran}</td>
                        <td class="p-2 border">${item.nomorPesanan}</td>
                        <td class="p-2 border">
                            <span class="px-2 py-1 rounded ${getStatusColor(item.status)}">
                                ${item.status}
                            </span>
                        </td>
                    </tr>
                `;
            });

            renderPagination();
        }

        function getStatusColor(status) {
            return status === "Selesai Pengantaran"
                ? "bg-green-500 text-white"
                : status === "Sedang Dikirim"
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white";
        }

        function renderPagination() {
            const totalPages = Math.ceil(dataBarang.length / rowsPerPage);
            const paginationButtons = document.getElementById("paginationButtons");
            paginationButtons.innerHTML = "";

            ["<", ...Array.from({ length: totalPages }, (_, i) => i + 1), ">"].forEach(value => {
                let button = document.createElement("button");
                if (typeof value === "number") {
                    button.className = `border px-3 py-1 rounded ${currentPage === value ? 'bg-gray-500 text-white' : ''}`;
                } else {
                    button.className = "border px-3 py-1 rounded";
                }
                button.innerText = value;
                button.onclick = () => changePage(value);
                paginationButtons.appendChild(button);
            });
        }

        function changePage(page) {
            if (page === "<") page = Math.max(1, currentPage - 1);
            if (page === ">") page = Math.min(Math.ceil(dataBarang.length / rowsPerPage), currentPage + 1);
            if (page < 1 || page > Math.ceil(dataBarang.length / rowsPerPage)) return;
            currentPage = page;
            renderTable();
        }

        document.getElementById("showing").addEventListener("change", function () {
            rowsPerPage = parseInt(this.value);
            currentPage = 1;
            renderTable();
        });

        function showModal(item) {
            const modal = document.getElementById("infoModal");
    const content = document.getElementById("modalContent");
    const statusDropdown = document.getElementById("statusPengiriman");
    const submitBtn = document.querySelector('button[onclick="updateStatus()"]');
    const formSection = document.getElementById("formSection");
    const preview = document.getElementById("previewFoto");

    // Simpan data
    window.currentItem = item;

    // Tampilkan info barang
    content.innerHTML = `
        <strong>Nama:</strong> ${item.nama}<br>
        <strong>Lokasi:</strong> ${item.lokasi}<br>
        <strong>Pengantaran:</strong> ${item.pengantaran}<br>
        <strong>Nomor Pesanan:</strong> ${item.nomorPesanan}<br>
        <strong>Status:</strong> <span id="statusText">${item.status}</span>
    `;

    const isFinished = item.status === "Selesai Pengantaran";

    // Toggle tampilan form dan tombol submit
    formSection.classList.toggle("hidden", isFinished);
    submitBtn.classList.toggle("hidden", isFinished);

    // --- Menangani foto preview ---
    if (isFinished) {
        // Simulasikan adanya foto bukti (jika kamu sudah punya data fotonya bisa ganti src-nya)
        preview.src = "foto-bukti-default.jpg"; // Ganti sesuai nama file default kamu
        preview.classList.remove("hidden");
    } else {
        // Sembunyikan kalau belum selesai pengiriman
        preview.classList.add("hidden");
        preview.src = "";
    }

    // Reset isi dropdown
statusDropdown.innerHTML = "";

// Tentukan opsi berdasarkan status sekarang
let options = [];
if (item.status === "Menunggu Pengiriman") {
    options = ["Sedang Dikirim"];
} else if (item.status === "Sedang Dikirim") {
    options = ["Selesai Pengantaran"];
}

// Tambahkan opsi ke dropdown
options.forEach(status => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    statusDropdown.appendChild(option);
});

    modal.classList.remove("hidden");
}


        function updateStatus() {
            const newStatus = document.getElementById("statusPengiriman").value;
            const buktiFoto = document.getElementById("buktiPengantaran").files[0];

    if (!buktiFoto) {
        alert("Harap unggah foto bukti pengantaran terlebih dahulu.");
        return;
    }

            // Memperbarui status item yang sedang dipilih
            window.currentItem.status = newStatus;

            // Menampilkan notifikasi / peringatan
            alert("Status pengiriman berhasil diperbarui menjadi: " + newStatus);

            // Menutup modal
            closeModal();

            // Memperbarui tabel
            renderTable();
        }
        

        function closeModal() {
            document.getElementById("infoModal").classList.add("hidden");
            // Reset input file
    const fileInput = document.getElementById("buktiPengantaran");
    fileInput.value = "";

    // Sembunyikan dan reset preview
    const preview = document.getElementById("previewFoto");
    preview.src = "";
    preview.classList.add("hidden");
        }

        // Render table awal
        renderTable();
       // Event listener untuk preview gambar saat file dipilih
document.getElementById("buktiPengantaran").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const preview = document.getElementById("previewFoto");

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.classList.remove("hidden");
    } else {
        preview.src = "";
        preview.classList.add("hidden");
    }
});