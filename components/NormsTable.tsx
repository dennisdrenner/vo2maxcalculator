import {
  ACSM_NORMS,
  AGE_BRACKETS,
  PERCENTILES,
  bracketLabel,
  type AgeBracket,
  type Sex,
} from '@/lib/norms';

interface NormsTableProps {
  sex: Sex;
  brackets?: AgeBracket[];
  caption?: string;
}

export function NormsTable({ sex, brackets = AGE_BRACKETS, caption }: NormsTableProps) {
  const rows = brackets.map((bracket) =>
    ACSM_NORMS.find((n) => n.sex === sex && n.ageBracket === bracket)!
  );

  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {caption ? (
          <caption className="mb-2 text-left text-sm font-semibold text-slate-700">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr>
            <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
              Age
            </th>
            {PERCENTILES.map((p) => (
              <th
                key={p}
                scope="col"
                className="border border-slate-200 bg-slate-50 px-3 py-2 text-right"
              >
                {p}th
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.ageBracket}>
              <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">
                {bracketLabel(row.ageBracket)}
              </th>
              {PERCENTILES.map((p) => (
                <td
                  key={p}
                  className="border border-slate-200 px-3 py-2 text-right tabular-nums"
                >
                  {row.percentiles[p].toFixed(1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-slate-500">
        Values are VO2 max in ml/kg/min. Source: The Cooper Institute (see /methodology/).
      </p>
    </div>
  );
}
