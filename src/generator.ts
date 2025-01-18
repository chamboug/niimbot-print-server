import { createCanvas } from "canvas";
import { Template } from "./validation";

export const generateImage = (template: Template): Buffer => {
  const canvas = createCanvas(template.width, template.height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, template.width, template.height);
  // Set text color
  context.fillStyle = "#000000";

  for (const label of template.labels) {
    context.font = label.font;

    if (label.x === "center") {
      context.textAlign = "center";
      label.x = template.width / 2;
    } else {
      context.textAlign = "left";
    }

    if (label.y === "center") {
      context.textBaseline = "middle";
      label.y = template.height / 2;
    } else {
      context.textBaseline = "top";
    }

    context.fillText(label.content, label.x, label.y);
  }

  return canvas.toBuffer();
};
