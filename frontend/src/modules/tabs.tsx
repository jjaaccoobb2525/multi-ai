"use client";

import { Tabs, TabsList, TabsTrigger } from "@/modules/components/tabs";

import { useEffect, useState } from "react";

export default function TabsComponent({ models }: any) {
  const [targetElId, setTargetElId] = useState("");

  useEffect(() => {
    const target = document.getElementById(targetElId);
    console.log(target);
    target?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }, [targetElId]);

  return (
    <Tabs
      defaultValue="userInput"
      className="mb-8"
      onValueChange={(e) => {
        setTargetElId(e);
      }}
    >
      <TabsList className="fixed">
        <TabsTrigger value="userInput">User Input</TabsTrigger>
        {models.map(({ id, name, madeBy, icon, func }, index) => {
          return (
            <TabsTrigger
              value={name}
              key={id}
            >
              {name}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
