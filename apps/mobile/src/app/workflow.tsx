import { useLocalSearchParams } from "expo-router";
import { NativeWorkflow } from "@/components/native-workflows";
export default function WorkflowRoute() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return <NativeWorkflow key={id} id={id ?? ""} />;
}
