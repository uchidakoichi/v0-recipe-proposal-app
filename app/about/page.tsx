import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Heart, Utensils, BarChart3 } from "lucide-react"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">アプリについて</h1>
        </div>

        <Card className="p-6 mb-6 shadow-md">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center mb-4">
              <Utensils className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              栄養バランスレシピ提案
            </h2>
            <p className="text-gray-600 mt-2">あなたの食事習慣から最適なレシピを提案します</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-pink-500" />
                使い方
              </h3>
              <ol className="mt-2 space-y-2 text-gray-700 list-decimal pl-5">
                <li>前日の食事内容を入力します</li>
                <li>AIが栄養バランスを分析します</li>
                <li>不足している栄養素を補うレシピが提案されます</li>
                <li>お気に入りのレシピを保存できます</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-lg flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                栄養基準について
              </h3>
              <p className="mt-2 text-gray-700">
                本アプリは厚生労働省が公表している「日本人の食事摂取基準」を基に栄養バランスを分析しています。年齢や性別によって必要な栄養素は異なりますが、一般的な成人の基準値を元にしています。
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg flex items-center">
                <Heart className="h-5 w-5 mr-2 text-pink-500" />
                レシピについて
              </h3>
              <p className="mt-2 text-gray-700">
                提案されるレシピはクックパッドから厳選されたものです。実際の調理時間や難易度も考慮して、日常生活に取り入れやすいレシピを中心に提案しています。
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 mb-6 shadow-md bg-gradient-to-r from-pink-100 to-blue-100">
          <h3 className="font-semibold mb-2">健康的な食生活のために</h3>
          <p className="text-sm text-gray-700">
            バランスの良い食事は、単に栄養素を摂取するだけでなく、食事を楽しむことも大切です。このアプリが皆さんの健康的な食生活をサポートできれば幸いです。
          </p>
        </Card>

        <Link href="/">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-medium py-6 rounded-xl shadow-md">
            トップに戻る
          </Button>
        </Link>
      </div>
    </main>
  )
}
