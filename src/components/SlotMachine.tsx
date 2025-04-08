import React, { useState, useCallback, useEffect } from 'react';
import { Ticket } from 'lucide-react';
import { useFezinha } from '../hooks/useFezinha';
import { useFreeSpin } from '../hooks/useFreeSpin';
import { useAutoSpin } from '../hooks/useAutoSpin';
import { Background } from './Background';
import { FezinhaIndicator } from './FezinhaIndicator';
import { FreeSpinIndicator } from './FreeSpinIndicator';
import { CambistaSymbol } from './CambistaSymbol';
import { PuleDisplay } from './PuleDisplay';
import { SpinColumn } from './SpinColumn';
import { AutoSpinControls } from './AutoSpinControls';
import { WinEffects } from './WinEffects';
import { WinningPopup } from './WinningPopup';
import { PrizeNotification } from './PrizeNotification';
import { FezinhaModal } from './FezinhaModal';
import { SymbolGenerator } from '../utils/symbolGenerator';
import { calculateWinAmount } from '../utils/winCalculator';
import { GAME_CONFIG } from '../config/gameConfig';
import { initialGameState } from '../config/gameState';
import type { GameState, SlotState } from '../types/game';
import apostarImg from '../assets/width_199.webp'; // ajuste o caminho conforme sua estrutura


