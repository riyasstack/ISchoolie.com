import { useRef, useState, useEffect } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import { Copy, NativeButton } from "./native-ui";
import { profileImageError } from "../../../../packages/contracts/profile-media";
export function NativeProfileMedia({ visible }: { visible: boolean }) {
  const [images, setImages] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const revision = useRef(0);
  useEffect(
    () => () => {
      revision.current++;
    },
    [],
  );
  async function choose(key: string) {
    if (busy) return;
    setBusy(true);
    const current = ++revision.current;
    let local: File | undefined;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (result.canceled) return;
      const asset = result.assets[0];
      local = new File(asset.uri);
      const type = asset.mimeType ?? "";
      let error = profileImageError(type, local.size);
      if (error) throw new Error(error);
      error = profileImageError(
        type,
        local.size,
        (await local.bytes()).slice(0, 8),
      );
      if (error) throw new Error(error);
      const encoded = await local.base64();
      if (current !== revision.current) return;
      setImages((previous) => ({
        ...previous,
        [key]: `data:${type};base64,${encoded}`,
      }));
      setMessage("Local preview only. Nothing uploaded.");
    } catch (error) {
      if (current === revision.current)
        setMessage(
          error instanceof Error ? error.message : "Image could not be read.",
        );
    } finally {
      // Delete only the picker-created cache copy, never the selected original.
      if (local?.uri.startsWith(Paths.cache.uri))
        try {
          if (local.exists) local.delete();
        } catch {}
      if (current === revision.current) setBusy(false);
    }
  }
  return (
    <View style={{ display: visible ? "flex" : "none", gap: 16 }}>
      <Copy>
        PNG/JPEG up to 2 MB. Preview images stay in memory; text snapshots do
        not save images.
      </Copy>
      {["photo", "cover"].map((key) => (
        <View key={key} style={{ gap: 12 }}>
          <NativeButton
            secondary
            disabled={busy}
            onPress={() => void choose(key)}
          >
            Choose {key === "photo" ? "profile photo" : "cover image"}
          </NativeButton>
          {images[key] && (
            <>
              <Image
                source={{ uri: images[key] }}
                accessibilityLabel={`Local ${key} preview`}
                contentFit="cover"
                cachePolicy="none"
                style={{
                  width: key === "photo" ? 120 : "100%",
                  height: key === "photo" ? 120 : 160,
                  borderRadius: key === "photo" ? 60 : 12,
                }}
              />
              <NativeButton
                secondary
                disabled={busy}
                onPress={() =>
                  setImages((previous) => ({ ...previous, [key]: "" }))
                }
              >
                Remove {key}
              </NativeButton>
            </>
          )}
        </View>
      ))}
      <Copy>{message}</Copy>
    </View>
  );
}
