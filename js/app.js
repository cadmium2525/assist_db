/**
 * メインアプリケーションロジック
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 定数定義 (タグ・カードタイプ等)
    const COMMON_EVENT_TAGS = ["ステup", "クリダメup", "命中率up", "クリ率up", "ステ連撃", "ダメ連撃", "アディション", "完全回避", "シールド", "必中", "デバフ", "連撃軽減・無効・回避", "クリ無効", "被ダメカット", "被ダメ軽減", "ガッツ回復"];
    const HIRAMEKI_TAGS = ["不屈", "堅固", "シールド", "連撃", "クリダメup", "守護"];

    const TAGS = {
        rarity: ["MR", "SSR", "SR", "R"],
        monType: ["無し", "無機", "創造", "幻霊", "魔族", "獣族", "怪物"],
        aura: ["赤", "青", "黄", "緑", "白", "黒"],
        cardType: [
            "ライフ", "ちから", "かしこさ", "命中", "回避", "丈夫さ",
            "友人", "英雄", "ライバル", "タフネス", "アサルト", "テクニック",
            "フィジカル", "アキュメン", "インパクト", "ガード", "フォース",
            "ジャッジ", "サバイブ", "クイック", "ルミナス", "フォーカス",
            "メンタル", "バイタル"
        ],
        eventTags: COMMON_EVENT_TAGS, // 能力①・③共通
        hiramekiTags: HIRAMEKI_TAGS, // ひらめき能力
        event2Distance: ["零距離", "近距離", "中距離", "遠距離"],
        event2Terrain: ["雪山", "火山", "砂漠", "海岸", "森林"],
        event2State: ["超必死", "超本気", "超闘魂", "超根性", "超逆上", "超憤怒", "超余裕"]
    };

    // 状態管理
    let allCards = [];
    let editingCardId = null; // 編集中のカードID
    let currentFilters = {
        rarity: [],
        monType: [],
        aura: [],
        cardType: [],
        eventTags: [],
        hiramekiTags: [], // 追加
        eventTagsMode: 'OR', // 追加
        event2Distance: [],
        event2Terrain: [],
        event2State: [],
        keyword: ''
    };

    // クロップ管理
    const cropStates = {
        card: { cropper: null, blob: null },
        event1: { cropper: null, blob: null },
        event3: { cropper: null, blob: null },
        hirameki: { cropper: null, blob: null } // 追加
    };

    // 初期化
    await dbManager.init();
    renderRegUI(); // 登録用UI
    renderFilterUI(); // フィルタ用UI
    await refreshApp();

    // --- UI制御 (モーダル・ボトムシート) ---
    const setupModal = (btnId, modalId, closeClass) => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        if (btn && modal) {
            btn.onclick = () => {
                if (modalId === 'registerModal') {
                    // 新規登録時は状態リセット
                    editingCardId = null;
                    document.getElementById('cardForm').reset();
                    resetCropStates();
                }
                modal.classList.add('open');
            };
            modal.onclick = (e) => {
                if (e.target.classList.contains('bottom-sheet') || e.target.classList.contains('close-btn') || e.target.classList.contains('back-btn')) {
                    modal.classList.remove('open');
                }
            };
            const closes = modal.querySelectorAll('.' + closeClass + ', [data-close="' + modalId + '"]');
            closes.forEach(c => c.onclick = () => modal.classList.remove('open'));
        }
    };

    setupModal('btnOpenFilter', 'filterBottomSheet', 'close-btn');
    setupModal('btnOpenRegister', 'registerModal', 'back-btn');
    setupModal('btnOpenHelp', 'helpBottomSheet', 'close-btn');

    // タブ切り替えロジック
    const setupTabs = () => {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        tabBtns.forEach(btn => {
            btn.onclick = () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const target = document.getElementById(btn.dataset.tab);
                if (target) target.classList.add('active');
            };
        });
    };
    setupTabs();

    // 追加依頼フォームの処理
    const btnRequest = document.getElementById('btnOpenRequestForm');
    if (btnRequest) {
        btnRequest.onclick = () => {
            const confirmed = confirm('アシストカードの追加依頼を行うフォームにジャンプします。続けますか？');
            if (confirmed) {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSfY46OUNV1cMD3-CQ-0xkasoywG5hJtLAeZtDcFd7cenEsrHw/viewform?usp=publish-editor', '_blank');
            }
        };
    }

    // 詳細表示モーダルの閉じるロジック
    const detailModal = document.getElementById('detailBottomSheet');
    detailModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('bottom-sheet') || e.target.classList.contains('close-btn')) {
            detailModal.classList.remove('open');
        }
    });
    detailModal.querySelectorAll('[data-close="detailBottomSheet"]').forEach(c => {
        c.onclick = () => detailModal.classList.remove('open');
    });

    // --- UI レンダリング ---
    function renderRegUI() {
        const renderGroup = (id, tags, type = 'checkbox', name) => {
            const container = document.getElementById(id);
            if (!container) return;
            container.innerHTML = tags.map(tag => `
                <label class="chip">
                    <input type="${type}" name="${name || id}" value="${tag}">
                    <span>${tag}</span>
                </label>
            `).join('');
        };

        renderGroup('regEvent1Tags', TAGS.eventTags, 'checkbox', 'regEvent1Tags');
        renderGroup('regEvent2Tags', [...TAGS.event2Distance, ...TAGS.event2Terrain, ...TAGS.event2State], 'radio', 'regEvent2Tags');
        renderGroup('regEvent3Tags', TAGS.eventTags, 'checkbox', 'regEvent3Tags');
        renderGroup('regHiramekiTags', TAGS.hiramekiTags, 'checkbox', 'regHiramekiTags');

        // 登録用オーラアイコン
        const regAuraContainer = document.getElementById('regAura');
        if (regAuraContainer) {
            regAuraContainer.innerHTML = TAGS.aura.map(tag => `
                <label class="chip">
                    <input type="radio" name="aura" value="${tag}" required>
                    <span><img src="${getAuraIcon(tag)}" alt="${tag}" title="${tag}" class="aura-icon-mini"></span>
                </label>
            `).join('');
        }

        // カードタイプ選択セレクトボックス
        const typeSelect = document.getElementById('regCardType');
        if (typeSelect) {
            typeSelect.innerHTML = TAGS.cardType.map(t => `<option value="${t}">${t}</option>`).join('');
        }
    }

    function renderFilterUI() {
        // 通常のタググループ
        const renderGroup = (id, tags) => {
            const container = document.getElementById(id);
            if (!container) return;
            container.innerHTML = tags.map(tag => `
                <label class="chip">
                    <input type="checkbox" value="${tag}">
                    <span>${tag}</span>
                </label>
            `).join('');
        };

        // オーラアイコン用
        const renderAuraGroup = (id, tags) => {
            const container = document.getElementById(id);
            if (!container) return;
            container.innerHTML = tags.map(tag => `
                <label class="chip">
                    <input type="checkbox" value="${tag}">
                    <span><img src="${getAuraIcon(tag)}" alt="${tag}" title="${tag}" class="aura-icon-mini"></span>
                </label>
            `).join('');
        };

        renderAuraGroup('filterAura', TAGS.aura);
        renderGroup('filterCardType', TAGS.cardType);
        renderGroup('filterEventTags', TAGS.eventTags);
        renderGroup('filterHiramekiTags', TAGS.hiramekiTags); // 追加
        renderGroup('filterEvent2Distance', TAGS.event2Distance);
        renderGroup('filterEvent2Terrain', TAGS.event2Terrain);
        renderGroup('filterEvent2State', TAGS.event2State);

    }

    // --- データ統合と表示 ---
    async function refreshApp() {
        const userCards = await dbManager.getAll();
        const masterCards = window.MASTER_ASSISTS || [];

        // 重複チェック: マスターデータに同じ名前があればマイカードを削除
        const masterNames = new Set(masterCards.map(c => c.name));
        for (const uCard of userCards) {
            if (masterNames.has(uCard.name)) {
                console.log(`マスターデータとの重複を検出: ${uCard.name} を削除します。`);
                await dbManager.delete(uCard.id);
            }
        }

        // 削除後に最新を取得し直す
        const finalUserCards = await dbManager.getAll();
        allCards = [...masterCards, ...finalUserCards];
        renderCards();
    }

    function renderCards() {
        const container = document.getElementById('cardList');
        container.innerHTML = '';

        const filtered = allCards.filter(card => {
            if (currentFilters.keyword) {
                const searchStr = hiraToKana(currentFilters.keyword.toLowerCase());
                const cardName = hiraToKana(card.name.toLowerCase());
                if (!cardName.includes(searchStr)) return false;
            }
            if (currentFilters.rarity.length > 0 && !currentFilters.rarity.includes(card.rarity)) return false;
            if (currentFilters.monType.length > 0 && !currentFilters.monType.includes(card.monType)) return false;
            if (currentFilters.aura.length > 0 && !currentFilters.aura.includes(card.aura)) return false;
            if (currentFilters.cardType.length > 0 && !currentFilters.cardType.includes(card.cardType)) return false;

            // 能力フィルター (統合 & AND/OR切替)
            if (currentFilters.eventTags.length > 0) {
                const e1 = card.events?.event1 || [];
                const e3 = card.events?.event3 || [];
                const combined = [...e1, ...e3];

                if (currentFilters.eventTagsMode === 'AND') {
                    // すべての選択タグが、いずれかの能力枠に含まれている
                    if (!currentFilters.eventTags.every(tag => combined.includes(tag))) return false;
                } else {
                    // いずれかの選択タグが、いずれかの能力枠に含まれている
                    if (!currentFilters.eventTags.some(tag => combined.includes(tag))) return false;
                }
            }

            // ひらめき能力フィルター
            if (currentFilters.hiramekiTags.length > 0) {
                const h = card.events?.hirameki || [];
                if (!currentFilters.hiramekiTags.some(tag => h.includes(tag))) return false;
            }

            const e2 = card.events?.event2 || [];
            const selectedE2Tags = [
                ...currentFilters.event2Distance,
                ...currentFilters.event2Terrain,
                ...currentFilters.event2State
            ];
            if (selectedE2Tags.length > 0) {
                // E2検索はOR検索（いずれかに一致すればOK）
                if (!selectedE2Tags.some(tag => e2.includes(tag))) return false;
            }
            return true;
        });

        // ソート: レアリティ順 (MR > SSR > SR > R) -> オーラ順 (赤青黄緑白黒) -> その中で新しい順
        const rarityPriority = { "MR": 4, "SSR": 3, "SR": 2, "R": 1 };
        const auraPriority = { "赤": 1, "青": 2, "黄": 3, "緑": 4, "白": 5, "黒": 6 };

        filtered.sort((a, b) => {
            const rA = rarityPriority[a.rarity] || 0;
            const rB = rarityPriority[b.rarity] || 0;
            if (rA !== rB) return rB - rA; // レアリティが高い順

            const auA = auraPriority[a.aura] || 99;
            const auB = auraPriority[b.aura] || 99;
            if (auA !== auB) return auA - auB; // オーラ順 (指定順)

            return new Date(b.createdAt) - new Date(a.createdAt); // 日時が新しい順
        });

        filtered.forEach(card => {
            const div = document.createElement('div');
            div.className = 'card-grid-item';
            const src = getImgSrc(card.images.card);
            const auraIcon = getAuraIcon(card.aura);
            div.innerHTML = `
                <img src="${src}" alt="${card.name}" loading="lazy">
                <div class="rarity-badge">${card.rarity}</div>
                <img src="${auraIcon}" class="aura-badge" alt="${card.aura}">
            `;
            div.onclick = () => showDetail(card);
            container.appendChild(div);
        });
    }

    function getImgSrc(pathOrBlob) {
        if (pathOrBlob instanceof Blob) return URL.createObjectURL(pathOrBlob);
        return pathOrBlob || '';
    }

    function getAuraIcon(aura) {
        const iconMap = { '赤': 'red.PNG', '青': 'blue.PNG', '黄': 'yellow.PNG', '緑': 'green.PNG', '白': 'white.PNG', '黒': 'black.PNG' };
        const fileName = iconMap[aura] || 'white.PNG';
        return `images/icon/${fileName}`;
    }

    // --- 詳細表示 ---
    function showDetail(card) {
        const modal = document.getElementById('detailBottomSheet');
        const body = document.getElementById('detailBody');

        document.getElementById('detailName').textContent = card.name;

        const cardImg = getImgSrc(card.images.card);
        const e1Img = getImgSrc(card.images.event1);
        const e3Img = getImgSrc(card.images.event3);
        const hImg = getImgSrc(card.images.hirameki);

        body.innerHTML = `
            <img src="${cardImg}" class="detail-main-img">
            <div class="detail-info-grid">
                <div class="detail-info-item"><label>レアリティ</label><span>${card.rarity}</span></div>
                <div class="detail-info-item"><label>カードタイプ</label><span>${card.cardType || 'なし'}</span></div>
                <div class="detail-info-item"><label>モン類</label><span>${card.monType}</span></div>
                <div class="detail-info-item"><label>オーラ</label><span><img src="${getAuraIcon(card.aura)}" class="aura-icon-mini"> ${card.aura}</span></div>
                <div class="detail-info-item"><label>データ種別</label><span>${card.source === 'master' ? 'マスターデータ' : 'マイカード'}</span></div>
            </div>

            <div class="detail-event-section">
                <div class="detail-event-header">
                    <h4>イベント①</h4>
                </div>
                ${e1Img ? `<img src="${e1Img}" class="detail-event-img">` : ''}
                <div class="detail-event-tags">
                    ${card.events.event1.length > 0 ? card.events.event1.map(t => `<span class="detail-event-tag">${t}</span>`).join('') : '<span style="color:var(--text-muted); font-size:12px;">なし</span>'}
                </div>
            </div>

            <div class="detail-event-section">
                <div class="detail-event-header">
                    <h4>イベント②</h4>
                </div>
                <div class="detail-event-tags">
                    ${card.events.event2.length > 0 ? card.events.event2.map(t => `<span class="detail-event-tag">${t}</span>`).join('') : '<span style="color:var(--text-muted); font-size:12px;">なし</span>'}
                </div>
            </div>

            <div class="detail-event-section">
                <div class="detail-event-header">
                    <h4>イベント③</h4>
                </div>
                ${e3Img ? `<img src="${e3Img}" class="detail-event-img">` : ''}
                <div class="detail-event-tags">
                    ${card.events.event3.length > 0 ? card.events.event3.map(t => `<span class="detail-event-tag">${t}</span>`).join('') : '<span style="color:var(--text-muted); font-size:12px;">なし</span>'}
                </div>
            </div>

            <div class="detail-event-section">
                <div class="detail-event-header">
                    <h4>ひらめき能力</h4>
                </div>
                ${hImg ? `<img src="${hImg}" class="detail-event-img">` : ''}
                <div class="detail-event-tags">
                    ${card.events.hirameki?.length > 0 ? card.events.hirameki.map(t => `<span class="detail-event-tag">${t}</span>`).join('') : '<span style="color:var(--text-muted); font-size:12px;">なし</span>'}
                </div>
            </div>

             ${card.source === 'user' ? `
                <div class="action-footer" style="margin-top:20px;">
                    <button id="btnEditCard" class="primary-btn" style="flex:1;">編集</button>
                    <button id="btnExportCard" class="secondary-btn" style="flex:1;">JSON出力</button>
                    <button id="btnDeleteCard" class="secondary-btn" style="flex:1; color:#ef4444; border-color:#ef4444;">削除</button>
                </div>
            ` : ''}
        `;

        if (card.source === 'user') {
            document.getElementById('btnEditCard').onclick = () => {
                modal.classList.remove('open');
                openEditModal(card);
            };
            document.getElementById('btnDeleteCard').onclick = async () => {
                if (confirm('このカードを削除しますか？')) {
                    await dbManager.delete(card.id);
                    modal.classList.remove('open');
                    await refreshApp();
                }
            };
            document.getElementById('btnExportCard').onclick = () => exportToJSON(card);
        }

        // DOM更新後にスクロール位置を強制リセット (タイミングを少し遅らせる)
        const content = modal.querySelector('.bottom-sheet-content');
        if (content) {
            setTimeout(() => {
                content.scrollTo({ top: 0, behavior: 'instant' });
            }, 10);
        }

        modal.classList.add('open');
    }

    // --- 検索・フィルタリング UI 操作 ---
    document.getElementById('searchInput').oninput = (e) => {
        currentFilters.keyword = e.target.value;
        renderCards();
    };

    // セグメントコントロール (AND/OR) の切り替え
    document.querySelectorAll('#eventTagsMode button').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('#eventTagsMode button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.eventTagsMode = btn.dataset.mode;
        };
    });

    document.getElementById('btnApplyFilter').onclick = () => {
        currentFilters.rarity = Array.from(document.querySelectorAll('#filterRarity input:checked')).map(i => i.value);
        currentFilters.monType = Array.from(document.querySelectorAll('#filterMonType input:checked')).map(i => i.value);
        currentFilters.aura = Array.from(document.querySelectorAll('#filterAura input:checked')).map(i => i.value);
        currentFilters.cardType = Array.from(document.querySelectorAll('#filterCardType input:checked')).map(i => i.value);
        currentFilters.eventTags = Array.from(document.querySelectorAll('#filterEventTags input:checked')).map(i => i.value);
        currentFilters.hiramekiTags = Array.from(document.querySelectorAll('#filterHiramekiTags input:checked')).map(i => i.value); // 追加

        // E2検索条件も統合して取得
        currentFilters.event2Distance = Array.from(document.querySelectorAll('#filterEvent2Distance input:checked')).map(i => i.value);
        currentFilters.event2Terrain = Array.from(document.querySelectorAll('#filterEvent2Terrain input:checked')).map(i => i.value);
        currentFilters.event2State = Array.from(document.querySelectorAll('#filterEvent2State input:checked')).map(i => i.value);

        document.getElementById('filterBottomSheet').classList.remove('open');
        renderCards();
    };

    document.getElementById('btnResetFilter').onclick = () => {
        document.querySelectorAll('#filterBottomSheet input:checked').forEach(i => i.checked = false);
        // モードをデフォルト(OR)に戻すUI
        const orBtn = document.querySelector('#eventTagsMode button[data-mode="OR"]');
        if (orBtn) orBtn.click();

        // タブも一番左(共通)に戻す
        const firstTab = document.querySelector('.tab-btn[data-tab="tabCommon"]');
        if (firstTab) firstTab.click();

        document.getElementById('btnApplyFilter').click();
    };

    /**
     * ひらがなをカタカナに変換するヘルパー
     */
    function hiraToKana(str) {
        return str.replace(/[\u3041-\u3096]/g, function (match) {
            const chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    }



    // --- 共通クロップ処理関数 ---
    function setupImageCropper(key, inputId, cropAreaId, cropImgId, ratioSelectorId, btnDoCropId, previewId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const area = document.getElementById(cropAreaId);
                const img = document.getElementById(cropImgId);
                img.src = event.target.result;
                area.style.display = 'block';

                if (cropStates[key].cropper) cropStates[key].cropper.destroy();
                cropStates[key].cropper = new Cropper(img, {
                    aspectRatio: 1,
                    viewMode: 1,
                });

                const selector = document.getElementById(ratioSelectorId);
                const buttons = selector.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.onclick = () => {
                        buttons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        const ratio = parseFloat(btn.dataset.ratio);
                        cropStates[key].cropper.setAspectRatio(ratio);
                    };
                });
            };
            reader.readAsDataURL(file);
        };

        document.getElementById(btnDoCropId).onclick = () => {
            const state = cropStates[key];
            if (!state.cropper) return;

            // 解像度制限の設定 (メイン画像は800px, それ以外は400px)
            const maxDim = (key === 'card') ? 800 : 400;

            // WebP形式への圧縮と解像度制限
            state.cropper.getCroppedCanvas({
                maxWidth: maxDim,
                maxHeight: maxDim,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high'
            }).toBlob((blob) => {
                state.blob = blob;
                const url = URL.createObjectURL(blob);
                document.getElementById(previewId).innerHTML = `<img src="${url}">`;
                document.getElementById(cropAreaId).style.display = 'none';
                console.log(`Image Optimized (${key}): ${Math.round(blob.size / 1024)} KB`);
            }, 'image/webp', 0.82); // WebP形式、クオリティ0.82
        };
    }

    // 各画像のセットアップ
    setupImageCropper('card', 'inputCardImg', 'cropArea', 'cropImage', 'aspectRatioSelector', 'btnDoCrop', 'previewCardImg');
    setupImageCropper('event1', 'inputEvent1Img', 'cropAreaEvent1', 'cropImageEvent1', 'aspectRatioSelectorEvent1', 'btnDoCropEvent1', 'previewEvent1Img');
    setupImageCropper('event3', 'inputEvent3Img', 'cropAreaEvent3', 'cropImageEvent3', 'aspectRatioSelectorEvent3', 'btnDoCropEvent3', 'previewEvent3Img');
    setupImageCropper('hirameki', 'inputHiramekiImg', 'cropAreaHirameki', 'cropImageHirameki', 'aspectRatioSelectorHirameki', 'btnDoCropHirameki', 'previewHiramekiImg');

    // --- カード編集モード ---
    function openEditModal(card) {
        editingCardId = card.id;
        const form = document.getElementById('cardForm');
        document.querySelector('#registerModal h2').textContent = 'カード編集';
        document.getElementById('btnSaveCard').textContent = '更新';

        // 値のセット
        form.name.value = card.name;
        form.rarity.value = card.rarity;
        form.monType.value = card.monType;
        form.cardType.value = card.cardType;

        // オーラ
        const auraInput = form.querySelector(`input[name="aura"][value="${card.aura}"]`);
        if (auraInput) auraInput.checked = true;

        // タグの復元
        const setTags = (containerId, tags) => {
            const inputs = document.querySelectorAll(`#${containerId} input`);
            inputs.forEach(i => i.checked = tags.includes(i.value));
        };
        setTags('regEvent1Tags', card.events.event1);
        setTags('regEvent2Tags', card.events.event2);
        setTags('regEvent3Tags', card.events.event3);
        setTags('regHiramekiTags', card.events.hirameki || []);

        // 画像のプレビュー (既存)
        document.getElementById('previewCardImg').innerHTML = `<img src="${getImgSrc(card.images.card)}">`;
        document.getElementById('previewEvent1Img').innerHTML = card.images.event1 ? `<img src="${getImgSrc(card.images.event1)}">` : '';
        document.getElementById('previewEvent3Img').innerHTML = card.images.event3 ? `<img src="${getImgSrc(card.images.event3)}">` : '';
        document.getElementById('previewHiramekiImg').innerHTML = card.images.hirameki ? `<img src="${getImgSrc(card.images.hirameki)}">` : '';

        // クロップ用の一時保持（変更しない場合はこれを使う）
        cropStates.card.blob = card.images.card;
        cropStates.event1.blob = card.images.event1;
        cropStates.event3.blob = card.images.event3;
        cropStates.hirameki.blob = card.images.hirameki;

        document.getElementById('registerModal').classList.add('open');
    }

    function resetCropStates() {
        Object.keys(cropStates).forEach(k => {
            cropStates[k].blob = null;
            if (cropStates[k].cropper) cropStates[k].cropper.destroy();
            cropStates[k].cropper = null;
        });
        document.getElementById('previewCardImg').innerHTML = '';
        document.getElementById('previewEvent1Img').innerHTML = '';
        document.getElementById('previewEvent3Img').innerHTML = '';
        document.getElementById('previewHiramekiImg').innerHTML = '';
        document.querySelector('#registerModal h2').textContent = 'カード登録';
        document.getElementById('btnSaveCard').textContent = '保存';
    }

    // --- カード保存 ---
    document.getElementById('btnSaveCard').onclick = async () => {
        const form = document.getElementById('cardForm');
        if (!form.checkValidity()) return form.reportValidity();
        if (!cropStates.card.blob) return alert('メイン画像を確定させてください');

        const formData = new FormData(form);
        const getCheckedValues = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);

        const newCard = {
            id: editingCardId || crypto.randomUUID(),
            name: formData.get('name'),
            rarity: formData.get('rarity'),
            monType: formData.get('monType'),
            aura: formData.get('aura'),
            cardType: formData.get('cardType'),
            images: {
                card: cropStates.card.blob,
                event1: cropStates.event1.blob || null,
                event3: cropStates.event3.blob || null,
                hirameki: cropStates.hirameki.blob || null
            },
            events: {
                event1: getCheckedValues('regEvent1Tags'),
                event2: getCheckedValues('regEvent2Tags'),
                event3: getCheckedValues('regEvent3Tags'),
                hirameki: getCheckedValues('regHiramekiTags')
            },
            source: 'user',
            createdAt: editingCardId ? allCards.find(c => c.id === editingCardId)?.createdAt : new Date().toISOString()
        };

        await dbManager.save(newCard);

        // リセット
        form.reset();
        Object.keys(cropStates).forEach(k => {
            cropStates[k].blob = null;
            if (cropStates[k].cropper) cropStates[k].cropper.destroy();
            cropStates[k].cropper = null;
        });
        document.getElementById('previewCardImg').innerHTML = '';
        document.getElementById('previewEvent1Img').innerHTML = '';
        document.getElementById('previewEvent3Img').innerHTML = '';
        document.getElementById('previewHiramekiImg').innerHTML = '';
        document.getElementById('registerModal').classList.remove('open');
        await refreshApp();
    };

    // --- JSONエクスポート ---
    function exportToJSON(card) {
        // data.js の形式に合わせる
        const data = {
            id: card.id, // 必要に応じて管理者が修正
            name: card.name,
            rarity: card.rarity,
            monType: card.monType,
            aura: card.aura,
            cardType: card.cardType,
            images: {
                // マスターデータでは images/assist/ 配下を想定
                card: `images/assist/${card.name}.png`,
                event1: card.images.event1 ? `images/assist/${card.name}_event1.png` : null,
                event3: card.images.event3 ? `images/assist/${card.name}_event3.png` : null,
                hirameki: card.images.hirameki ? `images/assist/${card.name}_hirameki.png` : null
            },
            events: {
                event1: card.events.event1 || [],
                event2: card.events.event2 || [],
                event3: card.events.event3 || [],
                hirameki: card.events.hirameki || []
            },
            source: "master", // マスターデータとして扱う
            createdAt: card.createdAt
        };

        // 貼り付けやすいように、末尾にカンマをつけた整形済みJSオブジェクト風の文字列にする
        const jsonContent = JSON.stringify(data, null, 4) + ",";

        // ダウンロード処理
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${card.name}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
