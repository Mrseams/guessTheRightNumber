"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navigation from "../components/Navigation"
import { TrendingUp, TrendingDown, Filter } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

interface GameHistory {
  id: string
  date: string
  number: number
  result: "win" | "lose"
  balanceChange: number
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "win" | "lose">("all")
  const [history] = useState<GameHistory[]>([
    { id: "1", date: "2024-01-20", number: 85, result: "win", balanceChange: 100 },
    { id: "2", date: "2024-01-20", number: 45, result: "lose", balanceChange: -50 },
    { id: "3", date: "2024-01-19", number: 92, result: "win", balanceChange: 100 },
    { id: "4", date: "2024-01-19", number: 23, result: "lose", balanceChange: -50 },
    { id: "5", date: "2024-01-18", number: 78, result: "win", balanceChange: 100 },
    { id: "6", date: "2024-01-18", number: 67, result: "lose", balanceChange: -50 },
    { id: "7", date: "2024-01-17", number: 89, result: "win", balanceChange: 100 },
    { id: "8", date: "2024-01-17", number: 34, result: "lose", balanceChange: -50 },
  ])

  const filteredHistory = history.filter((entry) => filter === "all" || entry.result === filter)

  const stats = {
    total: history.length,
    wins: history.filter((h) => h.result === "win").length,
    losses: history.filter((h) => h.result === "lose").length,
    totalEarnings: history.reduce((sum, h) => sum + h.balanceChange, 0),
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />

        <main className="container mx-auto px-4 py-8 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Game History
            </h1>
            <p className="text-gray-400">Track your TrueNumber game performance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-gray-400">Total Games</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{stats.wins}</div>
                <div className="text-sm text-gray-400">Wins</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{stats.losses}</div>
                <div className="text-sm text-gray-400">Losses</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${stats.totalEarnings >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {stats.totalEarnings > 0 ? "+" : ""}
                  {stats.totalEarnings}
                </div>
                <div className="text-sm text-gray-400">Net Earnings</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              <Filter className="w-4 h-4 mr-2" />
              All Games
            </Button>
            <Button
              variant={filter === "win" ? "default" : "outline"}
              onClick={() => setFilter("win")}
              className={
                filter === "win" ? "bg-green-600 hover:bg-green-700" : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              Wins Only
            </Button>
            <Button
              variant={filter === "lose" ? "default" : "outline"}
              onClick={() => setFilter("lose")}
              className={
                filter === "lose" ? "bg-red-600 hover:bg-red-700" : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              Losses Only
            </Button>
          </div>

          {/* History Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center justify-between">
                <span>Detailed History</span>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  {filteredHistory.length} games
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Generated Number</TableHead>
                      <TableHead className="text-gray-300">Result</TableHead>
                      <TableHead className="text-gray-300">Balance Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((entry) => (
                      <TableRow key={entry.id} className="border-gray-700 hover:bg-gray-750 transition-colors">
                        <TableCell className="text-gray-300">{entry.date}</TableCell>
                        <TableCell>
                          <span
                            className={`font-bold text-lg ${entry.number > 70 ? "text-green-400" : "text-red-400"}`}
                          >
                            {entry.number}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={entry.result === "win" ? "default" : "destructive"}
                            className={entry.result === "win" ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            {entry.result === "win" ? "Win" : "Lose"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center space-x-1 font-semibold ${
                              entry.balanceChange > 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {entry.balanceChange > 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span>
                              {entry.balanceChange > 0 ? "+" : ""}
                              {entry.balanceChange} coins
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredHistory.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p>No games found for the selected filter.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
