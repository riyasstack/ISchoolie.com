import { NativeHome } from "@/components/native-screens";
import { NativeDomainHub } from "@/components/native-domain";
import { usePreview } from "@/components/preview-context";
export default function Home() {
  const { role } = usePreview();
  return ["Student", "Guardian"].includes(role) ? (
    <NativeHome />
  ) : (
    <NativeDomainHub tab="home" />
  );
}
