const STYLESHEET = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

*, *::before, *::after {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

body, html {
   font-family: 'Inter', 'Open Sans', Arial, sans-serif;
   font-weight: 300;
   color: #f0f0f0;
   width: 100%;
   min-height: 100%;
}

html {
   background-size: cover;
   background-position: center center;
   background-repeat: no-repeat;
   background-attachment: fixed;
}

body {
   background: linear-gradient(135deg, rgba(10,0,20,0.88) 0%, rgba(30,10,60,0.82) 100%);
   min-height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 30px 16px;
}

#addon {
   width: 100%;
   max-width: 560px;
   background: rgba(255,255,255,0.04);
   border: 1px solid rgba(255,255,255,0.1);
   border-radius: 20px;
   backdrop-filter: blur(18px);
   -webkit-backdrop-filter: blur(18px);
   box-shadow: 0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(138,90,171,0.15);
   overflow: hidden;
}

.addon-header {
   background: linear-gradient(135deg, rgba(138,90,171,0.35) 0%, rgba(80,40,130,0.4) 100%);
   border-bottom: 1px solid rgba(255,255,255,0.08);
   padding: 30px 32px 24px;
   display: flex;
   align-items: center;
   gap: 20px;
}

.logo img {
   width: 70px;
   height: 70px;
   object-fit: contain;
   border-radius: 14px;
   background: rgba(255,255,255,0.06);
   padding: 6px;
   box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

.header-text {
   flex: 1;
}

.header-text h1 {
   font-size: 22px;
   font-weight: 700;
   letter-spacing: 0.3px;
   color: #fff;
   line-height: 1.2;
}

.header-text .version-badge {
   display: inline-block;
   margin-top: 6px;
   padding: 2px 10px;
   background: rgba(138,90,171,0.5);
   border: 1px solid rgba(138,90,171,0.6);
   border-radius: 20px;
   font-size: 11px;
   font-weight: 600;
   color: #d4aaff;
   letter-spacing: 0.5px;
}

.addon-body {
   padding: 28px 32px;
}

.description-text {
   font-size: 14px;
   color: rgba(255,255,255,0.7);
   line-height: 1.6;
   margin-bottom: 22px;
}

.support-chips {
   display: flex;
   gap: 10px;
   flex-wrap: wrap;
   margin-bottom: 24px;
}

.chip {
   display: flex;
   align-items: center;
   gap: 6px;
   padding: 6px 14px;
   border-radius: 30px;
   font-size: 12px;
   font-weight: 600;
   letter-spacing: 0.3px;
   border: 1px solid rgba(255,255,255,0.12);
   background: rgba(255,255,255,0.06);
   color: rgba(255,255,255,0.85);
}

.chip .dot {
   width: 7px;
   height: 7px;
   border-radius: 50%;
   background: #a87de0;
   box-shadow: 0 0 6px #a87de0;
}

.divider {
   border: none;
   border-top: 1px solid rgba(255,255,255,0.07);
   margin: 22px 0;
}

.captcha-box {
   background: rgba(255,255,255,0.04);
   border: 1px solid rgba(255,255,255,0.08);
   border-radius: 12px;
   padding: 20px 22px;
   margin-bottom: 22px;
}

.captcha-box label {
   display: block;
   font-size: 11px;
   font-weight: 600;
   text-transform: uppercase;
   letter-spacing: 1px;
   color: rgba(255,255,255,0.45);
   margin-bottom: 10px;
}

.captcha-box p {
   font-size: 15px;
   font-weight: 600;
   color: #fff;
   margin-bottom: 14px;
}

.captcha-box input[type="text"] {
   width: 100%;
   padding: 10px 14px;
   border-radius: 8px;
   border: 1px solid rgba(255,255,255,0.15);
   background: rgba(255,255,255,0.07);
   color: #fff;
   font-size: 14px;
   font-family: inherit;
   outline: none;
   transition: border-color 0.2s, box-shadow 0.2s;
}

.captcha-box input[type="text"]:focus {
   border-color: rgba(138,90,171,0.7);
   box-shadow: 0 0 0 3px rgba(138,90,171,0.2);
}

.captcha-box input[type="text"]::placeholder {
   color: rgba(255,255,255,0.3);
}

.alert-box {
   display: flex;
   gap: 10px;
   align-items: flex-start;
   background: rgba(255,80,80,0.08);
   border: 1px solid rgba(255,100,100,0.2);
   border-radius: 10px;
   padding: 12px 14px;
   margin-bottom: 22px;
   font-size: 13px;
   color: #ffaaaa;
   line-height: 1.5;
}

.alert-icon {
   font-size: 16px;
   flex-shrink: 0;
   margin-top: 1px;
}

a.install-link {
   text-decoration: none;
   display: block;
}

button#install {
   border: 0;
   outline: 0;
   color: white;
   background: linear-gradient(135deg, #8A5AAB, #6a3d91);
   padding: 14px 0;
   width: 100%;
   text-align: center;
   font-family: inherit;
   font-size: 15px;
   font-weight: 700;
   letter-spacing: 0.8px;
   text-transform: uppercase;
   cursor: pointer;
   display: block;
   border-radius: 10px;
   box-shadow: 0 4px 20px rgba(138,90,171,0.4);
   transition: all 0.2s ease;
}

button#install:not(:disabled):hover {
   background: linear-gradient(135deg, #9e6dc2, #7d4faa);
   box-shadow: 0 6px 28px rgba(138,90,171,0.6);
   transform: translateY(-1px);
}

button#install:not(:disabled):active {
   transform: translateY(0);
   box-shadow: 0 2px 10px rgba(138,90,171,0.3);
}

