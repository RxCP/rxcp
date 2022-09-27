export default function setcolorClass(
  colorClass: object,
  variant: string = 'solid',
  color = 'primary',
  isDisabled = false,
): string {
  return `${colorClass[variant][color]?.base || ''} ${
    isDisabled
      ? colorClass[variant][color]?.disabled || ''
      : colorClass[variant][color]?.default || ''
  }`;
}
