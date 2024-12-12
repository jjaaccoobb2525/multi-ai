import { ResizableHandle, ResizablePanelGroup } from "@/modules/components/resizable";
import ModelsArea from "@/modules/models";
import { ResizablePanelComponent } from "@/modules/resizable-panel";
import UserInputArea from "@/modules/user-input";

export default function MainPage() {
  return (
    <main className="absolute flex h-full w-full flex-col justify-center gap-8 p-8">
      <div className="flex h-full justify-between">
        <ResizablePanelGroup
          direction="horizontal"
          className="gap-4"
        >
          <ResizablePanelComponent>
            {/* 사용자의 Input 영역 */}
            <UserInputArea />
          </ResizablePanelComponent>
          {/* AI 모델 영역 */}
          <ResizableHandle />
          <ModelsArea />
        </ResizablePanelGroup>
      </div>
      <div className="flex w-full justify-center"></div>
    </main>
  );
}
