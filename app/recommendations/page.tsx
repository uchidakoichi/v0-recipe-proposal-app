"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ExternalLink, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// 栄養素ごとのレシピ推奨（実際のアプリではAPIで取得）
const RECIPES_BY_NUTRIENT = {
  protein: [
    {
      id: 1,
      title: "簡単！鶏むね肉の塩麹漬け",
      nutrients: ["タンパク質", "低脂質"],
      time: "15分",
      url: "https://cookpad.com/jp/search/鶏むね肉",
    },
    {
      id: 2,
      title: "豆腐と卵のふわふわ丼",
      nutrients: ["タンパク質", "カルシウム"],
      time: "10分",
      url: "https://cookpad.com/jp/search/豆腐と卵",
    },
  ],
  fat: [
    {
      id: 3,
      title: "アボカドとサーモンのサラダ",
      nutrients: ["良質な脂質", "ビタミンE"],
      time: "10分",
      url: "https://cookpad.com/jp/search/アボカドとサーモン",
    },
    {
      id: 4,
      title: "ナッツとドライフルーツのヨーグルト",
      nutrients: ["良質な脂質", "食物繊維"],
      time: "5分",
      url: "https://cookpad.com/jp/search/ナッツとヨーグルト",
    },
  ],
  carbs: [
    {
      id: 5,
      title: "玄米と野菜のヘルシーボウル",
      nutrients: ["炭水化物", "食物繊維"],
      time: "20分",
      url: "https://cookpad.com/jp/search/玄米ボウル",
    },
    {
      id: 6,
      title: "さつまいもとりんごのスムージー",
      nutrients: ["炭水化物", "ビタミンC"],
      time: "5分",
      url: "https://cookpad.com/jp/search/さつまいもスムージー",
    },
  ],
  calcium: [
    {
      id: 7,
      title: "小松菜と豆腐のごま和え",
      nutrients: ["カルシウム", "鉄分"],
      time: "10分",
      url: "https://cookpad.com/jp/search/小松菜と豆腐",
    },
    {
      id: 8,
      title: "牛乳と小魚のリゾット",
      nutrients: ["カルシウム", "タンパク質"],
      time: "20分",
      url: "https://cookpad.com/jp/search/小魚リゾット",
    },
  ],
  iron: [
    {
      id: 9,
      title: "ほうれん草とレバーの炒め物",
      nutrients: ["鉄分", "ビタミンA"],
      time: "15分",
      url: "https://cookpad.com/jp/search/ほうれん草とレバー",
    },
    {
      id: 10,
      title: "切り干し大根と小松菜の煮物",
      nutrients: ["鉄分", "食物繊維"],
      time: "25分",
      url: "https://cookpad.com/jp/search/切り干し大根と小松菜",
    },
  ],
  vitaminA: [
    {
      id: 11,
      title: "にんじんとかぼちゃのポタージュ",
      nutrients: ["ビタミンA", "食物繊維"],
      time: "20分",
      url: "https://cookpad.com/jp/search/にんじんとかぼちゃのポタージュ",
    },
    {
      id: 12,
      title: "ほうれん草とトマトのオムレツ",
      nutrients: ["ビタミンA", "タンパク質"],
      time: "15分",
      url: "https://cookpad.com/jp/search/ほうれん草オムレツ",
    },
  ],
  vitaminB1: [
    {
      id: 13,
      title: "豚肉と玄米の炊き込みご飯",
      nutrients: ["ビタミンB1", "タンパク質"],
      time: "30分",
      url: "https://cookpad.com/jp/search/豚肉と玄米",
    },
    {
      id: 14,
      title: "枝豆と大豆のサラダ",
      nutrients: ["ビタミンB1", "食物繊維"],
      time: "10分",
      url: "https://cookpad.com/jp/search/枝豆と大豆",
    },
  ],
  vitaminC: [
    {
      id: 15,
      title: "ブロッコリーとパプリカのサラダ",
      nutrients: ["ビタミンC", "食物繊維"],
      time: "10分",
      url: "https://cookpad.com/jp/search/ブロッコリーとパプリカ",
    },
    {
      id: 16,
      title: "キウイとイチゴのスムージー",
      nutrients: ["ビタミンC", "抗酸化物質"],
      time: "5分",
      url: "https://cookpad.com/jp/search/キウイとイチゴ",
    },
  ],
  fiber: [
    {
      id: 17,
      title: "きのこと海藻のスープ",
      nutrients: ["食物繊維", "ミネラル"],
      time: "15分",
      url: "https://cookpad.com/jp/search/きのこと海藻",
    },
    {
      id: 18,
      title: "雑穀とレンズ豆のサラダ",
      nutrients: ["食物繊維", "タンパク質"],
      time: "20分",
      url: "https://cookpad.com/jp/search/雑穀とレンズ豆",
    },
  ],
}

type Recipe = {
  id: number
  title: string
  nutrients: string[]
  time: string
  url: string
  favorite?: boolean
}

export default function Recommendations() {
  const [deficientNutrients, setDeficientNutrients] = useState<string[]>([])
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 分析結果から不足している栄養素を取得（実際のアプリではAPIやローカルストレージから）
    // ここではサンプルとして3つの栄養素を設定
    const nutrients = ["protein", "calcium", "vitaminC"]
    setDeficientNutrients(nutrients)

    // 不足している栄養素に基づいてレシピを推奨
    const recipes: Recipe[] = []
    nutrients.forEach((nutrient) => {
      const nutrientRecipes = RECIPES_BY_NUTRIENT[nutrient as keyof typeof RECIPES_BY_NUTRIENT] || []
      recipes.push(...nutrientRecipes)
    })

    // 重複を削除
    const uniqueRecipes = recipes.filter((recipe, index, self) => index === self.findIndex((r) => r.id === recipe.id))

    setRecommendedRecipes(uniqueRecipes)
    setLoading(false)
  }, [])

  const toggleFavorite = (recipeId: number) => {
    if (favorites.includes(recipeId)) {
      setFavorites(favorites.filter((id) => id !== recipeId))
    } else {
      setFavorites([...favorites, recipeId])
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 to-blue-50">
        <p>レシピを検索中...</p>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/analysis">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">おすすめレシピ</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">不足している栄養素を補うレシピ</h2>
          <p className="text-sm text-gray-600">
            あなたの前日の食事記録から、以下の栄養素を補うレシピをクックパッドから厳選しました。
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {recommendedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden shadow-md">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{recipe.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${favorites.includes(recipe.id) ? "text-pink-500" : "text-gray-400"}`}
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    <Heart className="h-5 w-5" fill={favorites.includes(recipe.id) ? "#ec4899" : "none"} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {recipe.nutrients.map((nutrient, idx) => (
                    <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {nutrient}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                    調理時間: {recipe.time}
                  </Badge>
                </div>
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
                >
                  クックパッドで見る
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-blue-100 p-4 rounded-xl mb-6">
          <h3 className="font-semibold mb-2">栄養バランスのヒント</h3>
          <p className="text-sm text-gray-700">
            毎日の食事で様々な色の野菜や果物を取り入れると、自然と栄養バランスが整います。
            特に緑黄色野菜はビタミンやミネラルが豊富です！
          </p>
        </div>

        <Link href="/">
          <Button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium py-6 rounded-xl shadow-md">
            トップに戻る
          </Button>
        </Link>
      </div>
    </main>
  )
}
