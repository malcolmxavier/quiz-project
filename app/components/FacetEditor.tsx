import type {
  FacetState,
  Style,
  Temperature,
  Strength,
  Milk,
  Sweetness,
  FlavorNote,
  Roast,
} from '@/lib/types';

interface FacetEditorProps {
  state: FacetState;
  onChange: (partial: Partial<FacetState>) => void;
  /** Optional intro content — host page context (e.g., "Not quite right?") */
  introSlot?: React.ReactNode;
  /** Optional action content rendered after the facet rows (e.g., an Apply CTA) */
  footerSlot?: React.ReactNode;
}

/**
 * Reusable facet editor. Per /_design/REQUIREMENTS.md, this component
 * is the SAME module used on the result surface and (in a post-MVP
 * iteration) on the user profile page — it takes (state, introSlot)
 * and emits partial-state updates. No host-specific coupling.
 *
 * Renders its own "Tune Your Ritual" eyebrow — universal across all
 * editor hosts. Host-specific headline + copy go through introSlot.
 */
export function FacetEditor({ state, onChange, introSlot, footerSlot }: FacetEditorProps) {
  return (
    <section className="editor-wrap mx-auto max-w-[560px] px-7 pb-20 md:max-w-[880px] md:px-10 md:pb-[120px] lg:max-w-[1024px]">
      <div className="md:max-w-[560px] lg:max-w-[640px]">
      <p
        className="m-0 mb-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        Tune Your Ritual
      </p>
      {introSlot}

      <Row
        label="Style"
        value={labelStyle(state.style)}
        options={[
          { label: 'Espresso', value: 'espresso-based' },
          { label: 'Drip', value: 'brewed' },
          { label: 'Cold brew', value: 'cold-brewed' },
          { label: 'Tea', value: 'tea-based' },
        ]}
        selected={state.style}
        onSelect={(v) => onChange({ style: v as Style })}
      />

      <Row
        label="Temperature"
        value={cap(state.temperature)}
        options={[
          { label: 'Hot', value: 'hot' },
          { label: 'Iced', value: 'iced' },
        ]}
        selected={state.temperature}
        onSelect={(v) => onChange({ temperature: v as Temperature })}
      />

      <Row
        label="Strength"
        value={labelStrength(state.strength)}
        options={[
          { label: 'Light', value: 'light' },
          { label: 'Medium', value: 'medium' },
          { label: 'Bold', value: 'bold' },
          { label: 'Extra-bold', value: 'extra-bold' },
        ]}
        selected={state.strength}
        onSelect={(v) => onChange({ strength: v as Strength })}
      />

      <Row
        label="Milk"
        value={labelMilk(state.milk)}
        options={[
          { label: 'Black', value: 'black' },
          { label: 'Whole', value: 'whole' },
          { label: '2%', value: '2%' },
          { label: 'Oat', value: 'oat' },
          { label: 'Almond', value: 'almond' },
          { label: 'Soy', value: 'soy' },
        ]}
        selected={state.milk}
        onSelect={(v) => onChange({ milk: v as Milk })}
      />

      <Row
        label="Sweetness"
        value={cap(state.sweetness)}
        options={[
          { label: 'None', value: 'none' },
          { label: 'Touch', value: 'touch' },
          { label: 'Sweet', value: 'sweet' },
          { label: 'Indulgent', value: 'indulgent' },
        ]}
        selected={state.sweetness}
        onSelect={(v) => onChange({ sweetness: v as Sweetness })}
      />

      <Row
        label="Flavor Note"
        value={cap(state.flavorNote)}
        options={[
          { label: 'Fruity', value: 'fruity' },
          { label: 'Floral', value: 'floral' },
          { label: 'Chocolate', value: 'chocolate' },
          { label: 'Nutty', value: 'nutty' },
          { label: 'Caramel', value: 'caramel' },
          { label: 'Spicy', value: 'spicy' },
          { label: 'Earthy', value: 'earthy' },
        ]}
        selected={state.flavorNote}
        onSelect={(v) => onChange({ flavorNote: v as FlavorNote })}
      />

      <Row
        label="Roast"
        value={cap(state.roast)}
        options={[
          { label: 'Light', value: 'light' },
          { label: 'Medium', value: 'medium' },
          { label: 'Dark', value: 'dark' },
        ]}
        selected={state.roast}
        onSelect={(v) => onChange({ roast: v as Roast })}
      />
      </div>

      {footerSlot}
    </section>
  );
}

// ── Presentational subcomponent ───────────────────────────

interface RowProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

function Row({ label, value, options, selected, onSelect }: RowProps) {
  return (
    <div className="mb-4">
      <p
        className="m-0 mb-2.5 text-[10px] uppercase tracking-[0.22em] text-[var(--cream-dim)] flex items-baseline gap-2.5"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        {label}
        <span
          className="text-[12px] font-medium text-[var(--gold)] tracking-normal normal-case"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          {value}
        </span>
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isActive = opt.value === selected;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={[
                'text-[13px] font-medium px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all duration-200',
                isActive
                  ? 'bg-[rgba(212,165,116,0.16)] border-[rgba(212,165,116,0.5)] text-[var(--gold-bright)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                  : 'bg-[rgba(255,255,255,0.03)] border-[rgba(245,230,208,0.10)] text-[var(--cream-muted)] hover:text-[var(--cream)] hover:border-[rgba(245,230,208,0.25)]',
              ].join(' ')}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Label helpers ─────────────────────────────────────────
function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function labelStyle(v: Style) {
  switch (v) {
    case 'espresso-based': return 'Espresso';
    case 'brewed':         return 'Drip';
    case 'cold-brewed':    return 'Cold brew';
    case 'tea-based':      return 'Tea';
  }
}
function labelStrength(v: Strength) {
  return v === 'extra-bold' ? 'Extra-bold' : cap(v);
}
function labelMilk(v: Milk) {
  if (v === '2%') return '2%';
  return cap(v);
}
