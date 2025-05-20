"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

// クックパッドのレシピ情報（実際の実装では適切な権利処理が必要です）
const FEATURED_RECIPES = [
  {
    id: 1,
    title: "彩り野菜のヘルシーサラダ",
    image: "/recipe-salad.jpg",
    url: "https://cookpad.com/search/サラダ",
  },
  {
    id: 2,
    title: "鶏むね肉と野菜のヘルシー蒸し料理",
    image: "/recipe-chicken.jpg",
    url: "https://cookpad.com/search/鶏むね蒸し",
  },
  {
    id: 3,
    title: "栄養満点！具だくさん味噌汁",
    image: "/recipe-soup.jpg",
    url: "https://cookpad.com/search/具だくさん味噌汁",
  },
]

export default function Home() {
  const [currentRecipe, setCurrentRecipe] = useState(0)

  // 自動スライド
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecipe((prev) => (prev + 1) % FEATURED_RECIPES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextRecipe = () => {
    setCurrentRecipe((prev) => (prev + 1) % FEATURED_RECIPES.length)
  }

  const prevRecipe = () => {
    setCurrentRecipe((prev) => (prev - 1 + FEATURED_RECIPES.length) % FEATURED_RECIPES.length)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-pink-50 to-blue-50">
      <div className="w-full max-w-md flex flex-col items-center justify-center gap-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            栄養バランス
            <br />
            レシピ提案
          </h1>
          <p className="text-gray-600">
            前日の食事記録から、あなたに必要な栄養素を分析し、 ぴったりのレシピを提案します！
          </p>
        </div>

        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200 rounded-xl transform rotate-3"></div>
          <div className="relative bg-white rounded-xl shadow-md p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <a
                href={FEATURED_RECIPES[currentRecipe].url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative group"
              >
                <img
                  src={FEATURED_RECIPES[currentRecipe].image || "/placeholder.svg"}
                  alt={FEATURED_RECIPES[currentRecipe].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                  <div className="p-4 text-white flex items-center">
                    <span>クックパッドで見る</span>
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </a>

              <button
                onClick={prevRecipe}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
                aria-label="前のレシピ"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>

              <button
                onClick={nextRecipe}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
                aria-label="次のレシピ"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div className="mt-3 text-center">
              <h2 className="font-medium text-gray-800">{FEATURED_RECIPES[currentRecipe].title}</h2>
              <p className="text-xs text-gray-500 mt-1">画像提供: クックパッド</p>
            </div>

            <div className="flex justify-center mt-2">
              {FEATURED_RECIPES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentRecipe(index)}
                  className={`w-2 h-2 mx-1 rounded-full ${currentRecipe === index ? "bg-pink-500" : "bg-gray-300"}`}
                  aria-label={`レシピ ${index + 1} に移動`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full space-y-4 mt-4">
          <Link href="/meal-input" className="w-full">
            <Button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium py-6 rounded-xl shadow-md">
              はじめる
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/about" className="w-full">
            <Button variant="outline" className="w-full border-pink-300 text-gray-700 font-medium py-4 rounded-xl">
              アプリについて
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
