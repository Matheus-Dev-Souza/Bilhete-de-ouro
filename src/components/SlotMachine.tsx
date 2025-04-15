/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { Ticket } from 'lucide-react';
import { useFezinha } from '../hooks/useFezinha';
import { useFreeSpin } from '../hooks/useFreeSpin';
import { useAutoSpin } from '../hooks/useAutoSpin';
import { Background } from './Background/Background';
import { FezinhaIndicator } from './FezinhaIndicator/FezinhaIndicator';
import { FreeSpinIndicator } from './FreeSpinIndicator/FreeSpinIndicator';
import { CambistaSymbol } from './CambistaSymbol/CambistaSymbol';
import { PuleDisplay } from './PuleDisplay/PuleDisplay';
import { SpinColumn } from './SpinColumn/SpinColumn';
import { AutoSpinControls } from './AutoSpinControls/AutoSpinControls';
import { WinEffects } from './WinEffects/WinEffects';
import { WinningPopup } from './WinningPopup/WinningPopup';
import { PrizeNotification } from './PrizeNotification/PrizeNotification';
import { FezinhaModal } from './FezinhaModal/FezinhaModal';
import { SymbolGenerator } from '../utils/symbolGenerator';
import { calculateWinAmount } from '../utils/winCalculator';
import { GAME_CONFIG } from '../config/gameConfig';
import { initialGameState } from '../config/gameState';
import type { GameState, SlotState } from '../types/game';
import apostarImg from '../assets/width_199.webp'; // ajuste o caminho conforme sua estrutura
import styles from './SlotMachine.module.css';


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
   // claimSpecialTicket
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
    <div className={styles.container}>
      <Background />
      
        <WinEffects show={gameState.currentWin > gameState.bet * 10} />
        
        <div className={styles.header}>
         {/*  <Ticket className={styles.ticketIcon} />  */}
          <h1 className={styles.title}>
            Bilhete <br />
            <span className={styles.titleSpecial}>DE OURO</span>
          </h1>
        </div>
    <div className={styles.panel}>
        {isFezinhaActive && (
          <div className={styles.fezinhaBanner}>
            <span className={styles.fezinhaText}>Modo Fezinha Ativo!</span>
            <span className={styles.fezinhaCount}>Rodadas: {fezinhaSpins}</span>
          </div>
        )}
  
        <div className={styles.columnsGrid}>
          <SpinColumn 
            isSpinning={spinningColumns.pule} 
            delay={0}
            onSpinComplete={() => handleColumnSpinComplete('pule')}
            isWinning={gameState.currentWin > 0}
          >
            <div className={styles.columnContainer}>
              <h3 className={styles.columnTitle}>Pule</h3>
              <PuleDisplay symbol={gameState.slots.pule} />
            </div>
          </SpinColumn>
  
          <SpinColumn 
            isSpinning={spinningColumns.animal} 
            delay={0.3}
            onSpinComplete={() => handleColumnSpinComplete('animal')}
            isWinning={gameState.currentWin > 0}
          >
            <div className={styles.columnContainer}>
              <h3 className={styles.columnTitle}>Bicho</h3>
              <div className={styles.animalSymbol}>
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
            <div className={styles.columnContainer}>
              <h3 className={styles.columnTitle}>Via do Cambista</h3>
              <CambistaSymbol symbol={gameState.slots.cambista} />
              {gameState.slots.cambista.message && (
                <p className={styles.cambistaMessage}>{gameState.slots.cambista.message}</p>
              )}
            </div>
          </SpinColumn>
        </div>
  
        <div className={styles.gameInfo}>
          <div className={styles.balanceInfo}>
            Saldo: <span className={styles.balanceValue}>R$ {gameState.balance.toFixed(2)}</span>
          </div>
          <div className={styles.prizeInfo}>
            Último Prêmio: <span className={styles.prizeValue}>R$ {gameState.currentWin.toFixed(2)}</span>
          </div>
        </div>
  
        <div className={styles.controlsContainer}>
          <div className={styles.betControls}>
            <button
              onClick={() => adjustBet(-0.20)}
              disabled={isAutoSpinning || isFezinhaActive}
              className={styles.betButton}
            >
              -
            </button>
            <span className={styles.betValue}>R$ {gameState.bet.toFixed(2)}</span>
            <button
              onClick={() => adjustBet(0.20)}
              disabled={isAutoSpinning || isFezinhaActive}
              className={styles.betButton}
            >
              +
            </button>
          </div>
          <div className={styles.indicators}>
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
  
        <div className={styles.spinButtonContainer}>
          <button
            onClick={spin}
            disabled={gameState.isSpinning || gameState.balance < gameState.bet}
            className={`${styles.spinButton} ${
              gameState.isSpinning || gameState.balance < gameState.bet
                ? styles.spinButtonDisabled
                : styles.spinButtonActive
            }`}
          >
            <img
              src={apostarImg}
              alt="Apostar"
              className={styles.spinButtonImage}
            />
            <span className={styles.spinButtonText}>
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