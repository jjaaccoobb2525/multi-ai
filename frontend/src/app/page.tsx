import ModelsArea from "@/modules/models";
import TabsComponent from "@/modules/tabs";
import TextAreaComponent from "@/modules/textarea";
import UserInputArea from "@/modules/user-input";

const models = [
  {
    id: 0,
    name: "ChatGPT",
    madeBy: "OpenAI",
    icon: "gpt.svg",
    func: "gpt"
  },
  {
    id: 1,
    name: "Gemini",
    madeBy: "Google",
    icon: "gemini.svg",
    func: "gemini"
  },
  {
    id: 2,
    name: "Claude",
    madeBy: "Anthropic",
    icon: "claude.svg",
    func: "claude"
  }
];

export default function MainPage() {
  return (
    <main
      className="absolute flex h-full w-[200vw] max-w-[200vw] flex-col items-start gap-8 p-8"
    >
      <TabsComponent models={models} />
      <div className="flex h-[90%] w-full justify-between gap-8">
        <UserInputArea />
        <ModelsArea models={models} />
      </div>
      <div className="relative flex w-[calc(100vw-64px)] justify-center bg-blue-200">
        <TextAreaComponent />
      </div>
    </main>
  );
}
