import { Text, TextStyle } from "react-native";
import { useCountUp } from "@/hooks/count-up";

interface PointsDisplayProps {
  points: number;
  word?: string;
  style?: TextStyle;
}

export default function PointsDisplay({
  points,
  word,
  style,
}: PointsDisplayProps) {
  const animatedPoints = useCountUp(points, 1500);

  return (
    <Text style={style}>
      {animatedPoints.toLocaleString()} {word}
    </Text>
  );
}
