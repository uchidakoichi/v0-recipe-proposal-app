"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ArrowRight } from "lucide-react"

// 日本人の食事摂取基準（簡略化）
const NUTRITION_STANDARDS = {
  protein: { value: 60, unit: "g", name: "タンパク質" },
  fat: { value: 60, unit: "g", name: "脂質" },
  carbs: { value: 320, unit: "g", name: "炭水化物" },
  calcium: { value: 650, unit: "mg", name: "カルシウム" },
  iron: { value: 7.5, unit: "mg", name: "鉄分" },
  vitaminA: { value: 850, unit: "μg", name: "ビタミンA" },
  vitaminB1: { value: 1.1, unit: "mg", name: "ビタミンB1" },
  vitaminC: { value: 100, unit: "mg", name: "ビタミンC" },
  fiber: { value: 20, unit: "g", name: "食物繊維" },
}

// 食事の栄養素データ（実際のアプリでは食品データベースと連携）
const MEAL_NUTRITION = {
  サラダチキン: {
    protein: 25,
    fat: 3,
    carbs: 1,
    calcium: 15,
    iron: 1,
    vitaminA: 10,
    vitaminB1: 0.1,
    vitaminC: 0,
    fiber: 0,
  },
  味噌汁: {
    protein: 3,
    fat: 2,
    carbs: 5,
    calcium: 40,
    iron: 0.5,
    vitaminA: 50,
    vitaminB1: 0.05,
    vitaminC: 5,
    fiber: 2,
  },
  ごはん: {
    protein: 4,
    fat: 0.5,
    carbs: 55,
    calcium: 10,
    iron: 0.2,
    vitaminA: 0,
    vitaminB1: 0.1,
    vitaminC: 0,
    fiber: 0.5,
  },
  サラダ: {
    protein: 2,
    fat: 5,
    carbs: 10,
    calcium: 30,
    iron: 1,
    vitaminA: 200,
    vitaminB1: 0.1,
    vitaminC: 30,
    fiber: 4,
  },
  ハンバーグ: {
    protein: 20,
    fat: 15,
    carbs: 10,
    calcium: 20,
    iron: 2,
    vitaminA: 50,
    vitaminB1: 0.2,
    vitaminC: 5,
    fiber: 1,
  },
  パスタ: { protein: 8, fat: 3, carbs: 70, calcium: 15, iron: 1, vitaminA: 10, vitaminB1: 0.2, vitaminC: 0, fiber: 2 },
  フルーツ: {
    protein: 1,
    fat: 0,
    carbs: 15,
    calcium: 10,
    iron: 0.3,
    vitaminA: 50,
    vitaminB1: 0.05,
    vitaminC: 40,
    fiber: 3,
  },
  // デフォルト値（登録されていない食事用）
  default: {
    protein: 5,
    fat: 3,
    carbs: 10,
    calcium: 20,
    iron: 0.5,
    vitaminA: 30,
    vitaminB1: 0.1,
    vitaminC: 10,
    fiber: 1,
  },
}

type Meal = {
  id: string
  type: string
  name: string
}

type NutritionData = {
  [key: string]: {
    current: number
    target: number
    percentage: number
    unit: string
    name: string
  }
}

export default function Analysis() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [nutritionData, setNutritionData] = useState<NutritionData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ローカルストレージから食事データを取得
    const storedMeals = localStorage.getItem("dailyMeals")
    const parsedMeals = storedMeals ? JSON.parse(storedMeals) : []
    setMeals(parsedMeals)

    // 栄養素の計算
    calculateNutrition(parsedMeals)
    setLoading(false)
  }, [])

  const calculateNutrition = (mealList: Meal[]) => {
    // 栄養素の初期化
    const nutrition: { [key: string]: number } = {
      protein: 0,
      fat: 0,
      carbs: 0,
      calcium: 0,
      iron: 0,
      vitaminA: 0,
      vitaminB1: 0,
      vitaminC: 0,
      fiber: 0,
    }

    // 食事から栄養素を計算
    mealList.forEach((meal) => {
      const mealNutrition = MEAL_NUTRITION[meal.name as keyof typeof MEAL_NUTRITION] || MEAL_NUTRITION.default

      Object.keys(nutrition).forEach((nutrient) => {
        nutrition[nutrient] += mealNutrition[nutrient as keyof typeof mealNutrition]
      })
    })

    // 栄養素データの整形
    const formattedData: NutritionData = {}
    Object.keys(NUTRITION_STANDARDS).forEach((nutrient) => {
      const standard = NUTRITION_STANDARDS[nutrient as keyof typeof NUTRITION_STANDARDS]
      const current = nutrition[nutrient]
      const percentage = Math.min(Math.round((current / standard.value) * 100), 100)

      formattedData[nutrient] = {
        current,
        target: standard.value,
        percentage,
        unit: standard.unit,
        name: standard.name,
      }
    })

    setNutritionData(formattedData)
  }

  // 不足している栄養素を特定（パーセンテージが低い順）
  const deficientNutrients = Object.entries(nutritionData)
    .sort(([, a], [, b]) => a.percentage - b.percentage)
    .slice(0, 3)
    .map(([key, data]) => ({ key, ...data }))

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 to-blue-50">
        <p>データを分析中...</p>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/meal-input">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">栄養分析結果</h1>
        </div>

        <Card className="p-4 mb-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">前日の栄養素摂取量</h2>
          <div className="space-y-4">
            {Object.entries(nutritionData).map(([key, data]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{data.name}</span>
                  <span className="text-sm text-gray-500">
                    {Math.round(data.current * 10) / 10}
                    {data.unit} / {data.target}
                    {data.unit}
                  </span>
                </div>
                <div className="relative">
                  <Progress value={data.percentage} className="h-2" />
                  <span className="absolute right-0 top-0 text-xs text-gray-500 -mt-5">{data.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 mb-6 shadow-md bg-gradient-to-r from-pink-100 to-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">不足している栄養素</h2>
          <p className="text-sm text-gray-600 mb-4">
            以下の栄養素が不足しています。次のページでおすすめのレシピを確認しましょう！
          </p>
          <ul className="space-y-2">
            {deficientNutrients.map((nutrient) => (
              <li key={nutrient.key} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="font-medium">{nutrient.name}</span>
                <span className="text-sm text-gray-500">({nutrient.percentage}% 充足)</span>
              </li>
            ))}
          </ul>
        </Card>

        <Link href="/recommendations">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-medium py-6 rounded-xl shadow-md">
            おすすめレシピを見る
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  )
}
