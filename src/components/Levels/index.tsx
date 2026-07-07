import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import type { LevelsProps } from "../../types/components";

const Levels = ({ LevelNames, quizLevel }: LevelsProps) => {
  const [levels, setLevels] = useState<{ title: string }[]>([]);

  useEffect(() => {
    const quiSteps = LevelNames.map((level) => ({
      title: level.toUpperCase(),
    }));
    setLevels(quiSteps);
  }, [LevelNames]);

  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={levels}
        activeStep={quizLevel}
        circleTop={0}
        completeTitleColor="#E0E0E0"
        defaultTitleColor="#E0E0E0"
        completeColor="#E0E0E0"
        completeBarColor="#E0E0E0"
        size={45}
        circleFontSize={20}
      />
    </div>
  );
};

export default React.memo(Levels);
