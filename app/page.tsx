import { redirect } from "next/navigation";

export default function Home() {
  redirect("/ideas");
  return null;
}