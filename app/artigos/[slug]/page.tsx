interface Props {
  params: { slug: string };
}

export default function ArticlePage({ params }: Props) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Artigo: {params.slug}</h1>
      <p>Conteúdo do artigo em breve...</p>
    </main>
  );
}
