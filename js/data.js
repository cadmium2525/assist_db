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
            event3: "images/assist/[スターギフト]ギフトン_event3.png",
            hirameki: "images/assist/[スターギフト]ギフトン_hirameki.png"
        },
        events: {
            event1: ["クリ無効", "ステ連撃"],
            event2: ["雪山"],
            event3: ["完全回避", "ステ連撃"],
            hirameki: ["連撃"]
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
            event3: "images/assist/[ニャー]リッピー_event3.png",
            hirameki: "images/assist/[ニャー]リッピー_hirameki.png",
        },
        events: {
            event1: ["被ダメカット", "連撃軽減・無効・回避"],
            event2: ["超必死"],
            event3: ["必中"],
            hirameki: ["堅固", "不屈", "シールド"]
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
            "event3": "images/assist/[ネンガジョウ]タツドシ_event3.png",
            "hirameki": "images/assist/[ネンガジョウ]タツドシ_hirameki.png"
        },
        "events": {
            "event1": ["ステup"],
            "event2": [
                "遠距離"
            ],
            "event3": [
                "アディション"
            ],
            "hirameki": []
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
            "event3": "images/assist/[ラクガキモノ]アライブ_event3.png",
            "hirameki": "images/assist/[ラクガキモノ]アライブ_hirameki.png"
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
            ],
            "hirameki": ["クリダメup"]
        },
        "source": "master",
        "createdAt": "2026-01-24T13:02:43.454Z"
    },
{
    "id": "9f2ec0aa-993e-4b18-88cd-0805aab88b33",
    "name": "[ユグドラシル]ラタトスク",
    "rarity": "MR",
    "monType": "創造",
    "aura": "緑",
    "cardType": "タフネス",
    "images": {
        "card": "images/assist/[ユグドラシル]ラタトスク.png",
        "event1": "images/assist/[ユグドラシル]ラタトスク_event1.png",
        "event3": "images/assist/[ユグドラシル]ラタトスク_event3.png",
        "hirameki": "images/assist/[ユグドラシル]ラタトスク_hirameki.png"
    },
    "events": {
        "event1": [
            "ステup"
        ],
        "event2": [
            "森林"
        ],
        "event3": [
            "ステ連撃"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-25T03:14:10.318Z"
},
{
    "id": "01dc31de-b1b0-42d6-bce8-fd9ec4768999",
    "name": "[ウンディーネ]ルリ",
    "rarity": "MR",
    "monType": "幻霊",
    "aura": "青",
    "cardType": "アキュメン",
    "images": {
        "card": "images/assist/[ウンディーネ]ルリ.png",
        "event1": "images/assist/[ウンディーネ]ルリ_event1.png",
        "event3": "images/assist/[ウンディーネ]ルリ_event3.png",
        "hirameki": "images/assist/[ウンディーネ]ルリ_hirameki.png"
    },
    "events": {
        "event1": [
            "命中率up"
        ],
        "event2": [
            "超必死"
        ],
        "event3": [
            "ステup"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-25T08:31:22.201Z"
},
{
    "id": "89a13e0a-8f0f-4e4e-a2ae-96317ca4cb70",
    "name": "[デュラハン]ラブレス",
    "rarity": "MR",
    "monType": "魔族",
    "aura": "白",
    "cardType": "アサルト",
    "images": {
        "card": "images/assist/[デュラハン]ラブレス.png",
        "event1": "images/assist/[デュラハン]ラブレス_event1.png",
        "event3": "images/assist/[デュラハン]ラブレス_event3.png",
        "hirameki": "images/assist/[デュラハン]ラブレス_hirameki.png"
    },
    "events": {
        "event1": [
            "アディション"
        ],
        "event2": [
            "零距離"
        ],
        "event3": [
            "ダメ連撃"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-25T01:41:32.821Z"
},
];
