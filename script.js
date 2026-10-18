/* STATE MANAGEMENT */
        let currentPageIndex = -1; // -1 represents Hard Cover
        let currentLang = 'hi';
        let downloadLang = 'hi';
        let downloadLayout = 'compact_2col';
        let downloadImgMode = 'compact';
        let baseFontSize = 1.15;
        let isPetalsActive = true;
        let isSingleA4Mode = false;
        let mobileTab = 'lyrics'; // 'lyrics', 'mantra', 'both'
        let audioCtx = null;
        let ambientOsc = null;
        let isAmbientOn = false;

        const AUDIO_SPEEDS = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
        let audioState = {
            aartiId: null,
            trackIndex: 0,
            isPlaying: false,
            speed: 1.0,
            isLoop: false,
            userSelectedVersions: {},
            dockVisible: false
        };
        let isAudioScrubbing = false;

        function isChalisaBook() {
            return (document.body && document.body.dataset && document.body.dataset.book === 'chalisa') ||
                   (typeof aartisData !== 'undefined' && aartisData.length > 0 && aartisData.some(item => item.id.includes('chalisa')));
        }

        function isChalisaItem(item) {
            if (!item) return false;
            return isChalisaBook() || (item.id && item.id.includes('chalisa'));
        }

        function parseChalisaStructure(aarti) {
            const verses = aarti.verses || [];
            let openingDohas = [];
            let chaupais = [];
            let closingDoha = null;

            let foundFirstChaupai = false;
            let foundLastChaupai = false;

            for (let i = 0; i < verses.length; i++) {
                const v = verses[i];
                const hi = v.hi || '';
                const isChaupai1 = hi.includes('(१)') || hi.includes('(1)');
                const isChaupai40 = hi.includes('(४०)') || hi.includes('(40)');

                if (!foundFirstChaupai) {
                    if (isChaupai1) {
                        foundFirstChaupai = true;
                        chaupais.push(v);
                    } else {
                        openingDohas.push(v);
                    }
                } else if (!foundLastChaupai) {
                    chaupais.push(v);
                    if (isChaupai40) {
                        foundLastChaupai = true;
                    }
                } else {
                    closingDoha = v;
                }
            }

            return { openingDohas, chaupais, closingDoha };
        }

        function formatChalisaDohas(dohas, targetLang) {
            if (!dohas) return '';
            const arr = Array.isArray(dohas) ? dohas : [dohas];
            if (arr.length === 0 || !arr[0]) return '';

            const isBoth = (targetLang === 'both');
            const isHinglish = (targetLang === 'hinglish');

            return arr.map(v => {
                if (!v) return '';
                const cleanHi = v.hi 
                    ? v.hi.replace(/॥\s*दोहा\s*॥\s*/g, '').trim().replace(/\n/g, '<br>')
                    : '';
                const cleanEn = v.en 
                    ? v.en.replace(/\|\|\s*Doha\s*\|\|\s*/gi, '').trim().replace(/\n/g, '<br>')
                    : '';

                if (isBoth) {
                    return `
                        <div style="margin: 2px 0;">
                            <div>${cleanHi}</div>
                            <div class="print-compact-doha-translit">${cleanEn}</div>
                        </div>
                    `;
                } else if (isHinglish) {
                    return `
                        <div style="margin: 2px 0; font-family: var(--font-sans); font-style: italic;">
                            ${cleanEn}
                        </div>
                    `;
                } else {
                    return `
                        <div style="margin: 2px 0;">
                            ${cleanHi}
                        </div>
                    `;
                }
            }).join('<div style="height: 4px;"></div>');
        }

        function formatWordChalisaDohas(dohas, targetLang) {
            if (!dohas) return '';
            const arr = Array.isArray(dohas) ? dohas : [dohas];
            if (arr.length === 0 || !arr[0]) return '';

            const isBoth = (targetLang === 'both');
            const isHinglish = (targetLang === 'hinglish');

            return arr.map(v => {
                if (!v) return '';
                const cleanHi = v.hi ? v.hi.replace(/॥\s*दोहा\s*॥\s*/g, '').trim().replace(/\n/g, '<br/>') : '';
                const cleanEn = v.en ? v.en.replace(/\|\|\s*Doha\s*\|\|\s*/gi, '').trim().replace(/\n/g, '<br/>') : '';

                if (isBoth) {
                    return `
                        <div style="margin: 1.5pt 0; mso-para-margin: 0pt;">
                            <div style="font-size: 10pt; color: #731308; font-weight: normal; font-family: 'Noto Serif Devanagari', 'Mangal', serif; line-height: 1.25; mso-para-margin: 0pt;">${cleanHi}</div>
                            <div style="font-size: 8.5pt; color: #6a4220; font-style: italic; font-family: 'Poppins', sans-serif; font-weight: normal; margin-top: 1.5pt; line-height: 1.2; mso-para-margin: 0pt;">${cleanEn}</div>
                        </div>
                    `;
                } else if (isHinglish) {
                    return `
                        <div style="margin: 1.5pt 0; font-size: 10.5pt; color: #731308; font-style: italic; font-family: 'Poppins', sans-serif; font-weight: normal; line-height: 1.25; mso-para-margin: 0pt;">
                            ${cleanEn}
                        </div>
                    `;
                } else {
                    return `
                        <div style="margin: 1.5pt 0; font-size: 10.5pt; color: #731308; font-weight: normal; font-family: 'Noto Serif Devanagari', 'Mangal', serif; line-height: 1.25; mso-para-margin: 0pt;">
                            ${cleanHi}
                        </div>
                    `;
                }
            }).join('<div style="height: 3pt; mso-para-margin: 0pt;"></div>');
        }

        function getStorageKey(key) {
            return isChalisaBook() ? `chalisa_book_${key}` : `aarti_book_${key}`;
        }

        function initStateFromStorage() {
            currentLang = localStorage.getItem(getStorageKey('lang')) || 'hi';
            downloadLang = localStorage.getItem(getStorageKey('download_lang')) || currentLang || 'hi';
            downloadLayout = localStorage.getItem(getStorageKey('download_layout')) || 'compact_2col';
            downloadImgMode = localStorage.getItem(getStorageKey('download_img_mode')) || 'compact';

            try {
                const savedVersions = localStorage.getItem(getStorageKey('user_audio_versions'));
                if (savedVersions) audioState.userSelectedVersions = JSON.parse(savedVersions);
                const savedSpeed = parseFloat(localStorage.getItem(getStorageKey('user_audio_speed')));
                if (AUDIO_SPEEDS.includes(savedSpeed)) audioState.speed = savedSpeed;
                const savedLoop = localStorage.getItem(getStorageKey('user_audio_loop'));
                if (savedLoop !== null) audioState.isLoop = (savedLoop === 'true');
            } catch (e) {}
        }

        /* INITIALIZATION */
        window.addEventListener('DOMContentLoaded', () => {
            initStateFromStorage();
            initPetals();
            initTouchSwipe();
            initFullscreenListeners();
            initAudioEngine();
            syncLanguageUI();
            populateToc();
            populateDropdown();
            
            // Restore saved bookmark or default to cover
            const savedPage = localStorage.getItem(getStorageKey('page'));
            if (savedPage !== null && savedPage !== '-1') {
                const idx = parseInt(savedPage);
                if (idx >= 0 && idx < aartisData.length) {
                    renderSpread(idx);
                    return;
                }
            }
            renderCover();
        });

        /* LANGUAGE MANAGEMENT */
        function setLanguage(lang) {
            currentLang = lang;
            localStorage.setItem(getStorageKey('lang'), lang);
            syncLanguageUI();
            populateToc();
            populateDropdown();

            if (currentPageIndex === -1) {
                renderCover();
            } else {
                renderSpread(currentPageIndex);
            }
            showNotification(lang === 'hi' ? "भाषा: हिन्दी" : (lang === 'hinglish' ? "Language: Hinglish" : "भाषा: दोनों (Hindi + Hinglish)"));
        }

        function syncLanguageUI() {
            document.querySelectorAll('.lang-pill').forEach(pill => pill.classList.remove('active'));
            const activePill = document.getElementById(`pill-${currentLang}`);
            if (activePill) activePill.classList.add('active');

            // Header labels update
            const brandMain = document.getElementById('brand-main-title');
            const brandSub = document.getElementById('brand-sub-title');
            const tocBtn = document.getElementById('txt-toc-btn');
            const bellBtn = document.getElementById('txt-bell-btn');
            const downloadBtn = document.getElementById('txt-download-btn');
            const chooseTxt = document.getElementById('txt-choose-aarti');
            const tocTitle = document.getElementById('txt-toc-title');
            const a4BtnText = document.getElementById('txt-a4-btn');
            const fsBtnText = document.getElementById('txt-fullscreen-btn');
            const mPrevTxt = document.getElementById('txt-m-prev');
            const mNextTxt = document.getElementById('txt-m-next');
            const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
            const isChalisa = isChalisaBook();

            if (currentLang === 'hinglish') {
                if (brandMain) brandMain.textContent = isChalisa ? "Sampoorna Chalisa Sangrah" : "Sampoorna Aarti Sangrah";
                if (brandSub) brandSub.textContent = isChalisa ? "Sacred Chalisa Granth: Shri Hanuman & Durga Chalisa" : "Sacred Hindu Aarti Granth & Chants";
                if (tocBtn) tocBtn.textContent = "Index";
                if (bellBtn) bellBtn.textContent = "Temple Bell";
                if (downloadBtn) downloadBtn.textContent = "Download Book";
                if (chooseTxt) chooseTxt.textContent = isChalisa ? "Select Chalisa:" : "Select Aarti:";
                if (tocTitle) tocTitle.textContent = isChalisa ? "Chalisa Index" : "Aarti Index";
                if (a4BtnText) a4BtnText.textContent = isSingleA4Mode ? "Dual A4" : "Single A4";
                if (fsBtnText) fsBtnText.textContent = isFS ? "Exit Fullscreen" : "Full Screen";
                const fsExitTxt = document.getElementById('txt-fs-exit');
                if (fsExitTxt) fsExitTxt.textContent = "Exit Fullscreen (Esc)";
                if (mPrevTxt) mPrevTxt.textContent = "Prev";
                if (mNextTxt) mNextTxt.textContent = "Next";
                const switchBtnTxt = document.getElementById('txt-switch-btn');
                if (switchBtnTxt) switchBtnTxt.textContent = isChalisa ? "Aarti Sangrah" : "Chalisa Sangrah";
            } else {
                if (brandMain) brandMain.textContent = isChalisa ? "सम्पूर्ण चालीसा संग्रह" : "सम्पूर्ण आरती संग्रह";
                if (brandSub) brandSub.textContent = isChalisa ? "श्री हनुमान व श्री दुर्गा चालीसा ग्रंथ" : "Sacred Hindu Aarti Granth & Chants";
                if (tocBtn) tocBtn.textContent = "अनुक्रमणिका";
                if (bellBtn) bellBtn.textContent = "घंटी";
                if (downloadBtn) downloadBtn.textContent = "डाउनलोड पुस्तक";
                if (chooseTxt) chooseTxt.textContent = isChalisa ? "चालीसा चुनें:" : "आरती चुनें:";
                if (tocTitle) tocTitle.textContent = isChalisa ? "चालीसा अनुक्रमणिका" : "आरती अनुक्रमणिका";
                if (a4BtnText) a4BtnText.textContent = isSingleA4Mode ? "दो पृष्ठ A4" : "एकल A4";
                if (fsBtnText) fsBtnText.textContent = isFS ? "स्क्रीन सामान्य" : "फुल स्क्रीन";
                const fsExitTxt = document.getElementById('txt-fs-exit');
                if (fsExitTxt) fsExitTxt.textContent = "सामान्य दृश्य (Esc)";
                if (mPrevTxt) mPrevTxt.textContent = "पिछला";
                if (mNextTxt) mNextTxt.textContent = "अगला";
                const switchBtnTxt = document.getElementById('txt-switch-btn');
                if (switchBtnTxt) switchBtnTxt.textContent = isChalisa ? "आरती संग्रह" : "चालीसा संग्रह";
            }
        }

        /* RENDER HARD COVER */
        function renderCover() {
            currentPageIndex = -1;
            const container = document.getElementById('book-inner');
            const isHinglish = currentLang === 'hinglish';
            const isChalisa = isChalisaBook();

            const coverMainTitle = isChalisa 
                ? (isHinglish ? "Shri Hanuman & Durga Chalisa" : "श्री हनुमान व दुर्गा चालीसा संग्रह")
                : (isHinglish ? "Shri Sampoorna Aarti Sangrah" : "श्री सम्पूर्ण आरती संग्रह");
            const coverSubTitle = isChalisa
                ? (isHinglish ? "|| Sacred 40-Verse Hymns of Supreme Valor & Divine Grace ||" : "॥ संकटमोचन एवं जगदम्बा महाशक्ति स्तुति ग्रंथ ॥")
                : (isHinglish ? "|| Nitya Niyam Bhakti, Puja Evam Stuti Granth ||" : "॥ नित्य नियम भक्ति, पूजा एवं स्तुति ग्रंथ ॥");
            const coverDesc = isChalisa
                ? (isHinglish 
                    ? "Complete sacred collection of Shri Hanuman Chalisa and Shri Durga Chalisa with Authentic Dhyan Mantras, Dohas, 40 Chaupais, Significance, and Spiritual Meaning."
                    : "संकटमोचन श्री हनुमान जी एवं जगज्जननी माँ दुर्गा जी की सम्पूर्ण ४०-४० चौपाइयाँ, मंगलाचरण दोहा, ध्यान मन्त्र, माहात्म्य एवं भावार्थ सहित सचित्र वैदिक ग्रन्थ स्वरूप।")
                : (isHinglish
                    ? "Samast Devi-Devtaon ki pawan aartiyan, dhyan mantra, bhavarth evam puja samapan vidhi ek sundar vedic granth swaroop mein."
                    : "समस्त देवी-देवताओं की पावन आरतियाँ, ध्यान मंत्र, भावार्थ एवं पूजा समापन विधि एक सुंदर वैदिक ग्रंथ स्वरूप में।");
            const openBtnText = isChalisa
                ? (isHinglish ? "Open Chalisa Book" : "चालीसा ग्रंथ खोलें")
                : (isHinglish ? "Open Aarti Book" : "ग्रंथ खोलें (Open Book)");
            const totalCountText = isChalisa
                ? (isHinglish ? `Total Chalisas: ${aartisData.length} | Jai Hanuman | Jai Mata Di` : `कुल चालीसा: ${aartisData.length} | जय हनुमान | जय माता दी`)
                : (isHinglish ? `Total Aartis: ${aartisData.length} | Om Namah Shivaya | Jai Shri Ram` : `कुल आरतियाँ: ${aartisData.length} | ॐ नमः शिवाय | जय श्री राम`);

            container.innerHTML = `
                <div class="hard-cover-view">
                    <div class="cover-emboss-border"></div>
                    
                    <svg class="cover-yantra" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" stroke="var(--gold-primary)" stroke-width="1.5" />
                        <circle cx="50" cy="50" r="41" stroke="var(--gold-dark)" stroke-dasharray="3 3" />
                        <polygon points="50,15 80,72 20,72" stroke="var(--gold-light)" stroke-width="1.2" />
                        <polygon points="50,85 80,28 20,28" stroke="var(--gold-light)" stroke-width="1.2" />
                        <circle cx="50" cy="50" r="14" stroke="var(--gold-primary)" fill="rgba(212, 175, 55, 0.2)" />
                        <circle cx="50" cy="50" r="4" fill="var(--gold-light)" />
                    </svg>

                    <h2 class="cover-title-main">${coverMainTitle}</h2>
                    <p class="cover-subtitle">${coverSubTitle}</p>

                    <div style="margin-bottom: 22px; color: #ffeab0; font-size: 0.95rem; max-width: 520px; line-height: 1.6; font-family: ${isHinglish ? 'var(--font-sans)' : 'var(--font-devanagari)'}; font-weight: normal;">
                        ${coverDesc}
                    </div>

                    <div class="cover-actions">
                        <button class="open-book-btn" onclick="openBookFirstPage()">
                            <span>${openBtnText}</span>
                            <span>📖</span>
                        </button>
                        <button class="cover-download-btn" onclick="openDownloadModal()">
                            <span>📥 ${isHinglish ? "Download Full Book (PDF)" : "सम्पूर्ण पुस्तक डाउनलोड"}</span>
                        </button>
                    </div>
                    
                    <div style="position: absolute; bottom: 18px; color: var(--gold-dark); font-size: 0.8rem; font-family: var(--font-sans); font-weight: normal;">
                        ${totalCountText}
                    </div>
                </div>
            `;
            updateControlsState();
        }

        function openBookFirstPage() {
            playPageTurnSound();
            renderSpread(0);
        }

        function goToCover() {
            playPageTurnSound();
            renderCover();
        }

        /* MOBILE VIEW TAB CONTROLLER */
        function setMobileTab(tab) {
            mobileTab = tab;
            const spread = document.querySelector('.book-spread');
            if (spread) {
                spread.classList.remove('mobile-tab-lyrics', 'mobile-tab-mantra', 'mobile-tab-both');
                spread.classList.add(`mobile-tab-${tab}`);
            }
            document.querySelectorAll('.m-tab-btn').forEach(btn => {
                if (btn.dataset.tab === tab) btn.classList.add('active');
                else btn.classList.remove('active');
            });
            const stage = document.querySelector('.book-stage');
            if (stage && window.innerWidth <= 860) {
                stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        /* RENDER DUAL-PAGE SPREAD */
        function renderSpread(index) {
            if (index < 0 || index >= aartisData.length) return;
            currentPageIndex = index;
            const aarti = aartisData[index];
            const container = document.getElementById('book-inner');
            const isHinglish = currentLang === 'hinglish';
            const isBoth = currentLang === 'both';

            const isChalisa = isChalisaBook();

            // Verses generation based on language mode
            let versesHtml = aarti.verses.map((v, i) => {
                const isDoha = v.hi && (v.hi.includes('दोहा') || v.hi.includes('Doha'));
                if (isDoha) {
                    const cleanHi = v.hi.replace(/॥\s*दोहा\s*॥\s*/g, '').replace(/\n/g, '<br>');
                    const cleanEn = v.en ? v.en.replace(/\|\|\s*Doha\s*\|\|\s*/gi, '').replace(/\n/g, '<br>') : '';
                    if (isHinglish) {
                        return `
                            <div class="chalisa-doha-box" style="font-family: var(--font-sans);">
                                <span class="chalisa-doha-badge">॥ Sacred Couplet (Doha) ॥</span>
                                <div>${cleanEn}</div>
                            </div>
                        `;
                    } else if (isBoth) {
                        return `
                            <div class="chalisa-doha-box">
                                <span class="chalisa-doha-badge">॥ दोहा ॥</span>
                                <div>${cleanHi}</div>
                                <div class="transliteration" style="font-size: 0.88em; margin-top: 4px;">${cleanEn}</div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="chalisa-doha-box">
                                <span class="chalisa-doha-badge">॥ दोहा ॥</span>
                                <div>${cleanHi}</div>
                            </div>
                        `;
                    }
                }

                const chorusCls = (i === 0 && !isChalisa) ? 'lyric-chorus' : '';
                if (isHinglish) {
                    return `
                        <div class="lyric-verse ${chorusCls}" style="font-family: var(--font-sans);">
                            ${v.en.replace(/\n/g, '<br>')}
                        </div>
                    `;
                } else if (isBoth) {
                    return `
                        <div class="lyric-verse ${chorusCls}">
                            ${v.hi.replace(/\n/g, '<br>')}
                            <span class="transliteration">${v.en.replace(/\n/g, '<br>')}</span>
                        </div>
                    `;
                } else {
                    return `
                        <div class="lyric-verse ${chorusCls}">
                            ${v.hi.replace(/\n/g, '<br>')}
                        </div>
                    `;
                }
            }).join('');

            // Left page text elements
            const displayTitle = isHinglish ? aarti.englishTitle : aarti.title;
            const displaySubTitle = isHinglish ? aarti.title : aarti.englishTitle;
            const displayCategory = isHinglish ? aarti.categoryEn : aarti.category;
            const displayMantraLabel = isHinglish ? aarti.mantraLabelEn : aarti.mantraLabel;
            const displayMantra = isHinglish ? aarti.mantraEn : (isBoth ? `${aarti.mantra}<div style="font-size: 0.8rem; font-style: italic; color: #6a4220; margin-top: 4px; font-family: var(--font-sans);">${aarti.mantraEn}</div>` : aarti.mantra);
            const displayAbout = isHinglish ? aarti.aboutEn : aarti.about;
            const displayBhavarth = isHinglish ? aarti.bhavarthEn : aarti.bhavarth;
            const fontFamily = isHinglish ? 'var(--font-sans)' : 'var(--font-devanagari)';

            // Audio Player Card Generation
            let audioCardHtml = '';
            if (aarti.audioTracks && aarti.audioTracks.length > 0) {
                const selectedIdx = getSelectedTrackIndex(aarti);
                const curTrack = aarti.audioTracks[selectedIdx] || aarti.audioTracks[0];
                const isThisPlaying = audioState.isPlaying && (audioState.aartiId === aarti.id) && (audioState.trackIndex === selectedIdx);

                let versionOptionsHtml = '';
                if (aarti.audioTracks.length > 1) {
                    versionOptionsHtml = `
                        <div class="audio-version-picker">
                            <span class="audio-version-lbl">${isHinglish ? "Version:" : "गायन स्वर:"}</span>
                            <select class="audio-version-dropdown" onchange="selectAartiAudioVersion('${aarti.id}', this.value)" title="${isHinglish ? "Choose audio version" : "आरती संस्करण चुनें"}">
                                ${aarti.audioTracks.map((tr, idx) => `
                                    <option value="${idx}" ${idx === selectedIdx ? 'selected' : ''}>
                                        ${tr.artist || tr.title} (${tr.duration || ''})
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                    `;
                }

                audioCardHtml = `
                    <div class="aarti-audio-card ${isThisPlaying ? 'is-playing' : ''}" id="aarti-audio-card">
                        <div class="aarti-audio-main">
                            <button type="button" class="aarti-audio-play-btn" onclick="playAartiAudio('${aarti.id}', ${selectedIdx})" title="${isThisPlaying ? 'रोकें (Pause)' : 'आरती संगीत सुनें (Play Music)'}">
                                <span class="play-icon">${isThisPlaying ? '⏸' : '▶'}</span>
                                <span class="play-pulse-ring"></span>
                            </button>

                            <div class="aarti-audio-info">
                                <div class="audio-title-row">
                                    <span class="audio-track-name">${curTrack.title}</span>
                                    <span class="audio-track-artist">${curTrack.artist || ''}</span>
                                </div>
                                ${versionOptionsHtml}
                            </div>
                        </div>

                        <div class="aarti-audio-timeline">
                            <span class="audio-time-label" id="card-time-cur">0:00</span>
                            <input type="range" class="audio-scrubber-bar" id="card-scrubber" min="0" max="100" value="0" step="0.1" 
                                   oninput="onAudioSeekInput(this.value)" onchange="onAudioSeekChange(this.value)" aria-label="Audio Progress">
                            <span class="audio-time-label" id="card-time-dur">${curTrack.duration || '0:00'}</span>
                        </div>

                        <div class="aarti-audio-tools">
                            <div class="audio-speed-pills" title="गति नियंत्रण (0.75x - 2.00x)">
                                <span class="speed-pill-label">गति:</span>
                                ${AUDIO_SPEEDS.map(s => `
                                    <button type="button" class="speed-pill-btn ${audioState.speed === s ? 'active' : ''}" onclick="setAudioSpeed(${s})">
                                        ${s === 1 ? '1.0x' : s + 'x'}
                                    </button>
                                `).join('')}
                            </div>

                            <button type="button" class="audio-loop-pill ${audioState.isLoop ? 'active' : ''}" onclick="toggleAudioLoop()" title="आरती पुनरावृत्ति (Loop)">
                                🔁 <span class="loop-txt">${audioState.isLoop ? (isHinglish ? 'Loop ON' : 'लूप चालू') : (isHinglish ? 'Loop' : 'लूप')}</span>
                            </button>
                        </div>
                    </div>
                `;
            } else {
                audioCardHtml = `
                    <div class="aarti-audio-notice">
                        <span class="audio-notice-icon">🎵</span>
                        <span class="audio-notice-text">${isHinglish ? "Devotional audio for this prayer will be added soon" : "इस पावन आरती का संगीत शीघ्र जोड़ा जाएगा"}</span>
                    </div>
                `;
            }

            container.innerHTML = `
                <div class="book-spread ${mobileTab === 'lyrics' ? 'mobile-tab-lyrics' : (mobileTab === 'mantra' ? 'mobile-tab-mantra' : 'mobile-tab-both')}">
                    <div class="book-spine-crease"></div>

                    <!-- Mobile Top Tab Segmented Control (Visible ONLY on mobile <= 860px) -->
                    <div class="mobile-reading-tabs">
                        <button class="m-tab-btn ${mobileTab === 'lyrics' ? 'active' : ''}" data-tab="lyrics" onclick="setMobileTab('lyrics')">
                            📜 ${isHinglish ? (isChalisa ? "Chalisa Verses" : "Aarti Lyrics") : (isChalisa ? "चालीसा पद" : "आरती पद")}
                        </button>
                        <button class="m-tab-btn ${mobileTab === 'mantra' ? 'active' : ''}" data-tab="mantra" onclick="setMobileTab('mantra')">
                            🕉️ ${isHinglish ? "Mantra & Katha" : "ध्यान व कथा"}
                        </button>
                        <button class="m-tab-btn ${mobileTab === 'both' ? 'active' : ''}" data-tab="both" onclick="setMobileTab('both')">
                            📖 ${isHinglish ? "Full View" : "सम्पूर्ण दर्शन"}
                        </button>
                    </div>

                    <!-- LEFT PAGE: Deity Portrait, Mantra & Spiritual Context -->
                    <div class="book-page left-page" style="font-family: ${fontFamily};">
                        <div class="page-ornate-border">
                            <svg class="corner-mandala corner-tl" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                            <svg class="corner-mandala corner-tr" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                            <svg class="corner-mandala corner-bl" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                            <svg class="corner-mandala corner-br" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                        </div>

                        <div class="page-header">
                            <span class="page-category-tag">${displayCategory}</span>
                            <span class="single-mode-nav-hint" onclick="toggleSinglePageSide()" title="पद देखें">📜 ${isHinglish ? (isChalisa ? "View Chaupais →" : "View Lyrics →") : (isChalisa ? "चालीसा पद →" : "आरती पद →")}</span>
                            <span>${isHinglish ? (isChalisa ? "Shri Sampoorna Chalisa Granth" : "Sampoorna Aarti Sangrah") : (isChalisa ? "॥ श्री सम्पूर्ण चालीसा संग्रह ॥" : "श्री सम्पूर्ण आरती संग्रह")}</span>
                        </div>

                        <div class="left-page-body" id="left-page-body">
                            <div class="deity-illustration-box">
                                <div class="deity-portrait-frame">
                                    <img class="deity-img" 
                                         src="${aarti.image || aarti.onlineImage}" 
                                         alt="${displayTitle}" 
                                         loading="eager"
                                         onerror="if(this.dataset.tried!=='1'&&'${aarti.onlineImage}'){this.dataset.tried='1';this.src='${aarti.onlineImage}';}else{this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='flex';}" />
                                    <div class="deity-avatar-fallback" style="display: none;">
                                        <span>${aarti.avatar}</span>
                                    </div>
                                    <span class="diya-flame-icon">🪔</span>
                                </div>
                                <h2 class="deity-name-heading">${displayTitle}</h2>
                                <span class="deity-name-sub">${displaySubTitle}</span>
                            </div>

                            <div class="deity-mantra-box">
                                <div class="mantra-label">॥ ${displayMantraLabel} ॥</div>
                                <div class="mantra-text">${displayMantra}</div>
                            </div>

                            <div class="deity-quick-info">
                                <span style="color: var(--crimson); font-weight: normal;">${isHinglish ? "Significance: " : "माहात्म्य: "}</span> ${displayAbout}
                            </div>

                            <div class="aarti-bhavarth-box">
                                <span style="color: var(--crimson); font-weight: normal;">${isHinglish ? "Meaning & Glory: " : "भावार्थ एवं महिमा: "}</span> ${displayBhavarth}
                            </div>
                        </div>

                        <!-- Mobile Quick Switch to Lyrics -->
                        <div class="mobile-switch-container">
                            <button class="mobile-tab-switch-btn" onclick="setMobileTab('lyrics')">
                                📜 ${isHinglish ? (isChalisa ? "Chant 40 Chaupais Now →" : "Sing Aarti Verses Now →") : (isChalisa ? "चालीसा पाठ करें (४० चौपाइयाँ) →" : "आरती पद गाएं (Lyrics) →")}
                            </button>
                        </div>

                        <div class="page-footer">
                            <span>${isHinglish ? "Om Tat Sat" : "ॐ तत्सत्"}</span>
                            <span class="page-num">${(index * 2) + 1}</span>
                        </div>
                    </div>

                    <!-- RIGHT PAGE: Sacred Verses -->
                    <div class="book-page right-page">
                        <div class="page-ornate-border">
                            <svg class="corner-mandala corner-tl" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                            <svg class="corner-mandala corner-tr" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                            <svg class="corner-mandala corner-bl" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                            <svg class="corner-mandala corner-br" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                        </div>

                        <!-- Web Divine Background Watermark -->
                        <div class="page-watermark-container">
                            <img src="${aarti.image || aarti.onlineImage}" class="page-watermark-img" alt="" onerror="this.parentElement.style.display='none';" />
                        </div>

                        <div class="page-header">
                            <span class="single-mode-nav-hint" onclick="toggleSinglePageSide()" title="मंत्र व भावार्थ देखें">🕉️ ${isHinglish ? "← Mantra" : "← ध्यान व मंत्र"}</span>
                            <span>${isHinglish ? "|| Shri Hari Sharanam ||" : "॥ श्रीहरिः शरणम् ॥"}</span>
                            <span class="page-category-tag">${isHinglish ? (isChalisa ? "Chalisa Chanting" : "Aarti Stuti") : (isChalisa ? "चालीसा पाठ" : "आरती स्तुति")}</span>
                        </div>

                        <!-- Mobile Deity Hero Banner (Visible only in mobile lyrics view) -->
                        <div class="mobile-deity-hero">
                            <div class="m-hero-thumb">
                                <img src="${aarti.image || aarti.onlineImage}" alt="${displayTitle}" 
                                     onerror="if(this.dataset.tried!=='1'&&'${aarti.onlineImage}'){this.dataset.tried='1';this.src='${aarti.onlineImage}';}else{this.style.display='none';}" />
                                <span class="m-hero-diya">🪔</span>
                            </div>
                            <div class="m-hero-info">
                                <h3 class="m-hero-title">${displayTitle}</h3>
                                <span class="m-hero-sub">${displaySubTitle}</span>
                            </div>
                        </div>

                        <div class="aarti-title-box">
                            <h3 class="aarti-title">${displayTitle}</h3>
                            <svg class="mandala-divider" viewBox="0 0 100 12" preserveAspectRatio="none">
                                <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="var(--gold-dark)" stroke-width="1.5"/>
                                <circle cx="50" cy="6" r="3" fill="var(--crimson)"/>
                            </svg>
                        </div>

                        ${audioCardHtml}

                        <div class="aarti-lyrics-container" id="lyrics-box" style="font-size: ${baseFontSize}rem;">
                            ${versesHtml}
                        </div>

                        <!-- Mobile Quick Switch to Mantra -->
                        <div class="mobile-switch-container">
                            <button class="mobile-tab-switch-btn" onclick="setMobileTab('mantra')">
                                🕉️ ${isHinglish ? "Read Dhyan Mantra & Significance →" : "ध्यान मंत्र व माहात्म्य पढ़ें →"}
                            </button>
                        </div>

                        <div class="page-footer">
                            <span class="page-num">${(index * 2) + 2}</span>
                            <span>${isHinglish ? "Iti Shubham" : "इति शुभम्"}</span>
                        </div>
                    </div>
                </div>
            `;
            updateControlsState();
            syncAllAudioUI();
        }

        /* ========================================================
           A4 PAGE VIEW MODES (Dual-Page Spread vs Single A4 Page)
        ======================================================== */
        function toggleA4Mode() {
            isSingleA4Mode = !isSingleA4Mode;
            const bookContainer = document.getElementById('book-container');
            const a4BtnText = document.getElementById('txt-a4-btn');
            const sideBtn = document.getElementById('btn-toggle-side');

            if (isSingleA4Mode) {
                bookContainer.classList.add('single-a4-mode');
                if (a4BtnText) a4BtnText.textContent = (currentLang === 'hinglish') ? "Dual A4" : "दो पृष्ठ A4";
                if (sideBtn) sideBtn.style.display = 'inline-flex';
                showNotification(currentLang === 'hinglish' ? "Single A4 Page View Active" : "एकल A4 पृष्ठ दृश्य सक्रिय");
            } else {
                bookContainer.classList.remove('single-a4-mode', 'show-details-page');
                if (a4BtnText) a4BtnText.textContent = (currentLang === 'hinglish') ? "Single A4" : "एकल A4";
                if (sideBtn) sideBtn.style.display = 'none';
                showNotification(currentLang === 'hinglish' ? "Dual-Page A4 Spread Active" : "द्वि-पृष्ठ A4 दृश्य सक्रिय");
            }
        }

        function toggleSinglePageSide() {
            if (!isSingleA4Mode) {
                toggleA4Mode();
                return;
            }
            const bookContainer = document.getElementById('book-container');
            bookContainer.classList.toggle('show-details-page');
            const showingDetails = bookContainer.classList.contains('show-details-page');
            if (currentLang === 'hinglish') {
                showNotification(showingDetails ? "Showing Mantra & Meaning" : "Showing Aarti Lyrics");
            } else {
                showNotification(showingDetails ? "ध्यान मंत्र व भावार्थ पृष्ठ" : "आरती पद पृष्ठ");
            }
        }

        /* NAVIGATION HELPERS */
        function nextPage() {
            if (currentPageIndex < aartisData.length - 1) {
                playPageTurnSound();
                renderSpread(currentPageIndex + 1);
            }
        }

        function prevPage() {
            if (currentPageIndex > 0) {
                playPageTurnSound();
                renderSpread(currentPageIndex - 1);
            } else if (currentPageIndex === 0) {
                playPageTurnSound();
                renderCover();
            }
        }

        function jumpToAarti(indexStr) {
            const idx = parseInt(indexStr);
            if (idx === -1) {
                renderCover();
            } else {
                playPageTurnSound();
                renderSpread(idx);
            }
        }

        function updateControlsState() {
            // Update Prev / Next Buttons (Desktop)
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');
            if (btnPrev) {
                btnPrev.style.opacity = (currentPageIndex === -1) ? '0.3' : '1';
                btnPrev.style.pointerEvents = (currentPageIndex === -1) ? 'none' : 'auto';
            }
            if (btnNext) {
                btnNext.style.opacity = (currentPageIndex === aartisData.length - 1) ? '0.3' : '1';
                btnNext.style.pointerEvents = (currentPageIndex === aartisData.length - 1) ? 'none' : 'auto';
            }

            // Update Mobile Dock Prev / Next Buttons
            const mBtnPrev = document.getElementById('m-btn-prev');
            const mBtnNext = document.getElementById('m-btn-next');
            if (mBtnPrev) {
                mBtnPrev.style.opacity = (currentPageIndex === -1) ? '0.35' : '1';
                mBtnPrev.style.pointerEvents = (currentPageIndex === -1) ? 'none' : 'auto';
            }
            if (mBtnNext) {
                mBtnNext.style.opacity = (currentPageIndex === aartisData.length - 1) ? '0.35' : '1';
                mBtnNext.style.pointerEvents = (currentPageIndex === aartisData.length - 1) ? 'none' : 'auto';
            }

            // Sync Dropdowns (Desktop, Mobile & Fullscreen)
            const select = document.getElementById('aarti-dropdown');
            if (select) select.value = currentPageIndex;
            const mSelect = document.getElementById('m-aarti-dropdown');
            if (mSelect) mSelect.value = currentPageIndex;
            const fsSelect = document.getElementById('fs-aarti-dropdown');
            if (fsSelect) fsSelect.value = currentPageIndex;

            // Sync Fullscreen Top Bar Title
            const fsTitle = document.getElementById('fs-top-title');
            if (fsTitle) {
                const isHinglish = currentLang === 'hinglish';
                const isChalisa = isChalisaBook();
                if (currentPageIndex === -1) {
                    fsTitle.textContent = isHinglish 
                        ? (isChalisa ? "Shri Sampoorna Chalisa Sangrah (Cover)" : "Shri Sampoorna Aarti Sangrah (Cover)")
                        : (isChalisa ? "श्री सम्पूर्ण चालीसा संग्रह (आमुख)" : "श्री सम्पूर्ण आरती संग्रह (आमुख)");
                } else {
                    const cur = aartisData[currentPageIndex];
                    fsTitle.textContent = isHinglish ? `${cur.englishTitle} (${cur.categoryEn})` : `${cur.title} (${cur.category})`;
                }
            }

            // Highlight Active TOC Item
            document.querySelectorAll('.toc-item').forEach((item, i) => {
                if (i === currentPageIndex) item.classList.add('active');
                else item.classList.remove('active');
            });
        }

        /* BOOKMARK MANAGEMENT */
        function toggleBookmarkSave() {
            localStorage.setItem(getStorageKey('page'), currentPageIndex);
            const ribbon = document.querySelector('.bookmark-ribbon');
            if (ribbon) ribbon.style.transform = 'translateY(15px)';
            const title = currentPageIndex === -1 
                ? (currentLang === 'hinglish' ? "Cover Page Bookmarked!" : "मुखपृष्ठ बुकमार्क किया गया!") 
                : (currentLang === 'hinglish' ? `"${aartisData[currentPageIndex].englishTitle}" Bookmarked!` : `"${aartisData[currentPageIndex].title}" पृष्ठ बुकमार्क हो गया!`);
            showNotification(title);
            setTimeout(() => {
                if (ribbon) ribbon.style.transform = '';
            }, 600);
        }

        /* TOC POPULATION & FILTER */
        function populateToc() {
            const list = document.getElementById('toc-list-items');
            const isHinglish = currentLang === 'hinglish';
            list.innerHTML = aartisData.map((a, i) => `
                <li class="toc-item" onclick="selectFromToc(${i})">
                    <div class="toc-item-title">
                        <img class="toc-item-thumb" 
                             src="${a.image || a.onlineImage}" 
                             alt="" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" />
                        <span style="display: none; font-size: 1.15rem;">${a.avatar}</span>
                        <span>${isHinglish ? a.englishTitle : a.title}</span>
                    </div>
                    <span class="toc-item-page">${isHinglish ? `Page ${(i * 2) + 1}` : `पृष्ठ ${(i * 2) + 1}`}</span>
                </li>
            `).join('');
        }

        function populateDropdown() {
            const select = document.getElementById('aarti-dropdown');
            const mSelect = document.getElementById('m-aarti-dropdown');
            const fsSelect = document.getElementById('fs-aarti-dropdown');
            const isHinglish = currentLang === 'hinglish';
            const isChalisa = isChalisaBook();
            const introLabel = isHinglish 
                ? "📖 Book Cover / Intro" 
                : (isChalisa ? "📖 चालीसा आमुख / मुखपृष्ठ" : "📖 ग्रंथ आमुख / मुखपृष्ठ");
            const opts = `<option value="-1">${introLabel}</option>` + 
                aartisData.map((a, i) => `<option value="${i}">${i + 1}. ${isHinglish ? a.englishTitle : a.title}</option>`).join('');
            if (select) select.innerHTML = opts;
            if (mSelect) mSelect.innerHTML = opts;
            if (fsSelect) fsSelect.innerHTML = opts;
        }

        function toggleToc() {
            const drawer = document.getElementById('toc-drawer');
            const overlay = document.getElementById('toc-overlay');
            drawer.classList.toggle('open');
            overlay.classList.toggle('open');
            if (drawer.classList.contains('open')) {
                document.getElementById('toc-search-input').focus();
            }
        }

        function selectFromToc(idx) {
            toggleToc();
            playPageTurnSound();
            renderSpread(idx);
        }

        function filterAartis(query) {
            const q = query.toLowerCase().trim();
            document.querySelectorAll('.toc-item').forEach((item, i) => {
                const data = aartisData[i];
                const matches = data.title.toLowerCase().includes(q) ||
                                data.englishTitle.toLowerCase().includes(q) ||
                                data.category.toLowerCase().includes(q) ||
                                data.categoryEn.toLowerCase().includes(q);
                item.style.display = matches ? 'flex' : 'none';
            });
        }

        /* READING ACCESSIBILITY TOOLS */
        function changeFontSize(delta) {
            baseFontSize = Math.max(0.85, Math.min(1.75, parseFloat((baseFontSize + (delta * 0.08)).toFixed(2))));
            const lyricsBox = document.getElementById('lyrics-box');
            if (lyricsBox) lyricsBox.style.setProperty('font-size', `${baseFontSize}rem`, 'important');
            
            // Also scale Mantra page texts harmoniously!
            const mantraText = document.querySelector('.left-page .mantra-text');
            if (mantraText) mantraText.style.setProperty('font-size', `${(baseFontSize * 1.02).toFixed(2)}rem`, 'important');
            const quickInfo = document.querySelector('.left-page .deity-quick-info');
            if (quickInfo) quickInfo.style.setProperty('font-size', `${(baseFontSize * 0.88).toFixed(2)}rem`, 'important');
            const bhavarth = document.querySelector('.left-page .aarti-bhavarth-box');
            if (bhavarth) bhavarth.style.setProperty('font-size', `${(baseFontSize * 0.88).toFixed(2)}rem`, 'important');

            showNotification(currentLang === 'hinglish' ? `Text Zoom: ${Math.round((baseFontSize / 1.15) * 100)}%` : `अक्षर आकार: ${Math.round((baseFontSize / 1.15) * 100)}%`);
        }

        function shareAarti() {
            const url = window.location.href;
            const isChalisa = isChalisaBook();
            if (navigator.share) {
                navigator.share({
                    title: isChalisa ? 'श्री हनुमान व दुर्गा चालीसा संग्रह' : 'श्री सम्पूर्ण आरती संग्रह',
                    text: isChalisa ? 'संकटमोचन श्री हनुमान व दुर्गा चालीसा का पाठ करें।' : 'सभी देवी-देवताओं की पावन आरतियाँ पढ़ें व जपें।',
                    url: url
                }).catch(() => {});
            } else if (navigator.clipboard) {
                navigator.clipboard.writeText(url);
                showNotification("लिंक कॉपी हो गया! (Link Copied)");
            }
        }

        function showNotification(msg) {
            const toast = document.createElement('div');
            toast.className = 'app-toast-notification';
            toast.textContent = msg;
            toast.style.cssText = `
                position: fixed;
                bottom: 80px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #a72314, #4a0000);
                border: 1px solid var(--gold-primary);
                color: #fff;
                padding: 10px 24px;
                border-radius: 25px;
                font-family: var(--font-devanagari);
                font-size: 0.95rem;
                box-shadow: 0 4px 20px rgba(0,0,0,0.6);
                z-index: 999;
                animation: fadeInOut 2.5s forwards;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2600);
        }

        /* ========================================================
           DOWNLOAD BOOK IMPLEMENTATION (PDF / Standalone HTML / Text)
        ======================================================== */
        function setDownloadLang(lang, showToast = true) {
            downloadLang = lang;
            localStorage.setItem(getStorageKey('download_lang'), lang);

            // Update pills in modal UI
            ['hi', 'hinglish', 'both'].forEach(l => {
                const btn = document.getElementById(`dl-lang-${l}`);
                if (btn) btn.classList.toggle('active', l === lang);
            });

            // Update hint text
            const hint = document.getElementById('dl-lang-hint');
            if (hint) {
                const isChalisa = isChalisaBook();
                if (lang === 'hi') {
                    hint.innerHTML = '📌 चयनित: <span style="color: var(--gold-light); font-weight: normal;">हिन्दी (Devanagari)</span> — पुस्तक शुद्ध हिन्दी में डाउनलोड होगी।';
                } else if (lang === 'hinglish') {
                    hint.innerHTML = '📌 Selected: <span style="color: var(--gold-light); font-weight: normal;">Hinglish (Roman Script)</span> — Book will be downloaded in Roman English phonetics.';
                } else {
                    hint.innerHTML = isChalisa
                        ? '📌 चयनित: <span style="color: var(--gold-light); font-weight: normal;">दोनों (Bilingual Both)</span> — प्रत्येक चालीसा हिन्दी व हिंग्लिश दोनों में समाहित होगी।'
                        : '📌 चयनित: <span style="color: var(--gold-light); font-weight: normal;">दोनों (Bilingual Both)</span> — प्रत्येक आरती हिन्दी व हिंग्लिश दोनों में समाहित होगी।';
                }
            }

            if (showToast) {
                const msg = lang === 'hi' 
                    ? "डाउनलोड भाषा: हिन्दी चयनित" 
                    : (lang === 'hinglish' ? "Download Language: Hinglish selected" : "डाउनलोड भाषा: दोनों (Hindi + Hinglish) चयनित");
                showNotification(msg);
            }
        }

        function setDownloadLayout(layout, showToast = true) {
            downloadLayout = layout;
            localStorage.setItem(getStorageKey('download_layout'), layout);

            const btnMap = {
                'compact_2col': 'dl-layout-compact',
                'mantras_end': 'dl-layout-mantras-end',
                'mantras_start': 'dl-layout-mantras-start',
                'detailed_2page': 'dl-layout-detailed'
            };

            document.querySelectorAll('.dl-layout-pill').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.getElementById(btnMap[layout]);
            if (activeBtn) activeBtn.classList.add('active');

            const hint = document.getElementById('dl-layout-hint');
            if (hint) {
                const isChalisa = isChalisaBook();
                if (layout === 'compact_2col') {
                    hint.innerHTML = isChalisa
                        ? '📌 प्रारूप: <span style="color: var(--gold-light); font-weight: normal;">एकल पृष्ठ सचित्र चालीसा (2-कॉलम)</span> — सम्पूर्ण ४० चौपाइयाँ व दोहे सचित्र मन्त्र सहित 1 पृष्ठ में (कुल 4 पृष्ठ)।'
                        : '📌 प्रारूप: <span style="color: var(--gold-light); font-weight: normal;">एकल पृष्ठ सचित्र आरती (2-कॉलम)</span> — प्रत्येक आरती सचित्र मन्त्र व 2-कॉलम पदों सहित 1 पृष्ठ में (शून्य रिक्त स्थान, कुल 22 पृष्ठ)।';
                } else if (layout === 'mantras_end') {
                    hint.innerHTML = '📌 प्रारूप: <span style="color: var(--gold-light); font-weight: normal;">आरती पहले + अंत में मन्त्र संग्रह</span> — मुख्य आरतियाँ पहले, और अंत में सभी ध्यान मन्त्र व माहात्म्य संग्रह।';
                } else if (layout === 'mantras_start') {
                    hint.innerHTML = '📌 प्रारूप: <span style="color: var(--gold-light); font-weight: normal;">प्रारंभ में मन्त्र संग्रह + आरती</span> — पहले सभी ध्यान मन्त्र व स्तुति संग्रह, फिर सभी रचनाएँ।';
                } else {
                    hint.innerHTML = '📌 प्रारूप: <span style="color: var(--gold-light); font-weight: normal;">विस्तृत २-पृष्ठ ग्रन्थ</span> — प्रत्येक रचना हेतु 1 पूरा पृष्ठ ध्यान मन्त्र व 1 पूरा पृष्ठ पद।';
                }
            }

            if (showToast) {
                const msg = layout === 'compact_2col' 
                    ? "प्रारूप: एकल पृष्ठ (2-कॉलम) चयनित" 
                    : (layout === 'mantras_end' ? "प्रारूप: अंत में मन्त्र संग्रह चयनित" : (layout === 'mantras_start' ? "प्रारूप: प्रारंभ में मन्त्र संग्रह चयनित" : "प्रारूप: विस्तृत २-पृष्ठ चयनित"));
                showNotification(msg);
            }
        }

        function setDownloadImgMode(mode, showToast = true) {
            downloadImgMode = mode;
            localStorage.setItem(getStorageKey('download_img_mode'), mode);

            document.querySelectorAll('.dl-img-pill').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.getElementById(mode === 'compact' ? 'dl-img-compact' : 'dl-img-none');
            if (activeBtn) activeBtn.classList.add('active');

            const hint = document.getElementById('dl-img-hint');
            if (hint) {
                const isChalisa = isChalisaBook();
                if (mode === 'none') {
                    hint.innerHTML = isChalisa
                        ? '📌 प्रतिमा: <span style="color: var(--gold-light); font-weight: normal;">प्रतिमा रहित (No Images / Pure Text)</span> — कोई चित्र नहीं, सम्पूर्ण पृष्ठ केवल चालीसा पाठ हेतु समर्पित।'
                        : '📌 प्रतिमा: <span style="color: var(--gold-light); font-weight: normal;">प्रतिमा रहित (No Images / Pure Text)</span> — कोई चित्र नहीं, सम्पूर्ण पृष्ठ केवल आरती पद व मन्त्र हेतु समर्पित।';
                } else {
                    hint.innerHTML = '📌 प्रतिमा: <span style="color: var(--gold-light); font-weight: normal;">सूक्ष्म मुद्रा (34px) + भव्य पारदर्शी दिव्य छवि (Watermark)</span> — सम्पूर्ण पृष्ठ पर प्रभु की पावन उपस्थिति, पद शत-प्रतिशत पठनीय।';
                }
            }

            if (showToast) {
                const msg = (mode === 'none') ? "प्रतिमा: प्रतिमा रहित (No Images) चयनित" : "प्रतिमा: सूक्ष्म मुद्रा + भव्य पारदर्शी छवि (Stamp + Watermark) चयनित";
                showNotification(msg);
            }
        }

        function openDownloadModal() {
            setDownloadLang(downloadLang || currentLang || 'hi', false);
            setDownloadLayout(downloadLayout || 'compact_2col', false);
            setDownloadImgMode(downloadImgMode || 'compact', false);
            document.getElementById('download-modal').classList.add('open');
        }

        function closeDownloadModal(e) {
            document.getElementById('download-modal').classList.remove('open');
        }

        // Balanced verse chunker ensuring generous content per page with ZERO trimming
        function getAartiLyricsPages(aarti, targetLang) {
            if (isChalisaItem(aarti)) {
                const chalisa = parseChalisaStructure(aarti);
                if (chalisa.chaupais.length > 0) {
                    const mid = Math.ceil(chalisa.chaupais.length / 2);
                    return [chalisa.chaupais.slice(0, mid), chalisa.chaupais.slice(mid)];
                }
            }

            const isBoth = (targetLang === 'both');
            const isHinglish = (targetLang === 'hinglish');
            
            const verseLines = aarti.verses.map(v => {
                const hiCount = v.hi.split('\n').filter(Boolean).length;
                const enCount = v.en.split('\n').filter(Boolean).length;
                return isBoth ? (hiCount + enCount) : (isHinglish ? enCount : hiCount);
            });
            const totalLines = verseLines.reduce((sum, c) => sum + c, 0);
            const totalVerses = aarti.verses.length;

            // Maximum lines that fit comfortably on a single A4 page with generous readability
            // In pure Hindi/Hinglish: up to 20 lines fits cleanly on 1 page with Samarpan box
            // In Bilingual (Hindi + English): up to 24 total lines
            const maxLinesSingle = isBoth ? 24 : 20;
            const maxLinesMulti = isBoth ? 26 : 22;

            if (totalLines <= maxLinesSingle) {
                return [aarti.verses];
            }

            // Balanced partitioning into minimum necessary pages
            let numPages = Math.ceil(totalLines / maxLinesMulti);
            let targetPer = totalLines / numPages;
            
            let curChunks = [];
            let curStart = 0;
            let curL = 0;
            
            for (let vIdx = 0; vIdx < totalVerses; vIdx++) {
                let vL = verseLines[vIdx];
                let remVerses = totalVerses - vIdx;
                let remPages = numPages - curChunks.length;
                
                // Guarantee each subsequent page gets at least 1 verse
                if (remPages > 1 && remVerses <= remPages) {
                    curChunks.push(aarti.verses.slice(curStart, vIdx));
                    curStart = vIdx;
                    curL = vL;
                    continue;
                }
                
                if (curL + vL > maxLinesMulti || (curL >= targetPer && remPages > 1)) {
                    curChunks.push(aarti.verses.slice(curStart, vIdx));
                    curStart = vIdx;
                    curL = vL;
                } else {
                    curL += vL;
                }
            }
            if (curStart < totalVerses) {
                curChunks.push(aarti.verses.slice(curStart));
            }
            return curChunks;
        }

        // Dynamic 2-column compact pagination helper: Paginate to page 2 (and 3) if text exceeds 2 columns on page 1
        function getAartiCompactPages(aarti, layout, targetLang) {
            if (isChalisaItem(aarti)) {
                const chalisa = parseChalisaStructure(aarti);
                if (chalisa.chaupais.length > 0) {
                    const mid = Math.ceil(chalisa.chaupais.length / 2);
                    return [chalisa.chaupais.slice(0, mid), chalisa.chaupais.slice(mid)];
                }
            }

            const isBoth = (targetLang === 'both');
            const isHinglish = (targetLang === 'hinglish');
            const totalVerses = aarti.verses.length;

            const verseLines = aarti.verses.map(v => {
                const hiCount = v.hi ? v.hi.split('\n').filter(Boolean).length : 0;
                const enCount = v.en ? v.en.split('\n').filter(Boolean).length : 0;
                return isBoth ? (hiCount + enCount) : (isHinglish ? enCount : hiCount);
            });
            const totalLines = verseLines.reduce((sum, c) => sum + c, 0);

            const hasMantraBox = (layout === 'compact_2col');
            const page1MaxVerses = isBoth ? (hasMantraBox ? 14 : 16) : (hasMantraBox ? 22 : 24);
            const page1MaxLines  = isBoth ? (hasMantraBox ? 48 : 56) : (hasMantraBox ? 42 : 48);

            const nextPagesMaxVerses = isBoth ? 18 : 26;
            const nextPagesMaxLines  = isBoth ? 64 : 52;

            if (totalVerses <= page1MaxVerses && totalLines <= page1MaxLines) {
                return [aarti.verses];
            }

            // Multi-page needed: determine balanced number of pages
            const estLinesAfterP1 = totalLines - page1MaxLines;
            const numPages = 1 + Math.max(1, Math.ceil(estLinesAfterP1 / nextPagesMaxLines));

            let chunks = [];
            let p1LimitVerses = Math.min(page1MaxVerses, Math.ceil(totalVerses / numPages));
            let p1End = 0, p1Lines = 0;
            while (p1End < totalVerses && p1End < p1LimitVerses && (p1Lines + verseLines[p1End]) <= page1MaxLines) {
                p1Lines += verseLines[p1End];
                p1End++;
            }
            if (p1End === 0) p1End = 1;
            chunks.push(aarti.verses.slice(0, p1End));

            let curIndex = p1End;
            let remPages = numPages - 1;

            for (let p = 0; p < remPages; p++) {
                let isLast = (p === remPages - 1);
                if (isLast) {
                    chunks.push(aarti.verses.slice(curIndex));
                    break;
                }
                let targetForThis = Math.ceil((totalVerses - curIndex) / (remPages - p));
                let nextEnd = Math.min(totalVerses, curIndex + targetForThis);
                chunks.push(aarti.verses.slice(curIndex, nextEnd));
                curIndex = nextEnd;
            }

            return chunks;
        }

        // 1. Download as Printable PDF Book (Supports 2-Column Compact, Dedicated Mantra Section, and Detailed)
        function downloadAsPDF() {
            closeDownloadModal();
            // Instantly remove any toast notification so it NEVER prints on the document!
            document.querySelectorAll('.app-toast-notification, [style*="z-index: 999"]').forEach(t => t.remove());

            const printable = document.getElementById('printable-book');
            const targetLang = downloadLang || currentLang || 'hi';
            const targetLayout = downloadLayout || 'compact_2col';
            const isHinglish = targetLang === 'hinglish';
            const isBoth = targetLang === 'both';

            // Corner Mandalas SVG Ornament
            const cornerCornersHtml = `
                <svg class="print-corner corner-tl" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                <svg class="print-corner corner-tr" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                <svg class="print-corner corner-bl" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                <svg class="print-corner corner-br" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            `;

            const isChalisa = isChalisaBook();

            // Helper to format a verse in print
            const formatVerse = (v, vIdx) => {
                const isDoha = v.hi && (v.hi.includes('दोहा') || v.hi.includes('Doha'));
                if (isDoha) {
                    const cleanHi = v.hi.replace(/॥\s*दोहा\s*॥\s*/g, '').replace(/\n/g, '<br>');
                    const cleanEn = v.en ? v.en.replace(/\|\|\s*Doha\s*\|\|\s*/gi, '').replace(/\n/g, '<br>') : '';
                    return `
                        <div style="background: rgba(253, 243, 214, 0.75); border: 1px dashed #daa520; border-radius: 4px; padding: 4px 8px; margin: 4px 0; text-align: center; font-size: 10pt; color: #731308; break-inside: avoid; page-break-inside: avoid;">
                            <span style="font-size: 8pt; color: #8c5806; display: block; margin-bottom: 2px;">॥ दोहा ॥</span>
                            ${cleanHi}
                            ${isBoth ? `<span class="print-verse-translit" style="display:block; margin-top:2px; font-size: 8.5pt;">${cleanEn}</span>` : ''}
                        </div>
                    `;
                }

                const chorusCls = (vIdx === 0 && !isChalisa) ? 'chorus' : '';
                if (isHinglish) {
                    return `<div class="print-verse ${chorusCls}">${v.en.replace(/\n/g, '<br>')}</div>`;
                } else if (isBoth) {
                    return `
                        <div class="print-verse ${chorusCls}">
                            ${v.hi.replace(/\n/g, '<br>')}
                            <span class="print-verse-translit">${v.en.replace(/\n/g, '<br>')}</span>
                        </div>
                    `;
                } else {
                    return `<div class="print-verse ${chorusCls}">${v.hi.replace(/\n/g, '<br>')}</div>`;
                }
            };

            const getSamarpanHtml = () => `
                <div class="print-samarpan-box">
                    <div style="font-size: 8.5pt; font-weight: normal; color: #731308; margin-bottom: 2px;">
                        ${isHinglish ? "|| Mangal Samarpan & Prarthana ||" : "॥ पूजा समर्पण एवं मंगल प्रार्थना ॥"}
                    </div>
                    <div style="font-size: 9.8pt; color: #1a0502; font-style: italic;">
                        ${isHinglish 
                            ? "Twameva Mata Cha Pita Twameva, Twameva Bandhushcha Sakha Twameva | Twameva Vidya Dravinam Twameva, Twameva Sarvam Mama Deva Deva ||"
                            : "त्वमेव माता च पिता त्वमेव, त्वमेव बन्धुश्च सखा त्वमेव। त्वमेव विद्या द्रविणं त्वमेव, त्वमेव सर्वं मम देव देव॥"
                        }
                    </div>
                </div>
            `;

            const generateMantraPagesHtml = (startPageNum, totalPages) => {
                let mHtml = '';
                const perPage = 4;
                const numMantraPages = Math.ceil(aartisData.length / perPage);
                for (let pIdx = 0; pIdx < numMantraPages; pIdx++) {
                    const curP = startPageNum + pIdx;
                    const batch = aartisData.slice(pIdx * perPage, (pIdx + 1) * perPage);
                    const cards = batch.map(a => {
                        const aTitle = isHinglish ? a.englishTitle : a.title;
                        const mLabel = isHinglish ? a.mantraLabelEn : a.mantraLabel;
                        const aMantra = isHinglish ? a.mantraEn : a.mantra;
                        const aAbout = isHinglish ? a.aboutEn : a.about;
                        const imgHtml = (downloadImgMode === 'none') ? '' : `<img src="${a.image || a.onlineImage}" class="print-mantra-grid-img" alt="${aTitle}" onerror="this.style.display='none';" />`;
                        return `
                        <div class="print-mantra-grid-card">
                            ${imgHtml}
                            <div class="print-mantra-grid-content">
                                <div class="print-mantra-grid-title">${downloadImgMode === 'none' ? '🕉️ ' : ''}${aTitle} (${isHinglish ? a.categoryEn : a.category})</div>
                                <div class="print-mantra-grid-mantra">॥ ${mLabel} ॥ ${aMantra}</div>
                                <div class="print-mantra-grid-about">🌺 ${aAbout}</div>
                            </div>
                        </div>`;
                    }).join('');

                    mHtml += `
                    <div class="print-page${isBoth ? ' is-bilingual' : ''}">
                        ${cornerCornersHtml}
                        <div class="print-page-header">
                            <span>${isHinglish ? "Sacred Dhyan Mantras" : (isChalisa ? "॥ श्री हनुमान व दुर्गा ध्यान मन्त्र एवं स्तुति ॥" : "॥ समस्त देवी-देवता ध्यान मन्त्र व माहात्म्य संग्रह ॥")}</span>
                            <span>${isHinglish ? `Part ${pIdx + 1} of ${numMantraPages}` : `भाग ${pIdx + 1}/${numMantraPages}`}</span>
                        </div>
                        <div class="print-mantra-grid">${cards}</div>
                        <div class="print-footer">
                            <span>${isHinglish ? `Page ${curP} of ${totalPages} | Dhyan Mantras & Glory` : `पृष्ठ ${curP} / ${totalPages} | ${isChalisa ? "ध्यान मन्त्र व स्तुति संग्रह" : "नित्य ध्यान मन्त्र व माहात्म्य संग्रह"}`}</span>
                        </div>
                    </div>`;
                }
                return mHtml;
            };

            // Layout Planning & Page Mapping
            let runningPageNum = 3; // Page 1: Cover, Page 2: TOC
            let aartiPageMap = [];
            let mantraStartPage = 0;
            let mantraEndPage = 0;
            const mantraPageCount = Math.ceil(aartisData.length / 4);

            if (targetLayout === 'mantras_start') {
                mantraStartPage = 3;
                mantraEndPage = 3 + mantraPageCount - 1;
                runningPageNum = mantraEndPage + 1;
            }

            if (targetLayout === 'detailed_2page') {
                aartiPageMap = aartisData.map(a => {
                    const lyricsPages = getAartiLyricsPages(a, targetLang);
                    const startPage = runningPageNum;
                    const numPages = 1 + lyricsPages.length;
                    const endPage = startPage + numPages - 1;
                    runningPageNum += numPages;
                    return {
                        id: a.id,
                        title: isHinglish ? a.englishTitle : a.title,
                        category: isHinglish ? a.categoryEn : a.category,
                        startPage: startPage,
                        endPage: endPage,
                        numPages: numPages,
                        lyricsPages: lyricsPages,
                        pageLabel: (startPage === endPage)
                            ? (isHinglish ? `Page ${startPage}` : `पृष्ठ ${startPage}`)
                            : (isHinglish ? `Pages ${startPage}-${endPage}` : `पृष्ठ ${startPage}-${endPage}`)
                    };
                });
            } else {
                // Multi-page supported for compact_2col, mantras_end, mantras_start (Paginate if verses exceed 2 columns!)
                aartiPageMap = aartisData.map(a => {
                    const chunks = getAartiCompactPages(a, targetLayout, targetLang);
                    const startPage = runningPageNum;
                    const numPages = chunks.length;
                    const endPage = startPage + numPages - 1;
                    runningPageNum += numPages;
                    return {
                        id: a.id,
                        title: isHinglish ? a.englishTitle : a.title,
                        category: isHinglish ? a.categoryEn : a.category,
                        startPage: startPage,
                        endPage: endPage,
                        numPages: numPages,
                        chunks: chunks,
                        pageLabel: (startPage === endPage)
                            ? (isHinglish ? `Page ${startPage}` : `पृष्ठ ${startPage}`)
                            : (isHinglish ? `Pages ${startPage}-${endPage}` : `पृष्ठ ${startPage}-${endPage}`)
                    };
                });
            }

            if (targetLayout === 'mantras_end') {
                mantraStartPage = runningPageNum;
                mantraEndPage = runningPageNum + mantraPageCount - 1;
                runningPageNum = mantraEndPage + 1;
            }

            const totalPrintPages = runningPageNum - 1;

            const pdfCoverTitle = isChalisa 
                ? (isHinglish ? "Shri Hanuman & Durga Chalisa Sangrah" : "श्री हनुमान व दुर्गा चालीसा संग्रह")
                : (isHinglish ? "Shri Sampoorna Aarti Sangrah" : "श्री सम्पूर्ण आरती संग्रह");
            const pdfCoverSubtitle = isChalisa
                ? (isHinglish ? "Sacred 40-Verse Hymns of Supreme Valor & Divine Grace" : "॥ संकटमोचन एवं जगदम्बा महाशक्ति स्तुति ग्रंथ ॥")
                : (isHinglish ? "Sacred Hindu Aarti Granth & Chants" : "॥ नित्य नियम भक्ति, पूजा एवं स्तुति ग्रंथ ॥");
            const pdfCoverDesc = isChalisa
                ? (isHinglish 
                    ? "Complete sacred collection of Shri Hanuman Chalisa and Shri Durga Chalisa with Authentic Dhyan Mantras, Dohas, 40 Chaupais, Significance, and Spiritual Meaning."
                    : "संकटमोचन श्री हनुमान जी एवं जगज्जननी माँ दुर्गा जी की सम्पूर्ण ४०-४० चौपाइयाँ, मंगलाचरण दोहा, ध्यान मन्त्र, माहात्म्य एवं भावार्थ सहित सचित्र वैदिक ग्रन्थ स्वरूप।")
                : (isHinglish 
                    ? "Complete sacred collection of 20 Divine Hindu Aartis with Authentic Dhyan Mantras, Significance, Spiritual Meaning and Aarti Verses."
                    : (isBoth 
                        ? "समस्त प्रमुख देवी-देवताओं की २० पावन आरतियाँ, ध्यान मन्त्र, माहात्म्य एवं भावार्थ सहित सचित्र ग्रन्थ स्वरूप (हिन्दी व हिंग्लिश दोनों में)।"
                        : "समस्त प्रमुख देवी-देवताओं की २० पावन आरतियाँ, ध्यान मन्त्र, माहात्म्य एवं भावार्थ सहित सचित्र वैदिक ग्रन्थ स्वरूप।"));
            const pdfTocTitle = isChalisa
                ? (isHinglish ? "Table of Contents" : "॥ चालीसा अनुक्रमणिका ॥")
                : (isHinglish ? "Table of Contents" : "॥ आरती अनुक्रमणिका ॥");
            const pdfTocSub = isChalisa
                ? (isHinglish ? "Sacred Chalisa Hymns" : "पावन चालीसा सूची")
                : (isHinglish ? "Complete List of 20 Sacred Aartis" : "समस्त २० पावन आरतियों की सूची");
            const pdfFooterBookName = isChalisa
                ? (isHinglish ? "Sacred Chalisa Sangrah" : "सम्पूर्ण चालीसा संग्रह")
                : (isHinglish ? "Sacred Aarti Sangrah" : "सम्पूर्ण आरती संग्रह");
            const pdfPageHeaderTitle = isChalisa
                ? (isHinglish ? "Sampoorna Chalisa Sangrah" : "॥ श्री सम्पूर्ण चालीसा संग्रह ॥")
                : (isHinglish ? "Sampoorna Aarti Sangrah" : "॥ श्री सम्पूर्ण आरती संग्रह ॥");

            // Generate Cover Page
            let printHtml = `
                <!-- Print Cover Page -->
                <div class="print-page print-cover-page">
                    ${cornerCornersHtml}
                    <div style="font-size: 48pt; color: #731308; margin-bottom: 6px;">ॐ</div>
                    <h1 style="font-size: 28pt; color: #731308; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; margin-bottom: 6px; font-weight: normal;">${pdfCoverTitle}</h1>
                    <h3 style="font-size: 13.5pt; color: #8c5806; font-family: 'Poppins', sans-serif; letter-spacing: 1px; margin-bottom: 18px; font-weight: normal;">${pdfCoverSubtitle}</h3>
                    <div style="width: 140px; height: 2px; background: #daa520; margin: 0 auto 18px auto;"></div>
                    <p style="font-size: 12.5pt; max-width: 520px; margin: 0 auto; line-height: 1.7; color: #2e1208; font-weight: normal;">
                        ${pdfCoverDesc}
                    </p>
                    <div style="margin-top: 36px; font-size: 10.5pt; color: #8c5806; font-family: 'Poppins', var(--font-devanagari); font-weight: normal;">
                        ${new Date().toLocaleDateString()} | ॐ शान्तिः शान्तिः शान्तिः | इति शुभम्
                    </div>
                </div>

                <!-- Print Table of Contents -->
                <div class="print-page">
                    ${cornerCornersHtml}
                    <div class="print-page-header">
                        <span>${pdfTocTitle}</span>
                        <span>${pdfTocSub}</span>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 10pt; line-height: 1.5; margin-top: 4px;">
                        ${targetLayout === 'mantras_start' ? `
                        <tr style="border-bottom: 1.5px solid rgba(184, 134, 11, 0.6); background: rgba(253, 243, 214, 0.4);">
                            <td style="padding: 4px 0; font-weight: normal; color: #731308; font-size: 10.5pt;">🕉️ ${isHinglish ? "Sacred Dhyan Mantras & Phala Sangrah" : "समस्त देवी-देवता ध्यान मन्त्र व माहात्म्य संग्रह"}</td>
                            <td style="padding: 4px 8px; color: #8c5806; font-size: 9pt;">${isHinglish ? "Vedic Mantras" : "वैदिक मन्त्र"}</td>
                            <td style="padding: 4px 0; text-align: right; color: #731308; font-weight: normal; font-size: 10pt;">${isHinglish ? `Pages ${mantraStartPage}-${mantraEndPage}` : `पृष्ठ ${mantraStartPage}-${mantraEndPage}`}</td>
                        </tr>
                        ` : ''}
                        ${aartisData.map((a, i) => {
                            const pInfo = aartiPageMap[i];
                            return `
                            <tr style="border-bottom: 1px dotted rgba(184, 134, 11, 0.4);">
                                <td style="padding: 3.5px 0; font-weight: normal; color: #1a0502; font-size: 10.5pt;">${i + 1}. ${isHinglish ? a.englishTitle : a.title}</td>
                                <td style="padding: 3.5px 8px; color: #8c5806; font-size: 9pt; font-family: var(--font-sans);">${isHinglish ? a.categoryEn : a.category}</td>
                                <td style="padding: 3.5px 0; text-align: right; color: #731308; font-weight: normal; font-size: 10pt;">${pInfo.pageLabel}</td>
                            </tr>
                            `;
                        }).join('')}
                        ${targetLayout === 'mantras_end' ? `
                        <tr style="border-top: 1.5px solid rgba(184, 134, 11, 0.6); background: rgba(253, 243, 214, 0.4);">
                            <td style="padding: 4px 0; font-weight: normal; color: #731308; font-size: 10.5pt;">🕉️ ${isHinglish ? "Sacred Dhyan Mantras & Phala Sangrah" : "समस्त देवी-देवता ध्यान मन्त्र व माहात्म्य संग्रह"}</td>
                            <td style="padding: 4px 8px; color: #8c5806; font-size: 9pt;">${isHinglish ? "Vedic Mantras" : "वैदिक मन्त्र"}</td>
                            <td style="padding: 4px 0; text-align: right; color: #731308; font-weight: normal; font-size: 10pt;">${isHinglish ? `Pages ${mantraStartPage}-${mantraEndPage}` : `पृष्ठ ${mantraStartPage}-${mantraEndPage}`}</td>
                        </tr>
                        ` : ''}
                    </table>
                    <div class="print-footer">
                        <span>${isHinglish ? `Page 2 of ${totalPrintPages} | ${pdfFooterBookName}` : `पृष्ठ २ / ${totalPrintPages} | ${pdfFooterBookName}`}</span>
                    </div>
                </div>
            `;

            // If Mantras at Start
            if (targetLayout === 'mantras_start') {
                printHtml += generateMantraPagesHtml(mantraStartPage, totalPrintPages);
            }

            // Dynamic Column Decision: Use 2 columns ONLY when verses in chunk would otherwise exceed, else keep grand 1 column
            const shouldUseTwoColumns = (versesOrAarti, layout) => {
                const verses = Array.isArray(versesOrAarti) ? versesOrAarti : (versesOrAarti.verses || []);
                const lineCount = verses.reduce((sum, v) => {
                    const hL = v.hi ? v.hi.split('\n').filter(Boolean).length : 0;
                    const eL = v.en ? v.en.split('\n').filter(Boolean).length : 0;
                    return sum + (isBoth ? (hL + eL) : (isHinglish ? eL : hL));
                }, 0);
                const verseCount = verses.length;

                if (layout === 'compact_2col') {
                    // Fits in 1 column up to 16 lines and <= 6 verses in single language
                    // In bilingual (both), fits up to 14 total lines (or <= 4 verses)
                    return isBoth ? (lineCount > 14 || verseCount > 4) : (lineCount > 16 || verseCount > 6);
                } else if (layout === 'mantras_start' || layout === 'mantras_end') {
                    // With dedicated mantra section, Aarti page has more space: fits up to 20 lines in 1 column
                    return isBoth ? (lineCount > 18 || verseCount > 5) : (lineCount > 20 || verseCount > 7);
                }
                return false;
            };

            // Large Transparent Deity Watermark Helper
            const getWatermarkHtml = (aarti) => {
                if (downloadImgMode === 'none') return '';
                const imgSrc = aarti.image || aarti.onlineImage;
                if (!imgSrc) return '';
                return `
                    <div class="print-watermark-container">
                        <img src="${imgSrc}" class="print-watermark-img" alt="" onerror="this.parentElement.style.display='none';" />
                    </div>
                `;
            };

            // Generate Aarti Pages
            aartisData.forEach((a, i) => {
                const title = isHinglish ? a.englishTitle : a.title;
                const subtitle = isHinglish ? a.title : a.englishTitle;
                const mantra = isHinglish ? a.mantraEn : (isBoth ? `${a.mantra}<div style="margin-top:2px;font-style:italic;color:#5a2608;font-size:10.5pt;font-family:var(--font-sans);">${a.mantraEn}</div>` : a.mantra);
                const about = isHinglish ? a.aboutEn : a.about;
                const bhavarth = isHinglish ? a.bhavarthEn : a.bhavarth;
                const pInfo = aartiPageMap[i];
                const isChalisaDeity = isChalisaItem(a);
                const chalisaParts = isChalisaDeity ? parseChalisaStructure(a) : null;

                if (targetLayout === 'compact_2col') {
                    // Multi-page chunks: 1 page for single-page items, 2+ pages for longer items (e.g. Chalisa)
                    pInfo.chunks.forEach((chunk, pageIndex) => {
                        const curPageNum = pInfo.startPage + pageIndex;
                        const isFirstPage = (pageIndex === 0);
                        const isLastPage = (pageIndex === pInfo.chunks.length - 1);
                        const partSuffix = pInfo.chunks.length > 1
                            ? (isHinglish ? ` (Part ${pageIndex + 1} of ${pInfo.chunks.length})` : ` (भाग ${pageIndex + 1}/${pInfo.chunks.length})`)
                            : '';
                        const globalStartIndex = a.verses.indexOf(chunk[0]);
                        const versesHtml = chunk.map((v, idx) => formatVerse(v, globalStartIndex + idx)).join('');
                        const useTwoCol = shouldUseTwoColumns(chunk, 'compact_2col');

                        const concludingSectionHtml = isLastPage ? (isChalisaDeity ? `
                            <div class="print-compact-doha-box print-closing-doha">
                                <span class="print-compact-doha-badge">${isHinglish ? "|| Concluding Doha ||" : "॥ समापन दोहा ॥"}</span>
                                <div class="print-compact-doha-text">${formatChalisaDohas(chalisaParts.closingDoha, targetLang)}</div>
                            </div>
                        ` : getSamarpanHtml()) : '';

                        if (isFirstPage) {
                            const page1TopBannerHtml = isChalisaDeity ? `
                                <div class="print-compact-doha-box">
                                    <span class="print-compact-doha-badge">${isHinglish ? "|| Mangalacharan Doha ||" : "॥ मंगलाचरण दोहा ॥"}</span>
                                    <div class="print-compact-doha-text">${formatChalisaDohas(chalisaParts.openingDohas, targetLang)}</div>
                                </div>
                            ` : `
                                <div class="print-compact-mantra-box">
                                    <div class="print-compact-mantra-label">॥ ${isHinglish ? a.mantraLabelEn : a.mantraLabel} ॥</div>
                                    <div class="print-compact-mantra-text">${mantra}</div>
                                </div>

                                <div class="print-compact-info-strip">
                                    <span style="color: #731308; font-weight: normal;">${isHinglish ? "🌺 Significance & Phala: " : "🌺 माहात्म्य व फलश्रुति: "}</span>
                                    <span>${about}</span>
                                </div>
                            `;

                            printHtml += `
                                <div class="print-page${isBoth ? ' is-bilingual' : ''}">
                                    ${cornerCornersHtml}
                                    ${getWatermarkHtml(a)}

                                    <div class="print-page-header">
                                        <span>${isHinglish ? a.categoryEn : a.category}</span>
                                        <span>${pdfPageHeaderTitle}</span>
                                    </div>

                                    <div class="print-compact-header">
                                        ${downloadImgMode === 'none' ? '' : `<img src="${a.image || a.onlineImage}" class="print-compact-deity-img" alt="${title}" onerror="this.style.display='none';" />`}
                                        <div class="print-compact-titles" ${downloadImgMode === 'none' ? 'style="text-align: center; width: 100%;"' : ''}>
                                            <div class="print-compact-title">${downloadImgMode === 'none' ? '🕉️ ' : ''}${title}${pInfo.chunks.length > 1 ? (isHinglish ? ` (Part 1/${pInfo.chunks.length})` : ` (भाग १/${pInfo.chunks.length})`) : ''}</div>
                                            <div class="print-compact-subtitle">${subtitle}</div>
                                        </div>
                                    </div>

                                    ${page1TopBannerHtml}

                                    <div class="${useTwoCol ? 'print-lyrics-two-col' : 'print-lyrics-container'}">
                                        ${versesHtml}
                                    </div>

                                    ${concludingSectionHtml}

                                    <div class="print-footer">
                                        <span>${isHinglish 
                                            ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                            : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}</span>
                                    </div>
                                </div>
                            `;
                        } else {
                            // Subsequent Pages (Page 2+) for long items like Chalisa
                            printHtml += `
                                <div class="print-page${isBoth ? ' is-bilingual' : ''}">
                                    ${cornerCornersHtml}
                                    ${getWatermarkHtml(a)}

                                    <div class="print-page-header">
                                        <span>${isHinglish ? "|| Shri Hari Sharanam ||" : "॥ श्रीहरिः शरणम् ॥"}</span>
                                        <span>${isHinglish ? (isChalisa ? `Chalisa Verses${partSuffix}` : `Aarti Verses${partSuffix}`) : (isChalisa ? `चालीसा पद${partSuffix}` : `आरती पद${partSuffix}`)}</span>
                                    </div>

                                    <div class="print-compact-header" style="justify-content: center; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1.5px solid rgba(184, 134, 11, 0.4);">
                                        <div class="print-compact-titles" style="text-align: center; width: 100%;">
                                            <div class="print-compact-title" style="font-size: 15pt;">🕉️ ${title} ${isHinglish ? `(Continued - Part ${pageIndex + 1} of ${pInfo.chunks.length})` : `(क्रमशः - भाग ${pageIndex + 1}/${pInfo.chunks.length})`}</div>
                                            <div class="print-compact-subtitle">${subtitle}</div>
                                        </div>
                                    </div>

                                    <div class="${useTwoCol ? 'print-lyrics-two-col' : 'print-lyrics-container'}">
                                        ${versesHtml}
                                    </div>

                                    ${concludingSectionHtml}

                                    <div class="print-footer">
                                        <span>${isHinglish 
                                            ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                            : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}</span>
                                    </div>
                                </div>
                            `;
                        }
                    });
                } else if (targetLayout === 'mantras_start' || targetLayout === 'mantras_end') {
                    // Pure Chanting Page with Dynamic 1 or 2 Columns and Multi-Page Support
                    pInfo.chunks.forEach((chunk, pageIndex) => {
                        const curPageNum = pInfo.startPage + pageIndex;
                        const isFirstPage = (pageIndex === 0);
                        const isLastPage = (pageIndex === pInfo.chunks.length - 1);
                        const partSuffix = pInfo.chunks.length > 1
                            ? (isHinglish ? ` (Part ${pageIndex + 1} of ${pInfo.chunks.length})` : ` (भाग ${pageIndex + 1}/${pInfo.chunks.length})`)
                            : '';
                        const globalStartIndex = a.verses.indexOf(chunk[0]);
                        const versesHtml = chunk.map((v, idx) => formatVerse(v, globalStartIndex + idx)).join('');
                        const useTwoCol = shouldUseTwoColumns(chunk, targetLayout);

                        const concludingSectionHtml = isLastPage ? (isChalisaDeity ? `
                            <div class="print-compact-doha-box print-closing-doha">
                                <span class="print-compact-doha-badge">${isHinglish ? "|| Concluding Doha ||" : "॥ समापन दोहा ॥"}</span>
                                <div class="print-compact-doha-text">${formatChalisaDohas(chalisaParts.closingDoha, targetLang)}</div>
                            </div>
                        ` : getSamarpanHtml()) : '';

                        const page1ChalisaDohaBanner = (isFirstPage && isChalisaDeity) ? `
                            <div class="print-compact-doha-box">
                                <span class="print-compact-doha-badge">${isHinglish ? "|| Mangalacharan Doha ||" : "॥ मंगलाचरण दोहा ॥"}</span>
                                <div class="print-compact-doha-text">${formatChalisaDohas(chalisaParts.openingDohas, targetLang)}</div>
                            </div>
                        ` : '';

                        if (isFirstPage) {
                            printHtml += `
                                <div class="print-page${isBoth ? ' is-bilingual' : ''}">
                                    ${cornerCornersHtml}
                                    ${getWatermarkHtml(a)}

                                    <div class="print-page-header">
                                        <span>${isHinglish ? a.categoryEn : a.category}</span>
                                        <span>${isHinglish ? (isChalisa ? "Chalisa Sangrah" : "Aarti Sangrah") : "॥ श्रीहरिः शरणम् ॥"}</span>
                                    </div>

                                    <div class="print-compact-header">
                                        ${downloadImgMode === 'none' ? '' : `<img src="${a.image || a.onlineImage}" class="print-compact-deity-img" alt="${title}" onerror="this.style.display='none';" />`}
                                        <div class="print-compact-titles" ${downloadImgMode === 'none' ? 'style="text-align: center; width: 100%;"' : ''}>
                                            <div class="print-compact-title">${downloadImgMode === 'none' ? '🕉️ ' : ''}${title}${pInfo.chunks.length > 1 ? (isHinglish ? ` (Part 1/${pInfo.chunks.length})` : ` (भाग १/${pInfo.chunks.length})`) : ''}</div>
                                            <div class="print-compact-subtitle">${subtitle}</div>
                                        </div>
                                    </div>

                                    ${page1ChalisaDohaBanner}

                                    <div class="${useTwoCol ? 'print-lyrics-two-col' : 'print-lyrics-container'}">
                                        ${versesHtml}
                                    </div>

                                    ${concludingSectionHtml}

                                    <div class="print-footer">
                                        <span>${isHinglish 
                                            ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                            : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}</span>
                                    </div>
                                </div>
                            `;
                        } else {
                            // Subsequent Pages (Page 2+) for long items
                            printHtml += `
                                <div class="print-page${isBoth ? ' is-bilingual' : ''}">
                                    ${cornerCornersHtml}
                                    ${getWatermarkHtml(a)}

                                    <div class="print-page-header">
                                        <span>${isHinglish ? "|| Shri Hari Sharanam ||" : "॥ श्रीहरिः शरणम् ॥"}</span>
                                        <span>${isHinglish ? (isChalisa ? `Chalisa Verses${partSuffix}` : `Aarti Verses${partSuffix}`) : (isChalisa ? `चालीसा पद${partSuffix}` : `आरती पद${partSuffix}`)}</span>
                                    </div>

                                    <div class="print-compact-header" style="justify-content: center; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1.5px solid rgba(184, 134, 11, 0.4);">
                                        <div class="print-compact-titles" style="text-align: center; width: 100%;">
                                            <div class="print-compact-title" style="font-size: 15pt;">🕉️ ${title} ${isHinglish ? `(Continued - Part ${pageIndex + 1} of ${pInfo.chunks.length})` : `(क्रमशः - भाग ${pageIndex + 1}/${pInfo.chunks.length})`}</div>
                                            <div class="print-compact-subtitle">${subtitle}</div>
                                        </div>
                                    </div>

                                    <div class="${useTwoCol ? 'print-lyrics-two-col' : 'print-lyrics-container'}">
                                        ${versesHtml}
                                    </div>

                                    ${concludingSectionHtml}

                                    <div class="print-footer">
                                        <span>${isHinglish 
                                            ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                            : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}</span>
                                    </div>
                                </div>
                            `;
                        }
                    });
                } else {
                    // Detailed 2-Page Granth Layout
                    printHtml += `
                        <div class="print-page${isBoth ? ' is-bilingual' : ''}">
                            ${cornerCornersHtml}
                            ${getWatermarkHtml(a)}
                            <div class="print-page-header">
                                <span>${isHinglish ? a.categoryEn : a.category}</span>
                                <span>${pdfPageHeaderTitle}</span>
                            </div>
                            <div class="print-deity-hero">
                                ${downloadImgMode === 'none' ? '' : `<img src="${a.image || a.onlineImage}" class="print-deity-img" alt="${title}" onerror="this.style.display='none';" />`}
                                <div class="print-aarti-title">${downloadImgMode === 'none' ? '🕉️ ' : ''}${title}</div>
                                <div class="print-aarti-subtitle">${subtitle}</div>
                            </div>
                            <div class="print-mantra-box">
                                <div class="print-mantra-label">॥ ${isHinglish ? a.mantraLabelEn : a.mantraLabel} ॥</div>
                                <div class="print-mantra-text">${mantra}</div>
                            </div>
                            <div class="print-info-card">
                                <span style="color: #731308; font-weight: normal;">${isHinglish ? "🌺 Significance & Phala: " : "🌺 माहात्म्य एवं फलश्रुति: "}</span>
                                <span>${about}</span>
                            </div>
                            <div class="print-bhavarth-card">
                                <span style="color: #731308; font-weight: normal;">${isHinglish ? "✨ Spiritual Meaning & Glory: " : "✨ भावार्थ एवं आध्यात्मिक संदेश: "}</span>
                                <span>${bhavarth}</span>
                            </div>
                            <div class="print-footer">
                                <span>${isHinglish ? `Page ${pInfo.startPage} of ${totalPrintPages} | Om Tat Sat` : `ॐ तत्सत् | पृष्ठ ${pInfo.startPage} / ${totalPrintPages}`}</span>
                            </div>
                        </div>
                    `;

                    pInfo.lyricsPages.forEach((chunk, pageIndex) => {
                        const curPageNum = pInfo.startPage + 1 + pageIndex;
                        const isLastPage = (pageIndex === pInfo.lyricsPages.length - 1);
                        const partSuffix = pInfo.lyricsPages.length > 1 
                            ? (isHinglish ? ` (Part ${pageIndex + 1} of ${pInfo.lyricsPages.length})` : ` (भाग ${pageIndex + 1}/${pInfo.lyricsPages.length})`) 
                            : '';
                        const globalStartIndex = a.verses.indexOf(chunk[0]);
                        const versesHtml = chunk.map((v, idx) => formatVerse(v, globalStartIndex + idx)).join('');

                        const concludingSectionHtml = isLastPage ? (isChalisaDeity ? `
                            <div class="print-compact-doha-box print-closing-doha">
                                <span class="print-compact-doha-badge">${isHinglish ? "|| Concluding Doha ||" : "॥ समापन दोहा ॥"}</span>
                                <div class="print-compact-doha-text">${formatChalisaDohas(chalisaParts.closingDoha, targetLang)}</div>
                            </div>
                        ` : getSamarpanHtml()) : '';

                        const page1ChalisaDohaBanner = (pageIndex === 0 && isChalisaDeity) ? `
                            <div class="print-compact-doha-box">
                                <span class="print-compact-doha-badge">${isHinglish ? "|| Mangalacharan Doha ||" : "॥ मंगलाचरण दोहा ॥"}</span>
                                <div class="print-compact-doha-text">${formatChalisaDohas(chalisaParts.openingDohas, targetLang)}</div>
                            </div>
                        ` : '';

                        printHtml += `
                            <div class="print-page${isBoth ? ' is-bilingual' : ''}">
                                ${cornerCornersHtml}
                                ${getWatermarkHtml(a)}
                                <div class="print-page-header">
                                    <span>${isHinglish ? "|| Shri Hari Sharanam ||" : "॥ श्रीहरिः शरणम् ॥"}</span>
                                    <span>${isHinglish ? (isChalisa ? `Chalisa Verses${partSuffix}` : `Aarti Verses${partSuffix}`) : (isChalisa ? `चालीसा पद${partSuffix}` : `आरती पद${partSuffix}`)}</span>
                                </div>
                                <div class="print-lyrics-page-header">
                                    <div class="print-lyrics-title">${title}${partSuffix}</div>
                                    <svg style="width: 80px; height: 10px; margin: 0 auto; display: block;" viewBox="0 0 100 12" preserveAspectRatio="none">
                                        <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="#daa520" stroke-width="1.8"/>
                                        <circle cx="50" cy="6" r="3.5" fill="#731308"/>
                                    </svg>
                                </div>
                                ${page1ChalisaDohaBanner}
                                <div class="print-lyrics-container">
                                    ${versesHtml}
                                </div>
                                ${concludingSectionHtml}
                                <div class="print-footer">
                                    <span>${isHinglish 
                                        ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix}` 
                                        : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}</span>
                                </div>
                            </div>
                        `;
                    });
                }
            });

            // If Mantras at End
            if (targetLayout === 'mantras_end') {
                printHtml += generateMantraPagesHtml(mantraStartPage, totalPrintPages);
            }

            printable.innerHTML = printHtml;

            // Wait 250ms for images and fonts to settle, then open print dialog cleanly
            setTimeout(() => {
                window.print();
            }, 250);
        }

        // 2. Download Standalone Offline HTML File (Self-Contained Portable Edition)
        async function downloadStandaloneHTML() {
            closeDownloadModal();
            const isChalisa = isChalisaBook();
            const targetLang = downloadLang || currentLang || 'hi';
            showNotification(targetLang === 'hinglish' 
                ? (isChalisa ? "Generating offline Chalisa HTML..." : "Generating offline standalone HTML...") 
                : (isChalisa ? "सम्पूर्ण चालीसा ऑफ़लाइन HTML तैयार हो रही है..." : "संपूर्ण ऑफ़लाइन HTML तैयार हो रही है..."));

            let cssContent = '';
            try {
                const res = await fetch('style.css');
                if (res.ok) cssContent = await res.text();
            } catch (e) {}

            if (!cssContent) {
                try {
                    for (let s of document.styleSheets) {
                        try {
                            for (let r of s.cssRules) {
                                cssContent += r.cssText + '\n';
                            }
                        } catch (err) {}
                    }
                } catch (e) {}
            }

            let dataContent = '';
            try {
                const dataFile = isChalisa ? 'chalisa-data.js' : 'aartis-data.js';
                const res = await fetch(dataFile);
                if (res.ok) dataContent = await res.text();
            } catch (e) {}
            if (!dataContent && typeof aartisData !== 'undefined') {
                dataContent = 'const aartisData = ' + JSON.stringify(aartisData, null, 2) + ';\n';
            }

            let scriptContent = '';
            try {
                const res = await fetch('script.js');
                if (res.ok) scriptContent = await res.text();
            } catch (e) {}

            // Set the target download language in the bundled script
            if (scriptContent) {
                const langStorageKey = getStorageKey('lang');
                scriptContent = `localStorage.setItem('${langStorageKey}', '${targetLang}');\n` + scriptContent;
            }

            // Create clean standalone document clone
            const clone = document.documentElement.cloneNode(true);
            
            // Remove external stylesheet link to style.css and external scripts
            clone.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
                const href = l.getAttribute('href') || '';
                if (href.includes('style.css')) l.remove();
            });
            clone.querySelectorAll('script[src]').forEach(s => s.remove());

            // Append inline style
            if (cssContent) {
                const styleEl = document.createElement('style');
                styleEl.textContent = cssContent;
                clone.querySelector('head').appendChild(styleEl);
            }

            // Append inline scripts
            if (dataContent) {
                const dataEl = document.createElement('script');
                dataEl.textContent = dataContent;
                clone.querySelector('body').appendChild(dataEl);
            }
            if (scriptContent) {
                const scriptEl = document.createElement('script');
                scriptEl.textContent = scriptContent;
                clone.querySelector('body').appendChild(scriptEl);
            }

            const htmlDoc = '<!DOCTYPE html>\n' + clone.outerHTML;
            const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = isChalisa 
                ? `Sampoorna-Chalisa-Sangrah-${targetLang}.html`
                : `Sampoorna-Aarti-Sangrah-${targetLang}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showNotification(targetLang === 'hinglish' 
                ? (isChalisa ? "Offline Chalisa HTML Downloaded!" : "Offline Standalone HTML Downloaded!") 
                : (isChalisa ? "सम्पूर्ण चालीसा ऑफ़लाइन HTML फ़ाइल डाउनलोड हो गई!" : "संपूर्ण ऑफ़लाइन HTML फ़ाइल डाउनलोड हो गई!"));
        }

        // 3. Download as Formatted Microsoft Word Document (.doc) with all PDF presets & images
        async function downloadAsWord() {
            closeDownloadModal();
            const isChalisa = isChalisaBook();
            const targetLang = downloadLang || currentLang || 'hi';
            const targetLayout = downloadLayout || 'compact_2col';
            const targetImgMode = downloadImgMode || 'compact';

            const isHinglish = targetLang === 'hinglish';
            const isBoth = targetLang === 'both';

            showNotification(isHinglish 
                ? "Preparing Microsoft Word Document..." 
                : "वर्ड ग्रन्थ (.doc) तैयार किया जा रहा है...");

            // Helpers for reliable image tags in Word (Direct HTTPS / local URLs with explicit dimensions)
            const getDeityImgTag = (a, size = 42) => {
                if (targetImgMode === 'none') {
                    return `<span style="font-size: 16pt; margin-right: 6pt;">🕉️</span>`;
                }
                const imgSrc = a.onlineImage || a.image;
                if (!imgSrc) {
                    return `<span style="font-size: 16pt; margin-right: 6pt;">🕉️</span>`;
                }
                return `<img src="${imgSrc}" width="${size}" height="${size}" alt="${isHinglish ? a.englishTitle : a.title}" style="width: ${size}pt; height: ${size}pt; border-radius: 50%; border: 1.5pt solid #b8860b; vertical-align: middle; margin-right: 8pt; display: inline-block;" />`;
            };

            const getDeityHeroImgTag = (a) => {
                if (targetImgMode === 'none') {
                    return `<div style="font-size: 32pt; margin-bottom: 6pt; text-align: center;">🕉️</div>`;
                }
                const imgSrc = a.onlineImage || a.image;
                if (!imgSrc) {
                    return `<div style="font-size: 32pt; margin-bottom: 6pt; text-align: center;">🕉️</div>`;
                }
                return `<img src="${imgSrc}" width="110" height="110" alt="${isHinglish ? a.englishTitle : a.title}" style="width: 110pt; height: 110pt; border-radius: 8pt; border: 2pt solid #d4af37; display: block; margin: 0 auto 8pt auto;" />`;
            };

            // Standard Word Page Break (No trailing breaks, no section artifacts)
            const pageBreak = '<br clear="all" style="page-break-before: always; mso-special-character: line-break;" />\n';

            // Dynamic Column Decision for Word (Matches PDF calculation)
            const shouldUseTwoColumns = (versesOrAarti, layout) => {
                const verses = Array.isArray(versesOrAarti) ? versesOrAarti : (versesOrAarti.verses || []);
                const lineCount = verses.reduce((sum, v) => {
                    const hL = v.hi ? v.hi.split('\n').filter(Boolean).length : 0;
                    const eL = v.en ? v.en.split('\n').filter(Boolean).length : 0;
                    return sum + (isBoth ? (hL + eL) : (isHinglish ? eL : hL));
                }, 0);
                const verseCount = verses.length;

                if (layout === 'compact_2col') {
                    return isBoth ? (lineCount > 14 || verseCount > 4) : (lineCount > 16 || verseCount > 6);
                } else if (layout === 'mantras_start' || layout === 'mantras_end') {
                    return isBoth ? (lineCount > 18 || verseCount > 5) : (lineCount > 20 || verseCount > 7);
                }
                return false;
            };

            // Layout Planning & Page Mapping for Word
            let runningPageNum = 3; // Page 1: Cover, Page 2: TOC
            let aartiPageMap = [];
            let mantraStartPage = 0;
            let mantraEndPage = 0;
            const mantraPageCount = Math.ceil(aartisData.length / 4);

            if (targetLayout === 'mantras_start') {
                mantraStartPage = 3;
                mantraEndPage = 3 + mantraPageCount - 1;
                runningPageNum = mantraEndPage + 1;
            }

            if (targetLayout === 'detailed_2page') {
                aartiPageMap = aartisData.map(a => {
                    const lyricsPages = getAartiLyricsPages(a, targetLang);
                    const startPage = runningPageNum;
                    const numPages = 1 + lyricsPages.length;
                    const endPage = startPage + numPages - 1;
                    runningPageNum += numPages;
                    return {
                        id: a.id,
                        title: isHinglish ? a.englishTitle : a.title,
                        category: isHinglish ? a.categoryEn : a.category,
                        startPage: startPage,
                        endPage: endPage,
                        numPages: numPages,
                        lyricsPages: lyricsPages,
                        pageLabel: (startPage === endPage)
                            ? (isHinglish ? `Page ${startPage}` : `पृष्ठ ${startPage}`)
                            : (isHinglish ? `Pages ${startPage}-${endPage}` : `पृष्ठ ${startPage}-${endPage}`)
                    };
                });
            } else {
                aartiPageMap = aartisData.map(a => {
                    const chunks = getAartiCompactPages(a, targetLayout, targetLang);
                    const startPage = runningPageNum;
                    const numPages = chunks.length;
                    const endPage = startPage + numPages - 1;
                    runningPageNum += numPages;
                    return {
                        id: a.id,
                        title: isHinglish ? a.englishTitle : a.title,
                        category: isHinglish ? a.categoryEn : a.category,
                        startPage: startPage,
                        endPage: endPage,
                        numPages: numPages,
                        chunks: chunks,
                        pageLabel: (startPage === endPage)
                            ? (isHinglish ? `Page ${startPage}` : `पृष्ठ ${startPage}`)
                            : (isHinglish ? `Pages ${startPage}-${endPage}` : `पृष्ठ ${startPage}-${endPage}`)
                    };
                });
            }

            if (targetLayout === 'mantras_end') {
                mantraStartPage = runningPageNum;
                mantraEndPage = runningPageNum + mantraPageCount - 1;
                runningPageNum = mantraEndPage + 1;
            }

            const totalPrintPages = runningPageNum - 1;

            // Verse Formatter for Word
            const formatWordVerse = (v, idx) => {
                const isDoha = (v.hi && (v.hi.includes('दोहा') || v.hi.includes('Doha'))) || (v.en && v.en.includes('Doha'));
                const isChorus = !isDoha && (idx === 0 || (v.hi && v.hi.includes('जय')) || (v.en && v.en.toLowerCase().includes('jaya')));

                const hiText = v.hi ? v.hi.replace(/\n/g, '<br/>') : '';
                const enText = v.en ? v.en.replace(/\n/g, '<br/>') : '';

                let content = '';
                if (isBoth) {
                    content = `<div style="color: #1a0502; font-size: ${isDoha ? '10.5pt' : (isChorus ? '10pt' : '9.5pt')}; font-weight: normal; font-family: 'Noto Serif Devanagari', 'Mangal', serif; line-height: 1.25; mso-para-margin: 0pt;">${hiText}</div>
                               <div style="color: #6a4220; font-style: italic; font-size: 8.5pt; margin-top: 1.5pt; font-family: 'Poppins', sans-serif; font-weight: normal; line-height: 1.2; mso-para-margin: 0pt;">${enText}</div>`;
                } else if (isHinglish) {
                    content = `<div style="color: #1a0502; font-size: ${isDoha ? '11pt' : (isChorus ? '10.5pt' : '10pt')}; font-style: italic; font-family: 'Poppins', sans-serif; font-weight: normal; line-height: 1.25; mso-para-margin: 0pt;">${enText}</div>`;
                } else {
                    content = `<div style="color: #1a0502; font-size: ${isDoha ? '11pt' : (isChorus ? '10.5pt' : '10pt')}; font-weight: normal; font-family: 'Noto Serif Devanagari', 'Mangal', serif; line-height: 1.25; mso-para-margin: 0pt;">${hiText}</div>`;
                }

                if (isDoha) {
                    return `
                        <div class="word-doha-box">
                            <div style="font-size: 8.5pt; color: #731308; font-weight: normal; margin-bottom: 2pt; font-family: sans-serif; mso-para-margin: 0pt;">॥ दोहा (Couplet) ॥</div>
                            ${content}
                        </div>
                    `;
                }

                const verseNumLabel = isChalisa 
                    ? ''
                    : (isHinglish ? (isChorus ? "[Mukhda / Chorus]" : `[Verse ${idx + 1}]`) : (isChorus ? "[मुखड़ा / ध्रुवपद]" : `[पद ${idx + 1}]`));

                return `
                    <div class="word-verse-item">
                        ${verseNumLabel ? `<div style="font-size: 7.5pt; color: #8c5806; font-weight: normal; font-family: sans-serif; margin-bottom: 1pt; mso-para-margin: 0pt;">${verseNumLabel}</div>` : ''}
                        ${content}
                    </div>
                `;
            };

            const getWordSamarpanHtml = () => `
                <div class="word-samarpan-box">
                    <div style="font-size: 8.5pt; color: #731308; font-weight: normal; margin-bottom: 2pt; mso-para-margin: 0pt;">
                        ${isHinglish ? "|| Mangal Samarpan & Prarthana ||" : "॥ पूजा समर्पण एवं मंगल प्रार्थना ॥"}
                    </div>
                    <div style="font-size: 9.5pt; color: #1a0502; font-style: italic; font-weight: normal; line-height: 1.3; mso-para-margin: 0pt;">
                        ${isHinglish 
                            ? "Twameva Mata Cha Pita Twameva, Twameva Bandhushcha Sakha Twameva | Twameva Vidya Dravinam Twameva, Twameva Sarvam Mama Deva Deva ||"
                            : "त्वमेव माता च पिता त्वमेव, त्वमेव बन्धुश्च सखा त्वमेव। त्वमेव विद्या द्रविणं त्वमेव, त्वमेव सर्वं मम देव देव॥"
                        }
                    </div>
                </div>
            `;

            const pdfCoverTitle = isChalisa 
                ? (isHinglish ? "Shri Hanuman & Durga Chalisa Sangrah" : "श्री हनुमान व दुर्गा चालीसा संग्रह")
                : (isHinglish ? "Shri Sampoorna Aarti Sangrah" : "श्री सम्पूर्ण आरती संग्रह");
            const pdfCoverSubtitle = isChalisa
                ? (isHinglish ? "Sacred 40-Verse Hymns of Supreme Valor & Divine Grace" : "॥ संकटमोचन एवं जगदम्बा महाशक्ति स्तुति ग्रंथ ॥")
                : (isHinglish ? "Sacred Hindu Aarti Granth & Chants" : "॥ नित्य नियम भक्ति, पूजा एवं स्तुति ग्रंथ ॥");
            const pdfCoverDesc = isChalisa
                ? (isHinglish 
                    ? "Complete sacred collection of Shri Hanuman Chalisa and Shri Durga Chalisa with Authentic Dhyan Mantras, Dohas, 40 Chaupais, Significance, and Spiritual Meaning."
                    : "संकटमोचन श्री हनुमान जी एवं जगज्जननी माँ दुर्गा जी की सम्पूर्ण ४०-४० चौपाइयाँ, मंगलाचरण दोहा, ध्यान मन्त्र, माहात्म्य एवं भावार्थ सहित सचित्र वैदिक ग्रन्थ स्वरूप।")
                : (isHinglish 
                    ? "Complete sacred collection of 20 Divine Hindu Aartis with Authentic Dhyan Mantras, Significance, Spiritual Meaning and Aarti Verses."
                    : (isBoth 
                        ? "समस्त प्रमुख देवी-देवताओं की २० पावन आरतियाँ, ध्यान मन्त्र, माहात्म्य एवं भावार्थ सहित सचित्र ग्रन्थ स्वरूप (हिन्दी व हिंग्लिश दोनों में)।"
                        : "समस्त प्रमुख देवी-देवताओं की २० पावन आरतियाँ, ध्यान मन्त्र, माहात्म्य एवं भावार्थ सहित सचित्र वैदिक ग्रन्थ स्वरूप।"));
            const pdfTocTitle = isChalisa
                ? (isHinglish ? "Table of Contents" : "॥ चालीसा अनुक्रमणिका ॥")
                : (isHinglish ? "Table of Contents" : "॥ आरती अनुक्रमणिका ॥");
            const pdfTocSub = isChalisa
                ? (isHinglish ? "Sacred Chalisa Hymns" : "पावन चालीसा सूची")
                : (isHinglish ? "Complete List of 20 Sacred Aartis" : "समस्त २० पावन आरतियों की सूची");
            const pdfFooterBookName = isChalisa
                ? (isHinglish ? "Sacred Chalisa Sangrah" : "सम्पूर्ण चालीसा संग्रह")
                : (isHinglish ? "Sacred Aarti Sangrah" : "सम्पूर्ण आरती संग्रह");
            const pdfPageHeaderTitle = isChalisa
                ? (isHinglish ? "Sampoorna Chalisa Sangrah" : "॥ श्री सम्पूर्ण चालीसा संग्रह ॥")
                : (isHinglish ? "Sampoorna Aarti Sangrah" : "॥ श्री सम्पूर्ण आरती संग्रह ॥");

            // Build Word Document HTML Pages as an Array (Prevents Trailing Section Breaks)
            const wordPages = [];

            // 1. Cover Page
            wordPages.push(`
                <div class="word-cover-page">
                    <div style="font-size: 42pt; color: #731308; margin-bottom: 6pt; mso-para-margin: 0pt;">ॐ</div>
                    <h1 style="font-size: 24pt; color: #731308; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; font-weight: normal; margin-bottom: 6pt; mso-para-margin: 0pt;">
                        ${pdfCoverTitle}
                    </h1>
                    <h3 style="font-size: 12pt; color: #8c5806; font-family: 'Poppins', sans-serif; font-weight: normal; letter-spacing: 1pt; margin-bottom: 12pt; mso-para-margin: 0pt;">
                        ${pdfCoverSubtitle}
                    </h3>
                    <div style="width: 140pt; height: 1.5pt; background-color: #daa520; margin: 0 auto 12pt auto; mso-para-margin: 0pt;"></div>
                    <p style="font-size: 11pt; max-width: 450pt; margin: 0 auto; line-height: 1.6; color: #2e1208; font-weight: normal; mso-para-margin: 0pt;">
                        ${pdfCoverDesc}
                    </p>
                    <div style="margin-top: 28pt; font-size: 9.5pt; color: #8c5806; font-family: sans-serif; font-weight: normal; mso-para-margin: 0pt;">
                        ${new Date().toLocaleDateString()} | ॐ शान्तिः शान्तिः शान्तिः | इति शुभम्
                    </div>
                </div>
            `);

            // 2. Table of Contents
            wordPages.push(`
                <div style="padding: 4pt 0;">
                    <div class="word-header-strip">
                        <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                                <td style="color: #731308; font-size: 10pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${pdfTocTitle}</td>
                                <td style="text-align: right; color: #8c5806; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${pdfTocSub}</td>
                            </tr>
                        </table>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; font-size: 10pt; margin-top: 6pt; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        ${targetLayout === 'mantras_start' ? `
                        <tr style="border-bottom: 1.5pt solid #d4af37; background-color: #fdf3d6;">
                            <td style="padding: 4pt 4pt; font-weight: normal; color: #731308; mso-para-margin: 0pt;">🕉️ ${isHinglish ? "Sacred Dhyan Mantras & Phala Sangrah" : (isChalisa ? "हनुमान व दुर्गा ध्यान मन्त्र एवं माहात्म्य संग्रह" : "समस्त देवी-देवता ध्यान मन्त्र व माहात्म्य संग्रह")}</td>
                            <td style="padding: 4pt 4pt; color: #8c5806; font-size: 8.5pt; font-family: sans-serif; mso-para-margin: 0pt;">${isHinglish ? "Vedic Mantras" : "वैदिक मन्त्र"}</td>
                            <td style="padding: 4pt 4pt; text-align: right; color: #731308; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? `Pages ${mantraStartPage}-${mantraEndPage}` : `पृष्ठ ${mantraStartPage}-${mantraEndPage}`}</td>
                        </tr>
                        ` : ''}
                        ${aartisData.map((a, i) => {
                            const pInfo = aartiPageMap[i];
                            const aTitle = isHinglish ? a.englishTitle : a.title;
                            const aCat = isHinglish ? a.categoryEn : a.category;
                            return `
                            <tr style="border-bottom: 0.75pt dotted #e0c888;">
                                <td style="padding: 3.5pt 4pt; font-weight: normal; color: #1a0502; mso-para-margin: 0pt;">${i + 1}. ${aTitle}</td>
                                <td style="padding: 3.5pt 4pt; color: #8c5806; font-size: 8.5pt; font-family: sans-serif; mso-para-margin: 0pt;">${aCat}</td>
                                <td style="padding: 3.5pt 4pt; text-align: right; color: #731308; font-weight: normal; mso-para-margin: 0pt;">${pInfo.pageLabel}</td>
                            </tr>
                            `;
                        }).join('')}
                        ${targetLayout === 'mantras_end' ? `
                        <tr style="border-top: 1.5pt solid #d4af37; background-color: #fdf3d6;">
                            <td style="padding: 4pt 4pt; font-weight: normal; color: #731308; mso-para-margin: 0pt;">🕉️ ${isHinglish ? "Sacred Dhyan Mantras & Phala Sangrah" : (isChalisa ? "हनुमान व दुर्गा ध्यान मन्त्र एवं माहात्म्य संग्रह" : "समस्त देवी-देवता ध्यान मन्त्र व माहात्म्य संग्रह")}</td>
                            <td style="padding: 4pt 4pt; color: #8c5806; font-size: 8.5pt; font-family: sans-serif; mso-para-margin: 0pt;">${isHinglish ? "Vedic Mantras" : "वैदिक मन्त्र"}</td>
                            <td style="padding: 4pt 4pt; text-align: right; color: #731308; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? `Pages ${mantraStartPage}-${mantraEndPage}` : `पृष्ठ ${mantraStartPage}-${mantraEndPage}`}</td>
                        </tr>
                        ` : ''}
                    </table>

                    <div class="word-footer">
                        ${isHinglish ? `Page 2 of ${totalPrintPages} | ${pdfFooterBookName}` : `पृष्ठ २ / ${totalPrintPages} | ${pdfFooterBookName}`}
                    </div>
                </div>
            `);

            // Helper to generate dedicated Mantra pages in Word (Chunked into 4 per page, exactly matching TOC)
            const generateWordMantraPages = () => {
                const pages = [];
                const perPage = 4;
                const numMantraPages = Math.ceil(aartisData.length / perPage);

                for (let pIdx = 0; pIdx < numMantraPages; pIdx++) {
                    const curP = mantraStartPage + pIdx;
                    const batch = aartisData.slice(pIdx * perPage, (pIdx + 1) * perPage);

                    const cardsHtml = batch.map(a => {
                        const aTitle = isHinglish ? a.englishTitle : a.title;
                        const mLabel = isHinglish ? a.mantraLabelEn : a.mantraLabel;
                        const aMantra = isHinglish ? a.mantraEn : a.mantra;
                        const aAbout = isHinglish ? a.aboutEn : a.about;
                        const imgTag = getDeityImgTag(a, 36);

                        return `
                            <div style="background-color: #fdf8eb; border: 1.5pt solid #d4af37; border-left: 4.5pt solid #731308; border-radius: 4pt; padding: 6pt 8pt; margin-bottom: 6pt; mso-para-margin: 0pt;">
                                <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                        <td style="width: 42pt; vertical-align: middle; border: none; padding: 0 6pt 0 0; mso-para-margin: 0pt;">
                                            ${imgTag}
                                        </td>
                                        <td style="vertical-align: middle; border: none; text-align: left; mso-para-margin: 0pt;">
                                            <div style="font-size: 11pt; color: #731308; font-weight: normal; margin-bottom: 1.5pt; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; mso-para-margin: 0pt;">
                                                ${aTitle} <span style="font-size: 8.5pt; color: #8c5806; font-family: 'Poppins', sans-serif;">(${isHinglish ? a.categoryEn : a.category})</span>
                                            </div>
                                            <div style="font-size: 12pt; color: #1a0502; font-weight: normal; line-height: 1.35; margin-bottom: 2pt; mso-para-margin: 0pt;">
                                                ॥ ${mLabel} ॥ ${aMantra}
                                            </div>
                                            <div style="font-size: 9pt; color: #4a2008; font-weight: normal; line-height: 1.3; mso-para-margin: 0pt;">
                                                🌺 ${aAbout}
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        `;
                    }).join('');

                    pages.push(`
                        <div style="padding: 4pt 0;">
                            <div class="word-header-strip">
                                <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                        <td style="color: #731308; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? "Sacred Dhyan Mantras" : (isChalisa ? "॥ श्री हनुमान व दुर्गा ध्यान मन्त्र एवं स्तुति ॥" : "॥ समस्त देवी-देवता ध्यान मन्त्र व माहात्म्य संग्रह ॥")}</td>
                                        <td style="text-align: right; color: #8c5806; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${pdfPageHeaderTitle}</td>
                                    </tr>
                                </table>
                            </div>

                            ${cardsHtml}

                            <div class="word-footer">
                                ${isHinglish 
                                    ? `Page ${curP} of ${totalPrintPages} | Sacred Dhyan Mantras & Glory` 
                                    : `पृष्ठ ${curP} / ${totalPrintPages} | नित्य ध्यान मन्त्र व माहात्म्य संग्रह`}
                            </div>
                        </div>
                    `);
                }
                return pages;
            };

            // If Mantras at Start
            if (targetLayout === 'mantras_start') {
                wordPages.push(...generateWordMantraPages());
            }

            // Generate Aarti / Chalisa Content
            aartisData.forEach((a, i) => {
                const title = isHinglish ? a.englishTitle : a.title;
                const subtitle = isHinglish ? a.title : a.englishTitle;
                const mantra = isHinglish ? a.mantraEn : (isBoth ? `${a.mantra}<div style="margin-top: 1.5pt; font-style: italic; color: #5a2608; font-size: 9.5pt; font-family: 'Poppins', sans-serif; mso-para-margin: 0pt;">${a.mantraEn}</div>` : a.mantra);
                const about = isHinglish ? a.aboutEn : a.about;
                const bhavarth = isHinglish ? a.bhavarthEn : a.bhavarth;
                const pInfo = aartiPageMap[i];
                const isChalisaDeity = isChalisaItem(a);
                const chalisaParts = isChalisaDeity ? parseChalisaStructure(a) : null;

                if (targetLayout === 'compact_2col') {
                    // Multi-page chunks: 1 page for single-page items, 2+ pages for longer items (e.g. Chalisa)
                    pInfo.chunks.forEach((chunk, pageIndex) => {
                        const curPageNum = pInfo.startPage + pageIndex;
                        const isFirstPage = (pageIndex === 0);
                        const isLastPage = (pageIndex === pInfo.chunks.length - 1);
                        const partSuffix = pInfo.chunks.length > 1
                            ? (isHinglish ? ` (Part ${pageIndex + 1} of ${pInfo.chunks.length})` : ` (भाग ${pageIndex + 1}/${pInfo.chunks.length})`)
                            : '';
                        const globalStartIndex = a.verses.indexOf(chunk[0]);
                        const useTwoCol = shouldUseTwoColumns(chunk, 'compact_2col');

                        let versesBlock = '';
                        if (useTwoCol) {
                            const half = Math.ceil(chunk.length / 2);
                            const leftCol = chunk.slice(0, half).map((v, idx) => formatWordVerse(v, globalStartIndex + idx)).join('');
                            const rightCol = chunk.slice(half).map((v, idx) => formatWordVerse(v, globalStartIndex + half + idx)).join('');
                            versesBlock = `
                                <table style="width: 100%; border: none; border-collapse: collapse; margin-top: 4pt; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                        <td style="width: 48%; vertical-align: top; border: none; padding: 0 4pt 0 0; mso-para-margin: 0pt;">${leftCol}</td>
                                        <td style="width: 4%; border: none; mso-para-margin: 0pt;"></td>
                                        <td style="width: 48%; vertical-align: top; border: none; padding: 0 0 0 4pt; mso-para-margin: 0pt;">${rightCol}</td>
                                    </tr>
                                </table>
                            `;
                        } else {
                            versesBlock = `<div style="width: 100%; margin-top: 4pt; text-align: center; mso-para-margin: 0pt;">${chunk.map((v, idx) => formatWordVerse(v, globalStartIndex + idx)).join('')}</div>`;
                        }

                        const concludingSectionHtml = isLastPage ? (isChalisaDeity ? `
                            <div class="word-doha-box" style="margin-top: 6pt; padding: 5pt 10pt;">
                                <div style="font-size: 8.5pt; color: #8c5806; font-family: sans-serif; margin-bottom: 2pt; mso-para-margin: 0pt;">${isHinglish ? "|| Concluding Doha ||" : "॥ समापन दोहा ॥"}</div>
                                ${formatWordChalisaDohas(chalisaParts.closingDoha, targetLang)}
                            </div>
                        ` : getWordSamarpanHtml()) : '';

                        if (isFirstPage) {
                            const deityImgTag = getDeityImgTag(a, 42);

                            const page1TopBannerHtml = isChalisaDeity ? `
                                <div class="word-doha-box" style="margin: 6pt 0; padding: 5pt 10pt;">
                                    <div style="font-size: 8.5pt; color: #8c5806; font-family: sans-serif; margin-bottom: 2pt; mso-para-margin: 0pt;">${isHinglish ? "|| Mangalacharan Doha ||" : "॥ मंगलाचरण दोहा ॥"}</div>
                                    ${formatWordChalisaDohas(chalisaParts.openingDohas, targetLang)}
                                </div>
                            ` : `
                                <div class="word-mantra-box">
                                    <div class="word-mantra-label">॥ ${isHinglish ? a.mantraLabelEn : a.mantraLabel} ॥</div>
                                    <div class="word-mantra-text">${mantra}</div>
                                </div>

                                <div class="word-info-strip">
                                    <span style="color: #731308; font-weight: normal;">${isHinglish ? "🌺 Significance & Phala: " : "🌺 माहात्म्य व फलश्रुति: "}</span>
                                    <span>${about}</span>
                                </div>
                            `;

                            wordPages.push(`
                                <div style="padding: 4pt 0;">
                                    <div class="word-header-strip">
                                        <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="color: #731308; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? a.categoryEn : a.category}</td>
                                                <td style="text-align: right; color: #8c5806; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${pdfPageHeaderTitle}</td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div style="text-align: center; margin-bottom: 4pt; mso-para-margin: 0pt;">
                                        <table style="margin: 0 auto; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="vertical-align: middle; border: none; padding: 0 4pt 0 0; mso-para-margin: 0pt;">${deityImgTag}</td>
                                                <td style="vertical-align: middle; border: none; text-align: left; mso-para-margin: 0pt;">
                                                    <div style="font-size: 15pt; color: #731308; font-weight: normal; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; mso-para-margin: 0pt;">${title}${pInfo.chunks.length > 1 ? (isHinglish ? ` (Part 1/${pInfo.chunks.length})` : ` (भाग १/${pInfo.chunks.length})`) : ''}</div>
                                                    <div style="font-size: 9.5pt; color: #8c5806; font-style: italic; font-weight: normal; mso-para-margin: 0pt;">${subtitle}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    ${page1TopBannerHtml}

                                    ${versesBlock}

                                    ${concludingSectionHtml}

                                    <div class="word-footer">
                                        ${isHinglish 
                                            ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                            : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}
                                    </div>
                                </div>
                            `);
                        } else {
                            // Subsequent Pages (Page 2+) for long items like Chalisa
                            const deityMedallionSub = getDeityImgTag(a, 34);

                            wordPages.push(`
                                <div style="padding: 4pt 0;">
                                    <div class="word-header-strip">
                                        <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="color: #731308; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? "|| Shri Hari Sharanam ||" : "॥ श्रीहरिः शरणम् ॥"}</td>
                                                <td style="text-align: right; color: #8c5806; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? (isChalisa ? `Chalisa Verses${partSuffix}` : `Aarti Verses${partSuffix}`) : (isChalisa ? `चालीसा पद${partSuffix}` : `आरती पद${partSuffix}`)}</td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div style="text-align: center; margin-bottom: 6pt; border-bottom: 1.5pt solid #d4af37; padding-bottom: 3pt; mso-para-margin: 0pt;">
                                        <table style="margin: 0 auto; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="vertical-align: middle; border: none; padding: 0 4pt 0 0; mso-para-margin: 0pt;">${deityMedallionSub}</td>
                                                <td style="vertical-align: middle; border: none; text-align: left; mso-para-margin: 0pt;">
                                                    <div style="font-size: 14pt; color: #731308; font-weight: normal; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; mso-para-margin: 0pt;">
                                                        ${title} ${isHinglish ? `(Continued - Part ${pageIndex + 1} of ${pInfo.chunks.length})` : `(क्रमशः - भाग ${pageIndex + 1}/${pInfo.chunks.length})`}
                                                    </div>
                                                    <div style="font-size: 9.5pt; color: #8c5806; font-style: italic; font-weight: normal; mso-para-margin: 0pt;">${subtitle}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    ${versesBlock}

                                    ${concludingSectionHtml}

                                    <div class="word-footer">
                                        ${isHinglish 
                                            ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                            : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}
                                    </div>
                                </div>
                            `);
                        }
                    });
                } else if (targetLayout === 'mantras_start' || targetLayout === 'mantras_end') {
                    // Pure Chanting Page with Dynamic 1 or 2 Columns and Multi-Page Support
                    pInfo.chunks.forEach((chunk, pageIndex) => {
                        const curPageNum = pInfo.startPage + pageIndex;
                        const isFirstPage = (pageIndex === 0);
                        const isLastPage = (pageIndex === pInfo.chunks.length - 1);
                        const partSuffix = pInfo.chunks.length > 1
                            ? (isHinglish ? ` (Part ${pageIndex + 1} of ${pInfo.chunks.length})` : ` (भाग ${pageIndex + 1}/${pInfo.chunks.length})`)
                            : '';
                        const globalStartIndex = a.verses.indexOf(chunk[0]);
                        const useTwoCol = shouldUseTwoColumns(chunk, targetLayout);

                        let versesBlock = '';
                        if (useTwoCol) {
                            const half = Math.ceil(chunk.length / 2);
                            const leftCol = chunk.slice(0, half).map((v, idx) => formatWordVerse(v, globalStartIndex + idx)).join('');
                            const rightCol = chunk.slice(half).map((v, idx) => formatWordVerse(v, globalStartIndex + half + idx)).join('');
                            versesBlock = `
                                <table style="width: 100%; border: none; border-collapse: collapse; margin-top: 4pt; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                        <td style="width: 48%; vertical-align: top; border: none; padding: 0 4pt 0 0; mso-para-margin: 0pt;">${leftCol}</td>
                                        <td style="width: 4%; border: none; mso-para-margin: 0pt;"></td>
                                        <td style="width: 48%; vertical-align: top; border: none; padding: 0 0 0 4pt; mso-para-margin: 0pt;">${rightCol}</td>
                                    </tr>
                                </table>
                            `;
                        } else {
                            versesBlock = `<div style="width: 100%; margin-top: 4pt; text-align: center; mso-para-margin: 0pt;">${chunk.map((v, idx) => formatWordVerse(v, globalStartIndex + idx)).join('')}</div>`;
                        }

                        const concludingSectionHtml = isLastPage ? (isChalisaDeity ? `
                            <div class="word-doha-box" style="margin-top: 6pt; padding: 5pt 10pt;">
                                <div style="font-size: 8.5pt; color: #8c5806; font-family: sans-serif; margin-bottom: 2pt; mso-para-margin: 0pt;">${isHinglish ? "|| Concluding Doha ||" : "॥ समापन दोहा ॥"}</div>
                                ${formatWordChalisaDohas(chalisaParts.closingDoha, targetLang)}
                            </div>
                        ` : getWordSamarpanHtml()) : '';

                        const page1ChalisaDohaBanner = (isFirstPage && isChalisaDeity) ? `
                            <div class="word-doha-box" style="margin: 6pt 0; padding: 5pt 10pt;">
                                <div style="font-size: 8.5pt; color: #8c5806; font-family: sans-serif; margin-bottom: 2pt; mso-para-margin: 0pt;">${isHinglish ? "|| Mangalacharan Doha ||" : "॥ मंगलाचरण दोहा ॥"}</div>
                                ${formatWordChalisaDohas(chalisaParts.openingDohas, targetLang)}
                            </div>
                        ` : '';

                        if (isFirstPage) {
                            const deityImgTag = getDeityImgTag(a, 42);

                            wordPages.push(`
                                <div style="padding: 4pt 0;">
                                    <div class="word-header-strip">
                                        <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="color: #731308; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? a.categoryEn : a.category}</td>
                                                <td style="text-align: right; color: #8c5806; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? (isChalisa ? "Chalisa Sangrah" : "Aarti Sangrah") : "॥ श्रीहरिः शरणम् ॥"}</td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div style="text-align: center; margin-bottom: 4pt; mso-para-margin: 0pt;">
                                        <table style="margin: 0 auto; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="vertical-align: middle; border: none; padding: 0 4pt 0 0; mso-para-margin: 0pt;">${deityImgTag}</td>
                                                <td style="vertical-align: middle; border: none; text-align: left; mso-para-margin: 0pt;">
                                                    <div style="font-size: 15pt; color: #731308; font-weight: normal; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; mso-para-margin: 0pt;">${title}${pInfo.chunks.length > 1 ? (isHinglish ? ` (Part 1/${pInfo.chunks.length})` : ` (भाग १/${pInfo.chunks.length})`) : ''}</div>
                                                    <div style="font-size: 9.5pt; color: #8c5806; font-style: italic; font-weight: normal; mso-para-margin: 0pt;">${subtitle}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    ${page1ChalisaDohaBanner}

                                    ${versesBlock}

                                    ${concludingSectionHtml}

                                    <div class="word-footer">
                                        ${isHinglish 
                                            ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                            : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}
                                    </div>
                                </div>
                            `);
                        } else {
                            const deityMedallionSub = getDeityImgTag(a, 34);

                            wordPages.push(`
                                <div style="padding: 4pt 0;">
                                    <div class="word-header-strip">
                                        <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="color: #731308; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? "|| Shri Hari Sharanam ||" : "॥ श्रीहरिः शरणम् ॥"}</td>
                                                <td style="text-align: right; color: #8c5806; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? (isChalisa ? `Chalisa Verses${partSuffix}` : `Aarti Verses${partSuffix}`) : (isChalisa ? `चालीसा पद${partSuffix}` : `आरती पद${partSuffix}`)}</td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div style="text-align: center; margin-bottom: 6pt; border-bottom: 1.5pt solid #d4af37; padding-bottom: 3pt; mso-para-margin: 0pt;">
                                        <table style="margin: 0 auto; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="vertical-align: middle; border: none; padding: 0 4pt 0 0; mso-para-margin: 0pt;">${deityMedallionSub}</td>
                                                <td style="vertical-align: middle; border: none; text-align: left; mso-para-margin: 0pt;">
                                                    <div style="font-size: 14pt; color: #731308; font-weight: normal; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; mso-para-margin: 0pt;">
                                                        ${title} ${isHinglish ? `(Continued - Part ${pageIndex + 1} of ${pInfo.chunks.length})` : `(क्रमशः - भाग ${pageIndex + 1}/${pInfo.chunks.length})`}
                                                    </div>
                                                    <div style="font-size: 9.5pt; color: #8c5806; font-style: italic; font-weight: normal; mso-para-margin: 0pt;">${subtitle}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    ${versesBlock}

                                    ${concludingSectionHtml}

                                    <div class="word-footer">
                                        ${isHinglish 
                                            ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                            : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}
                                    </div>
                                </div>
                            `);
                        }
                    });
                } else {
                    // Detailed 2-Page Granth Layout
                    const deityHeroImg = getDeityHeroImgTag(a);

                    // Page 1: Deity Hero + Mantra + Significance + Bhavarth
                    wordPages.push(`
                        <div style="padding: 4pt 0;">
                            <div class="word-header-strip">
                                <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                        <td style="color: #731308; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? a.categoryEn : a.category}</td>
                                        <td style="text-align: right; color: #8c5806; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${pdfPageHeaderTitle}</td>
                                    </tr>
                                </table>
                            </div>

                            <div style="text-align: center; margin-bottom: 6pt; mso-para-margin: 0pt;">
                                ${deityHeroImg}
                                <div style="font-size: 17pt; color: #731308; font-weight: normal; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; mso-para-margin: 0pt;">${title}</div>
                                <div style="font-size: 10pt; color: #8c5806; font-style: italic; font-weight: normal; mso-para-margin: 0pt;">${subtitle}</div>
                            </div>

                            <div class="word-mantra-box" style="padding: 8pt 12pt; margin: 8pt 0;">
                                <div class="word-mantra-label" style="font-size: 12pt;">॥ ${isHinglish ? a.mantraLabelEn : a.mantraLabel} ॥</div>
                                <div class="word-mantra-text" style="font-size: 15pt; line-height: 1.6;">${mantra}</div>
                            </div>

                            <div class="word-info-strip" style="padding: 6pt 8pt; margin: 6pt 0; font-size: 10pt;">
                                <div style="color: #731308; font-weight: normal; margin-bottom: 2pt; mso-para-margin: 0pt;">${isHinglish ? "🌺 Significance & Phala: " : "🌺 माहात्म्य एवं फलश्रुति: "}</div>
                                <div style="mso-para-margin: 0pt;">${about}</div>
                            </div>

                            <div class="word-info-strip" style="background-color: #f7f3ff; border-left-color: #731308; padding: 6pt 8pt; margin: 6pt 0; font-size: 10pt;">
                                <div style="color: #731308; font-weight: normal; margin-bottom: 2pt; mso-para-margin: 0pt;">${isHinglish ? "✨ Spiritual Meaning & Glory: " : "✨ भावार्थ एवं आध्यात्मिक संदेश: "}</div>
                                <div style="mso-para-margin: 0pt;">${bhavarth}</div>
                            </div>

                            <div class="word-footer">
                                ${isHinglish ? `Page ${pInfo.startPage} of ${totalPrintPages} | ${title} | Dhyan & Meaning` : `ॐ तत्सत् | पृष्ठ ${pInfo.startPage} / ${totalPrintPages} | ${title} (ध्यान एवं भावार्थ)`}
                            </div>
                        </div>
                    `);

                    // Page 2: Lyrics / Verses
                    const lyricsPages = getAartiLyricsPages(a, targetLang);
                    lyricsPages.forEach((chunk, pageIndex) => {
                        const curPageNum = pInfo.startPage + 1 + pageIndex;
                        const partSuffix = lyricsPages.length > 1 
                            ? (isHinglish ? ` (Part ${pageIndex + 1}/${lyricsPages.length})` : ` (भाग ${pageIndex + 1}/${lyricsPages.length})`) 
                            : '';
                        const isLastPage = (pageIndex === lyricsPages.length - 1);
                        const globalStartIndex = a.verses.indexOf(chunk[0]);
                        const versesHtml = chunk.map((v, idx) => formatWordVerse(v, globalStartIndex + idx)).join('');

                        const concludingSectionHtml = isLastPage ? (isChalisaDeity ? `
                            <div class="word-doha-box" style="margin-top: 6pt; padding: 5pt 10pt;">
                                <div style="font-size: 8.5pt; color: #8c5806; font-family: sans-serif; margin-bottom: 2pt; mso-para-margin: 0pt;">${isHinglish ? "|| Concluding Doha ||" : "॥ समापन दोहा ॥"}</div>
                                ${formatWordChalisaDohas(chalisaParts.closingDoha, targetLang)}
                            </div>
                        ` : getWordSamarpanHtml()) : '';

                        const page1ChalisaDohaBanner = (pageIndex === 0 && isChalisaDeity) ? `
                            <div class="word-doha-box" style="margin: 6pt 0; padding: 5pt 10pt;">
                                <div style="font-size: 8.5pt; color: #8c5806; font-family: sans-serif; margin-bottom: 2pt; mso-para-margin: 0pt;">${isHinglish ? "|| Mangalacharan Doha ||" : "॥ मंगलाचरण दोहा ॥"}</div>
                                ${formatWordChalisaDohas(chalisaParts.openingDohas, targetLang)}
                            </div>
                        ` : '';

                        const deityMedallionLyrics = getDeityImgTag(a, 34);

                        wordPages.push(`
                            <div style="padding: 4pt 0;">
                                <div class="word-header-strip">
                                    <table style="width: 100%; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                            <td style="color: #731308; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? "|| Shri Hari Sharanam ||" : "॥ श्रीहरिः शरणम् ॥"}</td>
                                            <td style="text-align: right; color: #8c5806; font-size: 9pt; border: none; font-weight: normal; mso-para-margin: 0pt;">${isHinglish ? (isChalisa ? `Chalisa Verses${partSuffix}` : `Aarti Verses${partSuffix}`) : (isChalisa ? `चालीसा पद${partSuffix}` : `आरती पद${partSuffix}`)}</td>
                                        </tr>
                                    </table>
                                </div>

                                <div style="text-align: center; margin-bottom: 6pt; mso-para-margin: 0pt;">
                                    <table style="margin: 0 auto; border: none; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                            <td style="vertical-align: middle; border: none; padding: 0 4pt 0 0; mso-para-margin: 0pt;">${deityMedallionLyrics}</td>
                                            <td style="vertical-align: middle; border: none; text-align: left; mso-para-margin: 0pt;">
                                                <div style="font-size: 14pt; color: #731308; font-weight: normal; font-family: 'Rozha One', 'Noto Serif Devanagari', serif; mso-para-margin: 0pt;">${title}${partSuffix}</div>
                                                <div style="font-size: 9.5pt; color: #8c5806; font-style: italic; font-weight: normal; mso-para-margin: 0pt;">${subtitle}</div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                ${page1ChalisaDohaBanner}

                                <div style="width: 100%; text-align: center; mso-para-margin: 0pt;">
                                    ${versesHtml}
                                </div>

                                ${concludingSectionHtml}

                                <div class="word-footer">
                                    ${isHinglish 
                                        ? `Page ${curPageNum} of ${totalPrintPages} | ${title}${partSuffix} | Iti Shubham` 
                                        : `${isLastPage ? 'इति शुभम् | ' : ''}पृष्ठ ${curPageNum} / ${totalPrintPages} | ${title}${partSuffix}`}
                                </div>
                            </div>
                        `);
                    });
                }
            });

            // If Mantras at End
            if (targetLayout === 'mantras_end') {
                wordPages.push(...generateWordMantraPages());
            }

            // Join all pages cleanly without a trailing page break
            const wordContent = wordPages.join(pageBreak);

            // Wrap in Standard Microsoft Word MSO HTML Template with exact layout resets
            const wordDocHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
    <meta charset="utf-8">
    <title>${pdfCoverTitle}</title>
    <!--[if gte mso 9]>
    <xml>
    <w:WordDocument>
        <w:View>Print</w:View>
        <w:Zoom>100</w:Zoom>
        <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        @page {
            size: 210mm 297mm;
            margin: 1.0cm 1.2cm 1.0cm 1.2cm;
            mso-page-orientation: portrait;
        }
        @page Section1 {
            size: 210mm 297mm;
            margin: 1.0cm 1.2cm 1.0cm 1.2cm;
            mso-header-margin: 20.0pt;
            mso-footer-margin: 20.0pt;
            mso-paper-source: 0;
        }
        div.Section1 {
            page: Section1;
        }
        * {
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            mso-para-margin-left: 0pt;
            mso-para-margin-right: 0pt;
        }
        body {
            font-family: 'Noto Serif Devanagari', 'Mangal', 'Kokila', serif;
            font-size: 10.5pt;
            color: #1a0502;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            font-weight: normal;
        }
        p, div, span, td, th, h1, h2, h3, h4 {
            font-weight: normal;
            margin: 0;
            padding: 0;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            mso-line-height-rule: exactly;
        }
        .word-cover-page {
            text-align: center;
            padding: 40pt 20pt 30pt 20pt;
        }
        .word-header-strip {
            border-bottom: 1.5pt solid #d4af37;
            padding-bottom: 3pt;
            margin-bottom: 6pt;
            font-size: 9pt;
            color: #731308;
            font-family: sans-serif;
        }
        .word-mantra-box {
            background-color: #fdf3d6;
            border: 1.5pt solid #d4af37;
            padding: 6pt 10pt;
            margin: 5pt 0;
            text-align: center;
            border-radius: 4pt;
        }
        .word-mantra-label {
            color: #731308;
            font-size: 10.5pt;
            margin-bottom: 2pt;
        }
        .word-mantra-text {
            color: #1a0502;
            font-size: 13pt;
            line-height: 1.45;
        }
        .word-info-strip {
            background-color: #fdfaf2;
            border-left: 3.5pt solid #b8860b;
            padding: 4pt 7pt;
            margin: 4pt 0;
            font-size: 9.5pt;
            line-height: 1.35;
            color: #2e1208;
            border-radius: 3pt;
        }
        .word-doha-box {
            background-color: #fdf3d6;
            border: 1.5pt solid #d4af37;
            border-left: 4.5pt solid #731308;
            border-right: 4.5pt solid #731308;
            padding: 5pt 8pt;
            margin: 5pt 0;
            text-align: center;
            border-radius: 4pt;
        }
        .word-verse-item {
            border-bottom: 0.75pt dotted #e0c888;
            padding: 2.5pt 0;
            text-align: center;
            margin-bottom: 1.5pt;
        }
        .word-samarpan-box {
            background-color: #fdf3d6;
            border: 1pt solid #d4af37;
            padding: 5pt 8pt;
            margin-top: 6pt;
            text-align: center;
            font-size: 9pt;
            border-radius: 4pt;
        }
        .word-footer {
            border-top: 1pt solid #d4af37;
            padding-top: 3pt;
            margin-top: 8pt;
            font-size: 8.5pt;
            color: #731308;
            text-align: center;
            font-family: sans-serif;
        }
    </style>
</head>
<body>
    <div class="Section1">
        ${wordContent}
    </div>
</body>
</html>
            `;

            const blob = new Blob(['\ufeff' + wordDocHtml], { type: 'application/msword;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = isChalisa 
                ? `Sampoorna-Chalisa-Sangrah-${targetLang}.doc`
                : `Sampoorna-Aarti-Sangrah-${targetLang}.doc`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showNotification(targetLang === 'hinglish' 
                ? (isChalisa ? "Chalisa Word document (.doc) downloaded!" : "Aarti Word document (.doc) downloaded!") 
                : (isChalisa ? "सम्पूर्ण चालीसा वर्ड ग्रन्थ (.doc) डाउनलोड हो गया!" : "सम्पूर्ण आरती वर्ड ग्रन्थ (.doc) डाउनलोड हो गया!"));
        }

        // Backward compatibility alias:
        const downloadTextBook = downloadAsWord;

        /* ========================================================
           FULLSCREEN MODE CONTROLLER (Immersive Sacred Book Fullscreen)
           Fullscreens ONLY the Aarti book stage, hiding website header & shelf.
        ======================================================== */
        function toggleFullScreen() {
            try {
                const stage = document.getElementById('book-stage') || document.querySelector('.book-stage');
                const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || (stage && stage.classList.contains('is-fullscreen')));

                if (!isFS) {
                    if (stage) {
                        if (stage.requestFullscreen) {
                            stage.requestFullscreen().catch(() => {});
                        } else if (stage.webkitRequestFullscreen) {
                            stage.webkitRequestFullscreen();
                        } else if (stage.mozRequestFullScreen) {
                            stage.mozRequestFullScreen();
                        } else if (stage.msRequestFullscreen) {
                            stage.msRequestFullscreen();
                        }
                        stage.classList.add('is-fullscreen');
                    }
                    document.body.classList.add('book-fullscreen-active');
                    updateFullscreenUI();
                    showNotification(currentLang === 'hinglish' ? "Book Fullscreen Mode (Press Esc to Exit)" : (isChalisaBook() ? "चालीसा पुस्तक पूर्ण स्क्रीन (बाहर निकलने हेतु Esc दबाएं)" : "आरती पुस्तक पूर्ण स्क्रीन (बाहर निकलने हेतु Esc दबाएं)"));
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen().catch(() => {});
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    if (stage) {
                        stage.classList.remove('is-fullscreen');
                    }
                    document.body.classList.remove('book-fullscreen-active');
                    updateFullscreenUI();
                    showNotification(currentLang === 'hinglish' ? "Exited Fullscreen" : "पूर्ण स्क्रीन से बाहर आ गए");
                }
            } catch (err) {
                console.warn("Fullscreen toggle error:", err);
            }
        }

        function updateFullscreenUI() {
            const stage = document.getElementById('book-stage') || document.querySelector('.book-stage');
            const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || (stage && stage.classList.contains('is-fullscreen')));
            const fsBtn = document.getElementById('fullscreen-btn');
            const toolFsBtn = document.getElementById('tool-fullscreen-btn');
            const txtFs = document.getElementById('txt-fullscreen-btn');
            const fsExitTxt = document.getElementById('txt-fs-exit');
            const isHinglish = currentLang === 'hinglish';

            if (isFS) {
                if (txtFs) txtFs.textContent = isHinglish ? "Exit Fullscreen" : "सामान्य दृश्य";
                if (fsBtn) {
                    fsBtn.classList.add('active');
                    fsBtn.title = isHinglish ? "Exit Fullscreen (Esc)" : "सामान्य स्क्रीन पर लौटें (Esc)";
                }
                if (toolFsBtn) {
                    toolFsBtn.classList.add('active');
                    toolFsBtn.innerHTML = `🗗`;
                    toolFsBtn.title = isHinglish ? "Exit Fullscreen" : "सामान्य स्क्रीन करें";
                }
                if (fsExitTxt) fsExitTxt.textContent = isHinglish ? "Exit Fullscreen (Esc)" : "सामान्य दृश्य (Esc)";
                if (stage) stage.classList.add('is-fullscreen');
                document.body.classList.add('book-fullscreen-active');
            } else {
                if (txtFs) txtFs.textContent = isHinglish ? "Full Screen" : "फुल स्क्रीन";
                if (fsBtn) {
                    fsBtn.classList.remove('active');
                    fsBtn.title = isHinglish ? "Enter Fullscreen" : "पूर्ण स्क्रीन (Full Screen)";
                }
                if (toolFsBtn) {
                    toolFsBtn.classList.remove('active');
                    toolFsBtn.innerHTML = `⛶`;
                    toolFsBtn.title = isHinglish ? "Full Screen" : "पूर्ण स्क्रीन";
                }
                if (stage) stage.classList.remove('is-fullscreen');
                document.body.classList.remove('book-fullscreen-active');
            }
        }

        function initFullscreenListeners() {
            ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
                document.addEventListener(evt, () => {
                    const isNativeFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
                    if (!isNativeFS) {
                        const stage = document.getElementById('book-stage') || document.querySelector('.book-stage');
                        if (stage) stage.classList.remove('is-fullscreen');
                        document.body.classList.remove('book-fullscreen-active');
                    }
                    updateFullscreenUI();
                });
            });

            // Keyboard Escape handling for graceful fallback
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const stage = document.getElementById('book-stage') || document.querySelector('.book-stage');
                    if (stage && stage.classList.contains('is-fullscreen')) {
                        toggleFullScreen();
                    }
                }
            });
        }

        /* ========================================================
           TOUCH SWIPE NAVIGATION (Mobile Viewport Gesture Support)
        ======================================================== */
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        function initTouchSwipe() {
            const target = document.getElementById('book-container') || document.body;
            target.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            target.addEventListener('touchend', (e) => {
                if (e.changedTouches && e.changedTouches.length === 1) {
                    touchEndX = e.changedTouches[0].clientX;
                    touchEndY = e.changedTouches[0].clientY;
                    handleTouchSwipe();
                }
            }, { passive: true });
        }

        function handleTouchSwipe() {
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            // Require at least 50px swipe horizontally and predominantly horizontal
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
                if (diffX < 0) {
                    // Swiped Left -> Next Page
                    nextPage();
                } else {
                    // Swiped Right -> Previous Page
                    prevPage();
                }
            }
        }

        /* KEYBOARD NAVIGATION */
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'PageDown') nextPage();
            else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevPage();
            else if (e.key === 'Escape') {
                const drawer = document.getElementById('toc-drawer');
                if (drawer.classList.contains('open')) toggleToc();
                closeDownloadModal();
            }
        });

        /* ========================================================
           DEVOTIONAL AUDIO PLAYER & BACKGROUND PLAYBACK ENGINE
           Continuous Background Playback Across Pages, Speed Control
           (0.75-2.00x), Multi-Version Selection & Samapan Transition
        ======================================================== */
        function initAudioEngine() {
            const player = document.getElementById('bg-audio-player');
            if (!player) return;

            // Load saved state
            try {
                const savedVersions = localStorage.getItem(getStorageKey('user_audio_versions'));
                if (savedVersions) audioState.userSelectedVersions = JSON.parse(savedVersions);
                const savedSpeed = parseFloat(localStorage.getItem(getStorageKey('user_audio_speed')));
                if (AUDIO_SPEEDS.includes(savedSpeed)) audioState.speed = savedSpeed;
                const savedLoop = localStorage.getItem(getStorageKey('user_audio_loop'));
                if (savedLoop !== null) audioState.isLoop = (savedLoop === 'true');
            } catch (e) {}

            player.playbackRate = audioState.speed;
            player.loop = audioState.isLoop;

            player.addEventListener('play', () => {
                audioState.isPlaying = true;
                syncAllAudioUI();
            });

            player.addEventListener('pause', () => {
                audioState.isPlaying = false;
                syncAllAudioUI();
            });

            player.addEventListener('timeupdate', () => {
                if (!isAudioScrubbing && player.duration) {
                    const curTime = player.currentTime;
                    const dur = player.duration;
                    const pct = (curTime / dur) * 100;
                    const curFormatted = formatAudioTime(curTime);
                    const durFormatted = formatAudioTime(dur);

                    // Update Global Floating Dock
                    const dockCur = document.getElementById('dock-time-cur');
                    const dockDur = document.getElementById('dock-time-dur');
                    const dockScrubber = document.getElementById('dock-scrubber');
                    if (dockCur) dockCur.textContent = curFormatted;
                    if (dockDur) dockDur.textContent = durFormatted;
                    if (dockScrubber) dockScrubber.value = pct;

                    // Update in-page card if on current playing page
                    if (isViewingPlayingAarti()) {
                        const cardCur = document.getElementById('card-time-cur');
                        const cardDur = document.getElementById('card-time-dur');
                        const cardScrubber = document.getElementById('card-scrubber');
                        if (cardCur) cardCur.textContent = curFormatted;
                        if (cardDur) cardDur.textContent = durFormatted;
                        if (cardScrubber) cardScrubber.value = pct;
                    }
                }
            });

            player.addEventListener('loadedmetadata', () => {
                const dur = player.duration;
                const durFormatted = formatAudioTime(dur);
                const dockDur = document.getElementById('dock-time-dur');
                if (dockDur) dockDur.textContent = durFormatted;
                if (isViewingPlayingAarti()) {
                    const cardDur = document.getElementById('card-time-dur');
                    if (cardDur) cardDur.textContent = durFormatted;
                }
            });

            player.addEventListener('ended', () => {
                if (audioState.isLoop) {
                    player.currentTime = 0;
                    player.play().catch(e => {});
                    return;
                }

                // User requirement: "always play samapan.mp3 after evry aarti and also redirect to that page after the audio is completed"
                // "samapan.mp3 only for aarti"
                const isChalisa = isChalisaBook();
                if (!isChalisa && audioState.aartiId && audioState.aartiId !== 'samapan') {
                    const samapanIdx = aartisData.findIndex(a => a.id === 'samapan');
                    if (samapanIdx !== -1) {
                        showNotification(currentLang === 'hinglish' 
                            ? "Aarti concluded! Redirecting to Aarti Samapan (Karpur Gauram)..." 
                            : "आरती सम्पन्न — अब कर्पूर आरती एवं समापन शांति पाठ...");

                        // Redirect to samapan page
                        jumpToAarti(samapanIdx);

                        // Play samapan audio
                        setTimeout(() => {
                            playAartiAudio('samapan', 0);
                        }, 400);
                        return;
                    }
                }

                // Concluded
                audioState.isPlaying = false;
                syncAllAudioUI();
                if (audioState.aartiId === 'samapan') {
                    showNotification(currentLang === 'hinglish' 
                        ? "Sampoorna Aarti & Samapan concluded. Om Shanti!" 
                        : "॥ सम्पूर्ण आरती एवं समापन शांति पाठ संपन्न। ॐ शान्तिः शान्तिः शान्तिः ॥");
                }
            });

            player.addEventListener('error', (e) => {
                console.warn("Audio playback notice:", e);
                audioState.isPlaying = false;
                syncAllAudioUI();
            });
        }

        function formatAudioTime(seconds) {
            if (isNaN(seconds) || seconds === null || seconds < 0) return '0:00';
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m}:${s < 10 ? '0' : ''}${s}`;
        }

        function isViewingPlayingAarti() {
            if (currentPageIndex < 0 || currentPageIndex >= aartisData.length) return false;
            return aartisData[currentPageIndex].id === audioState.aartiId;
        }

        function getSelectedTrackIndex(aarti) {
            if (!aarti || !aarti.audioTracks || aarti.audioTracks.length === 0) return 0;
            const saved = audioState.userSelectedVersions[aarti.id];
            if (saved !== undefined && saved >= 0 && saved < aarti.audioTracks.length) {
                return saved;
            }
            return 0;
        }

        function playAartiAudio(aartiId, trackIdx = null) {
            const player = document.getElementById('bg-audio-player');
            if (!player) return;

            const aarti = aartisData.find(a => a.id === aartiId);
            if (!aarti || !aarti.audioTracks || aarti.audioTracks.length === 0) {
                showNotification(currentLang === 'hinglish' ? "Audio coming soon for this prayer!" : "इस आरती का पावन ऑडियो शीघ्र जोड़ा जाएगा!");
                return;
            }

            if (trackIdx === null || trackIdx === undefined) {
                trackIdx = getSelectedTrackIndex(aarti);
            }
            trackIdx = parseInt(trackIdx);
            if (trackIdx < 0 || trackIdx >= aarti.audioTracks.length) trackIdx = 0;

            const track = aarti.audioTracks[trackIdx];

            // If toggling currently active audio
            if (audioState.aartiId === aartiId && audioState.trackIndex === trackIdx) {
                audioState.dockVisible = true;
                if (player.paused) {
                    player.play().catch(e => console.log(e));
                } else {
                    player.pause();
                }
                syncAllAudioUI();
                return;
            }

            // New track/deity
            audioState.aartiId = aartiId;
            audioState.trackIndex = trackIdx;
            audioState.dockVisible = true;
            audioState.userSelectedVersions[aartiId] = trackIdx;
            try {
                localStorage.setItem(getStorageKey('user_audio_versions'), JSON.stringify(audioState.userSelectedVersions));
            } catch(e) {}

            player.src = track.file;
            player.playbackRate = audioState.speed;
            player.loop = audioState.isLoop;
            player.play().catch(e => console.log(e));

            const dock = document.getElementById('global-audio-dock');
            if (dock) dock.style.display = 'block';

            syncAllAudioUI();
            showNotification(currentLang === 'hinglish' ? `Now Playing: ${track.title}` : `बजाया जा रहा है: ${track.title}`);
        }

        function toggleAudioPlay() {
            const player = document.getElementById('bg-audio-player');
            if (!player) return;
            if (!audioState.aartiId) {
                toggleCurrentPageAudio();
                return;
            }
            if (player.paused) {
                player.play().catch(e => console.log(e));
            } else {
                player.pause();
            }
        }

        function toggleCurrentPageAudio() {
            if (currentPageIndex === -1) {
                const firstWithAudio = aartisData.find(a => a.audioTracks && a.audioTracks.length > 0);
                if (firstWithAudio) {
                    playAartiAudio(firstWithAudio.id);
                } else {
                    showNotification("पावन ऑडियो शीघ्र उपलब्ध होगा।");
                }
                return;
            }
            const curAarti = aartisData[currentPageIndex];
            if (!curAarti || !curAarti.audioTracks || curAarti.audioTracks.length === 0) {
                showNotification(currentLang === 'hinglish' ? "Audio coming soon for this prayer!" : "इस आरती का पावन ऑडियो शीघ्र जोड़ा जाएगा!");
                return;
            }
            const selectedIdx = getSelectedTrackIndex(curAarti);
            playAartiAudio(curAarti.id, selectedIdx);
        }

        function stopAudio() {
            const player = document.getElementById('bg-audio-player');
            if (player) {
                player.pause();
                player.currentTime = 0;
            }
            audioState.isPlaying = false;
            audioState.dockVisible = false;
            audioState.aartiId = null;
            audioState.trackIndex = 0;
            const dock = document.getElementById('global-audio-dock');
            if (dock) {
                dock.style.display = 'none';
                dock.classList.remove('is-playing');
            }
            syncAllAudioUI();
        }

        function selectAartiAudioVersion(aartiId, trackIdx) {
            trackIdx = parseInt(trackIdx);
            audioState.userSelectedVersions[aartiId] = trackIdx;
            try {
                localStorage.setItem(getStorageKey('user_audio_versions'), JSON.stringify(audioState.userSelectedVersions));
            } catch(e) {}

            if (audioState.aartiId === aartiId) {
                playAartiAudio(aartiId, trackIdx);
            } else {
                syncAllAudioUI();
            }
        }

        function setAudioSpeed(speedVal) {
            const s = parseFloat(speedVal);
            if (!AUDIO_SPEEDS.includes(s)) return;
            audioState.speed = s;
            try {
                localStorage.setItem(getStorageKey('user_audio_speed'), s);
            } catch(e) {}

            const player = document.getElementById('bg-audio-player');
            if (player) {
                player.playbackRate = s;
            }
            syncAllAudioUI();
            showNotification(currentLang === 'hinglish' ? `Audio Speed: ${s}x` : `संगीत गति: ${s}x`);
        }

        function cycleAudioSpeed() {
            const curIdx = AUDIO_SPEEDS.indexOf(audioState.speed);
            const nextIdx = (curIdx + 1) % AUDIO_SPEEDS.length;
            setAudioSpeed(AUDIO_SPEEDS[nextIdx]);
        }

        function toggleAudioLoop() {
            audioState.isLoop = !audioState.isLoop;
            try {
                localStorage.setItem(getStorageKey('user_audio_loop'), audioState.isLoop);
            } catch(e) {}
            const player = document.getElementById('bg-audio-player');
            if (player) {
                player.loop = audioState.isLoop;
            }
            syncAllAudioUI();
            showNotification(audioState.isLoop 
                ? (currentLang === 'hinglish' ? "Audio Loop: ON" : "आरती पुनरावृत्ति: चालू") 
                : (currentLang === 'hinglish' ? "Audio Loop: OFF" : "आरती पुनरावृत्ति: विराम"));
        }

        function onAudioSeekInput(val) {
            isAudioScrubbing = true;
            const player = document.getElementById('bg-audio-player');
            if (!player || !player.duration) return;
            const targetTime = (parseFloat(val) / 100) * player.duration;
            const formatted = formatAudioTime(targetTime);

            const dockCur = document.getElementById('dock-time-cur');
            if (dockCur) dockCur.textContent = formatted;
            const cardCur = document.getElementById('card-time-cur');
            if (cardCur && isViewingPlayingAarti()) cardCur.textContent = formatted;
        }

        function onAudioSeekChange(val) {
            const player = document.getElementById('bg-audio-player');
            if (player && player.duration) {
                player.currentTime = (parseFloat(val) / 100) * player.duration;
            }
            isAudioScrubbing = false;
        }

        function jumpToCurrentAudioPage() {
            if (!audioState.aartiId) return;
            const idx = aartisData.findIndex(a => a.id === audioState.aartiId);
            if (idx !== -1) {
                jumpToAarti(idx);
            }
        }

        function syncAllAudioUI() {
            const isPlaying = audioState.isPlaying;
            const currentPlayingAarti = aartisData.find(a => a.id === audioState.aartiId);
            const trackIdx = audioState.trackIndex;
            const currentTrack = currentPlayingAarti && currentPlayingAarti.audioTracks && currentPlayingAarti.audioTracks[trackIdx] 
                ? currentPlayingAarti.audioTracks[trackIdx] 
                : null;

            // 1. Sync Global Bottom Dock
            const dock = document.getElementById('global-audio-dock');
            if (dock) {
                if (audioState.dockVisible && currentTrack) {
                    dock.style.display = 'block';
                    const dockTitle = document.getElementById('dock-track-title');
                    const dockSub = document.getElementById('dock-track-sub');
                    const dockPlayBtn = document.getElementById('dock-play-btn');
                    const dockSpeedBtn = document.getElementById('dock-speed-btn');
                    const dockSpeedSelect = document.getElementById('dock-speed-select');
                    const dockLoopBtn = document.getElementById('dock-loop-btn');

                    if (dockTitle) dockTitle.textContent = currentTrack.title;
                    if (dockSub) dockSub.textContent = `${currentTrack.artist || ''} • ${currentTrack.duration || ''}`;
                    if (dockPlayBtn) {
                        dockPlayBtn.innerHTML = isPlaying ? '⏸' : '▶';
                        dockPlayBtn.title = isPlaying ? 'रोकें (Pause)' : 'चलाएं (Play)';
                    }
                    if (dockSpeedBtn) dockSpeedBtn.textContent = `${audioState.speed}x`;
                    if (dockSpeedSelect) dockSpeedSelect.value = audioState.speed.toString();
                    if (dockLoopBtn) dockLoopBtn.classList.toggle('active', audioState.isLoop);

                    dock.classList.toggle('is-playing', isPlaying);
                } else {
                    dock.style.display = 'none';
                    dock.classList.remove('is-playing');
                }
            }

            // 2. Sync Toolbar Icon Button
            const toolAudioBtn = document.getElementById('btn-audio-toggle');
            if (toolAudioBtn) {
                toolAudioBtn.classList.toggle('active', isPlaying);
                toolAudioBtn.innerHTML = isPlaying ? '⏸️' : '🎵';
                toolAudioBtn.title = isPlaying ? 'संगीत रोकें (Pause Audio)' : 'आरती संगीत (Play Audio)';
            }

            // 3. Sync Fullscreen Toolbar Buttons
            const fsAudioBtn = document.getElementById('fs-audio-btn');
            const fsSpeedBtn = document.getElementById('fs-speed-btn');
            if (fsAudioBtn) {
                fsAudioBtn.classList.toggle('active', isPlaying);
                fsAudioBtn.innerHTML = isPlaying ? '⏸️' : '🎵';
            }
            if (fsSpeedBtn) {
                fsSpeedBtn.textContent = `${audioState.speed}x`;
            }

            // 4. Sync In-Page Card
            const card = document.getElementById('aarti-audio-card');
            if (card && currentPageIndex >= 0 && currentPageIndex < aartisData.length) {
                const curAarti = aartisData[currentPageIndex];
                const isViewingPlaying = (curAarti.id === audioState.aartiId);
                const activeTrackIdx = getSelectedTrackIndex(curAarti);
                const selectedTrack = curAarti.audioTracks && curAarti.audioTracks[activeTrackIdx];

                const cardPlayBtn = card.querySelector('.aarti-audio-play-btn');
                const cardTrackName = card.querySelector('.audio-track-name');
                const cardTrackArtist = card.querySelector('.audio-track-artist');

                if (cardPlayBtn) {
                    const thisCardPlaying = isPlaying && isViewingPlaying && (audioState.trackIndex === activeTrackIdx);
                    cardPlayBtn.innerHTML = `
                        <span class="play-icon">${thisCardPlaying ? '⏸' : '▶'}</span>
                        <span class="play-pulse-ring"></span>
                    `;
                    cardPlayBtn.title = thisCardPlaying ? 'रोकें (Pause)' : 'चलाएं (Play Music)';
                    card.classList.toggle('is-playing', thisCardPlaying);
                }

                if (selectedTrack) {
                    if (cardTrackName) cardTrackName.textContent = selectedTrack.title;
                    if (cardTrackArtist) cardTrackArtist.textContent = selectedTrack.artist || '';
                }

                card.querySelectorAll('.speed-pill-btn').forEach(btn => {
                    const s = parseFloat(btn.textContent);
                    btn.classList.toggle('active', s === audioState.speed);
                });

                const cardLoop = card.querySelector('.audio-loop-pill');
                if (cardLoop) {
                    cardLoop.classList.toggle('active', audioState.isLoop);
                    const loopTxt = cardLoop.querySelector('.loop-txt');
                    if (loopTxt) loopTxt.textContent = audioState.isLoop ? 'लूप चालू' : 'लूप';
                }

                const versionSelect = card.querySelector('.audio-version-dropdown');
                if (versionSelect) {
                    versionSelect.value = activeTrackIdx.toString();
                }
            }
        }

        /* ========================================================
           SOUND SYNTHESIS (Zero External Audio Dependency)
           Synthesized Temple Bell & Tanpura Drone via Web Audio API
        ======================================================== */
        function getAudioContext() {
            if (!audioCtx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioCtx = new AudioContext();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            return audioCtx;
        }

        function playTempleBell() {
            try {
                const ctx = getAudioContext();
                const now = ctx.currentTime;
                
                // Strike frequencies representing traditional bronze temple bell
                const freqs = [587.33, 880, 1174.66, 1760, 2637];
                const gains = [0.3, 0.25, 0.15, 0.1, 0.05];

                freqs.forEach((f, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(f, now);

                    // Realistic bell decay curve
                    gain.gain.setValueAtTime(gains[idx], now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    osc.start(now);
                    osc.stop(now + 3.3);
                });

                // Button visual pulse
                const btn = document.getElementById('bell-btn');
                btn.style.transform = 'scale(0.92)';
                setTimeout(() => btn.style.transform = '', 150);
            } catch (err) {
                console.log("Audio not supported or permitted", err);
            }
        }

        function playPageTurnSound() {
            try {
                const ctx = getAudioContext();
                const now = ctx.currentTime;

                // Soft white noise burst filtered like rustling paper
                const bufferSize = ctx.sampleRate * 0.15;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

                const noise = ctx.createBufferSource();
                noise.buffer = buffer;

                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(1200, now);
                filter.frequency.exponentialRampToValueAtTime(200, now + 0.15);

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);

                noise.start(now);
            } catch (e) {}
        }

        function toggleAmbientSound() {
            const btn = document.getElementById('chant-ambient-btn');
            const txt = document.getElementById('ambient-text');
            const ctx = getAudioContext();

            if (!isAmbientOn) {
                // Start warm devotional drone (Sa-Pa harmonic chord)
                const now = ctx.currentTime;
                ambientOsc = [];

                const chord = [146.83, 220.00, 293.66]; // D3, A3, D4
                chord.forEach((freq) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now);

                    gain.gain.setValueAtTime(0.001, now);
                    gain.gain.linearRampToValueAtTime(0.04, now + 2);

                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);

                    ambientOsc.push({ osc, gain });
                });

                isAmbientOn = true;
                btn.classList.add('active');
                txt.textContent = currentLang === 'hinglish' ? "Drone ON" : "ध्वनि चालू";
            } else {
                if (ambientOsc) {
                    const now = ctx.currentTime;
                    ambientOsc.forEach(({ osc, gain }) => {
                        gain.gain.linearRampToValueAtTime(0.0001, now + 1);
                        setTimeout(() => osc.stop(), 1100);
                    });
                    ambientOsc = null;
                }
                isAmbientOn = false;
                btn.classList.remove('active');
                txt.textContent = currentLang === 'hinglish' ? "Tanpura" : "तानपुरा";
            }
        }

        /* ========================================================
           DEVOTIONAL PETAL RAIN ANIMATION (Canvas)
        ======================================================== */
        function initPetals() {
            const canvas = document.getElementById('petal-canvas');
            const ctx = canvas.getContext('2d');
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;

            window.addEventListener('resize', () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            });

            const petalCount = 28;
            const petals = [];

            for (let i = 0; i < petalCount; i++) {
                petals.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 6 + 4,
                    speedY: Math.random() * 1.2 + 0.6,
                    speedX: Math.random() * 1 - 0.5,
                    angle: Math.random() * 360,
                    spin: Math.random() * 2 - 1,
                    color: Math.random() > 0.4 ? 'rgba(255, 140, 0, 0.7)' : 'rgba(255, 105, 180, 0.6)'
                });
            }

            function draw() {
                ctx.clearRect(0, 0, width, height);

                if (isPetalsActive) {
                    petals.forEach(p => {
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        ctx.rotate((p.angle * Math.PI) / 180);
                        ctx.beginPath();
                        ctx.fillStyle = p.color;
                        ctx.ellipse(0, 0, p.r, p.r * 1.6, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();

                        p.y += p.speedY;
                        p.x += Math.sin(p.angle * 0.05) * 0.7 + p.speedX;
                        p.angle += p.spin;

                        if (p.y > height + 20) {
                            p.y = -20;
                            p.x = Math.random() * width;
                        }
                    });
                }
                requestAnimationFrame(draw);
            }
            draw();
        }

        function togglePetals() {
            isPetalsActive = !isPetalsActive;
            showNotification(isPetalsActive ? "पुष्प वर्षा प्रारम्भ (Petals ON)" : "पुष्प वर्षा विराम (Petals OFF)");
        }
