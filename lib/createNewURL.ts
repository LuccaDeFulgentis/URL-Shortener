"use server";

import getCollection, { URLS_COLLECTION } from "@/db";
import { URLProps } from "@/types";
import { error } from "console";

export default async function createNewURL(
  alias: string,
  url: string,
  ): Promise<URLProps> {

  try{
    new URL(url);
  } catch {
    throw new Error("Invadld URL")
  }

  if ( !url.startsWith("https://") && !url.startsWith("http://")) {
    throw new Error("Invalid URL");
  }

  if (
    alias.trim().length === 0 ||
    alias.includes(" ") ||
    alias.includes("/") ||
    alias.includes("?") ||
    alias.includes("#") ||
    alias.includes("%") ||
    alias.includes("&") ||
    alias.includes("@")
    ) {
    throw new Error("Invalid alias");
  }

  console.log("creating new url");

  const p = {
    alias: alias,
    url: url
  };

  const urlsCollection = await getCollection(URLS_COLLECTION);

  const existingURL = await urlsCollection.findOne({ alias: alias });

  if (existingURL) {
    throw new Error("Alias already taken");
  }
  const res = await urlsCollection.insertOne({ ...p });

  if (!res.acknowledged) {
    throw new Error("DB insert failed");
  }

  return { ...p, id: res.insertedId.toHexString() };
}