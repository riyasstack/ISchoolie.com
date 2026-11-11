import { useLocalSearchParams } from "expo-router";
import { NativeScreenDetail } from "@/components/native-domain";
export default function Detail() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const value = Array.isArray(id) ? id[0] : (id ?? "");
  return <NativeScreenDetail key={value} id={value} />;
}
