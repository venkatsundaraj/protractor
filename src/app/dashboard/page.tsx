import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await getServerSession();
  if (!session) notFound();
  return (
    <section className="flex items-center justify-center min-h-screen w-screen">
      <h1 className="text-4xl font-heading font-bold text-slate-50">
        Dashboard
      </h1>
      ;
    </section>
  );
};

export default page;
