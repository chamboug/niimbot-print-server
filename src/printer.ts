import { PrinterClient } from "niimbotjs";
import sharp from "sharp";

export const print = async (imgPath: string) => {
  const client = new PrinterClient();
  const image = sharp(imgPath);

  try {
    await client.open();
    await client.print(image, { density: 5 });
  } catch {
    throw new Error("Unable to print the image.");
  } finally {
    client.close();
  }
};
