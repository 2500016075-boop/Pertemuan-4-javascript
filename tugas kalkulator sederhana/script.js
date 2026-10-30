let inputAngka1 = document.getElementById("angka1");
let inputAngka2 = document.getElementById("angka2");
let hasil = document.getElementById("hasil");

document.querySelectorAll("[data-operasi]").forEach(function(tombol) {
    tombol.addEventListener("click", function() {
        let teksAngka1 = inputAngka1.value.trim();
        let teksAngka2 = inputAngka2.value.trim();

        if (teksAngka1 === "" || teksAngka2 === "") {
            hasil.textContent = "Masukkan kedua angka terlebih dahulu.";
            return;
        }

        let angka1 = Number(teksAngka1);
        let angka2 = Number(teksAngka2);
        let nilaiHasil;

        switch (tombol.dataset.operasi) {
            case "tambah":
                nilaiHasil = angka1 + angka2;
                break;
            case "kurang":
                nilaiHasil = angka1 - angka2;
                break;
            case "kali":
                nilaiHasil = angka1 * angka2;
                break;
            case "bagi":
                if (angka2 === 0) {
                    hasil.textContent = "Tidak bisa membagi dengan nol.";
                    return;
                }
                nilaiHasil = angka1 / angka2;
                break;
            default:
                hasil.textContent = "Operasi tidak dikenal.";
                return;
        }

        hasil.textContent = "Hasil: " + nilaiHasil;
    });
});