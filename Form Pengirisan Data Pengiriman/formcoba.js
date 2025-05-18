function handleFileUpload(event, previewContainer, maxSize, type) {
            event.preventDefault();
            let files = event.target.files || event.dataTransfer.files;
            previewContainer.innerHTML = "";

            for (let file of files) {
                if (file.size > maxSize) {
                    alert(`Ukuran ${type} terlalu besar! Maksimum: ${maxSize / 1024 / 1024}MB`);
                    return;
                }

                let reader = new FileReader();
                reader.onload = function(e) {
                    let media;
                    if (type === "foto") {
                        media = document.createElement("img");
                        media.classList.add("preview-item");
                    } else {
                        media = document.createElement("video");
                        media.controls = true;
                        media.classList.add("preview-item");
                    }
                    media.src = e.target.result;
                    previewContainer.appendChild(media);
                };
                reader.readAsDataURL(file);
            }
        }

        document.getElementById("photoUpload").addEventListener("change", function(event) {
            handleFileUpload(event, document.getElementById("photoPreview"), 10 * 1024 * 1024, "foto");
        });

        document.getElementById("videoUpload").addEventListener("change", function(event) {
            handleFileUpload(event, document.getElementById("videoPreview"), 50 * 1024 * 1024, "video");
        });

        document.getElementById("shipmentForm").addEventListener("submit", function(event) {
            event.preventDefault();
            if (confirm("Apakah data sudah benar?")) {
                alert("Form berhasil dikirim!");
                this.submit();
                window.location.href = "pengiriman.html";
            }
        });