button#install:disabled {
   opacity: 0.4;
   cursor: not-allowed;
}

.addon-footer {
   border-top: 1px solid rgba(255,255,255,0.07);
   padding: 22px 32px;
   background: rgba(0,0,0,0.2);
}

.donate-section {
   font-size: 13px;
   color: rgba(255,255,255,0.55);
   line-height: 1.7;
   margin-bottom: 16px;
}

.donate-section strong {
   color: rgba(255,255,255,0.8);
   font-weight: 600;
}

.iban-box {
   background: rgba(255,255,255,0.04);
   border: 1px solid rgba(255,255,255,0.08);
   border-radius: 8px;
   padding: 10px 14px;
   font-size: 12px;
   color: rgba(255,255,255,0.6);
   margin-bottom: 16px;
   font-family: monospace;
   letter-spacing: 0.5px;
}

.footer-links {
   display: flex;
   gap: 14px;
   flex-wrap: wrap;
   align-items: center;
}

.footer-links a {
   color: #b07fd4;
   text-decoration: none;
   font-size: 13px;
   font-weight: 500;
   transition: color 0.2s;
   display: flex;
   align-items: center;
   gap: 5px;
}

.footer-links a:hover {
   color: #d4aaff;
   text-decoration: underline;
}

.contact-text {
   font-size: 12px;
   color: rgba(255,255,255,0.4);
   margin-bottom: 12px;
}

.contact-text a {
   color: rgba(255,255,255,0.6);
   text-decoration: none;
}

.contact-text a:hover {
   color: #d4aaff;
}
`

function landingTemplate(manifest) {
	const background = manifest.background || 'https://dl.strem.io/addon-background.jpg'
	const logo = manifest.logo || 'https://dl.strem.io/addon-logo.png'
	const contactHTML = manifest.contactEmail ?
		`<div class="contact">
         <p>Contact ${manifest.name} creator:</p>
         <a href="mailto:${manifest.contactEmail}">${manifest.contactEmail}</a>
      </div>` : ''

	const stylizedTypes = manifest.types
		.map(t => t[0].toUpperCase() + t.slice(1) + (t !== 'series' ? 's' : ''))

	return `
   <!DOCTYPE html>
   <html style="background-image: url(${background});">
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${manifest.name} - Stremio Addon</title>
      <style>${STYLESHEET}</style>
      <link rel="shortcut icon" href="${logo}" type="image/x-icon">
   </head>
   <body>
      <div id="addon">

         <div class="addon-header">
            <div class="logo">
               <img src="${logo}" alt="${manifest.name} logo">
            </div>
            <div class="header-text">
               <h1>${manifest.name}</h1>
               <span class="version-badge">v${manifest.version || '0.0.0'}</span>
            </div>
         </div>

         <div class="addon-body">
            <p class="description-text">${manifest.description || 'Animecix üzerinden anime içeriklerini Stremio\'da izleyin.'}</p>

            <div class="support-chips">
               <div class="chip"><span class="dot"></span> Filmler</div>
               <div class="chip"><span class="dot"></span> Diziler</div>
               <div class="chip"><span class="dot"></span> Animeler</div>
            </div>

            <div class="alert-box">
               <span class="alert-icon">⚠️</span>
               <span>Stremio'nun web sürümünü kullanıyorsanız arka planda Stremio uygulaması veya servisi çalışıyor olmalıdır.</span>
            </div>

            <div class="captcha-box">
               <label>Bot Koruması</label>
               <p>Türkiye'nin başkenti neresidir?</p>
               <input type="text" id="soru" placeholder="Cevabınızı yazın..." autocomplete="off" required>
            </div>

            <a id="installLink" class="install-link" href="#">
               <button id="install" name="Install" disabled>STREMIO'YA YÜKLE</button>
            </a>
         </div>

         <div class="addon-footer">
            <p class="donate-section">
               Animecix, yurtdışından erişimde CloudFlare koruması kullandığından bu eklentinin çeşitli maliyetleri bulunmaktadır.
               Yapacağınız <strong>en küçük bağış</strong> eklentinin hayatta kalabilmesi için büyük önem taşımaktadır.
            </p>
            <div class="iban-box"><a href="https://www.buymeacoffee.com/mycodelab" style='color: white;' target="_blank">Buy me A Coffee</a></div>
            <p class="contact-text">İletişim: <a href="mailto:eyup.elitass@gmail.com">eyup.elitass@gmail.com</a></p>
            <div class="footer-links">
               <a target="_blank" href="https://github.com/aflextr/animecixnet-stremio-addon">
                  ⭐ GitHub
               </a>
               <a target="_blank" href="https://raw.githubusercontent.com/aflextr/donated-to-me/refs/heads/main/donate">
                  💜 Bağış Yapanlar
               </a>
            </div>
         </div>

      </div>
      <script>
         var soru = document.getElementById("soru");
         var install = document.getElementById("install");
         var installLink = document.getElementById("installLink");

         soru.addEventListener("input", function() {
            var val = soru.value.trim().toLowerCase()
               .replace(/İ/g, 'i').replace(/I/g, 'ı')
               .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (val === 'ankara') {
               installLink.href = 'stremio://' + window.location.host + '/addon/manifest.json';
               install.disabled = false;
            } else {
               installLink.href = '#';
               install.disabled = true;
            }
         });
      </script>
   </body>
   </html>`
}
module.exports = landingTemplate