export function SlotMachine() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [spinningColumns, setSpinningColumns] = useState<Record<string, boolean>>({});
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showFezinhaEndModal, setShowFezinhaEndModal] = useState(false);
  const symbolGenerator = new SymbolGenerator();
  
  const { 
    fezinhaCount, 
    isSpecialTicketAvailable: isFezinhaTicketAvailable,
    isActive: isFezinhaActive,
    remainingSpins: fezinhaSpins,
    totalPrize: fezinhaTotalPrize,
    addFezinha,
    startFezinhaMode,
    addFezinhaPrize,
    resetFezinha
  } = useFezinha();

  const {
    freeSpinCount,
    isSpecialTicketAvailable,
    addFreeSpin,
    claimSpecialTicket
  } = useFreeSpin();

  const {
    autoSpinCount,
    isAutoSpinning,
    startAutoSpin,
    stopAutoSpin,
    decrementAutoSpin
  } = useAutoSpin();

  // Handle Fezinha mode completion
  useEffect(() => {
    if (isFezinhaActive && fezinhaSpins === 0) {
      setShowFezinhaEndModal(true);
      resetFezinha();
    }
  }, [isFezinhaActive, fezinhaSpins]);

  // Handle prize display
  useEffect(() => {
    if (gameState.currentWin > 0) {
      const isHighPrize = gameState.currentWin > gameState.bet * 10;
      
      if (isHighPrize) {
        setShowWinPopup(true);
      } else {
        setShowNotification(true);
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      }

      if (isFezinhaActive) {
        addFezinhaPrize(gameState.currentWin);
      }
    }
  }, [gameState.currentWin, gameState.bet, isFezinhaActive]);

  const spin = useCallback(async () => {
    if (gameState.isSpinning || gameState.balance < gameState.bet) return;

    setGameState(prev => ({
      ...prev,
      isSpinning: true,
      balance: prev.balance - prev.bet
    }));

    // Start spinning columns sequentially
    const columns = ['pule', 'animal', 'cambista'];
    for (const [index, column] of columns.entries()) {
      setSpinningColumns(prev => ({ ...prev, [column]: true }));
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    const newSlots: SlotState = {
      pule: isFezinhaActive 
        ? { type: 'wild', value: 5, message: 'Forra!' }
        : symbolGenerator.generateSymbol('pule'),
      animal: symbolGenerator.generateSymbol('animal'),
      cambista: symbolGenerator.generateSymbol('cambista'),
    };

    if (newSlots.cambista.type === 'fezinha') {
      addFezinha();
    }

    if (newSlots.cambista.type === 'freeSpin') {
      addFreeSpin();
    }

    const winAmount = calculateWinAmount(newSlots, gameState.bet);

    setGameState(prev => ({
      ...prev,
      isSpinning: false,
      slots: newSlots,
      balance: prev.balance + winAmount,
      currentWin: winAmount
    }));

    if (isAutoSpinning && autoSpinCount > 1) {
      decrementAutoSpin();
      setTimeout(spin, 1500);
    }
  }, [gameState.isSpinning, gameState.balance, gameState.bet, isAutoSpinning, autoSpinCount, decrementAutoSpin, isFezinhaActive]);

  const handleColumnSpinComplete = (column: string) => {
    setSpinningColumns(prev => ({ ...prev, [column]: false }));
  };

  const adjustBet = (amount: number) => {
    if (isAutoSpinning || isFezinhaActive) return;
    
    setGameState(prev => ({
      ...prev,
      bet: Math.max(GAME_CONFIG.MIN_BET, Math.min(GAME_CONFIG.MAX_BET, prev.bet + amount))
    }));
  };

  const handleAutoSpin = (spins: number) => {
    if (!isFezinhaActive) {
      startAutoSpin(spins);
      spin();
    }
  };

  const handleStopAutoSpin = () => {
    stopAutoSpin();
  };

  const handleCloseWinPopup = () => {
    setShowWinPopup(false);
  };

  const handleCloseFezinhaEndModal = () => {
    setShowFezinhaEndModal(false);
  };

  return (
<div className="relative min-h-screen flex flex-col items-center justify-center p-4">
  <Background />
  <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-2xl w-full">
    <WinEffects show={gameState.currentWin > gameState.bet * 10} />

    {/* Seção do título "Bilhete de Ouro" com estilo customizado */}
    <div className="flex items-center justify-center gap-2 mb-6">
      <Ticket className="w-8 h-8 text-yellow-600" />
      <h1
        className="text-3xl font-bold"
        style={{
          fontFamily: `'Pacifico', cursive`, // fonte manuscrita ou estilosa
          color: '#ce7143', // cor igual ao exemplo
          letterSpacing: '1px',
        }}
      >
        Bilhete de Ouro
      </h1>
    </div>


        {isFezinhaActive && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 flex items-center justify-between">
            <span className="font-medium">Modo Fezinha Ativo!</span>
            <span className="font-bold">Rodadas: {fezinhaSpins}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">
          <SpinColumn 
            isSpinning={spinningColumns.pule} 
            delay={0}
            onSpinComplete={() => handleColumnSpinComplete('pule')}
            isWinning={gameState.currentWin > 0}
          >
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <h3 className="text-sm font-semibold mb-2">Pule</h3>
              <PuleDisplay symbol={gameState.slots.pule} />
            </div>
          </SpinColumn>

          <SpinColumn 
            isSpinning={spinningColumns.animal} 
            delay={0.3}
            onSpinComplete={() => handleColumnSpinComplete('animal')}
            isWinning={gameState.currentWin > 0}
          >
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <h3 className="text-sm font-semibold mb-2">Bicho</h3>
              <div className="text-4xl">
                {gameState.slots.animal.type === 'animal' && 
                  (gameState.slots.animal.value as any).symbol}
              </div>
            </div>
          </SpinColumn>

          <SpinColumn 
            isSpinning={spinningColumns.cambista} 
            delay={0.6}
            onSpinComplete={() => handleColumnSpinComplete('cambista')}
            isWinning={gameState.currentWin > 0}
          >
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <h3 className="text-sm font-semibold mb-2">Via do Cambista</h3>
              <CambistaSymbol symbol={gameState.slots.cambista} />
              {gameState.slots.cambista.message && (
                <p className="text-sm mt-2 text-gray-600">{gameState.slots.cambista.message}</p>
              )}
            </div>
          </SpinColumn>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-lg">
            Saldo: <span className="font-bold">R$ {gameState.balance.toFixed(2)}</span>
          </div>
          <div className="text-lg">
            Último Prêmio: <span className="font-bold">R$ {gameState.currentWin.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustBet(-0.20)}
              disabled={isAutoSpinning || isFezinhaActive}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
            >
              -
            </button>
            <span className="text-lg font-bold">R$ {gameState.bet.toFixed(2)}</span>
            <button
              onClick={() => adjustBet(0.20)}
              disabled={isAutoSpinning || isFezinhaActive}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-4">
            <FreeSpinIndicator 
              count={freeSpinCount}
              isSpecialTicketAvailable={isSpecialTicketAvailable}
            />
            <FezinhaIndicator
              count={fezinhaCount}
              isSpecialTicketAvailable={isFezinhaTicketAvailable}
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full my-4">
          <button
            onClick={spin}
            disabled={gameState.isSpinning || gameState.balance < gameState.bet}
            className={`relative w-28 h-28 flex items-center justify-center transition-all duration-200 shadow-md rounded-full
              ${
                gameState.isSpinning || gameState.balance < gameState.bet
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'hover:brightness-110'
              }`}
          >
            <img
              src={apostarImg}
              alt="Apostar"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
            <span className="text-white font-bold text-xl drop-shadow-md font-[cursive] z-10">
              Apostar
            </span>
          </button>
        </div>

        {!isFezinhaActive && (
          <AutoSpinControls
            isAutoSpinning={isAutoSpinning}
            remainingSpins={autoSpinCount}
            onAutoSpin={handleAutoSpin}
            onStop={handleStopAutoSpin}
          />
        )}

        <WinningPopup
          prize={gameState.currentWin}
          isVisible={showWinPopup}
          onClose={handleCloseWinPopup}
        />

        <PrizeNotification
          prize={gameState.currentWin}
          isVisible={showNotification}
        />

        <FezinhaModal
          isVisible={isFezinhaTicketAvailable}
          onStart={startFezinhaMode}
        />

        <FezinhaModal
          isVisible={showFezinhaEndModal}
          onStart={handleCloseFezinhaEndModal}
          totalPrize={fezinhaTotalPrize}
          isEnding={true}
        />
      </div>
    </div>
  );
}