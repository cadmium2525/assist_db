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
            "与ダメup","ガッツダメup"
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
            "与ダメup",
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
{
    "id": "d641161e-e940-45ad-97a0-ad856e1d8cbd",
    "name": "[ハム]リストン",
    "rarity": "MR",
    "monType": "獣族",
    "aura": "黄",
    "cardType": "フォース",
    "images": {
        "card": "images/assist/[ハム]リストン.png",
        "event1": "images/assist/[ハム]リストン_event1.png",
        "event3": "images/assist/[ハム]リストン_event3.png",
        "hirameki": "images/assist/[ハム]リストン_hirameki.png"
    },
    "events": {
        "event1": [
            "ステ連撃"
        ],
        "event2": [
            "超根性"
        ],
        "event3": [
            "技ダメup"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-26T11:04:59.239Z"
},
{
    "id": "e4cda8b8-f0ff-4637-9036-dadf34c66667",
    "name": "[凛々しき明星]クリス",
    "rarity": "MR",
    "monType": "無し",
    "aura": "青",
    "cardType": "友人",
    "images": {
        "card": "images/assist/[凛々しき明星]クリス.png",
        "event1": "images/assist/[凛々しき明星]クリス_event1.png",
        "event3": "images/assist/[凛々しき明星]クリス_event3.png",
        "hirameki": null
    },
    "events": {
        "event1": [
            "連撃軽減・無効・回避",
            "被ダメ軽減"
        ],
        "event2": [],
        "event3": [
            "デバフ"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-26T09:55:03.362Z"
},
{
    "id": "3d7ba5de-f3e5-46d7-bca4-10994fa3a227",
    "name": "[メタルナー]キャトル",
    "rarity": "MR",
    "monType": "創造",
    "aura": "白",
    "cardType": "ガード",
    "images": {
        "card": "images/assist/[メタルナー]キャトル.png",
        "event1": "images/assist/[メタルナー]キャトル_event1.png",
        "event3": "images/assist/[メタルナー]キャトル_event3.png",
        "hirameki": "images/assist/[メタルナー]キャトル_hirameki.png"
    },
    "events": {
        "event1": [
            "与ダメup","ガッツ回復"
        ],
        "event2": [
            "超根性"
        ],
        "event3": [
            "アディション"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-25T22:53:42.780Z"
},
{
    "id": "b3bf98b3-3f0e-4195-b0b9-b2ec548e161f",
    "name": "[スプーキー]スケアクロウ",
    "rarity": "MR",
    "monType": "怪物",
    "aura": "緑",
    "cardType": "フィジカル",
    "images": {
        "card": "images/assist/[スプーキー]スケアクロウ.png",
        "event1": "images/assist/[スプーキー]スケアクロウ_event1.png",
        "event3": "images/assist/[スプーキー]スケアクロウ_event3.png",
        "hirameki": "images/assist/[スプーキー]スケアクロウ_hirameki.png"
    },
    "events": {
        "event1": [
            "デバフ"
        ],
        "event2": [
            "砂漠"
        ],
        "event3": [
            "ステ連撃"
        ],
        "hirameki": [
            "連撃"
        ]
    },
    "source": "master",
    "createdAt": "2026-01-26T10:32:27.853Z"
},
{
    "id": "6da3f4b9-ec99-4418-9899-d6b1cfa37d6b",
    "name": "[キジン]スズカ",
    "rarity": "MR",
    "monType": "怪物",
    "aura": "黄",
    "cardType": "フィジカル",
    "images": {
        "card": "images/assist/[キジン]スズカ.png",
        "event1": "images/assist/[キジン]スズカ_event1.png",
        "event3": "images/assist/[キジン]スズカ_event3.png",
        "hirameki": "images/assist/[キジン]スズカ_hirameki.png"
    },
    "events": {
        "event1": [
            "命中率up",
            "クリ率up"
        ],
        "event2": [
            "零距離"
        ],
        "event3": [
            "与ダメup",
            "クリダメup"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-01-26T10:36:40.667Z"
},
{
    "id": "028c23ff-2e8d-48f4-b3df-c704bc4eeaff",
    "name": "[フラン]ブライド",
    "rarity": "MR",
    "monType": "怪物",
    "aura": "緑",
    "cardType": "フォース",
    "images": {
        "card": "images/assist/[フラン]ブライド.png",
        "event1": null,
        "event3": null,
        "hirameki": null
    },
    "events": {
        "event1": [
            "ダメ連撃"
        ],
        "event2": [
            "超根性"
        ],
        "event3": [
            "完全回避",
            "シールド"
        ],
        "hirameki": [
            "不屈",
            "堅固",
            "シールド"
        ]
    },
    "source": "master",
    "createdAt": "2026-02-01T13:51:58.929Z"
},
{
    "id": "caee5286-3db4-49c4-86b1-b3b5d25d59c7",
    "name": "[陽だまりの巫女姫]シュナ",
    "rarity": "MR",
    "monType": "無し",
    "aura": "赤",
    "cardType": "友人",
    "images": {
        "card": "images/assist/[陽だまりの巫女姫]シュナ.png",
        "event1": "images/assist/[陽だまりの巫女姫]シュナ_event1.png",
        "event3": "images/assist/[陽だまりの巫女姫]シュナ_event3.png",
        "hirameki": null
    },
    "events": {
        "event1": [
            "与ダメup",
            "連撃軽減・無効・回避",
            "被ダメカット"
        ],
        "event2": [],
        "event3": [
            "デバフ"
        ],
        "hirameki": []
    },
    "source": "master",
    "createdAt": "2026-02-01T14:01:16.679Z"
},
{
    "id": "b0352365-c09d-4687-a52f-14d06f388c6d",
    "name": "[波乗りテンペスト]リムル",
    "rarity": "MR",
    "monType": "魔族",
    "aura": "青",
    "cardType": "クイック",
    "images": {
        "card": "images/assist/[波乗りテンペスト]リムル.png",
        "event1": "images/assist/[波乗りテンペスト]リムル_event1.png",
        "event3": "images/assist/[波乗りテンペスト]リムル_event3.png",
        "hirameki": "images/assist/[波乗りテンペスト]リムル_hirameki.png"
    },
    "events": {
        "event1": [
            "技ダメup",
            "与ダメup"
        ],
        "event2": [
            "零距離"
        ],
        "event3": [
            "ダメ連撃",
            "連撃軽減・無効・回避"
        ],
        "hirameki": [
            "連撃"
        ]
    },
    "source": "master",
    "createdAt": "2026-02-01T14:03:32.075Z"
},
{
    "id": "30aaae67-f07f-4a38-bfbf-c719efc26217",
    "name": "[ゴースト]オフリィ",
    "rarity": "MR",
    "monType": "怪物",
    "aura": "黄",
    "cardType": "ジャッジ",
    "images": {
        "card": "images/assist/[ゴースト]オフリィ.png",
        "event1":"images/assist/[ゴースト]オフリィ_event1.png",
        "event3":"images/assist/[ゴースト]オフリィ_event3.png",
        "hirameki": "images/assist/[ゴースト]オフリィ_hirameki.png"
    },
    "events": {
        "event1": [
            "完全回避",
            "被ダメ軽減"
        ],
        "event2": [
            "超余裕"
        ],
        "event3": [
            "命中率up",
            "連撃軽減・無効・回避"
        ],
        "hirameki": [
            "連撃"
        ]
    },
    "source": "master",
    "createdAt": "2026-02-01T14:10:45.798Z"
},
];
