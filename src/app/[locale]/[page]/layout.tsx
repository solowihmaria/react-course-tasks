import { notFound } from 'next/navigation';
import styles from './layout.module.css';
import ClientShell from './TwoColumnLayout';
import type { Pokemon } from '../../../types/types';

const MAX_PAGE = 163;
const PAGE_SIZE = 8;

type PokeApiList = {
  count: number;
  results: { name: string; url: string }[];
};

// Серверная загрузка списка под конкретную страницу
async function fetchPokemonsServer(pageNum: number, limit: number) {
  const offset = (pageNum - 1) * limit;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch pokemons');
  }

  const list = (await res.json()) as PokeApiList;

  const items: Pokemon[] = list.results.map((p) => {
    const id = parseInt(p.url.split('/').slice(-2, -1)[0], 10);
    return {
      name: p.name,
      url: p.url,
      id,
      height: 0,
      weight: 0,
      sprites: {
        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      },
      types: [],
    };
  });

  return { items, totalCount: list.count };
}

export default async function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; page: string }>;
}) {
  const { page } = await params;

  const pageNum = Number(page);
  const isValidPage =
    !isNaN(pageNum) &&
    Number.isInteger(pageNum) &&
    pageNum > 0 &&
    pageNum <= MAX_PAGE;

  if (!isValidPage) {
    notFound();
  }

  let initialItems: Pokemon[] = [];
  let initialTotalCount = 0;

  try {
    const data = await fetchPokemonsServer(pageNum, PAGE_SIZE);
    initialItems = data.items;
    initialTotalCount = data.totalCount;
  } catch {
    initialItems = [];
    initialTotalCount = 0;
  }

  return (
    <div className={styles.container}>
      <ClientShell
        pageNum={pageNum}
        initialItems={initialItems}
        initialTotalCount={initialTotalCount}
        pageSize={PAGE_SIZE}
      >
        {children}
      </ClientShell>
    </div>
  );
}
