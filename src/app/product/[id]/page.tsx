import ProductPageClient from "./ProductPageClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default function ProductPage({ params }: PageProps) {
  const id = params?.id && typeof params.id === "string" ? params.id : "";
  return <ProductPageClient id={id} />;
}
