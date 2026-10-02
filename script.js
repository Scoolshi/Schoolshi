// ==========================================
// ⚙️ İSTATİSTİK VERİLERİ
// ==========================================
const SATILAN_URUN_SAYISI = 8;
const IYI_YORUM_SAYISI   = 3;
const KOTU_YORUM_SAYISI  = 0;

// İstatistikleri Ekrana Yazdır
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("val-sold").textContent = SATILAN_URUN_SAYISI;
    document.getElementById("val-good").textContent = IYI_YORUM_SAYISI;
    document.getElementById("val-bad").textContent = KOTU_YORUM_SAYISI;
});

// ==========================================
// 🛒 ÜRÜN & SEPET SİSTEMİ
// ==========================================
const prices = {
    snickers: 20,
    butter: 30
};

const quantities = {
    snickers: 0,
    butter: 0
};

function changeQuantity(product, amount) {
    if (quantities[product] + amount >= 0) {
        quantities[product] += amount;
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    // Ürün Adetleri (Kartlar üzerindeki)
    document.getElementById('count-snickers').textContent = quantities.snickers;
    document.getElementById('count-butter').textContent = quantities.butter;

    // Sepet İçi Adetler
    document.getElementById('cart-qty-snickers').textContent = quantities.snickers;
    document.getElementById('cart-qty-butter').textContent = quantities.butter;

    // Fiyat Hesaplamaları
    const totalSnickers = quantities.snickers * prices.snickers;
    const totalButter = quantities.butter * prices.butter;
    const grandTotal = totalSnickers + totalButter;

    // Sepet İçi Fiyatlar
    document.getElementById('cart-total-snickers').textContent = totalSnickers + " ₺";
    document.getElementById('cart-total-butter').textContent = totalButter + " ₺";
    document.getElementById('cart-grand-total').textContent = grandTotal + " ₺";
}

// Ürün Al (Ayrı Sayfaya Geçiş)
document.getElementById('goToCheckoutBtn').addEventListener('click', () => {
    const total = quantities.snickers * prices.snickers + quantities.butter * prices.butter;
    
    if (total === 0) {
        alert("Lütfen önce sepetinize en az bir ürün ekleyin!");
        return;
    }

    const summaryBox = document.getElementById('checkout-summary');
    summaryBox.innerHTML = `
        <h3>Sipariş Özeti</h3>
        <hr class="divider">
        <p><strong>Snickers:</strong> ${quantities.snickers} Adet (${quantities.snickers * prices.snickers} ₺)</p>
        <p><strong>BUTTER:</strong> ${quantities.butter} Adet (${quantities.butter * prices.butter} ₺)</p>
        <hr class="divider">
        <h3 style="color:#ff2a75;">Toplam Ödenecek Tutar: ${total} ₺</h3>
    `;

    // Ayrı satın alma sayfasına yönlendir
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById('page-checkout').classList.add("active");
});

// ==========================================
// 📧 İŞLEMİ BİTİR VE E-POSTA GÖNDERME
// ==========================================
const FORMSPREE_URL = "https://formspree.io/f/mrpbdopq"; 

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('cust-name').value;
    const contact = document.getElementById('cust-contact').value;
    const message = document.getElementById('cust-message').value;

    const totalSnickers = quantities.snickers * prices.snickers;
    const totalButter = quantities.butter * prices.butter;
    const grandTotal = totalSnickers + totalButter;

    // Mail Formatı
    const mailText = `SATIN ALIM İŞLEMİ\n\n` +
        `${name} tarafından ` +
        `Snickers: ${quantities.snickers} Adet, BUTTER: ${quantities.butter} Adet içerikli ` +
        `(Snickers: ${totalSnickers} ₺, BUTTER: ${totalButter} ₺ / Toplam: ${grandTotal} ₺) fiyatlı işlem kabul edilmiştir.\n\n` +
        `Alıcı İletişim Bilgisi:\n${contact}\n\n` +
        `Özel Mesaj:\n${message || "Yok"}`;

    // Formspree Gönderimi
    fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ message: mailText })
    }).then(response => {
        if (response.ok) {
            alert("Siparişiniz başarıyla alındı ve e-posta gönderildi!");
        } else {
            alert("Sipariş gönderilirken bir hata oluştu.");
        }
    }).catch(error => {
        console.error("Hata:", error);
        alert("Bağlantı kurulurken bir sorun oluştu.");
    });
});

// ==========================================
// 📱 YAN MENÜ VE SAYFA GEÇİŞ KODLARI
// ==========================================
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function toggleMenu() {
    sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("active");
}

menuToggle.addEventListener("click", toggleMenu);
sidebarOverlay.addEventListener("click", toggleMenu);

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute("data-page");

        pages.forEach(page => page.classList.remove("active"));
        document.getElementById(`page-${targetPage}`).classList.add("active");

        toggleMenu();
    });
});
