export function generateSlotSymbols(): string[][] {
    const symbols = ['🍒', '🔔', '🍋', '⭐', '💎', '7️⃣'];
    const rows = 3;
    const cols = 3;
    const slot: string[][] = [];
  
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cols; j++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        row.push(symbols[randomIndex]);
      }
      slot.push(row);
    }
  
    return slot;
  }
  