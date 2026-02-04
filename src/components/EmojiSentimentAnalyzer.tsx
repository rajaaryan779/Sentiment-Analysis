// Emoji sentiment analysis utility
export const emojiSentiment = {
  positive: ['😊', '😃', '😄', '😁', '😍', '🥰', '😘', '💕', '💖', '❤️', '🔥', '👍', '👏', '🙌', '✨', '⭐', '🌟', '💯', '🎉', '🎊', '😎', '🤩', '🥳', '😇', '🤗', '💪', '👌', '🙏', '💝', '🎁', '🌈', '☀️', '🌺', '🌸', '🌹', '💐', '🎵', '🎶', '🪔', '🕉️'],
  negative: ['😞', '😔', '😢', '😭', '😤', '😠', '😡', '🤬', '😩', '😫', '😰', '😱', '😨', '😓', '💔', '👎', '😒', '🙄', '😑', '😐', '😕', '🤦', '🤷', '💩', '😷', '🤮', '🤢', '😵', '👹', '👺', '💀', '☠️'],
  neutral: ['🤔', '😐', '😶', '🙂', '😌', '🤐', '🤨', '😏', '😬', '🤷', '👀', '💭', '💬', '📱', '💻', '📷', '📸', '🎬', '🎥'],
};

export function analyzeEmojiSentiment(text: string): { sentiment: 'positive' | 'negative' | 'neutral'; emojiCount: number; emojiScore: number } {
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;

  // Count emojis
  for (const emoji of emojiSentiment.positive) {
    const count = (text.match(new RegExp(emoji, 'g')) || []).length;
    positiveCount += count;
  }

  for (const emoji of emojiSentiment.negative) {
    const count = (text.match(new RegExp(emoji, 'g')) || []).length;
    negativeCount += count;
  }

  for (const emoji of emojiSentiment.neutral) {
    const count = (text.match(new RegExp(emoji, 'g')) || []).length;
    neutralCount += count;
  }

  const totalEmojis = positiveCount + negativeCount + neutralCount;

  if (totalEmojis === 0) {
    return { sentiment: 'neutral', emojiCount: 0, emojiScore: 0 };
  }

  // Calculate sentiment based on emoji distribution
  if (positiveCount > negativeCount && positiveCount > neutralCount) {
    return {
      sentiment: 'positive',
      emojiCount: totalEmojis,
      emojiScore: positiveCount / totalEmojis,
    };
  } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
    return {
      sentiment: 'negative',
      emojiCount: totalEmojis,
      emojiScore: negativeCount / totalEmojis,
    };
  } else {
    return {
      sentiment: 'neutral',
      emojiCount: totalEmojis,
      emojiScore: neutralCount / totalEmojis,
    };
  }
}

export function analyzeTextWithEmojis(text: string): {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  hasEmojis: boolean;
  emojiInfluence: number;
} {
  const lowerText = text.toLowerCase();

  // Word-based sentiment
  const positiveWords = [
    'love', 'great', 'amazing', 'awesome', 'excellent', 'beautiful', 'wonderful',
    'best', 'fantastic', 'perfect', 'incredible', 'brilliant', 'stunning',
    'gorgeous', 'lovely', 'fabulous', 'outstanding', 'superb', 'divine',
    'blessed', 'happy', 'joy', 'celebration', 'festive', 'traditional'
  ];

  const negativeWords = [
    'hate', 'bad', 'terrible', 'awful', 'worst', 'horrible', 'disappointing',
    'poor', 'disgusting', 'ugly', 'stupid', 'boring', 'waste', 'annoying',
    'fail', 'pathetic', 'trash', 'garbage', 'lame', 'cringe', 'gross'
  ];

  let positiveWordCount = 0;
  let negativeWordCount = 0;

  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveWordCount++;
  });

  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeWordCount++;
  });

  // Emoji-based sentiment
  const emojiAnalysis = analyzeEmojiSentiment(text);

  // Combine word and emoji sentiment
  const hasEmojis = emojiAnalysis.emojiCount > 0;
  const emojiWeight = hasEmojis ? 0.4 : 0; // Emojis contribute 40% if present
  const wordWeight = hasEmojis ? 0.6 : 1.0;

  let wordScore = 0.5; // neutral baseline
  if (positiveWordCount > negativeWordCount) {
    wordScore = Math.min(0.5 + (positiveWordCount * 0.15), 0.95);
  } else if (negativeWordCount > positiveWordCount) {
    wordScore = Math.max(0.5 - (negativeWordCount * 0.15), 0.05);
  }

  let emojiScore = 0.5;
  if (hasEmojis) {
    if (emojiAnalysis.sentiment === 'positive') {
      emojiScore = 0.5 + (emojiAnalysis.emojiScore * 0.45);
    } else if (emojiAnalysis.sentiment === 'negative') {
      emojiScore = 0.5 - (emojiAnalysis.emojiScore * 0.45);
    }
  }

  const finalScore = (wordScore * wordWeight) + (emojiScore * emojiWeight);

  let sentiment: 'positive' | 'negative' | 'neutral';
  if (finalScore > 0.6) {
    sentiment = 'positive';
  } else if (finalScore < 0.4) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }

  return {
    sentiment,
    score: finalScore,
    hasEmojis,
    emojiInfluence: emojiWeight,
  };
}