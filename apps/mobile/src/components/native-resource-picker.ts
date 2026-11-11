import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import {
  validateResource,
  type Resource,
} from "../../../../packages/contracts/authoring-state";
export async function chooseExampleResource(): Promise<{
  resource?: Omit<Resource, "id">;
  error?: string;
}> {
  const result = await DocumentPicker.getDocumentAsync({
    type: [
      "application/pdf",
      "text/plain",
      "text/csv",
      "image/png",
      "image/jpeg",
    ],
    multiple: false,
    copyToCacheDirectory: true,
  });
  if (result.canceled) return {};
  const asset = result.assets[0],
    file = new File(asset.uri),
    size = asset.size ?? file.size;
  const error = validateResource({ name: asset.name, size });
  if (error) return { error };
  const resource: Omit<Resource, "id"> = {
    name: asset.name,
    size,
    type: asset.mimeType ?? "",
    uri: /^image\/(png|jpeg)$/.test(asset.mimeType ?? "")
      ? asset.uri
      : undefined,
  };
  if (/\.(txt|csv)$/i.test(asset.name) && size <= 65536)
    resource.text = (await file.text()).slice(0, 5000);
  return { resource };
}
