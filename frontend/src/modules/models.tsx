"use client";

import { cn } from "@/libs/shadcn/utils";
import { gpt } from "@/server/gpt";
import { userInputStateAtom } from "@/utilities/recoil/atoms/no-storage";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { useRecoilState } from "recoil";

const AiProfile = ({ name, madeBy, icon }: { name: string; madeBy: string; icon: string }) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-white p-2">
      <Image
        alt=""
        width={28}
        height={28}
        src={`/icons/${icon}`}
      />
      <p>{`${madeBy}: ${name}`}</p>
    </div>
  );
};

export default function ModelsArea({ models }: { models: any }) {
  const [userInput, setUserInput] = useRecoilState(userInputStateAtom);
  const [gptRes, setGptRes] = useState("");

  useEffect(() => {
    if (userInput) {
      (async () => {
        // const result = await gpt(userInput);
        // setGptRes(result!);
      })();
    }
  }, [userInput]);

  return (
    <div className="flex w-full gap-8">
      {models.map(({ id, name, madeBy, icon, func }, index) => {
        return (
          <div
            key={id}
            id={name}
            className="h-full min-w-[300px]"
          >
            <Rnd
              disableDragging
              onResize={(e) => {
                console.log(e);
              }}
              enableResizing={{
                right: true,
                left: false,
                top: false,
                bottom: false
              }}
              className={cn(
                "!static h-full min-w-full rounded-lg bg-zinc-200 p-4",
                userInput && "items-start"
              )}
            >
              {userInput ? (
                <div
                  className="flex h-[44px] w-full items-center gap-4 rounded-lg bg-white p-2"
                >
                  <Image
                    height={24}
                    width={24}
                    src={`/icons/${icon}`}
                    alt=""
                  />
                  <p className="flex h-full w-full flex-wrap pr-2 text-left">
                    {
                      '물론입니다! 여기에 간단한 마크다운 예시를 작성해보겠습니다. # 제목 1 ## 제목 2 ### 제목 3 **굵은 글씨**와 *이탤릭체* - 리스트 항목 1 - 리스트 항목 2 - 서브 항목 - 리스트 항목 3 1. 첫 번째 항목 2. 두 번째 항목 3. 세 번째 항목 [링크 텍스트](https://www.example.com) > 인용문 예시입니다. ``` 코드 블록 예시 printf("Hello, World!"); ``` 이미지 삽입: ![대체 텍스트](https://via.placeholder.com/150) 이런 식으로 마크다운을 사용할 수 있습니다! 추가적인 내용이나 다른 형태의 예시가 필요하면 말씀해 주세요.'
                    }
                  </p>
                </div>
              ) : (
                <AiProfile
                  name={name}
                  madeBy={madeBy}
                  icon={icon}
                />
              )}
            </Rnd>
          </div>
        );
      })}
    </div>
  );
}
