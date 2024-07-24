import dynamic from "next/dynamic";
const LexicalEditor = dynamic(() => import("./app"), { ssr: false });

export default function Page() {
  return (
    <>
      <LexicalEditor />
    </>
  );
}
