"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "./components/Navigation";
import { Dice1, TrendingUp, TrendingDown } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authUtils } from "@/lib/auth";

interface GameHistory {
  id: string;
  date: string;
  generatedNumber: number;
  result: "gagné" | "perdu";
  balanceChange: number;
  newBalance: number;
}

export default function Dashboard() {
  const { toast } = useToast();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [balance, setBalance] = useState(1000);
  const [user, setUser] = useState(authUtils.getUser());
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GameHistory[]>([]);

  const generateNumber = async () => {
    setIsGenerating(true);

    const response = await fetch(`${apiUrl}/game/play`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setHistory((prev) => [data, ...prev]);
    }

    setIsGenerating(false);

    // Show toast notification
    toast({
      title: data.result == "gagné" ? "🎉 You Won!" : "😔 You Lost",
      description: `Number: ${data.generatedNumber} | ${
        data.result == "gagné" ? "+" : ""
      }${data.balanceChange} coins`,
      variant: data.result == "gagné" ? "default" : "destructive",
    });
  };

  const getGameHistoric = async () => {
    const response = await fetch(`${apiUrl}/history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setHistory(data);
    }
  };

  useEffect(() => {
    getGameHistoric();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Welcome back, {user?.username || "Player"}!
            </h1>
            <div className="flex items-center justify-center space-x-2">
              {/* <span className="text-xl text-gray-300">Current Balance:</span>
              <span className="text-3xl font-bold text-green-400">
                {user?.balance} coins
              </span> */}
            </div>
          </div>

          {/* Game Section */}
          <Card className="bg-gray-800 border-gray-700 max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">
                TrueNumber Game
              </CardTitle>
              <p className="text-gray-400">Generate a number &gt; 70 to win!</p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <Button
                onClick={generateNumber}
                disabled={isGenerating}
                size="lg"
                className={`w-full h-16 text-xl font-semibold transition-all duration-300 ${
                  isGenerating
                    ? "bg-gray-600 cursor-not-allowed animate-pulse"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <Dice1 className="w-6 h-6 animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Generate a Number"
                )}
              </Button>

              {isGenerating && (
                <div className="text-center">
                  <div className="inline-block animate-bounce text-4xl font-bold text-blue-400">
                    ?
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* History Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <span>Game History</span>
                <Badge
                  variant="secondary"
                  className="bg-gray-700 text-gray-300"
                >
                  {history.length} plays
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Number</TableHead>
                      <TableHead className="text-gray-300">Result</TableHead>
                      <TableHead className="text-gray-300">
                        Balance Change
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((entry) => (
                      <TableRow
                        key={entry.id}
                        className="border-gray-700 hover:bg-gray-750"
                      >
                        <TableCell className="text-gray-300">
                          {entry.date}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-bold ${
                              entry.generatedNumber > 70
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {entry.generatedNumber}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              entry.result === "gagné"
                                ? "default"
                                : "destructive"
                            }
                            className={
                              entry.result === "gagné"
                                ? "bg-green-600 hover:bg-green-700"
                                : ""
                            }
                          >
                            {entry.result === "gagné" ? "gagné" : "perdu"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center space-x-1 font-semibold ${
                              entry.balanceChange > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {entry.balanceChange > 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span>
                              {entry.balanceChange > 0 ? "+" : ""}
                              {entry.balanceChange}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {history.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p>No games played yet. Generate your first number!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        <Toaster />
      </div>
    </ProtectedRoute>
  );
}
