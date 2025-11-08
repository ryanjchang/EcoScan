export interface VerificationResult {
    isEcoFriendly: boolean;
    actionType: 'bottle' | 'recycle' | 'bike' | 'compost' | 'other';
    confidence: number;
    reasoning: string;
}

export const verifyEcoAction = async (imageUri: string): Promise<VerificationResult> => {
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        console.log('🤖 Starting AI verification...');

        // Convert image to base64
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const base64Image = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                resolve(result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        console.log('📷 Image converted to base64');

        // Call OpenAI API directly with fetch
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `You are an environmental expert. Analyze images and determine if they show eco-friendly actions.

Valid eco-actions: reusable bottles/cups, recycling, composting, biking, public transport, reusable bags, solar panels, planting trees.

Respond ONLY with valid JSON in this exact format:
{
  "isEcoFriendly": true,
  "actionType": "bottle",
  "confidence": 85,
  "reasoning": "Shows a reusable water bottle being refilled"
}

actionType must be one of: "bottle", "recycle", "bike", "compost", "other"`
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: 'Analyze this image and respond with JSON only.'
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: base64Image,
                                    detail: 'low' // Use low detail to reduce cost
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 200,
                temperature: 0.3,
            })
        });

        if (!openaiResponse.ok) {
            const errorData = await openaiResponse.text();
            console.error('❌ OpenAI API Error:', errorData);
            throw new Error(`API Error: ${openaiResponse.status} - ${errorData}`);
        }

        const data = await openaiResponse.json();
        console.log('✅ OpenAI Response:', data);

        const content = data.choices[0].message.content;
        console.log('📝 Raw content:', content);

        // Parse JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error('❌ No JSON found in response');
            throw new Error('Invalid response format');
        }

        const result: VerificationResult = JSON.parse(jsonMatch[0]);
        console.log('✅ Parsed result:', result);

        return result;

    } catch (error) {
        console.error('❌ AI Verification Error:', error);

        // Re-throw the error so we can handle it in the UI
        throw error;
    }
};

// Determine points based on action type
export const getPointsForAction = (actionType: string): number => {
    const pointsMap: Record<string, number> = {
        bottle: 10,
        recycle: 15,
        bike: 25,
        compost: 20,
        other: 10,
    };

    return pointsMap[actionType] || 10;
};

// Determine CO2 savings based on action type
export const getCO2Savings = (actionType: string): number => {
    const co2Map: Record<string, number> = {
        bottle: 50,
        recycle: 100,
        bike: 200,
        compost: 150,
        other: 75,
    };

    return co2Map[actionType] || 75;
};

// Get emoji for action type
export const getActionEmoji = (actionType: string): string => {
    const emojiMap: Record<string, string> = {
        bottle: '♻️',
        recycle: '🗑️',
        bike: '🚴',
        compost: '🌱',
        other: '🌍',
    };

    return emojiMap[actionType] || '🌍';
};

// Get friendly name for action type
export const getActionName = (actionType: string): string => {
    const nameMap: Record<string, string> = {
        bottle: 'Reusable Bottle',
        recycle: 'Recycling',
        bike: 'Bike Commute',
        compost: 'Composting',
        other: 'Eco-Friendly Action',
    };

    return nameMap[actionType] || 'Eco-Friendly Action';
};