import { Button, Tooltip } from "@heroui/react";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const TooltipArea = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setIsTooltipOpen((prev) => !prev);
  };

  const tooltipContent = `유도열과 관련하여 다음과 같은 내용이 학습되어 있습니다

인적사항 / 학력사항 / 기술스택 / 자격증 / 수상내역
성격의 장단점 / 생활신조 및 태도
개발 입문 이유 / 개발 경험, 활동, 교육, 경력
전 직장을 퇴사한 이후 학습한 기술 및 진행한 프로젝트

해당 내용들을 바탕으로 다양한 질문이 가능합니다
ex) 유도열의 경력과 능력을 참고 했을 때 풀스택 개발자로서 적합한 인재인가?
`;

  return (
    <div className="absolute top-0.5 right-1">
      <Tooltip
        showArrow={true}
        isOpen={isTooltipOpen}
        content={tooltipContent}
        className="whitespace-pre-wrap p-4"
      >
        <Button
          isIconOnly
          className="bg-default-200"
          size="sm"
          onPress={handleTooltipToggle}
        >
          <FaInfoCircle className="text-medium" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default TooltipArea;
