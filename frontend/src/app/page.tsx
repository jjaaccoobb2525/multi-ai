import { Content } from "@/modules/Content";
import { Textarea } from "@/modules/components/textarea";

export default function MainPage() {
  return (
    <main className="absolute flex h-full w-full flex-col justify-center p-8">
      <div className="flex h-full justify-between">
        <Content />
      </div>
      <div className="flex w-full justify-center">
        <Textarea
          className="absolute bottom-8 w-1/2 resize-none transition-shadow duration-300
focus-within:shadow-lg hover:shadow-lg"
        />
      </div>
    </main>
  );
}
