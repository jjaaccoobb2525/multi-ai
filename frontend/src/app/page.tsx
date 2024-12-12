import { Textarea } from "@/modules/components/textarea";

export default function MainPage() {
  return (
    <main className="flex h-full w-full flex-col justify-center p-8">
      <div className="bg-red-200 flex h-full justify-between">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
      <div className="flex w-full justify-center">
        <Textarea className="w-1/2 resize-none" />
      </div>
    </main>
  );
}
