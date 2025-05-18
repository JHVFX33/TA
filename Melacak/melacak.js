// Fungsi Logout
        function logout() {
            if (confirm("Apakah Anda yakin ingin logout?")) {
                window.location.href = "/";
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
                button.className = `border px-3 py-1 rounded ${currentPage === value ? 'bg-gray-500 text-white' : ''}`;
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

        renderTable();
        function showModal(item) {
            const modal = document.getElementById("infoModal");
            const content = document.getElementById("modalContent");
            const statusDropdown = document.getElementById("statusPengiriman");

            // Menampilkan data barang di modal
            content.innerHTML = `
                <strong>Nama:</strong> ${item.nama}<br>
                <strong>Lokasi:</strong> ${item.lokasi}<br>
                <strong>Pengantaran:</strong> ${item.pengantaran}<br>
                <strong>Nomor Pesanan:</strong> ${item.nomorPesanan}<br>
                <strong>Status:</strong> <span id="statusText">${item.status}</span>
            `;

            // Menyinkronkan status dropdown dengan status saat ini
            let statusIndex = 0;
            if (item.status === "Sedang Dikirim") statusIndex = 1;
            if (item.status === "Selesai Pengantaran") statusIndex = 2;
            statusDropdown.selectedIndex = statusIndex;

            // Menyimpan item yang sedang dilihat untuk pembaruan
            window.currentItem = item;

            // Menampilkan modal
            modal.classList.remove("hidden");
        }

        function updateStatus() {
            const newStatus = document.getElementById("statusPengiriman").value;

            // Memperbarui status item yang sedang dipilih
            window.currentItem.status = newStatus;

            // Menutup modal
            closeModal();

            // Memperbarui tabel
            renderTable();
        }

        function closeModal() {
            document.getElementById("infoModal").classList.add("hidden");
        }

        // Render table awal
        renderTable();