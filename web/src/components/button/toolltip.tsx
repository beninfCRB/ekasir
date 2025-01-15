import { Button, Tooltip } from "antd";
import React from "react";

interface TooltipButtonType {
  title?: string
  type?: "default" | "link" | "text" | "primary" | "dashed" | undefined
  text?: string
  textSize?: "xs" | "md" | "lg" | "xl" | "2xl"
  shape?: "circle" | "default" | "round" | undefined
  size?: "small" | "large" | "middle"
  icon?: React.ReactNode
  onCLick?: () => void
}

export default function TooltipButton({ title, text, textSize, type, shape, size, icon, onCLick }: TooltipButtonType) {
  return (
    <Tooltip className="flex flex-col justify-center items-center" title={title}>
      <Button type={type || "primary"} shape={shape} size={size || "small"} icon={icon} onClick={onCLick} />
      <span className={`text-gray-500 ${textSize && `text-${textSize}`}`}>{text}</span>
    </Tooltip>
  )
}
