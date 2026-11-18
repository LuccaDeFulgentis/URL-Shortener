import getCollection, { URLS_COLLECTION } from "@/db";
import { redirect, notFound } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;

  const urlsCollection = await getCollection(URLS_COLLECTION);
  const url = await urlsCollection.findOne({ alias: alias });

  if (!url) {
    notFound();
  }

  redirect(url.url);
}