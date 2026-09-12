import type { ProductVariant } from "../../types/product";

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedOptions: Record<string, string>;
  onChange: (optionName: string, value: string) => void;
};

function getOptionGroups(variants: ProductVariant[]) {
  const groups = new Map<string, Set<string>>();
  for (const variant of variants) {
    for (const [key, value] of Object.entries(variant.options)) {
      if (!groups.has(key)) groups.set(key, new Set());
      groups.get(key)!.add(value);
    }
  }
  return Array.from(groups.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));
}

function isValueAvailable(
  variants: ProductVariant[],
  optionName: string,
  value: string
) {
  return variants.some(
    (variant) =>
      variant.options[optionName] === value && variant.stockQuantity > 0
  );
}

export function VariantSelector({
  variants,
  selectedOptions,
  onChange,
}: VariantSelectorProps) {
  const groups = getOptionGroups(variants);
  if (groups.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.name}>
          <p className="mb-3 text-sm text-[#1C1A16]">
            {group.name}
            {selectedOptions[group.name] && (
              <span className="text-[#8B8478]"> — {selectedOptions[group.name]}</span>
            )}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {group.values.map((value) => {
              const isActive = selectedOptions[group.name] === value;
              const isAvailable = isValueAvailable(
                variants,
                group.name,
                value,
              );

              return (
                <button
                  key={value}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => onChange(group.name, value)}
                  aria-pressed={isActive}
                  className={`border-b pb-1 text-sm transition-colors duration-200 ${
                    isActive
                      ? "border-[#1C1A16] text-[#1C1A16]"
                      : isAvailable
                        ? "border-transparent text-[#8B8478] hover:border-[#8B8478] hover:text-[#1C1A16]"
                        : "border-transparent text-[#C9C3B8] line-through decoration-[#C9C3B8]"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}