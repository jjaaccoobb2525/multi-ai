import ModelsArea from "@/modules/models";
import TabsComponent from "@/modules/tabs";
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
    <main className="absolute flex h-full max-w-[200vw] flex-col items-start gap-8 p-8">
      <TabsComponent models={models} />
      <div className="flex h-[90%] w-full justify-between gap-8">
        {/* 사용자의 Input 영역 */}
        <UserInputArea />
        {/* 사용자의 Input 영역 */}
        {/* AI 모델 영역 */}
        <ModelsArea models={models} />
        {/* AI 모델 영역 */}
      </div>
      <div className="flex w-full justify-center"></div>
    </main>
  );
}
