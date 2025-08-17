export const dynamic = 'force-dynamic';

type SimplePokemon = {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  sprites?: { front_default?: string };
  types?: { type: { name: string } }[];
};

export async function POST(req: Request) {
  const { pokemons } = (await req.json()) as { pokemons?: SimplePokemon[] };

  if (!Array.isArray(pokemons) || pokemons.length === 0) {
    return new Response('No pokemons provided', { status: 400 });
  }

  const headers =
    'Name,ID,Types,Height (m),Weight (kg),Image URL,Details URL\n';

  const rows = pokemons
    .map((p) => {
      const types =
        p.types
          ?.map((t) => t.type?.name)
          .filter(Boolean)
          .join(' | ') || 'Unknown';

      const q = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;

      return [
        q(p.name),
        String(p.id),
        q(types),
        String((p.height ?? 0) / 10),
        String((p.weight ?? 0) / 10),
        q(p.sprites?.front_default ?? ''),
        q(`https://pokeapi.co/api/v2/pokemon/${p.id}`),
      ].join(',');
    })
    .join('\n');

  const BOM = '\uFEFF';
  const csv = BOM + headers + rows + '\n';

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${pokemons.length}_pokemons.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
