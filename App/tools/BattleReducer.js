import Unit from "../objects/Unit";

export default function Battlereducer(battle, action) {
  // Perform Tick
  if (action.type === "tick") {
    // Check if any units are ready
    const readyQueue = Unit.getReadyUnits(battle.playerTeam, battle.enemyTeam);

    if (readyQueue.length > 0) {
      // Update ready queue
      return {
        ...battle,
        readyQueue: readyQueue,
      };
    } else {
      // Tick all units ap up by speed
      const { playerTeam, enemyTeam } = Unit.tickAll(
        battle.playerTeam,
        battle.enemyTeam
      );

      // Update battle attributes
      return {
        ...battle,
        playerTeam,
        enemyTeam,
        ticks: battle.ticks + 1,
      };
    }

    // Update Ready Queue
  } else if (action.type === "update ready queue") {
    if (battle.readyQueue.length > 0) {
      if (battle.readyQueue[0].health > 0) {
        if (battle.readyQueue[0].team === "player") {
          return {
            ...battle,
            activeUnit: battle.readyQueue[0],
            activeUnitControlType: "manual",
          };
        } else {
          return {
            ...battle,
            activeUnit: battle.readyQueue[0],
            activeUnitControlType: "ai",
            activeUnitAiPhase: "move",
          };
        }
      } else {
        const readyQueue = battle.readyQueue.slice(1, battle.readyQueue.length);
        return { ...battle, readyQueue };
      }
    } else {
      return { ...battle, ticks: battle.ticks + 1, activeUnit: null };
    }

    // End Current Turn
  } else if (action.type === "end current turn") {
    if (battle.activeUnit) {
      const { playerTeam, enemyTeam } = Unit.resetActiveUnit(
        battle.activeUnit,
        battle.playerTeam,
        battle.enemyTeam
      );
      const readyQueue = battle.readyQueue.slice(1, battle.readyQueue.length);
      return { ...battle, playerTeam, enemyTeam, readyQueue };
    }
  } else if (action.type === "set active unit ai phase") {
    const { phase } = action;

    return { ...battle, activeUnitAiPhase: phase };
  }

  // Default
  else {
    return battle;
  }
}
