import { useWindowDimensions } from "react-native";

export function useColumns(): number {
  const screenWidth = useWindowDimensions().width;
  if (screenWidth >= 1200) return 4;
  if (screenWidth >= 900) return 3;
  if (screenWidth >= 600) return 2;
  return 1;
}
