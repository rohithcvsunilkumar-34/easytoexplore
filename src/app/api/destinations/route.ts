import { NextResponse } from 'next/server';
import { destinationsData } from '@/data/destinations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let results = [...destinationsData];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q)
    );
  }

  if (region && region !== 'All') {
    results = results.filter((d) => d.region === region);
  }

  if (category && category !== 'All') {
    results = results.filter((d) => d.category === category);
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
  });
}
