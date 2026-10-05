import { creators, services } from "@/lib/data/seed";
import ServiceDetailView from "./service-detail";

export function generateStaticParams() {
  return services.map((s) => {
    const creator = creators.find((c) => c.id === s.userId)!;
    return { username: creator.username, serviceId: s.id };
  });
}

export default function Page({
  params,
}: {
  params: Promise<{ username: string; serviceId: string }>;
}) {
  return <ServiceDetailView params={params} />;
}
