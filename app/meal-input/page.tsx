"use client"

import { useState, type FormEvent, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Plus, Trash2, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MEAL_TYPES = ["朝食", "昼食", "夕食", "間食"]

type Meal = {
  id: string
  type: string
  name: string
}

export default function MealInput() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [meals, setMeals] = useState<Meal[]>([])
  const [currentMealName, setCurrentMealName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // 現在のステップが変わったらインプットにフォーカス
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentStep])

  const addMeal = (e?: FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (currentMealName.trim() === "") return

    setMeals([
      ...meals,
      {
        id: Date.now().toString(),
        type: MEAL_TYPES[currentStep],
        name: currentMealName,
      },
    ])

    setCurrentMealName("")
  }

  const removeMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  const nextStep = () => {
    if (currentStep < MEAL_TYPES.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveMeals = () => {
    localStorage.setItem("dailyMeals", JSON.stringify(meals))
    router.push("/analysis")
  }

  // 現在のステップの食事リスト
  const currentMeals = meals.filter((meal) => meal.type === MEAL_TYPES[currentStep])

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">前日の食事記録</h1>
        </div>

        {/* ステップインジケーター */}
        <div className="flex justify-between mb-6">
          {MEAL_TYPES.map((type, index) => (
            <div
              key={type}
              className="flex flex-col items-center"
              onClick={() => setCurrentStep(index)}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                  index === currentStep
                    ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                    : index < currentStep
                      ? "bg-gray-200 text-gray-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span className={`text-xs ${index === currentStep ? "font-medium text-gray-800" : "text-gray-500"}`}>
                {type}
              </span>
            </div>
          ))}
        </div>

        <Card className="p-4 mb-6 shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">{MEAL_TYPES[currentStep]}を入力</h2>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {currentMeals.length}件
              </Badge>
            </div>

            <form onSubmit={addMeal} className="space-y-4">
              <div>
                <Label htmlFor="meal-name" className="text-gray-700">
                  料理名
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="meal-name"
                    ref={inputRef}
                    value={currentMealName}
                    onChange={(e) => setCurrentMealName(e.target.value)}
                    placeholder="例: サラダチキン、味噌汁など"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600"
                    disabled={currentMealName.trim() === ""}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Enterキーで追加できます</p>
              </div>
            </form>

            {/* 現在のステップの食事リスト */}
            {currentMeals.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="text-sm font-medium text-gray-700">登録した{MEAL_TYPES[currentStep]}</h3>
                {currentMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <p className="font-medium">{meal.name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMeal(meal.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <div className="flex justify-between mb-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 border-gray-300"
          >
            前へ
          </Button>

          {currentStep < MEAL_TYPES.length - 1 ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            >
              次へ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={saveMeals}
              disabled={meals.length === 0}
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            >
              分析する
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* 全ての食事の概要 */}
        <Card className="p-4 mb-6 shadow-md bg-gradient-to-r from-pink-50 to-blue-50">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">登録した食事の概要</h2>
          <div className="space-y-3">
            {MEAL_TYPES.map((type) => {
              const typeMeals = meals.filter((meal) => meal.type === type)
              return (
                <div key={type} className="flex items-center">
                  <Badge
                    variant="outline"
                    className={`mr-2 ${
                      typeMeals.length > 0 ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-100"
                    }`}
                  >
                    {typeMeals.length}
                  </Badge>
                  <span className="font-medium text-sm">{type}:</span>
                  <span className="text-sm text-gray-600 ml-2 truncate">
                    {typeMeals.length > 0 ? typeMeals.map((m) => m.name).join(", ") : "未入力"}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </main>
  )
}
