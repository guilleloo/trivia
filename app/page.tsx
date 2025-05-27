"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ClassicMode from "@/components/classic-mode";
import BattleMode from "@/components/battle-mode";

type GameMode = "menu" | "classic" | "battle";

export default function TriviaApp() {
  const [gameMode, setGameMode] = useState<GameMode>("menu");

  if (gameMode === "classic") {
    return <ClassicMode onBackToMenu={() => setGameMode("menu")} />;
  }

  if (gameMode === "battle") {
    return <BattleMode onBackToMenu={() => setGameMode("menu")} />;
  }

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8">Trivia Master</h1>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Modo Clásico</h2>
            <p className="text-gray-600 mb-6">Juega solo</p>
            <Button
              onClick={() => setGameMode("classic")}
              className="w-full"
              size="lg"
            >
              Empezar
            </Button>
          </div>

          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Modo Batalla</h2>
            <p className="text-gray-600 mb-6">1 vs 1</p>
            <Button
              onClick={() => setGameMode("battle")}
              className="w-full"
              size="lg"
            >
              Empezar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
