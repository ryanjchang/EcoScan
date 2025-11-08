import { EcoAction } from '../types';

// Cooldown periods in milliseconds
const COOLDOWNS = {
    bottle: 30 * 60 * 1000,      // 30 minutes - can refill multiple times per day
    recycle: 2 * 60 * 60 * 1000, // 2 hours - reasonable recycling frequency
    bike: 3 * 60 * 60 * 1000,    // 3 hours - typically commute there and back
    compost: 4 * 60 * 60 * 1000, // 4 hours - usually done 2-3 times per day
    trash: 1 * 60 * 60 * 1000,   // 1 hour - prevents spam
    other: 2 * 60 * 60 * 1000,   // 2 hours - default for other actions
};

export interface CooldownCheck {
    onCooldown: boolean;
    timeRemaining?: number; // in milliseconds
    lastAction?: EcoAction;
}

/**
 * Check if a specific action type is on cooldown
 */
export const checkCooldown = (
    actionType: string,
    previousActions: EcoAction[]
): CooldownCheck => {
    // Find the most recent action of this type
    const lastActionOfType = previousActions
        .filter(action => action.type === actionType)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

    if (!lastActionOfType) {
        return { onCooldown: false };
    }

    const cooldownPeriod = COOLDOWNS[actionType as keyof typeof COOLDOWNS] || COOLDOWNS.other;
    const lastActionTime = new Date(lastActionOfType.timestamp).getTime();
    const currentTime = Date.now();
    const timeSinceLastAction = currentTime - lastActionTime;

    if (timeSinceLastAction < cooldownPeriod) {
        return {
            onCooldown: true,
            timeRemaining: cooldownPeriod - timeSinceLastAction,
            lastAction: lastActionOfType,
        };
    }

    return { onCooldown: false };
};

/**
 * Format remaining cooldown time as human-readable string
 */
export const formatCooldownTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
};

/**
 * Get all cooldown periods for display
 */
export const getCooldownPeriods = () => {
    return {
        bottle: '30 minutes',
        recycle: '2 hours',
        bike: '3 hours',
        compost: '4 hours',
        trash: '1 hour',
        other: '2 hours',
    };
};