import { creators } from "@/lib/data/seed";
import CreatorProfileView from "./creator-profile";

export function generateStaticParams() {
  return creators.map((c) => ({ username: c.username }));
}

export default function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return <CreatorProfileView params={params} />;
}
