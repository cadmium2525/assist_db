/**
 * メインアプリケーションロジック
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 定数定義 (タグ・タイプ等)
    const TAGS = {
        rarity: ["MR", "SSR", "SR", "R"],
        monType: ["無機", "創造", "幻霊", "魔族", "獣族", "怪物"],
        aura: ["赤", "青", "黄", "緑", "白", "黒"],
        cardType: [
            "ライフ", "ちから", "かしこさ", "命中", "回避", "丈夫さ",
            "友人", "英雄", "ライバル", "タフネス", "アサルト", "テクニック",
            "フィジカル", "アキュメン", "インパクト", "ガード", "フォース",
            "ジャッジ", "サバイブ", "クイック", "ルミナス", "フォーカス",
            "メンタル", "バイタル"
        ],
        event1: ["攻撃UP", "追撃", "完全回避", "シールド", "必中", "デバフ", "クリ率up", "連撃無効", "被ダメカット"],
        event2Distance: ["零距離", "近距離", "中距離", "遠距離"],
        event2Terrain: ["雪山", "火山", "砂漠", "海岸", "森林"],
        event2State: ["超必死", "超本気", "超闘魂", "超根性", "超逆上"],
        event3: ["攻撃UP", "追撃", "完全回避", "シールド", "必中", "デバフ", "クリ率up", "連撃無効", "被ダメカット"]
    };

    // 状態管理
    let allCards = [];
    let currentFilters = {
        rarity: [],
        monType: [],
        aura: [],
        cardType: [],
        eventTags: [],
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
        event3: { cropper: null, blob: null }
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
            btn.onclick = () => modal.classList.add('open');
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
    setupModal('btnOpenEvent2Search', 'event2BottomSheet', 'close-btn');
    setupModal('btnOpenRegister', 'registerModal', 'back-btn');

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

        renderGroup('regEvent1Tags', TAGS.event1, 'checkbox', 'regEvent1Tags');
        renderGroup('regEvent2Tags', [...TAGS.event2Distance, ...TAGS.event2Terrain, ...TAGS.event2State], 'radio', 'regEvent2Tags');
        renderGroup('regEvent3Tags', TAGS.event3, 'checkbox', 'regEvent3Tags');

        // タイプ選択セレクトボックス
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
        renderGroup('filterEventTags', TAGS.event1); // event1とevent3は同じマスタを使用している前提
        renderGroup('filterEvent2Distance', TAGS.event2Distance);
        renderGroup('filterEvent2Terrain', TAGS.event2Terrain);
        renderGroup('filterEvent2State', TAGS.event2State);
    }

    // --- データ統合と表示 ---
    async function refreshApp() {
        const userCards = await dbManager.getAll();
        const masterCards = window.MASTER_ASSISTS || [];
        allCards = [...masterCards, ...userCards];
        renderCards();
    }

    function renderCards() {
        const container = document.getElementById('cardList');
        container.innerHTML = '';

        const filtered = allCards.filter(card => {
            if (currentFilters.keyword && !card.name.includes(currentFilters.keyword)) return false;
            if (currentFilters.rarity.length > 0 && !currentFilters.rarity.includes(card.rarity)) return false;
            if (currentFilters.monType.length > 0 && !currentFilters.monType.includes(card.monType)) return false;
            if (currentFilters.aura.length > 0 && !currentFilters.aura.includes(card.aura)) return false;
            if (currentFilters.cardType.length > 0 && !currentFilters.cardType.includes(card.cardType)) return false;

            // 能力フィルター (統合)
            if (currentFilters.eventTags.length > 0) {
                const e1 = card.events?.event1 || [];
                const e3 = card.events?.event3 || [];
                // 選択されたすべてのタグが、e1またはe3のいずれかに含まれているかを確認 (AND検索の場合)
                // もしくは、いずれかのタグが含まれていればOKとするなら some(every) 等に調整可能。
                // ここでは「選択されたタグ条件をすべて満たしている(いずれかの枠で)」とする
                if (!currentFilters.eventTags.every(tag => e1.includes(tag) || e3.includes(tag))) return false;
            }

            const e2 = card.events?.event2 || [];
            if (currentFilters.event2Distance.length > 0) {
                if (!currentFilters.event2Distance.some(tag => e2.includes(tag))) return false;
            }
            if (currentFilters.event2Terrain.length > 0) {
                if (!currentFilters.event2Terrain.some(tag => e2.includes(tag))) return false;
            }
            if (currentFilters.event2State.length > 0) {
                if (!currentFilters.event2State.some(tag => e2.includes(tag))) return false;
            }
            return true;
        });

        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        filtered.forEach(card => {
            const div = document.createElement('div');
            div.className = 'card-grid-item';
            const src = getImgSrc(card.images.card);
            div.innerHTML = `
                <img src="${src}" alt="${card.name}" loading="lazy">
                <div class="rarity-badge">${card.rarity}</div>
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

        body.innerHTML = `
            <img src="${cardImg}" class="detail-main-img">
            <div class="detail-info-grid">
                <div class="detail-info-item"><label>レアリティ</label><span>${card.rarity}</span></div>
                <div class="detail-info-item"><label>タイプ</label><span>${card.cardType || 'なし'}</span></div>
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

            ${card.source === 'user' ? `
                <div class="action-footer" style="margin-top:20px;">
                    <button id="btnExportCard" class="secondary-btn" style="flex:1;">JSON出力</button>
                    <button id="btnDeleteCard" class="secondary-btn" style="flex:1; color:#ef4444; border-color:#ef4444;">削除</button>
                </div>
            ` : ''}
        `;

        if (card.source === 'user') {
            document.getElementById('btnDeleteCard').onclick = async () => {
                if (confirm('このカードを削除しますか？')) {
                    await dbManager.delete(card.id);
                    modal.classList.remove('open');
                    await refreshApp();
                }
            };
            document.getElementById('btnExportCard').onclick = () => exportToJSON(card);
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

        document.getElementById('filterBottomSheet').classList.remove('open');
        renderCards();
    };

    document.getElementById('btnResetFilter').onclick = () => {
        document.querySelectorAll('#filterBottomSheet input:checked').forEach(i => i.checked = false);
        // モードをデフォルト(OR)に戻すUI
        const orBtn = document.querySelector('#eventTagsMode button[data-mode="OR"]');
        if (orBtn) orBtn.click();
        document.getElementById('btnApplyFilter').click();
    };

    document.getElementById('btnApplyEvent2').onclick = () => {
        currentFilters.event2Distance = Array.from(document.querySelectorAll('#filterEvent2Distance input:checked')).map(i => i.value);
        currentFilters.event2Terrain = Array.from(document.querySelectorAll('#filterEvent2Terrain input:checked')).map(i => i.value);
        currentFilters.event2State = Array.from(document.querySelectorAll('#filterEvent2State input:checked')).map(i => i.value);
        document.getElementById('event2BottomSheet').classList.remove('open');
        renderCards();
    };

    document.getElementById('btnResetEvent2').onclick = () => {
        document.querySelectorAll('#event2BottomSheet input:checked').forEach(i => i.checked = false);
        document.getElementById('btnApplyEvent2').click();
    };

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
            state.cropper.getCroppedCanvas().toBlob((blob) => {
                state.blob = blob;
                const url = URL.createObjectURL(blob);
                document.getElementById(previewId).innerHTML = `<img src="${url}">`;
                document.getElementById(cropAreaId).style.display = 'none';
            }, 'image/png');
        };
    }

    // 各画像のセットアップ
    setupImageCropper('card', 'inputCardImg', 'cropArea', 'cropImage', 'aspectRatioSelector', 'btnDoCrop', 'previewCardImg');
    setupImageCropper('event1', 'inputEvent1Img', 'cropAreaEvent1', 'cropImageEvent1', 'aspectRatioSelectorEvent1', 'btnDoCropEvent1', 'previewEvent1Img');
    setupImageCropper('event3', 'inputEvent3Img', 'cropAreaEvent3', 'cropImageEvent3', 'aspectRatioSelectorEvent3', 'btnDoCropEvent3', 'previewEvent3Img');

    // --- カード保存 ---
    document.getElementById('btnSaveCard').onclick = async () => {
        const form = document.getElementById('cardForm');
        if (!form.checkValidity()) return form.reportValidity();
        if (!cropStates.card.blob) return alert('メイン画像を確定させてください');

        const formData = new FormData(form);
        const getCheckedValues = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);

        const newCard = {
            id: crypto.randomUUID(),
            name: formData.get('name'),
            rarity: formData.get('rarity'),
            monType: formData.get('monType'),
            aura: formData.get('aura'),
            cardType: formData.get('cardType'),
            images: {
                card: cropStates.card.blob,
                event1: cropStates.event1.blob || null,
                event3: cropStates.event3.blob || null
            },
            events: {
                event1: getCheckedValues('regEvent1Tags'),
                event2: getCheckedValues('regEvent2Tags'),
                event3: getCheckedValues('regEvent3Tags')
            },
            source: 'user',
            createdAt: new Date().toISOString()
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
        document.getElementById('registerModal').classList.remove('open');
        await refreshApp();
    };

    // --- JSONエクスポート ---
    function exportToJSON(card) {
        const data = {
            name: card.name,
            rarity: card.rarity,
            monType: card.monType,
            aura: card.aura,
            cardType: card.cardType,
            events: {
                event1: card.events.event1 || [],
                event2: card.events.event2 || [],
                event3: card.events.event3 || []
            },
            images: {
                card: card.name + ".png",
                event1: card.name + "_event1.png",
                event3: card.name + "_event3.png"
            }
        };
        const json = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(json).then(() => {
            alert('JSONをクリップボードにコピーしました。');
        }).catch(() => {
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${card.name}.json`;
            a.click();
        });
    }
});
