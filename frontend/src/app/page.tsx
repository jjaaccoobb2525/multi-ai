import ModelsArea from "@/modules/models";
import UserInputArea from "@/modules/user-input";

export default function MainPage() {
  return (
    <main className="absolute flex h-full w-[200vw] flex-col items-start gap-8 p-8">
      <div className="">test</div>
      <div className="flex h-[90%] w-full justify-between gap-8">
        {/* 사용자의 Input 영역 */}
        <UserInputArea />
        {/* 사용자의 Input 영역 */}
        {/* AI 모델 영역 */}
        <ModelsArea />
        {/* AI 모델 영역 */}
      </div>
      <div className="flex w-full justify-center"></div>
    </main>
  );
}
