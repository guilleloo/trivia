"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ClassicMode from "@/components/classic-mode";
import BattleMode from "@/components/battle-mode";
import { Brain, Trophy, User, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-white mr-3" />
            <h1 className="text-5xl font-bold text-white">Trivia Master</h1>
          </div>
          <p className="text-xl text-white/80">
            Pon a prueba tus conocimientos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 hover:border-purple-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <User className="w-16 h-16 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Modo Clásico
              </CardTitle>
              <CardDescription className="text-gray-600">
                Juega solo y pon a prueba tus conocimientos
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Responde preguntas de trivia</li>
                <li>• Ve tu puntaje al final</li>
                <li>• Desafía tus límites</li>
              </ul>
              <Button
                onClick={() => setGameMode("classic")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
                size="lg"
              >
                Jugar Solo
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 hover:border-blue-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <Users className="w-16 h-16 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Modo Batalla
              </CardTitle>
              <CardDescription className="text-gray-600">
                Compite contra un amigo en el mismo dispositivo
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Dos jugadores se turnan</li>
                <li>• Misma cantidad de preguntas</li>
                <li>• ¡Que gane el mejor!</li>
              </ul>
              <Button
                onClick={() => setGameMode("battle")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                size="lg"
              >
                Batalla 1 vs 1
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center text-white/60">
            <Trophy className="w-5 h-5 mr-2" />
            <span>¿Tienes lo que se necesita para ser el Trivia Master?</span>
          </div>
        </div>
      </div>
    </div>
  );
}
