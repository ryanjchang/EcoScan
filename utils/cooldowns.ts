import { EcoAction } from '../types';

// Cooldown periods in milliseconds
const COOLDOWN_PERIODS: Record<string, number> = {
    bottle: 30 * 60 * 1000,      // 30 minutes
    recycle: 60 * 60 * 1000,     // 1 hour
    bike: 4 * 60 * 60 * 1000,    // 4 hours
    compost: 24 * 60 * 60 * 1000, // 24 hours
    trash: 15 * 60 * 1000,       // 15 minutes
    other: 30 * 60 * 1000,       // 30 minutes
};

interface CooldownResult {
    onCooldown: boolean;
    timeRemaining?: number; // milliseconds
    lastActionTime?: string;
}

/**
 * Check if an action type is on cooldown
 * @param actionType - The type of eco-action
 * @param actions - Array of all user actions
 * @returns CooldownResult with cooldown status
 */
export const checkCooldown = (
    actionType: string,
    actions: EcoAction[]
): CooldownResult => {
    // Get cooldown period for this action type (default 30 min)
    const cooldownPeriod = COOLDOWN_PERIODS[actionType] || 30 * 60 * 1000;

    // Find the most recent action of this type
    const lastActionOfType = actions
        .filter((action) => action.type === actionType)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

    // If no previous action, no cooldown
    if (!lastActionOfType) {
        return { onCooldown: false };
    }

    const now = Date.now();
    const lastActionTime = new Date(lastActionOfType.timestamp).getTime();
    const timeSinceLastAction = now - lastActionTime;

    // Check if still on cooldown
    if (timeSinceLastAction < cooldownPeriod) {
        return {
            onCooldown: true,
            timeRemaining: cooldownPeriod - timeSinceLastAction,
            lastActionTime: lastActionOfType.timestamp,
        };
    }

    return { onCooldown: false };
};

/**
 * Format cooldown time remaining in human-readable format
 * @param milliseconds - Time remaining in milliseconds
 * @returns Formatted string like "5m 30s" or "2h 15m"
 */
export const formatCooldownTime = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    } else if (minutes > 0) {
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        return `${seconds}s`;
    }
};

/**
 * Get cooldown info for all action types
 * @returns Object with action types as keys and cooldown periods (in minutes) as values
 */
export const getCooldownPeriods = (): Record<string, number> => {
    const periodsInMinutes: Record<string, number> = {};

    for (const [actionType, milliseconds] of Object.entries(COOLDOWN_PERIODS)) {
        periodsInMinutes[actionType] = Math.floor(milliseconds / (60 * 1000));
    }

    return periodsInMinutes;
};