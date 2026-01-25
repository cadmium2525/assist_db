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
            "hirameki": ["クリダメup","守護"]
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
{
    "id": "5d174cac-a980-4b95-b863-ab5e7a0e9387",
    "name": "[シラヌイ]ナデシコ",
    "rarity": "MR",
    "monType": "魔族",
    "aura": "白",
    "cardType": "サバイブ",
    "images": {
        "card": "images/assist/[シラヌイ]ナデシコ.png",
        "event1": "images/assist/[シラヌイ]ナデシコ_event1.png",
        "event3": "images/assist/[シラヌイ]ナデシコ_event3.png",
        "hirameki": "images/assist/[シラヌイ]ナデシコ_hirameki.png"
    },
    "events": {
        "event1": [
            "ステ連撃"
        ],
        "event2": [
            "近距離"
        ],
        "event3": [
            "命中率up",
            "連撃軽減・無効・回避"
        ],
        "hirameki": [
            "不屈",
            "堅固",
            "シールド"
        ]
    },
    "source": "master",
    "createdAt": "2026-01-25T12:23:47.460Z"
},
{
    "id": "ebabbc7b-3c29-4f3a-8a91-866be8fc0f83",
    "name": "[ムー]メガラニカ",
    "rarity": "MR",
    "monType": "魔族",
    "aura": "黒",
    "cardType": "メンタル",
    "images": {
        "card": "images/assist/[ムー]メガラニカ.png",
        "event1": "images/assist/[ムー]メガラニカ_event1.png",
        "event3": "images/assist/[ムー]メガラニカ_event3.png",
        "hirameki": "images/assist/[ムー]メガラニカ_hirameki.png"
    },
    "events": {
        "event1": [
            "クリダメup",
            "クリ率up",
            "シールド"
        ],
        "event2": [
            "超憤怒"
        ],
        "event3": [
            "ダメ連撃"
        ],
        "hirameki": [
            "連撃"
        ]
    },
    "source": "master",
    "createdAt": "2026-01-25T12:17:24.909Z"
},
{
    "id": "d29b10da-4021-4795-a367-fc4ed1fb700e",
    "name": "[メルホイップ]ドルチェ",
    "rarity": "MR",
    "monType": "創造",
    "aura": "緑",
    "cardType": "アサルト",
    "images": {
        "card": "images/assist/[メルホイップ]ドルチェ.png",
        "event1": "images/assist/[メルホイップ]ドルチェ_event1.png",
        "event3": "images/assist/[メルホイップ]ドルチェ_event3.png",
        "hirameki": "images/assist/[メルホイップ]ドルチェ_hirameki.png"
    },
    "events": {
        "event1": [
            "アディション"
        ],
        "event2": [
            "超逆上"
        ],
        "event3": [
            "ガッツ回復"
        ],
        "hirameki": [
            "連撃"
        ]
    },
    "source": "master",
    "createdAt": "2026-01-25T12:02:54.400Z"
},
{
    "id": "7d1c32f5-15d0-45fd-a134-58842c1361ea",
    "name": "[神聖な巫女姿]ステラ",
    "rarity": "MR",
    "monType": "無し",
    "aura": "白",
    "cardType": "友人",
    "images": {
        "card": "images/assist/[神聖な巫女姿]ステラ.png",
        "event1": "images/assist/[神聖な巫女姿]ステラ_event1.png",
        "event3": "images/assist/[神聖な巫女姿]ステラ_event3.png",
        "hirameki": null
    },
    "events": {
        "event1": [
            "クリ無効",
            "被ダメカット"
        ],
        "event2": [],
        "event3": [
            "ステup",
            "必中",
            "被ダメ軽減"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-25T12:35:50.083Z"
},
{
    "id": "99fd67f6-a7eb-4ddc-a08e-bfbf0b5fce44",
    "name": "[鮮血の戦乙女]シャルティア",
    "rarity": "SSR",
    "monType": "無機",
    "aura": "赤",
    "cardType": "回避",
    "images": {
        "card": "images/assist/[鮮血の戦乙女]シャルティア.png",
        "event1": "images/assist/[鮮血の戦乙女]シャルティア_event1.png",
        "event3": "images/assist/[鮮血の戦乙女]シャルティア_event3.png",
        "hirameki": "images/assist/[鮮血の戦乙女]シャルティア_hirameki.png"
    },
    "events": {
        "event1": [
            "ダメ連撃",
            "連撃軽減・無効・回避"
        ],
        "event2": [
            "遠距離"
        ],
        "event3": [
            "完全回避",
            "シールド"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-25T13:19:10.818Z"
},
{
    "id": "3570c117-13c3-49e3-811d-cf78e978e42d",
    "name": "[ともに歩む未来]朝倉 葉",
    "rarity": "MR",
    "monType": "魔族",
    "aura": "緑",
    "cardType": "テクニック",
    "images": {
        "card": "images/assist/[ともに歩む未来]朝倉 葉.png",
        "event1": "images/assist/[ともに歩む未来]朝倉 葉_event1.png",
        "event3": "images/assist/[ともに歩む未来]朝倉 葉_event3.png",
        "hirameki": "images/assist/[ともに歩む未来]朝倉 葉_hirameki.png"
    },
    "events": {
        "event1": [
            "ステup",
            "連撃軽減・無効・回避"
        ],
        "event2": [
            "中距離"
        ],
        "event3": [
            "ステup",
            "命中率up"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-25T13:36:56.578Z"
},
{
    "id": "5e9b6a51-a287-46ed-b14e-beb3bda8d0a7",
    "name": "[モッチー]ラムスウィート",
    "rarity": "MR",
    "monType": "幻霊",
    "aura": "赤",
    "cardType": "インパクト",
    "images": {
        "card": "images/assist/[モッチー]ラムスウィート.png",
        "event1": "images/assist/[モッチー]ラムスウィート_event1.png",
        "event3": "images/assist/[モッチー]ラムスウィート_event3.png",
        "hirameki": "images/assist/[モッチー]ラムスウィート_hirameki.png"
    },
    "events": {
        "event1": [
            "クリ率up"
        ],
        "event2": [
            "超根性"
        ],
        "event3": [
            "クリダメup"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-25T13:46:22.896Z"
},
];
