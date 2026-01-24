/**
 * マスターデータ定義
 * 管理者はこのファイルを直接編集してカードを追加する
 */
window.MASTER_ASSISTS = [
    {
        id: "master-001",
        name: "[スターギフト]ギフトン",
        rarity: "MR",
        monType: "無機",
        aura: "黄",
        cardType: "アサルト",
        images: {
            card: "images/assist/[スターギフト]ギフトン.png",
            event1: "images/assist/[スターギフト]ギフトン_event1.png",
            event3: "images/assist/[スターギフト]ギフトン_event3.png"
        },
        events: {
            event1: ["クリ無効", "ステ連撃"],
            event2: ["雪山"],
            event3: ["完全回避", "ステ連撃"]
        },
        source: "master",
        createdAt: "2024-01-01T00:00:00Z"
    },
    {
        id: "master-002",
        name: "[ニャー]リッピー",
        rarity: "MR",
        monType: "無機",
        aura: "白",
        cardType: "フォース",
        images: {
            card: "images/assist/[ニャー]リッピー.png",
            event1: "images/assist/[ニャー]リッピー_event1.png",
            event3: "images/assist/[ニャー]リッピー_event3.png"
        },
        events: {
            event1: ["被ダメカット", "連撃軽減・無効・回避"],
            event2: ["超必死"],
            event3: ["必中"]
        },
        source: "master",
        createdAt: "2024-01-02T00:00:00Z"
    },
{
    "id": "5d580fd2-745b-4be8-af98-144ac854ba5b",
    "name": "[ネンガジョウ]タツドシ",
    "rarity": "SSR",
    "monType": "無機",
    "aura": "赤",
    "cardType": "回避",
    "images": {
        "card": "images/assist/[ネンガジョウ]タツドシ.png",
        "event1": "images/assist/[ネンガジョウ]タツドシ_event1.png",
        "event3": "images/assist/[ネンガジョウ]タツドシ_event3.png"
    },
    "events": {
        "event1": ["ステup"],
        "event2": [
            "遠距離"
        ],
        "event3": [
            "アディション"
        ]
    },
    "source": "master",
    "createdAt": "2026-01-24T14:09:33.028Z"
},
{
    "id": "b5713be9-0b52-4736-b8fe-27b1e366a6e7",
    "name": "[ラクガキモノ]アライブ",
    "rarity": "SSR",
    "monType": "無機",
    "aura": "黒",
    "cardType": "丈夫さ",
    "images": {
        "card": "images/assist/[ラクガキモノ]アライブ.png",
        "event1": "images/assist/[ラクガキモノ]アライブ_event1.png",
        "event3": "images/assist/[ラクガキモノ]アライブ_event3.png"
    },
    "events": {
        "event1": [
            "ダメ連撃"
        ],
        "event2": [
            "近距離"
        ],
        "event3": [
            "アディション",
            "ダメ連撃"
        ]
    },
    "source": "master",
    "createdAt": "2026-01-24T13:02:43.454Z"
},
];
